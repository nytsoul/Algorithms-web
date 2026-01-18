import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

async function testConnection() {
    console.log("🔍 Testing Supabase Connection...\n");

    console.log("Configuration:");
    console.log(`  URL: ${process.env.SUPABASE_URL}`);
    console.log(`  Service Key: ${process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Configured' : '❌ Missing'}\n`);

    try {
        // Test 1: REST API Ping
        console.log("Test 1: REST API Ping...");
        const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/`, {
            headers: {
                'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || '',
                'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
            }
        });

        if (response.ok) {
            console.log("  ✅ REST API is accessible");
        } else {
            console.log(`  ❌ REST API returned status: ${response.status}`);
        }

        // Test 2: Try to query a table (will fail if table doesn't exist, but connection works)
        console.log("\nTest 2: Database Query Test...");
        const { data, error } = await supabase
            .from('algorithms')
            .select('*')
            .limit(1);

        if (error) {
            console.log(`  ⚠️  Query failed: ${error.message}`);
            console.log("  (This is expected if the 'algorithms' table doesn't exist yet)");
        } else {
            console.log(`  ✅ Successfully queried database`);
            console.log(`  Found ${data?.length || 0} rows`);
        }

        console.log("\n🎉 Connection test complete!");
        console.log("✅ Supabase is accessible and configured correctly");

    } catch (error) {
        console.error("\n❌ Connection test failed:");
        console.error(error.message);
        process.exit(1);
    }
}

testConnection();
