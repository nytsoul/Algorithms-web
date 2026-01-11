import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const seedAlgorithms = mutation({
  args: {},
  handler: async (ctx) => {
    const existingAlgorithms = await ctx.db.query("algorithms").take(1);
    if (existingAlgorithms.length > 0) {
      return { message: "Algorithms already seeded" };
    }

    const algorithmData = [
      // Sorting Algorithms
      {
        name: "Quick Sort",
        slug: "quick-sort",
        category: "Sorting",
        domain: "Data Structures & Algorithms",
        description: "Efficient divide-and-conquer sorting algorithm that partitions array around a pivot",
        intuition: "Pick a pivot element and partition the array so elements smaller than pivot come before it and larger elements come after",
        pseudocode: `function quickSort(arr, low, high):
    if low < high:
        pivot = partition(arr, low, high)
        quickSort(arr, low, pivot - 1)
        quickSort(arr, pivot + 1, high)`,
        implementation: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivot = partition(arr, low, high);
    quickSort(arr, low, pivot - 1);
    quickSort(arr, pivot + 1, high);
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
        language: "JavaScript",
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
        spaceComplexity: "O(log n)",
        applications: ["General purpose sorting", "Database query optimization", "Computational geometry"],
        advantages: ["In-place sorting", "Cache-efficient", "Good average performance"],
        disadvantages: ["Unstable sort", "Worst case O(n²)", "Not adaptive"],
        relatedAlgorithms: ["Merge Sort", "Heap Sort", "Intro Sort"],
        difficulty: "Intermediate",
        tags: ["sorting", "divide-and-conquer", "recursive", "in-place"],
        visualizationType: "array-partition",
        researchReferences: ["Tony Hoare (1959)"],
        yearIntroduced: 1959,
        inventor: "Tony Hoare",
      },
      {
        name: "Merge Sort",
        slug: "merge-sort",
        category: "Sorting",
        domain: "Data Structures & Algorithms",
        description: "Stable divide-and-conquer sorting algorithm with guaranteed O(n log n) performance",
        intuition: "Recursively divide array in half, sort each half, then merge the sorted halves",
        pseudocode: `function mergeSort(arr):
    if length(arr) <= 1:
        return arr
    mid = length(arr) / 2
    left = mergeSort(arr[0:mid])
    right = mergeSort(arr[mid:end])
    return merge(left, right)`,
        implementation: `function mergeSort(arr) {
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
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
        language: "JavaScript",
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(n)",
        applications: ["External sorting", "Sorting linked lists", "Counting inversions"],
        advantages: ["Stable sort", "Predictable performance", "Good for linked lists"],
        disadvantages: ["Requires extra space", "Not in-place", "Slower for small arrays"],
        relatedAlgorithms: ["Quick Sort", "Heap Sort", "Tim Sort"],
        difficulty: "Intermediate",
        tags: ["sorting", "divide-and-conquer", "recursive", "stable"],
        visualizationType: "tree-merge",
        researchReferences: ["John von Neumann (1945)"],
        yearIntroduced: 1945,
        inventor: "John von Neumann",
      },
      {
        name: "Heap Sort",
        slug: "heap-sort",
        category: "Sorting",
        domain: "Data Structures & Algorithms",
        description: "Comparison-based sorting using binary heap data structure",
        intuition: "Build a max heap, then repeatedly extract the maximum element",
        pseudocode: `function heapSort(arr):
    buildMaxHeap(arr)
    for i from length(arr) - 1 to 1:
        swap(arr[0], arr[i])
        heapify(arr, 0, i)`,
        implementation: `function heapSort(arr) {
  buildMaxHeap(arr);
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, 0, i);
  }
  return arr;
}

function buildMaxHeap(arr) {
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, i, arr.length);
  }
}

function heapify(arr, i, size) {
  let largest = i, left = 2 * i + 1, right = 2 * i + 2;
  if (left < size && arr[left] > arr[largest]) largest = left;
  if (right < size && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, largest, size);
  }
}`,
        language: "JavaScript",
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
        spaceComplexity: "O(1)",
        applications: ["Priority queues", "Selection algorithms", "Graph algorithms"],
        advantages: ["In-place sorting", "Guaranteed O(n log n)", "No extra space"],
        disadvantages: ["Unstable", "Not adaptive", "Poor cache performance"],
        relatedAlgorithms: ["Quick Sort", "Priority Queue", "Selection Sort"],
        difficulty: "Intermediate",
        tags: ["sorting", "heap", "in-place", "comparison"],
        visualizationType: "heap-tree",
        researchReferences: ["J.W.J. Williams (1964)"],
        yearIntroduced: 1964,
        inventor: "J.W.J. Williams",
      },
      {
        name: "Bubble Sort",
        slug: "bubble-sort",
        category: "Sorting",
        domain: "Data Structures & Algorithms",
        description: "Simple comparison-based sorting algorithm that repeatedly swaps adjacent elements",
        intuition: "Repeatedly step through the list, compare adjacent elements and swap them if in wrong order",
        pseudocode: `function bubbleSort(arr):
    for i from 0 to length(arr):
        for j from 0 to length(arr) - i - 1:
            if arr[j] > arr[j + 1]:
                swap(arr[j], arr[j + 1])`,
        implementation: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
        language: "JavaScript",
        timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
        spaceComplexity: "O(1)",
        applications: ["Educational purposes", "Small datasets", "Nearly sorted data"],
        advantages: ["Simple to implement", "Stable sort", "Adaptive", "In-place"],
        disadvantages: ["Very slow for large datasets", "Poor performance", "Many comparisons"],
        relatedAlgorithms: ["Selection Sort", "Insertion Sort", "Cocktail Sort"],
        difficulty: "Beginner",
        tags: ["sorting", "comparison", "stable", "adaptive"],
        visualizationType: "array-swap",
        researchReferences: ["Folklore algorithm"],
        yearIntroduced: 1956,
        inventor: "Unknown",
      },
      // Graph Algorithms
      {
        name: "Dijkstra's Algorithm",
        slug: "dijkstra-algorithm",
        category: "Shortest Path",
        domain: "Graph Algorithms",
        description: "Finds shortest path from source to all vertices in weighted graph",
        intuition: "Greedily select closest unvisited vertex and update distances to neighbors",
        pseudocode: `function dijkstra(graph, source):
    distances = array filled with infinity
    distances[source] = 0
    priorityQueue.add(source, 0)
    while priorityQueue is not empty:
        u = priorityQueue.extractMin()
        for each neighbor v of u:
            if distances[u] + weight(u, v) < distances[v]:
                distances[v] = distances[u] + weight(u, v)
                priorityQueue.add(v, distances[v])`,
        implementation: `function dijkstra(graph, source) {
  const distances = new Map();
  const pq = new PriorityQueue();
  const visited = new Set();

  for (let node of graph.nodes) {
    distances.set(node, Infinity);
  }
  distances.set(source, 0);
  pq.enqueue(source, 0);

  while (!pq.isEmpty()) {
    const u = pq.dequeue();
    if (visited.has(u)) continue;
    visited.add(u);

    for (let [v, weight] of graph.neighbors(u)) {
      const alt = distances.get(u) + weight;
      if (alt < distances.get(v)) {
        distances.set(v, alt);
        pq.enqueue(v, alt);
      }
    }
  }
  return distances;
}`,
        language: "JavaScript",
        timeComplexity: { best: "O((V + E) log V)", average: "O((V + E) log V)", worst: "O((V + E) log V)" },
        spaceComplexity: "O(V)",
        applications: ["GPS navigation", "Network routing", "Google Maps"],
        advantages: ["Optimal for non-negative weights", "Efficient with priority queue"],
        disadvantages: ["Doesn't work with negative weights", "Slower than A* with heuristic"],
        relatedAlgorithms: ["A* Search", "Bellman-Ford", "Floyd-Warshall"],
        difficulty: "Intermediate",
        tags: ["graph", "shortest-path", "greedy", "weighted"],
        visualizationType: "graph-traversal",
        researchReferences: ["Edsger W. Dijkstra (1959)"],
        yearIntroduced: 1959,
        inventor: "Edsger W. Dijkstra",
      },
      {
        name: "Breadth-First Search",
        slug: "bfs",
        category: "Graph Traversal",
        domain: "Graph Algorithms",
        description: "Explores graph level by level using a queue",
        intuition: "Visit all neighbors at current depth before moving to next depth level",
        pseudocode: `function BFS(graph, start):
    queue = [start]
    visited = {start}
    while queue is not empty:
        vertex = queue.dequeue()
        for each neighbor of vertex:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)`,
        implementation: `function bfs(graph, start) {
  const queue = [start];
  const visited = new Set([start]);
  const result = [];

  while (queue.length > 0) {
    const vertex = queue.shift();
    result.push(vertex);

    for (let neighbor of graph.neighbors(vertex)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return result;
}`,
        language: "JavaScript",
        timeComplexity: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
        spaceComplexity: "O(V)",
        applications: ["Shortest path in unweighted graph", "Web crawlers", "Social networks"],
        advantages: ["Finds shortest path", "Complete algorithm", "Optimal for unweighted graphs"],
        disadvantages: ["High memory usage", "Not suitable for deep graphs"],
        relatedAlgorithms: ["DFS", "Dijkstra", "A* Search"],
        difficulty: "Beginner",
        tags: ["graph", "traversal", "queue", "level-order"],
        visualizationType: "graph-traversal",
        researchReferences: ["Konrad Zuse (1945)"],
        yearIntroduced: 1945,
        inventor: "Konrad Zuse",
      },
      {
        name: "Depth-First Search",
        slug: "dfs",
        category: "Graph Traversal",
        domain: "Graph Algorithms",
        description: "Explores graph by going as deep as possible before backtracking",
        intuition: "Visit a vertex, then recursively visit all its unvisited neighbors",
        pseudocode: `function DFS(graph, vertex, visited):
    visited.add(vertex)
    for each neighbor of vertex:
        if neighbor not in visited:
            DFS(graph, neighbor, visited)`,
        implementation: `function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  const result = [start];

  for (let neighbor of graph.neighbors(start)) {
    if (!visited.has(neighbor)) {
      result.push(...dfs(graph, neighbor, visited));
    }
  }
  return result;
}

function dfsIterative(graph, start) {
  const stack = [start];
  const visited = new Set([start]);
  const result = [];

  while (stack.length > 0) {
    const vertex = stack.pop();
    result.push(vertex);

    for (let neighbor of graph.neighbors(vertex)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        stack.push(neighbor);
      }
    }
  }
  return result;
}`,
        language: "JavaScript",
        timeComplexity: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
        spaceComplexity: "O(V)",
        applications: ["Topological sorting", "Cycle detection", "Maze solving"],
        advantages: ["Memory efficient", "Good for deep graphs", "Simple implementation"],
        disadvantages: ["May not find shortest path", "Can get stuck in infinite loops"],
        relatedAlgorithms: ["BFS", "Topological Sort", "Tarjan's Algorithm"],
        difficulty: "Beginner",
        tags: ["graph", "traversal", "stack", "recursive"],
        visualizationType: "graph-traversal",
        researchReferences: ["Charles Pierre Trémaux (19th century)"],
        yearIntroduced: 1800,
        inventor: "Charles Pierre Trémaux",
      },
      // Dynamic Programming
      {
        name: "Fibonacci (Dynamic Programming)",
        slug: "fibonacci-dp",
        category: "Dynamic Programming",
        domain: "Algorithm Design",
        description: "Efficiently compute Fibonacci numbers using memoization or tabulation",
        intuition: "Store previously computed Fibonacci numbers to avoid redundant calculations",
        pseudocode: `function fibonacci(n, memo):
    if n <= 1:
        return n
    if n in memo:
        return memo[n]
    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
    return memo[n]`,
        implementation: `// Memoization (Top-down)
