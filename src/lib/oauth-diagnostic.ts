import { supabase, isSupabaseConfigured } from "@/lib/supabase";

/**
 * Test Google OAuth configuration and provide diagnostics
 */
export async function testGoogleOAuth() {
  console.log("\n=== GOOGLE OAUTH DIAGNOSTIC TEST ===\n");

  // Test 1: Supabase Configuration
  console.log("1. Supabase Configuration:");
  console.log("   - isSupabaseConfigured:", isSupabaseConfigured);
  console.log("   - Project URL:", import.meta.env.VITE_SUPABASE_URL);
  console.log("   - Anon Key Format:", import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + "...");

  // Test 2: Check OAuth Providers
  console.log("\n2. Checking OAuth Providers:");
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("   ❌ Session check failed:", error.message);
    } else {
      console.log("   ✅ Session check OK");
      console.log("   - Current session:", data?.session ? "Active" : "None");
    }
  } catch (err) {
    console.error("   ❌ Exception:", err);
  }

  // Test 3: Test OAuth Configuration
  console.log("\n3. OAuth Configuration Check:");
  console.log("   - Using getRedirectUrl()");
  const redirectUrl = window.location.origin + "/dashboard";
  console.log("   - Redirect URL:", redirectUrl);

  // Test 4: Check for URL parameters (OAuth callback)
  console.log("\n4. URL Parameters Check:");
  const params = new URLSearchParams(window.location.hash.substring(1));
  if (params.has("access_token")) {
    console.log("   ✅ OAuth callback detected!");
    console.log("   - Access token present:", params.get("access_token")?.substring(0, 20) + "...");
  } else {
    console.log("   - No OAuth callback parameters");
  }

  // Test 5: Recommendations
  console.log("\n5. Diagnostics & Recommendations:");
  if (!isSupabaseConfigured) {
    console.error("   ❌ Supabase not configured. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY");
  } else {
    console.log("   ✅ Supabase is configured");
    console.log("\n   Next Steps:");
    console.log("   1. Verify Google OAuth is enabled in Supabase dashboard:");
    console.log("      → https://app.supabase.com/project/tuhjfziufhfcjdvthaaj/auth/providers");
    console.log("   2. Ensure Client ID and Secret are configured");
    console.log("   3. Add redirect URL to Google Cloud Console:");
    console.log("      → " + redirectUrl);
    console.log("   4. Check browser console for auth state changes");
  }

  console.log("\n=== END DIAGNOSTIC TEST ===\n");
}

export default testGoogleOAuth;
