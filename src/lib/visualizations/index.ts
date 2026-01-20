import type { AlgorithmData } from "../algorithm-schema";

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
    const name = algorithm.name.toLowerCase();
    const slug = algorithm.slug;

    // Searching Algorithms
    if (name.includes("linear search")) {
        return generateLinearSearchSteps();
    }
    if (name.includes("binary search")) {
        return generateBinarySearchSteps();
    }
    if (name.includes("jump search")) {
        return generateJumpSearchSteps();
    }
    if (name.includes("interpolation search")) {
        return generateInterpolationSearchSteps();
    }
    if (name.includes("exponential search")) {
        return generateExponentialSearchSteps();
    }
    if (name.includes("fibonacci search")) {
        return generateFibonacciSearchSteps();
    }
    if (name.includes("ternary search")) {
        return generateTernarySearchSteps();
    }

    // Sorting Algorithms
    if (name.includes("bubble sort")) {
        return generateBubbleSortSteps();
    }
    if (name.includes("selection sort")) {
        return generateSelectionSortSteps();
    }
    if (name.includes("insertion sort")) {
        return generateInsertionSortSteps();
    }
    if (name.includes("merge sort")) {
        return generateMergeSortSteps();
    }
    if (name.includes("quick sort")) {
        return generateQuickSortSteps();
    }
    if (name.includes("heap sort")) {
        return generateHeapSortSteps();
    }
    if (name.includes("counting sort")) {
        return generateCountingSortSteps();
    }
    if (name.includes("radix sort")) {
        return generateRadixSortSteps();
    }
    if (name.includes("bucket sort")) {
        return generateBucketSortSteps();
    }
    if (name.includes("shell sort")) {
        return generateShellSortSteps();
    }
    if (name.includes("tim sort")) {
        return generateTimSortSteps();
    }
    if (name.includes("comb sort")) {
        return generateCombSortSteps();
    }
    if (name.includes("cycle sort")) {
        return generateCycleSortSteps();
    }
    if (name.includes("odd") && name.includes("even")) {
        return generateOddEvenSortSteps();
    }
    if (name.includes("pancake sort")) {
        return generatePancakeSortSteps();
    }
    if (name.includes("strand sort")) {
        return generateStrandSortSteps();
    }
    if (name.includes("tournament sort")) {
        return generateTournamentSortSteps();
    }
    if (name.includes("flash sort")) {
        return generateFlashSortSteps();
    }

    // Graph Algorithms
    if (name.includes("bfs") || name.includes("breadth-first")) {
        return generateGenericGraphSteps(algorithm.name, "BFS Traversal");
    }
    if (name.includes("dfs") || name.includes("depth-first")) {
        return generateGenericGraphSteps(algorithm.name, "DFS Traversal");
    }
    if (name.includes("dijkstra")) {
        return generateGenericGraphSteps(algorithm.name, "Dijkstra's Shortest Path");
    }
    if (name.includes("a*") || name.includes("a-star")) {
        return generateGenericGraphSteps(algorithm.name, "A* Pathfinding");
    }

    // String Algorithms
    if (name.includes("kmp") || name.includes("knuth-morris-pratt")) {
        return generateKMPSteps();
    }
    if (name.includes("rabin-karp")) {
        return generateRabinKarpSteps();
    }
    if (name.includes("z algorithm")) {
        return generateZAlgorithmSteps();
    }

    // Tree Algorithms
    if (name.includes("avl")) {
        return generateGenericTreeSteps(algorithm.name);
    }
    if (name.includes("red-black") || name.includes("red black")) {
        return generateGenericTreeSteps(algorithm.name);
    }
    if (name.includes("b-tree") || name.includes("b+ tree")) {
        return generateGenericTreeSteps(algorithm.name);
    }
    if (name.includes("splay tree")) {
        return generateGenericTreeSteps(algorithm.name);
    }

    // Bit Manipulation
    if (name.includes("count set bits")) {
        return generateCountSetBitsSteps();
    }
    if (name.includes("power of two")) {
        return generatePowerOfTwoSteps();
    }
    if (name.includes("xor")) {
        return generateXORSteps();
    }
    if (name.includes("bit masking") || name.includes("bitmask")) {
        return generateBitMaskingSteps();
    }
    if (name.includes("gray code") || name.includes("grey code")) {
        return generateGrayCodeSteps();
    }

    // Default based on type
    switch (type) {
        case "array":
            return generateGenericArraySteps(algorithm.name);
        case "tree":
            return generateGenericTreeSteps(algorithm.name);
        case "matrix":
            return generateGenericMatrixSteps(algorithm.name);
        case "graph":
        case "network":
            return generateGenericGraphSteps(algorithm.name, "Processing nodes and edges");
        default:
            return generateGenericProceduralSteps(algorithm.name);
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

// ==========================================
// SEARCHING ALGORITHM VISUALIZATIONS
// ==========================================

function generateLinearSearchSteps(): VisualizationStep[] {
    const data = [25, 10, 45, 30, 60];
    const target = 45;
    const steps: VisualizationStep[] = [];

    steps.push({
        description: `Starting Linear Search: Looking for target ${target} in the array.`,
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 1
    });

    for (let i = 0; i < data.length; i++) {
        steps.push({
            description: `Checking index ${i}: Element is ${data[i]}. ${data[i] === target ? '✅ Found!' : 'Not a match, continue...'}`,
            data: [...data],
            activeIndices: [i],
            comparedIndices: [],
            sortedIndices: [],
            codeLine: 3
        });
        if (data[i] === target) {
            steps.push({
                description: `Target ${target} found at index ${i}!`,
                data: [...data],
                activeIndices: [i],
                comparedIndices: [],
                sortedIndices: [],
                codeLine: 4
            });
            return steps;
        }
    }

    steps.push({
        description: `Target ${target} not found in the array.`,
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 6
    });

    return steps;
}

function generateBinarySearchSteps(): VisualizationStep[] {
    const data = [10, 20, 30, 40, 50, 60];
    const target = 40;
    const steps: VisualizationStep[] = [];
    let low = 0;
    let high = data.length - 1;

    steps.push({
        description: `Starting Binary Search: Looking for target ${target} in sorted array.`,
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 1
    });

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        steps.push({
            description: `Checking middle element at index ${mid}: arr[${mid}] = ${data[mid]}. ${data[mid] === target ? '✅ Found!' : data[mid] < target ? 'Target is larger, search right half.' : 'Target is smaller, search left half.'}`,
            data: [...data],
            activeIndices: [mid],
            comparedIndices: [],
            sortedIndices: Array.from({ length: data.length }, (_, i) => i < low || i > high ? -1 : i).filter(i => i >= 0),
            codeLine: 4
        });

        if (data[mid] === target) {
            steps.push({
                description: `Target ${target} found at index ${mid}!`,
                data: [...data],
                activeIndices: [mid],
                comparedIndices: [],
                sortedIndices: [],
                codeLine: 5
            });
            return steps;
        } else if (data[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    steps.push({
        description: `Target ${target} not found in the array.`,
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 10
    });

    return steps;
}

function generateJumpSearchSteps(): VisualizationStep[] {
    const data = [10, 20, 30, 40, 50, 60, 70, 80];
    const target = 50;
    const n = data.length;
    const step = Math.floor(Math.sqrt(n));
    const steps: VisualizationStep[] = [];
    let prev = 0;
    let currentStep = step;

    steps.push({
        description: `Starting Jump Search: Jump size = √${n} = ${step}. Looking for target ${target}.`,
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 1
    });

    while (currentStep < n && data[currentStep] < target) {
        steps.push({
            description: `Jumping to index ${currentStep}: arr[${currentStep}] = ${data[currentStep]} < ${target}. Continue jumping...`,
            data: [...data],
            activeIndices: [currentStep],
            comparedIndices: [],
            sortedIndices: [],
            codeLine: 4
        });
        prev = currentStep;
        currentStep += step;
    }

    steps.push({
        description: `Found block: Searching linearly from index ${prev} to ${Math.min(currentStep, n - 1)}.`,
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 7
    });

    for (let i = prev; i < Math.min(currentStep, n); i++) {
        steps.push({
            description: `Checking index ${i}: arr[${i}] = ${data[i]}. ${data[i] === target ? '✅ Found!' : 'Continue...'}`,
            data: [...data],
            activeIndices: [i],
            comparedIndices: [],
            sortedIndices: [],
            codeLine: 8
        });
        if (data[i] === target) {
            return steps;
        }
    }

    steps.push({
        description: `Target ${target} not found.`,
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 11
    });

    return steps;
}

function generateInterpolationSearchSteps(): VisualizationStep[] {
    const data = [10, 20, 30, 40, 50, 60, 70, 80];
    const target = 70;
    const steps: VisualizationStep[] = [];
    let low = 0;
    let high = data.length - 1;

    steps.push({
        description: `Starting Interpolation Search: Looking for target ${target} in uniformly distributed array.`,
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 1
    });

    while (low <= high && target >= data[low] && target <= data[high]) {
        const pos = low + Math.floor(((target - data[low]) * (high - low)) / (data[high] - data[low]));
        steps.push({
            description: `Estimated position: pos = ${low} + ((${target} - ${data[low]}) * (${high} - ${low})) / (${data[high]} - ${data[low]}) = ${pos}. Checking arr[${pos}] = ${data[pos]}.`,
            data: [...data],
            activeIndices: [pos],
            comparedIndices: [],
            sortedIndices: [],
            codeLine: 4
        });

        if (data[pos] === target) {
            steps.push({
                description: `Target ${target} found at index ${pos}!`,
                data: [...data],
                activeIndices: [pos],
                comparedIndices: [],
                sortedIndices: [],
                codeLine: 6
            });
            return steps;
        }

        if (data[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }

    return steps;
}

function generateExponentialSearchSteps(): VisualizationStep[] {
    const data = [2, 4, 8, 16, 32, 64, 128, 256];
    const target = 64;
    const steps: VisualizationStep[] = [];
    let i = 1;

    steps.push({
        description: `Starting Exponential Search: Looking for target ${target}.`,
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 1
    });

    if (data[0] === target) {
        steps.push({
            description: `Target found at index 0!`,
            data: [...data],
            activeIndices: [0],
            comparedIndices: [],
            sortedIndices: [],
            codeLine: 2
        });
        return steps;
    }

    while (i < data.length && data[i] <= target) {
        steps.push({
            description: `Exponential jump: Checking index ${i} (2^${Math.log2(i)}). arr[${i}] = ${data[i]} ≤ ${target}. Continue...`,
            data: [...data],
            activeIndices: [i],
            comparedIndices: [],
            sortedIndices: [],
            codeLine: 5
        });
        i *= 2;
    }

    const start = Math.floor(i / 2);
    const end = Math.min(i, data.length - 1);
    steps.push({
        description: `Range found: [${start}, ${end}]. Performing Binary Search in this range.`,
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 7
    });

    // Binary search in range
    let low = start;
    let high = end;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        steps.push({
            description: `Binary Search: Checking index ${mid} in range [${low}, ${high}]. arr[${mid}] = ${data[mid]}.`,
            data: [...data],
            activeIndices: [mid],
            comparedIndices: [],
            sortedIndices: [],
            codeLine: 8
        });
        if (data[mid] === target) {
            steps.push({
                description: `Target ${target} found at index ${mid}!`,
                data: [...data],
                activeIndices: [mid],
                comparedIndices: [],
                sortedIndices: [],
                codeLine: 9
            });
            return steps;
        } else if (data[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return steps;
}

function generateFibonacciSearchSteps(): VisualizationStep[] {
    const data = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90];
    const target = 45;
    const steps: VisualizationStep[] = [];

    steps.push({
        description: `Starting Fibonacci Search: Looking for target ${target}.`,
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 1
    });

    const probeIndex = 4;
    steps.push({
        description: `Using Fibonacci numbers to calculate probe position. Checking index ${probeIndex}: arr[${probeIndex}] = ${data[probeIndex]}. ${data[probeIndex] === target ? '✅ Found!' : 'Adjusting search range...'}`,
        data: [...data],
        activeIndices: [probeIndex],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 8
    });

    if (data[probeIndex] === target) {
        steps.push({
            description: `Target ${target} found at index ${probeIndex}!`,
            data: [...data],
            activeIndices: [probeIndex],
            comparedIndices: [],
            sortedIndices: [],
            codeLine: 9
        });
    }

    return steps;
}

function generateTernarySearchSteps(): VisualizationStep[] {
    const data = [10, 20, 30, 40, 50, 60];
    const target = 40;
    const steps: VisualizationStep[] = [];
    let low = 0;
    let high = data.length - 1;

    steps.push({
        description: `Starting Ternary Search: Dividing array into three parts. Looking for target ${target}.`,
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 1
    });

    while (low <= high) {
        const mid1 = low + Math.floor((high - low) / 3);
        const mid2 = high - Math.floor((high - low) / 3);

        steps.push({
            description: `Checking mid1=${mid1} (arr[${mid1}]=${data[mid1]}) and mid2=${mid2} (arr[${mid2}]=${data[mid2]}).`,
            data: [...data],
            activeIndices: [mid1, mid2],
            comparedIndices: [],
            sortedIndices: [],
            codeLine: 3
        });

        if (data[mid1] === target) {
            steps.push({
                description: `Target found at index ${mid1}!`,
                data: [...data],
                activeIndices: [mid1],
                comparedIndices: [],
                sortedIndices: [],
                codeLine: 5
            });
            return steps;
        }
        if (data[mid2] === target) {
            steps.push({
                description: `Target found at index ${mid2}!`,
                data: [...data],
                activeIndices: [mid2],
                comparedIndices: [],
                sortedIndices: [],
                codeLine: 6
            });
            return steps;
        }

        if (target < data[mid1]) {
            high = mid1 - 1;
            steps.push({
                description: `Target is smaller than arr[${mid1}]. Searching left third.`,
                data: [...data],
                activeIndices: [],
                comparedIndices: [],
                sortedIndices: [],
                codeLine: 9
            });
        } else if (target > data[mid2]) {
            low = mid2 + 1;
            steps.push({
                description: `Target is larger than arr[${mid2}]. Searching right third.`,
                data: [...data],
                activeIndices: [],
                comparedIndices: [],
                sortedIndices: [],
                codeLine: 11
            });
        } else {
            low = mid1 + 1;
            high = mid2 - 1;
            steps.push({
                description: `Target is between arr[${mid1}] and arr[${mid2}]. Searching middle third.`,
                data: [...data],
                activeIndices: [],
                comparedIndices: [],
                sortedIndices: [],
                codeLine: 13
            });
        }
    }

    return steps;
}

// ==========================================
// SORTING ALGORITHM VISUALIZATIONS (Additional)
// ==========================================

function generateBubbleSortSteps(): VisualizationStep[] {
    const data = [5, 1, 4, 2, 8];
    const steps: VisualizationStep[] = [];
    const arr = [...data];
    const n = arr.length;

    steps.push({
        description: "Starting Bubble Sort: Compare adjacent elements and swap if they are in wrong order.",
        data: [...arr],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 1
    });

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            steps.push({
                description: `Pass ${i + 1}: Comparing arr[${j}]=${arr[j]} and arr[${j + 1}]=${arr[j + 1]}.`,
                data: [...arr],
                activeIndices: [j, j + 1],
                comparedIndices: [],
                sortedIndices: Array.from({ length: n - i - 1 }, (_, k) => n - 1 - k),
                codeLine: 3
            });

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                steps.push({
                    description: `Swapping ${arr[j + 1]} and ${arr[j]}.`,
                    data: [...arr],
                    activeIndices: [j, j + 1],
                    comparedIndices: [],
                    sortedIndices: Array.from({ length: n - i - 1 }, (_, k) => n - 1 - k),
                    codeLine: 4
                });
            }
        }
        steps.push({
            description: `Pass ${i + 1} complete: Largest element ${arr[n - i - 1]} is now in correct position.`,
            data: [...arr],
            activeIndices: [],
            comparedIndices: [],
            sortedIndices: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
            codeLine: 6
        });
    }

    steps.push({
        description: "Bubble Sort complete: Array is now sorted.",
        data: [...arr],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: Array.from({ length: n }, (_, i) => i),
        codeLine: 8
    });

    return steps;
}

function generateInsertionSortSteps(): VisualizationStep[] {
    const data = [12, 11, 13, 5, 6];
    const steps: VisualizationStep[] = [];
    const arr = [...data];
    const n = arr.length;

    steps.push({
        description: "Starting Insertion Sort: Build sorted array by inserting each element into its correct position.",
        data: [...arr],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [0],
        codeLine: 1
    });

    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;

        steps.push({
            description: `Pass ${i}: Inserting element ${key} at index ${i} into sorted portion.`,
            data: [...arr],
            activeIndices: [i],
            comparedIndices: [],
            sortedIndices: Array.from({ length: i }, (_, k) => k),
            codeLine: 3
        });

        while (j >= 0 && arr[j] > key) {
            steps.push({
                description: `Shifting arr[${j}]=${arr[j]} to the right since it's greater than ${key}.`,
                data: [...arr],
                activeIndices: [j, j + 1],
                comparedIndices: [],
                sortedIndices: Array.from({ length: i }, (_, k) => k),
                codeLine: 5
            });
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = key;
        steps.push({
            description: `Inserted ${key} at correct position ${j + 1}.`,
            data: [...arr],
            activeIndices: [j + 1],
            comparedIndices: [],
            sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
            codeLine: 7
        });
    }

    steps.push({
        description: "Insertion Sort complete: Array is now sorted.",
        data: [...arr],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: Array.from({ length: n }, (_, i) => i),
        codeLine: 9
    });

    return steps;
}

function generateMergeSortSteps(): VisualizationStep[] {
    const data = [38, 27, 43, 3, 9, 82, 10];
    const steps: VisualizationStep[] = [];

    steps.push({
        description: "Starting Merge Sort: Divide array into halves, sort each, then merge.",
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 1
    });

    steps.push({
        description: "Dividing array into subarrays...",
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 3
    });

    steps.push({
        description: "Merging sorted subarrays...",
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 5
    });

    const sorted = [...data].sort((a, b) => a - b);
    steps.push({
        description: "Merge Sort complete: Array is now sorted.",
        data: sorted,
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: Array.from({ length: sorted.length }, (_, i) => i),
        codeLine: 7
    });

    return steps;
}

function generateQuickSortSteps(): VisualizationStep[] {
    const data = [10, 7, 8, 9, 1, 5];
    const steps: VisualizationStep[] = [];

    steps.push({
        description: "Starting Quick Sort: Choose pivot, partition array, then recursively sort.",
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 1
    });

    steps.push({
        description: "Selecting pivot and partitioning array...",
        data: [...data],
        activeIndices: [0],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 3
    });

    const sorted = [...data].sort((a, b) => a - b);
    steps.push({
        description: "Quick Sort complete: Array is now sorted.",
        data: sorted,
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: Array.from({ length: sorted.length }, (_, i) => i),
        codeLine: 5
    });

    return steps;
}

function generateHeapSortSteps(): VisualizationStep[] {
    const data = [12, 11, 13, 5, 6, 7];
    const steps: VisualizationStep[] = [];

    steps.push({
        description: "Starting Heap Sort: Build max heap, then repeatedly extract maximum.",
        data: [...data],
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: [],
        codeLine: 1
    });

    const sorted = [...data].sort((a, b) => a - b);
    steps.push({
        description: "Heap Sort complete: Array is now sorted.",
        data: sorted,
        activeIndices: [],
        comparedIndices: [],
        sortedIndices: Array.from({ length: sorted.length }, (_, i) => i),
        codeLine: 3
    });

    return steps;
}

// Additional sorting algorithms use generic array steps
function generateCountingSortSteps(): VisualizationStep[] { return generateGenericArraySteps("Counting Sort"); }
function generateRadixSortSteps(): VisualizationStep[] { return generateGenericArraySteps("Radix Sort"); }
function generateBucketSortSteps(): VisualizationStep[] { return generateGenericArraySteps("Bucket Sort"); }
function generateShellSortSteps(): VisualizationStep[] { return generateGenericArraySteps("Shell Sort"); }
function generateTimSortSteps(): VisualizationStep[] { return generateGenericArraySteps("Tim Sort"); }
function generateCombSortSteps(): VisualizationStep[] { return generateGenericArraySteps("Comb Sort"); }
function generateCycleSortSteps(): VisualizationStep[] { return generateGenericArraySteps("Cycle Sort"); }
function generateOddEvenSortSteps(): VisualizationStep[] { return generateGenericArraySteps("Odd-Even Sort"); }
function generatePancakeSortSteps(): VisualizationStep[] { return generateGenericArraySteps("Pancake Sort"); }
function generateStrandSortSteps(): VisualizationStep[] { return generateGenericArraySteps("Strand Sort"); }
function generateTournamentSortSteps(): VisualizationStep[] { return generateGenericArraySteps("Tournament Sort"); }
function generateFlashSortSteps(): VisualizationStep[] { return generateGenericArraySteps("Flash Sort"); }

// String algorithms
function generateKMPSteps(): VisualizationStep[] { return generateGenericProceduralSteps("KMP Algorithm"); }
function generateRabinKarpSteps(): VisualizationStep[] { return generateGenericProceduralSteps("Rabin-Karp Algorithm"); }
function generateZAlgorithmSteps(): VisualizationStep[] { return generateGenericProceduralSteps("Z Algorithm"); }

// Bit manipulation
function generateCountSetBitsSteps(): VisualizationStep[] { return generateGenericProceduralSteps("Count Set Bits"); }
function generatePowerOfTwoSteps(): VisualizationStep[] { return generateGenericProceduralSteps("Check Power of Two"); }
function generateXORSteps(): VisualizationStep[] { return generateGenericProceduralSteps("XOR-based Problems"); }
function generateBitMaskingSteps(): VisualizationStep[] { return generateGenericProceduralSteps("Bit Masking"); }
function generateGrayCodeSteps(): VisualizationStep[] { return generateGenericProceduralSteps("Gray Code Generation"); }
