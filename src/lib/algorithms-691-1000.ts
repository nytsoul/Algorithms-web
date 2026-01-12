import { Algorithm } from './algorithms-data';
import { createAlgorithm } from './algorithms-601-690';

// Domain 43: Advanced DP & Optimization (691-740)
const advancedDPAlgorithms: Algorithm[] = [];
const dpNames = [
    "SOS DP", "Subset Convolution", "Meet-in-the-Middle Algorithm", "Bitmask DP Optimization",
    "DP with Bitsets", "Aliens Trick Optimization", "Convex Hull DP Optimization", "Li Chao Tree DP",
    "Divide & Conquer DP Optimization", "Knapsack with Binary Optimization", "DP on Trees with Rerooting",
    "DP on Cycles", "DP on Functional Graphs", "Digit DP with Constraints", "DP with Inclusion–Exclusion",
    "Expectation DP", "Probabilistic DP", "DP with Monotonic Queue", "DP with Sliding Window",
    "DP on Permutations", "DP on Substrings", "DP on Palindromes", "Game DP (Nim Variants)",
    "Grundy Number Computation", "Sprague–Grundy Algorithm", "DP on Intervals (Advanced)",
    "Tree Knapsack DP", "DP on Bitwise States", "DP with State Compression (Advanced)",
    "DP on Partitions", "DP with Prefix Sums", "DP with Difference Arrays", "Multi-Dimensional DP",
    "DP with Meet States", "Online DP Algorithm", "Approximate DP", "Stochastic DP",
    "Reinforcement Learning DP", "Policy Gradient Optimization", "Value Function Approximation"
];

dpNames.forEach((name, i) => {
    advancedDPAlgorithms.push(createAlgorithm(
        691 + i,
        name,
        43,
        "Advanced DP & Optimization",
        "Dynamic Programming",
        i < 10 ? "Advanced" : "Expert",
        "Dynamic Programming",
        `Advanced DP technique: ${name}`
    ));
});

// Domain 44: Cryptography & Blockchain (741-790)
const cryptoAlgorithms: Algorithm[] = [];
const cryptoNames = [
    "Elliptic Curve Point Addition", "Elliptic Curve Scalar Multiplication", "Miller Algorithm (Pairings)",
    "Boneh–Lynn–Shacham Signature", "Schnorr Signature Algorithm", "ElGamal Encryption",
    "Paillier Cryptosystem", "Homomorphic Encryption", "Zero-Knowledge SNARKs", "Zero-Knowledge STARKs",
    "Merkle Proof Verification", "Proof of Work Algorithm", "Proof of Stake Algorithm",
    "Practical Byzantine Fault Tolerance", "Delegated Proof of Stake", "Hashcash Algorithm",
    "Ring Signature Algorithm", "Threshold Cryptography", "Secure Multi-Party Computation",
    "Oblivious Transfer", "Garbled Circuits", "Side-Channel Attack Algorithm", "Differential Cryptanalysis",
    "Linear Cryptanalysis", "Password Hashing (bcrypt)", "Key Derivation Function",
    "Secure Random Number Generation", "Blockchain Fork Choice Rule", "Smart Contract Execution",
    "Gas Optimization Algorithm", "Sybil Attack Detection", "Eclipse Attack Mitigation",
    "Transaction Fee Optimization", "UTXO Selection Algorithm", "State Trie Traversal",
    "zk-Rollup Algorithm", "Optimistic Rollup Algorithm", "Cross-Chain Bridge Algorithm",
    "Sharding Consensus", "Verifiable Delay Function"
];

cryptoNames.forEach((name, i) => {
    cryptoAlgorithms.push(createAlgorithm(
        741 + i,
        name,
        44,
        "Cryptography & Blockchain",
        "Security",
        i < 15 ? "Advanced" : "Expert",
        "Cryptography",
        `Cryptographic algorithm: ${name}`
    ));
});

