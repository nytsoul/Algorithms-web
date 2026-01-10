# AlgoVerse User Guide

## 🎮 Getting Started

### 1. Toggle Theme
Click the **Sun/Moon icon** in the top-right corner to switch between:
- **Dark Mode**: Classic cyberpunk with neon glows on dark background
- **Light Mode**: Futuristic holographic design with bright aesthetics

Both modes offer completely different visual experiences while maintaining functionality.

---

## 🏠 Navigation

### Landing Page (`/`)
Your entry point to AlgoVerse.

**What to do**:
- Click **"Get Started"** to authenticate (if needed)
- Click **"Explore Algorithms"** to browse the dashboard
- Click **"Live Visualization"** to jump straight to visualizations
- Scroll down to see feature overview and domain coverage

---

### Dashboard (`/dashboard`)
The main algorithm browser.

**How to use**:
1. **Search Bar**: Type algorithm name, description, or tags
   - Example: "sorting", "graph", "O(n log n)"
2. **Domain Filter**: Select from 9 domains
   - Data Structures & Algorithms
   - Graph Algorithms
   - Machine Learning
   - And more...
3. **Difficulty Filter**: Filter by skill level
   - Beginner
   - Intermediate
   - Advanced
   - Expert
4. **Algorithm Cards**: Click any card to view full details

**Stats displayed**:
- Total algorithms in database
- Number of domains
- Filtered results count
- Available visualizations

---

### Algorithm Detail Page (`/algorithm/:slug`)
Deep dive into a specific algorithm.

**5 Tabs**:
1. **Overview**: Core concept, intuition, pseudocode, history
2. **Implementation**: Full code with syntax highlighting
3. **Applications**: Real-world uses, pros & cons
4. **Analysis**: Complexity breakdown (best, average, worst cases)
5. **Related**: Similar algorithms and research papers

**Quick Actions**:
- **Visualize Execution**: Launch interactive visualization
- **Run Benchmark**: Test performance with real data
- **Copy Code**: One-click code copying
- **Share/Favorite**: Save for later reference

---

### Visualization Engine (`/visualize`)
Watch algorithms execute step-by-step.

**Controls**:
- **Algorithm Selector**: Choose which algorithm to visualize
- **Play/Pause**: Control animation playback
- **Previous/Next Step**: Manual step navigation
- **Restart**: Reset to initial state
- **Speed Slider**: Adjust animation speed (1-100%)

**What you see**:
- Animated visual representation (bars, graphs, trees)
- Current step description
- Highlighted pivot/key elements
- Real-time state changes
- Code snippet for reference
- Complexity information

**Example Flow**:
1. Select "Quick Sort" from dropdown
2. Click **Play** to start animation
3. Watch as array partitions around pivot
4. Use speed slider to slow down complex steps
5. Click **Next** to review specific steps

---

### Benchmark System (`/benchmark`)
Compare algorithm performance.

**Features**:
- **Performance Comparison Chart**: Bar chart showing time, memory, scalability
- **Scalability Analysis**: Line chart across input sizes (100, 1K, 10K, 100K)
- **Real-Time Metrics**:
  - Average execution time (ms)
  - Memory usage (MB)
  - CPU utilization (%)
  - Scalability rating

**How to interpret**:
- Lower bars = better performance
- Flatter lines = better scalability
- Compare multiple algorithms side-by-side

---

### AI Recommendation Engine (`/recommend`)
Get intelligent algorithm suggestions.

**Step-by-Step**:
1. **Describe Your Problem**: Write what you're trying to solve
2. **Set Constraints**:
   - **Input Size**: How much data? (Small, Medium, Large, Very Large)
   - **Time Constraint**: How fast? (Real-time, Fast, Moderate, Relaxed)
   - **Space Constraint**: Memory limits? (Limited, Moderate, Abundant)
   - **Environment**: Where will it run? (Web, Mobile, Server, Embedded)
3. **Click "Get AI Recommendations"**
4. **Review Results**:
   - Match scores (0-100%)
   - Why each algorithm is recommended
   - Trade-offs and considerations
5. **Click "View Algorithm Details"** to learn more

**Example Use Case**:
```
Problem: "Need to sort large dataset in web browser"
Input Size: Large (100K - 1M)
Time Constraint: Fast (< 1s)
Space Constraint: Moderate
Environment: Web Browser

Result: Quick Sort (95% match)
Reasoning: Excellent average performance, in-place sorting,
cache-efficient for browser environment
```

---

### Learning Paths (`/learn`)
Structured learning journeys.

**Features**:
- **12 Learning Paths**: Beginner to Expert
- **Progress Tracking**: Visual progress bars
- **Milestone System**: Track completed sections
- **Statistics Dashboard**:
  - Algorithms mastered
  - Total paths available
  - Overall progress percentage

**How to use**:
1. Browse available learning paths
2. Check estimated hours and difficulty
3. Review milestones and prerequisites
4. Click **"Start Path"** or **"Continue Learning"**
5. Follow structured curriculum
6. Track progress automatically

**Sample Paths**:
- Data Structures Fundamentals (Beginner, 24 hours)
- Algorithm Design Patterns (Intermediate, 36 hours)
- Advanced Graph Algorithms (Advanced, 48 hours)

---

## 🎨 Visual Effects Guide

### Cyberpunk Elements

