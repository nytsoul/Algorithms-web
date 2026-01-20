// Algorithm data schema and types

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type VisualizationType = 'array' | 'graph' | 'tree' | 'table' | 'matrix' | 'bitwise' | 'custom';
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
