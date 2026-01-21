// ============================================
// ADDITIONAL SORTING ALGORITHMS
// ============================================

import type { AlgorithmStep } from '@/types/visualization-types';

/**
 * Counting Sort
 * A non-comparison-based sorting algorithm that works by counting the number of objects having distinct key values.
 */
export function generateCountingSortSteps(array: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = array.length;
    if (n === 0) return steps;

    const max = Math.max(...array);
    const min = Math.min(...array);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(n).fill(0);

    steps.push({
        id: 'init',
        description: `Starting Counting Sort. Range: [${min}, ${max}]`,
        data: { array: [...array], count: [...count], output: [...output] }
    });

    // Store count of each character
    for (let i = 0; i < n; i++) {
        count[array[i] - min]++;
        steps.push({
            id: `count-${i}`,
            description: `Counting occurrence of ${array[i]}`,
            currentIndex: i,
            data: { array: [...array], count: [...count], output: [...output] }
        });
    }

    // Change count[i] so that count[i] now contains actual position of this character in output array
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    steps.push({
        id: 'cumulative-count',
        description: 'Calculated cumulative counts for positions',
        data: { array: [...array], count: [...count], output: [...output] }
    });

    // Build the output character array
    for (let i = n - 1; i >= 0; i--) {
        const val = array[i];
        const pos = count[val - min] - 1;
        output[pos] = val;
        count[val - min]--;

        steps.push({
            id: `output-${i}`,
            description: `Placing ${val} at output position ${pos}`,
            currentIndex: i,
            data: { array: [...array], count: [...count], output: [...output] }
        });
    }

    steps.push({
        id: 'complete',
        description: '✅ Counting Sort Complete!',
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        data: { array: [...output], sorted: true }
    });

    return steps;
}

/**
 * Radix Sort
 * A non-comparison-based sorting algorithm that sorts data with integer keys by grouping keys by the individual digits.
 */
export function generateRadixSortSteps(array: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const arr = [...array];
    const n = arr.length;
    if (n === 0) return steps;

    const max = Math.max(...arr);

    steps.push({
        id: 'init',
        description: `Starting Radix Sort. Max value: ${max}`,
        data: { array: [...arr] }
    });

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        steps.push({
            id: `digit-pass-${exp}`,
            description: `Sorting by digit at ${exp}s place`,
            data: { array: [...arr], exp }
        });

        // Use counting sort for this digit
        const output = new Array(n).fill(0);
        const count = new Array(10).fill(0);

        for (let i = 0; i < n; i++) {
            const digit = Math.floor(arr[i] / exp) % 10;
            count[digit]++;
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (let i = n - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            const pos = count[digit] - 1;
            output[pos] = arr[i];
            count[digit]--;

            steps.push({
                id: `place-${exp}-${i}`,
                description: `Digit ${digit}: Placing ${arr[i]} at position ${pos}`,
                currentIndex: i,
                data: { array: [...arr], output: [...output], count: [...count], exp }
            });
        }

        for (let i = 0; i < n; i++) {
            arr[i] = output[i];
        }

        steps.push({
            id: `digit-complete-${exp}`,
            description: `Completed sorting by ${exp}s digit`,
            data: { array: [...arr] }
        });
    }

    steps.push({
        id: 'complete',
        description: '✅ Radix Sort Complete!',
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        data: { array: [...arr], sorted: true }
    });

    return steps;
}

/**
 * Shell Sort
 * A generalization of insertion sort that allows the exchange of items that are far apart.
 */
export function generateShellSortSteps(array: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const arr = [...array];
    const n = arr.length;
    let gaps = 0;
    let comparisons = 0;
    let swaps = 0;

    steps.push({
        id: 'init',
        description: 'Starting Shell Sort',
        data: { array: [...arr], comparisons, swaps }
    });

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        gaps++;
        steps.push({
            id: `gap-${gap}`,
            description: `New gap size: ${gap}`,
            data: { array: [...arr], gap, comparisons, swaps }
        });

        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j;

            steps.push({
                id: `insert-${i}`,
                description: `Inserting ${temp} into gap-sorted sublist`,
                currentIndex: i,
                data: { array: [...arr], gap, comparisons, swaps }
            });

            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                comparisons++;
                arr[j] = arr[j - gap];
                swaps++;
                steps.push({
                    id: `shift-${j}`,
                    description: `Shifting ${arr[j - gap]} to right by ${gap}`,
                    comparedIndices: [j, j - gap],
                    data: { array: [...arr], gap, comparisons, swaps }
                });
            }
            if (j >= gap) comparisons++; // Final check in for loop

            arr[j] = temp;
            steps.push({
                id: `placed-${i}`,
                description: `Placed ${temp} at position ${j}`,
                data: { array: [...arr], gap, comparisons, swaps }
            });
        }
    }

    steps.push({
        id: 'complete',
        description: '✅ Shell Sort Complete!',
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        data: { array: [...arr], sorted: true, comparisons, swaps }
    });

    return steps;
}

