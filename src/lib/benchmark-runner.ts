import { algorithmGenerators } from './algorithm-generators';
import { AlgorithmType } from '@/components/visualizations/AlgorithmVisualizer';

export interface BenchmarkResult {
    algorithmId: string;
    size: number;
    executionTime: number; // ms
    memoryUsage: number;   // MB (estimated or measured)
    stepCount: number;
    timestamp: number;
}

export interface BenchmarkOptions {
    sizes: number[];
    iterations: number;
}

/**
 * Utility to run real benchmarks on visualization generators
 */
export class BenchmarkRunner {
    /**
     * Measure execution of a specific algorithm
     */
    static async runAlgorithm(
        type: AlgorithmType,
        params: any,
        size: number
    ): Promise<BenchmarkResult> {
        const start = performance.now();

        // We use the step generators as they are the primary compute-heavy part of this app
        let steps: any[] = [];

        // Map types to generators
        // We use the names as they appear in the algorithmGenerators object
        switch (type) {
            case 'bubble-sort':
                steps = algorithmGenerators.bubbleSort(params.array);
                break;
            case 'merge-sort':
                steps = algorithmGenerators.mergeSort(params.array);
                break;
            case 'quick-sort':
                steps = algorithmGenerators.quickSort(params.array);
                break;
            case 'selection-sort':
                steps = algorithmGenerators.selectionSort(params.array);
                break;
            case 'insertion-sort':
                steps = algorithmGenerators.insertionSort(params.array);
                break;
            case 'jump-search':
                steps = algorithmGenerators.jumpSearch(params.array, params.target);
                break;
            case 'interpolation-search':
                steps = algorithmGenerators.interpolationSearch(params.array, params.target);
                break;
            case 'fibonacci-search':
                steps = algorithmGenerators.fibonacciSearch(params.array, params.target);
                break;
            default:
                // Generic attempt for any other algorithm in the registry
                const generator = (algorithmGenerators as any)[type];
                if (typeof generator === 'function') {
                    // Try to guess parameters based on category
                    if (type.includes('sort')) {
                        steps = generator(params.array);
                    } else if (type.includes('search')) {
                        steps = generator(params.array, params.target);
                    } else {
                        steps = generator(params.n || 10);
                    }
                }
                break;
        }

        const end = performance.now();

        // Estimate memory by JSON size (rough approximation of heap usage for steps)
        const memoryEstimate = new TextEncoder().encode(JSON.stringify(steps)).length / (1024 * 1024);

        return {
            algorithmId: type,
            size,
            executionTime: end - start,
            memoryUsage: memoryEstimate,
            stepCount: steps.length,
            timestamp: Date.now()
        };
    }

    /**
     * Generate random array for benchmarking
     */
    static generateRandomArray(size: number): number[] {
        return Array.from({ length: size }, () => Math.floor(Math.random() * 10000));
    }

    /**
     * Run a batch of benchmarks
     */
    static async runSuite(
        type: AlgorithmType,
        options: BenchmarkOptions = { sizes: [100, 500, 1000], iterations: 3 }
    ): Promise<BenchmarkResult[]> {
        const results: BenchmarkResult[] = [];

        for (const size of options.sizes) {
            let totalTime = 0;
            let totalMemory = 0;
            let totalSteps = 0;

            for (let i = 0; i < options.iterations; i++) {
                const array = this.generateRandomArray(size);
                // For sorting we need a copy per iteration if we were mutating, 
                // but generators usually return new steps
                const result = await this.runAlgorithm(type, { array, target: array[0] }, size);
                totalTime += result.executionTime;
                totalMemory += result.memoryUsage;
                totalSteps += result.stepCount;
            }

            results.push({
                algorithmId: type,
                size,
                executionTime: totalTime / options.iterations,
                memoryUsage: totalMemory / options.iterations,
                stepCount: Math.round(totalSteps / options.iterations),
                timestamp: Date.now()
            });
        }

        return results;
    }
}
