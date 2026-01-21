// ============================================
// MAIN ALGORITHM VISUALIZATION ROUTER
// ============================================
// This component routes to the appropriate visualization based on algorithm type

import React, { useState, useEffect, useMemo } from 'react';
import { UnifiedArrayVisualization } from './UnifiedArrayVisualization';
import { UnifiedMatrixVisualization } from './UnifiedMatrixVisualization';
import { UnifiedGraphVisualization } from './UnifiedGraphVisualization';
import { UnifiedGeometricVisualization } from './UnifiedGeometricVisualization';
import { UnifiedStringVisualization } from './UnifiedStringVisualization';
import { LinearSearchVisualization } from './searching/LinearSearchVisualization';
import { BinarySearchVisualization } from './searching/BinarySearchVisualization';
import { BinaryTreeVisualizer } from './BinaryTreeVisualizer';
import { BinarySearchVisualizer } from './BinarySearchVisualizer';
import { algorithmGenerators } from '@/lib/algorithm-generators';
import { fetchAlgorithmSteps, checkBackendStatus } from '@/lib/algorithm-backend-service';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Loader2, Server, AlertCircle } from 'lucide-react';
import type { AlgorithmStep } from '@/types/visualization-types';

export type AlgorithmType =
    // Searching
    | 'linear-search'
    | 'binary-search'
    | 'jump-search'
    | 'interpolation-search'
    | 'ternary-search'
    | 'exponential-search'
    | 'fibonacci-search'
    | 'hash-search'
    // Sorting
    | 'bubble-sort'
    | 'selection-sort'
    | 'insertion-sort'
    | 'merge-sort'
    | 'quick-sort'
    | 'heap-sort'
    | 'counting-sort'
    | 'radix-sort'
    | 'shell-sort'
    | 'bucket-sort'
    | 'comb-sort'
    | 'cycle-sort'
    | 'odd-even-sort'
    | 'tim-sort'
    | 'tree-sort'
    // DP
    | 'fibonacci'
    | 'knapsack'
    | 'lcs'
    | 'unbounded-knapsack'
    | 'lis'
    | 'edit-distance'
    | 'rod-cutting'
    | 'subset-sum'
    | 'partition'
    | 'matrix-chain'
    | 'optimal-bst'
    // Greedy
    | 'activity-selection'
    | 'fractional-knapsack'
    | 'job-sequencing'
    | 'huffman'
    | 'coin-change-greedy'
    | 'min-platforms'
    | 'optimal-merge'
    // Advanced
    | 'karatsuba'
    | 'closest-pair'
    | 'dijkstra'
    | 'kruskal'
    | 'prim'
    | 'floyd-warshall'
    | 'bellman-ford'
    | 'fft'
    | 'median-finding'
    | 'convex-hull'
    | 'max-min'
    | 'strassen'
    // Graph Expansion
    | 'bfs'
    | 'dfs'
    | 'topological-sort'
    // Backtracking
    | 'n-queens'
    | 'sudoku-solver'
    // String
    | 'kmp'
    | 'rabin-karp'
    | 'bst'
    | 'binary-search-interactive';

interface AlgorithmVisualizerProps {
    type: AlgorithmType;
    array?: number[];
    target?: number;
    str1?: string;
    str2?: string;
    capacity?: number;
    weights?: number[];
    values?: number[];
    n?: number;
    hideHeader?: boolean;
    code?: string;
}

