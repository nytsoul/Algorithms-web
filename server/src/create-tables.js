require('dotenv').config({ path: '../.env' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTables() {
    console.log('🏗️  Creating Supabase tables...\n');
    
    // Read schema file
    const schemaPath = path.join(__dirname, '..', '..', 'supabase-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split into individual statements (simple split on semicolons)
    const statements = schema
        .split(';')
        .map(s => s.trim())
        .filter(s => s && !s.startsWith('--'));
    
    console.log(`📄 Found ${statements.length} SQL statements\n`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        if (!statement) continue;
        
        console.log(`▶️  Executing statement ${i + 1}/${statements.length}...`);
        
        try {
            const { data, error } = await supabase.rpc('exec_sql', { sql: statement });
            
            if (error) {
                // Try direct execution if RPC fails
                console.log('⚠️  RPC failed, trying direct execution...');
                const { error: directError } = await supabase.from('_sql').insert({ query: statement });
                
                if (directError) {
                    console.error(`❌ Error:`, directError.message);
                    console.log(`Statement: ${statement.substring(0, 100)}...`);
                    console.log('');
                }
            } else {
                console.log(`✅ Success`);
            }
        } catch (err) {
            console.error(`❌ Exception:`, err.message);
        }
    }
    
    console.log('\n✅ Schema creation complete!');
    console.log('Note: If you see errors, you may need to run the SQL statements');
    console.log('directly in the Supabase SQL Editor at:');
    console.log(`${supabaseUrl.replace('https://', 'https://supabase.com/dashboard/project/')}/sql`);
}

createTables().catch(console.error);
