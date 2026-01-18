import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  visited?: boolean;
  active?: boolean;
  distance?: number;
}

export interface Edge {
  from: string;
  to: string;
  weight?: number;
  active?: boolean;
  inPath?: boolean;
}

interface GraphVisualizationProps {
  nodes: Node[];
  edges: Edge[];
  currentStep?: number;
  algorithm?: string;
}

export function GraphVisualization({ nodes, edges, currentStep = 0, algorithm = "BFS" }: GraphVisualizationProps) {
  const [animatedNodes, setAnimatedNodes] = useState(nodes);
  const [animatedEdges, setAnimatedEdges] = useState(edges);

  useEffect(() => {
    setAnimatedNodes(nodes);
    setAnimatedEdges(edges);
  }, [nodes, edges, currentStep]);

  const getNodeColor = (node: Node) => {
    if (node.active) return "var(--neon-yellow)";
    if (node.visited) return "var(--neon-cyan)";
    return "var(--neon-pink)";
  };

  const getEdgeColor = (edge: Edge) => {
    if (edge.inPath) return "var(--neon-green)";
    if (edge.active) return "var(--neon-yellow)";
    return "var(--border)";
  };

  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 800 600"
      style={{ background: "var(--background)" }}
    >
      {/* Render edges first (behind nodes) */}
      {animatedEdges.map((edge, index) => {
        const fromNode = animatedNodes.find(n => n.id === edge.from);
        const toNode = animatedNodes.find(n => n.id === edge.to);

        if (!fromNode || !toNode) return null;

        return (
          <motion.g key={`edge-${index}`}>
            <motion.line
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={getEdgeColor(edge)}
              strokeWidth={edge.active || edge.inPath ? 3 : 2}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 1,
                stroke: getEdgeColor(edge)
              }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            />

            {/* Edge weight label */}
            {edge.weight !== undefined && (
              <motion.text
                x={(fromNode.x + toNode.x) / 2}
                y={(fromNode.y + toNode.y) / 2 - 10}
                fill="var(--neon-yellow)"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                {edge.weight}
              </motion.text>
            )}

            {/* Arrow head for directed graphs */}
            <motion.polygon
              points={`${toNode.x},${toNode.y} ${toNode.x - 8},${toNode.y - 5} ${toNode.x - 8},${toNode.y + 5}`}
              fill={getEdgeColor(edge)}
              initial={{ opacity: 0 }}
              animate={{ opacity: edge.active || edge.inPath ? 1 : 0.5 }}
              transition={{ delay: 0.5 + index * 0.05 }}
            />
          </motion.g>
        );
      })}

      {/* Render nodes */}
      {animatedNodes.map((node, index) => (
        <motion.g
          key={`${node.id}-${index}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.3 + index * 0.1,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          {/* Node glow effect */}
          {(node.active || node.visited) && (
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={35}
              fill={getNodeColor(node)}
              opacity={0.1}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}

          {/* Node circle */}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={25}
            fill="var(--card)"
            stroke={getNodeColor(node)}
            strokeWidth={3}
            animate={{
              stroke: getNodeColor(node),
              scale: node.active ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 0.5,
              scale: {
                duration: 0.8,
                repeat: node.active ? Infinity : 0,
                ease: "easeInOut"
              }
            }}
          />

          {/* Node label */}
          <motion.text
            x={node.x}
            y={node.y + 5}
            textAnchor="middle"
            fill={getNodeColor(node)}
            fontSize="16"
            fontWeight="bold"
          >
            {node.label}
          </motion.text>

          {/* Distance label (for shortest path algorithms) */}
          {node.distance !== undefined && (
            <motion.text
              x={node.x}
              y={node.y + 45}
              textAnchor="middle"
              fill="var(--neon-green)"
              fontSize="12"
              fontWeight="bold"
              initial={{ opacity: 0, y: node.y + 35 }}
              animate={{ opacity: 1, y: node.y + 45 }}
              transition={{ delay: 0.5 }}
            >
              d: {node.distance === Infinity ? "∞" : node.distance}
            </motion.text>
          )}
        </motion.g>
      ))}

      {/* Algorithm name label */}
      <motion.text
        x="20"
        y="30"
        fill="var(--neon-cyan)"
        fontSize="20"
        fontWeight="bold"
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 20 }}
        transition={{ delay: 1 }}
      >
        {algorithm}
      </motion.text>

      {/* Current step indicator */}
      <motion.text
        x="20"
        y="560"
        fill="var(--muted-foreground)"
        fontSize="14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Step: {currentStep}
      </motion.text>
    </svg>
  );
}

// Example graph data generator
export function generateSampleGraph(): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [
    { id: "A", label: "A", x: 150, y: 100 },
    { id: "B", label: "B", x: 350, y: 100 },
    { id: "C", label: "C", x: 550, y: 100 },
    { id: "D", label: "D", x: 150, y: 300 },
    { id: "E", label: "E", x: 350, y: 300 },
    { id: "F", label: "F", x: 550, y: 300 },
    { id: "G", label: "G", x: 350, y: 500 },
  ];

  const edges: Edge[] = [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "D", weight: 2 },
    { from: "B", to: "C", weight: 3 },
    { from: "B", to: "E", weight: 5 },
    { from: "C", to: "F", weight: 1 },
    { from: "D", to: "E", weight: 1 },
    { from: "E", to: "F", weight: 2 },
    { from: "E", to: "G", weight: 3 },
    { from: "F", to: "G", weight: 4 },
  ];

  return { nodes, edges };
}

// BFS visualization state generator
export function generateBFSSteps(startNode: string): Array<{ nodes: Node[]; edges: Edge[]; description: string }> {
  const { nodes: baseNodes, edges: baseEdges } = generateSampleGraph();
  const steps: Array<{ nodes: Node[]; edges: Edge[]; description: string }> = [];

  // Step 0: Initial state
  steps.push({
    nodes: baseNodes.map(n => ({ ...n, visited: false, active: n.id === startNode })),
    edges: baseEdges,
    description: `Starting BFS from node ${startNode}`
  });

  // Step 1: Visit neighbors of A
  steps.push({
    nodes: baseNodes.map(n => ({
      ...n,
      visited: ["A", "B", "D"].includes(n.id),
      active: n.id === "B" || n.id === "D"
    })),
    edges: baseEdges.map(e => ({
      ...e,
      active: (e.from === "A" && (e.to === "B" || e.to === "D"))
    })),
    description: "Visiting neighbors B and D"
  });

  // Step 2: Visit neighbors of B and D
  steps.push({
    nodes: baseNodes.map(n => ({
      ...n,
      visited: ["A", "B", "D", "C", "E"].includes(n.id),
      active: n.id === "C" || n.id === "E"
    })),
    edges: baseEdges.map(e => ({
      ...e,
      active: ((e.from === "B" && e.to === "C") || (e.from === "D" && e.to === "E") || (e.from === "B" && e.to === "E"))
    })),
    description: "Visiting neighbors C and E"
  });

  // Step 3: Visit F
  steps.push({
    nodes: baseNodes.map(n => ({
      ...n,
      visited: ["A", "B", "D", "C", "E", "F"].includes(n.id),
      active: n.id === "F"
    })),
    edges: baseEdges.map(e => ({
      ...e,
      active: ((e.from === "C" && e.to === "F") || (e.from === "E" && e.to === "F"))
    })),
    description: "Visiting F from C and E"
  });

  // Step 4: Visit G
  steps.push({
    nodes: baseNodes.map(n => ({
      ...n,
      visited: true,
      active: n.id === "G"
    })),
    edges: baseEdges.map(e => ({
      ...e,
      active: ((e.from === "E" && e.to === "G") || (e.from === "F" && e.to === "G"))
    })),
    description: "Visiting final node G"
  });

  // Step 5: Complete
  steps.push({
    nodes: baseNodes.map(n => ({ ...n, visited: true, active: false })),
    edges: baseEdges,
    description: "BFS traversal complete!"
  });

  return steps;
}

// Dijkstra's algorithm visualization
export function generateDijkstraSteps(startNode: string): Array<{ nodes: Node[]; edges: Edge[]; description: string }> {
  const { nodes: baseNodes, edges: baseEdges } = generateSampleGraph();
  const steps: Array<{ nodes: Node[]; edges: Edge[]; description: string }> = [];

  // Initial distances
  steps.push({
    nodes: baseNodes.map(n => ({
      ...n,
      distance: n.id === startNode ? 0 : Infinity,
      visited: false,
      active: n.id === startNode
    })),
    edges: baseEdges,
    description: `Starting Dijkstra from ${startNode}, distance 0`
  });

  // This would continue with actual Dijkstra steps
  // Simplified for demonstration

  return steps;
}
