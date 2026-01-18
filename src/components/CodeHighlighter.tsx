import { motion } from "framer-motion";

interface CodeHighlighterProps {
    code: string;
    activeLine: number;
}

export default function CodeHighlighter({ code, activeLine }: CodeHighlighterProps) {
    const lines = code.split("\n");

    return (
        <div className="relative rounded-xl overflow-hidden border border-border/50 bg-[#0d1117] shadow-2xl font-mono text-sm leading-relaxed">
            {/* OS-style Header */}
            <div className="bg-[#161b22] px-4 py-2 border-b border-border/30 flex items-center justify-between">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Selection_Sort.js</span>
            </div>

            <div className="p-4 overflow-x-auto max-h-[400px] custom-scrollbar">
                {lines.map((line, idx) => {
                    const isHighlighted = idx + 1 === activeLine;
                    return (
                        <motion.div
                            key={idx}
                            initial={false}
                            animate={{
                                backgroundColor: isHighlighted ? "rgba(var(--neon-cyan-rgb), 0.15)" : "transparent",
                                color: isHighlighted ? "var(--neon-cyan)" : "#c9d1d9",
                            }}
                            className="px-4 py-0.5 rounded flex gap-4 min-w-fit"
                        >
                            <span className="w-6 text-right text-muted-foreground/50 select-none text-xs">
                                {idx + 1}
                            </span>
                            <pre className="whitespace-pre">{line}</pre>
                            {isHighlighted && (
                                <motion.div
                                    layoutId="code-highlight"
                                    className="absolute left-0 w-1 bg-[var(--neon-cyan)] h-[24px]"
                                    style={{ top: `${(idx * 24) + 16}px` }} // Approximate line height + padding
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
