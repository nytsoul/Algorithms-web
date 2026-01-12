
import { createClient } from '@supabase/supabase-js';
import { ALL_1000_ALGORITHMS } from '../src/lib/all-algorithms';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('❌ Error: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function seedAlgorithms() {
    console.log('🚀 Starting algorithm seeding...');

    // Chunking to avoid large request errors
    const chunkSize = 50;
    for (let i = 0; i < ALL_1000_ALGORITHMS.length; i += chunkSize) {
        const chunk = ALL_1000_ALGORITHMS.slice(i, i + chunkSize).map(algo => ({
            id: parseInt(algo._id),
            name: algo.name,
            slug: algo.slug,
            description: algo.description,
            category: algo.category,
            domain: algo.domain,
            domain_id: algo.domainId,
            difficulty: algo.difficulty,
            paradigm: algo.paradigm,
            tags: algo.tags,
            time_complexity: algo.timeComplexity,
            space_complexity: algo.spaceComplexity,
            implementation: algo.implementation,
            pseudocode: algo.pseudocode,
            intuition: algo.intuition,
            visualization_type: algo.visualizationType,
            applications: algo.applications,
            advantages: algo.advantages,
            disadvantages: algo.disadvantages,
            related_algorithms: algo.relatedAlgorithms,
            use_cases: algo.useCases,
            real_world_examples: algo.realWorldExamples
        }));

        const { error } = await supabase
            .from('algorithms')
            .upsert(chunk, { onConflict: 'slug' });

        if (error) {
            console.error(`❌ Error seeding chunk ${i / chunkSize + 1}:`, error.message);
        } else {
            console.log(`✅ Seeded chunk ${i / chunkSize + 1} (${i + chunk.length}/1000)`);
        }
    }

    console.log('🎉 Seeding complete!');
}

seedAlgorithms();
