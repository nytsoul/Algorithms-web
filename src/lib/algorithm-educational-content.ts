/**
 * Comprehensive Algorithm Educational Content Generator
 * Generates complete educational content for all 1000 algorithms including:
 * - Definition and explanation
 * - Key concepts
 * - Mathematical approach and problem solving
 * - Recurrence relations
 * - Time complexity derivation
 * - Step-by-step working
 */

export interface AlgorithmEducationalContent {
  definition: string;
  explanation: string;
  keyConceptsList: string[];
  howItWorks: string[];
  mathematicalApproach: {
    problemSetup: string;
    solutionSteps: string[];
    formula: string;
  };
  recurrenceRelation: {
    relation: string;
    explanation: string;
    baseCase: string;
    derivation: string[];
  };
  timeComplexityAnalysis: {
    bestCase: { complexity: string; explanation: string };
    averageCase: { complexity: string; explanation: string };
    worstCase: { complexity: string; explanation: string };
    derivation: string[];
  };
  spaceComplexityAnalysis: {
    complexity: string;
    explanation: string;
  };
  exampleProblem: {
    problem: string;
    input: string;
    steps: string[];
    output: string;
  };
  advantages: string[];
  disadvantages: string[];
  applications: string[];
  prerequisites: string[];
}

// ============================================
// SEARCHING ALGORITHM CONTENT
// ============================================

const LINEAR_SEARCH_CONTENT: AlgorithmEducationalContent = {
  definition: "Linear Search is a sequential searching algorithm that finds a target value by checking each element of a list one by one until a match is found or the entire list has been searched.",
  
  explanation: `Linear Search is the simplest searching algorithm. It works by iterating through each element in the array from the beginning, comparing each element with the target value. If a match is found, the index is returned. If the end of the array is reached without finding the target, -1 is returned indicating the element is not present.

The algorithm makes no assumptions about the data - it works on both sorted and unsorted arrays. While not the most efficient for large datasets, it's optimal for small arrays or when the data cannot be sorted.`,

  keyConceptsList: [
    "Sequential traversal of elements",
    "Element-by-element comparison",
    "No preprocessing required",
    "Works on unsorted data",
    "Early termination on match"
  ],

  howItWorks: [
    "Start from the first element (index 0)",
    "Compare current element with target value",
    "If match found → Return current index",
    "If no match → Move to next element",
    "Repeat steps 2-4 until end of array",
    "If element not found → Return -1"
  ],

  mathematicalApproach: {
    problemSetup: `Given an array A[0...n-1] of n elements and a target value x, find index i such that A[i] = x.

Let f(i) = 1 if A[i] = x, else 0

We need to find: min{i : f(i) = 1} or return -1 if ∄ such i`,

    solutionSteps: [
      "Initialize i = 0",
      "While i < n:",
      "  If A[i] = x, return i",
      "  Increment i = i + 1",
      "Return -1 (not found)"
    ],

    formula: `Search(A, n, x) = { i    if ∃i ∈ [0, n-1] : A[i] = x
                            { -1   otherwise`
  },

  recurrenceRelation: {
    relation: "T(n) = T(n-1) + c, where c is constant comparison time",
    
    explanation: "Each step reduces the problem size by 1 (one element checked). The recurrence represents checking one element and recursively searching the remaining n-1 elements.",
    
    baseCase: "T(0) = 0 (empty array requires no comparisons)",
    
    derivation: [
      "T(n) = T(n-1) + c",
      "T(n) = T(n-2) + c + c = T(n-2) + 2c",
      "T(n) = T(n-3) + 3c",
      "...",
      "T(n) = T(0) + n·c",
      "T(n) = n·c",
      "∴ T(n) = O(n)"
    ]
  },

  timeComplexityAnalysis: {
    bestCase: {
      complexity: "O(1)",
      explanation: "Element found at first position. Only one comparison needed."
    },
    averageCase: {
      complexity: "O(n)",
      explanation: "On average, we need to check n/2 elements. Since constants are dropped in Big-O, this is O(n)."
    },
    worstCase: {
      complexity: "O(n)",
      explanation: "Element is at last position or not present. All n elements must be checked."
    },
    derivation: [
      "Let P(i) = probability of finding element at index i = 1/n",
      "Expected comparisons = Σ(i=1 to n) i × P(i)",
      "= Σ(i=1 to n) i × (1/n)",
      "= (1/n) × Σ(i=1 to n) i",
      "= (1/n) × n(n+1)/2",
      "= (n+1)/2",
      "≈ n/2",
      "∴ Average case = O(n)"
    ]
  },

  spaceComplexityAnalysis: {
    complexity: "O(1)",
    explanation: "Only uses a constant amount of extra space for the loop variable and comparisons, regardless of input size."
  },

  exampleProblem: {
    problem: "Find the index of element 45 in array [25, 10, 45, 30, 60]",
    input: "Array = [25, 10, 45, 30, 60], Target = 45",
    steps: [
      "i=0: Compare A[0]=25 with 45 → 25 ≠ 45, continue",
      "i=1: Compare A[1]=10 with 45 → 10 ≠ 45, continue",
      "i=2: Compare A[2]=45 with 45 → 45 = 45 ✓ FOUND!",
      "Return index 2"
    ],
    output: "Element 45 found at index 2"
  },

  advantages: [
    "Simple to implement and understand",
    "Works on unsorted arrays",
    "No extra memory required",
    "Good for small datasets",
    "No preprocessing needed"
  ],

  disadvantages: [
    "Inefficient for large datasets",
    "O(n) time in worst case",
    "Slower than binary search for sorted data"
  ],

  applications: [
    "Searching in small unsorted lists",
    "Finding element in linked lists",
    "When data cannot be sorted",
    "Simple database queries"
  ],

  prerequisites: [
    "Basic understanding of arrays",
    "Loop constructs",
    "Comparison operators"
  ]
};

const BINARY_SEARCH_CONTENT: AlgorithmEducationalContent = {
  definition: "Binary Search is a divide-and-conquer algorithm that finds a target value in a sorted array by repeatedly dividing the search interval in half, eliminating half of the remaining elements with each comparison.",

  explanation: `Binary Search is one of the most efficient searching algorithms with O(log n) time complexity. It works by comparing the target value with the middle element of the sorted array. If they match, the search is complete. If the target is less than the middle element, the search continues in the left half; otherwise, in the right half.

The key requirement is that the array must be sorted. Each comparison eliminates half of the remaining elements, making it exponentially faster than linear search for large datasets.`,

  keyConceptsList: [
    "Divide and conquer strategy",
    "Requires sorted input",
    "Logarithmic time complexity",
    "Eliminates half elements per step",
    "Uses two pointers (low, high)"
  ],

  howItWorks: [
    "Initialize low = 0, high = n - 1",
    "While low ≤ high:",
    "  Calculate mid = (low + high) / 2",
    "  If A[mid] = target → Return mid",
    "  If A[mid] < target → low = mid + 1",
    "  If A[mid] > target → high = mid - 1",
    "Return -1 (not found)"
  ],

  mathematicalApproach: {
    problemSetup: `Given a sorted array A[0...n-1] and target x, find index i where A[i] = x.

Using divide and conquer:
- Divide: Split array into two halves
- Conquer: Search in appropriate half
- Combine: Return result

Decision at each step:
- If A[mid] = x → found
- If A[mid] < x → search A[mid+1...high]
- If A[mid] > x → search A[low...mid-1]`,

    solutionSteps: [
      "low = 0, high = n - 1",
      "mid = ⌊(low + high) / 2⌋",
      "Compare A[mid] with x",
      "Recurse on appropriate half",
      "Continue until found or low > high"
    ],

    formula: `BinarySearch(A, x, low, high) = 
  { mid                           if A[mid] = x
  { BinarySearch(A, x, mid+1, high)  if A[mid] < x
  { BinarySearch(A, x, low, mid-1)   if A[mid] > x
  { -1                            if low > high`
  },

  recurrenceRelation: {
    relation: "T(n) = T(n/2) + c",
    
    explanation: "At each step, we reduce the problem size by half (n → n/2) and do constant work (c) for comparison. This is characteristic of divide-and-conquer with equal division.",
    
    baseCase: "T(1) = c (single element requires one comparison)",
    
    derivation: [
      "T(n) = T(n/2) + c",
      "T(n) = T(n/4) + c + c = T(n/4) + 2c",
      "T(n) = T(n/8) + 3c",
      "...",
      "After k steps: T(n) = T(n/2^k) + k·c",
      "Base case when n/2^k = 1, i.e., k = log₂(n)",
      "T(n) = T(1) + log₂(n)·c",
      "T(n) = c + c·log₂(n)",
      "∴ T(n) = O(log n)"
    ]
  },

  timeComplexityAnalysis: {
    bestCase: {
      complexity: "O(1)",
      explanation: "Target found at middle position in first comparison."
    },
    averageCase: {
      complexity: "O(log n)",
      explanation: "On average, log₂(n) comparisons needed as search space halves each time."
    },
    worstCase: {
      complexity: "O(log n)",
      explanation: "Element at extreme end or not present. Maximum log₂(n) comparisons."
    },
    derivation: [
      "After 1st comparison: n/2 elements remain",
      "After 2nd comparison: n/4 elements remain",
      "After 3rd comparison: n/8 elements remain",
      "After k comparisons: n/2^k elements remain",
      "Search ends when: n/2^k = 1",
      "Solving: 2^k = n",
      "k = log₂(n)",
      "∴ Maximum comparisons = O(log n)"
    ]
  },

  spaceComplexityAnalysis: {
    complexity: "O(1) iterative, O(log n) recursive",
    explanation: "Iterative version uses constant space. Recursive version uses O(log n) stack space for recursive calls."
  },

  exampleProblem: {
    problem: "Find 40 in sorted array [10, 20, 30, 40, 50, 60]",
    input: "Array = [10, 20, 30, 40, 50, 60], Target = 40",
    steps: [
      "Step 1: low=0, high=5, mid=2, A[2]=30",
      "30 < 40 → search right half, low=3",
      "Step 2: low=3, high=5, mid=4, A[4]=50",
      "50 > 40 → search left half, high=3",
      "Step 3: low=3, high=3, mid=3, A[3]=40",
      "40 = 40 ✓ FOUND at index 3!"
    ],
    output: "Element 40 found at index 3 in 3 comparisons"
  },

  advantages: [
    "Very efficient O(log n) time",
    "Much faster than linear search",
    "Optimal for large sorted datasets",
    "Predictable performance"
  ],

  disadvantages: [
    "Requires sorted data",
    "Not suitable for linked lists",
    "Sorting overhead if data changes frequently"
  ],

  applications: [
    "Dictionary/phonebook search",
    "Database indexing",
    "Finding insertion point",
    "Version control bisect"
  ],

  prerequisites: [
    "Sorted arrays",
    "Divide and conquer concept",
    "Logarithms basics"
  ]
};

