import { Algorithm } from './algorithms-data';

// Helper function to create algorithm with comprehensive data
function createAlgorithm(
    id: number,
    name: string,
    domainId: number,
    domain: string,
    category: string,
    difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert",
    paradigm: string,
    description: string,
    implementation: string,
    pseudocode: string,
    intuition: string,
    visualizationType: "array" | "graph" | "tree" | "matrix" | "network" | "geometric" | "custom",
    timeComplexity: { best: string; average: string; worst: string },
    spaceComplexity: string,
    applications: string[],
    advantages: string[],
    disadvantages: string[],
    stepByStepWorking?: string[],
    dryRun?: string,
    keyPoints?: string[],
    problemStatement?: string,
    precondition?: string,
    inventor?: string,
    yearIntroduced?: number
): Algorithm {
    const slug = name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    return {
        _id: id.toString(),
        name,
        slug,
        description,
        category,
        domain,
        domainId,
        algorithmNumber: id,
        difficulty,
        paradigm,
        tags: [category.toLowerCase(), paradigm.toLowerCase(), domain.toLowerCase()],
        timeComplexity,
        spaceComplexity,
        implementation,
        pseudocode,
        intuition,
        visualizationType,
        applications,
        advantages,
        disadvantages,
        relatedAlgorithms: [],
        researchReferences: [],
        language: "javascript",
        useCases: applications,
        realWorldExamples: applications,
        stepByStepWorking,
        dryRun,
        keyPoints,
        problemStatement,
        precondition,
        inventor,
        yearIntroduced
    };
}

// ==========================================
// SEARCHING ALGORITHMS
// ==========================================

export const LINEAR_SEARCH = createAlgorithm(
    1,
    "Linear Search",
    1,
    "DSA",
    "Searching",
    "Beginner",
    "Sequential",
    "Finds a given element in a list by checking each element one by one until the target is found or the list ends. Works on both sorted and unsorted data.",
    `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}`,
    `LinearSearch(arr, n, target):
    for i ← 0 to n-1:
        if arr[i] == target:
            return i
    return -1`,
    "Linear Search scans the array from the first element to the last, comparing each element with the target value. If a match is found, it returns the index. If the end is reached, the element is not found.",
    "array",
    { best: "O(1)", average: "O(n)", worst: "O(n)" },
    "O(1)",
    ["Searching names in an unsorted contact list", "Finding a roll number in a class list", "Checking availability of an item"],
    ["Simple to understand", "Works on unsorted data", "No extra memory needed"],
    ["Slow for large datasets", "Inefficient compared to Binary Search"],
    [
        "Start from the first element of the array",
        "Compare the current element with the target",
        "If match found → stop and return index",
        "Otherwise → move to the next element",
        "Repeat until array ends",
        "If not found → return -1"
    ],
    `Array = [25, 10, 45, 30, 60]
Target = 45

Step 1: Index 0, Element 25, 25 ≠ 45
Step 2: Index 1, Element 10, 10 ≠ 45
Step 3: Index 2, Element 45, ✅ Found at index 2`,
    ["Works on unsorted arrays", "No preprocessing required", "Simple implementation"],
    "Find the index of a target element in an array",
    undefined,
    undefined,
    undefined
);

