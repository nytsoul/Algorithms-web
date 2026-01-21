import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlgorithmVisualizer, AlgorithmType } from '@/components/visualizations/AlgorithmVisualizer';
import { UnifiedArrayVisualization } from '@/components/visualizations/UnifiedArrayVisualization';
import { additionalGenerators } from '@/lib/additional-algorithms';
import { Search, ArrowUpDown, Brain, Network } from 'lucide-react';

const algorithmCategories = {
    searching: {
        icon: Search,
        color: 'cyan',
        algorithms: [
            { id: 'linear-search', name: 'Linear Search', needsTarget: true },
            { id: 'binary-search', name: 'Binary Search', needsTarget: true },
            { id: 'jump-search', name: 'Jump Search', needsTarget: true },
            { id: 'interpolation-search', name: 'Interpolation Search', needsTarget: true },
            { id: 'ternary-search', name: 'Ternary Search', needsTarget: true },
            { id: 'exponential-search', name: 'Exponential Search', needsTarget: true },
            { id: 'fibonacci-search', name: 'Fibonacci Search', needsTarget: true },
        ]
    },
    sorting: {
        icon: ArrowUpDown,
        color: 'purple',
        algorithms: [
            { id: 'bubble-sort', name: 'Bubble Sort' },
            { id: 'selection-sort', name: 'Selection Sort' },
            { id: 'insertion-sort', name: 'Insertion Sort' },
            { id: 'merge-sort', name: 'Merge Sort' },
            { id: 'quick-sort', name: 'Quick Sort' },
            { id: 'heap-sort', name: 'Heap Sort' },
            { id: 'counting-sort', name: 'Counting Sort' },
            { id: 'radix-sort', name: 'Radix Sort' },
            { id: 'shell-sort', name: 'Shell Sort' },
            { id: 'bucket-sort', name: 'Bucket Sort' },
            { id: 'comb-sort', name: 'Comb Sort' },
            { id: 'cycle-sort', name: 'Cycle Sort' },
            { id: 'odd-even-sort', name: 'Odd-Even Sort' },
        ]
    },
    dp: {
        icon: Brain,
        color: 'green',
        algorithms: [
            { id: 'fibonacci', name: 'Fibonacci', customInput: 'n' },
            { id: 'knapsack', name: '0/1 Knapsack', customInput: 'knapsack' },
            { id: 'lcs', name: 'LCS', customInput: 'strings' },
            { id: 'unbounded-knapsack', name: 'Unbounded Knapsack', customInput: 'knapsack' },
            { id: 'lis', name: 'LIS', customInput: 'array' },
            { id: 'edit-distance', name: 'Edit Distance', customInput: 'strings' },
            { id: 'rod-cutting', name: 'Rod Cutting', customInput: 'n' },
            { id: 'subset-sum', name: 'Subset Sum', customInput: 'target' },
            { id: 'partition', name: 'Partition', customInput: 'array' },
            { id: 'matrix-chain', name: 'Matrix Chain', customInput: 'array' },
        ]
    },
    greedy: {
        icon: Network, // Reuse network icon or use something else
        color: 'yellow',
        algorithms: [
            { id: 'activity-selection', name: 'Activity Selection' },
            { id: 'fractional-knapsack', name: 'Fractional Knapsack' },
            { id: 'job-sequencing', name: 'Job Sequencing' },
            { id: 'huffman', name: 'Huffman Coding' },
            { id: 'coin-change-greedy', name: 'Coin Change (Greedy)' },
            { id: 'min-platforms', name: 'Min Platforms' },
        ]
    },
    advanced: {
        icon: Network,
        color: 'red',
        algorithms: [
            { id: 'karatsuba', name: 'Karatsuba Multi.' },
            { id: 'closest-pair', name: 'Closest Pair' },
            { id: 'floyd-warshall', name: 'Floyd-Warshall' },
            { id: 'bellman-ford', name: 'Bellman-Ford' },
            { id: 'dijkstra', name: 'Dijkstra' },
            { id: 'kruskal', name: 'Kruskal MST' },
            { id: 'prim', name: 'Prim MST' },
            { id: 'bfs', name: 'BFS' },
            { id: 'dfs', name: 'DFS' },
            { id: 'topological-sort', name: 'Topological Sort' },
            { id: 'n-queens', name: 'N-Queens', customInput: 'n' },
            { id: 'sudoku-solver', name: 'Sudoku Solver' },
            { id: 'kmp', name: 'KMP Algorithm', customInput: 'strings' },
            { id: 'rabin-karp', name: 'Rabin-Karp', customInput: 'strings' },
            { id: 'fft', name: 'FFT' },
            { id: 'convex-hull', name: 'Convex Hull' },
        ]
    }
};



