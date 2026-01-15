// Algorithm Decision Engine - Context-aware algorithm selection
// Considers hardware, input distribution, time constraints, and energy efficiency

export interface SystemContext {
  hardware: {
    cpuCores: number;
    cpuSpeed: number; // GHz
    ramGB: number;
    architecture: 'x86' | 'x64' | 'arm' | 'unknown';
  };
  constraints: {
    maxTimeMs?: number;
    maxMemoryMB?: number;
    energyEfficiency?: 'low' | 'medium' | 'high';
  };
  inputCharacteristics: {
    size: number;
    distribution: 'random' | 'nearly-sorted' | 'reverse-sorted' | 'many-duplicates' | 'uniform' | 'unknown';
    dataType: 'numbers' | 'strings' | 'objects' | 'mixed';
  };
}

export interface DecisionResult {
  primaryChoice: {
    algorithmSlug: string;
    algorithmName: string;
    confidence: number; // 0-100
    reasoning: string[];
    estimatedTimeMs: number;
    estimatedMemoryMB: number;
    energyScore: number; // 0-100, higher is more efficient
  };
  fallbacks: Array<{
    algorithmSlug: string;
    algorithmName: string;
    reason: string;
    confidence: number;
  }>;
  riskAnalysis: {
    worstCaseScenario: string;
    potentialIssues: string[];
    mitigationStrategies: string[];
  };
  alternatives: Array<{
    algorithmSlug: string;
    algorithmName: string;
    whenToBetter: string;
    tradeoffs: string;
  }>;
  explanation: {
    whyThisAlgorithm: string[];
    whyNotOthers: string[];
    failureConditions: string[];
  };
}

// Hardware detection utilities
export function detectSystemContext(): SystemContext {
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const deviceMemory = (navigator as any).deviceMemory || 8; // GB (Chrome only)
  
  return {
    hardware: {
      cpuCores: hardwareConcurrency,
      cpuSpeed: 2.5, // Estimated, actual detection requires native code
      ramGB: deviceMemory,
      architecture: detectArchitecture(),
    },
    constraints: {
      maxTimeMs: undefined,
      maxMemoryMB: undefined,
      energyEfficiency: 'medium',
    },
    inputCharacteristics: {
      size: 1000,
      distribution: 'unknown',
      dataType: 'numbers',
    },
  };
}

function detectArchitecture(): 'x86' | 'x64' | 'arm' | 'unknown' {
  const platform = navigator.platform.toLowerCase();
  if (platform.includes('arm') || platform.includes('iphone') || platform.includes('ipad')) {
    return 'arm';
  }
  if (platform.includes('win64') || platform.includes('x64') || platform.includes('x86_64')) {
    return 'x64';
  }
  if (platform.includes('win32') || platform.includes('x86')) {
    return 'x86';
  }
  return 'unknown';
}

// Core decision engine
export class AlgorithmDecisionEngine {
  private context: SystemContext;

  constructor(context?: SystemContext) {
    this.context = context || detectSystemContext();
  }

  updateContext(context: Partial<SystemContext>): void {
    this.context = { ...this.context, ...context };
  }

  // Main decision method for sorting algorithms
  decideSortingAlgorithm(inputSize: number, distribution: string): DecisionResult {
    const size = inputSize || this.context.inputCharacteristics.size;
    const dist = distribution || this.context.inputCharacteristics.distribution;

    // Small datasets (< 50)
    if (size < 50) {
      return this.recommendInsertionSort(size, dist);
    }

    // Nearly sorted data
    if (dist === 'nearly-sorted') {
      return this.recommendTimSort(size, dist);
    }

    // Many duplicates
    if (dist === 'many-duplicates') {
      return this.recommendThreeWayQuickSort(size, dist);
    }

    // Large datasets with memory constraints
    if (size > 100000 && this.context.hardware.ramGB < 4) {
      return this.recommendHeapSort(size, dist);
    }

    // Default: balanced choice
    return this.recommendMergeSort(size, dist);
  }

