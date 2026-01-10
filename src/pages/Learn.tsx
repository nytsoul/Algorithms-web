import { motion } from "framer-motion";
import { Link } from "react-router";
import { Code2, BookOpen, Target, TrendingUp, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Learn() {
  const learningPaths = [
    {
      title: "Data Structures Fundamentals",
      difficulty: "Beginner",
      estimatedHours: 24,
      progress: 65,
      algorithms: 15,
      milestones: [
        { title: "Arrays & Strings", completed: true },
        { title: "Linked Lists", completed: true },
        { title: "Stacks & Queues", completed: true },
        { title: "Trees & Graphs", completed: false },
      ],
    },
    {
      title: "Algorithm Design Patterns",
      difficulty: "Intermediate",
      estimatedHours: 36,
      progress: 30,
      algorithms: 25,
      milestones: [
        { title: "Divide & Conquer", completed: true },
        { title: "Dynamic Programming", completed: false },
        { title: "Greedy Algorithms", completed: false },
        { title: "Backtracking", completed: false },
      ],
    },
    {
      title: "Advanced Graph Algorithms",
      difficulty: "Advanced",
      estimatedHours: 48,
      progress: 0,
      algorithms: 30,
      milestones: [
        { title: "Shortest Paths", completed: false },
        { title: "Network Flow", completed: false },
        { title: "Graph Coloring", completed: false },
        { title: "Advanced Topics", completed: false },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 cyber-grid pointer-events-none" />
      <div className="scanline fixed inset-0 pointer-events-none" />

      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="relative z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center">
              <Code2 className="w-6 h-6 text-background" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)] bg-clip-text text-transparent">AlgoVerse</h1>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/dashboard"><Button variant="ghost">Browse</Button></Link>
            <Link to="/visualize"><Button variant="ghost">Visualize</Button></Link>
            <Link to="/benchmark"><Button variant="ghost">Benchmark</Button></Link>
            <Link to="/recommend"><Button variant="ghost">AI Recommend</Button></Link>
            <Link to="/learn"><Button variant="ghost" className="text-[var(--neon-cyan)]">Learn</Button></Link>
          </nav>
        </div>
      </motion.header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[var(--neon-yellow)] to-[var(--neon-green)] bg-clip-text text-transparent">Adaptive Learning Paths</span>
          </h1>
          <p className="text-xl text-muted-foreground">Personalized algorithm learning journeys from beginner to expert</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
            <BookOpen className="w-8 h-8 text-[var(--neon-cyan)] mb-3" />
            <p className="text-sm text-muted-foreground mb-1">Learning Paths</p>
            <p className="text-3xl font-bold text-[var(--neon-cyan)]">12</p>
          </Card>
          <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
            <Target className="w-8 h-8 text-[var(--neon-pink)] mb-3" />
            <p className="text-sm text-muted-foreground mb-1">Algorithms Mastered</p>
            <p className="text-3xl font-bold text-[var(--neon-pink)]">47</p>
          </Card>
          <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
            <TrendingUp className="w-8 h-8 text-[var(--neon-green)] mb-3" />
            <p className="text-sm text-muted-foreground mb-1">Overall Progress</p>
            <p className="text-3xl font-bold text-[var(--neon-green)]">42%</p>
          </Card>
        </div>

        <div className="space-y-6">
          {learningPaths.map((path, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-[var(--neon-cyan)]/50 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">{path.title}</h3>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className={`border-[var(--neon-${path.difficulty === 'Beginner' ? 'green' : path.difficulty === 'Intermediate' ? 'cyan' : 'purple'})] text-[var(--neon-${path.difficulty === 'Beginner' ? 'green' : path.difficulty === 'Intermediate' ? 'cyan' : 'purple'})]`}>
                            {path.difficulty}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{path.estimatedHours} hours</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{path.algorithms} algorithms</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-semibold text-[var(--neon-cyan)]">{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-[var(--neon-cyan)]">Milestones</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {path.milestones.map((milestone, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                            {milestone.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-[var(--neon-green)]" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground" />
                            )}
                            <span className={milestone.completed ? "text-foreground" : "text-muted-foreground"}>
                              {milestone.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div className="bg-background/50 rounded-lg p-4 mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Next Up</p>
                      <p className="text-sm font-semibold text-foreground">
                        {path.milestones.find(m => !m.completed)?.title || "Complete!"}
                      </p>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] hover:opacity-90">
                      {path.progress > 0 ? "Continue Learning" : "Start Path"}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
