import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useVisualizationEngine, useVisualizationStats } from '@/hooks/useVisualizationEngine';
import { VisualizationControls } from './VisualizationControls';
import { GeometricVisualization } from './AdvancedVisualizations';
import type { AlgorithmStep } from '@/types/visualization-types';

interface UnifiedGeometricVisualizationProps {
    algorithmName: string;
    description: string;
    steps: AlgorithmStep[];
    timeComplexity: string;
    spaceComplexity: string;
    initialPoints?: any[];
    hideHeader?: boolean;
}

export function UnifiedGeometricVisualization({
    algorithmName,
    description,
    steps,
    timeComplexity,
    spaceComplexity,
    initialPoints = [],
    hideHeader = false
}: UnifiedGeometricVisualizationProps) {
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

    const points = currentStep?.data.points || initialPoints;

    const lines = useMemo(() => {
        if (currentStep?.data.pair) {
            return [{ from: currentStep.data.pair[0], to: currentStep.data.pair[1] }];
        }
        if (currentStep?.data.p1 && currentStep?.data.p2) {
            return [{ from: currentStep.data.p1, to: currentStep.data.p2 }];
        }
        return [];
    }, [currentStep]);

    const polygons = useMemo(() => {
        if (currentStep?.data.hull) {
            return [currentStep.data.hull];
        }
        return [];
    }, [currentStep]);

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
                    <div className="bg-[#0a0a0c]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-4 min-h-[400px] relative overflow-hidden group/viz">
                        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
                        <GeometricVisualization
                            points={points.map((p: any) => ({ x: p.x || p[0], y: p.y || p[1], label: p.label }))}
                            lines={lines.map((l: any) => ({
                                from: { x: l.from.x || l.from[0], y: l.from.y || l.from[1] },
                                to: { x: l.to.x || l.to[0], y: l.to.y || l.to[1] }
                            }))}
                            polygons={polygons.map((poly: any) => poly.map((p: any) => ({ x: p.x || p[0], y: p.y || p[1] })))}
                            highlightedPoints={currentStep?.highlightedIndices}
                        />
                    </div>

                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
                        <p className="text-white/80 font-mono text-sm">
                            {currentStep?.description || "Initializing geometric visualizer..."}
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
