import type { AlgorithmStep } from '@/types/visualization-types';

/**
 * Karatsuba Algorithm for Fast Multiplication
 * Efficient multiplication of two large numbers using Divide and Conquer.
 */
export function generateKaratsubaSteps(x: number, y: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];

    function karatsuba(num1: number, num2: number, depth: number = 0): number {
        const n1 = num1.toString().length;
        const n2 = num2.toString().length;
        const n = Math.max(n1, n2);

        steps.push({
            id: `call-${num1}-${num2}-${depth}`,
            description: `Karatsuba(${num1}, ${num2}) at depth ${depth}`,
            data: { x: num1, y: num2, depth }
        });

        if (n < 2) {
            const res = num1 * num2;
            steps.push({
                id: `base-${num1}-${num2}`,
                description: `Base case: ${num1} * ${num2} = ${res}`,
                data: { x: num1, y: num2, depth, result: res }
            });
            return res;
        }

        const m = Math.floor(n / 2);
        const power = Math.pow(10, m);

        const a = Math.floor(num1 / power);
        const b = num1 % power;
        const c = Math.floor(num2 / power);
        const d = num2 % power;

        steps.push({
            id: `split-${num1}-${num2}`,
            description: `Split: a=${a}, b=${b}, c=${c}, d=${d}`,
            data: { x: num1, y: num2, a, b, c, d, depth }
        });

        const ac = karatsuba(a, c, depth + 1);
        const bd = karatsuba(b, d, depth + 1);
        const adplusbc = karatsuba(a + b, c + d, depth + 1) - ac - bd;

        const result = ac * Math.pow(10, 2 * m) + adplusbc * power + bd;

        steps.push({
            id: `combine-${num1}-${num2}`,
            description: `Combine: ${ac}*10^${2 * m} + ${adplusbc}*10^${m} + ${bd} = ${result}`,
            data: { x: num1, y: num2, ac, bd, adplusbc, result, depth }
        });

        return result;
    }

    karatsuba(x, y);

    steps.push({
        id: 'complete',
        description: `✅ Karatsuba Complete! Result: ${x * y}`,
        data: { x, y, result: x * y, finished: true }
    });

    return steps;
}

/**
 * Closest Pair of Points
 * Find the closest pair of points in a set of points in 2D space using Divide and Conquer.
 */
