import { motion } from "framer-motion";
import { useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Lock, CheckCircle, Zap } from "lucide-react";

interface SkillNode {
    id: string;
    label: string;
    x: number;
    y: number;
    status: "locked" | "in-progress" | "completed";
    category: string;
    connections: string[];
}

const SKILL_NODES: SkillNode[] = [
    { id: "arrays", label: "Arrays", x: 100, y: 300, status: "completed", category: "Basics", connections: ["sorting", "searching"] },
    { id: "searching", label: "Searching", x: 250, y: 150, status: "completed", category: "Algorithms", connections: ["graphs"] },
    { id: "sorting", label: "Sorting", x: 250, y: 450, status: "in-progress", category: "Algorithms", connections: ["dp"] },
    { id: "dp", label: "Dynamic Programming", x: 450, y: 500, status: "locked", category: "Advanced", connections: ["greedy"] },
    { id: "graphs", label: "Graph Theory", x: 450, y: 100, status: "locked", category: "Structure", connections: ["greedy"] },
    { id: "greedy", label: "Greedy", x: 650, y: 300, status: "locked", category: "Algorithms", connections: [] },
];

export default function SkillGraph() {
    const [activeNode, setActiveNode] = useState<string | null>(null);

    const getStatusColor = (status: SkillNode["status"]) => {
        switch (status) {
            case "completed": return "var(--neon-green)";
            case "in-progress": return "var(--neon-cyan)";
            default: return "rgba(128, 128, 128, 0.3)";
        }
    };

    const getNodeIcon = (status: SkillNode["status"]) => {
        switch (status) {
            case "completed": return CheckCircle;
            case "in-progress": return Zap;
            default: return Lock;
        }
    };

    return (
        <div className="relative w-full h-[700px] rounded-2xl overflow-hidden group">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0f] to-black" />

            {/* Cyber grid overlay */}
            <div className="absolute inset-0 cyber-grid opacity-20" />

            {/* Animated gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--neon-purple)]/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--neon-cyan)]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Glassmorphism container */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm" />
            <div className="absolute inset-0 border border-white/5 rounded-2xl" />

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-[var(--neon-cyan)] rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [-20, 20],
                        opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                />
            ))}

            {/* Header */}
            <div className="absolute top-8 left-8 z-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-2"
                >
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-3 h-3 rounded-full bg-[var(--neon-cyan)] animate-pulse" />
                            <div className="absolute inset-0 w-3 h-3 rounded-full bg-[var(--neon-cyan)] animate-ping" />
                        </div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                            Mastery Knowledge Graph
                        </h3>
                        <Sparkles className="w-5 h-5 text-[var(--neon-yellow)]" />
                    </div>
                    <p className="text-sm text-muted-foreground ml-6">Interactive prerequisite mapper • {SKILL_NODES.filter(n => n.status === 'completed').length}/{SKILL_NODES.length} completed</p>
                </motion.div>
            </div>

            {/* Main SVG Graph */}
            <svg className="w-full h-full relative z-10" viewBox="0 0 800 600">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--neon-cyan)" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="var(--neon-cyan)" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="var(--neon-purple)" stopOpacity="0.2" />
                    </linearGradient>
                </defs>

                {/* Connections */}
                {SKILL_NODES.map((node) =>
                    node.connections.map((targetId) => {
                        const target = SKILL_NODES.find(n => n.id === targetId);
                        if (!target) return null;

                        const isActive = activeNode === node.id || activeNode === targetId;
                        const isCompleted = node.status === "completed" && target.status === "completed";

                        return (
                            <g key={`${node.id}-${targetId}`}>
                                {/* Connection line */}
                                <motion.line
                                    x1={node.x}
                                    y1={node.y}
                                    x2={target.x}
                                    y2={target.y}
                                    stroke={isCompleted ? "var(--neon-green)" : isActive ? "url(#lineGradient)" : "rgba(255,255,255,0.08)"}
                                    strokeWidth={isActive ? 3 : 1.5}
                                    strokeDasharray={isCompleted ? "none" : "8,4"}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 0.2 }}
                                    className="transition-all duration-500"
                                    filter={isActive ? "url(#glow)" : "none"}
                                />
                                {/* Animated flow particles on active connections */}
                                {isActive && (
                                    <motion.circle
                                        r="3"
                                        fill="var(--neon-cyan)"
                                        filter="url(#glow)"
                                        animate={{
                                            offsetDistance: ["0%", "100%"],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                    >
                                        <animateMotion
                                            dur="2s"
                                            repeatCount="indefinite"
                                            path={`M ${node.x} ${node.y} L ${target.x} ${target.y}`}
                                        />
                                    </motion.circle>
                                )}
                            </g>
                        );
                    })
                )}

                {/* Nodes */}
                {SKILL_NODES.map((node, index) => {
                    const NodeIcon = getNodeIcon(node.status);
                    return (
                        <g
                            key={node.id}
                            className="cursor-pointer"
                            onMouseEnter={() => setActiveNode(node.id)}
                            onMouseLeave={() => setActiveNode(null)}
                        >
                            <HoverCard openDelay={0}>
                                <HoverCardTrigger asChild>
                                    <motion.g
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: index * 0.1, type: "spring" }}
                                        whileHover={{ scale: 1.15 }}
                                    >
                                        {/* Outer glow ring */}
                                        {node.status !== "locked" && (
                                            <motion.circle
                                                cx={node.x}
                                                cy={node.y}
                                                r={35}
                                                fill="none"
                                                stroke={getStatusColor(node.status)}
                                                strokeWidth={1}
                                                opacity={0.2}
                                                animate={{
                                                    scale: activeNode === node.id ? [1, 1.2, 1] : 1,
                                                    opacity: activeNode === node.id ? [0.2, 0.4, 0.2] : 0.2,
                                                }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        )}

                                        {/* Node glow */}
                                        <motion.circle
                                            cx={node.x}
                                            cy={node.y}
                                            r={28}
                                            fill={getStatusColor(node.status)}
                                            initial={{ opacity: 0.15 }}
                                            animate={{
                                                opacity: activeNode === node.id ? 0.4 : 0.15,
                                            }}
                                            filter="url(#glow)"
                                        />

                                        {/* Main node circle */}
                                        <circle
                                            cx={node.x}
                                            cy={node.y}
                                            r={24}
                                            fill="rgba(10, 10, 15, 0.95)"
                                            stroke={getStatusColor(node.status)}
                                            strokeWidth={2.5}
                                            className="transition-all duration-500"
                                        />

                                        {/* Inner gradient */}
                                        <circle
                                            cx={node.x}
                                            cy={node.y}
                                            r={20}
                                            fill={`url(#gradient-${node.id})`}
                                            opacity={0.1}
                                        />
                                        <defs>
                                            <radialGradient id={`gradient-${node.id}`}>
                                                <stop offset="0%" stopColor={getStatusColor(node.status)} />
                                                <stop offset="100%" stopColor="transparent" />
                                            </radialGradient>
                                        </defs>

                                        {/* Status indicator dot */}
                                        <circle
                                            cx={node.x + 16}
                                            cy={node.y - 16}
                                            r={4}
                                            fill={getStatusColor(node.status)}
                                            className="drop-shadow-lg"
                                        />

                                        {/* Label with better styling */}
                                        <text
                                            x={node.x}
                                            y={node.y + 48}
                                            textAnchor="middle"
                                            className="text-[11px] fill-white/90 font-semibold tracking-wide"
                                            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
                                        >
                                            {node.label}
                                        </text>
                                        <text
                                            x={node.x}
                                            y={node.y + 62}
                                            textAnchor="middle"
                                            className="text-[9px] fill-muted-foreground font-mono uppercase tracking-wider"
                                        >
                                            {node.category}
                                        </text>
                                    </motion.g>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-72 bg-black/95 backdrop-blur-xl border-[var(--neon-cyan)]/30 p-5">
                                    <div className="space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-bold text-base mb-1">{node.label}</h4>
                                                <Badge
                                                    variant="outline"
                                                    className="text-[10px] uppercase tracking-wider"
                                                    style={{ borderColor: getStatusColor(node.status), color: getStatusColor(node.status) }}
                                                >
                                                    {node.category}
                                                </Badge>
                                            </div>
                                            <NodeIcon className="w-5 h-5" style={{ color: getStatusColor(node.status) }} />
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            Master {node.label.toLowerCase()} concepts to unlock advanced algorithmic patterns and build stronger problem-solving foundations.
                                        </p>
                                        <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getStatusColor(node.status) }} />
                                            <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: getStatusColor(node.status) }}>
                                                {node.status.replace("-", " ")}
                                            </span>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </g>
                    );
                })}
            </svg>

            {/* Enhanced Legend */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 right-8 flex gap-6 text-[11px] font-semibold uppercase tracking-wider bg-black/80 backdrop-blur-xl p-4 rounded-xl border border-white/10"
            >
                <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[var(--neon-green)] shadow-lg shadow-[var(--neon-green)]/50" />
                    <span className="text-[var(--neon-green)]">Mastered</span>
                </div>
                <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[var(--neon-cyan)] shadow-lg shadow-[var(--neon-cyan)]/50" />
                    <span className="text-[var(--neon-cyan)]">Active</span>
                </div>
                <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-gray-500/40 shadow-lg" />
                    <span className="text-gray-400">Locked</span>
                </div>
            </motion.div>
        </div>
    );
}