// Domain 45: Machine Learning & Deep Learning (791-850)
const mlAlgorithms: Algorithm[] = [];
const mlNames = [
    "Gradient Descent with Momentum", "RMSProp Algorithm", "Adam Optimizer", "AdaGrad Optimizer",
    "AdamW Optimizer", "Backpropagation Through Time", "Long Short-Term Memory Training",
    "GRU Training Algorithm", "Transformer Attention Mechanism", "Self-Attention Algorithm",
    "Multi-Head Attention", "Positional Encoding", "Beam Search Algorithm", "Greedy Decoding",
    "CTC Decoding Algorithm", "Expectation Propagation", "Variational Inference",
    "Variational Autoencoder", "GAN Training Algorithm", "Wasserstein GAN", "Diffusion Model Sampling",
    "Contrastive Learning", "SimCLR Algorithm", "BYOL Algorithm", "Self-Supervised Learning",
    "Active Learning Algorithm", "Semi-Supervised Learning", "Online Learning Algorithm",
    "Multi-Armed Bandit", "Thompson Sampling", "Upper Confidence Bound",
    "Markov Decision Process Solver", "Policy Gradient Algorithm", "Actor–Critic Algorithm",
    "Proximal Policy Optimization", "Deep Q-Network", "Double DQN", "Dueling DQN",
    "Experience Replay", "Curriculum Learning"
];

mlNames.forEach((name, i) => {
    mlAlgorithms.push(createAlgorithm(
        791 + i,
        name,
        45,
        "Machine Learning & Deep Learning",
        "ML",
        i < 20 ? "Intermediate" : "Advanced",
        "Machine Learning",
        `ML algorithm: ${name}`
    ));
});

// Domain 46: Vision, NLP & Signal Processing (851-900)
const visionNLPAlgorithms: Algorithm[] = [];
const visionNames = [
    "Fast Fourier Transform (2D)", "Discrete Cosine Transform", "Wavelet Transform", "Haar Wavelet Algorithm",
    "Speech Recognition (Viterbi-based)", "MFCC Extraction", "LPC Algorithm", "Hidden Markov Speech Decoder",
    "Optical Character Recognition", "Template Matching", "Face Detection (Viola–Jones)",
    "Face Recognition (Eigenfaces)", "Fisherfaces Algorithm", "Local Binary Patterns", "Image Registration",
    "Image Stitching Algorithm", "Bag of Visual Words", "Feature Pyramid Networks",
    "Non-Maximum Suppression", "Object Tracking (Kalman-based)", "Object Tracking (Mean Shift)",
    "YOLO Detection Algorithm", "R-CNN Algorithm", "Fast R-CNN", "Faster R-CNN", "Mask R-CNN",
    "Semantic Segmentation", "Instance Segmentation", "U-Net Algorithm", "Fully Convolutional Network",
    "Named Entity Recognition", "POS Tagging Algorithm", "Dependency Parsing", "Constituency Parsing",
    "Word2Vec CBOW", "Word2Vec Skip-Gram", "GloVe Algorithm", "FastText Algorithm", "TF-IDF Algorithm",
    "BM25 Ranking Algorithm", "Latent Semantic Analysis", "Topic Coherence Algorithm",
    "Text Summarization (Extractive)", "Text Summarization (Abstractive)", "Question Answering Algorithm",
    "Machine Translation (Seq2Seq)", "BLEU Score Algorithm", "ROUGE Score Algorithm",
    "Signal Filtering (Kalman)", "Adaptive Noise Cancellation"
];

visionNames.forEach((name, i) => {
    visionNLPAlgorithms.push(createAlgorithm(
        851 + i,
        name,
        46,
        "Vision, NLP & Signal Processing",
        i < 30 ? "Computer Vision" : "NLP",
        i < 15 ? "Intermediate" : "Advanced",
        i < 30 ? "Vision" : "NLP",
        `${i < 30 ? 'Vision' : 'NLP'} algorithm: ${name}`
    ));
});

