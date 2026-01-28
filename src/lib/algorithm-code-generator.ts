/**
 * Comprehensive Algorithm Code Generator
 * Generates Python, Java, C, and C++ implementations for all algorithm types
 */

import type { AlgorithmCategory } from './algorithm-schema';

export interface CodeImplementation {
  code: string;
  language: string;
  features: string[];
  complexity: {
    time: string;
    space: string;
  };
}

// Template generators for different algorithm categories
const SEARCHING_TEMPLATES = {
  python: (name: string, slug: string) => `"""
${name} Implementation in Python
Time Complexity: O(n) average case
Space Complexity: O(1)
"""

def ${slug.replace(/-/g, '_')}(arr: list, target) -> int:
    """
    Searches for target element in array.
    
    Args:
        arr: Input array
        target: Element to search
    
    Returns:
        Index of target if found, -1 otherwise
    """
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1


# Example usage
if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    target = 25
    result = ${slug.replace(/-/g, '_')}(arr, target)
    print(f"Element found at index: {result}")
`,

  java: (name: string, slug: string) => `/**
 * ${name} Implementation in Java
 * Time Complexity: O(n) average case
 * Space Complexity: O(1)
 */

public class ${slug.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join('')} {
    
    /**
     * Searches for target element in array
     * 
     * @param arr Input array
     * @param target Element to search
     * @return Index of target if found, -1 otherwise
     */
    public static int search(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }
    
    // Generic version
    public static <T extends Comparable<T>> int search(T[] arr, T target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i].compareTo(target) == 0) {
                return i;
            }
        }
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        int target = 25;
        int result = search(arr, target);
        System.out.println("Element found at index: " + result);
    }
}
`,

  c: (name: string, slug: string) => `/**
 * ${name} Implementation in C
 * Time Complexity: O(n) average case
 * Space Complexity: O(1)
 */

#include <stdio.h>
#include <stdlib.h>

/**
 * Searches for target element in array
 * 
 * @param arr Input array
 * @param n Size of array
 * @param target Element to search
 * @return Index of target if found, -1 otherwise
 */
int ${slug.replace(/-/g, '_')}(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}

// Generic version using void pointers
int ${slug.replace(/-/g, '_')}_generic(void* arr, int n, int elem_size, void* target, 
                                       int (*compare)(const void*, const void*)) {
    char* array = (char*)arr;
    for (int i = 0; i < n; i++) {
        if (compare(array + i * elem_size, target) == 0) {
            return i;
        }
    }
    return -1;
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 25;
    
    int result = ${slug.replace(/-/g, '_')}(arr, n, target);
    printf("Element found at index: %d\\n", result);
    
    return 0;
}
`,

  cpp: (name: string, slug: string) => `/**
 * ${name} Implementation in C++
 * Time Complexity: O(n) average case
 * Space Complexity: O(1)
 */

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

/**
 * Searches for target element in array
 * 
 * @param arr Input vector
 * @param target Element to search
 * @return Index of target if found, -1 otherwise
 */
int ${slug.replace(/-/g, '_')}(const vector<int>& arr, int target) {
    for (size_t i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return static_cast<int>(i);
        }
    }
    return -1;
}

// Template version for generic types
template<typename T>
int ${slug.replace(/-/g, '_')}_template(const vector<T>& arr, const T& target) {
    auto it = find(arr.begin(), arr.end(), target);
    if (it != arr.end()) {
        return static_cast<int>(distance(arr.begin(), it));
    }
    return -1;
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    int target = 25;
    
    int result = ${slug.replace(/-/g, '_')}(arr, target);
    cout << "Element found at index: " << result << endl;
    
    return 0;
}
`
};