export default function AlgorithmVisualizationsPage() {
    const [selectedCategory, setSelectedCategory] = useState<'searching' | 'sorting' | 'dp' | 'greedy' | 'advanced'>('searching');

    const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('linear-search');
    const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90, 45, 78, 33]);
    const [target, setTarget] = useState<number>(22);
    const [fibN, setFibN] = useState<number>(10);
    const [str1, setStr1] = useState<string>("SUNDAY");
    const [str2, setStr2] = useState<string>("SATURDAY");

    const generateRandomArray = () => {
        const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
        setArray(newArray);
        setTarget(newArray[Math.floor(Math.random() * newArray.length)]);
    };

    const renderVisualization = () => {
        const category = algorithmCategories[selectedCategory];
        const algorithm = category.algorithms.find(a => a.id === selectedAlgorithm);

        if (!algorithm) return null;

        return (
            <AlgorithmVisualizer
                type={selectedAlgorithm as AlgorithmType}
                array={array}
                target={target}
                str1={str1}
                str2={str2}
                n={fibN}
                capacity={8}
                weights={[2, 3, 4, 5]}
                values={[3, 4, 5, 6]}
            />
        );
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#0a0a0f] p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <h1 className="text-5xl font-black text-white uppercase italic tracking-tight">
                        <span className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent">
                            DSA Visualizations
                        </span>
                    </h1>
                    <p className="text-white/60 text-lg">
                        Interactive visualizations for Data Structures & Algorithms
                    </p>
                </motion.div>

                {/* Category Selection */}
                <div className="flex justify-center gap-4">
                    {Object.entries(algorithmCategories).map(([key, category]) => {
                        const Icon = category.icon;
                        const isActive = selectedCategory === key;

                        return (
                            <button
                                key={key}
                                onClick={() => {
                                    setSelectedCategory(key as any);
                                    setSelectedAlgorithm(category.algorithms[0].id);
                                }}
                                className={`
                  flex items-center gap-3 px-6 py-3 rounded-xl font-bold uppercase tracking-wide
                  transition-all duration-300
                  ${isActive
                                        ? `bg-[var(--neon-${category.color})] text-black`
                                        : 'bg-white/5 text-white/40 hover:bg-white/10'
                                    }
                `}
                            >
                                <Icon className="w-5 h-5" />
                                {key}
                            </button>
                        );
                    })}
                </div>

                {/* Algorithm Selection */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <div className="flex flex-wrap gap-3">
                        {algorithmCategories[selectedCategory].algorithms.map((algo) => (
                            <button
                                key={algo.id}
                                onClick={() => setSelectedAlgorithm(algo.id)}
                                className={`
                  px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200
                  ${selectedAlgorithm === algo.id
                                        ? 'bg-[var(--neon-cyan)] text-black font-bold'
                                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                                    }
                `}
                            >
                                {algo.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Controls */}
                {selectedCategory !== 'dp' && (
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-6">
                            <div className="flex-1">
                                <label className="text-white/60 text-sm mb-2 block">Array</label>
                                <div className="flex gap-2">
                                    {array.map((val, idx) => (
                                        <input
                                            key={idx}
                                            type="number"
                                            value={val}
                                            onChange={(e) => {
                                                const newArray = [...array];
                                                newArray[idx] = parseInt(e.target.value) || 0;
                                                setArray(newArray);
                                            }}
                                            className="w-16 bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-white text-center"
                                        />
                                    ))}
                                </div>
                            </div>

                            {selectedCategory === 'searching' && (
                                <div>
                                    <label className="text-white/60 text-sm mb-2 block">Target</label>
                                    <input
                                        type="number"
                                        value={target}
                                        onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
                                        className="w-24 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white"
                                    />
                                </div>
                            )}

                            <button
                                onClick={generateRandomArray}
                                className="bg-[var(--neon-purple)] text-white px-6 py-2 rounded-lg font-bold hover:bg-[var(--neon-purple)]/90 transition-all"
                            >
                                Randomize
                            </button>
                        </div>
                    </div>
                )}

                {/* Visualization */}
                <div className="mt-8">
                    {renderVisualization()}
                </div>
            </div>
        </div>
    );
}