/**
 * Bucket Sort
 * Works by distributing the elements of an array into a number of buckets.
 */
export function generateBucketSortSteps(array: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = array.length;
    if (n === 0) return steps;

    const max = Math.max(...array);
    const min = Math.min(...array);
    const bucketCount = Math.floor(Math.sqrt(n)) || 1;
    const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

    steps.push({
        id: 'init',
        description: `Starting Bucket Sort. Dividing into ${bucketCount} buckets.`,
        data: { array: [...array], buckets: buckets.map(b => [...b]) }
    });

    // Distribute elements into buckets
    const range = (max - min) / bucketCount;
    for (let i = 0; i < n; i++) {
        let bucketIdx = Math.floor((array[i] - min) / range);
        if (bucketIdx === bucketCount) bucketIdx--;

        buckets[bucketIdx].push(array[i]);
        steps.push({
            id: `distribute-${i}`,
            description: `Placing ${array[i]} into bucket ${bucketIdx}`,
            currentIndex: i,
            data: { array: [...array], buckets: buckets.map(b => [...b]) }
        });
    }

    // Sort buckets and concatenate
    const result: number[] = [];
    for (let i = 0; i < bucketCount; i++) {
        steps.push({
            id: `sort-bucket-${i}`,
            description: `Sorting bucket ${i}`,
            data: { array: [...array], buckets: buckets.map(b => [...b]), sortingBucket: i }
        });

        buckets[i].sort((a, b) => a - b);
        result.push(...buckets[i]);

        steps.push({
            id: `bucket-sorted-${i}`,
            description: `Bucket ${i} sorted and added to result`,
            data: { array: [...array], buckets: buckets.map(b => [...b]), result: [...result] }
        });
    }

    steps.push({
        id: 'complete',
        description: '✅ Bucket Sort Complete!',
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        data: { array: [...result], sorted: true }
    });

    return steps;
}

/**
 * Comb Sort
 * An improvement on Bubble Sort that eliminates "turtles" (small values near the end of the list).
 */