const SORTING_TEMPLATES = {
  python: (name: string, slug: string) => `"""
${name} Implementation in Python
Time Complexity: O(n²) worst case
Space Complexity: O(1)
"""

def ${slug.replace(/-/g, '_')}(arr: list) -> list:
    """
    Sorts array in ascending order.
    
    Args:
        arr: Input array to sort
    
    Returns:
        Sorted array
    """
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr


# Custom key function support
def ${slug.replace(/-/g, '_')}_key(arr: list, key=lambda x: x, reverse=False) -> list:
    """Sorting with custom key function"""
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if (key(arr[j]) > key(arr[j + 1])) != reverse:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr


if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    sorted_arr = ${slug.replace(/-/g, '_')}(arr.copy())
    print(f"Sorted array: {sorted_arr}")
`,

  java: (name: string, slug: string) => `/**
 * ${name} Implementation in Java
 * Time Complexity: O(n²) worst case
 * Space Complexity: O(1)
 */

import java.util.Arrays;
import java.util.Comparator;

public class ${slug.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join('')} {
    
    /**
     * Sorts integer array in ascending order
     * 
     * @param arr Input array
     */
    public static void sort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    /**
     * Generic sorting with Comparator
     * 
     * @param arr Generic array
     * @param comparator Custom comparator
     */
    public static <T> void sort(T[] arr, Comparator<T> comparator) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (comparator.compare(arr[j], arr[j + 1]) > 0) {
                    T temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        sort(arr);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}
`,

  c: (name: string, slug: string) => `/**
 * ${name} Implementation in C
 * Time Complexity: O(n²) worst case
 * Space Complexity: O(1)
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/**
 * Swaps two integers
 */
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

/**
 * Sorts integer array in ascending order
 * 
 * @param arr Input array
 * @param n Size of array
 */
void ${slug.replace(/-/g, '_')}(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
            }
        }
    }
}

/**
 * Generic sorting using void pointers
 */
void ${slug.replace(/-/g, '_')}_generic(void* arr, int n, int elem_size, 
                                        int (*compare)(const void*, const void*)) {
    char* array = (char*)arr;
    char* temp = (char*)malloc(elem_size);
    
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            char* elem1 = array + j * elem_size;
            char* elem2 = array + (j + 1) * elem_size;
            
            if (compare(elem1, elem2) > 0) {
                memcpy(temp, elem1, elem_size);
                memcpy(elem1, elem2, elem_size);
                memcpy(elem2, temp, elem_size);
            }
        }
    }
    
    free(temp);
}

void print_array(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    ${slug.replace(/-/g, '_')}(arr, n);
    printf("Sorted array: ");
    print_array(arr, n);
    
    return 0;
}
`,

  cpp: (name: string, slug: string) => `/**
 * ${name} Implementation in C++
 * Time Complexity: O(n²) worst case
 * Space Complexity: O(1)
 */

#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>

using namespace std;

/**
 * Sorts vector in ascending order
 * 
 * @param arr Input vector
 */
void ${slug.replace(/-/g, '_')}(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

/**
 * Template version with custom comparator
 */
template<typename T, typename Compare = less<T>>
void ${slug.replace(/-/g, '_')}_template(vector<T>& arr, Compare comp = Compare()) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (comp(arr[j + 1], arr[j])) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

void print_array(const vector<int>& arr) {
    for (int num : arr) {
        cout << num << " ";
    }
    cout << endl;
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    
    ${slug.replace(/-/g, '_')}(arr);
    cout << "Sorted array: ";
    print_array(arr);
    
    return 0;
}
`
};