// Domain 47: Systems, Cloud & Performance (901-950)
const systemsAlgorithms: Algorithm[] = [];
const systemsNames = [
    "Load Balancing (Round Robin)", "Least Connections Algorithm", "Adaptive Load Balancing",
    "Auto-Scaling Algorithm", "Circuit Breaker Algorithm", "Rate Limiting (Token Bucket)",
    "Rate Limiting (Leaky Bucket)", "Cache Eviction (CLOCK-Pro)", "Cache Replacement (ARC)",
    "Write-Back Cache Algorithm", "Read-Ahead Algorithm", "Speculative Execution Algorithm",
    "Memory Prefetching", "NUMA Allocation Algorithm", "Virtual Memory Paging",
    "Copy-on-Write Algorithm", "Garbage Collection (Mark–Sweep)", "Garbage Collection (Mark–Compact)",
    "Garbage Collection (Generational)", "Reference Counting GC", "Thread Pool Scheduling",
    "Work Stealing Algorithm", "Lock-Free Queue Algorithm", "Compare-and-Swap Algorithm",
    "Spinlock Algorithm", "Read–Copy–Update (RCU)", "Distributed Lock Algorithm",
    "Lease-Based Locking", "Idempotency Algorithm", "Event Sourcing", "Saga Pattern Algorithm",
    "Distributed Rate Limiting", "Vectorized Execution", "Query Plan Caching",
    "Columnar Storage Encoding", "Data Compaction Algorithm", "Sharded Cache Algorithm",
    "Hot–Cold Data Separation", "Failover Algorithm", "Health Check Algorithm",
    "Chaos Engineering Algorithm", "Canary Deployment", "Blue–Green Deployment",
    "Rolling Update Algorithm", "Feature Flag Evaluation", "Service Mesh Routing",
    "API Gateway Throttling", "Observability Sampling", "Tail Latency Reduction",
    "Adaptive Timeout Algorithm"
];

systemsNames.forEach((name, i) => {
    systemsAlgorithms.push(createAlgorithm(
        901 + i,
        name,
        47,
        "Systems, Cloud & Performance",
        "Systems",
        i < 25 ? "Intermediate" : "Advanced",
        "Systems",
        `Systems algorithm: ${name}`
    ));
});

// Domain 48: Theory & Miscellaneous (951-1000)
const theoryAlgorithms: Algorithm[] = [];
const theoryNames = [
    "Approximate Counting Algorithm", "Randomized Rounding", "Lovász Local Lemma",
    "Polynomial Identity Testing", "Perfect Matching (Exact)", "Hall's Marriage Algorithm",
    "Matroid Intersection", "Matroid Union", "Submodular Minimization", "Online Convex Optimization",
    "Learning with Mistakes", "PAC Learning Algorithm", "VC Dimension Computation",
    "Boosting Theory Algorithm", "Noise Sensitivity Analysis", "Complexity Class Reduction",
    "NP-Completeness Reduction", "Cook–Levin Reduction", "Savitch's Algorithm",
    "Space Hierarchy Algorithm", "Time Hierarchy Algorithm", "Circuit Minimization",
    "Boolean Function Learning", "Decision Tree Pruning", "Game Equilibrium Computation",
    "Nash Equilibrium Algorithm", "Correlated Equilibrium", "Mean Field Game Algorithm",
    "Auction Clearing Algorithm", "Market Equilibrium Algorithm", "Stable Coalition Formation",
    "Voting Theory Algorithm", "Social Choice Algorithm", "PageRank Power Iteration",
    "Eigenvector Centrality", "Betweenness Centrality", "Closeness Centrality",
    "Influence Spread Simulation", "Rumor Spreading Algorithm", "Epidemic Modeling Algorithm",
    "SIR Model Simulation", "SIS Model Simulation", "Network Diffusion Algorithm",
    "Opinion Dynamics Algorithm", "Trust Network Propagation", "Reputation System Algorithm",
    "Collaborative Ranking", "Online Recommendation Update", "Cold Start Recommendation",
    "Fairness-Aware ML Algorithm"
];

theoryNames.forEach((name, i) => {
    theoryAlgorithms.push(createAlgorithm(
        951 + i,
        name,
        48,
        "Theory & Miscellaneous",
        "Theory",
        i < 25 ? "Advanced" : "Expert",
        "Theoretical CS",
        `Theoretical algorithm: ${name}`
    ));
});

export const ALGORITHMS_691_1000 = [
    ...advancedDPAlgorithms,
    ...cryptoAlgorithms,
    ...mlAlgorithms,
    ...visionNLPAlgorithms,
    ...systemsAlgorithms,
    ...theoryAlgorithms
];
