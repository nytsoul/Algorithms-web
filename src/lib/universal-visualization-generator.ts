/**
 * Universal Visualization Generator for All 1000 Algorithms
 * Automatically generates step-by-step visualizations based on algorithm category and type
 */

export type VisualizationType = 
  | 'array'
  | 'bars'
  | 'matrix'
  | 'tree'
  | 'binary-tree'
  | 'graph'
  | 'linked-list'
  | 'stack'
  | 'queue'
  | 'heap'
  | 'hash-table'
  | 'geometric'
  | 'string'
  | 'network-flow'
  | 'trie'
  | 'segment-tree'
  | 'fenwick-tree'
  | 'grid'
  | 'recursion-tree'
  | 'state-machine';

export interface VisualizationConfig {
  type: VisualizationType;
  primaryType: VisualizationType;
  secondaryType?: VisualizationType;
  supportedModes: VisualizationType[];
  defaultData: any;
  colorScheme: {
    primary: string;
    secondary: string;
    highlight: string;
    success: string;
    error: string;
  };
  animationSpeed: number;
  showStepDescription: boolean;
  showPseudocode: boolean;
  showComplexityTracker: boolean;
}

export interface VisualizationStep {
  id: number;
  description: string;
  pseudocodeLine?: number;
  data: any;
  highlights: {
    indices?: number[];
    nodes?: string[];
    edges?: Array<{ from: string; to: string }>;
    cells?: Array<{ row: number; col: number }>;
  };
  action: 'compare' | 'swap' | 'insert' | 'delete' | 'visit' | 'mark' | 'update' | 'merge' | 'split' | 'complete';
  stats: {
    comparisons: number;
    swaps: number;
    operations: number;
  };
}

// Category to visualization type mapping
const CATEGORY_VISUALIZATION_MAP: Record<string, VisualizationType[]> = {
  // Searching
  'searching': ['array', 'bars', 'binary-tree'],
  'linear-search': ['array', 'bars'],
  'binary-search': ['array', 'bars', 'binary-tree'],
  'jump-search': ['array', 'bars'],
  'interpolation-search': ['array', 'bars'],
  'exponential-search': ['array', 'bars'],
  'fibonacci-search': ['array', 'bars'],
  'ternary-search': ['array', 'bars'],
  
  // Sorting
  'sorting': ['array', 'bars'],
  'bubble-sort': ['array', 'bars'],
  'selection-sort': ['array', 'bars'],
  'insertion-sort': ['array', 'bars'],
  'merge-sort': ['array', 'bars', 'recursion-tree'],
  'quick-sort': ['array', 'bars', 'recursion-tree'],
  'heap-sort': ['array', 'bars', 'heap'],
  'counting-sort': ['array', 'bars', 'hash-table'],
  'radix-sort': ['array', 'bars'],
  'bucket-sort': ['array', 'bars', 'hash-table'],
  'shell-sort': ['array', 'bars'],
  'tim-sort': ['array', 'bars'],
  'tree-sort': ['array', 'binary-tree'],
  
  // Graph
  'graph': ['graph'],
  'bfs': ['graph', 'queue'],
  'dfs': ['graph', 'stack'],
  'dijkstra': ['graph', 'heap'],
  'bellman-ford': ['graph', 'matrix'],
  'floyd-warshall': ['matrix', 'graph'],
  'kruskal': ['graph'],
  'prim': ['graph', 'heap'],
  'topological-sort': ['graph', 'stack'],
  
  // Tree
  'tree': ['binary-tree', 'tree'],
  'bst': ['binary-tree'],
  'avl': ['binary-tree'],
  'red-black': ['binary-tree'],
  'b-tree': ['tree'],
  'segment-tree': ['segment-tree', 'tree'],
  'fenwick-tree': ['fenwick-tree', 'array'],
  'trie': ['trie'],
  'binary-heap': ['heap', 'binary-tree'],
  
  // Dynamic Programming
  'dynamic-programming': ['matrix', 'array'],
  'dp': ['matrix', 'array'],
  'knapsack': ['matrix'],
  'lcs': ['matrix', 'string'],
  'lis': ['array', 'matrix'],
  'edit-distance': ['matrix', 'string'],
  'fibonacci': ['array', 'recursion-tree'],
  'coin-change': ['matrix', 'array'],
  'rod-cutting': ['matrix', 'array'],
  
  // String
  'string': ['string', 'array'],
  'kmp': ['string', 'array'],
  'rabin-karp': ['string', 'hash-table'],
  'z-algorithm': ['string', 'array'],
  'suffix-array': ['string', 'array'],
  'manacher': ['string'],
  
  // Linked List
  'linked-list': ['linked-list'],
  'doubly-linked-list': ['linked-list'],
  'circular-linked-list': ['linked-list'],
  
  // Stack & Queue
  'stack': ['stack', 'array'],
  'queue': ['queue', 'array'],
  'deque': ['queue'],
  'priority-queue': ['heap'],
  
  // Hash
  'hashing': ['hash-table'],
  'hash-table': ['hash-table'],
  
  // Geometric
  'geometric': ['geometric'],
  'convex-hull': ['geometric'],
  'closest-pair': ['geometric'],
  'line-intersection': ['geometric'],
  
  // Network Flow
  'network-flow': ['network-flow', 'graph'],
  'ford-fulkerson': ['network-flow'],
  'max-flow': ['network-flow'],
  
  // Backtracking
  'backtracking': ['grid', 'recursion-tree'],
  'n-queens': ['grid'],
  'sudoku': ['grid'],
  'maze': ['grid'],
  
  // Divide and Conquer
  'divide-and-conquer': ['recursion-tree', 'array'],
  'karatsuba': ['recursion-tree'],
  'strassen': ['matrix', 'recursion-tree'],
  
  // Greedy
  'greedy': ['array', 'graph'],
  'activity-selection': ['array', 'bars'],
  'huffman': ['binary-tree'],
  'fractional-knapsack': ['array', 'bars'],
};

