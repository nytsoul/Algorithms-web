// Real-World System Mapping
// Maps algorithms to production systems and industry use cases

export interface RealWorldUseCase {
  system: string;
  company: string;
  algorithmUsed: string;
  purpose: string;
  scale: string;
  whyThisAlgorithm: string;
  challenges: string[];
  year?: number;
}

export interface SystemCategory {
  name: string;
  description: string;
  useCases: RealWorldUseCase[];
}

export const REAL_WORLD_MAPPINGS: Record<string, SystemCategory[]> = {
  // Sorting Algorithms
  'quick-sort': [
    {
      name: 'Operating Systems',
      description: 'Core system operations and memory management',
      useCases: [
        {
          system: 'Linux Kernel',
          company: 'Linux Foundation',
          algorithmUsed: 'Quick Sort (with introsort fallback)',
          purpose: 'Sorting kernel data structures, process lists',
          scale: 'Millions of processes, 100K+ sort operations/sec',
          whyThisAlgorithm: 'In-place sorting saves memory. Fast average case for kernel data.',
          challenges: ['Must handle adversarial input from malicious processes', 'Hard real-time constraints'],
          year: 1991,
        },
        {
          system: 'Windows NT Kernel',
          company: 'Microsoft',
          algorithmUsed: 'Quick Sort variant',
          purpose: 'Thread scheduling, memory page sorting',
          scale: 'Billions of operations daily across Windows systems',
          whyThisAlgorithm: 'Minimal memory overhead crucial for kernel space',
          challenges: ['Priority inversion risks', 'Must be non-blocking'],
        },
      ],
    },
    {
      name: 'Databases',
      description: 'Query optimization and index maintenance',
      useCases: [
        {
          system: 'MySQL Query Optimizer',
          company: 'Oracle',
          algorithmUsed: 'Quick Sort',
          purpose: 'Sorting result sets, ORDER BY queries',
          scale: '100M+ queries/day on large deployments',
          whyThisAlgorithm: 'Fast in-memory sorting for result sets',
          challenges: ['Memory limits on large result sets', 'Must handle duplicate keys efficiently'],
        },
      ],
    },
  ],

  'merge-sort': [
    {
      name: 'Distributed Systems',
      description: 'Large-scale data processing',
      useCases: [
        {
          system: 'MapReduce',
          company: 'Google',
          algorithmUsed: 'External Merge Sort',
          purpose: 'Sorting petabytes of data across clusters',
          scale: 'Petabytes of data, thousands of machines',
          whyThisAlgorithm: 'Stable sort essential for distributed systems. Predictable O(n log n) performance.',
          challenges: ['Network I/O bottlenecks', 'Fault tolerance across nodes', 'Skewed data distribution'],
          year: 2004,
        },
        {
          system: 'Hadoop',
          company: 'Apache Foundation',
          algorithmUsed: 'Merge Sort',
          purpose: 'Shuffle and sort phase in MapReduce jobs',
          scale: 'Terabytes per job across HDFS',
          whyThisAlgorithm: 'Predictable performance, works well with disk I/O',
          challenges: ['Disk I/O optimization', 'Memory management across nodes'],
        },
      ],
    },
    {
      name: 'Version Control',
      description: 'File and commit operations',
      useCases: [
        {
          system: 'Git',
          company: 'Linus Torvalds',
          algorithmUsed: 'Merge Sort',
          purpose: 'Merging file changes, resolving conflicts',
          scale: 'Millions of repositories on GitHub',
          whyThisAlgorithm: 'Stability crucial - maintains relative order of commits with same timestamp',
          challenges: ['Large repositories (>1M files)', 'Binary file handling'],
          year: 2005,
        },
      ],
    },
  ],

  'tim-sort': [
    {
      name: 'Programming Languages',
      description: 'Standard library implementations',
      useCases: [
        {
          system: 'Python sorted()',
          company: 'Python Software Foundation',
          algorithmUsed: 'Tim Sort',
          purpose: 'Default sorting algorithm for lists',
          scale: 'Billions of sorts daily across Python applications',
          whyThisAlgorithm: 'Optimized for real-world data with natural runs. Stable sort.',
          challenges: ['Handling large datasets efficiently', 'Maintaining stability'],
          year: 2002,
        },
        {
          system: 'Java Arrays.sort()',
          company: 'Oracle',
          algorithmUsed: 'Tim Sort (for objects)',
          purpose: 'Sorting object arrays',
          scale: 'Used in millions of Java applications',
          whyThisAlgorithm: 'Stable, adaptive, performs well on partially sorted data',
          challenges: ['Generic comparison', 'Minimizing allocations'],
          year: 2011,
        },
        {
          system: 'Android Framework',
          company: 'Google',
          algorithmUsed: 'Tim Sort',
          purpose: 'Sorting lists in Android apps',
          scale: 'Billions of mobile devices',
          whyThisAlgorithm: 'Memory-efficient for mobile, good cache performance',
          challenges: ['Limited mobile memory', 'Battery efficiency'],
        },
      ],
    },
  ],

  'heap-sort': [
    {
      name: 'Embedded Systems',
      description: 'Resource-constrained environments',
      useCases: [
        {
          system: 'Real-Time Operating Systems (RTOS)',
          company: 'Various (VxWorks, FreeRTOS)',
          algorithmUsed: 'Heap Sort',
          purpose: 'Task scheduling, priority queues',
          scale: 'Millions of embedded devices',
          whyThisAlgorithm: 'In-place sorting, predictable O(n log n), no recursion',
          challenges: ['Hard real-time constraints', 'Limited RAM (< 1MB)'],
        },
        {
          system: 'IoT Devices',
          company: 'Various manufacturers',
          algorithmUsed: 'Heap Sort',
          purpose: 'Sensor data processing',
          scale: 'Billions of IoT devices worldwide',
          whyThisAlgorithm: 'Minimal memory footprint, no dynamic allocation',
          challenges: ['Ultra-low power requirements', 'Limited processing power'],
        },
      ],
    },
  ],

  'radix-sort': [
    {
      name: 'Graphics & Gaming',
      description: 'High-performance rendering and game engines',
      useCases: [
        {
          system: 'GPU Rendering Pipelines',
          company: 'NVIDIA, AMD',
          algorithmUsed: 'Radix Sort',
          purpose: 'Sorting primitives, depth sorting for transparency',
          scale: '60-144 FPS, millions of primitives per frame',
          whyThisAlgorithm: 'Linear time O(nk), highly parallelizable on GPUs',
          challenges: ['Memory bandwidth limitations', 'Register pressure on GPUs'],
        },
        {
          system: 'Unreal Engine',
          company: 'Epic Games',
          algorithmUsed: 'Radix Sort',
          purpose: 'Particle system sorting, draw call ordering',
          scale: 'AAA games with millions of particles',
          whyThisAlgorithm: 'Predictable performance, SIMD-friendly',
          challenges: ['Cache thrashing on large datasets', 'Platform-specific optimizations'],
        },
      ],
    },
  ],

  'binary-search': [
    {
      name: 'Search Engines',
      description: 'Information retrieval systems',
      useCases: [
        {
          system: 'Google Search',
          company: 'Google',
          algorithmUsed: 'Binary Search on inverted indices',
          purpose: 'Finding documents containing search terms',
          scale: '8.5 billion searches per day',
          whyThisAlgorithm: 'O(log n) lookup in sorted posting lists',
          challenges: ['Distributed indices across data centers', 'Real-time index updates', 'Spelling corrections'],
        },
        {
          system: 'Elasticsearch',
          company: 'Elastic',
          algorithmUsed: 'Binary Search in segments',
          purpose: 'Term lookup in Lucene segments',
          scale: 'Petabytes of indexed data',
          whyThisAlgorithm: 'Fast lookup in immutable sorted segments',
          challenges: ['Segment merging overhead', 'Near-real-time search requirements'],
        },
      ],
    },
    {
      name: 'Databases',
      description: 'Index-based query optimization',
      useCases: [
        {
          system: 'PostgreSQL B-Tree Indexes',
          company: 'PostgreSQL Global Development Group',
          algorithmUsed: 'Binary Search in B-tree nodes',
          purpose: 'Index lookups for WHERE clauses',
          scale: 'Millions of queries per second',
          whyThisAlgorithm: 'Efficient lookup in sorted B-tree pages',
          challenges: ['Page splits during writes', 'Maintaining index consistency'],
        },
      ],
    },
  ],

  'hash-table': [
    {
      name: 'Caching Systems',
      description: 'High-performance in-memory caches',
      useCases: [
        {
          system: 'Redis',
          company: 'Redis Labs',
          algorithmUsed: 'Hash Table',
          purpose: 'Key-value storage, O(1) lookups',
          scale: 'Millions of operations per second',
          whyThisAlgorithm: 'Constant-time lookups critical for caching',
          challenges: ['Memory fragmentation', 'Hash collision handling', 'Eviction policies'],
        },
        {
          system: 'Memcached',
          company: 'Danga Interactive',
          algorithmUsed: 'Hash Table',
          purpose: 'Distributed caching',
          scale: 'Terabytes of cached data across clusters',
          whyThisAlgorithm: 'O(1) lookups essential for cache performance',
          challenges: ['Consistent hashing for distribution', 'Cache invalidation'],
        },
      ],
    },
    {
      name: 'Browsers',
      description: 'Web browser internals',
      useCases: [
        {
          system: 'Chrome V8 Engine',
          company: 'Google',
          algorithmUsed: 'Hash Table',
          purpose: 'JavaScript object properties, symbol tables',
          scale: 'Billions of property lookups per page',
          whyThisAlgorithm: 'Fast property access critical for JS performance',
          challenges: ['Dynamic property additions', 'Memory efficiency', 'Security (HashDoS)'],
        },
        {
          system: 'DNS Resolution',
          company: 'All browsers',
          algorithmUsed: 'Hash Table for DNS cache',
          purpose: 'Caching domain-to-IP mappings',
          scale: 'Every web page load',
          whyThisAlgorithm: 'Fast lookup reduces network latency',
          challenges: ['TTL management', 'Cache poisoning prevention'],
        },
      ],
    },
  ],

  'dijkstra': [
    {
      name: 'Network Routing',
      description: 'Internet and network protocols',
      useCases: [
        {
          system: 'OSPF (Open Shortest Path First)',
          company: 'Internet Engineering Task Force (IETF)',
          algorithmUsed: "Dijkstra's Algorithm",
          purpose: 'Calculating shortest paths in IP networks',
          scale: 'Global internet infrastructure',
          whyThisAlgorithm: 'Finds optimal routes in weighted networks',
          challenges: ['Network topology changes', 'Convergence time', 'Scalability to large networks'],
        },
        {
          system: 'Google Maps',
          company: 'Google',
          algorithmUsed: 'Dijkstra variant (A*)',
          purpose: 'Turn-by-turn navigation',
          scale: '1 billion+ users',
          whyThisAlgorithm: 'Finds shortest path considering distance, time, traffic',
          challenges: ['Real-time traffic updates', 'Multi-criteria optimization', 'Global-scale road networks'],
        },
      ],
    },
  ],

  'bfs': [
    {
      name: 'Social Networks',
      description: 'Relationship analysis and recommendations',
      useCases: [
        {
          system: 'Facebook Friend Suggestions',
          company: 'Meta',
          algorithmUsed: 'BFS on social graph',
          purpose: 'Finding friends-of-friends, connection distance',
          scale: '3 billion users, trillions of connections',
          whyThisAlgorithm: 'Level-by-level exploration finds connections at specific distances',
          challenges: ['Graph size (billions of nodes)', 'Real-time updates', 'Privacy considerations'],
        },
        {
          system: 'LinkedIn "People You May Know"',
          company: 'LinkedIn',
          algorithmUsed: 'BFS with scoring',
          purpose: 'Network expansion recommendations',
          scale: '900 million+ users',
          whyThisAlgorithm: 'Explores professional network systematically',
          challenges: ['Ranking connections', 'Avoiding spam', 'Cross-industry networks'],
        },
      ],
    },
  ],

  'lru-cache': [
    {
      name: 'Operating Systems',
      description: 'Memory management',
      useCases: [
        {
          system: 'Linux Page Cache',
          company: 'Linux Foundation',
          algorithmUsed: 'LRU (Least Recently Used)',
          purpose: 'Managing which pages to keep in RAM vs swap to disk',
          scale: 'Every Linux system worldwide',
          whyThisAlgorithm: 'Keeps frequently accessed pages in fast memory',
          challenges: ['Thrashing prevention', 'Scan resistance', 'Working set estimation'],
        },
        {
          system: 'CPU Cache (Hardware)',
          company: 'Intel, AMD',
          algorithmUsed: 'LRU approximation',
          purpose: 'L1/L2/L3 cache replacement',
          scale: 'Billions of cache operations per second',
          whyThisAlgorithm: 'Temporal locality - recently used data likely to be reused',
          challenges: ['Hardware implementation complexity', 'False sharing', 'Cache coherency'],
        },
      ],
    },
  ],

  'bloom-filter': [
    {
      name: 'Databases',
      description: 'Efficient membership testing',
      useCases: [
        {
          system: 'Cassandra',
          company: 'Apache Foundation',
          algorithmUsed: 'Bloom Filter',
          purpose: 'Avoiding disk reads for non-existent keys',
          scale: 'Petabyte-scale NoSQL databases',
          whyThisAlgorithm: 'Space-efficient probabilistic test, reduces expensive disk I/O',
          challenges: ['False positive rate tuning', 'Memory vs accuracy tradeoff'],
        },
        {
          system: 'Chrome Safe Browsing',
          company: 'Google',
          algorithmUsed: 'Bloom Filter',
          purpose: 'Checking URLs against malicious site list',
          scale: 'Billions of URL checks daily',
          whyThisAlgorithm: 'Compact representation of millions of URLs',
          challenges: ['Update frequency', 'False positive handling', 'Privacy (local vs server checks)'],
        },
      ],
    },
  ],
};