export const BINARY_SEARCH = createAlgorithm(
    2,
    "Binary Search",
    1,
    "DSA",
    "Searching",
    "Intermediate",
    "Divide and Conquer",
    "Efficiently finds a target element in a sorted array by repeatedly dividing the search space into half.",
    `function binarySearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    
    return -1;
}`,
    `BinarySearch(arr, n, target):
    low ← 0
    high ← n - 1
    
    while low ≤ high:
        mid ← (low + high) / 2
        
        if arr[mid] == target:
            return mid
        else if arr[mid] < target:
            low ← mid + 1
        else:
            high ← mid - 1
    
    return -1`,
    "Binary Search works by comparing the target value with the middle element of a sorted array. If equal, element found. If target is smaller, search left half. If target is larger, search right half. This reduces the search space by 50% each step.",
    "array",
    { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    "O(1)",
    ["Dictionary word search", "Database indexing", "Searching in sorted files", "Autocomplete systems"],
    ["Very fast for large datasets", "Logarithmic time complexity", "Efficient memory usage"],
    ["Requires sorted data", "Not suitable for frequently changing data"],
    [
        "Set low = 0 and high = n - 1",
        "Find middle index: mid = (low + high) / 2",
        "Compare arr[mid] with target",
        "If equal → element found",
        "If target is smaller → search left half (high = mid - 1)",
        "If target is larger → search right half (low = mid + 1)",
        "Repeat until found or range becomes invalid"
    ],
    `Sorted Array = [10, 20, 30, 40, 50, 60]
Target = 40

Step 1: low=0, high=5, mid=2, arr[2]=30, 30 < 40 → search right
Step 2: low=3, high=5, mid=4, arr[4]=50, 50 > 40 → search left
Step 3: low=3, high=3, mid=3, arr[3]=40 ✅ Found at index 3`,
    ["Requires sorted array", "Divide and conquer approach", "Logarithmic time complexity"],
    "Find an element in a sorted array efficiently",
    "Array must be sorted",
    undefined,
    undefined
);

export const JUMP_SEARCH = createAlgorithm(
    3,
    "Jump Search",
    1,
    "DSA",
    "Searching",
    "Intermediate",
    "Block Search",
    "Efficiently searches for an element in a sorted array by jumping ahead in fixed steps instead of checking every element.",
    `function jumpSearch(arr, target) {
    const n = arr.length;
    const step = Math.floor(Math.sqrt(n));
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
    `JumpSearch(arr, n, target):
    step ← √n
    prev ← 0
    
    while arr[min(step, n) - 1] < target:
        prev ← step
        step ← step + √n
        if prev ≥ n:
            return -1
    
    for i ← prev to min(step, n) - 1:
        if arr[i] == target:
            return i
    
    return -1`,
    "Jump Search divides the array into blocks of size √n and jumps ahead block by block. If the target is greater than the last element of the block, jump ahead. If smaller or equal, perform Linear Search inside that block.",
    "array",
    { best: "O(1)", average: "O(√n)", worst: "O(√n)" },
    "O(1)",
    ["Searching in sorted databases", "When random access is allowed", "Memory-efficient searching"],
    ["Faster than Linear Search", "Simple logic", "No recursion"],
    ["Requires sorted data", "Slower than Binary Search", "Jump size choice affects performance"],
    [
        "Choose jump size = √n",
        "Jump ahead until current block's last element ≥ target",
        "Perform Linear Search within that block",
        "If found → return index",
        "If not → return -1"
    ],
    `Sorted Array = [10, 20, 30, 40, 50, 60, 70, 80]
Target = 50
n = 8, step = √8 ≈ 2

Jump 1: Index 1, Value 20, 20 < 50
Jump 2: Index 3, Value 40, 40 < 50
Jump 3: Index 5, Value 60, 60 > 50 → block found
Linear Search between indices 4-5: Index 4, Value 50 ✅`,
    ["Block-based searching", "Combines jumping and linear scanning", "Square root time complexity"],
    "Find an element in a sorted array using block jumping",
    "Array must be sorted",
    undefined,
    undefined
);

export const INTERPOLATION_SEARCH = createAlgorithm(
    4,
    "Interpolation Search",
    1,
    "DSA",
    "Searching",
    "Advanced",
    "Position Estimation",
    "Searches for an element in a sorted and uniformly distributed array by estimating the probable position of the target.",
    `function interpolationSearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        const pos = low + Math.floor(
            ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
        );
        
        if (arr[pos] === target) {
            return pos;
        }
        
        if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    
    return -1;
}`,
    `InterpolationSearch(arr, n, target):
    low ← 0
    high ← n - 1
    
    while low ≤ high AND target ≥ arr[low] AND target ≤ arr[high]:
        pos ← low + ((target - arr[low]) * (high - low)) 
                     / (arr[high] - arr[low])
        
        if arr[pos] == target:
            return pos
        
        if arr[pos] < target:
            low ← pos + 1
        else:
            high ← pos - 1
    
    return -1`,
    "Instead of always checking the middle element (like Binary Search), Interpolation Search calculates the expected position using a formula. This makes the search faster than Binary Search when values are evenly distributed.",
    "array",
    { best: "O(1)", average: "O(log log n)", worst: "O(n)" },
    "O(1)",
    ["Large uniformly distributed datasets", "Telephone directories", "Search in numeric databases"],
    ["Faster than Binary Search (average case)", "Very efficient for uniform data", "Constant space"],
    ["Poor performance on non-uniform data", "Division by zero risk", "Needs sorted data"],
    [
        "Set low = 0 and high = n - 1",
        "Estimate position using interpolation formula",
        "Compare target with estimated position",
        "Narrow the search range",
        "Repeat until found or range becomes invalid"
    ],
    `Sorted Array = [10, 20, 30, 40, 50, 60, 70, 80]
Target = 70

pos = 0 + ((70 - 10) * (7 - 0)) / (80 - 10)
    = (60 * 7) / 70 = 6
Step 1: pos=6, arr[6]=70 ✅ Found`,
    ["Mathematical estimation", "Adapts based on value distribution", "O(log log n) average case"],
    "Find an element in a sorted uniformly distributed array",
    "Array must be sorted and uniformly distributed",
    undefined,
    undefined
);

export const EXPONENTIAL_SEARCH = createAlgorithm(
    5,
    "Exponential Search",
    1,
    "DSA",
    "Searching",
    "Advanced",
    "Range Finding + Binary Search",
    "Efficiently searches for an element in a sorted array by first finding a suitable search range exponentially, then applying Binary Search within that range.",
    `function exponentialSearch(arr, target) {
    if (arr[0] === target) return 0;
    
    let i = 1;
    while (i < arr.length && arr[i] <= target) {
        i *= 2;
    }
    
    return binarySearch(arr, Math.floor(i / 2), Math.min(i, arr.length - 1), target);
}`,
    `ExponentialSearch(arr, n, target):
    if arr[0] == target:
        return 0
    
    i ← 1
    while i < n AND arr[i] ≤ target:
        i ← i * 2
    
    return BinarySearch(arr, i/2, min(i, n-1), target)`,
    "Exponential Search works in two phases: Range Identification (finds range by checking indices in powers of 2) and Binary Search (applied within that range). Especially useful for unbounded or infinite arrays.",
    "array",
    { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    "O(1)",
    ["Searching in infinite or unbounded arrays", "Large sorted databases", "Streaming data with unknown size"],
    ["Faster range discovery", "Works well with large datasets", "Efficient when array size is unknown"],
    ["Requires sorted data", "Binary Search dependency", "Slightly more complex than Binary Search"],
    [
        "If first element is target → return index 0",
        "Start with index i = 1",
        "Double i until arr[i] > target or index exceeds array size",
        "Perform Binary Search between i/2 and min(i, n-1)",
        "Return index if found, else -1"
    ],
    `Sorted Array = [2, 4, 8, 16, 32, 64, 128, 256]
Target = 64

Step 1: i=1, arr[1]=4, 4 ≤ 64
Step 2: i=2, arr[2]=8, 8 ≤ 64
Step 3: i=4, arr[4]=32, 32 ≤ 64
Step 4: i=8, arr[8] out of range
Binary Search Range: i/2=4 to min(i, n-1)=7
Binary Search on [32, 64, 128, 256] → Found at index 5`,
    ["Exponential range finding", "Combines exponential and binary search", "Useful for unbounded arrays"],
    "Find an element in a sorted array using exponential range finding",
    "Array must be sorted",
    undefined,
    undefined
);

export const FIBONACCI_SEARCH = createAlgorithm(
    6,
    "Fibonacci Search",
    1,
    "DSA",
    "Searching",
    "Advanced",
    "Fibonacci Division",
    "Searches for an element in a sorted array using Fibonacci numbers to divide the search space instead of halving it.",
    `function fibonacciSearch(arr, target) {
    let fib2 = 0;
    let fib1 = 1;
    let fib = fib1 + fib2;
    const n = arr.length;
    
    while (fib < n) {
        fib2 = fib1;
        fib1 = fib;
        fib = fib1 + fib2;
    }
    
    let offset = -1;
    
    while (fib > 1) {
        const i = Math.min(offset + fib2, n - 1);
        
        if (arr[i] < target) {
            fib = fib1;
            fib1 = fib2;
            fib2 = fib - fib1;
            offset = i;
        } else if (arr[i] > target) {
            fib = fib2;
            fib1 = fib1 - fib2;
            fib2 = fib - fib1;
        } else {
            return i;
        }
    }
    
    if (fib1 && arr[offset + 1] === target) {
        return offset + 1;
    }
    
    return -1;
}`,
    `FibonacciSearch(arr, n, target):
    fib2 ← 0
    fib1 ← 1
    fib ← fib1 + fib2
    
    while fib < n:
        fib2 ← fib1
        fib1 ← fib
        fib ← fib1 + fib2
    
    offset ← -1
    
    while fib > 1:
        i ← min(offset + fib2, n - 1)
        
        if arr[i] < target:
            fib ← fib1
            fib1 ← fib2
            fib2 ← fib - fib1
            offset ← i
        else if arr[i] > target:
            fib ← fib2
            fib1 ← fib1 - fib2
            fib2 ← fib - fib1
        else:
            return i
    
    if fib1 AND arr[offset + 1] == target:
        return offset + 1
    
    return -1`,
    "Fibonacci Search uses Fibonacci numbers to determine the probe position. It divides the array into two parts whose sizes are consecutive Fibonacci numbers. Uses addition and subtraction instead of division.",
    "array",
    { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    "O(1)",
    ["Systems where division is expensive", "Embedded systems", "Large sorted datasets"],
    ["No division operations", "Logarithmic time complexity", "Efficient for large arrays"],
    ["Requires sorted data", "More complex than Binary Search", "Rarely used in practice"],
    [
        "Generate the smallest Fibonacci number ≥ array size",
        "Use Fibonacci numbers to calculate probe index",
        "Compare target with probe element",
        "Shift Fibonacci numbers based on comparison",
        "Repeat until element is found or range becomes empty"
    ],
    `Sorted Array = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90]
Target = 45
n = 10, Fibonacci numbers: 0, 1, 1, 2, 3, 5, 8, 13
Smallest Fibonacci ≥ n is 13

Step 1: Index checked = 4, Value = 45 ✅ Found`,
    ["Fibonacci-based partitioning", "Avoids division operations", "Similar goal to Binary Search"],
    "Find an element in a sorted array using Fibonacci numbers",
    "Array must be sorted",
    undefined,
    undefined
);

export const TERNARY_SEARCH = createAlgorithm(
    7,
    "Ternary Search",
    1,
    "DSA",
    "Searching",
    "Advanced",
    "Divide and Conquer",
    "Searches for an element in a sorted array by dividing the array into three parts instead of two.",
    `function ternarySearch(arr, low, high, target) {
    if (low <= high) {
        const mid1 = low + Math.floor((high - low) / 3);
        const mid2 = high - Math.floor((high - low) / 3);
        
        if (arr[mid1] === target) return mid1;
        if (arr[mid2] === target) return mid2;
        
        if (target < arr[mid1]) {
            return ternarySearch(arr, low, mid1 - 1, target);
        } else if (target > arr[mid2]) {
            return ternarySearch(arr, mid2 + 1, high, target);
        } else {
            return ternarySearch(arr, mid1 + 1, mid2 - 1, target);
        }
    }
    
    return -1;
}`,
    `TernarySearch(arr, low, high, target):
    if low ≤ high:
        mid1 ← low + (high - low) / 3
        mid2 ← high - (high - low) / 3
        
        if arr[mid1] == target:
            return mid1
        if arr[mid2] == target:
            return mid2
        
        if target < arr[mid1]:
            return TernarySearch(arr, low, mid1 - 1, target)
        else if target > arr[mid2]:
            return TernarySearch(arr, mid2 + 1, high, target)
        else:
            return TernarySearch(arr, mid1 + 1, mid2 - 1, target)
    
    return -1`,
    "Ternary Search splits the array into three parts using two mid points (mid1 and mid2). The target is compared with both mid values, and the search continues in one of the three segments.",
    "array",
    { best: "O(1)", average: "O(log₃ n)", worst: "O(log₃ n)" },
    "O(log n)",
    ["Mathematical optimization", "Searching unimodal functions", "Educational algorithm comparison"],
    ["Three-way division", "Logarithmic base 3 complexity", "Useful for unimodal functions"],
    ["Requires sorted data", "More comparisons than Binary Search", "Recursive overhead"],
    [
        "Calculate two mid points (mid1 and mid2)",
        "Compare target with mid1 and mid2",
        "Decide which third to search",
        "Repeat until found or range becomes invalid"
    ],
    `Sorted Array = [10, 20, 30, 40, 50, 60]
Target = 40

Step 1: mid1=2 (30), mid2=4 (50)
        30 < 40 < 50 → search middle third
