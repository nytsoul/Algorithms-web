/**
 * Quiz Module
 * Algorithm-based questions and problem-solving challenges
 * Questions adapted from LeetCode and CodeForces problems
 */

export interface QuizQuestion {
  id: string;
  algorithm: string;
  type: 'multiple-choice' | 'coding-challenge';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hints?: string[];
  testCases?: TestCase[];
  source: 'leetcode' | 'codeforces' | 'custom';
  sourceId?: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export interface ProblemChallenge {
  id: string;
  algorithm: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  constraints: string[];
  examples: Example[];
  testCases: TestCase[];
  hints: string[];
  source: 'leetcode' | 'codeforces' | 'custom';
  sourceId?: string;
  tags: string[];
}

export interface Example {
  input: string;
  output: string;
  explanation: string;
}

// Linear Search Quiz Questions
export const LINEAR_SEARCH_QUIZ: QuizQuestion[] = [
  {
    id: "ls-q1",
    algorithm: "linear-search",
    type: "multiple-choice",
    difficulty: "easy",
    question: "What is the time complexity of linear search in the worst case?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: "O(n)",
    explanation: "In the worst case, linear search needs to examine every element in the array, resulting in O(n) time complexity.",
    source: "custom"
  },
  {
    id: "ls-q2", 
    algorithm: "linear-search",
    type: "multiple-choice",
    difficulty: "easy",
    question: "In which scenario would linear search be preferred over binary search?",
    options: [
      "When the array is sorted",
      "When the array is unsorted", 
      "When the array is very large",
      "When we need O(log n) complexity"
    ],
    correctAnswer: "When the array is unsorted",
    explanation: "Linear search works on both sorted and unsorted arrays, while binary search requires the array to be sorted.",
    source: "custom"
  },
  {
    id: "ls-q3",
    algorithm: "linear-search", 
    type: "multiple-choice",
    difficulty: "medium",
    question: "What is the average-case time complexity of linear search?",
    options: ["O(1)", "O(n/2)", "O(n)", "O(log n)"],
    correctAnswer: "O(n)",
    explanation: "The average case is O(n/2), but in Big O notation, we drop constants, so it's still O(n).",
    source: "custom"
  },
  {
    id: "ls-q4",
    algorithm: "linear-search",
    type: "multiple-choice", 
    difficulty: "medium",
    question: "Which statement about linear search is FALSE?",
    options: [
      "It can find multiple occurrences of an element",
      "It requires the array to be sorted",
      "It has O(1) space complexity", 
      "It examines elements sequentially"
    ],
    correctAnswer: "It requires the array to be sorted",
    explanation: "Linear search does NOT require the array to be sorted, unlike binary search.",
    source: "custom"
  },
  {
    id: "ls-q5",
    algorithm: "linear-search",
    type: "multiple-choice",
    difficulty: "hard", 
    question: "In a linear search implementation, what optimization can improve performance for repeated searches?",
    options: [
      "Using binary search instead",
      "Moving found elements to the front (move-to-front heuristic)",
      "Sorting the array first",
      "Using hash tables"
    ],
    correctAnswer: "Moving found elements to the front (move-to-front heuristic)",
    explanation: "The move-to-front heuristic can improve performance for repeated searches by moving frequently accessed elements closer to the beginning.",
    source: "custom"
  }
];

// Bubble Sort Quiz Questions
export const BUBBLE_SORT_QUIZ: QuizQuestion[] = [
  {
    id: "bs-sort-q1",
    algorithm: "bubble-sort",
    type: "multiple-choice",
    difficulty: "easy",
    question: "What is the time complexity of bubble sort in the worst case?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
    correctAnswer: "O(n²)",
    explanation: "In the worst case, bubble sort needs to compare every pair of elements, resulting in O(n²) comparisons.",
    source: "custom"
  },
  {
    id: "bs-sort-q2", 
    algorithm: "bubble-sort",
    type: "multiple-choice",
    difficulty: "easy",
    question: "What is the best-case time complexity of optimized bubble sort?",
    options: ["O(1)", "O(n)", "O(n log n)", "O(n²)"],
    correctAnswer: "O(n)",
    explanation: "When the array is already sorted, optimized bubble sort with early termination runs in O(n) time.",
    source: "custom"
  },
  {
    id: "bs-sort-q3",
    algorithm: "bubble-sort", 
    type: "multiple-choice",
    difficulty: "medium",
    question: "How many swaps does bubble sort perform in the worst case for an array of n elements?",
    options: ["n", "n-1", "n(n-1)/2", "n²"],
    correctAnswer: "n(n-1)/2",
    explanation: "In the worst case (reverse sorted array), bubble sort performs n(n-1)/2 swaps.",
    source: "custom"
  },
  {
    id: "bs-sort-q4",
    algorithm: "bubble-sort",
    type: "multiple-choice", 
    difficulty: "medium",
    question: "What optimization can be applied to bubble sort to detect if the array is already sorted?",
    options: [
      "Use a pivot element",
      "Track if any swaps occurred in a pass",
      "Use binary search",
      "Divide the array in half"
    ],
    correctAnswer: "Track if any swaps occurred in a pass",
    explanation: "If no swaps occur in a complete pass, the array is already sorted and we can terminate early.",
    source: "custom"
  },
  {
    id: "bs-sort-q5",
    algorithm: "bubble-sort",
    type: "multiple-choice",
    difficulty: "hard", 
    question: "What is the space complexity of bubble sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: "O(1)",
    explanation: "Bubble sort is an in-place sorting algorithm that only requires a constant amount of extra space.",
    source: "custom"
  }
];

// Quick Sort Quiz Questions
export const QUICK_SORT_QUIZ: QuizQuestion[] = [
  {
    id: "qs-q1",
    algorithm: "quick-sort",
    type: "multiple-choice",
    difficulty: "easy", 
    question: "What is the average-case time complexity of quick sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
    correctAnswer: "O(n log n)",
    explanation: "Quick sort has an average-case time complexity of O(n log n) when the pivot divides the array roughly in half.",
    source: "custom"
  },
  {
    id: "qs-q2",
    algorithm: "quick-sort", 
    type: "multiple-choice",
    difficulty: "medium",
    question: "What causes quick sort to have O(n²) worst-case time complexity?",
    options: [
      "When the array is already sorted",
      "When the pivot is always the smallest or largest element", 
      "When the array contains duplicates",
      "When using random pivot selection"
    ],
    correctAnswer: "When the pivot is always the smallest or largest element",
    explanation: "When the pivot is always the minimum or maximum, one partition is empty and the other has n-1 elements, leading to O(n²) time.",
    source: "custom"
  },
  {
    id: "qs-q3",
    algorithm: "quick-sort",
    type: "multiple-choice",
    difficulty: "medium",
    question: "Which pivot selection strategy helps avoid worst-case performance?",
    options: [
      "Always choose first element",
      "Always choose last element",
      "Random pivot selection", 
      "Always choose middle element"
    ],
    correctAnswer: "Random pivot selection",
    explanation: "Random pivot selection makes it unlikely to consistently get bad partitions, improving average performance.",
    source: "custom"
  },
  {
    id: "qs-q4",
    algorithm: "quick-sort",
    type: "multiple-choice", 
    difficulty: "hard",
    question: "What is the space complexity of quick sort in the average case?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: "O(log n)",
    explanation: "Quick sort uses O(log n) space on average due to the recursive call stack, with depth approximately log n.",
    source: "custom"
  },
  {
    id: "qs-q5",
    algorithm: "quick-sort",
    type: "multiple-choice",
    difficulty: "hard", 
    question: "Which partitioning scheme is used in the standard implementation of quick sort?",
    options: [
      "Hoare partition scheme",
      "Lomuto partition scheme",
      "Dutch national flag algorithm",
      "Fisher-Yates shuffle"
    ],
    correctAnswer: "Lomuto partition scheme",
    explanation: "The Lomuto partition scheme is commonly used and easier to implement, though Hoare's scheme can be more efficient.",
    source: "custom"
  }
];

// Merge Sort Quiz Questions
export const MERGE_SORT_QUIZ: QuizQuestion[] = [
  {
    id: "ms-q1",
    algorithm: "merge-sort",
    type: "multiple-choice",
    difficulty: "easy",
    question: "What is the time complexity of merge sort in all cases (best, average, worst)?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctAnswer: "O(n log n)",
    explanation: "Merge sort always divides the array in half (log n levels) and merges all elements at each level (n work), resulting in O(n log n) in all cases.",
    source: "custom"
  },
  {
    id: "ms-q2",
    algorithm: "merge-sort",
    type: "multiple-choice",
    difficulty: "easy",
    question: "What is the space complexity of standard merge sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: "O(n)",
    explanation: "Standard merge sort requires O(n) additional space for the temporary arrays used during merging.",
    source: "custom"
  },
  {
    id: "ms-q3",
    algorithm: "merge-sort",
    type: "multiple-choice",
    difficulty: "medium",
    question: "Which of the following is TRUE about merge sort?",
    options: [
      "It is an in-place sorting algorithm",
      "It is a stable sorting algorithm",
      "It has O(n²) worst-case complexity",
      "It is not suitable for linked lists"
    ],
    correctAnswer: "It is a stable sorting algorithm",
    explanation: "Merge sort is stable, meaning it preserves the relative order of equal elements. It requires extra space, making it not in-place.",
    source: "custom"
  },
  {
    id: "ms-q4",
    algorithm: "merge-sort",
    type: "multiple-choice",
    difficulty: "medium",
    question: "What divide-and-conquer strategy does merge sort use?",
    options: [
      "Divide into unequal parts, conquer, combine",
      "Divide into equal halves, recursively sort, merge",
      "Select pivot, partition, recursively sort",
      "Build heap, extract maximum repeatedly"
    ],
    correctAnswer: "Divide into equal halves, recursively sort, merge",
    explanation: "Merge sort divides the array into two equal halves, recursively sorts each half, then merges the sorted halves together.",
    source: "custom"
  },
  {
    id: "ms-q5",
    algorithm: "merge-sort",
    type: "multiple-choice",
    difficulty: "hard",
    question: "In the merge step of merge sort, how many comparisons are needed to merge two sorted arrays of size n/2 each in the worst case?",
    options: ["n/2", "n - 1", "n", "n log n"],
    correctAnswer: "n - 1",
    explanation: "In the worst case (when elements interleave perfectly), we need n-1 comparisons to merge two arrays of total size n.",
    source: "custom"
  }
];

// Merge Sort Problem Challenges (LeetCode/CodeForces style)
export const MERGE_SORT_CHALLENGES: ProblemChallenge[] = [
  {
    id: "ms-c1",
    algorithm: "merge-sort",
    title: "Sort an Array",
    difficulty: "medium",
    description: "Given an array of integers nums, sort the array in ascending order and return it. You must solve the problem without using any built-in functions in O(n log n) time complexity.",
    constraints: [
      "1 <= nums.length <= 5 * 10^4",
      "-5 * 10^4 <= nums[i] <= 5 * 10^4"
    ],
    examples: [
      {
        input: "nums = [5,2,3,1]",
        output: "[1,2,3,5]",
        explanation: "After sorting the array, the positions of elements change to [1,2,3,5]."
      },
      {
        input: "nums = [5,1,1,2,0,0]",
        output: "[0,0,1,1,2,5]",
        explanation: "Note that the values of nums are not necessarily unique."
      }
    ],
    testCases: [
      { input: "[5,2,3,1]", expectedOutput: "[1,2,3,5]" },
      { input: "[5,1,1,2,0,0]", expectedOutput: "[0,0,1,1,2,5]" },
      { input: "[1]", expectedOutput: "[1]" },
      { input: "[3,3,3]", expectedOutput: "[3,3,3]" }
    ],
    hints: [
      "Implement merge sort by recursively splitting the array",
      "The merge step combines two sorted arrays into one",
      "Use a temporary array for the merge operation"
    ],
    source: "leetcode",
    sourceId: "912",
    tags: ["array", "sorting", "divide-and-conquer", "merge-sort"]
  },
  {
    id: "ms-c2",
    algorithm: "merge-sort",
    title: "Count of Smaller Numbers After Self",
    difficulty: "hard",
    description: "Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    examples: [
      {
        input: "nums = [5,2,6,1]",
        output: "[2,1,1,0]",
        explanation: "To the right of 5 there are 2 smaller elements (2 and 1). To the right of 2 there is 1 smaller element (1). To the right of 6 there is 1 smaller element (1). To the right of 1 there are 0 smaller elements."
      },
      {
        input: "nums = [-1]",
        output: "[0]",
        explanation: "There are no elements to the right."
      }
    ],
    testCases: [
      { input: "[5,2,6,1]", expectedOutput: "[2,1,1,0]" },
      { input: "[-1]", expectedOutput: "[0]" },
      { input: "[2,0,1]", expectedOutput: "[2,0,0]" },
      { input: "[1,2,3,4]", expectedOutput: "[0,0,0,0]" }
    ],
    hints: [
      "Use merge sort to count inversions",
      "Track original indices while sorting",
      "Count elements that move from right to left during merge"
    ],
    source: "leetcode",
    sourceId: "315",
    tags: ["array", "merge-sort", "divide-and-conquer", "binary-indexed-tree"]
  },
  {
    id: "ms-c3",
    algorithm: "merge-sort",
    title: "Reverse Pairs",
    difficulty: "hard",
    description: "Given an integer array nums, return the number of reverse pairs in the array. A reverse pair is a pair (i, j) where 0 <= i < j < nums.length and nums[i] > 2 * nums[j].",
    constraints: [
      "1 <= nums.length <= 5 * 10^4",
      "-2^31 <= nums[i] <= 2^31 - 1"
    ],
    examples: [
      {
        input: "nums = [1,3,2,3,1]",
        output: "2",
        explanation: "The reverse pairs are: (1, 4) -> nums[1] = 3, nums[4] = 1, 3 > 2 * 1. (3, 4) -> nums[3] = 3, nums[4] = 1, 3 > 2 * 1."
      },
      {
        input: "nums = [2,4,3,5,1]",
        output: "3",
        explanation: "The reverse pairs are (1, 4), (2, 4), (3, 4)."
      }
    ],
    testCases: [
      { input: "[1,3,2,3,1]", expectedOutput: "2" },
      { input: "[2,4,3,5,1]", expectedOutput: "3" },
      { input: "[1,2,3,4]", expectedOutput: "0" },
      { input: "[5,4,3,2,1]", expectedOutput: "4" }
    ],
    hints: [
      "Use modified merge sort",
      "Count pairs before merging two sorted halves",
      "Two pointers can count valid pairs in O(n)"
    ],
    source: "leetcode",
    sourceId: "493",
    tags: ["array", "merge-sort", "divide-and-conquer", "binary-indexed-tree"]
  },
  {
    id: "ms-c4",
    algorithm: "merge-sort",
    title: "Merge Sorted Array",
    difficulty: "easy",
    description: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n. Merge nums1 and nums2 into a single array sorted in non-decreasing order. The final sorted array should be stored inside nums1.",
    constraints: [
      "nums1.length == m + n",
      "nums2.length == n",
      "0 <= m, n <= 200",
      "-10^9 <= nums1[i], nums2[j] <= 10^9"
    ],
    examples: [
      {
        input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
        output: "[1,2,2,3,5,6]",
        explanation: "The arrays we are merging are [1,2,3] and [2,5,6]. The result is [1,2,2,3,5,6]."
      },
      {
        input: "nums1 = [1], m = 1, nums2 = [], n = 0",
        output: "[1]",
        explanation: "The arrays we are merging are [1] and []. The result is [1]."
      }
    ],
    testCases: [
      { input: "nums1=[1,2,3,0,0,0],m=3,nums2=[2,5,6],n=3", expectedOutput: "[1,2,2,3,5,6]" },
      { input: "nums1=[1],m=1,nums2=[],n=0", expectedOutput: "[1]" },
      { input: "nums1=[0],m=0,nums2=[1],n=1", expectedOutput: "[1]" },
      { input: "nums1=[4,5,6,0,0,0],m=3,nums2=[1,2,3],n=3", expectedOutput: "[1,2,3,4,5,6]" }
    ],
    hints: [
      "Use the merge step of merge sort",
      "Start from the end to avoid overwriting",
      "Three pointers: end of nums1 values, end of nums2, insertion point"
    ],
    source: "leetcode",
    sourceId: "88",
    tags: ["array", "merge-sort", "two-pointers"]
  },
  {
    id: "ms-c5",
    algorithm: "merge-sort",
    title: "Sort List",
    difficulty: "medium",
    description: "Given the head of a linked list, return the list after sorting it in ascending order. Solve it in O(n log n) time and O(1) memory (i.e., constant space).",
    constraints: [
      "The number of nodes in the list is in the range [0, 5 * 10^4]",
      "-10^5 <= Node.val <= 10^5"
    ],
    examples: [
      {
        input: "head = [4,2,1,3]",
        output: "[1,2,3,4]",
        explanation: "The linked list is sorted in ascending order."
      },
      {
        input: "head = [-1,5,3,4,0]",
        output: "[-1,0,3,4,5]",
        explanation: "The linked list is sorted in ascending order."
      }
    ],
    testCases: [
      { input: "[4,2,1,3]", expectedOutput: "[1,2,3,4]" },
      { input: "[-1,5,3,4,0]", expectedOutput: "[-1,0,3,4,5]" },
      { input: "[]", expectedOutput: "[]" },
      { input: "[1]", expectedOutput: "[1]" }
    ],
    hints: [
      "Use merge sort for linked lists",
      "Find middle using slow/fast pointers",
      "Merge step can be done in O(1) space for linked lists"
    ],
    source: "leetcode",
    sourceId: "148",
    tags: ["linked-list", "merge-sort", "divide-and-conquer", "two-pointers"]
  }
];

