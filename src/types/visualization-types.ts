// ============================================
// VISUALIZATION TYPES & INTERFACES
// ============================================

export type AlgorithmCategory =
    | 'searching'
    | 'sorting'
    | 'dynamic-programming'
    | 'greedy'
    | 'divide-conquer'
    | 'graph'
    | 'backtracking';

export type VisualizationSpeed = 0.25 | 0.5 | 1 | 2 | 4;

export type AnimationState = 'idle' | 'playing' | 'paused' | 'completed';

// ============================================
// ALGORITHM STEP
// ============================================

export interface AlgorithmStep {
    id: string;
    description: string;
    highlightedIndices?: number[];
    comparedIndices?: number[];
    swappedIndices?: number[];
    sortedIndices?: number[];
    currentIndex?: number;
    data: any; // Algorithm-specific data
    codeLineNumbers?: number[]; // Lines to highlight in pseudocode
}

// ============================================
// VISUALIZATION STATE
// ============================================

export interface VisualizationState {
    steps: AlgorithmStep[];
    currentStepIndex: number;
    animationState: AnimationState;
    speed: VisualizationSpeed;
    autoPlay: boolean;
    input: any; // Original input data
    output?: any; // Final output
    stats: VisualizationStats;
}

export interface VisualizationStats {
    comparisons: number;
    swaps: number;
    arrayAccesses: number;
    spaceUsed: number;
    timeComplexity: string;
    spaceComplexity: string;
    customStats?: Record<string, number | string>;
}

// ============================================
// ANIMATION CONFIG
// ============================================

export interface AnimationConfig {
    duration: number; // milliseconds
    easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
    highlightColor: string;
    compareColor: string;
    swapColor: string;
    sortedColor: string;
}

// ============================================
// VISUALIZATION PROPS
// ============================================

export interface BaseVisualizationProps {
    algorithmName: string;
    category: AlgorithmCategory;
    description: string;
    pseudocode: string;
    onComplete?: () => void;
    onStepChange?: (step: AlgorithmStep) => void;
}

// ============================================
// SEARCHING ALGORITHM TYPES
// ============================================

export interface SearchingVisualizationProps extends BaseVisualizationProps {
    array: number[];
    target: number;
    searchType: 'linear' | 'binary' | 'jump' | 'interpolation' | 'exponential' | 'fibonacci' | 'ternary';
}

export interface SearchResult {
    found: boolean;
    index: number;
    comparisons: number;
    steps: AlgorithmStep[];
}

// ============================================
// SORTING ALGORITHM TYPES
// ============================================

export interface SortingVisualizationProps extends BaseVisualizationProps {
    array: number[];
    sortType:
    | 'bubble'
    | 'selection'
    | 'insertion'
    | 'merge'
    | 'quick'
    | 'heap'
    | 'counting'
    | 'radix'
    | 'bucket'
    | 'shell'
    | 'tim'
    | 'comb'
    | 'cycle'
    | 'tree'
    | 'odd-even';
}

export interface SortResult {
    sortedArray: number[];
    comparisons: number;
    swaps: number;
    steps: AlgorithmStep[];
}

// ============================================
// DYNAMIC PROGRAMMING TYPES
// ============================================

export interface DPVisualizationProps extends BaseVisualizationProps {
    problemType:
    | 'fibonacci'
    | 'knapsack-01'
    | 'knapsack-unbounded'
    | 'lcs'
    | 'lis'
    | 'matrix-chain'
    | 'edit-distance'
    | 'rod-cutting'
    | 'subset-sum'
    | 'partition';
    input: any; // Problem-specific input
}

export interface DPTableCell {
    value: number | string;
    formula?: string;
    dependencies?: { row: number; col: number }[];
}

export interface DPResult {
    table: DPTableCell[][];
    solution: any;
    steps: AlgorithmStep[];
}

// ============================================
// GRAPH ALGORITHM TYPES
// ============================================

export interface GraphNode {
    id: string;
    label: string;
    x: number;
    y: number;
    value?: number;
}

export interface GraphEdge {
    from: string;
    to: string;
    weight?: number;
    directed?: boolean;
    capacity?: number;
    flow?: number;
}

export interface GraphVisualizationProps extends BaseVisualizationProps {
    nodes: GraphNode[];
    edges: GraphEdge[];
    algorithmType:
    | 'dijkstra'
    | 'bellman-ford'
    | 'floyd-warshall'
    | 'kruskal'
    | 'prim'
    | 'bfs'
    | 'dfs';
    startNode?: string;
    endNode?: string;
}

// ============================================
// CONTROL PANEL TYPES
// ============================================

export interface ControlPanelProps {
    state: VisualizationState;
    onPlay: () => void;
    onPause: () => void;
    onReset: () => void;
    onStepForward: () => void;
    onStepBackward: () => void;
    onJumpToStep: (index: number) => void;
    onSpeedChange: (speed: VisualizationSpeed) => void;
}

// ============================================
// CODE HIGHLIGHTER TYPES
// ============================================

export interface CodeHighlighterProps {
    code: string;
    language: 'javascript' | 'python' | 'pseudocode';
    highlightedLines: number[];
    currentLine?: number;
}

// ============================================
// ARRAY DISPLAY TYPES
// ============================================

export interface ArrayDisplayProps {
    array: number[];
    highlightedIndices?: number[];
    comparedIndices?: number[];
    swappedIndices?: number[];
    sortedIndices?: number[];
    currentIndex?: number;
    showIndices?: boolean;
    showValues?: boolean;
    height?: number;
}

// ============================================
// TREE DISPLAY TYPES
// ============================================

export interface TreeNode {
    id: string;
    value: number | string;
    left?: TreeNode;
    right?: TreeNode;
    parent?: TreeNode;
}

export interface TreeDisplayProps {
    root: TreeNode | null;
    highlightedNodes?: string[];
    currentNode?: string;
    visitedNodes?: string[];
    nodeType?: 'binary' | 'bst' | 'avl' | 'heap';
}

// ============================================
// MATRIX DISPLAY TYPES
// ============================================

export interface MatrixDisplayProps {
    matrix: (number | string)[][];
    highlightedCells?: { row: number; col: number }[];
    currentCell?: { row: number; col: number };
    rowLabels?: string[];
    colLabels?: string[];
    title?: string;
    showFormulas?: boolean;
}