Step 2: mid1=3 (40) ✅ Found at index 3`,
    ["Three-way division", "Log base 3 complexity", "Useful for unimodal functions"],
    "Find an element in a sorted array using three-way division",
    "Array must be sorted",
    undefined,
    undefined
);

// ==========================================
// SORTING ALGORITHMS
// ==========================================

export const BUBBLE_SORT = createAlgorithm(
    11,
    "Bubble Sort",
    2,
    "DSA",
    "Sorting",
    "Beginner",
    "Comparison-based",
    "Sorts a list of elements in ascending or descending order by repeatedly swapping adjacent elements if they are in the wrong order.",
    `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
    `BubbleSort(arr, n):
    for i ← 0 to n-2:
        for j ← 0 to n-i-2:
            if arr[j] > arr[j+1]:
                swap(arr[j], arr[j+1])`,
    "Bubble Sort works by repeatedly comparing adjacent elements and swapping them if they are out of order. With each pass, the largest element 'bubbles up' to the end of the list.",
    "array",
    { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    "O(1)",
    ["Teaching and learning sorting basics", "Small datasets", "Detecting if data is already sorted"],
    ["Very simple to understand", "Easy to implement", "In-place sorting"],
    ["Very slow for large datasets", "Inefficient compared to modern sorts"],
    [
        "Start from the first element",
        "Compare adjacent elements",
        "Swap if the left element is greater than the right",
        "Move to the next pair",
        "After one full pass, the largest element is at the end",
        "Repeat for remaining elements"
    ],
    `Array = [5, 1, 4, 2, 8]

Pass 1:
[5, 1, 4, 2, 8] → Swap 5 & 1 → [1, 5, 4, 2, 8]
[1, 5, 4, 2, 8] → Swap 5 & 4 → [1, 4, 5, 2, 8]
[1, 4, 5, 2, 8] → Swap 5 & 2 → [1, 4, 2, 5, 8]

Pass 2:
[1, 4, 2, 5, 8] → Swap 4 & 2 → [1, 2, 4, 5, 8]

Array is now sorted ✅`,
    ["Adjacent comparison", "Largest element bubbles to end", "Simple but inefficient"],
    "Sort an array by repeatedly swapping adjacent elements",
    undefined,
    undefined,
    undefined
);

