// ============================================
// COMPREHENSIVE ALGORITHM IMPLEMENTATIONS
// ============================================
// This file contains step generation functions for all DSA algorithms
// Each function returns an array of AlgorithmStep objects

import type { AlgorithmStep } from '@/types/visualization-types';

// ============================================
// SEARCHING ALGORITHMS
// ============================================

export function generateJumpSearchSteps(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = array.length;
    const jumpSize = Math.floor(Math.sqrt(n));
    let prev = 0;
    let comparisons = 0;

    steps.push({
        id: 'init',
        description: `Jump Search: Jump size = √${n} = ${jumpSize}`,
        data: { array, target, prev, jumpSize, found: false, comparisons }
    });

    // Jump through blocks
    while (prev < n && array[Math.min(jumpSize, n) - 1] < target) {
        comparisons++;
        steps.push({
            id: `jump-${prev}`,
            description: `Checking block ending at index ${Math.min(prev + jumpSize, n) - 1}`,
            highlightedIndices: [Math.min(prev + jumpSize, n) - 1],
            data: { array, target, prev, jumpSize, comparisons }
        });

        prev += jumpSize;
        if (prev >= n) {
            steps.push({
                id: 'not-found',
                description: `❌ Target ${target} not found`,
                data: { array, target, found: false, comparisons }
            });
            return steps;
        }
    }

    // Linear search in identified block
    for (let i = prev; i < Math.min(prev + jumpSize, n); i++) {
        comparisons++;
        steps.push({
            id: `linear-${i}`,
            description: `Linear search in block: checking array[${i}] = ${array[i]}`,
            currentIndex: i,
            comparedIndices: [i],
            data: { array, target, comparisons }
        });

        if (array[i] === target) {
            steps.push({
                id: `found-${i}`,
                description: `✅ Target ${target} found at index ${i}!`,
                highlightedIndices: [i],
                data: { array, target, found: true, index: i, comparisons }
            });
            return steps;
        }
    }

    steps.push({
        id: 'not-found',
        description: `❌ Target ${target} not found`,
        data: { array, target, found: false, comparisons }
    });

    return steps;
}

export function generateInterpolationSearchSteps(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    let low = 0;
    let high = array.length - 1;
    let comparisons = 0;

    steps.push({
        id: 'init',
        description: `Interpolation Search: Using formula to estimate position`,
        data: { array, target, low, high, found: false, comparisons }
    });

    while (low <= high && target >= array[low] && target <= array[high]) {
        if (low === high) {
            comparisons++;
            if (array[low] === target) {
                steps.push({
                    id: 'found',
                    description: `✅ Found at index ${low}`,
                    highlightedIndices: [low],
                    data: { array, target, found: true, index: low, comparisons }
                });
            } else {
                steps.push({
                    id: 'not-found',
                    description: `❌ Not found`,
                    data: { array, target, found: false, comparisons }
                });
            }
            return steps;
        }

        // Interpolation formula
        const pos = low + Math.floor(
            ((target - array[low]) * (high - low)) / (array[high] - array[low])
        );

        steps.push({
            id: `calc-pos-${comparisons}`,
            description: `Calculated position: ${pos} using interpolation formula`,
            highlightedIndices: [pos],
            data: { array, target, low, high, pos, comparisons }
        });

        comparisons++;
        if (array[pos] === target) {
            steps.push({
                id: 'found',
                description: `✅ Found at index ${pos}`,
                highlightedIndices: [pos],
                data: { array, target, found: true, index: pos, comparisons }
            });
            return steps;
        }

        if (array[pos] < target) {
            low = pos + 1;
            steps.push({
                id: `move-right-${comparisons}`,
                description: `${array[pos]} < ${target}, search right (low = ${low})`,
                data: { array, target, low, high, comparisons }
            });
        } else {
            high = pos - 1;
            steps.push({
                id: `move-left-${comparisons}`,
                description: `${array[pos]} > ${target}, search left (high = ${high})`,
                data: { array, target, low, high, comparisons }
            });
        }
    }

    steps.push({
        id: 'not-found',
        description: `❌ Target ${target} not found`,
        data: { array, target, found: false, comparisons }
    });

    return steps;
}

