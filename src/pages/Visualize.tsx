import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router";
import {
    ChevronRight,
    Layers,
    Box,
    RotateCcw,
    Zap,
    Clock,
    Activity,
    BookOpen,
    Code2,
    Brain,
    Play,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlgorithmVisualizer, AlgorithmType } from "@/components/visualizations/AlgorithmVisualizer";
import { useAlgorithmBySlug, useAlgorithms } from "@/hooks/use-algorithms";
import { DOMAINS } from "@/lib/algorithms-data";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import ImplementationSelector from "@/components/ImplementationSelector";
import QuizModule from "@/components/QuizModule";
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
import { Settings2, Plus, Minus, Wand2, Hash } from "lucide-react";
import AlgorithmInfoPanel from '@/components/AlgorithmInfoPanel';
import ComplexityBreakdown from '@/components/ComplexityBreakdown';
import { generateComprehensiveDetails } from '@/lib/comprehensive-algorithm-details';


interface ConfigurationPanelProps {
    algorithm: any;
    visualizerArray: number[];
    setVisualizerArray: (arr: number[]) => void;
    visualizerTarget: number;
    setVisualizerTarget: (val: number) => void;
}

function ConfigurationPanel({
    algorithm,
    visualizerArray,
    setVisualizerArray,
    visualizerTarget,
    setVisualizerTarget
}: ConfigurationPanelProps) {
    const isSearching = algorithm.category === 'Searching';
    const isSorting = algorithm.category === 'Sorting';

    if (!isSearching && !isSorting) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="group/panel dark:bg-[#0a0a0c]/80 dark:backdrop-blur-3xl dark:border dark:border-white/5 bg-white/60 backdrop-blur-3xl border border-gray-300/50 rounded-2xl p-6 shadow-2xl space-y-8 relative overflow-hidden"
        >
            {/* Animated Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 dark:bg-[var(--neon-cyan)]/5 bg-[var(--neon-cyan)]/10 rounded-full blur-3xl dark:group-hover/panel:bg-[var(--neon-cyan)]/10 group-hover/panel:bg-[var(--neon-cyan)]/15 transition-colors duration-1000" />

            <div className="flex items-center gap-3 dark:border-white/5 border-gray-400/30 border-b pb-4 relative z-10">
                <motion.div
                    whileHover={{ rotate: 90 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="p-2 dark:bg-[var(--neon-cyan)]/10 bg-[var(--neon-cyan)]/20 rounded-lg"
                >
                    <Settings2 className="w-5 h-5 text-[var(--neon-cyan)]" />
                </motion.div>
                <div>
                    <h3 className="text-lg font-bold dark:text-white text-gray-900">Configuration</h3>
                    <p className="text-[10px] dark:text-muted-foreground text-gray-600 uppercase tracking-[0.2em] font-bold">Parameters</p>
                </div>
            </div>

            {/* Array Controls */}
            <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold dark:text-white/40 text-gray-700 uppercase tracking-widest">Input Dataset</label>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={visualizerArray.length <= 3}
                            onClick={() => setVisualizerArray(visualizerArray.slice(0, -1))}
                            className="w-8 h-8 rounded-lg dark:border-white/5 dark:hover:border-red-500/50 dark:hover:bg-red-500/10 border-gray-400 hover:border-red-500 hover:bg-red-500/15 transition-all"
                        >
                            <Minus className="w-3 h-3 dark:text-red-400 text-red-500" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={visualizerArray.length >= 15}
                            onClick={() => setVisualizerArray([...visualizerArray, Math.floor(Math.random() * 90) + 10])}
                            className="w-8 h-8 rounded-lg dark:border-white/5 dark:hover:border-[var(--neon-green)]/50 dark:hover:bg-[var(--neon-green)]/10 border-gray-400 hover:border-[var(--neon-green)] hover:bg-[var(--neon-green)]/15 transition-all"
                        >
                            <Plus className="w-3 h-3 text-[var(--neon-green)]" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-2">
                    <AnimatePresence>
                        {visualizerArray.map((val, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="relative group/input"
                            >
                                <input
                                    type="number"
                                    value={val}
                                    onChange={(e) => {
                                        const newArray = [...visualizerArray];
                                        newArray[idx] = parseInt(e.target.value) || 0;
                                        setVisualizerArray(newArray);
                                    }}
                                    className="w-full dark:bg-white/5 dark:border dark:border-white/10 dark:text-white bg-gray-300/50 border border-gray-400 text-gray-900 rounded-lg px-1 py-3 text-center font-mono text-sm dark:focus:bg-white/10 dark:focus:border-[var(--neon-cyan)]/50 focus:bg-white/70 focus:border-[var(--neon-cyan)] focus:outline-none transition-all"
                                />
                                <div className="absolute inset-0 rounded-lg border border-[var(--neon-cyan)] opacity-0 group-focus-within/input:opacity-50 blur-[2px] transition-opacity pointer-events-none" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Target Control */}
            {isSearching && (
                <div className="space-y-4 pt-6 dark:border-white/5 border-gray-400/30 border-t relative z-10">
                    <label className="text-[11px] font-bold dark:text-white/40 text-gray-700 uppercase tracking-widest block">Search Target</label>
                    <div className="relative group/target">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--neon-purple)]/50 to-transparent rounded-xl opacity-0 group-focus-within/target:opacity-100 blur transition-opacity" />
                        <div className="relative">
                            <input
                                type="number"
                                value={visualizerTarget}
                                onChange={(e) => setVisualizerTarget(parseInt(e.target.value) || 0)}
                                className="w-full dark:bg-black/40 dark:border dark:border-white/10 dark:text-white bg-white/70 border border-gray-400 text-gray-900 rounded-xl px-12 py-4 font-mono text-xl dark:focus:border-[var(--neon-purple)] focus:border-[var(--neon-purple)] focus:outline-none transition-all"
                            />
                            <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--neon-purple)] opacity-50" />
                        </div>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="pt-6 relative z-10">
                <Button
                    variant="outline"
                    onClick={() => {
                        const newArray = Array.from({ length: visualizerArray.length }, () => Math.floor(Math.random() * 90) + 10);
                        setVisualizerArray(newArray);
                        if (isSearching) {
                            setVisualizerTarget(newArray[Math.floor(Math.random() * newArray.length)]);
                        }
                    }}
                    className="w-full h-14 rounded-xl dark:border-[var(--neon-cyan)]/20 dark:text-[var(--neon-cyan)] dark:hover:bg-[var(--neon-cyan)]/10 dark:hover:border-[var(--neon-cyan)]/60 border-[var(--neon-cyan)]/30 text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/15 hover:border-[var(--neon-cyan)] transition-all font-black italic tracking-tighter text-lg group/btn"
                >
                    <Wand2 className="w-5 h-5 mr-3 group-hover/btn:rotate-12 group-hover/btn:scale-125 transition-transform" />
                    REGENERATE
                </Button>
            </div>

            {/* Matrix Decorative bits */}
            <div className="absolute bottom-2 right-2 flex gap-1 opacity-20">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`w-1 h-1 rounded-full ${i === 1 ? 'bg-[var(--neon-cyan)]' : 'dark:bg-white bg-gray-700'}`} />
                ))}
            </div>
            {/* Tips/Info */}
            <div className="dark:bg-[var(--neon-cyan)]/5 dark:border dark:border-[var(--neon-cyan)]/10 bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)]/20 rounded-xl p-4 mt-6">
                <p className="text-[10px] text-[var(--neon-cyan)] font-mono leading-relaxed opacity-60">
                    // SYSTEM NOTE:<br />
                    Adjust the array size or direct values to see how the algorithm behaves with different datasets. Target values can be set to test edge cases.
                </p>
            </div>
        </motion.div>
    );
}

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
    const [activeTab, setActiveTab] = useState<'visualization' | 'implementation' | 'quiz'>('visualization');
    const [showComparison, setShowComparison] = useState(false);

    // Visualizer data state
    const [visualizerArray, setVisualizerArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90, 45, 78, 33]);
    const [visualizerTarget, setVisualizerTarget] = useState<number>(22);
    const [showAlgorithmInfo, setShowAlgorithmInfo] = useState(true);

    // Generate comprehensive details for current algorithm
    const comprehensiveDetails = algorithm ? generateComprehensiveDetails(algorithm as any) : null;

    useEffect(() => {
        if (algoSlug) {
            setStep("algorithm");
        } else {
            setStep("options");
        }
    }, [algoSlug]);

    useEffect(() => {
        // Only redirect if we've finished loading and user is not authenticated
        if (!isLoading && !isAuthenticated) {
            navigate("/auth", { replace: true });
        }
    }, [isAuthenticated, isLoading, navigate]);

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
                className={`flex-1 ${sidebarOpen ? "ml-80" : ""
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
                                <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="border-[var(--neon-cyan)]/30 text-[var(--neon-cyan)] font-mono text-[10px] bg-[var(--neon-cyan)]/5">
                                                {algorithm.domain || "DSA"}
                                            </Badge>
                                            <Badge variant="outline" className="border-[var(--neon-purple)]/30 text-[var(--neon-purple)] font-mono text-[10px] bg-[var(--neon-purple)]/5">
                                                {algorithm.difficulty}
                                            </Badge>
                                            <Badge variant="outline" className="border-[var(--neon-green)]/30 text-[var(--neon-green)] font-mono text-[10px] bg-[var(--neon-green)]/5">
                                                {algorithm.category}
                                            </Badge>
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                            {algorithm.name}
                                        </h2>
                                        <p className="text-white/40 text-sm md:text-base max-w-2xl mx-auto leading-relaxed italic">
                                            {algorithm.description}
                                        </p>
                                    </div>

                                    {/* Compact Complexity Metrics */}
                                    <div className="flex justify-center gap-6 mt-6">
                                        <div className="text-center">
                                            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Time</div>
                                            <div className="text-[var(--neon-cyan)] font-mono font-bold">{algorithm.timeComplexity?.average || "O(n)"}</div>
                                        </div>
                                        <div className="w-px h-8 bg-white/10" />
                                        <div className="text-center">
                                            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Space</div>
                                            <div className="text-[var(--neon-purple)] font-mono font-bold">{algorithm.spaceComplexity}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Tab Navigation */}
                                <div className="max-w-6xl mx-auto">
                                    <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
                                        <button
                                            onClick={() => setActiveTab('visualization')}
                                            className={`px-8 py-4 font-bold border-b-2 transition-all ${activeTab === 'visualization'
                                                ? 'border-[var(--neon-cyan)] text-[var(--neon-cyan)]'
                                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                                }`}
                                        >
                                            <Play size={20} className="inline mr-2" />
                                            VISUALIZATION
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('implementation')}
                                            className={`px-8 py-4 font-bold border-b-2 transition-all ${activeTab === 'implementation'
                                                ? 'border-[var(--neon-purple)] text-[var(--neon-purple)]'
                                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                                }`}
                                        >
                                            <Code2 size={20} className="inline mr-2" />
                                            IMPLEMENTATIONS
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('quiz')}
                                            className={`px-8 py-4 font-bold border-b-2 transition-all ${activeTab === 'quiz'
                                                ? 'border-[var(--neon-green)] text-[var(--neon-green)]'
                                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                                }`}
                                        >
                                            <Brain size={20} className="inline mr-2" />
                                            QUIZ & CHALLENGES
                                        </button>
                                    </div>
                                </div>

                                {/* Tab Content */}
                                {activeTab === 'visualization' && (
                                    <>
                                        {/* Main Visualization Area */}
                                        <div className="max-w-6xl mx-auto space-y-12">
                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                                {/* Visualizer Column */}
                                                <div className="lg:col-span-8 space-y-6">
                                                    <div className="relative group">
                                                        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--neon-cyan)]/20 to-[var(--neon-purple)]/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

                                                        <div className="relative dark:bg-[#0a0a0c]/40 dark:backdrop-blur-3xl dark:border dark:border-white/5 bg-white/40 backdrop-blur-3xl border border-gray-300/40 rounded-3xl p-6 md:p-10 shadow-3xl overflow-hidden min-h-[500px] flex items-center justify-center">
                                                            <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

                                                            <div className="w-full">
                                                                <AlgorithmVisualizer
                                                                    type={algorithm.slug as AlgorithmType}
                                                                    array={visualizerArray}
                                                                    target={visualizerTarget}
                                                                    hideHeader={true}
                                                                    code={algorithm.implementations?.javascript || algorithm.pseudocode}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Configuration Panel Column */}
                                                <div className="lg:col-span-4 sticky top-24">
                                                    <ConfigurationPanel
                                                        algorithm={algorithm}
                                                        visualizerArray={visualizerArray}
                                                        setVisualizerArray={setVisualizerArray}
                                                        visualizerTarget={visualizerTarget}
                                                        setVisualizerTarget={setVisualizerTarget}
                                                    />

                                                    {/* Action Toggles */}
                                                    <div className="grid grid-cols-2 gap-3 mt-6">
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => setShowComplexity(!showComplexity)}
                                                            className={`h-12 rounded-xl transition-all ${showComplexity ? 'dark:bg-[var(--neon-green)]/10 dark:border-[var(--neon-green)]/30 dark:text-[var(--neon-green)] bg-[var(--neon-green)]/20 border-[var(--neon-green)]/40 text-[var(--neon-green)]' : 'dark:border-white/5 dark:text-white/40 dark:hover:bg-white/5 border-gray-400 text-gray-700 hover:bg-gray-300/40'}`}
                                                        >
                                                            <Activity className="w-4 h-4 mr-2" />
                                                            Analysis
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => setShowComparison(!showComparison)}
                                                            className={`h-12 rounded-xl transition-all ${showComparison ? 'dark:bg-[var(--neon-purple)]/10 dark:border-[var(--neon-purple)]/30 dark:text-[var(--neon-purple)] bg-[var(--neon-purple)]/20 border-[var(--neon-purple)]/40 text-[var(--neon-purple)]' : 'dark:border-white/5 dark:text-white/40 dark:hover:bg-white/5 border-gray-400 text-gray-700 hover:bg-gray-300/40'}`}
                                                        >
                                                            <Zap className="w-4 h-4 mr-2" />
                                                            Related
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

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
                                                    {(algorithm.applications || [])
                                                        .slice(0, 3)
                                                        .map((useCase: string, idx: number) => (
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
                                    </>
                                )}

                                {/* Implementation Tab */}
                                {activeTab === 'implementation' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="max-w-6xl mx-auto"
                                    >
                                        <ImplementationSelector
                                            algorithm={algorithm.slug}
                                            className="mb-8"
                                        />
                                    </motion.div>
                                )}

                                {/* Quiz Tab */}
                                {activeTab === 'quiz' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="max-w-6xl mx-auto"
                                    >
                                        <QuizModule
                                            algorithm={algorithm.slug}
                                            mode="both"
                                        />
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
