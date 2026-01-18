import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Code2, TrendingUp, Clock, Database, Cpu, Zap, Filter, Play, Pause, RotateCcw, Radio, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { useAlgorithms } from "@/hooks/use-algorithms";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { useState, useMemo, useEffect } from "react";

export default function Benchmark() {
  const navigate = useNavigate();
  const { isAuthenticated, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { algorithms: allAlgorithms, isLoading } = useAlgorithms();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [benchmarkSize, setBenchmarkSize] = useState("10000");
  const focusedAlgoSlug = searchParams.get("algo");

  useEffect(() => {
    // Only redirect if we've finished loading and user is not authenticated
    if (!isLoading && !isAuthenticated) {
      navigate("/auth", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogout = async () => {
    await signOut();
  };
  const [isLiveUpdating, setIsLiveUpdating] = useState(false);
  const [liveUpdateSpeed, setLiveUpdateSpeed] = useState("2000");
  const [updateCount, setUpdateCount] = useState(0);
  const [metrics, setMetrics] = useState({ avgTime: 0, avgMemory: 0, avgCpu: 0, avgScalability: 0 });

  // Generate benchmark data for all algorithms
  const benchmarkData = useMemo(() => {
    const sizeLevels = ["100", "1000", "10000", "100000"] as const;
    const sizeIndex = Math.max(0, sizeLevels.indexOf(benchmarkSize as (typeof sizeLevels)[number]));
    const sizeFactor = 1 + sizeIndex * 0.5; // 100 -> 1.0, 1000 -> 1.5, 10000 -> 2.0, 100000 -> 2.5

    const baseData = allAlgorithms.slice(0, 100).map((algo, idx) => {
      const baseMultiplier = idx + 1;
      const categoryBonus = algo.category === "Sorting" ? 0.8 : 1;
      const difficultyMultiplier = algo.difficulty === "Beginner" ? 0.5 : algo.difficulty === "Intermediate" ? 1 : 1.5;

      // Add variance based on update count for live updates
      const variance = isLiveUpdating ? (Math.sin(updateCount * 0.1) * 10) : 0;

      const execBase = Math.max(5, Math.round((baseMultiplier * categoryBonus * difficultyMultiplier) * (100 / baseMultiplier) + variance));

      return {
        name: algo.name.substring(0, 15),
        slug: algo.slug,
        category: algo.category,
        domain: algo.domain,
        difficulty: algo.difficulty,
        executionTime: Math.round(execBase * sizeFactor),
        memoryUsage: Math.round((baseMultiplier * 0.5 * (Math.random() + 0.5) * sizeFactor) * 10 + (isLiveUpdating ? Math.random() * 2 : 0)) / 10,
        cpuLoad: Math.min(99, Math.max(10, Math.round(30 + Math.random() * 70 + variance + sizeIndex * 3))),
        scalability: Math.max(20, Math.min(100, Math.round(50 + Math.random() * 50 + (isLiveUpdating ? Math.cos(updateCount * 0.05) * 15 : 0)))),
        efficiency: Math.max(30, Math.min(100, Math.round(60 + (100 - (baseMultiplier % 40)) * 0.5 + (isLiveUpdating ? Math.sin(updateCount * 0.08) * 20 : 0)))),
      };
    });

    // If coming from an Algorithm Detail "Run Benchmark" button, bring that algorithm to the top
    if (focusedAlgoSlug) {
      return baseData.sort((a, b) => (a.slug === focusedAlgoSlug ? -1 : b.slug === focusedAlgoSlug ? 1 : 0));
    }

    return baseData;
  }, [allAlgorithms, updateCount, isLiveUpdating, benchmarkSize, focusedAlgoSlug]);

  const filteredData = useMemo(() => {
    return benchmarkData.filter(algo => {
      const categoryMatch = selectedCategory === "all" || algo.category === selectedCategory;
      const domainMatch = selectedDomain === "all" || algo.domain === selectedDomain;
      return categoryMatch && domainMatch;
    });
  }, [benchmarkData, selectedCategory, selectedDomain]);

  const categories = ["all", ...new Set(benchmarkData.map(a => a.category))];
  const domains = ["all", ...new Set(benchmarkData.map(a => a.domain))];

  // Calculate aggregate stats
  const stats = useMemo(() => {
    if (filteredData.length === 0) return { avgTime: 0, avgMemory: 0, avgCpu: 0, avgScalability: 0 };
    const sum = filteredData.reduce((acc, algo) => ({
      time: acc.time + algo.executionTime,
      memory: acc.memory + algo.memoryUsage,
      cpu: acc.cpu + algo.cpuLoad,
      scalability: acc.scalability + algo.scalability,
    }), { time: 0, memory: 0, cpu: 0, scalability: 0 });

    const newStats = {
      avgTime: Math.round(sum.time / filteredData.length),
      avgMemory: Math.round(sum.memory / filteredData.length * 10) / 10,
      avgCpu: Math.round(sum.cpu / filteredData.length),
      avgScalability: Math.round(sum.scalability / filteredData.length),
    };

    // Update state for live metrics
    setMetrics(newStats);
    return newStats;
  }, [filteredData]);

  // Top performers
  const topPerformers = useMemo(() => {
    return [...filteredData].sort((a, b) => a.executionTime - b.executionTime).slice(0, 5);
  }, [filteredData]);

  // Scalability data
  const scalabilityData = useMemo(() => {
    const sizes = [100, 1000, 10000, 100000];
    return sizes.map(size => {
      const dataPoint: any = { size: `${size}` };
      topPerformers.slice(0, 5).forEach((algo, idx) => {
        dataPoint[`algo${idx}`] = Math.round(algo.executionTime * Math.log(size) * (Math.random() + 0.5));
      });
      return dataPoint;
    });
  }, [topPerformers]);

  // Category distribution
  const categoryDistribution = useMemo(() => {
    const dist: any = {};
    filteredData.forEach(algo => {
      dist[algo.category] = (dist[algo.category] || 0) + 1;
    });
    return Object.entries(dist).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  const COLORS = ["var(--neon-cyan)", "var(--neon-pink)", "var(--neon-purple)", "var(--neon-green)", "var(--neon-yellow)"];

  // Live update effect
  useEffect(() => {
    if (!isLiveUpdating) return;

    const interval = setInterval(() => {
      setUpdateCount(prev => prev + 1);
    }, parseInt(liveUpdateSpeed));

    return () => clearInterval(interval);
  }, [isLiveUpdating, liveUpdateSpeed]);

  if (isLoading || allAlgorithms.length === 0) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--neon-cyan)] border-t-transparent mb-4" />
          <p className="text-muted-foreground">Loading algorithms...</p>
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
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12 space-y-2">
            <h1 className="text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-cyan)] bg-clip-text text-transparent">Performance Benchmarking</span>
            </h1>
            <p className="text-xl text-muted-foreground">Comprehensive analysis of 600+ algorithms • Real-time performance metrics • Data-driven insights</p>
            {focusedAlgoSlug && (
              <p className="text-sm text-[var(--neon-cyan)]">
                Focusing benchmark on algorithm slug: <span className="font-mono">{focusedAlgoSlug}</span>
              </p>
            )}
          </motion.div>

          {/* Filters */}
          <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50 mb-8">
            <div className="flex items-center gap-4 flex-wrap">
              <Filter className="w-5 h-5 text-[var(--neon-cyan)]" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Domain" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map(dom => (
                    <SelectItem key={dom} value={dom}>
                      {dom === "all" ? "All Domains" : dom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={benchmarkSize} onValueChange={setBenchmarkSize}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Data Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">Size: 100</SelectItem>
                  <SelectItem value="1000">Size: 1,000</SelectItem>
                  <SelectItem value="10000">Size: 10,000</SelectItem>
                  <SelectItem value="100000">Size: 100,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Live Update Controls */}
          <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50 mb-8 border-l-4 border-l-[var(--neon-green)]">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <motion.div animate={{ scale: isLiveUpdating ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.6, repeat: isLiveUpdating ? Infinity : 0 }}>
                  <Radio className={`w-6 h-6 ${isLiveUpdating ? "text-[var(--neon-green)]" : "text-muted-foreground"}`} />
                </motion.div>
                <div>
                  <p className="font-semibold text-foreground">
                    {isLiveUpdating ? "🔴 LIVE UPDATE ACTIVE" : "⚪ Live Update"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isLiveUpdating ? `Updates: ${updateCount} • Speed: ${liveUpdateSpeed}ms` : "Enable real-time metrics"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Select value={liveUpdateSpeed} onValueChange={setLiveUpdateSpeed} disabled={isLiveUpdating}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Update Speed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500">Ultra Fast (500ms)</SelectItem>
                    <SelectItem value="1000">Fast (1s)</SelectItem>
                    <SelectItem value="2000">Normal (2s)</SelectItem>
                    <SelectItem value="3000">Slow (3s)</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={() => setIsLiveUpdating(!isLiveUpdating)}
                  className={`${isLiveUpdating ? "bg-[var(--neon-green)] hover:bg-[var(--neon-green)]/80" : "bg-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/80"}`}
                >
                  {isLiveUpdating ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Stop Live
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Live
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setUpdateCount(0);
                    setIsLiveUpdating(false);
                  }}
                  className="border-[var(--neon-purple)]/30"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div animate={{ scale: isLiveUpdating ? [1, 1.05, 1] : 1 }} transition={{ duration: 0.6, repeat: isLiveUpdating ? Infinity : 0, delay: 0 }}>
              <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm h-full">
                <Clock className="w-8 h-8 text-[var(--neon-cyan)] mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Avg Execution</p>
                <p className="text-2xl font-bold text-[var(--neon-cyan)]">{stats.avgTime}ms</p>
                <p className="text-xs text-muted-foreground mt-2">{filteredData.length} algorithms</p>
              </Card>
            </motion.div>

            <motion.div animate={{ scale: isLiveUpdating ? [1, 1.05, 1] : 1 }} transition={{ duration: 0.6, repeat: isLiveUpdating ? Infinity : 0, delay: 0.1 }}>
              <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm h-full">
                <Database className="w-8 h-8 text-[var(--neon-pink)] mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Avg Memory</p>
                <p className="text-2xl font-bold text-[var(--neon-pink)]">{stats.avgMemory}MB</p>
                <p className="text-xs text-muted-foreground mt-2">Peak usage</p>
              </Card>
            </motion.div>

            <motion.div animate={{ scale: isLiveUpdating ? [1, 1.05, 1] : 1 }} transition={{ duration: 0.6, repeat: isLiveUpdating ? Infinity : 0, delay: 0.2 }}>
              <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm h-full">
                <Cpu className="w-8 h-8 text-[var(--neon-purple)] mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Avg CPU Load</p>
                <p className="text-2xl font-bold text-[var(--neon-purple)]">{stats.avgCpu}%</p>
                <p className="text-xs text-muted-foreground mt-2">Processing</p>
              </Card>
            </motion.div>

            <motion.div animate={{ scale: isLiveUpdating ? [1, 1.05, 1] : 1 }} transition={{ duration: 0.6, repeat: isLiveUpdating ? Infinity : 0, delay: 0.3 }}>
              <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm h-full">
                <TrendingUp className="w-8 h-8 text-[var(--neon-green)] mb-3" />
                <p className="text-sm text-muted-foreground mb-1">Avg Scalability</p>
                <p className="text-2xl font-bold text-[var(--neon-green)]">{stats.avgScalability}%</p>
                <p className="text-xs text-muted-foreground mt-2">Score</p>
              </Card>
            </motion.div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Performance Comparison */}
            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-bold mb-6 text-[var(--neon-cyan)]">Top 10 Performers</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={filteredData.slice(0, 10)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" stroke="var(--foreground)" />
                  <YAxis dataKey="name" width={120} stroke="var(--foreground)" tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                  <Bar dataKey="executionTime" fill="var(--neon-cyan)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Category Distribution */}
            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-bold mb-6 text-[var(--neon-pink)]">Algorithm Distribution</h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie data={categoryDistribution} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name}: ${entry.value}`} outerRadius={100} fill="var(--neon-cyan)" dataKey="value">
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Scalability Analysis */}
            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-bold mb-6 text-[var(--neon-purple)]">Scalability Analysis</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={scalabilityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="size" stroke="var(--foreground)" />
                  <YAxis stroke="var(--foreground)" />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                  <Legend />
                  {topPerformers.slice(0, 5).map((algo, idx) => (
                    <Line key={idx} type="monotone" dataKey={`algo${idx}`} name={algo.name} stroke={COLORS[idx]} strokeWidth={2} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Efficiency vs Scalability */}
            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-bold mb-6 text-[var(--neon-green)]">Efficiency Scatter Plot</h3>
              <ResponsiveContainer width="100%" height={350}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="executionTime" name="Execution Time" stroke="var(--foreground)" />
                  <YAxis dataKey="efficiency" name="Efficiency" stroke="var(--foreground)" />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name="Algorithms" data={filteredData.slice(0, 30)} fill="var(--neon-cyan)" />
                </ScatterChart>
              </ResponsiveContainer>
            </Card>

            {/* Memory vs CPU Trade-off */}
            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-bold mb-6 text-[var(--neon-yellow)]">Memory vs CPU Analysis</h3>
              <ResponsiveContainer width="100%" height={350}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="memoryUsage" name="Memory (MB)" stroke="var(--foreground)" />
                  <YAxis dataKey="cpuLoad" name="CPU Load %" stroke="var(--foreground)" />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name="Algorithms" data={filteredData.slice(0, 30)} fill="var(--neon-pink)" />
                </ScatterChart>
              </ResponsiveContainer>
            </Card>

            {/* Performance Radar */}
            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-bold mb-6 text-[var(--neon-purple)]">Algorithm Performance Radar</h3>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={topPerformers.slice(0, 5).map(algo => ({
                  subject: algo.name.substring(0, 10),
                  speed: 100 - algo.executionTime,
                  memory: 100 - (algo.memoryUsage * 5),
                  cpu: 100 - algo.cpuLoad,
                  scalability: algo.scalability,
                }))}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="subject" stroke="var(--foreground)" />
                  <PolarRadiusAxis stroke="var(--foreground)" />
                  <Radar name="Performance" dataKey="speed" stroke="var(--neon-cyan)" fill="var(--neon-cyan)" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Detailed Table */}
          <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <h3 className="text-lg font-bold mb-6 text-[var(--neon-cyan)]">Detailed Benchmark Results ({filteredData.length} algorithms)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border/50">
                  <tr>
                    <th className="text-left py-3 px-4 text-[var(--neon-cyan)]">Algorithm</th>
                    <th className="text-left py-3 px-4 text-[var(--neon-pink)]">Category</th>
                    <th className="text-right py-3 px-4 text-[var(--neon-purple)]">Exec Time (ms)</th>
                    <th className="text-right py-3 px-4 text-[var(--neon-green)]">Memory (MB)</th>
                    <th className="text-right py-3 px-4 text-[var(--neon-yellow)]">CPU Load %</th>
                    <th className="text-right py-3 px-4 text-[var(--neon-cyan)]">Scalability</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(0, 20).map((algo, idx) => (
                    <tr key={idx} className="border-b border-border/20 hover:bg-background/50 transition">
                      <td className="py-3 px-4 font-mono text-foreground">{algo.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{algo.category}</td>
                      <td className="py-3 px-4 text-right font-mono text-[var(--neon-purple)]">{algo.executionTime}</td>
                      <td className="py-3 px-4 text-right font-mono text-[var(--neon-green)]">{algo.memoryUsage}</td>
                      <td className="py-3 px-4 text-right font-mono text-[var(--neon-yellow)]">{algo.cpuLoad}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${algo.scalability > 75 ? "bg-[var(--neon-green)]/20 text-[var(--neon-green)]" : algo.scalability > 50 ? "bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)]" : "bg-[var(--neon-pink)]/20 text-[var(--neon-pink)]"}`}>
                          {algo.scalability}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
