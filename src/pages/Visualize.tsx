import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Code2, Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraphVisualization, generateBFSSteps, generateDijkstraSteps } from "@/components/GraphVisualization";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Visualize() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([50]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");

  const allAlgorithms = useQuery(api.algorithms.getAllAlgorithms) || [];

  // Set default selected algorithm when data loads
  useEffect(() => {
    if (allAlgorithms.length > 0 && !selectedAlgorithm) {
      setSelectedAlgorithm(allAlgorithms[0].slug);
    }
  }, [allAlgorithms, selectedAlgorithm]);

  const selectedAlgoData = allAlgorithms.find(a => a.slug === selectedAlgorithm);

  // Generate visualization steps based on algorithm type
  const generateArraySteps = (algoName: string) => {
    // Generate dummy array visualization steps
    const initialArray = [64, 34, 25, 12, 22, 11, 90, 45, 78, 33];
    const sortedArray = [...initialArray].sort((a, b) => a - b);

    return [
      { step: 1, array: initialArray, pivot: 0, description: `Starting ${algoName}` },
      { step: 2, array: [...initialArray].sort(() => Math.random() - 0.5), pivot: 3, description: "Processing elements..." },
      { step: 3, array: [...initialArray].sort(() => Math.random() - 0.5), pivot: 5, description: "Comparing and swapping..." },
      { step: 4, array: sortedArray, pivot: -1, description: "Algorithm complete!" },
    ];
  };

  const generateTreeSteps = (algoName: string) => {
    return [
      { step: 1, array: [50, 30, 70, 20, 40, 60, 80], pivot: 0, description: `Building tree for ${algoName}` },
      { step: 2, array: [50, 30, 70, 20, 40, 60, 80], pivot: 1, description: "Traversing left subtree..." },
      { step: 3, array: [50, 30, 70, 20, 40, 60, 80], pivot: 2, description: "Traversing right subtree..." },
      { step: 4, array: [50, 30, 70, 20, 40, 60, 80], pivot: -1, description: "Tree traversal complete!" },
    ];
  };

  const arraySteps = selectedAlgoData?.visualizationType === "tree"
    ? generateTreeSteps(selectedAlgoData?.name || "")
    : generateArraySteps(selectedAlgoData?.name || "");

  const graphSteps = selectedAlgoData?.name.toLowerCase().includes("bfs") || selectedAlgoData?.name.toLowerCase().includes("breadth")
    ? generateBFSSteps("A")
    : generateDijkstraSteps("A");

  const visualizationSteps = selectedAlgoData?.visualizationType === "graph"
    ? graphSteps
    : arraySteps;

  const isGraphAlgorithm = selectedAlgoData?.visualizationType === "graph";

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

  if (!allAlgorithms.length || !selectedAlgoData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--neon-cyan)] border-t-transparent mb-4"></div>
          <p className="text-muted-foreground">Loading algorithms...</p>
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
            Watch 600+ algorithms come to life with step-by-step interactive visualization
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="mb-6">
                <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select an algorithm" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[400px]">
                    {allAlgorithms.map(algo => (
                      <SelectItem key={algo._id} value={algo.slug}>
                        {algo.name} ({algo.category})
                      </SelectItem>
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
                    algorithm={selectedAlgoData?.name || ""}
                  />
                ) : (
                  /* Array/Tree Visualization */
                  <div className="relative z-10 flex items-end justify-center gap-2 h-full">
                    {arraySteps[currentStep]?.array.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${(value / 100) * 300}px` }}
                        transition={{ duration: 0.5 }}
                        className={`relative w-16 rounded-t-lg ${
                          index === arraySteps[currentStep]?.pivot
                            ? "bg-gradient-to-t from-[var(--neon-pink)] to-[var(--neon-purple)] glow-pink"
                            : "bg-gradient-to-t from-[var(--neon-cyan)] to-[var(--neon-cyan)]/50 glow-cyan"
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
                  <Button onClick={() => setIsPlaying(!isPlaying)} size="icon" className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] glow-cyan">
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
                  <span className="text-muted-foreground block mb-1">Name:</span>
                  <p className="font-semibold text-foreground">{selectedAlgoData?.name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Category:</span>
                  <p className="text-foreground">{selectedAlgoData?.category}</p>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Domain:</span>
                  <p className="text-foreground">{selectedAlgoData?.domain}</p>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Difficulty:</span>
                  <p className="text-foreground">{selectedAlgoData?.difficulty}</p>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Time Complexity:</span>
                  <p className="font-mono text-[var(--neon-pink)]">
                    Best: {selectedAlgoData?.timeComplexity.best}<br />
                    Avg: {selectedAlgoData?.timeComplexity.average}<br />
                    Worst: {selectedAlgoData?.timeComplexity.worst}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Space Complexity:</span>
                  <p className="font-mono text-[var(--neon-purple)]">{selectedAlgoData?.spaceComplexity}</p>
                </div>
              </div>
            </Card>

            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-xl font-bold mb-4 text-[var(--neon-pink)]">Description</h3>
              <p className="text-sm text-muted-foreground mb-4">{selectedAlgoData?.description}</p>

              <h4 className="text-md font-semibold mb-2 text-[var(--neon-cyan)]">Applications</h4>
              <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                {selectedAlgoData?.applications.slice(0, 3).map((app, i) => (
                  <li key={i}>• {app}</li>
                ))}
              </ul>

              <h4 className="text-md font-semibold mb-2 text-[var(--neon-purple)]">Code Snippet</h4>
              <pre className="text-xs bg-background/50 p-4 rounded overflow-x-auto max-h-[200px]">
                <code className="text-foreground">{selectedAlgoData?.implementation}</code>
              </pre>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