function fibMemo(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// Tabulation (Bottom-up)
function fibTab(n) {
  if (n <= 1) return n;
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// Space optimized
function fibOptimized(n) {
  if (n <= 1) return n;
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}`,
        language: "JavaScript",
        timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
        spaceComplexity: "O(n) or O(1)",
        applications: ["Number theory", "Algorithm optimization", "Teaching DP concepts"],
        advantages: ["Much faster than naive recursion", "Easy to understand", "Multiple approaches"],
        disadvantages: ["Overkill for small n", "Integer overflow for large n"],
        relatedAlgorithms: ["Knapsack Problem", "Longest Common Subsequence"],
        difficulty: "Beginner",
        tags: ["dynamic-programming", "memoization", "optimization"],
        visualizationType: "dp-table",
        researchReferences: ["Leonardo Fibonacci (1202)"],
        yearIntroduced: 1202,
        inventor: "Leonardo Fibonacci",
      },
      {
        name: "Longest Common Subsequence",
        slug: "lcs",
        category: "Dynamic Programming",
        domain: "Algorithm Design",
        description: "Find the longest subsequence common to two sequences",
        intuition: "Build a table where each cell represents the LCS length up to that point",
        pseudocode: `function LCS(X, Y):
    m, n = length(X), length(Y)
    dp = 2D array of size (m+1) x (n+1)
    for i from 1 to m:
        for j from 1 to n:
            if X[i-1] == Y[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`,
        implementation: `function lcs(str1, str2) {
  const m = str1.length, n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}

function lcsString(str1, str2) {
  const m = str1.length, n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let lcs = '';
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      lcs = str1[i - 1] + lcs;
      i--; j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  return lcs;
}`,
        language: "JavaScript",
        timeComplexity: { best: "O(m * n)", average: "O(m * n)", worst: "O(m * n)" },
        spaceComplexity: "O(m * n)",
        applications: ["Diff utilities", "DNA sequence alignment", "Version control"],
        advantages: ["Optimal solution", "Well-studied problem", "Many applications"],
        disadvantages: ["High space complexity", "Not suitable for very long sequences"],
        relatedAlgorithms: ["Edit Distance", "Longest Increasing Subsequence"],
        difficulty: "Intermediate",
        tags: ["dynamic-programming", "strings", "sequences"],
        visualizationType: "dp-table",
        researchReferences: ["Multiple contributors (1960s-1970s)"],
        yearIntroduced: 1970,
        inventor: "Multiple contributors",
      },
      // Search Algorithms
      {
        name: "Binary Search",
        slug: "binary-search",
        category: "Search",
        domain: "Data Structures & Algorithms",
        description: "Efficiently search sorted array by repeatedly dividing search interval in half",
        intuition: "Compare target with middle element, eliminate half of remaining elements",
        pseudocode: `function binarySearch(arr, target):
    left, right = 0, length(arr) - 1
    while left <= right:
        mid = (left + right) / 2
        if arr[mid] == target:
            return mid
        else if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
        implementation: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, right);
  return binarySearchRecursive(arr, target, left, mid - 1);
}`,
        language: "JavaScript",
        timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
        spaceComplexity: "O(1) iterative, O(log n) recursive",
        applications: ["Database indexing", "Dictionary lookup", "Finding boundaries"],
        advantages: ["Very fast", "Simple to implement", "Logarithmic complexity"],
        disadvantages: ["Requires sorted array", "Not suitable for linked lists"],
        relatedAlgorithms: ["Linear Search", "Interpolation Search", "Exponential Search"],
        difficulty: "Beginner",
        tags: ["search", "divide-and-conquer", "sorted"],
        visualizationType: "array-binary-search",
        researchReferences: ["John Mauchly (1946)"],
        yearIntroduced: 1946,
        inventor: "John Mauchly",
      },
      // Machine Learning Algorithms
      {
        name: "K-Nearest Neighbors (KNN)",
        slug: "knn",
        category: "Classification",
        domain: "Machine Learning",
        description: "Instance-based learning algorithm that classifies based on k nearest neighbors",
        intuition: "Classify new data point based on majority vote of k closest training examples",
        pseudocode: `function KNN(training_data, test_point, k):
    distances = []
    for each point in training_data:
        dist = euclidean_distance(point, test_point)
        distances.append((dist, point.label))
    sort distances by dist
    return majority_vote(distances[0:k])`,
        implementation: `function knn(trainingData, testPoint, k) {
  const distances = trainingData.map(point => ({
    distance: euclideanDistance(point.features, testPoint),
    label: point.label
  }));

  distances.sort((a, b) => a.distance - b.distance);
  const kNearest = distances.slice(0, k);

  const votes = {};
  kNearest.forEach(neighbor => {
    votes[neighbor.label] = (votes[neighbor.label] || 0) + 1;
  });

  return Object.keys(votes).reduce((a, b) =>
    votes[a] > votes[b] ? a : b
  );
}

function euclideanDistance(a, b) {
  return Math.sqrt(
    a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0)
  );
}`,
        language: "JavaScript",
        timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
        spaceComplexity: "O(n)",
        applications: ["Pattern recognition", "Recommendation systems", "Anomaly detection"],
        advantages: ["Simple to implement", "No training phase", "Works well with small datasets"],
        disadvantages: ["Slow prediction", "Sensitive to irrelevant features", "High memory usage"],
        relatedAlgorithms: ["Decision Trees", "SVM", "Naive Bayes"],
        difficulty: "Beginner",
        tags: ["machine-learning", "classification", "supervised-learning"],
        visualizationType: "scatter-plot",
        researchReferences: ["Evelyn Fix and Joseph Hodges (1951)"],
        yearIntroduced: 1951,
        inventor: "Evelyn Fix and Joseph Hodges",
      },
      {
        name: "Decision Tree",
        slug: "decision-tree",
        category: "Classification",
        domain: "Machine Learning",
        description: "Tree-based model that makes decisions by splitting data based on feature values",
        intuition: "Build a tree by recursively splitting data on features that provide best information gain",
        pseudocode: `function buildTree(data, features):
    if stopping_condition:
        return leaf_node
    best_feature = find_best_split(data, features)
    tree = create_node(best_feature)
    for each value in best_feature:
        subset = filter_data(data, best_feature, value)
        tree.add_child(buildTree(subset, features - best_feature))
    return tree`,
        implementation: `class DecisionTreeNode {
  constructor(feature = null, threshold = null, left = null, right = null, value = null) {
    this.feature = feature;
    this.threshold = threshold;
    this.left = left;
    this.right = right;
    this.value = value;
  }
}