const algorithmMetadata: Record<AlgorithmType, {
    name: string;
    description: string;
    timeComplexity: string;
    spaceComplexity: string;
    category: 'searching' | 'sorting' | 'dp' | 'greedy' | 'advanced';
}> = {
    'linear-search': { name: 'Linear Search', description: 'Sequential search', timeComplexity: 'O(n)', spaceComplexity: 'O(1)', category: 'searching' },
    'binary-search': { name: 'Binary Search', description: 'Divide and conquer search', timeComplexity: 'O(log n)', spaceComplexity: 'O(1)', category: 'searching' },
    'jump-search': { name: 'Jump Search', description: 'Jump ahead, then linear search', timeComplexity: 'O(√n)', spaceComplexity: 'O(1)', category: 'searching' },
    'interpolation-search': { name: 'Interpolation Search', description: 'Estimates position', timeComplexity: 'O(log log n)', spaceComplexity: 'O(1)', category: 'searching' },
    'ternary-search': { name: 'Ternary Search', description: 'Divides into three parts', timeComplexity: 'O(log₃ n)', spaceComplexity: 'O(1)', category: 'searching' },
    'exponential-search': { name: 'Exponential Search', description: 'Exponential jumps then binary', timeComplexity: 'O(log n)', spaceComplexity: 'O(1)', category: 'searching' },
    'fibonacci-search': { name: 'Fibonacci Search', description: 'Uses Fibonacci division', timeComplexity: 'O(log n)', spaceComplexity: 'O(1)', category: 'searching' },
    'hash-search': { name: 'Hash Search', description: 'Direct access hashing', timeComplexity: 'O(1)', spaceComplexity: 'O(n)', category: 'searching' },
    'bubble-sort': { name: 'Bubble Sort', description: 'Repeated swaps', timeComplexity: 'O(n²)', spaceComplexity: 'O(1)', category: 'sorting' },
    'selection-sort': { name: 'Selection Sort', description: 'Select minimum repeatedly', timeComplexity: 'O(n²)', spaceComplexity: 'O(1)', category: 'sorting' },
    'insertion-sort': { name: 'Insertion Sort', description: 'Insert into position', timeComplexity: 'O(n²)', spaceComplexity: 'O(1)', category: 'sorting' },
    'merge-sort': { name: 'Merge Sort', description: 'Divide and merge', timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)', category: 'sorting' },
    'quick-sort': { name: 'Quick Sort', description: 'Partitioning sort', timeComplexity: 'O(n log n)', spaceComplexity: 'O(log n)', category: 'sorting' },
    'heap-sort': { name: 'Heap Sort', description: 'Max-Heap based sort', timeComplexity: 'O(n log n)', spaceComplexity: 'O(1)', category: 'sorting' },
    'counting-sort': { name: 'Counting Sort', description: 'Value distribution sort', timeComplexity: 'O(n+k)', spaceComplexity: 'O(k)', category: 'sorting' },
    'radix-sort': { name: 'Radix Sort', description: 'Digit-by-digit sort', timeComplexity: 'O(dk)', spaceComplexity: 'O(n+k)', category: 'sorting' },
    'shell-sort': { name: 'Shell Sort', description: 'Gap-based insertion sort', timeComplexity: 'O(n log n)', spaceComplexity: 'O(1)', category: 'sorting' },
    'bucket-sort': { name: 'Bucket Sort', description: 'Bin-based distribution', timeComplexity: 'O(n+k)', spaceComplexity: 'O(n)', category: 'sorting' },
    'comb-sort': { name: 'Comb Sort', description: 'Bubble sort improvement', timeComplexity: 'O(n log n)', spaceComplexity: 'O(1)', category: 'sorting' },
    'cycle-sort': { name: 'Cycle Sort', description: 'Minimal writes sort', timeComplexity: 'O(n²)', spaceComplexity: 'O(1)', category: 'sorting' },
    'odd-even-sort': { name: 'Odd-Even Sort', description: 'Parallel-friendly sort', timeComplexity: 'O(n²)', spaceComplexity: 'O(1)', category: 'sorting' },
    'tim-sort': { name: 'Tim Sort', description: 'Stable hybrid sort', timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)', category: 'sorting' },
    'tree-sort': { name: 'Tree Sort', description: 'BST-based sort', timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)', category: 'sorting' },
    'fibonacci': { name: 'Fibonacci', description: 'Dynamic programming n-th fib', timeComplexity: 'O(n)', spaceComplexity: 'O(n)', category: 'dp' },
    'knapsack': { name: 'Knapsack', description: '0/1 dynamic programming', timeComplexity: 'O(nW)', spaceComplexity: 'O(nW)', category: 'dp' },
    'lcs': { name: 'LCS', description: 'Longest Common Subsequence', timeComplexity: 'O(mn)', spaceComplexity: 'O(mn)', category: 'dp' },
    'unbounded-knapsack': { name: 'Unbounded Knapsack', description: 'Unlimited item DP', timeComplexity: 'O(nW)', spaceComplexity: 'O(W)', category: 'dp' },
    'lis': { name: 'LIS', description: 'Longest Increasing Subsequence', timeComplexity: 'O(n²)', spaceComplexity: 'O(n)', category: 'dp' },
    'edit-distance': { name: 'Edit Distance', description: 'String conversion DP', timeComplexity: 'O(mn)', spaceComplexity: 'O(mn)', category: 'dp' },
    'rod-cutting': { name: 'Rod Cutting', description: 'Maximize profit DP', timeComplexity: 'O(n²)', spaceComplexity: 'O(n)', category: 'dp' },
    'subset-sum': { name: 'Subset Sum', description: 'Set sum target DP', timeComplexity: 'O(ns)', spaceComplexity: 'O(ns)', category: 'dp' },
    'partition': { name: 'Partition', description: 'Equal weight split DP', timeComplexity: 'O(ns)', spaceComplexity: 'O(ns)', category: 'dp' },
    'matrix-chain': { name: 'Matrix Chain', description: 'Optimal parenthesization DP', timeComplexity: 'O(n³)', spaceComplexity: 'O(n²)', category: 'dp' },
    'optimal-bst': { name: 'Optimal BST', description: 'Minimal search cost DP', timeComplexity: 'O(n³)', spaceComplexity: 'O(n²)', category: 'advanced' },
    'activity-selection': { name: 'Activity Selection', description: 'Greedy interval selection', timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)', category: 'greedy' },
    'fractional-knapsack': { name: 'Fractional Knapsack', description: 'Greedy value/weight', timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)', category: 'greedy' },
    'job-sequencing': { name: 'Job Sequencing', description: 'Greedy profit maximizing', timeComplexity: 'O(n²)', spaceComplexity: 'O(n)', category: 'greedy' },
    'huffman': { name: 'Huffman Coding', description: 'Greedy compression tree', timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)', category: 'greedy' },
    'coin-change-greedy': { name: 'Coin Change', description: 'Greedy change making', timeComplexity: 'O(n)', spaceComplexity: 'O(1)', category: 'greedy' },
    'min-platforms': { name: 'Min Platforms', description: 'Greedy station scheduling', timeComplexity: 'O(n log n)', spaceComplexity: 'O(1)', category: 'greedy' },
    'optimal-merge': { name: 'Optimal Merge', description: 'Greedy record merging', timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)', category: 'greedy' },
    'karatsuba': { name: 'Karatsuba Multi.', description: 'Fast DC multiplication', timeComplexity: 'O(n^1.58)', spaceComplexity: 'O(log n)', category: 'advanced' },
    'closest-pair': { name: 'Closest Pair', description: 'Divide and Conquer 2D', timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)', category: 'advanced' },
    'dijkstra': { name: 'Dijkstra', description: 'Shortest path graph', timeComplexity: 'O(E+VlogV)', spaceComplexity: 'O(V)', category: 'advanced' },
    'kruskal': { name: 'Kruskal', description: 'MST edge sorting', timeComplexity: 'O(ElogE)', spaceComplexity: 'O(V+E)', category: 'advanced' },
    'prim': { name: 'Prim', description: 'MST greedy growth', timeComplexity: 'O(E+VlogV)', spaceComplexity: 'O(V)', category: 'advanced' },
    'floyd-warshall': { name: 'Floyd-Warshall', description: 'All-pairs shortest path', timeComplexity: 'O(V³)', spaceComplexity: 'O(V²)', category: 'advanced' },
    'bellman-ford': { name: 'Bellman-Ford', description: 'SP with negative weights', timeComplexity: 'O(VE)', spaceComplexity: 'O(V)', category: 'advanced' },
    'fft': { name: 'FFT', description: 'Fast Fourier Transform', timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)', category: 'advanced' },
    'median-finding': { name: 'Median Finding', description: 'Linear time selection', timeComplexity: 'O(n)', spaceComplexity: 'O(log n)', category: 'advanced' },
    'convex-hull': { name: 'Convex Hull', description: 'Smallest convex polygon', timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)', category: 'advanced' },
    'max-min': { name: 'Max-Min', description: 'Divide and conquer extreme', timeComplexity: 'O(n)', spaceComplexity: 'O(log n)', category: 'advanced' },
    'strassen': { name: 'Strassen', description: 'Recursive fast matrix', timeComplexity: 'O(n^2.81)', spaceComplexity: 'O(n²)', category: 'advanced' },
    'bfs': { name: 'BFS', description: 'Breadth First Search', timeComplexity: 'O(V+E)', spaceComplexity: 'O(V)', category: 'advanced' },
    'dfs': { name: 'DFS', description: 'Depth First Search', timeComplexity: 'O(V+E)', spaceComplexity: 'O(V)', category: 'advanced' },
    'topological-sort': { name: 'Topological Sort', description: 'DAG ordering', timeComplexity: 'O(V+E)', spaceComplexity: 'O(V)', category: 'advanced' },
    'n-queens': { name: 'N-Queens', description: 'Backtracking placement', timeComplexity: 'O(N!)', spaceComplexity: 'O(N)', category: 'advanced' },
    'sudoku-solver': { name: 'Sudoku Solver', description: 'Backtracking grid solver', timeComplexity: 'O(9^(n²))', spaceComplexity: 'O(n²)', category: 'advanced' },
    'kmp': { name: 'KMP Algorithm', description: 'Pattern matching', timeComplexity: 'O(n+m)', spaceComplexity: 'O(m)', category: 'advanced' },
    'rabin-karp': { name: 'Rabin-Karp', description: 'Rolling hash matching', timeComplexity: 'O(n+m)', spaceComplexity: 'O(1)', category: 'advanced' },
    'bst': { name: 'Binary Search Tree', description: 'Dynamic tree operations', timeComplexity: 'O(log n)', spaceComplexity: 'O(n)', category: 'advanced' },
    'binary-search-interactive': { name: 'Binary Search', description: 'Step-by-step search', timeComplexity: 'O(log n)', spaceComplexity: 'O(1)', category: 'searching' },
};

