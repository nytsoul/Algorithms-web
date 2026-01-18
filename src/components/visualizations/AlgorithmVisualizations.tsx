import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// ============================================
// SORTING VISUALIZATION
// ============================================
interface SortingVisualizationProps {
    array: number[];
    highlightedIndices?: number[];
    comparedIndices?: number[];
    sortedIndices?: number[];
}

export function SortingVisualization({
    array,
    highlightedIndices = [],
    comparedIndices = [],
    sortedIndices = []
}: SortingVisualizationProps) {
    const maxValue = Math.max(...array);

    return (
        <div className="flex items-end justify-center gap-1 h-64 p-4">
            {array.map((value, index) => {
                const isHighlighted = highlightedIndices.includes(index);
                const isCompared = comparedIndices.includes(index);
                const isSorted = sortedIndices.includes(index);

                return (
                    <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${(value / maxValue) * 100}%` }}
                        transition={{ duration: 0.3 }}
                        className={`flex-1 rounded-t ${isSorted ? 'bg-[var(--neon-green)]' :
                            isHighlighted ? 'bg-[var(--neon-cyan)]' :
                                isCompared ? 'bg-[var(--neon-pink)]' :
                                    'bg-[var(--neon-purple)]/50'
                            }`}
                        style={{ minWidth: '8px' }}
                    >
                        <div className="text-xs text-center text-white font-bold mt-1">
                            {value}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}

// ============================================
// GRAPH VISUALIZATION
// ============================================
interface GraphNode {
    id: string;
    label: string;
    x: number;
    y: number;
}

interface GraphEdge {
    from: string;
    to: string;
    weight?: number;
    directed?: boolean;
}

interface GraphVisualizationProps {
    nodes: GraphNode[];
    edges: GraphEdge[];
    visitedNodes?: string[];
    currentNode?: string;
    visitedEdges?: { from: string; to: string }[];
}

export function GraphVisualization({
    nodes,
    edges,
    visitedNodes = [],
    currentNode,
    visitedEdges = []
}: GraphVisualizationProps) {
    return (
        <svg className="w-full h-96 bg-background/50 rounded-lg border border-border">
            {/* Edges */}
            {edges.map((edge, index) => {
                const fromNode = nodes.find(n => n.id === edge.from);
                const toNode = nodes.find(n => n.id === edge.to);
                if (!fromNode || !toNode) return null;

                const isVisited = visitedEdges.some(e => e.from === edge.from && e.to === edge.to);

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
                            stroke={isVisited ? "var(--neon-cyan)" : "var(--border)"}
                            strokeWidth={isVisited ? 3 : 2}
                            markerEnd={edge.directed ? "url(#arrowhead)" : undefined}
                        />
                        {edge.weight !== undefined && (
                            <text
                                x={(fromNode.x + toNode.x) / 2}
                                y={(fromNode.y + toNode.y) / 2 - 5}
                                fill="var(--foreground)"
                                fontSize="12"
                                textAnchor="middle"
                                className="font-bold"
                            >
                                {edge.weight}
                            </text>
                        )}
                    </g>
                );
            })}

            {/* Arrow marker for directed edges */}
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                >
                    <polygon points="0 0, 10 3, 0 6" fill="var(--neon-cyan)" />
                </marker>
            </defs>

            {/* Nodes */}
            {nodes.map((node, index) => {
                const isVisited = visitedNodes.includes(node.id);
                const isCurrent = currentNode === node.id;

                return (
                    <motion.g
                        key={`${node.id}-${index}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r={isCurrent ? 25 : 20}
                            fill={isCurrent ? "var(--neon-pink)" : isVisited ? "var(--neon-cyan)" : "var(--card)"}
                            stroke={isCurrent ? "var(--neon-pink)" : isVisited ? "var(--neon-cyan)" : "var(--border)"}
                            strokeWidth={3}
                        />
                        <text
                            x={node.x}
                            y={node.y + 5}
                            fill={isVisited || isCurrent ? "var(--background)" : "var(--foreground)"}
                            fontSize="14"
                            fontWeight="bold"
                            textAnchor="middle"
                        >
                            {node.label}
                        </text>
                    </motion.g>
                );
            })}
        </svg>
    );
}

