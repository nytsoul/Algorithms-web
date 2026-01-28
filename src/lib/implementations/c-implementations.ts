/**
 * C Algorithm Implementations
 * Comprehensive collection of all algorithm implementations in C
 */

export interface CImplementation {
  algorithm: string;
  code: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export const C_IMPLEMENTATIONS: Record<string, CImplementation> = {
  "linear-search": {
    algorithm: "Linear Search",
    code: `#include <stdio.h>
#include <stdlib.h>

/**
 * Perform linear search to find target in array.
 * 
 * @param arr Array to search in
 * @param n Size of the array
 * @param target Element to find
 * @return Index of target if found, -1 otherwise
 */
int linear_search(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}

/**
 * Generic linear search using void pointers and comparison function.
 */
int linear_search_generic(void* arr, int n, int element_size, 
                         void* target, int (*compare)(const void*, const void*)) {
    char* byte_arr = (char*)arr;
    
    for (int i = 0; i < n; i++) {
        if (compare(byte_arr + i * element_size, target) == 0) {
            return i;
        }
    }
    return -1;
}

/**
 * Comparison function for integers.
 */
int compare_int(const void* a, const void* b) {
    int val_a = *(const int*)a;
    int val_b = *(const int*)b;
    
    if (val_a < val_b) return -1;
    if (val_a > val_b) return 1;
    return 0;
}

/**
 * Print array utility function.
 */
void print_array(int arr[], int n) {
    printf("[");
    for (int i = 0; i < n; i++) {
        printf("%d", arr[i]);
        if (i < n - 1) printf(", ");
    }
    printf("]\\n");
}

int main() {
    int numbers[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(numbers) / sizeof(numbers[0]);
    int target = 22;
    
    printf("Array: ");
    print_array(numbers, n);
    
    int result = linear_search(numbers, n, target);
    
    if (result != -1) {
        printf("Element %d found at index %d\\n", target, result);
    } else {
        printf("Element %d not found\\n", target);
    }
    
    // Generic search example
    target = 11;
    int generic_result = linear_search_generic(numbers, n, sizeof(int), 
                                               &target, compare_int);
    printf("Generic search for %d: index %d\\n", target, generic_result);
    
    return 0;
}`,
    explanation: "Linear search sequentially checks each element until the target is found or the array ends.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)"
  },

  "binary-search": {
    algorithm: "Binary Search",
    code: `#include <stdio.h>
#include <stdlib.h>

/**
 * Iterative binary search implementation.
 * 
 * @param arr Sorted array to search in
 * @param n Size of the array
 * @param target Element to find
 * @return Index of target if found, -1 otherwise
 */
int binary_search(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2; // Prevent overflow
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

/**
 * Recursive binary search implementation.
 */
int binary_search_recursive(int arr[], int left, int right, int target) {
    if (left > right) {
        return -1;
    }
    
    int mid = left + (right - left) / 2;
    
    if (arr[mid] == target) {
        return mid;
    } else if (arr[mid] < target) {
        return binary_search_recursive(arr, mid + 1, right, target);
    } else {
        return binary_search_recursive(arr, left, mid - 1, target);
    }
}

/**
 * Generic binary search using comparison function.
 */
int binary_search_generic(void* arr, int n, int element_size, 
                         void* target, int (*compare)(const void*, const void*)) {
    char* byte_arr = (char*)arr;
    int left = 0;
    int right = n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        void* mid_element = byte_arr + mid * element_size;
        
        int cmp = compare(mid_element, target);
        
        if (cmp == 0) {
            return mid;
        } else if (cmp < 0) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

/**
 * Comparison function for integers.
 */
int compare_int(const void* a, const void* b) {
    int val_a = *(const int*)a;
    int val_b = *(const int*)b;
    
    if (val_a < val_b) return -1;
    if (val_a > val_b) return 1;
    return 0;
}

/**
 * Print array utility function.
 */
void print_array(int arr[], int n) {
    printf("[");
    for (int i = 0; i < n; i++) {
        printf("%d", arr[i]);
        if (i < n - 1) printf(", ");
    }
    printf("]\\n");
}

int main() {
    int numbers[] = {11, 12, 22, 25, 34, 64, 90}; // Must be sorted
    int n = sizeof(numbers) / sizeof(numbers[0]);
    int target = 25;
    
    printf("Sorted array: ");
    print_array(numbers, n);
    
    int result = binary_search(numbers, n, target);
    printf("Iterative: Element %d found at index %d\\n", target, result);
    
    int result_rec = binary_search_recursive(numbers, 0, n - 1, target);
    printf("Recursive: Element %d found at index %d\\n", target, result_rec);
    
    // Generic search example
    int generic_result = binary_search_generic(numbers, n, sizeof(int), 
                                               &target, compare_int);
    printf("Generic search: Element %d found at index %d\\n", target, generic_result);
    
    return 0;
}`,
    explanation: "Binary search efficiently finds elements in sorted arrays by repeatedly dividing the search space.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1) iterative, O(log n) recursive"
  },

  "bubble-sort": {
    algorithm: "Bubble Sort",
    code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

/**
 * Sort array using bubble sort algorithm.
 * 
 * @param arr Array to be sorted
 * @param n Size of the array
 */
void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        
        // Last i elements are already sorted
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1]
                swap(&arr[j], &arr[j + 1]);
                swapped = true;
            }
        }
        
        // If no swapping occurred, array is sorted
        if (!swapped) {
            break;
        }
    }
}

