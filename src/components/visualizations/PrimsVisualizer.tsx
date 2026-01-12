
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Pause, Grid, Share2, Info, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CODE_LINES = [
    "pq = [{n: start, w: 0}];",
    "while (!pq.isEmpty()) {",
    "  curr = pq.popMin();",
    "  if (curr == target) return;",
    "  for (n of adj(curr)) {",
    "    if (n.w < key[n]) {",
    "      key[n] = n.w; n.p = curr;",
    "    }",
    "  }",
    "}"
];

export function PrimsVisualizer() {
    const GRID_SIZE = 15;
    const [grid, setGrid] = useState<number[][]>([]);
    const [visited, setVisited] = useState<Set<string>>(new Set());
    const [frontier, setFrontier] = useState<Set<string>>(new Set());
    const [activeLine, setActiveLine] = useState(-1);
    const [isPaused, setIsPaused] = useState(true);
    const [targetNode, setTargetNode] = useState({ r: 12, c: 12 });
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        reset();
    }, []);

    const reset = () => {
        const newGrid = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));
        setGrid(newGrid);
        setVisited(new Set());
        setFrontier(new Set());
        setActiveLine(-1);
        setIsPaused(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const step = async () => {
        const startNode = { r: 2, c: 2 };
        let currentVisited = new Set<string>();
        let currentFrontier = new Set<string>();

        currentFrontier.add(`${startNode.r},${startNode.c}`);
        setFrontier(new Set(currentFrontier));
        setActiveLine(0);
        await delay();

        while (currentFrontier.size > 0 && !isPaused) {
            setActiveLine(1); // while (!pq.isEmpty())
            await delay();

            // Simplified Prim's/BFS-like tree expansion for visual effect
            const first = Array.from(currentFrontier)[0];
            currentFrontier.delete(first);
            currentVisited.add(first);

            setVisited(new Set(currentVisited));
            setFrontier(new Set(currentFrontier));
            setActiveLine(2); // curr = pq.popMin()
            await delay();

            const [r, c] = first.split(',').map(Number);
            if (r === targetNode.r && c === targetNode.c) {
                setActiveLine(3); // if (curr == target)
                await delay();
                break;
            }

            setActiveLine(4); // for n of adj(curr)
            const neighbors = [
                { r: r + 1, c }, { r: r - 1, c }, { r, c: c + 1 }, { r, c: c - 1 }
            ];

            for (const n of neighbors) {
                if (n.r >= 0 && n.r < GRID_SIZE && n.c >= 0 && n.c < GRID_SIZE) {
                    const key = `${n.r},${n.c}`;
                    if (!currentVisited.has(key) && !currentFrontier.has(key)) {
                        currentFrontier.add(key);
                        setActiveLine(5); // if (n.w < key[n])
                        await delay();
                    }
                }
            }
            setFrontier(new Set(currentFrontier));
        }
    };

    const delay = () => new Promise(resolve => {
        timeoutRef.current = setTimeout(resolve, 300);
    });

    const togglePlay = () => {
        setIsPaused(!isPaused);
        if (isPaused) step();
    };

    return (
        <div className="flex flex-col items-center gap-12 w-full max-w-4xl mx-auto p-8 bg-black rounded-3xl border border-white/5 shadow-2xl overflow-hidden relative">
            {/* Decorative Blur */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--neon-cyan)]/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Header Info */}
            <div className="text-center space-y-3 relative z-10">
                <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">Prim's Algorithm</h2>
                <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase">
                    Minimum Spanning Tree (Tree Expansion)
                </p>
            </div>

            {/* Grid Visualization */}
            <div className="relative p-1 bg-white/[0.03] rounded-xl border border-white/10 shadow-inner">
                <div
                    className="grid gap-[2px]"
                    style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
                >
                    {Array(GRID_SIZE * GRID_SIZE).fill(0).map((_, i) => {
                        const r = Math.floor(i / GRID_SIZE);
                        const c = i % GRID_SIZE;
                        const key = `${r},${c}`;
                        const isVisited = visited.has(key);
                        const isFrontier = frontier.has(key);
                        const isTarget = r === targetNode.r && c === targetNode.c;

                        let bgColor = "bg-white/[0.05]";
                        let glow = "";
                        let scale = 1;

                        if (isTarget) {
                            bgColor = "bg-red-500";
                            glow = "shadow-[0_0_15px_rgba(239,68,68,0.5)]";
                        } else if (isVisited) {
                            bgColor = "bg-[var(--neon-cyan)]";
                            glow = "shadow-[0_0_10px_rgba(0,243,255,0.4)]";
                        } else if (isFrontier) {
                            bgColor = "bg-[var(--neon-cyan)]/20 shadow-[0_0_5px_rgba(0,243,255,0.2)]";
                            scale = 0.9;
                        }

                        return (
                            <motion.div
                                key={i}
                                initial={false}
                                animate={{
                                    scale: isVisited ? [1, 1.2, 1] : scale,
                                    opacity: isVisited || isFrontier || isTarget ? 1 : 0.3
                                }}
                                className={`w-6 h-6 rounded-sm transition-all duration-500 ${bgColor} ${glow}`}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Code Snippet */}
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117]/80 backdrop-blur-xl shadow-2xl relative z-10">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest font-black">prims_engine.py</span>
                </div>
                <div className="p-6 font-mono text-xs leading-relaxed">
                    {CODE_LINES.map((line, idx) => (
                        <div
                            key={idx}
                            className={`relative px-4 py-0.5 whitespace-pre rounded-md transition-all duration-300 ${activeLine === idx ? 'bg-[var(--neon-purple)] text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'text-white/30'}`}
                        >
                            {idx === 0 ? <span className="text-[var(--neon-cyan)]">{'>>> '}</span> : <span className="opacity-0">{'>>> '}</span>}
                            {line}
                        </div>
                    ))}
                </div>
            </div>

            {/* Control Actions */}
            <div className="flex items-center gap-6 relative z-10">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={reset}
                    className="text-white/20 hover:text-white hover:bg-white/5 h-12 w-12 rounded-full border border-white/5"
                >
                    <RotateCcw className="w-5 h-5" />
                </Button>
                <Button
                    size="lg"
                    onClick={togglePlay}
                    className="bg-white text-black hover:bg-white/90 h-16 px-10 rounded-2xl font-black uppercase italic tracking-tighter"
                >
                    {isPaused ? <Play className="w-6 h-6 mr-2 fill-current" /> : <Pause className="w-6 h-6 mr-2 fill-current" />}
                    {isPaused ? "Initiate" : "Halt"}
                </Button>
                <div className="flex gap-2">
                    <Badge variant="outline" className="border-white/10 text-white/30 font-black px-3 py-1 uppercase text-[8px] tracking-widest">
                        Realtime
                    </Badge>
                </div>
            </div>
        </div>
    );
}