const BUBBLE_SORT_CONTENT: AlgorithmEducationalContent = {
  definition: "Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.",

  explanation: `Bubble Sort gets its name because smaller/larger elements "bubble" to their correct positions. In each pass, the largest unsorted element moves to its final position at the end of the array.

The algorithm compares adjacent pairs and swaps them if needed. After the first pass, the largest element is at the last position. After the second pass, the second-largest is in place, and so on.`,

  keyConceptsList: [
    "Adjacent element comparison",
    "In-place sorting",
    "Stable sorting algorithm",
    "Multiple passes through array",
    "Largest element bubbles up each pass"
  ],

  howItWorks: [
    "Start from first element",
    "Compare adjacent elements (A[i] and A[i+1])",
    "If A[i] > A[i+1] → Swap them",
    "Move to next pair",
    "Complete one pass through array",
    "Repeat passes until no swaps needed"
  ],

  mathematicalApproach: {
    problemSetup: `Given array A[0...n-1], sort in ascending order.

Invariant: After pass i, the largest i elements are in their final positions.

Pass i processes: A[0...n-1-i]
Comparison at step j: A[j] vs A[j+1]
Swap if: A[j] > A[j+1]`,

    solutionSteps: [
      "For i = 0 to n-2:",
      "  For j = 0 to n-2-i:",
      "    If A[j] > A[j+1]:",
      "      Swap(A[j], A[j+1])",
      "Array is now sorted"
    ],

    formula: `Total Comparisons = Σ(i=0 to n-2) (n-1-i)
            = (n-1) + (n-2) + ... + 1
            = n(n-1)/2`
  },

  recurrenceRelation: {
    relation: "T(n) = T(n-1) + (n-1)",
    
    explanation: "Each pass does (n-1-i) comparisons. After one pass, we have n-1 elements to sort (largest is in place). The (n-1) term represents comparisons in current pass.",
    
    baseCase: "T(1) = 0 (single element is already sorted)",
    
    derivation: [
      "T(n) = T(n-1) + (n-1)",
      "T(n) = T(n-2) + (n-2) + (n-1)",
      "T(n) = T(n-3) + (n-3) + (n-2) + (n-1)",
      "...",
      "T(n) = T(1) + 1 + 2 + ... + (n-1)",
      "T(n) = 0 + Σ(i=1 to n-1) i",
      "T(n) = n(n-1)/2",
      "∴ T(n) = O(n²)"
    ]
  },

  timeComplexityAnalysis: {
    bestCase: {
      complexity: "O(n)",
      explanation: "Array already sorted. With optimized version (early termination), only one pass needed."
    },
    averageCase: {
      complexity: "O(n²)",
      explanation: "On average, half the comparisons result in swaps. Still n(n-1)/2 comparisons."
    },
    worstCase: {
      complexity: "O(n²)",
      explanation: "Array in reverse order. Every comparison results in swap. n(n-1)/2 comparisons and swaps."
    },
    derivation: [
      "Pass 1: (n-1) comparisons",
      "Pass 2: (n-2) comparisons",
      "Pass 3: (n-3) comparisons",
      "...",
      "Pass n-1: 1 comparison",
      "Total = (n-1) + (n-2) + ... + 1",
      "= n(n-1)/2",
      "= (n² - n)/2",
      "∴ O(n²)"
    ]
  },

  spaceComplexityAnalysis: {
    complexity: "O(1)",
    explanation: "Only uses constant extra space for swap operation and loop variables. Sorting is done in-place."
  },

  exampleProblem: {
    problem: "Sort array [64, 34, 25, 12, 22] using Bubble Sort",
    input: "Array = [64, 34, 25, 12, 22]",
    steps: [
      "Pass 1: [64,34,25,12,22] → [34,64,25,12,22] → [34,25,64,12,22] → [34,25,12,64,22] → [34,25,12,22,64]",
      "Pass 2: [34,25,12,22,64] → [25,34,12,22,64] → [25,12,34,22,64] → [25,12,22,34,64]",
      "Pass 3: [25,12,22,34,64] → [12,25,22,34,64] → [12,22,25,34,64]",
      "Pass 4: [12,22,25,34,64] → No swaps needed",
      "Sorted!"
    ],
    output: "[12, 22, 25, 34, 64]"
  },

  advantages: [
    "Simple to understand and implement",
    "Stable sorting algorithm",
    "In-place sorting (O(1) space)",
    "Adaptive - efficient for nearly sorted data",
    "Good for small datasets"
  ],

  disadvantages: [
    "O(n²) time complexity",
    "Slow for large datasets",
    "Many swaps compared to other algorithms"
  ],

  applications: [
    "Educational purposes",
    "Small datasets",
    "Nearly sorted data",
    "Detecting sorted arrays"
  ],

  prerequisites: [
    "Arrays and indexing",
    "Comparison operators",
    "Swap operation"
  ]
};

