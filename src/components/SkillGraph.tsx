import { motion } from "framer-motion";
import { useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";

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

    return (
        <div className="relative w-full h-[600px] bg-card/20 rounded-xl border border-border/50 overflow-hidden cyber-grid p-8">
            <div className="absolute top-6 left-6 z-20">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--neon-cyan)] animate-pulse" />
                    Mastery Knowledge Graph
                </h3>
                <p className="text-xs text-muted-foreground mt-1">Interactive prerequisite mapper</p>
            </div>

            <svg className="w-full h-full relative z-10" viewBox="0 0 800 600">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Connections */}
                {SKILL_NODES.map((node) =>
                    node.connections.map((targetId) => {
                        const target = SKILL_NODES.find(n => n.id === targetId);
                        if (!target) return null;

                        const isActive = activeNode === node.id || activeNode === targetId;
                        const isCompleted = node.status === "completed" && target.status === "completed";

                        return (
                            <motion.line
                                key={`${node.id}-${targetId}`}
                                x1={node.x}
                                y1={node.y}
                                x2={target.x}
                                y2={target.y}
                                stroke={isCompleted ? "var(--neon-green)" : isActive ? "var(--neon-cyan)" : "rgba(255,255,255,0.05)"}
                                strokeWidth={isActive ? 2 : 1}
                                strokeDasharray={isCompleted ? "none" : "5,5"}
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5 }}
                                className="transition-colors duration-500"
                            />
                        );
                    })
                )}

                {/* Nodes */}
                {SKILL_NODES.map((node) => (
                    <g
                        key={node.id}
                        className="cursor-pointer"
                        onMouseEnter={() => setActiveNode(node.id)}
                        onMouseLeave={() => setActiveNode(null)}
                    >
                        <HoverCard openDelay={0}>
                            <HoverCardTrigger asChild>
                                <motion.g
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {/* Node Background Glow */}
                                    {node.status !== "locked" && (
                                        <motion.circle
                                            cx={node.x}
                                            cy={node.y}
                                            r={24}
                                            fill={getStatusColor(node.status)}
                                            initial={{ opacity: 0.1 }}
                                            animate={{
                                                opacity: activeNode === node.id ? 0.4 : 0.1,
                                                scale: activeNode === node.id ? 1.5 : 1
                                            }}
                                            filter="url(#glow)"
                                        />
                                    )}

                                    {/* Main Circle */}
                                    <circle
                                        cx={node.x}
                                        cy={node.y}
                                        r={20}
                                        fill="var(--background)"
                                        stroke={getStatusColor(node.status)}
                                        strokeWidth={2}
                                        className="transition-colors duration-500"
                                    />

                                    {/* Icon or Initials Placeholder */}
                                    <text
                                        x={node.x}
                                        y={node.y + 4}
                                        textAnchor="middle"
                                        fill={node.status === "locked" ? "gray" : "white"}
                                        className="text-[10px] font-bold pointer-events-none select-none"
                                    >
                                        {node.label.substring(0, 2).toUpperCase()}
                                    </text>

                                    {/* Label */}
                                    <text
                                        x={node.x}
                                        y={node.y + 40}
                                        textAnchor="middle"
                                        className="text-[10px] fill-muted-foreground font-mono"
                                    >
                                        {node.label}
                                    </text>
                                </motion.g>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-64 bg-background/90 backdrop-blur-md border-[var(--neon-cyan)]/30 p-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-sm">{node.label}</h4>
                                        <Badge variant="outline" className="text-[9px] uppercase tracking-tighter">
                                            {node.category}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Level up your {node.label.toLowerCase()} skills to unlock further path nodes.
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: getStatusColor(node.status) }} />
                                        <span className="text-[10px] font-medium uppercase">{node.status.replace("-", " ")}</span>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </g>
                ))}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-6 right-6 flex gap-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground bg-background/50 p-3 rounded-lg border border-border/30">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--neon-green)]" />
                    Mastered
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--neon-cyan)]" />
                    Active
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-500/30" />
                    Locked
                </div>
            </div>
        </div>
    );
}
