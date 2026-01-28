/**
 * Python Algorithm Implementations
 * Comprehensive collection of all algorithm implementations in Python
 */

export interface PythonImplementation {
  algorithm: string;
  code: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export const PYTHON_IMPLEMENTATIONS: Record<string, PythonImplementation> = {
  "linear-search": {
    algorithm: "Linear Search",
    code: `def linear_search(arr, target):
    """
    Perform linear search to find target in array.
    
    Args:
        arr: List of elements to search
        target: Element to find
    
    Returns:
        int: Index of target if found, -1 otherwise
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

# Example usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    target = 22
    
    result = linear_search(numbers, target)
    if result != -1:
        print(f"Element {target} found at index {result}")
    else:
        print(f"Element {target} not found")`,
    explanation: "Linear search checks each element sequentially until the target is found or the end is reached.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)"
  },

  "binary-search": {
    algorithm: "Binary Search",
    code: `def binary_search(arr, target):
    """
    Perform binary search on sorted array.
    
    Args:
        arr: Sorted list of elements
        target: Element to find
    
    Returns:
        int: Index of target if found, -1 otherwise
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

def binary_search_recursive(arr, target, left=0, right=None):
    """
    Recursive implementation of binary search.
    """
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

# Example usage
if __name__ == "__main__":
    numbers = [11, 12, 22, 25, 34, 64, 90]  # Must be sorted
    target = 25
    
    result = binary_search(numbers, target)
    print(f"Iterative: Element {target} found at index {result}")
    
    result_rec = binary_search_recursive(numbers, target)
    print(f"Recursive: Element {target} found at index {result_rec}")`,
    explanation: "Binary search efficiently finds elements in sorted arrays by repeatedly dividing the search space in half.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1) iterative, O(log n) recursive"
  },

  "bubble-sort": {
    algorithm: "Bubble Sort",
    code: `def bubble_sort(arr):
    """
    Sort array using bubble sort algorithm.
    
    Args:
        arr: List of comparable elements
    
    Returns:
        list: Sorted array
    """
    n = len(arr)
    arr = arr.copy()  # Don't modify original
    
    for i in range(n):
        swapped = False
        
        # Last i elements are already sorted
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swapping occurred, array is sorted
        if not swapped:
            break
    
    return arr

def bubble_sort_optimized(arr):
    """
    Optimized bubble sort with early termination.
    """
    n = len(arr)
    arr = arr.copy()
    
    for i in range(n):
        swapped = False
        
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        if not swapped:
            break
    
    return arr

# Example usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original: {numbers}")
    
    sorted_numbers = bubble_sort(numbers)
    print(f"Sorted: {sorted_numbers}")`,
    explanation: "Bubble sort repeatedly steps through the list, compares adjacent elements and swaps them if they're in wrong order.",
    timeComplexity: "O(n²) worst/average, O(n) best",
    spaceComplexity: "O(1)"
  },

  "quick-sort": {
    algorithm: "Quick Sort",
    code: `def quick_sort(arr):
    """
    Sort array using quick sort algorithm.
    
    Args:
        arr: List of comparable elements
    
    Returns:
        list: Sorted array
    """
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

def quick_sort_inplace(arr, low=0, high=None):
    """
    In-place quick sort implementation.
    """
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        # Partition the array
        pi = partition(arr, low, high)
        
        # Recursively sort elements before and after partition
        quick_sort_inplace(arr, low, pi - 1)
        quick_sort_inplace(arr, pi + 1, high)

def partition(arr, low, high):
    """
    Partition function for in-place quick sort.
    """
    # Choose rightmost element as pivot
    pivot = arr[high]
    
    # Index of smaller element
    i = low - 1
    
    for j in range(low, high):
        # If current element is smaller than or equal to pivot
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    # Place pivot in correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Example usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original: {numbers}")
    
    sorted_numbers = quick_sort(numbers)
    print(f"Sorted: {sorted_numbers}")
    
    # In-place version
    numbers_copy = numbers.copy()
    quick_sort_inplace(numbers_copy)
    print(f"In-place sorted: {numbers_copy}")`,
    explanation: "Quick sort uses divide-and-conquer by picking a pivot and partitioning the array around it.",
    timeComplexity: "O(n log n) average, O(n²) worst",
    spaceComplexity: "O(log n) average, O(n) worst"
  },

  "merge-sort": {
    algorithm: "Merge Sort",
    code: `def merge_sort(arr):
    """
    Sort array using merge sort algorithm.
    
    Args:
        arr: List of comparable elements
    
    Returns:
        list: Sorted array
    """
    if len(arr) <= 1:
        return arr
    
    # Divide the array into halves
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Merge the sorted halves
    return merge(left, right)

def merge(left, right):
    """
    Merge two sorted arrays.
    """
    result = []
    i = j = 0
    
    # Compare elements and merge
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result

def merge_sort_inplace(arr, left=0, right=None):
    """
    In-place merge sort implementation.
    """
    if right is None:
        right = len(arr) - 1
    
    if left < right:
        mid = (left + right) // 2
        
        # Sort first and second halves
        merge_sort_inplace(arr, left, mid)
        merge_sort_inplace(arr, mid + 1, right)
        
        # Merge the sorted halves
        merge_inplace(arr, left, mid, right)

def merge_inplace(arr, left, mid, right):
    """
    In-place merge for merge sort.
    """
    # Create temporary arrays
    left_arr = arr[left:mid + 1]
    right_arr = arr[mid + 1:right + 1]
    
    i = j = 0
    k = left
    
    # Merge temporary arrays back into arr[left..right]
    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1
    
    # Copy remaining elements
    while i < len(left_arr):
        arr[k] = left_arr[i]
        i += 1
        k += 1
    
    while j < len(right_arr):
        arr[k] = right_arr[j]
        j += 1
        k += 1

# Example usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original: {numbers}")
    
    sorted_numbers = merge_sort(numbers)
    print(f"Sorted: {sorted_numbers}")
    
    # In-place version
    numbers_copy = numbers.copy()
    merge_sort_inplace(numbers_copy)
    print(f"In-place sorted: {numbers_copy}")`,
    explanation: "Merge sort uses divide-and-conquer by recursively splitting the array and merging sorted halves.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)"
  },

  "merge-sort": {
    algorithm: "Merge Sort",
    code: `"""
Merge Sort Algorithm Implementation in Python

Time Complexity: O(n log n) in all cases
Space Complexity: O(n) for temporary arrays
"""

from typing import List, TypeVar, Callable

T = TypeVar('T')

def merge_sort(arr: List[int]) -> List[int]:
    """
    Sort array using merge sort algorithm.
    
    Args:
        arr: List to be sorted
    
    Returns:
        Sorted list
    
    Example:
        >>> merge_sort([64, 34, 25, 12, 22, 11, 90])
        [11, 12, 22, 25, 34, 64, 90]
    """
    if len(arr) <= 1:
        return arr
    
    # Divide array into two halves
    mid = len(arr) // 2
    left_half = merge_sort(arr[:mid])
    right_half = merge_sort(arr[mid:])
    
    # Merge the sorted halves
    return merge(left_half, right_half)


def merge(left: List[int], right: List[int]) -> List[int]:
    """
    Merge two sorted lists into one sorted list.
    
    Args:
        left: First sorted list
        right: Second sorted list
    
    Returns:
        Merged sorted list
    """
    result = []
    i = j = 0
    
    # Compare elements and add smaller one to result
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    # Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result


def merge_sort_in_place(arr: List[int]) -> None:
    """
    In-place merge sort implementation.
    
    Args:
        arr: List to be sorted in place
    """
    def merge_in_place(arr: List[int], left: int, mid: int, right: int):
        # Create temporary arrays
        left_arr = arr[left:mid + 1]
        right_arr = arr[mid + 1:right + 1]
        
        i = j = 0
        k = left
        
        while i < len(left_arr) and j < len(right_arr):
            if left_arr[i] <= right_arr[j]:
                arr[k] = left_arr[i]
                i += 1
            else:
                arr[k] = right_arr[j]
                j += 1
            k += 1
        
        while i < len(left_arr):
            arr[k] = left_arr[i]
            i += 1
            k += 1
        
        while j < len(right_arr):
            arr[k] = right_arr[j]
            j += 1
            k += 1
    
    def sort_helper(arr: List[int], left: int, right: int):
        if left < right:
            mid = (left + right) // 2
            sort_helper(arr, left, mid)
            sort_helper(arr, mid + 1, right)
            merge_in_place(arr, left, mid, right)
    
    sort_helper(arr, 0, len(arr) - 1)


def merge_sort_generic(arr: List[T], key: Callable[[T], any] = lambda x: x) -> List[T]:
    """
    Generic merge sort with custom key function.
    
    Args:
        arr: List to be sorted
        key: Function to extract comparison key
    
    Returns:
        Sorted list
    """
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left_half = merge_sort_generic(arr[:mid], key)
    right_half = merge_sort_generic(arr[mid:], key)
    
    result = []
    i = j = 0
    
    while i < len(left_half) and j < len(right_half):
        if key(left_half[i]) <= key(right_half[j]):
            result.append(left_half[i])
            i += 1
        else:
            result.append(right_half[j])
            j += 1
    
    result.extend(left_half[i:])
    result.extend(right_half[j:])
    
    return result


# Example usage and testing
if __name__ == "__main__":
    # Test basic merge sort
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original: {numbers}")
    
    sorted_nums = merge_sort(numbers.copy())
    print(f"Merge Sort: {sorted_nums}")
    
    # Test in-place merge sort
    numbers_copy = numbers.copy()
    merge_sort_in_place(numbers_copy)
    print(f"In-place Merge Sort: {numbers_copy}")
    
    # Test generic merge sort with custom key
    words = ["banana", "apple", "Cherry", "date"]
    sorted_words = merge_sort_generic(words, key=str.lower)
    print(f"\\nCase-insensitive sorted: {sorted_words}")
    
    # Sorting by length
    sorted_by_len = merge_sort_generic(words, key=len)
    print(f"Sorted by length: {sorted_by_len}")`,
    explanation: "Merge sort divides the array into two halves, recursively sorts them, and then merges the sorted halves.",
    timeComplexity: "O(n log n) in all cases",
    spaceComplexity: "O(n)"
  },

  "dijkstra": {
    algorithm: "Dijkstra's Algorithm",
    code: `import heapq
from collections import defaultdict

def dijkstra(graph, start):
    """
    Find shortest paths from start to all vertices using Dijkstra's algorithm.
    
    Args:
        graph: Dictionary representing weighted graph
        start: Starting vertex
    
    Returns:
        tuple: (distances, previous_vertices)
    """
    # Initialize distances and visited set
    distances = {vertex: float('infinity') for vertex in graph}
    distances[start] = 0
    previous = {vertex: None for vertex in graph}
    
    # Priority queue to store (distance, vertex)
    pq = [(0, start)]
    visited = set()
    
    while pq:
        current_distance, current_vertex = heapq.heappop(pq)
        
        # Skip if already visited
        if current_vertex in visited:
            continue
        
        visited.add(current_vertex)
        
        # Check all neighbors
        for neighbor, weight in graph[current_vertex].items():
            distance = current_distance + weight
            
            # If found shorter path, update
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = current_vertex
                heapq.heappush(pq, (distance, neighbor))
    
    return distances, previous

def get_shortest_path(previous, start, end):
    """
    Reconstruct shortest path from start to end.
    """
    path = []
    current = end
    
    while current is not None:
        path.append(current)
        current = previous[current]
    
    path.reverse()
    return path if path[0] == start else []

def create_graph():
    """
    Create a sample weighted graph.
    """
    graph = {
        'A': {'B': 4, 'C': 2},
        'B': {'C': 1, 'D': 5},
        'C': {'D': 8, 'E': 10},
        'D': {'E': 2},
        'E': {}
    }
    return graph

# Example usage
if __name__ == "__main__":
    graph = create_graph()
    start_vertex = 'A'
    
    distances, previous = dijkstra(graph, start_vertex)
    
    print(f"Shortest distances from {start_vertex}:")
    for vertex, distance in distances.items():
        print(f"To {vertex}: {distance}")
    
    # Get path to specific vertex
    end_vertex = 'E'
    path = get_shortest_path(previous, start_vertex, end_vertex)
    print(f"\\nShortest path from {start_vertex} to {end_vertex}: {' -> '.join(path)}")`,
    explanation: "Dijkstra's algorithm finds the shortest paths from a source vertex to all other vertices in a weighted graph.",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)"
  },