// Dijkstra's Algorithm Quiz Questions  
export const DIJKSTRA_QUIZ: QuizQuestion[] = [
  {
    id: "dj-q1",
    algorithm: "dijkstra",
    type: "multiple-choice",
    difficulty: "easy",
    question: "What type of graphs can Dijkstra's algorithm work on?",
    options: [
      "Only unweighted graphs",
      "Only graphs with positive edge weights",
      "Graphs with negative edge weights", 
      "Only directed graphs"
    ],
    correctAnswer: "Only graphs with positive edge weights",
    explanation: "Dijkstra's algorithm only works correctly on graphs with non-negative edge weights.",
    source: "custom"
  },
  {
    id: "dj-q2", 
    algorithm: "dijkstra",
    type: "multiple-choice",
    difficulty: "easy",
    question: "What is the time complexity of Dijkstra's algorithm using a binary heap?",
    options: ["O(V²)", "O(E log V)", "O((V + E) log V)", "O(VE)"],
    correctAnswer: "O((V + E) log V)",
    explanation: "With a binary heap, each vertex is extracted in O(log V) time, and each edge relaxation takes O(log V) time.",
    source: "custom"
  },
  {
    id: "dj-q3",
    algorithm: "dijkstra", 
    type: "multiple-choice",
    difficulty: "medium",
    question: "Which data structure is essential for efficiently implementing Dijkstra's algorithm?",
    options: [
      "Stack",
      "Queue", 
      "Priority Queue (Min-Heap)",
      "Hash Table"
    ],
    correctAnswer: "Priority Queue (Min-Heap)",
    explanation: "A priority queue allows efficient extraction of the vertex with minimum distance, which is crucial for Dijkstra's algorithm.",
    source: "custom"
  },
  {
    id: "dj-q4",
    algorithm: "dijkstra",
    type: "multiple-choice", 
    difficulty: "medium",
    question: "What happens if Dijkstra's algorithm encounters a negative edge weight?",
    options: [
      "It works correctly",
      "It may produce incorrect shortest paths",
      "It will crash with an error", 
      "It will run infinitely"
    ],
    correctAnswer: "It may produce incorrect shortest paths",
    explanation: "Dijkstra's algorithm assumes non-negative weights. Negative weights can lead to incorrect results because it may mark vertices as 'settled' prematurely.",
    source: "custom"
  },
  {
    id: "dj-q5",
    algorithm: "dijkstra",
    type: "multiple-choice",
    difficulty: "hard", 
    question: "Which algorithm should be used instead of Dijkstra's when the graph has negative edge weights?",
    options: [
      "Breadth-First Search",
      "Depth-First Search",
      "Bellman-Ford algorithm", 
      "Floyd-Warshall algorithm"
    ],
    correctAnswer: "Bellman-Ford algorithm",
    explanation: "Bellman-Ford algorithm can handle negative edge weights and detect negative cycles, unlike Dijkstra's algorithm.",
    source: "custom"
  }
];

