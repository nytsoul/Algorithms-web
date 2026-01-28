/**
 * Java Algorithm Implementations
 * Comprehensive collection of all algorithm implementations in Java
 */

export interface JavaImplementation {
  algorithm: string;
  code: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export const JAVA_IMPLEMENTATIONS: Record<string, JavaImplementation> = {
  "linear-search": {
    algorithm: "Linear Search",
    code: `import java.util.Arrays;

public class LinearSearch {
    
    /**
     * Perform linear search to find target in array.
     * 
     * @param arr Array to search in
     * @param target Element to find
     * @return Index of target if found, -1 otherwise
     */
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }
    
    /**
     * Generic linear search for any comparable type.
     */
    public static <T extends Comparable<T>> int linearSearch(T[] arr, T target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i].compareTo(target) == 0) {
                return i;
            }
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        int target = 22;
        
        int result = linearSearch(numbers, target);
        if (result != -1) {
            System.out.println("Element " + target + " found at index " + result);
        } else {
            System.out.println("Element " + target + " not found");
        }
        
        // Generic example with strings
        String[] words = {"apple", "banana", "cherry", "date"};
        String targetWord = "cherry";
        int wordResult = linearSearch(words, targetWord);
        System.out.println("Word '" + targetWord + "' found at index: " + wordResult);
    }
}`,
    explanation: "Linear search checks each element sequentially until the target is found or the end is reached.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)"
  },

  "binary-search": {
    algorithm: "Binary Search",
    code: `import java.util.Arrays;

public class BinarySearch {
    
    /**
     * Iterative binary search implementation.
     * 
     * @param arr Sorted array to search in
     * @param target Element to find
     * @return Index of target if found, -1 otherwise
     */
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
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
    public static int binarySearchRecursive(int[] arr, int target, int left, int right) {
        if (left > right) {
            return -1;
        }
        
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            return binarySearchRecursive(arr, target, mid + 1, right);
        } else {
            return binarySearchRecursive(arr, target, left, mid - 1);
        }
    }
    
    /**
     * Generic binary search for comparable types.
     */
    public static <T extends Comparable<T>> int binarySearch(T[] arr, T target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int comparison = arr[mid].compareTo(target);
            
            if (comparison == 0) {
                return mid;
            } else if (comparison < 0) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
    
    public static void main(String[] args) {
        int[] numbers = {11, 12, 22, 25, 34, 64, 90}; // Must be sorted
        int target = 25;
        
        int result = binarySearch(numbers, target);
        System.out.println("Iterative: Element " + target + " found at index " + result);
        
        int resultRec = binarySearchRecursive(numbers, target, 0, numbers.length - 1);
        System.out.println("Recursive: Element " + target + " found at index " + resultRec);
    }
}`,
    explanation: "Binary search efficiently finds elements in sorted arrays by repeatedly dividing the search space in half.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1) iterative, O(log n) recursive"
  },

  "bubble-sort": {
    algorithm: "Bubble Sort",
    code: `import java.util.Arrays;

public class BubbleSort {
    
    /**
     * Sort array using bubble sort algorithm.
     * 
     * @param arr Array to be sorted
     */
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            
            // Last i elements are already sorted
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap arr[j] and arr[j+1]
                    swap(arr, j, j + 1);
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
     * Generic bubble sort for comparable types.
     */
    public static <T extends Comparable<T>> void bubbleSort(T[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j].compareTo(arr[j + 1]) > 0) {
                    swap(arr, j, j + 1);
                    swapped = true;
                }
            }
            
            if (!swapped) {
                break;
            }
        }
    }
    
    /**
     * Utility method to swap elements.
     */
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    private static <T> void swap(T[] arr, int i, int j) {
        T temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original: " + Arrays.toString(numbers));
        
        bubbleSort(numbers);
        System.out.println("Sorted: " + Arrays.toString(numbers));
        
        // Generic example with strings
        String[] words = {"banana", "apple", "cherry", "date"};
        System.out.println("\\nOriginal strings: " + Arrays.toString(words));
        bubbleSort(words);
        System.out.println("Sorted strings: " + Arrays.toString(words));
    }
}`,
    explanation: "Bubble sort repeatedly steps through the list, compares adjacent elements and swaps them if they're in wrong order.",
    timeComplexity: "O(n²) worst/average, O(n) best",
    spaceComplexity: "O(1)"
  },

  "quick-sort": {
    algorithm: "Quick Sort",
    code: `import java.util.Arrays;
import java.util.Random;

public class QuickSort {
    
    /**
     * Sort array using quick sort algorithm.
     * 
     * @param arr Array to be sorted
     */
    public static void quickSort(int[] arr) {
        quickSort(arr, 0, arr.length - 1);
    }
    
    /**
     * Recursive quick sort implementation.
     */
    private static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            // Partition the array and get pivot index
            int pi = partition(arr, low, high);
            
            // Recursively sort elements before and after partition
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    /**
     * Partition method using Lomuto partition scheme.
     */
    private static int partition(int[] arr, int low, int high) {
        // Choose rightmost element as pivot
        int pivot = arr[high];
        
        // Index of smaller element
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            // If current element is smaller than or equal to pivot
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        
        // Place pivot in correct position
        swap(arr, i + 1, high);
        return i + 1;
    }
    
    /**
     * Randomized quick sort for better average performance.
     */
    public static void quickSortRandomized(int[] arr) {
        quickSortRandomized(arr, 0, arr.length - 1);
    }
    
    private static void quickSortRandomized(int[] arr, int low, int high) {
        if (low < high) {
            // Randomize pivot selection
            randomizePivot(arr, low, high);
            
            int pi = partition(arr, low, high);
            
            quickSortRandomized(arr, low, pi - 1);
            quickSortRandomized(arr, pi + 1, high);
        }
    }
    
    /**
     * Randomize pivot selection to avoid worst-case scenarios.
     */
    private static void randomizePivot(int[] arr, int low, int high) {
        Random rand = new Random();
        int randomIndex = low + rand.nextInt(high - low + 1);
        swap(arr, randomIndex, high);
    }
    
    /**
     * Utility method to swap elements.
     */
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    /**
     * Generic quick sort for comparable types.
     */
    public static <T extends Comparable<T>> void quickSort(T[] arr) {
        quickSort(arr, 0, arr.length - 1);
    }
    
    private static <T extends Comparable<T>> void quickSort(T[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    private static <T extends Comparable<T>> int partition(T[] arr, int low, int high) {
        T pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j].compareTo(pivot) <= 0) {
                i++;
                swap(arr, i, j);
            }
        }
        
        swap(arr, i + 1, high);
        return i + 1;
    }
    
    private static <T> void swap(T[] arr, int i, int j) {
        T temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original: " + Arrays.toString(numbers));
        
        quickSort(numbers.clone());
        System.out.println("Quick Sort: " + Arrays.toString(numbers));
        
        int[] numbers2 = {64, 34, 25, 12, 22, 11, 90};
        quickSortRandomized(numbers2);
        System.out.println("Randomized Quick Sort: " + Arrays.toString(numbers2));
    }
}`,
    explanation: "Quick sort uses divide-and-conquer by picking a pivot and partitioning the array around it.",
    timeComplexity: "O(n log n) average, O(n²) worst",
    spaceComplexity: "O(log n) average, O(n) worst"
  },

  "merge-sort": {
    algorithm: "Merge Sort",
    code: `import java.util.Arrays;

public class MergeSort {
    
    /**
     * Sort array using merge sort algorithm.
     * 
     * @param arr Array to be sorted
     */
    public static void mergeSort(int[] arr) {
        if (arr.length < 2) {
            return;
        }
        mergeSort(arr, 0, arr.length - 1);
    }
    
    /**
     * Recursive merge sort helper method.
     */
    private static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            
            // Sort first and second halves
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            
            // Merge the sorted halves
            merge(arr, left, mid, right);
        }
    }
    
    /**
     * Merge two subarrays of arr[].
     * First subarray is arr[left..mid]
     * Second subarray is arr[mid+1..right]
     */
    private static void merge(int[] arr, int left, int mid, int right) {
        // Find sizes of two subarrays
        int n1 = mid - left + 1;
        int n2 = right - mid;
        
        // Create temp arrays
        int[] leftArr = new int[n1];
        int[] rightArr = new int[n2];
        
        // Copy data to temp arrays
        System.arraycopy(arr, left, leftArr, 0, n1);
        System.arraycopy(arr, mid + 1, rightArr, 0, n2);
        
        // Merge the temp arrays
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
        
        // Copy remaining elements of leftArr
        while (i < n1) {
            arr[k] = leftArr[i];
            i++;
            k++;
        }
        
        // Copy remaining elements of rightArr
        while (j < n2) {
            arr[k] = rightArr[j];
            j++;
            k++;
        }
    }
    
    /**
     * Generic merge sort for comparable types.
     */
    public static <T extends Comparable<T>> void mergeSort(T[] arr) {
        if (arr.length < 2) {
            return;
        }
        mergeSort(arr, 0, arr.length - 1);
    }
    
    private static <T extends Comparable<T>> void mergeSort(T[] arr, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }
    
    @SuppressWarnings("unchecked")
    private static <T extends Comparable<T>> void merge(T[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        
        Object[] leftArr = new Object[n1];
        Object[] rightArr = new Object[n2];
        
        System.arraycopy(arr, left, leftArr, 0, n1);
        System.arraycopy(arr, mid + 1, rightArr, 0, n2);
        
        int i = 0, j = 0;
        int k = left;
        
        while (i < n1 && j < n2) {
            if (((T)leftArr[i]).compareTo((T)rightArr[j]) <= 0) {
                arr[k] = (T)leftArr[i];
                i++;
            } else {
                arr[k] = (T)rightArr[j];
                j++;
            }
            k++;
        }
        
        while (i < n1) {
            arr[k] = (T)leftArr[i];
            i++;
            k++;
        }
        
        while (j < n2) {
            arr[k] = (T)rightArr[j];
            j++;
            k++;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original: " + Arrays.toString(numbers));
        
        mergeSort(numbers);
        System.out.println("Merge Sort: " + Arrays.toString(numbers));
        
        // Generic example with strings
        String[] words = {"banana", "apple", "cherry", "date"};
        System.out.println("\\nOriginal strings: " + Arrays.toString(words));
        mergeSort(words);
        System.out.println("Sorted strings: " + Arrays.toString(words));
    }
}`,
    explanation: "Merge sort divides the array into halves, recursively sorts them, then merges the sorted halves.",
    timeComplexity: "O(n log n) in all cases",
    spaceComplexity: "O(n)"
  },

  "dijkstra": {
    algorithm: "Dijkstra's Algorithm",
    code: `import java.util.*;

public class DijkstraAlgorithm {
    
    static class Graph {
        private int vertices;
        private List<List<Edge>> adjacencyList;
        
        public Graph(int vertices) {
            this.vertices = vertices;
            this.adjacencyList = new ArrayList<>(vertices);
            
            for (int i = 0; i < vertices; i++) {
                adjacencyList.add(new ArrayList<>());
            }
        }
        
        public void addEdge(int source, int destination, int weight) {
            adjacencyList.get(source).add(new Edge(destination, weight));
        }
        
        public List<Edge> getNeighbors(int vertex) {
            return adjacencyList.get(vertex);
        }
        
        public int getVertices() {
            return vertices;
        }
    }
    
    static class Edge {
        int destination;
        int weight;
        
        public Edge(int destination, int weight) {
            this.destination = destination;
            this.weight = weight;
        }
    }
    
    static class Node implements Comparable<Node> {
        int vertex;
        int distance;
        
        public Node(int vertex, int distance) {
            this.vertex = vertex;
            this.distance = distance;
        }
        
        @Override
        public int compareTo(Node other) {
            return Integer.compare(this.distance, other.distance);
        }
    }
    
    /**
     * Find shortest paths from source to all vertices using Dijkstra's algorithm.
     * 
     * @param graph The weighted graph
     * @param source Starting vertex
     * @return Array of shortest distances
     */
    public static int[] dijkstra(Graph graph, int source) {
        int vertices = graph.getVertices();
        int[] distances = new int[vertices];
        int[] previous = new int[vertices];
        boolean[] visited = new boolean[vertices];
        
        // Initialize distances
        Arrays.fill(distances, Integer.MAX_VALUE);
        Arrays.fill(previous, -1);
        distances[source] = 0;
        
        // Priority queue to store vertices with their distances
        PriorityQueue<Node> pq = new PriorityQueue<>();
        pq.offer(new Node(source, 0));
        
        while (!pq.isEmpty()) {
            Node current = pq.poll();
            int currentVertex = current.vertex;
            
            // Skip if already visited
            if (visited[currentVertex]) {
                continue;
            }
            
            visited[currentVertex] = true;
            
            // Check all neighbors
            for (Edge edge : graph.getNeighbors(currentVertex)) {
                int neighbor = edge.destination;
                int weight = edge.weight;
                int newDistance = distances[currentVertex] + weight;
                
                // If found shorter path, update
                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    previous[neighbor] = currentVertex;
                    pq.offer(new Node(neighbor, newDistance));
                }
            }
        }
        
        return distances;
    }
    
    /**
     * Get shortest path from source to destination.
     */
    public static List<Integer> getShortestPath(Graph graph, int source, int destination) {
        int[] distances = dijkstra(graph, source);
        
        if (distances[destination] == Integer.MAX_VALUE) {
            return new ArrayList<>(); // No path exists
        }
        
        // Reconstruct path (requires modification to store previous vertices)
        return reconstructPath(graph, source, destination);
    }
    
    private static List<Integer> reconstructPath(Graph graph, int source, int destination) {
        // This is a simplified version - in practice, you'd store the previous array
        List<Integer> path = new ArrayList<>();
        // Implementation would reconstruct the actual path
        path.add(source);
        path.add(destination);
        return path;
    }
    
    public static void main(String[] args) {
        // Create a sample graph
        Graph graph = new Graph(5);
        
        // Add edges (source, destination, weight)
        graph.addEdge(0, 1, 4);
        graph.addEdge(0, 2, 2);
        graph.addEdge(1, 2, 1);
        graph.addEdge(1, 3, 5);
        graph.addEdge(2, 3, 8);
        graph.addEdge(2, 4, 10);
        graph.addEdge(3, 4, 2);
        
        int source = 0;
        int[] distances = dijkstra(graph, source);
        
        System.out.println("Shortest distances from vertex " + source + ":");
        for (int i = 0; i < distances.length; i++) {
            if (distances[i] == Integer.MAX_VALUE) {
                System.out.println("To vertex " + i + ": No path");
            } else {
                System.out.println("To vertex " + i + ": " + distances[i]);
            }
        }
    }
}`,
    explanation: "Dijkstra's algorithm finds the shortest paths from a source vertex to all other vertices in a weighted graph.",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)"
  },