  "insertion-sort": {
    algorithm: "Insertion Sort",
    code: `def insertion_sort(arr):
    """
    Sort array using insertion sort algorithm.
    
    Args:
        arr: List of elements to sort
    
    Returns:
        None (sorts in-place)
    """
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        
        # Move elements greater than key one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        arr[j + 1] = key

def insertion_sort_generic(arr, key_func=None, reverse=False):
    """
    Generic insertion sort with custom comparison.
    
    Args:
        arr: List to sort
        key_func: Function to extract comparison key
        reverse: Sort in descending order if True
    """
    for i in range(1, len(arr)):
        key_item = arr[i]
        key_value = key_func(key_item) if key_func else key_item
        j = i - 1
        
        while j >= 0:
            current_value = key_func(arr[j]) if key_func else arr[j]
            should_swap = current_value > key_value if not reverse else current_value < key_value
            
            if not should_swap:
                break
                
            arr[j + 1] = arr[j]
            j -= 1
        
        arr[j + 1] = key_item

# Example usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original: {numbers}")
    
    insertion_sort(numbers)
    print(f"Sorted: {numbers}")
    
    # Example with custom objects
    students = [('Alice', 85), ('Bob', 90), ('Charlie', 78)]
    print(f"\nOriginal students: {students}")
    
    insertion_sort_generic(students, key_func=lambda x: x[1], reverse=True)
    print(f"Sorted by grade (desc): {students}")`,
    explanation: "Insertion sort builds the final sorted array one item at a time by inserting each element into its proper position.",
    timeComplexity: "O(n²) worst/average, O(n) best",
    spaceComplexity: "O(1)"
  },