// Binary Search Quiz Questions
export const BINARY_SEARCH_QUIZ: QuizQuestion[] = [
  {
    id: "bs-q1",
    algorithm: "binary-search",
    type: "multiple-choice",
    difficulty: "easy", 
    question: "What is the prerequisite for binary search to work correctly?",
    options: [
      "Array must be of even length",
      "Array must be sorted", 
      "Array must contain unique elements",
      "Array must be stored in linked list"
    ],
    correctAnswer: "Array must be sorted",
    explanation: "Binary search requires the array to be sorted to work correctly, as it relies on the property that elements are in order.",
    source: "custom"
  },
  {
    id: "bs-q2",
    algorithm: "binary-search", 
    type: "multiple-choice",
    difficulty: "easy",
    question: "What is the time complexity of binary search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: "O(log n)",
    explanation: "Binary search halves the search space in each iteration, resulting in O(log n) time complexity.",
    source: "custom"
  },
  {
    id: "bs-q3",
    algorithm: "binary-search",
    type: "multiple-choice",
    difficulty: "medium",
    question: "To avoid integer overflow when calculating mid, which formula should be used?",
    options: [
      "mid = (left + right) / 2",
      "mid = left + (right - left) / 2",
      "mid = (left * right) / 2", 
      "mid = right - (right - left) / 2"
    ],
    correctAnswer: "mid = left + (right - left) / 2",
    explanation: "This formula prevents integer overflow that could occur with (left + right) / 2 when dealing with large indices.",
    source: "leetcode"
  },
  {
    id: "bs-q4",
    algorithm: "binary-search",
    type: "multiple-choice",
    difficulty: "medium",
    question: "In binary search, when should you use 'left <= right' vs 'left < right' as the loop condition?",
    options: [
      "Always use left <= right",
      "Always use left < right", 
      "Use left <= right for exact match, left < right for insertion point",
      "It doesn't matter"
    ],
    correctAnswer: "Use left <= right for exact match, left < right for insertion point",
    explanation: "left <= right is used when you want to find an exact match. left < right is used when finding insertion points or bounds.",
    source: "leetcode"
  },
  {
    id: "bs-q5", 
    algorithm: "binary-search",
    type: "multiple-choice",
    difficulty: "hard",
    question: "What is the maximum number of comparisons needed for binary search in an array of 1000 elements?",
    options: ["10", "11", "100", "1000"],
    correctAnswer: "10",
    explanation: "⌊log₂(1000)⌋ + 1 = ⌊9.97⌋ + 1 = 10. Binary search needs at most ⌊log₂(n)⌋ + 1 comparisons.",
    source: "custom"
  }
];