export const SELECTION_SORT = createAlgorithm(
    12,
    "Selection Sort",
    2,
    "DSA",
    "Sorting",
    "Beginner",
    "Comparison-based",
    "Sorts an array by repeatedly selecting the smallest (or largest) element from the unsorted part and placing it at the correct position.",
    `function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}`,
    `SelectionSort(arr, n):
    for i ← 0 to n-2:
        minIndex ← i
        for j ← i+1 to n-1:
            if arr[j] < arr[minIndex]:
                minIndex ← j
        swap(arr[i], arr[minIndex])`,
    "Selection Sort divides the array into two parts: sorted part (left side) and unsorted part (right side). In each iteration, find the minimum element from the unsorted part and swap it with the first element of the unsorted part.",
    "array",
    { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    "O(1)",
    ["Systems where swap operations are costly", "Educational purposes", "Small datasets"],
    ["Simple logic", "Minimal swaps", "In-place sorting"],
    ["Inefficient for large datasets", "Always O(n²) regardless of input"],
    [
        "Assume the first element is the minimum",
        "Compare it with remaining elements",
        "Find the actual minimum element",
        "Swap it with the first unsorted position",
        "Move the boundary of sorted part by one",
        "Repeat until array is sorted"
    ],
    `Array = [64, 25, 12, 22, 11]

Pass 1: Minimum = 11, Swap 64 ↔ 11 → [11, 25, 12, 22, 64]
Pass 2: Minimum = 12, Swap 25 ↔ 12 → [11, 12, 25, 22, 64]
Pass 3: Minimum = 22, Swap 25 ↔ 22 → [11, 12, 22, 25, 64]
Array sorted ✅`,
    ["Minimum selection each pass", "Only one swap per iteration", "In-place sorting"],
    "Sort an array by repeatedly selecting the minimum element",
    undefined,
    undefined,
    undefined
);

export const INSERTION_SORT = createAlgorithm(
    13,
    "Insertion Sort",
    2,
    "DSA",
    "Sorting",
    "Beginner",
    "Comparison-based",
    "Sorts a list by inserting each element into its correct position in the already sorted part of the array.",
    `function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}`,
    `InsertionSort(arr, n):
    for i ← 1 to n-1:
        key ← arr[i]
        j ← i - 1
        while j ≥ 0 AND arr[j] > key:
            arr[j+1] ← arr[j]
            j ← j - 1
        arr[j+1] ← key`,
    "Insertion Sort works the way we sort playing cards in our hands. The array is divided into sorted and unsorted parts. Elements from the unsorted part are picked one by one and placed in the correct position in the sorted part.",
    "array",
    { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    "O(1)",
    ["Sorting small datasets", "Nearly sorted data", "Online sorting (data arrives continuously)"],
    ["Simple and intuitive", "Efficient for small inputs", "Stable sorting algorithm", "In-place"],
    ["Inefficient for large datasets", "Quadratic time complexity"],
    [
        "Assume the first element is already sorted",
        "Pick the next element (key)",
        "Compare the key with elements in the sorted part",
        "Shift larger elements one position to the right",
        "Insert the key at the correct position",
        "Repeat until all elements are sorted"
    ],
    `Array = [12, 11, 13, 5, 6]

Pass 1 (key = 11): [11, 12, 13, 5, 6]
Pass 2 (key = 13): Already in correct position
Pass 3 (key = 5): Shift → [5, 11, 12, 13, 6]
Pass 4 (key = 6): Shift → [5, 6, 11, 12, 13] ✅`,
    ["Card sorting analogy", "Efficient for small/nearly sorted data", "Stable algorithm"],
    "Sort an array by inserting each element into its correct position",
    undefined,
    undefined,
    undefined
);

export const MERGE_SORT = createAlgorithm(
    14,
    "Merge Sort",
    2,
    "DSA",
    "Sorting",
    "Intermediate",
    "Divide and Conquer",
    "Sorts an array by dividing it into halves, sorting each half, and merging them back in sorted order.",
    `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    `MergeSort(arr, left, right):
    if left < right:
        mid ← (left + right) / 2
        MergeSort(arr, left, mid)
        MergeSort(arr, mid+1, right)
        Merge(arr, left, mid, right)`,
    "Merge Sort recursively divides the array until each subarray has one element. Then, it merges subarrays by comparing elements and arranging them in order. It guarantees consistent performance regardless of input order.",
    "array",
    { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    "O(n)",
    ["Large datasets", "External sorting", "Stable sorting requirements"],
    ["Stable sorting", "Predictable performance", "Guaranteed O(n log n)"],
    ["Extra memory required", "Not in-place"],
    [
        "Divide the array into two halves",
        "Recursively sort each half",
        "Merge the two sorted halves",
        "Repeat until the full array is merged"
    ],
    `Array = [38, 27, 43, 3, 9, 82, 10]

Divide: [38,27,43,3] | [9,82,10]
Divide: [38,27] | [43,3] | [9,82] | [10]
Divide: [38] | [27] | [43] | [3] | [9] | [82] | [10]
Merge: [27,38] | [3,43] | [9,82] | [10]
Merge: [3,27,38,43] | [9,10,82]
Merge: [3,9,10,27,38,43,82] ✅`,
    ["Divide and conquer", "Stable sorting", "Consistent performance"],
    "Sort an array using divide and conquer with merging",
    undefined,
    undefined,
    undefined
);

export const QUICK_SORT = createAlgorithm(
    15,
    "Quick Sort",
    2,
    "DSA",
    "Sorting",
    "Intermediate",
    "Divide and Conquer",
    "Sorts an array by selecting a pivot element and partitioning the array around it.",
    `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`,
    `QuickSort(arr, low, high):
    if low < high:
        p ← Partition(arr, low, high)
        QuickSort(arr, low, p-1)
        QuickSort(arr, p+1, high)`,
    "Quick Sort picks a pivot and rearranges elements so that elements smaller than pivot go left, elements greater than pivot go right. It then recursively sorts both partitions.",
    "array",
    { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    "O(log n)",
    ["General-purpose sorting", "Large datasets", "When average performance matters"],
    ["Very fast in practice", "In-place sorting", "Cache-friendly"],
    ["Worst case if pivot is poor", "Not stable"],
    [
        "Choose a pivot element",
        "Partition the array around the pivot",
        "Recursively apply Quick Sort to left and right subarrays"
    ],
    `Array = [10, 7, 8, 9, 1, 5]
Pivot = 5

Partition: [1, 5, 8, 9, 10, 7]
Left: [1], Right: [8, 9, 10, 7]
Sort Right: [7, 8, 9, 10]
Result: [1, 5, 7, 8, 9, 10] ✅`,
    ["Pivot-based partitioning", "Fast average case", "In-place"],
    "Sort an array using pivot-based partitioning",
    undefined,
    undefined,
    undefined
);

export const HEAP_SORT = createAlgorithm(
    16,
    "Heap Sort",
    2,
    "DSA",
    "Sorting",
    "Intermediate",
    "Heap / Selection-based",
    "Sorts an array by converting it into a Max Heap and repeatedly removing the largest element.",
    `function heapSort(arr) {
    const n = arr.length;
    
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}`,
    `HeapSort(arr, n):
    buildMaxHeap(arr, n)
    
    for i ← n-1 down to 1:
        swap(arr[0], arr[i])
        heapify(arr, 0, i)`,
    "Heap Sort works in two phases: Build a Max Heap, then swap the root with the last element and heapify again. This continues until the heap size becomes 1.",
    "array",
    { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    "O(1)",
    ["Priority queues", "Guaranteed O(n log n) needed", "Memory-constrained systems"],
    ["Guaranteed O(n log n)", "No extra memory", "In-place"],
    ["Not stable", "Slower than Quick Sort in practice"],
    [
        "Build a Max Heap",
        "Swap the root with the last element",
        "Reduce heap size",
        "Heapify the root",
        "Repeat"
    ],
    `Array = [12, 11, 13, 5, 6, 7]

Build Max Heap: [13, 11, 12, 5, 6, 7]
Swap 13 & 7: [7, 11, 12, 5, 6, 13]
Heapify: [12, 11, 7, 5, 6, 13]
Continue...
Result: [5, 6, 7, 11, 12, 13] ✅`,
    ["Heap-based", "Guaranteed O(n log n)", "In-place"],
    "Sort an array using heap data structure",
    undefined,
    undefined,
    undefined
);

export const COUNTING_SORT = createAlgorithm(
    17,
    "Counting Sort",
    2,
    "DSA",
    "Sorting",
    "Intermediate",
    "Non-comparison based",
    "Sorts non-negative integers by counting how many times each value appears.",
    `function countingSort(arr, k) {
    const count = new Array(k + 1).fill(0);
    const output = new Array(arr.length);
    
    for (let i = 0; i < arr.length; i++) {
        count[arr[i]]++;
    }
    
    for (let i = 1; i <= k; i++) {
        count[i] += count[i - 1];
    }
    
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }
    
    return output;
}`,
    `CountingSort(arr, n, k):
    count[0..k] ← 0
    
    for i ← 0 to n-1:
        count[arr[i]]++
    
    for i ← 1 to k:
        count[i] ← count[i] + count[i-1]
    
    for i ← n-1 down to 0:
        output[count[arr[i]] - 1] ← arr[i]
        count[arr[i]]--
    
    return output`,
    "Counting Sort counts the frequency of each element and uses this information to place elements directly into their correct sorted positions. It does not compare elements.",
    "array",
    { best: "O(n + k)", average: "O(n + k)", worst: "O(n + k)" },
    "O(n + k)",
    ["Small integer ranges", "When range is known", "Stable sorting needed"],
    ["Very fast for small ranges", "Stable sorting", "Linear time"],
    ["Not suitable for large ranges", "Only for integers"],
    [
        "Count frequency of each element",
        "Calculate cumulative counts",
        "Place elements in output array using counts"
    ],
    `Array = [4, 2, 2, 8, 3, 3, 1], k = 8

Count: [1, 0, 2, 2, 1, 0, 0, 0, 1]
Cumulative: [1, 1, 3, 5, 6, 6, 6, 6, 7]
Output: [1, 2, 2, 3, 3, 4, 8] ✅`,
    ["Counting-based", "Linear time", "Stable"],
    "Sort non-negative integers using counting",
    "Range of values must be small",
    undefined,
    undefined
);

export const RADIX_SORT = createAlgorithm(
    18,
    "Radix Sort",
    2,
    "DSA",
    "Sorting",
    "Advanced",
    "Non-comparison based",
    "Sorts numbers digit by digit (LSD → MSD or vice versa).",
    `function radixSort(arr) {
    const max = Math.max(...arr);
    
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    
    return arr;
}

function countingSortByDigit(arr, exp) {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);
    
    for (let i = 0; i < arr.length; i++) {
        count[Math.floor(arr[i] / exp) % 10]++;
    }
    
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    for (let i = arr.length - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }
}`,
    `RadixSort(arr, n):
    max ← maximum element in arr
    exp ← 1
    
    while max / exp > 0:
        CountingSortByDigit(arr, n, exp)
        exp ← exp * 10`,
    "Radix Sort processes numbers digit by digit, using a stable sort (usually Counting Sort) for each digit. It sorts from least significant digit to most significant digit.",
    "array",
    { best: "O(d × n)", average: "O(d × n)", worst: "O(d × n)" },
    "O(n + k)",
    ["Multi-digit numbers", "Large integers", "When digits are limited"],
    ["Faster than comparison sorts", "Stable sorting", "Linear time for fixed digits"],
    ["Only for integers or strings", "Extra memory required"],
    [
        "Find maximum number to determine digits",
        "Sort by least significant digit",
        "Sort by next digit",
        "Repeat for all digits"
    ],
    `Array = [170, 45, 75, 90, 802, 24, 2, 66]

Sort by ones: [170, 90, 802, 2, 24, 45, 75, 66]
Sort by tens: [802, 2, 24, 45, 66, 170, 75, 90]
Sort by hundreds: [2, 24, 45, 66, 75, 90, 170, 802] ✅`,
    ["Digit-wise sorting", "Uses counting sort per digit", "Linear for fixed digits"],
    "Sort numbers digit by digit",
    "Only works with integers or strings",
    undefined,
    undefined
);

export const BUCKET_SORT = createAlgorithm(
    19,
    "Bucket Sort",
    2,
    "DSA",
    "Sorting",
    "Intermediate",
    "Distribution-based",
    "Sorts elements by distributing them into buckets, sorting each bucket, and then merging.",
    `function bucketSort(arr) {
    const n = arr.length;
    const buckets = Array.from({ length: n }, () => []);
    
    for (let i = 0; i < n; i++) {
        const bucketIndex = Math.floor(n * arr[i]);
        buckets[bucketIndex].push(arr[i]);
    }
    
    for (let i = 0; i < n; i++) {
        buckets[i].sort((a, b) => a - b);
    }
    
    return buckets.flat();
}`,
    `BucketSort(arr, n):
    create n empty buckets
    
    for each element in arr:
        insert element into its bucket
    
    for each bucket:
        sort bucket
    
    concatenate all buckets`,
    "Bucket Sort divides elements into buckets based on range, sorts each bucket individually (often using Insertion Sort), and concatenates them.",
    "array",
    { best: "O(n)", average: "O(n)", worst: "O(n²)" },
    "O(n)",
    ["Uniformly distributed data", "Floating-point numbers", "When data is evenly spread"],
    ["Very fast for uniform data", "Linear average case"],
    ["Extra memory required", "Poor performance on non-uniform data"],
    [
        "Create k empty buckets",
        "Distribute elements into buckets based on value",
        "Sort each bucket individually",
        "Concatenate all buckets in order"
    ],
    `Array = [0.42, 0.32, 0.23, 0.52, 0.25, 0.47]

Buckets:
[0.2-0.3]: [0.23, 0.25]
[0.3-0.4]: [0.32]
[0.4-0.5]: [0.42, 0.47]
[0.5-0.6]: [0.52]

Sorted: [0.23, 0.25, 0.32, 0.42, 0.47, 0.52] ✅`,
    ["Bucket distribution", "Fast for uniform data", "Linear average"],
    "Sort uniformly distributed numbers using buckets",
    "Data should be uniformly distributed",
    undefined,
    undefined
);

export const SHELL_SORT = createAlgorithm(
    20,
    "Shell Sort",
    2,
    "DSA",
    "Sorting",
    "Intermediate",
    "Gap-based Insertion Sort",
    "Improves Insertion Sort by comparing elements far apart, reducing shifts.",
    `function shellSort(arr) {
    const n = arr.length;
    let gap = Math.floor(n / 2);
    
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    
    return arr;
}`,
    `ShellSort(arr, n):
    gap ← n / 2
    while gap > 0:
        for i ← gap to n-1:
            temp ← arr[i]
            j ← i
            while j ≥ gap AND arr[j-gap] > temp:
                arr[j] ← arr[j-gap]
                j ← j - gap
            arr[j] ← temp
        gap ← gap / 2`,
    "Shell Sort sorts elements using decreasing gap sizes until gap = 1 (normal insertion sort). This allows elements to move faster to their correct positions.",
    "array",
    { best: "O(n log n)", average: "O(n^1.5)", worst: "O(n²)" },
    "O(1)",
    ["Medium datasets", "When insertion sort is too slow", "General-purpose sorting"],
    ["Faster than insertion sort", "In-place sorting", "Better than O(n²) average"],
    ["Not stable", "Gap sequence affects performance"],
    [
        "Start with gap = n/2",
        "Sort elements at gap distance",
        "Reduce gap by half",
        "Repeat until gap = 1 (insertion sort)"
    ],
    `Array = [12, 34, 54, 2, 3], gap = 2

Gap 2: [12, 2, 3, 34, 54]
Gap 1: [2, 3, 12, 34, 54] ✅`,
    ["Gap-based", "Improves insertion sort", "In-place"],
    "Sort array using decreasing gap sizes",
    undefined,
    undefined,
    undefined
);

export const TIM_SORT = createAlgorithm(
    21,
    "Tim Sort",
    2,
    "DSA",
    "Sorting",
    "Advanced",
    "Hybrid (Merge + Insertion)",
    "Efficiently sorts real-world data by exploiting existing order.",
    `function timSort(arr) {
    const RUN = 32;
    const n = arr.length;
    
    for (let i = 0; i < n; i += RUN) {
        insertionSort(arr, i, Math.min(i + RUN - 1, n - 1));
    }
    
    for (let size = RUN; size < n; size = 2 * size) {
        for (let left = 0; left < n; left += 2 * size) {
            const mid = left + size - 1;
            const right = Math.min(left + 2 * size - 1, n - 1);
            merge(arr, left, mid, right);
        }
    }
    
    return arr;
}`,
    `TimSort(arr):
    divide array into runs
    sort each run using insertion sort
    merge runs using merge sort`,
    "Tim Sort divides array into runs, sorts runs using Insertion Sort, and merges runs using Merge Sort. Used in Python (sorted()), Java, Android.",
    "array",
    { best: "O(n)", average: "O(n log n)", worst: "O(n log n)" },
    "O(n)",
    ["Real-world data", "Python's sorted()", "Java's Arrays.sort()"],
    ["Very fast in practice", "Stable sorting", "Used in production systems"],
    ["Complex implementation", "Extra memory required"],
    [
        "Divide array into runs",
        "Sort each run using insertion sort",
        "Merge runs using merge sort"
    ],
    `Array = [5, 2, 8, 1, 9, 3, 7, 4, 6]

Runs: [5,2,8] [1,9,3] [7,4,6]
Sort runs: [2,5,8] [1,3,9] [4,6,7]
Merge: [1,2,3,5,8,9] [4,6,7]
Merge: [1,2,3,4,5,6,7,8,9] ✅`,
    ["Hybrid approach", "Exploits existing order", "Production-ready"],
    "Sort array using hybrid merge-insertion approach",
    undefined,
    "Tim Peters",
    2002
);

// Additional sorting algorithms
export const COMB_SORT = createAlgorithm(22, "Comb Sort", 2, "DSA", "Sorting", "Intermediate", "Improved Bubble Sort", "Improves Bubble Sort by eliminating small values stuck near the end using larger gaps.", `function combSort(arr) {
    const n = arr.length;
    let gap = n;
    let swapped = true;
    
    while (gap > 1 || swapped) {
        gap = Math.max(1, Math.floor(gap / 1.3));
        swapped = false;
        
        for (let i = 0; i < n - gap; i++) {
            if (arr[i] > arr[i + gap]) {
                [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
                swapped = true;
            }
        }
    }
    return arr;
}`, `CombSort(arr, n):
    gap ← n
    swapped ← true
    while gap > 1 OR swapped:
        gap ← max(1, gap / 1.3)
        swapped ← false
        for i ← 0 to n-gap-1:
            if arr[i] > arr[i+gap]:
                swap(arr[i], arr[i+gap])
                swapped ← true`, "Comb Sort compares elements with a gap > 1, shrinking the gap by a shrink factor (≈1.3) until it becomes 1 (Bubble Sort).", "array", { best: "O(n log n)", average: "O(n²)", worst: "O(n²)" }, "O(1)", ["General sorting", "When bubble sort is too slow"], ["Faster than Bubble Sort", "Simple improvement"], ["Still quadratic worst case"], undefined, undefined, undefined, undefined, undefined, undefined);

export const CYCLE_SORT = createAlgorithm(23, "Cycle Sort", 2, "DSA", "Sorting", "Advanced", "In-place, Write-efficient", "Minimizes number of writes to memory.", `function cycleSort(arr) {
    const n = arr.length;
    for (let start = 0; start < n - 1; start++) {
        let item = arr[start];
        let pos = start;
        
        for (let i = start + 1; i < n; i++) {
            if (arr[i] < item) pos++;
        }
        
        if (pos === start) continue;
        
        while (item === arr[pos]) pos++;
        [arr[pos], item] = [item, arr[pos]];
        
        while (pos !== start) {
            pos = start;
            for (let i = start + 1; i < n; i++) {
                if (arr[i] < item) pos++;
            }
            while (item === arr[pos]) pos++;
            [arr[pos], item] = [item, arr[pos]];
        }
    }
    return arr;
}`, `CycleSort(arr, n):
    for start ← 0 to n-2:
        item ← arr[start]
        pos ← start
        for i ← start+1 to n-1:
            if arr[i] < item: pos++
        swap(item, arr[pos])
        while pos ≠ start:
            pos ← start
            for i ← start+1 to n-1:
                if arr[i] < item: pos++
            swap(item, arr[pos])`, "Cycle Sort places each element directly into its correct position, forming cycles. Minimizes writes.", "array", { best: "O(n²)", average: "O(n²)", worst: "O(n²)" }, "O(1)", ["Flash memory", "When writes are expensive"], ["Minimum writes", "In-place"], ["Complex logic", "Quadratic time"], undefined, undefined, undefined, undefined, undefined, undefined);

export const ODD_EVEN_SORT = createAlgorithm(24, "Odd-Even Sort", 2, "DSA", "Sorting", "Intermediate", "Parallel Bubble Sort", "Sorts by performing odd-index swaps and even-index swaps alternately.", `function oddEvenSort(arr) {
    const n = arr.length;
    let sorted = false;
    
    while (!sorted) {
        sorted = true;
        for (let i = 1; i < n - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                sorted = false;
            }
        }
        for (let i = 0; i < n - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                sorted = false;
            }
        }
    }
    return arr;
}`, `OddEvenSort(arr, n):
    sorted ← false
    while NOT sorted:
        sorted ← true
        for i ← 1 to n-2 step 2:
            if arr[i] > arr[i+1]: swap(), sorted ← false
        for i ← 0 to n-2 step 2:
            if arr[i] > arr[i+1]: swap(), sorted ← false`, "Compare (odd, odd+1) indices, then compare (even, even+1) indices. Repeat until sorted.", "array", { best: "O(n)", average: "O(n²)", worst: "O(n²)" }, "O(1)", ["Parallel processing", "Educational purposes"], ["Parallel-friendly", "Simple"], ["Slow for large inputs"], undefined, undefined, undefined, undefined, undefined, undefined);

export const PANCAKE_SORT = createAlgorithm(25, "Pancake Sort", 2, "DSA", "Sorting", "Advanced", "Prefix Reversal", "Sorts an array using only flip operations (reverse prefix).", `function pancakeSort(arr) {
    const n = arr.length;
    for (let currSize = n; currSize > 1; currSize--) {
        const maxIndex = findMax(arr, currSize);
        if (maxIndex !== currSize - 1) {
            flip(arr, maxIndex);
            flip(arr, currSize - 1);
        }
    }
    return arr;
}

