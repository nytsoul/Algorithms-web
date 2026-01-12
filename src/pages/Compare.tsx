import { motion } from "framer-motion";
import { Link } from "react-router";
import { Code2, TrendingUp, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useAlgorithms } from "@/hooks/use-algorithms";
import { Algorithm } from "@/lib/algorithms-data";

export default function Compare() {
    const { algorithms, isLoading } = useAlgorithms();
    const [selectedAlgorithms, setSelectedAlgorithms] = useState<Algorithm[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleAlgorithm = (algo: Algorithm) => {
        if (selectedAlgorithms.find(a => a._id === algo._id)) {
            setSelectedAlgorithms(selectedAlgorithms.filter(a => a._id !== algo._id));
        } else if (selectedAlgorithms.length < 4) {
            setSelectedAlgorithms([...selectedAlgorithms, algo]);
        }
    };

    const filteredAlgorithms = algorithms.filter(algo =>
        algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        algo.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const parseComplexity = (complexity: string): number => {
        // Simple scoring: O(1) = 1, O(log n) = 2, O(n) = 3, O(n log n) = 4, O(n²) = 5, etc.
        if (complexity.includes("1")) return 1;
        if (complexity.includes("log n")) return 2;
        if (complexity.includes("n²") || complexity.includes("n^2")) return 5;
        if (complexity.includes("n log n")) return 4;
        if (complexity.includes("n")) return 3;
        return 6;
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
                        <Link to="/domains"><Button variant="ghost">Domains</Button></Link>
                        <Link to="/compare"><Button variant="ghost" className="text-[var(--neon-cyan)]">Compare</Button></Link>
                    </nav>
                </div>
            </motion.header>

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <h1 className="text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] bg-clip-text text-transparent">Algorithm Comparison</span>
                    </h1>
                    <p className="text-xl text-muted-foreground">Compare up to 4 algorithms side-by-side</p>
                </motion.div>

                {/* Selected Algorithms */}
                {selectedAlgorithms.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Selected for Comparison ({selectedAlgorithms.length}/4)</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            {selectedAlgorithms.map((algo) => (
                                <Card key={algo._id} className="cyber-card p-4 bg-card/50 backdrop-blur-sm">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-bold text-sm">{algo.name}</h3>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => toggleAlgorithm(algo)}
                                            className="h-6 w-6 p-0"
                                        >
                                            ×
                                        </Button>
                                    </div>
                                    <Badge className="text-xs">{algo.difficulty}</Badge>
                                </Card>
                            ))}
                        </div>

                        {/* Comparison Table */}
                        {selectedAlgorithms.length >= 2 && (
                            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="text-left p-3 text-[var(--neon-cyan)]">Metric</th>
                                            {selectedAlgorithms.map((algo) => (
                                                <th key={algo._id} className="text-left p-3">{algo.name}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-border/50">
                                            <td className="p-3 font-semibold">Difficulty</td>
                                            {selectedAlgorithms.map((algo) => (
                                                <td key={algo._id} className="p-3">
                                                    <Badge className={`
                            ${algo.difficulty === "Beginner" ? "bg-[var(--neon-green)]/20 text-[var(--neon-green)]" : ""}
                            ${algo.difficulty === "Intermediate" ? "bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)]" : ""}
                            ${algo.difficulty === "Advanced" ? "bg-[var(--neon-pink)]/20 text-[var(--neon-pink)]" : ""}
                            ${algo.difficulty === "Expert" ? "bg-[var(--neon-purple)]/20 text-[var(--neon-purple)]" : ""}
                          `}>
                                                        {algo.difficulty}
                                                    </Badge>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="border-b border-border/50">
                                            <td className="p-3 font-semibold">Best Time</td>
                                            {selectedAlgorithms.map((algo) => (
                                                <td key={algo._id} className="p-3 font-mono text-sm text-[var(--neon-green)]">
                                                    {algo.timeComplexity.best}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="border-b border-border/50">
                                            <td className="p-3 font-semibold">Average Time</td>
                                            {selectedAlgorithms.map((algo) => (
                                                <td key={algo._id} className="p-3 font-mono text-sm text-[var(--neon-cyan)]">
                                                    {algo.timeComplexity.average}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="border-b border-border/50">
                                            <td className="p-3 font-semibold">Worst Time</td>
                                            {selectedAlgorithms.map((algo) => (
                                                <td key={algo._id} className="p-3 font-mono text-sm text-[var(--neon-pink)]">
                                                    {algo.timeComplexity.worst}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="border-b border-border/50">
                                            <td className="p-3 font-semibold">Space Complexity</td>
                                            {selectedAlgorithms.map((algo) => (
                                                <td key={algo._id} className="p-3 font-mono text-sm text-[var(--neon-yellow)]">
                                                    {algo.spaceComplexity}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="border-b border-border/50">
                                            <td className="p-3 font-semibold">Domain</td>
                                            {selectedAlgorithms.map((algo) => (
                                                <td key={algo._id} className="p-3 text-sm">{algo.domain}</td>
                                            ))}
                                        </tr>
                                        <tr className="border-b border-border/50">
                                            <td className="p-3 font-semibold">Paradigm</td>
                                            {selectedAlgorithms.map((algo) => (
                                                <td key={algo._id} className="p-3 text-sm">{algo.paradigm || "N/A"}</td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-semibold">Actions</td>
                                            {selectedAlgorithms.map((algo) => (
                                                <td key={algo._id} className="p-3">
                                                    <Link to={`/algorithm/${algo.slug}`}>
                                                        <Button size="sm" variant="outline">
                                                            View Details <ArrowRight className="w-3 h-3 ml-1" />
                                                        </Button>
                                                    </Link>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </Card>
                        )}
                    </div>
                )}

                {/* Algorithm Selection */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search algorithms to compare..."
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:border-[var(--neon-cyan)] outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAlgorithms.slice(0, 50).map((algo, index) => {
                        const isSelected = selectedAlgorithms.find(a => a._id === algo._id);
                        const canSelect = selectedAlgorithms.length < 4;

                        return (
                            <motion.div
                                key={algo._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.02 }}
                            >
                                <Card
                                    className={`cyber-card p-4 bg-card/50 backdrop-blur-sm cursor-pointer transition-all ${isSelected ? "border-[var(--neon-cyan)] bg-[var(--neon-cyan)]/10" : "border-border/50 hover:border-[var(--neon-cyan)]/50"
                                        } ${!canSelect && !isSelected ? "opacity-50" : ""}`}
                                    onClick={() => (canSelect || isSelected) && toggleAlgorithm(algo)}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-bold text-sm flex-1">{algo.name}</h3>
                                        {isSelected && (
                                            <Badge className="bg-[var(--neon-cyan)] text-background">✓</Badge>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{algo.description}</p>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-xs">{algo.difficulty}</Badge>
                                        <span className="text-xs text-muted-foreground">{algo.domain}</span>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