const GRAPH_TEMPLATES = {
  python: (name: string, slug: string) => `"""
${name} Implementation in Python
Time Complexity: O(V + E)
Space Complexity: O(V)
"""

from collections import deque, defaultdict
from typing import List, Dict, Set


class Graph:
    def __init__(self, vertices: int):
        self.V = vertices
        self.adj = defaultdict(list)
    
    def add_edge(self, u: int, v: int):
        self.adj[u].append(v)
    
    def ${slug.replace(/-/g, '_')}(self, start: int) -> List[int]:
        """
        Performs graph traversal starting from given vertex.
        
        Args:
            start: Starting vertex
        
        Returns:
            List of vertices in traversal order
        """
        visited = set()
        result = []
        queue = deque([start])
        visited.add(start)
        
        while queue:
            vertex = queue.popleft()
            result.append(vertex)
            
            for neighbor in self.adj[vertex]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        
        return result


if __name__ == "__main__":
    g = Graph(6)
    g.add_edge(0, 1)
    g.add_edge(0, 2)
    g.add_edge(1, 3)
    g.add_edge(2, 4)
    g.add_edge(3, 5)
    
    result = g.${slug.replace(/-/g, '_')}(0)
    print(f"Traversal order: {result}")
`,

  java: (name: string, slug: string) => `/**
 * ${name} Implementation in Java
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */

import java.util.*;

public class ${slug.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join('')} {
    
    private int V;
    private List<List<Integer>> adj;
    
    public ${slug.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join('')}(int vertices) {
        V = vertices;
        adj = new ArrayList<>(V);
        for (int i = 0; i < V; i++) {
            adj.add(new ArrayList<>());
        }
    }
    
    public void addEdge(int u, int v) {
        adj.get(u).add(v);
    }
    
    /**
     * Performs graph traversal
     * 
     * @param start Starting vertex
     * @return List of vertices in traversal order
     */
    public List<Integer> traverse(int start) {
        boolean[] visited = new boolean[V];
        List<Integer> result = new ArrayList<>();
        Queue<Integer> queue = new LinkedList<>();
        
        visited[start] = true;
        queue.offer(start);
        
        while (!queue.isEmpty()) {
            int vertex = queue.poll();
            result.add(vertex);
            
            for (int neighbor : adj.get(vertex)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        ${slug.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join('')} g = new ${slug.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.slice(1)).join('')}(6);
        g.addEdge(0, 1);
        g.addEdge(0, 2);
        g.addEdge(1, 3);
        g.addEdge(2, 4);
        g.addEdge(3, 5);
        
        List<Integer> result = g.traverse(0);
        System.out.println("Traversal order: " + result);
    }
}
`,

  c: (name: string, slug: string) => `/**
 * ${name} Implementation in C
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_VERTICES 100

typedef struct Node {
    int vertex;
    struct Node* next;
} Node;

typedef struct Graph {
    int V;
    Node** adj;
} Graph;

typedef struct Queue {
    int items[MAX_VERTICES];
    int front, rear;
} Queue;

Graph* createGraph(int vertices) {
    Graph* graph = (Graph*)malloc(sizeof(Graph));
    graph->V = vertices;
    graph->adj = (Node**)malloc(vertices * sizeof(Node*));
    
    for (int i = 0; i < vertices; i++) {
        graph->adj[i] = NULL;
    }
    
    return graph;
}

void addEdge(Graph* graph, int u, int v) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->vertex = v;
    newNode->next = graph->adj[u];
    graph->adj[u] = newNode;
}

void ${slug.replace(/-/g, '_')}(Graph* graph, int start, int* result, int* size) {
    bool visited[MAX_VERTICES] = {false};
    Queue queue = {{0}, 0, 0};
    
    visited[start] = true;
    queue.items[queue.rear++] = start;
    *size = 0;
    
    while (queue.front < queue.rear) {
        int vertex = queue.items[queue.front++];
        result[(*size)++] = vertex;
        
        Node* temp = graph->adj[vertex];
        while (temp != NULL) {
            int neighbor = temp->vertex;
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.items[queue.rear++] = neighbor;
            }
            temp = temp->next;
        }
    }
}

int main() {
    Graph* g = createGraph(6);
    addEdge(g, 0, 1);
    addEdge(g, 0, 2);
    addEdge(g, 1, 3);
    addEdge(g, 2, 4);
    addEdge(g, 3, 5);
    
    int result[MAX_VERTICES];
    int size;
    ${slug.replace(/-/g, '_')}(g, 0, result, &size);
    
    printf("Traversal order: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", result[i]);
    }
    printf("\\n");
    
    return 0;
}
`,

  cpp: (name: string, slug: string) => `/**
 * ${name} Implementation in C++
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */

#include <iostream>
#include <vector>
#include <queue>
#include <unordered_set>
#include <algorithm>

using namespace std;

class Graph {
private:
    int V;
    vector<vector<int>> adj;
    
public:
    Graph(int vertices) : V(vertices), adj(vertices) {}
    
    void addEdge(int u, int v) {
        adj[u].push_back(v);
    }
    
    /**
     * Performs graph traversal
     * 
     * @param start Starting vertex
     * @return Vector of vertices in traversal order
     */
    vector<int> ${slug.replace(/-/g, '_')}(int start) {
        vector<bool> visited(V, false);
        vector<int> result;
        queue<int> q;
        
        visited[start] = true;
        q.push(start);
        
        while (!q.empty()) {
            int vertex = q.front();
            q.pop();
            result.push_back(vertex);
            
            for (int neighbor : adj[vertex]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
        
        return result;
    }
};

int main() {
    Graph g(6);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 3);
    g.addEdge(2, 4);
    g.addEdge(3, 5);
    
    vector<int> result = g.${slug.replace(/-/g, '_')}(0);
    
    cout << "Traversal order: ";
    for (int vertex : result) {
        cout << vertex << " ";
    }
    cout << endl;
    
    return 0;
}
`
};

