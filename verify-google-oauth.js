#!/usr/bin/env node

/**
 * Verify Google OAuth Configuration
 * 
 * This script checks if your Supabase project has Google OAuth properly configured
 * Run with: node verify-google-oauth.js
 */

const https = require('https');
const url = require('url');

const SUPABASE_URL = 'https://tuhjfziufhfcjdvthaaj.supabase.co';
const ANON_KEY = 'sb_publishable_8qF1NDDhRrPz8EPbxHAJLA_nyaNURH6';

console.log('\n=== GOOGLE OAUTH VERIFICATION ===\n');

// Test 1: Check environment variables
console.log('1. Checking Configuration:');
if (!SUPABASE_URL || !ANON_KEY) {
  console.error('   ❌ Missing SUPABASE_URL or ANON_KEY');
  process.exit(1);
}
console.log('   ✅ Supabase URL:', SUPABASE_URL);
console.log('   ✅ Anon Key:', ANON_KEY.substring(0, 20) + '...');

// Test 2: Verify Supabase connection
console.log('\n2. Testing Supabase Connection:');
const testUrl = `${SUPABASE_URL}/rest/v1/algorithms?limit=1`;

const options = {
  headers: {
    'apikey': ANON_KEY,
    'Authorization': `Bearer ${ANON_KEY}`
  }
};

https.get(testUrl, options, (res) => {
  if (res.statusCode === 200 || res.statusCode === 401) {
    console.log('   ✅ Supabase connection OK (Status: ' + res.statusCode + ')');
  } else {
    console.error('   ❌ Unexpected status:', res.statusCode);
  }

  // Test 3: Provide Configuration Steps
  console.log('\n3. Google OAuth Setup Instructions:');
  console.log('\n   📋 Step 1: Create Google OAuth Credentials');
  console.log('      a. Go to: https://console.cloud.google.com');
  console.log('      b. Create a new project or select existing one');
  console.log('      c. Go to "APIs & Services" → "Credentials"');
  console.log('      d. Click "Create Credentials" → "OAuth 2.0 Client ID"');
  console.log('      e. Choose "Web application"');
  console.log('      f. Add authorized redirect URIs:');
  console.log('         - http://localhost:5173/dashboard');
  console.log('         - http://localhost:5173/auth');
  console.log('         - https://tuhjfziufhfcjdvthaaj.supabase.co/auth/v1/callback');
  console.log('      g. Copy your Client ID and Client Secret');

  console.log('\n   📋 Step 2: Configure Supabase');
  console.log('      a. Go to: https://app.supabase.com/project/tuhjfziufhfcjdvthaaj');
  console.log('      b. Navigate to: Authentication → Providers');
  console.log('      c. Find and enable "Google"');
  console.log('      d. Paste your Client ID and Client Secret');
  console.log('      e. Save changes');

  console.log('\n   📋 Step 3: Test Locally');
  console.log('      a. Run: pnpm run dev');
  console.log('      b. Go to: http://localhost:5173');
  console.log('      c. Click "Get Started"');
  console.log('      d. Click "Sign in with Google"');
  console.log('      e. Should redirect to Google login');

  console.log('\n4. Troubleshooting:');
  console.log('   - If Google button does nothing: OAuth not enabled in Supabase');
  console.log('   - If "Invalid Client" error: Wrong credentials in Supabase');
  console.log('   - If redirects to error: Missing redirect URI in Google Console');
  console.log('   - Check browser console for detailed error messages');

  console.log('\n5. Browser Console Debugging:');
  console.log('   When testing, open DevTools (F12) and look for:');
  console.log('   - "[Auth] Starting Google OAuth flow..." - Good sign');
  console.log('   - "[Auth] Session found: your-email@gmail.com" - Success!');
  console.log('   - "[Auth] Google Login Exception: ..." - Check the error message');

  console.log('\n=== END VERIFICATION ===\n');
}).on('error', (err) => {
  console.error('   ❌ Connection failed:', err.message);
  console.log('\n   Make sure you have internet connection and correct credentials');
});