export function generateTernarySearchSteps(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    let low = 0;
    let high = array.length - 1;
    let comparisons = 0;

    steps.push({
        id: 'init',
        description: `Ternary Search: Dividing array into 3 parts`,
        data: { array, target, low, high, found: false, comparisons }
    });

    while (low <= high) {
        const mid1 = low + Math.floor((high - low) / 3);
        const mid2 = high - Math.floor((high - low) / 3);

        steps.push({
            id: `calc-mids-${comparisons}`,
            description: `mid1 = ${mid1}, mid2 = ${mid2}`,
            highlightedIndices: [mid1, mid2],
            data: { array, target, low, high, mid1, mid2, comparisons }
        });

        comparisons++;
        if (array[mid1] === target) {
            steps.push({
                id: 'found',
                description: `✅ Found at mid1 = ${mid1}`,
                highlightedIndices: [mid1],
                data: { array, target, found: true, index: mid1, comparisons }
            });
            return steps;
        }

        comparisons++;
        if (array[mid2] === target) {
            steps.push({
                id: 'found',
                description: `✅ Found at mid2 = ${mid2}`,
                highlightedIndices: [mid2],
                data: { array, target, found: true, index: mid2, comparisons }
            });
            return steps;
        }

        if (target < array[mid1]) {
            high = mid1 - 1;
            steps.push({
                id: `search-left-${comparisons}`,
                description: `Search left third (high = ${high})`,
                data: { array, target, low, high, comparisons }
            });
        } else if (target > array[mid2]) {
            low = mid2 + 1;
            steps.push({
                id: `search-right-${comparisons}`,
                description: `Search right third (low = ${low})`,
                data: { array, target, low, high, comparisons }
            });
        } else {
            low = mid1 + 1;
            high = mid2 - 1;
            steps.push({
                id: `search-middle-${comparisons}`,
                description: `Search middle third`,
                data: { array, target, low, high, comparisons }
            });
        }
    }

    steps.push({
        id: 'not-found',
        description: `❌ Not found`,
        data: { array, target, found: false, comparisons }
    });

    return steps;
}

// ============================================
// SORTING ALGORITHMS
// ============================================

export function generateBubbleSortSteps(array: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const arr = [...array];
    const n = arr.length;
    let swaps = 0;
    let comparisons = 0;

    steps.push({
        id: 'init',
        description: 'Starting Bubble Sort',
        data: { array: [...arr], swaps, comparisons }
    });

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        steps.push({
            id: `pass-${i}`,
            description: `Pass ${i + 1}: Bubbling largest element to position ${n - i - 1}`,
            data: { array: [...arr], pass: i, swaps, comparisons }
        });

        for (let j = 0; j < n - i - 1; j++) {
            comparisons++;

            steps.push({
                id: `compare-${i}-${j}`,
                description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
                comparedIndices: [j, j + 1],
                data: { array: [...arr], swaps, comparisons }
            });

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swaps++;
                swapped = true;

                steps.push({
                    id: `swap-${i}-${j}`,
                    description: `Swapped ${arr[j + 1]} and ${arr[j]}`,
                    swappedIndices: [j, j + 1],
                    data: { array: [...arr], swaps, comparisons }
                });
            }
        }

        steps.push({
            id: `sorted-${i}`,
            description: `Element at position ${n - i - 1} is now sorted`,
            sortedIndices: Array.from({ length: i + 1 }, (_, k) => n - k - 1),
            data: { array: [...arr], swaps, comparisons }
        });

        if (!swapped) {
            steps.push({
                id: 'early-exit',
                description: 'No swaps in this pass - array is sorted!',
                sortedIndices: Array.from({ length: n }, (_, k) => k),
                data: { array: [...arr], swaps, comparisons }
            });
            break;
        }
    }

    steps.push({
        id: 'complete',
        description: '✅ Bubble Sort Complete!',
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        data: { array: [...arr], swaps, comparisons, sorted: true }
    });

    return steps;
}

