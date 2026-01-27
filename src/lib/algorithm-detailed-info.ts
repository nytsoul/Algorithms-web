/**
 * Comprehensive Algorithm Information Database
 * Contains detailed explanations, pseudocode, complexity analysis, and examples
 * for all major algorithms across multiple domains
 */

export interface AlgorithmDetailedInfo {
  id: string;
  name: string;
  slug: string;
  category: string;
  domain: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  explanation: string;
  description: string;
  pseudocode?: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  keyPoints?: string[];
  realWorldExamples?: string[];
  prerequisites?: string[];
  relatedAlgorithms?: string[];
  advantages?: string[];
  disadvantages?: string[];
  whenToUse?: string[];
  dryRunExample?: string;
  stepByStep?: string[];
}

// SEARCHING ALGORITHMS
export const SEARCHING_ALGORITHMS: Record<string, AlgorithmDetailedInfo> = {
  "linear-search": {
    id: "search-001",
    name: "Linear Search",
    slug: "linear-search",
    category: "Searching",
    domain: "DSA",
    difficulty: "Beginner",
    explanation:
      "Linear Search is the simplest searching algorithm. It checks each element one by one from the beginning of the list until the required element is found or the list ends. It works on unsorted and sorted data.",
    description:
      "Start from the first element, compare it with the value to be searched. If it matches → Stop (Found). If not → move to the next element. Repeat until found or list ends.",
    pseudocode: `LinearSearch(array, size, key)
  for i = 0 to size-1
    if array[i] == key
      return i  // element found
  return -1  // element not found`,
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    keyPoints: [
      "Works on both sorted and unsorted data",
      "No extra space required",
      "Simple to implement",
      "Slow for large datasets",
    ],
    realWorldExamples: [
      "Searching a contact name in your phone",
      "Finding a book in a shelf (checking one by one)",
      "Checking your roll number in an attendance list",
      "Finding a product in a shopping list",
    ],
    prerequisites: ["Arrays", "Basic loops"],
    relatedAlgorithms: ["Binary Search", "Jump Search", "Interpolation Search"],
    advantages: [
      "Works on unsorted data",
      "No preprocessing needed",
      "Simple implementation",
    ],
    disadvantages: [
      "Very slow for large datasets",
      "Much slower than binary search",
      "O(n) time complexity",
    ],
    whenToUse: ["Small datasets", "Unsorted data", "When simplicity is priority"],
    dryRunExample: `Array: [10, 25, 30, 45, 60]
Key: 30
Step 1: 10 ≠ 30 → Continue
Step 2: 25 ≠ 30 → Continue
Step 3: 30 = 30 → Found at position 3`,
    stepByStep: [
      "Read the array size",
      "Read the array elements",
      "Read the search element (key)",
      "Compare key with each element",
      "Print result (found / not found)",
    ],
  },

  "binary-search": {
    id: "search-002",
    name: "Binary Search",
    slug: "binary-search",
    category: "Searching",
    domain: "DSA",
    difficulty: "Beginner",
    explanation:
      "Binary Search is a fast searching algorithm. It works by dividing the array into two halves again and again. Important rule: Binary Search works ONLY on sorted data (ascending or descending).",
    description:
      "Take a sorted array, find the middle element, compare it with the key. If equal → element found. If key is smaller → search left half. If key is larger → search right half. Repeat until found or search space becomes empty.",
    pseudocode: `BinarySearch(array, size, key)
  low = 0
  high = size - 1
  while low <= high
    mid = (low + high) / 2
    if array[mid] == key
      return mid  // found
    else if key < array[mid]
      high = mid - 1
    else
      low = mid + 1
  return -1  // not found`,
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    keyPoints: [
      "Requires sorted array",
      "Very fast - reduces search space by half each step",
      "Reduces O(n) to O(log n)",
    ],
    realWorldExamples: [
      "Finding a word in a dictionary",
      "Searching a page number in a book",
      "Searching roll number in a sorted student list",
      "Finding a contact in sorted contact list",
    ],
    prerequisites: ["Arrays", "Sorting", "Recursion or loops"],
    relatedAlgorithms: ["Jump Search", "Interpolation Search", "Exponential Search"],
    advantages: [
      "Very fast - O(log n) time",
      "Efficient for large datasets",
      "Widely used in practice",
    ],
    disadvantages: [
      "Requires sorted data",
      "No preprocessing eliminates advantage",
      "Less intuitive than linear search",
    ],
    whenToUse: ["Sorted data", "Large datasets", "When speed is critical"],
    dryRunExample: `Sorted Array: [10, 20, 30, 40, 50, 60]
Key: 40
Step 1: low=0, high=5, mid=2, arr[2]=30, 40>30
Step 2: low=3, high=5, mid=4, arr[4]=50, 40<50
Step 3: low=3, high=3, mid=3, arr[3]=40 → Found`,
  },

  "jump-search": {
    id: "search-003",
    name: "Jump Search",
    slug: "jump-search",
    category: "Searching",
    domain: "DSA",
    difficulty: "Intermediate",
    explanation:
      "Jump Search is a searching algorithm used on a sorted array. Instead of checking every element, it jumps ahead by fixed steps, then performs a linear search in the identified block. It is faster than Linear Search but slower than Binary Search.",
    description:
      "Take a sorted array, decide a jump size (usually √n), jump ahead by that size until the element is >= key. Once the block is found, do a linear search inside that block.",
    pseudocode: `JumpSearch(array, size, key)
  step = √size
  prev = 0
  while array[min(step, size) - 1] < key
    prev = step
    step = step + √size
    if prev >= size
      return -1
  for i = prev to min(step, size) - 1
    if array[i] == key
      return i
  return -1`,
    timeComplexity: {
      best: "O(1)",
      average: "O(√n)",
      worst: "O(√n)",
    },
    spaceComplexity: "O(1)",
    keyPoints: [
      "Works only on sorted data",
      "Jump size = √n gives optimal time",
      "Faster than linear, slower than binary",
    ],
    realWorldExamples: [
      "Finding a topic in a textbook index",
      "Searching a file in sorted folders",
      "Searching invoice number in sorted bills",
    ],
  },

  "interpolation-search": {
    id: "search-004",
    name: "Interpolation Search",
    slug: "interpolation-search",
    category: "Searching",
    domain: "DSA",
    difficulty: "Intermediate",
    explanation:
      "Interpolation Search is an improved searching algorithm used on a sorted array. Instead of always checking the middle element like Binary Search, it estimates the position using a formula. Works best when data is uniformly distributed.",
    description:
      "Use a formula to guess where the key might be based on its value relative to bounds. Compare and narrow the search range.",
    pseudocode: `InterpolationSearch(array, size, key)
  low = 0
  high = size - 1
  while low <= high AND key >= array[low] AND key <= array[high]
    pos = low + ((key - array[low]) * (high - low)) / (array[high] - array[low])
    if array[pos] == key
      return pos
    else if key < array[pos]
      high = pos - 1
    else
      low = pos + 1
  return -1`,
    timeComplexity: {
      best: "O(1)",
      average: "O(log log n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    keyPoints: [
      "Works only on sorted data",
      "Best for uniformly distributed data",
      "Uses interpolation formula",
    ],
  },

  "exponential-search": {
    id: "search-005",
    name: "Exponential Search",
    slug: "exponential-search",
    category: "Searching",
    domain: "DSA",
    difficulty: "Intermediate",
    explanation:
      "Exponential Search is a searching algorithm used on a sorted array. It works in two steps: Find the range using exponential jumps (1, 2, 4, 8...), then apply Binary Search inside that range. Useful for large or unknown array sizes.",
    description:
      "Check first element. If not found, jump the index as 1, 2, 4, 8, 16... Stop when value > key. Apply Binary Search between the found range.",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    keyPoints: [
      "Works only on sorted data",
      "Good for large/unknown size arrays",
      "Combines exponential jumps with binary search",
    ],
  },
};

