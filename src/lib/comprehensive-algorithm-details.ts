/**
 * Comprehensive Algorithm Detail Generator
 * Generates detailed information for all 1000 algorithms using intelligent templates
 */

import { Algorithm } from './algorithms-data';
import { AlgorithmDetailedInfo } from './algorithm-detailed-info';

// Complexity templates with recurrence relations
const COMPLEXITY_TEMPLATES = {
    'O(1)': {
        recurrence: 'T(n) = c',
        derivation: 'Constant time operation. No recurrence needed as the algorithm performs a fixed number of operations regardless of input size.',
    },
    'O(log n)': {
        recurrence: 'T(n) = T(n/2) + O(1)',
        derivation: 'Using Master Theorem: a=1, b=2, f(n)=O(1). Since log_b(a) = 0 and f(n) = O(1) = O(n^0), we have Case 2: T(n) = Θ(log n)',
    },
    'O(n)': {
        recurrence: 'T(n) = T(n-1) + O(1)',
        derivation: 'Linear recurrence: T(n) = T(n-1) + c = T(n-2) + 2c = ... = T(1) + (n-1)c = O(n)',
    },
    'O(n log n)': {
        recurrence: 'T(n) = 2T(n/2) + O(n)',
        derivation: 'Using Master Theorem: a=2, b=2, f(n)=O(n). Since log_b(a) = 1 and f(n) = O(n) = O(n^1), we have Case 2: T(n) = Θ(n log n)',
    },
    'O(n²)': {
        recurrence: 'T(n) = T(n-1) + O(n)',
        derivation: 'T(n) = T(n-1) + n = T(n-2) + (n-1) + n = ... = 1 + 2 + ... + n = n(n+1)/2 = O(n²)',
    },
    'O(2^n)': {
        recurrence: 'T(n) = 2T(n-1) + O(1)',
        derivation: 'T(n) = 2T(n-1) + c = 2(2T(n-2) + c) + c = 2²T(n-2) + 2c + c = ... = 2^n·T(0) + c(2^n - 1) = O(2^n)',
    },
    'O(n!)': {
        recurrence: 'T(n) = n·T(n-1) + O(1)',
        derivation: 'T(n) = n·T(n-1) = n·(n-1)·T(n-2) = ... = n! · T(0) = O(n!)',
    },
};

