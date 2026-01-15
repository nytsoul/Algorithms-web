import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';
import algorithmRoutes from './routes/algorithms';

// Load environment variables from specific paths
// Prioritize root .env for shared Supabase credentials
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config(); // Load local .env if present

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Supabase Connection Check
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
let supabase: any = null;
let isDbConnected = false;

console.log('[Init] Environment Variables:');
console.log(`  - VITE_SUPABASE_URL: ${supabaseUrl ? '✓ Found' : '✗ Missing'}`);
console.log(`  - VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✓ Found' : '✗ Missing'}`);

if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL') {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      db: {
        schema: 'public',
      },
      global: {
        headers: {
          'User-Agent': 'AlgoVerse-Server/1.0.0'
        },
        fetch: fetch as any
      }
    });
    console.log(`[Init] ✅ Supabase Client initialized for: ${supabaseUrl.substring(0, 20)}...`);
  } catch (err) {
    console.error('[Init] ❌ Failed to initialize Supabase client:', err);
  }
} else {
  console.warn('[Init] ⚠️  Supabase credentials not found - using mock mode only');
}

async function checkDatabaseConnection(retries = 3) {
  if (!supabase) {
    console.log('⚠️  [Database] Running in Mock Mode (No Supabase client initialized)');
    return;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[Database] Connection attempt ${attempt}/${retries}...`);

      // Create a simple test table query with timeout
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const { data, error, status } = await supabase
        .from('algorithms')
        .select('id', { count: 'exact', head: true })
        .limit(1);

      clearTimeout(timeout);

      if (error) {
        console.error(`[Database] Attempt ${attempt} - Query Error:`, {
          message: error.message,
          code: error.code,
          status: status
        });

        // If it's a 404, the table doesn't exist
        if (status === 404) {
          console.log('⚠️  [Database] Table not found (404) - Create the "algorithms" table in Supabase');
          continue;
        }

        // If it's a 401/403, it's an auth issue
        if (status === 401 || status === 403) {
          console.error('❌ [Database] Authentication failed - Check your Supabase credentials');
          break;
        }

        if (attempt < retries) {
          console.log(`⏳ [Database] Retrying in 2 seconds...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        }
      } else {
        isDbConnected = true;
        console.log('✅ [Database] Successfully connected to Supabase!');
        console.log(`   - Verified access to 'algorithms' table`);
        return;
      }
    } catch (err: any) {
      console.error(`[Database] Attempt ${attempt} - Connection Error:`, {
        name: err.name,
        message: err.message
      });

      // Network error - retry
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        console.log('ℹ️  [Database] Network error detected');
        if (attempt < retries) {
          console.log(`⏳ [Database] Retrying in 2 seconds (${attempt}/${retries})...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
          continue;
        }
      }

      // Other errors
      console.error(`❌ [Database] Failed after ${attempt} attempt(s)`);
      break;
    }
  }

  console.log('⚠️  [Database] Connection check complete - Falling back to mock data');
  console.log('   - Server will operate with sample/mock data');
  console.log('   - API endpoints are functional');
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/algorithms', algorithmRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    database: {
      connected: isDbConnected,
      provider: supabase ? 'supabase' : 'mock'
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/api/config', (req: Request, res: Response) => {
  res.json({
    supabaseConfigured: !!supabase,
    databaseConnected: isDbConnected,
    environment: process.env.NODE_ENV || 'development'
  });
});

app.listen(PORT, async () => {
  console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
  console.log('📡 Available endpoints:');
  console.log(`   - GET  /api/health       - Server status`);
  console.log(`   - GET  /api/config       - Configuration info`);
  console.log(`   - GET  /api/algorithms   - List all algorithms`);
  console.log(`   - GET  /api/algorithms/:id - Get algorithm by ID`);
  console.log(`   - POST /api/algorithms   - Create new algorithm\n`);

  await checkDatabaseConnection();
});
