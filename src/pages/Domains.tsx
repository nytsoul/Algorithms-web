import { motion } from "framer-motion";
import { Link } from "react-router";
import { Code2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ALGORITHM_DOMAINS } from "@/lib/domains";
import { useAlgorithmsByDomain } from "@/hooks/use-algorithms";

export default function Domains() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDomain, setSelectedDomain] = useState<number | null>(null);

    const filteredDomains = ALGORITHM_DOMAINS.filter(domain =>
        domain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        domain.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        <Link to="/domains"><Button variant="ghost" className="text-[var(--neon-cyan)]">Domains</Button></Link>
                        <Link to="/visualize"><Button variant="ghost">Visualize</Button></Link>
                        <Link to="/benchmark"><Button variant="ghost">Benchmark</Button></Link>
                    </nav>
                </div>
            </motion.header>

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
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
    );
}