  // Searching algorithm decision
  decideSearchingAlgorithm(
    dataStructure: 'array' | 'tree' | 'graph' | 'hash',
    isSorted: boolean,
    size: number
  ): DecisionResult {
    if (dataStructure === 'hash') {
      return this.recommendHashTableSearch(size);
    }

    if (dataStructure === 'array' && isSorted) {
      return this.recommendBinarySearch(size);
    }

    if (dataStructure === 'tree') {
      return this.recommendTreeSearch(size);
    }

    if (dataStructure === 'graph') {
      return this.recommendBFSDFS(size);
    }

    return this.recommendLinearSearch(size);
  }

  // Algorithm-specific recommendations with full context
  private recommendInsertionSort(size: number, distribution: string): DecisionResult {
    return {
      primaryChoice: {
        algorithmSlug: 'insertion-sort',
        algorithmName: 'Insertion Sort',
        confidence: 95,
        reasoning: [
          `Dataset size (${size}) is small - insertion sort has low overhead`,
          'Simple implementation reduces bug risk',
          'Excellent cache performance due to sequential access',
          'Adaptive: performs well on nearly-sorted data',
        ],
        estimatedTimeMs: size * 0.001,
        estimatedMemoryMB: 0.1,
        energyScore: 90,
      },
      fallbacks: [
        {
          algorithmSlug: 'selection-sort',
          algorithmName: 'Selection Sort',
          reason: 'If minimal writes are critical (e.g., flash memory)',
          confidence: 70,
        },
        {
          algorithmSlug: 'bubble-sort',
          algorithmName: 'Bubble Sort',
          reason: 'If early termination on sorted data is needed',
          confidence: 60,
        },
      ],
      riskAnalysis: {
        worstCaseScenario: 'O(n²) time if data is reverse-sorted',
        potentialIssues: [
          'Quadratic scaling - avoid for n > 100',
          'Not suitable for production with variable input sizes',
        ],
        mitigationStrategies: [
          'Set hard limit on input size (n < 50)',
          'Pre-check if data is reverse-sorted, use reverse() + insertion sort',
        ],
      },
      alternatives: [
        {
          algorithmSlug: 'quick-sort',
          algorithmName: 'Quick Sort',
          whenToBetter: 'When dataset grows beyond 100 elements',
          tradeoffs: 'Higher overhead, worse cache performance on small data',
        },
      ],
      explanation: {
        whyThisAlgorithm: [
          'Minimal overhead for small datasets',
          'In-place sorting (O(1) space)',
          'Stable sort maintains relative order',
          'Adaptive to input patterns',
        ],
        whyNotOthers: [
          'Merge Sort: Unnecessary O(n) space overhead',
          'Quick Sort: Recursion overhead not justified',
          'Heap Sort: Poor cache locality',
        ],
        failureConditions: [
          'Dataset exceeds 100 elements - becomes too slow',
          'Reverse-sorted input - hits O(n²) worst case',
          'Real-time constraints with unpredictable input patterns',
        ],
      },
    };
  }