/**
 * Generic bubble sort using comparison function.
 */
void bubble_sort_generic(void* arr, int n, int element_size, 
                        int (*compare)(const void*, const void*)) {
    char* byte_arr = (char*)arr;
    char* temp = malloc(element_size);
    
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        
        for (int j = 0; j < n - i - 1; j++) {
            void* elem_j = byte_arr + j * element_size;
            void* elem_j_plus_1 = byte_arr + (j + 1) * element_size;
            
            if (compare(elem_j, elem_j_plus_1) > 0) {
                // Swap elements
                memcpy(temp, elem_j, element_size);
                memcpy(elem_j, elem_j_plus_1, element_size);
                memcpy(elem_j_plus_1, temp, element_size);
                swapped = true;
            }
        }
        
        if (!swapped) {
            break;
        }
    }
    
    free(temp);
}

/**
 * Utility function to swap two integers.
 */
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

/**
 * Comparison function for integers.
 */
int compare_int(const void* a, const void* b) {
    int val_a = *(const int*)a;
    int val_b = *(const int*)b;
    
    if (val_a < val_b) return -1;
    if (val_a > val_b) return 1;
    return 0;
}

/**
 * Print array utility function.
 */
void print_array(int arr[], int n) {
    printf("[");
    for (int i = 0; i < n; i++) {
        printf("%d", arr[i]);
        if (i < n - 1) printf(", ");
    }
    printf("]\\n");
}

/**
 * Create a copy of array for demonstration.
 */
void copy_array(int source[], int dest[], int n) {
    for (int i = 0; i < n; i++) {
        dest[i] = source[i];
    }
}

