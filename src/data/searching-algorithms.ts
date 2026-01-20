import type { AlgorithmData } from '../lib/algorithm-schema';

// Linear Search Algorithm Data
export const linearSearchData: AlgorithmData = {
    id: 'linear-search',
    name: 'Linear Search',
    slug: 'linear-search',
    category: 'Searching',
    difficulty: 'Beginner',

    definition: 'Linear Search is a sequential searching algorithm that checks each element one by one until the target element is found or the list ends.',

    description: `Linear Search (also called Sequential Search) is the simplest searching algorithm. It works by iterating through each element in the array sequentially until it finds the target value or reaches the end of the array.

**Key Characteristics:**
- Works on both sorted and unsorted arrays
- Simple to implement and understand
- Inefficient for large datasets
- Best for small arrays or when data is unsorted

**How it works:**
1. Start from the first element
2. Compare current element with target
3. If match found, return the index
4. If not, move to next element
5. Repeat until found or array ends`,

    realWorldExample: `**Real-world applications:**
- Finding a name in an unsorted contact list
- Searching for a book on an unsorted shelf
- Looking for a specific card in a shuffled deck
- Finding a file in an unsorted directory`,

    pseudocode: `function linearSearch(array, target):
    for i from 0 to array.length - 1:
        if array[i] == target:
            return i
    return -1`,

    implementations: {
        javascript: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

// Example usage
const array = [10, 25, 30, 45, 50];
const target = 45;
const result = linearSearch(array, target);
console.log(result); // Output: 3`,

        python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Example usage
array = [10, 25, 30, 45, 50]
target = 45
result = linear_search(array, target)
print(result)  # Output: 3`,

        java: `public class LinearSearch {
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] array = {10, 25, 30, 45, 50};
        int target = 45;
        int result = linearSearch(array, target);
        System.out.println(result); // Output: 3
    }
}`,

        cpp: `#include <iostream>
using namespace std;

int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}

int main() {
    int array[] = {10, 25, 30, 45, 50};
    int n = sizeof(array) / sizeof(array[0]);
    int target = 45;
    int result = linearSearch(array, n, target);
    cout << result << endl; // Output: 3
    return 0;
}`
    },

    timeComplexity: {
        best: 'O(1) - Element found at first position',
        average: 'O(n) - Element found in middle',
        worst: 'O(n) - Element at end or not present'
    },

    spaceComplexity: 'O(1) - No extra space required',

    visualizationType: 'array',
    defaultInput: [10, 25, 30, 45, 50],

    prerequisites: ['Basic Arrays', 'Loops'],

    applications: [
        'Searching in unsorted data',
        'Small datasets',
        'Linked list searching',
        'Finding elements when data changes frequently'
    ],

    relatedAlgorithms: ['Binary Search', 'Jump Search', 'Interpolation Search'],

    tags: ['searching', 'array', 'sequential', 'beginner', 'O(n)']
};

// Binary Search Algorithm Data
export const binarySearchData: AlgorithmData = {
    id: 'binary-search',
    name: 'Binary Search',
    slug: 'binary-search',
    category: 'Searching',
    difficulty: 'Beginner',

    definition: 'Binary Search is an efficient searching algorithm that finds an element by repeatedly dividing a sorted array into halves.',

    description: `Binary Search is a divide-and-conquer algorithm that works on sorted arrays. It compares the target value with the middle element and eliminates half of the search space in each iteration.

**Key Characteristics:**
- Requires sorted array
- Much faster than linear search
- Uses divide and conquer strategy
- Logarithmic time complexity

**How it works:**
1. Find the middle element
2. Compare target with middle
3. If equal, return index
4. If target < middle, search left half
5. If target > middle, search right half
6. Repeat until found or search space is empty`,

    realWorldExample: `**Real-world applications:**
- Dictionary lookup
- Phone book search
- Finding a page in a book
- Database indexing
- Version control systems`,

    pseudocode: `function binarySearch(array, target):
    low = 0
    high = array.length - 1
    
    while low <= high:
        mid = (low + high) / 2
        
        if array[mid] == target:
            return mid
        else if target < array[mid]:
            high = mid - 1
        else:
            low = mid + 1
    
    return -1`,

    implementations: {
        javascript: `function binarySearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (target < arr[mid]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    
    return -1;
}

// Example usage
const array = [10, 20, 30, 40, 50];
const target = 30;
const result = binarySearch(array, target);
console.log(result); // Output: 2`,

        python: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        
        if arr[mid] == target:
            return mid
        elif target < arr[mid]:
            high = mid - 1
        else:
            low = mid + 1
    
    return -1

# Example usage
array = [10, 20, 30, 40, 50]
target = 30
result = binary_search(array, target)
print(result)  # Output: 2`,

        java: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;
        
        while (low <= high) {
            int mid = (low + high) / 2;
            
            if (arr[mid] == target) {
                return mid;
            } else if (target < arr[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        
        return -1;
    }
    
    public static void main(String[] args) {
        int[] array = {10, 20, 30, 40, 50};
        int target = 30;
        int result = binarySearch(array, target);
        System.out.println(result); // Output: 2
    }
}`,

        cpp: `#include <iostream>
using namespace std;

int binarySearch(int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;
    
    while (low <= high) {
        int mid = (low + high) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (target < arr[mid]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    
    return -1;
}

int main() {
    int array[] = {10, 20, 30, 40, 50};
    int n = sizeof(array) / sizeof(array[0]);
    int target = 30;
    int result = binarySearch(array, n, target);
    cout << result << endl; // Output: 2
    return 0;
}`
    },

    timeComplexity: {
        best: 'O(1) - Element at middle',
        average: 'O(log n) - Typical case',
        worst: 'O(log n) - Element at end or not present'
    },

    spaceComplexity: 'O(1) - Iterative version, O(log n) - Recursive version',

    visualizationType: 'array',
    defaultInput: [10, 20, 30, 40, 50],

    prerequisites: ['Sorted Arrays', 'Divide and Conquer'],

    applications: [
        'Searching in sorted databases',
        'Dictionary implementations',
        'Finding insertion points',
        'Range queries'
    ],

    relatedAlgorithms: ['Linear Search', 'Ternary Search', 'Exponential Search'],

    tags: ['searching', 'divide-and-conquer', 'sorted-array', 'O(log n)']
};

// Export all searching algorithms
export const searchingAlgorithms = [
    linearSearchData,
    binarySearchData
];
