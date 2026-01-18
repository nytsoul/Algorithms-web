/**
 * Export algorithms data to JSON for Supabase seeding
 * Run: npx tsx scripts/export-algorithms.ts
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

// This script should be run from the project root
// It exports algorithms data in a format suitable for Supabase seeding

const algorithmsData = {
    domains: [
        { id: 1, name: "DSA", description: "Data Structures & Algorithms - The foundation of CS" },
        { id: 2, name: "DAA", description: "Design & Analysis of Algorithms - Design patterns & efficiency" },
        { id: 3, name: "AI", description: "Artificial Intelligence - Decision-making & reasoning" },
        { id: 4, name: "ML", description: "Machine Learning - Patterns & predictions from data" },
        { id: 5, name: "Networks", description: "Computer Networks - Communication & reliability" },
        { id: 6, name: "Security", description: "Cryptography & Security - Protection & privacy" },
        { id: 7, name: "Systems", description: "OS & Distributed Systems - Hardware & coordination" },
        { id: 8, name: "Graphics", description: "Graphics & Vision - Visual computation & rendering" },
        { id: 9, name: "Optimization", description: "Optimization Algorithms - Best solutions under constraints" },
        { id: 10, name: "Emerging", description: "Emerging CS Domains - Future technologies" },
        { id: 11, name: "Theory", description: "Theoretical CS - Computability & complexity theory" }
    ]
};

const outputPath = join(process.cwd(), 'scripts', 'algorithms-export.json');
writeFileSync(outputPath, JSON.stringify(algorithmsData, null, 2));
console.log(`✅ Algorithms data exported to ${outputPath}`);

