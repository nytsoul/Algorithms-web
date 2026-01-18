
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// Comprehensive check for Supabase configuration
const checkSupabaseConfig = () => {
    const isMissing = !supabaseUrl || !supabaseAnonKey;
    const isPlaceholder = supabaseUrl?.includes("YOUR_SUPABASE_URL") || supabaseAnonKey?.includes("YOUR_SUPABASE_ANON_KEY");
    const isMalformed = supabaseUrl && !supabaseUrl.startsWith('http');
    const isNewKeyFormat = supabaseAnonKey?.startsWith('sb_');

    if (isMissing) return { ready: false, reason: "Missing environment variables (VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY)" };
    if (isPlaceholder) return { ready: false, reason: "Default placeholders detected in environment variables" };
    if (isMalformed) return { ready: false, reason: "Malformed Supabase URL - must start with http/https" };

    if (isNewKeyFormat) {
        console.info("[Supabase] Detected new 'sb_' key format. Ensure your Supabase project supports this. If you see JWT errors, use the standard 'eyJ...' Anon key.");
    }

    return { ready: true, reason: "Configured" };
};

const configStatus = checkSupabaseConfig();
export const isSupabaseReady = configStatus.ready;
export const isSupabaseConfigured = isSupabaseReady; // Alias for backward compatibility
export const isSupabaseAvailable = () => isSupabaseReady; // Helper function alias
export const supabaseConfigReason = configStatus.reason;

// Create a real Supabase client if configured, otherwise use a placeholder
export const supabase = isSupabaseReady
    ? createClient(supabaseUrl!, supabaseAnonKey!)
    : createClient('https://placeholder.supabase.co', 'placeholder-key');

if (!isSupabaseReady) {
    console.warn(`[Supabase] Entering Demo Mode. Reason: ${supabaseConfigReason}`);
    console.warn("[Supabase] 💡 Fix: Update VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env and restart.");
} else {
    console.log("[Supabase] 🛡️ Configuration validated. Attempting connection...");

    // Proactive health check
    (async () => {
        try {
            const { error } = await supabase.from('algorithms').select('id', { count: 'exact', head: true }).limit(1);
            if (error) {
                if (error.code === 'PGRST116' || error.message.includes('relation') || error.message.includes('does not exist')) {
                    console.warn("[Supabase] ⚠️ Connection successful, but 'algorithms' table not found. Did you run the SQL schema?");
                } else if (error.code === '42501') {
                    console.warn("[Supabase] 🔐 Permission denied. Check your RLS policies.");
                } else {
                    console.error(`[Supabase] ❌ Connection error: ${error.message} (Code: ${error.code})`);
                }
            } else {
                console.log("[Supabase] ✅ Live connection verified. Database is reachable.");
            }
        } catch (err: any) {
            console.error("[Supabase] ❌ Unexpected connection error:", err.message);
        }
    })();
}

// Helper to get consistent redirect URLs
export const getRedirectUrl = (path: string = '/dashboard') => {
    const origin = window.location.origin;
    return `${origin}${path}`;
};
