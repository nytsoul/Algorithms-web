import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, SkipForward, SkipBack, Gauge, History, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ControlPanelProps, VisualizationSpeed } from '@/types/visualization-types';

const speedOptions: { value: VisualizationSpeed; label: string }[] = [
    { value: 0.25, label: '0.25x' },
    { value: 0.5, label: '0.5x' },
    { value: 1, label: '1x' },
    { value: 2, label: '2x' },
    { value: 4, label: '4x' }
];

export function VisualizationControls({
    state,
    onPlay,
    onPause,
    onReset,
    onStepForward,
    onStepBackward,
    onJumpToStep,
    onSpeedChange
}: ControlPanelProps) {
    const { animationState, speed, currentStepIndex, steps } = state;
    const isPlaying = animationState === 'playing';
    const isCompleted = animationState === 'completed';
    const canStepForward = currentStepIndex < steps.length - 1;
    const canStepBackward = currentStepIndex > 0;

    const progress = steps.length > 0 ? (currentStepIndex / (steps.length - 1)) * 100 : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col overflow-hidden"
        >
            <div className="p-6 space-y-6">
                {/* Progress Section */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-[0.2em] font-mono">
                        <span className="text-white/40">Progress</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[var(--neon-cyan)] font-bold">{currentStepIndex + 1}</span>
                            <span className="text-white/20">/</span>
                            <span className="text-white/60">{steps.length}</span>
                        </div>
                    </div>

                    {/* Horizontal Progress Bar - Full Width of container */}
                    <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-pink)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                {/* Main Controls */}
                <div className="flex items-center justify-center gap-3">
                    <Button
                        onClick={onStepBackward}
                        disabled={!canStepBackward || isPlaying}
                        variant="outline"
                        size="icon"
                        className="border-white/10 hover:border-[var(--neon-cyan)]/50 hover:bg-[var(--neon-cyan)]/10"
                    >
                        <SkipBack className="w-4 h-4" />
                    </Button>

                    {!isPlaying ? (
                        <Button
                            onClick={isCompleted ? onReset : onPlay}
                            size="lg"
                            className="bg-[var(--neon-cyan)] text-black hover:bg-[var(--neon-cyan)]/90 w-20 h-12"
                        >
                            {isCompleted ? (
                                <RotateCcw className="w-5 h-5" />
                            ) : (
                                <Play className="w-5 h-5 ml-1" />
                            )}
                        </Button>
                    ) : (
                        <Button
                            onClick={onPause}
                            size="lg"
                            className="bg-[var(--neon-purple)] text-white hover:bg-[var(--neon-purple)]/90 w-20 h-12"
                        >
                            <Pause className="w-5 h-5" />
                        </Button>
                    )}

                    <Button
                        onClick={onStepForward}
                        disabled={!canStepForward || isPlaying}
                        variant="outline"
                        size="icon"
                        className="border-white/10 hover:border-[var(--neon-cyan)]/50 hover:bg-[var(--neon-cyan)]/10"
                    >
                        <SkipForward className="w-4 h-4" />
                    </Button>

                    <Button
                        onClick={onReset}
                        variant="outline"
                        size="icon"
                        className="border-white/10 hover:border-red-500/50 hover:bg-red-500/10 ml-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </div>

                {/* Speed Control */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-white/60">
                            <Gauge className="w-4 h-4" />
                            <span>Speed</span>
                        </div>
                        <span className="text-[var(--neon-cyan)] font-mono text-sm font-bold">
                            {speed}x
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        {speedOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => onSpeedChange(option.value)}
                                className={`
                flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold
                transition-all duration-200
                ${speed === option.value
                                        ? 'bg-[var(--neon-cyan)] text-black'
                                        : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
                                    }
              `}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Current Step Description */}
                {steps[currentStepIndex] && (
                    <motion.div
                        key={currentStepIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-4"
                    >
                        <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                            Current Step
                        </div>
                        <div className="text-white/90 text-sm leading-relaxed">
                            {steps[currentStepIndex].description}
                        </div>
                    </motion.div>
                )}

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-[var(--neon-cyan)]">
                            {state.stats.comparisons}
                        </div>
                        <div className="text-xs text-white/40 mt-1">Comparisons</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-[var(--neon-purple)]">
                            {state.stats.swaps}
                        </div>
                        <div className="text-xs text-white/40 mt-1">Swaps</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-[var(--neon-cyan)]">
                            {state.stats.arrayAccesses}
                        </div>
                        <div className="text-xs text-white/40 mt-1">Accesses</div>
                    </div>
                </div>

                {/* Complexity */}
                <div className="flex justify-between items-center text-sm">
                    <div>
                        <span className="text-white/40">Time: </span>
                        <span className="text-[var(--neon-cyan)] font-mono">
                            {state.stats.timeComplexity}
                        </span>
                    </div>
                    <div>
                        <span className="text-white/40">Space: </span>
                        <span className="text-[var(--neon-purple)] font-mono">
                            {state.stats.spaceComplexity}
                        </span>
                    </div>
                </div>

                {/* Step History List */}
                <div className="space-y-3 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sm text-white/60">
                        <History className="w-4 h-4" />
                        <span>Step History</span>
                    </div>

                    <div className="h-[200px] overflow-y-auto pr-2 custom-scrollbar space-y-2">
                        {steps.map((step, idx) => {
                            const isCurrent = idx === currentStepIndex;
                            const isPast = idx < currentStepIndex;

                            return (
                                <motion.button
                                    key={step.id || idx}
                                    onClick={() => onJumpToStep(idx)}
                                    className={`
                                    w-full text-left p-2.5 rounded-lg border transition-all duration-200 group
                                    ${isCurrent
                                            ? 'bg-[var(--neon-cyan)]/10 border-[var(--neon-cyan)]'
                                            : isPast
                                                ? 'bg-white/5 border-white/10 opacity-60 hover:opacity-100 hover:border-white/20'
                                                : 'bg-transparent border-white/5 opacity-40 hover:opacity-80 hover:border-white/10'
                                        }
                                `}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`
                                        mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border
                                        ${isCurrent
                                                ? 'bg-[var(--neon-cyan)] border-[var(--neon-cyan)] text-black'
                                                : isPast
                                                    ? 'bg-green-500/20 border-green-500/40 text-green-400'
                                                    : 'bg-white/5 border-white/10 text-white/40'
                                            }
                                    `}>
                                            {isPast && !isCurrent ? <CheckCircle2 className="w-3 h-3" /> : idx + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className={`text-[11px] font-mono leading-relaxed line-clamp-2 ${isCurrent ? 'text-white' : 'text-white/60'}`}>
                                                {step.description}
                                            </div>
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.div >
    );
}
