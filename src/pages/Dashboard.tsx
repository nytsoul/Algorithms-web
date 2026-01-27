import { motion } from "framer-motion";
import { useAlgorithms } from "@/hooks/use-algorithms";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Header } from "@/components/Header";
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
    WifiOff,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SupabaseSeeder } from "@/components/SupabaseSeeder";
import { Sidebar } from "@/components/Sidebar";
import { isSupabaseConfigured, isSupabaseAvailable } from "@/lib/supabase";
import { ALGORITHM_DOMAINS } from "@/lib/domains";

export default function Dashboard() {
    const { algorithms, isLoading: algorithmsLoading } = useAlgorithms();
    const { isAuthenticated, user, signOut, isLoading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDomain, setSelectedDomain] = useState("all");
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Only redirect to auth if we've finished loading and user is not authenticated
    if (!authLoading && !isAuthenticated) {
        navigate("/auth", { replace: true });
        return null;
    }

    // Get domains that have algorithms
    const domainsWithAlgorithms = ALGORITHM_DOMAINS.filter(d => d.count > 0);

    const domains = domainsWithAlgorithms.map(d => d.name);

    const difficulties = ["Beginner", "Intermediate", "Advanced", "Expert"];

    const filteredAlgorithms = algorithms?.filter(algo => {
        const matchesSearch =
            algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            algo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (algo.tags && algo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

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

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <div className="w-full min-h-screen bg-background relative overflow-hidden flex">
            {/* Sidebar */}
            <Sidebar onLogout={handleLogout} isOpen={sidebarOpen} />

            {/* Main Content */}
            <div className={`flex-1 ${sidebarOpen ? "lg:ml-80 md:ml-72 sm:ml-64" : "ml-0"} flex flex-col transition-all duration-300`}>
                <div className="fixed inset-0 cyber-grid pointer-events-none" />
                <div className="scanline fixed inset-0 pointer-events-none" />

                {/* Header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                {/* Main Content */}
                <main className="relative z-10 w-full px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
                    {/* Hero Section */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                        <h1 className="text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)] bg-clip-text text-transparent">
                                Algorithm Explorer
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Discover and explore 1000 algorithms across 11 CS domains
                        </p>
                    </motion.div>

                    {/* Database Seeder (Visible for development) */}
                    <div className="mb-8">
                        <SupabaseSeeder />
                    </div>

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
                                        <SelectItem value="all">All Domains ({domainsWithAlgorithms.length})</SelectItem>
                                        {domainsWithAlgorithms.map(domainObj => (
                                            <SelectItem key={domainObj.id} value={domainObj.name}>
                                                {domainObj.icon} {domainObj.name}
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
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
                    >
                        {/* Total Algorithms Card */}
                        <motion.div
                            whileHover={{ scale: 1.02, y: -4 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Card className="relative overflow-hidden border-border/30 bg-gradient-to-br from-[var(--neon-cyan)]/10 via-card/50 to-card/30 backdrop-blur-xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--neon-cyan)]/5 rounded-full blur-3xl" />
                                <div className="relative p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)]/20">
                                            <Code2 className="w-6 h-6 text-[var(--neon-cyan)]" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-2">Total Algorithms</p>
                                        <p className="text-4xl font-bold text-[var(--neon-cyan)] mb-1">
                                            {algorithms?.length || 0}
                                        </p>
                                        <p className="text-xs text-muted-foreground">Across {domainsWithAlgorithms.length} domains</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Domains Card */}
                        <motion.div
                            whileHover={{ scale: 1.02, y: -4 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Card className="relative overflow-hidden border-border/30 bg-gradient-to-br from-[var(--neon-pink)]/10 via-card/50 to-card/30 backdrop-blur-xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--neon-pink)]/5 rounded-full blur-3xl" />
                                <div className="relative p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-[var(--neon-pink)]/10 border border-[var(--neon-pink)]/20">
                                            <BookOpen className="w-6 h-6 text-[var(--neon-pink)]" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-2">Domains</p>
                                        <p className="text-4xl font-bold text-[var(--neon-pink)] mb-1">
                                            {domainsWithAlgorithms.length}
                                        </p>
                                        <p className="text-xs text-muted-foreground">CS categories</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Filtered Results Card */}
                        <motion.div
                            whileHover={{ scale: 1.02, y: -4 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Card className="relative overflow-hidden border-border/30 bg-gradient-to-br from-[var(--neon-purple)]/10 via-card/50 to-card/30 backdrop-blur-xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--neon-purple)]/5 rounded-full blur-3xl" />
                                <div className="relative p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-[var(--neon-purple)]/10 border border-[var(--neon-purple)]/20">
                                            <Filter className="w-6 h-6 text-[var(--neon-purple)]" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-2">Filtered Results</p>
                                        <p className="text-4xl font-bold text-[var(--neon-purple)] mb-1">
                                            {filteredAlgorithms?.length || 0}
                                        </p>
                                        <p className="text-xs text-muted-foreground">Matching criteria</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Visualizations Card */}
                        <motion.div
                            whileHover={{ scale: 1.02, y: -4 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Card className="relative overflow-hidden border-border/30 bg-gradient-to-br from-[var(--neon-green)]/10 via-card/50 to-card/30 backdrop-blur-xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--neon-green)]/5 rounded-full blur-3xl" />
                                <div className="relative p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 rounded-xl bg-[var(--neon-green)]/10 border border-[var(--neon-green)]/20">
                                            <Zap className="w-6 h-6 text-[var(--neon-green)]" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-2">Visualizations</p>
                                        <p className="text-4xl font-bold text-[var(--neon-green)] mb-1">∞</p>
                                        <p className="text-xs text-muted-foreground">Interactive demos</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </motion.div>

                    {/* Algorithm Grid Organized by Domain */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {
                            algorithmsLoading ? (
                                <div className="text-center py-12" >
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
                                <div className="space-y-12">
                                    {domainsWithAlgorithms.map(domainObj => {
                                        const domainAlgorithms = filteredAlgorithms?.filter(algo => algo.domain === domainObj.name) || [];
                                        if (domainAlgorithms.length === 0) return null;

                                        return (
                                            <motion.div
                                                key={domainObj.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 }}
                                                className="space-y-4"
                                            >
                                                {/* Domain Header */}
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/30 to-transparent" />
                                                    <div className="text-center">
                                                        <div className="text-4xl mb-2">{domainObj.icon}</div>
                                                        <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent">
                                                            {domainObj.name}
                                                        </h2>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {domainAlgorithms.length} algorithm{domainAlgorithms.length !== 1 ? 's' : ''}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground/70 mt-2 max-w-xs">
                                                            {domainObj.description}
                                                        </p>
                                                        <Link to={`/domain/${domainObj.id}`}>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="mt-3 text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10"
                                                            >
                                                                View All <ChevronRight className="w-3 h-3 ml-1" />
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--neon-cyan)]/30 to-transparent" />
                                                </div>

                                                {/* Algorithms for this domain */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {domainAlgorithms.map((algo, index) => (
                                                        <motion.div
                                                            key={`${domainObj.id}-${algo.slug}-${index}`}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.5 + index * 0.03 }}
                                                            whileHover={{ scale: 1.02, y: -5 }}
                                                        >
                                                            <Card className="cyber-card p-6 h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-[var(--neon-cyan)]/50 transition-all group">
                                                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--neon-cyan)]/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform" />

                                                                <div className="flex items-start justify-between mb-4 relative z-10">
                                                                    <div className="flex-1">
                                                                        <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-[var(--neon-cyan)] transition-colors line-clamp-2">
                                                                            {algo.name}
                                                                        </h3>
                                                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                                            <Badge
                                                                                variant="outline"
                                                                                className={`${getDifficultyColor(algo.difficulty)} border text-xs`}
                                                                            >
                                                                                {algo.difficulty}
                                                                            </Badge>
                                                                            <Badge variant="outline" className="border-[var(--neon-pink)]/30 text-xs">
                                                                                {algo.category}
                                                                            </Badge>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 relative z-10">
                                                                    {algo.description}
                                                                </p>

                                                                <div className="space-y-2 mb-4 text-xs relative z-10">
                                                                    <div className="flex items-center gap-2">
                                                                        <Clock className="w-3 h-3 text-[var(--neon-cyan)]" />
                                                                        <span className="text-muted-foreground">
                                                                            Avg: <span className="text-[var(--neon-cyan)]">{algo.timeComplexity?.average || 'N/A'}</span>
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <TrendingUp className="w-3 h-3 text-[var(--neon-pink)]" />
                                                                        <span className="text-muted-foreground">
                                                                            Space: <span className="text-[var(--neon-pink)]">{algo.spaceComplexity || 'O(n)'}</span>
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div className="flex flex-wrap gap-1 mb-4 relative z-10">
                                                                    {(algo.tags && algo.tags.slice(0, 2)).map((tag, i) => (
                                                                        <Badge key={`${tag}-${i}`} variant="secondary" className="text-xs bg-secondary/30">
                                                                            {tag}
                                                                        </Badge>
                                                                    ))}
                                                                    {algo.tags && algo.tags.length > 2 && (
                                                                        <Badge variant="secondary" className="text-xs bg-secondary/30">
                                                                            +{algo.tags.length - 2}
                                                                        </Badge>
                                                                    )}
                                                                </div>

                                                                <div className="flex gap-2 relative z-10">
                                                                    <Link to={`/algorithm/${algo.slug}`} className="flex-1">
                                                                        <Button
                                                                            variant="ghost"
                                                                            className="w-full justify-between text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10"
                                                                        >
                                                                            View Details
                                                                            <ChevronRight className="w-4 h-4" />
                                                                        </Button>
                                                                    </Link>
                                                                    <Link to={`/visualize?algo=${algo.slug}`} className="flex-1">
                                                                        <Button
                                                                            variant="ghost"
                                                                            className="w-full justify-between text-[var(--neon-green)] hover:bg-[var(--neon-green)]/10"
                                                                        >
                                                                            Visualize
                                                                            <Zap className="w-4 h-4" />
                                                                        </Button>
                                                                    </Link>
                                                                </div>
                                                            </Card>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
