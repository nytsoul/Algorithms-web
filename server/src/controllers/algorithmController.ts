import { Request, Response } from 'express';

interface Algorithm {
  id: string;
  name: string;
  category: string;
  description: string;
  complexity: {
    time: string;
    space: string;
  };
}

// Mock data
let algorithms: Algorithm[] = [
  {
    id: '1',
    name: 'Binary Search',
    category: 'Search',
    description: 'Efficient algorithm for finding an item from a sorted list',
    complexity: {
      time: 'O(log n)',
      space: 'O(1)'
    }
  },
  {
    id: '2',
    name: 'Quick Sort',
    category: 'Sorting',
    description: 'Efficient sorting algorithm using divide-and-conquer',
    complexity: {
      time: 'O(n log n)',
      space: 'O(log n)'
    }
  },
  {
    id: '3',
    name: 'Dijkstra\'s Algorithm',
    category: 'Graph',
    description: 'Find shortest paths between nodes in a graph',
    complexity: {
      time: 'O((V + E) log V)',
      space: 'O(V)'
    }
  }
];

export const getAllAlgorithms = (req: Request, res: Response) => {
  res.json({
    success: true,
    count: algorithms.length,
    data: algorithms
  });
};

export const getAlgorithmById = (req: Request, res: Response) => {
  const { id } = req.params;
  const algorithm = algorithms.find(algo => algo.id === id);
  
  if (!algorithm) {
    return res.status(404).json({
      success: false,
      message: 'Algorithm not found'
    });
  }
  
  res.json({
    success: true,
    data: algorithm
  });
};

export const createAlgorithm = (req: Request, res: Response) => {
  const newAlgorithm: Algorithm = {
    id: String(algorithms.length + 1),
    ...req.body
  };
  
  algorithms.push(newAlgorithm);
  
  res.status(201).json({
    success: true,
    data: newAlgorithm
  });
};
