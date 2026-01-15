#!/usr/bin/env node

/**
 * Google OAuth Configuration Validator
 * This script helps diagnose redirect_uri_mismatch errors
 */

const fs = require('fs');
const path = require('path');

console.log('\n=== GOOGLE OAUTH REDIRECT URI VALIDATOR ===\n');

// Get environment variables
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');

console.log('1. Current Configuration:');
console.log('   - Dev Server URL: http://localhost:5173');
console.log('   - Expected Redirect: http://localhost:5173/dashboard');
console.log('   - Supabase Callback: https://tuhjfziufhfcjdvthaaj.supabase.co/auth/v1/callback');

console.log('\n2. URLs to Add in Google Cloud Console:');
console.log('   ┌─────────────────────────────────────────────┐');
console.log('   │ Authorized Redirect URIs (ADD BOTH):         │');
console.log('   ├─────────────────────────────────────────────┤');
console.log('   │ http://localhost:5173/dashboard              │');
console.log('   │                                               │');
console.log('   │ https://tuhjfziufhfcjdvthaaj.supabase.co/    │');
console.log('   │ auth/v1/callback                              │');
console.log('   └─────────────────────────────────────────────┘');

console.log('\n3. Steps to Fix:');
console.log('   Step 1: Go to https://console.cloud.google.com/apis/credentials');
console.log('   Step 2: Click your OAuth 2.0 Client ID (Web application)');
console.log('   Step 3: Scroll to "Authorized redirect URIs"');
console.log('   Step 4: Remove ALL existing URIs');
console.log('   Step 5: Add the two URIs shown above');
console.log('   Step 6: Click SAVE');
console.log('   Step 7: Copy Client ID and Client Secret');
console.log('   Step 8: Go to https://app.supabase.com/project/tuhjfziufhfcjdvthaaj/auth/providers');
console.log('   Step 9: Click Google provider');
console.log('   Step 10: Paste Client ID and Client Secret');
console.log('   Step 11: Click SAVE');
console.log('   Step 12: Test again at http://localhost:5173');

console.log('\n4. If Still Getting Error:');
console.log('   ✓ Clear browser cache (Ctrl+Shift+Delete)');
console.log('   ✓ Close dev server and restart (npm run dev)');
console.log('   ✓ Open Browser DevTools Console (F12) and check exact redirect URL');
console.log('   ✓ Make sure that URL is in Google credentials');

console.log('\n5. Browser Console Check:');
console.log('   When clicking "Sign up with Google", you should see in console:');
console.log('   "[Auth] Window origin: http://localhost:5173"');
console.log('   "[Auth] Redirect URL being sent to Google: http://localhost:5173/dashboard"');
console.log('   If you see a different URL, update Google credentials with that exact URL.\n');

