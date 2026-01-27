# Algorithm Information System - Integration Guide

## Overview

The algorithm information system has been successfully integrated into the project. This provides comprehensive, detailed information for searching, sorting, dynamic programming, and greedy algorithms.

## Files Created

### 1. **algorithm-detailed-info.ts**
Location: `src/lib/algorithm-detailed-info.ts`

Contains:
- Detailed information for 20+ core algorithms
- Categories: Searching, Sorting, Dynamic Programming, Greedy
- Helper functions for querying algorithms
- Support for all difficulty levels (Beginner to Expert)

**Key Functions:**
```typescript
getAlgorithmDetails(slug: string)     // Get specific algorithm details
getAlgorithmsByCategory(category)     // Filter by category
getAlgorithmsByDomain(domain)         // Filter by domain
searchAlgorithms(query)               // Full-text search
```

### 2. **AlgorithmDetailsView.tsx**
Location: `src/components/AlgorithmDetailsView.tsx`

A reusable component that displays:
- Algorithm overview and explanation
- Time and space complexity
- Pseudocode with copy functionality
- Step-by-step execution guides
- Real-world examples
- Related algorithms and prerequisites
- Advantages, disadvantages, and use cases

**Usage:**
```tsx
import AlgorithmDetailsView from '@/components/AlgorithmDetailsView';

<AlgorithmDetailsView slug="binary-search" />
```

## Algorithms Included

### Searching Algorithms (5)
- Linear Search
- Binary Search
- Jump Search
- Interpolation Search
- Exponential Search

### Sorting Algorithms (8)
- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Heap Sort
- Counting Sort
- Radix Sort

### Dynamic Programming (4)
- Fibonacci Series
- 0/1 Knapsack
- Longest Common Subsequence
- Edit Distance

### Greedy Algorithms (5)
- Activity Selection
- Fractional Knapsack
- Huffman Coding
- Dijkstra's Algorithm
- Kruskal's Algorithm

## How to Use

### 1. Display Algorithm Details on Page
```tsx
import AlgorithmDetailsView from '@/components/AlgorithmDetailsView';

export default function AlgorithmPage() {
  return (
    <AlgorithmDetailsView slug="binary-search" />
  );
}
```

### 2. Query Algorithm Information Programmatically
```tsx
import { getAlgorithmDetails, getAlgorithmsByCategory } from '@/lib';

// Get specific algorithm
const algo = getAlgorithmDetails('quicksort');

// Get all sorting algorithms
const sortingAlgos = getAlgorithmsByCategory('Sorting');

// Search by keyword
import { searchAlgorithms } from '@/lib';
const results = searchAlgorithms('tree');
```

### 3. Access Algorithm Data in Components
```tsx
import { DETAILED_ALGORITHMS } from '@/lib/algorithm-detailed-info';

const algorithm = DETAILED_ALGORITHMS['merge-sort'];
console.log(algorithm.timeComplexity);
console.log(algorithm.pseudocode);
```

## Information Structure

Each algorithm includes:
```typescript
{
  id: string;                    // Unique identifier
  name: string;                  // Algorithm name
  slug: string;                  // URL-friendly identifier
  category: string;              // Category (Searching, Sorting, etc.)
  domain: string;                // Domain (DSA, DAA, AI, etc.)
  difficulty: string;            // Beginner|Intermediate|Advanced|Expert
  
  explanation: string;           // What is it?
  description: string;           // How does it work?
  pseudocode: string;            // Algorithm code in pseudocode
  
  timeComplexity: {
    best: string;               // Best case time
    average: string;            // Average case time
    worst: string;              // Worst case time
  };
  spaceComplexity: string;      // Space requirements
  
  keyPoints: string[];          // Important features
  realWorldExamples: string[];  // Practical applications
  prerequisites?: string[];     // What to learn first
  relatedAlgorithms?: string[]; // Similar algorithms
  advantages?: string[];        // Pros
  disadvantages?: string[];     // Cons
  whenToUse?: string[];        // Use cases
  
  dryRunExample?: string;       // Step-by-step example
  stepByStep?: string[];        // Implementation steps
}
```

