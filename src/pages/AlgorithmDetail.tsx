import { motion, AnimatePresence } from "framer-motion";
import { useAlgorithmBySlug } from "@/hooks/use-algorithms";
import { useParams, Link, useNavigate } from "react-router";
import { Code2, Clock, TrendingUp, Zap, BookOpen, Target, Share2, Heart, Sparkles, Activity, Terminal, Twitter, Linkedin, MessageCircle, ExternalLink, Check, Copy, WifiOff, Brain, Menu, X } from "lucide-react";
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
import { AlgorithmVisualizer, AlgorithmType } from "@/components/visualizations/AlgorithmVisualizer";
import OnlineCompiler from "@/components/OnlineCompiler";
import Flashcard, { FlashcardGrid } from "@/components/Flashcard";
import { Header } from "@/components/Header";
import { useState } from "react";
import { isSupabaseConfigured, isSupabaseAvailable } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/Sidebar";

export default function AlgorithmDetail() {
  const navigate = useNavigate();
  const { isAuthenticated, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { slug } = useParams();
  const { algorithm, isLoading } = useAlgorithmBySlug(slug || "");
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  const [isShared, setIsShared] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Visualizer data state
  const [visualizerArray, setVisualizerArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90, 45, 78, 33]);
  const [visualizerTarget, setVisualizerTarget] = useState<number>(22);

  if (!isAuthenticated) {
    navigate("/auth", { replace: true });
    return null;
  }

  const handleLogout = async () => {
    await signOut();
  };

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
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--neon-cyan)] border-t-transparent mb-4" />
          <p className="text-muted-foreground">Loading algorithm...</p>
        </div>
      </div>
    );
  }

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

        <main className="relative z-10 w-full px-6 py-12">
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

              {/* Live Visualization - Moved to Tab */}


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
                    value="visualization"
                    className="rounded-full px-6 py-2 transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border-border/50 border border-transparent"
                  >
                    Visualization
                  </TabsTrigger>
                  <TabsTrigger
                    value="code"
                    className="rounded-full px-6 py-2 transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border-border/50 border border-transparent"
                  >
                    Code
                  </TabsTrigger>
                  <TabsTrigger
                    value="analysis"
                    className="rounded-full px-6 py-2 transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border-border/50 border border-transparent"
                  >
                    Analysis
                  </TabsTrigger>
                  <TabsTrigger
                    value="examples"
                    className="rounded-full px-6 py-2 transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border-border/50 border border-transparent"
                  >
                    Examples
                  </TabsTrigger>
                  <TabsTrigger
                    value="quiz"
                    className="rounded-full px-6 py-2 transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md data-[state=active]:border-border/50 border border-transparent"
                  >
                    Quiz
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold mb-3 text-[var(--neon-purple)]">Definition</h3>
                      <p className="text-muted-foreground bg-background/30 p-4 rounded-lg border border-border/30">
                        {algorithm.definition || algorithm.description}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-3 text-[var(--neon-green)]">Key Concepts</h3>
                      <div className="flex flex-wrap gap-2">
                        {algorithm.tags?.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-secondary/20">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="visualization" className="space-y-6">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <Activity className="w-6 h-6 text-[var(--neon-cyan)]" />
                      Interactive Visualization
                    </h2>
                  </div>

                  <div className="bg-black/20 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl">
                    <AlgorithmVisualizer
                      type={algorithm.slug as AlgorithmType}
                      array={visualizerArray}
                      target={visualizerTarget}
                      hideHeader={true}
                    />

                    {/* Data Controls */}
                    {(algorithm.category === 'Searching' || algorithm.category === 'Sorting') && (
                      <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-end gap-6">
                        <div className="flex-1 min-w-[300px]">
                          <label className="text-[var(--neon-cyan)] text-xs font-bold uppercase tracking-widest mb-3 block">
                            Input Array
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {visualizerArray.map((val, idx) => (
                              <input
                                key={idx}
                                type="number"
                                value={val}
                                onChange={(e) => {
                                  const newArray = [...visualizerArray];
                                  newArray[idx] = parseInt(e.target.value) || 0;
                                  setVisualizerArray(newArray);
                                }}
                                className="w-14 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-white text-center font-mono text-sm focus:border-[var(--neon-cyan)] focus:outline-none transition-colors"
                              />
                            ))}
                          </div>
                        </div>

                        {algorithm.category === 'Searching' && (
                          <div className="w-32">
                            <label className="text-[var(--neon-purple)] text-xs font-bold uppercase tracking-widest mb-3 block">
                              Target
                            </label>
                            <input
                              type="number"
                              value={visualizerTarget}
                              onChange={(e) => setVisualizerTarget(parseInt(e.target.value) || 0)}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-1.5 text-white font-mono focus:border-[var(--neon-purple)] focus:outline-none transition-colors"
                            />
                          </div>
                        )}

                        <Button
                          variant="outline"
                          onClick={() => {
                            const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 10);
                            setVisualizerArray(newArray);
                            if (algorithm.category === 'Searching') {
                              setVisualizerTarget(newArray[Math.floor(Math.random() * newArray.length)]);
                            }
                          }}
                          className="border-[var(--neon-cyan)]/30 text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10"
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Randomize
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="code" className="space-y-6">
                <Tabs defaultValue="implementation">
                  <TabsList className="mb-4 bg-background/30">
                    <TabsTrigger value="implementation">Implementation</TabsTrigger>
                    <TabsTrigger value="compiler">Online Compiler</TabsTrigger>
                    <TabsTrigger value="ai">AI Generator</TabsTrigger>
                  </TabsList>

                  <TabsContent value="implementation">
                    <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-[var(--neon-cyan)]">
                          {algorithm.language || "JavaScript"} Implementation
                        </h2>
                        <Button variant="outline" size="sm" className="border-[var(--neon-cyan)]/30 text-xs h-8">
                          📋 Copy
                        </Button>
                      </div>
                      <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto max-h-[500px] overflow-y-auto border border-border/30">
                        <code className="text-foreground text-xs leading-relaxed">
                          {algorithm.implementations?.javascript || algorithm.implementation || "// Code not available"}
                        </code>
                      </pre>
                    </Card>
                    {algorithm.pseudocode && (
                      <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50 mt-6">
                        <h3 className="text-lg font-bold mb-4 text-[var(--neon-purple)]">Pseudocode</h3>
                        <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto">
                          <code className="text-foreground text-xs">{algorithm.pseudocode}</code>
                        </pre>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="compiler">
                    <OnlineCompiler algorithm={algorithm} problem={selectedProblem} />
                  </TabsContent>

                  <TabsContent value="ai">
                    <AICodeGenerator algorithm={algorithm} />
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-6">
                <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
                  <h2 className="text-2xl font-bold mb-6 text-[var(--neon-purple)]">Detailed Analysis</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-bold mb-4">Time Complexity</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-background/50 rounded-lg flex justify-between items-center">
                          <span>Best Case</span>
                          <Badge variant="outline" className="text-[var(--neon-cyan)] border-[var(--neon-cyan)]">{algorithm.timeComplexity?.best}</Badge>
                        </div>
                        <div className="p-4 bg-background/50 rounded-lg flex justify-between items-center">
                          <span>Average Case</span>
                          <Badge variant="outline" className="text-[var(--neon-pink)] border-[var(--neon-pink)]">{algorithm.timeComplexity?.average}</Badge>
                        </div>
                        <div className="p-4 bg-background/50 rounded-lg flex justify-between items-center">
                          <span>Worst Case</span>
                          <Badge variant="outline" className="text-[var(--neon-purple)] border-[var(--neon-purple)]">{algorithm.timeComplexity?.worst}</Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4">Space Complexity</h3>
                      <div className="p-6 bg-background/50 rounded-lg text-center">
                        <span className="text-4xl font-mono font-bold text-[var(--neon-green)]">{algorithm.spaceComplexity}</span>
                        <p className="text-sm text-muted-foreground mt-2">Auxiliary Space</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="examples" className="space-y-6">
                <Card className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50">
                  <h2 className="text-2xl font-bold mb-6 text-[var(--neon-yellow)]">Real-World Examples</h2>
                  <div className="p-6 bg-background/50 rounded-lg border-l-4 border-[var(--neon-yellow)] mb-6">
                    <p className="text-lg italic text-muted-foreground">"{algorithm.realWorldExample}"</p>
                  </div>

                  <h3 className="text-xl font-bold mb-4">Common Applications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {algorithm.applications?.map((app, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-background/30 rounded border border-border/20">
                        <Target className="w-4 h-4 text-[var(--neon-cyan)]" />
                        <span>{app}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="quiz" className="space-y-6">
                <div className="text-center py-20">
                  <Sparkles className="w-12 h-12 text-[var(--neon-pink)] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Quiz Module Coming Soon</h2>
                  <p className="text-muted-foreground">Test your knowledge of {algorithm.name} with interactive challenges.</p>
                </div>
              </TabsContent>

            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
