import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router";
import { Code2, ArrowLeft, Filter, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { getDomainById } from "@/lib/domains";
import { useAlgorithmsByDomain } from "@/hooks/use-algorithms";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function DomainDetail() {
    const navigate = useNavigate();
    const { isAuthenticated, signOut } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { domainId } = useParams();
    const domain = getDomainById(Number(domainId));
    const { algorithms, isLoading } = useAlgorithmsByDomain(Number(domainId));
    const [searchQuery, setSearchQuery] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);

    if (!isAuthenticated) {
        navigate("/auth", { replace: true });
        return null;
    }

    const handleLogout = async () => {
        await signOut();
    };

    if (!domain) {
        return <div>Domain not found</div>;
    }

    const filteredAlgorithms = algorithms.filter(algo => {
        const matchesSearch = algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            algo.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDifficulty = !difficultyFilter || algo.difficulty === difficultyFilter;
        return matchesSearch && matchesDifficulty;
    });

    const difficultyCount = {
        Beginner: algorithms.filter(a => a.difficulty === "Beginner").length,
        Intermediate: algorithms.filter(a => a.difficulty === "Intermediate").length,
        Advanced: algorithms.filter(a => a.difficulty === "Advanced").length,
        Expert: algorithms.filter(a => a.difficulty === "Expert").length,
    };

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
                    {/* Back Button */}
                    <Link to="/domains">
                        <Button variant="ghost" className="mb-6">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Domains
                        </Button>
                    </Link>

                    {/* Domain Header */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                        <div className="flex items-start gap-6 mb-6">
                            <div className="text-6xl">{domain.icon}</div>
                            <div className="flex-1">
                                <h1 className="text-5xl font-bold mb-4">
                                    <span className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] bg-clip-text text-transparent">{domain.name}</span>
                                </h1>
                                <p className="text-xl text-muted-foreground">{domain.description}</p>
                            </div>
                            <Badge className={`bg-[var(--neon-${domain.color})]/20 text-[var(--neon-${domain.color})] border-0 text-lg px-4 py-2`}>
                                {algorithms.length} algorithms
                            </Badge>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
                            <p className="text-sm text-muted-foreground mb-1">Beginner</p>
                            <p className="text-3xl font-bold text-[var(--neon-green)]">{difficultyCount.Beginner}</p>
                        </Card>
                        <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
                            <p className="text-sm text-muted-foreground mb-1">Intermediate</p>
                            <p className="text-3xl font-bold text-[var(--neon-cyan)]">{difficultyCount.Intermediate}</p>
                        </Card>
                        <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
                            <p className="text-sm text-muted-foreground mb-1">Advanced</p>
                            <p className="text-3xl font-bold text-[var(--neon-pink)]">{difficultyCount.Advanced}</p>
                        </Card>
                        <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
                            <p className="text-sm text-muted-foreground mb-1">Expert</p>
                            <p className="text-3xl font-bold text-[var(--neon-purple)]">{difficultyCount.Expert}</p>
                        </Card>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-4 mb-8">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search algorithms..."
                                className="pl-10 border-border/50 bg-background/50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={difficultyFilter === null ? "default" : "outline"}
                                onClick={() => setDifficultyFilter(null)}
                            >
                                All
                            </Button>
                            <Button
                                variant={difficultyFilter === "Beginner" ? "default" : "outline"}
                                onClick={() => setDifficultyFilter("Beginner")}
                            >
                                Beginner
                            </Button>
                            <Button
                                variant={difficultyFilter === "Intermediate" ? "default" : "outline"}
                                onClick={() => setDifficultyFilter("Intermediate")}
                            >
                                Intermediate
                            </Button>
                            <Button
                                variant={difficultyFilter === "Advanced" ? "default" : "outline"}
                                onClick={() => setDifficultyFilter("Advanced")}
                            >
                                Advanced
                            </Button>
                            <Button
                                variant={difficultyFilter === "Expert" ? "default" : "outline"}
                                onClick={() => setDifficultyFilter("Expert")}
                            >
                                Expert
                            </Button>
                        </div>
                    </div>

                    {/* Algorithm List */}
                    {isLoading ? (
                        <div className="text-center py-12">Loading algorithms...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredAlgorithms.map((algorithm, index) => (
                                <motion.div
                                    key={algorithm._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                >
                                    <Link to={`/algorithm/${algorithm.slug}`}>
                                        <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-[var(--neon-cyan)]/50 transition-all cursor-pointer group h-full">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-lg font-bold text-foreground group-hover:text-[var(--neon-cyan)] transition flex-1">
                                                    {algorithm.name}
                                                </h3>
                                                <Badge className={`
                        ${algorithm.difficulty === "Beginner" ? "bg-[var(--neon-green)]/20 text-[var(--neon-green)]" : ""}
                        ${algorithm.difficulty === "Intermediate" ? "bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)]" : ""}
                        ${algorithm.difficulty === "Advanced" ? "bg-[var(--neon-pink)]/20 text-[var(--neon-pink)]" : ""}
                        ${algorithm.difficulty === "Expert" ? "bg-[var(--neon-purple)]/20 text-[var(--neon-purple)]" : ""}
                        border-0 ml-2
                      `}>
                                                    {algorithm.difficulty}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                                {algorithm.description}
                                            </p>
                                            {algorithm.paradigm && (
                                                <Badge variant="outline" className="text-xs">
                                                    {algorithm.paradigm}
                                                </Badge>
                                            )}
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {filteredAlgorithms.length === 0 && !isLoading && (
                        <div className="text-center py-12 text-muted-foreground">
                            No algorithms found matching your criteria.
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