// SORTING ALGORITHMS
export const SORTING_ALGORITHMS: Record<string, AlgorithmDetailedInfo> = {
  "bubble-sort": {
    id: "sort-001",
    name: "Bubble Sort",
    slug: "bubble-sort",
    category: "Sorting",
    domain: "DSA",
    difficulty: "Beginner",
    explanation:
      "Bubble Sort is a simple sorting algorithm that repeatedly compares adjacent elements and swaps them if they are in the wrong order. In each pass, the largest element moves to the end of the list, like a bubble rising to the top.",
    description:
      "Compare the first two elements. If first > second → swap. Move to the next pair. Repeat until the list is sorted. After each pass, one element is placed in its correct position.",
    pseudocode: `BubbleSort(A, n)
  for i = 0 to n-2
    for j = 0 to n-i-2
      if A[j] > A[j+1]
        swap(A[j], A[j+1])`,
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    keyPoints: [
      "Simple and easy to implement",
      "Stable sorting algorithm",
      "Very slow for large datasets",
    ],
    realWorldExamples: [
      "Sorting marks of a small class",
      "Teaching sorting concept to beginners",
    ],
  },

  "selection-sort": {
    id: "sort-002",
    name: "Selection Sort",
    slug: "selection-sort",
    category: "Sorting",
    domain: "DSA",
    difficulty: "Beginner",
    explanation:
      "Selection Sort is a simple sorting algorithm that selects the smallest element from the unsorted part and places it in the correct position. After each pass, one element is placed in its final correct position.",
    description:
      "Divide array into sorted and unsorted parts. Find smallest element in unsorted part. Swap with first unsorted element. Repeat.",
    pseudocode: `SelectionSort(A, n)
  for i = 0 to n-2
    min = i
    for j = i+1 to n-1
      if A[j] < A[min]
        min = j
    swap(A[i], A[min])`,
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    keyPoints: [
      "Simple implementation",
      "In-place sorting",
      "Always O(n²) regardless of input",
    ],
  },

  "insertion-sort": {
    id: "sort-003",
    name: "Insertion Sort",
    slug: "insertion-sort",
    category: "Sorting",
    domain: "DSA",
    difficulty: "Beginner",
    explanation:
      "Insertion Sort works like arranging playing cards - one card at a time in the correct position. The array is divided into sorted (left) and unsorted (right) parts.",
    description:
      "Start from second element. Take current element (key). Compare with elements on left. Shift bigger elements right. Insert key in correct position.",
    pseudocode: `InsertionSort(A, n)
  for i = 1 to n-1
    key = A[i]
    j = i - 1
    while j >= 0 and A[j] > key
      A[j + 1] = A[j]
      j = j - 1
    A[j + 1] = key`,
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    keyPoints: [
      "Adaptive - fast on nearly sorted data",
      "Stable sorting",
      "In-place sorting",
    ],
  },

  "merge-sort": {
    id: "sort-004",
    name: "Merge Sort",
    slug: "merge-sort",
    category: "Sorting",
    domain: "DSA",
    difficulty: "Intermediate",
    explanation:
      "Merge Sort is based on Divide and Conquer. It divides the array into smaller parts, sorts them, then merges them into a sorted array. Very efficient for large datasets.",
    description:
      "Divide array into two halves. Keep dividing until single element. Merge small parts by comparing elements. Continue merging until fully sorted.",
    pseudocode: `MergeSort(A, low, high)
  if low < high
    mid = (low + high) / 2
    MergeSort(A, low, mid)
    MergeSort(A, mid+1, high)
    Merge(A, low, mid, high)`,
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    keyPoints: [
      "Consistent O(n log n) time",
      "Requires extra space",
      "Stable sorting",
      "Good for external sorting",
    ],
  },

  "quick-sort": {
    id: "sort-005",
    name: "Quick Sort",
    slug: "quick-sort",
    category: "Sorting",
    domain: "DSA",
    difficulty: "Intermediate",
    explanation:
      "Quick Sort is a fast sorting algorithm that uses a pivot element. It places elements smaller than pivot on left and larger on right, then sorts both sides. One of the fastest sorting algorithms in practice.",
    description:
      "Choose pivot. Rearrange so smaller elements → left, larger → right. Recursively sort left and right parts.",
    pseudocode: `QuickSort(A, low, high)
  if low < high
    p = partition(A, low, high)
    QuickSort(A, low, p-1)
    QuickSort(A, p+1, high)`,
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(log n)",
    keyPoints: [
      "Fast average case",
      "In-place sorting",
      "Unstable sorting",
      "Divide and conquer",
    ],
  },

  "heap-sort": {
    id: "sort-006",
    name: "Heap Sort",
    slug: "heap-sort",
    category: "Sorting",
    domain: "DSA",
    difficulty: "Intermediate",
    explanation:
      "Heap Sort uses a Binary Heap data structure. It builds a Max Heap and repeatedly removes the largest element. Efficient and requires no extra memory.",
    description:
      "Build Max Heap. Swap root with last element. Reduce heap size. Heapify root. Repeat until array is sorted.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(1)",
    keyPoints: [
      "Consistent O(n log n)",
      "In-place sorting",
      "Uses heap data structure",
    ],
  },

  "counting-sort": {
    id: "sort-007",
    name: "Counting Sort",
    slug: "counting-sort",
    category: "Sorting",
    domain: "DSA",
    difficulty: "Intermediate",
    explanation:
      "Counting Sort is a non-comparison sorting algorithm. It counts frequency of each value and rebuilds the sorted array. Works best when range of input values is small.",
    description:
      "Find max value. Create count array. Count frequencies. Rebuild sorted array from count information.",
    timeComplexity: {
      best: "O(n + k)",
      average: "O(n + k)",
      worst: "O(n + k)",
    },
    spaceComplexity: "O(k)",
    keyPoints: [
      "Non-comparison sorting",
      "Linear time O(n + k)",
      "Works for small range of values",
    ],
  },

  "radix-sort": {
    id: "sort-008",
    name: "Radix Sort",
    slug: "radix-sort",
    category: "Sorting",
    domain: "DSA",
    difficulty: "Intermediate",
    explanation:
      "Radix Sort is a non-comparison sorting algorithm. It sorts numbers digit by digit, from least significant to most significant digit. Uses stable sort at each step.",
    description:
      "Sort by unit digit. Then tens digit. Then hundreds. Continue until all digits processed.",
    timeComplexity: {
      best: "O(d × (n + k))",
      average: "O(d × (n + k))",
      worst: "O(d × (n + k))",
    },
    spaceComplexity: "O(n + k)",
    keyPoints: [
      "Non-comparison sorting",
      "Linear time complexity",
      "Works on integers",
    ],
  },
};