const computeLocalSteps = (props: AlgorithmVisualizerProps): AlgorithmStep[] => {
    const { type, array, target, str1, str2, capacity, weights, values, n } = props;
    const currentArray = array || [];
    const sortedArray = [...currentArray].sort((a, b) => a - b);

    switch (type) {
        case 'jump-search': return algorithmGenerators.jumpSearch(sortedArray, target!);
        case 'interpolation-search': return algorithmGenerators.interpolationSearch(sortedArray, target!);
        case 'ternary-search': return algorithmGenerators.ternarySearch(sortedArray, target!);
        case 'exponential-search': return algorithmGenerators.exponentialSearch(sortedArray, target!);
        case 'fibonacci-search': return algorithmGenerators.fibonacciSearch(sortedArray, target!);
        case 'hash-search': return algorithmGenerators.hashSearch(currentArray, target || 10);
        case 'bubble-sort': return algorithmGenerators.bubbleSort(currentArray);
        case 'selection-sort': return algorithmGenerators.selectionSort(currentArray);
        case 'insertion-sort': return algorithmGenerators.insertionSort(currentArray);
        case 'merge-sort': return algorithmGenerators.mergeSort(currentArray);
        case 'quick-sort': return algorithmGenerators.quickSort(currentArray);
        case 'heap-sort': return algorithmGenerators.heapSort(currentArray);
        case 'counting-sort': return algorithmGenerators.countingSort(currentArray);
        case 'radix-sort': return algorithmGenerators.radixSort(currentArray);
        case 'shell-sort': return algorithmGenerators.shellSort(currentArray);
        case 'bucket-sort': return algorithmGenerators.bucketSort(currentArray);
        case 'comb-sort': return algorithmGenerators.combSort(currentArray);
        case 'cycle-sort': return algorithmGenerators.cycleSort(currentArray);
        case 'odd-even-sort': return algorithmGenerators.oddEvenSort(currentArray);
        case 'tim-sort': return algorithmGenerators.timSort(currentArray);
        case 'tree-sort': return algorithmGenerators.treeSort(currentArray);
        case 'fibonacci': return algorithmGenerators.fibonacci(n || 10);
        case 'knapsack': return algorithmGenerators.knapsack01(weights || [2, 3, 4, 5], values || [3, 4, 5, 6], capacity || 8);
        case 'lcs': return algorithmGenerators.lcs(str1 || "AGGTAB", str2 || "GXTXAYB");
        case 'unbounded-knapsack': return algorithmGenerators.unboundedKnapsack(weights || [1, 3, 4, 5], values || [1, 4, 5, 7], capacity || 8);
        case 'lis': return algorithmGenerators.lis(currentArray);
        case 'edit-distance': return algorithmGenerators.editDistance(str1 || "SUNDAY", str2 || "SATURDAY");
        case 'rod-cutting': return algorithmGenerators.rodCutting(values || [1, 5, 8, 9, 10, 17, 17, 20], n || 8);
        case 'subset-sum': return algorithmGenerators.subsetSum(currentArray, target || 9);
        case 'partition': return algorithmGenerators.partition(currentArray);
        case 'matrix-chain': return algorithmGenerators.matrixChain(currentArray);
        case 'optimal-bst': return algorithmGenerators.optimalBST([10, 12, 20], [34, 8, 50]);
        case 'activity-selection': return algorithmGenerators.activitySelection([1, 3, 0, 5, 8, 5], [2, 4, 6, 7, 9, 9]);
        case 'fractional-knapsack': return algorithmGenerators.fractionalKnapsack(weights || [10, 20, 30], values || [60, 100, 120], capacity || 50);
        case 'job-sequencing': return algorithmGenerators.jobSequencing([4, 1, 1, 1], [20, 10, 40, 30]);
        case 'huffman': return algorithmGenerators.huffman(['a', 'b', 'c', 'd', 'e', 'f'], [5, 9, 12, 13, 16, 45]);
        case 'coin-change-greedy': return algorithmGenerators.coinChangeGreedy([1, 2, 5, 10, 20, 50, 100], target || 93);
        case 'min-platforms': return algorithmGenerators.minPlatforms([900, 940, 950, 1100, 1500, 1800], [910, 1200, 1120, 1130, 1900, 2000]);
        case 'optimal-merge': return algorithmGenerators.optimalMerge(currentArray);
        case 'karatsuba': return algorithmGenerators.karatsuba(target || 1234, n || 5678);
        case 'closest-pair': return algorithmGenerators.closestPair([{ x: 2, y: 3 }, { x: 12, y: 30 }, { x: 40, y: 50 }, { x: 5, y: 1 }, { x: 12, y: 10 }, { x: 3, y: 4 }]);
        case 'dijkstra': return algorithmGenerators.dijkstra({ 0: [{ node: 1, weight: 4 }, { node: 7, weight: 8 }], 1: [{ node: 0, weight: 4 }, { node: 2, weight: 8 }, { node: 7, weight: 11 }], 2: [{ node: 1, weight: 8 }, { node: 8, weight: 2 }, { node: 3, weight: 7 }, { node: 5, weight: 4 }], 3: [{ node: 2, weight: 7 }, { node: 4, weight: 9 }, { node: 5, weight: 14 }], 4: [{ node: 3, weight: 9 }, { node: 5, weight: 10 }], 5: [{ node: 2, weight: 4 }, { node: 3, weight: 14 }, { node: 4, weight: 10 }, { node: 6, weight: 2 }], 6: [{ node: 5, weight: 2 }, { node: 7, weight: 1 }, { node: 8, weight: 6 }], 7: [{ node: 0, weight: 8 }, { node: 1, weight: 11 }, { node: 6, weight: 1 }, { node: 8, weight: 7 }], 8: [{ node: 2, weight: 2 }, { node: 6, weight: 6 }, { node: 7, weight: 7 }] }, 0);
        case 'kruskal': return algorithmGenerators.kruskal(9, [{ u: 0, v: 1, w: 4 }, { u: 0, v: 7, w: 8 }, { u: 1, v: 2, w: 8 }, { u: 1, v: 7, w: 11 }, { u: 2, v: 3, w: 7 }, { u: 2, v: 8, w: 2 }, { u: 2, v: 5, w: 4 }, { u: 3, v: 4, w: 9 }, { u: 3, v: 5, w: 14 }, { u: 4, v: 5, w: 10 }, { u: 5, v: 6, w: 2 }, { u: 6, v: 7, w: 1 }, { u: 6, v: 8, w: 6 }, { u: 7, v: 8, w: 7 }]);
        case 'prim': return algorithmGenerators.prim(9, [[0, 4, 0, 0, 0, 0, 0, 8, 0], [4, 0, 8, 0, 0, 0, 0, 11, 0], [0, 8, 0, 7, 0, 4, 0, 0, 2], [0, 0, 7, 0, 9, 14, 0, 0, 0], [0, 0, 0, 9, 0, 10, 0, 0, 0], [0, 0, 4, 14, 10, 0, 2, 0, 0], [0, 0, 0, 0, 0, 2, 0, 1, 6], [8, 11, 0, 0, 0, 0, 1, 0, 7], [0, 0, 2, 0, 0, 0, 6, 7, 0]], 0);
        case 'floyd-warshall': return algorithmGenerators.floydWarshall([[0, 5, Infinity, 10], [Infinity, 0, 3, Infinity], [Infinity, Infinity, 0, 1], [Infinity, Infinity, Infinity, 0]]);
        case 'bellman-ford': return algorithmGenerators.bellmanFord(5, [{ u: 0, v: 1, w: -1 }, { u: 0, v: 2, w: 4 }, { u: 1, v: 2, w: 3 }, { u: 1, v: 3, w: 2 }, { u: 1, v: 4, w: 2 }, { u: 3, v: 2, w: 5 }, { u: 3, v: 1, w: 1 }, { u: 4, v: 3, w: -3 }], 0);
        case 'fft': return algorithmGenerators.fft(currentArray);
        case 'median-finding': return algorithmGenerators.findingMedian(currentArray);
        case 'convex-hull': return algorithmGenerators.convexHull([{ x: 0, y: 3 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 4, y: 4 }, { x: 0, y: 0 }, { x: 1, y: 2 }, { x: 3, y: 1 }, { x: 3, y: 3 }]);
        case 'max-min': return algorithmGenerators.maxMin(currentArray);
        case 'strassen': return algorithmGenerators.strassen([[1, 2], [3, 4]], [[5, 6], [7, 8]]);
        default: return [];
    }
}

