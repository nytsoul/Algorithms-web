import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { Link } from "react-router";
import {
  Code2,
  Zap,
  Target,
  Brain,
  LineChart,
  Rocket,
  Shield,
  GitBranch,
  Cpu,
  Lock,
  Database,
  Network,
  Moon,
  Sun,
  ChevronRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Landing() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const features = [
    {
      icon: Code2,
      title: "1000+ Algorithms",
      description: "Cross-domain repository covering DSA, AI, ML, Networks, Security, Graphics",
      color: "text-[var(--neon-cyan)]",
    },
    {
      icon: Zap,
      title: "Interactive Visualization",
      description: "Step-by-step execution with dynamic state transitions and animations",
      color: "text-[var(--neon-pink)]",
    },
    {
      icon: LineChart,
      title: "Real-Time Benchmarking",
      description: "Performance analysis with time, space, and scalability metrics",
      color: "text-[var(--neon-purple)]",
    },
    {
      icon: Brain,
      title: "AI Recommendation",
      description: "Intelligent algorithm selection based on constraints and requirements",
      color: "text-[var(--neon-green)]",
    },
    {
      icon: Shield,
      title: "Security Analysis",
      description: "Vulnerability detection and worst-case performance profiling",
      color: "text-[var(--neon-yellow)]",
    },
    {
      icon: Target,
      title: "Adaptive Learning",
      description: "Personalized paths from beginner to advanced with guided tutorials",
      color: "text-[var(--neon-cyan)]",
    },
  ];

  const domains = [
    { name: "Data Structures", icon: Database, count: "150+" },
    { name: "Algorithm Design", icon: GitBranch, count: "200+" },
    { name: "Artificial Intelligence", icon: Brain, count: "180+" },
    { name: "Machine Learning", icon: TrendingUp, count: "160+" },
    { name: "Networks", icon: Network, count: "120+" },
    { name: "Security", icon: Lock, count: "90+" },
    { name: "Systems", icon: Cpu, count: "80+" },
    { name: "Graphics", icon: Sparkles, count: "70+" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="fixed inset-0 cyber-grid pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      {/* Scanline Effect */}
      <div className="scanline fixed inset-0 pointer-events-none" />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-50 border-b border-border/50 backdrop-blur-xl bg-background/80"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 rounded bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center">
              <Code2 className="w-6 h-6 text-background" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)] bg-clip-text text-transparent">
              AlgoVerse
            </h1>
          </motion.div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative group"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-[var(--neon-yellow)]" />
              ) : (
                <Moon className="w-5 h-5 text-[var(--neon-purple)]" />
              )}
              <div className="absolute inset-0 bg-[var(--neon-cyan)]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] text-background hover:opacity-90 transition-opacity">
                {t('landing.get_started')}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6"
            >
              <div className="px-6 py-2 rounded-full border border-[var(--neon-cyan)]/30 bg-[var(--neon-cyan)]/5 backdrop-blur-sm">
                <span className="text-sm font-medium text-[var(--neon-cyan)]">
                  🏆 Finalist Project - Algorithm Intelligence Platform
                </span>
              </div>
            </motion.div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-pink)] bg-clip-text text-transparent">
                Unified Algorithm
              </span>
              <br />
              <span className="text-foreground">Intelligence Platform</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Explore, visualize, and benchmark{" "}
              <span className="text-[var(--neon-pink)] font-semibold">1000+ algorithms</span>{" "}
              across multiple domains with{" "}
              <span className="text-[var(--neon-cyan)] font-semibold">AI-powered recommendations</span>
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] text-background hover:opacity-90 text-lg px-8 py-6 relative group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <Rocket className="w-5 h-5 mr-2" />
                    Explore Algorithms
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-purple)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
              <Link to="/visualize">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[var(--neon-cyan)] text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10 text-lg px-8 py-6"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Live Visualization
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Animated Feature Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <Card className="cyber-card p-6 h-full relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-[var(--neon-cyan)]/50 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--neon-cyan)]/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                  <feature.icon className={`w-12 h-12 mb-4 ${feature.color} relative z-10`} />
                  <h3 className="text-xl font-bold mb-2 text-foreground relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground relative z-10">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Domain Coverage */}
      <section className="relative z-10 py-20 px-6 border-t border-border/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-purple)] bg-clip-text text-transparent">
                Multi-Domain Coverage
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Watch 1000+ algorithms come to life with step-by-step interactive visualization
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {domains.map((domain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="p-6 text-center cyber-card bg-card/30 backdrop-blur-sm border-border/50 hover:border-[var(--neon-pink)]/50 transition-all">
                  <domain.icon className="w-8 h-8 mx-auto mb-3 text-[var(--neon-cyan)]" />
                  <h3 className="font-semibold mb-1 text-foreground">{domain.name}</h3>
                  <p className="text-2xl font-bold text-[var(--neon-pink)]">{domain.count}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="cyber-card p-12 text-center relative overflow-hidden bg-gradient-to-br from-[var(--neon-cyan)]/10 via-[var(--neon-purple)]/10 to-[var(--neon-pink)]/10 border-[var(--neon-cyan)]/30">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--neon-cyan)]/5 to-[var(--neon-pink)]/5 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">
              <span className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)] bg-clip-text text-transparent">
                Ready to Master Algorithms?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 relative z-10">
              Join the future of algorithm learning and optimization
            </p>
            <Link to="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] text-background hover:opacity-90 text-lg px-12 py-6 relative z-10"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Exploring Now
              </Button>
            </Link>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/30 py-8 px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>© 2026 AlgoVerse - Unified Algorithm Intelligence Platform</p>
          <p className="text-sm mt-2">
            Bridging the gap between algorithm theory and real-world application
          </p>
        </div>
      </footer>
    </div>
  );
}
