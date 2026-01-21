import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useVisualizationEngine, useVisualizationStats } from '@/hooks/useVisualizationEngine';
import { VisualizationControls } from './VisualizationControls';
import { GraphVisualization } from './AlgorithmVisualizations';
import type { AlgorithmStep } from '@/types/visualization-types';

interface UnifiedGraphVisualizationProps {
    algorithmName: string;
    description: string;
    steps: AlgorithmStep[];
    timeComplexity: string;
    spaceComplexity: string;
    initialNodes?: any[];
    initialEdges?: any[];
    hideHeader?: boolean;
}

export function UnifiedGraphVisualization({
    algorithmName,
    description,
    steps,
    timeComplexity,
    spaceComplexity,
    initialNodes = [],
    initialEdges = [],
    hideHeader = false
}: UnifiedGraphVisualizationProps) {
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

    // Generate visualization-ready nodes and edges
    // If backend doesn't provide positions, we generate some simple ones or use initial
    const nodes = useMemo(() => {
        return initialNodes.length > 0 ? initialNodes : [
            { id: '0', label: '0', x: 100, y: 100 },
            { id: '1', label: '1', x: 200, y: 100 },
            { id: '2', label: '2', x: 150, y: 200 },
            { id: '3', label: '3', x: 300, y: 200 },
        ];
    }, [initialNodes]);

    const edges = useMemo(() => {
        return initialEdges;
    }, [initialEdges]);

    const visitedNodes = currentStep?.data.visited ? currentStep.data.visited.map(String) : [];
    const currentNode = currentStep?.data.current ? String(currentStep.data.current) : (currentStep?.data.current_node ? String(currentStep.data.current_node) : undefined);

    // Handle edge highlighting for MST/Shortest Path
    const visitedEdges = useMemo(() => {
        if (currentStep?.data.path) {
            // Path is usually list of nodes [0, 1, 3]
            const pathEdges = [];
            for (let i = 0; i < currentStep.data.path.length - 1; i++) {
                pathEdges.push({
                    from: String(currentStep.data.path[i]),
                    to: String(currentStep.data.path[i + 1])
                });
            }
            return pathEdges;
        }
        if (currentStep?.data.mst_edges) {
            return currentStep.data.mst_edges.map((e: any) => ({ from: String(e.u), to: String(e.v) }));
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
                        <GraphVisualization
                            nodes={nodes}
                            edges={edges}
                            visitedNodes={visitedNodes}
                            currentNode={currentNode}
                            visitedEdges={visitedEdges}
                        />
                    </div>

                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
                        <p className="text-white/80 font-mono text-sm">
                            {currentStep?.description || "Initializing graph visualization..."}
                        </p>
                        {currentStep?.data.distances && (
                            <div className="mt-2 text-xs text-white/40 grid grid-cols-4 gap-2 border-t border-white/5 pt-2">
                                {Object.entries(currentStep.data.distances).map(([node, dist]) => (
                                    <div key={node} className="flex justify-between border-r border-white/5 pr-2 last:border-0">
                                        <span>Node {node}:</span>
                                        <span className="text-[var(--neon-cyan)] font-mono">{(dist as any) === Infinity ? '∞' : (dist as any)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
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