## Integration with Existing System

### 1. Connect with AlgorithmDetail Page
```tsx
// In src/pages/AlgorithmDetail.tsx
import AlgorithmDetailsView from '@/components/AlgorithmDetailsView';

export default function AlgorithmDetailPage() {
  const { slug } = useParams();
  
  return (
    <div>
      {/* Existing visualization section */}
      <ExistingVisualization />
      
      {/* Add detailed info section */}
      <AlgorithmDetailsView slug={slug} />
    </div>
  );
}
```

### 2. Add to Learn Page
The Learn page can display algorithm details in the Daily Protocol or Learning Paths sections.

### 3. Add to Dashboard
Display featured algorithms with their detailed info.

## Extending the System

### Add a New Algorithm
```typescript
// In algorithm-detailed-info.ts
export const CUSTOM_ALGORITHMS: Record<string, AlgorithmDetailedInfo> = {
  "my-algorithm": {
    id: "custom-001",
    name: "My Custom Algorithm",
    slug: "my-algorithm",
    category: "Custom",
    domain: "DSA",
    difficulty: "Intermediate",
    explanation: "...",
    // ... rest of fields
  }
};

// Add to main export
export const DETAILED_ALGORITHMS = {
  ...SEARCHING_ALGORITHMS,
  ...SORTING_ALGORITHMS,
  ...DP_ALGORITHMS,
  ...GREEDY_ALGORITHMS,
  ...CUSTOM_ALGORITHMS,  // Add this
};
```

### Add New Category
1. Create a new export constant (e.g., `GRAPH_ALGORITHMS`)
2. Add to `DETAILED_ALGORITHMS`
3. Ensure category field matches in algorithms

## Testing

### Test Query Functions
```tsx
// Test getting specific algorithm
const algo = getAlgorithmDetails('bubble-sort');
expect(algo.name).toBe('Bubble Sort');

// Test filtering by category
const sortingAlgos = getAlgorithmsByCategory('Sorting');
expect(sortingAlgos.length).toBeGreaterThan(0);

// Test search
const results = searchAlgorithms('search');
expect(results.some(a => a.name.includes('Search'))).toBe(true);
```

### Test Component
```tsx
render(<AlgorithmDetailsView slug="binary-search" />);
expect(screen.getByText('Binary Search')).toBeInTheDocument();
expect(screen.getByText(/sorted array/i)).toBeInTheDocument();
```

## Performance Notes

- All algorithms are stored in memory as constants
- For very large number of algorithms, consider lazy-loading
- Search uses simple string matching (can be optimized with Lunr.js for 1000+ algorithms)
- Component uses React hooks for state management

## Future Enhancements

1. **Add More Algorithms** - Graph, String, Matrix algorithms
2. **Interactive Visualizations** - Step-by-step animation of algorithms
3. **Code Implementation** - Add actual code in multiple languages
4. **Video Tutorials** - Embed tutorial videos
5. **Practice Problems** - Link to coding problems
6. **Difficulty Progression** - Suggest next algorithms to learn
7. **Performance Comparison** - Compare algorithms side-by-side

## Notes

- All slugs use lowercase with hyphens (e.g., "binary-search")
- Categories match domain structure (Searching, Sorting, DP, Greedy, etc.)
- Difficulty levels are consistent: Beginner → Intermediate → Advanced → Expert
- Real-world examples use realistic, relatable scenarios
- Pseudocode is language-agnostic for broad understanding

## Support

For adding new algorithms or modifying existing information:
1. Update `algorithm-detailed-info.ts`
2. Ensure all required fields are present
3. Follow existing naming conventions
4. Test with component
5. Update this documentation