export function generateCombSortSteps(array: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const arr = [...array];
    const n = arr.length;
    let gap = n;
    const shrink = 1.3;
    let sorted = false;
    let comparisons = 0;
    let swaps = 0;

    steps.push({
        id: 'init',
        description: 'Starting Comb Sort',
        data: { array: [...arr], comparisons, swaps }
    });

    while (!sorted) {
        gap = Math.floor(gap / shrink);
        if (gap <= 1) {
            gap = 1;
            sorted = true;
        }

        steps.push({
            id: `gap-${gap}`,
            description: `New gap size: ${gap}`,
            data: { array: [...arr], gap, comparisons, swaps }
        });

        for (let i = 0; i + gap < n; i++) {
            comparisons++;
            steps.push({
                id: `compare-${i}`,
                description: `Comparing arr[${i}] and arr[${i + gap}]`,
                comparedIndices: [i, i + gap],
                data: { array: [...arr], gap, comparisons, swaps }
            });

            if (arr[i] > arr[i + gap]) {
                [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
                swaps++;
                sorted = false;
                steps.push({
                    id: `swap-${i}`,
                    description: `Swapped ${arr[i + gap]} and ${arr[i]}`,
                    swappedIndices: [i, i + gap],
                    data: { array: [...arr], gap, comparisons, swaps }
                });
            }
        }
    }

    steps.push({
        id: 'complete',
        description: '✅ Comb Sort Complete!',
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        data: { array: [...arr], sorted: true, comparisons, swaps }
    });

    return steps;
}

/**
 * Cycle Sort
 * An in-place, unstable sorting algorithm, a comparison sort that is theoretically optimal in terms of the total number of writes to the original array.
 */
export function generateCycleSortSteps(array: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const arr = [...array];
    const n = arr.length;
    let writes = 0;
    let comparisons = 0;

    steps.push({
        id: 'init',
        description: 'Starting Cycle Sort',
        data: { array: [...arr], writes, comparisons }
    });

    for (let cycleStart = 0; cycleStart <= n - 2; cycleStart++) {
        let item = arr[cycleStart];
        let pos = cycleStart;

        for (let i = cycleStart + 1; i < n; i++) {
            comparisons++;
            if (arr[i] < item) pos++;
        }

        if (pos === cycleStart) continue;

        while (item === arr[pos]) pos++;

        if (pos !== cycleStart) {
            [item, arr[pos]] = [arr[pos], item];
            writes++;
            steps.push({
                id: `cycle-${cycleStart}-pos-${pos}`,
                description: `Moving item to its correct position ${pos}`,
                swappedIndices: [cycleStart, pos],
                data: { array: [...arr], writes, comparisons }
            });
        }

        while (pos !== cycleStart) {
            pos = cycleStart;
            for (let i = cycleStart + 1; i < n; i++) {
                comparisons++;
                if (arr[i] < item) pos++;
            }

            while (item === arr[pos]) pos++;

            if (item !== arr[pos]) {
                [item, arr[pos]] = [arr[pos], item];
                writes++;
                steps.push({
                    id: `cycle-continue-${pos}`,
                    description: `Continuing cycle: moving item to position ${pos}`,
                    swappedIndices: [cycleStart, pos],
                    data: { array: [...arr], writes, comparisons }
                });
            }
        }
    }

    steps.push({
        id: 'complete',
        description: '✅ Cycle Sort Complete!',
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        data: { array: [...arr], sorted: true, writes, comparisons }
    });

    return steps;
}

/**
 * Odd-Even Sort (Brick Sort)
 * A relatively simple sorting algorithm, developed originally for use on parallel processors with local interconnections.
 */
export function generateOddEvenSortSteps(array: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const arr = [...array];
    const n = arr.length;
    let sorted = false;
    let comparisons = 0;
    let swaps = 0;

    steps.push({
        id: 'init',
        description: 'Starting Odd-Even Sort (Brick Sort)',
        data: { array: [...arr], comparisons, swaps }
    });

    while (!sorted) {
        sorted = true;

        // Odd pass
        steps.push({
            id: 'odd-pass',
            description: 'Starting Odd Pass',
            data: { array: [...arr], comparisons, swaps, pass: 'odd' }
        });
        for (let i = 1; i <= n - 2; i += 2) {
            comparisons++;
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swaps++;
                sorted = false;
                steps.push({
                    id: `odd-swap-${i}`,
                    description: `Odd Swap: ${arr[i + 1]} and ${arr[i]}`,
                    swappedIndices: [i, i + 1],
                    data: { array: [...arr], comparisons, swaps }
                });
            }
        }

        // Even pass
        steps.push({
            id: 'even-pass',
            description: 'Starting Even Pass',
            data: { array: [...arr], comparisons, swaps, pass: 'even' }
        });
        for (let i = 0; i <= n - 2; i += 2) {
            comparisons++;
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swaps++;
                sorted = false;
                steps.push({
                    id: `even-swap-${i}`,
                    description: `Even Swap: ${arr[i + 1]} and ${arr[i]}`,
                    swappedIndices: [i, i + 1],
                    data: { array: [...arr], comparisons, swaps }
                });
            }
        }
    }

    steps.push({
        id: 'complete',
        description: '✅ Odd-Even Sort Complete!',
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        data: { array: [...arr], sorted: true, comparisons, swaps }
    });

    return steps;
}

export const sortingGenerators = {
    countingSort: generateCountingSortSteps,
    radixSort: generateRadixSortSteps,
    shellSort: generateShellSortSteps,
    bucketSort: generateBucketSortSteps,
    combSort: generateCombSortSteps,
    cycleSort: generateCycleSortSteps,
    oddEvenSort: generateOddEvenSortSteps,
    timSort: generateTimSortSteps,
    treeSort: generateTreeSortSteps,
};

/**
 * Tim Sort (Simplified)
 * A hybrid stable sorting algorithm, derived from merge sort and insertion sort.
 */
