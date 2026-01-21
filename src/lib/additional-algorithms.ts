// ============================================
// ADDITIONAL SORTING & DP ALGORITHMS
// ============================================

import type { AlgorithmStep } from '@/types/visualization-types';

// Selection Sort
export function generateSelectionSortSteps(array: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const arr = [...array];
    const n = arr.length;
    let swaps = 0;
    let comparisons = 0;

    steps.push({
        id: 'init',
        description: 'Starting Selection Sort',
        data: { array: [...arr], swaps, comparisons }
    });

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;

        for (let j = i + 1; j < n; j++) {
            comparisons++;
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            swaps++;

            steps.push({
                id: `swap-${i}`,
                description: `Swapped ${arr[minIdx]} with ${arr[i]}`,
                swappedIndices: [i, minIdx],
                data: { array: [...arr], swaps, comparisons }
            });
        }

        steps.push({
            id: `sorted-${i}`,
            description: `Position ${i} is now sorted`,
            sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
            data: { array: [...arr], swaps, comparisons }
        });
    }

    steps.push({
        id: 'complete',
        description: '✅ Selection Sort Complete!',
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        data: { array: [...arr], swaps, comparisons, sorted: true }
    });

    return steps;
}

// Insertion Sort
export function generateInsertionSortSteps(array: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const arr = [...array];
    const n = arr.length;
    let swaps = 0;
    let comparisons = 0;

    steps.push({
        id: 'init',
        description: 'Starting Insertion Sort',
        sortedIndices: [0],
        data: { array: [...arr], swaps, comparisons }
    });

    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            comparisons++;
            arr[j + 1] = arr[j];
            swaps++;
            j--;
        }

        if (j >= 0) comparisons++;
        arr[j + 1] = key;

        steps.push({
            id: `placed-${i}`,
            description: `Placed ${key} at position ${j + 1}`,
            sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
            data: { array: [...arr], swaps, comparisons }
        });
    }

    steps.push({
        id: 'complete',
        description: '✅ Insertion Sort Complete!',
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        data: { array: [...arr], swaps, comparisons, sorted: true }
    });

    return steps;
}

// Heap Sort
export function generateHeapSortSteps(array: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const arr = [...array];
    const n = arr.length;
    let swaps = 0;
    let comparisons = 0;

    steps.push({
        id: 'init',
        description: 'Starting Heap Sort',
        data: { array: [...arr], swaps, comparisons }
    });

    function heapify(n: number, i: number) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n) {
            comparisons++;
            if (arr[left] > arr[largest]) largest = left;
        }

        if (right < n) {
            comparisons++;
            if (arr[right] > arr[largest]) largest = right;
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            swaps++;
            heapify(n, largest);
        }
    }

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        swaps++;

        steps.push({
            id: `sorted-${i}`,
            description: `Extracted max to position ${i}`,
            sortedIndices: Array.from({ length: n - i }, (_, k) => i + k),
            data: { array: [...arr], swaps, comparisons }
        });

        heapify(i, 0);
    }

    steps.push({
        id: 'complete',
        description: '✅ Heap Sort Complete!',
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        data: { array: [...arr], swaps, comparisons, sorted: true }
    });

    return steps;
}

// Fibonacci DP
export function generateFibonacciSteps(n: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const dp: number[] = new Array(n + 1).fill(0);

    steps.push({
        id: 'init',
        description: `Computing Fibonacci(${n}) using DP`,
        data: { n, dp: [...dp], table: [[...dp]] }
    });

    dp[0] = 0;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];

        steps.push({
            id: `compute-${i}`,
            description: `F(${i}) = F(${i - 1}) + F(${i - 2}) = ${dp[i]}`,
            currentIndex: i,
            data: { n, dp: [...dp], table: [[...dp]] }
        });
    }

    steps.push({
        id: 'complete',
        description: `✅ Fibonacci(${n}) = ${dp[n]}`,
        data: { n, dp: [...dp], result: dp[n], table: [[...dp]] }
    });

    return steps;
}

// 0/1 Knapsack
export function generateKnapsack01Steps(weights: number[], values: number[], capacity: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = weights.length;
    const dp: number[][] = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));

    steps.push({
        id: 'init',
        description: `0/1 Knapsack: ${n} items, capacity ${capacity}`,
        data: { weights, values, capacity, table: dp.map(row => [...row]) }
    });

    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }

            steps.push({
                id: `compute-${i}-${w}`,
                description: `dp[${i}][${w}] = ${dp[i][w]}`,
                data: {
                    weights,
                    values,
                    capacity,
                    table: dp.map(row => [...row]),
                    currentCell: { row: i, col: w }
                }
            });
        }
    }

    steps.push({
        id: 'complete',
        description: `✅ Maximum value: ${dp[n][capacity]}`,
        data: { weights, values, capacity, table: dp.map(row => [...row]), result: dp[n][capacity] }
    });

    return steps;
}

// LCS
export function generateLCSSteps(text1: string, text2: string): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const m = text1.length;
    const n = text2.length;
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    steps.push({
        id: 'init',
        description: `LCS: "${text1}" and "${text2}"`,
        data: { text1, text2, table: dp.map(row => [...row]) }
    });

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }

            steps.push({
                id: `compute-${i}-${j}`,
                description: text1[i - 1] === text2[j - 1]
                    ? `Match: '${text1[i - 1]}', LCS = ${dp[i][j]}`
                    : `No match, LCS = ${dp[i][j]}`,
                data: {
                    text1,
                    text2,
                    table: dp.map(row => [...row]),
                    currentCell: { row: i, col: j }
                }
            });
        }
    }

    steps.push({
        id: 'complete',
        description: `✅ LCS length: ${dp[m][n]}`,
        data: { text1, text2, table: dp.map(row => [...row]), result: dp[m][n] }
    });

    return steps;
}

export const additionalGenerators = {
    selectionSort: generateSelectionSortSteps,
    insertionSort: generateInsertionSortSteps,
    heapSort: generateHeapSortSteps,
    fibonacci: generateFibonacciSteps,
    knapsack01: generateKnapsack01Steps,
    lcs: generateLCSSteps,
};
