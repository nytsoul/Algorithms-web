import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Code2, TrendingUp } from 'lucide-react';

interface ComplexityBreakdownProps {
    timeComplexity: {
        best: string;
        average: string;
        worst: string;
    };
    spaceComplexity: string;
    recurrenceRelation?: string;
    complexityDerivation?: string;
    algorithmName: string;
}

// Generate growth data for complexity visualization
function generateGrowthData(complexity: string) {
    const sizes = [10, 50, 100, 500, 1000, 5000];

    const complexityFunctions: Record<string, (n: number) => number> = {
        'O(1)': (n) => 1,
        'O(log n)': (n) => Math.log2(n),
        'O(n)': (n) => n,
        'O(n log n)': (n) => n * Math.log2(n),
        'O(n²)': (n) => n * n,
        'O(n³)': (n) => n * n * n,
        'O(2^n)': (n) => Math.pow(2, Math.min(n, 20)), // Cap to prevent overflow
        'O(n!)': (n) => {
            // Approximate factorial for visualization
            let result = 1;
            for (let i = 2; i <= Math.min(n, 10); i++) {
                result *= i;
            }
            return result;
        },
    };

    const func = complexityFunctions[complexity] || complexityFunctions['O(n)'];

    return sizes.map(size => ({
        size: size.toString(),
        operations: func(size),
    }));
}

export default function ComplexityBreakdown({
    timeComplexity,
    spaceComplexity,
    recurrenceRelation,
    complexityDerivation,
    algorithmName,
}: ComplexityBreakdownProps) {
    const bestData = generateGrowthData(timeComplexity.best);
    const avgData = generateGrowthData(timeComplexity.average);
    const worstData = generateGrowthData(timeComplexity.worst);

    // Combine data for chart
    const chartData = bestData.map((item, idx) => ({
        size: item.size,
        best: item.operations,
        average: avgData[idx].operations,
        worst: worstData[idx].operations,
    }));

    return (
        <div className="space-y-6">
            {/* Complexity Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Time Complexity Card */}
                <Card className="cyber-card p-6 dark:bg-card/50 bg-white/80 backdrop-blur-sm dark:border-border/50 border-gray-300/40">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 dark:text-white text-gray-900">
                        <TrendingUp className="w-5 h-5 text-[var(--neon-cyan)]" />
                        Time Complexity
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm dark:text-white/60 text-gray-600">Best Case:</span>
                            <span className="font-mono font-bold text-green-500">{timeComplexity.best}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm dark:text-white/60 text-gray-600">Average Case:</span>
                            <span className="font-mono font-bold text-[var(--neon-cyan)]">{timeComplexity.average}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm dark:text-white/60 text-gray-600">Worst Case:</span>
                            <span className="font-mono font-bold text-red-500">{timeComplexity.worst}</span>
                        </div>
                    </div>
                </Card>

                {/* Space Complexity Card */}
                <Card className="cyber-card p-6 dark:bg-card/50 bg-white/80 backdrop-blur-sm dark:border-border/50 border-gray-300/40">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 dark:text-white text-gray-900">
                        <Code2 className="w-5 h-5 text-[var(--neon-purple)]" />
                        Space Complexity
                    </h3>
                    <div className="flex items-center justify-center h-20">
                        <div className="text-center">
                            <div className="font-mono font-bold text-3xl text-[var(--neon-purple)]">
                                {spaceComplexity}
                            </div>
                            <div className="text-xs dark:text-white/40 text-gray-600 mt-2">Auxiliary Space Required</div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Recurrence Relation */}
            {recurrenceRelation && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="dark:bg-white/5 bg-gray-100/80 dark:border dark:border-white/10 border border-gray-300/40 rounded-xl p-6"
                >
                    <h4 className="text-sm font-bold dark:text-white/60 text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-[var(--neon-cyan)]" />
                        Recurrence Relation
                    </h4>
                    <div className="dark:bg-black/40 bg-white/60 rounded-lg p-4 border dark:border-white/10 border-gray-300">
                        <code className="font-mono text-sm dark:text-[var(--neon-cyan)] text-cyan-700 block">
                            {recurrenceRelation}
                        </code>
                    </div>
                </motion.div>
            )}

            {/* Complexity Derivation */}
            {complexityDerivation && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="dark:bg-white/5 bg-gray-100/80 dark:border dark:border-white/10 border border-gray-300/40 rounded-xl p-6"
                >
                    <h4 className="text-sm font-bold dark:text-white/60 text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[var(--neon-green)]" />
                        Complexity Derivation
                    </h4>
                    <p className="text-sm leading-relaxed dark:text-white/80 text-gray-700">
                        {complexityDerivation}
                    </p>
                </motion.div>
            )}

            {/* Growth Chart */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card className="cyber-card p-6 dark:bg-card/50 bg-white/80 backdrop-blur-sm dark:border-border/50 border-gray-300/40">
                    <h4 className="font-bold mb-4 dark:text-white text-gray-900">
                        Performance Growth Pattern
                    </h4>
                    <p className="text-xs dark:text-white/60 text-gray-600 mb-4">
                        Visualization of how the number of operations grows with input size
                    </p>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} />
                            <XAxis
                                dataKey="size"
                                stroke="var(--foreground)"
                                label={{ value: 'Input Size (n)', position: 'insideBottom', offset: -5 }}
                            />
                            <YAxis
                                stroke="var(--foreground)"
                                scale="log"
                                domain={['auto', 'auto']}
                                label={{ value: 'Operations', angle: -90, position: 'insideLeft' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'var(--card)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '8px',
                                }}
                                labelStyle={{ color: 'var(--foreground)' }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="best"
                                stroke="var(--neon-green)"
                                strokeWidth={2}
                                name={`Best: ${timeComplexity.best}`}
                                dot={{ fill: 'var(--neon-green)', r: 4 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="average"
                                stroke="var(--neon-cyan)"
                                strokeWidth={2}
                                name={`Average: ${timeComplexity.average}`}
                                dot={{ fill: 'var(--neon-cyan)', r: 4 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="worst"
                                stroke="var(--neon-pink)"
                                strokeWidth={2}
                                name={`Worst: ${timeComplexity.worst}`}
                                dot={{ fill: 'var(--neon-pink)', r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </motion.div>

            {/* Complexity Comparison */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="dark:bg-[var(--neon-cyan)]/5 dark:border-[var(--neon-cyan)]/10 bg-cyan-50 border border-cyan-200 rounded-xl p-4"
            >
                <p className="text-xs dark:text-[var(--neon-cyan)] text-cyan-700 font-mono leading-relaxed">
                    <strong>Note:</strong> The chart uses logarithmic scale for better visualization.
                    {timeComplexity.average} means the algorithm's performance scales {
                        timeComplexity.average.includes('log') ? 'logarithmically' :
                            timeComplexity.average.includes('n²') ? 'quadratically' :
                                timeComplexity.average.includes('n³') ? 'cubically' :
                                    timeComplexity.average.includes('2^n') ? 'exponentially' :
                                        timeComplexity.average.includes('n!') ? 'factorially' :
                                            'linearly'
                    } with input size.
                </p>
            </motion.div>
        </div>
    );
}