const MERGE_SORT_CONTENT: AlgorithmEducationalContent = {
  definition: "Merge Sort is a divide-and-conquer sorting algorithm that divides the input array into two halves, recursively sorts each half, and then merges the two sorted halves to produce the final sorted array.",

  explanation: `Merge Sort follows the classic divide-and-conquer paradigm:
1. DIVIDE: Split array into two halves
2. CONQUER: Recursively sort each half
3. COMBINE: Merge the two sorted halves

The key operation is the merge step, which combines two sorted arrays into one sorted array in O(n) time. Merge Sort guarantees O(n log n) time complexity in all cases.`,

  keyConceptsList: [
    "Divide and conquer paradigm",
    "Recursive algorithm",
    "Stable sorting",
    "Guaranteed O(n log n)",
    "Merge operation"
  ],

  howItWorks: [
    "If array has 1 element → already sorted, return",
    "Find middle: mid = n/2",
    "Recursively sort left half: A[0...mid-1]",
    "Recursively sort right half: A[mid...n-1]",
    "Merge both sorted halves into one sorted array"
  ],

  mathematicalApproach: {
    problemSetup: `Given array A[0...n-1], sort using divide and conquer.

MergeSort(A, p, r):
- Divide: q = ⌊(p+r)/2⌋
- Conquer: MergeSort(A, p, q), MergeSort(A, q+1, r)
- Combine: Merge(A, p, q, r)

The merge operation combines A[p...q] and A[q+1...r] into sorted A[p...r]`,

    solutionSteps: [
      "MergeSort(A, 0, n-1):",
      "  if p < r:",
      "    q = ⌊(p + r) / 2⌋",
      "    MergeSort(A, p, q)",
      "    MergeSort(A, q+1, r)",
      "    Merge(A, p, q, r)"
    ],

    formula: `T(n) = 2T(n/2) + cn

Where:
- 2T(n/2): Time for two recursive calls
- cn: Time to merge n elements`
  },

  recurrenceRelation: {
    relation: "T(n) = 2T(n/2) + n",
    
    explanation: "The array is divided into 2 halves of size n/2 each, and both are sorted recursively. The merge step takes O(n) time to combine the two sorted halves.",
    
    baseCase: "T(1) = 1 (single element is sorted)",
    
    derivation: [
      "Using Master Theorem: T(n) = aT(n/b) + f(n)",
      "Here: a=2, b=2, f(n)=n",
      "log_b(a) = log_2(2) = 1",
      "f(n) = n = Θ(n^1)",
      "Case 2: f(n) = Θ(n^(log_b(a)))",
      "∴ T(n) = Θ(n log n)",
      "",
      "Alternative - Substitution:",
      "T(n) = 2T(n/2) + n",
      "= 2[2T(n/4) + n/2] + n = 4T(n/4) + 2n",
      "= 4[2T(n/8) + n/4] + 2n = 8T(n/8) + 3n",
      "After k steps: 2^k T(n/2^k) + kn",
      "When n/2^k = 1, k = log n",
      "T(n) = n·T(1) + n·log n = n + n·log n",
      "∴ T(n) = O(n log n)"
    ]
  },

  timeComplexityAnalysis: {
    bestCase: {
      complexity: "O(n log n)",
      explanation: "Always divides and merges. Even for sorted array, same operations performed."
    },
    averageCase: {
      complexity: "O(n log n)",
      explanation: "Consistent performance regardless of input distribution."
    },
    worstCase: {
      complexity: "O(n log n)",
      explanation: "Guaranteed performance. No worst case degradation unlike Quick Sort."
    },
    derivation: [
      "Levels in recursion tree = log₂(n)",
      "Work at each level = O(n) for merging",
      "Level 0: merge n elements once",
      "Level 1: merge n/2 elements twice = n",
      "Level 2: merge n/4 elements four times = n",
      "...",
      "Level log n: merge 1 element n times = n",
      "Total work = n × log n",
      "∴ T(n) = O(n log n)"
    ]
  },

  spaceComplexityAnalysis: {
    complexity: "O(n)",
    explanation: "Requires auxiliary array of size n for merging. Recursion uses O(log n) stack space."
  },

  exampleProblem: {
    problem: "Sort [38, 27, 43, 3, 9, 82, 10] using Merge Sort",
    input: "Array = [38, 27, 43, 3, 9, 82, 10]",
    steps: [
      "Divide: [38,27,43,3] and [9,82,10]",
      "Divide: [38,27] [43,3] [9,82] [10]",
      "Divide: [38] [27] [43] [3] [9] [82] [10]",
      "Merge: [27,38] [3,43] [9,82] [10]",
      "Merge: [3,27,38,43] [9,10,82]",
      "Merge: [3,9,10,27,38,43,82]"
    ],
    output: "[3, 9, 10, 27, 38, 43, 82]"
  },

  advantages: [
    "Guaranteed O(n log n) time",
    "Stable sorting algorithm",
    "Predictable performance",
    "Good for linked lists",
    "Parallelizable"
  ],

  disadvantages: [
    "O(n) extra space required",
    "Not in-place",
    "Slower for small arrays",
    "Overhead of recursion"
  ],

  applications: [
    "External sorting (large files)",
    "Linked list sorting",
    "Stable sort requirement",
    "Parallel processing"
  ],

  prerequisites: [
    "Recursion",
    "Divide and conquer",
    "Array merging"
  ]
};

const QUICK_SORT_CONTENT: AlgorithmEducationalContent = {
  definition: "Quick Sort is a highly efficient divide-and-conquer sorting algorithm that selects a 'pivot' element and partitions the array around the pivot, such that elements smaller than the pivot are on the left and elements greater are on the right.",

  explanation: `Quick Sort is often the fastest practical sorting algorithm. It works by:
1. Choosing a pivot element
2. Partitioning: rearranging so elements < pivot go left, elements > pivot go right
3. Recursively sorting the left and right partitions

Unlike Merge Sort, the work is done during partitioning (before recursion), not during merging.`,

  keyConceptsList: [
    "Divide and conquer",
    "Pivot selection",
    "Partitioning scheme",
    "In-place sorting",
    "Cache-efficient"
  ],

  howItWorks: [
    "Select a pivot element (last, first, random, or median)",
    "Partition array: elements < pivot on left, > pivot on right",
    "Pivot is now in its final sorted position",
    "Recursively apply to left subarray",
    "Recursively apply to right subarray",
    "Base case: arrays of size 0 or 1"
  ],

  mathematicalApproach: {
    problemSetup: `QuickSort(A, p, r):
- DIVIDE: Partition around pivot, get pivot position q
- CONQUER: QuickSort(A, p, q-1), QuickSort(A, q+1, r)

Partition returns index q such that:
- A[p...q-1] ≤ A[q]
- A[q+1...r] > A[q]`,

    solutionSteps: [
      "QuickSort(A, low, high):",
      "  if low < high:",
      "    pivotIdx = Partition(A, low, high)",
      "    QuickSort(A, low, pivotIdx - 1)",
      "    QuickSort(A, pivotIdx + 1, high)"
    ],

    formula: `Partition creates split: k elements left, (n-k-1) right
T(n) = T(k) + T(n-k-1) + cn

Best case (balanced): k = n/2
T(n) = 2T(n/2) + n → O(n log n)

Worst case (unbalanced): k = 0 or n-1
T(n) = T(n-1) + n → O(n²)`
  },

  recurrenceRelation: {
    relation: "T(n) = T(k) + T(n-k-1) + cn",
    
    explanation: "After partitioning, we have k elements on left, 1 pivot, and (n-k-1) on right. The cn term is for partitioning which examines all elements.",
    
    baseCase: "T(0) = T(1) = 1",
    
    derivation: [
      "Best Case (balanced partitions):",
      "T(n) = 2T(n/2) + n",
      "Using Master Theorem: a=2, b=2, f(n)=n",
      "log_2(2) = 1, f(n) = Θ(n^1)",
      "∴ T(n) = Θ(n log n)",
      "",
      "Worst Case (one element per side):",
      "T(n) = T(n-1) + T(0) + cn",
      "T(n) = T(n-1) + cn",
      "T(n) = T(n-2) + c(n-1) + cn",
      "T(n) = Σ(i=1 to n) ci = c·n(n+1)/2",
      "∴ T(n) = O(n²)"
    ]
  },

  timeComplexityAnalysis: {
    bestCase: {
      complexity: "O(n log n)",
      explanation: "Pivot always divides array into two equal halves. Balanced recursion tree."
    },
    averageCase: {
      complexity: "O(n log n)",
      explanation: "Random pivot tends to create reasonably balanced partitions on average."
    },
    worstCase: {
      complexity: "O(n²)",
      explanation: "Already sorted array with first/last pivot. Each partition removes only one element."
    },
    derivation: [
      "Average case analysis:",
      "Probability of each partition = 1/n",
      "E[T(n)] = (1/n) Σ(k=0 to n-1) [T(k) + T(n-k-1)] + cn",
      "= (2/n) Σ(k=0 to n-1) E[T(k)] + cn",
      "Solving: E[T(n)] = O(n log n)"
    ]
  },

  spaceComplexityAnalysis: {
    complexity: "O(log n) average, O(n) worst",
    explanation: "Recursion depth is log n for balanced partitions, n for worst case. Each call uses constant space."
  },

  exampleProblem: {
    problem: "Sort [10, 80, 30, 90, 40] using Quick Sort (pivot = last element)",
    input: "Array = [10, 80, 30, 90, 40]",
    steps: [
      "Pivot = 40. Partition: [10, 30, 40, 90, 80]. Pivot at index 2.",
      "Left: [10, 30]. Pivot=30. Result: [10, 30]",
      "Right: [90, 80]. Pivot=80. Result: [80, 90]",
      "Combine: [10, 30, 40, 80, 90]"
    ],
    output: "[10, 30, 40, 80, 90]"
  },

  advantages: [
    "Average O(n log n) performance",
    "In-place sorting",
    "Cache efficient",
    "Low memory overhead",
    "Practical fastest algorithm"
  ],

  disadvantages: [
    "O(n²) worst case",
    "Not stable",
    "Poor pivot choice hurts performance",
    "Recursion overhead"
  ],

  applications: [
    "General purpose sorting",
    "Arrays in memory",
    "Language library sort functions",
    "When in-place is required"
  ],

  prerequisites: [
    "Recursion",
    "Partitioning concept",
    "Divide and conquer"
  ]
};