/**
 * Get visualization types for an algorithm
 */
export function getVisualizationTypes(slug: string, category: string): VisualizationType[] {
  // Check specific algorithm first
  if (CATEGORY_VISUALIZATION_MAP[slug]) {
    return CATEGORY_VISUALIZATION_MAP[slug];
  }
  
  // Check category-based mapping
  const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-');
  if (CATEGORY_VISUALIZATION_MAP[normalizedCategory]) {
    return CATEGORY_VISUALIZATION_MAP[normalizedCategory];
  }
  
  // Infer from algorithm name
  const slugLower = slug.toLowerCase();
  
  if (slugLower.includes('sort')) return ['array', 'bars'];
  if (slugLower.includes('search')) return ['array', 'bars'];
  if (slugLower.includes('tree')) return ['binary-tree', 'tree'];
  if (slugLower.includes('graph') || slugLower.includes('path')) return ['graph'];
  if (slugLower.includes('matrix')) return ['matrix'];
  if (slugLower.includes('string') || slugLower.includes('pattern')) return ['string'];
  if (slugLower.includes('linked') || slugLower.includes('list')) return ['linked-list'];
  if (slugLower.includes('stack')) return ['stack'];
  if (slugLower.includes('queue')) return ['queue'];
  if (slugLower.includes('heap')) return ['heap'];
  if (slugLower.includes('hash')) return ['hash-table'];
  if (slugLower.includes('dp') || slugLower.includes('dynamic')) return ['matrix', 'array'];
  if (slugLower.includes('geometric') || slugLower.includes('point')) return ['geometric'];
  if (slugLower.includes('trie')) return ['trie'];
  
  // Default to array visualization
  return ['array', 'bars'];
}

/**
 * Get default visualization configuration for an algorithm
 */
export function getVisualizationConfig(slug: string, category: string): VisualizationConfig {
  const types = getVisualizationTypes(slug, category);
  const primaryType = types[0];
  
  return {
    type: primaryType,
    primaryType: primaryType,
    secondaryType: types[1],
    supportedModes: types,
    defaultData: getDefaultData(primaryType),
    colorScheme: {
      primary: 'var(--neon-cyan)',
      secondary: 'var(--neon-purple)',
      highlight: 'var(--neon-pink)',
      success: '#22c55e',
      error: '#ef4444'
    },
    animationSpeed: 1,
    showStepDescription: true,
    showPseudocode: true,
    showComplexityTracker: true
  };
}