  "selection-sort": {
    algorithm: "Selection Sort",
    code: `def selection_sort(arr):
    """
    Sort array using selection sort algorithm.
    
    Args:
        arr: List of elements to sort
    
    Returns:
        None (sorts in-place)
    """
    for i in range(len(arr)):
        min_index = i
        
        # Find minimum element in remaining unsorted array
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_index]:
                min_index = j
        
        # Swap found minimum element with first element
        arr[i], arr[min_index] = arr[min_index], arr[i]

def selection_sort_generic(arr, key_func=None, reverse=False):
    """
    Generic selection sort with custom comparison.
    
    Args:
        arr: List to sort
        key_func: Function to extract comparison key
        reverse: Sort in descending order if True
    """
    for i in range(len(arr)):
        selected_index = i
        selected_value = key_func(arr[i]) if key_func else arr[i]
        
        for j in range(i + 1, len(arr)):
            current_value = key_func(arr[j]) if key_func else arr[j]
            
            if reverse:
                if current_value > selected_value:
                    selected_index = j
                    selected_value = current_value
            else:
                if current_value < selected_value:
                    selected_index = j
                    selected_value = current_value
        
        arr[i], arr[selected_index] = arr[selected_index], arr[i]

# Example usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original: {numbers}")
    
    selection_sort(numbers)
    print(f"Sorted: {numbers}")
    
    # Example with strings
    words = ['banana', 'apple', 'cherry', 'date']
    print(f"\nOriginal words: {words}")
    
    selection_sort_generic(words, key_func=len, reverse=True)
    print(f"Sorted by length (desc): {words}")`,
    explanation: "Selection sort repeatedly selects the minimum element from the unsorted portion and places it at the beginning.",
    timeComplexity: "O(n²) in all cases",
    spaceComplexity: "O(1)"
  },

