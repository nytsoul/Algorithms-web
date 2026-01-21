import type { AlgorithmStep } from '@/types/visualization-types';

/**
 * Dijkstra's Algorithm for Shortest Path
 * Find the shortest paths between nodes in a graph.
 */
export function generateDijkstraSteps(adjList: Record<number, { node: number, weight: number }[]>, startNode: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const nodes = Object.keys(adjList).map(Number);
    const distances: Record<number, number> = {};
    const previous: Record<number, number | null> = {};
    const visited = new Set<number>();

    nodes.forEach(node => {
        distances[node] = node === startNode ? 0 : Infinity;
        previous[node] = null;
    });

    steps.push({
        id: 'init',
        description: `Starting Dijkstra from node ${startNode}. Initialize distances to Infinity.`,
        data: { distances: { ...distances }, visited: Array.from(visited) }
    });

    const pq = [[startNode, 0]]; // Simplified PQ [node, distance]

    while (pq.length > 0) {
        pq.sort((a, b) => a[1] - b[1]);
        const [u, distU] = pq.shift()!;

        if (visited.has(u)) continue;
        visited.add(u);

        steps.push({
            id: `visit-${u}`,
            description: `Visiting node ${u} with distance ${distU}`,
            currentIndex: u,
            data: { distances: { ...distances }, visited: Array.from(visited), currentNode: u }
        });

        for (const { node: v, weight } of adjList[u]) {
            const newDist = distU + weight;

            steps.push({
                id: `check-edge-${u}-${v}`,
                description: `Checking edge ${u} -> ${v} (weight ${weight})`,
                comparedIndices: [u, v],
                data: { distances: { ...distances }, visited: Array.from(visited) }
            });

            if (newDist < distances[v]) {
                distances[v] = newDist;
                previous[v] = u;
                pq.push([v, newDist]);

                steps.push({
                    id: `update-dist-${v}`,
                    description: `Updated distance to node ${v}: ${newDist}`,
                    currentIndex: v,
                    data: { distances: { ...distances }, visited: Array.from(visited) }
                });
            }
        }
    }

    steps.push({
        id: 'complete',
        description: '✅ Dijkstra Complete!',
        data: { distances: { ...distances }, visited: Array.from(visited), finished: true }
    });

    return steps;
}

/**
 * Kruskal's Algorithm for Minimum Spanning Tree
 * Find the MST of a graph by sorting all edges and adding them if they don't form a cycle.
 */
export function generateKruskalSteps(vertices: number, edges: { u: number, v: number, w: number }[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const mst: typeof edges = [];

    steps.push({
        id: 'init',
        description: 'Starting Kruskal\'s Algorithm. Step 1: Sort all edges by weight.',
        data: { edges: [...edges] }
    });

    const sortedEdges = [...edges].sort((a, b) => a.w - b.w);

    steps.push({
        id: 'sorted',
        description: 'Edges sorted by weight (Greedy strategy).',
        data: { edges: [...sortedEdges] }
    });

    const parent = Array.from({ length: vertices }, (_, i) => i);
    function find(i: number): number {
        if (parent[i] === i) return i;
        return find(parent[i]);
    }
    function union(i: number, j: number) {
        const rootI = find(i);
        const rootJ = find(j);
        parent[rootI] = rootJ;
    }

    for (let i = 0; i < sortedEdges.length; i++) {
        const edge = sortedEdges[i];
        const rootU = find(edge.u);
        const rootV = find(edge.v);

        steps.push({
            id: `check-edge-${i}`,
            description: `Checking edge ${edge.u}-${edge.v} (weight ${edge.w})`,
            currentIndex: i,
            data: { edges: [...sortedEdges], mst: [...mst], currentEdgeIdx: i }
        });

        if (rootU !== rootV) {
            mst.push(edge);
            union(edge.u, edge.v);
            steps.push({
                id: `add-edge-${i}`,
                description: `✅ Edge ${edge.u}-${edge.v} added to MST. No cycle formed.`,
                currentIndex: i,
                data: { edges: [...sortedEdges], mst: [...mst], currentEdgeIdx: i }
            });
        } else {
            steps.push({
                id: `skip-edge-${i}`,
                description: `❌ Edge ${edge.u}-${edge.v} skipped. Forms a cycle.`,
                currentIndex: i,
                data: { edges: [...sortedEdges], mst: [...mst], currentEdgeIdx: i }
            });
        }

        if (mst.length === vertices - 1) break;
    }

    steps.push({
        id: 'complete',
        description: `✅ Kruskal Complete! MST weight: ${mst.reduce((sum, e) => sum + e.w, 0)}`,
        data: { mst: [...mst], finished: true }
    });

    return steps;
}

/**
 * Prim's Algorithm for Minimum Spanning Tree
 * Find the MST of a graph by greedily adding the cheapest edge from the current tree.
 */
export function generatePrimSteps(vertices: number, adjMatrix: number[][], startNode: number = 0): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const parent = new Array(vertices).fill(-1);
    const key = new Array(vertices).fill(Infinity);
    const mstSet = new Array(vertices).fill(false);

    key[startNode] = 0;

    steps.push({
        id: 'init',
        description: `Starting Prim\'s from node ${startNode}. Initialize keys to Infinity.`,
        data: { key: [...key], mstSet: [...mstSet] }
    });

    for (let count = 0; count < vertices; count++) {
        // Pick min key node
        let minKey = Infinity;
        let u = -1;
        for (let v = 0; v < vertices; v++) {
            if (!mstSet[v] && key[v] < minKey) {
                minKey = key[v];
                u = v;
            }
        }

        if (u === -1) break;

        mstSet[u] = true;
        steps.push({
            id: `pick-${u}`,
            description: `Node ${u} added to MST. Searching adjacent edges.`,
            currentIndex: u,
            data: { key: [...key], mstSet: [...mstSet] }
        });

        for (let v = 0; v < vertices; v++) {
            if (adjMatrix[u][v] && !mstSet[v] && adjMatrix[u][v] < key[v]) {
                parent[v] = u;
                key[v] = adjMatrix[u][v];
                steps.push({
                    id: `update-${v}`,
                    description: `Updated node ${v} key to ${key[v]} via ${u}`,
                    currentIndex: v,
                    data: { key: [...key], mstSet: [...mstSet], parent: [...parent] }
                });
            }
        }
    }

    steps.push({
        id: 'complete',
        description: '✅ Prim\'s Complete!',
        data: { mstSet: [...mstSet], parent: [...parent], key: [...key], finished: true }
    });

    return steps;
}