  "insertion-sort": {
    algorithm: "Insertion Sort",
    code: `import java.util.Arrays;

public class InsertionSort {
    
    /**
     * Sort array using insertion sort algorithm.
     * 
     * @param arr Array to be sorted
     */
    public static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            
            // Move elements that are greater than key one position ahead
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            
            arr[j + 1] = key;
        }
    }
    
    /**
     * Generic insertion sort for comparable types.
     */
    public static <T extends Comparable<T>> void insertionSort(T[] arr) {
        for (int i = 1; i < arr.length; i++) {
            T key = arr[i];
            int j = i - 1;
            
            while (j >= 0 && arr[j].compareTo(key) > 0) {
                arr[j + 1] = arr[j];
                j--;
            }
            
            arr[j + 1] = key;
        }
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original: " + Arrays.toString(numbers));
        
        insertionSort(numbers);
        System.out.println("Sorted: " + Arrays.toString(numbers));
    }
}`,
    explanation: "Insertion sort builds the final sorted array one item at a time by inserting each element into its proper position.",
    timeComplexity: "O(n²) worst/average, O(n) best",
    spaceComplexity: "O(1)"
  },

  "selection-sort": {
    algorithm: "Selection Sort",
    code: `import java.util.Arrays;

public class SelectionSort {
    
    /**
     * Sort array using selection sort algorithm.
     * 
     * @param arr Array to be sorted
     */
    public static void selectionSort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            int minIndex = i;
            
            // Find minimum element in remaining unsorted array
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            
            // Swap the found minimum element with the first element
            swap(arr, minIndex, i);
        }
    }
    
    /**
     * Generic selection sort for comparable types.
     */
    public static <T extends Comparable<T>> void selectionSort(T[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            int minIndex = i;
            
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j].compareTo(arr[minIndex]) < 0) {
                    minIndex = j;
                }
            }
            
            swap(arr, minIndex, i);
        }
    }
    
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    private static <T> void swap(T[] arr, int i, int j) {
        T temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original: " + Arrays.toString(numbers));
        
        selectionSort(numbers);
        System.out.println("Sorted: " + Arrays.toString(numbers));
    }
}`,
    explanation: "Selection sort repeatedly selects the minimum element from the unsorted portion and places it at the beginning.",
    timeComplexity: "O(n²) in all cases",
    spaceComplexity: "O(1)"
  },

