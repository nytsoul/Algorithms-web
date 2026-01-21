import type { AlgorithmStep } from '@/types/visualization-types';

/**
 * Activity Selection Problem
 * Given a set of activities, each with a start time and an end time, 
 * select the maximum number of activities that can be performed by a single person.
 */
export function generateActivitySelectionSteps(startTimes: number[], endTimes: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = startTimes.length;

    // Create activities and sort by end time
    let activities = startTimes.map((s, i) => ({ start: s, end: endTimes[i], originalIndex: i }));

    steps.push({
        id: 'init',
        description: 'Starting Activity Selection. Step 1: Sort activities by end time.',
        data: { activities: [...activities] }
    });

    activities.sort((a, b) => a.end - b.end);

    steps.push({
        id: 'sorted',
        description: 'Activities sorted by end time (Greedy strategy).',
        data: { activities: [...activities] }
    });

    const selected: number[] = [];
    let lastEnd = -1;

    for (let i = 0; i < n; i++) {
        const activity = activities[i];
        const isCompatible = activity.start >= lastEnd;

        steps.push({
            id: `check-${i}`,
            description: `Checking Activity ${activity.originalIndex} (Starts: ${activity.start}, Ends: ${activity.end})`,
            currentIndex: i,
            data: { activities: [...activities], selected: [...selected], lastEnd }
        });

        if (isCompatible) {
            selected.push(activity.originalIndex);
            lastEnd = activity.end;
            steps.push({
                id: `select-${i}`,
                description: `✅ Selected Activity ${activity.originalIndex}. New finish time: ${lastEnd}`,
                currentIndex: i,
                data: { activities: [...activities], selected: [...selected], lastEnd }
            });
        } else {
            steps.push({
                id: `reject-${i}`,
                description: `❌ Rejected Activity ${activity.originalIndex}. Conflicts with current finish time ${lastEnd}`,
                currentIndex: i,
                data: { activities: [...activities], selected: [...selected], lastEnd }
            });
        }
    }

    steps.push({
        id: 'complete',
        description: `✅ Selection Complete! Total activities: ${selected.length}`,
        data: { activities: [...activities], selected: [...selected], finished: true }
    });

    return steps;
}

/**
 * Fractional Knapsack Problem
 * Given weights and values of items, put these items in a knapsack of capacity W 
 * to get the maximum total value in the knapsack.
 */
export function generateFractionalKnapsackSteps(weights: number[], values: number[], capacity: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = weights.length;

    // Calculate ratios
    let items = weights.map((w, i) => ({
        weight: w,
        value: values[i],
        ratio: values[i] / w,
        id: i
    }));

    steps.push({
        id: 'init',
        description: `Knapsack Capacity: ${capacity}. Step 1: Calculate Value/Weight ratios.`,
        data: { items: [...items], currentWeight: 0, currentValue: 0 }
    });

    // Sort by ratio
    items.sort((a, b) => b.ratio - a.ratio);

    steps.push({
        id: 'sorted',
        description: 'Items sorted by value/weight ratio (Greedy strategy).',
        data: { items: [...items], currentWeight: 0, currentValue: 0 }
    });

    let currentWeight = 0;
    let totalValue = 0;
    const contents: any[] = [];

    for (let i = 0; i < n; i++) {
        const item = items[i];
        steps.push({
            id: `process-${i}`,
            description: `Checking item ${item.id} (W: ${item.weight}, V: ${item.value}, Ratio: ${item.ratio.toFixed(2)})`,
            currentIndex: i,
            data: { items: [...items], currentWeight, totalValue, contents: [...contents] }
        });

        if (currentWeight + item.weight <= capacity) {
            currentWeight += item.weight;
            totalValue += item.value;
            contents.push({ id: item.id, fraction: 1, weight: item.weight, value: item.value });

            steps.push({
                id: `take-full-${i}`,
                description: `✅ Took full item ${item.id}. Weight: ${currentWeight}/${capacity}, Value: ${totalValue}`,
                currentIndex: i,
                data: { items: [...items], currentWeight, totalValue, contents: [...contents] }
            });
        } else {
            const remaining = capacity - currentWeight;
            const fraction = remaining / item.weight;
            const partialValue = item.value * fraction;

            totalValue += partialValue;
            currentWeight += remaining;
            contents.push({ id: item.id, fraction, weight: remaining, value: partialValue });

            steps.push({
                id: `take-fraction-${i}`,
                description: `🔸 Took ${Math.round(fraction * 100)}% of item ${item.id}. Knapsack is FULL.`,
                currentIndex: i,
                data: { items: [...items], currentWeight, totalValue, contents: [...contents] }
            });
            break;
        }
    }

    steps.push({
        id: 'complete',
        description: `✅ Knapsack complete! Total Value: ${totalValue.toFixed(2)}`,
        data: { items: [...items], currentWeight, totalValue, contents: [...contents], finished: true }
    });

    return steps;
}