// Problem-solving challenges
export const LINEAR_SEARCH_CHALLENGES: ProblemChallenge[] = [
  {
    id: "ls-p1",
    algorithm: "linear-search", 
    title: "Find All Occurrences",
    difficulty: "easy",
    description: "Given an array and a target value, return all indices where the target appears.",
    constraints: [
      "1 <= array.length <= 10^4",
      "-10^4 <= array[i], target <= 10^4"
    ],
    examples: [
      {
        input: "arr = [1,2,3,2,4,2], target = 2",
        output: "[1,3,5]", 
        explanation: "The target 2 appears at indices 1, 3, and 5"
      }
    ],
    testCases: [
      {
        input: "[1,2,3,2,4,2], 2",
        expectedOutput: "[1,3,5]"
      },
      {
        input: "[1,1,1,1], 1", 
        expectedOutput: "[0,1,2,3]"
      },
      {
        input: "[1,2,3,4], 5",
        expectedOutput: "[]"
      }
    ],
    hints: [
      "Use linear search but don't stop at first match",
      "Store all found indices in a result array"
    ],
    source: "custom",
    tags: ["array", "linear-search"]
  },
  {
    id: "ls-p2",
    algorithm: "linear-search",
    title: "Find Peak Element", 
    difficulty: "medium",
    description: "A peak element is an element that is strictly greater than its neighbors. Find any peak element and return its index.",
    constraints: [
      "1 <= nums.length <= 1000",
      "-2^31 <= nums[i] <= 2^31 - 1",
      "nums[i] != nums[i + 1] for all valid i"
    ],
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "2",
        explanation: "3 is a peak element and your function should return the index number 2."
      }
    ],
    testCases: [
      {
        input: "[1,2,3,1]",
        expectedOutput: "2"
      },
      {
        input: "[1,2,1,3,5,6,4]", 
        expectedOutput: "5"
      }
    ],
    hints: [
      "A peak element is greater than its neighbors",
      "Array boundaries are considered as negative infinity"
    ],
    source: "leetcode",
    sourceId: "162",
    tags: ["array", "linear-search"]
  },
  {
    id: "ls-p3",
    algorithm: "linear-search",
    title: "Missing Number",
    difficulty: "easy", 
    description: "Given an array containing n distinct numbers in range [0, n], find the missing number.",
    constraints: [
      "n == nums.length",
      "1 <= n <= 10^4", 
      "0 <= nums[i] <= n",
      "All numbers in nums are unique"
    ],
    examples: [
      {
        input: "nums = [3,0,1]",
        output: "2",
        explanation: "n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number."
      }
    ],
    testCases: [
      {
        input: "[3,0,1]",
        expectedOutput: "2"
      },
      {
        input: "[0,1]",
        expectedOutput: "2"
      },
      {
        input: "[9,6,4,2,3,5,7,0,1]",
        expectedOutput: "8"
      }
    ],
    hints: [
      "Use sum formula: sum of 0 to n is n*(n+1)/2",
      "Calculate expected sum - actual sum"
    ],
    source: "leetcode", 
    sourceId: "268",
    tags: ["array", "math", "linear-search"]
  },
  {
    id: "ls-p4",
    algorithm: "linear-search",
    title: "Single Number",
    difficulty: "easy",
    description: "Given a non-empty array where every element appears twice except one, find that single number.",
    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "-3 * 10^4 <= nums[i] <= 3 * 10^4",
      "Each element in the array appears twice except for one element which appears only once"
    ],
    examples: [
      {
        input: "nums = [2,2,1]", 
        output: "1",
        explanation: "1 appears once while 2 appears twice"
      }
    ],
    testCases: [
      {
        input: "[2,2,1]",
        expectedOutput: "1"
      },
      {
        input: "[4,1,2,1,2]",
        expectedOutput: "4"
      }
    ],
    hints: [
      "XOR operation: a ⊕ a = 0, a ⊕ 0 = a",
      "XOR all elements together"
    ],
    source: "leetcode",
    sourceId: "136", 
    tags: ["array", "bit-manipulation"]
  },
  {
    id: "ls-p5",
    algorithm: "linear-search",
    title: "Majority Element",
    difficulty: "easy",
    description: "Find the majority element that appears more than ⌊n/2⌋ times in the array.",
    constraints: [
      "n == nums.length",
      "1 <= n <= 5 * 10^4",
      "-2^31 <= nums[i] <= 2^31 - 1"
    ],
    examples: [
      {
        input: "nums = [3,2,3]",
        output: "3",
        explanation: "3 appears 2 times which is more than ⌊3/2⌋ = 1"
      }
    ],
    testCases: [
      {
        input: "[3,2,3]", 
        expectedOutput: "3"
      },
      {
        input: "[2,2,1,1,1,2,2]",
        expectedOutput: "2"
      }
    ],
    hints: [
      "Boyer-Moore Voting Algorithm",
      "Count occurrences and track candidate"
    ],
    source: "leetcode",
    sourceId: "169",
    tags: ["array", "divide-and-conquer", "sorting"]
  }
];

