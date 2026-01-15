// Header component with navigation links
import { motion } from "framer-motion";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { X, Menu, Code2, BookOpen, Map, TrendingUp, Zap } from "lucide-react";

export function Header({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="relative z-50 border-b border-border/50 backdrop-blur-xl bg-background/80"
        >
            <div className="w-full px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-[var(--neon-cyan)]"
                    >
                        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </Button>
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center">
                            <Code2 className="w-6 h-6 text-background" />
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)] bg-clip-text text-transparent">
                            AlgoVerse
                        </h1>
                    </Link>
                </div>
                <nav className="flex items-center gap-6">
                    <Link to="/dashboard">
                        <Button variant="ghost" className="text-[var(--neon-cyan)]">Dashboard</Button>
                    </Link>
                    <Link to="/benchmark">
                        <Button variant="ghost" className="text-[var(--neon-cyan)]">Benchmark</Button>
                    </Link>
                    <Link to="/recommend">
                        <Button variant="ghost" className="text-[var(--neon-cyan)]">AI Recommend</Button>
                    </Link>
                    <Link to="/learn">
                        <Button variant="ghost" className="text-[var(--neon-cyan)]">Learn</Button>
                    </Link>
                    <Link to="/visualize">
                        <Button variant="ghost" className="text-[var(--neon-cyan)]">Visualize</Button>
                    </Link>
                </nav>
            </div>
        </motion.header>
    );
}