// DYNAMIC PROGRAMMING ALGORITHMS
export const DP_ALGORITHMS: Record<string, AlgorithmDetailedInfo> = {
  "fibonacci-series": {
    id: "dp-001",
    name: "Fibonacci Series",
    slug: "fibonacci-series",
    category: "Dynamic Programming",
    domain: "DAA",
    difficulty: "Beginner",
    explanation:
      "Fibonacci is a sequence where each number is the sum of previous two: F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2). Using DP avoids repeated calculations from recursion.",
    description:
      "Fibonacci can be solved using recursion (slow) or DP (fast). DP stores results and reuses them, making it much faster.",
    pseudocode: `Fibonacci(n)
  if n == 0 return 0
  if n == 1 return 1
  create array dp[0..n]
  dp[0] = 0
  dp[1] = 1
  for i = 2 to n
    dp[i] = dp[i-1] + dp[i-2]
  return dp[n]`,
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    keyPoints: [
      "Overcomes exponential recursion",
      "Stores intermediate results",
      "Basic DP problem",
    ],
  },

  "0-1-knapsack": {
    id: "dp-002",
    name: "0/1 Knapsack Problem",
    slug: "0-1-knapsack",
    category: "Dynamic Programming",
    domain: "DAA",
    difficulty: "Intermediate",
    explanation:
      "0/1 Knapsack is a classic DP problem. Given items with weight and profit, maximize total profit without exceeding capacity. Each item can be taken only once (0 or 1).",
    description:
      "For each item, decide: take or not take. Store results in DP table. Choose items to maximize profit within capacity.",
    pseudocode: `Knapsack(W, weight[], profit[], n)
  create dp[0..n][0..W]
  for i = 0 to n
    for w = 0 to W
      if i == 0 or w == 0
        dp[i][w] = 0
      else if weight[i] <= w
        dp[i][w] = max(dp[i-1][w], profit[i] + dp[i-1][w - weight[i]])
      else
        dp[i][w] = dp[i-1][w]
  return dp[n][W]`,
    timeComplexity: {
      best: "O(n × W)",
      average: "O(n × W)",
      worst: "O(n × W)",
    },
    spaceComplexity: "O(n × W)",
    keyPoints: [
      "Each item taken at most once",
      "DP breaks into subproblems",
      "Optimal substructure",
    ],
  },

  "longest-common-subsequence": {
    id: "dp-003",
    name: "Longest Common Subsequence",
    slug: "longest-common-subsequence",
    category: "Dynamic Programming",
    domain: "DAA",
    difficulty: "Intermediate",
    explanation:
      "LCS finds the longest sequence that appears in both strings in same order (not necessarily contiguous). Used in version control, plagiarism detection, DNA analysis.",
    description:
      "Find longest sequence appearing in both strings. Sequence keeps order but can skip characters.",
    timeComplexity: {
      best: "O(m × n)",
      average: "O(m × n)",
      worst: "O(m × n)",
    },
    spaceComplexity: "O(m × n)",
    keyPoints: [
      "Order preserved",
      "Gaps allowed",
      "Used in diff tools",
    ],
  },

  "edit-distance": {
    id: "dp-004",
    name: "Edit Distance",
    slug: "edit-distance",
    category: "Dynamic Programming",
    domain: "DAA",
    difficulty: "Intermediate",
    explanation:
      "Edit Distance (Levenshtein distance) is minimum operations to convert one string to another. Operations: insert, delete, replace. Each costs 1.",
    description:
      "Find minimum edits needed. Allowed: add, remove, change character.",
    timeComplexity: {
      best: "O(m × n)",
      average: "O(m × n)",
      worst: "O(m × n)",
    },
    spaceComplexity: "O(m × n)",
    keyPoints: [
      "Measures string similarity",
      "Used in spell checking",
      "String transformation",
    ],
  },
};

