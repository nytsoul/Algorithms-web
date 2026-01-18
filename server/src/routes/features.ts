import express, { Router, Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const router: Router = express.Router();

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// ============ USER PROGRESS ============

// Get user progress
router.get('/progress/:userId', async (req: Request, res: Response) => {
  try {
    if (!supabase) return res.status(503).json({ error: 'Database not configured' });

    const { userId } = req.params;
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    res.json(data || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Update user progress
router.post('/progress/:userId', async (req: Request, res: Response) => {
  try {
    if (!supabase) return res.status(503).json({ error: 'Database not configured' });

    const { userId } = req.params;
    const { algorithmId, mastery, attempts, lastAttempt } = req.body;

    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        algorithm_id: algorithmId,
        mastery_level: mastery,
        attempts: attempts || 0,
        last_attempted: lastAttempt || new Date().toISOString()
      })
      .select();

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ============ USER BOOKMARKS ============

// Get user bookmarks
router.get('/bookmarks/:userId', async (req: Request, res: Response) => {
  try {
    if (!supabase) return res.status(503).json({ error: 'Database not configured' });

    const { userId } = req.params;
    const { data, error } = await supabase
      .from('user_bookmarks')
      .select(`
        *,
        algorithms (
          _id,
          name,
          slug,
          domain,
          difficulty
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;
    res.json(data || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Add bookmark
router.post('/bookmarks/:userId', async (req: Request, res: Response) => {
  try {
    if (!supabase) return res.status(503).json({ error: 'Database not configured' });

    const { userId } = req.params;
    const { algorithmId } = req.body;

    const { data, error } = await supabase
      .from('user_bookmarks')
      .insert({ user_id: userId, algorithm_id: algorithmId })
      .select();

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Remove bookmark
router.delete('/bookmarks/:userId/:algorithmId', async (req: Request, res: Response) => {
  try {
    if (!supabase) return res.status(503).json({ error: 'Database not configured' });

    const { userId, algorithmId } = req.params;
    const { error } = await supabase
      .from('user_bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('algorithm_id', algorithmId);

    if (error) throw error;
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ============ ALGORITHM RECOMMENDATIONS ============

// Get recommendations for user
router.get('/recommendations/:userId', async (req: Request, res: Response) => {
  try {
    if (!supabase) return res.status(503).json({ error: 'Database not configured' });

    const { userId } = req.params;

    // Get user's mastery levels
    const { data: progress, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);

    if (progressError) throw progressError;

    // Find domains with lower mastery
    const domainMastery: Record<string, number> = {};
    progress?.forEach((p: any) => {
      // We'll calculate this based on related algorithms
    });

    // Get all algorithms and score them
    const { data: algorithms, error: algoError } = await supabase
      .from('algorithms')
      .select('*')
      .limit(50);

    if (algoError) throw algoError;

    res.json(algorithms || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ============ ALGORITHM SEARCH & FILTER ============

// Search algorithms
router.get('/search', async (req: Request, res: Response) => {
  try {
    if (!supabase) return res.status(503).json({ error: 'Database not configured' });

    const { q, domain, difficulty } = req.query;

    let query = supabase.from('algorithms').select('*');

    if (q) {
      query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%`);
    }

    if (domain) {
      query = query.eq('domain', domain);
    }

    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }

    const { data, error } = await query.limit(100);

    if (error) throw error;
    res.json(data || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Get algorithms by domain
router.get('/domain/:domain', async (req: Request, res: Response) => {
  try {
    if (!supabase) return res.status(503).json({ error: 'Database not configured' });

    const { domain } = req.params;
    const { data, error } = await supabase
      .from('algorithms')
      .select('*')
      .eq('domain', domain)
      .order('algorithmNumber', { ascending: true });

    if (error) throw error;
    res.json(data || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ============ STATISTICS ============

// Get user statistics
router.get('/stats/:userId', async (req: Request, res: Response) => {
  try {
    if (!supabase) return res.status(503).json({ error: 'Database not configured' });

    const { userId } = req.params;

    // Get progress count
    const { count: progressCount } = await supabase
      .from('user_progress')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get bookmark count
    const { count: bookmarkCount } = await supabase
      .from('user_bookmarks')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get user profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    res.json({
      algorithmsLearned: progressCount || 0,
      bookmarkedAlgorithms: bookmarkCount || 0,
      userProfile: profile
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ============ ALGORITHM COMPARISON ============

// Compare algorithms
router.post('/compare', async (req: Request, res: Response) => {
  try {
    if (!supabase) return res.status(503).json({ error: 'Database not configured' });

    const { algorithmIds } = req.body;

    if (!Array.isArray(algorithmIds) || algorithmIds.length === 0) {
      return res.status(400).json({ error: 'algorithmIds must be a non-empty array' });
    }

    const { data, error } = await supabase
      .from('algorithms')
      .select('*')
      .in('_id', algorithmIds);

    if (error) throw error;
    res.json(data || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ============ ALGORITHM VISUALIZATION ============

// Get visualization data
router.get('/visualization/:algorithmId', async (req: Request, res: Response) => {
  try {
    if (!supabase) return res.status(503).json({ error: 'Database not configured' });

    const { algorithmId } = req.params;
    const { data, error } = await supabase
      .from('algorithms')
      .select('*')
      .eq('_id', algorithmId)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
