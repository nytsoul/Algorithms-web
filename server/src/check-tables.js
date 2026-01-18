require('dotenv').config({ path: '../.env' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function listTables() {
    console.log('🔍 Checking Supabase tables...\n');
    
    // Try to query the algorithms table
    const { data, error } = await supabase
        .from('algorithms')
        .select('id')
        .limit(1);
    
    if (error) {
        console.error('❌ algorithms table:', error.message);
        console.log('\n📝 You need to create the table in Supabase SQL Editor');
        console.log(`🔗 Open: ${supabaseUrl.replace('https://', 'https://supabase.com/dashboard/project/')}/sql\n`);
        console.log('Copy and paste the SQL from: supabase-schema.sql');
    } else {
        console.log('✅ algorithms table exists');
        console.log(`📊 Current record count: ${data ? data.length : 0}`);
    }
}

listTables().catch(console.error);