int main() {
    int original[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(original) / sizeof(original[0]);
    
    // Create copies for different sorting methods
    int numbers1[n], numbers2[n];
    copy_array(original, numbers1, n);
    copy_array(original, numbers2, n);
    
    printf("Original array: ");
    print_array(original, n);
    
    // Standard bubble sort
    bubble_sort(numbers1, n);
    printf("Standard bubble sort: ");
    print_array(numbers1, n);
    
    // Generic bubble sort
    bubble_sort_generic(numbers2, n, sizeof(int), compare_int);
    printf("Generic bubble sort: ");
    print_array(numbers2, n);
    
    return 0;
}`,
    explanation: "Bubble sort repeatedly steps through the list, compares adjacent elements and swaps them if in wrong order.",
    timeComplexity: "O(n²) worst/average, O(n) best",
    spaceComplexity: "O(1)"
  },

  "quick-sort": {
    algorithm: "Quick Sort",
    code: `#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

/**
 * Sort array using quick sort algorithm.
 * 
 * @param arr Array to be sorted
 * @param n Size of the array
 */
void quick_sort(int arr[], int n) {
    if (n > 0) {
        quick_sort_helper(arr, 0, n - 1);
    }
}

/**
 * Recursive quick sort helper function.
 */
void quick_sort_helper(int arr[], int low, int high) {
    if (low < high) {
        // Partition the array and get pivot index
        int pivot_index = partition(arr, low, high);
        
        // Recursively sort elements before and after partition
        quick_sort_helper(arr, low, pivot_index - 1);
        quick_sort_helper(arr, pivot_index + 1, high);
    }
}

/**
 * Partition function using Lomuto partition scheme.
 */
int partition(int arr[], int low, int high) {
    // Choose rightmost element as pivot
    int pivot = arr[high];
    
    // Index of smaller element
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    
    // Place pivot in correct position
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

/**
 * Randomized quick sort for better average performance.
 */
void quick_sort_randomized(int arr[], int n) {
    srand(time(NULL)); // Initialize random seed
    if (n > 0) {
        quick_sort_randomized_helper(arr, 0, n - 1);
    }
}

void quick_sort_randomized_helper(int arr[], int low, int high) {
    if (low < high) {
        // Randomize pivot selection
        randomize_pivot(arr, low, high);
        
        int pivot_index = partition(arr, low, high);
        
        quick_sort_randomized_helper(arr, low, pivot_index - 1);
        quick_sort_randomized_helper(arr, pivot_index + 1, high);
    }
}

/**
 * Randomize pivot selection to avoid worst-case scenarios.
 */
void randomize_pivot(int arr[], int low, int high) {
    int random_index = low + rand() % (high - low + 1);
    swap(&arr[random_index], &arr[high]);
}

/**
 * Generic quick sort using comparison function.
 */
void quick_sort_generic(void* arr, int n, int element_size, 
                       int (*compare)(const void*, const void*)) {
    if (n > 0) {
        quick_sort_generic_helper(arr, 0, n - 1, element_size, compare);
    }
}

void quick_sort_generic_helper(void* arr, int low, int high, int element_size,
                              int (*compare)(const void*, const void*)) {
    if (low < high) {
        int pivot_index = partition_generic(arr, low, high, element_size, compare);
        
        quick_sort_generic_helper(arr, low, pivot_index - 1, element_size, compare);
        quick_sort_generic_helper(arr, pivot_index + 1, high, element_size, compare);
    }
}

int partition_generic(void* arr, int low, int high, int element_size,
                     int (*compare)(const void*, const void*)) {
    char* byte_arr = (char*)arr;
    void* pivot = byte_arr + high * element_size;
    
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        void* current = byte_arr + j * element_size;
        
        if (compare(current, pivot) <= 0) {
            i++;
            swap_generic(byte_arr + i * element_size, 
                        byte_arr + j * element_size, element_size);
        }
    }
    
    swap_generic(byte_arr + (i + 1) * element_size, 
                byte_arr + high * element_size, element_size);
    return i + 1;
}

/**
 * Utility function to swap two integers.
 */
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

/**
 * Generic swap function.
 */
void swap_generic(void* a, void* b, int element_size) {
    char* temp = malloc(element_size);
    memcpy(temp, a, element_size);
    memcpy(a, b, element_size);
    memcpy(b, temp, element_size);
    free(temp);
}

/**
 * Comparison function for integers.
 */
int compare_int(const void* a, const void* b) {
    int val_a = *(const int*)a;
    int val_b = *(const int*)b;
    
    if (val_a < val_b) return -1;
    if (val_a > val_b) return 1;
    return 0;
}

/**
 * Print array utility function.
 */
void print_array(int arr[], int n) {
    printf("[");
    for (int i = 0; i < n; i++) {
        printf("%d", arr[i]);
        if (i < n - 1) printf(", ");
    }
    printf("]\\n");
}

/**
 * Create a copy of array.
 */
void copy_array(int source[], int dest[], int n) {
    for (int i = 0; i < n; i++) {
        dest[i] = source[i];
    }
}

int main() {
    int original[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(original) / sizeof(original[0]);
    
    // Create copies for different sorting methods
    int numbers1[n], numbers2[n], numbers3[n];
    copy_array(original, numbers1, n);
    copy_array(original, numbers2, n);
    copy_array(original, numbers3, n);
    
    printf("Original array: ");
    print_array(original, n);
    
    // Standard quick sort
    quick_sort(numbers1, n);
    printf("Quick sort: ");
    print_array(numbers1, n);
    
    // Randomized quick sort
    quick_sort_randomized(numbers2, n);
    printf("Randomized quick sort: ");
    print_array(numbers2, n);
    
    // Generic quick sort
    quick_sort_generic(numbers3, n, sizeof(int), compare_int);
    printf("Generic quick sort: ");
    print_array(numbers3, n);
    
    return 0;
}`,
    explanation: "Quick sort uses divide-and-conquer by selecting a pivot and partitioning the array around it.",
    timeComplexity: "O(n log n) average, O(n²) worst",
    spaceComplexity: "O(log n) average, O(n) worst"
  },

  "merge-sort": {
    algorithm: "Merge Sort",
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/**
 * Merge two subarrays.
 * First subarray is arr[left..mid]
 * Second subarray is arr[mid+1..right]
 */
void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    // Create temp arrays
    int* leftArr = (int*)malloc(n1 * sizeof(int));
    int* rightArr = (int*)malloc(n2 * sizeof(int));
    
    // Copy data to temp arrays
    for (int i = 0; i < n1; i++) {
        leftArr[i] = arr[left + i];
    }
    for (int j = 0; j < n2; j++) {
        rightArr[j] = arr[mid + 1 + j];
    }
    
    // Merge the temp arrays back
    int i = 0, j = 0;
    int k = left;
    
    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }
    
    // Copy remaining elements
    while (i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
    
    free(leftArr);
    free(rightArr);
}

/**
 * Recursive merge sort implementation.
 */
void merge_sort_helper(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        // Sort first and second halves
        merge_sort_helper(arr, left, mid);
        merge_sort_helper(arr, mid + 1, right);
        
        // Merge the sorted halves
        merge(arr, left, mid, right);
    }
}

/**
 * Sort array using merge sort algorithm.
 * 
 * @param arr Array to be sorted
 * @param n Size of the array
 */
void merge_sort(int arr[], int n) {
    merge_sort_helper(arr, 0, n - 1);
}

/**
 * Generic merge sort using comparison function.
 */
void merge_generic(void* arr, int left, int mid, int right, 
                   int element_size, int (*compare)(const void*, const void*)) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    char* byte_arr = (char*)arr;
    char* leftArr = (char*)malloc(n1 * element_size);
    char* rightArr = (char*)malloc(n2 * element_size);
    
    memcpy(leftArr, byte_arr + left * element_size, n1 * element_size);
    memcpy(rightArr, byte_arr + (mid + 1) * element_size, n2 * element_size);
    
    int i = 0, j = 0;
    int k = left;
    
    while (i < n1 && j < n2) {
        if (compare(leftArr + i * element_size, rightArr + j * element_size) <= 0) {
            memcpy(byte_arr + k * element_size, leftArr + i * element_size, element_size);
            i++;
        } else {
            memcpy(byte_arr + k * element_size, rightArr + j * element_size, element_size);
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        memcpy(byte_arr + k * element_size, leftArr + i * element_size, element_size);
        i++;
        k++;
    }
    
    while (j < n2) {
        memcpy(byte_arr + k * element_size, rightArr + j * element_size, element_size);
        j++;
        k++;
    }
    
    free(leftArr);
    free(rightArr);
}

void merge_sort_generic_helper(void* arr, int left, int right, 
                               int element_size, int (*compare)(const void*, const void*)) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        merge_sort_generic_helper(arr, left, mid, element_size, compare);
        merge_sort_generic_helper(arr, mid + 1, right, element_size, compare);
        merge_generic(arr, left, mid, right, element_size, compare);
    }
}

void merge_sort_generic(void* arr, int n, int element_size, 
                       int (*compare)(const void*, const void*)) {
    merge_sort_generic_helper(arr, 0, n - 1, element_size, compare);
}

/**
 * Comparison function for integers.
 */
int compare_int(const void* a, const void* b) {
    int val_a = *(const int*)a;
    int val_b = *(const int*)b;
    
    if (val_a < val_b) return -1;
    if (val_a > val_b) return 1;
    return 0;
}

/**
 * Print array utility function.
 */
void print_array(int arr[], int n) {
    printf("[");
    for (int i = 0; i < n; i++) {
        printf("%d", arr[i]);
        if (i < n - 1) printf(", ");
    }
    printf("]\\n");
}

/**
 * Copy array utility function.
 */
void copy_array(int source[], int dest[], int n) {
    for (int i = 0; i < n; i++) {
        dest[i] = source[i];
    }
}

int main() {
    int original[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(original) / sizeof(original[0]);
    
    int numbers[n];
    copy_array(original, numbers, n);
    
    printf("Original: ");
    print_array(original, n);
    
    merge_sort(numbers, n);
    printf("Merge Sort: ");
    print_array(numbers, n);
    
    // Test generic merge sort
    int numbers2[n];
    copy_array(original, numbers2, n);
    merge_sort_generic(numbers2, n, sizeof(int), compare_int);
    printf("Generic Merge Sort: ");
    print_array(numbers2, n);
    
    return 0;
}`,
    explanation: "Merge sort divides the array into halves, recursively sorts them, then merges the sorted halves.",
    timeComplexity: "O(n log n) in all cases",
    spaceComplexity: "O(n)"
  },

  "dijkstra": {
    algorithm: "Dijkstra's Algorithm",
    code: `#include <stdio.h>
#include <stdlib.h>
#include <limits.h>
#include <stdbool.h>

#define MAX_VERTICES 100
#define INFINITY INT_MAX

/**
 * Graph structure using adjacency matrix.
 */
typedef struct {
    int vertices;
    int adjacency_matrix[MAX_VERTICES][MAX_VERTICES];
} Graph;

/**
 * Priority queue node for Dijkstra's algorithm.
 */
typedef struct {
    int vertex;
    int distance;
} PQNode;

/**
 * Simple priority queue implementation.
 */
typedef struct {
    PQNode nodes[MAX_VERTICES];
    int size;
} PriorityQueue;

/**
 * Initialize graph with given number of vertices.
 */
void init_graph(Graph* graph, int vertices) {
    graph->vertices = vertices;
    
    // Initialize all weights to infinity (no edge)
    for (int i = 0; i < vertices; i++) {
        for (int j = 0; j < vertices; j++) {
            if (i == j) {
                graph->adjacency_matrix[i][j] = 0; // Distance to self is 0
            } else {
                graph->adjacency_matrix[i][j] = INFINITY;
            }
        }
    }
}

/**
 * Add weighted edge to graph.
 */
void add_edge(Graph* graph, int source, int destination, int weight) {
    if (source < graph->vertices && destination < graph->vertices) {
        graph->adjacency_matrix[source][destination] = weight;
    }
}

/**
 * Initialize priority queue.
 */
void init_pq(PriorityQueue* pq) {
    pq->size = 0;
}

/**
 * Insert node into priority queue.
 */
void pq_insert(PriorityQueue* pq, int vertex, int distance) {
    if (pq->size >= MAX_VERTICES) return;
    
    pq->nodes[pq->size].vertex = vertex;
    pq->nodes[pq->size].distance = distance;
    pq->size++;
    
    // Simple bubble up for min-heap property
    int index = pq->size - 1;
    while (index > 0) {
        int parent = (index - 1) / 2;
        if (pq->nodes[parent].distance <= pq->nodes[index].distance) {
            break;
        }
        
        // Swap with parent
        PQNode temp = pq->nodes[parent];
        pq->nodes[parent] = pq->nodes[index];
        pq->nodes[index] = temp;
        
        index = parent;
    }
}

/**
 * Extract minimum node from priority queue.
 */
PQNode pq_extract_min(PriorityQueue* pq) {
    PQNode result = {-1, INFINITY};
    
    if (pq->size == 0) {
        return result;
    }
    
    result = pq->nodes[0];
    pq->nodes[0] = pq->nodes[pq->size - 1];
    pq->size--;
    
    // Heapify down
    int index = 0;
    while (true) {
        int left = 2 * index + 1;
        int right = 2 * index + 2;
        int smallest = index;
        
        if (left < pq->size && 
            pq->nodes[left].distance < pq->nodes[smallest].distance) {
            smallest = left;
        }
        
        if (right < pq->size && 
            pq->nodes[right].distance < pq->nodes[smallest].distance) {
            smallest = right;
        }
        
        if (smallest == index) {
            break;
        }
        
        // Swap with smallest child
        PQNode temp = pq->nodes[index];
        pq->nodes[index] = pq->nodes[smallest];
        pq->nodes[smallest] = temp;
        
        index = smallest;
    }
    
    return result;
}

/**
 * Check if priority queue is empty.
 */
bool pq_is_empty(PriorityQueue* pq) {
    return pq->size == 0;
}

/**
 * Find shortest paths from source to all vertices using Dijkstra's algorithm.
 */
void dijkstra(Graph* graph, int source, int distances[], int previous[]) {
    int vertices = graph->vertices;
    bool visited[MAX_VERTICES] = {false};
    
    // Initialize distances and previous vertices
    for (int i = 0; i < vertices; i++) {
        distances[i] = INFINITY;
        previous[i] = -1;
    }
    distances[source] = 0;
    
    // Priority queue to store vertices with their distances
    PriorityQueue pq;
    init_pq(&pq);
    pq_insert(&pq, source, 0);
    
    while (!pq_is_empty(&pq)) {
        PQNode current = pq_extract_min(&pq);
        int current_vertex = current.vertex;
        
        // Skip if already visited
        if (visited[current_vertex]) {
            continue;
        }
        
        visited[current_vertex] = true;
        
        // Check all neighbors
        for (int neighbor = 0; neighbor < vertices; neighbor++) {
            int weight = graph->adjacency_matrix[current_vertex][neighbor];
            
            if (weight != INFINITY && !visited[neighbor]) {
                int new_distance = distances[current_vertex] + weight;
                
                // If found shorter path, update
                if (new_distance < distances[neighbor]) {
                    distances[neighbor] = new_distance;
                    previous[neighbor] = current_vertex;
                    pq_insert(&pq, neighbor, new_distance);
                }
            }
        }
    }
}

/**
 * Print shortest path from source to destination.
 */
void print_path(int previous[], int source, int destination) {
    if (destination == source) {
        printf("%d", source);
        return;
    }
    
    if (previous[destination] == -1) {
        printf("No path exists");
        return;
    }
    
    print_path(previous, source, previous[destination]);
    printf(" -> %d", destination);
}

/**
 * Print all shortest distances from source.
 */
void print_distances(int distances[], int previous[], int vertices, int source) {
    printf("Shortest distances from vertex %d:\\n", source);
    printf("Destination\\tDistance\\tPath\\n");
    
    for (int i = 0; i < vertices; i++) {
        printf("%d\\t\\t", i);
        
        if (distances[i] == INFINITY) {
            printf("INF\\t\\tNo path\\n");
        } else {
            printf("%d\\t\\t", distances[i]);
            print_path(previous, source, i);
            printf("\\n");
        }
    }
}

int main() {
    Graph graph;
    init_graph(&graph, 5);
    
    // Add edges (source, destination, weight)
    add_edge(&graph, 0, 1, 4);
    add_edge(&graph, 0, 2, 2);
    add_edge(&graph, 1, 2, 1);
    add_edge(&graph, 1, 3, 5);
    add_edge(&graph, 2, 3, 8);
    add_edge(&graph, 2, 4, 10);
    add_edge(&graph, 3, 4, 2);
    
    int source = 0;
    int distances[MAX_VERTICES];
    int previous[MAX_VERTICES];
    
    dijkstra(&graph, source, distances, previous);
    print_distances(distances, previous, graph.vertices, source);
    
    return 0;
}`,
    explanation: "Dijkstra's algorithm finds shortest paths from a source vertex to all other vertices in a weighted graph.",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)"
  },

  "insertion-sort": {
    algorithm: "Insertion Sort",
    code: `#include <stdio.h>
#include <stdlib.h>

/**
 * Sort array using insertion sort algorithm.
 * 
 * @param arr Array to be sorted
 * @param n Size of the array
 */
void insertion_sort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = key;
    }
}

/**
 * Generic insertion sort using void pointers and comparison function.
 */
void insertion_sort_generic(void* arr, int n, int element_size,
                           int (*compare)(const void*, const void*)) {
    char* byte_arr = (char*)arr;
    char* temp = (char*)malloc(element_size);
    
    if (!temp) return; // Memory allocation failed
    
    for (int i = 1; i < n; i++) {
        // Copy element to temp
        memcpy(temp, byte_arr + i * element_size, element_size);
        
        int j = i - 1;
        
        while (j >= 0 && compare(byte_arr + j * element_size, temp) > 0) {
            // Move element one position ahead
            memcpy(byte_arr + (j + 1) * element_size, 
                   byte_arr + j * element_size, element_size);
            j--;
        }
        
        // Place temp in correct position
        memcpy(byte_arr + (j + 1) * element_size, temp, element_size);
    }
    
    free(temp);
}

/**
 * Print array utility function.
 */
void print_array(int arr[], int n, const char* label) {
    printf("%s: ", label);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

/**
 * Integer comparison function for generic sorting.
 */
int int_compare(const void* a, const void* b) {
    int int_a = *(const int*)a;
    int int_b = *(const int*)b;
    return (int_a > int_b) - (int_a < int_b);
}

int main() {
    int numbers[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(numbers) / sizeof(numbers[0]);
    
    print_array(numbers, n, "Original");
    
    insertion_sort(numbers, n);
    print_array(numbers, n, "Sorted");
    
    // Generic example
    int numbers2[] = {90, 11, 22, 12, 25, 34, 64};
    printf("\nGeneric insertion sort:\n");
    print_array(numbers2, n, "Before");
    
    insertion_sort_generic(numbers2, n, sizeof(int), int_compare);
    print_array(numbers2, n, "After");
    
    return 0;
}`,
    explanation: "Insertion sort builds the final sorted array one item at a time by inserting each element into its proper position.",
    timeComplexity: "O(n²) worst/average, O(n) best",
    spaceComplexity: "O(1)"
  },

  "selection-sort": {
    algorithm: "Selection Sort",
    code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/**
 * Sort array using selection sort algorithm.
 * 
 * @param arr Array to be sorted
 * @param n Size of the array
 */
void selection_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_index = i;
        
        // Find minimum element in remaining unsorted array
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_index]) {
                min_index = j;
            }
        }
        
        // Swap found minimum element with first element
        if (min_index != i) {
            int temp = arr[i];
            arr[i] = arr[min_index];
            arr[min_index] = temp;
        }
    }
}