export const BUBBLE_SORT_CHALLENGES: ProblemChallenge[] = [
  {
    id: "bs-sort-p1",
    algorithm: "bubble-sort",
    title: "Sort Array By Parity",
    difficulty: "easy",
    description: "Sort an array so that even numbers come before odd numbers. Use bubble sort approach.",
    constraints: [
      "1 <= nums.length <= 5000",
      "0 <= nums[i] <= 5000"
    ],
    examples: [
      {
        input: "nums = [3,1,2,4]",
        output: "[2,4,3,1]",
        explanation: "Even numbers [2,4] come before odd numbers [3,1]"
      }
    ],
    testCases: [
      {
        input: "[3,1,2,4]",
        expectedOutput: "[2,4,3,1]"
      },
      {
        input: "[0]",
        expectedOutput: "[0]"
      }
    ],
    hints: [
      "Modify bubble sort to compare parity instead of values",
      "Even numbers should bubble to the left"
    ],
    source: "leetcode",
    sourceId: "905",
    tags: ["array", "sorting", "bubble-sort"]
  },
  {
    id: "bs-sort-p2",
    algorithm: "bubble-sort",
    title: "Largest Number",
    difficulty: "medium",
    description: "Given a list of non-negative integers, arrange them to form the largest number.",
    constraints: [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 10^9"
    ],
    examples: [
      {
        input: "nums = [10,2]",
        output: "210",
        explanation: "Comparing '10'+'2'='102' vs '2'+'10'='210', we choose 210"
      }
    ],
    testCases: [
      {
        input: "[10,2]",
        expectedOutput: "210"
      },
      {
        input: "[3,30,34,5,9]",
        expectedOutput: "9534330"
      }
    ],
    hints: [
      "Custom comparator: compare concatenated strings",
      "For numbers a,b: compare a+b vs b+a"
    ],
    source: "leetcode", 
    sourceId: "179",
    tags: ["array", "string", "sorting"]
  },
  {
    id: "bs-sort-p3",
    algorithm: "bubble-sort",
    title: "Sort Colors", 
    difficulty: "medium",
    description: "Sort an array with 0s, 1s, and 2s in-place (Dutch National Flag problem).",
    constraints: [
      "n == nums.length",
      "1 <= n <= 300",
      "nums[i] is either 0, 1, or 2"
    ],
    examples: [
      {
        input: "nums = [2,0,2,1,1,0]",
        output: "[0,0,1,1,2,2]",
        explanation: "0s first, then 1s, then 2s"
      }
    ],
    testCases: [
      {
        input: "[2,0,2,1,1,0]", 
        expectedOutput: "[0,0,1,1,2,2]"
      },
      {
        input: "[2,0,1]",
        expectedOutput: "[0,1,2]"
      }
    ],
    hints: [
      "Use three pointers for three colors",
      "Swap elements to correct positions"
    ],
    source: "leetcode",
    sourceId: "75",
    tags: ["array", "two-pointers", "sorting"]
  },
  {
    id: "bs-sort-p4",
    algorithm: "bubble-sort", 
    title: "Maximum Gap",
    difficulty: "hard",
    description: "Find the maximum difference between successive elements in a sorted array.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "0 <= nums[i] <= 10^9"
    ],
    examples: [
      {
        input: "nums = [3,6,9,1]",
        output: "3",
        explanation: "Sorted: [1,3,6,9]. Max gap is between 6 and 9: 9-6=3"
      }
    ],
    testCases: [
      {
        input: "[3,6,9,1]",
        expectedOutput: "3"
      },
      {
        input: "[10]", 
        expectedOutput: "0"
      }
    ],
    hints: [
      "Sort the array first",
      "Find maximum difference between adjacent elements"
    ],
    source: "leetcode",
    sourceId: "164",
    tags: ["array", "sorting", "bucket-sort"]
  },
  {
    id: "bs-sort-p5",
    algorithm: "bubble-sort",
    title: "Minimum Number of Swaps",
    difficulty: "medium",
    description: "Find minimum number of swaps needed to sort the array using bubble sort approach.",
    constraints: [
      "1 <= arr.length <= 10^5", 
      "1 <= arr[i] <= arr.length",
      "All integers in arr are distinct"
    ],
    examples: [
      {
        input: "arr = [4,3,2,1]",
        output: "6",
        explanation: "Need 6 swaps to sort [4,3,2,1] to [1,2,3,4]"
      }
    ],
    testCases: [
      {
        input: "[4,3,2,1]",
        expectedOutput: "6"
      },
      {
        input: "[1,3,2]",
        expectedOutput: "1"
      }
    ],
    hints: [
      "Count inversions in the array",
      "Each inversion requires a swap"
    ],
    source: "custom",
    tags: ["array", "sorting", "inversions"]
  }
];