export const graphGenerators = {
    dijkstra: generateDijkstraSteps,
    kruskal: generateKruskalSteps,
    prim: generatePrimSteps,
    bfs: generateBFSSteps,
    dfs: generateDFSSteps,
    topologicalSort: generateTopologicalSortSteps,
};

/**
 * Breadth First Search (BFS)
 */
export function generateBFSSteps(adjList: Record<number, number[]>, startNode: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const visited = new Set<number>();
    const queue: number[] = [startNode];
    visited.add(startNode);

    steps.push({
        id: 'init',
        description: `Starting BFS from node ${startNode}.`,
        data: { queue: [...queue], visited: Array.from(visited) }
    });

    while (queue.length > 0) {
        const u = queue.shift()!;

        steps.push({
            id: `visit-${u}`,
            description: `Visiting node ${u}`,
            currentIndex: u,
            data: { queue: [...queue], visited: Array.from(visited), currentNode: u }
        });

        for (const v of adjList[u] || []) {
            if (!visited.has(v)) {
                visited.add(v);
                queue.push(v);
                steps.push({
                    id: `discover-${v}`,
                    description: `Discovered neighbor ${v} of ${u}. Adding to queue.`,
                    comparedIndices: [u, v],
                    data: { queue: [...queue], visited: Array.from(visited) }
                });
            }
        }
    }

    steps.push({
        id: 'complete',
        description: '✅ BFS Complete!',
        data: { visited: Array.from(visited), finished: true }
    });

    return steps;
}

/**
 * Depth First Search (DFS)
 */
export function generateDFSSteps(adjList: Record<number, number[]>, startNode: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const visited = new Set<number>();
    const stack: number[] = [startNode];

    steps.push({
        id: 'init',
        description: `Starting DFS from node ${startNode}.`,
        data: { stack: [...stack], visited: Array.from(visited) }
    });

    const dfsHelper = (u: number) => {
        visited.add(u);
        steps.push({
            id: `visit-${u}`,
            description: `Visiting node ${u}`,
            currentIndex: u,
            data: { visited: Array.from(visited), currentNode: u }
        });

        for (const v of adjList[u] || []) {
            if (!visited.has(v)) {
                steps.push({
                    id: `recurse-${v}`,
                    description: `Recursively calling DFS on neighbor ${v} of ${u}`,
                    comparedIndices: [u, v],
                    data: { visited: Array.from(visited) }
                });
                dfsHelper(v);
            }
        }
    };

    dfsHelper(startNode);

    steps.push({
        id: 'complete',
        description: '✅ DFS Complete!',
        data: { visited: Array.from(visited), finished: true }
    });

    return steps;
}

/**
 * Topological Sort (Kahn's Algorithm)
 */
export function generateTopologicalSortSteps(vertices: number, adjList: Record<number, number[]>): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const inDegree: number[] = new Array(vertices).fill(0);

    for (const u in adjList) {
        for (const v of adjList[u]) {
            inDegree[v]++;
        }
    }

    steps.push({
        id: 'init',
        description: 'Initialized in-degrees for all vertices.',
        data: { inDegree: [...inDegree] }
    });

    const queue: number[] = [];
    for (let i = 0; i < vertices; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    steps.push({
        id: 'queue-init',
        description: 'Added vertices with 0 in-degree to the queue.',
        data: { queue: [...queue], inDegree: [...inDegree] }
    });

    const result: number[] = [];
    while (queue.length > 0) {
        const u = queue.shift()!;
        result.push(u);

        steps.push({
            id: `process-${u}`,
            description: `Processing node ${u}. Adding to result.`,
            currentIndex: u,
            data: { result: [...result], queue: [...queue], inDegree: [...inDegree] }
        });

        for (const v of adjList[u] || []) {
            inDegree[v]--;
            steps.push({
                id: `reduce-${v}`,
                description: `Reduced in-degree of ${v} to ${inDegree[v]}`,
                comparedIndices: [u, v],
                data: { inDegree: [...inDegree], queue: [...queue] }
            });

            if (inDegree[v] === 0) {
                queue.push(v);
                steps.push({
                    id: `enqueue-${v}`,
                    description: `In-degree of ${v} is 0. Adding to queue.`,
                    data: { queue: [...queue] }
                });
            }
        }
    }

    steps.push({
        id: 'complete',
        description: result.length === vertices ? '✅ Topological Sort Complete!' : '❌ Graph has a cycle! No valid order.',
        data: { result: [...result], finished: true }
    });

    return steps;
}

