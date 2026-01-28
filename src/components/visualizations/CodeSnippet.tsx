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
            className="w-full max-w-2xl mx-auto dark:bg-[#0a0a0c] dark:border dark:border-white/10 bg-white/70 border border-gray-400/40 rounded-xl overflow-hidden dark:shadow-2xl shadow-lg"
        >
            {/* macOS Style Header */}
            <div className="flex items-center justify-between px-4 py-3 dark:bg-white/5 dark:border-b dark:border-white/5 bg-gray-300/50 border-b border-gray-400/40">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="text-[10px] dark:text-white/40 text-gray-700 font-mono uppercase tracking-widest">
                    {language}_implementation.exe
                </div>
            </div>

            {/* Code Content */}
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto custom-scrollbar dark:text-white text-gray-900">
                {lines.map((line, idx) => {
                    const lineNum = idx + 1;
                    const isActive = activeLine === lineNum;

                    return (
                        <div
                            key={idx}
                            className={`flex gap-4 -mx-6 px-6 transition-colors duration-200 ${isActive ? 'dark:bg-[var(--neon-purple)]/20 dark:border-l-2 dark:border-[var(--neon-purple)] bg-[var(--neon-purple)]/25 border-l-2 border-[var(--neon-purple)]' : ''
                                }`}
                        >
                            <span className="w-6 text-right dark:text-white/20 text-gray-500 select-none">{lineNum}</span>
                            <pre className={`${isActive ? 'dark:text-white text-gray-900 font-semibold' : 'dark:text-white/70 text-gray-700'}`}>
                                {line}
                            </pre>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
