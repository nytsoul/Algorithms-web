// Algorithm data schema and types

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type VisualizationType = 'array' | 'graph' | 'tree' | 'table' | 'matrix' | 'bitwise' | 'custom' | 'network' | 'geometric';
export type AlgorithmCategory =
    | 'Searching'
    | 'Sorting'
    | 'Divide and Conquer'
    | 'Greedy'
    | 'Dynamic Programming'
    | 'Backtracking'
    | 'Branch and Bound'
    | 'Graph'
    | 'String'
    | 'Bit Manipulation'
    | 'NP-Complete';

export interface TimeComplexity {
    best: string;
    average: string;
    worst: string;
}

export interface CodeImplementation {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
}

export interface VisualizationStep {
    step: number;
    description: string;
    code?: string;
    highlight?: number[];
    variables?: Record<string, any>;
    array?: any[];
    graph?: any;
    tree?: any;
    table?: any[][];
    annotations?: string[];
    comparison?: { indices: number[]; result: boolean };
    swap?: { indices: number[] };
    sorted?: number[];
}

export interface AlgorithmData {
    id: string;
    name: string;
    slug: string;
    category: AlgorithmCategory;
    difficulty: DifficultyLevel;

    // Content
    definition: string;
    description: string;
    realWorldExample: string;

    // Categorization
    domain?: string;
    domainId?: number;
    algorithmNumber?: number;
    paradigm?: string;

    // Code
    pseudocode: string;
    implementations: CodeImplementation;
    implementation?: string; // Legacy support
    language?: string; // Legacy support
    intuition?: string; // Legacy support

    // Analysis
    timeComplexity: TimeComplexity;
    spaceComplexity: string;

    // Visualization
    visualizationType: VisualizationType;
    defaultInput?: any;

    // Learning
    prerequisites: string[];
    applications: string[];
    relatedAlgorithms: string[];

    // Tags
    tags: string[];
}

export interface VisualizationState {
    currentStep: number;
    totalSteps: number;
    isPlaying: boolean;
    speed: number; // 0.5x to 4x
    steps: VisualizationStep[];
    variables: Record<string, any>;
    metrics: {
        comparisons: number;
        swaps: number;
        operations: number;
    };
}

// Type guards and converters
export function normalizeCategoryToDifficultyLevel(value: any): DifficultyLevel {
    const validLevels: DifficultyLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    return validLevels.includes(value) ? value : 'Beginner';
}

export function normalizeCategoryToAlgorithmCategory(value: any): AlgorithmCategory {
    const categoryMap: Record<string, AlgorithmCategory> = {
        'searching': 'Searching',
        'sorting': 'Sorting',
        'divide and conquer': 'Divide and Conquer',
        'divide-and-conquer': 'Divide and Conquer',
        'greedy': 'Greedy',
        'dynamic programming': 'Dynamic Programming',
        'backtracking': 'Backtracking',
        'branch and bound': 'Branch and Bound',
        'graph': 'Graph',
        'string': 'String',
        'bit manipulation': 'Bit Manipulation',
        'np-complete': 'NP-Complete',
    };
    
    const normalized = (value || '').toLowerCase().trim();
    return categoryMap[normalized] || 'Searching';
}

export function normalizeVisualizationType(value: any): VisualizationType {
    const validTypes: VisualizationType[] = ['array', 'graph', 'tree', 'table', 'matrix', 'bitwise', 'custom', 'network', 'geometric'];
    return validTypes.includes(value) ? value : 'array';
}
