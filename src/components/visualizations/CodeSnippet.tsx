import React from 'react';
import { motion } from 'framer-motion';

interface CodeSnippetProps {
    code: string;
    activeLine?: number;
    language?: string;
}

export function CodeSnippet({ code, activeLine, language = 'javascript' }: CodeSnippetProps) {
    const lines = code.trim().split('\n');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto bg-[#0a0a0c] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
        >
            {/* macOS Style Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-[10px] text-white/40 font-mono uppercase tracking-widest">
                    {language}_implementation.exe
                </div>
            </div>

            {/* Code Content */}
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto custom-scrollbar">
                {lines.map((line, idx) => {
                    const lineNum = idx + 1;
                    const isActive = activeLine === lineNum;

                    return (
                        <div
                            key={idx}
                            className={`flex gap-4 -mx-6 px-6 transition-colors duration-200 ${isActive ? 'bg-[var(--neon-purple)]/20 border-l-2 border-[var(--neon-purple)]' : ''
                                }`}
                        >
                            <span className="w-6 text-right text-white/20 select-none">{lineNum}</span>
                            <pre className={`${isActive ? 'text-white' : 'text-white/70'}`}>
                                {line}
                            </pre>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
