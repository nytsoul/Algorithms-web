#!/usr/bin/env node

/**
 * Set up user_profiles table in Supabase
 * This creates the table for storing user credentials and profile info
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = 'https://tuhjfziufhfcjdvthaaj.supabase.co';
const serviceKey = process.env.SUPABASE_SERVICE_KEY;

if (!serviceKey) {
  console.log('\n❌ SUPABASE_SERVICE_KEY not found in environment');
  console.log('\n📋 Manual Setup Instructions:');
  console.log('1. Go to: https://app.supabase.com/project/tuhjfziufhfcjdvthaaj/sql/new');
  console.log('2. Copy the SQL from: schema-user-profiles.sql');
  console.log('3. Paste and run it in Supabase SQL Editor');
  console.log('4. Done!\n');
  process.exit(1);
}

async function setupUserProfiles() {
  console.log('\n=== Setting Up User Profiles Table ===\n');

  try {
    const supabase = createClient(supabaseUrl, serviceKey);

    // Create the table via raw SQL
    const sql = `
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

      CREATE POLICY "Users can view own profile" ON public.user_profiles
        FOR SELECT USING (true);

      CREATE POLICY "Users can insert own profile" ON public.user_profiles
        FOR INSERT WITH CHECK (true);

      CREATE POLICY "Users can update own profile" ON public.user_profiles
        FOR UPDATE USING (true);

      CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
    `;

    const { error } = await supabase.rpc('exec', { sql });

    if (error) {
      console.error('❌ Error:', error.message);
      return;
    }

    console.log('✅ User profiles table created successfully!\n');
    console.log('📊 Table Structure:');
    console.log('  - id: UUID (primary key)');
    console.log('  - email: TEXT (unique)');
    console.log('  - password_hash: TEXT');
    console.log('  - date_of_birth: DATE');
    console.log('  - full_name: TEXT');
    console.log('  - created_at: TIMESTAMP');
    console.log('  - updated_at: TIMESTAMP\n');

  } catch (err) {
    console.error('❌ Exception:', err.message);
  }
}

setupUserProfiles();
