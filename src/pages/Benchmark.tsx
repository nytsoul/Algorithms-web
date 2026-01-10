import { motion } from "framer-motion";
import { Link } from "react-router";
import { Code2, TrendingUp, Clock, Database, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

export default function Benchmark() {
  const performanceData = [
    { name: "Quick Sort", time: 45, memory: 60, scalability: 85 },
    { name: "Merge Sort", time: 52, memory: 75, scalability: 90 },
    { name: "Heap Sort", time: 58, memory: 45, scalability: 80 },
    { name: "Bubble Sort", time: 95, memory: 40, scalability: 30 },
  ];

  const scalabilityData = [
    { size: "100", quicksort: 0.5, mergesort: 0.6, heapsort: 0.7, bubblesort: 2.5 },
    { size: "1K", quicksort: 5, mergesort: 6, heapsort: 7, bubblesort: 250 },
    { size: "10K", quicksort: 55, mergesort: 65, heapsort: 75, bubblesort: 25000 },
    { size: "100K", quicksort: 600, mergesort: 700, heapsort: 800, bubblesort: null },
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
            <Link to="/benchmark"><Button variant="ghost" className="text-[var(--neon-cyan)]">Benchmark</Button></Link>
            <Link to="/recommend"><Button variant="ghost">AI Recommend</Button></Link>
            <Link to="/learn"><Button variant="ghost">Learn</Button></Link>
          </nav>
        </div>
      </motion.header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-cyan)] bg-clip-text text-transparent">Performance Benchmarking</span>
          </h1>
          <p className="text-xl text-muted-foreground">Real-time performance analysis and comparison across algorithms</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
            <Clock className="w-8 h-8 text-[var(--neon-cyan)] mb-3" />
            <p className="text-sm text-muted-foreground mb-1">Avg Execution</p>
            <p className="text-2xl font-bold text-[var(--neon-cyan)]">52ms</p>
          </Card>
          <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
            <Database className="w-8 h-8 text-[var(--neon-pink)] mb-3" />
            <p className="text-sm text-muted-foreground mb-1">Memory Usage</p>
            <p className="text-2xl font-bold text-[var(--neon-pink)]">1.2MB</p>
          </Card>
          <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
            <Cpu className="w-8 h-8 text-[var(--neon-purple)] mb-3" />
            <p className="text-sm text-muted-foreground mb-1">CPU Usage</p>
            <p className="text-2xl font-bold text-[var(--neon-purple)]">45%</p>
          </Card>
          <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
            <TrendingUp className="w-8 h-8 text-[var(--neon-green)] mb-3" />
            <p className="text-sm text-muted-foreground mb-1">Scalability</p>
            <p className="text-2xl font-bold text-[var(--neon-green)]">Excellent</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <h3 className="text-xl font-bold mb-6 text-[var(--neon-cyan)]">Performance Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--foreground)" />
                <YAxis stroke="var(--foreground)" />
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                <Legend />
                <Bar dataKey="time" fill="var(--neon-cyan)" />
                <Bar dataKey="memory" fill="var(--neon-pink)" />
                <Bar dataKey="scalability" fill="var(--neon-purple)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
            <h3 className="text-xl font-bold mb-6 text-[var(--neon-pink)]">Scalability Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scalabilityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="size" stroke="var(--foreground)" />
                <YAxis stroke="var(--foreground)" />
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }} />
                <Legend />
                <Line type="monotone" dataKey="quicksort" stroke="var(--neon-cyan)" strokeWidth={2} />
                <Line type="monotone" dataKey="mergesort" stroke="var(--neon-pink)" strokeWidth={2} />
                <Line type="monotone" dataKey="heapsort" stroke="var(--neon-purple)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </main>
    </div>
  );
}