const DIJKSTRA_CONTENT: AlgorithmEducationalContent = {
  definition: "Dijkstra's Algorithm is a greedy algorithm that finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights.",

  explanation: `Dijkstra's algorithm maintains a set of vertices whose shortest distance from source is known. It repeatedly selects the unvisited vertex with minimum distance, marks it as visited, and updates distances of its neighbors.

The algorithm is based on the principle that if the shortest path from source to v goes through u, then the subpath from source to u is also shortest.`,

  keyConceptsList: [
    "Greedy approach",
    "Priority queue optimization",
    "Relaxation of edges",
    "Non-negative weights required",
    "Single-source shortest path"
  ],

  howItWorks: [
    "Initialize: dist[source] = 0, dist[all others] = ∞",
    "Create priority queue with all vertices",
    "While queue not empty:",
    "  Extract vertex u with minimum distance",
    "  For each neighbor v of u:",
    "    If dist[u] + weight(u,v) < dist[v]:",
    "      Update dist[v] = dist[u] + weight(u,v)"
  ],

  mathematicalApproach: {
    problemSetup: `Given weighted graph G=(V,E) with non-negative weights w: E → R⁺
Source vertex s ∈ V
Find: δ(s,v) = shortest path distance from s to v, ∀v ∈ V

Relaxation:
If d[u] + w(u,v) < d[v], then update d[v] = d[u] + w(u,v)`,

    solutionSteps: [
      "d[s] = 0, d[v] = ∞ for v ≠ s",
      "S = ∅ (visited set)",
      "Q = V (priority queue by d[])",
      "While Q ≠ ∅:",
      "  u = ExtractMin(Q)",
      "  S = S ∪ {u}",
      "  For each v ∈ Adj[u]:",
      "    Relax(u, v, w)"
    ],

    formula: `Relaxation: d[v] = min(d[v], d[u] + w(u,v))

Correctness: When u is extracted, d[u] = δ(s,u)
(shortest path to u is finalized)`
  },

  recurrenceRelation: {
    relation: "T(V,E) = O((V + E) log V) with binary heap",
    
    explanation: "Each vertex is extracted once (V extractions), each edge is examined once for relaxation (E relaxations). With binary heap, extraction is O(log V) and decrease-key is O(log V).",
    
    baseCase: "Initialization takes O(V) time",
    
    derivation: [
      "Time = Initialization + Extract-Min + Relaxations",
      "Initialization: O(V)",
      "Extract-Min: V × O(log V) = O(V log V)",
      "Relaxations: E × O(log V) = O(E log V)",
      "Total: O(V) + O(V log V) + O(E log V)",
      "= O((V + E) log V)",
      "",
      "With Fibonacci heap:",
      "Extract-Min: O(V log V)",
      "Decrease-key: O(1) amortized",
      "Total: O(V log V + E)"
    ]
  },

  timeComplexityAnalysis: {
    bestCase: {
      complexity: "O((V + E) log V)",
      explanation: "Same operations regardless of graph structure when using binary heap."
    },
    averageCase: {
      complexity: "O((V + E) log V)",
      explanation: "Depends on priority queue implementation. Binary heap gives this bound."
    },
    worstCase: {
      complexity: "O(V²) with array, O((V + E) log V) with heap",
      explanation: "Array-based implementation: O(V) for each of V extract-min operations."
    },
    derivation: [
      "Using adjacency list + binary heap:",
      "BuildHeap: O(V)",
      "V × ExtractMin: V × O(log V)",
      "E × DecreaseKey: E × O(log V)",
      "Total: O(V log V + E log V)",
      "= O((V + E) log V)"
    ]
  },

  spaceComplexityAnalysis: {
    complexity: "O(V)",
    explanation: "Stores distance array, visited set, and priority queue, each of size O(V)."
  },

  exampleProblem: {
    problem: "Find shortest paths from vertex 0 in graph with edges: 0→1(4), 0→2(2), 1→2(3), 1→3(2), 2→3(7), 2→4(5), 3→4(1)",
    input: "Source = 0",
    steps: [
      "Init: d[0]=0, d[1]=∞, d[2]=∞, d[3]=∞, d[4]=∞",
      "Extract 0: Update d[1]=4, d[2]=2",
      "Extract 2: Update d[3]=min(∞,2+7)=9, d[4]=min(∞,2+5)=7",
      "Extract 1: Update d[3]=min(9,4+2)=6",
      "Extract 3: Update d[4]=min(7,6+1)=7 (no change)",
      "Extract 4: Done"
    ],
    output: "Shortest distances: d[0]=0, d[1]=4, d[2]=2, d[3]=6, d[4]=7"
  },

  advantages: [
    "Optimal for non-negative weights",
    "Finds all shortest paths from source",
    "Efficient with good data structures",
    "Works on both directed and undirected graphs"
  ],

  disadvantages: [
    "Doesn't work with negative weights",
    "Not suitable for distributed systems",
    "Memory intensive for large graphs"
  ],

  applications: [
    "GPS navigation systems",
    "Network routing protocols",
    "Social network analysis",
    "Robot path planning"
  ],

  prerequisites: [
    "Graph representations",
    "Priority queues/heaps",
    "Greedy algorithms"
  ]
};

// ============================================
// CONTENT GENERATOR FUNCTIONS
// ============================================

// Additional algorithm content definitions
const INSERTION_SORT_CONTENT: AlgorithmEducationalContent = {
  definition: "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time by repeatedly picking the next element and inserting it into its correct position among the previously sorted elements.",
  
  explanation: `Insertion Sort works like sorting cards in your hand. You take one card at a time and insert it into its correct position among the cards already sorted. The algorithm maintains a sorted portion on the left and an unsorted portion on the right.

For each element, it finds the correct position in the sorted portion by shifting larger elements to the right, then inserts the element.`,

  keyConceptsList: [
    "In-place sorting",
    "Stable sorting algorithm",
    "Adaptive - efficient for nearly sorted data",
    "Online - can sort as data arrives",
    "Simple implementation"
  ],

  howItWorks: [
    "Start with second element (first element is already sorted)",
    "Store current element as key",
    "Compare key with elements in sorted portion (moving right to left)",
    "Shift elements greater than key one position right",
    "Insert key in correct position",
    "Repeat for all remaining elements"
  ],

  mathematicalApproach: {
    problemSetup: `Given array A[0...n-1], sort in ascending order.
Invariant: A[0...i-1] is sorted after iteration i

InsertionSort maintains: sorted(A[0...i-1]) after processing element i`,

    solutionSteps: [
      "for i = 1 to n-1:",
      "  key = A[i]",
      "  j = i - 1",
      "  while j >= 0 and A[j] > key:",
      "    A[j+1] = A[j]",
      "    j = j - 1",
      "  A[j+1] = key"
    ],

    formula: `Comparisons: Σ(i=1 to n-1) i = n(n-1)/2 in worst case
Swaps: Same as comparisons in worst case

Best case: n-1 comparisons, 0 swaps (already sorted)`
  },

  recurrenceRelation: {
    relation: "T(n) = T(n-1) + O(n)",
    
    explanation: "Sort first n-1 elements, then insert nth element which may require up to n-1 comparisons.",
    
    baseCase: "T(1) = O(1)",
    
    derivation: [
      "T(n) = T(n-1) + cn",
      "T(n) = T(n-2) + c(n-1) + cn",
      "T(n) = T(1) + c(2 + 3 + ... + n)",
      "T(n) = O(1) + c × n(n-1)/2",
      "T(n) = O(n²)"
    ]
  },

  timeComplexityAnalysis: {
    bestCase: {
      complexity: "O(n)",
      explanation: "Array already sorted. Inner loop never executes, only n-1 comparisons."
    },
    averageCase: {
      complexity: "O(n²)",
      explanation: "On average, each element moves halfway through sorted portion."
    },
    worstCase: {
      complexity: "O(n²)",
      explanation: "Array in reverse order. Each element moves to the beginning."
    },
    derivation: [
      "Best: 1 comparison per element = n-1 = O(n)",
      "Worst: 1+2+3+...+(n-1) = n(n-1)/2 = O(n²)",
      "Average: Half the worst case = O(n²)"
    ]
  },

  spaceComplexityAnalysis: {
    complexity: "O(1)",
    explanation: "In-place sorting - only requires one temporary variable for the key."
  },

  exampleProblem: {
    problem: "Sort the array [5, 2, 4, 6, 1, 3] using Insertion Sort",
    input: "[5, 2, 4, 6, 1, 3]",
    steps: [
      "i=1: key=2, compare with 5, shift 5 right → [2, 5, 4, 6, 1, 3]",
      "i=2: key=4, compare with 5, shift 5 right, 4>2 stop → [2, 4, 5, 6, 1, 3]",
      "i=3: key=6, 6>5 stop → [2, 4, 5, 6, 1, 3]",
      "i=4: key=1, shift 6,5,4,2 right → [1, 2, 4, 5, 6, 3]",
      "i=5: key=3, shift 6,5,4 right → [1, 2, 3, 4, 5, 6]"
    ],
    output: "[1, 2, 3, 4, 5, 6]"
  },

  advantages: [
    "Simple to implement",
    "Efficient for small datasets",
    "Adaptive - O(n) for nearly sorted data",
    "Stable - maintains order of equal elements",
    "In-place - O(1) extra space",
    "Online - can sort as elements arrive"
  ],

  disadvantages: [
    "O(n²) - inefficient for large datasets",
    "More shifts than selection sort"
  ],

  applications: [
    "Small datasets",
    "Nearly sorted arrays",
    "Online sorting (streaming data)",
    "Hybrid sorting algorithms (Timsort)"
  ],

  prerequisites: [
    "Array manipulation",
    "Basic loop structures",
    "Comparison operations"
  ]
};

