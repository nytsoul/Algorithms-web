import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useVisualizationEngine, useVisualizationStats } from '@/hooks/useVisualizationEngine';
import { VisualizationControls } from './VisualizationControls';
import { DPTableVisualization } from './AlgorithmVisualizations';
import type { AlgorithmStep } from '@/types/visualization-types';

interface UnifiedMatrixVisualizationProps {
    algorithmName: string;
    description: string;
    steps: AlgorithmStep[];
    timeComplexity: string;
    spaceComplexity: string;
    rowLabels?: string[];
    colLabels?: string[];
    hideHeader?: boolean;
}

export function UnifiedMatrixVisualization({
    algorithmName,
    description,
    steps,
    timeComplexity,
    spaceComplexity,
    rowLabels,
    colLabels,
    hideHeader = false
}: UnifiedMatrixVisualizationProps) {
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
        input: {}, // Could be expanded
        stats: {
            ...stats,
            comparisons: currentStep?.data.comparisons || 0,
            swaps: currentStep?.data.swaps || 0,
        }
    };

    // Extract table from current step data
    // Common keys used in backend: 'dp', 'm', 'matrix', 'board'
    const table = currentStep?.data.dp || currentStep?.data.m || currentStep?.data.matrix || currentStep?.data.board || [];

    // If it's a 1D array (like Fibonacci), wrap it in a 2D array for the table visualization
    const normalizedTable = useMemo(() => {
        if (!table || table.length === 0) return [[]];
        if (!Array.isArray(table[0])) {
            return [table];
        }
        return table;
    }, [table]);

    const currentCell = (currentStep?.data.highlight || currentStep?.data.pos)
        ? {
            row: (currentStep?.data.highlight || currentStep?.data.pos)[0],
            col: (currentStep?.data.highlight || currentStep?.data.pos)[1]
        }
        : currentStep?.currentIndex !== undefined
            ? { row: 0, col: currentStep.currentIndex } // For 1D DP
            : undefined;

    const highlightedCells = useMemo(() => {
        const cells: { row: number; col: number }[] = [];
        if (currentStep?.highlightedIndices) {
            currentStep.highlightedIndices.forEach(idx => {
                cells.push({ row: 0, col: idx });
            });
        }
        if (currentStep?.comparedIndices) {
            currentStep.comparedIndices.forEach(idx => {
                cells.push({ row: 0, col: idx });
            });
        }
        return cells;
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
                    <div className="bg-[#0a0a0c]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-8 overflow-auto min-h-[400px] flex items-center justify-center relative group/viz">
                        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
                        <DPTableVisualization
                            table={normalizedTable}
                            rowLabels={rowLabels}
                            colLabels={colLabels}
                            currentCell={currentCell}
                            highlightedCells={highlightedCells}
                        />
                    </div>

                    {/* Description of current step */}
                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
                        <p className="text-white/80 font-mono text-sm">
                            {currentStep?.description || "Initializing Visualizer..."}
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
