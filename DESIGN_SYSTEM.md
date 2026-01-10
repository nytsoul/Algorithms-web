# AlgoVerse Design System

## 🎨 Cyberpunk Theme Philosophy

AlgoVerse uses a dual-mode Cyberpunk design system that completely transforms between light and dark modes, offering two distinct visual experiences while maintaining consistent functionality.

---

## 🌈 Color Palette

### Neon Colors (Consistent across modes)

#### Primary Colors
```css
--neon-cyan: oklch(0.75 0.18 195)     /* Electric blue-cyan */
--neon-pink: oklch(0.7 0.25 340)      /* Hot pink-magenta */
--neon-purple: oklch(0.65 0.25 290)   /* Deep violet-purple */
--neon-yellow: oklch(0.85 0.2 90)     /* Electric yellow */
--neon-green: oklch(0.75 0.2 140)     /* Bright lime-green */
```

#### Usage Guidelines
- **Cyan**: Primary actions, links, best-case metrics, trust
- **Pink**: Secondary actions, average-case metrics, creativity
- **Purple**: Tertiary actions, worst-case metrics, mystery
- **Green**: Success states, space complexity, growth
- **Yellow**: Warnings, special highlights, energy

---

### Dark Mode Colors

#### Background Layers
```css
--background: oklch(0.12 0.02 280)     /* Deep purple-black */
--card: oklch(0.16 0.03 280)           /* Slightly lighter cards */
--popover: oklch(0.16 0.03 280)        /* Same as cards */
```

#### Text Colors
```css
--foreground: oklch(0.95 0.05 180)     /* Bright cyan-white */
--muted-foreground: oklch(0.65 0.05 200) /* Dimmed text */
```

#### UI Elements
```css
--border: oklch(0.3 0.08 280)          /* Subtle purple borders */
--input: oklch(0.25 0.06 280)          /* Input backgrounds */
--ring: oklch(0.75 0.18 195)           /* Focus rings (cyan) */
```

---

### Light Mode Colors

#### Background Layers
```css
--background: oklch(0.98 0.01 240)     /* Clean white with blue tint */
--card: oklch(0.95 0.02 250)           /* Slightly gray cards */
--popover: oklch(0.96 0.02 250)        /* Similar to cards */
```

#### Text Colors
```css
--foreground: oklch(0.15 0.02 280)     /* Deep purple-black */
--muted-foreground: oklch(0.5 0.02 270) /* Medium gray */
```

#### UI Elements
```css
--border: oklch(0.8 0.05 250)          /* Light blue-gray borders */
--input: oklch(0.88 0.05 250)          /* Light input backgrounds */
--ring: oklch(0.55 0.25 220)           /* Focus rings (blue) */
```

---

## 🎭 Visual Effects

### Glow Effects

#### Text Glow
```css
.text-glow-cyan {
  text-shadow: 0 0 10px var(--neon-cyan), 0 0 20px var(--neon-cyan);
}

.text-glow-pink {
  text-shadow: 0 0 10px var(--neon-pink), 0 0 20px var(--neon-pink);
}

.text-glow-purple {
  text-shadow: 0 0 10px var(--neon-purple), 0 0 20px var(--neon-purple);
}
```

**Usage**: Headings, emphasis text, statistics

---

#### Box Glow
```css
.glow-cyan {
  box-shadow:
    0 0 10px var(--neon-cyan),
    0 0 20px var(--neon-cyan),
    0 0 30px var(--neon-cyan);
}
```

**Usage**: Buttons, cards on hover, important elements

---

### Border Effects

#### Neon Border (Animated)
```css
.neon-border {
  position: relative;
  border: 2px solid transparent;
}

.neon-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(
    45deg,
    var(--neon-cyan),
    var(--neon-pink),
    var(--neon-purple),
    var(--neon-cyan)
  );
  background-size: 300% 300%;
  border-radius: inherit;
  z-index: -1;
  animation: neon-rotate 4s linear infinite;
}

@keyframes neon-rotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

**Usage**: Special cards, premium features, CTAs

---

#### Static Glow Border
```css
.border-glow-cyan {
  border-color: var(--neon-cyan);
  box-shadow:
    0 0 5px var(--neon-cyan),
    inset 0 0 5px var(--neon-cyan);
}
```

**Usage**: Form inputs on focus, selected items

---

### Background Effects

#### Cyber Grid
```css
.cyber-grid {
  background-image:
    linear-gradient(var(--neon-cyan) 1px, transparent 1px),
    linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.1;
}
```

**Usage**: Page backgrounds, section overlays

---

#### Scanline
```css
.scanline {
  position: relative;
  overflow: hidden;
}

.scanline::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    transparent,
    var(--neon-cyan),
    transparent
  );
  animation: scan 3s linear infinite;
  opacity: 0.3;
}

