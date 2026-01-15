import { motion, AnimatePresence } from "framer-motion";
import { useAlgorithmBySlug } from "@/hooks/use-algorithms";
import { useParams, Link } from "react-router";
import { Code2, Clock, TrendingUp, Zap, BookOpen, Target, Share2, Heart, Sparkles, Activity, Terminal, Twitter, Linkedin, MessageCircle, ExternalLink, Check, Copy, WifiOff, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AICodeGenerator from "@/components/AICodeGenerator";
import VisualizationPlayer from "@/components/VisualizationPlayer";
import OnlineCompiler from "@/components/OnlineCompiler";
import Flashcard, { FlashcardGrid } from "@/components/Flashcard";
import { useState } from "react";
import { isSupabaseConfigured, isSupabaseAvailable } from "@/lib/supabase";

export default function AlgorithmDetail() {
  const { slug } = useParams();
  const { algorithm, isLoading } = useAlgorithmBySlug(slug || "");
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  const [isShared, setIsShared] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const shareOptions = [
    { name: "Twitter", icon: <Twitter className="w-4 h-4" />, url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out ${algorithm?.name} on AlgoVerse!` },
    { name: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
    { name: "WhatsApp", icon: <MessageCircle className="w-4 h-4" />, url: `https://wa.me/?text=${encodeURIComponent(`Check out ${algorithm?.name} on AlgoVerse! ${window.location.href}`)}` },
  ];

  if (isLoading || !algorithm) {
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

          <div className="mb-12">
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                <h1 className="text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)] bg-clip-text text-transparent">
                    {algorithm.name}
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed max-w-3xl">{algorithm.description}</p>
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
                  {(!isSupabaseConfigured || !isSupabaseAvailable()) && (
                    <Badge variant="outline" className="border-yellow-500/50 text-yellow-500 bg-yellow-500/5 flex items-center gap-1">
                      <WifiOff className="w-3 h-3" />
                      Demo Mode
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2 relative">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleLike}
                  className={`border-[var(--neon-cyan)]/30 transition-all ${isLiked ? 'bg-[var(--neon-pink)]/10 border-[var(--neon-pink)] text-[var(--neon-pink)]' : ''}`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className={`border-[var(--neon-cyan)]/30 transition-all ${isShared ? 'bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)]' : ''}`}
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 bg-background/95 backdrop-blur-md border-[var(--neon-cyan)]/30 p-2" align="end">
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 hover:bg-[var(--neon-cyan)]/10 hover:text-[var(--neon-cyan)]"
                        onClick={handleShare}
                      >
                        {isShared ? <Check className="w-4 h-4 text-[var(--neon-green)]" /> : <Copy className="w-4 h-4" />}
                        <span className="text-xs">{isShared ? "Copied!" : "Copy Link"}</span>
                      </Button>
                      <div className="h-[1px] bg-border/50 my-1" />
                      {shareOptions.map((option) => (
                        <a
                          key={option.name}
                          href={option.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-3 py-2 text-xs rounded-md hover:bg-card/80 hover:text-[var(--neon-cyan)] transition-colors"
                        >
                          {option.icon}
                          {option.name}
                        </a>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Live Visualization Section */}
            <div className="mt-8 mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-[var(--neon-cyan)]" />
                Live Visualization
              </h2>
              <VisualizationPlayer algorithm={algorithm} compact={true} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
              <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
                <Clock className="w-8 h-8 text-[var(--neon-cyan)] mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Best Case</p>
                <p className="text-xl font-bold font-mono text-[var(--neon-cyan)]">
                  {algorithm.timeComplexity?.best}
                </p>
              </Card>
              <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
                <TrendingUp className="w-8 h-8 text-[var(--neon-pink)] mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Average Case</p>
                <p className="text-xl font-bold font-mono text-[var(--neon-pink)]">
                  {algorithm.timeComplexity?.average}
                </p>
              </Card>
              <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
                <Zap className="w-8 h-8 text-[var(--neon-purple)] mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Worst Case</p>
                <p className="text-xl font-bold font-mono text-[var(--neon-purple)]">
                  {algorithm.timeComplexity?.worst}
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="relative z-10">
            <div className="flex justify-center mb-10">
              <TabsList className="h-12 bg-card/30 backdrop-blur-md border border-border/30 p-1 rounded-full flex items-center gap-1 overflow-x-auto no-scrollbar">
                <TabsTrigger
                  value="overview"
                  className="rounded-full px-6 py-2 transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border-border/50 border border-transparent"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="implementation"
                  className="rounded-full px-6 py-2 transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border-border/50 border border-transparent"
                >
                  Implementation
                </TabsTrigger>
                <TabsTrigger
                  value="compiler"
                  className="rounded-full px-6 py-2 flex items-center gap-2 transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border-border/50 border border-transparent"
                >
                  <Terminal className="w-4 h-4" />
                  Compiler
                </TabsTrigger>
                <TabsTrigger
                  value="ai-code"
                  className="rounded-full px-6 py-2 flex items-center gap-2 transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border-border/50 border border-transparent"
                >
                  <Sparkles className="w-4 h-4" />
                  AI Code
                </TabsTrigger>
                <TabsTrigger
                  value="applications"
                  className="rounded-full px-6 py-2 transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border-border/50 border border-transparent"
                >
                  Applications
                </TabsTrigger>
                <TabsTrigger
                  value="practice"
                  className="rounded-full px-6 py-2 flex items-center gap-2 transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border-border/50 border border-transparent"
                >
                  <Target className="w-4 h-4" />
                  Practice
                </TabsTrigger>
                <TabsTrigger
                  value="analysis"
                  className="rounded-full px-6 py-2 transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border-border/50 border border-transparent"
                >
                  Analysis
                </TabsTrigger>
                <TabsTrigger
                  value="related"
                  className="rounded-full px-6 py-2 transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border-border/50 border border-transparent"
                >
                  Related
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <h2 className="text-2xl font-bold mb-4 text-[var(--neon-cyan)]">
                  <BookOpen className="inline-block w-6 h-6 mr-2" />
                  Intuition
                </h2>
                <p className="text-foreground leading-relaxed mb-8">{algorithm.intuition}</p>

                {algorithm.precondition && (
                  <div className="mb-8 p-4 bg-[var(--neon-purple)]/5 border-l-4 border-[var(--neon-purple)] rounded-r-lg">
                    <h3 className="text-sm font-bold text-[var(--neon-purple)] uppercase tracking-wider mb-2 flex items-center gap-2">
                      Precondition
                    </h3>
                    <p className="text-sm text-muted-foreground">{algorithm.precondition}</p>
                  </div>
                )}

                {algorithm.problemStatement && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-3 text-[var(--neon-pink)] flex items-center gap-2">
                      <Target className="w-5 h-5" /> Problem Statement
                    </h3>
                    <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                      <p className="text-sm italic text-muted-foreground">{algorithm.problemStatement}</p>
                    </div>
                  </div>
                )}

                {algorithm.keyPoints && algorithm.keyPoints.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-3 text-[var(--neon-cyan)] flex items-center gap-2">
                      Key Points
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {algorithm.keyPoints.map((point, i) => (
                        <div key={i} className="flex items-center gap-2 p-3 bg-background/30 rounded-lg border border-border/20">
                          <Check className="w-4 h-4 text-[var(--neon-cyan)]" />
                          <span className="text-sm">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {algorithm.exampleDiagram && (
                  <div>
                    <h3 className="text-lg font-bold mb-4 text-[var(--neon-purple)] flex items-center gap-2">
                      <Sparkles className="w-5 h-5" /> Visual Logic
                    </h3>
                    <div className="relative rounded-xl overflow-hidden border border-border/30 bg-background/50 p-4">
                      <img
                        src={algorithm.exampleDiagram}
                        alt={`${algorithm.name} diagram`}
                        className="max-w-full h-auto rounded-lg mx-auto glow-image"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800";
                        }}
                      />
                      <div className="mt-4 text-center">
                        <span className="text-xs text-muted-foreground">Example visualization of the algorithm flow</span>
                      </div>
                    </div>
                  </div>
                )}
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

              <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h2 className="text-xl font-bold mb-4 text-[var(--neon-pink)]">Pseudocode</h2>
                <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto max-h-96 overflow-y-auto">
                  <code className="text-foreground text-xs">{algorithm.pseudocode}</code>
                </pre>
              </Card>
            </TabsContent>

            <TabsContent value="implementation" className="space-y-6">
              {/* Full Code Snippet Card */}
              <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[var(--neon-cyan)]">
                    {algorithm.language} Implementation
                  </h2>
                  <Button variant="outline" size="sm" className="border-[var(--neon-cyan)]/30 text-xs h-8">
                    📋 Copy All
                  </Button>
                </div>
                <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto max-h-80 overflow-y-auto border border-border/30">
                  <code className="text-foreground text-xs leading-relaxed">{algorithm.implementation}</code>
                </pre>
              </Card>

              {/* Pseudocode Card */}
              <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[var(--neon-purple)]">
                    Algorithm Pseudocode
                  </h2>
                  <Button variant="outline" size="sm" className="border-[var(--neon-purple)]/30 text-xs h-8">
                    📋 Copy
                  </Button>
                </div>
                <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto max-h-80 overflow-y-auto border border-border/30">
                  <code className="text-foreground text-xs leading-relaxed">{algorithm.pseudocode}</code>
                </pre>
              </Card>

              {/* Complexity Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                  <h3 className="text-lg font-bold mb-4 text-[var(--neon-cyan)]">Time Complexity</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded">
                      <span className="text-sm text-muted-foreground">Best Case</span>
                      <span className="font-mono font-bold text-[var(--neon-cyan)]">{algorithm.timeComplexity.best}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded">
                      <span className="text-sm text-muted-foreground">Average</span>
                      <span className="font-mono font-bold text-[var(--neon-pink)]">{algorithm.timeComplexity.average}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-background/50 rounded">
                      <span className="text-sm text-muted-foreground">Worst Case</span>
                      <span className="font-mono font-bold text-[var(--neon-purple)]">{algorithm.timeComplexity.worst}</span>
                    </div>
                  </div>
                </Card>

                <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                  <h3 className="text-lg font-bold mb-4 text-[var(--neon-green)]">Space Complexity</h3>
                  <div className="p-4 bg-background/50 rounded border-l-4 border-[var(--neon-green)]">
                    <p className="text-sm text-muted-foreground mb-2">Space Required</p>
                    <p className="font-mono text-2xl font-bold text-[var(--neon-green)]">
                      {algorithm.spaceComplexity}
                    </p>
                  </div>
                </Card>
              </div>

              <div className="flex gap-4">
                <Link to={`/visualize?algo=${algorithm.slug}`} className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] h-12">
                    <Zap className="w-5 h-5 mr-2" />
                    Full Screen Visualization
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

            <TabsContent value="compiler" className="space-y-6">
              <OnlineCompiler algorithm={algorithm} problem={selectedProblem} />
            </TabsContent>

            {/* AI Code Generation Tab */}
            <TabsContent value="ai-code" className="space-y-6">
              <AICodeGenerator
                algorithm={{
                  name: algorithm.name,
                  description: algorithm.description,
                  category: algorithm.category,
                  timeComplexity: {
                    best: algorithm.timeComplexity.best || "O(1)",
                    average: algorithm.timeComplexity.average,
                    worst: algorithm.timeComplexity.worst || "O(n²)",
                  },
                  spaceComplexity: algorithm.spaceComplexity,
                  pseudocode: algorithm.pseudocode || "",
                }}
              />

              {/* Quick Language Grid */}
              <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-lg font-bold mb-4 text-[var(--neon-cyan)]">
                  🌐 Supported Languages
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {[
                    { name: "Python", icon: "🐍" },
                    { name: "JavaScript", icon: "🟨" },
                    { name: "TypeScript", icon: "🔷" },
                    { name: "Java", icon: "☕" },
                    { name: "C++", icon: "⚡" },
                    { name: "C", icon: "🔵" },
                    { name: "C#", icon: "💜" },
                    { name: "Go", icon: "🐹" },
                    { name: "Rust", icon: "🦀" },
                    { name: "Swift", icon: "🍎" },
                    { name: "Kotlin", icon: "🟣" },
                    { name: "Ruby", icon: "💎" },
                    { name: "PHP", icon: "🐘" },
                    { name: "Scala", icon: "🔴" },
                    { name: "R", icon: "📊" },
                  ].map((lang) => (
                    <div
                      key={lang.name}
                      className="flex items-center gap-2 p-3 bg-background/50 rounded-lg border border-border/30 hover:border-[var(--neon-cyan)]/50 transition-colors"
                    >
                      <span className="text-lg">{lang.icon}</span>
                      <span className="text-sm text-foreground">{lang.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <h2 className="text-2xl font-bold mb-6 text-[var(--neon-cyan)]">Real-World Applications</h2>
                <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                  {algorithm?.applications?.slice(0, 3).map((app, i) => (
                    <li key={i}>• {app}</li>
                  ))}
                </ul>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                  <h3 className="text-xl font-bold mb-4 text-[var(--neon-green)]">Advantages</h3>
                  <ul className="space-y-2">
                    {algorithm.advantages?.map((adv, index) => (
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
                    {algorithm.disadvantages?.map((dis, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-[var(--neon-pink)] mt-1">✗</span>
                        <span className="text-muted-foreground">{dis}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="practice" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {algorithm.practiceProblems?.map((problem: any) => (
                    <Card key={problem.id} className="cyber-card p-6 bg-card/40 backdrop-blur-sm border-border/40 hover:border-[var(--neon-cyan)]/50 transition-all group">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-muted-foreground">#{problem.id}</span>
                            <Badge variant="outline" className="text-[10px] h-4 border-border/50">
                              {problem.platform}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-bold group-hover:text-[var(--neon-cyan)] transition-colors">
                            {problem.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                            {problem.description}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {problem.tags.map((tag: string) => (
                              <span key={tag} className="text-[10px] text-muted-foreground uppercase tracking-widest">
                                • {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right space-y-3 min-w-[120px]">
                          <Badge className={`${parseInt(problem.difficulty) < 1200 ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                            parseInt(problem.difficulty) < 1800 ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                              'bg-red-500/10 text-red-500 border-red-500/20'
                            }`}>
                            {problem.difficulty}
                          </Badge>
                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedProblem(problem);
                                setActiveTab("compiler");
                              }}
                              className="h-8 text-xs bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/30 border border-[var(--neon-cyan)]/30 shadow-[0_0_10px_rgba(var(--neon-cyan-rgb),0.1)]"
                            >
                              Quick Solve →
                            </Button>
                            <Button variant="ghost" size="sm" asChild className="h-8 text-xs text-muted-foreground">
                              <a href={problem.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3 mr-1" /> Original
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {/* Flashcards Section */}
                  {algorithm.flashcards && (
                    <div className="pt-12 space-y-6">
                      <div className="flex items-center gap-3">
                        <Brain className="w-6 h-6 text-[var(--neon-purple)]" />
                        <h2 className="text-2xl font-bold">Concept Flashcards</h2>
                      </div>
                      <FlashcardGrid flashcards={algorithm.flashcards} />
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <Card className="cyber-card p-6 bg-[var(--neon-cyan)]/5 border-[var(--neon-cyan)]/20">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[var(--neon-cyan)]" />
                      Domain Mastery
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-muted-foreground">Complexity Rating</span>
                          <span className="text-[var(--neon-cyan)]">65%</span>
                        </div>
                        <div className="h-1 bg-background rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--neon-cyan)] w-[65%]" />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground italic">
                        "Solving these problems will boost your rating in {algorithm.category}."
                      </p>
                    </div>
                  </Card>

                  <Card className="cyber-card p-6 bg-card/40 border-border/40">
                    <h3 className="text-sm font-bold mb-4 flex items-center gap-2 uppercase tracking-tighter">
                      <Sparkles className="w-4 h-4 text-[var(--neon-purple)]" />
                      Pro Tip
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Always analyze the constraints before jumping to implementation. For {algorithm.name}, the {algorithm.timeComplexity.average} time complexity is usually sufficient for N ≤ 10⁵.
                    </p>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analysis">
              <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <h2 className="text-2xl font-bold mb-6 text-[var(--neon-purple)]">Detailed Analysis</h2>

                <div className="space-y-8">
                  {algorithm.stepByStepWorking && algorithm.stepByStepWorking.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-[var(--neon-cyan)] flex items-center gap-2">
                        Step-by-Step Working
                      </h3>
                      <div className="space-y-3">
                        {algorithm.stepByStepWorking.map((step, i) => (
                          <div key={i} className="flex gap-4 p-4 bg-background/50 rounded-lg border border-border/30">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] flex items-center justify-center text-xs font-bold border border-[var(--neon-cyan)]/30">
                              {i + 1}
                            </span>
                            <p className="text-sm text-foreground leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {algorithm.dryRun && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-[var(--neon-pink)] flex items-center gap-2">
                        Dry Run Example
                      </h3>
                      <div className="p-6 bg-background/50 rounded-lg border border-border/30 border-l-4 border-l-[var(--neon-pink)]">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
                          {algorithm.dryRun}
                        </pre>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Complexity Overview</h3>
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
                    <h3 className="text-lg font-semibold mb-3 text-foreground">Memory Footprint</h3>
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
                  {algorithm.relatedAlgorithms?.map((related, index) => (
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
                  {algorithm.researchReferences?.map((ref, index) => (
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
