import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Code2, Play, Pause, RotateCcw, FastForward, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraphVisualization, generateBFSSteps, generateDijkstraSteps } from "@/components/GraphVisualization";

export default function Visualize() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([50]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("quick-sort");

  const algorithms = [
    { value: "quick-sort", label: "Quick Sort", type: "array" },
    { value: "merge-sort", label: "Merge Sort", type: "array" },
    { value: "bubble-sort", label: "Bubble Sort", type: "array" },
    { value: "bfs", label: "Breadth-First Search", type: "graph" },
    { value: "dijkstra", label: "Dijkstra's Algorithm", type: "graph" },
    { value: "dfs", label: "Depth-First Search", type: "graph" },
  ];

  const arraySteps = [
    { step: 1, array: [64, 34, 25, 12, 22, 11, 90], pivot: 3, description: "Initial array, selecting pivot" },
    { step: 2, array: [34, 25, 12, 22, 11, 64, 90], pivot: 2, description: "Partition around pivot" },
    { step: 3, array: [25, 12, 22, 11, 34, 64, 90], pivot: 1, description: "Recursively sort left partition" },
    { step: 4, array: [11, 12, 22, 25, 34, 64, 90], pivot: -1, description: "Array sorted!" },
  ];

  const graphSteps = selectedAlgorithm === "bfs"
    ? generateBFSSteps("A")
    : selectedAlgorithm === "dijkstra"
    ? generateDijkstraSteps("A")
    : generateBFSSteps("A");

  const visualizationSteps = algorithms.find(a => a.value === selectedAlgorithm)?.type === "graph"
    ? graphSteps
    : arraySteps;

  const isGraphAlgorithm = algorithms.find(a => a.value === selectedAlgorithm)?.type === "graph";

  useEffect(() => {
    setCurrentStep(0);
  }, [selectedAlgorithm]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= visualizationSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000 - (speed[0] * 15));

      return () => clearInterval(interval);
    }
  }, [isPlaying, speed, visualizationSteps.length]);

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
            <Link to="/visualize"><Button variant="ghost" className="text-[var(--neon-cyan)]">Visualize</Button></Link>
            <Link to="/benchmark"><Button variant="ghost">Benchmark</Button></Link>
            <Link to="/recommend"><Button variant="ghost">AI Recommend</Button></Link>
            <Link to="/learn"><Button variant="ghost">Learn</Button></Link>
          </nav>
        </div>
      </motion.header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              Algorithm Visualization
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Watch algorithms come to life with step-by-step interactive visualization
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="mb-6">
                <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {algorithms.map(algo => (
                      <SelectItem key={algo.value} value={algo.value}>{algo.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-background/50 rounded-lg p-8 mb-6 min-h-[400px] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-cyan)]/5 to-[var(--neon-pink)]/5" />

                {isGraphAlgorithm ? (
                  /* Graph Visualization */
                  <GraphVisualization
                    nodes={(graphSteps[currentStep] as any)?.nodes || []}
                    edges={(graphSteps[currentStep] as any)?.edges || []}
                    currentStep={currentStep}
                    algorithm={algorithms.find(a => a.value === selectedAlgorithm)?.label || ""}
                  />
                ) : (
                  /* Array Visualization */
                  <div className="relative z-10 flex items-end justify-center gap-2 h-full">
                    {arraySteps[currentStep]?.array.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${(value / 100) * 300}px` }}
                        transition={{ duration: 0.5 }}
                        className={`relative w-16 rounded-t-lg ${
                          index === arraySteps[currentStep]?.pivot
                            ? "bg-gradient-to-t from-[var(--neon-pink)] to-[var(--neon-purple)]"
                            : "bg-gradient-to-t from-[var(--neon-cyan)] to-[var(--neon-cyan)]/50"
                        }`}
                      >
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-foreground">
                          {value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button onClick={() => setCurrentStep(0)} size="icon" variant="outline" className="border-[var(--neon-cyan)]/30">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} size="icon" variant="outline" className="border-[var(--neon-cyan)]/30">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button onClick={() => setIsPlaying(!isPlaying)} size="icon" className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)]">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button onClick={() => setCurrentStep(Math.min(visualizationSteps.length - 1, currentStep + 1))} size="icon" variant="outline" className="border-[var(--neon-cyan)]/30">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <div className="flex-1">
                    <Slider value={speed} onValueChange={setSpeed} max={100} step={1} className="w-full" />
                    <p className="text-xs text-muted-foreground mt-1">Speed: {speed[0]}%</p>
                  </div>
                </div>

                <div className="bg-background/50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-[var(--neon-cyan)] mb-2">
                    Step {currentStep + 1} of {visualizationSteps.length}
                  </p>
                  <p className="text-foreground">
                    {isGraphAlgorithm
                      ? visualizationSteps[currentStep]?.description
                      : arraySteps[currentStep]?.description}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50 mb-6">
              <h3 className="text-xl font-bold mb-4 text-[var(--neon-cyan)]">Algorithm Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Time Complexity:</span>
                  <p className="font-mono text-[var(--neon-pink)]">O(n log n)</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Space Complexity:</span>
                  <p className="font-mono text-[var(--neon-purple)]">O(log n)</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Type:</span>
                  <p className="text-foreground">Divide & Conquer</p>
                </div>
              </div>
            </Card>

            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-xl font-bold mb-4 text-[var(--neon-pink)]">Code Snippet</h3>
              <pre className="text-xs bg-background/50 p-4 rounded overflow-x-auto">
                <code className="text-foreground">{`function quickSort(arr, low, high) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`}</code>
              </pre>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
