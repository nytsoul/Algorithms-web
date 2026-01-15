import { faker } from '@faker-js/faker';
import { ALGORITHMS_BY_DOMAIN, DOMAINS } from './algorithms-data';

// Set a seed for consistent results
faker.seed(42);

// Helper to determine visualization type based on algorithm name and domain
function getVisualizationType(name: string, domain: string): "array" | "tree" | "graph" | "matrix" | "network" | "none" {
    const lowerName = name.toLowerCase();

    // Graph algorithms
    if (lowerName.includes("graph") || lowerName.includes("path") || lowerName.includes("traversal") ||
        lowerName.includes("bfs") || lowerName.includes("dfs") || lowerName.includes("shortest") ||
        lowerName.includes("spanning") || lowerName.includes("matching") || lowerName.includes("flow") ||
        lowerName.includes("routing") || lowerName.includes("network")) {
        return "graph";
    }

    // Tree algorithms
    if (lowerName.includes("tree") || lowerName.includes("binary") || lowerName.includes("bst") ||
        lowerName.includes("avl") || lowerName.includes("heap") || lowerName.includes("trie") ||
        lowerName.includes("segment")) {
        return "tree";
    }

    // Matrix algorithms
    if (lowerName.includes("matrix") || lowerName.includes("multiplication")) {
        return "matrix";
    }

    // Network-specific
    if (domain === "Networks" || domain === "Security" || lowerName.includes("protocol") ||
        lowerName.includes("consensus") || lowerName.includes("routing")) {
        return "network";
    }

    // Array algorithms (sorting, searching)
    if (lowerName.includes("sort") || lowerName.includes("search") || lowerName.includes("array")) {
        return "array";
    }

    return "none";
}

// Helper to determine category based on algorithm name and domain
function determineCategory(name: string, domain: string): string {
    const lowerName = name.toLowerCase();

    if (domain === "DSA") {
        if (lowerName.includes("search")) return "Searching";
        if (lowerName.includes("sort")) return "Sorting";
        if (lowerName.includes("tree") || lowerName.includes("heap")) return "Trees";
        if (lowerName.includes("graph")) return "Graphs";
        if (lowerName.includes("string")) return "Strings";
        if (lowerName.includes("hash")) return "Hashing";
        return "Data Structures";
    }

    if (domain === "DAA") {
        if (lowerName.includes("divide") || lowerName.includes("conquer")) return "Divide & Conquer";
        if (lowerName.includes("greedy") || lowerName.includes("knapsack")) return "Greedy";
        if (lowerName.includes("dp") || lowerName.includes("dynamic")) return "Dynamic Programming";
        if (lowerName.includes("backtrack") || lowerName.includes("queen")) return "Backtracking";
        if (lowerName.includes("branch") || lowerName.includes("bound")) return "Branch & Bound";
        if (lowerName.includes("approximation")) return "Approximation";
        return "Algorithm Design";
    }

    if (domain === "AI") {
        if (lowerName.includes("search")) return "Search";
        if (lowerName.includes("game") || lowerName.includes("minimax")) return "Game Playing";
        if (lowerName.includes("planning")) return "Planning";
        if (lowerName.includes("constraint")) return "Constraint Satisfaction";
        if (lowerName.includes("learning") || lowerName.includes("q-learning")) return "Reinforcement Learning";
        return "AI Algorithms";
    }

    if (domain === "ML") {
        if (lowerName.includes("regression")) return "Regression";
        if (lowerName.includes("classification")) return "Classification";
        if (lowerName.includes("clustering")) return "Clustering";
        if (lowerName.includes("neural") || lowerName.includes("network") || lowerName.includes("transformer")) return "Deep Learning";
        return "Machine Learning";
    }

    if (domain === "Networks") return "Networking";
    if (domain === "Security") return "Security";
    if (domain === "Systems") return "OS & Systems";
    if (domain === "Graphics") return "Graphics & Vision";
    if (domain === "Optimization") return "Optimization";
    if (domain === "Emerging") return "Emerging Tech";
    if (domain === "Theory") return "Theory";

    return "General";
}

// Helper to determine difficulty
function getDifficulty(index: number, domain: string): "Beginner" | "Intermediate" | "Advanced" | "Expert" {
    if (index <= 100) return "Beginner";
    if (index <= 300) return "Intermediate";
    if (index <= 700) return "Advanced";
    return "Expert";
}

// Popular algorithms that should be marked as featured
const POPULAR_ALGORITHMS = [
    "Binary Search", "Quick Sort", "Merge Sort", "Dijkstra", "A*", "BFS", "DFS",
    "Kruskal", "Prim", "KMP", "Rabin-Karp", "Floyd-Warshall", "Bellman-Ford",
    "RSA", "AES", "SHA", "Linear Regression", "K-Means", "Neural Network",
    "Binary Tree Traversal", "Heap Sort", "Hash Table", "Trie", "Segment Tree"
];

// Enhanced complexity determination
function getComplexity(name: string, category: string): { time: { average: string; best?: string; worst?: string }; space: string } {
    const lowerName = name.toLowerCase();
    const lowerCategory = category.toLowerCase();

    // Searching algorithms
    if (lowerCategory.includes("searching")) {
        if (lowerName.includes("binary")) {
            return { time: { average: "O(log n)", best: "O(1)", worst: "O(log n)" }, space: "O(1)" };
        }
        return { time: { average: "O(n)", best: "O(1)", worst: "O(n)" }, space: "O(1)" };
    }

    // Sorting algorithms
    if (lowerCategory.includes("sorting")) {
        if (lowerName.includes("merge") || lowerName.includes("heap") || lowerName.includes("quick")) {
            return { time: { average: "O(n log n)", best: "O(n log n)", worst: "O(n log n)" }, space: "O(n)" };
        }
        if (lowerName.includes("counting") || lowerName.includes("radix")) {
            return { time: { average: "O(n + k)", best: "O(n + k)", worst: "O(n + k)" }, space: "O(n + k)" };
        }
        return { time: { average: "O(n²)", best: "O(n)", worst: "O(n²)" }, space: "O(1)" };
    }

    // Dynamic Programming
    if (lowerCategory.includes("dynamic programming")) {
        return { time: { average: "O(n²)", best: "O(n)", worst: "O(n³)" }, space: "O(n²)" };
    }

    // Graph algorithms
    if (lowerCategory.includes("graph") || lowerName.includes("shortest")) {
        return { time: { average: "O(V + E)", best: "O(V + E)", worst: "O(V + E)" }, space: "O(V)" };
    }

    // Default
    return { time: { average: "O(n log n)", best: "O(n)", worst: "O(n²)" }, space: "O(n)" };
}

// Helper to generate flashcards for an algorithm
function generateFlashcards(name: string, category: string) {
    return [
        {
            question: `What is the primary use case for ${name}?`,
            answer: `It is commonly used for solving problems related to ${category.toLowerCase()} in competitive programming and real-world software engineering.`
        },
        {
            question: `What is typical time complexity of ${name}?`,
            answer: `It varies depending on the implementation and input distribution, but often follows a standard pattern for ${category} algorithms.`
        },
        {
            question: `Is ${name} considered a stable algorithm?`,
            answer: `This depends on the specific implementation details, but stability is a key property to consider when choosing between different ${category.toLowerCase()} techniques.`
        },
        {
            question: `What is the core intuition behind ${name}?`,
            answer: `The algorithm leverages specific properties of ${category} to efficiently process data or find optimal solutions.`
        },
        {
            question: `Name a common optimization for ${name}.`,
            answer: `Many ${category} algorithms can be optimized using techniques like memory management, early exit conditions, or domain-specific heuristics.`
        }
    ];
}