@keyframes scan {
  0% { top: 0; }
  100% { top: 100%; }
}
```

**Usage**: Full-page overlay for retro CRT effect

---

#### Holographic Gradient
```css
.holographic {
  background: linear-gradient(
    135deg,
    var(--neon-cyan) 0%,
    var(--neon-purple) 25%,
    var(--neon-pink) 50%,
    var(--neon-purple) 75%,
    var(--neon-cyan) 100%
  );
  background-size: 400% 400%;
  animation: holographic-shift 10s ease infinite;
}

@keyframes holographic-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

**Usage**: Hero sections, special backgrounds

---

### Text Effects

#### Glitch Effect
```css
.glitch {
  position: relative;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch::before {
  animation: glitch-1 2s infinite;
  color: var(--neon-cyan);
  z-index: -1;
}

.glitch::after {
  animation: glitch-2 3s infinite;
  color: var(--neon-pink);
  z-index: -2;
}
```

**Usage**: Error states, special headings, dramatic effect

---

## 🎯 Component Patterns

### Cyber Card
```tsx
<Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
  <div className="absolute top-0 right-0 w-32 h-32
                  bg-gradient-to-br from-[var(--neon-cyan)]/10
                  to-transparent rounded-full blur-2xl
                  group-hover:scale-150 transition-transform" />

  {/* Content */}
</Card>
```

**Features**:
- Semi-transparent background with backdrop blur
- Animated gradient orb on hover
- Border glow on hover
- Smooth transitions

---

### Gradient Button
```tsx
<Button className="bg-gradient-to-r from-[var(--neon-cyan)]
                   to-[var(--neon-purple)] text-background
                   hover:opacity-90 transition-opacity">
  <Icon className="w-5 h-5 mr-2" />
  Button Text
</Button>
```

**Features**:
- Cyan to purple gradient
- High contrast text
- Icon support
- Smooth hover opacity change

---

### Neon Badge
```tsx
<Badge className="border-[var(--neon-cyan)]
                  text-[var(--neon-cyan)]
                  bg-[var(--neon-cyan)]/10">
  Badge Text
</Badge>
```

**Features**:
- Colored border and text
- Semi-transparent background
- Matches color theme

---

### Stats Card
```tsx
<Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
  <Icon className="w-8 h-8 text-[var(--neon-cyan)] mb-3" />
  <p className="text-sm text-muted-foreground mb-1">Label</p>
  <p className="text-3xl font-bold text-[var(--neon-cyan)]">Value</p>
</Card>
```

**Features**:
- Icon at top
- Descriptive label
- Large value with neon color
- Consistent padding and spacing

---

## 🎬 Animation Patterns

### Page Entry
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  {/* Content */}
</motion.div>
```

**Timing**: 0.6-0.8s duration, ease-out

---

### Staggered Cards
```tsx
{items.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 + index * 0.1 }}
  >
    {/* Card content */}
  </motion.div>
))}
```

**Timing**: 0.1s stagger between items

---

### Hover Animation
```tsx
<motion.div
  whileHover={{ scale: 1.05, y: -5 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  {/* Hoverable content */}
</motion.div>
```

**Physics**: Spring animation for natural feel

---

### Header Slide
```tsx
<motion.header
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.6 }}
>
  {/* Navigation */}
</motion.header>
```

**Effect**: Slides down from top

---

## 📐 Layout System

### Container Widths
```css
max-w-7xl   /* Main content: 1280px */
max-w-4xl   /* Medium content: 896px */
max-w-3xl   /* Small content: 768px */
```

### Grid Systems
```tsx
// 3-column responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// 4-column stats grid
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">

// 2-column with sidebar
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">{/* Main */}</div>
  <div>{/* Sidebar */}</div>
</div>
```

### Spacing Scale
```
p-4  → 16px   (Small padding)
p-6  → 24px   (Medium padding)
p-8  → 32px   (Large padding)
p-12 → 48px   (XL padding)

gap-4 → 16px  (Small gap)
gap-6 → 24px  (Medium gap)
gap-8 → 32px  (Large gap)
```

---

## 🎨 Typography

### Font Sizes
```css
text-xs    → 12px   /* Small labels */
text-sm    → 14px   /* Body text, descriptions */
text-base  → 16px   /* Default */
text-lg    → 18px   /* Large body */
text-xl    → 20px   /* Subheadings */
text-2xl   → 24px   /* Small headings */
text-3xl   → 30px   /* Medium headings */
text-4xl   → 36px   /* Large headings */
text-5xl   → 48px   /* Page titles */
text-6xl   → 60px   /* Hero titles */
text-8xl   → 96px   /* Giant hero */
```

### Font Weights
```css
font-normal    → 400
font-medium    → 500
font-semibold  → 600
font-bold      → 700
```

### Gradient Text
```tsx
<h1 className="text-5xl font-bold">
  <span className="bg-gradient-to-r
                   from-[var(--neon-cyan)]
                   via-[var(--neon-purple)]
                   to-[var(--neon-pink)]
                   bg-clip-text text-transparent">
    Gradient Title
  </span>