// GREEDY ALGORITHMS
export const GREEDY_ALGORITHMS: Record<string, AlgorithmDetailedInfo> = {
  "activity-selection": {
    id: "greedy-001",
    name: "Activity Selection Problem",
    slug: "activity-selection",
    category: "Greedy Algorithms",
    domain: "DAA",
    difficulty: "Intermediate",
    explanation:
      "Select maximum number of non-overlapping activities. Each activity has start and finish time. Greedy choice: always pick activity that finishes first.",
    description:
      "Sort by finish time. Always select activity finishing first. Choose next activity that starts after previous finishes.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(1)",
    keyPoints: [
      "Greedy works here",
      "Optimal solution guaranteed",
      "Scheduling problem",
    ],
  },

  "fractional-knapsack": {
    id: "greedy-002",
    name: "Fractional Knapsack Problem",
    slug: "fractional-knapsack",
    category: "Greedy Algorithms",
    domain: "DAA",
    difficulty: "Intermediate",
    explanation:
      "Items can be taken partially (fractional). Sort by profit/weight ratio. Take items with highest ratio first to maximize profit.",
    description:
      "Calculate profit/weight for each item. Sort descending. Take items with highest ratio until capacity is full.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(1)",
    keyPoints: [
      "Fractions allowed",
      "Greedy optimal",
      "Sort by ratio",
    ],
  },

  "huffman-coding": {
    id: "greedy-003",
    name: "Huffman Coding",
    slug: "huffman-coding",
    category: "Greedy Algorithms",
    domain: "DAA",
    difficulty: "Intermediate",
    explanation:
      "Lossless data compression algorithm. Assigns shorter codes to frequent characters, longer codes to rare ones. Uses min-priority queue.",
    description:
      "Count character frequencies. Combine lowest frequency characters. Assign binary codes based on tree position.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    keyPoints: [
      "Lossless compression",
      "Optimal for given frequencies",
      "Prefix-free codes",
    ],
  },

  "dijkstra-algorithm": {
    id: "greedy-004",
    name: "Dijkstra's Algorithm",
    slug: "dijkstra-algorithm",
    category: "Greedy Algorithms",
    domain: "DAA",
    difficulty: "Intermediate",
    explanation:
      "Find shortest path from single source to all other vertices. Works with non-negative weights. Always selects unvisited vertex with smallest known distance.",
    description:
      "Start from source. Find nearest unvisited node. Fix its distance. Update neighbors. Repeat.",
    timeComplexity: {
      best: "O(V²)",
      average: "O(E log V)",
      worst: "O(E log V)",
    },
    spaceComplexity: "O(V)",
    keyPoints: [
      "Single-source shortest path",
      "Non-negative weights only",
      "Greedy selection",
    ],
  },

  "kruskal-algorithm": {
    id: "greedy-005",
    name: "Kruskal's Algorithm",
    slug: "kruskal-algorithm",
    category: "Greedy Algorithms",
    domain: "DAA",
    difficulty: "Intermediate",
    explanation:
      "Find Minimum Spanning Tree (MST) by adding smallest edges that don't form cycles. Uses Union-Find for cycle detection.",
    description:
      "Sort edges by weight. Pick smallest edge if it doesn't create cycle. Repeat until V-1 edges selected.",
    timeComplexity: {
      best: "O(E log E)",
      average: "O(E log E)",
      worst: "O(E log E)",
    },
    spaceComplexity: "O(V)",
    keyPoints: [
      "Minimum Spanning Tree",
      "Avoids cycles",
      "Uses Union-Find",
    ],
  },
};

