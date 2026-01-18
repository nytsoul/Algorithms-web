const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase credentials in .env");
    process.exit(1);
}

console.log("🔗 Connecting to Supabase...");
const supabase = createClient(supabaseUrl, supabaseKey);

// Read and execute the comprehensive algorithms file content
async function generateAlgorithms() {
    console.log("📖 Reading comprehensive algorithms file...");
    
    // Read the TypeScript file
    const filePath = path.resolve(__dirname, "../../src/lib/comprehensive-algorithms.ts");
    let content = fs.readFileSync(filePath, "utf8");
    
    // Remove TypeScript-specific syntax and imports
    content = content.replace(/import .* from .*;/g, "");
    content = content.replace(/export /g, "");
    content = content.replace(/: Algorithm\[\]/g, "");
    content = content.replace(/: Algorithm/g, "");
    content = content.replace(/as any/g, "");
    content = content.replace(/interface .*/g, "");
    
    // Execute the code to generate algorithms
    const algorithms = eval(`
        ${content}
        generateComprehensiveAlgorithmDatabase()
    `);
    
    return algorithms;
}

async function seedComprehensiveAlgorithms() {
    console.log("🚀 Starting comprehensive algorithm seeding to Supabase...\n");

    try {
        const algorithms = generateAlgorithms();
        console.log(`📊 Total algorithms generated: ${algorithms.length}\n`);

        // Check table
        console.log("🔍 Verifying Supabase connection...");
        const { data: testData, error: testError } = await supabase
            .from("algorithms")
            .select("id")
            .limit(1);

        if (testError) {
            console.error("❌ Error accessing table:", testError.message);
            process.exit(1);
        }
        console.log("✅ Connection verified\n");

        // Delete existing
        console.log("🗑️  Clearing existing algorithms...");
        const { error: deleteError } = await supabase
            .from("algorithms")
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000');

        if (deleteError) {
            console.warn("⚠️  Warning:", deleteError.message);
        } else {
            console.log("✅ Table cleared\n");
        }

        // Transform for Supabase
        const transformed = algorithms.map(alg => ({
            id: alg._id,
            slug: alg.slug,
            name: alg.name,
            domain: alg.domain,
            domain_id: alg.domainId,
            category: alg.category,
            difficulty: alg.difficulty,
            visualization_type: alg.visualizationType,
            description: alg.description,
            intuition: alg.intuition,
            pseudocode: alg.pseudocode,
            implementation: alg.implementation,
            language: alg.language || 'javascript',
            inventor: alg.inventor,
            year_introduced: alg.yearIntroduced,
            time_complexity: alg.timeComplexity,
            space_complexity: alg.spaceComplexity,
            applications: alg.applications || [],
            advantages: alg.advantages || [],
            disadvantages: alg.disadvantages || [],
            related_algorithms: alg.relatedAlgorithms || [],
            research_references: alg.researchReferences || [],
            tags: alg.tags || [],
            use_cases: alg.useCases || [],
            real_world_examples: alg.realWorldExamples || [],
            paradigm: alg.paradigm
        }));

        // Insert in batches
        const batchSize = 50;
        let successCount = 0;

        console.log("📦 Inserting algorithms in batches...\n");
        for (let i = 0; i < transformed.length; i += batchSize) {
            const batch = transformed.slice(i, i + batchSize);
            const batchNum = Math.floor(i / batchSize) + 1;
            const totalBatches = Math.ceil(transformed.length / batchSize);
            
            process.stdout.write(`   Batch ${batchNum}/${totalBatches} [${i + 1}-${Math.min(i + batchSize, transformed.length)}]... `);

            const { error } = await supabase.from("algorithms").insert(batch);

            if (error) {
                console.log(`❌ ${error.message}`);
            } else {
                console.log(`✅`);
                successCount += batch.length;
            }

            await new Promise(resolve => setTimeout(resolve, 200));
        }

        console.log("\n" + "=".repeat(60));
        console.log(`✅ Successfully inserted: ${successCount}/${algorithms.length} algorithms`);
        console.log("=".repeat(60));

        // Verify
        const { count } = await supabase
            .from("algorithms")
            .select("*", { count: "exact", head: true });

        console.log(`\n🎯 Database contains: ${count} algorithms`);
        console.log(count === algorithms.length ? "✅ Perfect match!\n" : "⚠️  Count mismatch\n");

    } catch (error) {
        console.error("❌ Fatal error:", error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

seedComprehensiveAlgorithms()
    .then(() => {
        console.log("✅ Seeding completed successfully!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("❌ Failed:", error);
        process.exit(1);
    });
