import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams, useNavigate } from "react-router";
import { Code2, ChevronRight, Layers, Box, RotateCcw, WifiOff, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VisualizationPlayer from "@/components/VisualizationPlayer";
import { useAlgorithmBySlug, useAlgorithms } from "@/hooks/use-algorithms";
import { DOMAINS, ALGORITHMS_BY_DOMAIN } from "@/lib/algorithms-data";
import { isSupabaseConfigured, isSupabaseAvailable } from "@/lib/supabase";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function Visualize() {
    const navigate = useNavigate();
    const { isAuthenticated, signOut } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const algoSlug = searchParams.get("algo");
    const { algorithm } = useAlgorithmBySlug(algoSlug || "");
    const { algorithms: allAlgorithms } = useAlgorithms();
    const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
    const [step, setStep] = useState<"options" | "domain" | "algorithm">(algoSlug ? "algorithm" : "options");

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
        ? allAlgorithms.filter(a => a.domain === selectedDomain)
        : [];

    if (!isAuthenticated) {
        return null;
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
                                <p className="text-muted-foreground mb-12 text-lg">Select a domain to explore and visualize its algorithms.</p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {DOMAINS.map((domain) => (
                                        <Card
                                            key={domain.id}
                                            onClick={() => handleSelectDomain(domain.name)}
                                            className="cyber-card p-8 bg-card/50 backdrop-blur-sm border-border/50 cursor-pointer hover:border-[var(--neon-cyan)] transition-all group"
                                        >
                                            <Layers className="w-12 h-12 text-[var(--neon-cyan)] mb-4 mx-auto group-hover:scale-110 transition-transform" />
                                            <h3 className="text-xl font-bold mb-2">{domain.name}</h3>
                                            <p className="text-xs text-muted-foreground">{domain.description}</p>
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
                                    <Button variant="ghost" onClick={() => setStep("options")} className="text-[var(--neon-cyan)]">
                                        ← Change Domain
                                    </Button>
                                    <h2 className="text-2xl font-bold">Select Algorithm in <span className="text-[var(--neon-cyan)]">{selectedDomain}</span></h2>
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
                                                <span className="font-medium group-hover:text-[var(--neon-purple)] transition-colors">{algo.name}</span>
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
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <Badge variant="outline" className="border-[var(--neon-cyan)] text-[var(--neon-cyan)] px-4 py-1">
                                            {algorithm.domain}
                                        </Badge>
                                        <h2 className="text-xl font-bold">{algorithm.name}</h2>
                                    </div>
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
                                <VisualizationPlayer algorithm={algorithm} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
