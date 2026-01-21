import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;


if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    console.error('Required: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function applyUserAuthSchema() {
    console.log('🚀 Starting user authentication schema migration...\n');

    try {
        // Read the schema file
        const schemaPath = path.join(__dirname, '..', 'supabase-schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf-8');

        console.log('📄 Schema file loaded successfully');
        console.log('📊 Applying schema to Supabase...\n');

        // Execute the schema
        // Note: Supabase client doesn't support raw SQL execution directly
        // You need to run this in the Supabase SQL Editor or use the REST API

        console.log('⚠️  IMPORTANT: Supabase JS client cannot execute DDL statements directly.');
        console.log('');
        console.log('Please follow these steps:');
        console.log('');
        console.log('1. Open your Supabase Dashboard:');
        console.log(`   ${supabaseUrl.replace('.supabase.co', '.supabase.co/project/_/sql')}`);
        console.log('');
        console.log('2. Navigate to: SQL Editor → New Query');
        console.log('');
        console.log('3. Copy and paste the contents of: supabase-schema.sql');
        console.log('');
        console.log('4. Click "Run" to execute the schema');
        console.log('');
        console.log('✅ After running, the following tables will be created:');
        console.log('   - user_profiles (for storing user account data)');
        console.log('   - user_settings (for storing user preferences)');
        console.log('');

        // Verify if tables exist (this will work after manual schema application)
        console.log('🔍 Checking if tables already exist...\n');

        const { data: profiles, error: profileError } = await supabase
            .from('user_profiles')
            .select('id')
            .limit(1);

        const { data: settings, error: settingsError } = await supabase
            .from('user_settings')
            .select('id')
            .limit(1);

        if (!profileError && !settingsError) {
            console.log('✅ Tables already exist! Schema is ready.');
            console.log('');
            console.log('📋 Existing data:');

            const { count: profileCount } = await supabase
                .from('user_profiles')
                .select('*', { count: 'exact', head: true });

            console.log(`   - user_profiles: ${profileCount || 0} records`);

            const { count: settingsCount } = await supabase
                .from('user_settings')
                .select('*', { count: 'exact', head: true });

            console.log(`   - user_settings: ${settingsCount || 0} records`);
            console.log('');
            console.log('🎉 Your Google OAuth login is ready to use!');
        } else {
            console.log('⚠️  Tables not found. Please run the schema in Supabase SQL Editor first.');
            console.log('');
            console.log('Error details:');
            if (profileError) console.log(`   - user_profiles: ${profileError.message}`);
            if (settingsError) console.log(`   - user_settings: ${settingsError.message}`);
        }

    } catch (error: any) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

applyUserAuthSchema();
