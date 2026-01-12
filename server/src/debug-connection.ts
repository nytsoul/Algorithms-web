
import dotenv from 'dotenv';
import path from 'path';
import fetch from 'node-fetch';
import https from 'https';

// Load env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('--- Network Diagnostic ---');
console.log(`Node Version: ${process.version}`);
console.log(`Supabase URL: ${supabaseUrl}`);
console.log(`Supabase Key Provided: ${!!supabaseKey}`);

async function testUrl(url: string, name: string) {
    console.log(`\nTesting ${name} (${url})...`);
    try {
        const start = Date.now();
        const res = await fetch(url, {
            timeout: 5000,
            headers: { 'User-Agent': 'Diagnostic/1.0' }
        });
        const duration = Date.now() - start;
        console.log(`✅ ${name}: Connected in ${duration}ms (Status: ${res.status})`);
        return true;
    } catch (err: any) {
        console.error(`❌ ${name} Failed:`, err.message);
        if (err.code) console.error(`   Code: ${err.code}`);
        if (err.cause) console.error(`   Cause:`, err.cause);
        return false;
    }
}

async function run() {
    // 1. Test General Internet
    await testUrl('https://www.google.com', 'Google (Connectivity Check)');

    // 2. Test Supabase URL with custom Agent (ignore SSL errors option)
    if (supabaseUrl) {
        // Test basic fetch
        await testUrl(supabaseUrl, 'Supabase Root (Basic Fetch)');

        // Test REST endpoint
        const restUrl = `${supabaseUrl}/rest/v1/algorithms?select=id&limit=1`;
        console.log(`\nTesting Supabase REST API (${restUrl})...`);
        try {
            const res = await fetch(restUrl, {
                headers: {
                    'apikey': supabaseKey || '',
                    'Authorization': `Bearer ${supabaseKey}`
                }
            });
            console.log(`Supabase Response Status: ${res.status}`);
            const text = await res.text();
            console.log(`Snapshot: ${text.substring(0, 100)}`);
        } catch (error: any) {
            console.error(`❌ Supabase REST Failed:`, error.message);
        }
    }
}

run().catch(console.error);