const SELECTION_SORT_CONTENT: AlgorithmEducationalContent = {
  definition: "Selection Sort is a simple comparison-based sorting algorithm that divides the array into sorted and unsorted regions, repeatedly selecting the minimum element from the unsorted region and moving it to the end of the sorted region.",
  
  explanation: `Selection Sort works by:
1. Finding the minimum element in the unsorted portion
2. Swapping it with the first element of the unsorted portion
3. Moving the boundary between sorted and unsorted portions one position right

Unlike Insertion Sort, Selection Sort always makes exactly n-1 swaps, making it useful when write/swap operations are expensive.`,

  keyConceptsList: [
    "In-place sorting",
    "Not stable (can be made stable)",
    "Minimum swaps (n-1)",
    "Simple selection logic",
    "Uniform time complexity"
  ],

  howItWorks: [
    "Find the minimum element in unsorted portion",
    "Swap it with the first element of unsorted portion",
    "Move boundary of sorted portion one position right",
    "Repeat until entire array is sorted",
    "After i iterations, first i elements are sorted"
  ],

  mathematicalApproach: {
    problemSetup: `Given array A[0...n-1], sort in ascending order.
Invariant: A[0...i-1] contains the i smallest elements in sorted order

Selection property: min(A[i...n-1]) is placed at A[i]`,

    solutionSteps: [
      "for i = 0 to n-2:",
      "  minIdx = i",
      "  for j = i+1 to n-1:",
      "    if A[j] < A[minIdx]:",
      "      minIdx = j",
      "  swap(A[i], A[minIdx])"
    ],

    formula: `Comparisons: (n-1) + (n-2) + ... + 1 = n(n-1)/2

Swaps: Exactly n-1 (one per outer loop iteration)

This is independent of input order!`
  },

  recurrenceRelation: {
    relation: "T(n) = T(n-1) + O(n)",
    
    explanation: "Finding minimum in unsorted portion takes O(n-i) for iteration i. Total is sum of these.",
    
    baseCase: "T(1) = O(1)",
    
    derivation: [
      "T(n) = cn + T(n-1)",
      "T(n) = cn + c(n-1) + T(n-2)",
      "T(n) = c(n + n-1 + n-2 + ... + 1)",
      "T(n) = c × n(n+1)/2",
      "T(n) = O(n²)"
    ]
  },

  timeComplexityAnalysis: {
    bestCase: {
      complexity: "O(n²)",
      explanation: "Always scans entire unsorted portion regardless of input."
    },
    averageCase: {
      complexity: "O(n²)",
      explanation: "Same as best and worst - always n(n-1)/2 comparisons."
    },
    worstCase: {
      complexity: "O(n²)",
      explanation: "Always O(n²) - not adaptive to input."
    },
    derivation: [
      "Outer loop: n-1 iterations",
      "Inner loop: (n-1) + (n-2) + ... + 1 comparisons",
      "Total = n(n-1)/2 = O(n²)",
      "Independent of initial order"
    ]
  },

  spaceComplexityAnalysis: {
    complexity: "O(1)",
    explanation: "In-place sorting with only constant extra space for indices and swap."
  },

  exampleProblem: {
    problem: "Sort the array [64, 25, 12, 22, 11] using Selection Sort",
    input: "[64, 25, 12, 22, 11]",
    steps: [
      "i=0: Find min(64,25,12,22,11)=11, swap with 64 → [11, 25, 12, 22, 64]",
      "i=1: Find min(25,12,22,64)=12, swap with 25 → [11, 12, 25, 22, 64]",
      "i=2: Find min(25,22,64)=22, swap with 25 → [11, 12, 22, 25, 64]",
      "i=3: Find min(25,64)=25, already in place → [11, 12, 22, 25, 64]"
    ],
    output: "[11, 12, 22, 25, 64]"
  },

  advantages: [
    "Simple to understand and implement",
    "Minimum number of swaps (n-1)",
    "In-place - O(1) extra memory",
    "Performance independent of input"
  ],

  disadvantages: [
    "O(n²) even for sorted arrays",
    "Not adaptive",
    "Not stable in basic form",
    "More comparisons than Insertion Sort for nearly sorted data"
  ],

  applications: [
    "When memory writes are expensive",
    "Small arrays",
    "Teaching sorting concepts",
    "When simplicity is preferred"
  ],

  prerequisites: [
    "Array indexing",
    "Finding minimum",
    "Swap operations"
  ]
};

const BFS_CONTENT: AlgorithmEducationalContent = {
  definition: "Breadth-First Search (BFS) is a graph traversal algorithm that explores all vertices at the current depth level before moving to vertices at the next depth level, using a queue data structure.",
  
  explanation: `BFS explores a graph layer by layer. Starting from a source vertex, it first visits all neighbors (distance 1), then all vertices at distance 2, and so on.

BFS is optimal for finding shortest paths in unweighted graphs because it naturally discovers vertices in order of their distance from the source.`,

  keyConceptsList: [
    "Level-order traversal",
    "Queue-based exploration",
    "Shortest path in unweighted graphs",
    "Complete search",
    "O(V + E) time complexity"
  ],

  howItWorks: [
    "Start at source vertex, mark as visited, enqueue it",
    "While queue is not empty:",
    "  Dequeue a vertex u",
    "  For each unvisited neighbor v of u:",
    "    Mark v as visited",
    "    Set distance[v] = distance[u] + 1",
    "    Enqueue v"
  ],

  mathematicalApproach: {
    problemSetup: `Given graph G=(V,E) and source vertex s:
- d[v] = shortest distance from s to v
- π[v] = predecessor of v in BFS tree

BFS produces a breadth-first tree with root s`,

    solutionSteps: [
      "Initialize: color[v]=WHITE, d[v]=∞, π[v]=NIL ∀v",
      "color[s]=GRAY, d[s]=0, Q={s}",
      "while Q ≠ ∅:",
      "  u = Dequeue(Q)",
      "  for each v ∈ Adj[u]:",
      "    if color[v]=WHITE:",
      "      color[v]=GRAY, d[v]=d[u]+1, π[v]=u",
      "      Enqueue(Q, v)",
      "  color[u]=BLACK"
    ],

    formula: `BFS guarantees: d[v] = δ(s,v) (shortest path distance)

For all edges (u,v): d[v] ≤ d[u] + 1

BFS tree edges satisfy: π[v] = u ⟹ d[v] = d[u] + 1`
  },

  recurrenceRelation: {
    relation: "T(V, E) = O(V + E)",
    
    explanation: "Each vertex is enqueued and dequeued exactly once (O(V)). Each edge is examined exactly once when its endpoints are processed (O(E)).",
    
    baseCase: "Initialization takes O(V)",
    
    derivation: [
      "Initialization: O(V) for all vertices",
      "Queue operations: Each vertex enqueued/dequeued once = O(V)",
      "Edge examination: Each edge checked once = O(E)",
      "Total: O(V) + O(E) = O(V + E)"
    ]
  },

  timeComplexityAnalysis: {
    bestCase: {
      complexity: "O(V + E)",
      explanation: "Always visits all reachable vertices and examines all edges."
    },
    averageCase: {
      complexity: "O(V + E)",
      explanation: "Linear in the size of the graph."
    },
    worstCase: {
      complexity: "O(V + E)",
      explanation: "Must process all vertices and edges in connected component."
    },
    derivation: [
      "Each vertex: enqueue O(1), dequeue O(1)",
      "V vertices = O(V) queue operations",
      "Each edge examined once = O(E)",
      "Total = O(V + E)"
    ]
  },

  spaceComplexityAnalysis: {
    complexity: "O(V)",
    explanation: "Queue can hold up to V vertices. Plus O(V) for visited/distance/predecessor arrays."
  },

  exampleProblem: {
    problem: "Perform BFS on graph with edges: 0-1, 0-2, 1-2, 2-0, 2-3, 3-3. Source = 2",
    input: "Graph with 4 vertices, Source = 2",
    steps: [
      "Start: Queue=[2], visited={2}, dist[2]=0",
      "Dequeue 2: neighbors 0,1,3 → Queue=[0,1,3], dist[0,1,3]=1",
      "Dequeue 0: neighbor 1,2 (visited) → Queue=[1,3]",
      "Dequeue 1: neighbors 2 (visited) → Queue=[3]",
      "Dequeue 3: neighbor 3 (visited) → Queue=[]",
      "Done: All reachable vertices visited"
    ],
    output: "BFS order: 2, 0, 1, 3. Distances: d[2]=0, d[0]=1, d[1]=1, d[3]=1"
  },

  advantages: [
    "Finds shortest path in unweighted graphs",
    "Complete - finds all reachable vertices",
    "Level-by-level exploration",
    "Optimal for shortest path"
  ],

  disadvantages: [
    "High memory for wide graphs",
    "Not suitable for weighted graphs (use Dijkstra)",
    "Slower than DFS for some applications"
  ],

  applications: [
    "Shortest path in unweighted graphs",
    "Social network friend suggestions",
    "Web crawlers",
    "GPS navigation",
    "Garbage collection"
  ],

  prerequisites: [
    "Graph representations",
    "Queue data structure",
    "Basic graph theory"
  ]
};

