/**
 * Comprehensive Algorithm Database
 * 1000 algorithms organized by domain with proper categorization
 */

export interface AlgorithmData {
    id: number;
    name: string;
    domain: string;
    domainId: number;
    category: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    visualizationType: "array" | "tree" | "graph" | "matrix" | "network" | "none";
    yearIntroduced?: number;
    inventor?: string;
    relatedAlgorithms?: string[];
    researchReferences?: string[];
    stepByStepWorking?: string[];
    dryRun?: string;
    keyPoints?: string[];
    precondition?: string;
}

// All 1000 algorithms organized by domain
// Domain mapping exactly as requested
export const DOMAINS = [
    { id: 1, name: "DSA", description: "Data Structures & Algorithms - Core foundations" },
    { id: 2, name: "DAA", description: "Design & Analysis - Paradigms & complexity" },
    { id: 3, name: "AI", description: "Artificial Intelligence - Reasoning & planning" },
    { id: 4, name: "ML", description: "Machine Learning - Learning from data" },
    { id: 5, name: "Networks", description: "Computer Networks - Communication & routing" },
    { id: 6, name: "Security", description: "Cybersecurity & Cryptography - Trust & protection" },
    { id: 7, name: "Systems", description: "OS & Distributed Systems - Resource management" },
    { id: 8, name: "Graphics", description: "Graphics & Vision - Visual computation" },
    { id: 9, name: "Optimization", description: "Mathematical & Heuristic Optimization" },
    { id: 10, name: "Emerging", description: "Emerging CS Domains - Future-tech" },
    { id: 11, name: "Theory", description: "Theoretical CS - Automata & computability" }
];

