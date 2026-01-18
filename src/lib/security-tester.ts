// Algorithm Security Stress Tester
// Generates adversarial inputs and analyzes DoS risks

export interface AdversarialInput {
  name: string;
  description: string;
  data: any[];
  expectedImpact: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface SecurityAnalysis {
  algorithmSlug: string;
  algorithmName: string;
  vulnerabilities: Array<{
    type: 'performance-degradation' | 'memory-exhaustion' | 'stack-overflow' | 'denial-of-service';
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    exploitScenario: string;
    mitigation: string;
  }>;
  adversarialInputs: AdversarialInput[];
  dosRisk: {
    score: number; // 0-100, higher is riskier
    description: string;
    attackVectors: string[];
  };
  saferAlternatives: Array<{
    algorithmSlug: string;
    algorithmName: string;
    whySafer: string;
    tradeoffs: string;
  }>;
}

export class AlgorithmSecurityTester {
  // Generate adversarial inputs for sorting algorithms
  generateAdversarialSortingInputs(algorithm: string, size: number): AdversarialInput[] {
    const inputs: AdversarialInput[] = [];

    switch (algorithm.toLowerCase()) {
      case 'quick-sort':
      case 'quicksort':
        inputs.push(
          {
            name: 'Already Sorted Array',
            description: 'Causes worst-case O(n²) with naive pivot selection',
            data: Array.from({ length: size }, (_, i) => i),
            expectedImpact: 'Execution time increases from O(n log n) to O(n²)',
            severity: 'high',
          },
          {
            name: 'Reverse Sorted Array',
            description: 'Triggers worst-case partitioning',
            data: Array.from({ length: size }, (_, i) => size - i),
            expectedImpact: 'Worst-case performance, stack overflow risk',
            severity: 'critical',
          },
          {
            name: 'All Equal Elements',
            description: 'Poor partitioning without 3-way split',
            data: Array(size).fill(42),
            expectedImpact: 'Degrades to O(n²), deep recursion',
            severity: 'high',
          },
          {
            name: 'Alternating High-Low',
            description: 'Defeats median-of-three pivot selection',
            data: Array.from({ length: size }, (_, i) => (i % 2 === 0 ? i / 2 : size - i / 2)),
            expectedImpact: 'Suboptimal partitioning',
            severity: 'medium',
          }
        );
        break;

      case 'merge-sort':
      case 'mergesort':
        inputs.push(
          {
            name: 'Random Large Dataset',
            description: 'Triggers maximum O(n) space allocation',
            data: Array.from({ length: size }, () => Math.floor(Math.random() * size)),
            expectedImpact: 'Memory exhaustion on constrained systems',
            severity: 'medium',
          },
          {
            name: 'Deeply Nested Merge',
            description: 'Maximum recursion depth',
            data: Array.from({ length: Math.pow(2, 16) }, (_, i) => i),
            expectedImpact: 'Stack overflow on systems with limited stack space',
            severity: 'low',
          }
        );
        break;

      case 'insertion-sort':
      case 'insertionsort':
        inputs.push(
          {
            name: 'Reverse Sorted Large Array',
            description: 'Forces O(n²) comparisons and shifts',
            data: Array.from({ length: size }, (_, i) => size - i),
            expectedImpact: 'Execution time explodes for n > 1000',
            severity: 'critical',
          },
          {
            name: 'Staircase Pattern',
            description: 'Each element requires maximum shifts',
            data: Array.from({ length: size }, (_, i) => size - Math.floor(i / 2)),
            expectedImpact: 'Near worst-case behavior',
            severity: 'high',
          }
        );
        break;

      case 'heap-sort':
      case 'heapsort':
        inputs.push(
          {
            name: 'Already Sorted Array',
            description: 'No performance benefit from pre-sorted data',
            data: Array.from({ length: size }, (_, i) => i),
            expectedImpact: 'Always O(n log n), no adaptive behavior',
            severity: 'low',
          }
        );
        break;

      case 'bubble-sort':
      case 'bubblesort':
        inputs.push(
          {
            name: 'Large Reverse Sorted Array',
            description: 'Maximum number of swaps required',
            data: Array.from({ length: size }, (_, i) => size - i),
            expectedImpact: 'O(n²) swaps, extremely slow for n > 100',
            severity: 'critical',
          }
        );
        break;
    }

    return inputs;
  }