function getDefaultData(type: VisualizationType): any {
  switch (type) {
    case 'array':
    case 'bars':
      return { array: [64, 34, 25, 12, 22, 11, 90, 45, 78, 33] };
    
    case 'matrix':
      return {
        matrix: [
          [0, 5, Infinity, 10],
          [Infinity, 0, 3, Infinity],
          [Infinity, Infinity, 0, 1],
          [Infinity, Infinity, Infinity, 0]
        ]
      };
    
    case 'binary-tree':
    case 'tree':
      return {
        nodes: [
          { id: '50', value: 50, x: 200, y: 50 },
          { id: '30', value: 30, x: 100, y: 120 },
          { id: '70', value: 70, x: 300, y: 120 },
          { id: '20', value: 20, x: 50, y: 190 },
          { id: '40', value: 40, x: 150, y: 190 },
          { id: '60', value: 60, x: 250, y: 190 },
          { id: '80', value: 80, x: 350, y: 190 }
        ],
        edges: [
          { from: '50', to: '30' },
          { from: '50', to: '70' },
          { from: '30', to: '20' },
          { from: '30', to: '40' },
          { from: '70', to: '60' },
          { from: '70', to: '80' }
        ]
      };
    
    case 'graph':
      return {
        nodes: [
          { id: '0', label: 'A', x: 100, y: 100 },
          { id: '1', label: 'B', x: 250, y: 50 },
          { id: '2', label: 'C', x: 400, y: 100 },
          { id: '3', label: 'D', x: 250, y: 200 },
          { id: '4', label: 'E', x: 100, y: 250 },
          { id: '5', label: 'F', x: 400, y: 250 }
        ],
        edges: [
          { from: '0', to: '1', weight: 4 },
          { from: '0', to: '3', weight: 2 },
          { from: '1', to: '2', weight: 3 },
          { from: '1', to: '3', weight: 1 },
          { from: '2', to: '5', weight: 2 },
          { from: '3', to: '4', weight: 5 },
          { from: '3', to: '5', weight: 4 },
          { from: '4', to: '5', weight: 3 }
        ]
      };
    
    case 'linked-list':
      return {
        nodes: [
          { id: '1', value: 10, next: '2' },
          { id: '2', value: 20, next: '3' },
          { id: '3', value: 30, next: '4' },
          { id: '4', value: 40, next: '5' },
          { id: '5', value: 50, next: null }
        ]
      };
    
    case 'stack':
      return { elements: [10, 20, 30, 40, 50] };
    
    case 'queue':
      return { elements: [10, 20, 30, 40, 50] };
    
    case 'heap':
      return { 
        array: [90, 80, 70, 50, 60, 40, 30, 20, 10],
        type: 'max'
      };
    
    case 'hash-table':
      return {
        size: 10,
        entries: [
          { key: 'apple', value: 1, hash: 5 },
          { key: 'banana', value: 2, hash: 3 },
          { key: 'cherry', value: 3, hash: 7 }
        ]
      };
    
    case 'string':
      return { text: 'ABABDABACDABABCABAB', pattern: 'ABABCABAB' };
    
    case 'geometric':
      return {
        points: [
          { x: 50, y: 150 },
          { x: 100, y: 50 },
          { x: 200, y: 100 },
          { x: 250, y: 200 },
          { x: 150, y: 250 },
          { x: 300, y: 50 }
        ]
      };
    
    case 'grid':
      return {
        rows: 8,
        cols: 8,
        cells: Array(8).fill(null).map(() => Array(8).fill(0))
      };
    
    case 'trie':
      return {
        words: ['apple', 'app', 'application', 'banana', 'band']
      };
    
    case 'segment-tree':
    case 'fenwick-tree':
      return { array: [1, 3, 5, 7, 9, 11, 13, 15] };
    
    case 'network-flow':
      return {
        nodes: [
          { id: 's', label: 'Source', x: 50, y: 150 },
          { id: '1', label: '1', x: 150, y: 80 },
          { id: '2', label: '2', x: 150, y: 220 },
          { id: '3', label: '3', x: 300, y: 80 },
          { id: '4', label: '4', x: 300, y: 220 },
          { id: 't', label: 'Sink', x: 400, y: 150 }
        ],
        edges: [
          { from: 's', to: '1', capacity: 10, flow: 0 },
          { from: 's', to: '2', capacity: 8, flow: 0 },
          { from: '1', to: '3', capacity: 5, flow: 0 },
          { from: '1', to: '2', capacity: 2, flow: 0 },
          { from: '2', to: '4', capacity: 10, flow: 0 },
          { from: '3', to: 't', capacity: 7, flow: 0 },
          { from: '3', to: '4', capacity: 8, flow: 0 },
          { from: '4', to: 't', capacity: 10, flow: 0 }
        ]
      };
    
    case 'recursion-tree':
      return { n: 5, function: 'fibonacci' };
    
    case 'state-machine':
      return {
        states: ['q0', 'q1', 'q2', 'q3'],
        transitions: [
          { from: 'q0', to: 'q1', symbol: 'a' },
          { from: 'q1', to: 'q2', symbol: 'b' },
          { from: 'q2', to: 'q0', symbol: 'a' },
          { from: 'q2', to: 'q3', symbol: 'b' }
        ],
        initial: 'q0',
        final: ['q3']
      };
    
    default:
      return { array: [64, 34, 25, 12, 22, 11, 90] };
  }
}

/**
 * Generate visualization steps for any algorithm
 */