/**
 * Job Sequencing Problem
 * Given a set of jobs where each job has a deadline and profit, 
 * find the maximum profit by performing jobs within deadlines.
 */
export function generateJobSequencingSteps(deadlines: number[], profits: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = deadlines.length;
    const maxDeadline = Math.max(...deadlines);

    let jobs = deadlines.map((d, i) => ({ deadline: d, profit: profits[i], id: i }));

    steps.push({
        id: 'init',
        description: `Starting Job Sequencing. Max deadline: ${maxDeadline}. Sort by profit.`,
        data: { jobs: [...jobs], slots: new Array(maxDeadline).fill(-1) }
    });

    jobs.sort((a, b) => b.profit - a.profit);

    steps.push({
        id: 'sorted',
        description: 'Jobs sorted by profit (Greedy strategy).',
        data: { jobs: [...jobs], slots: new Array(maxDeadline).fill(-1) }
    });

    const slots = new Array(maxDeadline).fill(-1);
    let totalProfit = 0;
    let scheduledCount = 0;

    for (let i = 0; i < n; i++) {
        const job = jobs[i];
        steps.push({
            id: `check-${i}`,
            description: `Checking Job ${job.id} (Profit: ${job.profit}, Deadline: ${job.deadline})`,
            currentIndex: i,
            data: { jobs: [...jobs], slots: [...slots], totalProfit }
        });

        // Try to place in latest possible slot before deadline
        for (let j = Math.min(maxDeadline, job.deadline) - 1; j >= 0; j--) {
            if (slots[j] === -1) {
                slots[j] = job.id;
                totalProfit += job.profit;
                scheduledCount++;
                steps.push({
                    id: `schedule-${i}-${j}`,
                    description: `✅ Scheduled Job ${job.id} in slot ${j + 1}`,
                    currentIndex: i,
                    data: { jobs: [...jobs], slots: [...slots], totalProfit, currentSlot: j }
                });
                break;
            }
        }
    }

    steps.push({
        id: 'complete',
        description: `✅ Job Sequencing Complete! Scheduled: ${scheduledCount}, Profit: ${totalProfit}`,
        data: { jobs: [...jobs], slots: [...slots], totalProfit, finished: true }
    });

    return steps;
}

export const greedyGenerators = {
    activitySelection: generateActivitySelectionSteps,
    fractionalKnapsack: generateFractionalKnapsackSteps,
    jobSequencing: generateJobSequencingSteps,
    huffman: generateHuffmanSteps,
    coinChangeGreedy: generateCoinChangeGreedySteps,
    minPlatforms: generateMinPlatformsSteps,
    optimalMerge: generateOptimalMergeSteps,
};

/**
 * Optimal Merge Pattern
 * Greedy algorithm to merge multiple sorted files with minimum record moves.
 */
export function generateOptimalMergeSteps(files: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    let currentFiles = [...files];
    let totalCost = 0;

    steps.push({
        id: 'init',
        description: `Starting Optimal Merge Pattern for files: [${currentFiles.join(', ')}]`,
        data: { files: [...currentFiles], totalCost }
    });

    while (currentFiles.length > 1) {
        currentFiles.sort((a, b) => a - b);

        const first = currentFiles.shift()!;
        const second = currentFiles.shift()!;
        const cost = first + second;
        totalCost += cost;

        currentFiles.push(cost);

        steps.push({
            id: `merge-${first}-${second}`,
            description: `Merged two smallest files (${first} and ${second}). Merge cost: ${cost}. Total: ${totalCost}`,
            data: { files: [...currentFiles], merged: [first, second], cost, totalCost }
        });
    }

    steps.push({
        id: 'complete',
        description: `✅ Optimal Merge Complete! Total cost: ${totalCost}`,
        data: { totalCost, finished: true }
    });

    return steps;
}