function buildTree(X, y, maxDepth = 10, minSamples = 2, depth = 0) {
  const nSamples = X.length;
  const nFeatures = X[0].length;

  if (depth >= maxDepth || nSamples < minSamples || new Set(y).size === 1) {
    const leafValue = mostCommonLabel(y);
    return new DecisionTreeNode(null, null, null, null, leafValue);
  }

  const { feature, threshold } = findBestSplit(X, y, nFeatures);
  const [leftIndices, rightIndices] = split(X, feature, threshold);

  const left = buildTree(
    leftIndices.map(i => X[i]),
    leftIndices.map(i => y[i]),
    maxDepth, minSamples, depth + 1
  );

  const right = buildTree(
    rightIndices.map(i => X[i]),
    rightIndices.map(i => y[i]),
    maxDepth, minSamples, depth + 1
  );

  return new DecisionTreeNode(feature, threshold, left, right);
}`,
        language: "JavaScript",
        timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
        spaceComplexity: "O(n)",
        applications: ["Credit scoring", "Medical diagnosis", "Customer segmentation"],
        advantages: ["Easy to interpret", "Handles non-linear relationships", "No feature scaling needed"],
        disadvantages: ["Prone to overfitting", "Unstable", "Biased with imbalanced data"],
        relatedAlgorithms: ["Random Forest", "Gradient Boosting", "KNN"],
        difficulty: "Intermediate",
        tags: ["machine-learning", "classification", "tree-based"],
        visualizationType: "tree-structure",
        researchReferences: ["Ross Quinlan (1986) - ID3"],
        yearIntroduced: 1986,
        inventor: "Ross Quinlan",
      },
      // Network Algorithms
      {
        name: "Kruskal's Algorithm",
        slug: "kruskal-algorithm",
        category: "Minimum Spanning Tree",
        domain: "Graph Algorithms",
        description: "Finds minimum spanning tree using greedy approach with union-find",
        intuition: "Sort edges by weight and add them if they don't create a cycle",
        pseudocode: `function kruskal(graph):
    sort edges by weight
    mst = []
    disjoint_set = UnionFind(vertices)
    for each edge (u, v, weight):
        if disjoint_set.find(u) != disjoint_set.find(v):
            mst.add(edge)
            disjoint_set.union(u, v)
    return mst`,
        implementation: `function kruskal(graph) {
  const edges = getAllEdges(graph).sort((a, b) => a.weight - b.weight);
  const mst = [];
  const uf = new UnionFind(graph.vertices);

  for (const { u, v, weight } of edges) {
    if (uf.find(u) !== uf.find(v)) {
      mst.push({ u, v, weight });
      uf.union(u, v);
    }
  }

  return mst;
}

