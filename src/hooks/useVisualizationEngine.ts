import { useState, useCallback, useEffect, useRef } from 'react';
import type {
    VisualizationState,
    AlgorithmStep,
    VisualizationSpeed,
    AnimationState,
    VisualizationStats
} from '@/types/visualization-types';

// ============================================
// VISUALIZATION ENGINE HOOK
// ============================================

interface UseVisualizationEngineProps {
    steps: AlgorithmStep[];
    initialSpeed?: VisualizationSpeed;
    onComplete?: () => void;
    onStepChange?: (step: AlgorithmStep) => void;
}

export function useVisualizationEngine({
    steps,
    initialSpeed = 1,
    onComplete,
    onStepChange
}: UseVisualizationEngineProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [animationState, setAnimationState] = useState<AnimationState>('idle');
    const [speed, setSpeed] = useState<VisualizationSpeed>(initialSpeed);
    const [autoPlay, setAutoPlay] = useState(false);

    const animationRef = useRef<number | null>(null);
    const lastStepTimeRef = useRef<number>(0);

    // Calculate delay based on speed
    const getStepDelay = useCallback(() => {
        const baseDelay = 1000; // 1 second at 1x speed
        return baseDelay / speed;
    }, [speed]);

    // Get current step
    const currentStep = steps[currentStepIndex] || null;

    // Play animation
    const play = useCallback(() => {
        if (currentStepIndex >= steps.length - 1) {
            setAnimationState('completed');
            onComplete?.();
            return;
        }
        setAnimationState('playing');
        setAutoPlay(true);
    }, [currentStepIndex, steps.length, onComplete]);

    // Pause animation
    const pause = useCallback(() => {
        setAnimationState('paused');
        setAutoPlay(false);
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
    }, []);

    // Reset animation
    const reset = useCallback(() => {
        setCurrentStepIndex(0);
        setAnimationState('idle');
        setAutoPlay(false);
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
    }, []);

    // Step forward
    const stepForward = useCallback(() => {
        if (currentStepIndex < steps.length - 1) {
            const newIndex = currentStepIndex + 1;
            setCurrentStepIndex(newIndex);
            onStepChange?.(steps[newIndex]);

            if (newIndex >= steps.length - 1) {
                setAnimationState('completed');
                onComplete?.();
            }
        }
    }, [currentStepIndex, steps, onStepChange, onComplete]);

    // Step backward
    const stepBackward = useCallback(() => {
        if (currentStepIndex > 0) {
            const newIndex = currentStepIndex - 1;
            setCurrentStepIndex(newIndex);
            onStepChange?.(steps[newIndex]);
            setAnimationState('paused');
        }
    }, [currentStepIndex, steps, onStepChange]);

    // Auto-play animation loop
    useEffect(() => {
        if (!autoPlay || animationState !== 'playing') {
            return;
        }

        const animate = (timestamp: number) => {
            if (!lastStepTimeRef.current) {
                lastStepTimeRef.current = timestamp;
            }

            const elapsed = timestamp - lastStepTimeRef.current;
            const delay = getStepDelay();

            if (elapsed >= delay) {
                lastStepTimeRef.current = timestamp;

                if (currentStepIndex < steps.length - 1) {
                    const newIndex = currentStepIndex + 1;
                    setCurrentStepIndex(newIndex);
                    onStepChange?.(steps[newIndex]);

                    if (newIndex >= steps.length - 1) {
                        setAnimationState('completed');
                        setAutoPlay(false);
                        onComplete?.();
                        return;
                    }
                } else {
                    setAnimationState('completed');
                    setAutoPlay(false);
                    onComplete?.();
                    return;
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [autoPlay, animationState, currentStepIndex, steps, getStepDelay, onStepChange, onComplete]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    // Jump to specific step
    const goToStep = useCallback((index: number) => {
        if (index >= 0 && index < steps.length) {
            setCurrentStepIndex(index);
            onStepChange?.(steps[index]);
            setAnimationState('paused');
            setAutoPlay(false);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        }
    }, [steps, onStepChange]);

    return {
        currentStep,
        currentStepIndex,
        totalSteps: steps.length,
        animationState,
        speed,
        autoPlay,
        play,
        pause,
        reset,
        stepForward,
        stepBackward,
        goToStep,
        setSpeed,
        setAutoPlay,
        progress: steps.length > 0 ? (currentStepIndex / (steps.length - 1)) * 100 : 0
    };
}

// ============================================
// STATISTICS TRACKER
// ============================================

export function useVisualizationStats(initialStats?: Partial<VisualizationStats>) {
    const [stats, setStats] = useState<VisualizationStats>({
        comparisons: 0,
        swaps: 0,
        arrayAccesses: 0,
        spaceUsed: 0,
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        ...initialStats
    });

    const incrementComparisons = useCallback((count: number = 1) => {
        setStats(prev => ({ ...prev, comparisons: prev.comparisons + count }));
    }, []);

    const incrementSwaps = useCallback((count: number = 1) => {
        setStats(prev => ({ ...prev, swaps: prev.swaps + count }));
    }, []);

    const incrementArrayAccesses = useCallback((count: number = 1) => {
        setStats(prev => ({ ...prev, arrayAccesses: prev.arrayAccesses + count }));
    }, []);

    const setSpaceUsed = useCallback((space: number) => {
        setStats(prev => ({ ...prev, spaceUsed: space }));
    }, []);

    const setComplexities = useCallback((time: string, space: string) => {
        setStats(prev => ({ ...prev, timeComplexity: time, spaceComplexity: space }));
    }, []);

    const setCustomStat = useCallback((key: string, value: number | string) => {
        setStats(prev => ({
            ...prev,
            customStats: { ...prev.customStats, [key]: value }
        }));
    }, []);

    const resetStats = useCallback(() => {
        setStats({
            comparisons: 0,
            swaps: 0,
            arrayAccesses: 0,
            spaceUsed: 0,
            timeComplexity: initialStats?.timeComplexity || 'O(n)',
            spaceComplexity: initialStats?.spaceComplexity || 'O(1)',
            customStats: initialStats?.customStats
        });
    }, [initialStats]);

    return {
        stats,
        incrementComparisons,
        incrementSwaps,
        incrementArrayAccesses,
        setSpaceUsed,
        setComplexities,
        setCustomStat,
        resetStats
    };
}

// ============================================
// ANIMATION HELPERS
// ============================================

export const animationConfig = {
    colors: {
        default: 'var(--neon-cyan)',
        highlight: 'var(--neon-purple)',
        compare: '#FFA500',
        swap: '#FF4500',
        sorted: '#00FF00',
        current: '#FFD700',
        visited: 'rgba(0, 243, 255, 0.3)',
        path: 'var(--neon-cyan)'
    },
    durations: {
        fast: 200,
        normal: 500,
        slow: 1000
    },
    easing: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    }
};

export function getSpeedMultiplier(speed: VisualizationSpeed): number {
    return speed;
}

export function getAnimationDuration(speed: VisualizationSpeed, baseDuration: number = 500): number {
    return baseDuration / speed;
}
