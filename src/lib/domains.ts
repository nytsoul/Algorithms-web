export interface AlgorithmDomain {
    id: number;
    name: string;
    count: number;
    icon: string;
    description: string;
    color: string;
}

export const ALGORITHM_DOMAINS: AlgorithmDomain[] = [
    // Core DSA Domains - Matching 1000 Algorithm Seed
    { id: 1, name: "Searching & Sorting", count: 75, icon: "🔍", description: "Linear, Binary, Jump, Interpolation, Bubble, Merge, Quick, Heap sorts", color: "cyan" },
    { id: 2, name: "Graph Algorithms", count: 120, icon: "🕸️", description: "BFS, DFS, Shortest path, MST, Flow networks, Topological sort", color: "red" },
    { id: 3, name: "Dynamic Programming", count: 105, icon: "💎", description: "Knapsack, LCS, LIS, Matrix chain, Edit distance, Coin change", color: "blue" },
    { id: 4, name: "String Processing", count: 85, icon: "📝", description: "KMP, Rabin-Karp, Z-algorithm, Trie, Pattern matching, Suffix arrays", color: "teal" },
    { id: 5, name: "Greedy Algorithms", count: 75, icon: "🎯", description: "Activity selection, Huffman, Kruskal, Prim, Dijkstra, Fractional Knapsack", color: "green" },
    { id: 6, name: "Tree Algorithms", count: 90, icon: "🌲", description: "BST, AVL, Red-Black, B-Trees, Traversals, LCA, Heavy-Light Decomposition", color: "green" },
    { id: 7, name: "Divide & Conquer", count: 70, icon: "✂️", description: "Binary search, Merge sort, FFT, Matrix multiplication, Strassen algorithm", color: "purple" },
    { id: 8, name: "Backtracking", count: 60, icon: "🔙", description: "N-Queens, Sudoku, Graph coloring, Hamiltonian path, Permutations, Combinations", color: "orange" },
    { id: 9, name: "Bit Manipulation", count: 55, icon: "🔢", description: "Bitwise operations, XOR tricks, Bit masking, Gray code, Hamming distance", color: "indigo" },
    { id: 10, name: "Math & Number Theory", count: 265, icon: "➗", description: "GCD, Prime numbers, Modular arithmetic, Euler's theorem, Matrix exponentiation", color: "yellow" },
    
    // Additional supported domains from legacy system
    { id: 11, name: "NP-Complete/Hard", count: 0, icon: "🧩", description: "TSP, Vertex cover, SAT, Subset sum", color: "rose" },
    { id: 12, name: "Advanced Searching", count: 0, icon: "🔎", description: "Search optimization techniques", color: "cyan" },
    { id: 13, name: "Advanced Sorting", count: 0, icon: "📈", description: "Advanced sorting algorithms", color: "pink" },
    { id: 14, name: "Advanced Graph", count: 0, icon: "🌐", description: "Max flow, Bipartite matching", color: "purple" },
    { id: 15, name: "Advanced DP", count: 0, icon: "💠", description: "DP optimization techniques", color: "blue" },
    { id: 16, name: "Computational Geometry", count: 0, icon: "📐", description: "Convex hull, Line sweep, Voronoi", color: "green" },
    { id: 17, name: "String Processing Extended", count: 0, icon: "📄", description: "Pattern matching, Compression", color: "teal" },
    { id: 18, name: "Randomized Algorithms", count: 0, icon: "🎲", description: "Monte Carlo, Las Vegas", color: "orange" },
    { id: 19, name: "Parallel & Distributed", count: 0, icon: "⚡", description: "MapReduce, Consensus", color: "yellow" },
    { id: 20, name: "Cryptography", count: 0, icon: "🔐", description: "RSA, AES, SHA, Blockchain", color: "red" },
    { id: 21, name: "Advanced Trees", count: 0, icon: "🌳", description: "Segment trees, Fenwick trees", color: "green" },
    { id: 22, name: "Advanced Graph Theory", count: 0, icon: "🕸️", description: "Network flow, Spectral methods", color: "purple" },
    { id: 23, name: "Numerical & Math", count: 0, icon: "➗", description: "Linear algebra, Numerical analysis", color: "blue" },
    { id: 24, name: "Optimization", count: 0, icon: "⚙️", description: "LP, Convex optimization", color: "orange" },
    { id: 25, name: "Artificial Intelligence", count: 0, icon: "🤖", description: "Search, Planning, CSP", color: "cyan" },
    { id: 26, name: "Machine Learning", count: 0, icon: "🧠", description: "Supervised, Unsupervised learning", color: "pink" },
    { id: 27, name: "Operating Systems", count: 0, icon: "💻", description: "Scheduling, Memory management", color: "indigo" },
    { id: 28, name: "Database Algorithms", count: 0, icon: "🗄️", description: "Indexing, Query optimization", color: "teal" },
    { id: 29, name: "Networking", count: 0, icon: "🌐", description: "Routing, Flow control", color: "blue" },
    { id: 30, name: "Compression & Graphics", count: 0, icon: "🎨", description: "Rendering, Image processing", color: "purple" },
    { id: 31, name: "Real-Time Systems", count: 0, icon: "⏱️", description: "EDF, Rate monotonic", color: "red" },
    { id: 32, name: "Compiler Design", count: 0, icon: "⚙️", description: "Parsing, Code generation", color: "yellow" },
    { id: 33, name: "Approximation", count: 0, icon: "≈", description: "PTAS, FPTAS algorithms", color: "green" },
    { id: 34, name: "Online & Streaming", count: 0, icon: "📡", description: "Stream processing, Sketching", color: "cyan" },
    { id: 35, name: "Bioinformatics", count: 0, icon: "🧬", description: "Sequence alignment, Phylogenetics", color: "green" },
    { id: 36, name: "Computer Vision", count: 0, icon: "👁️", description: "Object detection, Segmentation", color: "blue" },
    { id: 37, name: "Formal Methods", count: 0, icon: "📐", description: "Model checking, Automata", color: "indigo" },
    { id: 38, name: "Distributed Storage", count: 0, icon: "💾", description: "Replication, Sharding", color: "teal" },
    { id: 39, name: "Robotics & Control", count: 0, icon: "🤖", description: "Path planning, SLAM", color: "orange" },
    { id: 40, name: "Advanced Topics", count: 0, icon: "🎓", description: "Research algorithms", color: "purple" },
];

export function getDomainById(id: number): AlgorithmDomain | undefined {
    return ALGORITHM_DOMAINS.find(domain => domain.id === id);
}

export function getDomainsByCategory(category: string): AlgorithmDomain[] {
    const categories: Record<string, number[]> = {
        "DSA": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "Core": [1, 2, 6],
        "Paradigms": [3, 5, 7, 8],
        "Specialized": [4, 9, 10],
        "Advanced": [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        "AI/ML": [25, 26],
        "Systems": [27, 28, 29, 32],
        "Emerging": [30, 31, 33, 34, 35, 36, 37, 38, 39, 40],
    };

    const domainIds = categories[category] || [];
    return ALGORITHM_DOMAINS.filter(d => domainIds.includes(d.id));
}

export const TOTAL_ALGORITHMS = ALGORITHM_DOMAINS.reduce((sum, domain) => sum + domain.count, 0);