  private recommendMergeSort(size: number, distribution: string): DecisionResult {
    return {
      primaryChoice: {
        algorithmSlug: 'merge-sort',
        algorithmName: 'Merge Sort',
        confidence: 90,
        reasoning: [
          'Guaranteed O(n log n) performance - predictable timing',
          `Dataset size (${size}) benefits from divide-and-conquer`,
          'Stable sort preserves order of equal elements',
          `System has ${this.context.hardware.ramGB}GB RAM - can afford O(n) space`,
        ],
        estimatedTimeMs: (size * Math.log2(size)) * 0.00001,
        estimatedMemoryMB: (size * 8) / (1024 * 1024),
        energyScore: 75,
      },
      fallbacks: [
        {
          algorithmSlug: 'heap-sort',
          algorithmName: 'Heap Sort',
          reason: 'If memory becomes constrained during execution',
          confidence: 85,
        },
        {
          algorithmSlug: 'tim-sort',
          algorithmName: 'Tim Sort',
          reason: 'If data has sorted subsequences',
          confidence: 88,
        },
      ],
      riskAnalysis: {
        worstCaseScenario: 'O(n) space usage may cause memory pressure',
        potentialIssues: [
          'Requires auxiliary array allocation',
          'Not in-place - may fragment memory',
          'Cache misses during merge phase',
        ],
        mitigationStrategies: [
          'Pre-allocate temporary array once, reuse across sorts',
          'Use bottom-up iterative version to reduce stack overhead',
          'Switch to in-place merge for memory-constrained scenarios',
        ],
      },
      alternatives: [
        {
          algorithmSlug: 'quick-sort',
          algorithmName: 'Quick Sort',
          whenToBetter: 'When space is very limited and stability not required',
          tradeoffs: 'O(n²) worst case, but typically faster in practice',
        },
      ],
      explanation: {
        whyThisAlgorithm: [
          'Consistent O(n log n) - no worst-case degradation',
          'Parallelizable - can leverage multiple CPU cores',
          'Stable - maintains relative order',
          'Predictable performance for production systems',
        ],
        whyNotOthers: [
          'Quick Sort: Unpredictable worst case (O(n²))',
          'Heap Sort: Not stable, poor cache performance',
          'Insertion Sort: O(n²) average case too slow',
        ],
        failureConditions: [
          'Available memory < dataset size - will thrash/crash',
          'Embedded systems with < 1MB RAM',
          'Hard real-time systems (GC pauses in auxiliary allocation)',
        ],
      },
    };
  }

  private recommendTimSort(size: number, distribution: string): DecisionResult {
    return {
      primaryChoice: {
        algorithmSlug: 'tim-sort',
        algorithmName: 'Tim Sort (Hybrid)',
        confidence: 97,
        reasoning: [
          'Data is nearly sorted - Tim Sort excels here (can approach O(n))',
          'Combines insertion sort + merge sort advantages',
          'Used by Python, Java - battle-tested in production',
          'Adaptive: detects and exploits existing order',
        ],
        estimatedTimeMs: size * 0.00001, // Near-linear for nearly sorted
        estimatedMemoryMB: (size * 4) / (1024 * 1024),
        energyScore: 85,
      },
      fallbacks: [
        {
          algorithmSlug: 'insertion-sort',
          algorithmName: 'Insertion Sort',
          reason: 'If dataset is very small (< 64 elements)',
          confidence: 80,
        },
      ],
      riskAnalysis: {
        worstCaseScenario: 'Degrades to O(n log n) on random data',
        potentialIssues: [
          'Complex implementation - harder to debug',
          'Overhead not justified if data is truly random',
        ],
        mitigationStrategies: [
          'Profile input distribution before committing',
          'Fall back to merge sort if no runs detected',
        ],
      },
      alternatives: [],
      explanation: {
        whyThisAlgorithm: [
          'Exploits natural runs in data (often present in real-world data)',
          'Best-case O(n) for already sorted data',
          'Stable sort',
          'Industry standard (Python, Java)',
        ],
        whyNotOthers: [
          'Merge Sort: Doesn\'t exploit existing order',
          'Quick Sort: Not stable, no advantage on sorted data',
        ],
        failureConditions: [
          'Truly random data - overhead not justified',
          'Very small datasets - simpler algorithms better',
        ],
      },
    };
  }

  private recommendThreeWayQuickSort(size: number, distribution: string): DecisionResult {
    return {
      primaryChoice: {
        algorithmSlug: 'three-way-quick-sort',
        algorithmName: 'Three-Way Quick Sort',
        confidence: 93,
        reasoning: [
          'Many duplicates detected - 3-way partitioning is optimal',
          'Reduces problem size faster than standard quick sort',
          'Used by modern C++ std::sort for this case',
        ],
        estimatedTimeMs: size * Math.log2(size) * 0.000008,
        estimatedMemoryMB: 0.5,
        energyScore: 80,
      },
      fallbacks: [
        {
          algorithmSlug: 'merge-sort',
          algorithmName: 'Merge Sort',
          reason: 'If stability is required',
          confidence: 85,
        },
      ],
      riskAnalysis: {
        worstCaseScenario: 'Still O(n²) with bad pivot selection',
        potentialIssues: ['Complex partitioning logic', 'Stack overflow on deep recursion'],
        mitigationStrategies: [
          'Use median-of-three pivot selection',
          'Implement iterative version or tail-call optimization',
        ],
      },
      alternatives: [],
      explanation: {
        whyThisAlgorithm: [
          'Handles duplicates optimally - O(n) if all elements equal',
          'Better than standard quick sort for this case',
        ],
        whyNotOthers: [
          'Standard Quick Sort: Doesn\'t handle duplicates efficiently',
          'Merge Sort: Doesn\'t exploit duplicate structure',
        ],
        failureConditions: ['No duplicates - standard quick sort is simpler'],
      },
    };
  }

