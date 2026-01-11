import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Link } from "react-router";
import {
  Search,
  Filter,
  Code2,
  Clock,
  TrendingUp,
  Zap,
  ChevronRight,
  Star,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const algorithms = useQuery(api.algorithms.getAllAlgorithms);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const domains = [
    "Data Structures & Algorithms",
    "Graph Algorithms",
    "Algorithm Design",
    "Artificial Intelligence",
    "Machine Learning",
    "Networks",
    "Security",
    "Systems",
    "Graphics",
  ];

  const difficulties = ["Beginner", "Intermediate", "Advanced", "Expert"];

  const filteredAlgorithms = algorithms?.filter(algo => {
    const matchesSearch =
      algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      algo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      algo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDomain = selectedDomain === "all" || algo.domain === selectedDomain;
    const matchesDifficulty = selectedDifficulty === "all" || algo.difficulty === selectedDifficulty;

    return matchesSearch && matchesDomain && matchesDifficulty;
  });

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
      default:
        return "border-[var(--neon-cyan)] text-[var(--neon-cyan)]";
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 cyber-grid pointer-events-none" />
      <div className="scanline fixed inset-0 pointer-events-none" />

      {/* Header */}
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
              <Button variant="ghost" className="text-[var(--neon-cyan)]">
                Browse
              </Button>
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
          </nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)] bg-clip-text text-transparent">
              Algorithm Explorer
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover and explore 600+ algorithms across multiple domains
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search algorithms by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg border-[var(--neon-cyan)]/30 focus:border-[var(--neon-cyan)] bg-card/50 backdrop-blur-sm"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="h-12 border-border/50 bg-card/50 backdrop-blur-sm">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Select Domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Domains</SelectItem>
                  {domains.map(domain => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="h-12 border-border/50 bg-card/50 backdrop-blur-sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Select Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  {difficulties.map(diff => (
                    <SelectItem key={diff} value={diff}>
                      {diff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Algorithms</p>
                <p className="text-3xl font-bold text-[var(--neon-cyan)]">
                  {algorithms?.length || 0}
                </p>
              </div>
              <Code2 className="w-8 h-8 text-[var(--neon-cyan)]" />
            </div>
          </Card>

          <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Domains</p>
                <p className="text-3xl font-bold text-[var(--neon-pink)]">{domains.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-[var(--neon-pink)]" />
            </div>
          </Card>

          <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Filtered Results</p>
                <p className="text-3xl font-bold text-[var(--neon-purple)]">
                  {filteredAlgorithms?.length || 0}
                </p>
              </div>
              <Filter className="w-8 h-8 text-[var(--neon-purple)]" />
            </div>
          </Card>

          <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Visualizations</p>
                <p className="text-3xl font-bold text-[var(--neon-green)]">∞</p>
              </div>
              <Zap className="w-8 h-8 text-[var(--neon-green)]" />
            </div>
          </Card>
        </motion.div>

        {/* Algorithm Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {!algorithms ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--neon-cyan)] border-t-transparent" />
              <p className="mt-4 text-muted-foreground">Loading algorithms...</p>
            </div>
          ) : filteredAlgorithms && filteredAlgorithms.length === 0 ? (
            <Card className="p-12 text-center bg-card/50 backdrop-blur-sm">
              <p className="text-xl text-muted-foreground">
                No algorithms found matching your criteria
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlgorithms?.map((algo, index) => (
                <motion.div
                  key={algo._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Link to={`/algorithm/${algo.slug}`}>
                    <Card className="cyber-card p-6 h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-[var(--neon-cyan)]/50 transition-all group cursor-pointer">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--neon-cyan)]/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform" />

                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-[var(--neon-cyan)] transition-colors">
                            {algo.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              variant="outline"
                              className={`${getDifficultyColor(algo.difficulty)} border`}
                            >
                              {algo.difficulty}
                            </Badge>
                            <Badge variant="outline" className="border-[var(--neon-pink)]/30">
                              {algo.category}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 relative z-10">
                        {algo.description}
                      </p>

                      <div className="space-y-2 mb-4 text-xs relative z-10">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-[var(--neon-cyan)]" />
                          <span className="text-muted-foreground">
                            Avg: <span className="text-[var(--neon-cyan)]">{algo.timeComplexity.average}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-3 h-3 text-[var(--neon-pink)]" />
                          <span className="text-muted-foreground">
                            Space: <span className="text-[var(--neon-pink)]">{algo.spaceComplexity}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4 relative z-10">
                        {algo.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-secondary/30">
                            {tag}
                          </Badge>
                        ))}
                        {algo.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-secondary/30">
                            +{algo.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      <Button
                        variant="ghost"
                        className="w-full justify-between text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10 relative z-10"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
