import { useState, useEffect, useRef } from 'react';
import type { AlgorithmData, VisualizationStep } from '@/lib/algorithm-schema';
import { getAlgorithmSteps } from '@/lib/visualization-generators';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Zap, Settings2, Activity } from 'lucide-react';
import { ArrayVisualization } from '@/components/visualizations/ArrayVisualization';
import { ArrayGridVisualization } from '@/components/visualizations/ArrayGridVisualization';
// Import other visualizations as needed

interface VisualizationControllerProps {
    algorithm: AlgorithmData;
}

export default function VisualizationController({ algorithm }: VisualizationControllerProps) {
    const [steps, setSteps] = useState<VisualizationStep[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1); // 0.5x to 4x
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Initialize steps when algorithm changes
    useEffect(() => {
        if (algorithm) {
            const generatedSteps = getAlgorithmSteps(algorithm.slug, {
                // Default params can be customized later via UI inputs
                array: algorithm.slug.includes('sort') ? [15, 8, 20, 5, 12, 30, 25, 10] : undefined
            });
            setSteps(generatedSteps);
            setCurrentStepIndex(0);
            setIsPlaying(false);
        }
    }, [algorithm]);

    // Handle playback
    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(() => {
                setCurrentStepIndex((prev) => {
                    if (prev < steps.length - 1) return prev + 1;
                    setIsPlaying(false);
                    return prev;
                });
            }, 1000 / speed);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, speed, steps.length]);

    const handleStepForward = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
            setIsPlaying(false);
        }
    };

    const handleStepBackward = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
            setIsPlaying(false);
        }
    };

    const handleReset = () => {
        setCurrentStepIndex(0);
        setIsPlaying(false);
    };

    const currentStep = steps[currentStepIndex] || { description: "Loading..." };

    const renderVisualization = () => {
        if (!currentStep) return null;

        // Dispatcher based on Category or Slug
        if (algorithm.category === 'Sorting') {
            // Use Bar Chart for Sorting
            return <ArrayVisualization step={currentStep} />;
        }

        if (algorithm.category === 'Searching') {
            // Use Grid for Searching
            return (
                <ArrayGridVisualization
                    data={currentStep.array || []}
                    activeIndex={currentStep.highlight || []}
                    comparedIndex={currentStep.comparison?.indices || []}
                    sortedIndex={currentStep.sorted || (currentStep.variables?.found ? [currentStep.variables.currentIndex] : [])}
                />
            );
        }

        return <div className="p-10 text-center text-muted-foreground">Visualization for {algorithm.name} coming soon</div>;
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Main Canvas */}
            <Card className="cyber-card p-0 bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden min-h-[400px] flex flex-col relative">
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <Badge variant="outline" className="bg-background/50 backdrop-blur-md border-[var(--neon-cyan)] text-[var(--neon-cyan)]">
                        {algorithm.category}
                    </Badge>
                </div>

                <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-b from-transparent to-background/20">
                    {renderVisualization()}
                </div>

                {/* Step Description Overlay */}
                <div className="p-4 border-t border-border/50 bg-background/40 backdrop-blur-md">
                    <p className="text-lg font-medium text-center text-[var(--neon-cyan)] animate-pulse-slow">
                        {currentStep.description}
                    </p>
                    {currentStep.code && (
                        <div className="mt-2 text-xs font-mono text-center text-muted-foreground bg-black/20 p-1 rounded">
                            {currentStep.code}
                        </div>
                    )}
                </div>
            </Card>

            {/* Controls Bar */}
            <Card className="cyber-card p-0 bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
                <div className="flex flex-col">
                    {/* Progress Bar - Truly Full Width (Edge to Edge) */}
                    <div className="w-full h-1.5 bg-secondary/10 relative group cursor-pointer">
                        <div
                            className="h-full bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-pink)] transition-all duration-300 ease-out relative"
                            style={{ width: `${((currentStepIndex + 1) / Math.max(steps.length, 1)) * 100}%` }}
                        >
                            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-r from-transparent to-white/20 blur-sm" />
                        </div>
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="p-6 flex flex-col gap-6">
                        {/* Status Info & Alignment */}
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-muted-foreground font-mono">
                            <div className="flex items-center gap-3">
                                <Activity className="w-3.5 h-3.5 text-[var(--neon-cyan)] animate-pulse" />
                                <span className="text-white/80">Visualization Engine Active</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="opacity-50">Step:</span>
                                    <span className="text-[var(--neon-cyan)] font-bold">{currentStepIndex + 1}</span>
                                    <span className="opacity-30">/</span>
                                    <span className="text-white">{steps.length}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="opacity-50">Completion:</span>
                                    <span className="text-[var(--neon-pink)] font-bold">{Math.round(((currentStepIndex + 1) / Math.max(steps.length, 1)) * 100)}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-6">
                            {/* Playback Controls */}
                            <div className="flex items-center gap-3">
                                <Button variant="outline" size="icon" onClick={handleStepBackward} disabled={currentStepIndex === 0} className="border-white/10 hover:border-[var(--neon-cyan)]/50 hover:bg-[var(--neon-cyan)]/5 transition-all">
                                    <SkipBack className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="default"
                                    size="icon"
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="bg-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/80 text-black font-black h-12 w-12 active:scale-90 transition-all shadow-[0_0_25px_rgba(0,243,255,0.4)]"
                                >
                                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                                </Button>
                                <Button variant="outline" size="icon" onClick={handleStepForward} disabled={currentStepIndex === steps.length - 1} className="border-white/10 hover:border-[var(--neon-cyan)]/50 hover:bg-[var(--neon-cyan)]/5 transition-all">
                                    <SkipForward className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={handleReset} className="ml-2 text-muted-foreground hover:text-[var(--neon-pink)] transition-colors">
                                    <RotateCcw className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Speed Control */}
                            <div className="flex items-center gap-5 bg-black/30 px-5 py-2.5 rounded-2xl border border-white/5 min-w-[240px]">
                                <Zap className="w-4 h-4 text-[var(--neon-yellow)]" />
                                <div className="flex-1">
                                    <Slider
                                        value={[speed]}
                                        min={0.5}
                                        max={4}
                                        step={0.5}
                                        onValueChange={(vals) => setSpeed(vals[0])}
                                        className="w-full"
                                    />
                                </div>
                                <div className="flex flex-col items-end min-w-[40px]">
                                    <span className="text-[10px] font-black text-[var(--neon-yellow)] font-mono leading-none">{speed}x</span>
                                    <span className="text-[8px] text-white/30 font-bold uppercase mt-1">Speed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* State Inspector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="cyber-card p-4 bg-card/50 backdrop-blur-sm border-border/50">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-[var(--neon-purple)]">
                        <Activity className="w-4 h-4" /> Variable State
                    </h3>
                    <div className="space-y-2">
                        {currentStep.variables && Object.entries(currentStep.variables).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center text-sm p-2 bg-background/50 rounded border border-border/30">
                                <span className="font-mono text-muted-foreground">{key}</span>
                                <span className="font-mono font-bold text-[var(--neon-cyan)]">{String(value)}</span>
                            </div>
                        ))}
                        {(!currentStep.variables || Object.keys(currentStep.variables).length === 0) && (
                            <p className="text-xs text-muted-foreground italic">No variables tracked for this step.</p>
                        )}
                    </div>
                </Card>

                <Card className="cyber-card p-4 bg-card/50 backdrop-blur-sm border-border/50">
                    <h3 className="text-sm font-bold mb-3 flex items-center gap-2 text-[var(--neon-pink)]">
                        <Settings2 className="w-4 h-4" /> Complexity Metrics
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-background/50 rounded border border-border/30">
                            <p className="text-[10px] text-muted-foreground uppercase">Comparisons</p>
                            <p className="text-lg font-mono font-bold">{currentStepIndex * 2 + 1} <span className="text-[10px] font-normal text-muted-foreground">(est)</span></p>
                        </div>
                        <div className="p-2 bg-background/50 rounded border border-border/30">
                            <p className="text-[10px] text-muted-foreground uppercase">Array Access</p>
                            <p className="text-lg font-mono font-bold">{currentStepIndex * 4} <span className="text-[10px] font-normal text-muted-foreground">(est)</span></p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
