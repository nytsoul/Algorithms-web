import { motion, AnimatePresence } from "framer-motion";

interface ArrayGridVisualizationProps {
    data: number[];
    activeIndex: number[];
    comparedIndex: number[];
    sortedIndex: number[];
    minIndex?: number;
}

export function ArrayGridVisualization({
    data,
    activeIndex,
    comparedIndex,
    sortedIndex,
    minIndex
}: ArrayGridVisualizationProps) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-4 p-8">
            {data.map((val, idx) => {
                const isActive = activeIndex.includes(idx);
                const isCompared = comparedIndex.includes(idx);
                const isSorted = sortedIndex.includes(idx);
                const isMin = minIndex === idx;

                let status: "default" | "active" | "compared" | "sorted" | "min" = "default";
                if (isSorted) status = "sorted";
                else if (isMin) status = "min";
                else if (isCompared) status = "compared";
                else if (isActive) status = "active";

                const stateColor = {
                    default: "border-border/50 text-muted-foreground",
                    active: "border-[var(--neon-cyan)] text-[var(--neon-cyan)] bg-[var(--neon-cyan)]/10 shadow-[0_0_15px_rgba(var(--neon-cyan-rgb),0.3)]",
                    compared: "border-[var(--neon-pink)] text-[var(--neon-pink)] bg-[var(--neon-pink)]/10 shadow-[0_0_15px_rgba(var(--neon-pink-rgb),0.3)]",
                    sorted: "border-[var(--neon-green)] text-[var(--neon-green)] bg-[var(--neon-green)]/10 shadow-[0_0_15px_rgba(var(--neon-green-rgb),0.3)]",
                    min: "border-[var(--neon-purple)] text-[var(--neon-purple)] bg-[var(--neon-purple)]/10 shadow-[0_0_15px_rgba(var(--neon-purple-rgb),0.3)]"
                }[status];

                return (
                    <div key={idx} className="flex flex-col items-center gap-2">
                        <motion.div
                            layout
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-all duration-300 ${stateColor}`}
                        >
                            {val}
                        </motion.div>
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-mono text-muted-foreground">idx: {idx}</span>
                            {status !== "default" && (
                                <motion.span
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-[9px] font-bold uppercase tracking-tighter"
                                    style={{ color: `var(--neon-${status === 'min' ? 'purple' : status === 'sorted' ? 'green' : status === 'compared' ? 'pink' : 'cyan'})` }}
                                >
                                    {status}
                                </motion.span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