/**
 * Huffman Coding
 * A greedy algorithm used for lossless data compression.
 */
export function generateHuffmanSteps(chars: string[], freq: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    let nodes = chars.map((c, i) => ({ char: c, freq: freq[i], left: null, right: null }));

    steps.push({
        id: 'init',
        description: 'Starting Huffman Coding. Step 1: Create leaf nodes for each character.',
        data: { nodes: [...nodes] }
    });

    while (nodes.length > 1) {
        nodes.sort((a, b) => a.freq - b.freq);

        const left = nodes.shift()!;
        const right = nodes.shift()!;

        const newNode = {
            char: null,
            freq: left.freq + right.freq,
            left,
            right
        };

        nodes.push(newNode as any);

        steps.push({
            id: `merge-${left.char || 'node'}-${right.char || 'node'}`,
            description: `Merged two smallest nodes (${left.freq} and ${right.freq}). New frequency: ${newNode.freq}`,
            data: { nodes: [...nodes], left, right }
        });
    }

    steps.push({
        id: 'complete',
        description: '✅ Huffman Tree built! Root frequency matches total.',
        data: { root: nodes[0], finished: true }
    });

    return steps;
}

/**
 * Coin Change (Greedy Approach)
 * Works for standard currency systems (like 1, 2, 5, 10, etc.) to give change with minimum coins.
 */
export function generateCoinChangeGreedySteps(coins: number[], amount: number): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const sortedCoins = [...coins].sort((a, b) => b - a);

    steps.push({
        id: 'init',
        description: `Making change for ${amount} using greedy strategy. Coins: ${sortedCoins.join(', ')}`,
        data: { coins: sortedCoins, amount, remaining: amount, selected: [] }
    });

    let remaining = amount;
    const selected: number[] = [];

    for (const coin of sortedCoins) {
        if (remaining === 0) break;

        const count = Math.floor(remaining / coin);
        if (count > 0) {
            for (let i = 0; i < count; i++) {
                selected.push(coin);
            }
            remaining %= coin;

            steps.push({
                id: `take-${coin}`,
                description: `Took ${count} coin(s) of value ${coin}. Remaining: ${remaining}`,
                data: { coin, count, remaining, selected: [...selected] }
            });
        }
    }

    steps.push({
        id: 'complete',
        description: remaining === 0 ? `✅ Change made successfully using ${selected.length} coins.` : `❌ Greedy approach could not make exact change. Remaining: ${remaining}`,
        data: { selected, remaining, finished: true }
    });

    return steps;
}

/**
 * Minimum Platforms Problem
 * Find the minimum number of platforms required for a railway station 
 * so that no train has to wait.
 */
export function generateMinPlatformsSteps(arrival: number[], departure: number[]): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = arrival.length;

    const arr = [...arrival].sort((a, b) => a - b);
    const dep = [...departure].sort((a, b) => a - b);

    steps.push({
        id: 'init',
        description: 'Starting Minimum Platforms calculation. Sorted arrival and departure times.',
        data: { arrival: arr, departure: dep }
    });

    let platforms = 0;
    let maxPlatforms = 0;
    let i = 0, j = 0;

    while (i < n && j < n) {
        if (arr[i] <= dep[j]) {
            platforms++;
            i++;
            if (platforms > maxPlatforms) maxPlatforms = platforms;
            steps.push({
                id: `train-arr-${i}`,
                description: `Train arrived at ${arr[i - 1]}. Platforms needed: ${platforms}`,
                data: { platforms, maxPlatforms, currentArrIdx: i, currentDepIdx: j }
            });
        } else {
            platforms--;
            j++;
            steps.push({
                id: `train-dep-${j}`,
                description: `Train departed at ${dep[j - 1]}. Platforms freed: ${platforms}`,
                data: { platforms, maxPlatforms, currentArrIdx: i, currentDepIdx: j }
            });
        }
    }

    steps.push({
        id: 'complete',
        description: `✅ Minimum platforms required: ${maxPlatforms}`,
        data: { maxPlatforms, finished: true }
    });

    return steps;
}

