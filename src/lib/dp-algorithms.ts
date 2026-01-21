// ============================================
// ADDITIONAL DYNAMIC PROGRAMMING ALGORITHMS
// ============================================

import type { AlgorithmStep } from '@/types/visualization-types';

/**
 * Unbounded Knapsack
 * Given a set of items, each with a weight and a value, determine the number of each item to include in a collection 
 * so that the total weight is less than or equal to a given limit and the total value is as large as possible. 
 * (Items can be used multiple times)
 */
export function generateUnboundedKnapsackSteps(weights: number[], values: number[], capacity: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = weights.length;
    const dp = new Array(capacity + 1).fill(0);

    steps.push({
        id: 'init',
        description: `Unbounded Knapsack: ${n} items, capacity ${capacity}`,
        data: { weights, values, capacity, dp: [...dp] }
    });

    for (let w = 1; w <= capacity; w++) {
        steps.push({
            id: `start-weight-${w}`,
            description: `Computing max value for capacity ${w}`,
            data: { weights, values, capacity, dp: [...dp], currentWeight: w }
        });

        for (let i = 0; i < n; i++) {
            if (weights[i] <= w) {
                const newVal = dp[w - weights[i]] + values[i];
                if (newVal > dp[w]) {
                    dp[w] = newVal;
                    steps.push({
                        id: `update-${w}-${i}`,
                        description: `Found better value for capacity ${w} using item ${i}: ${newVal}`,
                        data: { weights, values, capacity, dp: [...dp], currentWeight: w, currentItem: i }
                    });
                }
            }
        }
    }

    steps.push({
        id: 'complete',
        description: `✅ Maximum value: ${dp[capacity]}`,
        data: { weights, values, capacity, dp: [...dp], result: dp[capacity] }
    });

    return steps;
}

/**
 * Longest Increasing Subsequence (LIS)
 * To find the length of the longest subsequence of a given sequence such that all elements 
 * of the subsequence are sorted in increasing order.
 */
export function generateLISSteps(array: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = array.length;
    if (n === 0) return steps;

    const dp = new Array(n).fill(1);

    steps.push({
        id: 'init',
        description: 'Starting LIS. Initializing DP array with 1.',
        data: { array: [...array], dp: [...dp] }
    });

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            steps.push({
                id: `compare-${i}-${j}`,
                description: `Checking array[${j}] < array[${i}] (${array[j]} < ${array[i]})`,
                comparedIndices: [i, j],
                data: { array: [...array], dp: [...dp] }
            });

            if (array[i] > array[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                steps.push({
                    id: `update-${i}-${j}`,
                    description: `Updating dp[${i}] to ${dp[i]}`,
                    currentIndex: i,
                    data: { array: [...array], dp: [...dp] }
                });
            }
        }
    }

    const result = Math.max(...dp);

    steps.push({
        id: 'complete',
        description: `✅ LIS length: ${result}`,
        data: { array: [...array], dp: [...dp], result }
    });

    return steps;
}

/**
 * Edit Distance (Levenshtein Distance)
 * Given two strings str1 and str2 and below operations that can be performed on str1. 
 * Find minimum number of edits (operations) required to convert ‘str1’ into ‘str2’.
 */
export function generateEditDistanceSteps(str1: string, str2: string): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const m = str1.length;
    const n = str2.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    steps.push({
        id: 'init',
        description: `Edit Distance between "${str1}" and "${str2}"`,
        data: { str1, str2, table: dp.map(row => [...row]) }
    });

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0) {
                dp[i][j] = j;
            } else if (j === 0) {
                dp[i][j] = i;
            } else if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
            }

            steps.push({
                id: `cell-${i}-${j}`,
                description: `dp[${i}][${j}] = ${dp[i][j]}`,
                data: { str1, str2, table: dp.map(row => [...row]), currentCell: { row: i, col: j } }
            });
        }
    }

    steps.push({
        id: 'complete',
        description: `✅ Min edit distance: ${dp[m][n]}`,
        data: { str1, str2, table: dp.map(row => [...row]), result: dp[m][n] }
    });

    return steps;
}

/**
 * Rod Cutting
 * Given a rod of length n inches and an array of prices that includes prices of all pieces of size smaller than n. 
 * Determine the maximum value obtainable by cutting up the rod and selling the pieces.
 */
