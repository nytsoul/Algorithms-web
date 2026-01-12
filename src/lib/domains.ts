export interface AlgorithmDomain {
    id: number;
    name: string;
    count: number;
    icon: string;
    description: string;
    color: string;
}

export const ALGORITHM_DOMAINS: AlgorithmDomain[] = [
    // Core DSA & DAA (1-11)
    { id: 1, name: "Searching Algorithms", count: 10, icon: "🔍", description: "Find elements in data structures", color: "cyan" },
    { id: 2, name: "Sorting Algorithms", count: 15, icon: "📊", description: "Arrange data in order", color: "pink" },
    { id: 3, name: "Divide and Conquer", count: 10, icon: "✂️", description: "Break problems into subproblems", color: "purple" },
    { id: 4, name: "Greedy Algorithms", count: 10, icon: "🎯", description: "Make locally optimal choices", color: "green" },
    { id: 5, name: "Dynamic Programming", count: 15, icon: "💎", description: "Solve overlapping subproblems", color: "blue" },
    { id: 6, name: "Backtracking", count: 10, icon: "🔙", description: "Explore all possibilities", color: "orange" },
    { id: 7, name: "Branch and Bound", count: 5, icon: "🌳", description: "Systematic enumeration", color: "yellow" },
    { id: 8, name: "Graph Algorithms", count: 10, icon: "🕸️", description: "Process graph structures", color: "red" },
    { id: 9, name: "String Algorithms", count: 5, icon: "📝", description: "Pattern matching and text processing", color: "teal" },
    { id: 10, name: "Bit Manipulation", count: 5, icon: "🔢", description: "Bitwise operations", color: "indigo" },
    { id: 11, name: "NP-Complete/Hard", count: 5, icon: "🧩", description: "Computationally hard problems", color: "rose" },

    // Advanced DSA (12-21)
    { id: 12, name: "Advanced Searching", count: 10, icon: "🔎", description: "Specialized search techniques", color: "cyan" },
    { id: 13, name: "Advanced Sorting", count: 10, icon: "📈", description: "Optimized sorting methods", color: "pink" },
    { id: 14, name: "Advanced Graph", count: 15, icon: "🌐", description: "Complex graph problems", color: "purple" },
    { id: 15, name: "Advanced DP", count: 15, icon: "💠", description: "Advanced DP techniques", color: "blue" },
    { id: 16, name: "Computational Geometry", count: 10, icon: "📐", description: "Geometric algorithms", color: "green" },
    { id: 17, name: "String Processing", count: 10, icon: "📄", description: "Advanced text algorithms", color: "teal" },
    { id: 18, name: "Randomized Algorithms", count: 10, icon: "🎲", description: "Probabilistic methods", color: "orange" },
    { id: 19, name: "Parallel & Distributed", count: 10, icon: "⚡", description: "Concurrent algorithms", color: "yellow" },
    { id: 20, name: "Cryptography", count: 10, icon: "🔐", description: "Security algorithms", color: "red" },
    { id: 21, name: "Tree Algorithms", count: 20, icon: "🌲", description: "Tree data structures", color: "green" },

    // Advanced Topics (22-40)
    { id: 22, name: "Advanced Graph Theory", count: 25, icon: "🕸️", description: "Graph theory research", color: "purple" },
    { id: 23, name: "Numerical & Math", count: 20, icon: "➗", description: "Mathematical algorithms", color: "blue" },
    { id: 24, name: "Optimization", count: 20, icon: "⚙️", description: "Optimization techniques", color: "orange" },
    { id: 25, name: "Artificial Intelligence", count: 25, icon: "🤖", description: "AI algorithms", color: "cyan" },
    { id: 26, name: "Machine Learning", count: 25, icon: "🧠", description: "ML algorithms", color: "pink" },
    { id: 27, name: "Operating Systems", count: 15, icon: "💻", description: "OS algorithms", color: "indigo" },
    { id: 28, name: "Database Algorithms", count: 15, icon: "🗄️", description: "Database operations", color: "teal" },
    { id: 29, name: "Networking", count: 15, icon: "🌐", description: "Network protocols", color: "blue" },
    { id: 30, name: "Compression & Graphics", count: 20, icon: "🎨", description: "Media algorithms", color: "purple" },
    { id: 31, name: "Real-Time Systems", count: 20, icon: "⏱️", description: "Real-time processing", color: "red" },
    { id: 32, name: "Compiler Design", count: 20, icon: "⚙️", description: "Compiler algorithms", color: "yellow" },
    { id: 33, name: "Approximation", count: 20, icon: "≈", description: "Approximation algorithms", color: "green" },
    { id: 34, name: "Online & Streaming", count: 20, icon: "📡", description: "Streaming algorithms", color: "cyan" },
    { id: 35, name: "Bioinformatics", count: 20, icon: "🧬", description: "Biological algorithms", color: "green" },
    { id: 36, name: "Computer Vision", count: 20, icon: "👁️", description: "Vision algorithms", color: "blue" },
    { id: 37, name: "Formal Methods", count: 20, icon: "📐", description: "Formal verification", color: "indigo" },
    { id: 38, name: "Distributed Storage", count: 20, icon: "💾", description: "Distributed systems", color: "teal" },
    { id: 39, name: "Robotics & Control", count: 20, icon: "🤖", description: "Robotics algorithms", color: "orange" },
    { id: 40, name: "Advanced Topics", count: 20, icon: "🎓", description: "Miscellaneous advanced", color: "purple" },

    // New Domains for 601-1000 (41-48)
    { id: 41, name: "Advanced Data Structures", count: 40, icon: "🏗️", description: "Persistent, dynamic structures", color: "cyan" },
    { id: 42, name: "Advanced Graph & Network", count: 50, icon: "🕸️", description: "Network flow, connectivity", color: "purple" },
    { id: 43, name: "Advanced DP & Optimization", count: 50, icon: "💎", description: "DP optimizations, game theory", color: "blue" },
    { id: 44, name: "Cryptography & Blockchain", count: 50, icon: "🔐", description: "Modern cryptography, blockchain", color: "red" },
    { id: 45, name: "Machine Learning & Deep Learning", count: 60, icon: "🧠", description: "Neural networks, optimization", color: "pink" },
    { id: 46, name: "Vision, NLP & Signal Processing", count: 50, icon: "👁️", description: "Computer vision, NLP", color: "green" },
    { id: 47, name: "Systems, Cloud & Performance", count: 50, icon: "☁️", description: "Cloud, distributed systems", color: "teal" },
    { id: 48, name: "Theory & Miscellaneous", count: 50, icon: "🎓", description: "Theoretical CS, game theory", color: "indigo" },
];

export function getDomainById(id: number): AlgorithmDomain | undefined {
    return ALGORITHM_DOMAINS.find(domain => domain.id === id);
}

export function getDomainsByCategory(category: string): AlgorithmDomain[] {
    const categories: Record<string, number[]> = {
        "DSA": [1, 2, 8, 9, 10, 21],
        "DAA": [3, 4, 5, 6, 7, 11, 15, 24, 33],
        "AI": [25, 45],
        "ML": [26, 45],
        "Networks": [29, 42, 47],
        "Security": [20, 44],
        "Systems": [27, 31, 38, 47],
        "Graphics": [30, 36, 46],
        "Optimization": [24, 43],
        "Emerging": [35, 39, 44, 45],
        "Theory": [11, 37, 48]
    };

    const domainIds = categories[category] || [];
    return ALGORITHM_DOMAINS.filter(d => domainIds.includes(d.id));
}

export const TOTAL_ALGORITHMS = ALGORITHM_DOMAINS.reduce((sum, domain) => sum + domain.count, 0);
