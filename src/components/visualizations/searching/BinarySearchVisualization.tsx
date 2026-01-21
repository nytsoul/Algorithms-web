import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, XCircle, ArrowDown } from 'lucide-react';
import { useVisualizationEngine, useVisualizationStats } from '@/hooks/useVisualizationEngine';
import { VisualizationControls } from '../VisualizationControls';
import type { AlgorithmStep } from '@/types/visualization-types';

interface BinarySearchProps {
    array: number[]; // Must be sorted
    target: number;
    hideHeader?: boolean;
}

// Generate steps for binary search
function generateBinarySearchSteps(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    let low = 0;
    let high = array.length - 1;
    let comparisons = 0;

    steps.push({
        id: 'init',
        description: `Starting Binary Search for target ${target} in sorted array`,
        data: { array, target, low, high, mid: -1, found: false, comparisons }
    });

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        comparisons++;

        steps.push({
            id: `calculate-mid-${comparisons}`,
            description: `Calculate mid = (${low} + ${high}) / 2 = ${mid}`,
            highlightedIndices: [mid],
            data: { array, target, low, high, mid, found: false, comparisons }
        });

        steps.push({
            id: `compare-${comparisons}`,
            description: `Compare array[${mid}] = ${array[mid]} with target ${target}`,
            comparedIndices: [mid],
            data: { array, target, low, high, mid, found: false, comparisons }
        });

        if (array[mid] === target) {
            steps.push({
                id: `found-${mid}`,
                description: `✅ Target ${target} found at index ${mid}!`,
                highlightedIndices: [mid],
                data: { array, target, low, high, mid, found: true, index: mid, comparisons }
            });
            return steps;
        } else if (array[mid] < target) {
            steps.push({
                id: `search-right-${comparisons}`,
                description: `${array[mid]} < ${target}, search right half (low = ${mid + 1})`,
                data: { array, target, low: mid + 1, high, mid, found: false, comparisons }
            });
            low = mid + 1;
        } else {
            steps.push({
                id: `search-left-${comparisons}`,
                description: `${array[mid]} > ${target}, search left half (high = ${mid - 1})`,
                data: { array, target, low, high: mid - 1, mid, found: false, comparisons }
            });
            high = mid - 1;
        }
    }

    steps.push({
        id: 'not-found',
        description: `❌ Target ${target} not found in the array`,
        data: { array, target, low, high, mid: -1, found: false, comparisons }
    });

    return steps;
}

