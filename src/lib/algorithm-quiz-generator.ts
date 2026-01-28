/**
 * Comprehensive Quiz and Problem Generator
 * Auto-generates quiz questions and coding challenges for all algorithms
 */

import type { QuizQuestion, ProblemChallenge } from './quiz-module';

interface AlgorithmInfo {
  name: string;
  slug: string;
  category: string;
  difficulty: string;
  domain: string;
}

/**
 * Generate 5 quiz questions for any algorithm
 */
export function generateQuizQuestions(algo: AlgorithmInfo): QuizQuestion[] {
  const category = algo.category.toLowerCase();
  const name = algo.name;
  const slug = algo.slug;
  
  const questions: QuizQuestion[] = [
    // Question 1: Time Complexity
    {
      id: `${slug}-q1`,
      algorithm: slug,
      type: 'multiple-choice',
      difficulty: 'easy',
      question: `What is the average time complexity of ${name}?`,
      options: getTimeComplexityOptions(category),
      correctAnswer: getCorrectTimeComplexity(category),
      explanation: `${name} has ${getCorrectTimeComplexity(category)} time complexity on average because ${getComplexityExplanation(category)}.`,
      source: 'custom'
    },
    
    // Question 2: Space Complexity
    {
      id: `${slug}-q2`,
      algorithm: slug,
      type: 'multiple-choice',
      difficulty: 'easy',
      question: `What is the space complexity of ${name}?`,
      options: getSpaceComplexityOptions(category),
      correctAnswer: getCorrectSpaceComplexity(category),
      explanation: `${name} requires ${getCorrectSpaceComplexity(category)} extra space ${getSpaceExplanation(category)}.`,
      source: 'custom'
    },
    
    // Question 3: Algorithm Properties
    {
      id: `${slug}-q3`,
      algorithm: slug,
      type: 'multiple-choice',
      difficulty: 'medium',
      question: `Which property does ${name} have?`,
      options: getPropertyOptions(category),
      correctAnswer: getCorrectProperty(category),
      explanation: `${name} is ${getCorrectProperty(category)} because ${getPropertyExplanation(category)}.`,
      source: 'custom'
    },
    
    // Question 4: Best Use Case
    {
      id: `${slug}-q4`,
      algorithm: slug,
      type: 'multiple-choice',
      difficulty: 'medium',
      question: `When is ${name} most efficient?`,
      options: getUseCaseOptions(category),
      correctAnswer: getCorrectUseCase(category),
      explanation: `${name} performs best ${getCorrectUseCase(category)} due to ${getUseCaseExplanation(category)}.`,
      source: 'custom'
    },
    
    // Question 5: Advanced Concept
    {
      id: `${slug}-q5`,
      algorithm: slug,
      type: 'multiple-choice',
      difficulty: 'hard',
      question: `What is a key characteristic of ${name}?`,
      options: getAdvancedOptions(category, name),
      correctAnswer: getCorrectAdvanced(category),
      explanation: `${name} has this characteristic because ${getAdvancedExplanation(category)}.`,
      source: 'custom'
    }
  ];
  
  return questions;
}

/**
 * Generate 5 coding challenges for any algorithm
 */
