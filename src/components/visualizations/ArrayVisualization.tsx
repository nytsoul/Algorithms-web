import { motion } from 'framer-motion';
import { VisualizationStep } from '@/lib/algorithm-schema';

interface ArrayVisualizationProps {
    step: VisualizationStep;
    maxValue?: number;
}

export function ArrayVisualization({ step, maxValue }: ArrayVisualizationProps) {
    const array = step.array || [];
    const highlight = step.highlight || [];
    const sorted = step.sorted || [];
    const comparison = step.comparison;
    const swap = step.swap;

    const max = maxValue || Math.max(...array, 1);

    const getBarColor = (index: number, value: number) => {
        // Sorted elements
        if (sorted.includes(index)) {
            return 'var(--neon-green)';
        }

        // Currently comparing
        if (comparison && comparison.indices.includes(index)) {
            return comparison.result ? 'var(--neon-yellow)' : 'var(--neon-pink)';
        }

        // Being swapped
        if (swap && swap.indices.includes(index)) {
            return 'var(--neon-purple)';
        }

        // Highlighted/active
        if (highlight.includes(index)) {
            return 'var(--neon-cyan)';
        }

        // Default
        return 'var(--neon-cyan)/40';
    };

    const getBarHeight = (value: number) => {
        return `${(value / max) * 100}%`;
    };

    return (
        <div className="w-full h-full flex flex-col">
            {/* Array Visualization */}
            <div className="flex-1 flex items-end justify-center gap-2 px-4">
                {array.map((value, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center gap-2 flex-1 max-w-[80px]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: highlight.includes(index) || (comparison?.indices.includes(index)) || (swap?.indices.includes(index)) ? 1.1 : 1
                        }}
                        transition={{
                            duration: 0.3,
                            delay: index * 0.05
                        }}
                    >
                        {/* Value label */}
                        <motion.div
                            className="text-sm font-bold font-mono"
                            animate={{
                                color: getBarColor(index, value),
                                scale: highlight.includes(index) ? 1.2 : 1
                            }}
                        >
                            {value}
                        </motion.div>

                        {/* Bar */}
                        <div className="w-full relative" style={{ height: '300px' }}>
                            <motion.div
                                className="absolute bottom-0 w-full rounded-t-lg border-2 border-white/10"
                                style={{
                                    backgroundColor: getBarColor(index, value),
                                    boxShadow: `0 0 20px ${getBarColor(index, value)}40`
                                }}
                                initial={{ height: 0 }}
                                animate={{
                                    height: getBarHeight(value),
                                    backgroundColor: getBarColor(index, value)
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Glow effect for active elements */}
                                {(highlight.includes(index) || comparison?.indices.includes(index) || swap?.indices.includes(index)) && (
                                    <motion.div
                                        className="absolute inset-0 rounded-t-lg"
                                        style={{
                                            background: `radial-gradient(circle at center, ${getBarColor(index, value)}60 0%, transparent 70%)`
                                        }}
                                        animate={{
                                            opacity: [0.5, 1, 0.5]
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity
                                        }}
                                    />
                                )}
                            </motion.div>
                        </div>

                        {/* Index label */}
                        <div className="text-xs text-muted-foreground font-mono">
                            [{index}]
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[var(--neon-cyan)] shadow-lg shadow-[var(--neon-cyan)]/50" />
                    <span className="text-[var(--neon-cyan)]">Active</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[var(--neon-yellow)] shadow-lg shadow-[var(--neon-yellow)]/50" />
                    <span className="text-[var(--neon-yellow)]">Comparing</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[var(--neon-purple)] shadow-lg shadow-[var(--neon-purple)]/50" />
                    <span className="text-[var(--neon-purple)]">Swapping</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[var(--neon-green)] shadow-lg shadow-[var(--neon-green)]/50" />
                    <span className="text-[var(--neon-green)]">Sorted</span>
                </div>
            </div>
        </div>
    );
}
