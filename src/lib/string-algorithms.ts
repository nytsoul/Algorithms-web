import type { AlgorithmStep } from '@/types/visualization-types';

/**
 * Knuth-Morris-Pratt (KMP) Algorithm
 * String matching algorithm that searches for occurrences of a "word" W within a main "text" T.
 */
export function generateKMPSteps(text: string, pattern: string): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = text.length;
    const m = pattern.length;

    steps.push({
        id: 'init',
        description: `Starting KMP. Text: "${text}", Pattern: "${pattern}"`,
        data: { text, pattern }
    });

    // Step 1: Preprocess pattern (LPS array)
    const lps = new Array(m).fill(0);
    let len = 0;
    let i = 1;

    steps.push({
        id: 'lps-start',
        description: 'Building LPS (Longest Proper Prefix which is also Suffix) array.',
        data: { lps: [...lps] }
    });

    while (i < m) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    steps.push({
        id: 'lps-complete',
        description: `LPS array built: [${lps.join(', ')}]`,
        data: { lps: [...lps] }
    });

    // Step 2: Search
    let j = 0; // index for pattern
    i = 0; // index for text
    while (i < n) {
        steps.push({
            id: `compare-${i}-${j}`,
            description: `Comparing text[${i}] ('${text[i]}') with pattern[${j}] ('${pattern[j]}')`,
            comparedIndices: [i, j],
            data: { i, j, lps: [...lps] }
        });

        if (pattern[j] === text[i]) {
            i++;
            j++;
        }

        if (j === m) {
            steps.push({
                id: `found-${i - j}`,
                description: `✅ Pattern found at index ${i - j}!`,
                highlightedIndices: [i - j],
                data: { i, j, found: true, startIndex: i - j }
            });
            j = lps[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
            steps.push({
                id: `mismatch-${i}`,
                description: `Mismatch! Shifting pattern using LPS.`,
                data: { i, j }
            });
        }
    }

    steps.push({
        id: 'complete',
        description: '✅ KMP Search Complete!',
        data: { finished: true }
    });

    return steps;
}

/**
 * Rabin-Karp Algorithm
 */
export function generateRabinKarpSteps(text: string, pattern: string): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const n = text.length;
    const m = pattern.length;
    const d = 256; // number of characters in the input alphabet
    const q = 101; // a prime number
    let p = 0; // hash value for pattern
    let t = 0; // hash value for text
    let h = 1;

    for (let i = 0; i < m - 1; i++) h = (h * d) % q;

    for (let i = 0; i < m; i++) {
        p = (d * p + pattern.charCodeAt(i)) % q;
        t = (d * t + text.charCodeAt(i)) % q;
    }

    steps.push({
        id: 'init',
        description: `Starting Rabin-Karp. Pattern HASH: ${p}`,
        data: { text, pattern, p }
    });

    for (let i = 0; i <= n - m; i++) {
        steps.push({
            id: `check-hash-${i}`,
            description: `Checking Window ${i}. Current HASH: ${t}`,
            data: { i, t, p }
        });

        if (p === t) {
            steps.push({
                id: `match-hash-${i}`,
                description: `Hash match at index ${i}! Verifying characters...`,
                data: { i, t, p }
            });
            let j = 0;
            for (j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) break;
            }
            if (j === m) {
                steps.push({
                    id: `found-${i}`,
                    description: `✅ Pattern found at index ${i}!`,
                    highlightedIndices: [i],
                    data: { i, found: true }
                });
            }
        }

        if (i < n - m) {
            t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % q;
            if (t < 0) t = (t + q);
        }
    }

    steps.push({
        id: 'complete',
        description: '✅ Rabin-Karp Search Complete!',
        data: { finished: true }
    });

    return steps;
}

export const stringGenerators = {
    kmp: generateKMPSteps,
    rabinKarp: generateRabinKarpSteps,
};