export const DETAILED_ALGORITHMS = {
  ...SEARCHING_ALGORITHMS,
  ...SORTING_ALGORITHMS,
  ...DP_ALGORITHMS,
  ...GREEDY_ALGORITHMS,
};

/**
 * Get detailed information about an algorithm
 */
export function getAlgorithmDetails(slug: string): AlgorithmDetailedInfo | null {
  return DETAILED_ALGORITHMS[slug] || null;
}

/**
 * Get all algorithms in a category
 */
export function getAlgorithmsByCategory(
  category: string
): AlgorithmDetailedInfo[] {
  return Object.values(DETAILED_ALGORITHMS).filter(
    (algo) => algo.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all algorithms in a domain
 */
export function getAlgorithmsByDomain(
  domain: string
): AlgorithmDetailedInfo[] {
  return Object.values(DETAILED_ALGORITHMS).filter(
    (algo) => algo.domain.toLowerCase() === domain.toLowerCase()
  );
}

/**
 * Search algorithms by name or description
 */
export function searchAlgorithms(query: string): AlgorithmDetailedInfo[] {
  const searchTerm = query.toLowerCase();
  return Object.values(DETAILED_ALGORITHMS).filter(
    (algo) =>
      algo.name.toLowerCase().includes(searchTerm) ||
      algo.slug.toLowerCase().includes(searchTerm) ||
      algo.description.toLowerCase().includes(searchTerm) ||
      algo.explanation.toLowerCase().includes(searchTerm)
  );
}