export const QUICK_SORT_CHALLENGES: ProblemChallenge[] = [
  {
    id: "qs-p1",
    algorithm: "quick-sort", 
    title: "Kth Largest Element",
    difficulty: "medium",
    description: "Find the kth largest element in an unsorted array using quickselect algorithm.",
    constraints: [
      "1 <= k <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    examples: [
      {
        input: "nums = [3,2,1,5,6,4], k = 2",
        output: "5",
        explanation: "The 2nd largest element is 5"
      }
    ],
    testCases: [
      {
        input: "[3,2,1,5,6,4], 2",
        expectedOutput: "5"
      },
      {
        input: "[3,2,3,1,2,4,5,5,6], 4", 
        expectedOutput: "4"
      }
    ],
    hints: [
      "Use quickselect algorithm (modified quicksort)",
      "Only recurse on the partition containing the kth element"
    ],
    source: "leetcode",
    sourceId: "215",
    tags: ["array", "divide-and-conquer", "quickselect"]
  },
  {
    id: "qs-p2",
    algorithm: "quick-sort",
    title: "Top K Frequent Elements",
    difficulty: "medium", 
    description: "Find the k most frequent elements in an array.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "1 <= k <= number of unique elements"
    ],
    examples: [
      {
        input: "nums = [1,1,1,2,2,3], k = 2",
        output: "[1,2]",
        explanation: "1 appears 3 times, 2 appears 2 times"
      }
    ],
    testCases: [
      {
        input: "[1,1,1,2,2,3], 2",
        expectedOutput: "[1,2]"
      },
      {
        input: "[1], 1",
        expectedOutput: "[1]"
      }
    ],
    hints: [
      "Count frequencies first",
      "Use quickselect on frequency array"
    ],
    source: "leetcode",
    sourceId: "347",
    tags: ["array", "hash-table", "divide-and-conquer"]
  },
  {
    id: "qs-p3",
    algorithm: "quick-sort",
    title: "Wiggle Sort II", 
    difficulty: "medium",
    description: "Rearrange array so that nums[0] < nums[1] > nums[2] < nums[3]...",
    constraints: [
      "1 <= nums.length <= 5 * 10^4",
      "0 <= nums[i] <= 5000"
    ],
    examples: [
      {
        input: "nums = [1,5,1,1,6,4]",
        output: "[1,6,1,5,1,4]",
        explanation: "1 < 6 > 1 < 5 > 1 < 4"
      }
    ],
    testCases: [
      {
        input: "[1,5,1,1,6,4]",
        expectedOutput: "[1,6,1,5,1,4]"
      },
      {
        input: "[1,3,2,2,3,1]",
        expectedOutput: "[2,3,1,3,1,2]"
      }
    ],
    hints: [
      "Find median using quickselect", 
      "Partition around median and rearrange"
    ],
    source: "leetcode",
    sourceId: "324",
    tags: ["array", "divide-and-conquer", "quickselect"]
  },
  {
    id: "qs-p4",
    algorithm: "quick-sort",
    title: "Array Partition I",
    difficulty: "easy",
    description: "Partition array into n pairs such that sum of min(ai, bi) is maximized.",
    constraints: [
      "n == nums.length",
      "1 <= n <= 10^4", 
      "n is even",
      "-10^4 <= nums[i] <= 10^4"
    ],
    examples: [
      {
        input: "nums = [1,4,3,2]",
        output: "4",
        explanation: "Pairs: (1,2) and (3,4). Sum of mins: 1 + 3 = 4"
      }
    ],
    testCases: [
      {
        input: "[1,4,3,2]",
        expectedOutput: "4"
      },
      {
        input: "[6,2,6,5,1,2]",
        expectedOutput: "9"
      }
    ],
    hints: [
      "Sort the array first",
      "Take every alternate element starting from index 0"
    ],
    source: "leetcode",
    sourceId: "561", 
    tags: ["array", "greedy", "sorting"]
  },
  {
    id: "qs-p5",
    algorithm: "quick-sort",
    title: "3Sum Closest",
    difficulty: "medium",
    description: "Find three integers whose sum is closest to the target.",
    constraints: [
      "3 <= nums.length <= 1000",
      "-1000 <= nums[i] <= 1000",
      "-10^4 <= target <= 10^4"
    ],
    examples: [
      {
        input: "nums = [-1,2,1,-4], target = 1", 
        output: "2",
        explanation: "Sum closest to 1 is 2 (-1 + 2 + 1 = 2)"
      }
    ],
    testCases: [
      {
        input: "[-1,2,1,-4], 1",
        expectedOutput: "2"
      },
      {
        input: "[0,0,0], 1",
        expectedOutput: "0"
      }
    ],
    hints: [
      "Sort array first",
      "Use two pointers for each fixed element"
    ],
    source: "leetcode",
    sourceId: "16",
    tags: ["array", "two-pointers", "sorting"]
  }
];

export const DIJKSTRA_CHALLENGES: ProblemChallenge[] = [
  {
    id: "dj-p1", 
    algorithm: "dijkstra",
    title: "Network Delay Time",
    difficulty: "medium",
    description: "Find minimum time for signal to reach all nodes from source node K.",
    constraints: [
      "1 <= k <= n <= 100",
      "1 <= times.length <= 6000",
      "times[i] = [ui, vi, wi]"
    ],
    examples: [
      {
        input: "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2",
        output: "2",
        explanation: "Signal takes 2 units to reach all nodes from node 2"
      }
    ],
    testCases: [
      {
        input: "[[2,1,1],[2,3,1],[3,4,1]], 4, 2", 
        expectedOutput: "2"
      },
      {
        input: "[[1,2,1]], 2, 1",
        expectedOutput: "1"
      }
    ],
    hints: [
      "Use Dijkstra's algorithm from source node",
      "Return maximum distance among all reachable nodes"
    ],
    source: "leetcode",
    sourceId: "743",
    tags: ["graph", "dijkstra", "shortest-path"]
  },
  {
    id: "dj-p2",
    algorithm: "dijkstra",
    title: "Cheapest Flights Within K Stops",
    difficulty: "medium", 
    description: "Find cheapest flight from src to dst with at most K stops.",
    constraints: [
      "1 <= n <= 100",
      "0 <= flights.length <= (n * (n - 1) / 2)",
      "flights[i].length == 3",
      "0 <= src, dst, k < n"
    ],
    examples: [
      {
        input: "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1",
        output: "200",
        explanation: "Cheapest path: 0->1->2 with cost 200"
      }
    ],
    testCases: [
      {
        input: "3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 1",
        expectedOutput: "200"
      },
      {
        input: "3, [[0,1,100],[1,2,100],[0,2,500]], 0, 2, 0", 
        expectedOutput: "500"
      }
    ],
    hints: [
      "Modified Dijkstra with stop count constraint",
      "Track both cost and number of stops"
    ],
    source: "leetcode",
    sourceId: "787",
    tags: ["graph", "dijkstra", "dynamic-programming"]
  },
  {
    id: "dj-p3",
    algorithm: "dijkstra",
    title: "Path With Maximum Probability",
    difficulty: "medium",
    description: "Find path from start to end with maximum probability of success.",
    constraints: [
      "2 <= n <= 10^4",
      "0 <= edges.length <= 2 * 10^4", 
      "0 <= start, end < n",
      "0 <= succProb[i] <= 1"
    ],
    examples: [
      {
        input: "n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2",
        output: "0.25",
        explanation: "Path 0->1->2 has probability 0.5 * 0.5 = 0.25"
      }
    ],
    testCases: [
      {
        input: "3, [[0,1],[1,2],[0,2]], [0.5,0.5,0.2], 0, 2",
        expectedOutput: "0.25"
      },
      {
        input: "3, [[0,1],[1,2],[0,2]], [0.5,0.5,0.3], 0, 2",
        expectedOutput: "0.3"
      }
    ],
    hints: [
      "Use modified Dijkstra for maximum probability", 
      "Use multiplication instead of addition for probabilities"
    ],
    source: "leetcode",
    sourceId: "1514",
    tags: ["graph", "dijkstra", "probability"]
  },
  {
    id: "dj-p4",
    algorithm: "dijkstra",
    title: "Minimum Cost to Make Array Connected",
    difficulty: "hard",
    description: "Find minimum cost to connect all computers with given connection costs.",
    constraints: [
      "1 <= n <= 10^5",
      "1 <= connections.length <= min(n*(n-1)/2, 10^5)",
      "connections[i] = [ai, bi, costi]"
    ],
    examples: [
      {
        input: "n = 4, connections = [[0,1,1],[1,2,3],[2,3,4]]", 
        output: "6",
        explanation: "Connect all computers with minimum cost 1+3+2=6"
      }
    ],
    testCases: [
      {
        input: "4, [[0,1,1],[1,2,3],[2,3,4]]",
        expectedOutput: "6"
      },
      {
        input: "6, [[0,1,5],[1,2,10],[2,3,15],[3,4,20],[4,5,25]]",
        expectedOutput: "75"
      }
    ],
    hints: [
      "This is a Minimum Spanning Tree problem",
      "Use Prim's algorithm (similar to Dijkstra)"
    ],
    source: "custom",
    tags: ["graph", "minimum-spanning-tree", "prim"]
  },
  {
    id: "dj-p5",
    algorithm: "dijkstra", 
    title: "Shortest Path in Binary Matrix",
    difficulty: "medium",
    description: "Find shortest path from top-left to bottom-right in binary matrix (0s are walkable).",
    constraints: [
      "n == grid.length",
      "n == grid[i].length",
      "1 <= n <= 100",
      "grid[i][j] is 0 or 1"
    ],
    examples: [
      {
        input: "grid = [[0,1],[1,0]]",
        output: "-1",
        explanation: "No path exists"
      },
      {
        input: "grid = [[0,0,0],[1,1,0],[1,1,0]]",
        output: "4", 
        explanation: "Path: (0,0)->(0,1)->(0,2)->(1,2)->(2,2)"
      }
    ],
    testCases: [
      {
        input: "[[0,1],[1,0]]",
        expectedOutput: "-1"
      },
      {
        input: "[[0,0,0],[1,1,0],[1,1,0]]",
        expectedOutput: "4"
      }
    ],
    hints: [
      "Use BFS or Dijkstra on grid",
      "Consider 8-directional movement"
    ],
    source: "leetcode",
    sourceId: "1091",
    tags: ["array", "breadth-first-search", "matrix"]
  }
];

