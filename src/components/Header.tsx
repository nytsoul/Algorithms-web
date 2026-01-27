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
            <div className="w-full px-3 sm:px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-[var(--neon-cyan)] shrink-0"
                    >
                        {sidebarOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
                    </Button>
                    <Link to="/" className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center shrink-0">
                            <Code2 className="w-4 h-4 sm:w-6 sm:h-6 text-background" />
                        </div>
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)] bg-clip-text text-transparent whitespace-nowrap">
                            AlgoVerse
                        </h1>
                    </Link>
                </div>
                <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
                    <Link to="/dashboard">
                        <Button variant="ghost" className="text-[var(--neon-cyan)] text-sm">Dashboard</Button>
                    </Link>
                    <Link to="/benchmark">
                        <Button variant="ghost" className="text-[var(--neon-cyan)] text-sm">Benchmark</Button>
                    </Link>
                    <Link to="/recommend">
                        <Button variant="ghost" className="text-[var(--neon-cyan)] text-sm">AI Recommend</Button>
                    </Link>
                    <Link to="/learn">
                        <Button variant="ghost" className="text-[var(--neon-cyan)] text-sm">Learn</Button>
                    </Link>
                    <Link to="/visualize">
                        <Button variant="ghost" className="text-[var(--neon-cyan)] text-sm">Visualize</Button>
                    </Link>
                </nav>
            </div>
        </motion.header>
    );
}
