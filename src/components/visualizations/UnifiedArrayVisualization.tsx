import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualizationEngine, useVisualizationStats } from '@/hooks/useVisualizationEngine';
import { VisualizationControls } from './VisualizationControls';
import { CodeSnippet } from './CodeSnippet';
import type { AlgorithmStep } from '@/types/visualization-types';

interface UnifiedArrayVisualizationProps {
    algorithmName: string;
    description: string;
    array: number[];
    steps: AlgorithmStep[];
    timeComplexity: string;
    spaceComplexity: string;
    target?: number;
    showTarget?: boolean;
    hideHeader?: boolean;
    displayMode?: 'bars' | 'boxes';
    code?: string;
}

export function UnifiedArrayVisualization({
    algorithmName,
    description,
    array,
    steps,
    timeComplexity,
    spaceComplexity,
    target,
    showTarget = false,
    hideHeader = false,
    displayMode = 'boxes',
    code
}: UnifiedArrayVisualizationProps) {
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
        timeComplexity,
        spaceComplexity
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
            swaps: currentStep?.data.swaps || 0,
            arrayAccesses: (currentStep?.data.comparisons || 0) + (currentStep?.data.swaps || 0) * 2
        }
    };

    const displayArray = currentStep?.data.array || array;
    const maxValue = Math.max(...displayArray, 1);
    const isComplete = animationState === 'completed';
    const found = currentStep?.data.found;

    return (
        <div className="space-y-6">
            {/* Header */}
            {!hideHeader && (
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">
                            {algorithmName}
                        </h3>
                        <p className="text-white/40 text-sm mt-1">{description}</p>
                    </div>
                    {showTarget && target !== undefined && (
                        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2">
                            <span className="text-white/60 text-sm">Target:</span>
                            <span className="text-[var(--neon-cyan)] font-mono font-bold text-lg">{target}</span>
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visualization */}
                <div className="lg:col-span-2">
                    <div className="bg-[#0a0a0c]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-8 relative overflow-hidden group/viz">
                        {/* Decorative background elements */}
                        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[var(--neon-cyan)]/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[var(--neon-purple)]/10 blur-[100px] rounded-full pointer-events-none" />

                        <div className={`relative flex flex-wrap items-center justify-center gap-2 md:gap-4 ${displayMode === 'bars' ? 'h-64 items-end' : ''}`}>
                            {displayArray.map((value: number, index: number) => {
                                const isCurrent = currentStep?.currentIndex === index;
                                const isCompared = currentStep?.comparedIndices?.includes(index);
                                const isSwapped = currentStep?.swappedIndices?.includes(index);
                                const isHighlighted = currentStep?.highlightedIndices?.includes(index);
                                const isSorted = currentStep?.sortedIndices?.includes(index);
                                const height = (value / maxValue) * 100;

                                let statusColor = 'border-white/10 text-white/40';
                                let bgColor = 'bg-white/5';

                                if (isSorted) {
                                    statusColor = 'border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]';
                                    bgColor = 'bg-green-500/10';
                                } else if (isSwapped) {
                                    statusColor = 'border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]';
                                    bgColor = 'bg-red-500/10';
                                } else if (isCurrent || isCompared || isHighlighted) {
                                    statusColor = 'border-[var(--neon-cyan)] text-[var(--neon-cyan)] shadow-[0_0_15px_rgba(6,182,212,0.4)]';
                                    bgColor = 'bg-[var(--neon-cyan)]/10';
                                }

                                if (displayMode === 'bars') {
                                    let barColor = 'bg-white/10';
                                    if (isSorted) barColor = 'bg-gradient-to-t from-green-500/80 to-green-400';
                                    else if (isHighlighted) barColor = 'bg-gradient-to-t from-[var(--neon-cyan)]/80 to-cyan-400';
                                    else if (isSwapped) barColor = 'bg-gradient-to-t from-red-500/80 to-orange-500';
                                    else if (isCurrent || isCompared) barColor = 'bg-gradient-to-t from-[var(--neon-purple)]/80 to-purple-400';

                                    return (
                                        <div key={index} className="flex-1 flex flex-col items-center gap-2 max-w-[40px]">
                                            <motion.div
                                                className={`w-full rounded-t-md ${barColor} relative transition-shadow duration-300 border-x border-t border-white/10`}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${Math.max(height, 5)}%` }}
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                layout
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent w-1/3 h-full" />
                                            </motion.div>
                                            <div className="text-center">
                                                <div className={`font-mono text-[10px] md:text-sm transition-colors duration-300 ${isSorted ? 'text-green-400 font-bold' : isHighlighted ? 'text-[var(--neon-cyan)] font-bold' : isCurrent ? 'text-[var(--neon-purple)] font-bold' : 'text-white/40'}`}>
                                                    {value}
                                                </div>
                                                <div className="text-[8px] md:text-xs text-white/20 font-mono">[{index}]</div>
                                            </div>
                                        </div>
                                    );
                                }

                                // Boxes Layout (New)
                                return (
                                    <div key={index} className="flex flex-col items-center gap-2">
                                        <motion.div
                                            layout
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className={`
                                                w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl border-2 transition-all duration-300
                                                ${bgColor} ${statusColor}
                                            `}
                                        >
                                            <span className="text-lg md:text-xl font-black font-mono tracking-tighter">
                                                {value}
                                            </span>
                                        </motion.div>
                                        <span className="text-[10px] font-mono text-white/20">
                                            {index}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Result Display */}
                        <AnimatePresence>
                            {isComplete && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className={`mt-10 p-5 rounded-xl border backdrop-blur-md relative overflow-hidden group/result ${found === true
                                        ? 'bg-green-500/10 border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]'
                                        : found === false
                                            ? 'bg-red-500/10 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)]'
                                            : 'bg-[var(--neon-cyan)]/10 border-[var(--neon-cyan)]/30 shadow-[0_0_30px_rgba(6,182,212,0.1)]'
                                        }`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/result:translate-x-full transition-transform duration-1000" />
                                    <div className="text-center relative z-10">
                                        <div className="text-xl font-black text-white uppercase italic tracking-wider flex items-center justify-center gap-3">
                                            {found !== undefined
                                                ? found
                                                    ? <><span className="text-green-400">SUCCESS:</span> Target {target} Isolated</>
                                                    : <><span className="text-red-400">FAILED:</span> Target {target} Not Found</>
                                                : <><span className="text-[var(--neon-cyan)]">COMPLETED:</span> Sequence Ordered</>}
                                        </div>
                                        <p className="text-white/40 text-xs mt-2 font-mono uppercase tracking-widest">
                                            Simulation finalized • {currentStepIndex} steps executed
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-4">
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

            {/* Code Snippet - NEW */}
            {code && (
                <div className="mt-12">
                    <CodeSnippet
                        code={code}
                        activeLine={currentStep?.codeLineNumbers?.[0]}
                        language="javascript"
                    />
                </div>
            )}
        </div>
    );
}
