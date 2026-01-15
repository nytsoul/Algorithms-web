import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, RotateCcw, Swords, Zap, Activity, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Competitor {
    name: string;
    complexity: string;
    progress: number;
    operations: number;
    status: "idle" | "running" | "finished";
    color: string;
}

export default function AlgorithmBattle() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [dataSize, setDataSize] = useState(100);

    const [competitorA, setCompetitorA] = useState<Competitor>({
        name: "Bubble Sort",
        complexity: "O(n²)",
        progress: 0,
        operations: 0,
        status: "idle",
        color: "var(--neon-pink)"
    });

    const [competitorB, setCompetitorB] = useState<Competitor>({
        name: "Quick Sort",
        complexity: "O(n log n)",
        progress: 0,
        operations: 0,
        status: "idle",
        color: "var(--neon-cyan)"
    });

    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                // Bubble Sort simulation logic (Slow)
                setCompetitorA(prev => {
                    if (prev.progress >= 100) return { ...prev, status: "finished" as const };
                    const newOps = prev.operations + Math.floor(Math.random() * 50);
                    const newProgress = Math.min(100, (newOps / (dataSize * dataSize)) * 100);
                    return { ...prev, operations: newOps, progress: newProgress, status: "running" as const };
                });

                // Quick Sort simulation logic (Fast)
                setCompetitorB(prev => {
                    if (prev.progress >= 100) return { ...prev, status: "finished" as const };
                    const newOps = prev.operations + Math.floor(Math.random() * 200);
                    // O(n log n) is roughly n * log2(n)
                    const targetTotal = dataSize * Math.log2(dataSize);
                    const newProgress = Math.min(100, (newOps / targetTotal) * 100);
                    return { ...prev, operations: newOps, progress: newProgress, status: "running" as const };
                });
            }, 50);
        }

        if (competitorA.progress >= 100 && competitorB.progress >= 100) {
            setIsPlaying(false);
        }

        return () => clearInterval(interval);
    }, [isPlaying, dataSize, competitorA.progress, competitorB.progress]);

    const handleStart = () => {
        setIsPlaying(true);
    };

    const handleReset = () => {
        setIsPlaying(false);
        setCompetitorA(prev => ({ ...prev, progress: 0, operations: 0, status: "idle" }));
        setCompetitorB(prev => ({ ...prev, progress: 0, operations: 0, status: "idle" }));
    };

    return (
        <Card className="cyber-card p-8 bg-card/40 backdrop-blur-md border-border/50 relative overflow-hidden">
            <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                        <Swords className="w-6 h-6 text-[var(--neon-yellow)]" />
                        Performance Battleground
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">Live efficiency race simulation (N = {dataSize})</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" onClick={handleReset} className="h-9 border-border/50">
                        <RotateCcw className="w-4 h-4 mr-2" /> Reset
                    </Button>
                    <Button
                        onClick={handleStart}
                        disabled={isPlaying || (competitorA.progress >= 100 && competitorB.progress >= 100)}
                        className="h-9 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)]"
                    >
                        <Play className="w-4 h-4 mr-2" /> Start Race
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {[competitorA, competitorB].map((comp, i) => (
                    <div key={i} className="space-y-6 p-6 rounded-xl bg-background/50 border border-border/30 relative group">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="text-lg font-bold" style={{ color: comp.color }}>{comp.name}</h4>
                                <p className="text-xs font-mono text-muted-foreground">{comp.complexity}</p>
                            </div>
                            <Activity className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-opacity" style={{ color: comp.color }} />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-mono">
                                <span className="text-muted-foreground uppercase">Execution Progress</span>
                                <span style={{ color: comp.color }}>{Math.floor(comp.progress)}%</span>
                            </div>
                            <div className="h-2 bg-background border border-border/20 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full"
                                    style={{ backgroundColor: comp.color }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${comp.progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 rounded bg-black/40 border border-border/10">
                                <p className="text-[10px] text-muted-foreground uppercase mb-1">Total Ops</p>
                                <p className="text-xl font-mono font-bold">{comp.operations.toLocaleString()}</p>
                            </div>
                            <div className="p-3 rounded bg-black/40 border border-border/10">
                                <p className="text-[10px] text-muted-foreground uppercase mb-1">Status</p>
                                <p className="text-sm font-bold uppercase tracking-widest" style={{ color: comp.status === 'finished' ? 'var(--neon-green)' : comp.status === 'running' ? comp.color : 'inherit' }}>
                                    {comp.status}
                                </p>
                            </div>
                        </div>

                        {comp.status === "finished" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl border border-[var(--neon-green)]/30"
                            >
                                <div className="text-center">
                                    <Zap className="w-8 h-8 text-[var(--neon-green)] mx-auto mb-2" />
                                    <p className="text-lg font-bold text-[var(--neon-green)]">FINISHED</p>
                                    <p className="text-[10px] text-muted-foreground uppercase mt-1">
                                        {comp.name === "Quick Sort" ? "🏆 WINNER" : "🐢 Completed"}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 rounded-lg bg-[var(--neon-cyan)]/5 border border-[var(--neon-cyan)]/20 flex items-start gap-4">
                <Cpu className="w-5 h-5 text-[var(--neon-cyan)] mt-1 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-[var(--neon-cyan)] font-bold">Scientific Insight:</span> This battle simulates real-world execution. While Bubble Sort grows quadratically, Quick Sort scales logarithmically, making it significantly more efficient for large datasets (N).
                </p>
            </div>
        </Card>
    );
}
