import { AlgorithmData } from './algorithm-schema';
import { normalizeCategoryToAlgorithmCategory, normalizeVisualizationType, type AlgorithmCategory, type VisualizationType } from './algorithm-schema';

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
    visualizationType: string,
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
): AlgorithmData {
    const slug = name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    const normalizedCategory: AlgorithmCategory = normalizeCategoryToAlgorithmCategory(category);
    const normalizedVisualizationType: VisualizationType = normalizeVisualizationType(visualizationType);

    return {
        id: id.toString(),
        name,
        slug,
        description,
        definition: description,
        category: normalizedCategory,
        domain,
        domainId,
        algorithmNumber: id,
        difficulty,
        paradigm,
        tags: [category.toLowerCase(), paradigm.toLowerCase(), domain.toLowerCase()],
        timeComplexity,
        spaceComplexity,
        implementations: {
            javascript: implementation,
            python: "# Python implementation",
            java: "// Java implementation",
            cpp: "// C++ implementation"
        },
        pseudocode,
        visualizationType: normalizedVisualizationType,
        realWorldExample: `Used in ${domain} systems for ${category.toLowerCase()} tasks`,
        applications,
        prerequisites: [],
        relatedAlgorithms: []
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
    `Sorted Array = [5, 10, 15, 20, 25, 30, 35]
Target = 25

Step 1: mid1=2 (15), mid2=4 (25) ✅ Found at index 4`,
    ["Three-way division", "Log base 3 complexity", "Useful for unimodal functions"],
    "Find an element in a sorted array using three-way division",
    "Array must be sorted"
);

export const UNORDERED_SEQUENTIAL_SEARCH = createAlgorithm(
    8,
    "Unordered Sequential Search",
    1,
    "DSA",
    "Searching",
    "Beginner",
    "Brute Force",
    "A simple searching technique where elements are checked one by one in an unsorted list until the required element is found or the list ends.",
    `function unorderedSequentialSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}`,
    `UnorderedSequentialSearch(array, size, key):
    for i = 0 to size-1:
        if array[i] == key:
            return i
    return -1`,
    "The data is not sorted. Start checking from the first element. Compare each element with the search key. If match → stop (found). If end reached → not found.",
    "array",
    { best: "O(1)", average: "O(n)", worst: "O(n)" },
    "O(1)",
    ["Searching a name in an attendance sheet", "Finding an item in a shopping list", "Finding a contact in an unsorted list"],
    ["Works on unsorted data", "Very simple to understand", "No extra space"],
    ["Slow for large datasets", "Linear time complexity"],
    [
        "Start from the first element",
        "Compare it with the value to be searched",
        "If it matches → Stop (Found)",
        "If not → move to the next element",
        "Repeat until found or list ends"
    ],
    `Array (Unsorted) = [45, 10, 75, 30, 20]
Key = 30

Step 1: 45 - No
Step 2: 10 - No
Step 3: 75 - No
Step 4: 30 ✅ Found at index 3`,
    ["Works on unsorted data", "Simplest search algorithm"]
);

export const ORDERED_SEQUENTIAL_SEARCH = createAlgorithm(
    9,
    "Ordered Sequential Search",
    1,
    "DSA",
    "Searching",
    "Beginner",
    "Optimization",
    "A searching method used on a sorted list that stops early if the current element becomes greater than the target.",
    `function orderedSequentialSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
        if (arr[i] > target) return -1;
    }
    return -1;
}`,
    `OrderedSequentialSearch(array, size, key):
    for i = 0 to size-1:
        if array[i] == key:
            return i
        else if array[i] > key:
            return -1
    return -1`,
    "Since the data is sorted, once you see a value greater than the key, you don’t need to check remaining elements. This allows for early stopping.",
    "array",
    { best: "O(1)", average: "O(n)", worst: "O(n)" },
    "O(1)",
    ["Searching a roll number in a sorted attendance list", "Finding a word in a dictionary (page by page)", "Searching bill numbers arranged in order"],
    ["Faster than unordered search for unsuccessful cases", "Simple logic", "No extra space"],
    ["Requires sorted data", "Still linear time in worst case"],
    [
        "Start from the first element",
        "Compare each element with the search key",
        "If equal → found",
        "If element > key → stop search (key cannot exist further)",
        "Continue until found or stopped"
    ],
    `Sorted Array = [5, 10, 20, 30, 40, 50]
Key = 25

Step 1: 5 - Continue
Step 2: 10 - Continue
Step 3: 20 - Continue
Step 4: 30 - Stop (30 > 25) ❌ Not found`,
    ["Early stopping optimization", "Requires sorted array"]
);

export const HASH_BASED_SEARCH = createAlgorithm(
    10,
    "Hash-Based Search",
    1,
    "DSA",
    "Searching",
    "Intermediate",
    "Hashing",
    "A fast searching method that uses a hash function to directly find where the data is stored in a hash table.",
    `function hashSearch(table, key, hashFn) {
    const index = hashFn(key);
    const bucket = table[index];
    if (!bucket) return -1;
    for (let i = 0; i < bucket.length; i++) {
        if (bucket[i] === key) return index;
    }
    return -1;
}`,
    `HashSearch(table, key):
    index = hash(key)
    for each element in table[index]:
        if element == key:
            return FOUND
    return NOT FOUND`,
    "A hash function converts a key into an index. The value is stored at that index in a hash table. To search, apply the same hash function and go directly to that index.",
    "custom",
    { best: "O(1)", average: "O(1)", worst: "O(n)" },
    "O(n)",
    ["Password lookup in login systems", "DNS (domain name to IP address)", "Product ID search in e-commerce", "Roll number to student details"],
    ["Almost constant search time", "Very efficient for large datasets"],
    ["Requires extra space for hash table", "Collision handling can be complex"],
    [
        "Choose hash table size",
        "Create hash function (e.g., key % size)",
        "Insert elements into hash table (handling collisions)",
        "Apply hash function to search key",
        "Check index directly for results"
    ],
    `Table size = 10, Hash(k) = k % 10
Keys = [23, 43, 13]

Key 23 → 23 % 10 = Index 3
Key 43 → 43 % 10 = Index 3 (Collision)
Key 13 → 13 % 10 = Index 3 (Collision)`,
    ["Constant time average case", "Uses hash table and hash function"]
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

export const CYCLE_SORT = createAlgorithm(
    23,
    "Cycle Sort",
    2,
    "DSA",
    "Sorting",
    "Advanced",
    "In-place, Write-efficient",
    "Minimizes number of writes to memory by placing each element directly into its correct position.",
    `function cycleSort(arr) {
    const n = arr.length;
    for (let start = 0; start < n - 1; start++) {
        let item = arr[start];
        let pos = start;
        for (let i = start + 1; i < n; i++) if (arr[i] < item) pos++;
        if (pos === start) continue;
        while (item === arr[pos]) pos++;
        [arr[pos], item] = [item, arr[pos]];
        while (pos !== start) {
            pos = start;
            for (let i = start + 1; i < n; i++) if (arr[i] < item) pos++;
            while (item === arr[pos]) pos++;
            [arr[pos], item] = [item, arr[pos]];
        }
    }
    return arr;
}`,
    `CycleSort(arr, n):
    for cycle_start = 0 to n-2:
        item = arr[cycle_start]
        pos = cycle_start
        for i = cycle_start+1 to n-1:
            if arr[i] < item: pos = pos + 1
        if pos == cycle_start: continue
        while item == arr[pos]: pos = pos + 1
        swap(item, arr[pos])
        while pos != cycle_start:
            pos = cycle_start
            for i = cycle_start+1 to n-1:
                if arr[i] < item: pos = pos + 1
            while item == arr[pos]: pos = pos + 1
            swap(item, arr[pos])`,
    "Cycle Sort minimizes memory writes by moving elements directly to their sorted positions. Ideal for systems with limited write cycles like flash memory.",
    "array",
    { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    "O(1)",
    ["Embedded systems", "Flash memory management"],
    ["Fewer memory writes", "In-place"],
    ["Slow (Quadratic time)"],
    [
        "Find the correct position for each element",
        "Swap it directly to its target index",
        "Move the displaced element to its correct spot",
        "Continue until a cycle is completed"
    ],
    `Array = [20, 10, 30, 50, 40]
Step 1: 20 moves to index 1, 10 moves to index 0 → [10, 20, 30, 50, 40]
Step 2: 50 moves to index 4, 40 moves to index 3 → [10, 20, 30, 40, 50] ✅`,
    ["Write-efficient", "Cycle-based"]
);

export const TREE_SORT = createAlgorithm(
    24,
    "Tree Sort",
    2,
    "DSA",
    "Sorting",
    "Intermediate",
    "Tree-based",
    "A sorting algorithm that uses a Binary Search Tree (BST) to organize elements and then performs an inorder traversal.",
    `function treeSort(arr) {
    let bst = new BST();
    arr.forEach(x => bst.insert(x));
    return bst.inorder();
}`,
    `TreeSort(A, n):
    create empty BST
    for each element x in A:
        insert x into BST
    inorderTraversal(BST)`,
    "BST automatically organizes elements (Left < Root < Right). Inorder traversal of BST always produces sorted data.",
    "tree",
    { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    "O(n)",
    ["Sorting data using tree structures", "Database indexing", "Symbol table implementation"],
    ["Produces sorted output during traversal", "Can handle continuous data streams"],
    ["Performance depends on tree balance", "Worst case O(n²) for skewed trees"],
    [
        "Create an empty Binary Search Tree",
        "Insert all elements into the BST one by one",
        "Perform inorder traversal of the tree"
    ],
    `Array = [5, 3, 7, 2, 4, 6, 8]
Inorder: 2, 3, 4, 5, 6, 7, 8 ✅`,
    ["Uses Binary Search Tree", "Stable in-order traversal"]
);

export const ODD_EVEN_SORT = createAlgorithm(
    25,
    "Odd–Even Sort (Brick Sort)",
    2,
    "DSA",
    "Sorting",
    "Intermediate",
    "Parallel Bubble Sort",
    "A variation of Bubble Sort that sorts the array in two phases (odd and even) repeatedly until the array is sorted.",
    `function oddEvenSort(arr) {
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
    `OddEvenSort(A, n):
    while not sorted:
        // Odd phase
        for i = 1 to n-2 step 2:
            if A[i] > A[i+1]: swap(A[i], A[i+1]), sorted = false
        // Even phase
        for i = 0 to n-2 step 2:
            if A[i] > A[i+1]: swap(A[i], A[i+1]), sorted = false`,
    "In the odd phase, compare indices (1,2), (3,4), etc. In the even phase, compare (0,1), (2,3), etc. Swap elements if they are in the wrong order. Repeat until sorted.",
    "array",
    { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    "O(1)",
    ["Teaching parallel sorting concepts", "Small datasets sorting"],
    ["Highly parallelizable", "Simple comparison-based logic"],
    ["Inefficient for large sets"],
    [
        "Initialize sorted = false",
        "Perform Odd Phase: Compare odd indexed pairs",
        "Perform Even Phase: Compare even indexed pairs",
        "Stop when no swaps are made"
    ],
    undefined,
    ["Phase-based sorting", "Variation of Bubble Sort"]
);


// ==========================================
// DIVIDE AND CONQUER ALGORITHMS
// ==========================================

export const BINARY_SEARCH_DC = createAlgorithm(
    26,
    "Binary Search (D&C)",
    2,
    "DAA",
    "Divide and Conquer",
    "Intermediate",
    "Recursive",
    "Finds a target in a sorted array by recursively splitting the search space into halves.",
    `function binarySearchDC(arr, low, high, target) {
    if (low > high) return -1;
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    return arr[mid] > target ? binarySearchDC(arr, low, mid - 1, target) : binarySearchDC(arr, mid + 1, high, target);
}`,
    `BSRecursive(A, low, high, key):
    if low > high: return -1
    mid = (low + high) / 2
    if A[mid] == key: return mid
    if A[mid] > key: return BSRecursive(A, low, mid-1, key)
    return BSRecursive(A, mid+1, high, key)`,
    "Recursively divide the array into halves until the target is found or the range is empty. Efficiently reduces search space by 50% each step.",
    "array",
    { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    "O(log n)",
    ["Searching in sorted datasets", "Root finding algorithms"],
    ["Logarithmic time complexity", "Elegant recursion"],
    ["Requires sorted data", "Recursive overhead"],
    [
        "Find middle index",
        "Compare with target",
        "Recurse on left or right half"
    ]
);

export const MERGE_SORT_DC = createAlgorithm(
    27,
    "Merge Sort (D&C)",
    2,
    "DAA",
    "Divide and Conquer",
    "Intermediate",
    "Recursive",
    "A stable sorting algorithm that recursively divides the array into halves and merges them back in sorted order.",
    `function mergeSortDC(arr, l, r) {
    if (l < r) {
        let m = Math.floor((l + r) / 2);
        mergeSortDC(arr, l, m);
        mergeSortDC(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
    `MergeSort(A, p, r):
    if p < r:
        q = (p + r) / 2
        MergeSort(A, p, q)
        MergeSort(A, q + 1, r)
        Merge(A, p, q, r)`,
    "Guarantees O(n log n) time complexity by consistently halving the problem and merging results. It is a stable sort meaning it preserves the order of equal elements.",
    "array",
    { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    "O(n)",
    ["Industrial sorting applications", "Sorting large linked lists"],
    ["Stable sorting", "Consistent O(n log n) performance"],
    ["Extra memory for merging", "Slow for small datasets"],
    [
        "Divide array into two halves",
        "Recursively sort both halves",
        "Merge sorted halves using temp space"
    ]
);

export const QUICK_SORT_DC = createAlgorithm(
    28,
    "Quick Sort (D&C)",
    2,
    "DAA",
    "Divide and Conquer",
    "Intermediate",
    "Recursive",
    "An efficient sorting algorithm that partitions the array around a pivot and recurses on segments.",
    `function quickSortDC(arr, low, high) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSortDC(arr, low, pi - 1);
        quickSortDC(arr, pi + 1, high);
    }
}`,
    `QuickSort(A, p, r):
    if p < r:
        q = Partition(A, p, r)
        QuickSort(A, p, q - 1)
        QuickSort(A, q + 1, r)`,
    "The core idea is partitioning: putting the pivot in its correct sorted position and elements smaller than it to the left, larger to the right.",
    "array",
    { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    "O(log n)",
    ["Standard library sorting in many languages", "General purpose sorting"],
    ["Fast average case", "In-place (minimal extra memory)"],
    ["Worst case O(n²) if pivot selection is bad", "Not stable"]
);

export const STRASSENS_MATRIX_MULTIPLICATION = createAlgorithm(
    29,
    "Strassen's Matrix Multiplication",
    2,
    "DAA",
    "Divide and Conquer",
    "Expert",
    "Mathematical",
    "A recursive algorithm for matrix multiplication that reduces the number of multiplications needed.",
    `function strassen(A, B) {
    // Conceptual D&C logic
    // Divide A and B into submatrices
    // Compute 7 products P1..P7
    // Combine into C
}`,
    `Strassen(A, B):
    Divide A, B into size n/2 submatrices
    P1 = (A11 + A22)(B11 + B22)
    ... (total 7 products)
    C11 = P1 + P4 - P5 + P7
    ...`,
    "Instead of 8 multiplications for 2x2 matrices, Strassen uses 7. This small reduction leads to an asymptotic improvement from O(n³) to O(n^2.81).",
    "matrix",
    { best: "O(n^2.81)", average: "O(n^2.81)", worst: "O(n^2.81)" },
    "O(n²)",
    ["Scientific computing", "High-performance matrix libraries"],
    ["Asymptotically faster than naive multiplication"],
    ["Complex implementation", "Numerically less stable"],
    [
        "Divide matrices into quarters",
        "Compute 7 special recursive products",
        "Combine products to get quadrants of result"
    ]
);

export const CLOSEST_PAIR_OF_POINTS = createAlgorithm(
    30,
    "Closest Pair of Points",
    2,
    "DAA",
    "Divide and Conquer",
    "Advanced",
    "Geometric",
    "Finds the minimum distance between two points in a 2D plane in O(n log n) time.",
    `function closestPair(pts) { ... }`,
    `ClosestPair(P):
    sort by x
    split into halves
    d = min(ClosestPair(left), ClosestPair(right))
    check strip of width 2d`,
    "The key is sorting by x initially, then recursively finding min distance in halves, and finally checking only a few points in the central 'strip'.",
    "geometric",
    { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    "O(n)",
    ["Graphics collision detection", "Cluster analysis"],
    ["Efficient geometric search"],
    ["Requires geometric partitioning knowledge"]
);
export const MAX_MIN_PROBLEM = createAlgorithm(
    31,
    "Max-Min Problem",
    2,
    "DAA",
    "Divide and Conquer",
    "Beginner",
    "Recursive",
    "Finds the maximum and minimum elements in an array using a divide and conquer approach, minimizing total comparisons.",
    `function findMaxMin(arr, low, high) {
    if (low === high) return { max: arr[low], min: arr[low] };
    if (high === low + 1) {
        if (arr[low] < arr[high]) return { max: arr[high], min: arr[low] };
        else return { max: arr[low], min: arr[high] };
    }
    let mid = Math.floor((low + high) / 2);
    let left = findMaxMin(arr, low, mid);
    let right = findMaxMin(arr, mid + 1, high);
    return {
        max: Math.max(left.max, right.max),
        min: Math.min(left.min, right.min)
    };
}`,
    `MaxMin(A, low, high):
    if low == high: return (A[low], A[low])
    mid = (low + high) / 2
    (max1, min1) = MaxMin(A, low, mid)
    (max2, min2) = MaxMin(A, mid+1, high)
    return (max(max1, max2), min(min1, min2))`,
    "By dividing the array into two halves and recursively finding the max and min, we reduce the number of comparisons to 3n/2 - 2, compared to 2n-2 in a linear search.",
    "array",
    { best: "O(n)", average: "O(n)", worst: "O(n)" },
    "O(log n)",
    ["Finding extremes in data streams", "Graphic rendering bounds"],
    ["Fewer comparisons than naive approach", "Simple recursive logic"],
    ["Recursive overhead", "Requires O(log n) stack space"]
);

export const KARATSUBA_ALGORITHM = createAlgorithm(
    32,
    "Karatsuba Algorithm",
    2,
    "DAA",
    "Divide and Conquer",
    "Advanced",
    "Mathematical",
    "A fast multiplication algorithm for large numbers that uses divide and conquer to reduce multiplications.",
    `function karatsuba(x, y) {
    if (x < 10 || y < 10) return x * y;
    let n = Math.max(x.toString().length, y.toString().length);
    let m = Math.floor(n / 2);
    let high1 = Math.floor(x / Math.pow(10, m));
    let low1 = x % Math.pow(10, m);
    let high2 = Math.floor(y / Math.pow(10, m));
    let low2 = y % Math.pow(10, m);
    let z0 = karatsuba(low1, low2);
    let z1 = karatsuba(low1 + high1, low2 + high2);
    let z2 = karatsuba(high1, high2);
    return z2 * Math.pow(10, 2 * m) + (z1 - z2 - z0) * Math.pow(10, m) + z0;
}`,
    `Karatsuba(X, Y):
    A, B = split X; C, D = split Y
    P1 = Karatsuba(A, C)
    P2 = Karatsuba(B, D)
    P3 = Karatsuba(A+B, C+D)
    Result = P1*10^n + (P3-P1-P2)*10^(n/2) + P2`,
    "Karatsuba observed that only 3 multiplications (P1, P2, P3) are needed instead of 4 to compute the product of two large numbers.",
    "custom",
    { best: "O(n^1.58)", average: "O(n^1.58)", worst: "O(n^1.58)" },
    "O(n)",
    ["Cryptography (RSA)", "Arbitrary-precision arithmetic"],
    ["Faster than the traditional O(n²) multiplication"],
    ["More complex than standard multiplication"]
);

export const CONVEX_HULL_DC = createAlgorithm(
    33,
    "Convex Hull (D&C)",
    2,
    "DAA",
    "Divide and Conquer",
    "Expert",
    "Geometric",
    "Finds the smallest convex polygon containing all given points in a 2D plane.",
    `function convexHullDC(points) {
    // Sort points by x-coordinate
    // Divide and recursively find hulls
    // Merge hulls using upper and lower tangents
}`,
    `ConvexHullDC(P):
    sort P by x
    split P into left and right
    CHL = ConvexHullDC(left)
    CHR = ConvexHullDC(right)
    merge CHL and CHR using upper and lower tangents`,
    "Divides the point set into two, calculates convex hulls recursively, and merges them using the 'walking' technique to find upper and lower common tangents.",
    "geometric",
    { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    "O(n)",
    ["GIS and mapping", "Collision detection in games"],
    ["Optimal O(n log n) complexity", "Handles geometric data efficiently"],
    ["Merging step is complex to implement"]
);

export const MEDIAN_FINDING_DC = createAlgorithm(
    34,
    "Median Finding (D&C)",
    2,
    "DAA",
    "Divide and Conquer",
    "Advanced",
    "Selection",
    "Finds the median (or k-th smallest element) of an unsorted list in linear time.",
    `function quickSelect(arr, k) {
    let pivot = arr[Math.floor(Math.random() * arr.length)];
    let left = arr.filter(x => x < pivot);
    let mid = arr.filter(x => x === pivot);
    let right = arr.filter(x => x > pivot);
    if (k < left.length) return quickSelect(left, k);
    if (k < left.length + mid.length) return pivot;
    return quickSelect(right, k - left.length - mid.length);
}`,
    `QuickSelect(A, k):
    pick a pivot p
    partition A into L, E, G
    if k <= |L|: return QuickSelect(L, k)
    if k <= |L|+|E|: return p
    return QuickSelect(G, k - |L| - |E|)`,
    "Uses a partitioning strategy similar to Quick Sort but only recurses into one partition, achieving O(n) average time complexity.",
    "array",
    { best: "O(n)", average: "O(n)", worst: "O(n²)" },
    "O(log n)",
    ["Order statistics", "Data analysis"],
    ["Average linear time", "In-place variant exists"],
    ["Worst-case O(n²) if pivot selection is poor"]
);

export const FFT_ALGORITHM = createAlgorithm(
    35,
    "Fast Fourier Transform (FFT)",
    2,
    "DAA",
    "Divide and Conquer",
    "Expert",
    "Signal Processing",
    "An efficient algorithm to compute the Discrete Fourier Transform (DFT) and its inverse.",
    `function fft(a) {
    const n = a.length;
    if (n === 1) return a;
    const a0 = a.filter((_, i) => i % 2 === 0);
    const a1 = a.filter((_, i) => i % 2 !== 0);
    const y0 = fft(a0);
    const y1 = fft(a1);
    // Combine steps using butterfly operations
}`,
    `FFT(A, n, ω):
    if n == 1: return A
    A_even = (a0, a2, ..., an-2)
    A_odd = (a1, a3, ..., an-1)
    Y_even = FFT(A_even, n/2, ω^2)
    Y_odd = FFT(A_odd, n/2, ω^2)
    Combine using Y_k = Y_even_k + ω^k * Y_odd_k`,
    "Exploits symmetry and periodicity by recursively dividing a DFT into two smaller DFTs, reducing complexity from O(n²) to O(n log n).",
    "custom",
    { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    "O(n)",
    ["Signal processing", "Image compression (JPEG)", "Audio analysis"],
    ["Logarithmic time complexity", "Enables real-time signal processing"],
    ["Requires size to be power of 2 (usually)", "Complex numbers math"]
);

// ==========================================
// GREEDY ALGORITHMS
// ==========================================

export const ACTIVITY_SELECTION = createAlgorithm(
    36,
    "Activity Selection",
    2,
    "DAA",
    "Greedy",
    "Beginner",
    "Greedy",
    "Selects the maximum number of activities that can be performed by a single person/machine, where each activity has a start and finish time.",
    `function activitySelection(start, finish) {
    let n = start.length;
    let selected = [0];
    let lastFinish = finish[0];
    for (let i = 1; i < n; i++) {
        if (start[i] >= lastFinish) {
            selected.push(i);
            lastFinish = finish[i];
        }
    }
    return selected;
}`,
    `ActivitySelection(S, F):
    Sort activities by finish time F
    Selected = {a1}
    last = F[1]
    for i = 2 to n:
        if S[i] >= last:
            Selected = Selected ∪ {ai}
            last = F[i]`,
    "The greedy choice is to always pick the activity that finishes earliest, leaving as much time as possible for the remaining activities.",
    "array",
    { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    "O(1)",
    ["Scheduling meetings in a single conference room", "CPU task scheduling"],
    ["Optimal for single resource", "Simple O(n log n) solution"],
    ["Doesn't apply if multiple resources are available"]
);

export const FRACTIONAL_KNAPSACK = createAlgorithm(
    37,
    "Fractional Knapsack",
    2,
    "DAA",
    "Greedy",
    "Intermediate",
    "Greedy",
    "Maximizes the total value in a knapsack by picking items with the highest value-to-weight ratio, allowing fractions of items.",
    `function fractionalKnapsack(items, capacity) {
    items.sort((a, b) => (b.val / b.wt) - (a.val / a.wt));
    let totalValue = 0;
    for (let item of items) {
        if (capacity >= item.wt) {
            capacity -= item.wt;
            totalValue += item.val;
        } else {
            totalValue += item.val * (capacity / item.wt);
            break;
        }
    }
    return totalValue;
}`,
    `FractionalKnapsack(items, capacity):
    Sort items by value/weight ratio
    for each item:
        if capacity >= weight:
            take full item, update capacity
        else:
            take fraction of item, stop`,
    "Sort items by density (value/weight) and pick greedily. This works for the fractional version but not for the 0/1 version.",
    "array",
    { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    "O(1)",
    ["Optimizing shipping container contents", "Resource allocation"],
    ["Efficient and optimal for continuous items"],
    ["Not applicable to discrete items (0/1 version)"]
);

export const HUFFMAN_CODING = createAlgorithm(
    38,
    "Huffman Coding",
    2,
    "DAA",
    "Greedy",
    "Advanced",
    "Greedy",
    "A prefix-free encoding algorithm used for lossless data compression.",
    `function huffman(freqs) {
    let heap = new MinHeap(freqs);
    while (heap.size() > 1) {
        let left = heap.removeMin();
        let right = heap.removeMin();
        let internal = new Node(left.freq + right.freq);
        internal.left = left;
        internal.right = right;
        heap.add(internal);
    }
    return heap.root();
}`,
    `Huffman(C):
    n = |C|
    Q = build priority queue with C
    for i = 1 to n-1:
        left = extractMin(Q)
        right = extractMin(Q)
        create internal node with freq = left.freq + right.freq
        insert internal node into Q`,
    "Combines the two characters with the lowest frequencies into a tree node repeatedly until only one node remains.",
    "tree",
    { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    "O(n)",
    ["Data compression (ZIP, GZIP)", "Network communications"],
    ["Optimal prefix codes", "Lossless"],
    ["Fixed overhead for smaller files"]
);

export const PRIMS_ALGORITHM = createAlgorithm(
    39,
    "Prim's Algorithm",
    2,
    "DAA",
    "Greedy",
    "Advanced",
    "Greedy",
    "Finds the Minimum Spanning Tree (MST) of a connected, weighted graph by greedily adding vertices.",
    `function prim(graph) {
    let mst = [];
    let visited = new Set();
    let pq = new MinPriorityQueue();
    // Start from arbitrary node
    // Explore edges and pick minimum
}`,
    `Prim(G, w, r):
    for each u in G.V: u.key = ∞, u.π = NIL
    r.key = 0; Q = build PQ with G.V
    while Q not empty:
        u = extractMin(Q)
        for each v in G.Adj[u]:
            if v in Q and w(u,v) < v.key:
                v.π = u, v.key = w(u,v), decreaseKey(Q, v)`,
    "Starts with a single vertex and grows the MST by picking the smallest edge that connects a vertex in the tree to a vertex outside.",
    "graph",
    { best: "O(E log V)", average: "O(E log V)", worst: "O(E log V)" },
    "O(V)",
    ["Network design (cabling, power lines)", "Cluster analysis"],
    ["Efficient for dense graphs"],
    ["Requires connected graph"]
);

export const KRUSKALS_ALGORITHM = createAlgorithm(
    40,
    "Kruskal's Algorithm",
    2,
    "DAA",
    "Greedy",
    "Advanced",
    "Greedy",
    "Finds the Minimum Spanning Tree (MST) by greedily adding the smallest edges that don't form a cycle.",
    `function kruskal(edges, V) {
    let mst = [];
    let ds = new DisjointSet(V);
    edges.sort((a,b) => a.wt - b.wt);
    for (let edge of edges) {
        if (ds.find(edge.u) !== ds.find(edge.v)) {
            mst.push(edge);
            ds.union(edge.u, edge.v);
        }
    }
    return mst;
}`,
    `Kruskal(G, w):
    A = ∅; for each vertex v in G.V: makeSet(v)
    sort edges by weight
    for each edge (u,v) in edges:
        if findSet(u) != findSet(v):
            A = A ∪ {(u,v)}; union(u,v)`,
    "Sorted search of edges. Uses Disjoint Set Union (DSU) to efficiently detect cycles while adding edges.",
    "graph",
    { best: "O(E log E) or O(E log V)", average: "O(E log V)", worst: "O(E log V)" },
    "O(V + E)",
    ["LAN design", "Telecommunication networks"],
    ["Simple to implement", "Great for sparse graphs"],
    ["Sorting overhead"]
);

export const DIJKSTRA_ALGORITHM = createAlgorithm(
    41,
    "Dijkstra's Algorithm",
    2,
    "DAA",
    "Greedy",
    "Advanced",
    "Greedy",
    "Finds the shortest paths from a single source vertex to all other vertices in a weighted graph (no negative weights).",
    `function dijkstra(G, s) {
    let dist = Array(V).fill(99999);
    dist[s] = 0;
    let pq = new MinPriorityQueue();
    pq.push(s, 0);
    while(!pq.isEmpty()) {
        let u = pq.pop();
        for(let {v, wt} of G.adj[u]) {
            if(dist[u] + wt < dist[v]) {
                dist[v] = dist[u] + wt;
                pq.push(v, dist[v]);
            }
        }
    }
}`,
    `Dijkstra(G, w, s):
    for each v: dist[v] = ∞
    dist[s] = 0; Q = build PQ with all V
    while Q not empty:
        u = extractMin(Q)
        for each neighbor v of u:
            if dist[u] + w(u,v) < dist[v]:
                dist[v] = dist[u] + w(u,v)
                decreaseKey(Q, v, dist[v])`,
    "A greedy algorithm that maintains a set of 'shortest distances found so far' and repeatedly expands the vertex with the minimum distance.",
    "graph",
    { best: "O(E log V)", average: "O(E log V)", worst: "O(E log V)" },
    "O(V)",
    ["GPS navigation", "Network routing protocols"],
    ["Guaranteed shortest path", "Highly efficient with heaps"],
    ["Cannot handle negative edge weights"]
);

export const JOB_SEQUENCING_DEADLINES = createAlgorithm(
    42,
    "Job Sequencing with Deadlines",
    2,
    "DAA",
    "Greedy",
    "Intermediate",
    "Greedy",
    "Finds the maximum profit by sequencing jobs with deadlines and profits.",
    `function jobSequencing(jobs, n) {
    jobs.sort((a,b) => b.profit - a.profit);
    let result = Array(n).fill(-1);
    let slot = Array(n).fill(false);
    for(let job of jobs) {
        for(let j = Math.min(n, job.deadline)-1; j >= 0; j--) {
            if(!slot[j]) { result[j] = job.id; slot[j] = true; break; }
        }
    }
}`,
    `JobSequencing(jobs):
    sort jobs by profit
    for each job:
        try to schedule in latest possible slot before deadline`,
    "Always pick the highest profit job and schedule it as late as possible before its deadline.",
    "array",
    { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    "O(n)",
    ["Task scheduling", "Profit optimization"],
    ["Simple greedy strategy"],
    ["Quadratic time complexity in naive implementation"]
);

export const OPTIMAL_MERGE_PATTERN = createAlgorithm(
    43,
    "Optimal Merge Pattern",
    2,
    "DAA",
    "Greedy",
    "Intermediate",
    "Greedy",
    "Merges multiple sorted files into a single sorted file with minimum movement cost.",
    `function optimalMerge(files) {
    let pq = new MinPriorityQueue(files);
    let totalCost = 0;
    while(pq.size() > 1) {
        let first = pq.pop();
        let second = pq.pop();
        let cost = first + second;
        totalCost += cost;
        pq.push(cost);
    }
    return totalCost;
}`,
    `OptimalMerge(files):
    add all file sizes to PQ
    while PQ.size > 1:
        sum = extractMin(PQ) + extractMin(PQ)
        totalCost += sum
        insert sum into PQ`,
    "Always merge the two smallest files first to minimize the number of times each element is moved.",
    "array",
    { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    "O(n)",
    ["External sorting", "Data merging optimization"],
    ["Minimizes IO operations"],
    ["Requires data to be already sorted in files"]
);

export const POLICE_AND_THIEVES = createAlgorithm(
    44,
    "Police and Thieves Problem",
    2,
    "DAA",
    "Greedy",
    "Beginner",
    "Greedy",
    "Finds the maximum number of thieves that can be caught by police given a distance constraint.",
    `function catchThieves(arr, k) {
    let police = [];
    let thieves = [];
    for(let i=0; i<arr.length; i++) {
        if(arr[i] === 'P') police.push(i);
        else thieves.push(i);
    }
    let p=0, t=0, caught=0;
    while(p < police.length && t < thieves.length) {
        if(Math.abs(police[p] - thieves[t]) <= k) { caught++; p++; t++; }
        else if(thieves[t] < police[p]) t++;
        else p++;
    }
    return caught;
}`,
    `CatchThieves(arr, k):
    find indices of P and T
    greedily pair nearest P and T within distance k`,
    "Use two pointers for police and thieves to greedily pair them within the allowed distance.",
    "array",
    { best: "O(n)", average: "O(n)", worst: "O(n)" },
    "O(n)",
    ["Security systems optimization", "Resource matching"],
    ["Linear time complexity", "Simple logic"],
    ["Limited to 1D arrangement"]
);

export const EGYPTIAN_FRACTION = createAlgorithm(
    45,
    "Egyptian Fraction",
    2,
    "DAA",
    "Greedy",
    "Beginner",
    "Greedy",
    "Represents a fraction as a sum of distinct unit fractions (1/n).",
    `function egyptianFraction(nr, dr) {
    let res = [];
    while(nr !== 0) {
        let x = Math.ceil(dr / nr);
        res.push(x);
        nr = x * nr - dr;
        dr = dr * x;
    }
    return res;
}`,
    `EgyptianFraction(nr, dr):
    while nr != 0:
        x = ceil(dr/nr)
        output 1/x
        nr = x*nr - dr, dr = dr*x`,
    "At each step, greedily subtract the largest possible unit fraction.",
    "custom",
    { best: "O(nr)", average: "O(nr)", worst: "O(nr)" },
    "O(nr)",
    ["Historical mathematics", "Fractional decomposition"],
    ["Always terminates", "Unique representation"],
    ["Fractions can become very large in calculation"]
);

export const AVL_TREE_ROTATIONS = createAlgorithm(
    46,
    "AVL Tree Rotations",
    3,
    "DSA",
    "Tree",
    "Advanced",
    "Self-Balancing BST",
    "Maintains balance factor = height(left) - height(right) ∈ {-1,0,1} using rotations.",
    `class AVLNode {
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
} `, `AVLRotation(node):
if balance > 1:
    if left child is left - heavy: LL Rotation
        else: LR Rotation
if balance < -1:
    if right child is right - heavy: RR Rotation
        else: RL Rotation`, "Maintain balance factor = height(left) - height(right) ∈ {-1,0,1}. Rotations: LL, RR, LR, RL.", "tree", { best: "O(1)", average: "O(log n)", worst: "O(log n)" }, "O(1)", ["Balanced BSTs", "Database indexing"], ["Strict height balance", "Guaranteed O(log n)"], ["More rotations than Red-Black"]);

export const RED_BLACK_TREE_INSERTION = createAlgorithm(47, "Red-Black Tree Insertion", 3, "DSA", "Tree", "Advanced", "Self-Balancing BST", "Maintains tree properties: node is red or black, root is black, no two red nodes adjacent, equal black height paths.", `class RBNode {
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
} `, `RedBlackInsert(root, value):
    insert node as RED
    fix violations:
if red uncle: recolor
if black uncle: rotate + recolor`, "Node is red or black. Root is black. No two consecutive red nodes. Equal black height paths. Insert node as RED, fix violations using recoloring and rotations.", "tree", { best: "O(log n)", average: "O(log n)", worst: "O(log n)" }, "O(1)", ["Java TreeMap", "Linux kernel", "C++ map"], ["Fast insertion", "Looser balance than AVL"], ["Complex implementation"], undefined, undefined, undefined, undefined, undefined, undefined);

export const RED_BLACK_TREE_DELETION = createAlgorithm(48, "Red-Black Tree Deletion", 3, "DSA", "Tree", "Expert", "Self-Balancing BST", "Delete a node while preserving Red-Black Tree properties. Extra fixing required if deleted node is BLACK.", `function delete (root, value) {
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
} `, `RedBlackDelete(root, value):
delete node like BST
if deleted node is BLACK:
        fix violations:
            Case 1: Sibling is RED → recolor + rotate
            Case 2: Sibling BLACK, both children BLACK → recolor
            Case 3: Sibling BLACK, near child RED → rotate
            Case 4: Sibling BLACK, far child RED → rotate + recolor`, "Delete node like BST. If deleted node is BLACK, fix violations. Cases: sibling RED, sibling BLACK with different child configurations.", "tree", { best: "O(log n)", average: "O(log n)", worst: "O(log n)" }, "O(1)", ["Java TreeMap", "Linux kernel"], ["Fast deletion", "Maintains balance"], ["Complex fix-up cases"], undefined, undefined, undefined, undefined, undefined, undefined);

export const B_TREE = createAlgorithm(49, "B-Tree", 3, "DSA", "Tree", "Advanced", "Balanced Multi-way Search Tree", "Efficient searching, insertion, and deletion for large disk-based data. Each node has ⌈m/2⌉ to m children.", `class BTreeNode {
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
} `, `BTreeSearch(root, key):
    traverse keys and children
if found: return node
if leaf: return null
    recurse on child

BTreeInsert(root, key):
if root is full: split
    insert into non - full node`, "Each node has ⌈m/2⌉ to m children. Keys in node are sorted. All leaves at same level. Grows upward. Search: traverse keys and children. Insert: split node if overflow.", "tree", { best: "O(log n)", average: "O(log n)", worst: "O(log n)" }, "O(n)", ["Databases", "File systems", "Indexing systems"], ["Efficient for disk", "Balanced height"], ["Complex implementation"], undefined, undefined, undefined, undefined, undefined, undefined);

export const B_PLUS_TREE_SEARCH = createAlgorithm(50, "B+ Tree Search", 3, "DSA", "Tree", "Advanced", "Advanced Indexing Tree", "Data only in leaves. Leaves are linked. Faster range queries than B-Tree.", `function bPlusTreeSearch(root, key) {
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
} `, `BPlusTreeSearch(root, key):
    start from root
    traverse internal nodes using keys
    reach leaf node
    perform linear search in leaf`, "Difference from B-Tree: Data only in leaves. Leaves are linked. Sequential access via linked leaves. Fewer disk I/O operations.", "tree", { best: "O(log n)", average: "O(log n)", worst: "O(log n)" }, "O(n)", ["Database indexing (MySQL, Oracle)", "File systems"], ["Faster range queries", "Sequential access"], ["More complex than B-Tree"], undefined, undefined, undefined, undefined, undefined, undefined);

export const SPLAY_TREE_OPERATIONS = createAlgorithm(51, "Splay Tree Operations", 3, "DSA", "Tree", "Advanced", "Self-Adjusting Binary Search Tree", "Recently accessed elements are moved closer to the root using splaying operations.", `function splay(root, key) {
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
} `, `SplayTreeSplay(root, key):
    bring accessed node to root using rotations:
    Zig: node is child of root
Zig - Zig: node and parent both left / right children
Zig - Zag: node is left child, parent is right`, "Bring accessed node to root using rotations. Zig (single rotation), Zig-Zig (double rotation same direction), Zig-Zag (double rotation opposite directions).", "tree", { best: "O(log n)", average: "O(log n)", worst: "O(n)" }, "O(1)", ["Cache-like access", "Frequently accessed nodes"], ["No balance info stored", "Frequently accessed nodes are fast"], ["Individual operations can be slow"], undefined, undefined, undefined, undefined, undefined, undefined);

// ==========================================
// STRING ALGORITHMS
// ==========================================

export const KMP_ALGORITHM = createAlgorithm(52, "KMP Algorithm", 4, "DSA", "String Matching", "Advanced", "Prefix Function (LPS Array)", "Efficiently finds all occurrences of a pattern in a text without rechecking characters.", `function computeLPS(pattern) {
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
} `, `ComputeLPS(pattern):
lps[0] ← 0
len ← 0
i ← 1
while i < m:
    if pattern[i] == pattern[len]:
        len++, lps[i] ← len, i++
        else:
if len != 0: len ← lps[len - 1]
            else: lps[i] ← 0, i++

KMPSearch(text, pattern):
    compute LPS array
i ← 0, j ← 0
while i < n:
    if text[i] == pattern[j]: i++, j++
if j == m: report match, j ← lps[j - 1]
        else if text[i] != pattern[j]:
    if j != 0: j ← lps[j - 1]
            else: i++`, "Preprocesses pattern to build LPS (Longest Prefix Suffix) array. On mismatch, shift using LPS instead of restarting. Avoids redundant comparisons.", "array", { best: "O(n)", average: "O(n + m)", worst: "O(n + m)" }, "O(m)", ["Text editors", "Compilers", "DNA sequence matching"], ["Linear time", "No backtracking", "Widely used"], ["Preprocessing overhead"]);

export const RABIN_KARP_ALGORITHM = createAlgorithm(53, "Rabin-Karp Algorithm", 4, "DSA", "String Matching", "Advanced", "Hashing", "Finds occurrences of a pattern in a text using rolling hash.", `function rabinKarp(text, pattern) {
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
} `, `RabinKarp(text, pattern):
    compute hash(pattern)
    compute hash(first window of text)
for i ← 0 to n - m:
if hash matches: check characters
        update hash for next window`, "Instead of comparing characters directly, compares hash values. If hashes match, verify characters to avoid collision errors. Uses rolling hash for efficiency.", "array", { best: "O(n + m)", average: "O(n + m)", worst: "O(nm)" }, "O(1)", ["Plagiarism detection", "Multiple pattern matching"], ["Average linear time", "Multiple patterns"], ["Worst case with collisions"]);

export const Z_ALGORITHM = createAlgorithm(54, "Z Algorithm", 4, "DSA", "String Matching", "Advanced", "Prefix Matching", "Finds pattern occurrences in linear time by computing Z-array.", `function computeZArray(s) {
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
    } `, `ZAlgorithm(s):
    compute Z array where Z[i] = length of longest substring
    starting at i which is also a prefix
for i: if Z[i] == pattern length: report match`, "Z[i] = length of the longest substring starting at i which is also a prefix. Pattern matching done by computing Z on pattern + '$' + text.", "array", { best: "O(n)", average: "O(n)", worst: "O(n)" }, "O(n)", ["String matching", "Pattern searching"], ["Linear time", "Simple concept"], ["Extra space for Z array"], undefined, undefined, undefined, undefined, undefined, undefined);

export const TRIE_OPERATIONS = createAlgorithm(55, "Trie Operations", 4, "DSA", "String Matching", "Intermediate", "Prefix Tree", "Efficient prefix-based searching (dictionary, autocomplete).", `class TrieNode {
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
} `, `TrieInsert(word):
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

export const COUNT_SET_BITS = createAlgorithm(56, "Count Set Bits", 5, "DSA", "Bit Manipulation", "Beginner", "Bit Counting", "Counts number of 1s in binary representation.", `function countSetBits(n) {
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
} `, `CountSetBits(n):
    count ← 0
while n > 0:
    n ← n & (n - 1)
count++
return count`, "Brian Kernighan's algorithm: n & (n-1) removes the rightmost set bit. Repeat until n becomes 0.", "custom", { best: "O(1)", average: "O(k)", worst: "O(k)" }, "O(1)", ["Bit manipulation", "Hamming weight", "Parity checking"], ["Efficient", "Simple"], ["k = number of set bits"], undefined, undefined, undefined, undefined, undefined, undefined);

export const CHECK_POWER_OF_TWO = createAlgorithm(57, "Check Power of Two", 5, "DSA", "Bit Manipulation", "Beginner", "Bit Checking", "A power of two has only one set bit.", `function isPowerOfTwo(n) {
    if (n <= 0) return false;
    return (n & (n - 1)) === 0;
} `, `isPowerOfTwo(n):
if n <= 0: return false
return (n & (n - 1)) == 0`, "A power of two has only one set bit. n & (n-1) removes the rightmost set bit. If result is 0, it's a power of two.", "custom", { best: "O(1)", average: "O(1)", worst: "O(1)" }, "O(1)", ["Bit manipulation", "Optimization", "Math problems"], ["Constant time", "Simple"], ["Only for positive numbers"], undefined, undefined, undefined, undefined, undefined, undefined);

export const XOR_BASED_PROBLEMS = createAlgorithm(58, "XOR-based Problems", 5, "DSA", "Bit Manipulation", "Intermediate", "XOR Trick", "Finds unique element when others appear twice.", `function findUnique(arr) {
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
} `, `FindUnique(arr):
result ← 0
for x in arr:
    result ← result ^ x
return result`, "x ^ x = 0, x ^ 0 = x. XOR all elements cancels pairs, leaving unique element. For two unique, use rightmost set bit to partition.", "custom", { best: "O(n)", average: "O(n)", worst: "O(n)" }, "O(1)", ["Finding unique elements", "Pair cancellation", "Bit manipulation"], ["Linear time", "Constant space"], ["Only works with pairs"], undefined, undefined, undefined, undefined, undefined, undefined);

export const BIT_MASKING = createAlgorithm(59, "Bit Masking", 5, "DSA", "Bit Manipulation", "Advanced", "State Representation", "Represents subsets, states, permissions efficiently.", `function generateSubsets(arr) {
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

export const GRAY_CODE_GENERATION = createAlgorithm(60, "Gray Code Generation", 5, "DSA", "Bit Manipulation", "Advanced", "Binary Encoding", "Generate binary numbers such that only one bit changes between consecutive numbers.", `function grayCode(n) {
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
} `, `GrayCode(n):
if n == 0: return [0]
prev ← GrayCode(n - 1)
result ← prev
add ← 1 << (n - 1)
for i from prev.length - 1 down to 0:
result.push(prev[i] | add)
return result`, "Generate binary numbers such that only one bit changes between consecutive numbers. Used in hardware encoders, error minimization, backtracking.", "custom", { best: "O(2^n)", average: "O(2^n)", worst: "O(2^n)" }, "O(2^n)", ["Hardware encoders", "Error minimization", "Backtracking"], ["Single bit change", "Useful in hardware"], ["Exponential space"]);

// ==========================================
// DYNAMIC PROGRAMMING ALGORITHMS
// ==========================================

export const FIBONACCI_DP = createAlgorithm(
    61,
    "Fibonacci Sequence (DP)",
    2,
    "DAA",
    "Dynamic Programming",
    "Beginner",
    "Bottom-Up (Tabulation)",
    "Computes the n-th Fibonacci number efficiently using memoization or tabulation to avoid redundant calculations.",
    `function fibDP(n) {
    let fib = [0, 1];
    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib[n];
}`,
    `FibDP(n):
    if n <= 1: return n
    f[0] = 0, f[1] = 1
    for i = 2 to n:
        f[i] = f[i-1] + f[i-2]
    return f[n]`,
    "Reduces the exponential time complexity of the recursive approach (O(2^n)) to linear time by storing results of subproblems.",
    "custom",
    { best: "O(n)", average: "O(n)", worst: "O(n)" },
    "O(n) or O(1)",
    ["Predictive modeling", "Financial analysis"],
    ["Efficient", "Prevents redundant calls"],
    ["Requires extra space (O(n) for array)"]
);

export const LCS_ALGORITHM = createAlgorithm(
    62,
    "Longest Common Subsequence (LCS)",
    2,
    "DAA",
    "Dynamic Programming",
    "Intermediate",
    "Bottom-Up",
    "Finds the longest subsequence present in two strings in the same relative order.",
    `function lcs(X, Y) {
    let m = X.length, n = Y.length;
    let L = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (X[i - 1] === Y[j - 1]) L[i][j] = L[i - 1][j - 1] + 1;
            else L[i][j] = Math.max(L[i - 1][j], L[i][j - 1]);
        }
    }
    return L[m][n];
}`,
    `LCS(X, Y):
    m = |X|, n = |Y|
    for i = 1 to m:
        for j = 1 to n:
            if X[i] == Y[j]: L[i,j] = L[i-1, j-1] + 1
            else: L[i,j] = max(L[i-1, j], L[i, j-1])`,
    "Builds a table where each cell (i, j) represents the LCS of prefixes X[1..i] and Y[1..j].",
    "matrix",
    { best: "O(mn)", average: "O(mn)", worst: "O(mn)" },
    "O(mn)",
    ["Diff tools", "DNA sequence alignment"],
    ["Finds global optimal", "Robust for string comparisons"],
    ["Quadratic space/time"]
);

export const KNAPSACK_01 = createAlgorithm(
    63,
    "0/1 Knapsack Problem",
    2,
    "DAA",
    "Dynamic Programming",
    "Intermediate",
    "Bottom-Up",
    "Maximizes the value of items in a knapsack with a weight limit, where each item can either be taken or left behind.",
    `function knapsack(W, wt, val, n) {
    let K = Array(n + 1).fill(0).map(() => Array(W + 1).fill(0));
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= W; w++) {
            if (wt[i - 1] <= w)
                K[i][w] = Math.max(val[i - 1] + K[i - 1][w - wt[i - 1]], K[i - 1][w]);
            else K[i][w] = K[i - 1][w];
        }
    }
    return K[n][W];
}`,
    `Knapsack(W, wt, val, n):
    for i = 1 to n:
        for w = 1 to W:
            if wt[i] <= w: K[i,w] = max(val[i]+K[i-1, w-wt[i]], K[i-1, w])
            else: K[i,w] = K[i-1, w]`,
    "Systematically explores all combinations by deciding for each item whether including it yields more value than excluding it at current capacity.",
    "matrix",
    { best: "O(nW)", average: "O(nW)", worst: "O(nW)" },
    "O(nW)",
    ["Budget allocation", "Cargo loading"],
    ["Finds exact optimal for discrete items"],
    ["Pseudo-polynomial time complexity"]
);

export const MATRIX_CHAIN_MULTIPLICATION = createAlgorithm(
    64,
    "Matrix Chain Multiplication",
    2,
    "DAA",
    "Dynamic Programming",
    "Advanced",
    "Bottom-Up",
    "Finds the most efficient way to multiply a sequence of matrices by minimizing the number of scalar multiplications.",
    `function mcm(p, n) {
    let m = Array(n).fill(0).map(() => Array(n).fill(0));
    for (let L = 2; L < n; L++) {
        for (let i = 1; i < n - L + 1; i++) {
            let j = i + L - 1;
            m[i][j] = Infinity;
            for (let k = i; k <= j - 1; k++) {
                let q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
                if (q < m[i][j]) m[i][j] = q;
            }
        }
    }
    return m[1][n - 1];
}`,
    `MCM(p):
    n = p.length - 1
    for L = 2 to n:
        for i = 1 to n-L+1:
            j = i+L-1
            m[i,j] = min(m[i,k] + m[k+1,j] + p[i-1]*p[k]*p[j])`,
    "Groups matrix multiplications in the optimal order without actually performing the multiplication.",
    "matrix",
    { best: "O(n³)", average: "O(n³)", worst: "O(n³)" },
    "O(n²)",
    ["Compilers", "Expression evaluation"],
    ["Guarantees minimum operations"],
    ["Cubic time complexity"]
);

export const LIS_ALGORITHM = createAlgorithm(
    65,
    "Longest Increasing Subsequence (LIS)",
    2,
    "DAA",
    "Dynamic Programming",
    "Intermediate",
    "Bottom-Up",
    "Finds the length of the longest subsequence in an array such that all elements of the subsequence are sorted in increasing order.",
    `function lis(arr) {
    let n = arr.length;
    let dp = Array(n).fill(1);
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[i] > arr[j] && dp[i] < dp[j] + 1) dp[i] = dp[j] + 1;
        }
    }
    return Math.max(...dp);
}`,
    `LIS(A):
    n = |A|; L = [1...1]
    for i = 1 to n-1:
        for j = 0 to i-1:
            if A[i] > A[j]: L[i] = max(L[i], L[j]+1)
    return max(L)`,
    "Calculates the longest increasing subsequence ending at each index i using previously computed values for indices < i.",
    "array",
    { best: "O(n log n)", average: "O(n²)", worst: "O(n²)" },
    "O(n)",
    ["Stock market analysis", "Longest path in DAG"],
    ["Simple DP implementation"],
    ["Standard DP version is O(n²)"]
);

export const EDIT_DISTANCE = createAlgorithm(
    66,
    "Edit Distance",
    2,
    "DAA",
    "Dynamic Programming",
    "Intermediate",
    "Bottom-Up",
    "Calculates the minimum number of operations (insert, delete, replace) required to convert one string into another.",
    `function editDistance(str1, str2) {
    let m = str1.length, n = str2.length;
    let dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0) dp[i][j] = j;
            else if (j === 0) dp[i][j] = i;
            else if (str1[i - 1] === str2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
            else dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
        }
    }
    return dp[m][n];
}`,
    `EditDistance(S1, S2):
    for i = 0 to m: dp[i,0] = i
    for j = 0 to n: dp[0,j] = j
    if S1[i] == S2[j]: dp[i,j] = dp[i-1,j-1]
    else: dp[i,j] = 1 + min(dp[i, j-1], dp[i-1, j], dp[i-1, j-1])`,
    "Represent the cost of transformation between all prefixes of two strings using a grid.",
    "matrix",
    { best: "O(mn)", average: "O(mn)", worst: "O(mn)" },
    "O(mn)",
    ["Spell checkers", "DNA sequence similarity"],
    ["Versatile distance metric"],
    ["Quadratic space/time"]
);

export const PARTITION_PROBLEM = createAlgorithm(
    67,
    "Partition Problem",
    2,
    "DAA",
    "Dynamic Programming",
    "Intermediate",
    "Bottom-Up",
    "Determines if a given set can be partitioned into two subsets with equal sum.",
    `function canPartition(arr) {
    let sum = arr.reduce((a, b) => a + b, 0);
    if (sum % 2 !== 0) return false;
    let n = arr.length, target = sum / 2;
    let dp = Array(n + 1).fill(false).map(() => Array(target + 1).fill(false));
    for (let i = 0; i <= n; i++) dp[i][0] = true;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= target; j++) {
            if (arr[i - 1] <= j) dp[i][j] = dp[i - 1][j] || dp[i - 1][j - arr[i - 1]];
            else dp[i][j] = dp[i - 1][j];
        }
    }
    return dp[n][target];
}`,
    `CanPartition(A):
    sum = ∑A; if sum is odd: return false
    target = sum/2
    dp[i, j]: can we get sum j using first i elements?`,
    "A variation of the subset sum problem where we look for a subset whose sum is half of the total sum.",
    "matrix",
    { best: "O(n * sum)", average: "O(n * sum)", worst: "O(n * sum)" },
    "O(n * sum)",
    ["Resource balancing", "Load distribution"],
    ["Always finds solution if it exists"],
    ["Dependent on sum size"]
);

export const ROD_CUTTING = createAlgorithm(
    68,
    "Rod Cutting Problem",
    2,
    "DAA",
    "Dynamic Programming",
    "Intermediate",
    "Bottom-Up",
    "Finds the maximum profit obtainable by cutting a rod into various lengths and selling the pieces.",
    `function maxProfit(price, n) {
    let val = Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        let max_val = -Infinity;
        for (let j = 0; j < i; j++)
            max_val = Math.max(max_val, price[j] + val[i - j - 1]);
        val[i] = max_val;
    }
    return val[n];
}`,
    `RodCutting(price, n):
    val[0] = 0
    for i = 1 to n:
        maxVal = -∞
        for j = 0 to i-1:
            maxVal = max(maxVal, price[j] + val[i-j-1])
        val[i] = maxVal`,
    "For a rod of length i, find the best profit by considering moving the first cut to every possible position j.",
    "array",
    { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    "O(n)",
    ["Inventory optimization", "Manufacturing cuts"],
    ["Exemplifies DP subproblem structure"],
    ["Quadratic time complexity"]
);

export const COIN_CHANGE = createAlgorithm(
    69,
    "Coin Change Problem",
    2,
    "DAA",
    "Dynamic Programming",
    "Intermediate",
    "Bottom-Up",
    "Finds the minimum number of coins needed or number of ways to make a specific amount using a set of coins.",
    `function coinChange(coins, amount) {
    let dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    `CoinChange(coins, amount):
    dp[0...n] = ∞; dp[0] = 0
    for coin in coins:
        for i from coin to amount:
            dp[i] = min(dp[i], dp[i-coin] + 1)`,
    "Uses a 1D array to store the minimum coins for each amount from 0 up to the target amount.",
    "array",
    { best: "O(n * amount)", average: "O(n * amount)", worst: "O(n * amount)" },
    "O(amount)",
    ["POS systems", "Change making optimization"],
    ["Efficient memory usage in 1D version"],
    ["Dependent on target amount value"]
);

export const WORD_BREAK = createAlgorithm(
    70,
    "Word Break Problem",
    2,
    "DAA",
    "Dynamic Programming",
    "Intermediate",
    "Bottom-Up",
    "Determines if a string can be segmented into a space-separated sequence of dictionary words.",
    `function wordBreak(str, dict) {
    let dp = Array(str.length + 1).fill(false);
    dp[0] = true;
    for (let i = 1; i <= str.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && dict.has(str.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[str.length];
}`,
    `WordBreak(S, dict):
    dp[0] = true
    for i = 1 to n:
        for j = 0 to i-1:
            if dp[j] and S[j...i] in dict:
                dp[i] = true; break`,
    "Breaks the problem down: a string can be broken into words if some prefix can be broken AND the remaining suffix is a dictionary word.",
    "array",
    { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    "O(n)",
    ["NLP tokenization", "URL segmentation"],
    ["Effective for dictionary-based splitting"],
    ["Cubic time if substring operations are counted"]
);

// ==========================================
// BACKTRACKING ALGORITHMS
// ==========================================

export const N_QUEENS = createAlgorithm(
    71,
    "N-Queens Problem",
    2,
    "DAA",
    "Backtracking",
    "Intermediate",
    "Backtracking",
    "Places N queens on an NxN chessboard such that no two queens threaten each other.",
    `function solveNQueens(n) {
    let res = [], board = Array(n).fill(0).map(() => Array(n).fill('.'));
    backtrack(0, board, res);
    return res;
}`,
    `NQueens(row):
    if row == n: output board
    for col = 0 to n-1:
        if safe(row, col):
            place queen
            NQueens(row + 1)
            remove queen`,
    "Tries every possible column in the current row. If a queen can be placed safely, it proceeds to the next row; otherwise, it backtracks and tries another column.",
    "matrix",
    { best: "O(n!)", average: "O(n!)", worst: "O(n!)" },
    "O(n²)",
    ["Constraint satisfaction problems", "Logic puzzles"],
    ["Finds all possible solutions", "Classical backtracking example"],
    ["Exponential time complexity"]
);

export const RAT_IN_A_MAZE = createAlgorithm(
    72,
    "Rat in a Maze",
    2,
    "DAA",
    "Backtracking",
    "Intermediate",
    "Backtracking",
    "Finds a path for a rat from source to destination in a maze with obstacles.",
    `function solveMaze(maze) {
    let sol = Array(n).fill(0).map(() => Array(n).fill(0));
    return findPath(0, 0, maze, sol);
}`,
    `SolveMaze(x, y):
    if (x,y) is destination: return true
    if safe(x,y):
        mark (x,y) in path
        if SolveMaze(x+1, y) return true
        if SolveMaze(x, y+1) return true
        unmark (x,y)`,
    "Recursively explores possible directions (Right, Down). If a dead end is reached, it backtracks to explore alternative routes.",
    "matrix",
    { best: "O(2^(n*n))", average: "O(2^(n*n))", worst: "O(2^(n*n))" },
    "O(n²)",
    ["Pathfinding", "Game logic"],
    ["Visualizable", "Handles obstacles"],
    ["Extremely slow for large grids"]
);

export const SUDOKU_SOLVER = createAlgorithm(
    73,
    "Sudoku Solver",
    2,
    "DAA",
    "Backtracking",
    "Advanced",
    "Backtracking",
    "Fills a 9x9 grid with digits so that each column, each row, and each of the nine 3x3 subgrids contains all of the digits from 1 to 9.",
    `function solveSudoku(board) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === 0) {
                for (let k = 1; k <= 9; k++) {
                    if (isValid(r, c, k)) {
                        board[r][c] = k;
                        if (solveSudoku(board)) return true;
                        board[r][c] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}`,
    `SolveSudoku():
    find empty cell (r,c)
    if none: return true
    for num = 1 to 9:
        if safe(r,c,num):
            board[r,c] = num
            if SolveSudoku(): return true
            board[r,c] = 0
    return false`,
    "The solver tries digits 1-9 in an empty cell. If a digit works with current constraints, it recurses. If no digits work, it backtracks and changes the previous cell's value.",
    "matrix",
    { best: "O(9^(n*n))", average: "O(9^(n*n))", worst: "O(9^(n*n))" },
    "O(n²)",
    ["Constraint satisfaction", "Puzzle gaming"],
    ["Can solve any valid Sudoku", "Exhaustive search"],
    ["Brute-force nature"]
);

export const HAMILTONIAN_CYCLE = createAlgorithm(
    74,
    "Hamiltonian Cycle",
    2,
    "DAA",
    "Backtracking",
    "Advanced",
    "Backtracking",
    "Finds a cycle in a graph that visits every vertex exactly once and returns to the start vertex.",
    `function hamCycle(graph) {
    let path = Array(V).fill(-1);
    path[0] = 0;
    return hamCycleUtil(graph, path, 1);
}`,
    `HamCycle(pos):
    if pos == V:
        if edge(path[V-1], path[0]): return true
    for v from 1 to V-1:
        if safe(v, pos):
            path[pos] = v
            if HamCycle(pos + 1): return true
            path[pos] = -1`,
    "Explores all possible vertices as candidates for the next position in the path, checking connectivity and uniqueness.",
    "graph",
    { best: "O(n!)", average: "O(n!)", worst: "O(n!)" },
    "O(V)",
    ["Routing optimization", "Traveling Salesman Problem (TSP) basics"],
    ["Finds complete traversal paths"],
    ["NP-Complete problem"]
);

export const SUBSET_SUM_PROBLEM = createAlgorithm(
    75,
    "Subset Sum Problem",
    2,
    "DAA",
    "Backtracking",
    "Intermediate",
    "Backtracking",
    "Finds a subset of elements in a set that sum up to a given target value.",
    `function subsetSum(set, n, sum) {
    if (sum === 0) return true;
    if (n === 0 && sum !== 0) return false;
    if (set[n - 1] > sum) return subsetSum(set, n - 1, sum);
    return subsetSum(set, n - 1, sum) || subsetSum(set, n - 1, sum - set[n - 1]);
}`,
    `SubsetSum(sum, index):
    if sum == 0: return true
    if index == n: return false
    include = SubsetSum(sum - A[index], index + 1)
    exclude = SubsetSum(sum, index + 1)`,
    "The algorithm makes two recursive calls at each step: one including the current element and one excluding it.",
    "array",
    { best: "O(2^n)", average: "O(2^n)", worst: "O(2^n)" },
    "O(n)",
    ["Financial fraud detection", "Bin packing"],
    ["Simple recursive definition"],
    ["Highly inefficient for large sets"]
);

export const KNIGHTS_TOUR = createAlgorithm(
    76,
    "Knight's Tour",
    2,
    "DAA",
    "Backtracking",
    "Advanced",
    "Backtracking",
    "Moves a knight on an NxN chessboard such that it visits every square exactly once.",
    `function knightsTour(n) {
    let board = Array(n).fill(-1).map(() => Array(n).fill(-1));
    board[0][0] = 0;
    solve(0, 0, 1, board);
}`,
    `KnightsTour(x, y, moveCount):
    if moveCount == n*n: return true
    for each knight move:
        newX, newY = valid next move
        mark board[newX, newY] = moveCount
        if KnightsTour(newX, newY, moveCount + 1): return true
        unmark board`,
    "Tries all 8 possible moves for a knight from its current position. If a move is valid and leads to a full tour, it returns success; otherwise, it backtracks.",
    "matrix",
    { best: "O(8^(n*n))", average: "O(8^(n*n))", worst: "O(8^(n*n))" },
    "O(n²)",
    ["Heuristic search tests", "Puzzle solving"],
    ["Classic chess problem"],
    ["Extremely large search space"]
);

export const PERMUTATIONS_OF_STRING = createAlgorithm(
    77,
    "Permutations of String",
    2,
    "DAA",
    "Backtracking",
    "Beginner",
    "Backtracking",
    "Generates all possible arrangements of characters in a given string.",
    `function permute(str, l, r) {
    if (l === r) console.log(str);
    else {
        for (let i = l; i <= r; i++) {
            str = swap(str, l, i);
            permute(str, l + 1, r);
            str = swap(str, l, i);
        }
    }
}`,
    `Permute(str, left, right):
    if left == right: print str
    else:
        for i = left to right:
            swap(str[left], str[i])
            Permute(str, left + 1, right)
            swap(str[left], str[i])`,
    "Swaps characters to create different positions and recurses. Swapping back (backtracking) restores the string for the next iteration.",
    "custom",
    { best: "O(n * n!)", average: "O(n * n!)", worst: "O(n * n!)" },
    "O(n)",
    ["Anagram generation", "Cryptography"],
    ["Finds all possible orders"],
    ["Grows factorially with length"]
);

export const GRAPH_COLORING = createAlgorithm(
    78,
    "Graph Coloring",
    2,
    "DAA",
    "Backtracking",
    "Advanced",
    "Backtracking",
    "Assigns labels (colors) to each vertex of a graph such that no two adjacent vertices have the same label.",
    `function graphColoring(graph, m) { ... }`,
    `GraphColor(v):
    if v == V: return true
    for c = 1 to m:
        if safe(v, c):
            color[v] = c
            if GraphColor(v + 1): return true
            color[v] = 0`,
    "Attempts to color each vertex with one of m colors. If current color doesn't conflict with neighbors, it recurses for the next vertex.",
    "graph",
    { best: "O(m^V)", average: "O(m^V)", worst: "O(m^V)" },
    "O(V)",
    ["Register allocation", "Frequency assignment", "Map coloring"],
    ["General constraint solver"],
    ["Computationally expensive"]
);

export const M_COLORING_PROBLEM = createAlgorithm(
    79,
    "M-Coloring Problem",
    2,
    "DAA",
    "Backtracking",
    "Intermediate",
    "Backtracking",
    "Determines if a graph can be colored with at most M colors.",
    `function isMColorable(graph, m) {
    return solve(0, m);
}`,
    `MColorable(v, m):
    if v == V: return true
    for c = 1 to m:
        if isValid(v, c):
            color[v] = c
            if MColorable(v+1, m): return true
            color[v] = 0`,
    "A decision version of graph coloring that checks if an M-coloring exists using backtracking to verify all possibilities.",
    "graph",
    { best: "O(m^V)", average: "O(m^V)", worst: "O(m^V)" },
    "O(V)",
    ["Map coloring", "Conflict-free resource sharing"],
    ["Direct constraint check"],
    ["Exponential complexity"]
);

export const WORD_SEARCH_MATRIX = createAlgorithm(
    80,
    "Word Search (Matrix)",
    2,
    "DAA",
    "Backtracking",
    "Intermediate",
    "Backtracking",
    "Finds if a given word exists in a 2D matrix of characters.",
    `function exist(board, word) {
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[0].length; c++) {
            if (dfs(r, c, 0)) return true;
        }
    }
    return false;
}`,
    `WordSearch(r, c, index):
    if index == word.length: return true
    if outOfBounds or visited or board[r,c] != word[index]: return false
    mark visited
    found = search four directions
    unmark visited
    return found`,
    "Starts from each cell in the matrix and performs a depth-first search in four directions to match the word characters.",
    "matrix",
    { best: "O(N * 4^L)", average: "O(N * 4^L)", worst: "O(N * 4^L)" },
    "O(L)",
    ["Grid puzzles", "Pattern recognition"],
    ["Intuitive DFS application"],
    ["Search space can be deep"]
);

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
    TERNARY_SEARCH,
    UNORDERED_SEQUENTIAL_SEARCH,
    ORDERED_SEQUENTIAL_SEARCH,
    HASH_BASED_SEARCH
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
    TREE_SORT,
    ODD_EVEN_SORT
];


export const COMPREHENSIVE_TREE_ALGORITHMS: Algorithm[] = [
    AVL_TREE_ROTATIONS,
    RED_BLACK_TREE_INSERTION,
    RED_BLACK_TREE_DELETION,
    B_TREE,
    B_PLUS_TREE_SEARCH,
    SPLAY_TREE_OPERATIONS
];

export const COMPREHENSIVE_DC_ALGORITHMS: Algorithm[] = [
    BINARY_SEARCH_DC,
    MERGE_SORT_DC,
    QUICK_SORT_DC,
    STRASSENS_MATRIX_MULTIPLICATION,
    CLOSEST_PAIR_OF_POINTS,
    MAX_MIN_PROBLEM,
    KARATSUBA_ALGORITHM,
    CONVEX_HULL_DC,
    MEDIAN_FINDING_DC,
    FFT_ALGORITHM
];

export const COMPREHENSIVE_GREEDY_ALGORITHMS: Algorithm[] = [
    ACTIVITY_SELECTION,
    FRACTIONAL_KNAPSACK,
    HUFFMAN_CODING,
    PRIMS_ALGORITHM,
    KRUSKALS_ALGORITHM,
    DIJKSTRA_ALGORITHM,
    JOB_SEQUENCING_DEADLINES,
    OPTIMAL_MERGE_PATTERN,
    POLICE_AND_THIEVES,
    EGYPTIAN_FRACTION
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

export const COMPREHENSIVE_DP_ALGORITHMS: Algorithm[] = [
    FIBONACCI_DP,
    LCS_ALGORITHM,
    KNAPSACK_01,
    MATRIX_CHAIN_MULTIPLICATION,
    LIS_ALGORITHM,
    EDIT_DISTANCE,
    PARTITION_PROBLEM,
    ROD_CUTTING,
    COIN_CHANGE,
    WORD_BREAK
];

export const COMPREHENSIVE_BACKTRACKING_ALGORITHMS: Algorithm[] = [
    N_QUEENS,
    RAT_IN_A_MAZE,
    SUDOKU_SOLVER,
    HAMILTONIAN_CYCLE,
    SUBSET_SUM_PROBLEM,
    KNIGHTS_TOUR,
    PERMUTATIONS_OF_STRING,
    GRAPH_COLORING,
    M_COLORING_PROBLEM,
    WORD_SEARCH_MATRIX
];

export const ALL_COMPREHENSIVE_ALGORITHMS: Algorithm[] = [
    ...COMPREHENSIVE_SEARCHING_ALGORITHMS,
    ...COMPREHENSIVE_SORTING_ALGORITHMS,
    ...COMPREHENSIVE_DC_ALGORITHMS,
    ...COMPREHENSIVE_GREEDY_ALGORITHMS,
    ...COMPREHENSIVE_TREE_ALGORITHMS,
    ...COMPREHENSIVE_STRING_ALGORITHMS,
    ...COMPREHENSIVE_BIT_ALGORITHMS,
    ...COMPREHENSIVE_DP_ALGORITHMS,
    ...COMPREHENSIVE_BACKTRACKING_ALGORITHMS
];