export function generateRodCuttingSteps(prices: number[], n: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const dp = new Array(n + 1).fill(0);

    steps.push({
        id: 'init',
        description: `Rod Cutting: Length ${n}`,
        data: { prices, n, dp: [...dp] }
    });

    for (let i = 1; i <= n; i++) {
        let maxVal = -Infinity;
        for (let j = 0; j < i; j++) {
            maxVal = Math.max(maxVal, prices[j] + dp[i - j - 1]);
            steps.push({
                id: `check-${i}-${j}`,
                description: `Checking cut at ${j + 1}: price[${j}] + dp[${i - j - 1}]`,
                data: { prices, n, dp: [...dp], currentLength: i, currentCut: j }
            });
        }
        dp[i] = maxVal;
        steps.push({
            id: `update-${i}`,
            description: `Max value for length ${i} is ${dp[i]}`,
            data: { prices, n, dp: [...dp], currentLength: i }
        });
    }

    steps.push({
        id: 'complete',
        description: `✅ Max value obtainable: ${dp[n]}`,
        data: { prices, n, dp: [...dp], result: dp[n] }
    });

    return steps;
}

/**
 * Subset Sum Problem
 * Find if there is a subset of the given set with sum equal to given sum.
 */
export function generateSubsetSumSteps(set: number[], sum: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = set.length;
    const dp: boolean[][] = Array.from({ length: n + 1 }, () => new Array(sum + 1).fill(false));

    steps.push({
        id: 'init',
        description: `Subset Sum: Find if subset of [${set.join(', ')}] sums to ${sum}`,
        data: { set, sum, table: dp.map(row => [...row]) }
    });

    for (let i = 0; i <= n; i++) dp[i][0] = true;

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= sum; j++) {
            if (j < set[i - 1]) {
                dp[i][j] = dp[i - 1][j];
            } else {
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - set[i - 1]];
            }

            steps.push({
                id: `cell-${i}-${j}`,
                description: `dp[${i}][${j}] = ${dp[i][j]}`,
                data: { set, sum, table: dp.map(row => [...row]), currentCell: { row: i, col: j } }
            });
        }
    }

    steps.push({
        id: 'complete',
        description: dp[n][sum] ? `✅ Found subset summing to ${sum}` : `❌ No subset sums to ${sum}`,
        data: { set, sum, table: dp.map(row => [...row]), result: dp[n][sum] }
    });

    return steps;
}

/**
 * Partition Problem
 * Determine whether a given set can be partitioned into two subsets such that the sum of elements in both subsets is same.
 * (Reduces to Subset Sum where target = sum(set) / 2)
 */
export function generatePartitionSteps(set: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const sum = set.reduce((a, b) => a + b, 0);

    steps.push({
        id: 'init',
        description: `Partition Problem: Set [${set.join(', ')}], Total Sum = ${sum}`,
        data: { set, sum }
    });

    if (sum % 2 !== 0) {
        steps.push({
            id: 'odd-sum',
            description: `❌ Sum is odd (${sum}), partition impossible`,
            data: { set, sum, result: false }
        });
        return steps;
    }

    const target = sum / 2;
    steps.push({
        id: 'target-found',
        description: `Target sum for each partition: ${target}. Running Subset Sum...`,
        data: { set, sum, target }
    });

    const subsetSteps = generateSubsetSumSteps(set, target);
    return [...steps, ...subsetSteps];
}

/**
 * Matrix Chain Multiplication
 * Given a sequence of matrices, find the most efficient way to multiply these matrices together.
 */
export function generateMatrixChainSteps(dims: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = dims.length - 1;
    const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

    steps.push({
        id: 'init',
        description: `Matrix Chain Multiplication: ${n} matrices with dimensions [${dims.join(', ')}]`,
        data: { dims, n, table: dp.map(row => [...row]) }
    });

    for (let len = 2; len <= n; len++) {
        for (let i = 1; i <= n - len + 1; i++) {
            const j = i + len - 1;
            dp[i][j] = Infinity;

            for (let k = i; k <= j - 1; k++) {
                const q = dp[i][k] + dp[k + 1][j] + dims[i - 1] * dims[k] * dims[j];
                if (q < dp[i][j]) {
                    dp[i][j] = q;
                }
            }

            steps.push({
                id: `cell-${i}-${j}`,
                description: `dp[${i}][${j}] = ${dp[i][j]}`,
                data: { dims, n, table: dp.map(row => [...row]), currentCell: { row: i, col: j } }
            });
        }
    }

    steps.push({
        id: 'complete',
        description: `✅ Min cost of multiplications: ${dp[1][n]}`,
        data: { dims, n, table: dp.map(row => [...row]), result: dp[1][n] }
    });

    return steps;
}

export const dpGenerators = {
    unboundedKnapsack: generateUnboundedKnapsackSteps,
    lis: generateLISSteps,
    editDistance: generateEditDistanceSteps,
    rodCutting: generateRodCuttingSteps,
    subsetSum: generateSubsetSumSteps,
    partition: generatePartitionSteps,
    matrixChain: generateMatrixChainSteps,
};


