import { motion } from "framer-motion";
import { Link } from "react-router";
import { useState } from "react";
import { Code2, Brain, Sparkles, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function Recommend() {
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const handleGetRecommendations = () => {
    setRecommendations([
      {
        algorithm: "Quick Sort",
        score: 95,
        reasoning: "Optimal for large datasets with average O(n log n) performance. Excellent cache locality.",
        tradeoffs: "Unstable sort, worst-case O(n²) can be mitigated with randomized pivot selection.",
      },
      {
        algorithm: "Merge Sort",
        score: 88,
        reasoning: "Guaranteed O(n log n) performance, stable sort perfect for linked lists.",
        tradeoffs: "Requires O(n) extra space. Slightly slower than Quick Sort in practice.",
      },
      {
        algorithm: "Heap Sort",
        score: 75,
        reasoning: "In-place sorting with O(n log n) guarantee. No extra space needed.",
        tradeoffs: "Not cache-friendly. Unstable sort. Generally slower than Quick Sort.",
      },
    ]);
  };

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
            <Link to="/recommend"><Button variant="ghost" className="text-[var(--neon-cyan)]">AI Recommend</Button></Link>
            <Link to="/learn"><Button variant="ghost">Learn</Button></Link>
          </nav>
        </div>
      </motion.header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] bg-clip-text text-transparent">AI Algorithm Recommendation</span>
          </h1>
          <p className="text-xl text-muted-foreground">Get intelligent algorithm recommendations based on your requirements</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="space-y-6">
                <div>
                  <Label className="text-foreground mb-2 block">Problem Description</Label>
                  <Textarea placeholder="Describe your problem or use case..." className="min-h-[120px] border-border/50 bg-background/50" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-foreground mb-2 block">Input Size</Label>
                    <Select>
                      <SelectTrigger className="border-border/50 bg-background/50">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (&lt; 1K)</SelectItem>
                        <SelectItem value="medium">Medium (1K - 100K)</SelectItem>
                        <SelectItem value="large">Large (100K - 1M)</SelectItem>
                        <SelectItem value="xlarge">Very Large (&gt; 1M)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-foreground mb-2 block">Time Constraint</Label>
                    <Select>
                      <SelectTrigger className="border-border/50 bg-background/50">
                        <SelectValue placeholder="Select constraint" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time (&lt; 100ms)</SelectItem>
                        <SelectItem value="fast">Fast (&lt; 1s)</SelectItem>
                        <SelectItem value="moderate">Moderate (&lt; 10s)</SelectItem>
                        <SelectItem value="relaxed">Relaxed (&gt; 10s)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-foreground mb-2 block">Space Constraint</Label>
                    <Select>
                      <SelectTrigger className="border-border/50 bg-background/50">
                        <SelectValue placeholder="Select constraint" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tight">Very Limited</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="relaxed">Abundant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-foreground mb-2 block">Environment</Label>
                    <Select>
                      <SelectTrigger className="border-border/50 bg-background/50">
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web">Web Browser</SelectItem>
                        <SelectItem value="mobile">Mobile Device</SelectItem>
                        <SelectItem value="server">Server</SelectItem>
                        <SelectItem value="embedded">Embedded System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleGetRecommendations} className="w-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] hover:opacity-90 h-12 text-lg">
                  <Brain className="w-5 h-5 mr-2" />
                  Get AI Recommendations
                </Button>
              </div>
            </Card>

            {recommendations.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-[var(--neon-yellow)]" />
                  Recommended Algorithms
                </h2>
                {recommendations.map((rec, index) => (
                  <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                    <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-[var(--neon-purple)]/50 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-2">{rec.algorithm}</h3>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] border-0">
                              Match Score: {rec.score}%
                            </Badge>
                          </div>
                        </div>
                        <Target className="w-8 h-8 text-[var(--neon-purple)]" />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-semibold text-[var(--neon-cyan)] mb-1">Why This Algorithm?</p>
                          <p className="text-sm text-muted-foreground">{rec.reasoning}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[var(--neon-pink)] mb-1">Trade-offs</p>
                          <p className="text-sm text-muted-foreground">{rec.tradeoffs}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full mt-4 border-[var(--neon-purple)]/30 text-[var(--neon-purple)] hover:bg-[var(--neon-purple)]/10">
                        View Algorithm Details
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <Brain className="w-12 h-12 text-[var(--neon-purple)] mb-4" />
              <h3 className="text-xl font-bold mb-3 text-foreground">AI-Powered Selection</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our intelligent recommendation engine analyzes your constraints and suggests the most optimal algorithms based on:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--neon-cyan)]">✓</span>
                  <span>Time complexity analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--neon-pink)]">✓</span>
                  <span>Space requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--neon-purple)]">✓</span>
                  <span>Real-world performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--neon-green)]">✓</span>
                  <span>Hardware constraints</span>
                </li>
              </ul>
            </Card>

            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <TrendingUp className="w-12 h-12 text-[var(--neon-green)] mb-4" />
              <h3 className="text-xl font-bold mb-3 text-foreground">Success Rate</h3>
              <div className="text-4xl font-bold text-[var(--neon-green)] mb-2">94.7%</div>
              <p className="text-sm text-muted-foreground">
                of users found the recommended algorithms optimal for their use case
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
