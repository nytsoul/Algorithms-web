# 🏆 AlgoVerse - Unified Algorithm Intelligence Platform

## 🎯 Project Overview

**AlgoVerse** is a comprehensive, interactive algorithm learning and optimization platform that bridges the gap between algorithm theory and real-world application. This finalist project features:

- **1000+ Algorithms** across multiple CS domains (DSA, AI, ML, Networks, Security, Graphics, Systems)
- **Interactive Visualization** with step-by-step execution animations
- **Real-Time Benchmarking** for performance analysis and comparison
- **AI-Powered Recommendations** for optimal algorithm selection
- **Adaptive Learning Paths** with personalized progress tracking
- **Dual-Theme Cyberpunk Design** with stunning neon effects

## 🚀 Features

### 🔍 Core Features

1. **Multi-Domain Algorithm Repository**
   - Data Structures & Algorithms (150+)
   - Graph Algorithms (120+)
   - Algorithm Design Patterns (200+)
   - AI & Machine Learning (340+)
   - Networks & Security (210+)
   - Systems & Graphics (150+)

2. **Interactive Algorithm Visualization**
   - Step-by-step execution with animations
   - Dynamic state transitions
   - Variable tracking and highlighting
   - Playback controls (play, pause, speed control)
   - Multiple visualization types (arrays, graphs, trees, DP tables)

3. **Performance Benchmarking Engine**
   - Execution time measurement
   - Memory usage profiling
   - CPU utilization tracking
   - Scalability analysis across different input sizes
   - Comparative visualization with charts

4. **AI Algorithm Recommendation**
   - Intelligent algorithm selection based on:
     - Problem description
     - Input size constraints
     - Time requirements
     - Space limitations
     - Environment specifications
   - Match scoring and reasoning
   - Trade-off analysis

5. **Adaptive Learning Paths**
   - Beginner to Expert progression
   - Personalized milestone tracking
   - Progress visualization
   - Estimated completion times
   - Prerequisites and learning objectives

## 🎨 Cyberpunk Theme Design

### Dark Mode (Default)
- Deep purple-tinted background (#1a0a1f)
- Neon cyan accents (#00ffff)
- Neon pink highlights (#ff0080)
- Neon purple elements (#b026ff)
- Glowing borders and shadows
- Scanline effects
- Cyber grid background

### Light Mode (Futuristic)
- Bright holographic backgrounds
- Tech-blue primary colors
- Vibrant accent colors
- Clean, modern aesthetic
- Subtle gradients

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4, Custom Cyberpunk theme
- **Animations**: Framer Motion
- **Backend**: Convex (Real-time database)
- **Auth**: Convex Auth with OTP
- **UI Components**: Shadcn/ui (Radix UI)
- **Charts**: Recharts
- **Routing**: React Router 7

## 📦 Installation & Setup

1. **Clone and Install**
   ```bash
   git clone <repository>
   cd codebase
   pnpm install
   ```

2. **Start Convex Backend**
   ```bash
   npx convex dev
   ```

3. **Seed Algorithm Data**
   ```bash
   npx convex run algorithms:seedAlgorithms
   ```

4. **Start Development Server**
   ```bash
   pnpm dev
   ```

5. **Open Browser**
   Navigate to `http://localhost:5173`

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   └── ThemeProvider.tsx
├── convex/
│   ├── schema.ts        # Database schema
│   ├── algorithms.ts    # Algorithm queries/mutations
│   └── _generated/      # Auto-generated files
├── pages/
│   ├── Landing.tsx      # Hero page with features
│   ├── Dashboard.tsx    # Algorithm browser
│   ├── Visualize.tsx    # Interactive visualization
│   ├── Benchmark.tsx    # Performance analysis
│   ├── Recommend.tsx    # AI recommendations
│   └── Learn.tsx        # Learning paths
├── index.css            # Cyberpunk theme styles
└── main.tsx             # App entry point
```

## 🎯 Key Pages

### 1. Landing Page (`/`)
- Animated hero section with glowing effects
- Feature cards with cyberpunk styling
- Domain coverage statistics
- Call-to-action sections

### 2. Dashboard (`/dashboard`)
- Search and filter algorithms
- Domain and difficulty filters
- Algorithm cards with complexity info
- Real-time stats display

### 3. Visualize (`/visualize`)
- Algorithm selection dropdown
- Interactive visualization canvas
- Step controls (play, pause, forward, back)
- Speed control slider
- Code snippet display

### 4. Benchmark (`/benchmark`)
- Performance comparison charts
- Time, memory, CPU metrics
- Scalability graphs
- Real-time benchmarking

### 5. AI Recommend (`/recommend`)
- Problem description input
- Constraint selection (size, time, space, environment)
- AI-generated recommendations
- Match scoring and reasoning

### 6. Learning Paths (`/learn`)
- Curated learning paths
- Progress tracking
- Milestone completion
- Difficulty-based organization

## 🎨 Custom Cyberpunk Styles

Available CSS classes:
- `.cyber-grid` - Animated grid background
- `.scanline` - CRT scanline effect
- `.glow-cyan`, `.glow-pink`, `.glow-purple` - Neon glow effects
- `.text-glow-cyan`, `.text-glow-pink` - Text glow
- `.border-glow-cyan`, `.border-glow-pink` - Border glow
- `.cyber-card` - Animated card with hover effects
- `.holographic` - Holographic gradient animation
- `.neon-border` - Animated neon border

## 🔧 Convex Functions

### Queries
- `getAllAlgorithms()` - Get all algorithms
- `getAlgorithmBySlug(slug)` - Get algorithm by slug
- `getAlgorithmsByCategory(category)` - Filter by category
- `getAlgorithmsByDomain(domain)` - Filter by domain
- `searchAlgorithms(searchTerm)` - Search algorithms

### Mutations
- `seedAlgorithms()` - Seed initial algorithm data

## 🌟 Unique Features

1. **Dual-Theme Toggle**: Switch between Cyberpunk dark and futuristic light themes
2. **Animated Transitions**: Smooth page transitions and element animations
3. **Responsive Design**: Works on desktop, tablet, and mobile
4. **Real-time Data**: Convex provides instant updates
5. **Type Safety**: Full TypeScript coverage
6. **Performance Optimized**: Lazy loading and code splitting

## 📊 Database Schema

### Tables
- `algorithms` - Algorithm data with complexity, applications, etc.
- `benchmarks` - Performance benchmark results
- `visualizations` - Saved visualization states
- `learningPaths` - Curated learning journeys
- `userProgress` - User learning progress
- `recommendations` - AI recommendation history
- `community` - User comments and ratings

## 🎓 Learning Paths Available

1. **Data Structures Fundamentals** (Beginner, 24 hours)
2. **Algorithm Design Patterns** (Intermediate, 36 hours)
3. **Advanced Graph Algorithms** (Advanced, 48 hours)

## 🔮 Future Enhancements

- [ ] Real-time collaborative visualization
- [ ] Custom algorithm submission
- [ ] Community benchmarking leaderboards
- [ ] AI-powered algorithm mutation/hybridization
- [ ] Code execution in multiple languages
- [ ] Mobile app version
- [ ] Algorithm complexity visualizer
- [ ] Interactive tutorials with quizzes

## 📄 License

This is a finalist project for educational and demonstration purposes.

## 🤝 Contributing

This is currently a showcase project. For inquiries, please contact the project team.

---

Built with ❤️ using React, Convex, and lots of neon glow effects ✨
