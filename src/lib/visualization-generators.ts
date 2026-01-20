import { VisualizationStep } from '@/lib/algorithm-schema';

// Generate visualization steps for Linear Search
export function generateLinearSearchSteps(array: number[], target: number): VisualizationStep[] {
    const steps: VisualizationStep[] = [];

    // Initial state
    steps.push({
        step: 0,
        description: `Starting Linear Search for target value ${target}`,
        array: [...array],
        variables: { target, currentIndex: -1 },
        annotations: ['We will check each element sequentially from left to right']
    });

    // Search through array
    for (let i = 0; i < array.length; i++) {
        // Highlight current element
        steps.push({
            step: steps.length,
            description: `Checking element at index ${i}: ${array[i]}`,
            array: [...array],
            highlight: [i],
            variables: { target, currentIndex: i, currentValue: array[i] },
            code: `if (array[${i}] === ${target})`,
            comparison: { indices: [i], result: array[i] === target }
        });

        // Check if found
        if (array[i] === target) {
            steps.push({
                step: steps.length,
                description: `✓ Found! Element ${target} is at index ${i}`,
                array: [...array],
                highlight: [i],
                variables: { target, currentIndex: i, found: true },
                annotations: [`Target value ${target} found at index ${i}`, 'Search completed successfully!']
            });
            return steps;
        }
    }

    // Not found
    steps.push({
        step: steps.length,
        description: `✗ Not Found! Element ${target} is not in the array`,
        array: [...array],
        variables: { target, found: false },
        annotations: ['Checked all elements', 'Target value not present in array']
    });

    return steps;
}

// Generate visualization steps for Binary Search
export function generateBinarySearchSteps(array: number[], target: number): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    let low = 0;
    let high = array.length - 1;

    // Initial state
    steps.push({
        step: 0,
        description: `Starting Binary Search for target value ${target} in sorted array`,
        array: [...array],
        variables: { target, low, high, mid: -1 },
        annotations: ['Array must be sorted for Binary Search', `Search range: [${low}, ${high}]`]
    });

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        // Show current search range
        const rangeHighlight = [];
        for (let i = low; i <= high; i++) {
            rangeHighlight.push(i);
        }

        steps.push({
            step: steps.length,
            description: `Current search range: [${low}, ${high}], calculating middle index`,
            array: [...array],
            highlight: rangeHighlight,
            variables: { target, low, high, mid },
            code: `mid = Math.floor((${low} + ${high}) / 2) = ${mid}`,
            annotations: [`Search space reduced to ${high - low + 1} elements`]
        });

        // Compare with middle element
        steps.push({
            step: steps.length,
            description: `Comparing target ${target} with middle element ${array[mid]} at index ${mid}`,
            array: [...array],
            highlight: [mid],
            variables: { target, low, high, mid, midValue: array[mid] },
            code: `if (array[${mid}] === ${target})`,
            comparison: { indices: [mid], result: array[mid] === target }
        });

        if (array[mid] === target) {
            steps.push({
                step: steps.length,
                description: `✓ Found! Element ${target} is at index ${mid}`,
                array: [...array],
                highlight: [mid],
                variables: { target, low, high, mid, found: true },
                annotations: [`Target value ${target} found at index ${mid}`, 'Search completed successfully!']
            });
            return steps;
        } else if (target < array[mid]) {
            steps.push({
                step: steps.length,
                description: `Target ${target} < ${array[mid]}, searching left half`,
                array: [...array],
                highlight: rangeHighlight.filter(i => i < mid),
                variables: { target, low, high: mid - 1, mid },
                code: `high = mid - 1 = ${mid - 1}`,
                annotations: ['Eliminating right half of search space']
            });
            high = mid - 1;
        } else {
            steps.push({
                step: steps.length,
                description: `Target ${target} > ${array[mid]}, searching right half`,
                array: [...array],
                highlight: rangeHighlight.filter(i => i > mid),
                variables: { target, low: mid + 1, high, mid },
                code: `low = mid + 1 = ${mid + 1}`,
                annotations: ['Eliminating left half of search space']
            });
            low = mid + 1;
        }
    }

    // Not found
    steps.push({
        step: steps.length,
        description: `✗ Not Found! Element ${target} is not in the array`,
        array: [...array],
        variables: { target, low, high, found: false },
        annotations: ['Search space exhausted', 'Target value not present in array']
    });

    return steps;
}

// Generate visualization steps for Bubble Sort
export function generateBubbleSortSteps(array: number[]): VisualizationStep[] {
    const steps: VisualizationStep[] = [];
    const arr = [...array];
    const n = arr.length;

    steps.push({
        step: 0,
        description: 'Starting Bubble Sort - will repeatedly swap adjacent elements if they are in wrong order',
        array: [...arr],
        variables: { n, pass: 0, swaps: 0 },
        annotations: ['Bubble Sort has O(n²) time complexity', 'Larger elements "bubble up" to the end']
    });

    let totalSwaps = 0;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        steps.push({
            step: steps.length,
            description: `Pass ${i + 1}: Comparing adjacent elements`,
            array: [...arr],
            variables: { n, pass: i + 1, swaps: totalSwaps },
            annotations: [`${n - i - 1} elements remaining to sort`]
        });

        for (let j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            steps.push({
                step: steps.length,
                description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
                array: [...arr],
                highlight: [j, j + 1],
                variables: { pass: i + 1, comparing: [arr[j], arr[j + 1]] },
                comparison: { indices: [j, j + 1], result: arr[j] > arr[j + 1] }
            });

            if (arr[j] > arr[j + 1]) {
                // Swap
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                totalSwaps++;
                swapped = true;

                steps.push({
                    step: steps.length,
                    description: `Swapping ${arr[j + 1]} and ${arr[j]} (they were in wrong order)`,
                    array: [...arr],
                    swap: { indices: [j, j + 1] },
                    variables: { pass: i + 1, swaps: totalSwaps },
                    annotations: [`Total swaps: ${totalSwaps}`]
                });
            }
        }

        // Mark last element as sorted
        steps.push({
            step: steps.length,
            description: `Pass ${i + 1} complete. Element at index ${n - i - 1} is now in correct position`,
            array: [...arr],
            sorted: Array.from({ length: i + 1 }, (_, idx) => n - idx - 1),
            variables: { pass: i + 1, swaps: totalSwaps },
            annotations: swapped ? ['Continue to next pass'] : ['No swaps made - array is sorted!']
        });

        if (!swapped) {
            break; // Optimization: if no swaps, array is sorted
        }
    }

    steps.push({
        step: steps.length,
        description: '✓ Sorting complete! All elements are in order',
        array: [...arr],
        sorted: Array.from({ length: n }, (_, i) => i),
        variables: { totalSwaps, passes: steps.length },
        annotations: ['Array is now fully sorted', `Completed in ${totalSwaps} swaps`]
    });

    return steps;
}

/**
 * Dispatcher to get steps for any algorithm by slug
 */
export function getAlgorithmSteps(slug: string, params: any = {}): VisualizationStep[] {
    const defaultArray = [64, 34, 25, 12, 22, 11, 90, 5];
    const sortedArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    switch (slug) {
        case 'linear-search':
            return generateLinearSearchSteps(
                params.array || [10, 50, 30, 70, 80, 20, 90, 40],
                params.target || 30
            );
        case 'binary-search':
            return generateBinarySearchSteps(
                params.array || sortedArray,
                params.target || 70
            );
        case 'bubble-sort':
            return generateBubbleSortSteps(params.array || defaultArray);

        // Placeholder for future implementations
        default:
            console.warn(`No generator found for algorithm: ${slug}`);
            return [];
    }
}