// Category-specific explanation templates
const CATEGORY_TEMPLATES = {
    Searching: {
        explanation: (name: string) =>
            `${name} is a searching algorithm used to locate a specific element within a data structure. It systematically examines elements to find the target value, returning its position if found or indicating its absence.`,
        howItWorks: (name: string, paradigm?: string) =>
            `${name} works by ${paradigm === 'Divide and Conquer' ? 'repeatedly dividing the search space in half, eliminating portions that cannot contain the target' : 'examining elements sequentially or using a specific search strategy'}. The algorithm maintains search boundaries and updates them based on comparisons with the target value until the element is found or the search space is exhausted.`,
    },
    Sorting: {
        explanation: (name: string) =>
            `${name} is a sorting algorithm that arranges elements in a specific order (ascending or descending). It reorganizes data by comparing and potentially swapping elements to achieve the desired sequence.`,
        howItWorks: (name: string, paradigm?: string) =>
            `${name} operates by ${paradigm === 'Divide and Conquer' ? 'recursively breaking down the array into smaller subarrays, sorting them, and merging the results' : paradigm === 'Comparison-based' ? 'comparing adjacent or selected elements and swapping them when they are in the wrong order' : 'distributing elements into buckets or counting occurrences'}. This process continues until the entire array is sorted.`,
    },
    'Dynamic Programming': {
        explanation: (name: string) =>
            `${name} is a dynamic programming algorithm that solves complex problems by breaking them into simpler overlapping subproblems. It stores solutions to subproblems to avoid redundant calculations, significantly improving efficiency.`,
        howItWorks: (name: string, paradigm?: string) =>
            `${name} works by identifying the optimal substructure and overlapping subproblems. It builds a table (bottom-up) or uses memoization (top-down) to store intermediate results. Each subproblem is solved once, and its solution is reused when needed, transforming exponential time complexity into polynomial time.`,
    },
    Greedy: {
        explanation: (name: string) =>
            `${name} is a greedy algorithm that makes locally optimal choices at each step with the hope of finding a global optimum. It selects the best immediate option without reconsidering previous choices.`,
        howItWorks: (name: string, paradigm?: string) =>
            `${name} works by iteratively making the choice that appears best at the current moment. At each decision point, it selects the option that maximizes (or minimizes) the objective function without looking ahead. The algorithm relies on the greedy choice property and optimal substructure to guarantee correctness.`,
    },
    Graph: {
        explanation: (name: string) =>
            `${name} is a graph algorithm that processes vertices and edges to solve problems related to connectivity, paths, or network properties. It explores the graph structure systematically.`,
        howItWorks: (name: string, paradigm?: string) =>
            `${name} works by ${paradigm === 'Graph' ? 'traversing the graph using a specific strategy (breadth-first or depth-first)' : 'analyzing graph properties and relationships'}. It maintains data structures to track visited nodes, distances, or other relevant information, updating them as it explores the graph.`,
    },
    Backtracking: {
        explanation: (name: string) =>
            `${name} is a backtracking algorithm that explores all possible solutions by building candidates incrementally and abandoning them as soon as it determines they cannot lead to a valid solution.`,
        howItWorks: (name: string, paradigm?: string) =>
            `${name} works by recursively building a solution one piece at a time. At each step, it makes a choice and recursively attempts to complete the solution. If a partial solution cannot be extended to a valid complete solution, the algorithm backtracks by undoing the last choice and trying an alternative.`,
    },
};

// Generate step-by-step working based on category
function generateStepByStep(category: string, name: string): string[] {
    const templates: Record<string, string[]> = {
        Searching: [
            'Initialize search boundaries (start and end indices)',
            'Compare target with current element',
            'Update search boundaries based on comparison',
            'Repeat until target is found or search space is empty',
            'Return result (index if found, -1 if not found)',
        ],
        Sorting: [
            'Examine the input array structure',
            'Select elements for comparison based on algorithm strategy',
            'Compare selected elements',
            'Swap or rearrange elements if needed',
            'Repeat until entire array is sorted',
            'Return sorted array',
        ],
        'Dynamic Programming': [
            'Identify base cases and initialize DP table',
            'Define state transition relation',
            'Fill DP table iteratively (bottom-up) or recursively (top-down)',
            'Use previously computed values to solve current subproblem',
            'Extract final solution from DP table',
        ],
        Greedy: [
            'Sort or prepare input data if needed',
            'Initialize solution set',
            'At each step, make locally optimal choice',
            'Add choice to solution set',
            'Repeat until problem is solved',
            'Return final solution',
        ],
        Graph: [
            'Initialize data structures (queue, stack, or priority queue)',
            'Mark starting vertex as visited',
            'Process current vertex',
            'Add unvisited neighbors to processing structure',
            'Repeat until all reachable vertices are processed',
            'Return result (path, distance, or graph property)',
        ],
    };

    return templates[category] || [
        'Understand the problem requirements',
        'Initialize necessary data structures',
        'Process input according to algorithm logic',
        'Update state based on algorithm rules',
        'Continue until termination condition is met',
        'Return final result',
    ];
}

