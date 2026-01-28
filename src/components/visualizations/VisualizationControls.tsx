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
            className="dark:bg-black/40 dark:backdrop-blur-xl dark:border dark:border-white/10 bg-white/80 backdrop-blur-xl border border-gray-300/40 rounded-2xl flex flex-col overflow-hidden"
        >
            <div className="p-6 space-y-6">
                {/* Progress Section */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-[0.2em] font-mono">
                        <span className="dark:text-white/40 text-gray-600">Progress</span>
                        <div className="flex items-center gap-2">
                            <span className="text-[var(--neon-cyan)] font-bold">{currentStepIndex + 1}</span>
                            <span className="dark:text-white/20 text-gray-400">/</span>
                            <span className="dark:text-white/60 text-gray-600">{steps.length}</span>
                        </div>
                    </div>

                    {/* Horizontal Progress Bar - Full Width of container */}
                    <div className="relative h-1.5 dark:bg-white/5 bg-gray-300/30 rounded-full overflow-hidden">
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
                        className="dark:border-white/10 dark:hover:border-[var(--neon-cyan)]/50 dark:hover:bg-[var(--neon-cyan)]/10 border-gray-400 hover:border-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/15 dark:text-white/40 text-gray-700"
                    >
                        <SkipBack className="w-4 h-4" />
                    </Button>

                    {!isPlaying ? (
                        <Button
                            onClick={isCompleted ? onReset : onPlay}
                            size="lg"
                            className="bg-[var(--neon-cyan)] dark:text-black text-white hover:bg-[var(--neon-cyan)]/90 w-20 h-12"
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
                            className="bg-[var(--neon-purple)] dark:text-white text-white hover:bg-[var(--neon-purple)]/90 w-20 h-12"
                        >
                            <Pause className="w-5 h-5" />
                        </Button>
                    )}

                    <Button
                        onClick={onStepForward}
                        disabled={!canStepForward || isPlaying}
                        variant="outline"
                        size="icon"
                        className="dark:border-white/10 dark:hover:border-[var(--neon-cyan)]/50 dark:hover:bg-[var(--neon-cyan)]/10 border-gray-400 hover:border-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/15 dark:text-white/40 text-gray-700"
                    >
                        <SkipForward className="w-4 h-4" />
                    </Button>

                    <Button
                        onClick={onReset}
                        variant="outline"
                        size="icon"
                        className="dark:border-white/10 dark:hover:border-red-500/50 dark:hover:bg-red-500/10 border-gray-400 hover:border-red-500 hover:bg-red-500/15 dark:text-white/40 text-gray-700 ml-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </div>

                {/* Speed Control */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm dark:text-white/60 text-gray-700">
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
                                        ? 'bg-[var(--neon-cyan)] dark:text-black text-white'
                                        : 'dark:bg-white/5 dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white/60 bg-gray-300/40 text-gray-700 hover:bg-gray-300/60 hover:text-gray-900'
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
                        className="dark:bg-white/5 dark:border-white/10 bg-gray-300/30 border border-gray-400/40 rounded-xl p-4"
                    >
                        <div className="text-xs dark:text-white/40 text-gray-700 uppercase tracking-wider mb-2">
                            Current Step
                        </div>
                        <div className="dark:text-white/90 text-gray-900 text-sm leading-relaxed">
                            {steps[currentStepIndex].description}
                        </div>
                    </motion.div>
                )}

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="dark:bg-white/5 bg-gray-300/30 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-[var(--neon-cyan)]">
                            {state.stats.comparisons}
                        </div>
                        <div className="text-xs dark:text-white/40 text-gray-700 mt-1">Comparisons</div>
                    </div>
                    <div className="dark:bg-white/5 bg-gray-300/30 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-[var(--neon-purple)]">
                            {state.stats.swaps}
                        </div>
                        <div className="text-xs dark:text-white/40 text-gray-700 mt-1">Swaps</div>
                    </div>
                    <div className="dark:bg-white/5 bg-gray-300/30 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-[var(--neon-cyan)]">
                            {state.stats.arrayAccesses}
                        </div>
                        <div className="text-xs dark:text-white/40 text-gray-700 mt-1">Accesses</div>
                    </div>
                </div>

                {/* Complexity */}
                <div className="flex justify-between items-center text-sm">
                    <div>
                        <span className="dark:text-white/40 text-gray-700">Time: </span>
                        <span className="text-[var(--neon-cyan)] font-mono">
                            {state.stats.timeComplexity}
                        </span>
                    </div>
                    <div>
                        <span className="dark:text-white/40 text-gray-700">Space: </span>
                        <span className="text-[var(--neon-purple)] font-mono">
                            {state.stats.spaceComplexity}
                        </span>
                    </div>
                </div>

                {/* Step History List */}
                <div className="space-y-3 pt-6 dark:border-white/10 border-gray-400/40 border-t">
                    <div className="flex items-center gap-2 text-sm dark:text-white/60 text-gray-700">
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
                                            ? 'dark:bg-[var(--neon-cyan)]/10 dark:border-[var(--neon-cyan)] bg-[var(--neon-cyan)]/20 border-[var(--neon-cyan)]/50'
                                            : isPast
                                                ? 'dark:bg-white/5 dark:border-white/10 dark:opacity-60 dark:hover:opacity-100 dark:hover:border-white/20 bg-gray-300/30 border-gray-400/40 opacity-75 hover:opacity-100 hover:border-gray-400'
                                                : 'dark:bg-transparent dark:border-white/5 dark:opacity-40 dark:hover:opacity-80 dark:hover:border-white/10 bg-gray-200/20 border-gray-400/30 opacity-50 hover:opacity-75 hover:border-gray-400'
                                        }
                                `}
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`
                                        mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border
                                        ${isCurrent
                                                ? 'bg-[var(--neon-cyan)] border-[var(--neon-cyan)] dark:text-black text-white'
                                                : isPast
                                                    ? 'dark:bg-green-500/20 dark:border-green-500/40 dark:text-green-400 bg-green-500/20 border-green-500/40 text-green-600'
                                                    : 'dark:bg-white/5 dark:border-white/10 dark:text-white/40 bg-gray-400/20 border-gray-500/40 text-gray-600'
                                            }
                                    `}>
                                            {isPast && !isCurrent ? <CheckCircle2 className="w-3 h-3" /> : idx + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className={`text-[11px] font-mono leading-relaxed line-clamp-2 ${isCurrent ? 'dark:text-white text-gray-900' : 'dark:text-white/60 text-gray-700'}`}>
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