  private recommendHeapSort(size: number, distribution: string): DecisionResult {
    return {
      primaryChoice: {
        algorithmSlug: 'heap-sort',
        algorithmName: 'Heap Sort',
        confidence: 88,
        reasoning: [
          `Low memory (${this.context.hardware.ramGB}GB) - heap sort is in-place`,
          'O(n log n) worst case guaranteed',
          'No recursion - predictable stack usage',
        ],
        estimatedTimeMs: (size * Math.log2(size)) * 0.000015,
        estimatedMemoryMB: 0.1,
        energyScore: 70,
      },
      fallbacks: [
        {
          algorithmSlug: 'quick-sort',
          algorithmName: 'Quick Sort',
          reason: 'If cache performance is critical',
          confidence: 75,
        },
      ],
      riskAnalysis: {
        worstCaseScenario: 'Poor cache locality - many cache misses',
        potentialIssues: ['Not stable', 'Slower than quick sort in practice'],
        mitigationStrategies: ['Use for space-constrained scenarios only'],
      },
      alternatives: [],
      explanation: {
        whyThisAlgorithm: [
          'In-place sorting - O(1) space',
          'No worst-case degradation',
          'Suitable for embedded systems',
        ],
        whyNotOthers: [
          'Merge Sort: Requires O(n) auxiliary space',
          'Quick Sort: Unstable space usage (recursion)',
        ],
        failureConditions: ['Sufficient memory available - merge sort is faster'],
      },
    };
  }

  private recommendBinarySearch(size: number): DecisionResult {
    return {
      primaryChoice: {
        algorithmSlug: 'binary-search',
        algorithmName: 'Binary Search',
        confidence: 99,
        reasoning: [
          'Data is sorted - binary search is optimal O(log n)',
          'Minimal memory overhead',
          'Cache-friendly for arrays',
        ],
        estimatedTimeMs: Math.log2(size) * 0.0001,
        estimatedMemoryMB: 0.01,
        energyScore: 95,
      },
      fallbacks: [
        {
          algorithmSlug: 'interpolation-search',
          algorithmName: 'Interpolation Search',
          reason: 'If data is uniformly distributed',
          confidence: 85,
        },
      ],
      riskAnalysis: {
        worstCaseScenario: 'O(log n) is already excellent',
        potentialIssues: ['Requires sorted data - must maintain sort invariant'],
        mitigationStrategies: ['Verify data is sorted before search'],
      },
      alternatives: [],
      explanation: {
        whyThisAlgorithm: [
          'Logarithmic time complexity',
          'Simple implementation',
          'Proven and reliable',
        ],
        whyNotOthers: ['Linear Search: O(n) too slow for large datasets'],
        failureConditions: ['Data becomes unsorted - must re-sort'],
      },
    };
  }

  private recommendHashTableSearch(size: number): DecisionResult {
    return {
      primaryChoice: {
        algorithmSlug: 'hash-table-search',
        algorithmName: 'Hash Table Lookup',
        confidence: 98,
        reasoning: [
          'Hash table structure - O(1) average case',
          'Fastest possible lookup',
          'Suitable for frequent queries',
        ],
        estimatedTimeMs: 0.0001,
        estimatedMemoryMB: (size * 16) / (1024 * 1024),
        energyScore: 92,
      },
      fallbacks: [],
      riskAnalysis: {
        worstCaseScenario: 'Hash collisions - degrades to O(n)',
        potentialIssues: ['Memory overhead', 'Poor hash function can cause clustering'],
        mitigationStrategies: ['Use good hash function', 'Monitor load factor'],
      },
      alternatives: [],
      explanation: {
        whyThisAlgorithm: ['Constant time lookup', 'Optimized for search'],
        whyNotOthers: ['Binary Search: O(log n) slower'],
        failureConditions: ['Memory constrained - tree structures may be better'],
      },
    };
  }

