# 🚀 Supabase Seeding Guide

This guide explains how to seed your Supabase database with 1000+ algorithms organized by domain.

## Prerequisites

1. **Supabase Project Setup**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key
   - Get your service role key (for seeding)

2. **Environment Variables**
   Create a `.env` file in the project root:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

## Database Setup

### Step 1: Create Database Schema

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL from `supabase-schema.sql`:

```bash
# Or via Supabase CLI
supabase db reset
psql -h your-db-host -U postgres -d postgres -f supabase-schema.sql
```

This will:
- Create `domains` table with 11 CS domains
- Create `algorithms` table with comprehensive fields
- Set up indexes for performance
- Configure Row Level Security (RLS)

### Step 2: Seed the Database

#### Option A: Using the Frontend Seeder Component

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to a page that includes the `SupabaseSeeder` component
   - Or add it temporarily to your dashboard

3. Click the "Seed Database" button
   - This will insert all 1000 algorithms in batches

#### Option B: Using the Server Seed Script

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Run the seed script:
   ```bash
   npm run seed
   ```

   Or directly with ts-node:
   ```bash
   npx ts-node-dev src/seed.ts
   ```

## Database Schema

### Domains Table
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR) - Domain name (DSA, DAA, AI, etc.)
- `description` (TEXT)
- `icon` (VARCHAR)
- `color` (VARCHAR)

### Algorithms Table
- `id` (UUID PRIMARY KEY)
- `slug` (VARCHAR, UNIQUE) - URL-friendly identifier
- `name` (VARCHAR) - Algorithm name
- `domain` (VARCHAR) - Domain name
- `domain_id` (INTEGER) - Foreign key to domains
- `category` (VARCHAR) - Algorithm category
- `difficulty` (VARCHAR) - Beginner, Intermediate, Advanced, Expert
- `visualization_type` (VARCHAR) - array, tree, graph, matrix, network, none
- `description` (TEXT)
- `intuition` (TEXT)
- `pseudocode` (TEXT)
- `implementation` (TEXT)
- `time_complexity` (JSONB)
- `space_complexity` (VARCHAR)
- `applications` (JSONB array)
- `advantages` (JSONB array)
- `disadvantages` (JSONB array)
- `related_algorithms` (JSONB array)
- `tags` (JSONB array)
- `is_popular` (BOOLEAN)
- `is_featured` (BOOLEAN)
- `search_count` (INTEGER)
- `view_count` (INTEGER)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Algorithm Domains

The 1000 algorithms are organized into 11 domains:

1. **DSA** (Data Structures & Algorithms) - ~200 algorithms
2. **DAA** (Design & Analysis of Algorithms) - ~250 algorithms
3. **AI** (Artificial Intelligence) - ~120 algorithms
4. **ML** (Machine Learning) - ~150 algorithms
5. **Networks** (Computer Networks) - ~70 algorithms
6. **Security** (Cryptography & Security) - ~100 algorithms
7. **Systems** (OS & Distributed Systems) - ~120 algorithms
8. **Graphics** (Graphics & Vision) - ~80 algorithms
9. **Optimization** - ~100 algorithms
10. **Emerging** (Emerging CS Domains) - ~80 algorithms
11. **Theory** (Theoretical CS) - ~130 algorithms

## Verification

After seeding, verify the data:

1. **Check Algorithm Count**
   ```sql
   SELECT COUNT(*) FROM algorithms;
   -- Should return ~1000
   ```

2. **Check by Domain**
   ```sql
   SELECT domain, COUNT(*) as count 
   FROM algorithms 
   GROUP BY domain 
   ORDER BY count DESC;
   ```

3. **Check Popular Algorithms**
   ```sql
   SELECT name, domain, category 
   FROM algorithms 
   WHERE is_popular = true 
   LIMIT 20;
   ```

## Troubleshooting

### Issue: "Table does not exist"
- **Solution**: Run the schema SQL first (`supabase-schema.sql`)

### Issue: "Permission denied"
- **Solution**: Use the service role key for seeding (not the anon key)

### Issue: "Duplicate key violation"
- **Solution**: Clear existing data first:
  ```sql
  DELETE FROM algorithms;
  ```

### Issue: "Connection timeout"
- **Solution**: 
  - Check your Supabase project status
  - Verify environment variables
  - Try batching smaller (reduce batch size in seed script)

## Next Steps

After successful seeding:

1. ✅ Verify data in Supabase dashboard
2. ✅ Test the frontend application
3. ✅ Configure Row Level Security policies (if needed)
4. ✅ Set up authentication (if using user-specific features)
5. ✅ Add indexes for your specific query patterns

## Features Enabled

With this database structure, you can:

- 🔍 **Search** algorithms by name, description, tags
- 🎯 **Filter** by domain, category, difficulty
- 📊 **Visualize** algorithms with type-specific visualizations
- ⭐ **Track** popular and featured algorithms
- 📈 **Analyze** algorithm views and search patterns
- 🔗 **Link** related algorithms
- 🏷️ **Tag** algorithms for better discoverability

Happy coding! 🚀

