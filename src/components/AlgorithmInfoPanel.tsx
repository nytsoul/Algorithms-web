import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen,
    Brain,
    Clock,
    Zap,
    AlertCircle,
    TrendingUp,
    ChevronDown,
    ChevronUp,
    Code2,
    Lightbulb,
    Target,
    CheckCircle2,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { AlgorithmDetailedInfo } from '@/lib/algorithm-detailed-info';

interface AlgorithmInfoPanelProps {
    algorithmDetails: AlgorithmDetailedInfo;
    className?: string;
}

interface SectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
    accentColor?: string;
}

function CollapsibleSection({ title, icon, children, defaultOpen = true, accentColor = 'var(--neon-cyan)' }: SectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="dark:bg-white/5 dark:border dark:border-white/10 bg-gray-100/80 border border-gray-300/40 rounded-xl overflow-hidden"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 dark:hover:bg-white/5 hover:bg-gray-200/50 transition-colors group"
            >
                <div className="flex items-center gap-3">
                    <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                    >
                        {icon}
                    </div>
                    <h3 className="font-bold text-lg dark:text-white text-gray-900">{title}</h3>
                </div>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 dark:text-white/40 text-gray-600 group-hover:text-[var(--neon-cyan)] transition-colors" />
                ) : (
                    <ChevronDown className="w-5 h-5 dark:text-white/40 text-gray-600 group-hover:text-[var(--neon-cyan)] transition-colors" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0 dark:text-white/80 text-gray-700">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function AlgorithmInfoPanel({ algorithmDetails, className = '' }: AlgorithmInfoPanelProps) {
    return (
        <div className={`space-y-4 ${className}`}>
            {/* Overview Section */}
            <CollapsibleSection
                title="Overview"
                icon={<BookOpen className="w-5 h-5" />}
                accentColor="var(--neon-cyan)"
            >
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="border-[var(--neon-cyan)]/30 text-[var(--neon-cyan)] bg-[var(--neon-cyan)]/10">
                            {algorithmDetails.domain}
                        </Badge>
                        <Badge variant="outline" className="border-[var(--neon-purple)]/30 text-[var(--neon-purple)] bg-[var(--neon-purple)]/10">
                            {algorithmDetails.category}
                        </Badge>
                        <Badge variant="outline" className="border-[var(--neon-green)]/30 text-[var(--neon-green)] bg-[var(--neon-green)]/10">
                            {algorithmDetails.difficulty}
                        </Badge>
                    </div>

                    <p className="text-sm leading-relaxed">{algorithmDetails.explanation}</p>

                    {algorithmDetails.description && (
                        <div className="dark:bg-[var(--neon-cyan)]/5 dark:border-[var(--neon-cyan)]/10 bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)]/20 rounded-lg p-3 mt-3">
                            <p className="text-sm italic">{algorithmDetails.description}</p>
                        </div>
                    )}
                </div>
            </CollapsibleSection>

            {/* How It Works Section */}
            <CollapsibleSection
                title="How It Works"
                icon={<Brain className="w-5 h-5" />}
                accentColor="var(--neon-purple)"
            >
                <div className="space-y-4">
                    <p className="text-sm leading-relaxed">{algorithmDetails.howItWorks}</p>

                    {algorithmDetails.stepByStep && algorithmDetails.stepByStep.length > 0 && (
                        <div className="mt-4">
                            <h4 className="text-sm font-bold dark:text-white/60 text-gray-700 uppercase tracking-wider mb-3">
                                Step-by-Step Process
                            </h4>
                            <ol className="space-y-2">
                                {algorithmDetails.stepByStep.map((step, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--neon-purple)]/20 text-[var(--neon-purple)] flex items-center justify-center text-xs font-bold">
                                            {idx + 1}
                                        </span>
                                        <span className="text-sm pt-0.5">{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}
                </div>
            </CollapsibleSection>

            {/* Complexity Analysis Section */}
            <CollapsibleSection
                title="Complexity Analysis"
                icon={<Clock className="w-5 h-5" />}
                accentColor="var(--neon-green)"
            >
                <div className="space-y-4">
                    {/* Time Complexity */}
                    <div>
                        <h4 className="text-sm font-bold dark:text-white/60 text-gray-700 uppercase tracking-wider mb-2">
                            Time Complexity
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="dark:bg-green-500/10 dark:border-green-500/20 bg-green-100 border border-green-300 rounded-lg p-3 text-center">
                                <div className="text-xs dark:text-white/40 text-gray-600 mb-1">Best</div>
                                <div className="font-mono font-bold text-green-500">{algorithmDetails.timeComplexity.best}</div>
                            </div>
                            <div className="dark:bg-[var(--neon-cyan)]/10 dark:border-[var(--neon-cyan)]/20 bg-cyan-100 border border-cyan-300 rounded-lg p-3 text-center">
                                <div className="text-xs dark:text-white/40 text-gray-600 mb-1">Average</div>
                                <div className="font-mono font-bold text-[var(--neon-cyan)]">{algorithmDetails.timeComplexity.average}</div>
                            </div>
                            <div className="dark:bg-red-500/10 dark:border-red-500/20 bg-red-100 border border-red-300 rounded-lg p-3 text-center">
                                <div className="text-xs dark:text-white/40 text-gray-600 mb-1">Worst</div>
                                <div className="font-mono font-bold text-red-500">{algorithmDetails.timeComplexity.worst}</div>
                            </div>
                        </div>
                    </div>

                    {/* Space Complexity */}
                    <div>
                        <h4 className="text-sm font-bold dark:text-white/60 text-gray-700 uppercase tracking-wider mb-2">
                            Space Complexity
                        </h4>
                        <div className="dark:bg-[var(--neon-purple)]/10 dark:border-[var(--neon-purple)]/20 bg-purple-100 border border-purple-300 rounded-lg p-3">
                            <div className="font-mono font-bold text-[var(--neon-purple)] text-center text-lg">
                                {algorithmDetails.spaceComplexity}
                            </div>
                        </div>
                    </div>

                    {/* Recurrence Relation */}
                    {algorithmDetails.recurrenceRelation && (
                        <div className="dark:bg-white/5 bg-gray-200/50 rounded-lg p-4 border dark:border-white/10 border-gray-300">
                            <h4 className="text-sm font-bold dark:text-white/60 text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Code2 className="w-4 h-4" />
                                Recurrence Relation
                            </h4>
                            <div className="font-mono text-sm dark:text-[var(--neon-cyan)] text-cyan-700 bg-black/20 dark:bg-black/40 p-3 rounded">
                                {algorithmDetails.recurrenceRelation}
                            </div>
                        </div>
                    )}

                    {/* Complexity Derivation */}
                    {algorithmDetails.complexityDerivation && (
                        <div className="dark:bg-white/5 bg-gray-200/50 rounded-lg p-4 border dark:border-white/10 border-gray-300">
                            <h4 className="text-sm font-bold dark:text-white/60 text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                Derivation
                            </h4>
                            <p className="text-sm leading-relaxed">{algorithmDetails.complexityDerivation}</p>
                        </div>
                    )}
                </div>
            </CollapsibleSection>

            {/* Real-World Applications */}
            {algorithmDetails.realWorldExamples && algorithmDetails.realWorldExamples.length > 0 && (
                <CollapsibleSection
                    title="Real-World Applications"
                    icon={<Target className="w-5 h-5" />}
                    accentColor="var(--neon-yellow)"
                    defaultOpen={false}
                >
                    <ul className="space-y-2">
                        {algorithmDetails.realWorldExamples.map((example, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 className="w-4 h-4 text-[var(--neon-green)] flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{example}</span>
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>
            )}

            {/* Key Points */}
            {algorithmDetails.keyPoints && algorithmDetails.keyPoints.length > 0 && (
                <CollapsibleSection
                    title="Key Points"
                    icon={<Lightbulb className="w-5 h-5" />}
                    accentColor="var(--neon-cyan)"
                    defaultOpen={false}
                >
                    <ul className="space-y-2">
                        {algorithmDetails.keyPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <span className="text-[var(--neon-cyan)] font-bold flex-shrink-0">•</span>
                                <span className="text-sm">{point}</span>
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>
            )}

            {/* Common Pitfalls */}
            {algorithmDetails.commonPitfalls && algorithmDetails.commonPitfalls.length > 0 && (
                <CollapsibleSection
                    title="Common Pitfalls"
                    icon={<AlertCircle className="w-5 h-5" />}
                    accentColor="var(--neon-pink)"
                    defaultOpen={false}
                >
                    <ul className="space-y-2">
                        {algorithmDetails.commonPitfalls.map((pitfall, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <AlertCircle className="w-4 h-4 text-[var(--neon-pink)] flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{pitfall}</span>
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>
            )}

            {/* Optimizations */}
            {algorithmDetails.optimizations && algorithmDetails.optimizations.length > 0 && (
                <CollapsibleSection
                    title="Optimizations"
                    icon={<Zap className="w-5 h-5" />}
                    accentColor="var(--neon-green)"
                    defaultOpen={false}
                >
                    <ul className="space-y-2">
                        {algorithmDetails.optimizations.map((optimization, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <Zap className="w-4 h-4 text-[var(--neon-green)] flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{optimization}</span>
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>
            )}

            {/* Advantages & Disadvantages */}
            {((algorithmDetails.advantages && algorithmDetails.advantages.length > 0) ||
                (algorithmDetails.disadvantages && algorithmDetails.disadvantages.length > 0)) && (
                    <CollapsibleSection
                        title="Pros & Cons"
                        icon={<TrendingUp className="w-5 h-5" />}
                        accentColor="var(--neon-purple)"
                        defaultOpen={false}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {algorithmDetails.advantages && algorithmDetails.advantages.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-bold text-green-500 mb-2">Advantages</h4>
                                    <ul className="space-y-1">
                                        {algorithmDetails.advantages.map((adv, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm">
                                                <span className="text-green-500">+</span>
                                                <span>{adv}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {algorithmDetails.disadvantages && algorithmDetails.disadvantages.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-bold text-red-500 mb-2">Disadvantages</h4>
                                    <ul className="space-y-1">
                                        {algorithmDetails.disadvantages.map((dis, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm">
                                                <span className="text-red-500">−</span>
                                                <span>{dis}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </CollapsibleSection>
                )}

            {/* Prerequisites & Related Algorithms */}
            {((algorithmDetails.prerequisites && algorithmDetails.prerequisites.length > 0) ||
                (algorithmDetails.relatedAlgorithms && algorithmDetails.relatedAlgorithms.length > 0)) && (
                    <CollapsibleSection
                        title="Learning Path"
                        icon={<Brain className="w-5 h-5" />}
                        accentColor="var(--neon-cyan)"
                        defaultOpen={false}
                    >
                        <div className="space-y-4">
                            {algorithmDetails.prerequisites && algorithmDetails.prerequisites.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-bold dark:text-white/60 text-gray-700 uppercase tracking-wider mb-2">
                                        Prerequisites
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {algorithmDetails.prerequisites.map((prereq, idx) => (
                                            <Badge key={idx} variant="secondary" className="text-xs">
                                                {prereq}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {algorithmDetails.relatedAlgorithms && algorithmDetails.relatedAlgorithms.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-bold dark:text-white/60 text-gray-700 uppercase tracking-wider mb-2">
                                        Related Algorithms
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {algorithmDetails.relatedAlgorithms.map((related, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs border-[var(--neon-cyan)]/30 text-[var(--neon-cyan)]">
                                                {related}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </CollapsibleSection>
                )}
        </div>
    );
}
