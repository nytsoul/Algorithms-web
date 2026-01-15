import { Request, Response } from 'express';
<<<<<<< HEAD

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
=======
import { supabase } from '../lib/supabase';

export const getAllAlgorithms = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('algorithms')
      .select('*')
      .order('name');

    if (error) {
      // If table doesn't exist or Supabase is not configured, return empty array
      // Frontend will fall back to mock data
      console.warn('[Backend] Supabase query failed:', error.message);
      return res.json({
        success: true,
        count: 0,
        data: [],
        message: 'Database not configured, using mock data'
      });
    }

    res.json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (err: any) {
    console.error('[Backend] Algorithm fetch error:', err.message);
    // Return empty array instead of 500 error
    res.json({
      success: true,
      count: 0,
      data: [],
      message: 'Fallback to mock data'
    });
  }
};

export const getAlgorithmById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('algorithms')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(error.code === 'PGRST116' ? 404 : 500).json({
        success: false,
        message: error.code === 'PGRST116' ? 'Algorithm not found' : error.message
      });
    }

    res.json({
      success: true,
      data: data
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createAlgorithm = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('algorithms')
      .insert([req.body])
      .select();

    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }

    res.status(201).json({
      success: true,
      data: data[0]
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
>>>>>>> 6940946 (initial commit)
};
