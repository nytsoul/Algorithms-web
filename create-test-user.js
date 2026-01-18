#!/usr/bin/env node

/**
 * Create a test user account in Supabase for email/password login testing
 * Usage: node create-test-user.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = 'https://tuhjfziufhfcjdvthaaj.supabase.co';
const supabaseKey = 'sb_publishable_8qF1NDDhRrPz8EPbxHAJLA_nyaNURH6'; // This is the anon key
const serviceKey = process.env.SUPABASE_SERVICE_KEY; // You might need the service role key

async function createTestUser() {
  console.log('\n=== Creating Test User Account ===\n');

  if (!serviceKey) {
    console.log('⚠️  Service Role Key not found in environment variables.');
    console.log('\n📋 Test Credentials to Use:');
    console.log('   Email: test@algoverse.local');
    console.log('   Password: TestPassword123!');
    console.log('\n📌 Manual Setup Instructions:');
    console.log('   1. Go to: https://app.supabase.com/project/tuhjfziufhfcjdvthaaj');
    console.log('   2. Click: Authentication → Users');
    console.log('   3. Click: + Add user');
    console.log('   4. Enter:');
    console.log('      Email: test@algoverse.local');
    console.log('      Password: TestPassword123!');
    console.log('   5. Click: Create user');
    console.log('   6. Then test login in your app');
    console.log('\n✅ After creating, use these credentials to login:\n');
    return;
  }

  try {
    const supabase = createClient(supabaseUrl, serviceKey);

    const testEmail = 'test@algoverse.local';
    const testPassword = 'TestPassword123!';

    console.log('Creating test user with:');
    console.log(`  Email: ${testEmail}`);
    console.log(`  Password: ${testPassword}`);

    const { data, error } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true,
      user_metadata: {
        full_name: 'Test User',
        avatar_url: null
      }
    });

    if (error) {
      console.error('❌ Error creating user:', error.message);
      if (error.message.includes('already exists')) {
        console.log('\n✅ User already exists! You can use these credentials:');
        console.log(`   Email: ${testEmail}`);
        console.log(`   Password: ${testPassword}`);
      }
      return;
    }

    console.log('\n✅ Test user created successfully!');
    console.log('\nUse these credentials to login:');
    console.log(`   Email: ${testEmail}`);
    console.log(`   Password: ${testPassword}`);
    console.log('\n📱 How to test:');
    console.log('   1. Go to http://localhost:5173');
    console.log('   2. Click "Get Started"');
    console.log('   3. Click "Login" tab');
    console.log('   4. Enter the email and password above');
    console.log('   5. Should login and see dashboard');

  } catch (err) {
    console.error('❌ Exception:', err.message);
  }
}

createTestUser();
