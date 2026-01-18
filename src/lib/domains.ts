export interface AlgorithmDomain {
    id: number;
    name: string;
    count: number;
    icon: string;
    description: string;
    color: string;
}

export const ALGORITHM_DOMAINS: AlgorithmDomain[] = [
    // DSA (Data Structures & Algorithms) - Core Implementation Focus
    { id: 1, name: "Searching Algorithms", count: 123, icon: "🔍", description: "Linear, Binary, Jump, Interpolation, Hash-based searches", color: "cyan" },
    { id: 2, name: "Sorting Algorithms", count: 21, icon: "�", description: "Bubble, Merge, Quick, Heap, Counting, Radix sorts", color: "pink" },
    { id: 21, name: "Tree Algorithms", count: 31, icon: "🌲", description: "BST, AVL, Red-Black, B-Trees, Traversals", color: "green" },
    { id: 10, name: "Bit Manipulation", count: 21, icon: "�", description: "Bitwise operations, XOR tricks, Bit masking", color: "indigo" },
    
    // DAA (Design & Analysis of Algorithms) - Paradigms & Analysis
    { id: 3, name: "Divide and Conquer", count: 10, icon: "✂️", description: "Binary search, Merge sort, FFT, Matrix multiplication", color: "purple" },
    { id: 4, name: "Greedy Algorithms", count: 10, icon: "�", description: "Activity selection, Huffman, Kruskal, Prim, Dijkstra", color: "green" },
    { id: 5, name: "Dynamic Programming", count: 36, icon: "💎", description: "Knapsack, LCS, LIS, Matrix chain, Edit distance", color: "blue" },
    { id: 6, name: "Backtracking", count: 0, icon: "🔙", description: "N-Queens, Sudoku, Graph coloring, Hamiltonian", color: "orange" },
    { id: 7, name: "Branch and Bound", count: 37, icon: "🌳", description: "TSP, Job assignment, Number theory algorithms", color: "yellow" },
    { id: 8, name: "Graph Algorithms", count: 107, icon: "🕸️", description: "BFS, DFS, Shortest path, MST, Flow networks", color: "red" },
    { id: 9, name: "String Algorithms", count: 36, icon: "📝", description: "KMP, Rabin-Karp, Z-algorithm, Trie, Suffix trees", color: "teal" },
    { id: 11, name: "NP-Complete/Hard", count: 16, icon: "🧩", description: "TSP, Vertex cover, SAT, Subset sum", color: "rose" },
    
    // Advanced DSA Topics
    { id: 12, name: "Advanced Data Structures", count: 31, icon: "🏗️", description: "Segment trees, Fenwick trees, Persistent DS", color: "cyan" },
    { id: 13, name: "Advanced Sorting", count: 0, icon: "📈", description: "External sort, Parallel sorting", color: "pink" },
    { id: 14, name: "Advanced Graph", count: 0, icon: "🌐", description: "Max flow, Bipartite matching, Network design", color: "purple" },
    { id: 15, name: "Advanced DP", count: 0, icon: "💠", description: "DP optimization, Bitmask DP, Tree DP", color: "blue" },
    { id: 16, name: "Computational Geometry", count: 31, icon: "📐", description: "Convex hull, Line sweep, Voronoi diagrams", color: "green" },
    { id: 17, name: "String Processing", count: 0, icon: "📄", description: "Pattern matching, Compression", color: "teal" },
    { id: 18, name: "Randomized Algorithms", count: 26, icon: "🎲", description: "Monte Carlo, Las Vegas, Bloom filters", color: "orange" },
    { id: 19, name: "Parallel & Distributed", count: 31, icon: "⚡", description: "MapReduce, Consensus, Load balancing", color: "yellow" },
    { id: 20, name: "Cryptography", count: 52, icon: "🔐", description: "RSA, AES, SHA, Blockchain consensus", color: "red" },
    
    // AI (Artificial Intelligence)
    { id: 25, name: "Artificial Intelligence", count: 0, icon: "🤖", description: "Search, Planning, CSP, Knowledge representation", color: "cyan" },
    { id: 45, name: "AI Search & Planning", count: 50, icon: "�", description: "A*, Minimax, Alpha-beta, MCTS", color: "cyan" },
    
    // ML (Machine Learning)
    { id: 26, name: "Machine Learning", count: 46, icon: "🧠", description: "Supervised, Unsupervised, Reinforcement learning", color: "pink" },
    { id: 33, name: "Deep Learning & NLP", count: 51, icon: "🧠", description: "Neural networks, Transformers, Vision", color: "pink" },
    
    // Systems (OS, Distributed, Cloud)
    { id: 27, name: "Operating Systems", count: 0, icon: "💻", description: "Scheduling, Memory management, Deadlocks", color: "indigo" },
    { id: 28, name: "Database Algorithms", count: 31, icon: "🗄️", description: "Indexing, Query optimization, Transactions", color: "teal" },
    { id: 38, name: "Distributed Storage", count: 0, icon: "�", description: "Replication, Sharding, Consistency", color: "teal" },
    { id: 47, name: "Systems & Cloud", count: 50, icon: "☁️", description: "Load balancing, Caching, Auto-scaling", color: "teal" },
    
    // Networks
    { id: 29, name: "Networking", count: 0, icon: "🌐", description: "Routing, Flow control, Protocols", color: "blue" },
    { id: 36, name: "Network Algorithms", count: 51, icon: "🌐", description: "Routing, Congestion control, SDN", color: "blue" },
    
    // Graphics & Vision
    { id: 30, name: "Compression & Graphics", count: 0, icon: "🎨", description: "Rendering, Image processing", color: "purple" },
    { id: 34, name: "Computer Vision", count: 51, icon: "👁️", description: "Object detection, Image segmentation, OCR", color: "blue" },
    
    // Optimization
    { id: 24, name: "Optimization", count: 0, icon: "⚙️", description: "Linear programming, Gradient descent, Metaheuristics", color: "orange" },
    { id: 39, name: "Optimization Methods", count: 51, icon: "⚙️", description: "LP, Convex optimization, Genetic algorithms", color: "orange" },
    
    // Emerging Domains
    { id: 42, name: "Blockchain Algorithms", count: 51, icon: "�", description: "Consensus, Smart contracts, DeFi", color: "red" },
    { id: 35, name: "Bioinformatics", count: 0, icon: "🧬", description: "Sequence alignment, Phylogenetics", color: "green" },
    { id: 44, name: "Robotics Algorithms", count: 21, icon: "🤖", description: "Path planning, SLAM, Kinematics", color: "orange" },
    
    // Theory (Theoretical CS)
    { id: 37, name: "Formal Methods", count: 0, icon: "📐", description: "Model checking, Automata theory", color: "indigo" },
    { id: 47, name: "Theoretical Computer Science", count: 11, icon: "🎓", description: "Complexity theory, Automata, Game theory", color: "indigo" },
    
    // Additional categories (kept for compatibility)
    { id: 22, name: "Advanced Graph Theory", count: 0, icon: "�️", description: "Network flow, Spectral methods", color: "purple" },
    { id: 23, name: "Numerical & Math", count: 0, icon: "➗", description: "Linear algebra, Numerical analysis", color: "blue" },
    { id: 31, name: "Real-Time Systems", count: 0, icon: "⏱️", description: "EDF, Rate monotonic", color: "red" },
    { id: 29, name: "Compiler Algorithms", count: 51, icon: "⚙️", description: "Parsing, Code generation, Optimization", color: "yellow" },
    { id: 45, name: "Approximation Algorithms", count: 21, icon: "≈", description: "PTAS, FPTAS, Online algorithms", color: "green" },
    { id: 43, name: "Streaming Algorithms", count: 21, icon: "📡", description: "Stream processing, Sketching", color: "cyan" },
    { id: 32, name: "Cloud Algorithms", count: 31, icon: "☁️", description: "VM scheduling, Load balancing, Auto-scaling", color: "teal" },
    { id: 40, name: "Advanced Topics", count: 0, icon: "🎓", description: "Research algorithms", color: "purple" },
    { id: 41, name: "Advanced Data Structures", count: 0, icon: "🏗️", description: "Persistent structures", color: "cyan" },
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
