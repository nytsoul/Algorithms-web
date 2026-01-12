
export interface Algorithm {
    _id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    domain: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    tags: string[];
    timeComplexity: {
        best: string;
        average: string;
        worst: string;
    };
    spaceComplexity: string;
    implementation: string;
    pseudocode: string;
    intuition: string;
    visualizationType: "array" | "graph" | "tree" | "matrix" | "network" | "geometric" | "custom";
    applications: string[];
    advantages: string[];
    disadvantages: string[];
    relatedAlgorithms: string[];
    researchReferences: string[];
    inventor?: string;
    yearIntroduced?: number;
    language?: string;

    // New enhanced fields
    domainId: number;
    algorithmNumber: number;
    subCategory?: string;
    paradigm?: string;
    prerequisites?: string[];
    useCases?: string[];
    realWorldExamples?: string[];
}

export const MOCK_ALGORITHMS: Algorithm[] = [
    {
        _id: "1",
        name: "Bubble Sort",
        slug: "bubble-sort",
        language: "javascript",
        domainId: 2,
        algorithmNumber: 11,
        paradigm: "Comparison-based",
        description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
        category: "Sorting",
        domain: "Data Structures & Algorithms",
        difficulty: "Beginner",
        tags: ["sorting", "comparison", "in-place", "stable"],
        timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)",
        implementation: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
        pseudocode: `procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n-1 inclusive do
            /* if this pair is out of order */
            if A[i-1] > A[i] then
                /* swap them and remember something changed */
                swap(A[i-1], A[i])
                swapped := true
            end if
        end for
    until not swapped
end procedure`,
        intuition: "Imagine air bubbles rising to the surface of water. In Bubble Sort, the largest elements 'bubble' to the end of the array in each pass.",
        visualizationType: "array",
        applications: ["Educational purposes", "Small datasets", "When memory is extremely limited"],
        advantages: ["Simple to understand", "In-place", "Stable"],
        disadvantages: ["Inefficient for large datasets", "O(n²) complexity"],
        relatedAlgorithms: ["Insertion Sort", "Selection Sort"],
        researchReferences: [],
        inventor: "Unknown",
        yearIntroduced: 1956
    },
    {
        _id: "2",
        name: "Quick Sort",
        slug: "quick-sort",
        language: "javascript",
        domainId: 2,
        algorithmNumber: 15,
        paradigm: "Divide and Conquer",
        description: "An efficient, in-place sorting algorithm that uses a divide-and-conquer strategy to sort elements.",
        category: "Sorting",
        domain: "Data Structures & Algorithms",
        difficulty: "Intermediate",
        tags: ["sorting", "divide-and-conquer", "in-place", "unstable"],
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
        spaceComplexity: "O(log n)",
        implementation: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
        pseudocode: `algorithm quicksort(A, lo, hi) is
    if lo < hi then
        p := partition(A, lo, hi)
        quicksort(A, lo, p - 1)
        quicksort(A, p + 1, hi)

algorithm partition(A, lo, hi) is
    pivot := A[hi]
    i := lo
    for j := lo to hi - 1 do
        if A[j] < pivot then
            swap A[i] with A[j]
            i := i + 1
    swap A[i] with A[hi]
    return i`,
        intuition: "Pick a 'pivot' and move smaller things to the left, bigger things to the right. Then recursively do the same for the left and right sides.",
        visualizationType: "array",
        applications: ["General purpose sorting", "Language standard libraries"],
        advantages: ["Very fast on average", "In-place (mostly)"],
        disadvantages: ["Unstable", "Worst case O(n²)"],
        relatedAlgorithms: ["Merge Sort", "Heap Sort"],
        researchReferences: ["Hoare, C. A. R. (1961). Quicksort."],
        inventor: "Tony Hoare",
        yearIntroduced: 1959
    },
    {
        _id: "3",
        name: "Dijkstra's Algorithm",
        slug: "dijkstras-algorithm",
        language: "javascript",
        domainId: 8,
        algorithmNumber: 42,
        paradigm: "Greedy",
        description: "An algorithm for finding the shortest paths between nodes in a graph.",
        category: "Pathfinding",
        domain: "Graph Algorithms",
        difficulty: "Advanced",
        tags: ["graph", "shortest-path", "greedy"],
        timeComplexity: { best: "O(E+V log V)", average: "O(E+V log V)", worst: "O(E+V log V)" },
        spaceComplexity: "O(V)",
        implementation: `function dijkstra(graph, start) {
  const distances = {};
  const visited = new Set();
  // ... implementation detail
}`,
        pseudocode: `function Dijkstra(Graph, source):
    dist[source] ← 0
    create vertex set Q

    for each vertex v in Graph:
        if v ≠ source:
            dist[v] ← INFINITY
        prev[v] ← UNDEFINED
        add v to Q

    while Q is not empty:
        u ← vertex in Q with min dist[u]
        remove u from Q

        for each neighbor v of u:
            alt ← dist[u] + length(u, v)
            if alt < dist[v]:
                dist[v] ← alt
                prev[v] ← u

    return dist, prev`,
        intuition: "Like spreading water from the source; it reaches the closest nodes first.",
        visualizationType: "graph",
        applications: ["GPS Navigation", "Network Routing"],
        advantages: ["Finds shortest path in weighted graphs"],
        disadvantages: ["Doesn't work with negative weights"],
        relatedAlgorithms: ["Bellman-Ford", "A* Search"],
        researchReferences: [],
        inventor: "Edsger W. Dijkstra",
        yearIntroduced: 1956
    },
    {
        _id: "4",
        name: "Binary Search",
        slug: "binary-search",
        language: "javascript",
        domainId: 1,
        algorithmNumber: 2,
        paradigm: "Divide and Conquer",
        description: "A search algorithm that finds the position of a target value within a sorted array.",
        category: "Searching",
        domain: "Data Structures & Algorithms",
        difficulty: "Beginner",
        tags: ["searching", "divide-and-conquer", "sorted"],
        timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
        spaceComplexity: "O(1)",
        implementation: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
        pseudocode: `function binary_search(A, n, T) is
    L := 0
    R := n - 1
    while L ≤ R do
        m := floor((L + R) / 2)
        if A[m] < T then
            L := m + 1
        else if A[m] > T then
            R := m - 1
        else:
            return m
    return unsuccessful`,
        intuition: "Divide and conquer! If the target is smaller than the middle, look in the left half, otherwise look in the right.",
        visualizationType: "array",
        applications: ["Searching in databases", "Library sorting"],
        advantages: ["Extremely fast (logarithmic)"],
        disadvantages: ["Requires sorted data"],
        relatedAlgorithms: ["Linear Search", "Jump Search"],
        researchReferences: [],
        inventor: "Unknown",
        yearIntroduced: 1946
    }
];