function flip(arr, k) {
    let i = 0;
    while (i < k) {
        [arr[i], arr[k]] = [arr[k], arr[i]];
        i++;
        k--;
    }
}`, `PancakeSort(arr, n):
    for currSize ← n down to 2:
        maxIndex ← findMax(arr, currSize)
        if maxIndex ≠ currSize-1:
            flip(arr, maxIndex)
            flip(arr, currSize-1)`, "Find maximum element, flip it to front, flip it to correct position. Repeat.", "array", { best: "O(n)", average: "O(n²)", worst: "O(n²)" }, "O(1)", ["Pancake flipping problem", "Educational"], ["Fun & conceptual", "In-place"], ["Not practical", "Quadratic time"], undefined, undefined, undefined, undefined, undefined, undefined);

export const STRAND_SORT = createAlgorithm(26, "Strand Sort", 2, "DSA", "Sorting", "Advanced", "Recursive / Merge-based", "Repeatedly extract increasing subsequences (strands) from the input and merge them into the result.", `function strandSort(arr) {
    const result = [];
    while (arr.length > 0) {
        const strand = [arr.shift()];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] >= strand[strand.length - 1]) {
                strand.push(arr.splice(i, 1)[0]);
                i--;
            }
        }
        result = merge(result, strand);
    }
    return result;
}`, `StrandSort(arr):
    result ← empty list
    while arr not empty:
        strand ← extract increasing subsequence from arr
        result ← merge(result, strand)
    return result`, "Take first element → start a strand. Scan remaining elements, move elements that are greater than last strand element into strand. Merge strand with output list.", "array", { best: "O(n)", average: "O(n²)", worst: "O(n²)" }, "O(n)", ["Educational purposes", "Nearly sorted data"], ["Adaptive", "Simple logic"], ["Inefficient"], undefined, undefined, undefined, undefined, undefined, undefined);

export const TOURNAMENT_SORT = createAlgorithm(27, "Tournament Sort", 2, "DSA", "Sorting", "Advanced", "Selection-based", "Elements compete like a tournament; winners move up until the smallest/largest is found.", `function tournamentSort(arr) {
    // Build tournament tree
    // Winner (min/max) goes to output
    // Replace winner and replay tournament
    // Repeat
    return arr.sort((a, b) => a - b);
}`, `TournamentSort(arr):
    build tournament tree
    for i from 1 to n:
        winner ← root
        output winner
        replace winner with ∞
        update tree`, "Build a tournament tree. Winner (min/max) goes to output. Replace winner and replay tournament. Repeat.", "array", { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" }, "O(n)", ["Selection problems", "Hardware sorting"], ["Fewer comparisons", "Tree-based"], ["Complex implementation"], undefined, undefined, undefined, undefined, undefined, undefined);

export const FLASH_SORT = createAlgorithm(28, "Flash Sort", 2, "DSA", "Sorting", "Advanced", "Distribution-based", "Efficiently sorts large arrays of uniformly distributed numeric data by first classifying elements into groups.", `function flashSort(arr) {
    const n = arr.length;
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const m = Math.floor(0.45 * n);
    const classes = new Array(m).fill(0);
    
    for (let i = 0; i < n; i++) {
        const classIndex = Math.floor((m - 1) * (arr[i] - min) / (max - min));
        classes[classIndex]++;
    }
    
    // Transform to prefix sums and rearrange
    // Sort each class
    return arr.sort((a, b) => a - b);
}`, `FlashSort(arr, n):
    min ← minimum(arr)
    max ← maximum(arr)
    m ← int(0.45 × n)
    create classCount[m] ← 0
    for each element: map to class
    rearrange elements into correct class positions
    for each class: apply insertion sort`, "Divide data range into m classes. Count elements per class. Rearrange elements so each class occupies a contiguous segment. Sort each class.", "array", { best: "O(n)", average: "O(n)", worst: "O(n²)" }, "O(n)", ["Large numeric datasets", "Uniform data"], ["Near linear time on uniform data", "Fewer comparisons"], ["Worst-case quadratic", "Requires numeric data"], undefined, undefined, undefined, "Array must be uniformly distributed", undefined, undefined);

// ==========================================
// TREE ALGORITHMS
// ==========================================

export const AVL_TREE_ROTATIONS = createAlgorithm(29, "AVL Tree Rotations", 3, "DSA", "Tree", "Advanced", "Self-Balancing BST", "Maintains balance factor = height(left) - height(right) ∈ {-1,0,1} using rotations.", `class AVLNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

