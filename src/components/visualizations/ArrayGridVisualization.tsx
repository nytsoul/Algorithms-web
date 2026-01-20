import React from 'react';
import { motion } from 'framer-motion';

interface ArrayGridVisualizationProps {
    data: number[];
    activeIndex?: number[];
    comparedIndex?: number[];
    sortedIndex?: number[];
}

export function ArrayGridVisualization({
    data,
    activeIndex = [],
    comparedIndex = [],
    sortedIndex = []
}: ArrayGridVisualizationProps) {
    return (
        <div className="flex flex-col items-center gap-2 w-full overflow-x-auto p-4">
            <div className="flex flex-wrap justify-center gap-2">
                {data.map((val, idx) => {
                    let bg = 'bg-card/50';
                    let border = 'border-border/50';
                    let text = 'text-foreground';
                    let shadow = '';
                    let scale = 1;

                    if (sortedIndex.includes(idx)) {
                        bg = 'bg-[var(--neon-green)]';
                        border = 'border-[var(--neon-green)]';
                        text = 'text-black';
                        shadow = 'shadow-[0_0_15px_var(--neon-green)]';
                    } else if (comparedIndex.includes(idx)) {
                        bg = 'bg-[var(--neon-pink)]/20';
                        border = 'border-[var(--neon-pink)]';
                        text = 'text-[var(--neon-pink)]';
                        shadow = 'shadow-[0_0_10px_var(--neon-pink)]';
                        scale = 1.1;
                    } else if (activeIndex.includes(idx)) {
                        bg = 'bg-[var(--neon-cyan)]';
                        border = 'border-[var(--neon-cyan)]';
                        text = 'text-black';
                        shadow = 'shadow-[0_0_15px_var(--neon-cyan)]';
                        scale = 1.15;
                    }

                    return (
                        <div key={idx} className="flex flex-col items-center gap-1">
                            <motion.div
                                layout
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`
                                    w-14 h-14 flex items-center justify-center rounded-lg border-2 
                                    ${bg} ${border} ${text} ${shadow}
                                    font-mono font-bold text-lg backdrop-blur-md transition-colors duration-300
                                `}
                            >
                                {val}
                            </motion.div>
                            <span className="text-[10px] text-muted-foreground font-mono">
                                {idx}
                            </span>
                        </div>
                    )
                })}
            </div>

            <div className="mt-8 flex gap-6 text-xs font-semibold">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[var(--neon-cyan)] ring-2 ring-[var(--neon-cyan)]/30" />
                    <span className="text-[var(--neon-cyan)]">Current</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[var(--neon-pink)]/50 ring-2 ring-[var(--neon-pink)]" />
                    <span className="text-[var(--neon-pink)]">Compare</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-[var(--neon-green)] ring-2 ring-[var(--neon-green)]/30" />
                    <span className="text-[var(--neon-green)]">Found/Sorted</span>
                </div>
            </div>
        </div>
    )
}
