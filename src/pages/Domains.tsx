import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { Code2, Search, Filter, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ALGORITHM_DOMAINS } from "@/lib/domains";
import { useAlgorithmsByDomain } from "@/hooks/use-algorithms";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function Domains() {
    const navigate = useNavigate();
    const { isAuthenticated, signOut } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDomain, setSelectedDomain] = useState<number | null>(null);

    if (!isAuthenticated) {
        navigate("/auth", { replace: true });
        return null;
    }

    const handleLogout = async () => {
        await signOut();
    };

    const filteredDomains = ALGORITHM_DOMAINS.filter(domain =>
        domain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        domain.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                        <h1 className="text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] bg-clip-text text-transparent">Algorithm Domains</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">Explore 1000 algorithms across 48 specialized domains</p>
                    </motion.div>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder="Search domains..."
                                className="pl-10 border-border/50 bg-background/50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                        <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
                            <p className="text-sm text-muted-foreground mb-1">Total Domains</p>
                            <p className="text-3xl font-bold text-[var(--neon-cyan)]">{ALGORITHM_DOMAINS.length}</p>
                        </Card>
                        <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
                            <p className="text-sm text-muted-foreground mb-1">Total Algorithms</p>
                            <p className="text-3xl font-bold text-[var(--neon-pink)]">1000</p>
                        </Card>
                        <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
                            <p className="text-sm text-muted-foreground mb-1">Difficulty Levels</p>
                            <p className="text-3xl font-bold text-[var(--neon-green)]">4</p>
                        </Card>
                        <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm">
                            <p className="text-sm text-muted-foreground mb-1">Paradigms</p>
                            <p className="text-3xl font-bold text-[var(--neon-yellow)]">30+</p>
                        </Card>
                    </div>

                    {/* Domain Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDomains.map((domain, index) => (
                            <motion.div
                                key={domain.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link to={`/domain/${domain.id}`}>
                                    <Card className="cyber-card p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-[var(--neon-cyan)]/50 transition-all cursor-pointer group">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="text-4xl">{domain.icon}</div>
                                            <Badge className={`bg-[var(--neon-${domain.color})]/20 text-[var(--neon-${domain.color})] border-0`}>
                                                {domain.count} algorithms
                                            </Badge>
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[var(--neon-cyan)] transition">
                                            {domain.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {domain.description}
                                        </p>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