**Background Effects**:
- **Cyber Grid**: Subtle grid pattern overlay
- **Scanline**: Moving horizontal line (retro CRT effect)

**Card Effects**:
- **Hover**: Cards lift and glow
- **Click**: Smooth navigation with fade transitions

**Text Effects**:
- **Gradient Text**: Multi-color animated titles
- **Neon Glow**: Emphasized keywords and statistics

**Border Effects**:
- **Neon Borders**: Rotating rainbow gradients on hover
- **Glow Borders**: Pulsing colored borders

---

## 🔥 Power User Tips

### Search Tips
- Use complexity notation: "O(n log n)", "O(1)"
- Search by domain: "machine learning", "graph"
- Tag search: "sorting", "recursive", "dynamic-programming"

### Keyboard Shortcuts (Visualization)
- **Space**: Play/Pause
- **Left Arrow**: Previous step
- **Right Arrow**: Next step
- **R**: Restart

### Filter Combinations
Combine filters for precise results:
- Domain: "Graph Algorithms" + Difficulty: "Beginner" = 5 algorithms
- Category: "Sorting" + Tags: "stable" = 2 algorithms

### Mobile Usage
- All features are touch-optimized
- Swipe on visualization controls
- Tap cards for quick view
- Responsive charts adapt to screen size

---

## 📊 Understanding Complexity

### Time Complexity
- **O(1)**: Constant - Best possible
- **O(log n)**: Logarithmic - Very fast
- **O(n)**: Linear - Scales with input
- **O(n log n)**: Linearithmic - Efficient for large data
- **O(n²)**: Quadratic - Slower for large data
- **O(2ⁿ)**: Exponential - Very slow

### Space Complexity
- **O(1)**: In-place - Minimal memory
- **O(log n)**: Logarithmic space
- **O(n)**: Linear space
- **O(n²)**: Quadratic space

### Colors Used
- **Cyan**: Best case / Primary metrics
- **Pink**: Average case / Secondary metrics
- **Purple**: Worst case / Tertiary metrics
- **Green**: Space complexity / Success
- **Yellow**: Special highlights / Warnings

---

## 🎯 Common Use Cases

### 1. Learning a New Algorithm
1. Go to **Dashboard**
2. Filter by **Beginner** difficulty
3. Pick an algorithm (e.g., "Binary Search")
4. Read **Overview** tab for intuition
5. Watch **Visualization**
6. Study **Implementation**
7. Try modifying the code

### 2. Choosing Algorithm for Project
1. Go to **AI Recommend**
2. Describe your problem
3. Set constraints (size, time, space)
4. Review recommendations
5. Compare suggested algorithms in **Benchmark**
6. Pick best match based on trade-offs

### 3. Interview Preparation
1. Go to **Learning Paths**
2. Start "Data Structures Fundamentals"
3. Complete each milestone
4. Practice with **Visualizations**
5. Study complexity in **Algorithm Details**
6. Track progress automatically

### 4. Performance Analysis
1. Select algorithm from **Dashboard**
2. Click "Run Benchmark"
3. Compare against alternatives
4. Check **Scalability Analysis**
5. Review memory usage
6. Make informed decision

---

## ❓ Troubleshooting

### Algorithm Not Loading
- Refresh the page
- Check internet connection
- Database may be reseeding (wait 10s)

### Visualization Not Playing
- Ensure browser supports JavaScript
- Try refreshing the visualization
- Check if algorithm supports visualization

### Filters Not Working
- Clear all filters and try again
- Some combinations may return zero results
- Try broader search terms

### Theme Not Switching
- Click theme toggle button in top-right
- Preference is saved to localStorage
- Try hard refresh (Ctrl+Shift+R)

---

## 🚀 Best Practices

### For Students
- Start with **Learning Paths**
- Use **Visualizations** to understand concepts
- Practice implementing from **pseudocode**
- Review **Applications** for real-world context

### For Developers
- Use **AI Recommend** for project decisions
- Check **Benchmark** before implementation
- Review **trade-offs** in detail pages
- Bookmark frequently used algorithms

### For Researchers
- Explore **Research References** in detail pages
- Compare historical algorithms
- Analyze **complexity trends**
- Use **Community** features to discuss

---

## 🎓 Educational Features

### Progressive Disclosure
- Start with intuition (simple explanation)
- Move to pseudocode (language-agnostic)
- Study implementation (real code)
- Understand complexity (mathematical analysis)

### Multiple Learning Styles
- **Visual Learners**: Use Visualizations
- **Reading Learners**: Study Implementation tab
- **Kinesthetic Learners**: Copy code and experiment
- **Logical Learners**: Analyze Complexity breakdowns

### Spaced Repetition
- Revisit algorithms via **Learning Paths**
- Track progress over time
- Mark favorites for quick access
- Use community features to discuss

---

## 🎉 Have Fun!

AlgoVerse is designed to make algorithm learning:
- **Beautiful**: Stunning Cyberpunk aesthetics
- **Interactive**: Click, hover, play with everything
- **Comprehensive**: 1000+ algorithms at your fingertips
- **Intelligent**: AI-powered recommendations
- **Educational**: From beginner to expert

**Enjoy exploring the AlgoVerse!** 🚀✨

---

## 📞 Support

Need help? Check:
- **Implementation.md**: Technical details
- **Project_Summary.md**: Overview and goals
- **Quickstart.md**: Setup instructions

**Happy Algorithm Exploring!** 🎯
