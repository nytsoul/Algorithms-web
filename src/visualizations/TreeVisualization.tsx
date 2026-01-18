import { motion } from "framer-motion";

interface TreeNode {
    id: string;
    label: string;
    x: number;
    y: number;
    active?: boolean;
    visited?: boolean;
}

interface TreeVisualizationProps {
    nodes: TreeNode[];
    edges: Array<{ from: string; to: string; active?: boolean }>;
}

export function TreeVisualization({ nodes, edges }: TreeVisualizationProps) {
    return (
        <svg className="w-full h-full" viewBox="0 0 800 400">
            {edges.map((edge, idx) => {
                const from = nodes.find(n => n.id === edge.from);
                const to = nodes.find(n => n.id === edge.to);
                if (!from || !to) return null;
                return (
                    <motion.line
                        key={`edge-${idx}`}
                        x1={from.x} y1={from.y}
                        x2={to.x} y2={to.y}
                        stroke={edge.active ? "var(--neon-green)" : "var(--border)"}
                        strokeWidth={edge.active ? 3 : 1}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                    />
                );
            })}
            {nodes.map((node, index) => (
                <motion.g key={`${node.id}-${index}`} initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <circle
                        cx={node.x} cy={node.y} r={20}
                        fill="var(--card)"
                        stroke={node.active ? "var(--neon-yellow)" : node.visited ? "var(--neon-cyan)" : "var(--neon-pink)"}
                        strokeWidth={2}
                    />
                    <text
                        x={node.x} y={node.y + 5}
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                        className="pointer-events-none"
                    >
                        {node.label}
                    </text>
                </motion.g>
            ))}
        </svg>
    );
}