  private recommendTreeSearch(size: number): DecisionResult {
    return {
      primaryChoice: {
        algorithmSlug: 'bst-search',
        algorithmName: 'Binary Search Tree',
        confidence: 90,
        reasoning: [
          'Tree structure - O(log n) balanced',
          'Supports range queries',
          'Dynamic insertions/deletions',
        ],
        estimatedTimeMs: Math.log2(size) * 0.0002,
        estimatedMemoryMB: (size * 24) / (1024 * 1024),
        energyScore: 85,
      },
      fallbacks: [],
      riskAnalysis: {
        worstCaseScenario: 'Unbalanced tree - O(n) degradation',
        potentialIssues: ['Requires balancing (AVL, Red-Black)'],
        mitigationStrategies: ['Use self-balancing tree', 'Periodic rebalancing'],
      },
      alternatives: [],
      explanation: {
        whyThisAlgorithm: ['Logarithmic search', 'Dynamic structure'],
        whyNotOthers: ['Hash Table: No range query support'],
        failureConditions: ['Tree becomes unbalanced'],
      },
    };
  }

  private recommendBFSDFS(size: number): DecisionResult {
    return {
      primaryChoice: {
        algorithmSlug: 'bfs',
        algorithmName: 'Breadth-First Search',
        confidence: 85,
        reasoning: [
          'Graph structure - BFS finds shortest path',
          'Level-by-level exploration',
          'Complete search guarantee',
        ],
        estimatedTimeMs: (size + size * 2) * 0.0001,
        estimatedMemoryMB: (size * 12) / (1024 * 1024),
        energyScore: 75,
      },
      fallbacks: [
        {
          algorithmSlug: 'dfs',
          algorithmName: 'Depth-First Search',
          reason: 'If memory is constrained',
          confidence: 80,
        },
      ],
      riskAnalysis: {
        worstCaseScenario: 'O(V + E) - large graphs can be slow',
        potentialIssues: ['Queue memory usage', 'Cyclic graphs need visited tracking'],
        mitigationStrategies: ['Use visited set', 'Iterative deepening for deep graphs'],
      },
      alternatives: [],
      explanation: {
        whyThisAlgorithm: ['Finds shortest path', 'Complete search'],
        whyNotOthers: ['DFS: May not find shortest path'],
        failureConditions: ['Very deep graphs - stack overflow risk'],
      },
    };
  }

  private recommendLinearSearch(size: number): DecisionResult {
    return {
      primaryChoice: {
        algorithmSlug: 'linear-search',
        algorithmName: 'Linear Search',
        confidence: 70,
        reasoning: [
          'Unsorted array - binary search not applicable',
          'Simple implementation',
          'No preprocessing required',
        ],
        estimatedTimeMs: size * 0.0001,
        estimatedMemoryMB: 0.01,
        energyScore: 60,
      },
      fallbacks: [],
      riskAnalysis: {
        worstCaseScenario: 'O(n) - slow for large datasets',
        potentialIssues: ['Linear time complexity'],
        mitigationStrategies: ['Sort data first for repeated queries', 'Use hash table'],
      },
      alternatives: [
        {
          algorithmSlug: 'binary-search',
          algorithmName: 'Binary Search',
          whenToBetter: 'After sorting the data',
          tradeoffs: 'Requires O(n log n) preprocessing',
        },
      ],
      explanation: {
        whyThisAlgorithm: ['No better option for unsorted data', 'Simple to implement'],
        whyNotOthers: ['Binary Search: Requires sorted data'],
        failureConditions: ['Large datasets - consider sorting first'],
      },
    };
  }
}

// Export singleton instance
export const decisionEngine = new AlgorithmDecisionEngine();