  "heap-sort": {
    algorithm: "Heap Sort",
    code: `def heapify(arr, n, i):
    """
    Heapify a subtree rooted with node i.
    
    Args:
        arr: Array to heapify
        n: Size of heap
        i: Root index of subtree
    """
    largest = i  # Initialize largest as root
    left = 2 * i + 1  # left child
    right = 2 * i + 2  # right child
    
    # If left child exists and is greater than root
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    # If right child exists and is greater than largest so far
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    # If largest is not root
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        # Recursively heapify the affected subtree
        heapify(arr, n, largest)

def heap_sort(arr):
    """
    Sort array using heap sort algorithm.
    
    Args:
        arr: List of elements to sort
    
    Returns:
        None (sorts in-place)
    """
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements from heap one by one
    for i in range(n - 1, 0, -1):
        # Move current root to end
        arr[0], arr[i] = arr[i], arr[0]
        
        # Call max heapify on the reduced heap
        heapify(arr, i, 0)

def heap_sort_with_key(arr, key_func=None, reverse=False):
    """
    Heap sort with custom comparison function.
    """
    if key_func is None:
        key_func = lambda x: x
    
    def heapify_custom(arr, n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        
        if left < n:
            left_key = key_func(arr[left])
            largest_key = key_func(arr[largest])
            if (not reverse and left_key > largest_key) or (reverse and left_key < largest_key):
                largest = left
        
        if right < n:
            right_key = key_func(arr[right])
            largest_key = key_func(arr[largest])
            if (not reverse and right_key > largest_key) or (reverse and right_key < largest_key):
                largest = right
        
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify_custom(arr, n, largest)
    
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify_custom(arr, n, i)
    
    # Extract elements
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify_custom(arr, i, 0)

# Example usage
if __name__ == "__main__":
    numbers = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original: {numbers}")
    
    heap_sort(numbers)
    print(f"Sorted: {numbers}")
    
    # Example with custom sorting
    people = [('Alice', 25), ('Bob', 30), ('Charlie', 20)]
    print(f"\nOriginal people: {people}")
    
    heap_sort_with_key(people, key_func=lambda x: x[1])
    print(f"Sorted by age: {people}")`,
    explanation: "Heap sort uses a binary heap data structure to sort elements. It builds a max heap then repeatedly extracts the maximum.",
    timeComplexity: "O(n log n) in all cases",
    spaceComplexity: "O(1)"
  },

