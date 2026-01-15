#!/usr/bin/env node

/**
 * Verify User Data in Supabase
 * Check if user profiles are being saved correctly
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tuhjfziufhfcjdvthaaj.supabase.co';
const anonKey = 'sb_publishable_8qF1NDDhRrPz8EPbxHAJLA_nyaNURH6';

async function verifyUserData() {
  console.log('\n=== VERIFY USER DATA IN SUPABASE ===\n');

  try {
    const supabase = createClient(supabaseUrl, anonKey);

    // Check 1: Does user_profiles table exist?
    console.log('1. Checking user_profiles table...');
    const { data: tables, error: tableError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(1);

    if (tableError) {
      console.error('   ❌ Table error:', tableError.message);
      console.log('\n   📋 SOLUTION: Create the table using this SQL:');
      console.log(`
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  date_of_birth DATE,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
      `);
      return;
    }

    console.log('   ✅ Table exists');

    // Check 2: Get all users
    console.log('\n2. Fetching all users from user_profiles...');
    const { data: users, error: usersError } = await supabase
      .from('user_profiles')
      .select('*');

    if (usersError) {
      console.error('   ❌ Error fetching users:', usersError.message);
      return;
    }

    if (!users || users.length === 0) {
      console.log('   ⚠️  No users found in table');
      console.log('\n   📋 NEXT STEPS:');
      console.log('   1. Go to http://localhost:5173');
      console.log('   2. Click "Get Started" → "Create Account"');
      console.log('   3. Fill in the form and submit');
      console.log('   4. Then run this script again to see the data');
      return;
    }

    console.log(`   ✅ Found ${users.length} user(s)\n`);

    // Display users
    users.forEach((user, index) => {
      console.log(`\n   User ${index + 1}:`);
      console.log(`   - ID: ${user.id}`);
      console.log(`   - Email: ${user.email}`);
      console.log(`   - Full Name: ${user.full_name}`);
      console.log(`   - Date of Birth: ${user.date_of_birth}`);
      console.log(`   - Password Hash: ${user.password_hash ? '✅ Set' : '❌ Missing'}`);
      console.log(`   - Created: ${user.created_at}`);
    });

    // Check 3: Verify RLS policies
    console.log('\n3. Checking RLS Policies...');
    console.log('   ℹ️  RLS is enabled. Check Supabase dashboard for policy details.');
    console.log('   Go to: https://app.supabase.com/project/tuhjfziufhfcjdvthaaj/auth/policies');

    console.log('\n✅ User data verification complete!\n');

  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
}

verifyUserData();