/**
 * Generic selection sort using void pointers.
 */
void selection_sort_generic(void* arr, int n, int element_size,
                           int (*compare)(const void*, const void*)) {
    char* byte_arr = (char*)arr;
    char* temp = (char*)malloc(element_size);
    
    if (!temp) return;
    
    for (int i = 0; i < n - 1; i++) {
        int selected_index = i;
        
        for (int j = i + 1; j < n; j++) {
            if (compare(byte_arr + j * element_size, 
                       byte_arr + selected_index * element_size) < 0) {
                selected_index = j;
            }
        }
        
        // Swap if needed
        if (selected_index != i) {
            memcpy(temp, byte_arr + i * element_size, element_size);
            memcpy(byte_arr + i * element_size, 
                   byte_arr + selected_index * element_size, element_size);
            memcpy(byte_arr + selected_index * element_size, temp, element_size);
        }
    }
    
    free(temp);
}

void print_array(int arr[], int n, const char* label) {
    printf("%s: ", label);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int int_compare(const void* a, const void* b) {
    int int_a = *(const int*)a;
    int int_b = *(const int*)b;
    return (int_a > int_b) - (int_a < int_b);
}

int main() {
    int numbers[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(numbers) / sizeof(numbers[0]);
    
    print_array(numbers, n, "Original");
    
    selection_sort(numbers, n);
    print_array(numbers, n, "Sorted");
    
    return 0;
}`,
    explanation: "Selection sort repeatedly selects the minimum element from the unsorted portion and places it at the beginning.",
    timeComplexity: "O(n²) in all cases",
    spaceComplexity: "O(1)"
  },

  "heap-sort": {
    algorithm: "Heap Sort",
    code: `#include <stdio.h>
#include <stdlib.h>

/**
 * Heapify a subtree rooted with node i.
 * 
 * @param arr Array to heapify
 * @param n Size of heap
 * @param i Root index of subtree
 */
void heapify(int arr[], int n, int i) {
    int largest = i;     // Initialize largest as root
    int left = 2 * i + 1;  // left child
    int right = 2 * i + 2; // right child
    
    // If left child exists and is greater than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    // If right child exists and is greater than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    // If largest is not root
    if (largest != i) {
        // Swap
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        
        // Recursively heapify the affected subtree
        heapify(arr, n, largest);
    }
}

/**
 * Sort array using heap sort algorithm.
 * 
 * @param arr Array to be sorted
 * @param n Size of the array
 */
void heap_sort(int arr[], int n) {
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        
        // Call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
}

/**
 * Generic heapify function.
 */
void heapify_generic(void* arr, int n, int i, int element_size,
                    int (*compare)(const void*, const void*)) {
    char* byte_arr = (char*)arr;
    char* temp = (char*)malloc(element_size);
    
    if (!temp) return;
    
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && compare(byte_arr + left * element_size,
                           byte_arr + largest * element_size) > 0) {
        largest = left;
    }
    
    if (right < n && compare(byte_arr + right * element_size,
                            byte_arr + largest * element_size) > 0) {
        largest = right;
    }
    
    if (largest != i) {
        // Swap
        memcpy(temp, byte_arr + i * element_size, element_size);
        memcpy(byte_arr + i * element_size, 
               byte_arr + largest * element_size, element_size);
        memcpy(byte_arr + largest * element_size, temp, element_size);
        
        heapify_generic(arr, n, largest, element_size, compare);
    }
    
    free(temp);
}

void print_array(int arr[], int n, const char* label) {
    printf("%s: ", label);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int numbers[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(numbers) / sizeof(numbers[0]);
    
    print_array(numbers, n, "Original");
    
    heap_sort(numbers, n);
    print_array(numbers, n, "Sorted");
    
    return 0;
}`,
    explanation: "Heap sort uses a binary heap data structure to sort elements. It builds a max heap then repeatedly extracts the maximum.",
    timeComplexity: "O(n log n) in all cases",
    spaceComplexity: "O(1)"
  },

  "bfs": {
    algorithm: "Breadth-First Search (BFS)",
    code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

#define MAX_VERTICES 100
#define MAX_QUEUE_SIZE 1000

// Queue structure for BFS
typedef struct {
    int items[MAX_QUEUE_SIZE];
    int front;
    int rear;
} Queue;

// Graph structure using adjacency list
typedef struct {
    int vertices;
    int adj_matrix[MAX_VERTICES][MAX_VERTICES];
} Graph;

/**
 * Initialize queue.
 */
void init_queue(Queue* q) {
    q->front = -1;
    q->rear = -1;
}

/**
 * Check if queue is empty.
 */
bool is_empty(Queue* q) {
    return q->front == -1;
}

/**
 * Enqueue operation.
 */
void enqueue(Queue* q, int item) {
    if (q->front == -1) {
        q->front = 0;
    }
    q->rear++;
    q->items[q->rear] = item;
}

/**
 * Dequeue operation.
 */
int dequeue(Queue* q) {
    int item = q->items[q->front];
    q->front++;
    if (q->front > q->rear) {
        q->front = q->rear = -1;
    }
    return item;
}

/**
 * Initialize graph.
 */
void init_graph(Graph* g, int vertices) {
    g->vertices = vertices;
    
    // Initialize adjacency matrix with zeros
    for (int i = 0; i < vertices; i++) {
        for (int j = 0; j < vertices; j++) {
            g->adj_matrix[i][j] = 0;
        }
    }
}

/**
 * Add edge to graph.
 */
void add_edge(Graph* g, int source, int dest) {
    g->adj_matrix[source][dest] = 1;
    g->adj_matrix[dest][source] = 1; // For undirected graph
}

/**
 * Breadth-First Search traversal.
 * 
 * @param g Graph structure
 * @param start_vertex Starting vertex for BFS
 */
void bfs(Graph* g, int start_vertex) {
    bool visited[MAX_VERTICES] = {false};
    Queue q;
    init_queue(&q);
    
    visited[start_vertex] = true;
    enqueue(&q, start_vertex);
    
    printf("BFS Traversal starting from vertex %d: ", start_vertex);
    
    while (!is_empty(&q)) {
        int current_vertex = dequeue(&q);
        printf("%d ", current_vertex);
        
        // Check all adjacent vertices
        for (int i = 0; i < g->vertices; i++) {
            if (g->adj_matrix[current_vertex][i] == 1 && !visited[i]) {
                visited[i] = true;
                enqueue(&q, i);
            }
        }
    }
    
    printf("\n");
}

/**
 * Find shortest path between two vertices using BFS.
 */
bool shortest_path_bfs(Graph* g, int start, int end, int path[], int* path_length) {
    if (start == end) {
        path[0] = start;
        *path_length = 1;
        return true;
    }
    
    bool visited[MAX_VERTICES] = {false};
    int parent[MAX_VERTICES];
    Queue q;
    
    init_queue(&q);
    
    for (int i = 0; i < g->vertices; i++) {
        parent[i] = -1;
    }
    
    visited[start] = true;
    enqueue(&q, start);
    
    while (!is_empty(&q)) {
        int current = dequeue(&q);
        
        for (int i = 0; i < g->vertices; i++) {
            if (g->adj_matrix[current][i] == 1 && !visited[i]) {
                visited[i] = true;
                parent[i] = current;
                enqueue(&q, i);
                
                if (i == end) {
                    // Reconstruct path
                    int temp_path[MAX_VERTICES];
                    int temp_length = 0;
                    int vertex = end;
                    
                    while (vertex != -1) {
                        temp_path[temp_length++] = vertex;
                        vertex = parent[vertex];
                    }
                    
                    // Reverse path
                    *path_length = temp_length;
                    for (int j = 0; j < temp_length; j++) {
                        path[j] = temp_path[temp_length - 1 - j];
                    }
                    
                    return true;
                }
            }
        }
    }
    
    return false; // No path found
}

int main() {
    Graph graph;
    init_graph(&graph, 6);
    
    // Add edges
    add_edge(&graph, 0, 1);
    add_edge(&graph, 0, 2);
    add_edge(&graph, 1, 3);
    add_edge(&graph, 1, 4);
    add_edge(&graph, 2, 4);
    add_edge(&graph, 3, 5);
    add_edge(&graph, 4, 5);
    
    // Perform BFS
    bfs(&graph, 0);
    
    // Find shortest path
    int path[MAX_VERTICES];
    int path_length;
    
    if (shortest_path_bfs(&graph, 0, 5, path, &path_length)) {
        printf("Shortest path from 0 to 5: ");
        for (int i = 0; i < path_length; i++) {
            printf("%d", path[i]);
            if (i < path_length - 1) printf(" -> ");
        }
        printf("\n");
    } else {
        printf("No path found from 0 to 5\n");
    }
    
    return 0;
}`,
    explanation: "BFS explores all vertices at the present depth before moving to vertices at the next depth level.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)"
  },

  "dfs": {
    algorithm: "Depth-First Search (DFS)",
    code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_VERTICES 100
#define MAX_STACK_SIZE 1000

// Stack structure for iterative DFS
typedef struct {
    int items[MAX_STACK_SIZE];
    int top;
} Stack;

// Graph structure using adjacency matrix
typedef struct {
    int vertices;
    int adj_matrix[MAX_VERTICES][MAX_VERTICES];
} Graph;

/**
 * Initialize stack.
 */
void init_stack(Stack* s) {
    s->top = -1;
}

/**
 * Check if stack is empty.
 */
bool is_empty_stack(Stack* s) {
    return s->top == -1;
}

/**
 * Push operation.
 */
void push(Stack* s, int item) {
    s->items[++s->top] = item;
}

/**
 * Pop operation.
 */
int pop(Stack* s) {
    return s->items[s->top--];
}

/**
 * Initialize graph.
 */
void init_graph(Graph* g, int vertices) {
    g->vertices = vertices;
    
    for (int i = 0; i < vertices; i++) {
        for (int j = 0; j < vertices; j++) {
            g->adj_matrix[i][j] = 0;
        }
    }
}

/**
 * Add edge to graph.
 */
void add_edge(Graph* g, int source, int dest) {
    g->adj_matrix[source][dest] = 1;
    g->adj_matrix[dest][source] = 1; // For undirected graph
}

/**
 * Recursive DFS utility function.
 */
void dfs_util(Graph* g, int vertex, bool visited[]) {
    visited[vertex] = true;
    printf("%d ", vertex);
    
    // Visit all unvisited adjacent vertices
    for (int i = 0; i < g->vertices; i++) {
        if (g->adj_matrix[vertex][i] == 1 && !visited[i]) {
            dfs_util(g, i, visited);
        }
    }
}

/**
 * Depth-First Search traversal (recursive).
 * 
 * @param g Graph structure
 * @param start_vertex Starting vertex for DFS
 */
void dfs_recursive(Graph* g, int start_vertex) {
    bool visited[MAX_VERTICES] = {false};
    
    printf("DFS Recursive traversal starting from vertex %d: ", start_vertex);
    dfs_util(g, start_vertex, visited);
    printf("\n");
}

/**
 * Iterative DFS using stack.
 * 
 * @param g Graph structure
 * @param start_vertex Starting vertex for DFS
 */
void dfs_iterative(Graph* g, int start_vertex) {
    bool visited[MAX_VERTICES] = {false};
    Stack s;
    init_stack(&s);
    
    push(&s, start_vertex);
    
    printf("DFS Iterative traversal starting from vertex %d: ", start_vertex);
    
    while (!is_empty_stack(&s)) {
        int vertex = pop(&s);
        
        if (!visited[vertex]) {
            visited[vertex] = true;
            printf("%d ", vertex);
            
            // Add all unvisited adjacent vertices to stack
            for (int i = g->vertices - 1; i >= 0; i--) {
                if (g->adj_matrix[vertex][i] == 1 && !visited[i]) {
                    push(&s, i);
                }
            }
        }
    }
    
    printf("\n");
}

/**
 * Check if path exists between two vertices using DFS.
 */
bool has_path_dfs(Graph* g, int start, int end, bool visited[]) {
    if (start == end) {
        return true;
    }
    
    visited[start] = true;
    
    for (int i = 0; i < g->vertices; i++) {
        if (g->adj_matrix[start][i] == 1 && !visited[i]) {
            if (has_path_dfs(g, i, end, visited)) {
                return true;
            }
        }
    }
    
    return false;
}

/**
 * Check if graph has cycle using DFS.
 */
bool has_cycle_util(Graph* g, int vertex, bool visited[], int parent) {
    visited[vertex] = true;
    
    for (int i = 0; i < g->vertices; i++) {
        if (g->adj_matrix[vertex][i] == 1) {
            if (!visited[i]) {
                if (has_cycle_util(g, i, visited, vertex)) {
                    return true;
                }
            } else if (i != parent) {
                return true; // Back edge found
            }
        }
    }
    
    return false;
}

bool has_cycle(Graph* g) {
    bool visited[MAX_VERTICES] = {false};
    
    for (int i = 0; i < g->vertices; i++) {
        if (!visited[i]) {
            if (has_cycle_util(g, i, visited, -1)) {
                return true;
            }
        }
    }
    
    return false;
}

int main() {
    Graph graph;
    init_graph(&graph, 6);
    
    // Add edges
    add_edge(&graph, 0, 1);
    add_edge(&graph, 0, 2);
    add_edge(&graph, 1, 3);
    add_edge(&graph, 1, 4);
    add_edge(&graph, 2, 4);
    add_edge(&graph, 3, 5);
    add_edge(&graph, 4, 5);
    
    // Perform DFS
    dfs_recursive(&graph, 0);
    dfs_iterative(&graph, 0);
    
    // Check path existence
    bool visited[MAX_VERTICES] = {false};
    bool path_exists = has_path_dfs(&graph, 0, 5, visited);
    printf("Path exists from 0 to 5: %s\n", path_exists ? "true" : "false");
    
    // Check for cycles
    printf("Graph has cycle: %s\n", has_cycle(&graph) ? "true" : "false");
    
    return 0;
}`,
    explanation: "DFS explores as far as possible along each branch before backtracking.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)"
  }
};

export const getAllCImplementations = (): CImplementation[] => {
  return Object.values(C_IMPLEMENTATIONS);
};

export const getCImplementation = (algorithm: string): CImplementation | undefined => {
  return C_IMPLEMENTATIONS[algorithm];
};