class UnionFind {
  constructor(vertices) {
    this.parent = {};
    this.rank = {};
    vertices.forEach(v => {
      this.parent[v] = v;
      this.rank[v] = 0;
    });
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }
}`,
        language: "JavaScript",
        timeComplexity: { best: "O(E log E)", average: "O(E log E)", worst: "O(E log E)" },
        spaceComplexity: "O(V + E)",
        applications: ["Network design", "Circuit design", "Clustering"],
        advantages: ["Simple to implement", "Works well for sparse graphs", "Guaranteed optimal"],
        disadvantages: ["Requires sorting all edges", "Not suitable for dense graphs"],
        relatedAlgorithms: ["Prim's Algorithm", "Borůvka's Algorithm"],
        difficulty: "Intermediate",
        tags: ["graph", "greedy", "mst", "union-find"],
        visualizationType: "graph-mst",
        researchReferences: ["Joseph Kruskal (1956)"],
        yearIntroduced: 1956,
        inventor: "Joseph Kruskal",
      },
      // String Algorithms
      {
        name: "Knuth-Morris-Pratt (KMP)",
        slug: "kmp",
        category: "String Matching",
        domain: "Data Structures & Algorithms",
        description: "Efficient pattern matching algorithm using failure function",
        intuition: "Preprocess pattern to avoid redundant comparisons when mismatch occurs",
        pseudocode: `function KMP(text, pattern):
    lps = compute_lps(pattern)
    i = 0, j = 0
    while i < length(text):
        if pattern[j] == text[i]:
            i++, j++
        if j == length(pattern):
            return i - j
        elif i < length(text) and pattern[j] != text[i]:
            if j != 0:
                j = lps[j - 1]
            else:
                i++
    return -1`,
        implementation: `function kmp(text, pattern) {
  const lps = computeLPS(pattern);
  let i = 0, j = 0;
  const matches = [];

  while (i < text.length) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
    }

    if (j === pattern.length) {
      matches.push(i - j);
      j = lps[j - 1];
    } else if (i < text.length && pattern[j] !== text[i]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }

  return matches;
}

