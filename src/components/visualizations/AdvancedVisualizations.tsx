import { motion } from "framer-motion";

interface MatrixVisualizationProps {
    matrix: number[][];
    highlightedCells?: { row: number; col: number }[];
    title?: string;
}

export function MatrixVisualization({ matrix, highlightedCells = [], title }: MatrixVisualizationProps) {
    const isHighlighted = (row: number, col: number) => {
        return highlightedCells.some(cell => cell.row === row && cell.col === col);
    };

    return (
        <div className="w-full">
            {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
            <div className="flex flex-col gap-2 items-center">
                {matrix.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2">
                        {row.map((value, colIndex) => (
                            <motion.div
                                key={`${rowIndex}-${colIndex}`}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: (rowIndex * row.length + colIndex) * 0.02 }}
                                className={`
                  w-12 h-12 flex items-center justify-center rounded
                  font-mono text-sm font-bold
                  ${isHighlighted(rowIndex, colIndex)
                                        ? 'bg-[var(--neon-cyan)] text-background'
                                        : 'bg-card border border-border text-foreground'
                                    }
                `}
                            >
                                {value}
                            </motion.div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

interface NetworkNode {
    id: string;
    label: string;
    x: number;
    y: number;
}

interface NetworkEdge {
    from: string;
    to: string;
    weight?: number;
}

interface NetworkVisualizationProps {
    nodes: NetworkNode[];
    edges: NetworkEdge[];
    highlightedNodes?: string[];
    highlightedEdges?: { from: string; to: string }[];
}

export function NetworkVisualization({
    nodes,
    edges,
    highlightedNodes = [],
    highlightedEdges = []
}: NetworkVisualizationProps) {
    const isNodeHighlighted = (nodeId: string) => highlightedNodes.includes(nodeId);

    const isEdgeHighlighted = (from: string, to: string) => {
        return highlightedEdges.some(edge => edge.from === from && edge.to === to);
    };

    return (
        <svg className="w-full h-96 bg-background/50 rounded-lg border border-border">
            {/* Edges */}
            {edges.map((edge, index) => {
                const fromNode = nodes.find(n => n.id === edge.from);
                const toNode = nodes.find(n => n.id === edge.to);
                if (!fromNode || !toNode) return null;

                const highlighted = isEdgeHighlighted(edge.from, edge.to);

                return (
                    <g key={index}>
                        <motion.line
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke={highlighted ? "var(--neon-cyan)" : "var(--border)"}
                            strokeWidth={highlighted ? 3 : 2}
                        />
                        {edge.weight !== undefined && (
                            <text
                                x={(fromNode.x + toNode.x) / 2}
                                y={(fromNode.y + toNode.y) / 2}
                                fill="var(--foreground)"
                                fontSize="12"
                                textAnchor="middle"
                            >
                                {edge.weight}
                            </text>
                        )}
                    </g>
                );
            })}

            {/* Nodes */}
            {nodes.map((node, index) => (
                <motion.g
                    key={node.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                >
                    <circle
                        cx={node.x}
                        cy={node.y}
                        r={20}
                        fill={isNodeHighlighted(node.id) ? "var(--neon-pink)" : "var(--card)"}
                        stroke={isNodeHighlighted(node.id) ? "var(--neon-pink)" : "var(--border)"}
                        strokeWidth={2}
                    />
                    <text
                        x={node.x}
                        y={node.y + 5}
                        fill={isNodeHighlighted(node.id) ? "var(--background)" : "var(--foreground)"}
                        fontSize="14"
                        fontWeight="bold"
                        textAnchor="middle"
                    >
                        {node.label}
                    </text>
                </motion.g>
            ))}
        </svg>
    );
}

interface GeometricPoint {
    x: number;
    y: number;
    label?: string;
}

interface GeometricVisualizationProps {
    points: GeometricPoint[];
    lines?: { from: GeometricPoint; to: GeometricPoint }[];
    polygons?: GeometricPoint[][];
    highlightedPoints?: number[];
}

export function GeometricVisualization({
    points,
    lines = [],
    polygons = [],
    highlightedPoints = []
}: GeometricVisualizationProps) {
    const scale = 2;
    const offset = 50;

    return (
        <svg className="w-full h-96 bg-background/50 rounded-lg border border-border">
            {/* Polygons */}
            {polygons.map((polygon, index) => (
                <motion.polygon
                    key={`polygon-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: index * 0.2 }}
                    points={polygon.map(p => `${p.x * scale + offset},${p.y * scale + offset}`).join(' ')}
                    fill="var(--neon-purple)"
                    stroke="var(--neon-purple)"
                    strokeWidth={2}
                />
            ))}

            {/* Lines */}
            {lines.map((line, index) => (
                <motion.line
                    key={`line-${index}`}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    x1={line.from.x * scale + offset}
                    y1={line.from.y * scale + offset}
                    x2={line.to.x * scale + offset}
                    y2={line.to.y * scale + offset}
                    stroke="var(--neon-cyan)"
                    strokeWidth={2}
                />
            ))}

            {/* Points */}
            {points.map((point, index) => (
                <motion.g
                    key={`point-${index}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                >
                    <circle
                        cx={point.x * scale + offset}
                        cy={point.y * scale + offset}
                        r={highlightedPoints.includes(index) ? 8 : 5}
                        fill={highlightedPoints.includes(index) ? "var(--neon-pink)" : "var(--neon-cyan)"}
                    />
                    {point.label && (
                        <text
                            x={point.x * scale + offset + 10}
                            y={point.y * scale + offset - 10}
                            fill="var(--foreground)"
                            fontSize="12"
                        >
                            {point.label}
                        </text>
                    )}
                </motion.g>
            ))}
        </svg>
    );
}