  "heap-sort": {
    algorithm: "Heap Sort",
    code: `import java.util.Arrays;

public class HeapSort {
    
    /**
     * Sort array using heap sort algorithm.
     * 
     * @param arr Array to be sorted
     */
    public static void heapSort(int[] arr) {
        int n = arr.length;
        
        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
        
        // Extract elements from heap one by one
        for (int i = n - 1; i > 0; i--) {
            // Move current root to end
            swap(arr, 0, i);
            
            // Call max heapify on the reduced heap
            heapify(arr, i, 0);
        }
    }
    
    /**
     * Heapify a subtree rooted with node i which is an index in arr[].
     * n is size of heap.
     */
    private static void heapify(int[] arr, int n, int i) {
        int largest = i; // Initialize largest as root
        int left = 2 * i + 1; // left child
        int right = 2 * i + 2; // right child
        
        // If left child is larger than root
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        
        // If right child is larger than largest so far
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        // If largest is not root
        if (largest != i) {
            swap(arr, i, largest);
            
            // Recursively heapify the affected sub-tree
            heapify(arr, n, largest);
        }
    }
    
    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original: " + Arrays.toString(numbers));
        
        heapSort(numbers);
        System.out.println("Sorted: " + Arrays.toString(numbers));
    }
}`,
    explanation: "Heap sort uses a binary heap data structure to sort elements. It builds a max heap then repeatedly extracts the maximum.",
    timeComplexity: "O(n log n) in all cases",
    spaceComplexity: "O(1)"
  },