</h1>
```

---

## 🎯 Icon System

### Icon Library
Using **Lucide React** for all icons

### Sizes
```tsx
w-4 h-4   → 16px  (Small, inline with text)
w-5 h-5   → 20px  (Medium, buttons)
w-6 h-6   → 24px  (Large, headings)
w-8 h-8   → 32px  (XL, stats cards)
w-12 h-12 → 48px  (Hero, features)
```

### Common Icons
```tsx
import {
  Code2,        // Logo, coding
  Zap,          // Visualization, speed
  Brain,        // AI, intelligence
  TrendingUp,   // Performance, growth
  Target,       // Goals, accuracy
  Clock,        // Time complexity
  Database,     // Space complexity
  Cpu,          // Processing
  Lock,         // Security
  Network,      // Graphs, connections
  BookOpen,     // Learning
  Sparkles,     // Special, AI
  ChevronRight, // Navigation
  Play,         // Visualization controls
  Pause,
  RotateCcw,
  FastForward
} from "lucide-react";
```

### Icon Colors
```tsx
// Match with color system
<Icon className="text-[var(--neon-cyan)]" />
<Icon className="text-[var(--neon-pink)]" />
<Icon className="text-[var(--neon-purple)]" />
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
default    → < 640px   (Mobile)
sm:        → ≥ 640px   (Large mobile)
md:        → ≥ 768px   (Tablet)
lg:        → ≥ 1024px  (Desktop)
xl:        → ≥ 1280px  (Large desktop)
2xl:       → ≥ 1536px  (XL desktop)
```

### Responsive Patterns
```tsx
// Hide on mobile, show on desktop
<div className="hidden md:block">

// 1 column mobile, 2 tablet, 3 desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Stack on mobile, side-by-side on desktop
<div className="flex flex-col lg:flex-row">
```

---

## 🎨 Chart Styling (Recharts)

### Color Assignment
```tsx
<Bar dataKey="time" fill="var(--neon-cyan)" />
<Bar dataKey="memory" fill="var(--neon-pink)" />
<Bar dataKey="scalability" fill="var(--neon-purple)" />

<Line type="monotone" dataKey="quicksort" stroke="var(--neon-cyan)" strokeWidth={2} />
<Line type="monotone" dataKey="mergesort" stroke="var(--neon-pink)" strokeWidth={2} />
```

### Theme Integration
```tsx
<CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
<XAxis stroke="var(--foreground)" />
<YAxis stroke="var(--foreground)" />
<Tooltip
  contentStyle={{
    backgroundColor: "var(--card)",
    border: "1px solid var(--border)"
  }}
/>
```

---

## 🎭 State Indicators

### Difficulty Colors
```tsx
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return "border-[var(--neon-green)] text-[var(--neon-green)]";
    case "intermediate":
      return "border-[var(--neon-cyan)] text-[var(--neon-cyan)]";
    case "advanced":
      return "border-[var(--neon-purple)] text-[var(--neon-purple)]";
    case "expert":
      return "border-[var(--neon-pink)] text-[var(--neon-pink)]";
  }
};
```

### Complexity Colors
- **Best Case**: Cyan (fastest)
- **Average Case**: Pink (typical)
- **Worst Case**: Purple (slowest)
- **Space**: Green (memory)

---

## 🎬 Best Practices

### DO ✅
- Use semantic color mapping (cyan = primary, pink = secondary)
- Apply backdrop blur to floating elements
- Animate page transitions for smoothness
- Use consistent spacing scale (4, 6, 8, 12)
- Provide hover states for all interactive elements
- Use neon colors sparingly for impact
- Maintain 4.5:1 contrast ratio minimum

### DON'T ❌
- Overuse glow effects (causes eye strain)
- Mix different animation durations randomly
- Use generic gradients (stay on-theme)
- Forget mobile responsive breakpoints
- Ignore dark/light mode consistency
- Use colors without semantic meaning

---

## 🚀 Performance Tips

1. **Use CSS transforms** for animations (GPU-accelerated)
2. **Lazy load images** and heavy components
3. **Minimize re-renders** with React.memo
4. **Use backdrop-filter sparingly** (performance intensive)
5. **Optimize SVG icons** (use icon libraries)
6. **Reduce animation complexity** on mobile

---

## 🎉 Conclusion

AlgoVerse's design system combines:
- **Cyberpunk aesthetics** with dual-mode theming
- **Semantic color usage** for clarity
- **Smooth animations** for engagement
- **Consistent patterns** for predictability
- **Accessibility** considerations
- **Performance** optimizations

**Result**: A stunning, functional, and scalable design system that makes algorithm learning beautiful. ✨

---

**Design System Version**: 1.0
**Last Updated**: January 2026
**Status**: Production Ready
