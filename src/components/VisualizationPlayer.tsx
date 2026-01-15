import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    Play,
    RotateCcw,
    ChevronLeft,
    ChevronRight,
    Settings2,
    Info,
    Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraphVisualization } from "@/visualizations/GraphVisualization";
import { ArrayVisualization } from "@/visualizations/ArrayVisualization";
import { ArrayGridVisualization } from "@/visualizations/ArrayGridVisualization";
import { TreeVisualization } from "@/visualizations/TreeVisualization";
import { MatrixVisualization } from "@/visualizations/MatrixVisualization";
import { GenericVisualization } from "@/visualizations/GenericVisualization";
import { generateStepsForAlgorithm, VisualizationStep } from "@/lib/visualizations";
import CodeHighlighter from "./CodeHighlighter";

import { Algorithm } from "@/hooks/use-algorithms";

interface VisualizationPlayerProps {
    algorithm: Algorithm;
    compact?: boolean;
}

export default function VisualizationPlayer({ algorithm, compact = false }: VisualizationPlayerProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [steps, setSteps] = useState<VisualizationStep[]>([]);

    useEffect(() => {
        if (algorithm) {
            const newSteps = generateStepsForAlgorithm(algorithm);
            setSteps(newSteps);
            setCurrentStep(0);
            setIsPlaying(false);
        }
    }, [algorithm]);

    useEffect(() => {
        let interval: any;
        if (isPlaying && currentStep < steps.length - 1) {
            interval = setInterval(() => {
                setCurrentStep(prev => prev + 1);
            }, 1000);
        } else if (currentStep >= steps.length - 1) {
            setIsPlaying(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentStep, steps.length]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
        setIsPlaying(false);
    };

    const currentStepData = steps[currentStep] || { description: "Initializing..." };

    const renderVisualization = () => {
        const type = algorithm?.visualizationType || "none";

        switch (type) {
            case "array":
                if (algorithm.name.toLowerCase().includes("sort")) {
                    return (
                        <ArrayGridVisualization
                            data={currentStepData.data || []}
                            activeIndex={currentStepData.activeIndices || []}
                            comparedIndex={currentStepData.comparedIndices || []}
                            sortedIndex={currentStepData.sortedIndices || []}
                            minIndex={currentStepData.minIndex}
                        />
                    );
                }
                return (
                    <ArrayVisualization
                        data={currentStepData.data || []}
                        activeIndex={currentStepData.activeIndices || []}
                        comparedIndex={currentStepData.comparedIndices || []}
                        sortedIndex={currentStepData.sortedIndices || []}
                    />
                );
            case "tree":
                return (
                    <TreeVisualization
                        nodes={currentStepData.nodes || []}
                        edges={currentStepData.edges || []}
                    />
                );
            case "matrix":
                return (
                    <MatrixVisualization
                        data={currentStepData.data || []}
                        activeCell={currentStepData.activeCell}
                    />
                );
            case "graph":
            case "network":
                return (
                    <GraphVisualization
                        nodes={currentStepData.nodes || []}
                        edges={currentStepData.edges || []}
                        currentStep={currentStep}
                        algorithm={algorithm?.name || "Graph"}
                    />
                );
            default:
                return <GenericVisualization algorithmName={algorithm?.name || "Algorithm"} />;
        }
    };

    if (compact) {
        return (
            <div className="space-y-6">
                <Card className="cyber-card p-0 bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden min-h-[400px] flex items-center justify-center relative">
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                        <Badge className="bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] border-[var(--neon-cyan)]/50">
                            {algorithm?.visualizationType?.toUpperCase() || "GENERIC"}
                        </Badge>
                    </div>
                    <div className="w-full h-full p-8 flex items-center justify-center">
                        {renderVisualization()}
                    </div>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="cyber-card p-4 bg-card/50 backdrop-blur-sm border-border/50">
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" onClick={handlePrev} disabled={currentStep === 0} className="flex-1">
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)} className="flex-1 border-[var(--neon-cyan)] text-[var(--neon-cyan)]">
                                {isPlaying ? <span className="w-4 h-4 block bg-[var(--neon-cyan)] rounded-sm" /> : <Play className="w-4 h-4 fill-current" />}
                            </Button>
                            <Button variant="outline" size="icon" onClick={handleNext} disabled={currentStep === steps.length - 1} className="flex-1">
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                        <Button variant="ghost" onClick={handleReset} className="w-full text-xs mt-2">
                            <RotateCcw className="w-3 h-3 mr-2" /> Reset
                        </Button>
                    </Card>

                    <Card className="md:col-span-2 cyber-card p-4 bg-card/50 backdrop-blur-sm border-border/50 flex items-center gap-4">
                        <Info className="w-5 h-5 text-[var(--neon-pink)] flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-sm leading-relaxed">{currentStepData.description}</p>
                            <div className="flex justify-between items-center text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">
                                <span>Step {currentStep + 1} / {steps.length}</span>
                                <span>{steps.length > 0 ? Math.round(((currentStep + 1) / steps.length) * 100) : 0}% Complete</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    // Default layout (sidebar + main)
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Settings2 className="w-5 h-5 text-[var(--neon-cyan)]" />
                        Controls
                    </h2>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-muted-foreground">Playback</p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="icon" onClick={handlePrev} disabled={currentStep === 0} className="flex-1">
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)} className="flex-1 border-[var(--neon-cyan)] text-[var(--neon-cyan)]">
                                    {isPlaying ? <span className="w-4 h-4 block bg-[var(--neon-cyan)] rounded-sm" /> : <Play className="w-4 h-4 fill-current" />}
                                </Button>
                                <Button variant="outline" size="icon" onClick={handleNext} disabled={currentStep === steps.length - 1} className="flex-1">
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                            <Button variant="ghost" onClick={handleReset} className="w-full text-xs">
                                <RotateCcw className="w-3 h-3 mr-2" /> Reset Visualization
                            </Button>
                        </div>
                        <div className="pt-4 border-t border-border/50">
                            <p className="text-sm text-muted-foreground mb-2">Algorithm</p>
                            <Badge variant="outline" className="w-full justify-center py-2 border-[var(--neon-purple)] text-[var(--neon-purple)] uppercase tracking-widest text-[10px]">
                                {algorithm?.name || "Initializing..."}
                            </Badge>
                        </div>
                    </div>
                </Card>

                <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5 text-[var(--neon-pink)]" />
                        Step Info
                    </h2>
                    <div className="space-y-4">
                        <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                            <p className="text-sm leading-relaxed">{currentStepData.description}</p>
                        </div>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>Step {currentStep + 1} of {steps.length}</span>
                            <Badge variant="secondary" className="bg-secondary/30">
                                {steps.length > 0 ? Math.round(((currentStep + 1) / steps.length) * 100) : 0}%
                            </Badge>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="lg:col-span-3">
                <Card className="cyber-card p-0 bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden min-h-[500px] flex items-center justify-center relative">
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                        <Badge className="bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] border-[var(--neon-cyan)]/50">
                            {algorithm?.visualizationType?.toUpperCase() || "GENERIC"}
                        </Badge>
                        <Badge className="bg-[var(--neon-purple)]/20 text-[var(--neon-purple)] border-[var(--neon-purple)]/50">
                            Procedural
                        </Badge>
                    </div>
                    <div className="w-full h-full p-8 flex items-center justify-center">
                        {renderVisualization()}
                    </div>
                </Card>

                {/* Code Sync Section (Synchronized with Step Data) */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-[var(--neon-cyan)]" />
                        <h3 className="text-lg font-bold">Execution Trace</h3>
                    </div>
                    <CodeHighlighter
                        code={algorithm.pseudocode || ""}
                        activeLine={currentStepData.codeLine || 0}
                    />
                </div>
            </div>
        </div>
    );
}
