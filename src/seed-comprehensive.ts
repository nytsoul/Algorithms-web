import { createClient } from "@supabase/supabase-js";
import { ALL_1000_ALGORITHMS } from "./lib/all-algorithms";
import * as dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

/**
 * Seed the Supabase `algorithms` table with the full 1000 algorithm dataset.
 * Inserts in batches to avoid request size limits.
 */
async function seedComprehensive() {
    console.log("🔄 Starting comprehensive seed of 1000 algorithms...");

    // Optional: clear existing rows for a clean seed
    const { error: deleteError } = await supabase.from("algorithms").delete().neq("id", "");
    if (deleteError) {
        console.warn("⚠️ Could not clear existing rows (may be fine if table is empty):", deleteError.message);
    } else {
        console.log("🗑️ Existing rows cleared.");
    }

    const batchSize = 200;
    for (let i = 0; i < ALL_1000_ALGORITHMS.length; i += batchSize) {
        const batch = ALL_1000_ALGORITHMS.slice(i, i + batchSize);
        const { data, error } = await supabase.from("algorithms").insert(batch).select();
        if (error) {
            console.error(`❌ Error inserting batch ${i / batchSize + 1}:`, error.message);
            throw error;
        }
        console.log(`✅ Inserted batch ${i / batchSize + 1} (${batch.length} rows).`);
    }

    console.log("✅ Database seeded with 1000 algorithms successfully!");
}

if (require.main === module) {
    seedComprehensive()
        .catch((e) => {
            console.error("❌ Seeding failed:", e);
            process.exit(1);
        })
        .finally(() => {
            // Close any open connections if needed (Supabase client uses fetch, no explicit close)
        });
}