// ============================================
// TREE VISUALIZATION
// ============================================
interface TreeNode {
    id: string;
    value: number | string;
    left?: TreeNode;
    right?: TreeNode;
}

interface TreeVisualizationProps {
    root: TreeNode | null;
    highlightedNodes?: string[];
    currentNode?: string;
}

export function TreeVisualization({ root, highlightedNodes = [], currentNode }: TreeVisualizationProps) {
    const [positions, setPositions] = useState<Map<string, { x: number; y: number }>>(new Map());

    useEffect(() => {
        if (!root) return;

        const newPositions = new Map<string, { x: number; y: number }>();
        const calculatePositions = (node: TreeNode | null, x: number, y: number, offset: number) => {
            if (!node) return;

            newPositions.set(node.id, { x, y });

            if (node.left) {
                calculatePositions(node.left, x - offset, y + 80, offset / 2);
            }
            if (node.right) {
                calculatePositions(node.right, x + offset, y + 80, offset / 2);
            }
        };

        calculatePositions(root, 400, 50, 100);
        setPositions(newPositions);
    }, [root]);

    if (!root) return <div className="text-center py-12">No tree to display</div>;

    const renderEdges = (node: TreeNode | null): React.ReactNode[] => {
        if (!node) return [];

        const edges: React.ReactNode[] = [];
        const pos = positions.get(node.id);

        if (node.left && pos) {
            const leftPos = positions.get(node.left.id);
            if (leftPos) {
                edges.push(
                    <line
                        key={`${node.id}-left`}
                        x1={pos.x}
                        y1={pos.y}
                        x2={leftPos.x}
                        y2={leftPos.y}
                        stroke="var(--border)"
                        strokeWidth={2}
                    />
                );
                edges.push(...renderEdges(node.left));
            }
        }

        if (node.right && pos) {
            const rightPos = positions.get(node.right.id);
            if (rightPos) {
                edges.push(
                    <line
                        key={`${node.id}-right`}
                        x1={pos.x}
                        y1={pos.y}
                        x2={rightPos.x}
                        y2={rightPos.y}
                        stroke="var(--border)"
                        strokeWidth={2}
                    />
                );
                edges.push(...renderEdges(node.right));
            }
        }

        return edges;
    };

    const renderNodes = (node: TreeNode | null): React.ReactNode[] => {
        if (!node) return [];

        const nodes: React.ReactNode[] = [];
        const pos = positions.get(node.id);

        if (pos) {
            const isHighlighted = highlightedNodes.includes(node.id);
            const isCurrent = currentNode === node.id;

            nodes.push(
                <g key={node.id}>
                    <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isCurrent ? 25 : 20}
                        fill={isCurrent ? "var(--neon-pink)" : isHighlighted ? "var(--neon-cyan)" : "var(--card)"}
                        stroke={isCurrent ? "var(--neon-pink)" : isHighlighted ? "var(--neon-cyan)" : "var(--border)"}
                        strokeWidth={2}
                    />
                    <text
                        x={pos.x}
                        y={pos.y + 5}
                        fill={isHighlighted || isCurrent ? "var(--background)" : "var(--foreground)"}
                        fontSize="14"
                        fontWeight="bold"
                        textAnchor="middle"
                    >
                        {node.value}
                    </text>
                </g>
            );
        }

        if (node.left) nodes.push(...renderNodes(node.left));
        if (node.right) nodes.push(...renderNodes(node.right));

        return nodes;
    };

    return (
        <svg className="w-full h-96 bg-background/50 rounded-lg border border-border">
            {renderEdges(root)}
            {renderNodes(root)}
        </svg>
    );
}

// ============================================
// MATRIX VISUALIZATION
// ============================================
interface MatrixVisualizationProps {
    matrix: number[][];
    highlightedCells?: { row: number; col: number }[];
    currentCell?: { row: number; col: number };
    title?: string;
}