export function generateVisualizationSteps(
  algorithmSlug: string,
  category: string,
  inputData: any
): VisualizationStep[] {
  const types = getVisualizationTypes(algorithmSlug, category);
  const primaryType = types[0];
  
  switch (primaryType) {
    case 'array':
    case 'bars':
      return generateArraySteps(algorithmSlug, inputData.array || []);
    case 'matrix':
      return generateMatrixSteps(algorithmSlug, inputData.matrix || []);
    case 'binary-tree':
    case 'tree':
      return generateTreeSteps(algorithmSlug, inputData);
    case 'graph':
      return generateGraphSteps(algorithmSlug, inputData);
    case 'linked-list':
      return generateLinkedListSteps(algorithmSlug, inputData);
    case 'string':
      return generateStringSteps(algorithmSlug, inputData);
    default:
      return generateDefaultSteps(algorithmSlug, inputData);
  }
}

// Step generators for different visualization types
function generateArraySteps(slug: string, array: number[]): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;
  let stepId = 0;
  
  // Detect algorithm type and generate appropriate steps
  if (slug.includes('bubble')) {
    // Bubble Sort
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        comparisons++;
        steps.push({
          id: stepId++,
          description: `Comparing arr[${j}]=${arr[j]} with arr[${j + 1}]=${arr[j + 1]}`,
          data: { array: [...arr], comparisons, swaps },
          highlights: { indices: [j, j + 1] },
          action: 'compare',
          stats: { comparisons, swaps, operations: comparisons + swaps }
        });
        
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swaps++;
          steps.push({
            id: stepId++,
            description: `Swapping arr[${j}]=${arr[j + 1]} with arr[${j + 1}]=${arr[j]}`,
            data: { array: [...arr], comparisons, swaps },
            highlights: { indices: [j, j + 1] },
            action: 'swap',
            stats: { comparisons, swaps, operations: comparisons + swaps }
          });
        }
      }
    }
  } else if (slug.includes('selection')) {
    // Selection Sort
    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;
      steps.push({
        id: stepId++,
        description: `Starting pass ${i + 1}: Finding minimum from index ${i} to ${arr.length - 1}`,
        data: { array: [...arr], comparisons, swaps },
        highlights: { indices: [i] },
        action: 'mark',
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });
      
      for (let j = i + 1; j < arr.length; j++) {
        comparisons++;
        steps.push({
          id: stepId++,
          description: `Comparing arr[${j}]=${arr[j]} with current min arr[${minIdx}]=${arr[minIdx]}`,
          data: { array: [...arr], comparisons, swaps },
          highlights: { indices: [j, minIdx] },
          action: 'compare',
          stats: { comparisons, swaps, operations: comparisons + swaps }
        });
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        swaps++;
        steps.push({
          id: stepId++,
          description: `Swapping arr[${i}]=${arr[minIdx]} with minimum arr[${minIdx}]=${arr[i]}`,
          data: { array: [...arr], comparisons, swaps },
          highlights: { indices: [i, minIdx] },
          action: 'swap',
          stats: { comparisons, swaps, operations: comparisons + swaps }
        });
      }
    }
  } else if (slug.includes('insertion')) {
    // Insertion Sort
    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;
      
      steps.push({
        id: stepId++,
        description: `Taking key = arr[${i}] = ${key}`,
        data: { array: [...arr], comparisons, swaps },
        highlights: { indices: [i] },
        action: 'mark',
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });
      
      while (j >= 0 && arr[j] > key) {
        comparisons++;
        arr[j + 1] = arr[j];
        swaps++;
        steps.push({
          id: stepId++,
          description: `arr[${j}]=${arr[j]} > ${key}, shifting right`,
          data: { array: [...arr], comparisons, swaps },
          highlights: { indices: [j, j + 1] },
          action: 'swap',
          stats: { comparisons, swaps, operations: comparisons + swaps }
        });
        j--;
      }
      arr[j + 1] = key;
      steps.push({
        id: stepId++,
        description: `Inserting ${key} at position ${j + 1}`,
        data: { array: [...arr], comparisons, swaps },
        highlights: { indices: [j + 1] },
        action: 'insert',
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });
    }
  } else if (slug.includes('merge') && slug.includes('sort')) {
    // Merge Sort - simplified visualization
    const sortedIndices: number[] = [];
    
    function mergeSteps(left: number, right: number): void {
      if (left >= right) {
        sortedIndices.push(left);
        return;
      }
      
      const mid = Math.floor((left + right) / 2);
      
      steps.push({
        id: stepId++,
        description: `Dividing array from index ${left} to ${right} (mid = ${mid})`,
        data: { array: [...arr], comparisons, swaps },
        highlights: { indices: Array.from({ length: right - left + 1 }, (_, i) => left + i) },
        action: 'split',
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });
      
      mergeSteps(left, mid);
      mergeSteps(mid + 1, right);
      
      // Merge process
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);
      let i = 0, j = 0, k = left;
      
      while (i < leftArr.length && j < rightArr.length) {
        comparisons++;
        if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i];
          i++;
        } else {
          arr[k] = rightArr[j];
          j++;
        }
        k++;
      }
      
      while (i < leftArr.length) {
        arr[k] = leftArr[i];
        i++;
        k++;
      }
      
      while (j < rightArr.length) {
        arr[k] = rightArr[j];
        j++;
        k++;
      }
      
      steps.push({
        id: stepId++,
        description: `Merged subarrays from index ${left} to ${right}`,
        data: { array: [...arr], comparisons, swaps },
        highlights: { indices: Array.from({ length: right - left + 1 }, (_, i) => left + i) },
        action: 'merge',
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });
    }
    
    mergeSteps(0, arr.length - 1);
  } else if (slug.includes('quick') && slug.includes('sort')) {
    // Quick Sort
    function quickSteps(low: number, high: number): void {
      if (low >= high) return;
      
      const pivot = arr[high];
      steps.push({
        id: stepId++,
        description: `Choosing pivot = ${pivot} at index ${high}`,
        data: { array: [...arr], comparisons, swaps },
        highlights: { indices: [high] },
        action: 'mark',
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });
      
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        comparisons++;
        steps.push({
          id: stepId++,
          description: `Comparing arr[${j}]=${arr[j]} with pivot ${pivot}`,
          data: { array: [...arr], comparisons, swaps },
          highlights: { indices: [j, high] },
          action: 'compare',
          stats: { comparisons, swaps, operations: comparisons + swaps }
        });
        
        if (arr[j] < pivot) {
          i++;
          if (i !== j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            swaps++;
            steps.push({
              id: stepId++,
              description: `Swapping arr[${i}]=${arr[j]} with arr[${j}]=${arr[i]}`,
              data: { array: [...arr], comparisons, swaps },
              highlights: { indices: [i, j] },
              action: 'swap',
              stats: { comparisons, swaps, operations: comparisons + swaps }
            });
          }
        }
      }
      
      // Place pivot in correct position
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      swaps++;
      steps.push({
        id: stepId++,
        description: `Placing pivot ${pivot} at index ${i + 1}`,
        data: { array: [...arr], comparisons, swaps },
        highlights: { indices: [i + 1] },
        action: 'swap',
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });
      
      const pi = i + 1;
      quickSteps(low, pi - 1);
      quickSteps(pi + 1, high);
    }
    
    quickSteps(0, arr.length - 1);
  } else if (slug.includes('heap') && slug.includes('sort')) {
    // Heap Sort
    function heapify(n: number, i: number): void {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      
      if (left < n) {
        comparisons++;
        if (arr[left] > arr[largest]) {
          largest = left;
        }
      }
      
      if (right < n) {
        comparisons++;
        if (arr[right] > arr[largest]) {
          largest = right;
        }
      }
      
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        swaps++;
        steps.push({
          id: stepId++,
          description: `Heapify: Swapping arr[${i}]=${arr[largest]} with arr[${largest}]=${arr[i]}`,
          data: { array: [...arr], comparisons, swaps },
          highlights: { indices: [i, largest] },
          action: 'swap',
          stats: { comparisons, swaps, operations: comparisons + swaps }
        });
        heapify(n, largest);
      }
    }
    
    // Build max heap
    steps.push({
      id: stepId++,
      description: 'Building max heap from array',
      data: { array: [...arr], comparisons, swaps },
      highlights: { indices: [] },
      action: 'mark',
      stats: { comparisons, swaps, operations: comparisons + swaps }
    });
    
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      heapify(arr.length, i);
    }
    
    // Extract elements from heap
    for (let i = arr.length - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      swaps++;
      steps.push({
        id: stepId++,
        description: `Extracting max ${arr[i]}, placing at index ${i}`,
        data: { array: [...arr], comparisons, swaps, sortedIndices: Array.from({ length: arr.length - i }, (_, j) => arr.length - 1 - j) },
        highlights: { indices: [0, i] },
        action: 'swap',
        stats: { comparisons, swaps, operations: comparisons + swaps }
      });
      heapify(i, 0);
    }
  } else if (slug.includes('linear') && slug.includes('search')) {
    // Linear Search
    const target = arr[Math.floor(arr.length / 2)]; // Use middle as target
    for (let i = 0; i < arr.length; i++) {
      comparisons++;
      steps.push({
        id: stepId++,
        description: `Checking arr[${i}]=${arr[i]} == ${target}?`,
        data: { array: [...arr], target, comparisons },
        highlights: { indices: [i] },
        action: 'compare',
        stats: { comparisons, swaps: 0, operations: comparisons }
      });
      if (arr[i] === target) {
        steps.push({
          id: stepId++,
          description: `Found ${target} at index ${i}!`,
          data: { array: [...arr], target, comparisons, found: true, foundIndex: i },
          highlights: { indices: [i] },
          action: 'complete',
          stats: { comparisons, swaps: 0, operations: comparisons }
        });
        break;
      }
    }
  } else if (slug.includes('binary') && slug.includes('search')) {
    // Binary Search
    const sorted = [...arr].sort((a, b) => a - b);
    const target = sorted[Math.floor(sorted.length / 2)];
    let left = 0, right = sorted.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      comparisons++;
      steps.push({
        id: stepId++,
        description: `Checking middle: arr[${mid}]=${sorted[mid]}, target=${target}`,
        data: { array: sorted, target, left, right, mid, comparisons },
        highlights: { indices: [mid, left, right] },
        action: 'compare',
        stats: { comparisons, swaps: 0, operations: comparisons }
      });
      
      if (sorted[mid] === target) {
        steps.push({
          id: stepId++,
          description: `Found ${target} at index ${mid}!`,
          data: { array: sorted, target, found: true, foundIndex: mid, comparisons },
          highlights: { indices: [mid] },
          action: 'complete',
          stats: { comparisons, swaps: 0, operations: comparisons }
        });
        break;
      } else if (sorted[mid] < target) {
        left = mid + 1;
        steps.push({
          id: stepId++,
          description: `${sorted[mid]} < ${target}, searching right half`,
          data: { array: sorted, target, left, right: right, mid, comparisons },
          highlights: { indices: Array.from({ length: right - mid }, (_, i) => mid + 1 + i) },
          action: 'mark',
          stats: { comparisons, swaps: 0, operations: comparisons }
        });
      } else {
        right = mid - 1;
        steps.push({
          id: stepId++,
          description: `${sorted[mid]} > ${target}, searching left half`,
          data: { array: sorted, target, left, right: right, mid, comparisons },
          highlights: { indices: Array.from({ length: mid - left }, (_, i) => left + i) },
          action: 'mark',
          stats: { comparisons, swaps: 0, operations: comparisons }
        });
      }
    }
  } else {
    // Default array operation visualization
    for (let i = 0; i < arr.length; i++) {
      steps.push({
        id: stepId++,
        description: `Processing element at index ${i}: ${arr[i]}`,
        data: { array: [...arr] },
        highlights: { indices: [i] },
        action: 'visit',
        stats: { comparisons: i, swaps: 0, operations: i }
      });
    }
  }
  
  // Add completion step
  steps.push({
    id: stepId,
    description: 'Algorithm completed!',
    data: { array: [...arr], comparisons, swaps },
    highlights: { indices: arr.map((_, i) => i) },
    action: 'complete',
    stats: { comparisons, swaps, operations: comparisons + swaps }
  });
  
  return steps;
}