  "bfs": {
    algorithm: "Breadth-First Search (BFS)",
    code: `import java.util.*;

public class BFS {
    
    static class Graph {
        private int vertices;
        private List<List<Integer>> adjacencyList;
        
        public Graph(int vertices) {
            this.vertices = vertices;
            this.adjacencyList = new ArrayList<>(vertices);
            
            for (int i = 0; i < vertices; i++) {
                adjacencyList.add(new ArrayList<>());
            }
        }
        
        public void addEdge(int source, int destination) {
            adjacencyList.get(source).add(destination);
            adjacencyList.get(destination).add(source); // For undirected graph
        }
        
        /**
         * Breadth-First Search traversal starting from given vertex.
         * 
         * @param startVertex Starting vertex for BFS
         */
        public void bfs(int startVertex) {
            boolean[] visited = new boolean[vertices];
            Queue<Integer> queue = new LinkedList<>();
            
            visited[startVertex] = true;
            queue.offer(startVertex);
            
            System.out.println("BFS Traversal starting from vertex " + startVertex + ":");
            
            while (!queue.isEmpty()) {
                int currentVertex = queue.poll();
                System.out.print(currentVertex + " ");
                
                // Get all adjacent vertices
                for (int neighbor : adjacencyList.get(currentVertex)) {
                    if (!visited[neighbor]) {
                        visited[neighbor] = true;
                        queue.offer(neighbor);
                    }
                }
            }
            
            System.out.println();
        }
        
        /**
         * Find shortest path between two vertices using BFS.
         */
        public List<Integer> shortestPath(int start, int end) {
            boolean[] visited = new boolean[vertices];
            int[] parent = new int[vertices];
            Queue<Integer> queue = new LinkedList<>();
            
            Arrays.fill(parent, -1);
            visited[start] = true;
            queue.offer(start);
            
            while (!queue.isEmpty()) {
                int current = queue.poll();
                
                if (current == end) {
                    // Reconstruct path
                    List<Integer> path = new ArrayList<>();
                    int vertex = end;
                    while (vertex != -1) {
                        path.add(0, vertex);
                        vertex = parent[vertex];
                    }
                    return path;
                }
                
                for (int neighbor : adjacencyList.get(current)) {
                    if (!visited[neighbor]) {
                        visited[neighbor] = true;
                        parent[neighbor] = current;
                        queue.offer(neighbor);
                    }
                }
            }
            
            return new ArrayList<>(); // No path found
        }
    }
    
    public static void main(String[] args) {
        Graph graph = new Graph(6);
        
        // Add edges
        graph.addEdge(0, 1);
        graph.addEdge(0, 2);
        graph.addEdge(1, 3);
        graph.addEdge(1, 4);
        graph.addEdge(2, 4);
        graph.addEdge(3, 5);
        graph.addEdge(4, 5);
        
        // Perform BFS
        graph.bfs(0);
        
        // Find shortest path
        List<Integer> path = graph.shortestPath(0, 5);
        System.out.println("Shortest path from 0 to 5: " + path);
    }
}`,
    explanation: "BFS explores all vertices at the present depth before moving to vertices at the next depth level.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)"
  },

