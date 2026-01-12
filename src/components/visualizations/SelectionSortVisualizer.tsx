
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ChevronRight, Pause, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CODE_SNIPPET = `function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
  }
}`;

const CODE_LINES = [
    "function selectionSort(arr) {",
    "  for (let i = 0; i < arr.length; i++) {",
    "    let min = i;",
    "    for (let j = i + 1; j < arr.length; j++) {",
    "      if (arr[j] < arr[min]) min = j;",
    "    }",
    "    if (min !== i) {",
    "      [arr[i], arr[min]] = [arr[min], arr[i]];",
    "    }",
    "  }",
    "}"
];

export function SelectionSortVisualizer() {
    const [array, setArray] = useState([12, 27, 53, 90, 55, 71, 59, 80, 62, 71, 83, 88]);
    const [currentI, setCurrentI] = useState(-1);
    const [currentJ, setCurrentJ] = useState(-1);
    const [minIdx, setMinIdx] = useState(-1);
    const [sortedIdx, setSortedIdx] = useState(-1);
    const [activeLine, setActiveLine] = useState(-1);
    const [isPaused, setIsPaused] = useState(true);
    const [speed, setSpeed] = useState(800);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const reset = () => {
        setArray([12, 27, 53, 90, 55, 71, 59, 80, 62, 71, 83, 88]);
        setCurrentI(-1);
        setCurrentJ(-1);
        setMinIdx(-1);
        setSortedIdx(-1);
        setActiveLine(-1);
        setIsPaused(true);
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    const step = async () => {
        let arr = [...array];
        let n = arr.length;

        // This is a simplified async step-by-step implementation
        // In a real one, we'd use a generator or a state machine
        for (let i = 0; i < n; i++) {
            setActiveLine(1); // for i loop
            setCurrentI(i);
            setMinIdx(i);
            setActiveLine(2); // let min = i
            await delay();

            for (let j = i + 1; j < n; j++) {
                setCurrentJ(j);
                setActiveLine(3); // for j loop
                await delay();
                setActiveLine(4); // if (arr[j] < arr[min])
                await delay();

                if (arr[j] < arr[minIdx]) {
                    setMinIdx(j);
                    setActiveLine(4); // highlight min update
                    await delay();
                }
            }

            setCurrentJ(-1);
            setActiveLine(6); // if (min !== i)
            await delay();

            if (minIdx !== i) {
                setActiveLine(7); // swap
                let temp = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = temp;
                setArray([...arr]);
                await delay();
            }
            setSortedIdx(i);
        }
        setActiveLine(-1);
        setCurrentI(-1);
        setMinIdx(-1);
        setIsPaused(true);
    };

    const delay = () => new Promise(resolve => {
        timerRef.current = setTimeout(resolve, speed);
    });

    const togglePlay = () => {
        setIsPaused(!isPaused);
        if (isPaused) step();
    };

    return (
        <div className="flex flex-col items-center gap-12 w-full max-w-4xl mx-auto p-8 bg-black rounded-3xl border border-white/5 shadow-2xl">
            {/* Title Section */}
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">Selection Sort</h2>
                <p className="text-[var(--neon-cyan)] text-xs font-medium tracking-[0.2em] uppercase opacity-70">
                    Picks the minimum from unsorted part repeatedly
                </p>
                <div className="flex justify-center gap-8 mt-4">
                    <div className="text-center">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Time</p>
                        <p className="text-sm font-mono text-[var(--neon-pink)]">O(N²)</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Space</p>
                        <p className="text-sm font-mono text-[var(--neon-green)]">O(1)</p>
                    </div>
                </div>
            </div>

            {/* Visualization Area */}
            <div className="grid grid-cols-6 md:grid-cols-12 gap-3 w-full max-w-2xl px-4 py-8 relative">
                {array.map((val, idx) => {
                    let statusColor = "border-white/10 text-white/50";
                    let glowClass = "";

                    if (idx === currentI) {
                        statusColor = "border-[var(--neon-green)] text-[var(--neon-green)]";
                        glowClass = "shadow-[0_0_15px_rgba(0,255,163,0.3)]";
                    } else if (idx === currentJ) {
                        statusColor = "border-[var(--neon-pink)] text-[var(--neon-pink)]";
                        glowClass = "shadow-[0_0_15px_rgba(255,0,212,0.3)]";
                    } else if (idx === minIdx) {
                        statusColor = "border-[var(--neon-yellow)] text-[var(--neon-yellow)]";
                        glowClass = "shadow-[0_0_15px_rgba(255,255,0,0.3)]";
                    } else if (idx <= sortedIdx) {
                        statusColor = "border-[var(--neon-cyan)] text-[var(--neon-cyan)] opacity-100";
                        glowClass = "shadow-[0_0_10px_rgba(0,243,255,0.2)]";
                    }

                    return (
                        <motion.div
                            key={idx}
                            layout
                            className="flex flex-col items-center gap-2"
                        >
                            <div className={`w-full aspect-square flex items-center justify-center rounded-lg border-2 font-mono font-bold text-lg bg-white/5 transition-all duration-300 ${statusColor} ${glowClass}`}>
                                {val}
                            </div>
                            <span className={`text-[10px] font-bold ${idx <= sortedIdx ? 'text-[var(--neon-cyan)]' : 'text-white/20'}`}>
                                {idx}
                            </span>
                        </motion.div>
                    );
                })}
            </div>

            {/* Code Snippet Area */}
            <div className="w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest font-bold">selection_sort.js</span>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                    {CODE_LINES.map((line, idx) => (
                        <div
                            key={idx}
                            className={`relative px-4 py-0.5 whitespace-pre rounded transition-colors duration-200 ${activeLine === idx ? 'bg-[var(--neon-purple)]/20 text-white' : 'text-white/40'}`}
                        >
                            {activeLine === idx && (
                                <motion.div
                                    layoutId="line-highlight"
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--neon-purple)]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                            )}
                            <span className="inline-block w-6 text-white/10 select-none mr-4 text-xs">{idx + 1}</span>
                            {line}
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={reset}
                    className="border-white/10 hover:bg-white/5 text-white/50 h-14 w-14 rounded-full p-0"
                >
                    <RotateCcw className="w-5 h-5" />
                </Button>
                <Button
                    size="lg"
                    onClick={togglePlay}
                    className="bg-white text-black hover:bg-white/90 h-14 px-8 rounded-full font-black uppercase italic tracking-tighter"
                >
                    {isPaused ? <><Play className="w-5 h-5 mr-2 fill-current" /> Play</> : <><Pause className="w-5 h-5 mr-2 fill-current" /> Pause</>}
                </Button>
            </div>
        </div>
    );
}
