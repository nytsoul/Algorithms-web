// ============================================
// ADDITIONAL SEARCHING ALGORITHMS
// ============================================

import type { AlgorithmStep } from '@/types/visualization-types';
import { algorithmGenerators } from './algorithm-generators';

/**
 * Exponential Search
 * Works by finding the range where the element may be present and then performing binary search.
 */
export function generateExponentialSearchSteps(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = array.length;
    let comparisons = 0;

    steps.push({
        id: 'init',
        description: `Starting Exponential Search for target ${target}`,
        data: { array, target, found: false, comparisons }
    });

    if (array[0] === target) {
        comparisons++;
        steps.push({
            id: 'found-0',
            description: `✅ Target ${target} found at index 0!`,
            highlightedIndices: [0],
            data: { array, target, found: true, index: 0, comparisons }
        });
        return steps;
    }

    let i = 1;
    comparisons++;
    while (i < n && array[i] <= target) {
        steps.push({
            id: `range-check-${i}`,
            description: `Checking range: index ${i}, value ${array[i]} <= ${target}`,
            highlightedIndices: [i],
            data: { array, target, i, comparisons }
        });
        i = i * 2;
        comparisons++;
    }

    const low = i / 2;
    const high = Math.min(i, n - 1);

    steps.push({
        id: 'binary-search-start',
        description: `Target in range [${low}, ${high}]. Starting Binary Search...`,
        data: { array, target, low, high, comparisons }
    });

    // Use binary search logic
    let left = low;
    let right = high;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        comparisons++;

        steps.push({
            id: `bs-compare-${mid}`,
            description: `Binary Search: Comparing array[${mid}] = ${array[mid]} with target ${target}`,
            comparedIndices: [mid],
            data: { array, target, low, high, mid, comparisons }
        });

        if (array[mid] === target) {
            steps.push({
                id: `found-${mid}`,
                description: `✅ Target ${target} found at index ${mid}!`,
                highlightedIndices: [mid],
                data: { array, target, found: true, index: mid, comparisons }
            });
            return steps;
        } else if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    steps.push({
        id: 'not-found',
        description: `❌ Target ${target} not found in the array`,
        data: { array, target, found: false, comparisons }
    });

    return steps;
}

/**
 * Fibonacci Search
 * A comparison-based technique that uses Fibonacci numbers to search an element in a sorted array.
 */
export function generateFibonacciSearchSteps(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = array.length;
    let comparisons = 0;

    let fibM2 = 0; // (m-2)'th Fibonacci No.
    let fibM1 = 1; // (m-1)'th Fibonacci No.
    let fibM = fibM2 + fibM1; // m'th Fibonacci No.

    while (fibM < n) {
        fibM2 = fibM1;
        fibM1 = fibM;
        fibM = fibM2 + fibM1;
    }

    let offset = -1;

    steps.push({
        id: 'init',
        description: `Starting Fibonacci Search. Initializing Fibonacci numbers: fibM=${fibM}`,
        data: { array, target, fibM, found: false, comparisons }
    });

    while (fibM > 1) {
        const i = Math.min(offset + fibM2, n - 1);
        comparisons++;

        steps.push({
            id: `compare-${i}`,
            description: `Comparing array[${i}] = ${array[i]} with target ${target}`,
            comparedIndices: [i],
            data: { array, target, i, offset, fibM, comparisons }
        });

        if (array[i] < target) {
            fibM = fibM1;
            fibM1 = fibM2;
            fibM2 = fibM - fibM1;
            offset = i;
            steps.push({
                id: `move-right-${i}`,
                description: `${array[i]} < ${target}, moving offset to ${i}`,
                data: { array, target, offset, fibM, comparisons }
            });
        } else if (array[i] > target) {
            fibM = fibM2;
            fibM1 = fibM1 - fibM2;
            fibM2 = fibM - fibM1;
            steps.push({
                id: `move-left-${i}`,
                description: `${array[i]} > ${target}, decreasing Fibonacci range`,
                data: { array, target, offset, fibM, comparisons }
            });
        } else {
            steps.push({
                id: `found-${i}`,
                description: `✅ Target ${target} found at index ${i}!`,
                highlightedIndices: [i],
                data: { array, target, found: true, index: i, comparisons }
            });
            return steps;
        }
    }

    if (fibM1 && array[offset + 1] === target) {
        comparisons++;
        steps.push({
            id: `found-last`,
            description: `✅ Target ${target} found at index ${offset + 1}!`,
            highlightedIndices: [offset + 1],
            data: { array, target, found: true, index: offset + 1, comparisons }
        });
        return steps;
    }

    steps.push({
        id: 'not-found',
        description: `❌ Target ${target} not found in the array`,
        data: { array, target, found: false, comparisons }
    });

    return steps;
}

export const searchingGenerators = {
    exponentialSearch: generateExponentialSearchSteps,
    fibonacciSearch: generateFibonacciSearchSteps,
    hashSearch: generateHashSearchSteps,
};

/**
 * Hash-Based Search
 */
export function generateHashSearchSteps(arr: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const size = 10;
    const table: (number | null)[] = new Array(size).fill(null);
    arr.forEach(num => {
        let h = num % size;
        while (table[h] !== null) h = (h + 1) % size;
        table[h] = num;
    });

    steps.push({
        id: 'init',
        description: `Searching for ${target} in Hash Table (Size: ${size}). H(x) = x % ${size}`,
        data: { table: [...table], target }
    });

    let h = target % size;
    let originalH = h;
    let found = false;
    do {
        steps.push({
            id: `check-${h}`,
            description: `Checking index ${h}. Value: ${table[h]}`,
            currentIndex: h,
            data: { table: [...table], target }
        });
        if (table[h] === target) { found = true; break; }
        if (table[h] === null) break;
        h = (h + 1) % size;
    } while (h !== originalH);

    steps.push({
        id: 'complete',
        description: found ? `✅ Found at index ${h}!` : `❌ Not found.`,
        data: { finished: true, found }
    });

    return steps;
}

