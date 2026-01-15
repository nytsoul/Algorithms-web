import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY || process.env.VITE_SUPABASE_ANON_KEY;

console.log("Checking Supabase connection...");
console.log("URL:", supabaseUrl ? "Found" : "Missing");
console.log("Key:", supabaseKey ? "Found" : "Missing");

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase credentials. check your .env file.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    try {
        const { data, error } = await supabase.from("algorithms").select("count").limit(1);

        if (error) {
            console.error("❌ connection failed:", error.message);
            if (error.message.includes("does not exist")) {
                console.log("💡 The 'algorithms' table might not exist yet. Running seed might fix this.");
            }
        } else {
            console.log("✅ connected successfully to Supabase!");
            console.log("Data count check:", data);
        }
    } catch (err: any) {
        console.error("❌ An unexpected error occurred:", err.message);
    }
}

testConnection();