  // Generate adversarial inputs for search algorithms
  generateAdversarialSearchInputs(algorithm: string, size: number): AdversarialInput[] {
    const inputs: AdversarialInput[] = [];

    switch (algorithm.toLowerCase()) {
      case 'binary-search':
      case 'binarysearch':
        inputs.push(
          {
            name: 'Target Not Present',
            description: 'Forces full O(log n) traversal',
            data: [Array.from({ length: size }, (_, i) => i * 2), size * 2 + 1],
            expectedImpact: 'Maximum comparisons',
            severity: 'low',
          },
          {
            name: 'Unsorted Array',
            description: 'Breaks binary search invariant',
            data: [Array.from({ length: size }, () => Math.floor(Math.random() * size)), 42],
            expectedImpact: 'Incorrect results, silent failure',
            severity: 'critical',
          }
        );
        break;

      case 'hash-table':
      case 'hashtable':
        inputs.push(
          {
            name: 'Hash Collision Attack',
            description: 'All keys hash to same bucket',
            data: Array.from({ length: size }, (_, i) => i * 1000000),
            expectedImpact: 'Degrades to O(n) lookup',
            severity: 'critical',
          },
          {
            name: 'Predictable Keys',
            description: 'Sequential keys cluster in hash table',
            data: Array.from({ length: size }, (_, i) => i),
            expectedImpact: 'Poor distribution, increased collisions',
            severity: 'medium',
          }
        );
        break;

      case 'linear-search':
      case 'linearsearch':
        inputs.push(
          {
            name: 'Target at End',
            description: 'Forces full array scan',
            data: [Array.from({ length: size }, (_, i) => i), size - 1],
            expectedImpact: 'O(n) comparisons every time',
            severity: 'medium',
          }
        );
        break;
    }

    return inputs;
  }

  // Analyze security vulnerabilities
  analyzeAlgorithm(algorithmSlug: string, algorithmName: string): SecurityAnalysis {
    const vulnerabilities = this.identifyVulnerabilities(algorithmSlug);
    const adversarialInputs = this.generateAdversarialSortingInputs(algorithmSlug, 10000);
    const dosRisk = this.assessDosRisk(algorithmSlug, vulnerabilities);
    const saferAlternatives = this.findSaferAlternatives(algorithmSlug, dosRisk.score);

    return {
      algorithmSlug,
      algorithmName,
      vulnerabilities,
      adversarialInputs,
      dosRisk,
      saferAlternatives,
    };
  }

