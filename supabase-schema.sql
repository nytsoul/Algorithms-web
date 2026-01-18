-- Supabase Database Schema for Algorithms Platform
-- This schema supports 1000+ algorithms with comprehensive metadata

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Domains table (for organizing algorithms by CS domain)
CREATE TABLE IF NOT EXISTS domains (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Algorithms table (main table for all algorithms)
CREATE TABLE IF NOT EXISTS algorithms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(100) NOT NULL,
    domain_id INTEGER REFERENCES domains(id),
    category VARCHAR(100) NOT NULL,
    paradigm VARCHAR(100),
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
    visualization_type VARCHAR(20) CHECK (visualization_type IN ('array', 'tree', 'graph', 'matrix', 'network', 'none')),
    
    -- Description and metadata
    description TEXT,
    intuition TEXT,
    pseudocode TEXT,
    implementation TEXT,
    language VARCHAR(50) DEFAULT 'javascript',
    
    -- Historical information
    inventor VARCHAR(255),
    year_introduced INTEGER,
    
    -- Complexity
    time_complexity JSONB NOT NULL DEFAULT '{"average": "O(n)", "best": "O(n)", "worst": "O(n²)"}',
    space_complexity VARCHAR(50) NOT NULL DEFAULT 'O(n)',
    
    -- Arrays (stored as JSONB for flexibility)
    applications JSONB DEFAULT '[]'::jsonb,
    advantages JSONB DEFAULT '[]'::jsonb,
    disadvantages JSONB DEFAULT '[]'::jsonb,
    related_algorithms JSONB DEFAULT '[]'::jsonb,
    research_references JSONB DEFAULT '[]'::jsonb,
    real_world_examples JSONB DEFAULT '[]'::jsonb,
    tags JSONB DEFAULT '[]'::jsonb,
    
    -- Additional metadata
    is_popular BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    search_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_algorithms_domain ON algorithms(domain);
CREATE INDEX IF NOT EXISTS idx_algorithms_domain_id ON algorithms(domain_id);
CREATE INDEX IF NOT EXISTS idx_algorithms_category ON algorithms(category);
CREATE INDEX IF NOT EXISTS idx_algorithms_difficulty ON algorithms(difficulty);
CREATE INDEX IF NOT EXISTS idx_algorithms_slug ON algorithms(slug);
CREATE INDEX IF NOT EXISTS idx_algorithms_tags ON algorithms USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_algorithms_name_search ON algorithms USING GIN(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_algorithms_description_search ON algorithms USING GIN(to_tsvector('english', description));

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_algorithms_updated_at BEFORE UPDATE ON algorithms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_domains_updated_at BEFORE UPDATE ON domains
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert domains
INSERT INTO domains (id, name, description, icon, color) VALUES
    (1, 'DSA', 'Data Structures & Algorithms - The foundation of computer science', 'code', 'blue'),
    (2, 'DAA', 'Design & Analysis of Algorithms - Algorithm design paradigms and complexity analysis', 'brain', 'purple'),
    (3, 'AI', 'Artificial Intelligence - Decision-making, reasoning, and intelligent systems', 'cpu', 'green'),
    (4, 'ML', 'Machine Learning - Learning patterns and predictions from data', 'brain-circuit', 'orange'),
    (5, 'Networks', 'Computer Networks - Communication protocols and network algorithms', 'network', 'cyan'),
    (6, 'Security', 'Cryptography & Security - Encryption, hashing, and security protocols', 'shield', 'red'),
    (7, 'Systems', 'OS & Distributed Systems - Operating systems and distributed computing', 'server', 'yellow'),
    (8, 'Graphics', 'Graphics & Vision - Computer graphics and computer vision algorithms', 'image', 'pink'),
    (9, 'Optimization', 'Optimization Algorithms - Finding optimal solutions under constraints', 'trending-up', 'indigo'),
    (10, 'Emerging', 'Emerging CS Domains - Cutting-edge technologies and future trends', 'sparkles', 'violet'),
    (11, 'Theory', 'Theoretical CS - Computability, complexity theory, and formal methods', 'book', 'teal')
ON CONFLICT (id) DO UPDATE SET
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    updated_at = NOW();

-- Enable Row Level Security (optional, adjust based on your needs)
ALTER TABLE algorithms ENABLE ROW LEVEL SECURITY;
ALTER TABLE domains ENABLE ROW LEVEL SECURITY;

-- Policy to allow all reads (adjust based on your authentication needs)
CREATE POLICY "Allow public read access to algorithms" ON algorithms
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to domains" ON domains
    FOR SELECT USING (true);