export function generateQuickSortSteps(array: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const arr = [...array];
    let swaps = 0;
    let comparisons = 0;

    steps.push({
        id: 'init',
        description: 'Starting Quick Sort',
        data: { array: [...arr], swaps, comparisons }
    });

    function partition(low: number, high: number): number {
        const pivot = arr[high];

        steps.push({
            id: `pivot-${low}-${high}`,
            description: `Pivot = ${pivot} at index ${high}`,
            highlightedIndices: [high],
            data: { array: [...arr], pivot, low, high, swaps, comparisons }
        });

        let i = low - 1;

        for (let j = low; j < high; j++) {
            comparisons++;

            steps.push({
                id: `compare-${j}`,
                description: `Comparing ${arr[j]} with pivot ${pivot}`,
                comparedIndices: [j, high],
                data: { array: [...arr], swaps, comparisons }
            });

            if (arr[j] < pivot) {
                i++;
                if (i !== j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    swaps++;

                    steps.push({
                        id: `swap-${i}-${j}`,
                        description: `Swapped ${arr[j]} and ${arr[i]}`,
                        swappedIndices: [i, j],
                        data: { array: [...arr], swaps, comparisons }
                    });
                }
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        swaps++;

        steps.push({
            id: `place-pivot-${i + 1}`,
            description: `Placed pivot ${pivot} at correct position ${i + 1}`,
            sortedIndices: [i + 1],
            data: { array: [...arr], swaps, comparisons }
        });

        return i + 1;
    }

    function quickSort(low: number, high: number) {
        if (low < high) {
            const pi = partition(low, high);
            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
        }
    }

    quickSort(0, arr.length - 1);

    steps.push({
        id: 'complete',
        description: '✅ Quick Sort Complete!',
        sortedIndices: Array.from({ length: arr.length }, (_, k) => k),
        data: { array: [...arr], swaps, comparisons, sorted: true }
    });

    return steps;
}

export function generateMergeSortSteps(array: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const arr = [...array];
    let comparisons = 0;

    steps.push({
        id: 'init',
        description: 'Starting Merge Sort - Divide and Conquer',
        data: { array: [...arr], comparisons }
    });

    function merge(left: number, mid: number, right: number) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);

        steps.push({
            id: `merge-${left}-${mid}-${right}`,
            description: `Merging subarrays [${left}..${mid}] and [${mid + 1}..${right}]`,
            highlightedIndices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
            data: { array: [...arr], left, mid, right, comparisons }
        });

        let i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
            comparisons++;
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }

            steps.push({
                id: `place-${k}`,
                description: `Placed ${arr[k]} at position ${k}`,
                currentIndex: k,
                data: { array: [...arr], comparisons }
            });

            k++;
        }

        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }

        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }

        steps.push({
            id: `merged-${left}-${right}`,
            description: `Merged subarray [${left}..${right}]`,
            sortedIndices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
            data: { array: [...arr], comparisons }
        });
    }

    function mergeSort(left: number, right: number) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);

            steps.push({
                id: `divide-${left}-${right}`,
                description: `Dividing array [${left}..${right}] at mid = ${mid}`,
                data: { array: [...arr], left, mid, right, comparisons }
            });

            mergeSort(left, mid);
            mergeSort(mid + 1, right);
            merge(left, mid, right);
        }
    }

    mergeSort(0, arr.length - 1);

    steps.push({
        id: 'complete',
        description: '✅ Merge Sort Complete!',
        sortedIndices: Array.from({ length: arr.length }, (_, k) => k),
        data: { array: [...arr], comparisons, sorted: true }
    });

    return steps;
}

import { additionalGenerators } from './additional-algorithms';
import { searchingGenerators } from './searching-algorithms';
import { sortingGenerators } from './sorting-algorithms';
import { dpGenerators } from './dp-algorithms';
import { greedyGenerators } from './greedy-algorithms';
import { advancedGenerators } from './advanced-algorithms';
import { graphGenerators } from './graph-algorithms';
import { backtrackingGenerators } from './backtracking-algorithms';
import { stringGenerators } from './string-algorithms';


// Export all algorithm generators
export const algorithmGenerators = {
    // Searching
    jumpSearch: generateJumpSearchSteps,
    interpolationSearch: generateInterpolationSearchSteps,
    ternarySearch: generateTernarySearchSteps,
    ...searchingGenerators,

    // Sorting
    bubbleSort: generateBubbleSortSteps,
    quickSort: generateQuickSortSteps,
    mergeSort: generateMergeSortSteps,
    ...sortingGenerators,
    ...additionalGenerators,

    // DP
    ...dpGenerators,

    // Greedy
    ...greedyGenerators,

    // Advanced
    ...advancedGenerators,

    // Graph
    ...graphGenerators,

    // Backtracking
    ...backtrackingGenerators,

    // String Matching
    ...stringGenerators,
};


// Re-export additional algorithms from separate files
export * from './additional-algorithms';
export * from './searching-algorithms';
export * from './sorting-algorithms';
export * from './dp-algorithms';
export * from './greedy-algorithms';
export * from './advanced-algorithms';
export * from './graph-algorithms';
export * from './backtracking-algorithms';
export * from './string-algorithms';







