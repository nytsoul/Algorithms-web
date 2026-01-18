import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

const __dirname = path.resolve();

dotenv.config({ path: path.resolve(__dirname, ".env") });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase credentials in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Import our comprehensive algorithm database
import { COMPREHENSIVE_1000_PLUS_ALGORITHMS } from '../../src/lib/comprehensive-algorithms';

async function seedComprehensiveAlgorithms() {
    console.log("🚀 Starting comprehensive algorithm seeding...");
    console.log(`📊 Total algorithms to seed: ${COMPREHENSIVE_1000_PLUS_ALGORITHMS.length}`);

    // Seed DOMAINS first to satisfy foreign key constraints
    const DOMAINS = [
        { id: 1, name: "DSA", description: "Data Structures & Algorithms - Core foundations" },
        { id: 2, name: "DAA", description: "Design & Analysis - Paradigms & complexity" },
        { id: 3, name: "AI", description: "Artificial Intelligence - Reasoning & planning" },
        { id: 4, name: "ML", description: "Machine Learning - Learning from data" },
        { id: 5, name: "Networks", description: "Computer Networks - Communication & routing" },
        { id: 6, name: "Security", description: "Cybersecurity & Cryptography - Trust & protection" },
        { id: 7, name: "Systems", description: "OS & Distributed Systems - Resource management" },
        { id: 8, name: "Graphics", description: "Graphics & Vision - Visual computation" },
        { id: 9, name: "Optimization", description: "Mathematical & Heuristic Optimization" },
        { id: 10, name: "Emerging", description: "Emerging CS Domains - Future-tech" },
        { id: 11, name: "Theory", description: "Theoretical CS - Automata & computability" },
        // Add extra domains that might be referenced
        { id: 29, name: "Compiler Algorithms", description: "Compiler Design" },
        { id: 33, name: "Deep Learning & NLP", description: "Neural Networks" },
        { id: 34, name: "Computer Vision", description: "Image Processing" },
        { id: 36, name: "Network Algorithms", description: "Networking" },
        { id: 42, name: "Blockchain Algorithms", description: "Consensus" }
    ];

    console.log("📦 Seeding domains...");
    const { error: domainError } = await supabase.from('domains').upsert(DOMAINS);
    if (domainError) {
        console.error("❌ Error seeding domains:", domainError);
    } else {
        console.log("✅ Domains seeded successfully");
    }

    try {
        // Delete existing algorithms
        console.log("🗑️  Clearing existing algorithms...");
        const { error: deleteError } = await supabase
            .from("algorithms")
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all using valid UUID placeholder

        if (deleteError) {
            console.error("❌ Error deleting existing algorithms:", deleteError);
        } else {
            console.log("✅ Existing algorithms cleared");
        }

        // Insert in batches of 100 to avoid hitting limits
        const batchSize = 100;
        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < COMPREHENSIVE_1000_PLUS_ALGORITHMS.length; i += batchSize) {
            const batch = COMPREHENSIVE_1000_PLUS_ALGORITHMS.slice(i, i + batchSize).map(algo => {
                // Remove _id field from source if present as Supabase generates ids
                const { _id, ...rest } = algo;
                // Map fields to match Supabase schema snake_case
                return {
                    slug: rest.slug || rest.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    name: rest.name,
                    category: rest.category,
                    domain: rest.domain,
                    domain_id: rest.domainId, // Map domainId to domain_id
                    difficulty: rest.difficulty,
                    description: rest.description,
                    implementation: rest.implementation,
                    pseudocode: rest.pseudocode,
                    intuition: rest.intuition,
                    time_complexity: rest.timeComplexity, // Map timeComplexity to time_complexity
                    space_complexity: rest.spaceComplexity, // Map spaceComplexity to space_complexity
                    visualization_type: rest.visualizationType, // Map visualizationType to visualization_type
                    tags: rest.tags,
                    applications: rest.applications,
                    advantages: rest.advantages,
                    disadvantages: rest.disadvantages,
                    related_algorithms: rest.relatedAlgorithms, // Map to related_algorithms
                    research_references: rest.researchReferences // Map to research_references
                };
            });

            console.log(`📦 Inserting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(COMPREHENSIVE_1000_PLUS_ALGORITHMS.length / batchSize)}...`);

            const { data, error } = await supabase
                .from("algorithms")
                .insert(batch);

            if (error) {
                console.error(`❌ Error inserting batch at index ${i}:`, error.message);
                errorCount += batch.length;
            } else {
                successCount += batch.length;
                console.log(`✅ Batch inserted successfully (${successCount}/${COMPREHENSIVE_1000_PLUS_ALGORITHMS.length})`);
            }

            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        console.log("\n" + "=".repeat(50));
        console.log("✨ Seeding complete!");
        console.log(`✅ Successfully inserted: ${successCount} algorithms`);
        console.log(`❌ Failed: ${errorCount} algorithms`);
        console.log("=".repeat(50));

        // Verify the count
        const { count, error: countError } = await supabase
            .from("algorithms")
            .select("*", { count: "exact", head: true });

        if (countError) {
            console.error("❌ Error verifying count:", countError);
        } else {
            console.log(`\n🎯 Database verification: ${count} algorithms in Supabase`);
        }

    } catch (error) {
        console.error("❌ Fatal error during seeding:", error);
        process.exit(1);
    }
}

// Run the seeding
seedComprehensiveAlgorithms()
    .then(() => {
        console.log("\n✅ All done!");
        process.exit(0);
    })
    .catch((error) => {
        console.error("\n❌ Seeding failed:", error);
        process.exit(1);
    });