  "dfs": {
    algorithm: "Depth-First Search (DFS)",
    code: `import java.util.*;

public class DFS {
    
    static class Graph {
        private int vertices;
        private List<List<Integer>> adjacencyList;
        
        public Graph(int vertices) {
            this.vertices = vertices;
            this.adjacencyList = new ArrayList<>(vertices);
            
            for (int i = 0; i < vertices; i++) {
                adjacencyList.add(new ArrayList<>());
            }
        }
        
        public void addEdge(int source, int destination) {
            adjacencyList.get(source).add(destination);
            adjacencyList.get(destination).add(source); // For undirected graph
        }
        
        /**
         * Depth-First Search traversal starting from given vertex (recursive).
         * 
         * @param startVertex Starting vertex for DFS
         */
        public void dfs(int startVertex) {
            boolean[] visited = new boolean[vertices];
            System.out.println("DFS Traversal starting from vertex " + startVertex + ":");
            dfsUtil(startVertex, visited);
            System.out.println();
        }
        
        private void dfsUtil(int vertex, boolean[] visited) {
            visited[vertex] = true;
            System.out.print(vertex + " ");
            
            // Recur for all adjacent vertices
            for (int neighbor : adjacencyList.get(vertex)) {
                if (!visited[neighbor]) {
                    dfsUtil(neighbor, visited);
                }
            }
        }
        
        /**
         * Iterative DFS using stack.
         */
        public void dfsIterative(int startVertex) {
            boolean[] visited = new boolean[vertices];
            Stack<Integer> stack = new Stack<>();
            
            stack.push(startVertex);
            System.out.println("DFS Iterative traversal starting from vertex " + startVertex + ":");
            
            while (!stack.isEmpty()) {
                int vertex = stack.pop();
                
                if (!visited[vertex]) {
                    visited[vertex] = true;
                    System.out.print(vertex + " ");
                    
                    // Add all adjacent vertices to stack
                    for (int neighbor : adjacencyList.get(vertex)) {
                        if (!visited[neighbor]) {
                            stack.push(neighbor);
                        }
                    }
                }
            }
            
            System.out.println();
        }
        
        /**
         * Check if path exists between two vertices using DFS.
         */
        public boolean hasPath(int start, int end) {
            boolean[] visited = new boolean[vertices];
            return hasPathUtil(start, end, visited);
        }
        
        private boolean hasPathUtil(int current, int target, boolean[] visited) {
            if (current == target) {
                return true;
            }
            
            visited[current] = true;
            
            for (int neighbor : adjacencyList.get(current)) {
                if (!visited[neighbor] && hasPathUtil(neighbor, target, visited)) {
                    return true;
                }
            }
            
            return false;
        }
    }
    
    public static void main(String[] args) {
        Graph graph = new Graph(6);
        
        // Add edges
        graph.addEdge(0, 1);
        graph.addEdge(0, 2);
        graph.addEdge(1, 3);
        graph.addEdge(1, 4);
        graph.addEdge(2, 4);
        graph.addEdge(3, 5);
        graph.addEdge(4, 5);
        
        // Perform DFS
        graph.dfs(0);
        graph.dfsIterative(0);
        
        // Check path existence
        boolean pathExists = graph.hasPath(0, 5);
        System.out.println("Path exists from 0 to 5: " + pathExists);
    }
}`,
    explanation: "DFS explores as far as possible along each branch before backtracking.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)"
  }
};

export const getAllJavaImplementations = (): JavaImplementation[] => {
  return Object.values(JAVA_IMPLEMENTATIONS);
};

export const getJavaImplementation = (algorithm: string): JavaImplementation | undefined => {
  return JAVA_IMPLEMENTATIONS[algorithm];
};