export function generateTimSortSteps(array: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const arr = [...array];
    const n = arr.length;
    const RUN = 32;

    steps.push({
        id: 'init',
        description: 'Starting Tim Sort (Simplified). Using Insertion Sort for small runs.',
        data: { array: [...arr] }
    });

    // 1. Sorting individual subarrays of size RUN
    for (let i = 0; i < n; i += RUN) {
        const end = Math.min(i + RUN - 1, n - 1);
        steps.push({
            id: `insertion-run-${i}`,
            description: `Sorting run from index ${i} to ${end} using Insertion Sort`,
            data: { array: [...arr], range: [i, end] }
        });

        // Insertion Sort for this run
        for (let j = i + 1; j <= end; j++) {
            const key = arr[j];
            let k = j - 1;
            while (k >= i && arr[k] > key) {
                arr[k + 1] = arr[k];
                k--;
            }
            arr[k + 1] = key;
        }

        steps.push({
            id: `run-sorted-${i}`,
            description: `Run [${i}, ${end}] sorted`,
            data: { array: [...arr], range: [i, end] }
        });
    }

    // 2. Start merging from size RUN
    for (let size = RUN; size < n; size = 2 * size) {
        for (let left = 0; left < n; left += 2 * size) {
            const mid = left + size - 1;
            const right = Math.min(left + 2 * size - 1, n - 1);

            if (mid < right) {
                steps.push({
                    id: `merge-${left}-${right}`,
                    description: `Merging sorted runs [${left}, ${mid}] and [${mid + 1}, ${right}]`,
                    data: { array: [...arr], range1: [left, mid], range2: [mid + 1, right] }
                });

                // Standard Merge logic
                const leftArr = arr.slice(left, mid + 1);
                const rightArr = arr.slice(mid + 1, right + 1);
                let i = 0, j = 0, k = left;

                while (i < leftArr.length && j < rightArr.length) {
                    if (leftArr[i] <= rightArr[j]) {
                        arr[k++] = leftArr[i++];
                    } else {
                        arr[k++] = rightArr[j++];
                    }
                }
                while (i < leftArr.length) arr[k++] = leftArr[i++];
                while (j < rightArr.length) arr[k++] = rightArr[j++];

                steps.push({
                    id: `merge-complete-${left}`,
                    description: `Merged result into [${left}, ${right}]`,
                    data: { array: [...arr], range: [left, right] }
                });
            }
        }
    }

    steps.push({
        id: 'complete',
        description: '✅ Tim Sort Complete!',
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        data: { array: [...arr], sorted: true }
    });

    return steps;
}

/**
 * Tree Sort
 * A sorting algorithm that builds a binary search tree from the elements to be sorted, and then traverses the tree, in-order.
 */
export function generateTreeSortSteps(array: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = array.length;
    if (n === 0) return steps;

    steps.push({
        id: 'init',
        description: 'Starting Tree Sort. Step 1: Build Binary Search Tree.',
        data: { array: [...array] }
    });

    // Simplified Tree Visualization: Track which elements are in the "tree"
    // In a real implementation we'd build a tree object.
    // For visualization, we'll show elements being inserted one by one.
    const treeElements: number[] = [];

    for (let i = 0; i < n; i++) {
        treeElements.push(array[i]);
        steps.push({
            id: `insert-${i}`,
            description: `Inserting ${array[i]} into Binary Search Tree`,
            currentIndex: i,
            data: { array: [...array], treeElements: [...treeElements] }
        });
    }

    // Step 2: In-order traversal
    const sorted = [...array].sort((a, b) => a - b);
    steps.push({
        id: 'traversal-start',
        description: 'Step 2: Performing In-order traversal on the BST to get sorted array',
        data: { array: [...array], treeElements: [...treeElements] }
    });

    for (let i = 0; i < n; i++) {
        steps.push({
            id: `traverse-${i}`,
            description: `Traversal: Emitting ${sorted[i]}`,
            currentIndex: i,
            data: { array: [...sorted.slice(0, i + 1), ...new Array(n - i - 1).fill(-1)], currentSorted: i }
        });
    }

    steps.push({
        id: 'complete',
        description: '✅ Tree Sort Complete!',
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        data: { array: [...sorted], sorted: true }
    });

    return steps;
}



