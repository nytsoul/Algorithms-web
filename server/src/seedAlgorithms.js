const { createClient } = require('@supabase/supabase-js')
require('dotenv/config')
const fs = require('fs')
const path = require('path')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// ---------- LOAD REAL ALGORITHMS FROM JSON ----------
function loadAlgorithmsFromJSON() {
  const jsonPath = path.resolve(__dirname, '../../algorithms-export.json')
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
  console.log(`✅ Loaded ${data.length} algorithms from JSON\n`)
  return data
}

// ---------- TRANSFORM ALGORITHM DATA ----------
function transformAlgorithm(alg) {
  // Validate and fallback visualization_type
  const validTypes = ['array', 'tree', 'graph', 'matrix', 'network', 'none']
  let vizType = alg.visualizationType || 'array'
  if (!validTypes.includes(vizType.toLowerCase())) {
    vizType = 'none' // fallback for unknown types
  }

  return {
    slug: alg.slug,
    name: alg.name,
    domain: alg.domain,
    category: alg.category,
    paradigm: alg.paradigm || '',
    difficulty: alg.difficulty,
    visualization_type: vizType.toLowerCase(), // ✅ ensure valid & lowercase
    description: alg.description || '',
    intuition: alg.intuition || '',
    pseudocode: alg.pseudocode || '',
    implementation: alg.implementation || '',
    language: alg.language || 'javascript',
    inventor: alg.inventor || '',
    year_introduced: alg.yearIntroduced || null,
    time_complexity: alg.timeComplexity || {},
    space_complexity: alg.spaceComplexity || 'O(n)',
    applications: Array.isArray(alg.applications) ? alg.applications : [],
    use_cases: Array.isArray(alg.useCases) ? alg.useCases : [],
    real_world_examples: Array.isArray(alg.realWorldExamples) ? alg.realWorldExamples : [],
    advantages: Array.isArray(alg.advantages) ? alg.advantages : [],
    disadvantages: Array.isArray(alg.disadvantages) ? alg.disadvantages : [],
    related_algorithms: Array.isArray(alg.relatedAlgorithms) ? alg.relatedAlgorithms : [],
    research_references: Array.isArray(alg.researchReferences) ? alg.researchReferences : [],
    tags: Array.isArray(alg.tags) ? alg.tags : []
  }
}

// ---------- SEEDER ----------
async function seedAlgorithms() {
  console.log('\n🚀 SEEDING REAL ALGORITHMS FROM JSON\n')

  try {
    // Load algorithms
    const algorithms = loadAlgorithmsFromJSON()

    // Transform to match schema
    const transformed = algorithms.map(transformAlgorithm)

    console.log('📦 Inserting in batches...\n')

    const BATCH_SIZE = 100
    let success = 0

    for (let start = 0; start < transformed.length; start += BATCH_SIZE) {
      const end = Math.min(start + BATCH_SIZE, transformed.length)
      const batch = transformed.slice(start, end)

      const { error, data } = await supabase
        .from('algorithms')
        .upsert(batch, { onConflict: 'slug' }) // ✅ handles duplicates
        .select('id')

      if (error) {
        console.error(`${start + 1}-${end} ❌`, error.message)
        process.exit(1)
      }

      success += data.length
      console.log(`${start + 1}-${end} ✅`)
    }

    console.log('\n' + '='.repeat(50))
    console.log(`✅ Inserted / Updated: ${success} algorithms`)
    console.log('🎯 Database is now correct & consistent')
    console.log('='.repeat(50) + '\n')
  } catch (err) {
    console.error('❌ Error:', err.message)
    process.exit(1)
  }
}

seedAlgorithms()
