import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { Code2, Brain, Sparkles, Target, TrendingUp, AlertCircle, Clock, Zap, BarChart3, CheckCircle2, Share2, Download, Bookmark, Copy, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

interface Recommendation {
  algorithm: string;
  score: number;
  reasoning: string;
  tradeoffs: string;
  timeComplexity: string;
  spaceComplexity: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  learningTime: number; // in hours
  relatedAlgorithms: string[];
  bestFor: string;
  notSuitableFor: string;
  emoji: string;
}

export default function Recommend() {
  const navigate = useNavigate();
  const { isAuthenticated, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [problemDescription, setProblemDescription] = useState("");
  const [inputSize, setInputSize] = useState("medium");
  const [timeConstraint, setTimeConstraint] = useState("moderate");
  const [spaceConstraint, setSpaceConstraint] = useState("moderate");
  const [environment, setEnvironment] = useState("server");
  const [priority, setPriority] = useState<"speed" | "space" | "balanced">("balanced");
  const [experienceLevel, setExperienceLevel] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Recommendation | null>(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthenticated) {
    navigate("/auth", { replace: true });
    return null;
  }

  const handleLogout = async () => {
    await signOut();
  };

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const recommendations: Recommendation[] = [
      {
        algorithm: "Quick Sort",
        score: 95,
        reasoning: "⚡ Optimal for large datasets with average O(n log n) performance. Excellent cache locality.",
        tradeoffs: "⚠️ Unstable sort, worst-case O(n²) can be mitigated with randomized pivot selection.",
        timeComplexity: "O(n log n) avg, O(n²) worst",
        spaceComplexity: "O(log n)",
        difficulty: "Intermediate",
        learningTime: 3,
        relatedAlgorithms: ["Merge Sort", "Heap Sort", "Intro Sort"],
        bestFor: "📊 General purpose sorting, large datasets, in-memory processing",
        notSuitableFor: "🚫 When stability is critical, real-time systems with strict timing",
        emoji: "⚡",
      },
      {
        algorithm: "Merge Sort",
        score: 88,
        reasoning: "🔀 Guaranteed O(n log n) performance, stable sort perfect for linked lists.",
        tradeoffs: "💾 Requires O(n) extra space. Slightly slower than Quick Sort in practice.",
        timeComplexity: "O(n log n) guaranteed",
        spaceComplexity: "O(n)",
        difficulty: "Intermediate",
        learningTime: 4,
        relatedAlgorithms: ["Quick Sort", "Tim Sort", "Counting Sort"],
        bestFor: "🎯 Stable sorting, external sorting, linked list sorting",
        notSuitableFor: "🚫 Memory-constrained systems, small datasets",
        emoji: "🔀",
      },
      {
        algorithm: "Heap Sort",
        score: 75,
        reasoning: "🏔️ In-place sorting with O(n log n) guarantee. No extra space needed.",
        tradeoffs: "⚠️ Not cache-friendly. Unstable sort. Generally slower than Quick Sort.",
        timeComplexity: "O(n log n) guaranteed",
        spaceComplexity: "O(1)",
        difficulty: "Intermediate",
        learningTime: 3.5,
        relatedAlgorithms: ["Quick Sort", "Priority Queue"],
        bestFor: "💡 Memory-constrained environments, systems requiring O(1) space",
        notSuitableFor: "🚫 Cache-sensitive applications, when stability is needed",
        emoji: "🏔️",
      },
    ];
    setRecommendations(recommendations);
    setIsLoading(false);
  };

  const handleDownloadReport = () => {
    const report = recommendations.map(r => `
📊 Algorithm: ${r.algorithm} ${r.emoji}
   Score: ${r.score}%
   ⏱️  Time: ${r.timeComplexity}
   💾 Space: ${r.spaceComplexity}
   📚 Learning: ${r.learningTime}h
   🎓 Difficulty: ${r.difficulty}
   ${r.reasoning}
---
`).join('\n');

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(report));
    element.setAttribute('download', `algorithm-recommendations-${new Date().toISOString().split('T')[0]}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShareRecommendation = (algo: Recommendation) => {
    const text = `Check out this algorithm recommendation: ${algo.algorithm} (${algo.emoji}) - ${algo.score}% match! #AlgoVerse`;
    if (navigator.share) {
      navigator.share({ title: "Algorithm Recommendation", text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background relative overflow-hidden flex">
      {/* Sidebar */}
      {sidebarOpen && <Sidebar onLogout={handleLogout} isOpen={sidebarOpen} />}

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? "ml-80" : ""} flex flex-col transition-all duration-300`}>
        <div className="fixed inset-0 cyber-grid pointer-events-none" />
        <div className="scanline fixed inset-0 pointer-events-none" />

        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                🧠
              </motion.span>
              <span className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] bg-clip-text text-transparent">AI Algorithm Recommendation</span>
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                ⚡
              </motion.span>
            </h1>
            <p className="text-xl text-muted-foreground">✨ Get intelligent algorithm recommendations based on your requirements 🏆</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="space-y-6">
                  <div>
                    <Label className="text-foreground mb-2 block">📝 Problem Description</Label>
                    <Textarea
                      placeholder="🤔 Describe your problem or use case... (e.g., 'Sort 1M records with minimal memory')"
                      className="min-h-[120px] border-border/50 bg-background/50 focus:border-[var(--neon-cyan)]/50 transition"
                      value={problemDescription}
                      onChange={(e) => setProblemDescription(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground mb-2 block">📊 Input Size</Label>
                      <Select value={inputSize} onValueChange={setInputSize}>
                        <SelectTrigger className="border-border/50 bg-background/50 hover:border-[var(--neon-cyan)]/50 transition">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">🔹 Small (&lt; 1K)</SelectItem>
                          <SelectItem value="medium">🔸 Medium (1K - 100K)</SelectItem>
                          <SelectItem value="large">🔺 Large (100K - 1M)</SelectItem>
                          <SelectItem value="xlarge">⭐ Very Large (&gt; 1M)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-foreground mb-2 block">⏱️ Time Constraint</Label>
                      <Select value={timeConstraint} onValueChange={setTimeConstraint}>
                        <SelectTrigger className="border-border/50 bg-background/50 hover:border-[var(--neon-pink)]/50 transition">
                          <SelectValue placeholder="Select constraint" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">🔥 Real-time (&lt; 100ms)</SelectItem>
                          <SelectItem value="fast">⚡ Fast (&lt; 1s)</SelectItem>
                          <SelectItem value="moderate">⏲️ Moderate (&lt; 10s)</SelectItem>
                          <SelectItem value="relaxed">😌 Relaxed (&gt; 10s)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-foreground mb-2 block">💾 Space Constraint</Label>
                      <Select value={spaceConstraint} onValueChange={setSpaceConstraint}>
                        <SelectTrigger className="border-border/50 bg-background/50 hover:border-[var(--neon-green)]/50 transition">
                          <SelectValue placeholder="Select constraint" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tight">🎯 Very Limited</SelectItem>
                          <SelectItem value="moderate">📊 Moderate</SelectItem>
                          <SelectItem value="relaxed">✨ Abundant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-foreground mb-2 block">🌐 Environment</Label>
                      <Select value={environment} onValueChange={setEnvironment}>
                        <SelectTrigger className="border-border/50 bg-background/50 hover:border-[var(--neon-yellow)]/50 transition">
                          <SelectValue placeholder="Select environment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">🌍 Web Browser</SelectItem>
                          <SelectItem value="mobile">📱 Mobile Device</SelectItem>
                          <SelectItem value="server">🖥️ Server</SelectItem>
                          <SelectItem value="embedded">⚙️ Embedded System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Advanced Options */}
                  <div className="border-t border-border/30 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="w-full text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10 py-2 rounded transition flex items-center justify-center gap-2 font-semibold"
                    >
                      {showAdvanced ? "👀 Hide" : "👀 Show"} Advanced Options
                    </motion.button>
                  </div>

                  {showAdvanced && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="space-y-4 p-4 bg-background/30 rounded-lg border border-border/30"
                    >
                      <div>
                        <Label className="text-foreground mb-3 block">🎯 Optimization Priority</Label>
                        <div className="flex gap-2">
                          {(['speed', 'space', 'balanced'] as const).map(p => (
                            <motion.button
                              key={p}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setPriority(p)}
                              className={`flex-1 py-2 px-3 rounded text-xs font-semibold transition ${priority === p ? "bg-[var(--neon-cyan)] text-background" : "bg-background/50 border border-border/50 hover:border-[var(--neon-cyan)]/50"}`}
                            >
                              {p === 'speed' && '⚡ Speed'}
                              {p === 'space' && '💾 Space'}
                              {p === 'balanced' && '⚖️ Balanced'}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-foreground mb-3 block">📚 Experience Level</Label>
                        <Select value={experienceLevel} onValueChange={(v: any) => setExperienceLevel(v)}>
                          <SelectTrigger className="border-border/50 bg-background/50 hover:border-[var(--neon-purple)]/50 transition">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">🌱 Beginner (learning)</SelectItem>
                            <SelectItem value="intermediate">📈 Intermediate (experienced)</SelectItem>
                            <SelectItem value="advanced">🚀 Advanced (expert)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGetRecommendations}
                      disabled={!problemDescription.trim()}
                      className="flex-1 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] hover:opacity-90 py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 transition disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                          ⚙️
                        </motion.div>
                      ) : (
                        <>
                          <Brain className="w-5 h-5" />
                          🚀 Get Recommendations
                        </>
                      )}
                    </motion.button>
                    {recommendations.length > 0 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownloadReport}
                        className="py-3 px-4 rounded-lg border border-[var(--neon-cyan)]/30 hover:bg-[var(--neon-cyan)]/10 transition flex items-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                        📥
                      </motion.button>
                    )}
                  </div>
                </div>
              </Card>

              {recommendations.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                      <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        ✨
                      </motion.span>
                      <span>Recommended Algorithms</span>
                      <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        🏆
                      </motion.span>
                    </h2>
                    <Button
                      onClick={() => setComparisonMode(!comparisonMode)}
                      variant="outline"
                      className="border-[var(--neon-green)]/30"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      {comparisonMode ? "📋 List" : "🔄 Compare"}
                    </Button>
                  </div>

                  {comparisonMode ? (
                    // Comparison View
                    <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border/30">
                            <th className="text-left py-2 px-2 text-[var(--neon-cyan)]">📋 Algorithm</th>
                            <th className="text-left py-2 px-2 text-[var(--neon-cyan)]">📊 Score</th>
                            <th className="text-left py-2 px-2 text-[var(--neon-cyan)]">⏱️ Time</th>
                            <th className="text-left py-2 px-2 text-[var(--neon-cyan)]">💾 Space</th>
                            <th className="text-left py-2 px-2 text-[var(--neon-cyan)]">📚 Learn Time</th>
                            <th className="text-left py-2 px-2 text-[var(--neon-cyan)]">🎓 Difficulty</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recommendations.map((rec, idx) => (
                            <tr key={idx} className="border-b border-border/20 hover:bg-background/30 transition">
                              <td className="py-3 px-2 text-foreground font-semibold">{rec.algorithm}</td>
                              <td className="py-3 px-2">
                                <Badge className="bg-[var(--neon-purple)]/20 text-[var(--neon-purple)]">{rec.score}%</Badge>
                              </td>
                              <td className="py-3 px-2 text-muted-foreground text-xs font-mono">{rec.timeComplexity}</td>
                              <td className="py-3 px-2 text-muted-foreground text-xs font-mono">{rec.spaceComplexity}</td>
                              <td className="py-3 px-2 text-[var(--neon-green)]">{rec.learningTime}h</td>
                              <td className="py-3 px-2">
                                <Badge className="bg-[var(--neon-pink)]/20 text-[var(--neon-pink)]">{rec.difficulty}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Card>
                  ) : (
                    // List View with Details
                    <div className="space-y-4">
                      {recommendations.map((rec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card
                            className={`cyber-card p-6 bg-card/50 backdrop-blur-sm border transition-all cursor-pointer ${selectedAlgorithm?.algorithm === rec.algorithm
                                ? "border-[var(--neon-purple)]"
                                : "border-border/50 hover:border-[var(--neon-purple)]/50"
                              }`}
                            onClick={() => setSelectedAlgorithm(selectedAlgorithm?.algorithm === rec.algorithm ? null : rec)}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-xl font-bold text-foreground">{rec.algorithm}</h3>
                                  <Badge className="bg-[var(--neon-purple)]/20 text-[var(--neon-purple)]">
                                    Match: {rec.score}%
                                  </Badge>
                                  <Badge className={`${rec.difficulty === "Beginner" ? "bg-[var(--neon-green)]/20 text-[var(--neon-green)]" :
                                      rec.difficulty === "Intermediate" ? "bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)]" :
                                        rec.difficulty === "Advanced" ? "bg-[var(--neon-pink)]/20 text-[var(--neon-pink)]" :
                                          "bg-[var(--neon-purple)]/20 text-[var(--neon-purple)]"
                                    }`}>
                                    {rec.difficulty}
                                  </Badge>
                                </div>
                                <div className="w-full bg-background/50 rounded h-2 overflow-hidden">
                                  <motion.div
                                    className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] h-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${rec.score}%` }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                  />
                                </div>
                              </div>
                              <div className="flex gap-2 ml-4">
                                <Button size="icon" variant="ghost" className="hover:bg-[var(--neon-cyan)]/10">
                                  <Bookmark className="w-4 h-4 text-[var(--neon-cyan)]" />
                                </Button>
                                <Button size="icon" variant="ghost" className="hover:bg-[var(--neon-pink)]/10">
                                  <Share2 className="w-4 h-4 text-[var(--neon-pink)]" />
                                </Button>
                              </div>
                            </div>

                            <div className="grid grid-cols-4 gap-3 mb-4 py-3 border-y border-border/30">
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground mb-1">⏱️ Time</p>
                                <p className="text-sm font-mono text-[var(--neon-cyan)]">{rec.timeComplexity}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground mb-1">💾 Space</p>
                                <p className="text-sm font-mono text-[var(--neon-pink)]">{rec.spaceComplexity}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground mb-1">📚 Learn</p>
                                <p className="text-sm font-bold text-[var(--neon-green)]">{rec.learningTime}h</p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground mb-1">🎯 Mastery</p>
                                <p className="text-sm font-bold text-[var(--neon-yellow)]">{rec.learningTime * 2}h</p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <p className="text-sm font-semibold text-[var(--neon-cyan)] mb-1">✅ Why This?</p>
                                <p className="text-sm text-muted-foreground">{rec.reasoning}</p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-[var(--neon-pink)] mb-1">⚠️ Trade-offs</p>
                                <p className="text-sm text-muted-foreground">{rec.tradeoffs}</p>
                              </div>

                              {selectedAlgorithm?.algorithm === rec.algorithm && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="pt-3 border-t border-border/30 space-y-3"
                                >
                                  <div>
                                    <p className="text-sm font-semibold text-[var(--neon-green)] mb-2">✨ Best For</p>
                                    <p className="text-sm text-muted-foreground">{rec.bestFor}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-[var(--neon-yellow)] mb-2">❌ Not For</p>
                                    <p className="text-sm text-muted-foreground">{rec.notSuitableFor}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold text-[var(--neon-purple)] mb-2">🔗 Related Algos</p>
                                    <div className="flex flex-wrap gap-2">
                                      {rec.relatedAlgorithms.map((algo, idx) => (
                                        <Badge key={idx} className="bg-background/50 border border-border/50 text-muted-foreground">
                                          {algo}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </div>

                            <div className="flex gap-2 mt-4">
                              <Button variant="outline" className="flex-1 border-[var(--neon-purple)]/30 text-[var(--neon-purple)] hover:bg-[var(--neon-purple)]/10">
                                👁️ View Details
                              </Button>
                              <Button variant="outline" className="flex-1 border-[var(--neon-cyan)]/30 text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10">
                                📊 Visualize
                              </Button>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              {/* AI-Powered Selection Card */}
              <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
                    🧠
                  </motion.span>
                  <h3 className="text-xl font-bold text-foreground">AI-Powered Selection</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Our intelligent recommendation engine analyzes your constraints and suggests the most optimal algorithms based on:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--neon-cyan)]">✅</span>
                    <span>⏱️ Time complexity analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--neon-pink)]">✅</span>
                    <span>💾 Space requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--neon-purple)]">✅</span>
                    <span>🌍 Real-world performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--neon-green)]">✅</span>
                    <span>⚙️ Hardware constraints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--neon-yellow)]">✅</span>
                    <span>📚 Learning curve & adoption</span>
                  </li>
                </ul>
              </Card>

              {/* Success Rate Card */}
              <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    📈
                  </motion.span>
                  <h3 className="text-xl font-bold text-foreground">Success Rate</h3>
                </div>
                <div className="text-4xl font-bold text-[var(--neon-green)] mb-2">94.7%</div>
                <p className="text-sm text-muted-foreground mb-4">
                  of users found the recommended algorithms optimal for their use case ✨
                </p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">👍 User Satisfaction</p>
                    <Progress value={94.7} className="h-2" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">🚀 Implementation Success</p>
                    <Progress value={89.3} className="h-2" />
                  </div>
                </div>
              </Card>

              {/* Learning Path Card */}
              {selectedAlgorithm && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-[var(--neon-cyan)]/30">
                    <div className="flex items-center gap-3 mb-4">
                      <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity }}>
                        ⏰
                      </motion.span>
                      <h3 className="text-xl font-bold text-foreground">Learning Path</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">📚 Time to Learn</p>
                        <p className="text-2xl font-bold text-[var(--neon-cyan)]">{selectedAlgorithm.learningTime}h</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">🎯 Time to Master</p>
                        <p className="text-lg font-semibold text-[var(--neon-green)]">{selectedAlgorithm.learningTime * 2}h</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[var(--neon-yellow)] mb-2">📋 Prerequisites</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>📍 Data structure fundamentals</li>
                          <li>📍 Time/space complexity analysis</li>
                          <li>📍 Basic algorithm design</li>
                        </ul>
                      </div>
                      <Button className="w-full bg-[var(--neon-cyan)]/20 hover:bg-[var(--neon-cyan)]/30 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/30 transition">
                        🚀 Start Learning Path
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Pro Tips Card */}
              <Card className="cyber-card p-6 bg-gradient-to-b from-[var(--neon-yellow)]/10 to-background/50 backdrop-blur-sm border-[var(--neon-yellow)]/30">
                <div className="flex items-center gap-3 mb-4">
                  <motion.span animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    💡
                  </motion.span>
                  <h3 className="text-lg font-bold text-foreground">Pro Tips</h3>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>📊 Benchmark with your actual data for real-world comparison</li>
                  <li>👥 Consider team expertise when making final decision</li>
                  <li>⚡ Implement caching when applicable to improve performance</li>
                  <li>🔍 Profile before optimizing - measure actual bottlenecks</li>
                </ul>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