function rotateRight(y) {
    const x = y.left;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
    return x;
}

function rotateLeft(x) {
    const y = x.right;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
    y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
    return y;
}`, `AVLRotation(node):
    if balance > 1:
        if left child is left-heavy: LL Rotation
        else: LR Rotation
    if balance < -1:
        if right child is right-heavy: RR Rotation
        else: RL Rotation`, "Maintain balance factor = height(left) - height(right) ∈ {-1,0,1}. Rotations: LL, RR, LR, RL.", "tree", { best: "O(1)", average: "O(log n)", worst: "O(log n)" }, "O(1)", ["Balanced BSTs", "Database indexing"], ["Strict height balance", "Guaranteed O(log n)"], ["More rotations than Red-Black"]);

export const RED_BLACK_TREE_INSERTION = createAlgorithm(30, "Red-Black Tree Insertion", 3, "DSA", "Tree", "Advanced", "Self-Balancing BST", "Maintains tree properties: node is red or black, root is black, no two red nodes adjacent, equal black height paths.", `class RBNode {
    constructor(value) {
        this.value = value;
        this.color = 'RED';
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

function insert(root, value) {
    const node = new RBNode(value);
    BSTInsert(root, node);
    fixViolations(root, node);
}

function fixViolations(root, node) {
    while (node !== root && node.parent.color === 'RED') {
        if (node.parent === node.parent.parent.left) {
            const uncle = node.parent.parent.right;
            if (uncle && uncle.color === 'RED') {
                // Case 1: Recolor
                node.parent.color = 'BLACK';
                uncle.color = 'BLACK';
                node.parent.parent.color = 'RED';
                node = node.parent.parent;
            } else {
                // Case 2 & 3: Rotate
                if (node === node.parent.right) {
                    node = node.parent;
                    leftRotate(root, node);
                }
                node.parent.color = 'BLACK';
                node.parent.parent.color = 'RED';
                rightRotate(root, node.parent.parent);
            }
        } else {
            // Symmetric case
        }
    }
    root.color = 'BLACK';
}`, `RedBlackInsert(root, value):
    insert node as RED
    fix violations:
        if red uncle: recolor
        if black uncle: rotate + recolor`, "Node is red or black. Root is black. No two consecutive red nodes. Equal black height paths. Insert node as RED, fix violations using recoloring and rotations.", "tree", { best: "O(log n)", average: "O(log n)", worst: "O(log n)" }, "O(1)", ["Java TreeMap", "Linux kernel", "C++ map"], ["Fast insertion", "Looser balance than AVL"], ["Complex implementation"], undefined, undefined, undefined, undefined, undefined, undefined);

export const RED_BLACK_TREE_DELETION = createAlgorithm(31, "Red-Black Tree Deletion", 3, "DSA", "Tree", "Expert", "Self-Balancing BST", "Delete a node while preserving Red-Black Tree properties. Extra fixing required if deleted node is BLACK.", `function delete(root, value) {
    const node = findNode(root, value);
    if (!node) return root;
    
    let y = node;
    let yOriginalColor = y.color;
    let x;
    
    if (!node.left) {
        x = node.right;
        transplant(root, node, node.right);
    } else if (!node.right) {
        x = node.left;
        transplant(root, node, node.left);
    } else {
        y = minimum(node.right);
        yOriginalColor = y.color;
        x = y.right;
        if (y.parent === node) {
            if (x) x.parent = y;
        } else {
            transplant(root, y, y.right);
            y.right = node.right;
            y.right.parent = y;
        }
        transplant(root, node, y);
        y.left = node.left;
        y.left.parent = y;
        y.color = node.color;
    }
    
    if (yOriginalColor === 'BLACK') {
        deleteFix(root, x);
    }
    
    return root;
}`, `RedBlackDelete(root, value):
    delete node like BST
    if deleted node is BLACK:
        fix violations:
            Case 1: Sibling is RED → recolor + rotate
            Case 2: Sibling BLACK, both children BLACK → recolor
            Case 3: Sibling BLACK, near child RED → rotate
            Case 4: Sibling BLACK, far child RED → rotate + recolor`, "Delete node like BST. If deleted node is BLACK, fix violations. Cases: sibling RED, sibling BLACK with different child configurations.", "tree", { best: "O(log n)", average: "O(log n)", worst: "O(log n)" }, "O(1)", ["Java TreeMap", "Linux kernel"], ["Fast deletion", "Maintains balance"], ["Complex fix-up cases"], undefined, undefined, undefined, undefined, undefined, undefined);

export const B_TREE = createAlgorithm(32, "B-Tree", 3, "DSA", "Tree", "Advanced", "Balanced Multi-way Search Tree", "Efficient searching, insertion, and deletion for large disk-based data. Each node has ⌈m/2⌉ to m children.", `class BTreeNode {
    constructor(keys = [], children = [], isLeaf = true) {
        this.keys = keys;
        this.children = children;
        this.isLeaf = isLeaf;
    }
}

function search(root, key) {
    let i = 0;
    while (i < root.keys.length && key > root.keys[i]) {
        i++;
    }
    if (i < root.keys.length && root.keys[i] === key) {
        return root;
    }
    if (root.isLeaf) {
        return null;
    }
    return search(root.children[i], key);
}

function insert(root, key) {
    if (root.keys.length === 2 * t - 1) {
        const newRoot = new BTreeNode();
        newRoot.isLeaf = false;
        newRoot.children.push(root);
        splitChild(newRoot, 0);
        root = newRoot;
    }
    insertNonFull(root, key);
    return root;
}`, `BTreeSearch(root, key):
    traverse keys and children
    if found: return node
    if leaf: return null
    recurse on child

BTreeInsert(root, key):
    if root is full: split
    insert into non-full node`, "Each node has ⌈m/2⌉ to m children. Keys in node are sorted. All leaves at same level. Grows upward. Search: traverse keys and children. Insert: split node if overflow.", "tree", { best: "O(log n)", average: "O(log n)", worst: "O(log n)" }, "O(n)", ["Databases", "File systems", "Indexing systems"], ["Efficient for disk", "Balanced height"], ["Complex implementation"], undefined, undefined, undefined, undefined, undefined, undefined);

export const B_PLUS_TREE_SEARCH = createAlgorithm(33, "B+ Tree Search", 3, "DSA", "Tree", "Advanced", "Advanced Indexing Tree", "Data only in leaves. Leaves are linked. Faster range queries than B-Tree.", `function bPlusTreeSearch(root, key) {
    let node = root;
    while (!node.isLeaf) {
        let i = 0;
        while (i < node.keys.length && key >= node.keys[i]) {
            i++;
        }
        node = node.children[i];
    }
    
    // Linear search in leaf
    for (let i = 0; i < node.keys.length; i++) {
        if (node.keys[i] === key) {
            return node.values[i];
        }
    }
    return null;
}`, `BPlusTreeSearch(root, key):
    start from root
    traverse internal nodes using keys
    reach leaf node
    perform linear search in leaf`, "Difference from B-Tree: Data only in leaves. Leaves are linked. Sequential access via linked leaves. Fewer disk I/O operations.", "tree", { best: "O(log n)", average: "O(log n)", worst: "O(log n)" }, "O(n)", ["Database indexing (MySQL, Oracle)", "File systems"], ["Faster range queries", "Sequential access"], ["More complex than B-Tree"], undefined, undefined, undefined, undefined, undefined, undefined);

export const SPLAY_TREE_OPERATIONS = createAlgorithm(34, "Splay Tree Operations", 3, "DSA", "Tree", "Advanced", "Self-Adjusting Binary Search Tree", "Recently accessed elements are moved closer to the root using splaying operations.", `function splay(root, key) {
    if (!root || root.key === key) return root;
    
    if (root.key > key) {
        if (!root.left) return root;
        if (root.left.key > key) {
            root.left.left = splay(root.left.left, key);
            root = rotateRight(root);
        } else if (root.left.key < key) {
            root.left.right = splay(root.left.right, key);
            if (root.left.right) {
                root.left = rotateLeft(root.left);
            }
        }
        return root.left ? rotateRight(root) : root;
    } else {
        // Symmetric case for right subtree
    }
}`, `SplayTreeSplay(root, key):
    bring accessed node to root using rotations:
        Zig: node is child of root
        Zig-Zig: node and parent both left/right children
        Zig-Zag: node is left child, parent is right`, "Bring accessed node to root using rotations. Zig (single rotation), Zig-Zig (double rotation same direction), Zig-Zag (double rotation opposite directions).", "tree", { best: "O(log n)", average: "O(log n)", worst: "O(n)" }, "O(1)", ["Cache-like access", "Frequently accessed nodes"], ["No balance info stored", "Frequently accessed nodes are fast"], ["Individual operations can be slow"], undefined, undefined, undefined, undefined, undefined, undefined);

// ==========================================
// STRING ALGORITHMS
// ==========================================

export const KMP_ALGORITHM = createAlgorithm(35, "KMP Algorithm", 4, "DSA", "String Matching", "Advanced", "Prefix Function (LPS Array)", "Efficiently finds all occurrences of a pattern in a text without rechecking characters.", `function computeLPS(pattern) {
    const lps = new Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;
    
    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

function kmpSearch(text, pattern) {
    const lps = computeLPS(pattern);
    let i = 0, j = 0;
    
    while (i < text.length) {
        if (text[i] === pattern[j]) {
            i++;
            j++;
        }
        
        if (j === pattern.length) {
            console.log("Pattern found at index", i - j);
            j = lps[j - 1];
        } else if (i < text.length && text[i] !== pattern[j]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
}`, `ComputeLPS(pattern):
    lps[0] ← 0
    len ← 0
    i ← 1
    while i < m:
        if pattern[i] == pattern[len]:
            len++, lps[i] ← len, i++
        else:
            if len != 0: len ← lps[len-1]
            else: lps[i] ← 0, i++

KMPSearch(text, pattern):
    compute LPS array
    i ← 0, j ← 0
    while i < n:
        if text[i] == pattern[j]: i++, j++
        if j == m: report match, j ← lps[j-1]
        else if text[i] != pattern[j]:
            if j != 0: j ← lps[j-1]
            else: i++`, "Preprocesses pattern to build LPS (Longest Prefix Suffix) array. On mismatch, shift using LPS instead of restarting. Avoids redundant comparisons.", "array", { best: "O(n)", average: "O(n + m)", worst: "O(n + m)" }, "O(m)", ["Text editors", "Compilers", "DNA sequence matching"], ["Linear time", "No backtracking", "Widely used"], ["Preprocessing overhead"]);

export const RABIN_KARP_ALGORITHM = createAlgorithm(36, "Rabin-Karp Algorithm", 4, "DSA", "String Matching", "Advanced", "Hashing", "Finds occurrences of a pattern in a text using rolling hash.", `function rabinKarp(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    const d = 256;
    const q = 101;
    let h = 1;
    let p = 0;
    let t = 0;
    
    for (let i = 0; i < m - 1; i++) {
        h = (h * d) % q;
    }
    
    for (let i = 0; i < m; i++) {
        p = (d * p + pattern.charCodeAt(i)) % q;
        t = (d * t + text.charCodeAt(i)) % q;
    }
    
    for (let i = 0; i <= n - m; i++) {
        if (p === t) {
            let j;
            for (j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) break;
            }
            if (j === m) {
                console.log("Pattern found at index", i);
            }
        }
        if (i < n - m) {
            t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
            if (t < 0) t = t + q;
        }
    }
}`, `RabinKarp(text, pattern):
    compute hash(pattern)
    compute hash(first window of text)
    for i ← 0 to n-m:
        if hash matches: check characters
        update hash for next window`, "Instead of comparing characters directly, compares hash values. If hashes match, verify characters to avoid collision errors. Uses rolling hash for efficiency.", "array", { best: "O(n + m)", average: "O(n + m)", worst: "O(nm)" }, "O(1)", ["Plagiarism detection", "Multiple pattern matching"], ["Average linear time", "Multiple patterns"], ["Worst case with collisions"]);

export const Z_ALGORITHM = createAlgorithm(37, "Z Algorithm", 4, "DSA", "String Matching", "Advanced", "Prefix Matching", "Finds pattern occurrences in linear time by computing Z-array.", `function computeZArray(s) {
    const n = s.length;
    const z = new Array(n).fill(0);
    let l = 0, r = 0;
    
    for (let i = 1; i < n; i++) {
        if (i <= r) {
            z[i] = Math.min(r - i + 1, z[i - l]);
        }
        while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
            z[i]++;
        }
        if (i + z[i] - 1 > r) {
            l = i;
            r = i + z[i] - 1;
        }
    }
    return z;
}

function zAlgorithmSearch(text, pattern) {
    const concat = pattern + '$' + text;
    const z = computeZArray(concat);
    const results = [];
    
    for (let i = pattern.length + 1; i < z.length; i++) {
        if (z[i] === pattern.length) {
            results.push(i - pattern.length - 1);
        }
    }
    return results;
}`, `ZAlgorithm(s):
    compute Z array where Z[i] = length of longest substring
    starting at i which is also a prefix
    for i: if Z[i] == pattern length: report match`, "Z[i] = length of the longest substring starting at i which is also a prefix. Pattern matching done by computing Z on pattern + '$' + text.", "array", { best: "O(n)", average: "O(n)", worst: "O(n)" }, "O(n)", ["String matching", "Pattern searching"], ["Linear time", "Simple concept"], ["Extra space for Z array"], undefined, undefined, undefined, undefined, undefined, undefined);

export const TRIE_OPERATIONS = createAlgorithm(38, "Trie Operations", 4, "DSA", "String Matching", "Intermediate", "Prefix Tree", "Efficient prefix-based searching (dictionary, autocomplete).", `class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }
    
    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }
    
    startsWith(prefix) {
        let node = this.root;
        for (let char of prefix) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return true;
    }
}`, `TrieInsert(word):
    node ← root
    for char in word:
        if char not in node: create node
        move to child
    mark end

