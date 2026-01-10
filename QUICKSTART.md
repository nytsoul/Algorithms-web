# 🚀 AlgoVerse - Quick Start Guide

## ⚡ Get Started in 3 Minutes

### Prerequisites
- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)

### Installation

1. **Navigate to project directory**
   ```bash
   cd /home/daytona/codebase
   ```

2. **Install dependencies** (if not already installed)
   ```bash
   pnpm install
   ```

3. **Start Convex backend**
   ```bash
   npx convex dev
   ```
   - Leave this terminal running
   - Open a new terminal for the next step

4. **Start development server** (in new terminal)
   ```bash
   pnpm dev
   ```

5. **Open browser**
   - Navigate to `http://localhost:5173`
   - Enjoy the Cyberpunk experience! 🎨

---

## 🎯 First Time Setup

### Seed Algorithm Data (First Run Only)

If the database is empty, seed it with initial algorithms:

```bash
npx convex run algorithms:seedAlgorithms
```

You should see: `"Seeded 10 algorithms successfully"`

---

## 🎨 Toggle Theme

Click the **Sun/Moon** button in the top-right navigation to switch between:
- 🌙 **Dark Mode** (Cyberpunk neon)
- ☀️ **Light Mode** (Futuristic tech)

---

## 🗺️ Navigate the Platform

### Main Pages

1. **Landing Page** (`/`)
   - Hero section with features
   - Domain coverage
   - Call-to-action buttons

2. **Dashboard** (`/dashboard`)
   - Browse all algorithms
   - Search and filter
   - View algorithm cards

3. **Algorithm Detail** (`/algorithm/:slug`)
   - Click any algorithm card
   - See full details in 5 tabs
   - Access visualization and benchmarking

4. **Visualize** (`/visualize`)
   - Interactive step-by-step execution
   - Playback controls
   - Speed adjustment

5. **Benchmark** (`/benchmark`)
   - Performance comparison
   - Charts and metrics
   - Scalability analysis

6. **AI Recommend** (`/recommend`)
   - Enter problem constraints
   - Get AI-powered suggestions
   - See reasoning and trade-offs

7. **Learning Paths** (`/learn`)
   - View curated paths
   - Track progress
   - See milestones

---

## 🎮 Try These Actions

### Explore Algorithms
1. Go to `/dashboard`
2. Search for "sort"
3. Filter by difficulty: "Beginner"
4. Click on "Bubble Sort"
5. Explore the 5 tabs

### Visualize Sorting
1. Go to `/visualize`
2. Select "Quick Sort"
3. Click Play ▶️
4. Adjust speed slider
5. Watch the animation!

### Get Recommendations
1. Go to `/recommend`
2. Enter: "I need to sort a large array"
3. Select:
   - Input Size: Large
   - Time Constraint: Fast
   - Space Constraint: Moderate
   - Environment: Server
4. Click "Get AI Recommendations"
5. Review suggested algorithms

### Track Learning
1. Go to `/learn`
2. Browse learning paths
3. See progress bars
4. Check milestone completion
5. Click "Continue Learning"

---

## 🎨 Visual Effects Guide

### Cyberpunk Elements You'll See

- **Cyber Grid**: Animated grid background (subtle)
- **Scanlines**: CRT-style horizontal lines
- **Neon Glow**: Borders and text that glow
- **Hover Effects**: Cards lift and glow on hover
- **Smooth Animations**: Page transitions and element fades
- **Gradient Text**: Multicolor animated text
- **Holographic Effects**: Shifting rainbow gradients

### Interactive Elements

- Hover over cards to see glow effects
- Click buttons for smooth transitions
- Toggle theme for complete UI transformation
- Scroll for reveal animations

---

## 📊 Database Info

### Current Data
- **10 algorithms seeded** covering:
  - Sorting (Quick, Merge, Heap, Bubble)
  - Graph (Dijkstra, BFS, DFS)
  - Dynamic Programming (Fibonacci, LCS)
  - Search (Binary Search)