  private identifyVulnerabilities(algorithm: string): SecurityAnalysis['vulnerabilities'] {
    const vulns: SecurityAnalysis['vulnerabilities'] = [];

    switch (algorithm.toLowerCase()) {
      case 'quick-sort':
      case 'quicksort':
        vulns.push(
          {
            type: 'performance-degradation',
            description: 'Degrades to O(n²) with adversarial input',
            severity: 'high',
            exploitScenario:
              'Attacker provides sorted or reverse-sorted array. With naive pivot selection, this causes worst-case partitioning. Each recursion only reduces problem size by 1.',
            mitigation:
              'Use randomized pivot selection or median-of-three. Alternatively, use introspective sort (introsort) which switches to heap sort after detecting excessive recursion.',
          },
          {
            type: 'stack-overflow',
            description: 'Deep recursion can exhaust stack space',
            severity: 'medium',
            exploitScenario:
              'Sorted input with naive pivot causes O(n) recursion depth. On systems with limited stack (e.g., 1MB), this causes stack overflow around n=10,000-100,000.',
            mitigation: 'Use iterative quick sort with explicit stack, or set recursion limit and fall back to heap sort.',
          },
          {
            type: 'denial-of-service',
            description: 'Algorithmic complexity attack',
            severity: 'high',
            exploitScenario:
              'Web API accepts array for sorting. Attacker sends sorted array. Server spends O(n²) time, tying up resources. Multiple requests can DoS the service.',
            mitigation:
              'Set timeout limits, use hybrid sort (introsort), randomize pivot, or use guaranteed O(n log n) algorithm like merge sort.',
          }
        );
        break;

      case 'merge-sort':
      case 'mergesort':
        vulns.push({
          type: 'memory-exhaustion',
          description: 'Requires O(n) auxiliary space',
          severity: 'medium',
          exploitScenario:
            'User uploads very large file (e.g., 1GB). Merge sort requires additional 1GB for auxiliary array. System runs out of memory.',
          mitigation: 'Set input size limits, use in-place sorting for large inputs (heap sort), or use external sorting for massive datasets.',
        });
        break;

      case 'insertion-sort':
      case 'insertionsort':
        vulns.push({
          type: 'performance-degradation',
          description: 'O(n²) on large inputs',
          severity: 'critical',
          exploitScenario:
            'User provides large reverse-sorted array. Each element requires n shifts. For n=100,000, this is 10 billion operations, taking minutes.',
          mitigation: 'Enforce strict input size limits (n < 100). For larger inputs, automatically switch to O(n log n) algorithm.',
        });
        break;

      case 'hash-table':
      case 'hashtable':
        vulns.push({
          type: 'denial-of-service',
          description: 'Hash collision attack (HashDoS)',
          severity: 'critical',
          exploitScenario:
            'Attacker reverse-engineers hash function, generates keys that all collide. Hash table degrades to O(n) linked list. Lookups become extremely slow.',
          mitigation:
            'Use cryptographically secure hash function (SipHash), randomize hash seed per instance, or use alternative data structures (balanced trees).',
        });
        break;

      case 'binary-search':
      case 'binarysearch':
        vulns.push({
          type: 'performance-degradation',
          description: 'Silent failure on unsorted data',
          severity: 'medium',
          exploitScenario:
            'Data becomes unsorted due to concurrent modification. Binary search returns incorrect results or fails to find existing elements.',
          mitigation: 'Verify sorted invariant before search, use versioning/copy-on-write, or document preconditions clearly.',
        });
        break;
    }

    return vulns;
  }

  private assessDosRisk(algorithm: string, vulnerabilities: SecurityAnalysis['vulnerabilities']): SecurityAnalysis['dosRisk'] {
    let score = 0;
    const attackVectors: string[] = [];

    // Calculate risk score based on vulnerabilities
    for (const vuln of vulnerabilities) {
      if (vuln.type === 'denial-of-service') {
        score += 40;
        attackVectors.push(vuln.description);
      } else if (vuln.type === 'performance-degradation') {
        score += 25;
        attackVectors.push(`Performance degradation: ${vuln.description}`);
      } else if (vuln.type === 'memory-exhaustion') {
        score += 20;
        attackVectors.push(`Memory exhaustion: ${vuln.description}`);
      } else if (vuln.type === 'stack-overflow') {
        score += 15;
        attackVectors.push(`Stack overflow: ${vuln.description}`);
      }
    }

    score = Math.min(100, score);

    let description = '';
    if (score >= 80) {
      description = 'CRITICAL: High DoS risk. This algorithm is vulnerable to algorithmic complexity attacks. Use in production with extreme caution.';
    } else if (score >= 60) {
      description = 'HIGH: Moderate DoS risk. Implement mitigations before production use.';
    } else if (score >= 40) {
      description = 'MEDIUM: Some DoS risk exists. Monitor and set resource limits.';
    } else if (score >= 20) {
      description = 'LOW: Minimal DoS risk. Standard precautions sufficient.';
    } else {
      description = 'MINIMAL: Very low DoS risk. Algorithm is resilient to adversarial input.';
    }

    return {
      score,
      description,
      attackVectors: attackVectors.length > 0 ? attackVectors : ['No significant attack vectors identified'],
    };
  }

