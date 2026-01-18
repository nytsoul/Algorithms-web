const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase credentials in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// We'll load the generated algorithms directly from the built comprehensive file
async function loadComprehensiveAlgorithms() {
    try {
        // Import the comprehensive algorithms - this will use the built version
        const { COMPREHENSIVE_1000_PLUS_ALGORITHMS } = await import('../../src/lib/comprehensive-algorithms.ts');
        return COMPREHENSIVE_1000_PLUS_ALGORITHMS;
    } catch (error) {
        console.error("❌ Error loading comprehensive algorithms:", error.message);
        console.log("⚠️  Falling back to direct generation...");
        
        // Fallback: generate directly here
        return null;
    }
}

async function seedComprehensiveAlgorithms() {
    console.log("🚀 Starting comprehensive algorithm seeding to Supabase...\n");

    try {
        const algorithms = await loadComprehensiveAlgorithms();
        
        if (!algorithms || algorithms.length === 0) {
            console.error("❌ No algorithms loaded!");
            process.exit(1);
        }

        console.log(`📊 Total algorithms to seed: ${algorithms.length}\n`);

        // Check table name first
        console.log("🔍 Checking Supabase table...");
        const { data: tables, error: tableError } = await supabase
            .from("algorithms")
            .select("id")
            .limit(1);

        if (tableError) {
            console.error("❌ Error checking table:", tableError.message);
            console.log("💡 Hint: Make sure the 'algorithms' table exists in Supabase");
            process.exit(1);
        }

        // Delete existing algorithms
        console.log("🗑️  Clearing existing algorithms...");
        const { error: deleteError } = await supabase
            .from("algorithms")
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000');

        if (deleteError) {
            console.warn("⚠️  Warning during deletion:", deleteError.message);
        } else {
            console.log("✅ Existing algorithms cleared\n");
        }

        // Transform algorithms to match Supabase schema
        const transformedAlgorithms = algorithms.map(alg => ({
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

        // Insert in batches of 50 to avoid rate limits
        const batchSize = 50;
        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < transformedAlgorithms.length; i += batchSize) {
            const batch = transformedAlgorithms.slice(i, i + batchSize);
            const batchNum = Math.floor(i / batchSize) + 1;
            const totalBatches = Math.ceil(transformedAlgorithms.length / batchSize);
            
            process.stdout.write(`📦 Batch ${batchNum}/${totalBatches} (${i + 1}-${Math.min(i + batchSize, transformedAlgorithms.length)})... `);

            const { error } = await supabase
                .from("algorithms")
                .insert(batch);

            if (error) {
                console.log(`❌ Error: ${error.message}`);
                errorCount += batch.length;
            } else {
                console.log(`✅`);
                successCount += batch.length;
            }

            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        console.log("\n" + "=".repeat(60));
        console.log("✨ Seeding complete!");
        console.log(`✅ Successfully inserted: ${successCount} algorithms`);
        if (errorCount > 0) {
            console.log(`❌ Failed: ${errorCount} algorithms`);
        }
        console.log("=".repeat(60));

        // Verify the count
        const { count, error: countError } = await supabase
            .from("algorithms")
            .select("*", { count: "exact", head: true });

        if (!countError) {
            console.log(`\n🎯 Final verification: ${count} algorithms in Supabase database`);
            
            if (count === algorithms.length) {
                console.log("✅ All algorithms successfully seeded!\n");
            } else {
                console.log(`⚠️  Expected ${algorithms.length} but found ${count} in database\n`);
            }
        }

    } catch (error) {
        console.error("❌ Fatal error during seeding:", error);
        process.exit(1);
    }
}

// Run the seeding
seedComprehensiveAlgorithms()
    .then(() => {
        console.log("✅ Seeding process completed!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    });
