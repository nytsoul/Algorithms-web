import { motion, useScroll, useTransform } from "framer-motion";
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
  Play,
  BookOpen,
  Users,
  Award,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Star,
  Trophy,
  Flame,
  Activity,
  Layers,
  Timer,
  Gauge,
  GraduationCap,
  MessageSquare,
  Video,
  FileCode,
  Briefcase,
  Coffee,
  Heart,
  ThumbsUp,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useState, useEffect } from "react";

export default function Landing() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const [activeFeature, setActiveFeature] = useState(0);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Code2,
      title: "1000+ Algorithms 💻",
      description: "Cross-domain repository covering DSA, AI, ML, Networks, Security, Graphics",
      color: "text-[var(--neon-cyan)]",
      bgColor: "bg-[var(--neon-cyan)]/10",
      borderColor: "border-[var(--neon-cyan)]/30",
      stats: "11 Domains",
      emoji: "🚀",
    },
    {
      icon: Zap,
      title: "Interactive Visualization ⚡",
      description: "Step-by-step execution with dynamic state transitions and animations",
      color: "text-[var(--neon-pink)]",
      bgColor: "bg-[var(--neon-pink)]/10",
      borderColor: "border-[var(--neon-pink)]/30",
      stats: "Real-time",
      emoji: "✨",
    },
    {
      icon: LineChart,
      title: "Real-Time Benchmarking 📊",
      description: "Performance analysis with time, space, and scalability metrics",
      color: "text-[var(--neon-purple)]",
      bgColor: "bg-[var(--neon-purple)]/10",
      borderColor: "border-[var(--neon-purple)]/30",
      stats: "Live Metrics",
      emoji: "📈",
    },
    {
      icon: Brain,
      title: "AI Recommendation 🤖",
      description: "Intelligent algorithm selection based on constraints and requirements",
      color: "text-[var(--neon-green)]",
      bgColor: "bg-[var(--neon-green)]/10",
      borderColor: "border-[var(--neon-green)]/30",
      stats: "Smart AI",
      emoji: "🧠",
    },
    {
      icon: Shield,
      title: "Security Analysis 🔒",
      description: "Vulnerability detection and worst-case performance profiling",
      color: "text-[var(--neon-yellow)]",
      bgColor: "bg-[var(--neon-yellow)]/10",
      borderColor: "border-[var(--neon-yellow)]/30",
      stats: "Protected",
      emoji: "🛡️",
    },
    {
      icon: Target,
      title: "Adaptive Learning 🎯",
      description: "Personalized paths from beginner to advanced with guided tutorials",
      color: "text-[var(--neon-cyan)]",
      bgColor: "bg-[var(--neon-cyan)]/10",
      borderColor: "border-[var(--neon-cyan)]/30",
      stats: "Personalized",
      emoji: "📚",
    },
  ];

  const domains = [
    { name: "Data Structures", icon: Database, count: "95", color: "cyan" },
    { name: "Algorithm Design", icon: GitBranch, count: "105", color: "pink" },
    { name: "Artificial Intelligence", icon: Brain, count: "100", color: "purple" },
    { name: "Machine Learning", icon: TrendingUp, count: "105", color: "green" },
    { name: "Networks", icon: Network, count: "95", color: "yellow" },
    { name: "Security", icon: Lock, count: "100", color: "cyan" },
    { name: "Systems", icon: Cpu, count: "95", color: "pink" },
    { name: "Graphics", icon: Sparkles, count: "105", color: "purple" },
    { name: "Theory", icon: BookOpen, count: "68", color: "green" },
    { name: "Emerging Tech", icon: Rocket, count: "85", color: "yellow" },
    { name: "Web Dev", icon: Code2, count: "47", color: "cyan" },
  ];

  const stats = [
    { icon: Code2, label: "Algorithms", value: "1000+", color: "cyan" },
    { icon: Users, label: "Active Learners", value: "10K+", color: "pink" },
    { icon: BookOpen, label: "Tutorials", value: "500+", color: "purple" },
    { icon: Award, label: "Success Rate", value: "94%", color: "green" },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer @ Google",
      content: "AlgoVerse helped me ace my technical interviews. The visualizations made complex algorithms crystal clear!",
      avatar: "🧑‍💻",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "CS Student @ MIT",
      content: "Best algorithm learning platform I've used. The AI recommendations are spot-on for my skill level.",
      avatar: "👨‍🎓",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Tech Lead @ Amazon",
      content: "The benchmarking tools are invaluable for optimizing production code. A must-have for every developer.",
      avatar: "👩‍💼",
      rating: 5,
    },
  ];

  const extraFeatures = [
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Learn from expert-led video courses",
      emoji: "🎬",
      colorClass: "text-[var(--neon-cyan)]",
      bgClass: "from-[var(--neon-cyan)]/5",
      borderClass: "hover:border-[var(--neon-cyan)]/50",
      glowClass: "bg-[var(--neon-cyan)]/20",
    },
    {
      icon: FileCode,
      title: "Code Playground",
      description: "Test algorithms in real-time",
      emoji: "⚙️",
      colorClass: "text-[var(--neon-pink)]",
      bgClass: "from-[var(--neon-pink)]/5",
      borderClass: "hover:border-[var(--neon-pink)]/50",
      glowClass: "bg-[var(--neon-pink)]/20",
    },
    {
      icon: GraduationCap,
      title: "Certification",
      description: "Earn verified certificates",
      emoji: "🎓",
      colorClass: "text-[var(--neon-purple)]",
      bgClass: "from-[var(--neon-purple)]/5",
      borderClass: "hover:border-[var(--neon-purple)]/50",
      glowClass: "bg-[var(--neon-purple)]/20",
    },
    {
      icon: Users,
      title: "Community",
      description: "Join 10K+ developers",
      emoji: "👥",
      colorClass: "text-[var(--neon-green)]",
      bgClass: "from-[var(--neon-green)]/5",
      borderClass: "hover:border-[var(--neon-green)]/50",
      glowClass: "bg-[var(--neon-green)]/20",
    },
    {
      icon: Timer,
      title: "Daily Challenges",
      description: "Solve new problems daily",
      emoji: "⏱️",
      colorClass: "text-[var(--neon-yellow)]",
      bgClass: "from-[var(--neon-yellow)]/5",
      borderClass: "hover:border-[var(--neon-yellow)]/50",
      glowClass: "bg-[var(--neon-yellow)]/20",
    },
    {
      icon: Trophy,
      title: "Leaderboards",
      description: "Compete with peers globally",
      emoji: "🏆",
      colorClass: "text-[var(--neon-cyan)]",
      bgClass: "from-[var(--neon-cyan)]/5",
      borderClass: "hover:border-[var(--neon-cyan)]/50",
      glowClass: "bg-[var(--neon-cyan)]/20",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-background relative overflow-hidden">
      {/* Animated Cyberpunk Grid Background */}
      <div className="fixed inset-0 cyber-grid pointer-events-none opacity-40" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[var(--neon-cyan)] rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.3,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Scanline Effect */}
      <div className="scanline fixed inset-0 pointer-events-none" />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/90"
      >
        <div className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2 sm:gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center shadow-lg shadow-[var(--neon-cyan)]/20">
              <Code2 className="w-4 h-4 sm:w-6 sm:h-6 text-background" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)] bg-clip-text text-transparent">
                AlgoVerse
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">Algorithm Intelligence</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative group"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--neon-yellow)]" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--neon-purple)]" />
              )}
              <div className="absolute inset-0 bg-[var(--neon-cyan)]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <LanguageSwitcher />
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] text-background hover:opacity-90 transition-opacity text-xs sm:text-sm px-3 sm:px-4">
                {t('landing.get_started')}
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="w-full max-w-7xl mx-auto">
          <motion.div
            style={{ opacity, scale }}
            className="text-center mb-12 sm:mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6 sm:mb-8"
            >
              <Badge className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium bg-gradient-to-r from-[var(--neon-cyan)]/20 to-[var(--neon-purple)]/20 border-[var(--neon-cyan)]/40 text-[var(--neon-cyan)] backdrop-blur-sm">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-2 inline" />
                🏆 Award-Winning Algorithm Platform
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-pink)] bg-clip-text text-transparent animate-gradient">
                Master Algorithms
              </span>
              <br />
              <span className="text-foreground">Visualize. Learn. Optimize.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4"
            >
              Unlock the power of{" "}
              <motion.span
                className="text-[var(--neon-pink)] font-semibold inline-block"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                1000+ algorithms
              </motion.span>{" "}
              across 11 domains with{" "}
              <span className="text-[var(--neon-cyan)] font-semibold">AI-powered</span> recommendations,{" "}
              <span className="text-[var(--neon-purple)] font-semibold">real-time</span> visualization, and{" "}
              <span className="text-[var(--neon-green)] font-semibold">adaptive</span> learning paths
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            >
              <Link to="/dashboard" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] text-background hover:shadow-lg hover:shadow-[var(--neon-cyan)]/50 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 relative group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Start Exploring
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-purple)]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </Link>
              <Link to="/visualize" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-[var(--neon-cyan)]/50 text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Watch Demo
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <Card className="p-4 sm:p-6 bg-card/30 backdrop-blur-sm border-border/50 hover:border-[var(--neon-cyan)]/50 transition-all">
                  <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-[var(--neon-${stat.color})]`} />
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)] bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-transparent to-card/20">
        <div className="w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge className="mb-4 bg-[var(--neon-purple)]/10 text-[var(--neon-purple)] border-[var(--neon-purple)]/30">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Platform Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent">
                Everything You Need
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive tools and resources for mastering algorithms at every level
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onHoverStart={() => setActiveFeature(index)}
                className="group cursor-pointer"
              >
                <Card className={`cyber-card p-4 sm:p-6 h-full relative overflow-hidden backdrop-blur-sm transition-all duration-300 ${
                  activeFeature === index
                    ? `${feature.bgColor} ${feature.borderColor} border-2 shadow-lg shadow-${feature.color}/20`
                    : "bg-card/40 border-border/50 hover:border-[var(--neon-cyan)]/30"
                }`}>
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 ${feature.bgColor} rounded-full blur-2xl`}
                    animate={activeFeature === index ? { scale: [1, 1.5, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Icon */}
                  <motion.div
                    animate={activeFeature === index ? { rotate: [0, 5, -5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className={`w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 ${feature.color} relative z-10`} />
                  </motion.div>

                  {/* Badge */}
                  <Badge variant="outline" className={`mb-2 sm:mb-3 ${feature.borderColor} ${feature.color} text-[10px] sm:text-xs`}>
                    {feature.stats}
                  </Badge>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground relative z-10">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground relative z-10 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Learn More Link */}
                  <motion.div
                    className={`mt-3 sm:mt-4 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${feature.color} font-medium relative z-10`}
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    Learn more <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Domain Coverage */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge className="mb-4 bg-[var(--neon-pink)]/10 text-[var(--neon-pink)] border-[var(--neon-pink)]/30">
              <Activity className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              11 Comprehensive Domains
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-purple)] bg-clip-text text-transparent">
                Complete Algorithm Coverage
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              1000 algorithms across every major computer science domain with interactive visualizations
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {domains.map((domain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.08, y: -5 }}
              >
                <Card className={`p-4 sm:p-6 text-center cyber-card bg-card/30 backdrop-blur-sm border-border/50 hover:border-[var(--neon-${domain.color})]/50 transition-all cursor-pointer`}>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <domain.icon className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-[var(--neon-${domain.color})]`} />
                  </motion.div>
                  <h3 className="font-semibold mb-1 text-foreground text-xs sm:text-sm">{domain.name}</h3>
                  <p className="text-xl sm:text-2xl font-bold text-[var(--neon-pink)]">{domain.count}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">algorithms</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Total Count Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-12 text-center"
          >
            <Card className="inline-block p-4 sm:p-6 bg-gradient-to-r from-[var(--neon-cyan)]/10 via-[var(--neon-purple)]/10 to-[var(--neon-pink)]/10 border-[var(--neon-cyan)]/30">
              <div className="flex items-center gap-3 sm:gap-4">
                <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--neon-pink)]" />
                <div className="text-left">
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)] bg-clip-text text-transparent">
                    1000+
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Algorithms & Growing</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-card/20 to-transparent">
        <div className="w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge className="mb-4 bg-[var(--neon-green)]/10 text-[var(--neon-green)] border-[var(--neon-green)]/30">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Loved by Developers
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-cyan)] bg-clip-text text-transparent">
                What People Say
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of developers who have transformed their algorithm skills
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="p-4 sm:p-6 h-full bg-card/40 backdrop-blur-sm border-border/50 hover:border-[var(--neon-cyan)]/50 transition-all">
                  {/* Stars */}
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[var(--neon-yellow)] text-[var(--neon-yellow)]" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-sm sm:text-base text-foreground mb-4 sm:mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 border-t border-border/30 pt-3 sm:pt-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center text-xl sm:text-2xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Features Section with Animated Cards */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-transparent via-card/10 to-transparent">
        <div className="w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <Badge className="mb-4 bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] border-[var(--neon-cyan)]/30">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              🎯 More Amazing Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-pink)] bg-clip-text text-transparent">
                Everything You Need to Excel ✨
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Powerful tools and resources designed to accelerate your algorithm mastery 🚀
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {extraFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              >
                <Card className={`p-6 h-full relative overflow-hidden bg-gradient-to-br ${feature.bgClass} to-transparent border-border/50 ${feature.borderClass} transition-all cursor-pointer group`}>
                  {/* Animated Glow Effect */}
                  <motion.div
                    className={`absolute -top-10 -right-10 w-32 h-32 ${feature.glowClass} rounded-full blur-3xl`}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Emoji Badge */}
                  <motion.div
                    className="text-4xl mb-4"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {feature.emoji}
                  </motion.div>

                  {/* Icon */}
                  <feature.icon className={`w-10 h-10 mb-3 ${feature.colorClass} relative z-10`} />

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground relative z-10">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground relative z-10">
                    {feature.description}
                  </p>

                  {/* Hover Arrow */}
                  <motion.div
                    className={`mt-3 flex items-center gap-2 text-sm font-medium ${feature.colorClass} relative z-10`}
                    initial={{ x: -5, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                  >
                    Explore <ArrowRight className="w-4 h-4" />
                  </motion.div>

                  {/* Particle Effect on Hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-2 h-2 ${feature.glowClass} rounded-full`}
                        initial={{
                          x: "50%",
                          y: "50%",
                          scale: 0,
                        }}
                        whileHover={{
                          x: `${Math.random() * 100}%`,
                          y: `${Math.random() * 100}%`,
                          scale: 1,
                          opacity: 0,
                        }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link to="/dashboard">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] text-background hover:shadow-2xl hover:shadow-[var(--neon-cyan)]/50 px-8 py-6"
              >
                <Rocket className="w-5 h-5 mr-2" />
                🚀 Unlock All Features
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Card className="cyber-card p-8 sm:p-12 md:p-16 text-center relative overflow-hidden bg-gradient-to-br from-[var(--neon-cyan)]/10 via-[var(--neon-purple)]/10 to-[var(--neon-pink)]/10 border-2 border-[var(--neon-cyan)]/30">
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[var(--neon-cyan)]/5 to-[var(--neon-pink)]/5"
              animate={{
                background: [
                  "linear-gradient(to right, var(--neon-cyan)/5, var(--neon-pink)/5)",
                  "linear-gradient(to right, var(--neon-pink)/5, var(--neon-purple)/5)",
                  "linear-gradient(to right, var(--neon-purple)/5, var(--neon-cyan)/5)",
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <Badge className="mb-4 sm:mb-6 bg-[var(--neon-cyan)]/20 text-[var(--neon-cyan)] border-[var(--neon-cyan)]/40 text-xs sm:text-sm">
                  <Rocket className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Start Your Journey Today
                </Badge>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-pink)] bg-clip-text text-transparent">
                  Master Algorithms,
                </span>
                <br />
                <span className="text-foreground">Transform Your Career</span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of developers mastering algorithms through interactive visualization, 
                AI-powered recommendations, and adaptive learning paths
              </p>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-3xl mx-auto">
                {[
                  { icon: CheckCircle, text: "1000+ Algorithms" },
                  { icon: Lightbulb, text: "AI-Powered Learning" },
                  { icon: Trophy, text: "Track Progress" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 justify-center"
                  >
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--neon-green)]" />
                    <span className="text-sm sm:text-base text-foreground font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] text-background hover:shadow-2xl hover:shadow-[var(--neon-cyan)]/50 text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 relative overflow-hidden group"
                  >
                    <motion.span
                      className="relative z-10 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Rocket className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Get Started Free
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-purple)]"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </Link>
                <Link to="/learn" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-[var(--neon-cyan)]/50 text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10 text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6"
                  >
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Explore Learning
                  </Button>
                </Link>
              </div>

              {/* Trust Badge */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6"
              >
                ✨ No credit card required • Free forever plan • Cancel anytime
              </motion.p>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/30 py-8 sm:py-12 px-4 sm:px-6 bg-card/20">
        <div className="w-full px-4 sm:px-6 lg:px-8">{/* Full-width footer container */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)] bg-clip-text text-transparent">
                    AlgoVerse
                  </h3>
                  <p className="text-xs text-muted-foreground">Algorithm Intelligence Platform</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 max-w-md">
                Empowering developers worldwide with comprehensive algorithm education, 
                visualization tools, and AI-powered learning paths.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Github, label: "GitHub" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Linkedin, label: "LinkedIn" },
                ].map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className="border-border/50 hover:border-[var(--neon-cyan)]/50 hover:bg-[var(--neon-cyan)]/10"
                  >
                    <social.icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/dashboard" className="hover:text-[var(--neon-cyan)] transition-colors">Dashboard</Link></li>
                <li><Link to="/visualize" className="hover:text-[var(--neon-cyan)] transition-colors">Visualize</Link></li>
                <li><Link to="/learn" className="hover:text-[var(--neon-cyan)] transition-colors">Learn</Link></li>
                <li><Link to="/benchmark" className="hover:text-[var(--neon-cyan)] transition-colors">Benchmark</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/docs" className="hover:text-[var(--neon-cyan)] transition-colors">Documentation</Link></li>
                <li><Link to="/tutorials" className="hover:text-[var(--neon-cyan)] transition-colors">Tutorials</Link></li>
                <li><Link to="/blog" className="hover:text-[var(--neon-cyan)] transition-colors">Blog</Link></li>
                <li><Link to="/support" className="hover:text-[var(--neon-cyan)] transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 AlgoVerse. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-[var(--neon-cyan)] transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-[var(--neon-cyan)] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Note: Add these icon imports at the top if not present
const Github = (props: any) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
const Twitter = (props: any) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const Linkedin = (props: any) => <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