export const BINARY_SEARCH_CHALLENGES: ProblemChallenge[] = [
  {
    id: "bs-p1",
    algorithm: "binary-search",
    title: "Search Insert Position", 
    difficulty: "easy",
    description: "Given a sorted array and a target value, return the index if found. If not, return the index where it would be inserted.",
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "nums contains distinct values sorted in ascending order"
    ],
    examples: [
      {
        input: "nums = [1,3,5,6], target = 5",
        output: "2",
        explanation: "5 is found at index 2"
      },
      {
        input: "nums = [1,3,5,6], target = 2", 
        output: "1",
        explanation: "2 should be inserted at index 1"
      }
    ],
    testCases: [
      {
        input: "[1,3,5,6], 5",
        expectedOutput: "2"
      },
      {
        input: "[1,3,5,6], 2",
        expectedOutput: "1"
      },
      {
        input: "[1,3,5,6], 7",
        expectedOutput: "4"
      }
    ],
    hints: [
      "Use binary search with modified termination condition",
      "When not found, left pointer indicates insertion position"
    ],
    source: "leetcode",
    sourceId: "35",
    tags: ["array", "binary-search"]
  },
  {
    id: "bs-p2",
    algorithm: "binary-search",
    title: "Find First and Last Position", 
    difficulty: "medium",
    description: "Find the starting and ending position of a given target value in a sorted array.",
    constraints: [
      "0 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9", 
      "nums is a non-decreasing array"
    ],
    examples: [
      {
        input: "nums = [5,7,7,8,8,10], target = 8",
        output: "[3,4]",
        explanation: "8 appears from index 3 to 4"
      }
    ],
    testCases: [
      {
        input: "[5,7,7,8,8,10], 8",
        expectedOutput: "[3,4]"
      },
      {
        input: "[5,7,7,8,8,10], 6",
        expectedOutput: "[-1,-1]"
      }
    ],
    hints: [
      "Use binary search twice: once for leftmost, once for rightmost",
      "Modify binary search to find bounds instead of exact match"
    ],
    source: "leetcode",
    sourceId: "34", 
    tags: ["array", "binary-search"]
  },
  {
    id: "bs-p3",
    algorithm: "binary-search",
    title: "Search in Rotated Sorted Array",
    difficulty: "medium",
    description: "Search for a target in a rotated sorted array. Array was sorted then rotated at some pivot.",
    constraints: [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "All values in nums are unique"
    ],
    examples: [
      {
        input: "nums = [4,5,6,7,0,1,2], target = 0",
        output: "4",
        explanation: "0 is found at index 4" 
      }
    ],
    testCases: [
      {
        input: "[4,5,6,7,0,1,2], 0",
        expectedOutput: "4"
      },
      {
        input: "[4,5,6,7,0,1,2], 3",
        expectedOutput: "-1"
      }
    ],
    hints: [
      "One half of the array is always sorted",
      "Determine which half is sorted and search accordingly"
    ],
    source: "leetcode",
    sourceId: "33",
    tags: ["array", "binary-search"]
  },
  {
    id: "bs-p4", 
    algorithm: "binary-search",
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "medium",
    description: "Find the minimum element in a rotated sorted array.",
    constraints: [
      "n == nums.length",
      "1 <= n <= 5000",
      "-5000 <= nums[i] <= 5000", 
      "All integers in nums are unique"
    ],
    examples: [
      {
        input: "nums = [3,4,5,1,2]",
        output: "1",
        explanation: "The minimum element is 1"
      }
    ],
    testCases: [
      {
        input: "[3,4,5,1,2]",
        expectedOutput: "1"
      },
      {
        input: "[4,5,6,7,0,1,2]",
        expectedOutput: "0"
      }
    ],
    hints: [
      "Compare middle element with rightmost element",
      "Minimum is always in the unsorted half"
    ],
    source: "leetcode",
    sourceId: "153",
    tags: ["array", "binary-search"]
  },
  {
    id: "bs-p5",
    algorithm: "binary-search",
    title: "Sqrt(x)",
    difficulty: "easy", 
    description: "Implement int sqrt(int x). Return the integer part of the square root.",
    constraints: [
      "0 <= x <= 2^31 - 1"
    ],
    examples: [
      {
        input: "x = 4",
        output: "2",
        explanation: "The square root of 4 is 2"
      },
      {
        input: "x = 8",
        output: "2", 
        explanation: "The square root of 8 is 2.828..., integer part is 2"
      }
    ],
    testCases: [
      {
        input: "4",
        expectedOutput: "2"
      },
      {
        input: "8",
        expectedOutput: "2"
      },
      {
        input: "1",
        expectedOutput: "1"
      }
    ],
    hints: [
      "Use binary search on the range [0, x]",
      "Check if mid * mid <= x"
    ],
    source: "leetcode",
    sourceId: "69",
    tags: ["math", "binary-search"]
  }
];