function generateMatrixSteps(slug: string, matrix: number[][]): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  const m = matrix.map(row => [...row]);
  let stepId = 0;
  
  // Floyd-Warshall style step generation
  if (slug.includes('floyd') || slug.includes('warshall')) {
    const n = m.length;
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (m[i][k] !== Infinity && m[k][j] !== Infinity) {
            const newDist = m[i][k] + m[k][j];
            if (newDist < m[i][j]) {
              m[i][j] = newDist;
              steps.push({
                id: stepId++,
                description: `Using vertex ${k} as intermediate: d[${i}][${j}] = min(${m[i][j]}, ${m[i][k]} + ${m[k][j]}) = ${newDist}`,
                data: { matrix: m.map(row => [...row]) },
                highlights: { cells: [{ row: i, col: j }, { row: i, col: k }, { row: k, col: j }] },
                action: 'update',
                stats: { comparisons: stepId, swaps: 0, operations: stepId }
              });
            }
          }
        }
      }
    }
  } else {
    // Default DP matrix fill
    for (let i = 0; i < m.length; i++) {
      for (let j = 0; j < m[0].length; j++) {
        steps.push({
          id: stepId++,
          description: `Processing cell [${i}][${j}] = ${m[i][j]}`,
          data: { matrix: m.map(row => [...row]) },
          highlights: { cells: [{ row: i, col: j }] },
          action: 'visit',
          stats: { comparisons: stepId, swaps: 0, operations: stepId }
        });
      }
    }
  }
  
  return steps;
}