### Add More Algorithms
To add more algorithms, edit `src/convex/algorithms.ts` and add to the `algorithmData` array, then run the seed command again.

---

## 🔧 Development Commands

```bash
# Start Convex backend
npx convex dev

# Start frontend dev server
pnpm dev

# Type check
npx tsc -b --noEmit

# Build for production
pnpm build

# Preview production build
pnpm preview

# Seed algorithms
npx convex run algorithms:seedAlgorithms

# Run any Convex function
npx convex run functionName args
```

---

## 🎯 Key Features to Explore

### 1. Theme Toggle
- Located in top-right of navigation
- Smooth transition between modes
- Completely different UI designs

### 2. Search & Filter
- Real-time search on dashboard
- Domain filtering (9 domains)
- Difficulty levels (4 levels)

### 3. Algorithm Details
- Comprehensive 5-tab interface
- Time/space complexity cards
- Copy code functionality
- Related algorithms

### 4. Visualization
- Step-by-step execution
- Playback controls
- Visual state representation
- Speed control

### 5. Benchmarking
- Performance metrics
- Comparative charts
- Scalability graphs

### 6. AI Recommendations
- Constraint-based selection
- Match scoring
- Reasoning explanation
- Trade-off analysis

### 7. Learning Paths
- Curated journeys
- Progress tracking
- Milestone system
- Estimated completion time

---

## 🎨 Customization Tips

### Change Colors
Edit `src/index.css` and modify CSS variables:
```css
--neon-cyan: oklch(0.75 0.18 195);
--neon-pink: oklch(0.7 0.25 340);
--neon-purple: oklch(0.65 0.25 290);
```

### Add Algorithms
Edit `src/convex/algorithms.ts` and add to `algorithmData` array.

### Modify Theme
Edit `src/components/ThemeProvider.tsx` for theme logic.

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
pnpm dev --port 3000
```

### Convex Not Starting
```bash
# Clear Convex cache
rm -rf .convex
npx convex dev
```

### Theme Not Persisting
- Check browser localStorage
- Ensure JavaScript is enabled
- Try hard refresh (Ctrl+Shift+R)

### Algorithms Not Loading
```bash
# Re-seed database
npx convex run algorithms:seedAlgorithms
```

---

## 📱 Mobile Testing

To test on mobile:
1. Get your local IP: `ifconfig` or `ipconfig`
2. Access: `http://YOUR_IP:5173`
3. Ensure devices are on same network

---

## 🎓 Learning Path Suggestions

### For Beginners
1. Start at Dashboard
2. Filter by "Beginner" difficulty
3. Read "Bubble Sort" detail page
4. Visualize it
5. Move to "Binary Search"

### For Intermediate
1. Explore "Dynamic Programming" algorithms
2. Visualize "Fibonacci DP"
3. Compare with naive recursion
4. Try AI Recommendations

### For Advanced
1. Study graph algorithms
2. Benchmark different approaches
3. Compare time complexities
4. Explore learning paths

---

## 🌟 Pro Tips

1. **Use Theme Toggle**: See how UI completely transforms
2. **Try All Filters**: Combine domain + difficulty
3. **Explore Tabs**: Each algorithm has 5 detailed tabs
4. **Watch Visualizations**: Best way to understand algorithms
5. **Check Benchmarks**: See real performance data
6. **Get AI Help**: Use recommendations for decision-making
7. **Follow Learning Paths**: Structured approach to mastery

---

## 📚 Additional Resources

- **Full Documentation**: See `ALGOVERSE_README.md`
- **Project Summary**: See `PROJECT_SUMMARY.md`
- **Code Comments**: Inline documentation in source files

---

## 🎉 You're Ready!

Start exploring the amazing world of algorithms with **AlgoVerse** - where theory meets practice in a stunning Cyberpunk interface! 🚀✨

---

**Need Help?** Check the README files or explore the source code. Everything is well-documented!

**Enjoy the Neon Glow!** 🌈
