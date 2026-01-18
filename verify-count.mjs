// Test script to verify algorithm count
import { COMPREHENSIVE_1000_PLUS_ALGORITHMS } from './src/lib/comprehensive-algorithms.ts';

console.log('=== ALGORITHM COUNT VERIFICATION ===');
console.log('Total algorithms:', COMPREHENSIVE_1000_PLUS_ALGORITHMS.length);

// Count by domain
const byDomain: Record<number, number> = {};
COMPREHENSIVE_1000_PLUS_ALGORITHMS.forEach(alg => {
  byDomain[alg.domainId] = (byDomain[alg.domainId] || 0) + 1;
});

console.log('\nBy Domain:');
Object.entries(byDomain).sort((a, b) => Number(b[1]) - Number(a[1])).forEach(([id, count]) => {
  console.log(`  Domain ${id}: ${count} algorithms`);
});

console.log('\n=== VERIFICATION COMPLETE ===');
