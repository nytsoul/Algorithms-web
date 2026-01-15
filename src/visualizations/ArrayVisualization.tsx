import { motion } from "framer-motion";

interface ArrayVisualizationProps {
    data: number[] | string[];
    activeIndex: number[];
    comparedIndex: number[];
    sortedIndex: number[];
}

export function ArrayVisualization({ data, activeIndex, comparedIndex, sortedIndex }: ArrayVisualizationProps) {
    return (
        <div className="flex items-end justify-center gap-2 h-64 px-4">
            {data.map((val, idx) => {
                const isActive = activeIndex.includes(idx);
                const isCompared = comparedIndex.includes(idx);
                const isSorted = sortedIndex.includes(idx);

                let color = "var(--muted)";
                if (isActive) color = "var(--neon-cyan)";
                if (isCompared) color = "var(--neon-yellow)";
                if (isSorted) color = "var(--neon-green)";

                const height = typeof val === 'number' ? Math.max((val / 100) * 100, 10) : 50;

                return (
                    <div key={idx} className="flex flex-col items-center gap-2 flex-1 max-w-[40px]">
                        <motion.div
                            layout
                            className="w-full rounded-t-sm relative group"
                            style={{
                                height: `${height}%`,
                                backgroundColor: color,
                                boxShadow: isActive || isCompared ? `0 0 15px ${color}` : "none"
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border p-1 rounded text-[10px] font-mono whitespace-nowrap z-50">
                                {val}
                            </div>
                        </motion.div>
                        <span className="text-[10px] font-mono text-muted-foreground">{idx}</span>
                    </div>
                );
            })}
        </div>
    );
}
