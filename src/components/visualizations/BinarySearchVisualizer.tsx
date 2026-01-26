import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, RotateCcw } from 'lucide-react';

interface SearchStep {
    lo: number;
    mid: number | null;
    hi: number;
    cmp: number;
    action: string;
    midVal: number | null;
}

interface BinarySearchVisualizerProps {
    hideHeader?: boolean;
}

function makeArray(n: number, type: 'even' | 'random'): number[] {
    if (type === 'even') {
        return Array.from({ length: n }, (_, i) => i * 2);
    }
    // Strictly increasing random
    const arr = [Math.floor(Math.random() * 6)];
    for (let i = 1; i < n; i++) {
        arr.push(arr[i - 1] + Math.floor(Math.random() * 6) + 1);
    }
    return arr;
}

function runBinarySearchSteps(arr: number[], target: number): { steps: SearchStep[]; foundIndex: number } {
    let lo = 0;
    let hi = arr.length - 1;
    const steps: SearchStep[] = [];
    let cmp = 0;

    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        cmp += 1;
        const midVal = arr[mid];
        let action = '';

        if (midVal === target) {
            action = 'FOUND';
            steps.push({ lo, mid, hi, cmp, action, midVal });
            return { steps, foundIndex: mid };
        } else if (midVal < target) {
            action = 'midVal < target, move lo = mid + 1';
            steps.push({ lo, mid, hi, cmp, action, midVal });
            lo = mid + 1;
        } else {
            action = 'midVal > target, move hi = mid - 1';
            steps.push({ lo, mid, hi, cmp, action, midVal });
            hi = mid - 1;
        }
    }

    steps.push({ lo, mid: null, hi, cmp, action: 'NOT FOUND (lo crossed hi)', midVal: null });
    return { steps, foundIndex: -1 };
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function BinarySearchVisualizer({ hideHeader = false }: BinarySearchVisualizerProps) {
    const [arraySize, setArraySize] = useState(21);
    const [arrayType, setArrayType] = useState<'even' | 'random'>('even');
    const [target, setTarget] = useState(18);
    const [arr, setArr] = useState<number[]>([]);
    const [steps, setSteps] = useState<SearchStep[]>([]);
    const [foundIndex, setFoundIndex] = useState(-1);
    const [stepIdx, setStepIdx] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const reset = useCallback(() => {
        const newArr = makeArray(arraySize, arrayType);
        setArr(newArr);
        const { steps: newSteps, foundIndex: newFoundIndex } = runBinarySearchSteps(newArr, target);
        setSteps(newSteps);
        setFoundIndex(newFoundIndex);
        setStepIdx(0);
        setIsPlaying(false);
    }, [arraySize, arrayType, target]);

    useEffect(() => {
        reset();
    }, []);

    useEffect(() => {
        if (!isPlaying) return;
        const timer = setInterval(() => {
            setStepIdx(prev => {
                if (prev >= steps.length - 1) {
                    setIsPlaying(false);
                    return prev;
                }
                return prev + 1;
            });
        }, 700);
        return () => clearInterval(timer);
    }, [isPlaying, steps.length]);

    const currentStep = steps[stepIdx] || null;
    const safeTimelineLength = Math.max(1, arr.length);
    const optimalComparisons = useMemo(() => Math.ceil(Math.log2(Math.max(2, arr.length + 1))), [arr.length]);
    const totalComparisons = steps.length ? steps[steps.length - 1].cmp : 0;
    const efficiencyRatio = totalComparisons && optimalComparisons
        ? (totalComparisons / optimalComparisons).toFixed(2)
        : null;

    const handlePrev = () => {
        setIsPlaying(false);
        setStepIdx(prev => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setIsPlaying(false);
        setStepIdx(prev => Math.min(steps.length - 1, prev + 1));
    };

    const togglePlay = () => {
        if (stepIdx >= steps.length - 1) {
            setStepIdx(0);
        }
        setIsPlaying(prev => !prev);
    };

    const handleJumpToStep = (idx: number) => {
        setIsPlaying(false);
        setStepIdx(idx);
    };

    const describeAction = (action: string) => {
        if (action === 'FOUND') return 'Target identified';
        if (action.startsWith('NOT FOUND')) return 'Search exhausted';
        if (action.includes('lo = mid + 1')) return 'Discard left half';
        if (action.includes('hi = mid - 1')) return 'Discard right half';
        return 'Comparing midpoint';
    };

    return (
        <div className="space-y-6">
            {!hideHeader && (
                <div>
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">
                        Binary Search
                    </h3>
                    <p className="text-white/40 text-sm mt-1">Step through binary search on a sorted array</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visualization */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0a0a0c]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-8 relative overflow-hidden">
                        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

                        {/* Array Display */}
                        <div className="relative">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {arr.map((val, idx) => {
                                    const inRange = currentStep && idx >= currentStep.lo && idx <= currentStep.hi;
                                    const isLo = currentStep && idx === currentStep.lo;
                                    const isHi = currentStep && idx === currentStep.hi;
                                    const isMid = currentStep && currentStep.mid !== null && idx === currentStep.mid;
                                    const isFound = foundIndex >= 0 && idx === foundIndex && currentStep?.action === 'FOUND';

                                    let bgColor = 'bg-white/5';
                                    let borderColor = 'border-white/10';
                                    let textColor = 'text-white/40';

                                    if (!inRange && currentStep) {
                                        bgColor = 'bg-white/5';
                                        textColor = 'text-white/20';
                                    } else if (isFound) {
                                        bgColor = 'bg-green-500/20';
                                        borderColor = 'border-green-500';
                                        textColor = 'text-green-400';
                                    } else if (isMid) {
                                        bgColor = 'bg-[var(--neon-purple)]/20';
                                        borderColor = 'border-[var(--neon-purple)]';
                                        textColor = 'text-[var(--neon-purple)]';
                                    } else if (isLo || isHi) {
                                        bgColor = 'bg-[var(--neon-cyan)]/20';
                                        borderColor = 'border-[var(--neon-cyan)]';
                                        textColor = 'text-[var(--neon-cyan)]';
                                    } else if (inRange) {
                                        textColor = 'text-white/70';
                                    }

                                    return (
                                        <motion.div
                                            key={idx}
                                            layout
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className={`w-14 h-14 flex flex-col items-center justify-center rounded-xl border-2 transition-all duration-300 ${bgColor} ${borderColor}`}
                                        >
                                            <div className={`text-xs ${textColor} opacity-60`}>i={idx}</div>
                                            <div className={`text-lg font-bold font-mono ${textColor}`}>{val}</div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Status Message */}
                            <div className="mt-6 text-center">
                                {currentStep ? (
                                    currentStep.action === 'FOUND' ? (
                                        <p className="text-green-400 font-semibold">
                                            Target <span className="font-mono">{target}</span> found at index <span className="font-mono">{foundIndex}</span>!
                                        </p>
                                    ) : currentStep.action.startsWith('NOT FOUND') ? (
                                        <p className="text-red-400 font-semibold">
                                            Target <span className="font-mono">{target}</span> not found in array
                                        </p>
                                    ) : (
                                        <p className="text-white/60">
                                            Comparing target <span className="font-mono text-[var(--neon-cyan)]">{target}</span> vs arr[mid] <span className="font-mono text-[var(--neon-purple)]">{currentStep.midVal}</span>
                                        </p>
                                    )
                                ) : (
                                    <p className="text-white/40">Set parameters and hit Reset to begin</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Step Log */}
                    <div className="bg-[#0a0a0c]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-6">
                        <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Step Log</div>
                        <div className="bg-[#0b1020] rounded-xl p-4 font-mono text-xs max-h-64 overflow-y-auto custom-scrollbar">
                            {steps.map((step, idx) => {
                                const isActive = idx === stepIdx;
                                return (
                                    <div key={idx} className={`${isActive ? 'text-[var(--neon-cyan)]' : 'text-white/50'} mb-1`}>
                                        {isActive && '➤ '}step {idx}: lo={step.lo}, hi={step.hi}
                                        {step.mid !== null && `, mid=${step.mid}, arr[mid]=${step.midVal}`}
                                        {' => '}{step.action}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-4">
                    {/* Configuration */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                        <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                            Configuration
                        </div>

                        <div>
                            <label className="text-xs text-white/60 mb-1 block">Array Size</label>
                            <input
                                type="number"
                                min="5"
                                max="40"
                                value={arraySize}
                                onChange={(e) => setArraySize(Math.max(5, Math.min(40, parseInt(e.target.value) || 21)))}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono focus:bg-white/10 focus:border-[var(--neon-cyan)]/50 focus:outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-white/60 mb-1 block">Array Type</label>
                            <select
                                value={arrayType}
                                onChange={(e) => setArrayType(e.target.value as 'even' | 'random')}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:bg-white/10 focus:border-[var(--neon-cyan)]/50 focus:outline-none transition-all"
                            >
                                <option value="even">Evenly spaced (0, 2, 4, ...)</option>
                                <option value="random">Strictly increasing random</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-xs text-white/60 mb-1 block">Target</label>
                            <input
                                type="number"
                                value={target}
                                onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white font-mono text-center focus:bg-white/10 focus:border-[var(--neon-cyan)]/50 focus:outline-none transition-all"
                            />
                        </div>

                        <button
                            onClick={reset}
                            className="w-full px-4 py-3 bg-[var(--neon-green)]/10 border border-[var(--neon-green)]/30 text-[var(--neon-green)] rounded-lg hover:bg-[var(--neon-green)]/20 transition-all font-semibold flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset
                        </button>
                    </div>

                    {/* Playback Controls */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                        <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                            Playback
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handlePrev}
                                disabled={stepIdx <= 0}
                                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <SkipBack className="w-4 h-4 mx-auto" />
                            </button>
                            <button
                                onClick={togglePlay}
                                className="flex-1 px-4 py-2 bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)]/30 text-[var(--neon-cyan)] rounded-lg hover:bg-[var(--neon-cyan)]/20 transition-all"
                            >
                                {isPlaying ? <Pause className="w-4 h-4 mx-auto" /> : <Play className="w-4 h-4 mx-auto" />}
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={stepIdx >= steps.length - 1}
                                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <SkipForward className="w-4 h-4 mx-auto" />
                            </button>
                        </div>

                        <div>
                            <label className="text-xs text-white/60 mb-2 block">
                                Step: {stepIdx} / {Math.max(0, steps.length - 1)}
                            </label>
                            <input
                                type="range"
                                min="0"
                                max={Math.max(0, steps.length - 1)}
                                value={stepIdx}
                                onChange={(e) => {
                                    setIsPlaying(false);
                                    setStepIdx(parseInt(e.target.value));
                                }}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="text-xs text-white/40 uppercase tracking-wider mb-3">
                            Statistics
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-white/60 text-sm">lo:</span>
                                <span className="text-[var(--neon-cyan)] font-mono font-bold">
                                    {currentStep?.lo ?? '-'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/60 text-sm">mid:</span>
                                <span className="text-[var(--neon-purple)] font-mono font-bold">
                                    {currentStep?.mid ?? '-'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/60 text-sm">hi:</span>
                                <span className="text-[var(--neon-cyan)] font-mono font-bold">
                                    {currentStep?.hi ?? '-'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/60 text-sm">Comparisons:</span>
                                <span className="text-[var(--neon-green)] font-mono font-bold">
                                    {currentStep?.cmp ?? 0}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/60 text-sm">Optimal (⌈log₂ n⌉):</span>
                                <span className="text-white font-mono font-bold">
                                    {optimalComparisons}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/60 text-sm">Efficiency:</span>
                                <span className="text-white font-mono font-bold">
                                    {efficiencyRatio ? `${efficiencyRatio}x optimal` : '-'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-white/40 uppercase tracking-wider">
                                Interval Timeline
                            </div>
                            <span className="text-[var(--neon-cyan)] text-[0.65rem] uppercase tracking-widest">
                                Click to jump
                            </span>
                        </div>
                        <div className="space-y-3">
                            {steps.length === 0 && (
                                <p className="text-white/40 text-sm">Run a search to reveal interval history.</p>
                            )}
                            {steps.map((step, idx) => {
                                const isActive = idx === stepIdx;
                                const baseWidth = step.hi >= step.lo
                                    ? clamp(((step.hi - step.lo + 1) / safeTimelineLength) * 100, 2, 100)
                                    : 2;
                                const leftOffset = clamp((step.lo / safeTimelineLength) * 100, 0, 100);
                                const availableWidth = Math.max(0, 100 - leftOffset);
                                const visualWidth = Math.min(baseWidth, availableWidth || 2);
                                const adjustedLeft = leftOffset + visualWidth > 100
                                    ? Math.max(0, 100 - visualWidth)
                                    : leftOffset;
                                const midOffset = step.mid !== null
                                    ? clamp(((step.mid + 0.5) / safeTimelineLength) * 100, 0, 100)
                                    : null;

                                return (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => handleJumpToStep(idx)}
                                        className={`w-full text-left bg-black/20 rounded-xl p-3 transition-colors ${isActive ? 'ring-1 ring-[var(--neon-cyan)]/60 bg-black/40' : 'hover:bg-black/30'}`}
                                    >
                                        <div className="flex items-center justify-between text-xs text-white/60">
                                            <span>Step {idx}</span>
                                            <span className="font-mono text-white/50">[{step.lo}, {step.hi}]</span>
                                        </div>
                                        <div className="relative h-4 bg-white/5 rounded-full overflow-hidden mt-2">
                                            <div
                                                className={`absolute inset-y-0 ${isActive ? 'bg-[var(--neon-cyan)]/40' : 'bg-white/20'}`}
                                                style={{ left: `${adjustedLeft}%`, width: `${visualWidth}%` }}
                                            />
                                            {midOffset !== null && (
                                                <div
                                                    className="absolute inset-y-0 w-0.5 bg-[var(--neon-purple)]"
                                                    style={{ left: `${midOffset}%` }}
                                                />
                                            )}
                                        </div>
                                        <div className="text-[0.6rem] text-white/50 uppercase tracking-wider mt-2">
                                            {describeAction(step.action)}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