export function AlgorithmVisualizer(props: AlgorithmVisualizerProps) {
    const { type, array, target, str1, str2, capacity, weights, values, n, hideHeader = false, code } = props;
    const metadata = algorithmMetadata[type];
    const [steps, setSteps] = useState<AlgorithmStep[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [useBackend, setUseBackend] = useState(false);
    const [backendAvailable, setBackendAvailable] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkBackend = async () => {
            const available = await checkBackendStatus();
            setBackendAvailable(available);
        };
        checkBackend();
    }, []);

    useEffect(() => {
        const getSteps = async () => {
            setIsLoading(true);
            setError(null);

            if (useBackend && backendAvailable) {
                try {
                    const params = { array, target, str1, str2, capacity, weights, values, n };
                    const remoteSteps = await fetchAlgorithmSteps(type, params);
                    setSteps(remoteSteps);
                } catch (err: any) {
                    setError("Python backend failed. Falling back to Local Logic.");
                    setSteps(computeLocalSteps(props));
                }
            } else {
                setSteps(computeLocalSteps(props));
            }
            setIsLoading(false);
        };
        getSteps();
    }, [type, array, target, str1, str2, capacity, weights, values, n, useBackend, backendAvailable]);

    const renderVisualization = () => {
        if (!metadata) {
            return (
                <div className="flex flex-col items-center justify-center p-12 bg-background/50 backdrop-blur-sm rounded-xl border border-dashed border-border/50 text-center">
                    <AlertCircle className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
                    <h3 className="text-lg font-bold text-white uppercase italic tracking-wider mb-2">Algorithm Definition Missing</h3>
                    <p className="text-white/40 text-sm max-w-md mx-auto italic">
                        The metadata for <span className="text-[var(--neon-cyan)] font-mono">"{type}"</span> could not be found.
                        Please ensure it is added to the <span className="font-mono">algorithmMetadata</span> registry.
                    </p>
                </div>
            );
        }

        if (!useBackend && type === 'linear-search') return <LinearSearchVisualization array={array || []} target={target!} hideHeader={hideHeader} />;
        if (!useBackend && type === 'binary-search') return <BinarySearchVisualization array={array || []} target={target!} hideHeader={hideHeader} />;

        if (type === 'bst') return <BinaryTreeVisualizer hideHeader={hideHeader} />;
        if (type === 'binary-search-interactive') return <BinarySearchVisualizer hideHeader={hideHeader} />;

        if (metadata.category === 'dp' || type === 'floyd-warshall') {
            return (
                <UnifiedMatrixVisualization
                    algorithmName={metadata.name}
                    description={metadata.description}
                    steps={steps}
                    timeComplexity={metadata.timeComplexity}
                    spaceComplexity={metadata.spaceComplexity}
                    hideHeader={hideHeader}
                />
            );
        }

        if (type === 'dijkstra' || type === 'kruskal' || type === 'prim' || type === 'bellman-ford' || type === 'bfs' || type === 'dfs' || type === 'topological-sort') {
            return (
                <UnifiedGraphVisualization
                    algorithmName={metadata.name}
                    description={metadata.description}
                    steps={steps}
                    timeComplexity={metadata.timeComplexity}
                    spaceComplexity={metadata.spaceComplexity}
                    hideHeader={hideHeader}
                />
            );
        }

        if (type === 'closest-pair' || type === 'convex-hull') {
            return (
                <UnifiedGeometricVisualization
                    algorithmName={metadata.name}
                    description={metadata.description}
                    steps={steps}
                    timeComplexity={metadata.timeComplexity}
                    spaceComplexity={metadata.spaceComplexity}
                    hideHeader={hideHeader}
                />
            );
        }

        if (type === 'kmp' || type === 'rabin-karp') {
            return (
                <UnifiedStringVisualization
                    algorithmName={metadata.name}
                    description={metadata.description}
                    steps={steps}
                    timeComplexity={metadata.timeComplexity}
                    spaceComplexity={metadata.spaceComplexity}
                    hideHeader={hideHeader}
                />
            );
        }

        return (
            <UnifiedArrayVisualization
                algorithmName={metadata.name}
                description={metadata.description}
                array={array || []}
                steps={steps}
                timeComplexity={metadata.timeComplexity}
                spaceComplexity={metadata.spaceComplexity}
                target={target}
                showTarget={metadata.category === 'searching'}
                hideHeader={hideHeader}
                code={code}
            />
        );
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-4 py-2 bg-background/50 backdrop-blur-sm rounded-lg border border-border/50">
                <div className="flex items-center gap-2">
                    <Server className={`w-4 h-4 ${backendAvailable ? 'text-green-500' : 'text-muted-foreground'}`} />
                    <Label htmlFor="backend-toggle" className="text-sm font-medium cursor-pointer">
                        Use Python Backend {backendAvailable ? '(Online)' : '(Offline)'}
                    </Label>
                    <Switch
                        id="backend-toggle"
                        checked={useBackend}
                        onCheckedChange={setUseBackend}
                        disabled={!backendAvailable && !useBackend}
                    />
                </div>
                {isLoading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                {error && (
                    <div className="flex items-center gap-1 text-xs text-destructive">
                        <AlertCircle className="w-3 h-3" />
                        {error}
                    </div>
                )}
            </div>

            {renderVisualization()}
        </div>
    );
}
