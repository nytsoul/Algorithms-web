import { motion } from "framer-motion";

interface MatrixVisualizationProps {
    data: (number | string)[][];
    activeCell?: [number, number];
    highlights?: [number, number][];
}

export function MatrixVisualization({ data, activeCell, highlights = [] }: MatrixVisualizationProps) {
    return (
        <div className="flex flex-col gap-1 items-center justify-center p-4">
            {data.map((row, rIdx) => (
                <div key={rIdx} className="flex gap-1">
                    {row.map((val, cIdx) => {
                        const isActive = activeCell?.[0] === rIdx && activeCell?.[1] === cIdx;
                        const isHighlighted = highlights.some(h => h[0] === rIdx && h[1] === cIdx);

                        return (
                            <motion.div
                                key={`${rIdx}-${cIdx}`}
                                className="w-12 h-12 border flex items-center justify-center text-xs font-mono rounded-sm"
                                style={{
                                    backgroundColor: isActive ? "var(--neon-cyan)" : isHighlighted ? "var(--neon-purple)" : "transparent",
                                    borderColor: isActive ? "var(--neon-cyan)" : "var(--border)",
                                    boxShadow: isActive ? "0 0 10px var(--neon-cyan)" : "none",
                                    color: isActive ? "black" : "inherit"
                                }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                            >
                                {val}
                            </motion.div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