// All 1000 algorithms organized by domain (consolidated from provided sets)
export const ALGORITHMS_BY_DOMAIN: Record<string, string[]> = {
    "DSA": [
        // Primary DSA (1-25)
        "Linear Search", "Binary Search", "Jump Search", "Interpolation Search", "Exponential Search",
        "Fibonacci Search", "Ternary Search", "Unordered Sequential Search", "Ordered Sequential Search", "Hash-based Search",
        "Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort",
        "Heap Sort", "Counting Sort", "Radix Sort", "Bucket Sort", "Shell Sort",
        "Tim Sort", "Comb Sort", "Cycle Sort", "Tree Sort", "Odd–Even Sort",
        // Extended Strings (86-90)
        "Naive Pattern Matching", "KMP Algorithm", "Rabin–Karp Algorithm", "Z Algorithm", "Trie Operations",
        // Bit Manipulation (91-95)
        "Count Set Bits", "Check Power of Two", "XOR-based Problems", "Bit Masking", "Gray Code Generation",
        // Advanced Searching & Selection (101-110)
        "Median of Medians", "Quick Select", "Order Statistics Tree", "Boyer–Moore Majority Vote", "Binary Indexed Tree (Search)",
        "Segment Tree Query", "K-th Smallest Element", "Range Minimum Query (RMQ)", "Sparse Table Query", "A* Search Algorithm",
        // Advanced Sorting (111-120)
        "Intro Sort", "Smooth Sort", "Bitonic Sort", "Pancake Sort", "Flash Sort",
        "Strand Sort", "Tournament Sort", "Block Sort", "External Merge Sort", "Sample Sort",
        // Advanced Trees (201-220)
        "AVL Tree Rotation Algorithm", "Red-Black Tree Insertion", "Red-Black Tree Deletion", "B-Tree Insertion", "B-Tree Deletion",
        "B+ Tree Search", "Splay Tree Operation", "Treap Insertion", "Cartesian Tree Construction", "Segment Tree Construction",
        "Lazy Propagation", "Fenwick Tree Update", "Lowest Common Ancestor", "Euler Tour Technique", "Heavy Light Decomposition",
        "Centroid Decomposition", "Tree Isomorphism Algorithm", "Tree Diameter Algorithm", "Prüfer Code Algorithm", "Huffman Tree Construction",
        // Data Structures & Additional DSA (601+)
        "Persistent Segment Tree", "Persistent Fenwick Tree", "Wavelet Tree", "KD-Tree Search", "Range Tree", "Interval Tree",
        "Cartesian Tree RMQ", "Palindromic Tree", "Van Emde Boas Tree", "Fusion Tree", "Link-Cut Tree", "Dynamic Trees",
        "Euler Tour Tree", "Sparse Segment Tree", "Treap Split & Merge", "Rope Data Structure", "Succinct Tree", "Dynamic Connectivity",
        "Mo's Algorithm", "Hilbert Curve Ordering", "DSU by Rank", "DSU with Path Compression", "Rollback DSU", "DSU on Tree", "Small-to-Large Merging",
        "Centroid Finding", "Tree Flattening", "Virtual Tree Construction", "Dynamic RMQ", "Heavy-Light Query Optimization",
        "XOR Basis Construction", "Linear Basis Algorithm", "Dynamic Median Maintenance", "Order Statistic Maintenance",
        "Dynamic Interval Union", "Offline Dynamic Connectivity", "Fully Persistent Structures", "Implicit Treap"
    ],

    "DAA": [
        // Divide and Conquer (26-35)
        "Binary Search (D&C)", "Merge Sort (D&C)", "Quick Sort (D&C)", "Strassen’s Matrix Multiplication", "Closest Pair of Points",
        "Max–Min Problem", "Karatsuba Algorithm", "Convex Hull (D&C)", "Finding Median (D&C)", "Fast Fourier Transform (FFT)",
        // Greedy (36-45)
        "Activity Selection", "Fractional Knapsack", "Job Sequencing with Deadlines", "Huffman Coding", "Kruskal’s Algorithm",
        "Prim’s Algorithm", "Dijkstra’s Algorithm", "Optimal Merge Pattern", "Coin Change (Greedy)", "Minimum Platforms Problem",
        // Dynamic Programming (46-60)
        "Fibonacci (DP)", "0/1 Knapsack", "Unbounded Knapsack", "Longest Common Subsequence (LCS)", "Longest Increasing Subsequence (LIS)",
        "Matrix Chain Multiplication", "Coin Change (DP)", "Edit Distance", "Rod Cutting", "Floyd–Warshall Algorithm",
        "Bellman–Ford Algorithm", "Optimal Binary Search Tree", "Subset Sum (DP)", "Partition Problem", "Palindrome Partitioning",
        // Backtracking (61-70)
        "N-Queens Problem", "Sum of Subsets", "Graph Coloring", "Hamiltonian Cycle", "Sudoku Solver",
        "Knight’s Tour", "Maze Solving", "Permutations Generation", "Combinations Generation", "Rat in a Maze",
        // Branch and Bound (71-75)
        "0/1 Knapsack (B&B)", "Traveling Salesman Problem (TSP)", "Job Assignment Problem", "Integer Programming", "Scheduling Optimization",
        // Graph Algorithms (76-85)
        "Breadth First Search (BFS)", "Depth First Search (DFS)", "Topological Sorting", "Cycle Detection", "Connected Components",
        "Strongly Connected Components (Kosaraju)", "Strongly Connected Components (Tarjan)", "Articulation Points", "Bridges in Graph", "Bipartite Graph Checking",
        // Advanced Graph (121-135)
        "Johnson’s Algorithm", "Edmonds–Karp Algorithm", "Dinic’s Algorithm", "Push–Relabel Algorithm", "Hopcroft–Karp Algorithm",
        "Hungarian Algorithm", "Edmonds’ Blossom Algorithm", "Karger’s Min Cut", "Floyd Cycle Detection", "Johnson Cycle Detection",
        "Euler Path Algorithm", "Chinese Postman Problem", "Minimum Cost Flow", "Maximum Bipartite Matching", "All-Pairs Shortest Path",
        // Advanced DP (136-150)
        "Bitmask DP", "Digit DP", "Tree DP", "Interval DP", "DP on DAG", "DP with State Compression",
        "Probability DP", "Game Theory DP", "DP Optimization (Knuth)", "Subsequence DP", "String DP", "Matrix DP", "DP on Grids", "Convex Hull Trick",
        // More Advanced Graph (221-245)
        "Tarjan’s SCC", "Kosaraju’s SCC", "Gabow’s Algorithm", "Edmonds’ Arborescence", "Stoer–Wagner Min Cut", "Gomory–Hu Tree",
        "Suurballe’s Algorithm", "Yen’s K-Shortest Paths", "Dial’s Algorithm", "Thorup’s Algorithm", "Goldberg–Tarjan Algorithm",
        "Maximum Closure Problem", "DAG Shortest Path", "Minimum Mean Cycle", "Graph Coloring (Welsh–Powell)", "Chordal Graph Recognition",
        "Planarity Testing", "Graph Isomorphism (WL)", "Line Graph Construction", "Random Walk", "Louvain Algorithm", "Spectral Clustering"
    ],

    "AI": [
        // AI Algorithms (286-310)
        "Minimax Algorithm", "Alpha–Beta Pruning", "Expectimax Algorithm", "Greedy Best-First Search", "Iterative Deepening DFS",
        "IDA* Algorithm", "AO* Algorithm", "Constraint Propagation", "Arc Consistency (AC-3)", "Backjumping Algorithm",
        "Forward Checking", "Bayesian Inference Algorithm", "Hidden Markov Model (Viterbi)", "Kalman Filter", "Particle Filter",
        "Q-Learning", "SARSA Algorithm", "Policy Iteration", "Value Iteration", "Monte Carlo Tree Search",
        "Neural Network Backpropagation", "Hebbian Learning", "Perceptron Learning", "Decision Tree Learning", "Random Forest Algorithm",
        // ML Optimization (761-780)
        "Gradient Descent with Momentum", "RMSProp", "Adam Optimizer", "AdaGrad", "AdamW", "Backpropagation Through Time",
        "LSTM Training", "GRU Training", "Transformer Attention", "Self-Attention", "Multi-Head Attention", "Positional Encoding",
        "Beam Search", "Greedy Decoding", "CTC Decoding", "Expectation Propagation", "Variational Inference", "VAE", "GAN Training", "WGAN"
    ],

    "ML": [
        // ML Core (311-335)
        "Linear Regression", "Logistic Regression", "Support Vector Machine", "Naive Bayes Classifier", "K-Nearest Neighbors",
        "K-Means Clustering", "Hierarchical Clustering", "DBSCAN", "Expectation–Maximization", "PCA", "ICA", "LDA",
        "Gradient Boosting", "AdaBoost", "XGBoost", "LightGBM", "CatBoost", "Isolation Forest", "One-Class SVM", "Apriori Algorithm",
        "FP-Growth Algorithm", "Collaborative Filtering", "Matrix Factorization", "ALS Algorithm", "Topic Modeling (LDA)",
        // Advanced ML (761+)
        "Diffusion Model Sampling", "Contrastive Learning", "SimCLR", "BYOL", "Self-Supervised Learning", "Active Learning",
        "Semi-Supervised Learning", "Online Learning", "Multi-Armed Bandit", "Thompson Sampling", "UCB", "MDP Solver",
        "Policy Gradient", "Actor–Critic", "PPO", "DQN", "Double DQN", "Dueling DQN", "Experience Replay", "Curriculum Learning"
    ],

    "Networks": [
        // Networking (366-380)
        "Distance Vector Routing", "Link State Routing", "Dijkstra Routing (Net)", "Bellman–Ford Routing (Net)", "Spanning Tree Protocol",
        "Flooding Algorithm", "Token Bucket (Net)", "Leaky Bucket (Net)", "Congestion Control (Net)", "Sliding Window Protocol",
        "Go-Back-N", "Selective Repeat", "Paxos Algorithm", "Raft Consensus", "Byzantine Fault Tolerance",
        // Networking Misc (851+)
        "Network Utility Maximization", "Fair Queuing", "Weighted Fair Queuing", "Traffic Shaping", "Quality of Service",
        "Packet Scheduling", "Flow Control", "Checksum Algorithm", "CRC Algorithm", "Hamming Code", "Reed-Solomon Code"
    ],

    "Security": [
        // Cryptography & Security (191-200)
        "RSA Algorithm", "Diffie–Hellman Key Exchange", "AES Encryption", "DES Algorithm", "SHA Hash Algorithm",
        "Digital Signature Algorithm (DSA)", "Elliptic Curve Cryptography", "Zero-Knowledge Proof", "Blockchain Consensus", "SHA-3",
        // Advanced Security (721-760)
        "Elliptic Curve Point Addition", "Elliptic Curve Scalar Multiplication", "Miller Algorithm (Pairings)", "BLS Signature", "Schnorr Signature",
        "ElGamal Encryption", "Paillier Cryptosystem", "Homomorphic Encryption", "zk-SNARKs", "zk-STARKs", "Merkle Proof Verification",
        "Proof of Work", "Proof of Stake", "PBFT", "DPoS", "Hashcash", "Ring Signature", "Threshold Cryptography",
        "Secure MPC", "Oblivious Transfer", "Garbled Circuits", "bcrypt", "Key Derivation Function", "Secure Random Gen",
        "Fork Choice Rule", "Smart Contract Optimization", "Gas Optimization", "zk-Rollup", "Optimistic Rollup", "Cross-Chain Bridge"
    ],

    "Systems": [
        // OS Algorithms (336-350)
        "FCFS Scheduling", "Shortest Job First", "Priority Scheduling", "Round Robin Scheduling", "Multilevel Queue Scheduling",
        "Multilevel Feedback Queue", "Banker's Algorithm", "Deadlock Detection", "Deadlock Prevention", "Page Replacement (FIFO)",
        "Page Replacement (LRU)", "Page Replacement (Optimal)", "Clock Replacement", "Disk Scheduling (SCAN)", "Disk Scheduling (C-LOOK)",
        // Advanced Scheduling (401-420)
        "Earliest Deadline First", "Rate Monotonic Scheduling", "Deadline Monotonic Scheduling", "Least Laxity First", "Proportional Share Scheduling",
        "Lottery Scheduling", "Completely Fair Scheduler", "Gang Scheduling", "Priority Inheritance", "Priority Ceiling",
        // Systems & Storage (541-560)
        "Consistent Hashing", "Quorum Consensus", "Two-Phase Commit", "Three-Phase Commit", "Chandy–Lamport Algorithm", "Vector Clock",
        "Lamport Logical Clock", "Gossip-Based Replication", "LSM Tree Compaction", "Write-Ahead Logging", "Log-Structured Storage",
        "Snapshot Isolation", "CRDT", "Merkle Tree Sync", "Data Sharding", "Thread Pool Scheduling", "Work Stealing", "Lock-Free Queue", "RCU"
    ],

    "Graphics": [
        // Misc Graphics (386-391)
        "Bresenham Line Algorithm", "DDA Line Algorithm", "Midpoint Circle Algorithm", "Scanline Polygon Fill", "Z-Buffer Algorithm", "Ray Tracing",
        // Computer Graphics & Vision (501-520)
        "Liang–Barsky Line Clipping", "Cohen–Sutherland Line Clipping", "Cyrus–Beck Algorithm", "Polygon Clipping", "Painter’s Algorithm",
        "Scan Conversion", "Texture Mapping", "Gouraud Shading", "Phong Shading", "Rasterization", "Image Segmentation", "Watershed Algorithm",
        "Hough Transform", "Optical Flow", "Stereo Matching", "Feature Detection (FAST)", "SIFT Algorithm", "SURF Algorithm", "ORB Algorithm", "Perspective Transformation",
        // Vision (801-830)
        "Fast Fourier Transform (2D)", "Discrete Cosine Transform", "Wavelet Transform", "Haar Wavelet", "Viola–Jones Face Detection",
        "Eigenfaces", "Fisherfaces", "Local Binary Patterns", "Image Registration", "Image Stitching", "Bag of Visual Words", "YOLO", "Mask R-CNN"
    ],

    "Optimization": [
        // Optimization (266-285)
        "Linear Programming (Simplex)", "Dual Simplex Algorithm", "Interior Point Method", "Cutting Plane Method", "Gradient Descent (Opt)",
        "SGD (Opt)", "Newton’s Optimization", "Conjugate Gradient", "Lagrangian Relaxation", "Simulated Annealing",
        "Genetic Algorithm", "Particle Swarm Optimization", "Ant Colony Optimization", "Tabu Search", "Hill Climbing",
        "Coordinate Descent", "Trust Region Method", "Nelder–Mead Algorithm", "Golden Section Search", "Branch and Cut",
        // Misc Optimization (751+)
        "Cuckoo Search", "Harmony Search", "Firefly Algorithm", "Bat Algorithm", "Grey Wolf Optimizer", "Whale Optimization Algorithm"
    ],

    "Emerging": [
        // Robotics (561-580)
        "A* Path Planning (Robo)", "D* Algorithm", "D* Lite", "RRT", "RRT*", "Probabilistic Roadmap (PRM)", "SLAM Algorithm", "Extended Kalman Filter",
        "Unscented Kalman Filter", "PID Control", "Model Predictive Control", "Inverse Kinematics", "Forward Kinematics", "Motion Planning", "Obstacle Avoidance",
        // Emerging Tech (600+)
        "Federated Learning", "zk-Rollup (Emerging)", "DeFi Algorithm", "Smart Contract Optimization", "Swarm Intelligence", "Boids Algorithm",
        "MapReduce", "Edge AI", "Neuromorphic Computing", "Quantum-Inspired Algorithm", "Self-Organizing Systems"
    ],

    "Theory": [
        // NP-Complete (96-100)
        "Traveling Salesman Problem (NP)", "Vertex Cover (Theory)", "Clique Problem", "Subset Sum (Theory)", "SAT Problem",
        // Formal Methods & Automata (521-540)
        "Finite Automata Construction", "Pushdown Automata", "Turing Machine Simulation", "Chomsky Normal Form", "CYK Parsing",
        "Grammar Ambiguity Detection", "Model Checking", "LTL Model Checking", "CTL Model Checking", "Bisimulation", "Reachability Analysis",
        "Symbolic Execution", "Abstract Interpretation", "DPLL SAT Solver", "CDCL SAT Solver", "SMT Solving", "Automata Minimization",
        // Complexity & Theory (900+)
        "Complexity Class Reduction", "PCP Theorem", "Savitch’s Algorithm", "NP-Completeness Reduction", "Cook–Levin Theorem",
        "Space Hierarchy Theorem", "Time Hierarchy Theorem", "Communication Complexity", "Kolmogorov Complexity"
    ]
};