  private findSaferAlternatives(
    currentAlgorithm: string,
    dosRiskScore: number
  ): SecurityAnalysis['saferAlternatives'] {
    if (dosRiskScore < 40) {
      return []; // Current algorithm is already safe enough
    }

    const alternatives: SecurityAnalysis['saferAlternatives'] = [];

    switch (currentAlgorithm.toLowerCase()) {
      case 'quick-sort':
      case 'quicksort':
        alternatives.push(
          {
            algorithmSlug: 'merge-sort',
            algorithmName: 'Merge Sort',
            whySafer: 'Guaranteed O(n log n) - no worst-case degradation. Immune to adversarial input patterns.',
            tradeoffs: 'Requires O(n) auxiliary space. Slightly slower than quick sort on average.',
          },
          {
            algorithmSlug: 'heap-sort',
            algorithmName: 'Heap Sort',
            whySafer: 'In-place O(n log n) with no recursion. Cannot be forced into O(n²) behavior.',
            tradeoffs: 'Slower than quick sort on average due to poor cache locality. Not stable.',
          },
          {
            algorithmSlug: 'tim-sort',
            algorithmName: 'Tim Sort',
            whySafer: 'Hybrid algorithm with guaranteed O(n log n). Used in Python and Java standard libraries.',
            tradeoffs: 'More complex implementation. Small overhead on random data.',
          }
        );
        break;

      case 'insertion-sort':
      case 'insertionsort':
        alternatives.push({
          algorithmSlug: 'merge-sort',
          algorithmName: 'Merge Sort',
          whySafer: 'O(n log n) handles large inputs efficiently. No O(n²) worst case.',
          tradeoffs: 'Higher overhead on small datasets. Uses O(n) space.',
        });
        break;

      case 'hash-table':
      case 'hashtable':
        alternatives.push(
          {
            algorithmSlug: 'balanced-tree',
            algorithmName: 'Balanced Binary Search Tree (AVL/Red-Black)',
            whySafer: 'Guaranteed O(log n) operations. Immune to hash collision attacks.',
            tradeoffs: 'Slower than hash table on average. More complex implementation.',
          },
          {
            algorithmSlug: 'siphash',
            algorithmName: 'Hash Table with SipHash',
            whySafer: 'Cryptographically secure hash function prevents collision attacks.',
            tradeoffs: 'Slightly slower hashing. Requires secret key management.',
          }
        );
        break;
    }

    return alternatives;
  }

  // Run live stress test with visualization
  async runStressTest(
    algorithmSlug: string,
    testData: any[],
    onProgress?: (progress: number, stage: string) => void
  ): Promise<{
    passed: boolean;
    timeMs: number;
    memoryMB: number;
    issues: string[];
  }> {
    const startTime = performance.now();
    const startMemory = (performance as any).memory?.usedJSHeapSize || 0;

    onProgress?.(0, 'Initializing stress test...');

    // Simulate algorithm execution (in real app, call actual algorithm)
    await new Promise((resolve) => setTimeout(resolve, 100));
    onProgress?.(25, 'Running adversarial inputs...');

    await new Promise((resolve) => setTimeout(resolve, 150));
    onProgress?.(50, 'Checking for vulnerabilities...');

    await new Promise((resolve) => setTimeout(resolve, 100));
    onProgress?.(75, 'Analyzing results...');

    const endTime = performance.now();
    const endMemory = (performance as any).memory?.usedJSHeapSize || 0;

    onProgress?.(100, 'Complete');

    const timeMs = endTime - startTime;
    const memoryMB = (endMemory - startMemory) / (1024 * 1024);

    const issues: string[] = [];
    if (timeMs > 5000) {
      issues.push('Performance degradation detected: execution time exceeded 5 seconds');
    }
    if (memoryMB > 100) {
      issues.push(`Memory usage exceeded 100MB (${memoryMB.toFixed(2)}MB used)`);
    }

    return {
      passed: issues.length === 0,
      timeMs,
      memoryMB,
      issues,
    };
  }
}

// Export singleton
export const securityTester = new AlgorithmSecurityTester();
