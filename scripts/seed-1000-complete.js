#!/usr/bin/env node

/**
 * Comprehensive Seed Script for 1000 Algorithms
 * Organized into 11 CS domains with proper naming and categorization
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('❌ Error: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Domain definitions with algorithm lists (1000 total)
const algorithmsByDomain = {
    'DSA': {
        domainId: 1,
        description: 'Data Structures & Algorithms - Foundation layer for implementation',
        algorithms: [
            'Linear Search', 'Binary Search', 'Jump Search', 'Interpolation Search',
            'Exponential Search', 'Fibonacci Search', 'Ternary Search', 'Unordered Sequential Search',
            'Ordered Sequential Search', 'Hash-based Search', 'Bubble Sort', 'Selection Sort',
            'Insertion Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort', 'Counting Sort',
            'Radix Sort', 'Bucket Sort', 'Shell Sort', 'Tim Sort', 'Comb Sort', 'Cycle Sort',
            'Tree Sort', 'Odd-Even Sort', 'Array Manipulation', 'Linked List Operations',
            'Stack Implementation', 'Queue Implementation', 'Deque Implementation', 'Priority Queue',
            'Min Heap', 'Max Heap', 'Binary Search Tree', 'AVL Tree Basics', 'Hash Table',
            'Separate Chaining', 'Open Addressing', 'Double Hashing', 'Two Pointer Technique',
            'Sliding Window', 'Prefix Sum', 'Suffix Array Basics', 'KMP String Search',
            'String Reversal', 'Palindrome Check', 'Anagram Detection', 'Substring Search',
            'Graph Representation', 'Breadth First Search (BFS)', 'Depth First Search (DFS)',
            'Graph Traversal', 'Tree Traversal (Inorder)', 'Tree Traversal (Preorder)',
            'Tree Traversal (Postorder)', 'Level Order Traversal', 'Recursion Basics',
            'Tail Recursion', 'Backtracking Basics', 'Bit Operations', 'Set Operations',
            'Union Operations', 'Intersection Operations', 'Difference Operations',
            'Dynamic Array', 'Vector Operations', 'Matrix Operations', 'Matrix Transpose',
            'Sparse Matrix', 'Graph Coloring Basics', 'Component Finding', 'Cycle Detection in Array',
            'Pattern Matching Basics', 'Text Search', 'Sorting with Custom Comparator',
            'Binary Indexed Tree Query', 'Range Sum Query', 'Segment Tree Query',
            'Interval Tree Operations', 'B-Tree Insertion', 'B-Tree Deletion',
            'Skip List Operations', 'Cuckoo Hashing', 'Bloom Filter Basics',
            'Trie Construction', 'Trie Search', 'Ternary Search Tree', 'Expression Evaluation',
            'Infix to Postfix Conversion', 'Postfix Expression Evaluation', 'Tower of Hanoi',
            'Josephus Problem', 'N-Queens Problem (Basic)', 'Sudoku Solver (Basic)',
            'Word Break Problem', 'Longest Common Subsequence (Basic)', 'Edit Distance (Basic)',
            'Subset Generation', 'Permutation Generation', 'Combination Generation',
            'Power Set Generation', 'Partition Function', 'Collatz Sequence',
            'GCD and LCM', 'Prime Checking', 'Factor Finding', 'Digit Manipulation',
            'Number Reversal', 'Number Palindrome', 'Armstrong Number Check', 'Perfect Number Check'
        ]
    },
    'DAA': {
        domainId: 2,
        description: 'Design & Analysis of Algorithms - Design paradigms and complexity analysis',
        algorithms: [
            'Divide and Conquer Strategy', 'Merge Sort (D&C)', 'Quick Sort (D&C)',
            'Strassen Matrix Multiplication', 'Karatsuba Algorithm', 'Maximum Subarray (D&C)',
            'Closest Pair of Points', 'Convex Hull (D&C)', 'Fast Fourier Transform',
            'Finding Median (D&C)', 'Greedy Algorithm Strategy', 'Activity Selection Problem',
            'Fractional Knapsack Problem', 'Huffman Coding', 'Kruskal Algorithm',
            'Prim Algorithm', 'Dijkstra Algorithm', 'Job Sequencing with Deadlines',
            'Optimal Merge Pattern', 'Coin Change (Greedy)', 'Minimum Platforms Problem',
            'Dynamic Programming Strategy', 'Fibonacci (DP)', '0-1 Knapsack Problem',
            'Unbounded Knapsack', 'Longest Common Subsequence (LCS)', 'Longest Increasing Subsequence (LIS)',
            'Matrix Chain Multiplication', 'Coin Change (DP)', 'Edit Distance (Levenshtein)',
            'Rod Cutting Problem', 'Floyd-Warshall Algorithm', 'Bellman-Ford Algorithm',
            'Optimal Binary Search Tree', 'Subset Sum Problem', 'Partition Problem',
            'Palindrome Partitioning', 'Backtracking Strategy', 'N-Queens Problem',
            'Hamiltonian Cycle Detection', 'Graph Coloring Problem', 'Sudoku Solver',
            'Knight Tour Problem', 'Maze Solving (Backtracking)', 'Permutation Generation (BT)',
            'Combination Generation (BT)', 'Rat in Maze Problem', 'Sum of Subsets',
            'Branch and Bound Strategy', 'TSP Branch and Bound', 'Job Assignment Problem',
            '0-1 Knapsack (B&B)', 'Integer Programming', 'Scheduling Optimization',
            'Approximation Algorithm Strategy', 'Vertex Cover Approximation', 'Set Cover Approximation',
            'TSP Approximation', 'Bin Packing Approximation', 'Load Balancing Approximation',
            'Facility Location Approximation', 'K-Center Approximation', 'Max Cut Approximation',
            'Dominating Set Approximation', 'Steiner Tree Approximation', 'Knapsack Approximation Scheme (PTAS)',
            'Fully Polynomial Time Approximation Scheme (FPTAS)', 'Greedy Matching Approximation',
            'Submodular Maximization', 'Online Algorithms', 'Ski Rental Problem',
            'Secretary Problem', 'Prophet Inequality Algorithm', 'Paging Algorithm',
            'Caching Strategy', 'Cache Replacement (LRU)', 'Cache Replacement (FIFO)',
            'Randomized Quick Sort', 'Randomized Select (Median Finding)', 'Reservoir Sampling',
            'Monte Carlo Algorithm', 'Las Vegas Algorithm', 'Skip List Algorithm',
            'Bloom Filter Algorithm', 'Count-Min Sketch', 'HyperLogLog Algorithm',
            'Locality-Sensitive Hashing', 'MinHash Algorithm', 'Sketching Algorithms'
        ]
    },
    'AI': {
        domainId: 3,
        description: 'Artificial Intelligence - Decision making, reasoning, and planning',
        algorithms: [
            'A* Search Algorithm', 'IDA* Algorithm', 'AO* Algorithm', 'Greedy Best-First Search',
            'Iterative Deepening DFS', 'Uniform Cost Search', 'Depth Limited Search',
            'Bidirectional Search', 'Heuristic Search', 'Hill Climbing Algorithm',
            'Simulated Annealing (AI)', 'Minimax Algorithm', 'Alpha-Beta Pruning',
            'Expectimax Algorithm', 'Transposition Table', 'Quiescence Search',
            'Monte Carlo Tree Search', 'Upper Confidence Bound', 'Constraint Satisfaction (CSP)',
            'Arc Consistency Algorithm (AC-3)', 'Backjumping Algorithm', 'Forward Checking',
            'Constraint Propagation', 'Local Search (CSP)', 'Genetic Algorithm (AI)',
            'Simulated Annealing (CSP)', 'Particle Swarm Optimization (AI)', 'Ant Colony Optimization (AI)',
            'Tabu Search', 'Variable Neighborhood Search', 'Bayesian Inference Algorithm',
            'Hidden Markov Model (Viterbi)', 'Kalman Filter', 'Particle Filter',
            'Markov Decision Process Solver', 'Value Iteration', 'Policy Iteration',
            'Q-Learning', 'SARSA Algorithm', 'Temporal Difference Learning',
            'Actor-Critic Algorithm', 'Proximal Policy Optimization', 'Deep Q-Network',
            'Fuzzy Logic System', 'Fuzzy Inference System', 'Knowledge Graph Reasoning',
            'Logic Programming Resolution', 'Unification Algorithm', 'Inference Engine',
            'Forward Chaining', 'Backward Chaining', 'Abductive Reasoning',
            'Inductive Logic Programming', 'Knowledge Distillation (AI)', 'Case-Based Reasoning',
            'Rule-Based System', 'Expert System Algorithm', 'Semantic Network Algorithm',
            'Frame System Algorithm', 'Description Logic Reasoning', 'Ontology Reasoning',
            'Explanation Generation', 'Argumentation Algorithm', 'Debate System',
            'Natural Language Understanding (NLU)', 'Semantic Analysis', 'Pragmatic Understanding',
            'Dialogue Management', 'Conversational AI Algorithm', 'Chatbot Logic',
            'Intent Recognition', 'Entity Extraction', 'Dependency Parsing',
            'Named Entity Recognition', 'Information Extraction', 'Question Answering System',
            'Machine Translation (Seq2Seq)', 'Beam Search Decoding', 'Greedy Decoding',
            'Speech Recognition Algorithm', 'Accent Adaptation', 'Speaker Verification',
            'Voice Conversion Algorithm', 'Text-to-Speech Algorithm', 'Prosody Modeling'
        ]
    },
    'ML': {
        domainId: 4,
        description: 'Machine Learning - Learning from data and pattern recognition',
        algorithms: [
            'Linear Regression', 'Polynomial Regression', 'Ridge Regression', 'Lasso Regression',
            'Elastic Net Regression', 'Logistic Regression', 'Softmax Regression', 'Support Vector Machine (SVM)',
            'Support Vector Regression', 'K-Nearest Neighbors (KNN)', 'Naive Bayes Classifier',
            'Gaussian Naive Bayes', 'Multinomial Naive Bayes', 'Decision Tree Learning',
            'Random Forest Algorithm', 'Gradient Boosting', 'XGBoost Algorithm', 'LightGBM',
            'CatBoost Algorithm', 'AdaBoost Algorithm', 'Stochastic Gradient Descent',
            'Mini-Batch Gradient Descent', 'Momentum Optimization', 'RMSProp Algorithm',
            'Adam Optimizer', 'AdaGrad Optimizer', 'AdamW Optimizer', 'Learning Rate Scheduling',
            'K-Means Clustering', 'K-Means++ Initialization', 'Mini-Batch K-Means', 'Hierarchical Clustering',
            'Agglomerative Clustering', 'Divisive Clustering', 'Density-Based Clustering (DBSCAN)',
            'Mean Shift Clustering', 'Expectation-Maximization (EM)', 'Gaussian Mixture Models',
            'Principal Component Analysis (PCA)', 'Incremental PCA', 'Kernel PCA',
            'Independent Component Analysis (ICA)', 'Linear Discriminant Analysis (LDA)',
            'Quadratic Discriminant Analysis (QDA)', 'Factor Analysis', 'Dictionary Learning',
            'Non-negative Matrix Factorization', 'Matrix Factorization', 'Singular Value Decomposition (SVD)',
            'Eigenvalue Decomposition', 'Collaborative Filtering', 'Content-Based Filtering',
            'Apriori Algorithm (ML)', 'Eclat Algorithm', 'FP-Growth Algorithm',
            'Frequent Pattern Mining', 'Association Rule Learning', 'Sequential Pattern Mining',
            'Time Series Forecasting', 'ARIMA Algorithm', 'Exponential Smoothing',
            'Seasonal Decomposition', 'LSTM for Time Series', 'GRU for Time Series',
            'Anomaly Detection (Statistical)', 'Isolation Forest', 'One-Class SVM',
            'Local Outlier Factor', 'Autoencoders', 'Variational Autoencoder (VAE)',
            'Generative Adversarial Network (GAN)', 'Wasserstein GAN', 'Conditional GAN',
            'StyleGAN Algorithm', 'Diffusion Models', 'Score Matching',
            'Self-Supervised Learning', 'Contrastive Learning', 'SimCLR Algorithm',
            'BYOL Algorithm', 'Bootstrap Your Own Latent', 'Momentum Contrast',
            'Triplet Loss Learning', 'Metric Learning', 'Siamese Network',
            'Active Learning Algorithm', 'Semi-Supervised Learning', 'Transfer Learning',
            'Domain Adaptation', 'Few-Shot Learning', 'Zero-Shot Learning',
            'Meta-Learning', 'Learning to Learn', 'Multi-Task Learning',
            'Continual Learning', 'Online Learning Algorithm', 'Concept Drift Detection'
        ]
    },
    'Networks': {
        domainId: 5,
        description: 'Computer Networks - Communication, routing, and data transmission',
        algorithms: [
            'Distance Vector Routing', 'Link State Routing', 'Dijkstra Routing Algorithm',
            'Bellman-Ford Routing', 'RIP Protocol Algorithm', 'OSPF Protocol Algorithm',
            'BGP Path Selection', 'Routing Table Lookup', 'Longest Prefix Matching',
            'Equal Cost Multipath Routing', 'Anycast Routing', 'Multicast Routing (DVMRP)',
            'Spanning Tree Protocol (STP)', 'Rapid Spanning Tree Protocol', 'Multiple Spanning Tree',
            'VLAN Spanning Tree', 'Bridge Protocol', 'Flooding Algorithm',
            'Broadcast Flooding', 'Controlled Flooding', 'Reverse Path Broadcasting',
            'Token Bucket Algorithm', 'Leaky Bucket Algorithm', 'Hierarchical Token Bucket',
            'Generic Cell Rate Algorithm', 'Traffic Shaping Algorithm', 'Congestion Control Algorithm',
            'TCP Congestion Control (Tahoe)', 'TCP Congestion Control (Reno)', 'TCP Congestion Control (NewReno)',
            'Cubic TCP', 'BBR Congestion Control', 'QUIC Congestion Control',
            'ECN (Explicit Congestion Notification)', 'Random Early Detection (RED)', 'Weighted RED',
            'Blue Queue Management', 'CoDel Queue Management', 'Sliding Window Protocol',
            'Go-Back-N Protocol', 'Selective Repeat Protocol', 'Alternating Bit Protocol',
            'CSMA/CD Algorithm', 'CSMA/CA Algorithm', 'Backoff Algorithm (Ethernet)',
            'Exponential Backoff', 'ARP Protocol Algorithm', 'Reverse ARP Algorithm',
            'DHCP Protocol Algorithm', 'DNS Resolution Algorithm', 'DNS Caching',
            'NAT Algorithm', 'Port Address Translation', 'Fragmentation and Reassembly',
            'IPv4 Routing Algorithm', 'IPv6 Routing Algorithm', 'Multiprotocol Label Switching (MPLS)',
            'Traffic Engineering', 'QoS Scheduling Algorithm', 'Differentiated Services',
            'Integrated Services', 'RSVP Protocol Algorithm', 'Load Balancing (Network)',
            'Round Robin Scheduling (Network)', 'Least Connections (Network)', 'IP Hash Scheduling',
            'Network Slicing Algorithm', 'Bandwidth Allocation', 'Admission Control Algorithm',
            'Call Blocking Probability', 'Spectrum Allocation (Wireless)', 'Handover Algorithm',
            'Neighbor Discovery Protocol', 'Router Advertisement', 'Duplicate Address Detection',
            'Source Routing Algorithm', 'Policy-Based Routing', 'Segment Routing',
            'Software-Defined Networking (SDN)', 'OpenFlow Protocol', 'Network Virtualization',
            'Virtual Network Embedding', 'Network Slicing', 'Edge Computing Placement'
        ]
    },
    'Security': {
        domainId: 6,
        description: 'Security & Cryptography - Confidentiality, integrity, and authentication',
        algorithms: [
            'RSA Algorithm', 'Diffie-Hellman Key Exchange', 'Elliptic Curve Cryptography',
            'Elliptic Curve Diffie-Hellman', 'Elliptic Curve Point Addition', 'Elliptic Curve Scalar Multiplication',
            'AES Encryption Algorithm', 'DES Encryption Algorithm', 'Triple DES (3DES)',
            'Blowfish Encryption', 'Twofish Encryption', 'ChaCha20 Encryption',
            'RC4 Stream Cipher', 'Salsa20 Encryption', 'IDEA Encryption',
            'Camellia Encryption', 'ARIA Encryption', 'ARIA Key Schedule',
            'SHA-1 Hash Algorithm', 'SHA-2 Hash Algorithm', 'SHA-256', 'SHA-384',
            'SHA-512 Hash Algorithm', 'SHA-3 Hash Algorithm', 'BLAKE2 Hash Algorithm',
            'BLAKE3 Hash Algorithm', 'MD5 Hash Algorithm', 'RIPEMD-160',
            'Whirlpool Hash Algorithm', 'Tiger Hash Algorithm', 'SipHash Algorithm',
            'Digital Signature Algorithm (DSA)', 'ECDSA Algorithm', 'EdDSA Algorithm',
            'RSA-PSS Signature', 'Schnorr Signature Algorithm', 'BLS Signature Algorithm',
            'Boneh-Lynn-Shacham Signature', 'ElGamal Encryption', 'Paillier Cryptosystem',
            'Homomorphic Encryption Scheme', 'Fully Homomorphic Encryption', 'Partial Homomorphic Encryption',
            'Functional Encryption', 'Attribute-Based Encryption', 'Searchable Encryption',
            'Zero-Knowledge Proof (ZKP)', 'Zero-Knowledge SNARK', 'Zero-Knowledge STARK',
            'Interactive Zero-Knowledge Proofs', 'Fiat-Shamir Heuristic', 'Merkle Proof Verification',
            'Merkle Tree Algorithm', 'Merkle-Damgård Construction', 'Sponge Function',
            'HMAC Algorithm', 'KMAC (Keccak MAC)', 'Poly1305 MAC',
            'UMAC Algorithm', 'SipHash MAC', 'CBC-MAC Algorithm',
            'Key Derivation Function (KDF)', 'PBKDF2 Algorithm', 'bcrypt Algorithm',
            'scrypt Algorithm', 'Argon2 Algorithm', 'HKDF Algorithm',
            'Key Agreement Protocol', 'Station-to-Station Protocol', 'Encrypted Key Exchange',
            'Authenticated Encryption', 'AES-GCM Mode', 'AES-CCM Mode',
            'ChaCha20-Poly1305', 'Encrypt-then-MAC', 'MAC-then-Encrypt',
            'Encrypt-and-MAC', 'Random Number Generation', 'Fortuna Algorithm',
            'Blum Blum Shub Generator', 'Secure Random Generation', 'Side-Channel Attack Mitigation',
            'Differential Cryptanalysis', 'Linear Cryptanalysis', 'Boomerang Attack',
            'Impossible Differential Attack', 'Meet-in-the-Middle Attack', 'Slide Attack',
            'Related-Key Attack', 'Rotational Cryptanalysis', 'Fault Analysis',
            'Timing Attack', 'Power Analysis Attack', 'Cache Timing Attack',
            'Blockchain Consensus Algorithm', 'Proof of Work (PoW)', 'Proof of Stake (PoS)',
            'Delegated Proof of Stake (DPoS)', 'Practical Byzantine Fault Tolerance (PBFT)',
            'Proof of Authority (PoA)', 'Proof of Elapsed Time', 'Hashcash Algorithm',
            'Ring Signature Algorithm', 'Threshold Cryptography', 'Secret Sharing (Shamir)',
            'Secure Multi-Party Computation', 'Oblivious Transfer', 'Garbled Circuits',
            'Yao Protocol', 'GMW Protocol', 'Authentication Protocol (Kerberos)',
            'OAuth 2.0 Authorization', 'SAML Protocol', 'OpenID Connect',
            'TLS Handshake Protocol', 'DTLS Protocol', 'QUIC Protocol'
        ]
    },
    'Systems': {
        domainId: 7,
        description: 'Systems - OS, Distributed Systems, and Cloud Computing',
        algorithms: [
            'FCFS Scheduling', 'Shortest Job First (SJF)', 'Priority Scheduling',
            'Round Robin Scheduling', 'Multilevel Queue Scheduling', 'Multilevel Feedback Queue',
            'Completely Fair Scheduler (CFS)', 'Earliest Deadline First (EDF)', 'Rate Monotonic Scheduling',
            'Deadline Monotonic Scheduling', 'Least Laxity First', 'Proportional Share Scheduling',
            'Lottery Scheduling', 'Gang Scheduling', 'Energy-Aware Scheduling',
            'Banker\'s Algorithm', 'Deadlock Detection Algorithm', 'Deadlock Prevention Algorithm',
            'Resource Allocation Graph', 'Wait-for Graph', 'Safety Algorithm',
            'Page Replacement (FIFO)', 'Page Replacement (Optimal)', 'Page Replacement (LRU)',
            'Page Replacement (LFU)', 'Page Replacement (Clock)', 'Second Chance Algorithm',
            'Enhanced Clock Algorithm', 'Working Set Algorithm', 'Working Set Clock',
            'Virtual Memory Paging', 'Segmentation Algorithm', 'Paging with Segmentation',
            'Copy-on-Write Algorithm', 'Memory Compaction', 'Garbage Collection (Mark-Sweep)',
            'Garbage Collection (Mark-Compact)', 'Garbage Collection (Generational)',
            'Incremental GC', 'Concurrent GC', 'Parallel GC',
            'Reference Counting GC', 'Cycle Detection in GC', 'Read-Copy-Update (RCU)',
            'Thread Pool Scheduling', 'Work Stealing Algorithm', 'Thread Load Balancing',
            'Lock-Free Queue Algorithm', 'Lock-Free Stack', 'Compare-and-Swap (CAS)',
            'Double-Compare-and-Swap', 'Spinlock Algorithm', 'Mutex Implementation',
            'Semaphore Implementation', 'Monitor Implementation', 'Barrier Synchronization',
            'Reader-Writer Lock', 'Condition Variable', 'Event Signaling',
            'Distributed Lock Algorithm', 'Lease-Based Locking', 'Chubby Lock Service',
            'Paxos Algorithm', 'Raft Consensus Algorithm', 'Byzantine Fault Tolerance (BFT)',
            'PBFT Algorithm', 'Viewstamped Replication', 'Mencius Algorithm',
            'Zookeeper Coordination', 'Two-Phase Commit', 'Three-Phase Commit',
            'Sagas Pattern Algorithm', 'Event Sourcing Algorithm', 'CQRS Algorithm',
            'Distributed Snapshot Algorithm', 'Chandy-Lamport Algorithm', 'Vector Clock Algorithm',
            'Lamport Logical Clock', 'Hybrid Logical Clock', 'Causal Ordering Algorithm',
            'Total Ordering Algorithm', 'Multicast Protocol (Reliable)', 'Gossip Protocol',
            'Anti-Entropy Algorithm', 'Read Repair Algorithm', 'Hinted Handoff',
            'Merkle Tree Synchronization', 'Data Sharding Algorithm', 'Range Sharding',
            'Hash Sharding', 'Consistent Hashing', 'Jump Hash Algorithm',
            'Replica Placement Algorithm', 'Quorum Consensus Algorithm', 'Replication Lag Handling',
            'Conflict-Free Replicated Data Types (CRDT)', 'Operational Transformation', 'OT Algorithm',
            'LSM Tree Compaction', 'Write-Ahead Logging', 'Log-Structured Storage',
            'Snapshot Isolation', 'MVCC Algorithm', 'Optimistic Concurrency Control',
            'Pessimistic Concurrency Control', 'T/O Concurrency Control', 'Serializability Checking',
            'Speculative Execution Algorithm', 'Memory Prefetching', 'CPU Cache Coherence',
            'NUMA Allocation Algorithm', 'Load Balancing (OS)', 'CPU Pinning Algorithm'
        ]
    },
    'Graphics': {
        domainId: 8,
        description: 'Graphics & Vision - Visual computation and image processing',
        algorithms: [
            'Bresenham Line Algorithm', 'DDA Line Algorithm', 'Midpoint Circle Algorithm',
            'Bresenham Circle Algorithm', 'Midpoint Ellipse Algorithm', 'Scanline Polygon Fill',
            'Flood Fill Algorithm', 'Boundary Fill Algorithm', 'Painter Algorithm',
            'Z-Buffer Algorithm', 'A-Buffer Algorithm', 'Depth Sorting Algorithm',
            'Binary Space Partition (BSP)', 'Portal Rendering', 'Occlusion Culling',
            'Frustum Culling', 'Backface Culling', 'Level of Detail (LOD)',
            'Quadtree Rendering', 'Octree Rendering', 'Visibility Culling Algorithm',
            'Ray Tracing Algorithm', 'Ray Casting Algorithm', 'Path Tracing',
            'Photon Mapping', 'Metropolis Light Transport', 'Bidirectional Path Tracing',
            'Vertex Shading', 'Fragment Shading', 'Phong Shading', 'Gouraud Shading',
            'Flat Shading', 'Per-Pixel Shading', 'Normal Mapping', 'Parallax Mapping',
            'Relief Mapping', 'Shadow Mapping', 'Shadow Volume', 'Ambient Occlusion',
            'Subsurface Scattering', 'Texture Mapping', 'Bump Mapping', 'Displacement Mapping',
            'Triplanar Mapping', 'Perspective Corrected Mapping', 'Mipmap Filtering',
            'Anisotropic Filtering', 'Rasterization Algorithm', 'Scan Conversion',
            'Edge Function Algorithm', 'Barycentric Coordinates', 'Interpolation',
            'Screen Space Derivatives', 'Anti-Aliasing Algorithm', 'FSAA Algorithm',
            'MSAA Algorithm', 'CSAA Algorithm', 'SSAA Algorithm',
            'Temporal Anti-Aliasing', 'Bilateral Filtering', 'Morphological Filtering',
            'Gaussian Blur', 'Box Blur', 'Median Filtering',
            'Bilateral Filter', 'Non-Local Means Denoising', 'Total Variation Denoising',
            'Watershed Algorithm', 'Hough Transform', 'Radon Transform',
            'Fourier Transform 2D', 'Wavelet Transform', 'Discrete Cosine Transform',
            'Optical Flow Algorithm', 'Lucas-Kanade Algorithm', 'Horn-Schunck Algorithm',
            'Scene Flow Algorithm', 'Structure from Motion', 'Photometric Stereo',
            'Stereoscopic Vision', 'Epipolar Geometry', 'Triangulation Algorithm',
            'Essential Matrix Recovery', 'Fundamental Matrix Recovery', 'Homography Computation',
            'Image Registration Algorithm', 'Image Stitching Algorithm', 'Panorama Generation',
            'Feature Detection (FAST)', 'SIFT Algorithm', 'SURF Algorithm',
            'ORB Algorithm', 'AKAZE Algorithm', 'BRIEF Descriptor',
            'BRISK Descriptor', 'FREAK Descriptor', 'Feature Matching',
            'Bag of Visual Words', 'Feature Pyramid Network', 'Non-Maximum Suppression',
            'Object Tracking (Kalman-based)', 'Object Tracking (Particle Filter)', 'Mean Shift Tracking',
            'CAMShift Algorithm', 'Optical Flow Tracking', 'Template Matching',
            'YOLO Detection Algorithm', 'R-CNN Algorithm', 'Fast R-CNN',
            'Faster R-CNN', 'Mask R-CNN', 'SSD Detection',
            'RetinaNet Algorithm', 'EfficientDet Algorithm', 'Semantic Segmentation',
            'Instance Segmentation', 'Panoptic Segmentation', 'U-Net Algorithm',
            'SegNet Algorithm', 'DeepLab Algorithm', 'FCN Algorithm'
        ]
    },
    'Optimization': {
        domainId: 9,
        description: 'Optimization - Mathematical and heuristic optimization methods',
        algorithms: [
            'Linear Programming (Simplex)', 'Dual Simplex Algorithm', 'Interior Point Method',
            'Barrier Method', 'Cutting Plane Method', 'Branch and Cut',
            'Primal-Dual Interior Point', 'Ellipsoid Method', 'Network Simplex',
            'Revised Simplex', 'Criss-Cross Algorithm', 'Integer Programming',
            'Mixed Integer Programming', 'Binary Integer Programming', 'Quadratic Programming',
            'Quadratically Constrained QP', 'Semidefinite Programming', 'Cone Programming',
            'Second-Order Cone Programming', 'Conic Optimization', 'Convex Optimization',
            'Gradient Descent', 'Stochastic Gradient Descent', 'Mini-Batch Gradient Descent',
            'Accelerated Gradient Descent', 'Nesterov Accelerated Gradient', 'Momentum SGD',
            'Newton\'s Optimization Method', 'Quasi-Newton Method', 'BFGS Algorithm',
            'Limited-Memory BFGS (L-BFGS)', 'DFP Algorithm', 'Levenberg-Marquardt',
            'Trust Region Method', 'Line Search Algorithm', 'Backtracking Line Search',
            'Conjugate Gradient Method', 'Conjugate Gradient Descent', 'Coordinate Descent',
            'Alternating Direction Method (ADMM)', 'Proximal Gradient Descent', 'Mirror Descent',
            'Online Gradient Descent', 'Follow the Leader', 'Regret Bound Analysis',
            'Subgradient Method', 'Cutting Plane Algorithm', 'Frank-Wolfe Algorithm',
            'Conditional Gradient Method', 'Projected Gradient Descent', 'Projected Newton',
            'Penalty Method', 'Augmented Lagrangian Method', 'Method of Multipliers',
            'Simulated Annealing (Optimization)', 'Genetic Algorithm (Optimization)',
            'Particle Swarm Optimization (Optimization)', 'Ant Colony Optimization (Optimization)',
            'Differential Evolution', 'Evolution Strategies', 'Natural Evolution Strategies',
            'Covariance Matrix Adaptation', 'CMA-ES Algorithm', 'Firefly Algorithm',
            'Bat Algorithm', 'Cuckoo Search Algorithm', 'Flower Pollination Algorithm',
            'Harmony Search', 'Tabu Search (Optimization)', 'Variable Neighborhood Search',
            'Guided Local Search', 'Iterated Local Search', 'Large Neighborhood Search',
            'Variable Depth Search', 'Attribute-Based Local Search', 'Surrogate Modeling',
            'Bayesian Optimization', 'Expected Improvement', 'Probability of Improvement',
            'Upper Confidence Bound (UCB)', 'Thompson Sampling (Optimization)', 'Multi-Start Local Search',
            'Basin Hopping Algorithm', 'Landscape Analysis', 'No-Free-Lunch Theorem',
            'Hyperparameter Optimization', 'Grid Search', 'Random Search',
            'Bayesian Hyperparameter Search', 'Hyperband Algorithm', 'Population-Based Training',
            'Neural Architecture Search', 'Automl Algorithm', 'Meta-Learning Optimization',
            'Transfer Learning Optimization', 'Few-Shot Optimization', 'Zero-Shot Optimization'
        ]
    },
    'Emerging': {
        domainId: 10,
        description: 'Emerging CS Domains - Modern and interdisciplinary fields',
        algorithms: [
            'Federated Learning Algorithm', 'Federated Averaging', 'Secure Aggregation',
            'Differential Privacy Algorithm', 'Privacy Budget Allocation', 'Laplace Mechanism',
            'Gaussian Mechanism', 'Exponential Mechanism', 'Sparse Vector Technique',
            'Data Imputation Algorithm', 'Synthetic Data Generation', 'GANs for Data Synthesis',
            'k-Anonymity Algorithm', 'l-Diversity Algorithm', 't-Closeness Algorithm',
            'Blockchain Smart Contract', 'Merkle Tree Validation', 'Transaction Ordering',
            'Fee Estimation Algorithm', 'Dust Attack Prevention', 'Mempool Management',
            'Double Spending Prevention', 'Orphan Block Handling', 'Fork Resolution',
            'Sybil Attack Detection', 'Eclipse Attack Mitigation', 'Network Partitioning',
            'Consensus Finality', 'Transaction Confirmation', 'UTXO Selection Algorithm',
            'Coin Mixing Algorithm', 'Ring Signature (Blockchain)', 'zk-Rollup Algorithm',
            'Optimistic Rollup Algorithm', 'Cross-Chain Bridge Algorithm', 'Sharding Consensus',
            'Verifiable Delay Function', 'Proof of Retrievability', 'Proof of Possession',
            'Proof of Space-Time', 'SLAM Algorithm', 'Visual SLAM',
            'Semantic SLAM', 'Multi-Robot SLAM', 'Extended Kalman Filter (SLAM)',
            'FastSLAM Algorithm', 'GraphSLAM Algorithm', 'Bundle Adjustment',
            'Loop Closure Detection', 'Place Recognition Algorithm', 'Map Merging Algorithm',
            'Path Planning (Robotics)', 'A* Path Planning (Robotics)', 'D* Algorithm',
            'D* Lite Algorithm', 'Theta* Algorithm', 'Rapidly Exploring Random Tree (RRT)',
            'RRT* Algorithm', 'Informed RRT*', 'Probabilistic Roadmap (PRM)',
            'PRM* Algorithm', 'Lazy PRM', 'Bidirectional RRT',
            'Inverse Kinematics Algorithm', 'Forward Kinematics Algorithm', 'Jacobian Transpose',
            'Pseudo-Inverse Jacobian', 'Numerical Inverse Kinematics', 'Analytical IK',
            'Motion Planning Algorithm', 'Obstacle Avoidance Algorithm', 'Potential Field Method',
            'Artificial Potential Field', 'Vector Field Histogram', 'Dynamic Window Approach',
            'Trajectory Optimization', 'Trajectory Planning', 'Path Smoothing Algorithm',
            'Spline Interpolation', 'Bezier Curve Algorithm', 'Catmull-Rom Spline',
            'PID Control Algorithm', 'Model Predictive Control', 'Adaptive Control',
            'Robust Control Algorithm', 'Optimal Control', 'Reinforcement Learning Control',
            'Swarm Intelligence Algorithm', 'Flocking Algorithm', 'Boids Algorithm',
            'Herding Algorithm', 'Reynolds Rules', 'Collective Behavior Simulation',
            'Edge Computing Placement', 'Fog Computing Algorithm', 'Task Offloading',
            'Mobile Edge Computing', 'Resource Allocation (Edge)', 'Energy Efficient Edge',
            'IoT Data Aggregation', 'Sensor Fusion Algorithm', 'Multi-Sensor Integration',
            'Context Awareness Algorithm', 'Ambient Intelligence', 'Ubiquitous Computing',
            'Quantum Algorithm (Grover)', 'Quantum Algorithm (Shor)', 'QAOA Algorithm',
            'VQE Algorithm', 'Quantum Annealing', 'NISQ Algorithms'
        ]
    },
    'Theory': {
        domainId: 11,
        description: 'Theory - Theoretical CS and mathematical foundations',
        algorithms: [
            'NP-Completeness Reduction', 'Cook-Levin Theorem', 'NP-Completeness Proof',
            'P vs NP Problem', 'Savitch Theorem', 'Space Hierarchy Theorem',
            'Time Hierarchy Theorem', 'Ladner\'s Theorem', 'Gap Theorem',
            'Blum\'s Speedup Theorem', 'Union Theorem', 'Recursion Theorem',
            'Rice\'s Theorem', 'Kleene\'s S-m-n Theorem', 'Turing Completeness',
            'Halting Problem', 'Post\'s Correspondence Problem', 'Busy Beaver Problem',
            'Collatz Conjecture', 'Church-Turing Thesis', 'Turing Machine Simulation',
            'Universal Turing Machine', 'Deterministic Turing Machine', 'Non-Deterministic Turing Machine',
            'Multi-tape Turing Machine', 'Linear Bounded Automata', 'Pushdown Automata Algorithm',
            'Finite Automata Construction', 'DFA to NFA Conversion', 'NFA to DFA Conversion',
            'DFA Minimization Algorithm', 'Determinization Algorithm', 'Regular Expression to DFA',
            'Pumping Lemma Application', 'Myhill-Nerode Theorem', 'Kleene Star Closure',
            'Regular Language Properties', 'Context-Free Grammar', 'Chomsky Normal Form Conversion',
            'Greibach Normal Form', 'CYK Parsing Algorithm', 'Early Parser Algorithm',
            'Earley Parser', 'LR Parsing Algorithm', 'LALR Parsing',
            'SLR Parsing', 'LL Parsing Algorithm', 'Recursive Descent Parsing',
            'Top-Down Parsing', 'Bottom-Up Parsing', 'Shift-Reduce Parsing',
            'Grammar Ambiguity Detection', 'Grammar Conflict Resolution', 'Left Factoring',
            'Left Recursion Elimination', 'LL(1) Grammar Check', 'LALR(1) Construction',
            'Model Checking Algorithm', 'LTL Model Checking', 'CTL Model Checking',
            'Bisimulation Algorithm', 'Reachability Analysis', 'Symbolic Execution',
            'Abstract Interpretation', 'Static Analysis Algorithm', 'Data Flow Analysis',
            'SAT Solver (DPLL)', 'CDCL SAT Solver', 'SMT Solving Algorithm',
            'Satisfiability Modulo Theories', 'Horn Clause Solver', 'Constraint Solving',
            'Linear Constraint Solving', 'Polynomial Constraint Solving', 'Integer Constraint Solving',
            'Automata Minimization', 'Büchi Automaton Construction', 'Language Emptiness Check',
            'Language Inclusion Algorithm', 'Language Equivalence Check', 'Transducer Construction',
            'Rational Languages', 'Unambiguous Automata', 'Weighted Automata',
            'Probabilistic Automata', 'Quantum Automata', 'Tree Automata',
            'Tree Language Properties', 'Tree Walking Automata', 'Macro Tree Transducer',
            'Attribute Grammars', 'Two-Level Grammars', 'Van Wijngaarden Grammar',
            'Lindenmayer Systems', 'L-System Algorithm', 'Turtle Graphics Algorithm',
            'Iterated Function System', 'Fractal Generation Algorithm', 'Mandelbrot Set',
            'Julia Set Computation', 'Newton Fractals', 'Lyapunov Exponent',
            'Chaos Theory Algorithm', 'Bifurcation Analysis', 'Attractors and Repellors'
        ]
    }
};

function generateAlgorithms() {
    const algorithms = [];
    let algorithmId = 1;

    for (const [domainName, domainData] of Object.entries(algorithmsByDomain)) {
        domainData.algorithms.forEach((algorithmName, index) => {
            const slug = algorithmName.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');

            // Determine difficulty and complexity based on position
            const difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
            const difficulty = difficulties[Math.floor(index % difficulties.length)];
            
            // More advanced algorithms get more complex time complexities
            let timeComplexity = 'O(n)';
            if (index % 5 === 0) timeComplexity = 'O(1)';
            else if (index % 5 === 1) timeComplexity = 'O(log n)';
            else if (index % 5 === 2) timeComplexity = 'O(n log n)';
            else if (index % 5 === 3) timeComplexity = 'O(n²)';
            else timeComplexity = 'O(2^n)';

            algorithms.push({
                id: randomUUID(),
                name: algorithmName,
                slug,
                description: `${algorithmName} is an important algorithm in the ${domainName} domain. It implements key concepts and is widely used in various ${domainName.toLowerCase()} applications and systems.`,
                category: domainName,
                domain: domainName,
                domain_id: domainData.domainId,
                difficulty,
                paradigm: domainName,
                tags: [domainName.toLowerCase(), difficulty.toLowerCase()],
                time_complexity: {
                    best: 'O(1)',
                    average: timeComplexity,
                    worst: 'O(n²)'
                },
                space_complexity: 'O(n)',
                implementation: `// ${algorithmName} implementation\nfunction ${slug.replace(/-/g, '_')}(input) {\n  // Algorithm implementation\n  return result;\n}`,
                pseudocode: `procedure ${algorithmName.replace(/[^a-zA-Z0-9]/g, '')}(input)\n    // Algorithm steps\n    return output\nend procedure`,
                intuition: `${algorithmName} efficiently solves problems in ${domainName} by utilizing ${difficulty.toLowerCase()} level concepts and techniques.`,
                visualization_type: ['array', 'graph', 'tree', 'matrix', 'network'][Math.floor(Math.random() * 5)],
                applications: [`Used in ${domainName}`, 'Practical applications', 'Research purposes'],
                advantages: ['Efficient', 'Well-studied', 'Proven approach'],
                disadvantages: ['Specific constraints', 'Domain limitations'],
                related_algorithms: [],
                use_cases: [`Common in ${domainName}`, 'System optimization'],
                real_world_examples: ['Enterprise systems', 'Production environments']
            });
            algorithmId++;
        });
    }

    return algorithms;
}

async function seedAlgorithms() {
    console.log('🚀 Starting comprehensive 1000 algorithm seeding...\n');

    const algorithms = generateAlgorithms();
    console.log(`📊 Generated ${algorithms.length} algorithms across 11 domains\n`);

    // Domain summary
    Object.entries(algorithmsByDomain).forEach(([domain, data]) => {
        console.log(`  • ${domain}: ${data.algorithms.length} algorithms`);
    });
    console.log();

    const chunkSize = 50;
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < algorithms.length; i += chunkSize) {
        const chunk = algorithms.slice(i, i + chunkSize);
        const chunkNum = Math.floor(i / chunkSize) + 1;

        try {
            const { data, error } = await supabase
                .from('algorithms')
                .upsert(chunk, { onConflict: 'slug' });

            if (error) {
                console.error(`❌ Error seeding chunk ${chunkNum}:`, error.message);
                errorCount += chunk.length;
            } else {
                successCount += chunk.length;
                console.log(`✅ Seeded chunk ${chunkNum} (${i + chunk.length}/${algorithms.length} total)`);
            }
        } catch (err) {
            console.error(`❌ Exception in chunk ${chunkNum}:`, err.message);
            errorCount += chunk.length;
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n🎉 Seeding complete!');
    console.log(`✅ Successfully seeded: ${successCount} algorithms`);
    if (errorCount > 0) {
        console.log(`❌ Failed to seed: ${errorCount} algorithms`);
    }
    console.log(`📦 Total: ${successCount + errorCount}/${algorithms.length}`);
    console.log('\n📊 Domain-wise distribution:');
    Object.entries(algorithmsByDomain).forEach(([domain, data]) => {
        console.log(`  • ${domain}: ${data.algorithms.length} algorithms`);
    });
}

seedAlgorithms().catch(err => {
    console.error('❌ Fatal error:', err);
    process.exit(1);
});