  "bfs": {
    algorithm: "Breadth-First Search (BFS)",
    code: `from collections import deque, defaultdict

class Graph:
    def __init__(self):
        self.adjacency_list = defaultdict(list)
    
    def add_edge(self, u, v):
        """Add an edge to the graph (undirected)."""
        self.adjacency_list[u].append(v)
        self.adjacency_list[v].append(u)
    
    def add_directed_edge(self, u, v):
        """Add a directed edge to the graph."""
        self.adjacency_list[u].append(v)
    
    def bfs(self, start_vertex):
        """
        Breadth-First Search traversal starting from given vertex.
        
        Args:
            start_vertex: Starting vertex for BFS
            
        Returns:
            list: BFS traversal order
        """
        visited = set()
        queue = deque([start_vertex])
        result = []
        
        visited.add(start_vertex)
        
        while queue:
            vertex = queue.popleft()
            result.append(vertex)
            
            # Visit all unvisited neighbors
            for neighbor in self.adjacency_list[vertex]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        return result
    
    def shortest_path(self, start, end):
        """
        Find shortest path between two vertices using BFS.
        
        Args:
            start: Starting vertex
            end: Target vertex
            
        Returns:
            list: Shortest path or empty list if no path exists
        """
        if start == end:
            return [start]
        
        visited = set()
        queue = deque([(start, [start])])
        visited.add(start)
        
        while queue:
            vertex, path = queue.popleft()
            
            for neighbor in self.adjacency_list[vertex]:
                if neighbor == end:
                    return path + [neighbor]
                
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, path + [neighbor]))
        
        return []  # No path found
    
    def is_connected(self):
        """Check if the graph is connected using BFS."""
        if not self.adjacency_list:
            return True
        
        # Start BFS from any vertex
        start = next(iter(self.adjacency_list))
        visited = set()
        queue = deque([start])
        visited.add(start)
        
        while queue:
            vertex = queue.popleft()
            for neighbor in self.adjacency_list[vertex]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        # Check if all vertices were visited
        all_vertices = set(self.adjacency_list.keys())
        for neighbors in self.adjacency_list.values():
            all_vertices.update(neighbors)
        
        return len(visited) == len(all_vertices)

# Example usage
if __name__ == "__main__":
    # Create graph
    graph = Graph()
    
    # Add edges
    graph.add_edge(0, 1)
    graph.add_edge(0, 2)
    graph.add_edge(1, 3)
    graph.add_edge(1, 4)
    graph.add_edge(2, 4)
    graph.add_edge(3, 5)
    graph.add_edge(4, 5)
    
    # Perform BFS
    bfs_result = graph.bfs(0)
    print(f"BFS traversal from vertex 0: {bfs_result}")
    
    # Find shortest path
    path = graph.shortest_path(0, 5)
    print(f"Shortest path from 0 to 5: {' -> '.join(map(str, path))}")
    
    # Check connectivity
    print(f"Graph is connected: {graph.is_connected()}")`,
    explanation: "BFS explores all vertices at the present depth before moving to vertices at the next depth level.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)"
  },

