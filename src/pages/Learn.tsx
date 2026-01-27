import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { Code2, BookOpen, Target, TrendingUp, CheckCircle2, Circle, Calendar, Trophy, Zap, Star, Layout, Map, Sparkles, Award, Swords, Sword, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useMastery } from "@/hooks/use-mastery";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import SkillGraph from "@/components/SkillGraph";
import AlgorithmBattle from "@/components/AlgorithmBattle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Learn() {
  const navigate = useNavigate();
  const { isAuthenticated, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { streak, points, enrolledPaths, completeDailyProtocol } = useMastery();
  const { t } = useTranslation();

  if (!isAuthenticated) {
    navigate("/auth", { replace: true });
    return null;
  }

  const handleLogout = async () => {
    await signOut();
  };
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
    <div className="w-full min-h-screen bg-background relative overflow-hidden flex">
      {/* Sidebar */}
      {sidebarOpen && <Sidebar onLogout={handleLogout} isOpen={sidebarOpen} />}

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? "lg:ml-80 md:ml-72 sm:ml-64" : "ml-0"} flex flex-col transition-all duration-300`}>
        <div className="fixed inset-0 cyber-grid pointer-events-none" />
        <div className="scanline fixed inset-0 pointer-events-none" />

        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="relative z-10 w-full px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 space-y-12 sm:space-y-16 md:space-y-24">
          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <Badge className="mb-3 sm:mb-4 bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] border-[var(--neon-cyan)]/20 px-3 sm:px-4 py-1 text-xs sm:text-sm">
              {t('learn.hero_badge')}
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">
              {t('learn.hero_title').split(' ').slice(0, 2).join(' ')} <br />
              <span className="bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-pink)] bg-clip-text text-transparent">{t('learn.hero_title').split(' ').slice(2).join(' ')}</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {t('learn.hero_subtitle')}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              { label: t('learn.stats.paths'), value: Object.keys(enrolledPaths).length.toString(), icon: BookOpen, color: "var(--neon-cyan)" },
              { label: t('learn.stats.mastered'), value: "47", icon: Target, color: "var(--neon-pink)" },
              { label: t('learn.stats.progress'), value: "42%", icon: TrendingUp, color: "var(--neon-green)" },
              { label: t('learn.stats.streak'), value: `${streak} ${t('learn.stats.streak').split(' ')[1]}`, icon: Calendar, color: "var(--neon-yellow)" },
            ].map((stat) => (
              <Card key={stat.label} className="cyber-card p-3 sm:p-4 md:p-6 bg-card/40 backdrop-blur-sm border-border/50 hover:border-[var(--neon-cyan)]/30 transition-all">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mb-2 sm:mb-3 md:mb-4" style={{ color: stat.color }} />
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
              </Card>
            ))}
          </div>

          {/* Daily Protocol (Unique Google-style habit tracker) */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Zap className="w-8 h-8 text-[var(--neon-yellow)]" />
                  {t('learn.daily_protocol.title')}
                </h2>
                <p className="text-muted-foreground">{t('learn.daily_protocol.subtitle')}</p>
              </div>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5, 6, 7].map(d => (
                  <div key={d} className={`w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold ${(streak % 7 || 7) >= d ? 'bg-[var(--neon-yellow)] text-background' : 'bg-card/50 text-muted-foreground'}`}>
                    {d}
                  </div>
                ))}
              </div>
            </div>

            <Card className="cyber-card p-10 bg-gradient-to-br from-[var(--neon-yellow)]/5 to-transparent border-[var(--neon-yellow)]/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="w-32 h-32 text-[var(--neon-yellow)]" />
              </div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Badge className="bg-[var(--neon-yellow)] text-background border-none">Challenge #142</Badge>
                    <h3 className="text-4xl font-bold">Master Binary Search</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      A fundamental algorithm for efficient searching in sorted arrays. Learn how to reduce search time from O(n) to O(log n). Essential for system design.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => {
                        completeDailyProtocol();
                        navigate("/algorithm/binary-search");
                      }}
                      className="bg-[var(--neon-yellow)] text-background hover:bg-[var(--neon-yellow)]/90 h-12 px-8 font-bold"
                    >
                      {t('learn.daily_protocol.accept')}
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 border-border/50"
                      onClick={() => toast.info(t('learn.daily_protocol.skip_info') || "New protocol will be assigned tomorrow.")}
                    >
                      {t('learn.daily_protocol.skip')}
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 rounded-xl bg-background/50 border border-border/20">
                    <Star className="w-5 h-5 text-[var(--neon-yellow)] mb-2" />
                    <p className="text-2xl font-bold">+50 XP</p>
                    <p className="text-xs text-muted-foreground uppercase">Base Reward</p>
                  </div>
                  <div className="p-6 rounded-xl bg-background/50 border border-border/20">
                    <Zap className="w-5 h-5 text-[var(--neon-cyan)] mb-2" />
                    <p className="text-2xl font-bold">1.5x</p>
                    <p className="text-xs text-muted-foreground uppercase">Streak Bonus</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Mastery Knowledge Graph (Unique Feature) */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Map className="w-8 h-8 text-[var(--neon-cyan)]" />
                  {t('learn.knowledge_mapping.title')}
                </h2>
                <p className="text-muted-foreground">{t('learn.knowledge_mapping.subtitle')}</p>
              </div>
            </div>
            <SkillGraph />
          </section>

          {/* Learning Paths */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Layout className="w-8 h-8 text-[var(--neon-purple)]" />
                  {t('learn.learning_paths.title')}
                </h2>
                <p className="text-muted-foreground">{t('learn.learning_paths.subtitle')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {learningPaths.map((path, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <Card className="cyber-card p-1 bg-gradient-to-r from-border/50 via-[var(--neon-cyan)]/20 to-border/50">
                    <div className="bg-card/90 backdrop-blur-md p-8 h-full rounded-[calc(var(--radius)-1px)]">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-3">
                          <div className="flex items-start justify-between mb-6">
                            <div>
                              <h3 className="text-2xl font-bold text-foreground mb-3">{path.title}</h3>
                              <div className="flex items-center gap-4">
                                <Badge variant="outline" className={`border-[var(--neon-${path.difficulty === 'Beginner' ? 'green' : path.difficulty === 'Intermediate' ? 'cyan' : 'purple'})] text-[var(--neon-${path.difficulty === 'Beginner' ? 'green' : path.difficulty === 'Intermediate' ? 'cyan' : 'purple'})]`}>
                                  {path.difficulty}
                                </Badge>
                                <span className="text-xs text-muted-foreground uppercase tracking-tighter">⏱️ {path.estimatedHours} hrs</span>
                                <span className="text-xs text-muted-foreground uppercase tracking-tighter">📦 {path.algorithms} Algos</span>
                              </div>
                            </div>
                          </div>

                          <div className="mb-8">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Syllabus Completion</span>
                              <span className="text-sm font-bold text-[var(--neon-cyan)]">{path.progress}%</span>
                            </div>
                            <Progress value={path.progress} className="h-1.5" />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {path.milestones.map((milestone, idx) => (
                              <div key={idx} className={`p-4 rounded-xl border transition-all ${milestone.completed ? 'bg-[var(--neon-green)]/5 border-[var(--neon-green)]/20' : 'bg-background/40 border-border/10'}`}>
                                <div className="flex items-center gap-2 mb-2">
                                  {milestone.completed ? (
                                    <CheckCircle2 className="w-4 h-4 text-[var(--neon-green)]" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-muted-foreground" />
                                  )}
                                  <span className={`text-[10px] font-bold uppercase tracking-tighter ${milestone.completed ? "text-[var(--neon-green)]" : "text-muted-foreground"}`}>
                                    Module {idx + 1}
                                  </span>
                                </div>
                                <p className="text-sm font-semibold truncate">{milestone.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col justify-between border-l border-border/20 pl-8">
                          <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-background/50 border border-border/20">
                              <p className="text-[10px] text-muted-foreground uppercase mb-2">Next Up</p>
                              <p className="text-sm font-bold text-foreground">
                                {path.milestones.find(m => !m.completed)?.title || "Course Completed"}
                              </p>
                            </div>
                            <div className="p-4 rounded-xl bg-[var(--neon-purple)]/5 border border-[var(--neon-purple)]/20">
                              <p className="text-[10px] text-muted-foreground uppercase mb-2">Est. Certificate</p>
                              <p className="text-xs font-medium text-[var(--neon-purple)]">
                                AlgoVerse Certified {path.difficulty}
                              </p>
                            </div>
                          </div>
                          <Button
                            onClick={() => navigate(`/dashboard?search=${encodeURIComponent(path.title)}`)}
                            className="w-full bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-pink)] font-bold h-12"
                          >
                            {path.progress > 0 ? t('learn.learning_paths.resume') : t('learn.learning_paths.enroll')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Performance Battleground (Unique Competitive Feature) */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Swords className="w-8 h-8 text-[var(--neon-pink)]" />
                  Performance Analysis
                </h2>
                <p className="text-muted-foreground">Watch algorithms compete in real-time execution</p>
              </div>
            </div>
            <AlgorithmBattle />
          </section>

          {/* Professional Recognition/Certificates (Google-style) */}
          <section className="space-y-8 pb-32">
            <div className="text-center space-y-4 mb-16">
              <Sparkles className="w-12 h-12 text-[var(--neon-yellow)] mx-auto mb-4" />
              <h2 className="text-4xl font-bold">Earn Your Edge</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Complete learning paths to unlock industry-standard digital certificates and holographic profile badges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Fundamental Data Architect", type: "Certificate", icon: Award, color: "var(--neon-cyan)" },
                { title: "High-Performance Engineer", type: "Certificate", icon: Zap, color: "var(--neon-purple)" },
                { title: "Master of Complexity", type: "Badge", icon: Star, color: "var(--neon-yellow)" },
              ].map((item, i) => (
                <div key={i} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                  <Card className="relative p-12 bg-[#050505] border-border/50 flex flex-col items-center text-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center border-2 border-border/30 group-hover:border-[var(--neon-cyan)] transition-colors">
                      <item.icon className="w-10 h-10" style={{ color: item.color }} />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2 uppercase tracking-tighter opacity-50">{item.type}</Badge>
                      <h4 className="text-xl font-bold">{item.title}</h4>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground group-hover:text-foreground"
                      onClick={() => toast.info("Complete the prerequisite path to view requirements.")}
                    >
                      View Requirements
                    </Button>
                  </Card>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