// Generate real-world examples based on domain
function generateRealWorldExamples(domain: string, category: string): string[] {
    const examples: Record<string, string[]> = {
        DSA: [
            'Database query optimization and indexing',
            'Search engines finding relevant web pages',
            'Social media friend suggestions',
            'E-commerce product recommendations',
            'GPS navigation route finding',
        ],
        DAA: [
            'Compiler optimization techniques',
            'Network routing protocols',
            'Resource allocation in operating systems',
            'Task scheduling in project management',
            'Data compression algorithms',
        ],
        AI: [
            'Machine learning model training',
            'Neural network optimization',
            'Game playing AI (chess, Go)',
            'Natural language processing',
            'Computer vision object detection',
        ],
        ML: [
            'Predictive analytics in business',
            'Fraud detection in banking',
            'Medical diagnosis systems',
            'Recommendation systems (Netflix, Spotify)',
            'Autonomous vehicle decision making',
        ],
        Networks: [
            'Internet packet routing',
            'Load balancing in web servers',
            'Network congestion control',
            'DNS query resolution',
            'Content delivery networks (CDN)',
        ],
        Security: [
            'Encryption and decryption',
            'Password hashing and verification',
            'Digital signature verification',
            'Intrusion detection systems',
            'Blockchain consensus mechanisms',
        ],
    };

    return examples[domain] || [
        `${domain} optimization problems`,
        `${category} in real-world applications`,
        'Industry-standard implementations',
        'Academic research and development',
        'Production system deployments',
    ];
}

// Generate common pitfalls
function generateCommonPitfalls(category: string, complexity: string): string[] {
    const pitfalls: string[] = [];

    if (category === 'Searching' || category === 'Sorting') {
        pitfalls.push('Off-by-one errors in array indexing');
        pitfalls.push('Not handling empty array edge case');
    }

    if (complexity.includes('n²') || complexity.includes('2^n')) {
        pitfalls.push('Poor performance on large datasets');
        pitfalls.push('Not considering time complexity implications');
    }

    if (category === 'Dynamic Programming') {
        pitfalls.push('Incorrect base case initialization');
        pitfalls.push('Wrong state transition formula');
        pitfalls.push('Not handling overlapping subproblems correctly');
    }

    if (category === 'Greedy') {
        pitfalls.push('Assuming greedy choice always leads to optimal solution');
        pitfalls.push('Not verifying greedy choice property');
    }

    if (category === 'Graph') {
        pitfalls.push('Not handling disconnected graphs');
        pitfalls.push('Infinite loops in cyclic graphs');
        pitfalls.push('Not marking visited nodes');
    }

    pitfalls.push('Not considering edge cases and boundary conditions');
    pitfalls.push('Incorrect implementation of core logic');

    return pitfalls;
}

// Generate optimizations
function generateOptimizations(category: string, name: string): string[] {
    const optimizations: string[] = [];

    if (category === 'Sorting') {
        optimizations.push('Use hybrid approach for small subarrays');
        optimizations.push('Implement in-place sorting to reduce space complexity');
        optimizations.push('Add early termination for already sorted data');
    }

    if (category === 'Searching') {
        optimizations.push('Use binary search for sorted data');
        optimizations.push('Implement caching for frequently searched items');
        optimizations.push('Use hash tables for O(1) average lookup');
    }

    if (category === 'Dynamic Programming') {
        optimizations.push('Use space-optimized DP (rolling array technique)');
        optimizations.push('Implement memoization to avoid recomputation');
        optimizations.push('Use bottom-up approach to eliminate recursion overhead');
    }

    if (category === 'Graph') {
        optimizations.push('Use adjacency list for sparse graphs');
        optimizations.push('Implement bidirectional search for shortest path');
        optimizations.push('Use priority queue for better performance');
    }

    optimizations.push('Parallelize independent operations');
    optimizations.push('Use appropriate data structures for better performance');

    return optimizations;
}

/**
 * Main function to generate comprehensive detailed information for an algorithm
 */