function generateTreeSteps(slug: string, data: any): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  // Tree traversal steps
  const nodes = data.nodes || [];
  
  nodes.forEach((node: any, idx: number) => {
    steps.push({
      id: idx,
      description: `Visiting node ${node.value || node.id}`,
      data: { nodes, currentNode: node.id },
      highlights: { nodes: [node.id] },
      action: 'visit',
      stats: { comparisons: idx, swaps: 0, operations: idx }
    });
  });
  
  return steps;
}

function generateGraphSteps(slug: string, data: any): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  const nodes = data.nodes || [];
  const edges = data.edges || [];
  let stepId = 0;
  
  // Build adjacency list
  const adjList: Record<string, string[]> = {};
  nodes.forEach((node: any) => {
    adjList[node.id] = [];
  });
  edges.forEach((edge: any) => {
    if (adjList[edge.from]) {
      adjList[edge.from].push(edge.to);
    }
    // For undirected graphs
    if (adjList[edge.to] && !edge.directed) {
      adjList[edge.to].push(edge.from);
    }
  });
  
  const visited: Set<string> = new Set();
  const visitOrder: string[] = [];
  
  if (slug.includes('bfs') || slug.includes('breadth')) {
    // BFS Implementation
    const startNode = nodes[0]?.id;
    if (!startNode) return steps;
    
    const queue: string[] = [startNode];
    visited.add(startNode);
    
    steps.push({
      id: stepId++,
      description: `Starting BFS from node ${startNode}`,
      data: { nodes, edges, visitedNodes: [startNode], queue: [...queue] },
      highlights: { nodes: [startNode] },
      action: 'mark',
      stats: { comparisons: 0, swaps: 0, operations: 1 }
    });
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      visitOrder.push(current);
      
      steps.push({
        id: stepId++,
        description: `Dequeue and visit node ${current}`,
        data: { nodes, edges, visitedNodes: [...visitOrder], queue: [...queue], currentNode: current },
        highlights: { nodes: [current] },
        action: 'visit',
        stats: { comparisons: stepId, swaps: 0, operations: stepId }
      });
      
      const neighbors = adjList[current] || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          
          steps.push({
            id: stepId++,
            description: `Discovered neighbor ${neighbor}, adding to queue`,
            data: { nodes, edges, visitedNodes: [...visited], queue: [...queue], currentNode: current },
            highlights: { nodes: [neighbor], edges: [{ from: current, to: neighbor }] },
            action: 'mark',
            stats: { comparisons: stepId, swaps: 0, operations: stepId }
          });
        }
      }
    }
  } else if (slug.includes('dfs') || slug.includes('depth')) {
    // DFS Implementation
    const startNode = nodes[0]?.id;
    if (!startNode) return steps;
    
    const stack: string[] = [startNode];
    
    steps.push({
      id: stepId++,
      description: `Starting DFS from node ${startNode}`,
      data: { nodes, edges, visitedNodes: [], stack: [...stack] },
      highlights: { nodes: [startNode] },
      action: 'mark',
      stats: { comparisons: 0, swaps: 0, operations: 1 }
    });
    
    while (stack.length > 0) {
      const current = stack.pop()!;
      
      if (visited.has(current)) continue;
      
      visited.add(current);
      visitOrder.push(current);
      
      steps.push({
        id: stepId++,
        description: `Pop and visit node ${current}`,
        data: { nodes, edges, visitedNodes: [...visitOrder], stack: [...stack], currentNode: current },
        highlights: { nodes: [current] },
        action: 'visit',
        stats: { comparisons: stepId, swaps: 0, operations: stepId }
      });
      
      const neighbors = adjList[current] || [];
      for (const neighbor of [...neighbors].reverse()) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
          
          steps.push({
            id: stepId++,
            description: `Pushing neighbor ${neighbor} to stack`,
            data: { nodes, edges, visitedNodes: [...visited], stack: [...stack], currentNode: current },
            highlights: { nodes: [neighbor], edges: [{ from: current, to: neighbor }] },
            action: 'mark',
            stats: { comparisons: stepId, swaps: 0, operations: stepId }
          });
        }
      }
    }
  } else if (slug.includes('dijkstra')) {
    // Dijkstra's Algorithm
    const startNode = nodes[0]?.id;
    if (!startNode) return steps;
    
    const distances: Record<string, number> = {};
    const prev: Record<string, string | null> = {};
    const unvisited = new Set<string>();
    
    nodes.forEach((node: any) => {
      distances[node.id] = node.id === startNode ? 0 : Infinity;
      prev[node.id] = null;
      unvisited.add(node.id);
    });
    
    steps.push({
      id: stepId++,
      description: `Initializing Dijkstra from source ${startNode}`,
      data: { nodes, edges, distances: { ...distances }, visitedNodes: [] },
      highlights: { nodes: [startNode] },
      action: 'mark',
      stats: { comparisons: 0, swaps: 0, operations: 1 }
    });
    
    while (unvisited.size > 0) {
      // Find minimum distance node
      let minDist = Infinity;
      let minNode: string | null = null;
      
      unvisited.forEach(nodeId => {
        if (distances[nodeId] < minDist) {
          minDist = distances[nodeId];
          minNode = nodeId;
        }
      });
      
      if (!minNode || minDist === Infinity) break;
      
      unvisited.delete(minNode);
      visitOrder.push(minNode);
      
      steps.push({
        id: stepId++,
        description: `Processing node ${minNode} with distance ${minDist}`,
        data: { nodes, edges, distances: { ...distances }, visitedNodes: [...visitOrder], currentNode: minNode },
        highlights: { nodes: [minNode] },
        action: 'visit',
        stats: { comparisons: stepId, swaps: 0, operations: stepId }
      });
      
      // Update neighbors
      edges.forEach((edge: any) => {
        let neighbor: string | null = null;
        let weight = edge.weight || 1;
        
        if (edge.from === minNode && unvisited.has(edge.to)) {
          neighbor = edge.to;
        } else if (edge.to === minNode && unvisited.has(edge.from) && !edge.directed) {
          neighbor = edge.from;
        }
        
        if (neighbor) {
          const newDist = distances[minNode!] + weight;
          if (newDist < distances[neighbor]) {
            distances[neighbor] = newDist;
            prev[neighbor] = minNode;
            
            steps.push({
              id: stepId++,
              description: `Updated distance to ${neighbor}: ${newDist}`,
              data: { nodes, edges, distances: { ...distances }, visitedNodes: [...visitOrder], currentNode: minNode },
              highlights: { nodes: [neighbor], edges: [{ from: minNode!, to: neighbor }] },
              action: 'update',
              stats: { comparisons: stepId, swaps: 0, operations: stepId }
            });
          }
        }
      });
    }
  } else {
    // Default graph traversal
    nodes.forEach((node: any, idx: number) => {
      steps.push({
        id: idx,
        description: `Visiting node ${node.label || node.id}`,
        data: { nodes, edges, visitedNodes: nodes.slice(0, idx + 1).map((n: any) => n.id) },
        highlights: { nodes: [node.id] },
        action: 'visit',
        stats: { comparisons: idx, swaps: 0, operations: idx }
      });
    });
  }
  
  // Completion step
  steps.push({
    id: stepId,
    description: 'Graph traversal complete!',
    data: { nodes, edges, visitedNodes: visitOrder },
    highlights: { nodes: visitOrder },
    action: 'complete',
    stats: { comparisons: stepId, swaps: 0, operations: stepId }
  });
  
  return steps;
}