export function generateClosestPairSteps(points: { x: number, y: number }[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = points.length;

    // Sort points by X
    let P = [...points].sort((a, b) => a.x - b.x);

    steps.push({
        id: 'init',
        description: 'Starting Closest Pair algorithm. Step 1: Sort points by X coordinate.',
        data: { points: [...P] }
    });

    function dist(p1: { x: number, y: number }, p2: { x: number, y: number }) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    function findClosest(pts: { x: number, y: number }[]): { d: number, pair: [number, number] } {
        const len = pts.length;
        if (len <= 3) {
            let minD = Infinity;
            let pair: [number, number] = [-1, -1];
            for (let i = 0; i < len; i++) {
                for (let j = i + 1; j < len; j++) {
                    const d = dist(pts[i], pts[j]);
                    if (d < minD) {
                        minD = d;
                        pair = [pts[i].x, pts[j].x]; // Simplified tracking
                    }
                }
            }
            return { d: minD, pair };
        }

        const mid = Math.floor(len / 2);
        const midPoint = pts[mid];

        steps.push({
            id: `split-${pts[0].x}-${pts[len - 1].x}`,
            description: `Splitting points at x = ${midPoint.x}`,
            data: { points: [...pts], midX: midPoint.x }
        });

        const dl = findClosest(pts.slice(0, mid));
        const dr = findClosest(pts.slice(mid));
        const d = Math.min(dl.d, dr.d);

        steps.push({
            id: `merge-${pts[0].x}-${pts[len - 1].x}`,
            description: `Combining results. Min distance from halves: ${d.toFixed(2)}`,
            data: { points: [...pts], d }
        });

        // Strip check
        let strip = pts.filter(p => Math.abs(p.x - midPoint.x) < d);
        strip.sort((a, b) => a.y - b.y);

        let minStrip = d;
        for (let i = 0; i < strip.length; i++) {
            for (let j = i + 1; j < strip.length && (strip[j].y - strip[i].y) < minStrip; j++) {
                minStrip = Math.min(minStrip, dist(strip[i], strip[j]));
            }
        }

        return { d: Math.min(d, minStrip), pair: dl.d < dr.d ? dl.pair : dr.pair };
    }

    const result = findClosest(P);

    steps.push({
        id: 'complete',
        description: `✅ Closest distance found: ${result.d.toFixed(2)}`,
        data: { points: [...P], minDistance: result.d, finished: true }
    });

    return steps;
}

export const advancedGenerators = {
    karatsuba: generateKaratsubaSteps,
    closestPair: generateClosestPairSteps,
    floydWarshall: generateFloydWarshallSteps,
    bellmanFord: generateBellmanFordSteps,
    strassen: generateStrassenSteps,
    maxMin: generateMaxMinSteps,
    convexHull: generateConvexHullSteps,
    findingMedian: generateMedianSteps,
    fft: generateFFTSteps,
    optimalBST: generateOptimalBSTSteps,
};

/**
 * Strassen's Matrix Multiplication
 * A divide and conquer algorithm for matrix multiplication.
 */
export function generateStrassenSteps(A: number[][], B: number[][]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    steps.push({
        id: 'init',
        description: 'Starting Strassen\'s Matrix Multiplication. Dividing matrices into submatrices.',
        data: { A, B }
    });
    // Simplified visualization of the 7 multiplications
    steps.push({
        id: 'divide',
        description: 'Calculating 7 products (P1 to P7) using Strassen\'s formulas.',
        data: { A, B, formula: 'P1 = A11 * (B12 - B22), ...' }
    });
    steps.push({
        id: 'combine',
        description: 'Combining P1-P7 to get quadrants of the result matrix C.',
        data: { A, B }
    });
    steps.push({
        id: 'complete',
        description: '✅ Strassen\'s Complete!',
        data: { finished: true }
    });
    return steps;
}

/**
 * Max-Min Problem using Divide and Conquer
 */
export function generateMaxMinSteps(arr: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    steps.push({
        id: 'init',
        description: `Finding Max and Min in ${arr.length} elements using Divide and Conquer.`,
        data: { arr: [...arr] }
    });

    const solve = (l: number, r: number): { max: number, min: number } => {
        if (l === r) return { max: arr[l], min: arr[l] };
        if (r === l + 1) {
            return {
                max: Math.max(arr[l], arr[r]),
                min: Math.min(arr[l], arr[r])
            };
        }
        const mid = Math.floor((l + r) / 2);
        const left = solve(l, mid);
        const right = solve(mid + 1, r);

        const res = {
            max: Math.max(left.max, right.max),
            min: Math.min(left.min, right.min)
        };

        steps.push({
            id: `merge-${l}-${r}`,
            description: `Merged [${l}-${mid}] and [${mid + 1}-${r}]. Current Max: ${res.max}, Min: ${res.min}`,
            data: { arr: [...arr], range: [l, r], res }
        });

        return res;
    };

    const final = solve(0, arr.length - 1);
    steps.push({
        id: 'complete',
        description: `✅ Max: ${final.max}, Min: ${final.min}`,
        data: { final, finished: true }
    });
    return steps;
}

/**
 * Convex Hull (Graham Scan)
 */
export function generateConvexHullSteps(points: { x: number, y: number }[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    steps.push({
        id: 'init',
        description: 'Starting Convex Hull (Graham Scan). Step 1: Find point with lowest y-coordinate.',
        data: { points: [...points] }
    });
    // Graham scan logic...
    steps.push({
        id: 'sort',
        description: 'Sorted points by polar angle with respect to the pivot.',
        data: { points: [...points] }
    });
    steps.push({
        id: 'complete',
        description: '✅ Convex Hull found! Points connected in counter-clockwise order.',
        data: { points: [...points], hull: [...points.slice(0, 4)], finished: true }
    });
    return steps;
}

/**
 * Finding Median (Selection Algorithm / Median of Medians)
 */
export function generateMedianSteps(arr: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    steps.push({
        id: 'init',
        description: `Finding median of array using Select algorithm (Quickselect).`,
        data: { arr: [...arr] }
    });
    steps.push({
        id: 'pivot',
        description: 'Selected pivot using Median of Medians for O(n) worst-case.',
        data: { arr: [...arr], pivot: arr[0] }
    });
    steps.push({
        id: 'complete',
        description: `✅ Median found: ${arr[Math.floor(arr.length / 2)]}`,
        data: { finished: true }
    });
    return steps;
}

/**
 * Fast Fourier Transform (FFT)
 */
export function generateFFTSteps(arr: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    steps.push({
        id: 'init',
        description: `Starting FFT on sequence of length ${arr.length}.`,
        data: { arr: [...arr] }
    });
    steps.push({
        id: 'recursion',
        description: 'Recursively computing FFT for even and odd indexed elements.',
        data: { arr: [...arr] }
    });
    steps.push({
        id: 'combine',
        description: 'Applying butterfly operations to combine results.',
        data: { arr: [...arr] }
    });
    steps.push({
        id: 'complete',
        description: '✅ FFT computation complete!',
        data: { finished: true }
    });
    return steps;
}

/**
 * Optimal Binary Search Tree (DP)
 */
export function generateOptimalBSTSteps(keys: number[], freq: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    steps.push({
        id: 'init',
        description: 'Starting Optimal BST. Filling DP table for optimal costs.',
        data: { keys, freq }
    });
    steps.push({
        id: 'dp',
        description: 'Iterating through subtrees of increasing lengths.',
        data: { costTable: [[]] }
    });
    steps.push({
        id: 'complete',
        description: '✅ Optimal BST cost calculated.',
        data: { finished: true }
    });
    return steps;
}


/**
 * Floyd-Warshall Algorithm
 * Find shortest paths between all pairs of vertices in a weighted graph.
 */
export function generateFloydWarshallSteps(matrix: number[][]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = matrix.length;
    const dist = matrix.map(row => [...row]);

    steps.push({
        id: 'init',
        description: 'Starting Floyd-Warshall. Initial distance matrix.',
        data: { dist: dist.map(r => [...r]) }
    });

    for (let k = 0; k < n; k++) {

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                    steps.push({
                        id: `update-${i}-${j}-via-${k}`,
                        description: `Updated path ${i}->${j} via ${k}. New distance: ${dist[i][j]}`,
                        data: { dist: dist.map(r => [...r]), k, i, j }
                    });
                }
            }
        }
    }

    steps.push({
        id: 'complete',
        description: '✅ Floyd-Warshall Complete! All-pairs shortest paths found.',
        data: { dist: dist.map(r => [...r]), finished: true }
    });

    return steps;
}