// Helper to generate practice problems based on algorithm tags
function generatePracticeProblems(name: string, category: string, tags: string[]) {
    const problems = [];
    const difficulties = ["800", "1200", "1500", "1800", "2100"];
    const platforms = ["Codeforces", "LeetCode", "AtCoder"];

    for (let i = 0; i < 5; i++) {
        const difficulty = difficulties[i];
        const platform = platforms[i % platforms.length];
        const problemId = Math.floor(Math.random() * 2000) + 100;
        const problemChar = String.fromCharCode(65 + (i % 5));

        problems.push({
            id: `${problemId}${problemChar}`,
            title: `${name} Application Problem ${i + 1}`,
            difficulty: difficulty,
            platform: platform,
            url: platform === "Codeforces"
                ? `https://codeforces.com/problemset/problem/${problemId}/${problemChar}`
                : platform === "LeetCode"
                    ? `https://leetcode.com/problems/problem-${problemId}/`
                    : `https://atcoder.jp/contests/abc${problemId}/tasks/abc${problemId}_${problemChar.toLowerCase()}`,
            tags: [...tags.slice(0, 2), "implementation", platform.toLowerCase()],
            description: `Given an input related to ${name.toLowerCase()}, calculate the optimal result following the ${category.toLowerCase()} constraints. You must ensure the solution handles large constraints within the time limit.`,
            inputFormat: `The first line contains an integer T, the number of test cases. Each test case consists of...`,
            outputFormat: `For each test case, output the result on a new line.`,
            testCases: [
                { input: "3\n5\n1 2 3 4 5", output: "Accepted" },
                { input: "10\n100 200", output: "Accepted" },
                { input: "sample_input_3", output: "Accepted" }
            ]
        });
    }
    return problems;
}

// Manual data overrides for specific algorithms to provide premium detail
const MANUAL_ALGORITHM_DATA: Record<string, Partial<any>> = {
    // ================= Searching Algorithms =================
    "binary-search": {
        problemStatement: "Efficiently find a target element in a sorted array by repeatedly dividing the search space into half.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20220309171621/BinarySearch.png",
        intuition: "Binary Search works by comparing the target value with the middle element of a sorted array. If the target is smaller, we search the left half; if larger, the right half. This reduces the search space by 50% at each step.",
        precondition: "The input array must be sorted in ascending order.",
        keyPoints: [
            "Works on the principle of Divide and Conquer",
            "Extremely efficient for large datasets",
            "Requires random access to elements",
            "Better than linear search (O(n)) for large n"
        ],
        stepByStepWorking: [
            "Set low index to 0 and high index to n-1.",
            "While low is less than or equal to high, find the middle index: (low + high) / 2.",
            "If the element at mid index equals the target, search is complete.",
            "If the target is less than the element at mid, set high to mid-1.",
            "If the target is greater than the element at mid, set low to mid+1.",
            "If the loop ends without finding the target, the element is not in the array."
        ],
        dryRun: `Input: [1, 3, 5, 7, 9], Target: 7
1. low=0, high=4, mid=2 (arr[2]=5). 7 > 5, so low=3.
2. low=3, high=4, mid=3 (arr[3]=7). 7 == 7. Found at index 3.`,
        pseudocode: `function BinarySearch(arr, target):
    low ← 0, high ← length(arr) - 1
    while low ≤ high:
        mid ← (low + high) / 2
        if arr[mid] == target: return mid
        else if arr[mid] < target: low ← mid + 1
        else: high ← mid - 1
    return -1`,
        implementation: `export function binarySearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
        timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
        spaceComplexity: "O(1)",
        applications: ["Dictionary word search", "Database indexing", "Autocomplete systems"],
        advantages: ["Logarithmic time complexity", "Efficient memory usage"],
        disadvantages: ["Requires sorted data"]
    },
    "linear-search": {
        problemStatement: "Find a given element in a list by checking each element one by one.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20240902185521/Linear-search-algorithm-1.webp",
        intuition: "Scans the array from the first element to the last, comparing each element with the target value.",
        pseudocode: `function LinearSearch(arr, n, target):
    for i ← 0 to n-1:
        if arr[i] == target: return i
    return -1`,
        implementation: `export function linearSearch(arr: number[], target: number): number {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}`,
        timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
        spaceComplexity: "O(1)",
        applications: ["Small lists", "Unsorted data"],
        advantages: ["Simple", "Works on unsorted data"],
        disadvantages: ["Slow for large datasets"]
    },
    "jump-search": {
        problemStatement: "Search in a sorted array by jumping fixed steps.",
        exampleDiagram: "https://www.tutorialspoint.com/data_structures_algorithms/images/Jump_Search.jpg",
        intuition: "Divides array into blocks of size √n and jumps ahead. Performs linear search in the identified block.",
        pseudocode: `function JumpSearch(arr, n, target):
    step ← √n, prev ← 0
    while arr[min(step, n) - 1] < target:
        prev ← step, step ← step + √n
        if prev ≥ n: return -1
    for i ← prev to min(step, n) - 1:
        if arr[i] == target: return i
    return -1`,
        implementation: `export function jumpSearch(arr: number[], target: number): number {
    const n = arr.length;
    let step = Math.floor(Math.sqrt(n));
    let prev = 0;
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }
    for (let i = prev; i < Math.min(step, n); i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}`,
        timeComplexity: { best: "O(1)", average: "O(√n)", worst: "O(√n)" },
        spaceComplexity: "O(1)"
    },
    "interpolation-search": {
        problemStatement: "Search in a sorted, uniform array by estimating position.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20200421003420/final306.png",
        intuition: "Calculates probe position based on value distribution, like finding a word in a dictionary.",
        pseudocode: `pos ← low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])`,
        implementation: `export function interpolationSearch(arr: number[], target: number): number {
    let low = 0, high = arr.length - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low === high) return arr[low] === target ? low : -1;
        const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
        if (arr[pos] === target) return pos;
        if (arr[pos] < target) low = pos + 1;
        else high = pos - 1;
    }
    return -1;
}`,
        timeComplexity: { best: "O(1)", average: "O(log log n)", worst: "O(n)" },
        spaceComplexity: "O(1)"
    },
    "exponential-search": {
        problemStatement: "Find a range where the element may be present and then perform a binary search within that range.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20200421003420/final306.png",
        intuition: "Exponential search is particularly useful for unbounded arrays or when the target element is near the beginning of the array. It jumps in powers of 2 (1, 2, 4, 8...) until the range is found.",
        keyPoints: [
            "Good for infinite or very large arrays",
            "Better than binary search when element is near the start",
            "Combines jump searching logic with binary search efficiency"
        ],
        stepByStepWorking: [
            "Check if the element at index 0 is the target.",
            "Find a range: Start with index 1 and keep doubling it while the element at the index is less than the target.",
            "Once a range is found (between current and previous index), perform a binary search within that range."
        ],
        dryRun: `Input: [10, 20, 40, 45, 55], Target: 45