TrieSearch(word):
    node ← root
    for char in word:
        if char not in node: return false
        move to child
    return isEndOfWord`, "Insert all elements into a Trie. Search by traversing characters. Prefix check by checking if path exists. In-order traversal gives sorted order.", "tree", { best: "O(L)", average: "O(L)", worst: "O(L)" }, "O(ALPHABET_SIZE * N * M)", ["Dictionary", "Autocomplete", "IP routing"], ["Fast prefix search", "Space efficient"], ["Memory intensive"], undefined, undefined, undefined, undefined, undefined, undefined);

// ==========================================
// BIT MANIPULATION ALGORITHMS
// ==========================================

export const COUNT_SET_BITS = createAlgorithm(39, "Count Set Bits", 5, "DSA", "Bit Manipulation", "Beginner", "Bit Counting", "Counts number of 1s in binary representation.", `function countSetBits(n) {
    let count = 0;
    while (n > 0) {
        n = n & (n - 1);
        count++;
    }
    return count;
}

// Alternative: Built-in
function countSetBitsBuiltIn(n) {
    return n.toString(2).split('1').length - 1;
}`, `CountSetBits(n):
    count ← 0
    while n > 0:
        n ← n & (n - 1)
        count++
    return count`, "Brian Kernighan's algorithm: n & (n-1) removes the rightmost set bit. Repeat until n becomes 0.", "custom", { best: "O(1)", average: "O(k)", worst: "O(k)" }, "O(1)", ["Bit manipulation", "Hamming weight", "Parity checking"], ["Efficient", "Simple"], ["k = number of set bits"], undefined, undefined, undefined, undefined, undefined, undefined);

export const CHECK_POWER_OF_TWO = createAlgorithm(40, "Check Power of Two", 5, "DSA", "Bit Manipulation", "Beginner", "Bit Checking", "A power of two has only one set bit.", `function isPowerOfTwo(n) {
    if (n <= 0) return false;
    return (n & (n - 1)) === 0;
}`, `isPowerOfTwo(n):
    if n <= 0: return false
    return (n & (n - 1)) == 0`, "A power of two has only one set bit. n & (n-1) removes the rightmost set bit. If result is 0, it's a power of two.", "custom", { best: "O(1)", average: "O(1)", worst: "O(1)" }, "O(1)", ["Bit manipulation", "Optimization", "Math problems"], ["Constant time", "Simple"], ["Only for positive numbers"], undefined, undefined, undefined, undefined, undefined, undefined);

export const XOR_BASED_PROBLEMS = createAlgorithm(41, "XOR-based Problems", 5, "DSA", "Bit Manipulation", "Intermediate", "XOR Trick", "Finds unique element when others appear twice.", `function findUnique(arr) {
    let result = 0;
    for (let x of arr) {
        result ^= x;
    }
    return result;
}