// Get all real-world use cases for an algorithm
export function getRealWorldUseCases(algorithmSlug: string): SystemCategory[] {
  return REAL_WORLD_MAPPINGS[algorithmSlug] || [];
}

// Search for algorithms used in a specific system
export function findAlgorithmsInSystem(systemName: string): Array<{
  algorithmSlug: string;
  useCase: RealWorldUseCase;
}> {
  const results: Array<{ algorithmSlug: string; useCase: RealWorldUseCase }> = [];

  for (const [algorithmSlug, categories] of Object.entries(REAL_WORLD_MAPPINGS)) {
    for (const category of categories) {
      for (const useCase of category.useCases) {
        if (useCase.system.toLowerCase().includes(systemName.toLowerCase())) {
          results.push({ algorithmSlug, useCase });
        }
      }
    }
  }

  return results;
}

// Get industry statistics
export function getIndustryStats(): {
  totalSystems: number;
  totalCompanies: number;
  totalUseCases: number;
  categoryCounts: Record<string, number>;
} {
  let totalUseCases = 0;
  const companies = new Set<string>();
  const systems = new Set<string>();
  const categoryCounts: Record<string, number> = {};

  for (const categories of Object.values(REAL_WORLD_MAPPINGS)) {
    for (const category of categories) {
      categoryCounts[category.name] = (categoryCounts[category.name] || 0) + category.useCases.length;

      for (const useCase of category.useCases) {
        totalUseCases++;
        companies.add(useCase.company);
        systems.add(useCase.system);
      }
    }
  }

  return {
    totalSystems: systems.size,
    totalCompanies: companies.size,
    totalUseCases,
    categoryCounts,
  };
}