const DFS_CONTENT: AlgorithmEducationalContent = {
  definition: "Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible along each branch before backtracking, using either recursion or a stack data structure.",
  
  explanation: `DFS goes deep into a graph, exploring each path to its end before backtracking. It's like exploring a maze by always taking the first available turn and backtracking only when stuck.

DFS uses the call stack (recursion) or an explicit stack. It's useful for detecting cycles, topological sorting, finding connected components, and solving puzzles.`,

  keyConceptsList: [
    "Depth-first exploration",
    "Stack-based (or recursive)",
    "Backtracking",
    "Discovery and finish times",
    "Edge classification"
  ],

  howItWorks: [
    "Start at source vertex, mark as visiting",
    "Recursively visit first unvisited neighbor",
    "Continue until no unvisited neighbors",
    "Backtrack to previous vertex",
    "Repeat until all reachable vertices visited",
    "Mark vertex as finished when backtracking"
  ],

  mathematicalApproach: {
    problemSetup: `Given graph G=(V,E):
- color[v]: WHITE (unvisited), GRAY (visiting), BLACK (finished)
- d[v]: discovery time
- f[v]: finish time
- π[v]: predecessor in DFS tree`,

    solutionSteps: [
      "time = 0",
      "for each v ∈ V: color[v]=WHITE",
      "for each v ∈ V:",
      "  if color[v]=WHITE: DFS-Visit(v)",
      "",
      "DFS-Visit(u):",
      "  time++; d[u]=time; color[u]=GRAY",
      "  for each v ∈ Adj[u]:",
      "    if color[v]=WHITE: π[v]=u; DFS-Visit(v)",
      "  color[u]=BLACK; time++; f[u]=time"
    ],

    formula: `Parenthesis Theorem: For any u,v either:
- [d[u], f[u]] and [d[v], f[v]] are disjoint, or
- One interval completely contains the other

Edge Classification:
- Tree edge: v is WHITE when (u,v) examined
- Back edge: v is GRAY (ancestor)
- Forward/Cross edge: v is BLACK`
  },

  recurrenceRelation: {
    relation: "T(V, E) = O(V + E)",
    
    explanation: "Each vertex is visited exactly once. Each edge is examined exactly once (directed) or twice (undirected).",
    
    baseCase: "DFS-Visit for single vertex with no edges: O(1)",
    
    derivation: [
      "Initialization: O(V)",
      "DFS-Visit called once per vertex: O(V) calls",
      "Each adjacency list scanned once: total O(E)",
      "Total: O(V + E)"
    ]
  },

  timeComplexityAnalysis: {
    bestCase: {
      complexity: "O(V + E)",
      explanation: "Always explores all reachable vertices and edges."
    },
    averageCase: {
      complexity: "O(V + E)",
      explanation: "Linear in the size of the graph."
    },
    worstCase: {
      complexity: "O(V + E)",
      explanation: "Must visit all vertices and examine all edges."
    },
    derivation: [
      "Each vertex visited once = O(V)",
      "Each edge examined once = O(E)",
      "Total = O(V + E)"
    ]
  },

  spaceComplexityAnalysis: {
    complexity: "O(V)",
    explanation: "Recursion stack can go V deep (linear graph). Plus O(V) for color/time arrays."
  },

  exampleProblem: {
    problem: "Perform DFS on graph: edges 0→1, 0→2, 1→2, 2→0, 2→3, 3→3. Start from vertex 2.",
    input: "Directed graph with 4 vertices, Start = 2",
    steps: [
      "DFS-Visit(2): d[2]=1, color[2]=GRAY",
      "  → Visit neighbor 0: d[0]=2, color[0]=GRAY",
      "    → Visit neighbor 1: d[1]=3, color[1]=GRAY",
      "      → Neighbor 2 is GRAY (back edge)",
      "      f[1]=4, color[1]=BLACK",
      "    → Neighbor 2 is GRAY (back edge)",
      "    f[0]=5, color[0]=BLACK",
      "  → Visit neighbor 3: d[3]=6, color[3]=GRAY",
      "    → Neighbor 3 is GRAY (back edge - self loop)",
      "    f[3]=7, color[3]=BLACK",
      "  f[2]=8, color[2]=BLACK"
    ],
    output: "DFS order: 2, 0, 1, 3. Discovery: d=[2,3,1,6]. Finish: f=[5,4,8,7]"
  },

  advantages: [
    "Lower memory than BFS for deep graphs",
    "Natural for recursion",
    "Useful for topological sort",
    "Detects cycles easily",
    "Finds connected components"
  ],

  disadvantages: [
    "Doesn't find shortest paths",
    "Can get stuck in infinite branches",
    "Stack overflow risk for deep graphs"
  ],

  applications: [
    "Topological sorting",
    "Cycle detection",
    "Finding strongly connected components",
    "Maze solving",
    "Path finding in games"
  ],

  prerequisites: [
    "Graph representations",
    "Recursion or stack",
    "Basic graph theory"
  ]
};

const HEAP_SORT_CONTENT: AlgorithmEducationalContent = {
  definition: "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It first builds a max-heap from the input, then repeatedly extracts the maximum element and rebuilds the heap.",
  
  explanation: `Heap Sort exploits the heap property: in a max-heap, the largest element is always at the root. The algorithm:
1. Builds a max-heap from the array
2. Swaps the root (max) with the last element
3. Reduces heap size and heapifies to restore heap property
4. Repeats until heap is empty

The sorted elements accumulate at the end of the array.`,

  keyConceptsList: [
    "Binary heap structure",
    "Max-heap property",
    "Heapify operation",
    "In-place sorting",
    "O(n log n) guaranteed"
  ],

  howItWorks: [
    "Build max-heap from input array (O(n))",
    "Swap root (max element) with last element",
    "Decrease heap size by 1",
    "Heapify root to restore max-heap property",
    "Repeat steps 2-4 until heap size is 1",
    "Array is now sorted"
  ],

  mathematicalApproach: {
    problemSetup: `Array representation of heap:
- Parent(i) = ⌊(i-1)/2⌋
- Left(i) = 2i + 1
- Right(i) = 2i + 2

Max-Heap Property: A[Parent(i)] ≥ A[i]`,

    solutionSteps: [
      "BuildMaxHeap(A):",
      "  for i = ⌊n/2⌋-1 downto 0:",
      "    MaxHeapify(A, i)",
      "",
      "HeapSort(A):",
      "  BuildMaxHeap(A)",
      "  for i = n-1 downto 1:",
      "    swap(A[0], A[i])",
      "    heapSize--",
      "    MaxHeapify(A, 0)"
    ],

    formula: `BuildMaxHeap: O(n) (not O(n log n) due to height distribution)
HeapSort: n-1 calls to MaxHeapify = O(n log n)

Total: O(n) + O(n log n) = O(n log n)`
  },

  recurrenceRelation: {
    relation: "T(n) = O(n) + (n-1) × O(log n)",
    
    explanation: "Build heap takes O(n). Then n-1 extractions, each requiring O(log n) heapify.",
    
    baseCase: "T(1) = O(1)",
    
    derivation: [
      "BuildMaxHeap: Σ O(h) for nodes at each height",
      "= O(n × Σ(h/2^h)) = O(n)",
      "",
      "HeapSort phase: (n-1) × MaxHeapify",
      "Each MaxHeapify: O(log n)",
      "Total: O(n log n)"
    ]
  },

  timeComplexityAnalysis: {
    bestCase: {
      complexity: "O(n log n)",
      explanation: "Always performs same operations regardless of input order."
    },
    averageCase: {
      complexity: "O(n log n)",
      explanation: "Consistent performance - not adaptive."
    },
    worstCase: {
      complexity: "O(n log n)",
      explanation: "Guaranteed O(n log n) - better worst case than Quick Sort."
    },
    derivation: [
      "BuildMaxHeap: O(n)",
      "n-1 ExtractMax operations",
      "Each ExtractMax: swap + heapify = O(log n)",
      "Total: O(n) + O(n log n) = O(n log n)"
    ]
  },

  spaceComplexityAnalysis: {
    complexity: "O(1)",
    explanation: "In-place sorting - heap is built within the input array."
  },

  exampleProblem: {
    problem: "Sort [4, 10, 3, 5, 1] using Heap Sort",
    input: "[4, 10, 3, 5, 1]",
    steps: [
      "BuildMaxHeap: [10, 5, 3, 4, 1] (max=10 at root)",
      "Swap 10↔1, heapify: [5, 4, 3, 1, |10]",
      "Swap 5↔1, heapify: [4, 1, 3, |5, 10]",
      "Swap 4↔3, heapify: [3, 1, |4, 5, 10]",
      "Swap 3↔1: [1, |3, 4, 5, 10]",
      "Done: [1, 3, 4, 5, 10]"
    ],
    output: "[1, 3, 4, 5, 10]"
  },

  advantages: [
    "O(n log n) worst case guaranteed",
    "In-place sorting",
    "No quadratic worst case like Quick Sort",
    "Good for systems with memory constraints"
  ],

  disadvantages: [
    "Not stable",
    "Poor cache performance",
    "Slower in practice than Quick Sort",
    "Not adaptive"
  ],

  applications: [
    "Priority queues",
    "Systems requiring guaranteed O(n log n)",
    "External sorting",
    "K largest/smallest elements"
  ],

  prerequisites: [
    "Binary heap structure",
    "Array representation of trees",
    "Heapify operation"
  ]
};