export function MatrixVisualization({
    matrix,
    highlightedCells = [],
    currentCell,
    title
}: MatrixVisualizationProps) {
    const isHighlighted = (row: number, col: number) => {
        return highlightedCells.some(cell => cell.row === row && cell.col === col);
    };

    const isCurrent = (row: number, col: number) => {
        return currentCell?.row === row && currentCell?.col === col;
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
                  font-mono text-sm font-bold border-2
                  ${isCurrent(rowIndex, colIndex)
                                        ? 'bg-[var(--neon-pink)] border-[var(--neon-pink)] text-background'
                                        : isHighlighted(rowIndex, colIndex)
                                            ? 'bg-[var(--neon-cyan)] border-[var(--neon-cyan)] text-background'
                                            : 'bg-card border-border text-foreground'
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

// ============================================
// DYNAMIC PROGRAMMING TABLE
// ============================================
interface DPTableProps {
    table: (number | string)[][];
    rowLabels?: string[];
    colLabels?: string[];
    highlightedCells?: { row: number; col: number }[];
    currentCell?: { row: number; col: number };
}

export function DPTableVisualization({
    table,
    rowLabels,
    colLabels,
    highlightedCells = [],
    currentCell
}: DPTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="border-collapse">
                {colLabels && (
                    <thead>
                        <tr>
                            <th className="border border-border p-2"></th>
                            {colLabels.map((label, i) => (
                                <th key={i} className="border border-border p-2 text-sm font-bold">
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {table.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {rowLabels && (
                                <td className="border border-border p-2 text-sm font-bold">
                                    {rowLabels[rowIndex]}
                                </td>
                            )}
                            {row.map((cell, colIndex) => {
                                const isHighlighted = highlightedCells.some(
                                    c => c.row === rowIndex && c.col === colIndex
                                );
                                const isCurrent = currentCell?.row === rowIndex && currentCell?.col === colIndex;

                                return (
                                    <motion.td
                                        key={colIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: (rowIndex * row.length + colIndex) * 0.05 }}
                                        className={`
                      border border-border p-2 text-center font-mono text-sm
                      ${isCurrent
                                                ? 'bg-[var(--neon-pink)] text-background'
                                                : isHighlighted
                                                    ? 'bg-[var(--neon-cyan)] text-background'
                                                    : 'bg-card'
                                            }
                    `}
                                    >
                                        {cell}
                                    </motion.td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ============================================
// NETWORK FLOW VISUALIZATION
// ============================================
interface FlowEdge extends GraphEdge {
    capacity: number;
    flow: number;
}

interface NetworkFlowProps {
    nodes: GraphNode[];
    edges: FlowEdge[];
    source?: string;
    sink?: string;
}

export function NetworkFlowVisualization({ nodes, edges, source, sink }: NetworkFlowProps) {
    return (
        <svg className="w-full h-96 bg-background/50 rounded-lg border border-border">
            {/* Edges with flow */}
            {edges.map((edge, index) => {
                const fromNode = nodes.find(n => n.id === edge.from);
                const toNode = nodes.find(n => n.id === edge.to);
                if (!fromNode || !toNode) return null;

                const utilization = edge.flow / edge.capacity;
                const color = utilization > 0.8 ? "var(--neon-pink)" :
                    utilization > 0.5 ? "var(--neon-yellow)" :
                        "var(--neon-cyan)";

                return (
                    <g key={index}>
                        <line
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke={color}
                            strokeWidth={3}
                            markerEnd="url(#arrowhead)"
                        />
                        <text
                            x={(fromNode.x + toNode.x) / 2}
                            y={(fromNode.y + toNode.y) / 2 - 5}
                            fill="var(--foreground)"
                            fontSize="12"
                            textAnchor="middle"
                            className="font-bold"
                        >
                            {edge.flow}/{edge.capacity}
                        </text>
                    </g>
                );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
                const isSource = source === node.id;
                const isSink = sink === node.id;

                return (
                    <g key={node.id}>
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r={25}
                            fill={isSource ? "var(--neon-green)" : isSink ? "var(--neon-red)" : "var(--card)"}
                            stroke={isSource || isSink ? "white" : "var(--border)"}
                            strokeWidth={3}
                        />
                        <text
                            x={node.x}
                            y={node.y + 5}
                            fill={isSource || isSink ? "var(--background)" : "var(--foreground)"}
                            fontSize="14"
                            fontWeight="bold"
                            textAnchor="middle"
                        >
                            {node.label}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}