1. arr[0] != 45. i=1 (arr[1]=20). 20 < 45.
2. i=2 (arr[2]=40). 40 < 45.
3. i=4 (arr[4]=55). 55 > 45. Range is [2, 4].
4. BinarySearch in [2, 4]: Found at index 3.`,
        pseudocode: `if arr[0] == target: return 0
    i ← 1
    while i < n AND arr[i] ≤ target: i ← i * 2
    return BinarySearch(arr, i/2, min(i, n-1), target)`,
        implementation: `export function exponentialSearch(arr: number[], target: number): number {
    if (arr[0] === target) return 0;
    let i = 1;
    while (i < arr.length && arr[i] <= target) i = i * 2;
    
    // Binary Search helper
    const binarySearch = (a: number[], low: number, high: number, x: number) => {
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (a[mid] === x) return mid;
            if (a[mid] < x) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    };

    return binarySearch(arr, i / 2, Math.min(i, arr.length - 1), target);
}`,
        timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
        spaceComplexity: "O(1)"
    },
    "ternary-search": {
        problemStatement: "Search by dividing array into three parts.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20210212165818/ts1-660x593.PNG",
        intuition: "Uses two mid points to divide array into three. Recursively searches the relevant segment.",
        pseudocode: `if r >= l:
        mid1 = l + (r - l) / 3
        mid2 = r - (r - l) / 3
        if arr[mid1] == x: return mid1
        if arr[mid2] == x: return mid2
        if x < arr[mid1]: recurse left
        elif x > arr[mid2]: recurse right
        else: recurse middle`,
        implementation: `export function ternarySearch(arr: number[], l: number, r: number, x: number): number {
    if (r >= l) {
        const mid1 = l + Math.floor((r - l) / 3);
        const mid2 = r - Math.floor((r - l) / 3);
        if (arr[mid1] === x) return mid1;
        if (arr[mid2] === x) return mid2;
        if (x < arr[mid1]) return ternarySearch(arr, l, mid1 - 1, x);
        else if (x > arr[mid2]) return ternarySearch(arr, mid2 + 1, r, x);
        else return ternarySearch(arr, mid1 + 1, mid2 - 1, x);
    }
    return -1;
}`,
        timeComplexity: { best: "O(1)", average: "O(log3 n)", worst: "O(log3 n)" },
        spaceComplexity: "O(log n)"
    },

    // ================= Sorting Algorithms =================
    "bubble-sort": {
        problemStatement: "Repeatedly swap adjacent elements if they are in wrong order.",
        exampleDiagram: "https://swtestacademy.com/wp-content/uploads/2021/11/bubble-sort-2.png",
        intuition: "Elements 'bubble' to their correct position.",
        pseudocode: `for i from 0 to n-1:
    for j from 0 to n-i-1:
        if arr[j] > arr[j+1]: swap(arr[j], arr[j+1])`,
        implementation: `export function bubbleSort(arr: number[]): number[] {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
        timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)"
    },
    "selection-sort": {
        problemStatement: "Repeatedly find the minimum element from unsorted part and put it at beginning.",
        exampleDiagram: "https://upload.wikimedia.org/wikipedia/commons/9/94/Selection-Sort-Animation.gif",
        intuition: "Maintains sorted and unsorted subarrays. Repeatedly finds min in unsorted and swaps to end of sorted.",
        keyPoints: [
            "In-place sorting algorithm",
            "Performs O(n) swaps, which is better than most algorithms",
            "Not stable by default",
            "Good for small datasets or memory-constrained systems"
        ],
        stepByStepWorking: [
            "Start from the first element and assume it as minimum.",
            "Scan the rest of the array to find the actual minimum element.",
            "Swap the actual minimum with the element at the current starting position.",
            "Move to the next element and repeat until the entire array is sorted."
        ],
        dryRun: `Input: [64, 25, 12, 22, 11]
1. Min is 11. Swap with 64: [11, 25, 12, 22, 64]
2. Min in rest is 12. Swap with 25: [11, 12, 25, 22, 64]
3. Min in rest is 22. Swap with 25: [11, 12, 22, 25, 64]
4. Sorted: [11, 12, 22, 25, 64]`,
        pseudocode: `for i from 0 to n-1:
    min_idx = i
    for j from i+1 to n:
        if arr[j] < arr[min_idx]: min_idx = j
    swap(arr[min_idx], arr[i])`,
        implementation: `export function selectionSort(arr: number[]): number[] {
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
}`,
        timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)"
    },
    "insertion-sort": {
        problemStatement: "Build sorted array one item at a time.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20240802210251/Insertion-sorting.png",
        intuition: "Take element from unsorted, insert into correct position in sorted.",
        pseudocode: `for i from 1 to n:
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
        arr[j+1] = arr[j]
        j = j - 1
    arr[j+1] = key`,
        implementation: `export function insertionSort(arr: number[]): number[] {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}`,
        timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)"
    },
    "merge-sort": {
        problemStatement: "Sort an array by recursively dividing it into halves, sorting them, and merging them back together.",
        exampleDiagram: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Merge_sort_algorithm_diagram.svg",
        intuition: "A classic Divide and Conquer algorithm. It's much faster than Bubble or Selection sort for large arrays because it avoids unnecessary comparisons by working with smaller sorted lists.",
        keyPoints: [
            "Stable sorting algorithm",
            "Consistent O(n log n) performance",
            "Requires O(n) extra space",
            "Preferred for sorting linked lists"
        ],
        stepByStepWorking: [
            "If the array has only one element, it is already sorted.",
            "Divide the array into two halves.",
            "Recursively sort both halves using Merge Sort.",
            "Merge the two sorted halves into a single sorted array."
        ],
        dryRun: `Input: [38, 27, 43, 3]
1. Split: [38, 27] and [43, 3]
2. Split: [38], [27] and [43], [3]
3. Merge: [27, 38] and [3, 43]
4. Merge: [3, 27, 38, 43]`,
        pseudocode: `function MergeSort(arr):
    if length(arr) ≤ 1: return arr
    mid = length(arr) / 2
    left = MergeSort(arr[0...mid])
    right = MergeSort(arr[mid...end])
    return Merge(left, right)`,
        implementation: `export function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}
function merge(left: number[], right: number[]): number[] {
    let result = [], l = 0, r = 0;
    while (l < left.length && r < right.length) {
        if (left[l] < right[r]) result.push(left[l++]);
        else result.push(right[r++]);
    }
    return result.concat(left.slice(l)).concat(right.slice(r));
}`,
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(n)"
    },
    "quick-sort": {
        problemStatement: "Sort an array by picking a 'pivot' and partitioning the other elements around it.",
        exampleDiagram: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif",
        intuition: "A highly efficient Divide and Conquer algorithm. It's often faster in practice than Merge Sort because it's usually performed in-place.",
        keyPoints: [
            "In-place sorting (O(log n) stack space)",
            "Not stable by default",
            "Performance depends heavily on pivot selection",
            "Used in many standard library sorting implementations"
        ],
        stepByStepWorking: [
            "Pick an element from the array as a 'pivot'.",
            "Partitioning: Reorder the array so all elements < pivot are left, and elements > pivot are right.",
            "Recursively apply the above steps to the sub-arrays of elements with smaller and larger values."
        ],
        dryRun: `Input: [10, 80, 30, 90, 40], Pivot: 40
1. Elements < 40: [10, 30]
2. Elements > 40: [80, 90]
3. Result: [10, 30, 40, 80, 90]`,
        pseudocode: `function QuickSort(arr, low, high):
    if low < high:
        pi = Partition(arr, low, high)
        QuickSort(arr, low, pi - 1)
        QuickSort(arr, pi + 1, high)`,
        implementation: `export function quickSort(arr: number[], left = 0, right = arr.length - 1): number[] {
    if (left < right) {
        const p = partition(arr, left, right);
        quickSort(arr, left, p - 1);
        quickSort(arr, p + 1, right);
    }
    return arr;
}
function partition(arr: number[], left: number, right: number): number {
    const pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
}`,
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
        spaceComplexity: "O(log n)"
    },

    // ================= String Algorithms =================
    "kmp-algorithm": {
        problemStatement: "Find all occurrences of a pattern in a text efficiently by avoiding redundant comparisons.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20221125130155/KMP-Algorithm-Diagram.png",
        intuition: "Uses a 'Partial Match Table' (LPS array) to determine how much of the pattern to skip after a mismatch.",
        keyPoints: [
            "Linear time pattern matching",
            "Preprocessing takes O(M) time",
            "Searching takes O(N) time",
            "Never goes back in the text string"
        ],
        stepByStepWorking: [
            "Precompute the LPS (Longest Proper Prefix which is also Suffix) array for the pattern.",
            "Compare pattern and text characters one by one.",
            "If they match, move both pointers forward.",
            "If a mismatch occurs at index j of pattern, use LPS[j-1] to decide the next j instead of restarting from 0.",
            "Repeat until the end of text is reached."
        ],
        dryRun: `Text: ABABDABACD, Pattern: ABAC
1. Match 'ABA' (len 3). Mismatch at 'D' and 'C'.
2. LPS['ABA'] is 1. Next start pattern index 1 ('B').
3. Continue...`,
        pseudocode: `function KMP(text, pattern):
    lps = computeLPS(pattern)
    i = 0, j = 0
    while i < N:
        if pattern[j] == text[i]: i++, j++
        if j == M: print match at i-j; j = lps[j-1]
        else if i < N and pattern[j] != text[i]:
            if j != 0: j = lps[j-1]
            else: i++`,
        implementation: `export function kmpSearch(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;
    const lps = computeLPS(pattern);
    const result: number[] = [];
    let i = 0, j = 0;
    while (i < n) {
        if (pattern[j] === text[i]) { i++; j++; }
        if (j === m) {
            result.push(i - j);
            j = lps[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) j = lps[j - 1];
            else i++;
        }
    }
    return result;
}
function computeLPS(pattern: string): number[] {
    const m = pattern.length;
    const lps = new Array(m).fill(0);
    let len = 0, i = 1;
    while (i < m) {
        if (pattern[i] === pattern[len]) {
            lps[i++] = ++len;
        } else {
            if (len !== 0) len = lps[len - 1];
            else lps[i++] = 0;
        }
    }
    return lps;
}`,
        timeComplexity: { best: "O(n)", average: "O(n+m)", worst: "O(n+m)" },
        spaceComplexity: "O(m)"
    },
    // ================= Advanced =================
    "avl-tree-rotation-algorithm": {
        problemStatement: "Balance BST using rotations.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20250703161306662411/Example-of-an-AVL-Tree-11.webp",
        intuition: "Maintain balance factor of every node between -1 and 1.",
        pseudocode: `RightRotate(y):
    x = y.left
    T2 = x.right
    x.right = y
    y.left = T2
    update heights
    return x`,
        implementation: `// See full implementation in component`,
        timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
        spaceComplexity: "O(n)"
    },
    "red-black-tree-insertion": {
        problemStatement: "Insert while maintaining RB properties.",
        exampleDiagram: "https://upload.wikimedia.org/wikipedia/commons/6/66/Red-black_tree_example.svg",
        intuition: "Color new node red, fix violations (recolor/rotate).",
        pseudocode: `Insert(node):
    BSTInsert(node)
    node.color = RED
    while node != root and node.parent.color == RED:
        if parent is left child:
            uncle = grandparent.right
            if uncle is RED: recolor
            else: rotation
        else: symmetric`,
        implementation: `// See full implementation in component`,
        timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
        spaceComplexity: "O(n)"
    }
    ,
    "heap-sort": {
        problemStatement: "Sort by converting array into a Binary Heap.",
        exampleDiagram: "https://miro.medium.com/v2/resize%3Afit%3A658/1%2A02r6G-ho8DPnfiaOIHA2OA.png",
        intuition: "Utilize the Heap data structure to efficiently extract the maximum (or minimum) element.",
        pseudocode: `HeapSort(arr):
    BuildMaxHeap(arr)
    for i = n-1 to 1:
        swap(arr[0], arr[i])
        Heapify(arr, 0, i)`,
        implementation: `export function heapSort(arr: number[]): number[] {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    return arr;
}
function heapify(arr: number[], n: number, i: number) {
    let largest = i;
    const l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}`,
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(1)"
    },
    "counting-sort": {
        problemStatement: "Sort integers by counting occurrences.",
        exampleDiagram: "https://www.alphacodingskills.com/algo/img/counting-sort-1.PNG",
        intuition: "Counts frequencies and uses prefix sums to place elements directly.",
        pseudocode: `CountingSort(arr, k):
    count = [0]*(k+1)
    for x in arr: count[x]++
    for i=1 to k: count[i] += count[i-1]
    for x in reverse(arr):
        output[count[x]-1] = x
        count[x]--`,
        implementation: `export function countingSort(arr: number[]): number[] {
    if (arr.length === 0) return arr;
    const max = Math.max(...arr); // Assuming non-negative for simplicity
    const count = new Array(max + 1).fill(0);
    const output = new Array(arr.length);
    for (let x of arr) count[x]++;
    for (let i = 1; i <= max; i++) count[i] += count[i - 1];
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    return output;
}`,
        timeComplexity: { best: "O(n+k)", average: "O(n+k)", worst: "O(n+k)" },
        spaceComplexity: "O(n+k)"
    },
    "radix-sort": {
        problemStatement: "Sort numbers digit by digit.",
        exampleDiagram: "https://ds055uzetaobb.cloudfront.net/brioche/uploads/IEZs8xJML3-radixsort_ed.png",
        intuition: "Apply stable sort (like Counting Sort) on each digit position from LSD to MSD.",
        pseudocode: `RadixSort(arr):
    max_val = max(arr)
    exp = 1
    while max_val/exp > 0:
        CountingSortByDigit(arr, exp)
        exp *= 10`,
        implementation: `export function radixSort(arr: number[]): number[] {
    const max = Math.max(...arr);
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    return arr;
}
function countingSortByDigit(arr: number[], exp: number) {
    const n = arr.length;
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);
    for (let i = 0; i < n; i++) count[Math.floor(arr[i] / exp) % 10]++;
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];
    for (let i = n - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % 10]--;
    }
    for (let i = 0; i < n; i++) arr[i] = output[i];
}`,
        timeComplexity: { best: "O(nk)", average: "O(nk)", worst: "O(nk)" },
        spaceComplexity: "O(n+k)"
    },
    "bucket-sort": {
        problemStatement: "Sort uniformly distributed numbers by bucketing.",
        exampleDiagram: "https://www.programiz.com/sites/tutorial2program/files/Bucket_2.png",
        intuition: "Distribute elements into buckets, sort buckets, concatenate.",
        pseudocode: `BucketSort(arr):
    buckets = create n buckets
    for x in arr: put x in bucket
    for bucket in buckets: sort(bucket)
    return concat(buckets)`,
        implementation: `export function bucketSort(arr: number[]): number[] {
    if (arr.length === 0) return arr;
    const n = arr.length;
    const buckets: number[][] = Array.from({ length: n }, () => []);
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min;
    for (let x of arr) {
        const idx = Math.floor(((x - min) / range) * (n - 1));
        buckets[idx].push(x);
    }
    const result: number[] = [];
    for (let bucket of buckets) {
        bucket.sort((a, b) => a - b);
        result.push(...bucket);
    }
    return result;
}`,
        timeComplexity: { best: "O(n+k)", average: "O(n)", worst: "O(n²)" },
        spaceComplexity: "O(n)"
    },
    "shell-sort": {
        problemStatement: "Generalization of insertion sort using gaps.",
        exampleDiagram: "https://stoimen.com/wp-content/uploads/2012/02/Shell-Sort.png",
        intuition: "Sort pairs of elements far apart, then reduce gap.",
        pseudocode: `ShellSort(arr):
    gap = n/2
    while gap > 0:
        for i = gap to n-1:
            temp = arr[i]
            j = i
            while j >= gap and arr[j-gap] > temp:
                arr[j] = arr[j-gap]
                j -= gap
            arr[j] = temp
        gap /= 2`,
        implementation: `export function shellSort(arr: number[]): number[] {
    const n = arr.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
    return arr;
}`,
        timeComplexity: { best: "O(n log n)", average: "O(n^1.5)", worst: "O(n²)" },
        spaceComplexity: "O(1)"
    },

    // ================= String Algorithms Continued =================
    "rabin-karp-algorithm": {
        problemStatement: "Find pattern in text using rolling hash.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20230906115250/rabin-karp-final.png",
        intuition: "Match hash of pattern with hash of text window. Check chars on hash match.",
        pseudocode: `RabinKarp(text, pat):
    hp = hash(pat), ht = hash(text[0..m])
    for i=0 to n-m:
        if hp == ht: check chars
        ht = updateHash(ht, text[i], text[i+m])`,
        implementation: `export function rabinKarp(text: string, pattern: string): number[] {
    const d = 256, q = 101;
    const n = text.length, m = pattern.length;
    let p = 0, t = 0, h = 1;
    const matches: number[] = [];
    for (let i = 0; i < m - 1; i++) h = (h * d) % q;
    for (let i = 0; i < m; i++) {
        p = (d * p + pattern.charCodeAt(i)) % q;
        t = (d * t + text.charCodeAt(i)) % q;
    }
    for (let i = 0; i <= n - m; i++) {
        if (p === t) {
            let match = true;
            for (let j = 0; j < m; j++) if (text[i+j] !== pattern[j]) { match = false; break; }
            if (match) matches.push(i);
        }
        if (i < n - m) {
            t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
            if (t < 0) t = (t + q);
        }
    }
    return matches;
}`,
        timeComplexity: { best: "O(n+m)", average: "O(n+m)", worst: "O(nm)" },
        spaceComplexity: "O(1)"
    },
    "z-algorithm": {
        problemStatement: "Find pattern occurrences using Z-array.",
        exampleDiagram: "https://scaler.com/topics/images/analysis-of-z-algorithm.webp",
        intuition: "Construct Z-array where Z[i] is length of longest substring starting at i which is also a prefix.",
        pseudocode: `ZAlgorithm(text, pat):
    S = pat + "$" + text
    compute Z-array for S
    if Z[i] == len(pat): match found`,
        implementation: `export function zAlgorithm(text: string, pattern: string): number[] {
    const S = pattern + "$" + text;
    const Z = new Array(S.length).fill(0);
    let L = 0, R = 0;
    for (let i = 1; i < S.length; i++) {
        if (i > R) {
            L = R = i;
            while (R < S.length && S[R] === S[R - L]) R++;
            Z[i] = R - L; R--;
        } else {
            const k = i - L;
            if (Z[k] < R - i + 1) Z[i] = Z[k];
            else {
                L = i;
                while (R < S.length && S[R] === S[R - L]) R++;
                Z[i] = R - L; R--;
            }
        }
    }
    const matches: number[] = [];
    for (let i = 0; i < S.length; i++) {
        if (Z[i] === pattern.length) matches.push(i - pattern.length - 1);
    }
    return matches;
}`,
        timeComplexity: { best: "O(n)", average: "O(n+m)", worst: "O(n+m)" },
        spaceComplexity: "O(n+m)"
    },

    // ================= Bit Manipulation =================
    "count-set-bits": {
        problemStatement: "Count number of 1s in binary representation.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/setbit.png",
        intuition: "Brian Kernighan’s Algorithm: n & (n-1) clears the least significant bit.",
        pseudocode: `count = 0
    while n > 0:
        n = n & (n - 1)
        count++`,
        implementation: `export function countSetBits(n: number): number {
    let count = 0;
    while (n > 0) {
        n = n & (n - 1);
        count++;
    }
    return count;
}`,
        timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
        spaceComplexity: "O(1)"
    },
    "check-power-of-two": {
        problemStatement: "Check if a number is a power of two.",
        exampleDiagram: "https://iq.opengenus.org/content/images/2018/06/binary.jpg",
        intuition: "Powers of two have exactly one set bit. n & (n-1) == 0.",
        pseudocode: `return n > 0 && (n & (n - 1)) == 0`,
        implementation: `export function isPowerOfTwo(n: number): boolean {
    return n > 0 && (n & (n - 1)) === 0;
}`,
        timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
        spaceComplexity: "O(1)"
    },
    "xor-based-problems": {
        problemStatement: "Solve problems using XOR properties (e.g., find unique element).",
        exampleDiagram: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/XOR_Swap.svg/500px-XOR_Swap.svg.png",
        intuition: "XOR of a number with itself is 0. XOR with 0 is itself.",
        pseudocode: `res = 0
    for x in arr: res ^= x
    return res`,
        implementation: `export function findUnique(arr: number[]): number {
    let res = 0;
    for (const x of arr) res ^= x;
    return res;
}`,
        timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
        spaceComplexity: "O(1)"
    },
    "bit-masking": {
        problemStatement: "Use bits to represent sets or states.",
        exampleDiagram: "https://www.tcpipguide.com/free/diagrams/bitmasking.png",
        intuition: "Bitwise operators allow efficient state manipulation.",
        pseudocode: `set = (mask | (1 << i))
    unset = (mask & ~(1 << i))
    check = (mask & (1 << i))`,
        implementation: `export function bitMaskOperations(mask: number, i: number) {
    return {
        set: mask | (1 << i),
        unset: mask & ~(1 << i),
        toggle: mask ^ (1 << i),
        check: (mask & (1 << i)) !== 0
    };
}`,
        timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
        spaceComplexity: "O(1)"
    },
    // ================= Divide & Conquer =================
    "strassens-matrix-multiplication": {
        problemStatement: "Multiply two matrices faster than the standard O(n³) approach.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20230530120155/strassen.png",
        intuition: "Divides matrices into sub-matrices and uses 7 multiplications instead of 8 to combine them.",
        pseudocode: `Divide A and B into n/2 x n/2 submatrices
Compute 7 products (P1 to P7) using additions/subtractions
Combine products to get quadrants of C`,
        implementation: `// Standard multiplication is O(n^3), Strassen's is O(n^2.81)`,
        timeComplexity: { best: "O(n^2.81)", average: "O(n^2.81)", worst: "O(n^2.81)" },
        spaceComplexity: "O(n^2)"
    },
    "closest-pair-of-points": {
        problemStatement: "Find the two closest points in a set of n points in direct space.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20231006131454/closest-pair-of-points.png",
        intuition: "Sort by X, divide into halves, find min distance in halves, then check the 'strip' near the dividing line.",
        pseudocode: `Sort points by X
Divide set into two halves
d = min(dist_left, dist_right)
Find points in strip of width 2d
Check points in strip for distance smaller than d`,
        implementation: `// Divide and Conquer approach in O(n log n)`,
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(n)"
    },
    "max-min-problem": {
        problemStatement: "Find both the maximum and minimum elements in an array with minimum comparisons.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20230524124638/Tournament-Method.png",
        intuition: "Divide array into two, find max/min in each half, then compare the two results.",
        pseudocode: `MaxMin(arr, low, high):
    if low == high: return (arr[low], arr[low])
    mid = (low + high) / 2
    (min1, max1) = MaxMin(arr, low, mid)
    (min2, max2) = MaxMin(arr, mid+1, high)
    return (min(min1, min2), max(max1, max2))`,
        implementation: `export function findMaxMin(arr: number[], low: number, high: number): { min: number, max: number } {
    if (low === high) return { min: arr[low], max: arr[low] };
    if (high === low + 1) {
        return arr[low] < arr[high] ? { min: arr[low], max: arr[high] } : { min: arr[high], max: arr[low] };
    }
    const mid = Math.floor((low + high) / 2);
    const left = findMaxMin(arr, low, mid);
    const right = findMaxMin(arr, mid + 1, high);
    return { min: Math.min(left.min, right.min), max: Math.max(left.max, right.max) };
}`,
        timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
        spaceComplexity: "O(log n)"
    },
    "karatsuba-algorithm": {
        problemStatement: "Multiply two large integers efficiently.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20220404172740/KaratsubaAlgorithm.png",
        intuition: "Reduces one multiplication of n-digit numbers to three multiplications of n/2-digit numbers.",
        pseudocode: `Split X and Y into two halves (X1, X0, Y1, Y0)
z0 = X0 * Y0
z1 = (X1 + X0) * (Y1 + Y0)
z2 = X1 * Y1
result = z2 * 10^n + (z1 - z2 - z0) * 10^(n/2) + z0`,
        implementation: `// Karatsuba multiplication in O(n^log2(3)) ≈ O(n^1.58)`,
        timeComplexity: { best: "O(n^1.58)", average: "O(n^1.58)", worst: "O(n^1.58)" },
        spaceComplexity: "O(n)"
    },
    // ================= Advanced Data Structures & Algorithms =================
    "trie-operations": {
        problemStatement: "Insert, search, and prefix matching in a Trie (prefix tree).",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20220824103130/TrieDataStructure.png",
        intuition: "Store characters as nodes; words sharing prefixes share path in the tree.",
        pseudocode: `Insert(word):
    curr = root
    for char in word:
        if !curr.children[char]: curr.children[char] = new Node()
        curr = curr.children[char]
    curr.isEndOfWord = true`,
        implementation: `class TrieNode {
    children: Record<string, TrieNode> = {};
    isEndOfWord = false;
}
export class Trie {
    root = new TrieNode();
    insert(word: string) {
        let curr = this.root;
        for (const char of word) {
            if (!curr.children[char]) curr.children[char] = new TrieNode();
            curr = curr.children[char];
        }
        curr.isEndOfWord = true;
    }
}`,
        timeComplexity: { best: "O(L)", average: "O(L)", worst: "O(L)" },
        spaceComplexity: "O(N*L)"
    },
    "range-minimum-query-rmq": {
        problemStatement: "Find the minimum value in a specific range of an array.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20200630132333/SparseTable.png",
        intuition: "Precompute minimums to answer queries in O(1) or O(log n).",
        pseudocode: `SparseTable[i][j] stores min in range [i, i + 2^j - 1]
Query(L, R):
    k = floor(log2(R - L + 1))
    return min(SparseTable[L][k], SparseTable[R - 2^k + 1][k])`,
        implementation: `// Sparse Table implementation for O(1) RMQ after O(n log n) preprocessing`,
        timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
        spaceComplexity: "O(n log n)"
    },
    "binary-indexed-tree-fenwick-tree": {
        problemStatement: "Maintain prefix sums and update elements in logarithmic time.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20230718124022/Fenwick-Tree.png",
        intuition: "Each index stores a sum of a range whose size is the power of 2 determined by the last set bit.",
        pseudocode: `Update(idx, val):
    while idx <= n:
        tree[idx] += val
        idx += idx & (-idx)
Query(idx):
    while idx > 0:
        sum += tree[idx]
        idx -= idx & (-idx)`,
        implementation: `export class FenwickTree {
    tree: number[];
    constructor(n: number) { this.tree = new Array(n + 1).fill(0); }
    update(idx: number, val: number) {
        for (; idx < this.tree.length; idx += idx & -idx) this.tree[idx] += val;
    }
    query(idx: number): number {
        let sum = 0;
        for (; idx > 0; idx -= idx & -idx) sum += this.tree[idx];
        return sum;
    }
}`,
        timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
        spaceComplexity: "O(n)"
    },
    "a-search-algorithm": {
        problemStatement: "Find the shortest path in a graph using heuristics.",
        exampleDiagram: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Astar_progress_animation.gif",
        intuition: "Combines Dijkstra's (distance from start) with a heuristic (estimated distance to goal) to prioritize nodes.",
        pseudocode: `f(n) = g(n) + h(n)
PriorityQueue pq stores nodes by f(n)
while pq:
    curr = pq.pop()
    if curr == goal: return path
    for neighbor in curr.neighbors:
        if new_g < neighbor.g: update neighbor f, g; pq.push(neighbor)`,
        implementation: `// A* Search helps in pathfinding and graph traversal`,
        timeComplexity: { best: "O(E)", average: "O(E)", worst: "O(b^d)" },
        spaceComplexity: "O(V)"
    },
    "boyer-moore-majority-vote": {
        problemStatement: "Find the element that appears more than n/2 times in an array.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20231016155919/Boyer-Moore-Majority-Voting-Algorithm.png",
        intuition: "Maintain a candidate and a counter. If counter is 0, pick a new candidate. If current element matches candidate, increment; else decrement.",
        pseudocode: `candidate = null, count = 0
for x in arr:
    if count == 0: candidate = x, count = 1
    else if x == candidate: count++
    else: count--
Verify candidate appears > n/2 times`,
        implementation: `export function majorityElement(nums: number[]): number {
    let candidate = 0, count = 0;
    for (const num of nums) {
        if (count === 0) candidate = num;
        count += (num === candidate) ? 1 : -1;
    }
    return candidate;
}`,
        timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
        spaceComplexity: "O(1)"
    },
    "fast-fourier-transform-fft": {
        problemStatement: "Compute the Discrete Fourier Transform (DFT) and its inverse efficiently.",
        exampleDiagram: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Recursive-FFT.svg/300px-Recursive-FFT.svg.png",
        intuition: "Breaks down a DFT of any composite size n = n1n2 into many smaller DFTs of sizes n1 and n2.",
        pseudocode: `FFT(a):
    n = len(a)
    if n == 1: return a
    a_even = [a[0], a[2], ..., a[n-2]]
    a_odd = [a[1], a[3], ..., a[n-1]]
    y_even = FFT(a_even)
    y_odd = FFT(a_odd)
    for k = 0 to n/2 - 1:
        y[k] = y_even[k] + w^k * y_odd[k]
        y[k + n/2] = y_even[k] - w^k * y_odd[k]
    return y`,
        implementation: `// FFT reduces complexity from O(n^2) to O(n log n)`,
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(n)"
    },
    "segment-tree-query": {
        problemStatement: "Answer range queries (sum, min, max) and perform point updates efficiently.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20231018151320/Segment-tree.png",
        intuition: "A balanced binary tree where each node stores information about an interval of the array.",
        pseudocode: `Build(node, start, end):
    if start == end: tree[node] = arr[start]; return
    mid = (start + end) / 2
    Build(2*node, start, mid); Build(2*node+1, mid+1, end)
    tree[node] = tree[2*node] + tree[2*node+1]`,
        implementation: `// Segment Tree for range sums/min/max in O(log n)`,
        timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
        spaceComplexity: "O(n)"
    },
    "quick-select": {
        problemStatement: "Find the k-th smallest element in an unsorted list.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20230524124638/Tournament-Method.png",
        intuition: "Uses the partitioning logic of QuickSort, but only recurses into one half.",
        pseudocode: `QuickSelect(arr, k):
    pivot = partition(arr)
    if k == pivot: return arr[k]
    if k < pivot: return QuickSelect(left, k)
    else: return QuickSelect(right, k)`,
        implementation: `export function quickSelect(arr: number[], k: number): number {
    let left = 0, right = arr.length - 1;
    while (true) {
        if (left === right) return arr[left];
        let pivotIndex = partition(arr, left, right);
        if (k === pivotIndex) return arr[k];
        if (k < pivotIndex) right = pivotIndex - 1;
        else left = pivotIndex + 1;
    }
}
function partition(arr: number[], left: number, right: number): number {
    const pivot = arr[right];
    let i = left;
    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    return i;
}`,
        timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n²)" },
        spaceComplexity: "O(1)"
    },
    "median-of-medians": {
        problemStatement: "Selection algorithm that guarantees O(n) worst-case time for k-th smallest element.",
        exampleDiagram: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/K-th_smallest_element_%28Median_of_medians%29.png/500px-K-th_smallest_element_%28Median_of_medians%29.png",
        intuition: "Divides array into groups of 5, finds their medians, and recursively finds the median of those medians as a pivot.",
        pseudocode: `MedianOfMedians(arr):
    divide into groups of 5
    medians = [median of each group]
    pivot = MedianOfMedians(medians)
    partition(arr, pivot)
    recurse in correct half`,
        implementation: `// Selection algorithm with O(n) guaranteed worst case`,
        timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
        spaceComplexity: "O(n)"
    },
    "b-tree": {
        problemStatement: "Self-balancing tree data structure that maintains sorted data and allows logarithmic operations.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20231120120155/b-tree.png",
        intuition: "Optimized for systems that read/write large blocks of data (like databases). Nodes can have multiple children.",
        pseudocode: `Search(root, key):
    i = 0
    while i < n and key > root.keys[i]: i++
    if i < n and key == root.keys[i]: return (root, i)
    if root.leaf: return NULL
    return Search(root.children[i], key)`,
        implementation: `// B-Tree search and insertion maintains O(log n)`,
        timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
        spaceComplexity: "O(n)"
    },
    "splay-tree-operations": {
        problemStatement: "Self-adjusting BST where recently accessed elements are moved to the root.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20230623120155/splay-tree.png",
        intuition: "Uses 'splaying' (zig, zig-zig, zig-zag rotations) to bring accessed nodes to top, providing O(log n) amortized time.",
        pseudocode: `Splay(node):
    while node != root:
        if parent == root: zig
        else if zig-zig: move up via rotations
        else if zig-zag: move up via rotations`,
        implementation: `// Splay tree operations prioritize frequently used elements`,
        timeComplexity: { best: "O(log n)", average: "O(log n) amortized", worst: "O(log n) amortized" },
        spaceComplexity: "O(n)"
    },
    "fibonacci-search": {
        problemStatement: "Search for an element in a sorted array using Fibonacci numbers.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20230303125251/Fibonacci-Search-Algorithm.png",
        intuition: "Similar to binary search, but uses Fibonacci numbers to divide the array into parts of different sizes.",
        pseudocode: `FibSearch(arr, x):
    fibM2, fibM1, fibM = 0, 1, 1
    while fibM < n: fibM2, fibM1, fibM = fibM1, fibM, fibM1 + fibM
    offset = -1
    while fibM > 1:
        i = min(offset + fibM2, n-1)
        if arr[i] < x: fibM, fibM1, fibM2 = fibM1, fibM2, fibM1 - fibM2; offset = i
        else if arr[i] > x: fibM, fibM1, fibM2 = fibM2, fibM1 - fibM2, fibM2 - (fibM1 - fibM2)
        else: return i`,
        implementation: `// Fibonacci Search is faster than Binary Search for some systems (no division)`,
        timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
        spaceComplexity: "O(1)"
    },
    "ordered-sequential-search": {
        problemStatement: "Search for an element in a sorted list linearly.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20240902185521/Linear-search-algorithm-1.webp",
        intuition: "Stop searching once we find an element greater than the target in a sorted list.",
        pseudocode: `for x in sorted_arr:
    if x == target: return index
    if x > target: break
return -1`,
        implementation: `export function orderedSearch(arr: number[], target: number): number {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
        if (arr[i] > target) break;
    }
    return -1;
}`,
        timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
        spaceComplexity: "O(1)"
    },
    "hash-based-search": {
        problemStatement: "Search for an element in O(1) time using a hash table.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20230214120155/Hashing-1.png",
        intuition: "Map keys to array indices via a hash function for near-instant access.",
        pseudocode: `Insert(val): index = hash(val) % size; table[index].push(val)
Search(val): index = hash(val) % size; return val in table[index]`,
        implementation: `// Hash Table provides O(1) search on average`,
        timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(n)" },
        spaceComplexity: "O(n)"
    },
    "tim-sort": {
        problemStatement: "Highly efficient stable sorting algorithm used in Python and Java.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20220907120155/Timsort.png",
        intuition: "Combines Insertion Sort (for small runs) and Merge Sort (to combine runs).",
        pseudocode: `Divide in blocks of size RUN
Sort each block with Insertion Sort
Merge sorted blocks with Merge Sort`,
        implementation: `// Hybrid sorting algorithm O(n log n)`,
        timeComplexity: { best: "O(n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(n)"
    },
    "comb-sort": {
        problemStatement: "Improvement over bubble sort that eliminates small values near the end of the list.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20220907120155/Combsort.png",
        intuition: "Uses a gap initially equal to size and shrinks it by a factor in each pass.",
        pseudocode: `gap = n
while gap > 1 or swapped:
    gap = floor(gap / 1.3)
    if gap < 1: gap = 1
    for i = 0 to n - gap - 1:
        if arr[i] > arr[i + gap]: swap(arr[i], arr[i + gap])`,
        implementation: `export function combSort(arr: number[]): number[] {
    let gap = arr.length;
    let shrink = 1.3, swapped = true;
    while (gap > 1 || swapped) {
        gap = Math.floor(gap / shrink);
        if (gap < 1) gap = 1;
        swapped = false;
        for (let i = 0; i + gap < arr.length; i++) {
            if (arr[i] > arr[i + gap]) {
                [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
                swapped = true;
            }
        }
    }
    return arr;
}`,
        timeComplexity: { best: "O(n log n)", average: "O(n²/2^p)", worst: "O(n²)" },
        spaceComplexity: "O(1)"
    },
    "cycle-sort": {
        problemStatement: "In-place, unstable sorting algorithm optimal in terms of number of writes.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20230302120155/Cyclesort.png",
        intuition: "Moves items directly to their correct final positions by decomposing permutations into cycles.",
        pseudocode: `for each cycle:
    find correct position of item
    if pos != start: swap and continue cycle`,
        implementation: `// Optimal for memory writes O(n^2)`,
        timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)"
    },
    "tree-sort": {
        problemStatement: "Sort elements by building a Binary Search Tree and then performing in-order traversal.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20230914120155/Treesort.png",
        intuition: "Take advantage of BST properties: left < root < right.",
        pseudocode: `Insert all elements into a BST
Perform in-order traversal to get sorted list`,
        implementation: `// Tree sort uses BST O(n log n)`,
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
        spaceComplexity: "O(n)"
    },
    "odd-even-sort": {
        problemStatement: "Parallel sorting algorithm also known as Brick Sort.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20230914120155/OddEvenSort.png",
        intuition: "Compare and swap adjacent elements with odd and then even indices.",
        pseudocode: `while not sorted:
    for i = 1, 3, 5: if arr[i] > arr[i+1]: swap
    for i = 0, 2, 4: if arr[i] > arr[i+1]: swap`,
        implementation: `export function oddEvenSort(arr: number[]): number[] {
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i = 1; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i + 1]) { [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; sorted = false; }
        }
        for (let i = 0; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i + 1]) { [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; sorted = false; }
        }
    }
    return arr;
}`,
        timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)"
    },
    "pancake-sort": {
        problemStatement: "Sort an array using only 'flip' operations on prefixes.",
        exampleDiagram: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Pancake_sort_animation.gif",
        intuition: "Find the max element, flip it to front, flip it to correct end position. Repeat for smaller array.",
        pseudocode: `for size = n down to 2:
    max_idx = find_max in arr[0...size-1]
    flip(arr, max_idx)
    flip(arr, size-1)`,
        implementation: `// Pancake sort uses prefix reversals O(n^2)`,
        timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)"
    },
    "bitonic-sort": {
        problemStatement: "Parallel sorting algorithm used in high-performance computing.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20230914120155/BitonicSort.png",
        intuition: "Recursively creates bitonic sequences (increasing then decreasing) and merges them.",
        pseudocode: `BitonicSort(0, n, ASC):
    BitonicSort(0, n/2, ASC)
    BitonicSort(n/2, n/2, DESC)
    BitonicMerge(0, n, ASC)`,
        implementation: `// Bitonic sort O(log^2 n) in parallel`,
        timeComplexity: { best: "O(log² n)", average: "O(log² n)", worst: "O(log² n)" },
        spaceComplexity: "O(n log² n)"
    },
    "gray-code-generation": {
        problemStatement: "Generate a sequence of binary numbers where contiguous entries differ by only one bit.",
        exampleDiagram: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Reflected_Binary_Code_4nd_order.svg/300px-Reflected_Binary_Code_4nd_order.svg.png",
        intuition: "A binary number n is converted to Gray code using n ^ (n >> 1).",
        pseudocode: `return n ^ (n >> 1)`,
        implementation: `export function generateGrayCode(n: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < (1 << n); i++) {
        result.push(i ^ (i >> 1));
    }
    return result;
}`,
        timeComplexity: { best: "O(2^n)", average: "O(2^n)", worst: "O(2^n)" },
        spaceComplexity: "O(2^n)"
    },
    "intro-sort": {
        problemStatement: "Hybrid sorting algorithm that provides both fast average performance and optimal worst-case performance.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20220907120155/Introsort.png",
        intuition: "Starts with QuickSort and switches to HeapSort if the recursion depth exceeds a level. Uses Insertion Sort for small ranges.",
        pseudocode: `Introsort(arr, depth_limit):
    if size < 16: InsertionSort(arr)
    if depth_limit == 0: HeapSort(arr)
    else: p = Partition(arr); Introsort(left, d-1); Introsort(right, d-1)`,
        implementation: `// Hybrid of Quick, Heap and Insertion sort`,
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(log n)"
    },
    "flash-sort": {
        problemStatement: "Distribution sorting algorithm with O(n) time for uniform distributions.",
        exampleDiagram: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Flashsort_step_by_step.png/300px-Flashsort_step_by_step.png",
        intuition: "Estimates the final position of each element based on its value relative to the min and max.",
        pseudocode: `Find min and max
Classify items into buckets via interpolation
Permute elements into their buckets in-place
Final InsertionSort to handle small errors`,
        implementation: `// O(n) for uniform distributions`,
        timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n log n)" },
        spaceComplexity: "O(m)"
    },
    "external-merge-sort": {
        problemStatement: "Sort data that does not fit into RAM by using disk storage.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20230214120155/External-Merge-Sort.png",
        intuition: "Divide data into chunks that fit in RAM, sort them, and then merge the sorted chunks using a min-heap.",
        pseudocode: `Divide file into chunks
Sort each chunk in RAM and write to temp files
Perform k-way merge of temp files`,
        implementation: `// Essential for large-scale data processing`,
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(m) where m is RAM size"
    },
    "b-tree-search": {
        problemStatement: "Modified B-Tree where all data is stored in the leaf nodes, optimized for range queries.",
        exampleDiagram: "https://media.geeksforgeeks.org/wp-content/uploads/20231120120155/b-tree.png",
        intuition: "Internal nodes only store keys (guides); leaf nodes store actual data and are linked sequentially.",
        pseudocode: `Search(leaf_index):
    Follow internal nodes to leaf
    Scan linked list of leaves for range queries`,
        implementation: `// Primary index structure for file systems and databases`,
        timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
        spaceComplexity: "O(n)"
    },
    "red-black-tree-deletion": {
        problemStatement: "Remove a node from a Red-Black Tree while maintaining its five properties.",
        exampleDiagram: "https://upload.wikimedia.org/wikipedia/commons/6/66/Red-black_tree_example.svg",
        intuition: "Delete like BST, then perform recoloring and rotations (6 cases) if a black node was removed.",
        pseudocode: `BSTDelete(z)
If z was black: Fixup(x)
Cases: sibling red, sibling black with black children, etc.`,
        implementation: `// Maintaining balance after deletion is complex but O(log n)`,
        timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
        spaceComplexity: "O(log n) stack"
    }
};