/**
 * Generate code implementation for any algorithm
 */
export function generateAlgorithmCode(
  name: string,
  slug: string,
  category: string,
  language: 'python' | 'java' | 'c' | 'cpp'
): CodeImplementation {
  const templates = category.toLowerCase().includes('search') 
    ? SEARCHING_TEMPLATES
    : category.toLowerCase().includes('sort')
    ? SORTING_TEMPLATES
    : category.toLowerCase().includes('graph')
    ? GRAPH_TEMPLATES
    : SEARCHING_TEMPLATES; // default

  const code = templates[language](name, slug);
  
  return {
    code,
    language,
    features: getLanguageFeatures(language, category),
    complexity: getComplexity(category)
  };
}

function getLanguageFeatures(language: string, category: string): string[] {
  const baseFeatures = {
    python: ['Type hints', 'Docstrings', 'List comprehensions', 'Lambda functions'],
    java: ['Generics', 'Interfaces', 'OOP design', 'Exception handling'],
    c: ['Pointers', 'Manual memory management', 'Generic void* implementation'],
    cpp: ['Templates', 'STL', 'Modern C++ features', 'RAII']
  };
  
  return baseFeatures[language as keyof typeof baseFeatures] || [];
}

function getComplexity(category: string): { time: string; space: string } {
  if (category.toLowerCase().includes('search')) {
    return { time: 'O(n)', space: 'O(1)' };
  } else if (category.toLowerCase().includes('sort')) {
    return { time: 'O(n²)', space: 'O(1)' };
  } else if (category.toLowerCase().includes('graph')) {
    return { time: 'O(V + E)', space: 'O(V)' };
  }
  return { time: 'O(n)', space: 'O(1)' };
}

/**
 * Batch generate implementations for all algorithms
 */
export function generateAllImplementations(algorithms: Array<{ name: string; slug: string; category: string }>) {
  const implementations: Record<string, Record<string, CodeImplementation>> = {};
  
  algorithms.forEach(algo => {
    implementations[algo.slug] = {
      python: generateAlgorithmCode(algo.name, algo.slug, algo.category, 'python'),
      java: generateAlgorithmCode(algo.name, algo.slug, algo.category, 'java'),
      c: generateAlgorithmCode(algo.name, algo.slug, algo.category, 'c'),
      cpp: generateAlgorithmCode(algo.name, algo.slug, algo.category, 'cpp')
    };
  });
  
  return implementations;
}
