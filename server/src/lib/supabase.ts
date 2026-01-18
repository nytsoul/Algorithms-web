import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

// Ensure env vars are loaded before creating the client.
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config();

const supabaseUrl =
  process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_ANON_KEY ??
  process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("SUPABASE_URL (or VITE_SUPABASE_URL) is required");
}

if (!supabaseKey) {
  throw new Error(
    "SUPABASE_SERVICE_ROLE_KEY/SUPABASE_ANON_KEY (or VITE_SUPABASE_ANON_KEY) is required"
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