  "dfs": {
    algorithm: "Depth-First Search (DFS)",
    code: `from collections import defaultdict

class Graph:
    def __init__(self):
        self.adjacency_list = defaultdict(list)
    
    def add_edge(self, u, v):
        """Add an edge to the graph (undirected)."""
        self.adjacency_list[u].append(v)
        self.adjacency_list[v].append(u)
    
    def add_directed_edge(self, u, v):
        """Add a directed edge to the graph."""
        self.adjacency_list[u].append(v)
    
    def dfs_recursive(self, start_vertex, visited=None):
        """
        Depth-First Search traversal using recursion.
        
        Args:
            start_vertex: Starting vertex for DFS
            visited: Set of visited vertices (for internal use)
            
        Returns:
            list: DFS traversal order
        """
        if visited is None:
            visited = set()
        
        visited.add(start_vertex)
        result = [start_vertex]
        
        # Visit all unvisited neighbors
        for neighbor in self.adjacency_list[start_vertex]:
            if neighbor not in visited:
                result.extend(self.dfs_recursive(neighbor, visited))
        
        return result
    
    def dfs_iterative(self, start_vertex):
        """
        Depth-First Search traversal using iteration (stack).
        
        Args:
            start_vertex: Starting vertex for DFS
            
        Returns:
            list: DFS traversal order
        """
        visited = set()
        stack = [start_vertex]
        result = []
        
        while stack:
            vertex = stack.pop()
            
            if vertex not in visited:
                visited.add(vertex)
                result.append(vertex)
                
                # Add neighbors to stack (in reverse order for correct traversal)
                for neighbor in reversed(self.adjacency_list[vertex]):
                    if neighbor not in visited:
                        stack.append(neighbor)
        
        return result
    
    def has_path(self, start, end, visited=None):
        """
        Check if path exists between two vertices using DFS.
        
        Args:
            start: Starting vertex
            end: Target vertex
            visited: Set of visited vertices (for internal use)
            
        Returns:
            bool: True if path exists, False otherwise
        """
        if start == end:
            return True
        
        if visited is None:
            visited = set()
        
        visited.add(start)
        
        for neighbor in self.adjacency_list[start]:
            if neighbor not in visited:
                if self.has_path(neighbor, end, visited):
                    return True
        
        return False
    
    def find_all_paths(self, start, end, path=None):
        """
        Find all paths between two vertices using DFS.
        
        Args:
            start: Starting vertex
            end: Target vertex
            path: Current path (for internal use)
            
        Returns:
            list: List of all paths
        """
        if path is None:
            path = []
        
        path = path + [start]
        
        if start == end:
            return [path]
        
        paths = []
        for neighbor in self.adjacency_list[start]:
            if neighbor not in path:  # Avoid cycles
                new_paths = self.find_all_paths(neighbor, end, path)
                paths.extend(new_paths)
        
        return paths
    
    def is_cyclic(self):
        """
        Detect cycle in undirected graph using DFS.
        
        Returns:
            bool: True if cycle exists, False otherwise
        """
        visited = set()
        
        def dfs_cycle_check(vertex, parent):
            visited.add(vertex)
            
            for neighbor in self.adjacency_list[vertex]:
                if neighbor not in visited:
                    if dfs_cycle_check(neighbor, vertex):
                        return True
                elif neighbor != parent:
                    return True
            
            return False
        
        # Check for cycle in each component
        for vertex in self.adjacency_list:
            if vertex not in visited:
                if dfs_cycle_check(vertex, -1):
                    return True
        
        return False

# Example usage
if __name__ == "__main__":
    # Create graph
    graph = Graph()
    
    # Add edges
    graph.add_edge(0, 1)
    graph.add_edge(0, 2)
    graph.add_edge(1, 3)
    graph.add_edge(1, 4)
    graph.add_edge(2, 4)
    graph.add_edge(3, 5)
    graph.add_edge(4, 5)
    
    # Perform DFS
    dfs_recursive = graph.dfs_recursive(0)
    print(f"DFS recursive from vertex 0: {dfs_recursive}")
    
    dfs_iterative = graph.dfs_iterative(0)
    print(f"DFS iterative from vertex 0: {dfs_iterative}")
    
    # Check path existence
    has_path = graph.has_path(0, 5)
    print(f"Path exists from 0 to 5: {has_path}")
    
    # Find all paths
    all_paths = graph.find_all_paths(0, 5)
    print(f"All paths from 0 to 5: {all_paths}")
    
    # Check for cycles
    print(f"Graph has cycle: {graph.is_cyclic()}")`,
    explanation: "DFS explores as far as possible along each branch before backtracking.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)"
  }
};

export const getAllPythonImplementations = (): PythonImplementation[] => {
  return Object.values(PYTHON_IMPLEMENTATIONS);
};

export const getPythonImplementation = (algorithm: string): PythonImplementation | undefined => {
  return PYTHON_IMPLEMENTATIONS[algorithm];
};