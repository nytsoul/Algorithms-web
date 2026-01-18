import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams, useNavigate } from "react-router";
import {
  Code2,
  ChevronRight,
  Layers,
  Box,
  RotateCcw,
  WifiOff,
  Menu,
  X,
  Zap,
  Clock,
  Activity,
  BookOpen,
  Share2,
  Download,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VisualizationPlayer from "@/components/VisualizationPlayer";
import { useAlgorithmBySlug, useAlgorithms } from "@/hooks/use-algorithms";
import { DOMAINS } from "@/lib/algorithms-data";
import { isSupabaseConfigured, isSupabaseAvailable } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Visualize() {
  const navigate = useNavigate();
  const { isAuthenticated, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const algoSlug = searchParams.get("algo");
  const { algorithm } = useAlgorithmBySlug(algoSlug || "");
  const { algorithms: allAlgorithms, isLoading } = useAlgorithms();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [step, setStep] = useState<"options" | "domain" | "algorithm">(
    algoSlug ? "algorithm" : "options"
  );
  const [showComplexity, setShowComplexity] = useState(true);
  const [showComparison, setShowComparison] = useState(false);

    useEffect(() => {
        if (algoSlug) {
            setStep("algorithm");
        } else {
            setStep("options");
        }
    }, [algoSlug]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/auth", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = async () => {
        await signOut();
    };

    const handleSelectDomain = (domain: string) => {
        setSelectedDomain(domain);
        setStep("algorithm");
    };

    const handleSelectAlgorithm = (slug: string) => {
        setSearchParams({ algo: slug });
    };

    const handleReset = () => {
        setSearchParams({});
        setSelectedDomain(null);
        setStep("options");
    };

    const filteredAlgorithms = selectedDomain
        ? allAlgorithms.filter((a) => a.domain === selectedDomain)
        : [];

    if (!isAuthenticated) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="w-full min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-[var(--neon-cyan)] border-t-transparent mb-4" />
                    <p className="text-muted-foreground">Loading visualization engine...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-background relative overflow-hidden flex">
            {/* Sidebar */}
            {sidebarOpen && <Sidebar onLogout={handleLogout} isOpen={sidebarOpen} />}

            {/* Main Content */}
            <div
                className={`flex-1 ${
                    sidebarOpen ? "ml-80" : ""
                } flex flex-col transition-all duration-300`}
            >
                <div className="fixed inset-0 cyber-grid pointer-events-none" />
                <div className="scanline fixed inset-0 pointer-events-none" />

                {/* Header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                    <AnimatePresence mode="wait">
                        {step === "options" && (
                            <motion.div
                                key="options"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="max-w-4xl mx-auto text-center py-20"
                            >
                                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent">
                                    Choose Your Path
                                </h2>
                                <p className="text-muted-foreground mb-12 text-lg">
                                    Select a domain to explore and visualize its algorithms.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {DOMAINS.slice(0, 11).map((domain) => (
                                        <Card
                                            key={domain.name}
                                            onClick={() => handleSelectDomain(domain.name)}
                                            className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50 cursor-pointer hover:border-[var(--neon-cyan)] transition-all group"
                                        >
                                            <Layers className="w-12 h-12 text-[var(--neon-cyan)] mb-4 mx-auto group-hover:scale-110 transition-transform" />
                                            <h3 className="text-xl font-bold mb-2">{domain.name}</h3>
                                            <p className="text-xs text-muted-foreground">
                                                {domain.description}
                                            </p>
                                        </Card>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === "algorithm" && !algorithm && (
                            <motion.div
                                key="algorithm-select"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="max-w-4xl mx-auto py-10"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setStep("options")}
                                        className="text-[var(--neon-cyan)]"
                                    >
                                        ← Change Domain
                                    </Button>
                                    <h2 className="text-2xl font-bold">
                                        Select Algorithm in{" "}
                                        <span className="text-[var(--neon-cyan)]">
                                            {selectedDomain}
                                        </span>
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredAlgorithms.map((algo) => (
                                        <Card
                                            key={algo.slug}
                                            onClick={() => handleSelectAlgorithm(algo.slug)}
                                            className="cyber-card p-4 bg-card/50 backdrop-blur-sm border-border/50 cursor-pointer hover:border-[var(--neon-purple)] transition-all flex items-center justify-between group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Box className="w-5 h-5 text-[var(--neon-purple)]" />
                                                <span className="font-medium group-hover:text-[var(--neon-purple)] transition-colors">
                                                    {algo.name}
                                                </span>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                        </Card>
                                    ))}
                                    {filteredAlgorithms.length === 0 && (
                                        <p className="col-span-full text-center py-20 text-muted-foreground italic">
                                            No algorithms found for this domain.
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {step === "algorithm" && algorithm && (
                            <motion.div
                                key="visualization"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                                    <div className="flex items-center gap-4">
                                        <Badge
                                            variant="outline"
                                            className="border-[var(--neon-cyan)] text-[var(--neon-cyan)] px-4 py-1"
                                        >
                                            {algorithm.domain}
                                        </Badge>
                                        <h2 className="text-xl font-bold">{algorithm.name}</h2>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowComplexity(!showComplexity)}
                                            className="border-[var(--neon-green)] text-[var(--neon-green)] hover:bg-[var(--neon-green)]/10"
                                        >
                                            <Activity className="w-4 h-4 mr-2" />
                                            Complexity
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowComparison(!showComparison)}
                                            className="border-[var(--neon-purple)] text-[var(--neon-purple)] hover:bg-[var(--neon-purple)]/10"
                                        >
                                            <Zap className="w-4 h-4 mr-2" />
                                            Compare
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleReset}
                                            className="border-[var(--neon-pink)] text-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/10"
                                        >
                                            <RotateCcw className="w-4 h-4 mr-2" />
                                            Change Algorithm
                                        </Button>
                                    </div>
                                </div>

                                {/* Main Visualization */}
                                <VisualizationPlayer algorithm={algorithm} />

                                {/* Complexity Analysis */}
                                {showComplexity && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-4"
                                    >
                                        <h3 className="text-lg font-bold flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-[var(--neon-cyan)]" />
                                            Complexity Analysis
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                                                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                                                    Time Complexity
                                                </p>
                                                <p className="text-lg font-bold text-[var(--neon-cyan)] font-mono">
                                                    {algorithm.timeComplexity?.average || "O(n)"}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    Average Case
                                                </p>
                                            </Card>
                                            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                                                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                                                    Space Complexity
                                                </p>
                                                <p className="text-2xl font-bold text-[var(--neon-pink)] font-mono">
                                                    {algorithm.spaceComplexity}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    Auxiliary Space
                                                </p>
                                            </Card>
                                            <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                                                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                                                    Category
                                                </p>
                                                <p className="text-2xl font-bold text-[var(--neon-green)]">
                                                    {algorithm.category}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    {algorithm.difficulty}
                                                </p>
                                            </Card>
                                        </div>

                                        {/* Complexity Growth Chart */}
                                        <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                                            <h4 className="font-bold mb-4">Performance Growth Pattern</h4>
                                            <ResponsiveContainer width="100%" height={250}>
                                                <LineChart
                                                    data={[
                                                        { size: "10", bestY: 10, avgY: 23, worstY: 100 },
                                                        { size: "100", bestY: 100, avgY: 230, worstY: 10000 },
                                                        {
                                                            size: "1000",
                                                            bestY: 1000,
                                                            avgY: 2300,
                                                            worstY: 1000000,
                                                        },
                                                        {
                                                            size: "10000",
                                                            bestY: 10000,
                                                            avgY: 23000,
                                                            worstY: 100000000,
                                                        },
                                                    ]}
                                                >
                                                    <CartesianGrid
                                                        strokeDasharray="3 3"
                                                        stroke="var(--border)"
                                                    />
                                                    <XAxis dataKey="size" stroke="var(--foreground)" />
                                                    <YAxis stroke="var(--foreground)" scale="log" />
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: "var(--card)",
                                                            border: "1px solid var(--border)",
                                                        }}
                                                    />
                                                    <Legend />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="bestY"
                                                        stroke="var(--neon-green)"
                                                        strokeWidth={2}
                                                        name="Best Case"
                                                    />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="avgY"
                                                        stroke="var(--neon-cyan)"
                                                        strokeWidth={2}
                                                        name="Average Case"
                                                    />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="worstY"
                                                        stroke="var(--neon-pink)"
                                                        strokeWidth={2}
                                                        name="Worst Case"
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </Card>
                                    </motion.div>
                                )}

                                {/* Algorithm Comparison */}
                                {showComparison && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-4"
                                    >
                                        <h3 className="text-lg font-bold flex items-center gap-2">
                                            <Zap className="w-5 h-5 text-[var(--neon-purple)]" />
                                            Related Algorithms
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {allAlgorithms
                                                .filter(
                                                    (a) =>
                                                        a.category === algorithm.category &&
                                                        a.slug !== algorithm.slug
                                                )
                                                .slice(0, 4)
                                                .map((algo) => (
                                                    <Card
                                                        key={algo.slug}
                                                        onClick={() =>
                                                            setSearchParams({ algo: algo.slug })
                                                        }
                                                        className="cyber-card p-4 bg-card/50 backdrop-blur-sm border-border/50 cursor-pointer hover:border-[var(--neon-cyan)] transition-all group"
                                                    >
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div className="flex-1">
                                                                <p className="font-bold text-[var(--neon-cyan)] group-hover:text-[var(--neon-green)] transition-colors">
                                                                    {algo.name}
                                                                </p>
                                                                <p className="text-xs text-muted-foreground">
                                                                    {algo.category}
                                                                </p>
                                                            </div>
                                                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                                        </div>
                                                        <div className="flex gap-2 flex-wrap">
                                                            <Badge variant="secondary" className="text-xs">
                                                                Time: {algo.timeComplexity?.average}
                                                            </Badge>
                                                            <Badge variant="secondary" className="text-xs">
                                                                Space: {algo.spaceComplexity}
                                                            </Badge>
                                                        </div>
                                                    </Card>
                                                ))}
                                        </div>

                                        {/* Comparison Table */}
                                        <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                                            <h4 className="font-bold mb-4">Algorithm Comparison</h4>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm">
                                                    <thead className="border-b border-border/50">
                                                        <tr>
                                                            <th className="text-left py-2 px-3 text-[var(--neon-cyan)]">
                                                                Algorithm
                                                            </th>
                                                            <th className="text-left py-2 px-3 text-[var(--neon-pink)]">
                                                                Time (Avg)
                                                            </th>
                                                            <th className="text-left py-2 px-3 text-[var(--neon-green)]">
                                                                Space
                                                            </th>
                                                            <th className="text-left py-2 px-3 text-[var(--neon-purple)]">
                                                                Difficulty
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-b border-border/20 bg-[var(--neon-cyan)]/5">
                                                            <td className="py-2 px-3 font-bold text-[var(--neon-cyan)]">
                                                                {algorithm.name}
                                                            </td>
                                                            <td className="py-2 px-3 font-mono">
                                                                {algorithm.timeComplexity?.average}
                                                            </td>
                                                            <td className="py-2 px-3 font-mono">
                                                                {algorithm.spaceComplexity}
                                                            </td>
                                                            <td className="py-2 px-3">{algorithm.difficulty}</td>
                                                        </tr>
                                                        {allAlgorithms
                                                            .filter(
                                                                (a) =>
                                                                    a.category === algorithm.category &&
                                                                    a.slug !== algorithm.slug
                                                            )
                                                            .slice(0, 3)
                                                            .map((algo) => (
                                                                <tr
                                                                    key={algo.slug}
                                                                    className="border-b border-border/20 hover:bg-background/50 transition"
                                                                >
                                                                    <td className="py-2 px-3">{algo.name}</td>
                                                                    <td className="py-2 px-3 font-mono text-muted-foreground">
                                                                        {algo.timeComplexity?.average}
                                                                    </td>
                                                                    <td className="py-2 px-3 font-mono text-muted-foreground">
                                                                        {algo.spaceComplexity}
                                                                    </td>
                                                                    <td className="py-2 px-3">
                                                                        {algo.difficulty}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Card>
                                    </motion.div>
                                )}

                                {/* Algorithm Details & Use Cases */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                            <BookOpen className="w-5 h-5 text-[var(--neon-green)]" />
                                            Description
                                        </h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {algorithm.description}
                                        </p>
                                    </Card>

                                    <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50">
                                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                            <Zap className="w-5 h-5 text-[var(--neon-yellow)]" />
                                            Use Cases
                                        </h3>
                                        <ul className="text-sm space-y-2">
                                            {(algorithm.useCases || algorithm.applications || [])
                                                .slice(0, 3)
                                                .map((useCase, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <span className="text-[var(--neon-cyan)] font-bold">
                                                            •
                                                        </span>
                                                        <span className="text-muted-foreground">
                                                            {useCase}
                                                        </span>
                                                    </li>
                                                ))}
                                        </ul>
                                    </Card>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
