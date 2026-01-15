import { AlgorithmData } from "../algorithms-data";

export interface VisualizationStep {
    description: string;
    data?: any; // For Array, Matrix
    nodes?: any[]; // For Graph, Tree
    edges?: any[]; // For Graph, Tree
    activeIndices?: number[];
    comparedIndices?: number[];
    sortedIndices?: number[];
    activeCell?: [number, number];
    minIndex?: number;
    codeLine?: number;
}

export function generateStepsForAlgorithm(algorithm: any): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    const type = algorithm.visualizationType || "none";
    const name = algorithm.name;
    const slug = algorithm.slug;

    // Specific logic for BFS and Dijkstra (already partially exists)
    if (name.includes("BFS")) {
        // Return BFS mockup steps
        return generateGenericGraphSteps(name, "BFS Traversal");
    }

    // Procedural generation based on names/types
    if (slug === "selection-sort-12") { // Assuming index 12 based on alphabetical/domain sorting
        return generateSelectionSortSteps();
    }

    if (name.toLowerCase().includes("selection sort")) {
        return generateSelectionSortSteps();
    }

    switch (type) {
        case "array":
            return generateGenericArraySteps(name);
        case "tree":
            return generateGenericTreeSteps(name);
        case "matrix":
            return generateGenericMatrixSteps(name);
        case "graph":
        case "network":
            return generateGenericGraphSteps(name, "Processing nodes and edges");
        default:
            return generateGenericProceduralSteps(name);
    }
}

function generateGenericArraySteps(name: string): VisualizationStep[] {
    const data = Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 10);
    const steps: VisualizationStep[] = [];

    steps.push({
        description: `Initializing array for ${name}`,
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: []
    });

    // Simulate 5 processing steps
    for (let i = 0; i < 5; i++) {
        const active = i % 10;
        const compare = (i + 1) % 10;
        steps.push({
            description: `${name}: Processing element at index ${active}`,
            data: [...data],
            activeIndices: [active],
            comparedIndices: [compare],
            sortedIndices: i > 2 ? [0, 1] : []
        });
    }

    steps.push({
        description: `${name} completion`,
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: Array.from({ length: 10 }, (_, i) => i)
    });

    return steps;
}

function generateGenericTreeSteps(name: string): VisualizationStep[] {
    const nodes = [
        { id: "1", label: "Root", x: 400, y: 50 },
        { id: "2", label: "L1", x: 200, y: 150 },
        { id: "3", label: "R1", x: 600, y: 150 },
        { id: "4", label: "LL2", x: 100, y: 250 },
        { id: "5", label: "LR2", x: 300, y: 250 }
    ];
    const edges = [
        { from: "1", to: "2" },
        { from: "1", to: "3" },
        { from: "2", to: "4" },
        { from: "2", to: "5" }
    ];

    const steps: VisualizationStep[] = [];
    steps.push({ description: `Starting tree operation for ${name}`, nodes, edges });

    for (let i = 0; i < nodes.length; i++) {
        steps.push({
            description: `Visiting node ${nodes[i].label}`,
            nodes: nodes.map((n, idx) => ({ ...n, active: idx === i, visited: idx <= i })),
            edges: edges.map(e => ({ ...e, active: nodes.findIndex(n => n.id === e.to) === i }))
        });
    }

    return steps;
}

function generateGenericMatrixSteps(name: string): VisualizationStep[] {
    const data = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => 0));
    const steps: VisualizationStep[] = [];

    steps.push({ description: `Allocating matrix for ${name}`, data });

    for (let i = 0; i < 3; i++) {
        const newData = data.map(r => [...r]);
        newData[i][i] = 1;
        steps.push({
            description: `Computing cell [${i},${i}]`,
            data: newData,
            activeCell: [i, i]
        });
    }

    return steps;
}

function generateGenericGraphSteps(name: string, desc: string): VisualizationStep[] {
    const nodes = [
        { id: "A", label: "A", x: 200, y: 100 },
        { id: "B", label: "B", x: 400, y: 100 },
        { id: "C", label: "C", x: 300, y: 250 }
    ];
    const edges = [
        { from: "A", to: "B", weight: 5 },
        { from: "B", to: "C", weight: 3 },
        { from: "C", to: "A", weight: 2 }
    ];

    const steps: VisualizationStep[] = [];
    steps.push({ description: desc, nodes, edges });

    for (let i = 0; i < nodes.length; i++) {
        steps.push({
            description: `Scanning node ${nodes[i].id}`,
            nodes: nodes.map((n, idx) => ({ ...n, active: idx === i, visited: idx <= i })),
            edges: edges.map(e => ({ ...e, active: e.from === nodes[i].id }))
        });
    }

    return steps;
}

function generateGenericProceduralSteps(name: string): VisualizationStep[] {
    return [
        { description: `Initializing ${name}...`, codeLine: 1 },
        { description: `Gathering required resources for ${name}`, codeLine: 2 },
        { description: `Calculating optimal path for ${name}`, codeLine: 3 },
        { description: `Finalizing ${name} execution`, codeLine: 4 },
        { description: `${name} process complete.`, codeLine: 5 }
    ];
}

function generateSelectionSortSteps(): VisualizationStep[] {
    const data = [55, 12, 90, 27, 71, 53, 59, 80, 62, 71, 83, 88];
    const steps: VisualizationStep[] = [];
    const n = data.length;

    steps.push({
        description: "Starting Selection Sort: We iterate through the array to find the minimum element in each pass.",
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 1
    });

    const arr = [...data];
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        steps.push({
            description: `Pass ${i + 1}: Assume element at index ${i} (${arr[i]}) is the current minimum.`,
            data: [...arr],
            activeIndices: [i],
            comparedIndices: [],
            sortedIndices: Array.from({ length: i }, (_, k) => k),
            minIndex: minIdx,
            codeLine: 4
        });

        for (let j = i + 1; j < n; j++) {
            steps.push({
                description: `Comparing current minimum (${arr[minIdx]}) with element at index ${j} (${arr[j]}).`,
                data: [...arr],
                activeIndices: [minIdx],
                comparedIndices: [j],
                sortedIndices: Array.from({ length: i }, (_, k) => k),
                minIndex: minIdx,
                codeLine: 6
            });

            if (arr[j] < arr[minIdx]) {
                minIdx = j;
                steps.push({
                    description: `Found a smaller element (${arr[j]}). Updating current minimum index to ${j}.`,
                    data: [...arr],
                    activeIndices: [minIdx],
                    comparedIndices: [],
                    sortedIndices: Array.from({ length: i }, (_, k) => k),
                    minIndex: minIdx,
                    codeLine: 7
                });
            }
        }

        if (minIdx !== i) {
            steps.push({
                description: `Pass ${i + 1} complete: Smallest element found is ${arr[minIdx]}. Swapping with index ${i}.`,
                data: [...arr],
                activeIndices: [i, minIdx],
                comparedIndices: [],
                sortedIndices: Array.from({ length: i }, (_, k) => k),
                minIndex: minIdx,
                codeLine: 11
            });
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        } else {
            steps.push({
                description: `Pass ${i + 1} complete: Element at index ${i} is already the smallest. No swap needed.`,
                data: [...arr],
                activeIndices: [i],
                comparedIndices: [],
                sortedIndices: Array.from({ length: i }, (_, k) => k),
                minIndex: minIdx,
                codeLine: 10
            });
        }
    }

    steps.push({
        description: "Selection Sort complete: The entire array is now sorted in non-decreasing order.",
        data: [...arr],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        codeLine: 15
    });

    return steps;
}