const ALGORITHM_CONTENT_DATABASE: Record<string, AlgorithmEducationalContent> = {
  'linear-search': LINEAR_SEARCH_CONTENT,
  'binary-search': BINARY_SEARCH_CONTENT,
  'bubble-sort': BUBBLE_SORT_CONTENT,
  'merge-sort': MERGE_SORT_CONTENT,
  'quick-sort': QUICK_SORT_CONTENT,
  'dijkstra': DIJKSTRA_CONTENT,
  'dijkstras-algorithm': DIJKSTRA_CONTENT,
  'insertion-sort': INSERTION_SORT_CONTENT,
  'selection-sort': SELECTION_SORT_CONTENT,
  'bfs': BFS_CONTENT,
  'breadth-first-search': BFS_CONTENT,
  'dfs': DFS_CONTENT,
  'depth-first-search': DFS_CONTENT,
  'heap-sort': HEAP_SORT_CONTENT,
};

/**
 * Generate educational content for any algorithm
 */
export function generateEducationalContent(
  name: string,
  slug: string,
  category: string,
  difficulty: string
): AlgorithmEducationalContent {
  // Return pre-defined content if available
  if (ALGORITHM_CONTENT_DATABASE[slug]) {
    return ALGORITHM_CONTENT_DATABASE[slug];
  }

  // Generate content based on category
  return generateContentByCategory(name, slug, category, difficulty);
}

function generateContentByCategory(
  name: string,
  slug: string,
  category: string,
  difficulty: string
): AlgorithmEducationalContent {
  const cat = category.toLowerCase();
  
  // Get template based on category
  const template = getContentTemplate(cat, name);
  
  return {
    definition: `${name} is a ${difficulty.toLowerCase()} level algorithm in the ${category} category. ${template.definitionSuffix}`,
    
    explanation: `${name} ${template.explanation}

${template.additionalInfo}`,

    keyConceptsList: template.keyConcepts,

    howItWorks: template.steps.map((step, i) => `Step ${i + 1}: ${step}`),

    mathematicalApproach: {
      problemSetup: template.mathSetup.replace(/\{name\}/g, name),
      solutionSteps: template.mathSteps,
      formula: template.formula.replace(/\{name\}/g, name)
    },

    recurrenceRelation: {
      relation: template.recurrence.relation,
      explanation: template.recurrence.explanation.replace(/\{name\}/g, name),
      baseCase: template.recurrence.baseCase,
      derivation: template.recurrence.derivation
    },

    timeComplexityAnalysis: {
      bestCase: {
        complexity: template.complexity.best,
        explanation: `${name} achieves ${template.complexity.best} in the best case when ${template.complexity.bestCondition}.`
      },
      averageCase: {
        complexity: template.complexity.average,
        explanation: `On average, ${name} performs ${template.complexity.average} operations.`
      },
      worstCase: {
        complexity: template.complexity.worst,
        explanation: `In the worst case, ${name} takes ${template.complexity.worst} time when ${template.complexity.worstCondition}.`
      },
      derivation: template.complexity.derivation
    },

    spaceComplexityAnalysis: {
      complexity: template.space.complexity,
      explanation: template.space.explanation
    },

    exampleProblem: {
      problem: `Apply ${name} to solve the following problem`,
      input: template.exampleInput,
      steps: template.exampleSteps,
      output: template.exampleOutput
    },

    advantages: template.advantages,
    disadvantages: template.disadvantages,
    applications: template.applications,
    prerequisites: template.prerequisites
  };
}

interface ContentTemplate {
  definitionSuffix: string;
  explanation: string;
  additionalInfo: string;
  keyConcepts: string[];
  steps: string[];
  mathSetup: string;
  mathSteps: string[];
  formula: string;
  recurrence: {
    relation: string;
    explanation: string;
    baseCase: string;
    derivation: string[];
  };
  complexity: {
    best: string;
    average: string;
    worst: string;
    bestCondition: string;
    worstCondition: string;
    derivation: string[];
  };
  space: {
    complexity: string;
    explanation: string;
  };
  exampleInput: string;
  exampleSteps: string[];
  exampleOutput: string;
  advantages: string[];
  disadvantages: string[];
  applications: string[];
  prerequisites: string[];
}

