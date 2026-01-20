export interface TestCase {
    id: string;
    input: any;
    expectedOutput: any;
    description: string;
}

export interface AlgorithmTestCases {
    [slug: string]: TestCase[];
}

export const TEST_CASES: AlgorithmTestCases = {
    "binary-search": [
        {
            id: "bs-1",
            input: { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9], target: 5 },
            expectedOutput: 4,
            description: "Find element in middle of array"
        },
        {
            id: "bs-2",
            input: { arr: [1, 2, 3, 4, 5], target: 1 },
            expectedOutput: 0,
            description: "Find first element"
        },
        {
            id: "bs-3",
            input: { arr: [1, 2, 3, 4, 5], target: 5 },
            expectedOutput: 4,
            description: "Find last element"
        },
        {
            id: "bs-4",
            input: { arr: [1, 2, 3, 4, 5], target: 6 },
            expectedOutput: -1,
            description: "Element not found"
        },
        {
            id: "bs-5",
            input: { arr: [10], target: 10 },
            expectedOutput: 0,
            description: "Single element array"
        }
    ],
    "bubble-sort": [
        {
            id: "bubble-1",
            input: { arr: [64, 34, 25, 12, 22, 11, 90] },
            expectedOutput: [11, 12, 22, 25, 34, 64, 90],
            description: "Sort random array"
        },
        {
            id: "bubble-2",
            input: { arr: [5, 4, 3, 2, 1] },
            expectedOutput: [1, 2, 3, 4, 5],
            description: "Sort reverse sorted array"
        },
        {
            id: "bubble-3",
            input: { arr: [1, 2, 3, 4, 5] },
            expectedOutput: [1, 2, 3, 4, 5],
            description: "Already sorted array"
        },
        {
            id: "bubble-4",
            input: { arr: [1] },
            expectedOutput: [1],
            description: "Single element"
        },
        {
            id: "bubble-5",
            input: { arr: [3, 3, 3, 3] },
            expectedOutput: [3, 3, 3, 3],
            description: "All same elements"
        }
    ],
    "quick-sort": [
        {
            id: "quick-1",
            input: { arr: [64, 34, 25, 12, 22, 11, 90] },
            expectedOutput: [11, 12, 22, 25, 34, 64, 90],
            description: "Sort random array"
        },
        {
            id: "quick-2",
            input: { arr: [10, 7, 8, 9, 1, 5] },
            expectedOutput: [1, 5, 7, 8, 9, 10],
            description: "Sort mixed array"
        },
        {
            id: "quick-3",
            input: { arr: [1, 2, 3, 4, 5] },
            expectedOutput: [1, 2, 3, 4, 5],
            description: "Already sorted"
        },
        {
            id: "quick-4",
            input: { arr: [] },
            expectedOutput: [],
            description: "Empty array"
        }
    ],
    "dijkstras-algorithm": [
        {
            id: "dijkstra-1",
            input: {
                graph: {
                    A: { B: 4, C: 2 },
                    B: { D: 5 },
                    C: { B: 1, D: 8 },
                    D: {}
                },
                start: "A"
            },
            expectedOutput: { A: 0, B: 3, C: 2, D: 8 },
            description: "Simple weighted graph"
        }
    ]
};

export function getTestCases(slug: string): TestCase[] {
    return TEST_CASES[slug] || [];
}
