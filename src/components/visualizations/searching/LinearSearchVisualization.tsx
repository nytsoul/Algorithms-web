import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, XCircle } from 'lucide-react';
import { useVisualizationEngine, useVisualizationStats } from '@/hooks/useVisualizationEngine';
import { VisualizationControls } from '../VisualizationControls';
import type { AlgorithmStep } from '@/types/visualization-types';

interface LinearSearchProps {
    array: number[];
    target: number;
    hideHeader?: boolean;
}

// Generate steps for linear search
function generateLinearSearchSteps(array: number[], target: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    let comparisons = 0;

    // Initial state
    steps.push({
        id: 'init',
        description: `Starting Linear Search for target value ${target}`,
        highlightedIndices: [],
        comparedIndices: [],
        data: { array, target, found: false, index: -1 }
    });

    // Search through array
    for (let i = 0; i < array.length; i++) {
        comparisons++;

        // Comparing current element
        steps.push({
            id: `compare-${i}`,
            description: `Comparing array[${i}] = ${array[i]} with target ${target}`,
            currentIndex: i,
            comparedIndices: [i],
            data: { array, target, found: false, index: -1, comparisons }
        });

        if (array[i] === target) {
            // Found the target
            steps.push({
                id: `found-${i}`,
                description: `✅ Target ${target} found at index ${i}!`,
                highlightedIndices: [i],
                data: { array, target, found: true, index: i, comparisons }
            });
            return steps;
        } else {
            // Not found, continue
            steps.push({
                id: `not-match-${i}`,
                description: `${array[i]} ≠ ${target}, moving to next element`,
                highlightedIndices: [],
                data: { array, target, found: false, index: -1, comparisons }
            });
        }
    }

    // Target not found
    steps.push({
        id: 'not-found',
        description: `❌ Target ${target} not found in the array`,
        highlightedIndices: [],
        data: { array, target, found: false, index: -1, comparisons }
    });

    return steps;
}

export function LinearSearchVisualization({ array, target, hideHeader = false }: LinearSearchProps) {
    const steps = useMemo(() => generateLinearSearchSteps(array, target), [array, target]);

    const {
        currentStep,
        currentStepIndex,
        totalSteps,
        animationState,
        speed,
        play,
        pause,
        reset,
        stepForward,
        stepBackward,
        goToStep,
        setSpeed
    } = useVisualizationEngine({
        steps,
        initialSpeed: 1
    });

    const { stats } = useVisualizationStats({
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)'
    });

    const visualizationState = {
        steps,
        currentStepIndex,
        animationState,
        speed,
        autoPlay: animationState === 'playing',
        input: { array, target },
        stats: {
            ...stats,
            comparisons: currentStep?.data.comparisons || 0,
            swaps: 0,
            arrayAccesses: currentStep?.data.comparisons || 0
        }
    };

    const maxValue = Math.max(...array);
    const found = currentStep?.data.found;
    const foundIndex = currentStep?.data.index;

    return (
        <div className="space-y-6">
            {!hideHeader && (
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">
                            Linear Search
                        </h3>
                        <p className="text-white/40 text-sm mt-1">
                            Sequential search through each element
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
                        <div className="flex items-end justify-center gap-2 h-64">
                            {array.map((value, index) => {
                                const isCurrent = currentStep?.currentIndex === index;
                                const isCompared = currentStep?.comparedIndices?.includes(index);
                                const isHighlighted = currentStep?.highlightedIndices?.includes(index);
                                const height = (value / maxValue) * 100;

                                let barColor = 'bg-white/10';
                                if (isHighlighted) {
                                    barColor = 'bg-gradient-to-t from-green-500 to-green-400';
                                } else if (isCurrent || isCompared) {
                                    barColor = 'bg-gradient-to-t from-[var(--neon-cyan)] to-[var(--neon-purple)]';
                                }

                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                        <motion.div
                                            className={`w-full rounded-t-lg ${barColor} relative`}
                                            initial={{ height: 0 }}
                                            animate={{ height: `${height}%` }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {(isCurrent || isHighlighted) && (
                                                <motion.div
                                                    className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    {isHighlighted ? (
                                                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                                                    ) : (
                                                        <Search className="w-5 h-5 text-[var(--neon-cyan)]" />
                                                    )}
                                                </motion.div>
                                            )}
                                        </motion.div>
                                        <div className="text-center">
                                            <div className={`font-mono text-sm ${isHighlighted ? 'text-green-400 font-bold' :
                                                isCurrent ? 'text-[var(--neon-cyan)] font-bold' :
                                                    'text-white/40'
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
                                                    Target {target} found at index {foundIndex}
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
                <h4 className="text-lg font-bold text-white mb-4">How Linear Search Works</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-[var(--neon-cyan)] font-bold mb-2">Step 1: Start</div>
                        <div className="text-white/60">Begin from the first element of the array</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-[var(--neon-purple)] font-bold mb-2">Step 2: Compare</div>
                        <div className="text-white/60">Compare current element with target value</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                        <div className="text-green-400 font-bold mb-2">Step 3: Result</div>
                        <div className="text-white/60">If match found, return index. Otherwise, continue</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
