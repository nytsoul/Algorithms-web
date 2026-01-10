import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, Link } from "react-router";
import { Code2, Clock, TrendingUp, Zap, BookOpen, Target, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AlgorithmDetail() {
  const { slug } = useParams();
  const algorithm = useQuery(api.algorithms.getAlgorithmBySlug, { slug: slug || "" });

  if (!algorithm) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--neon-cyan)] border-t-transparent mb-4" />
          <p className="text-muted-foreground">Loading algorithm...</p>
        </div>
      </div>
    );
  }

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
            <Link to="/dashboard"><Button variant="ghost">Browse</Button></Link>
            <Link to="/visualize"><Button variant="ghost">Visualize</Button></Link>
            <Link to="/benchmark"><Button variant="ghost">Benchmark</Button></Link>
          </nav>
        </div>
      </motion.header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/dashboard">
            <Button variant="ghost" className="mb-6 text-[var(--neon-cyan)]">
              ← Back to Dashboard
            </Button>
          </Link>

          <div className="mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)] bg-clip-text text-transparent">
                    {algorithm.name}
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-4">{algorithm.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-[var(--neon-cyan)] text-[var(--neon-cyan)]">
                    {algorithm.category}
                  </Badge>
                  <Badge variant="outline" className="border-[var(--neon-pink)] text-[var(--neon-pink)]">
                    {algorithm.domain}
                  </Badge>
                  <Badge variant="outline" className="border-[var(--neon-purple)] text-[var(--neon-purple)]">
                    {algorithm.difficulty}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="border-[var(--neon-cyan)]/30">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-[var(--neon-cyan)]/30">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
                <Clock className="w-8 h-8 text-[var(--neon-cyan)] mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Best Case</p>
                <p className="text-xl font-bold font-mono text-[var(--neon-cyan)]">
                  {algorithm.timeComplexity.best}
                </p>
              </Card>
              <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
                <TrendingUp className="w-8 h-8 text-[var(--neon-pink)] mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Average Case</p>
                <p className="text-xl font-bold font-mono text-[var(--neon-pink)]">
                  {algorithm.timeComplexity.average}
                </p>
              </Card>
              <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
                <Zap className="w-8 h-8 text-[var(--neon-purple)] mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Worst Case</p>
                <p className="text-xl font-bold font-mono text-[var(--neon-purple)]">
                  {algorithm.timeComplexity.worst}
                </p>
              </Card>
              <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
                <Target className="w-8 h-8 text-[var(--neon-green)] mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Space</p>
                <p className="text-xl font-bold font-mono text-[var(--neon-green)]">
                  {algorithm.spaceComplexity}
                </p>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="implementation">Implementation</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="related">Related</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <h2 className="text-2xl font-bold mb-4 text-[var(--neon-cyan)]">
                  <BookOpen className="inline-block w-6 h-6 mr-2" />
                  Intuition
                </h2>
                <p className="text-foreground leading-relaxed">{algorithm.intuition}</p>
              </Card>

              <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <h2 className="text-2xl font-bold mb-4 text-[var(--neon-pink)]">Pseudocode</h2>
                <pre className="bg-background/50 p-6 rounded-lg overflow-x-auto">
                  <code className="text-foreground text-sm">{algorithm.pseudocode}</code>
                </pre>
              </Card>

              {algorithm.inventor && (
                <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Invented By</p>
                      <p className="text-xl font-bold text-foreground">{algorithm.inventor}</p>
                    </div>
                    {algorithm.yearIntroduced && (
                      <div>
                        <p className="text-sm text-muted-foreground">Year</p>
                        <p className="text-xl font-bold text-[var(--neon-cyan)]">
                          {algorithm.yearIntroduced}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="implementation" className="space-y-6">
              <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-[var(--neon-cyan)]">
                    {algorithm.language} Implementation
                  </h2>
                  <Button variant="outline" size="sm" className="border-[var(--neon-cyan)]/30">
                    Copy Code
                  </Button>
                </div>
                <pre className="bg-background/50 p-6 rounded-lg overflow-x-auto">
                  <code className="text-foreground text-sm">{algorithm.implementation}</code>
                </pre>
              </Card>

              <div className="flex gap-4">
                <Link to={`/visualize?algo=${algorithm.slug}`} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] h-12">
                    <Zap className="w-5 h-5 mr-2" />
                    Visualize Execution
                  </Button>
                </Link>
                <Link to={`/benchmark?algo=${algorithm.slug}`} className="flex-1">
                  <Button variant="outline" className="w-full border-[var(--neon-pink)] text-[var(--neon-pink)] h-12">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Run Benchmark
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <h2 className="text-2xl font-bold mb-6 text-[var(--neon-cyan)]">Real-World Applications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {algorithm.applications.map((app, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-background/50 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-[var(--neon-cyan)] mt-2" />
                      <p className="text-foreground">{app}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                  <h3 className="text-xl font-bold mb-4 text-[var(--neon-green)]">Advantages</h3>
                  <ul className="space-y-2">
                    {algorithm.advantages.map((adv, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-[var(--neon-green)] mt-1">✓</span>
                        <span className="text-muted-foreground">{adv}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                  <h3 className="text-xl font-bold mb-4 text-[var(--neon-pink)]">Disadvantages</h3>
                  <ul className="space-y-2">
                    {algorithm.disadvantages.map((dis, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-[var(--neon-pink)] mt-1">✗</span>
                        <span className="text-muted-foreground">{dis}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analysis">
              <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <h2 className="text-2xl font-bold mb-6 text-[var(--neon-purple)]">Complexity Analysis</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Time Complexity</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-background/50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Best Case</p>
                        <p className="text-2xl font-mono font-bold text-[var(--neon-cyan)]">
                          {algorithm.timeComplexity.best}
                        </p>
                      </div>
                      <div className="p-4 bg-background/50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Average Case</p>
                        <p className="text-2xl font-mono font-bold text-[var(--neon-pink)]">
                          {algorithm.timeComplexity.average}
                        </p>
                      </div>
                      <div className="p-4 bg-background/50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Worst Case</p>
                        <p className="text-2xl font-mono font-bold text-[var(--neon-purple)]">
                          {algorithm.timeComplexity.worst}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Space Complexity</h3>
                    <div className="p-4 bg-background/50 rounded-lg">
                      <p className="text-2xl font-mono font-bold text-[var(--neon-green)]">
                        {algorithm.spaceComplexity}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="related" className="space-y-6">
              <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <h2 className="text-2xl font-bold mb-6 text-[var(--neon-cyan)]">Related Algorithms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {algorithm.relatedAlgorithms.map((related, index) => (
                    <div
                      key={index}
                      className="p-4 bg-background/50 rounded-lg hover:bg-[var(--neon-cyan)]/5 transition-colors cursor-pointer border border-border/50 hover:border-[var(--neon-cyan)]/50"
                    >
                      <p className="text-foreground font-semibold">{related}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <h2 className="text-2xl font-bold mb-4 text-[var(--neon-pink)]">Research References</h2>
                <ul className="space-y-2">
                  {algorithm.researchReferences.map((ref, index) => (
                    <li key={index} className="text-muted-foreground text-sm">{ref}</li>
                  ))}
                </ul>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