export function generateComprehensiveDetails(algorithm: Algorithm): AlgorithmDetailedInfo {
    const category = algorithm.category || 'General';
    const paradigm = algorithm.paradigm;
    const name = algorithm.name;
    const domain = algorithm.domain || 'DSA';

    // Get category template or use default
    const template = CATEGORY_TEMPLATES[category as keyof typeof CATEGORY_TEMPLATES] || {
        explanation: (n: string) => `${n} is an algorithm that solves computational problems efficiently.`,
        howItWorks: (n: string) => `${n} processes input data according to specific rules and produces the desired output.`,
    };

    // Determine complexity for recurrence relation
    const avgComplexity = algorithm.timeComplexity?.average || 'O(n)';
    const complexityTemplate = COMPLEXITY_TEMPLATES[avgComplexity as keyof typeof COMPLEXITY_TEMPLATES];

    return {
        id: algorithm.id || algorithm._id || `algo-${algorithm.algorithmNumber}`,
        name: algorithm.name,
        slug: algorithm.slug,
        category,
        domain,
        difficulty: algorithm.difficulty,

        // Core explanations
        explanation: template.explanation(name),
        description: algorithm.description || `${name} efficiently solves problems in the ${category} domain.`,
        howItWorks: template.howItWorks(name, paradigm),

        // Complexity analysis
        timeComplexity: algorithm.timeComplexity || {
            best: 'O(1)',
            average: 'O(n)',
            worst: 'O(n)',
        },
        spaceComplexity: algorithm.spaceComplexity || 'O(1)',
        recurrenceRelation: complexityTemplate?.recurrence,
        complexityDerivation: complexityTemplate?.derivation,

        // Code and examples
        pseudocode: algorithm.pseudocode || `procedure ${name.replace(/\s+/g, '')}(input)\n    // Process input\n    return output\nend procedure`,
        dryRunExample: `Example execution of ${name} with sample input demonstrating the algorithm's step-by-step process.`,

        // Detailed information
        stepByStep: generateStepByStep(category, name),
        keyPoints: algorithm.keyPoints || [
            `${name} belongs to ${category} category`,
            `Time complexity: ${avgComplexity}`,
            `Space complexity: ${algorithm.spaceComplexity || 'O(1)'}`,
            `Difficulty level: ${algorithm.difficulty}`,
        ],

        // Practical information
        realWorldExamples: generateRealWorldExamples(domain, category),
        prerequisites: algorithm.prerequisites || ['Basic programming concepts', 'Data structures fundamentals'],
        relatedAlgorithms: algorithm.relatedAlgorithms || [],

        // Advantages and disadvantages
        advantages: algorithm.advantages || [
            'Solves specific problem efficiently',
            'Well-studied and documented',
            'Practical applications in industry',
        ],
        disadvantages: algorithm.disadvantages || [
            'May have limitations on certain inputs',
            'Trade-offs between time and space complexity',
        ],
        whenToUse: algorithm.useCases || [
            `When solving ${category.toLowerCase()} problems`,
            'When efficiency is important',
            'When the problem fits the algorithm\'s constraints',
        ],

        // Advanced information
        visualSteps: [
            'Visualize initial state',
            'Show algorithm progression step-by-step',
            'Highlight key decision points',
            'Display final result',
        ],
        commonPitfalls: generateCommonPitfalls(category, avgComplexity),
        optimizations: generateOptimizations(category, name),
    };
}

/**
 * Generate detailed information for all algorithms in a batch
 */
export function generateAllComprehensiveDetails(algorithms: Algorithm[]): Map<string, AlgorithmDetailedInfo> {
    const detailsMap = new Map<string, AlgorithmDetailedInfo>();

    algorithms.forEach(algorithm => {
        const details = generateComprehensiveDetails(algorithm);
        detailsMap.set(algorithm.slug, details);
    });

    return detailsMap;
}

/**
 * Get comprehensive details for a specific algorithm by slug
 */
export function getComprehensiveDetails(slug: string, algorithms: Algorithm[]): AlgorithmDetailedInfo | null {
    const algorithm = algorithms.find(a => a.slug === slug);
    if (!algorithm) return null;

    return generateComprehensiveDetails(algorithm);
}