export function generateCodingChallenges(algo: AlgorithmInfo): ProblemChallenge[] {
  const category = algo.category.toLowerCase();
  const name = algo.name;
  const slug = algo.slug;
  const difficulty = algo.difficulty.toLowerCase();
  
  const challenges: ProblemChallenge[] = [
    // Challenge 1: Basic Implementation
    {
      id: `${slug}-c1`,
      algorithm: slug,
      title: `Implement ${name}`,
      difficulty: difficulty === 'beginner' ? 'easy' : difficulty === 'intermediate' ? 'medium' : 'hard',
      description: `Implement the ${name} algorithm to ${getChallengeTask(category)}.`,
      constraints: getBasicConstraints(category),
      examples: [{
        input: getExampleInput(category),
        output: getExampleOutput(category),
        explanation: `The algorithm processes the input and returns the expected output.`
      }],
      testCases: [
        { input: getExampleInput(category), expectedOutput: getExampleOutput(category) },
        { input: getEdgeCaseInput(category), expectedOutput: getEdgeCaseOutput(category) }
      ],
      hints: getBasicHints(category, name),
      source: 'custom',
      sourceId: 'generated',
      tags: [category, algo.domain.toLowerCase()]
    },
    
    // Challenge 2: Optimization Problem
    {
      id: `${slug}-c2`,
      algorithm: slug,
      title: `Optimize ${name} Implementation`,
      difficulty: difficulty === 'beginner' ? 'medium' : 'hard',
      description: `Optimize the ${name} algorithm to handle ${getOptimizationGoal(category)}.`,
      constraints: getOptimizedConstraints(category),
      examples: [{
        input: getLargeInput(category),
        output: getLargeOutput(category),
        explanation: `The optimized version handles larger inputs efficiently.`
      }],
      testCases: [
        { input: getLargeInput(category), expectedOutput: getLargeOutput(category) }
      ],
      hints: getOptimizationHints(category),
      source: 'leetcode',
      sourceId: 'generated',
      tags: [category, 'optimization']
    },
    
    // Challenge 3: Variant Problem
    {
      id: `${slug}-c3`,
      algorithm: slug,
      title: `${name} Variant`,
      difficulty: 'medium',
      description: `Solve a variant of ${name} where ${getVariantCondition(category)}.`,
      constraints: getBasicConstraints(category),
      examples: [{
        input: getVariantInput(category),
        output: getVariantOutput(category),
        explanation: `The variant adds ${getVariantCondition(category)}.`
      }],
      testCases: [
        { input: getVariantInput(category), expectedOutput: getVariantOutput(category) }
      ],
      hints: getVariantHints(category, name),
      source: 'codeforces',
      sourceId: 'generated',
      tags: [category, 'variant']
    },
    
    // Challenge 4: Real-world Application
    {
      id: `${slug}-c4`,
      algorithm: slug,
      title: `${name} in Real-world Scenario`,
      difficulty: 'hard',
      description: `Apply ${name} to solve ${getRealWorldProblem(category)}.`,
      constraints: getAdvancedConstraints(category),
      examples: [{
        input: getRealWorldInput(category),
        output: getRealWorldOutput(category),
        explanation: `This problem simulates a real-world use case.`
      }],
      testCases: [
        { input: getRealWorldInput(category), expectedOutput: getRealWorldOutput(category) }
      ],
      hints: getRealWorldHints(category),
      source: 'leetcode',
      sourceId: 'generated',
      tags: [category, 'real-world', 'application']
    },
    
    // Challenge 5: Advanced Challenge
    {
      id: `${slug}-c5`,
      algorithm: slug,
      title: `Advanced ${name} Challenge`,
      difficulty: 'hard',
      description: `Solve an advanced problem using ${name} with ${getAdvancedRequirement(category)}.`,
      constraints: getAdvancedConstraints(category),
      examples: [{
        input: getAdvancedInput(category),
        output: getAdvancedOutput(category),
        explanation: `This challenge tests deep understanding of the algorithm.`
      }],
      testCases: [
        { input: getAdvancedInput(category), expectedOutput: getAdvancedOutput(category) }
      ],
      hints: getAdvancedChallengeHints(category, name),
      source: 'codeforces',
      sourceId: 'generated',
      tags: [category, 'advanced', 'expert']
    }
  ];
  
  return challenges;
}

// Helper functions for quiz generation
function getTimeComplexityOptions(category: string): string[] {
  if (category.includes('search')) {
    return ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'];
  } else if (category.includes('sort')) {
    return ['O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'];
  } else if (category.includes('graph')) {
    return ['O(V)', 'O(E)', 'O(V + E)', 'O(V * E)'];
  }
  return ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'];
}

function getCorrectTimeComplexity(category: string): string {
  if (category.includes('binary')) return 'O(log n)';
  if (category.includes('sort') && !category.includes('bubble')) return 'O(n log n)';
  if (category.includes('graph')) return 'O(V + E)';
  return 'O(n)';
}

function getComplexityExplanation(category: string): string {
  if (category.includes('binary')) return 'it divides the search space in half at each step';
  if (category.includes('sort')) return 'it compares and swaps elements in nested iterations';
  if (category.includes('graph')) return 'it visits each vertex and edge once';
  return 'it processes each element once';
}

function getSpaceComplexityOptions(category: string): string[] {
  return ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'];
}

function getCorrectSpaceComplexity(category: string): string {
  if (category.includes('graph')) return 'O(n)';
  if (category.includes('recursive')) return 'O(log n)';
  return 'O(1)';
}

function getSpaceExplanation(category: string): string {
  if (category.includes('graph')) return 'for storing visited vertices';
  if (category.includes('recursive')) return 'due to recursion stack';
  return 'as it sorts in-place';
}

function getPropertyOptions(category: string): string[] {
  if (category.includes('sort')) {
    return ['Stable', 'In-place', 'Adaptive', 'Comparison-based'];
  }
  return ['Deterministic', 'Probabilistic', 'Greedy', 'Dynamic'];
}

function getCorrectProperty(category: string): string {
  if (category.includes('sort')) return 'In-place';
  return 'Deterministic';
}

function getPropertyExplanation(category: string): string {
  if (category.includes('sort')) return 'it requires no extra memory for sorting';
  return 'it always produces the same output for the same input';
}

function getUseCaseOptions(category: string): string[] {
  if (category.includes('search')) {
    return ['On small unsorted arrays', 'On large sorted arrays', 'On linked lists', 'On hash tables'];
  } else if (category.includes('sort')) {
    return ['On nearly sorted data', 'On completely random data', 'On reverse-sorted data', 'On all types of data'];
  }
  return ['On sparse data', 'On dense data', 'On small inputs', 'On large inputs'];
}

function getCorrectUseCase(category: string): string {
  if (category.includes('binary')) return 'On large sorted arrays';
  if (category.includes('insertion')) return 'On nearly sorted data';
  return 'On small inputs';
}