export function BinarySearchVisualization({ array, target, hideHeader = false }: BinarySearchProps) {
    const sortedArray = useMemo(() => [...array].sort((a, b) => a - b), [array]);
    const steps = useMemo(() => generateBinarySearchSteps(sortedArray, target), [sortedArray, target]);

    const {
        currentStep,
        currentStepIndex,
        animationState,
        speed,
        play,
        pause,
        reset,
        stepForward,
        stepBackward,
        goToStep,
        setSpeed
    } = useVisualizationEngine({ steps, initialSpeed: 1 });

    const { stats } = useVisualizationStats({
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)'
    });

    const visualizationState = {
        steps,
        currentStepIndex,
        animationState,
        speed,
        autoPlay: animationState === 'playing',
        input: { array: sortedArray, target },
        stats: {
            ...stats,
            comparisons: currentStep?.data.comparisons || 0,
            swaps: 0,
            arrayAccesses: (currentStep?.data.comparisons || 0) * 2
        }
    };

    const maxValue = Math.max(...sortedArray);
    const { low, high, mid, found } = currentStep?.data || {};

    return (
        <div className="space-y-6">
            {!hideHeader && (
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">
                            Binary Search
                        </h3>
                        <p className="text-white/40 text-sm mt-1">
                            Divide and conquer search in sorted array
                        </p>
                    </div>
                    <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2">
                        <Search className="w-5 h-5 text-[var(--neon-cyan)]" />
                        <span className="text-white/60 text-sm">Target:</span>
                        <span className="text-[var(--neon-cyan)] font-mono font-bold text-lg">{target}</span>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visualization */}
                <div className="lg:col-span-2">
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                        {/* Pointers Display */}
                        <div className="flex justify-center gap-6 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                                <span className="text-sm text-white/60">Low: <span className="text-blue-400 font-mono">{low ?? '-'}</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-[var(--neon-purple)]"></div>
                                <span className="text-sm text-white/60">Mid: <span className="text-[var(--neon-purple)] font-mono">{mid ?? '-'}</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                                <span className="text-sm text-white/60">High: <span className="text-orange-400 font-mono">{high ?? '-'}</span></span>
                            </div>
                        </div>

                        <div className="flex items-end justify-center gap-2 h-64">
                            {sortedArray.map((value, index) => {
                                const isMid = mid === index;
                                const isLow = low === index;
                                const isHigh = high === index;
                                const isInRange = low !== undefined && high !== undefined && index >= low && index <= high;
                                const isHighlighted = currentStep?.highlightedIndices?.includes(index);
                                const height = (value / maxValue) * 100;

                                let barColor = 'bg-white/5';
                                if (isHighlighted) {
                                    barColor = 'bg-gradient-to-t from-green-500 to-green-400';
                                } else if (isMid) {
                                    barColor = 'bg-gradient-to-t from-[var(--neon-purple)] to-purple-400';
                                } else if (isInRange) {
                                    barColor = 'bg-gradient-to-t from-[var(--neon-cyan)]/30 to-[var(--neon-purple)]/30';
                                }

                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                        {/* Pointer indicators */}
                                        <div className="h-6 flex flex-col items-center justify-end">
                                            {isLow && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    <ArrowDown className="w-4 h-4 text-blue-400" />
                                                </motion.div>
                                            )}
                                            {isMid && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                >
                                                    <ArrowDown className="w-5 h-5 text-[var(--neon-purple)]" />
                                                </motion.div>
                                            )}
                                            {isHigh && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    <ArrowDown className="w-4 h-4 text-orange-400" />
                                                </motion.div>
                                            )}
                                        </div>

                                        <motion.div
                                            className={`w-full rounded-t-lg ${barColor} relative border-t-2 ${isMid ? 'border-[var(--neon-purple)]' :
                                                isLow ? 'border-blue-400' :
                                                    isHigh ? 'border-orange-400' :
                                                        'border-transparent'
                                                }`}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${height}%` }}
                                            transition={{ duration: 0.3 }}
                                        />

                                        <div className="text-center">
                                            <div className={`font-mono text-sm ${isHighlighted ? 'text-green-400 font-bold' :
                                                isMid ? 'text-[var(--neon-purple)] font-bold' :
                                                    isInRange ? 'text-white/80' :
                                                        'text-white/30'
                                                }`}>
                                                {value}
                                            </div>
                                            <div className="text-xs text-white/30 mt-1">[{index}]</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Result Display */}
                        {animationState === 'completed' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`mt-6 p-4 rounded-xl border ${found
                                    ? 'bg-green-500/10 border-green-500/30'
                                    : 'bg-red-500/10 border-red-500/30'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {found ? (
                                        <>
                                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                                            <div>
                                                <div className="text-green-400 font-bold">Element Found!</div>
                                                <div className="text-white/60 text-sm">
                                                    Target {target} found at index {currentStep?.data.index}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="w-6 h-6 text-red-400" />
                                            <div>
                                                <div className="text-red-400 font-bold">Element Not Found</div>
                                                <div className="text-white/60 text-sm">
                                                    Target {target} does not exist in the array
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Controls */}
                <div>
                    <VisualizationControls
                        state={visualizationState}
                        onPlay={play}
                        onPause={pause}
                        onReset={reset}
                        onStepForward={stepForward}
                        onStepBackward={stepBackward}
                        onJumpToStep={goToStep}
                        onSpeedChange={setSpeed}
                    />
                </div>
            </div>

            {/* Algorithm Info */}
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-white mb-4">How Binary Search Works</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-[var(--neon-cyan)] font-bold mb-2">Step 1: Find Middle</div>
                        <div className="text-white/60">Calculate mid = (low + high) / 2</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-[var(--neon-purple)] font-bold mb-2">Step 2: Compare</div>
                        <div className="text-white/60">Compare middle element with target</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-orange-400 font-bold mb-2">Step 3: Divide</div>
                        <div className="text-white/60">Search left or right half based on comparison</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
