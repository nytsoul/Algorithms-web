import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  Code2,
  Brain,
  Zap,
  TrendingUp,
  BarChart3,
  Calendar,
  Target,
  AlertCircle,
  CheckCircle2,
  Clock,
  Flame,
  BookMarked,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface SkillArea {
  name: string;
  mastery: number;
  lastReviewed: string;
  reviewsNeeded: number;
  strength: "weak" | "developing" | "strong" | "expert";
  nextReviewDate: string;
}

interface RetentionData {
  date: string;
  retention: number;
  reviewsCompleted: number;
}

interface SkillDependency {
  from: string;
  to: string;
  prerequisite: boolean;
}

export default function AdaptiveLearning() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [learningStyle, setLearningStyle] = useState<"visual" | "auditory" | "kinesthetic">("visual");
  const [focusMode, setFocusMode] = useState(false);

  // Skill assessment data
  const skillAreas: SkillArea[] = [
    {
      name: "Arrays & Strings",
      mastery: 92,
      lastReviewed: "2 days ago",
      reviewsNeeded: 0,
      strength: "expert",
      nextReviewDate: "Feb 15",
    },
    {
      name: "Linked Lists",
      mastery: 78,
      lastReviewed: "5 days ago",
      reviewsNeeded: 1,
      strength: "strong",
      nextReviewDate: "Feb 12",
    },
    {
      name: "Binary Search Trees",
      mastery: 55,
      lastReviewed: "12 days ago",
      reviewsNeeded: 3,
      strength: "developing",
      nextReviewDate: "Feb 8",
    },
    {
      name: "Dynamic Programming",
      mastery: 35,
      lastReviewed: "18 days ago",
      reviewsNeeded: 5,
      strength: "weak",
      nextReviewDate: "Feb 4",
    },
    {
      name: "Graph Algorithms",
      mastery: 68,
      lastReviewed: "8 days ago",
      reviewsNeeded: 2,
      strength: "developing",
      nextReviewDate: "Feb 10",
    },
    {
      name: "Sorting Algorithms",
      mastery: 88,
      lastReviewed: "1 day ago",
      reviewsNeeded: 0,
      strength: "expert",
      nextReviewDate: "Feb 18",
    },
  ];

  // Retention curve data - shows forgetting curve
  const retentionCurve: RetentionData[] = [
    { date: "Day 1", retention: 100, reviewsCompleted: 1 },
    { date: "Day 2", retention: 85, reviewsCompleted: 0 },
    { date: "Day 4", retention: 65, reviewsCompleted: 1 },
    { date: "Day 8", retention: 78, reviewsCompleted: 0 },
    { date: "Day 15", retention: 88, reviewsCompleted: 1 },
    { date: "Day 30", retention: 92, reviewsCompleted: 0 },
  ];

  // Learning path dependencies
  const skillDependencies: SkillDependency[] = [
    { from: "Arrays & Strings", to: "Linked Lists", prerequisite: true },
    { from: "Linked Lists", to: "Trees & Graphs", prerequisite: true },
    { from: "Trees & Graphs", to: "Graph Algorithms", prerequisite: true },
    { from: "Arrays & Strings", to: "Sorting Algorithms", prerequisite: true },
    { from: "Sorting Algorithms", to: "Divide & Conquer", prerequisite: true },
    { from: "Dynamic Programming", to: "Graph Algorithms", prerequisite: false },
  ];

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "expert":
        return "text-[var(--neon-green)]";
      case "strong":
        return "text-[var(--neon-cyan)]";
      case "developing":
        return "text-[var(--neon-yellow)]";
      case "weak":
        return "text-[var(--neon-pink)]";
      default:
        return "text-foreground";
    }
  };

  const getStrengthBadgeColor = (strength: string) => {
    switch (strength) {
      case "expert":
        return "border-[var(--neon-green)] text-[var(--neon-green)]";
      case "strong":
        return "border-[var(--neon-cyan)] text-[var(--neon-cyan)]";
      case "developing":
        return "border-[var(--neon-yellow)] text-[var(--neon-yellow)]";
      case "weak":
        return "border-[var(--neon-pink)] text-[var(--neon-pink)]";
      default:
        return "border-border text-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 cyber-grid pointer-events-none" />
      <div className="scanline fixed inset-0 pointer-events-none" />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-50 border-b border-border/50 backdrop-blur-xl bg-background/80"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center">
              <Code2 className="w-6 h-6 text-background" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)] bg-clip-text text-transparent">
              AlgoVerse
            </h1>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/dashboard">
              <Button variant="ghost">Browse</Button>
            </Link>
            <Link to="/visualize">
              <Button variant="ghost">Visualize</Button>
            </Link>
            <Link to="/benchmark">
              <Button variant="ghost">Benchmark</Button>
            </Link>
            <Link to="/recommend">
              <Button variant="ghost">AI Recommend</Button>
            </Link>
            <Link to="/learn">
              <Button variant="ghost">Learn</Button>
            </Link>
            <Link to="/adaptive-learning">
              <Button variant="ghost" className="text-[var(--neon-purple)]">
                Adaptive
              </Button>
            </Link>
          </nav>
        </div>
      </motion.header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] bg-clip-text text-transparent">
              Adaptive Learning Engine
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            AI-powered personalized learning with spaced repetition, skill mapping, and retention analytics
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0 }}
          >
            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
              <Brain className="w-8 h-8 text-[var(--neon-purple)] mb-3" />
              <p className="text-sm text-muted-foreground mb-1">Overall Mastery</p>
              <p className="text-3xl font-bold text-[var(--neon-purple)]">71%</p>
              <p className="text-xs text-muted-foreground mt-2">+5% this week</p>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
              <Calendar className="w-8 h-8 text-[var(--neon-cyan)] mb-3" />
              <p className="text-sm text-muted-foreground mb-1">Review Streak</p>
              <p className="text-3xl font-bold text-[var(--neon-cyan)]">12 days</p>
              <p className="text-xs text-muted-foreground mt-2">Keep it up!</p>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
              <Zap className="w-8 h-8 text-[var(--neon-yellow)] mb-3" />
              <p className="text-sm text-muted-foreground mb-1">Due Today</p>
              <p className="text-3xl font-bold text-[var(--neon-yellow)]">3 topics</p>
              <p className="text-xs text-muted-foreground mt-2">15 min average</p>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
              <TrendingUp className="w-8 h-8 text-[var(--neon-green)] mb-3" />
              <p className="text-sm text-muted-foreground mb-1">Learning Rate</p>
              <p className="text-3xl font-bold text-[var(--neon-green)]">+8%</p>
              <p className="text-xs text-muted-foreground mt-2">vs last week</p>
            </Card>
          </motion.div>
        </div>

        {/* Learning Style Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-[var(--neon-purple)]" />
              Your Learning Style
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: "visual", label: "👁️ Visual Learner", desc: "Diagrams, flowcharts, graphs" },
                { id: "auditory", label: "🎧 Auditory Learner", desc: "Explanations, discussions" },
                { id: "kinesthetic", label: "👐 Kinesthetic Learner", desc: "Interactive coding, problems" },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setLearningStyle(style.id as any)}
                  className={`p-4 rounded-lg transition-all border-2 ${
                    learningStyle === style.id
                      ? "border-[var(--neon-cyan)] bg-[var(--neon-cyan)]/10"
                      : "border-border/50 bg-background/30 hover:border-border"
                  }`}
                >
                  <p className="font-semibold text-foreground mb-1">{style.label}</p>
                  <p className="text-sm text-muted-foreground">{style.desc}</p>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Skill Heat Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-[var(--neon-cyan)]" />
              Knowledge Retention Heat Map
            </h3>
            <div className="space-y-4">
              {skillAreas.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className={`p-4 rounded-lg border border-border/50 cursor-pointer transition-all hover:bg-card/70 ${
                    selectedSkill === skill.name ? "bg-card/70 border-[var(--neon-cyan)]" : "bg-background/30"
                  }`}
                  onClick={() => setSelectedSkill(selectedSkill === skill.name ? null : skill.name)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground mb-1">{skill.name}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className={`${getStrengthBadgeColor(skill.strength)}`}>
                          {skill.strength.charAt(0).toUpperCase() + skill.strength.slice(1)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Last reviewed: {skill.lastReviewed}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">Next: {skill.nextReviewDate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${getStrengthColor(skill.strength)}`}>
                        {skill.mastery}%
                      </p>
                      {skill.reviewsNeeded > 0 && (
                        <Badge className="bg-[var(--neon-pink)]/20 text-[var(--neon-pink)] border-0 mt-2">
                          {skill.reviewsNeeded} reviews due
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Progress value={skill.mastery} className="h-2" />

                  {/* Expanded details */}
                  {selectedSkill === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-border/50 space-y-3"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                          <p className="font-semibold text-[var(--neon-cyan)]">87%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Problems Solved</p>
                          <p className="font-semibold text-[var(--neon-green)]">42</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Time Spent</p>
                          <p className="font-semibold text-[var(--neon-yellow)]">12h 34m</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Difficulty Avg</p>
                          <p className="font-semibold text-[var(--neon-purple)]">Hard</p>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] hover:opacity-90">
                        Review Now
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Retention Curve */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Flame className="w-6 h-6 text-[var(--neon-pink)]" />
              Spaced Repetition Curve (Ebbinghaus Forgetting Curve)
            </h3>
            <div className="bg-background/50 rounded-lg p-6">
              <div className="flex items-end justify-between h-64 gap-2">
                {retentionCurve.map((data, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.retention / 100) * 200}px` }}
                    transition={{ delay: 0.1 * idx, duration: 0.8 }}
                    className="flex-1 flex flex-col items-center group"
                  >
                    <div className={`w-full rounded-t transition-all ${
                      data.reviewsCompleted > 0
                        ? "bg-[var(--neon-green)]"
                        : "bg-[var(--neon-cyan)]"
                    } hover:opacity-80`} />
                    <p className="text-xs text-muted-foreground mt-2 text-center">{data.date}</p>
                    <p className="text-xs font-semibold text-foreground group-hover:text-[var(--neon-cyan)]">
                      {data.retention}%
                    </p>
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-6 text-center">
                💡 Green bars = Topics reviewed. Regular spaced repetition maximizes long-term retention.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Skill Dependency Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-[var(--neon-yellow)]" />
              Learning Path Dependencies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillDependencies.map((dep, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * idx }}
                  className="p-4 rounded-lg border border-border/50 bg-background/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{dep.from}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {dep.prerequisite ? "→ Required for" : "→ Enhances"}
                      </p>
                    </div>
                    <div className="px-3 py-1 rounded bg-[var(--neon-purple)]/20 text-[var(--neon-purple)] text-xs font-semibold">
                      {dep.prerequisite ? "Prerequisite" : "Related"}
                    </div>
                  </div>
                  <div className="flex items-center justify-center my-3">
                    <div className="w-full h-0.5 bg-gradient-to-r from-[var(--neon-cyan)] to-transparent" />
                    <span className="px-2 text-xs text-[var(--neon-cyan)]">→</span>
                  </div>
                  <p className="font-semibold text-foreground text-right">{dep.to}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Focus Mode Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <Card className={`cyber-card p-8 bg-gradient-to-r ${
            focusMode
              ? "from-[var(--neon-pink)]/20 to-[var(--neon-purple)]/20 border-[var(--neon-pink)]/50"
              : "from-card/50 to-card/30 bg-card/50 backdrop-blur-sm border-border/50"
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <BookMarked className={`w-6 h-6 ${focusMode ? "text-[var(--neon-pink)]" : "text-[var(--neon-yellow)]"}`} />
                <h3 className="text-2xl font-semibold text-foreground">
                  {focusMode ? "Focus Mode Active 🚀" : "Recommended Focus Areas"}
                </h3>
              </div>
              <Button
                onClick={() => setFocusMode(!focusMode)}
                className={`${
                  focusMode
                    ? "bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/90"
                    : "bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] hover:opacity-90"
                }`}
              >
                {focusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
              </Button>
            </div>

            {focusMode ? (
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-background/50 border border-[var(--neon-pink)]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-[var(--neon-pink)]" />
                    <p className="font-semibold text-foreground">Dynamic Programming - URGENT</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You're 5 reviews behind. 35% mastery. Estimated 3 hours to catch up.
                  </p>
                  <Button className="mt-3 w-full bg-[var(--neon-pink)] text-background hover:bg-[var(--neon-pink)]/90">
                    Start Focus Session
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border border-[var(--neon-yellow)]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-[var(--neon-yellow)]" />
                    <p className="font-semibold text-foreground">Binary Search Trees - DUE TODAY</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Review scheduled for 3 reviews. Takes ~45 minutes.
                  </p>
                  <Button className="mt-3 w-full bg-[var(--neon-yellow)] text-background hover:bg-[var(--neon-yellow)]/90">
                    Start Review
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-background/50 border border-[var(--neon-cyan)]/30">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--neon-cyan)]" />
                    <p className="font-semibold text-foreground">Graph Algorithms - OPTIMAL TIMING</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    2 reviews due. Best time to reinforce before forgetting. ~30 minutes.
                  </p>
                  <Button className="mt-3 w-full bg-[var(--neon-cyan)] text-background hover:bg-[var(--neon-cyan)]/90">
                    Start Now
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Dynamic Programming", reason: "5 days overdue", color: "pink" },
                  { name: "Binary Search Trees", reason: "Due today", color: "yellow" },
                  { name: "Graph Algorithms", reason: "Optimal timing", color: "cyan" },
                ].map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-lg border border-[var(--neon-${item.color})]/30 bg-[var(--neon-${item.color})]/10`}>
                    <p className={`font-semibold text-[var(--neon-${item.color})] mb-1`}>{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-12"
        >
          <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Brain className="w-6 h-6 text-[var(--neon-green)]" />
              AI Learning Insights
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[var(--neon-green)]/10 border border-[var(--neon-green)]/30">
                <p className="font-semibold text-[var(--neon-green)] mb-2">✨ Strength Recognition</p>
                <p className="text-sm text-muted-foreground">
                  You have expert-level mastery in "Arrays & Strings" and "Sorting Algorithms". Consider taking advanced challenges in these areas.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)]/30">
                <p className="font-semibold text-[var(--neon-cyan)] mb-2">🎯 Optimal Learning Path</p>
                <p className="text-sm text-muted-foreground">
                  Based on your learning style (Visual), we recommend starting with "Tree Visualization" before diving into "Graph Algorithms".
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[var(--neon-yellow)]/10 border border-[var(--neon-yellow)]/30">
                <p className="font-semibold text-[var(--neon-yellow)] mb-2">⚡ Performance Pattern</p>
                <p className="text-sm text-muted-foreground">
                  Your performance dips after 2 hours of continuous study. Consider 5-minute breaks every 90 minutes for better retention.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[var(--neon-pink)]/10 border border-[var(--neon-pink)]/30">
                <p className="font-semibold text-[var(--neon-pink)] mb-2">⏰ Time Estimate</p>
                <p className="text-sm text-muted-foreground">
                  At your current pace, you'll reach 90% mastery in "Dynamic Programming" in approximately 2-3 weeks. 
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