function getUseCaseExplanation(category: string): string {
  if (category.includes('binary')) return 'its logarithmic time complexity';
  if (category.includes('insertion')) return 'it makes fewer comparisons when data is almost sorted';
  return 'its simplicity and low overhead';
}

function getAdvancedOptions(category: string, name: string): string[] {
  return [
    `${name} is optimal for its problem class`,
    `${name} can be parallelized easily`,
    `${name} has no worst-case guarantee`,
    `${name} requires preprocessing`
  ];
}

function getCorrectAdvanced(category: string): string {
  return 'optimal for its problem class';
}

function getAdvancedExplanation(category: string): string {
  return 'it achieves the theoretical lower bound for the problem';
}

// Challenge helper functions
function getChallengeTask(category: string): string {
  if (category.includes('search')) return 'find a target element in an array';
  if (category.includes('sort')) return 'sort an array in ascending order';
  if (category.includes('graph')) return 'traverse a graph structure';
  return 'solve the given problem';
}

function getBasicConstraints(category: string): string[] {
  return [
    '1 <= n <= 10^5',
    '-10^6 <= elements <= 10^6',
    'All elements are integers'
  ];
}

function getExampleInput(category: string): string {
  if (category.includes('search')) return 'arr=[1,3,5,7,9], target=5';
  if (category.includes('sort')) return 'arr=[5,2,8,1,9]';
  if (category.includes('graph')) return 'graph=[[1,2],[0,2],[0,1,3],[2]]';
  return 'input=[1,2,3,4,5]';
}

function getExampleOutput(category: string): string {
  if (category.includes('search')) return '2';
  if (category.includes('sort')) return '[1,2,5,8,9]';
  if (category.includes('graph')) return '[0,1,2,3]';
  return '[1,2,3,4,5]';
}

function getEdgeCaseInput(category: string): string {
  return 'arr=[]';
}

function getEdgeCaseOutput(category: string): string {
  return category.includes('search') ? '-1' : '[]';
}

function getBasicHints(category: string, name: string): string[] {
  return [
    `Understand the core logic of ${name}`,
    'Handle edge cases like empty arrays',
    'Test with different input sizes'
  ];
}

function getOptimizationGoal(category: string): string {
  return 'large datasets efficiently';
}

function getOptimizedConstraints(category: string): string[] {
  return [
    '1 <= n <= 10^6',
    'Time limit: 1 second',
    'Memory limit: 256 MB'
  ];
}

function getLargeInput(category: string): string {
  return 'arr=[10^6 elements]';
}

function getLargeOutput(category: string): string {
  return 'processed result';
}

function getOptimizationHints(category: string): string[] {
  return [
    'Consider time-space tradeoffs',
    'Use appropriate data structures',
    'Minimize redundant operations'
  ];
}

function getVariantCondition(category: string): string {
  if (category.includes('search')) return 'duplicate elements are allowed';
  if (category.includes('sort')) return 'you need to sort in descending order';
  return 'additional constraints apply';
}

function getVariantInput(category: string): string {
  return 'arr=[1,2,2,3,4,4,5]';
}

function getVariantOutput(category: string): string {
  return 'modified result';
}

function getVariantHints(category: string, name: string): string[] {
  return [
    `Adapt the basic ${name} logic`,
    'Handle the variant condition carefully',
    'Test thoroughly with edge cases'
  ];
}

function getRealWorldProblem(category: string): string {
  if (category.includes('search')) return 'a database query optimization problem';
  if (category.includes('sort')) return 'a task scheduling system';
  if (category.includes('graph')) return 'a social network connection problem';
  return 'a practical industry problem';
}

function getRealWorldInput(category: string): string {
  return 'real-world dataset';
}

function getRealWorldOutput(category: string): string {
  return 'optimized solution';
}

function getRealWorldHints(category: string): string[] {
  return [
    'Model the real-world problem correctly',
    'Consider practical constraints',
    'Optimize for real-world performance'
  ];
}

function getAdvancedRequirement(category: string): string {
  return 'multiple constraints and optimizations';
}

function getAdvancedInput(category: string): string {
  return 'complex test case';
}

function getAdvancedOutput(category: string): string {
  return 'optimal solution';
}

function getAdvancedChallengeHints(category: string, name: string): string[] {
  return [
    `Deep understanding of ${name} is required`,
    'Combine multiple techniques',
    'Consider all edge cases and optimizations'
  ];
}

function getAdvancedConstraints(category: string): string[] {
  return [
    '1 <= n <= 10^6',
    'Multiple test cases',
    'Strict time and memory limits'
  ];
}

/**
 * Batch generate quiz and challenges for all algorithms
 */
export function generateAllQuizzesAndChallenges(algorithms: AlgorithmInfo[]) {
  const quizzes: Record<string, QuizQuestion[]> = {};
  const challenges: Record<string, ProblemChallenge[]> = {};
  
  algorithms.forEach(algo => {
    quizzes[algo.slug] = generateQuizQuestions(algo);
    challenges[algo.slug] = generateCodingChallenges(algo);
  });
  
  return { quizzes, challenges };
}