function generateLinkedListSteps(slug: string, data: any): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  const nodes = data.nodes || [];
  
  nodes.forEach((node: any, idx: number) => {
    steps.push({
      id: idx,
      description: `Traversing to node with value ${node.value}`,
      data: { nodes, current: node.id },
      highlights: { nodes: [node.id] },
      action: 'visit',
      stats: { comparisons: idx, swaps: 0, operations: idx }
    });
  });
  
  return steps;
}

function generateStringSteps(slug: string, data: any): VisualizationStep[] {
  const steps: VisualizationStep[] = [];
  const { text = '', pattern = '' } = data;
  
  for (let i = 0; i <= text.length - pattern.length; i++) {
    let match = true;
    for (let j = 0; j < pattern.length; j++) {
      steps.push({
        id: steps.length,
        description: `Comparing text[${i + j}]='${text[i + j]}' with pattern[${j}]='${pattern[j]}'`,
        data: { text, pattern, textIndex: i + j, patternIndex: j },
        highlights: { indices: [i + j] },
        action: 'compare',
        stats: { comparisons: steps.length, swaps: 0, operations: steps.length }
      });
      if (text[i + j] !== pattern[j]) {
        match = false;
        break;
      }
    }
    if (match) {
      steps.push({
        id: steps.length,
        description: `Pattern found at index ${i}!`,
        data: { text, pattern, foundAt: i },
        highlights: { indices: Array.from({ length: pattern.length }, (_, k) => i + k) },
        action: 'complete',
        stats: { comparisons: steps.length, swaps: 0, operations: steps.length }
      });
    }
  }
  
  return steps;
}

function generateDefaultSteps(slug: string, data: any): VisualizationStep[] {
  return [{
    id: 0,
    description: `Initializing ${slug} algorithm...`,
    data,
    highlights: {},
    action: 'visit',
    stats: { comparisons: 0, swaps: 0, operations: 0 }
  }, {
    id: 1,
    description: 'Algorithm execution complete',
    data,
    highlights: {},
    action: 'complete',
    stats: { comparisons: 1, swaps: 0, operations: 1 }
  }];
}

export default {
  getVisualizationTypes,
  getVisualizationConfig,
  generateVisualizationSteps
};
