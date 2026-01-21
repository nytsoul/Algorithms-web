import React from 'react';
import { motion } from 'framer-motion';
import { useVisualizationEngine, useVisualizationStats } from '@/hooks/useVisualizationEngine';
import { VisualizationControls } from './VisualizationControls';
import type { AlgorithmStep } from '@/types/visualization-types';

interface UnifiedStringVisualizationProps {
    algorithmName: string;
    description: string;
    steps: AlgorithmStep[];
    timeComplexity: string;
    spaceComplexity: string;
    hideHeader?: boolean;
}

export function UnifiedStringVisualization({
    algorithmName,
    description,
    steps,
    timeComplexity,
    spaceComplexity,
    hideHeader = false
}: UnifiedStringVisualizationProps) {
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
        input: {},
        stats: {
            ...stats,
            comparisons: currentStep?.data.comparisons || 0,
            swaps: currentStep?.data.swaps || 0,
        }
    };

    const text = currentStep?.data.text || "";
    const pattern = currentStep?.data.pattern || "";
    const textIdx = currentStep?.data.text_idx;
    const patternIdx = currentStep?.data.pattern_idx;
    const lps = currentStep?.data.lps;
    const foundIndex = currentStep?.data.found_index;

    return (
        <div className="space-y-6">
            {!hideHeader && (
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">
                            {algorithmName}
                        </h3>
                        <p className="text-white/40 text-sm mt-1">{description}</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-[#0a0a0c]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-8 min-h-[300px] flex flex-col justify-center gap-12 relative overflow-hidden group/viz">
                        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

                        {/* Text Display */}
                        <div className="relative z-10 space-y-4">
                            <label className="text-[var(--neon-cyan)] text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Target Text</label>
                            <div className="flex flex-wrap gap-1.5">
                                {text.split('').map((char: string, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        animate={{
                                            backgroundColor: idx === textIdx ? 'rgba(0, 243, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                                            borderColor: idx === textIdx ? '#00f3ff' : 'rgba(255, 255, 255, 0.08)',
                                            scale: idx === textIdx ? 1.05 : 1,
                                            boxShadow: idx === textIdx ? '0 0 15px rgba(0, 243, 255, 0.3)' : 'none'
                                        }}
                                        className="w-10 h-12 flex items-center justify-center border rounded-lg text-white font-mono text-xl relative overflow-hidden transition-all"
                                    >
                                        <div className="relative z-10">{char}</div>
                                        {idx === textIdx && (
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-[var(--neon-cyan)] animate-pulse">
                                                ▼
                                            </div>
                                        )}
                                        {foundIndex !== undefined && idx >= foundIndex && idx < foundIndex + pattern.length && (
                                            <div className="absolute inset-0 bg-green-500/30 rounded-lg pointer-events-none animate-pulse" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Pattern Display */}
                        <div className="relative z-10 space-y-4">
                            <label className="text-[var(--neon-purple)] text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Search Pattern</label>
                            <div className="flex flex-wrap gap-1.5">
                                {pattern.split('').map((char: string, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        animate={{
                                            backgroundColor: idx === patternIdx ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                                            borderColor: idx === patternIdx ? '#a855f7' : 'rgba(255, 255, 255, 0.08)',
                                            scale: idx === patternIdx ? 1.05 : 1,
                                            boxShadow: idx === patternIdx ? '0 0 15px rgba(168, 85, 247, 0.3)' : 'none'
                                        }}
                                        className="w-10 h-12 flex items-center justify-center border rounded-lg text-white font-mono text-xl relative overflow-hidden transition-all"
                                    >
                                        <div className="relative z-10">{char}</div>
                                        {idx === patternIdx && (
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-[var(--neon-purple)] animate-pulse">
                                                ▼
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* LPS Table (for KMP) */}
                        {lps && (
                            <div className="relative z-10 space-y-4 pt-6 border-t border-white/5">
                                <label className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Pre-processing: LPS Table</label>
                                <div className="flex flex-wrap gap-1.5">
                                    {lps.map((val: number, idx: number) => (
                                        <div key={idx} className="flex flex-col items-center">
                                            <div className="w-10 h-10 flex items-center justify-center border border-white/5 bg-white/5 rounded-lg text-[var(--neon-cyan)] font-mono text-lg shadow-inner">
                                                {val}
                                            </div>
                                            <span className="text-[9px] text-white/30 font-black font-mono mt-1.5 uppercase opacity-60 italic">{pattern[idx]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
                        <p className="text-white/80 font-mono text-sm">
                            {currentStep?.description || "Initializing string search analysis..."}
                        </p>
                    </div>
                </div>

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
        </div>
    );
}