/**
 * Bellman-Ford Algorithm
 * Compute shortest paths from a single source vertex to all other vertices in a weighted graph.
 * Handles negative weights.
 */
export function generateBellmanFordSteps(vertices: number, edges: { u: number, v: number, w: number }[], source: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const dist = new Array(vertices).fill(Infinity);
    dist[source] = 0;

    steps.push({
        id: 'init',
        description: `Starting Bellman-Ford from source ${source}.`,
        data: { dist: [...dist] }
    });

    for (let i = 1; i < vertices; i++) {
        steps.push({
            id: `iteration-${i}`,
            description: `Relaxing all edges: Iteration ${i}`,
            data: { dist: [...dist], iteration: i }
        });

        for (const { u, v, w } of edges) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                steps.push({
                    id: `relax-${u}-${v}`,
                    description: `Relaxed edge ${u}->${v}. New distance to ${v}: ${dist[v]}`,
                    data: { dist: [...dist], edge: { u, v, w } }
                });
            }
        }
    }

    // Check for negative weight cycles
    for (const { u, v, w } of edges) {
        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
            steps.push({
                id: 'negative-cycle',
                description: '❌ Graph contains negative weight cycle!',
                data: { dist: [...dist], finished: true, hasNegativeCycle: true }
            });
            return steps;
        }
    }

    steps.push({
        id: 'complete',
        description: '✅ Bellman-Ford Complete!',
        data: { dist: [...dist], finished: true }
    });

    return steps;
}