function computeLPS(pattern) {
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
}`,
        language: "JavaScript",
        timeComplexity: { best: "O(n + m)", average: "O(n + m)", worst: "O(n + m)" },
        spaceComplexity: "O(m)",
        applications: ["Text editors", "DNA sequence matching", "Plagiarism detection"],
        advantages: ["Linear time complexity", "No backtracking", "Efficient for large texts"],
        disadvantages: ["Extra preprocessing needed", "More complex than naive approach"],
        relatedAlgorithms: ["Boyer-Moore", "Rabin-Karp", "Aho-Corasick"],
        difficulty: "Intermediate",
        tags: ["string", "pattern-matching", "preprocessing"],
        visualizationType: "string-matching",
        researchReferences: ["Knuth, Morris, Pratt (1977)"],
        yearIntroduced: 1977,
        inventor: "Knuth, Morris, Pratt",
      },
    ];

    // Continue adding more algorithms...
    const algorithmIds: Array<string> = [];
    for (const algo of algorithmData) {
      const id = await ctx.db.insert("algorithms", algo);
      algorithmIds.push(id);
    }

    return { message: `Seeded ${algorithmIds.length} algorithms successfully` };
  },
});

export const getAllAlgorithms = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("algorithms").take(300);
  },
});

export const getAlgorithmsByDomain = query({
  args: { domain: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("algorithms")
      .withIndex("by_domain", (q) => q.eq("domain", args.domain))
      .take(300);
  },
});

export const getAlgorithmBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("algorithms")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const getAlgorithmsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("algorithms")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .take(300);
  },
});

export const searchAlgorithms = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    const allAlgorithms = await ctx.db.query("algorithms").take(300);
    const searchLower = args.searchTerm.toLowerCase();

    return allAlgorithms.filter(algo =>
      algo.name.toLowerCase().includes(searchLower) ||
      algo.description.toLowerCase().includes(searchLower) ||
      algo.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  },
});