// Insertion Sort Quiz Questions
export const INSERTION_SORT_QUIZ: QuizQuestion[] = [
  {
    id: "is-q1",
    algorithm: "insertion-sort",
    type: "multiple-choice",
    difficulty: "easy",
    question: "What is the best-case time complexity of insertion sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctAnswer: "O(n)",
    explanation: "In the best case (already sorted array), insertion sort only needs to make one comparison per element, resulting in O(n) time complexity.",
    source: "custom"
  },
  {
    id: "is-q2",
    algorithm: "insertion-sort",
    type: "multiple-choice",
    difficulty: "easy",
    question: "Which statement about insertion sort is TRUE?",
    options: [
      "It is not stable",
      "It sorts in-place",
      "It always runs in O(n²) time",
      "It requires O(n) extra space"
    ],
    correctAnswer: "It sorts in-place",
    explanation: "Insertion sort is stable, in-place, and adaptive with O(1) extra space.",
    source: "custom"
  },
  {
    id: "is-q3",
    algorithm: "insertion-sort",
    type: "multiple-choice",
    difficulty: "medium",
    question: "When is insertion sort most efficient compared to other O(n²) algorithms?",
    options: [
      "For very large datasets",
      "For small datasets and nearly sorted arrays",
      "For reverse-sorted arrays",
      "For arrays with many duplicates"
    ],
    correctAnswer: "For small datasets and nearly sorted arrays",
    explanation: "Insertion sort is adaptive and performs well on small or nearly sorted datasets.",
    source: "custom"
  },
  {
    id: "is-q4",
    algorithm: "insertion-sort",
    type: "multiple-choice",
    difficulty: "medium",
    question: "In insertion sort, where does each element get inserted?",
    options: [
      "At the beginning of the array",
      "At the end of the sorted portion",
      "In its correct position within the sorted portion",
      "At a random position"
    ],
    correctAnswer: "In its correct position within the sorted portion",
    explanation: "Each element is inserted into its correct position within the already sorted portion of the array.",
    source: "custom"
  },
  {
    id: "is-q5",
    algorithm: "insertion-sort",
    type: "multiple-choice",
    difficulty: "hard",
    question: "What is the maximum number of comparisons needed for insertion sort on an array of n elements?",
    options: ["n", "n-1", "n(n-1)/2", "n²"],
    correctAnswer: "n(n-1)/2",
    explanation: "In the worst case (reverse sorted), insertion sort makes 1+2+...+(n-1) = n(n-1)/2 comparisons.",
    source: "custom"
  }
];

// Insertion Sort Problem Challenges
export const INSERTION_SORT_CHALLENGES: ProblemChallenge[] = [
  {
    id: "is-c1",
    algorithm: "insertion-sort",
    title: "Insertion Sort List",
    difficulty: "medium",
    description: "Given the head of a singly linked list, sort the list using insertion sort, and return the sorted list's head.",
    constraints: [
      "The number of nodes in the list is in the range [1, 5000]",
      "-5000 <= Node.val <= 5000"
    ],
    examples: [
      {
        input: "head = [4,2,1,3]",
        output: "[1,2,3,4]",
        explanation: "The linked list is sorted in ascending order."
      }
    ],
    testCases: [
      { input: "[4,2,1,3]", expectedOutput: "[1,2,3,4]" },
      { input: "[-1,5,3,4,0]", expectedOutput: "[-1,0,3,4,5]" }
    ],
    hints: [
      "Maintain a sorted portion and insert each node into correct position",
      "Use dummy head to simplify edge cases"
    ],
    source: "leetcode",
    sourceId: "147",
    tags: ["linked-list", "sorting"]
  }
];

// Export all quiz data organized by algorithm
export const ALGORITHM_QUIZ_DATA = {
  "linear-search": {
    quiz: LINEAR_SEARCH_QUIZ,
    challenges: LINEAR_SEARCH_CHALLENGES
  },
  "binary-search": {
    quiz: BINARY_SEARCH_QUIZ, 
    challenges: BINARY_SEARCH_CHALLENGES
  },
  "bubble-sort": {
    quiz: BUBBLE_SORT_QUIZ,
    challenges: BUBBLE_SORT_CHALLENGES
  },
  "quick-sort": {
    quiz: QUICK_SORT_QUIZ,
    challenges: QUICK_SORT_CHALLENGES  
  },
  "merge-sort": {
    quiz: MERGE_SORT_QUIZ,
    challenges: MERGE_SORT_CHALLENGES
  },
  "insertion-sort": {
    quiz: INSERTION_SORT_QUIZ,
    challenges: INSERTION_SORT_CHALLENGES
  },
  "dijkstra": {
    quiz: DIJKSTRA_QUIZ,
    challenges: DIJKSTRA_CHALLENGES
  }
} as const;

type AlgorithmKey = keyof typeof ALGORITHM_QUIZ_DATA;

// Utility functions
export const getQuizByAlgorithm = (algorithm: string): QuizQuestion[] => {
  if (algorithm in ALGORITHM_QUIZ_DATA) {
    return ALGORITHM_QUIZ_DATA[algorithm as AlgorithmKey]?.quiz || [];
  }
  return [];
};

export const getChallengesByAlgorithm = (algorithm: string): ProblemChallenge[] => {
  if (algorithm in ALGORITHM_QUIZ_DATA) {
    return ALGORITHM_QUIZ_DATA[algorithm as AlgorithmKey]?.challenges || [];
  }
  return [];
};

export const getAllQuizzes = (): QuizQuestion[] => {
  const allQuizzes: QuizQuestion[] = [];
  Object.values(ALGORITHM_QUIZ_DATA).forEach(data => {
    allQuizzes.push(...data.quiz);
  });
  return allQuizzes;
};

export const getAllChallenges = (): ProblemChallenge[] => {
  const allChallenges: ProblemChallenge[] = [];
  Object.values(ALGORITHM_QUIZ_DATA).forEach(data => {
    allChallenges.push(...data.challenges);
  });
  return allChallenges;
};

export const getQuizById = (id: string): QuizQuestion | undefined => {
  return getAllQuizzes().find(quiz => quiz.id === id);
};

export const getChallengeById = (id: string): ProblemChallenge | undefined => {
  return getAllChallenges().find(challenge => challenge.id === id);
};