// Generate algorithm from real algorithm names
function generateAlgorithm(index: number, name: string, domain: string, domainId: number) {
    const baseSlug = name.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/\(.*?\)/g, '')
        .trim();

    // Add index to ensure uniqueness across all algorithms
    const slug = `${baseSlug}-${index}`;

    const category = determineCategory(name, domain);
    const visualizationType = getVisualizationType(name, domain);
    const difficulty = getDifficulty(index, domain);
    const complexity = getComplexity(name, category);
    const isPopular = POPULAR_ALGORITHMS.some(pop => name.toLowerCase().includes(pop.toLowerCase()));

    return {
        slug,
        name,
        category,
        domain,
        domainId: domainId,
        difficulty,
        visualizationType: visualizationType,
        intuition: `The ${name} algorithm works by systematically ${category.toLowerCase()}. It's particularly useful when dealing with ${category.toLowerCase()} problems in ${domain}.`,
        implementation: `/**\n * ${name}\n * Category: ${category}\n * Domain: ${domain}\n */\nfunction ${slug.replace(/-/g, '_')}(input) {\n  // Implementation\n  return input;\n}`,
        timeComplexity: complexity.time,
        spaceComplexity: complexity.space,
        description: `Deep dive into the architecture and performance of ${name}. This ${category} algorithm is a fundamental block in ${domain} problems.`,
        pseudocode: `function ${name.toLowerCase()}(data) {\n  // Initialization\n  for each item in data {\n    // Core logic\n  }\n  return result;\n}`,
        tags: [category.toLowerCase(), domain.toLowerCase(), "performance", "optimization"],
        isPopular,
        practiceProblems: generatePracticeProblems(name, category, [category.toLowerCase(), domain.toLowerCase()]),
        flashcards: generateFlashcards(name, category),
        ...(MANUAL_ALGORITHM_DATA[baseSlug] || {})
    };
}

// Generate all algorithms from the structured data
export const ALL_1000_ALGORITHMS = (() => {
    const algorithms: any[] = [];
    let globalIndex = 1;

    for (const [domainName, algorithmNames] of Object.entries(ALGORITHMS_BY_DOMAIN)) {
        const domain = DOMAINS.find(d => d.name === domainName);
        if (!domain) continue;

        for (const algorithmName of algorithmNames) {
            algorithms.push(generateAlgorithm(globalIndex, algorithmName, domainName, domain.id));
            globalIndex++;
        }
    }

    // Fill remaining slots if needed (should be exactly 1000)
    while (algorithms.length < 1000) {
        const domain = DOMAINS[algorithms.length % DOMAINS.length];
        algorithms.push(generateAlgorithm(
            algorithms.length + 1,
            `Algorithm ${algorithms.length + 1}`,
            domain.name,
            domain.id
        ));
    }

    return algorithms.slice(0, 1000);
})();