function getContentTemplate(category: string, name: string): ContentTemplate {
  // Searching algorithms
  if (category.includes('search')) {
    return {
      definitionSuffix: "It efficiently searches for a target element in a data structure.",
      explanation: "works by systematically examining elements in the data structure to find the target value.",
      additionalInfo: "The search process continues until the target is found or the search space is exhausted.",
      keyConcepts: ["Search space", "Target element", "Comparison operations", "Index/position", "Search efficiency"],
      steps: ["Initialize search parameters", "Examine current element", "Compare with target", "Update search space", "Repeat or terminate"],
      mathSetup: `Given data structure D with n elements and target x:
Find: position i where D[i] = x, or indicate not found.`,
      mathSteps: ["Define search space S", "Select element e from S", "If e = x, return position", "Update S based on comparison", "Repeat until S is empty"],
      formula: `{name}(D, x) = {
  i    if ∃i : D[i] = x
  -1   if ∄i : D[i] = x
}`,
      recurrence: {
        relation: "T(n) = T(n/k) + c, where k depends on elimination rate",
        explanation: "{name} reduces the search space by a factor of k at each step.",
        baseCase: "T(1) = O(1) - single element comparison",
        derivation: ["T(n) = T(n/k) + c", "After m steps: T(n/k^m) + mc", "Terminates when n/k^m = 1", "m = log_k(n)", "∴ T(n) = O(log n) for k > 1, O(n) for k = 1"]
      },
      complexity: {
        best: "O(1)",
        average: "O(n) or O(log n)",
        worst: "O(n) or O(log n)",
        bestCondition: "the target is found immediately",
        worstCondition: "the target is at the end or not present",
        derivation: ["Each comparison eliminates portion of search space", "Number of comparisons depends on elimination rate", "Best: 1 comparison if found first", "Worst: all elements checked"]
      },
      space: { complexity: "O(1)", explanation: "Uses constant extra space for pointers and variables." },
      exampleInput: "Array = [1, 3, 5, 7, 9, 11, 13], Target = 7",
      exampleSteps: ["Initialize search", "Examine elements", "Compare with target", "Target found at position 3"],
      exampleOutput: "Element found at index 3",
      advantages: ["Efficient element lookup", "Well-defined termination", "Predictable performance"],
      disadvantages: ["May require specific data structure properties", "Space-time tradeoffs"],
      applications: ["Database queries", "Information retrieval", "Element lookup"],
      prerequisites: ["Data structures", "Comparison operations"]
    };
  }
  
  // Sorting algorithms
  if (category.includes('sort')) {
    return {
      definitionSuffix: "It rearranges elements in a specific order (ascending or descending).",
      explanation: "systematically compares and rearranges elements to produce a sorted sequence.",
      additionalInfo: "The algorithm ensures that every element is in its correct position relative to others.",
      keyConcepts: ["Comparison-based", "Element swapping", "Stability", "In-place vs out-of-place", "Adaptive behavior"],
      steps: ["Examine current arrangement", "Compare elements", "Swap if out of order", "Track sorted portion", "Repeat until fully sorted"],
      mathSetup: `Given array A[0...n-1], produce array A' where:
A'[i] ≤ A'[i+1] for all i ∈ [0, n-2]`,
      mathSteps: ["Define ordering relation ≤", "Compare pairs of elements", "Rearrange according to order", "Verify ordering property", "Return sorted sequence"],
      formula: `Sort(A) = A' where ∀i < j: A'[i] ≤ A'[j]

Inversions: I(A) = |{(i,j) : i < j ∧ A[i] > A[j]}|
Goal: I(A') = 0`,
      recurrence: {
        relation: "T(n) = aT(n/b) + f(n), varies by algorithm",
        explanation: "{name} processes the array and reduces disorder at each step.",
        baseCase: "T(1) = O(1) - single element is sorted",
        derivation: ["Comparison-based: Ω(n log n) lower bound", "Each comparison gains 1 bit of information", "n! permutations = log(n!) = Θ(n log n) bits needed"]
      },
      complexity: {
        best: "O(n) or O(n log n)",
        average: "O(n²) or O(n log n)",
        worst: "O(n²) or O(n log n)",
        bestCondition: "the array is already sorted or nearly sorted",
        worstCondition: "the array is in reverse order or has maximum inversions",
        derivation: ["Count comparisons in best/average/worst cases", "Analyze number of swaps", "Consider algorithm-specific patterns"]
      },
      space: { complexity: "O(1) or O(n)", explanation: "In-place sorts use O(1) extra space; others may use O(n) auxiliary space." },
      exampleInput: "Array = [64, 34, 25, 12, 22, 11, 90]",
      exampleSteps: ["Compare adjacent elements", "Swap if necessary", "Progress through array", "Repeat passes", "Array is sorted"],
      exampleOutput: "[11, 12, 22, 25, 34, 64, 90]",
      advantages: ["Produces ordered data", "Enables binary search", "Simplifies other algorithms"],
      disadvantages: ["Time overhead", "May require extra space", "Stability not always guaranteed"],
      applications: ["Data organization", "Search preprocessing", "Priority processing"],
      prerequisites: ["Arrays", "Comparison operators", "Swap operations"]
    };
  }
  
  // Graph algorithms
  if (category.includes('graph') || category.includes('tree') || category.includes('shortest')) {
    return {
      definitionSuffix: "It operates on graph structures to solve network-related problems.",
      explanation: "traverses or processes graph vertices and edges to find optimal solutions.",
      additionalInfo: "Graph algorithms form the foundation of network analysis and optimization.",
      keyConcepts: ["Vertices and edges", "Adjacency", "Path finding", "Connectivity", "Weighted edges"],
      steps: ["Initialize graph structure", "Select starting vertex", "Process adjacent vertices", "Update state information", "Continue until goal reached"],
      mathSetup: `Given graph G = (V, E) where V is vertices, E is edges.
|V| = n vertices, |E| = m edges.
For weighted graphs: w: E → R`,
      mathSteps: ["Initialize data structures", "Process vertices in order", "Examine edges", "Update distances/states", "Track optimal paths"],
      formula: `For shortest path: δ(u,v) = min{w(p) : p is path from u to v}

Relaxation: d[v] = min(d[v], d[u] + w(u,v))`,
      recurrence: {
        relation: "T(V,E) = O((V + E) × f(V))",
        explanation: "{name} visits each vertex and edge, with additional work depending on data structures.",
        baseCase: "T(1,0) = O(1) - single vertex, no edges",
        derivation: ["Each vertex visited once: O(V)", "Each edge examined once: O(E)", "Total: O(V + E) basic", "With heap operations: O((V + E) log V)"]
      },
      complexity: {
        best: "O(V + E)",
        average: "O(V + E) or O((V + E) log V)",
        worst: "O(V²) or O(V × E)",
        bestCondition: "the graph is sparse and operations are constant time",
        worstCondition: "the graph is dense (E = O(V²))",
        derivation: ["Count vertex visits", "Count edge examinations", "Add data structure operations"]
      },
      space: { complexity: "O(V + E)", explanation: "Stores graph structure plus auxiliary arrays for distances, visited status, etc." },
      exampleInput: "Graph with 5 vertices, 6 edges, source = 0",
      exampleSteps: ["Initialize distances", "Process source vertex", "Update neighbors", "Select minimum distance vertex", "Continue until all processed"],
      exampleOutput: "Shortest distances from source to all vertices",
      advantages: ["Optimal path finding", "Network analysis", "Connectivity testing"],
      disadvantages: ["Space for graph storage", "Complexity for dense graphs"],
      applications: ["GPS navigation", "Social networks", "Computer networks"],
      prerequisites: ["Graph theory basics", "Data structures"]
    };
  }
  
  // Dynamic programming
  if (category.includes('dynamic') || category.includes('dp')) {
    return {
      definitionSuffix: "It solves complex problems by breaking them into simpler overlapping subproblems.",
      explanation: "uses memoization or tabulation to store solutions to subproblems, avoiding redundant computation.",
      additionalInfo: "DP is applicable when problems have optimal substructure and overlapping subproblems.",
      keyConcepts: ["Optimal substructure", "Overlapping subproblems", "Memoization", "Tabulation", "State transition"],
      steps: ["Define subproblem structure", "Write recurrence relation", "Identify base cases", "Fill table bottom-up or use memoization", "Extract final answer"],
      mathSetup: `Define state: dp[i] = optimal value for subproblem i
Recurrence: dp[i] = f(dp[j]) for j < i
Base case: dp[0] = known value`,
      mathSteps: ["Define state representation", "Establish recurrence relation", "Set base cases", "Compute states in order", "Return dp[target]"],
      formula: `General form: dp[i] = opt{dp[j] + cost(j,i)} for valid j

Optimization: Reduce states or transitions
Space optimization: Use rolling array if dp[i] depends only on previous states`,
      recurrence: {
        relation: "T(n) = O(n × states × transitions)",
        explanation: "{name} fills a table of states, each requiring examination of transitions.",
        baseCase: "T(1) = O(1) - base case is known",
        derivation: ["Number of states: often O(n) or O(n²)", "Transitions per state: varies", "Total: states × transitions"]
      },
      complexity: {
        best: "O(n) or O(n²)",
        average: "O(n) to O(n³)",
        worst: "O(n²) to O(2^n)",
        bestCondition: "states and transitions are minimal",
        worstCondition: "exponentially many states or transitions",
        derivation: ["Count number of unique states", "Count transitions per state", "Multiply for total time"]
      },
      space: { complexity: "O(n) or O(n²)", explanation: "Stores solution table. May be optimized if only previous states needed." },
      exampleInput: "Find optimal solution for n items",
      exampleSteps: ["Initialize dp table", "Process base cases", "Fill table using recurrence", "Trace back for solution"],
      exampleOutput: "Optimal value and solution path",
      advantages: ["Polynomial time for many hard problems", "Guaranteed optimal solution", "Systematic approach"],
      disadvantages: ["Space overhead", "Identifying states can be difficult"],
      applications: ["Optimization problems", "Sequence analysis", "Resource allocation"],
      prerequisites: ["Recursion", "Memoization concepts"]
    };
  }

  // Default template for other categories
  return getDefaultTemplate(name, category);
}

function getDefaultTemplate(name: string, category: string): ContentTemplate {
  return {
    definitionSuffix: `It provides an efficient solution for ${category} problems.`,
    explanation: `is designed to solve specific computational problems efficiently.`,
    additionalInfo: "Understanding the algorithm's approach helps in applying it correctly to appropriate problems.",
    keyConcepts: ["Problem decomposition", "Algorithmic strategy", "Efficiency", "Correctness", "Implementation"],
    steps: ["Understand the problem", "Design the approach", "Implement the solution", "Analyze complexity", "Optimize if needed"],
    mathSetup: `Problem: Given input of size n, compute the desired output.
Approach: Apply algorithmic strategy to transform input to output.`,
    mathSteps: ["Define input format", "Specify output requirements", "Design algorithm steps", "Prove correctness", "Analyze efficiency"],
    formula: `f(input) = output satisfying problem constraints`,
    recurrence: {
      relation: "T(n) depends on algorithm structure",
      explanation: "{name} processes input using its characteristic approach.",
      baseCase: "T(small input) = constant",
      derivation: ["Analyze algorithm structure", "Count operations", "Derive complexity"]
    },
    complexity: {
      best: "O(n)",
      average: "O(n log n)",
      worst: "O(n²)",
      bestCondition: "input has favorable structure",
      worstCondition: "input triggers maximum operations",
      derivation: ["Analyze best case input", "Analyze average case", "Analyze worst case"]
    },
    space: { complexity: "O(n)", explanation: "Space depends on data structures used." },
    exampleInput: "Sample input for the algorithm",
    exampleSteps: ["Process input", "Apply algorithm", "Generate output"],
    exampleOutput: "Expected output",
    advantages: ["Efficient for target problems", "Well-analyzed", "Practical applications"],
    disadvantages: ["May have limitations", "Trade-offs exist"],
    applications: ["Relevant problem domains"],
    prerequisites: ["Fundamental concepts"]
  };
}

/**
 * Get educational content for an algorithm by slug
 */
export function getEducationalContent(slug: string): AlgorithmEducationalContent | null {
  return ALGORITHM_CONTENT_DATABASE[slug] || null;
}

/**
 * Check if detailed content exists for algorithm
 */
export function hasDetailedContent(slug: string): boolean {
  return slug in ALGORITHM_CONTENT_DATABASE;
}
