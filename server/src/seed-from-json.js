const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedFromJSON() {
    console.log("🚀 Seeding 1004 Algorithms to Supabase\n");

    try {
        // Load JSON
        const jsonPath = path.resolve(__dirname, "../../algorithms-export.json");
        console.log("📖 Loading algorithms from JSON...");
        const algorithms = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
        console.log(`✅ Loaded ${algorithms.length} algorithms\n`);

        // Test connection
        console.log("🔍 Testing Supabase connection...");
        const { error: testError } = await supabase
            .from("algorithms")
            .select("id")
            .limit(1);

        if (testError) {
            console.error("❌ Connection failed:", testError.message);
            process.exit(1);
        }
        console.log("✅ Connected\n");

        // Clear existing
        console.log("🗑️  Clearing existing data...");
        await supabase.from("algorithms").delete().neq('id', '0');
        console.log("✅ Cleared\n");

        // Transform and insert
        const transformed = algorithms.map(alg => {
            // Omit the '_id' field to let Supabase generate the UUID
            const { _id, ...rest } = alg;
            return {
                slug: rest.slug,
                name: rest.name,
                domain: rest.domain,
                domain_id: rest.domainId,
                category: rest.category,
                difficulty: rest.difficulty,
                visualization_type: rest.visualizationType,
                description: rest.description,
                intuition: rest.intuition,
                pseudocode: rest.pseudocode,
                implementation: rest.implementation,
                language: rest.language,
                inventor: rest.inventor,
                year_introduced: rest.yearIntroduced,
                time_complexity: rest.timeComplexity,
                space_complexity: rest.spaceComplexity,
                applications: rest.applications,
                advantages: rest.advantages,
                disadvantages: rest.disadvantages,
                related_algorithms: rest.relatedAlgorithms,
                research_references: rest.researchReferences,
                tags: rest.tags,
                use_cases: rest.useCases,
                real_world_examples: rest.realWorldExamples,
                paradigm: rest.paradigm
            };
        });

        console.log("📦 Inserting in batches...\n");
        const batchSize = 100;
        let total = 0;

        for (let i = 0; i < transformed.length; i += batchSize) {
            const batch = transformed.slice(i, i + batchSize);
            process.stdout.write(`   ${i + 1}-${Math.min(i + batchSize, transformed.length)}... `);

            const { error } = await supabase.from("algorithms").insert(batch);
            if (!error) {
                total += batch.length;
                console.log(`✅`);
            } else {
                console.log(`❌ ${error.message}`);
            }
            await new Promise(r => setTimeout(r, 150));
        }

        // Verify
        const { count } = await supabase
            .from("algorithms")
            .select("*", { count: "exact", head: true });

        console.log("\n" + "=".repeat(50));
        console.log(`✅ Inserted: ${total} algorithms`);
        console.log(`🎯 Database: ${count} algorithms`);
        console.log("=".repeat(50) + "\n");

    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
}

seedFromJSON().then(() => {
    console.log("✅ Done!");
    process.exit(0);
});