function findTwoUnique(arr) {
    let xor = 0;
    for (let x of arr) {
        xor ^= x;
    }
    const rightmostSetBit = xor & -xor;
    let a = 0, b = 0;
    for (let x of arr) {
        if (x & rightmostSetBit) {
            a ^= x;
        } else {
            b ^= x;
        }
    }
    return [a, b];
}`, `FindUnique(arr):
    result ← 0
    for x in arr:
        result ← result ^ x
    return result`, "x ^ x = 0, x ^ 0 = x. XOR all elements cancels pairs, leaving unique element. For two unique, use rightmost set bit to partition.", "custom", { best: "O(n)", average: "O(n)", worst: "O(n)" }, "O(1)", ["Finding unique elements", "Pair cancellation", "Bit manipulation"], ["Linear time", "Constant space"], ["Only works with pairs"], undefined, undefined, undefined, undefined, undefined, undefined);

export const BIT_MASKING = createAlgorithm(42, "Bit Masking", 5, "DSA", "Bit Manipulation", "Advanced", "State Representation", "Represents subsets, states, permissions efficiently.", `function generateSubsets(arr) {
    const n = arr.length;
    const subsets = [];
    for (let mask = 0; mask < (1 << n); mask++) {
        const subset = [];
        for (let i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                subset.push(arr[i]);
            }
        }
        subsets.push(subset);
    }
    return subsets;
}

// Set bit: mask | (1 << i)
// Clear bit: mask & ~(1 << i)
// Toggle bit: mask ^ (1 << i)
// Check bit: mask & (1 << i)`, `BitMasking:
    Set bit: mask | (1 << i)
    Clear bit: mask & ~(1 << i)
    Toggle bit: mask ^ (1 << i)
    Check bit: mask & (1 << i)`, "Use bits to represent states, subsets, or permissions. Each bit represents a state. Generate all subsets using masks from 0 to 2^n - 1.", "custom", { best: "O(1)", average: "O(2^n)", worst: "O(2^n)" }, "O(1)", ["Subset generation", "DP with states", "Permission systems"], ["Efficient representation", "Fast operations"], ["Exponential for subsets"], undefined, undefined, undefined, undefined, undefined, undefined);

export const GRAY_CODE_GENERATION = createAlgorithm(43, "Gray Code Generation", 5, "DSA", "Bit Manipulation", "Advanced", "Binary Encoding", "Generate binary numbers such that only one bit changes between consecutive numbers.", `function grayCode(n) {
    if (n === 0) return [0];
    const prev = grayCode(n - 1);
    const result = [...prev];
    const add = 1 << (n - 1);
    for (let i = prev.length - 1; i >= 0; i--) {
        result.push(prev[i] | add);
    }
    return result;
}

// Iterative
function grayCodeIterative(n) {
    const result = [];
    for (let i = 0; i < (1 << n); i++) {
        result.push(i ^ (i >> 1));
    }
    return result;
}`, `GrayCode(n):
    if n == 0: return [0]
    prev ← GrayCode(n-1)
    result ← prev
    add ← 1 << (n-1)
    for i from prev.length-1 down to 0:
        result.push(prev[i] | add)
    return result`, "Generate binary numbers such that only one bit changes between consecutive numbers. Used in hardware encoders, error minimization, backtracking.", "custom", { best: "O(2^n)", average: "O(2^n)", worst: "O(2^n)" }, "O(2^n)", ["Hardware encoders", "Error minimization", "Backtracking"], ["Single bit change", "Useful in hardware"], ["Exponential space"]);

// ==========================================
// EXPORT ALL ALGORITHMS
// ==========================================

export const COMPREHENSIVE_SEARCHING_ALGORITHMS: Algorithm[] = [
    LINEAR_SEARCH,
    BINARY_SEARCH,
    JUMP_SEARCH,
    INTERPOLATION_SEARCH,
    EXPONENTIAL_SEARCH,
    FIBONACCI_SEARCH,
    TERNARY_SEARCH
];

export const COMPREHENSIVE_SORTING_ALGORITHMS: Algorithm[] = [
    BUBBLE_SORT,
    SELECTION_SORT,
    INSERTION_SORT,
    MERGE_SORT,
    QUICK_SORT,
    HEAP_SORT,
    COUNTING_SORT,
    RADIX_SORT,
    BUCKET_SORT,
    SHELL_SORT,
    TIM_SORT,
    COMB_SORT,
    CYCLE_SORT,
    ODD_EVEN_SORT,
    PANCAKE_SORT,
    STRAND_SORT,
    TOURNAMENT_SORT,
    FLASH_SORT
];

export const COMPREHENSIVE_TREE_ALGORITHMS: Algorithm[] = [
    AVL_TREE_ROTATIONS,
    RED_BLACK_TREE_INSERTION,
    RED_BLACK_TREE_DELETION,
    B_TREE,
    B_PLUS_TREE_SEARCH,
    SPLAY_TREE_OPERATIONS
];

export const COMPREHENSIVE_STRING_ALGORITHMS: Algorithm[] = [
    KMP_ALGORITHM,
    RABIN_KARP_ALGORITHM,
    Z_ALGORITHM,
    TRIE_OPERATIONS
];

export const COMPREHENSIVE_BIT_ALGORITHMS: Algorithm[] = [
    COUNT_SET_BITS,
    CHECK_POWER_OF_TWO,
    XOR_BASED_PROBLEMS,
    BIT_MASKING,
    GRAY_CODE_GENERATION
];

export const ALL_COMPREHENSIVE_ALGORITHMS: Algorithm[] = [
    ...COMPREHENSIVE_SEARCHING_ALGORITHMS,
    ...COMPREHENSIVE_SORTING_ALGORITHMS,
    ...COMPREHENSIVE_TREE_ALGORITHMS,
    ...COMPREHENSIVE_STRING_ALGORITHMS,
    ...COMPREHENSIVE_BIT_ALGORITHMS
];
