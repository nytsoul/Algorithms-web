import { motion } from "framer-motion";
import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  BookOpen,
  Map,
  Code2,
  Zap,
  TrendingUp,
  Award,
  Settings,
  User,
  LogOut,
  ChevronRight,
  Sparkles,
  Target,
  GraduationCap,
  Box,
  Brain
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface SidebarProps {
  onLogout: () => void;
  isOpen?: boolean;
}

export function Sidebar({ onLogout, isOpen = true }: SidebarProps) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(["main"]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  const navSections = [
    {
      id: "main",
      title: "Main",
      items: [
        { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
        { icon: Map, label: "Domains", path: "/domains" },
      ]
    },
    {
      id: "learning",
      title: "Learning",
      items: [
        { icon: GraduationCap, label: "Learn", path: "/learn" },
        { icon: Target, label: "Adaptive Learning", path: "/adaptive" },
        { icon: Sparkles, label: "Recommendations", path: "/recommend" },
      ]
    },
    {
      id: "tools",
      title: "Tools",
      items: [
        { icon: Brain, label: "Decision Engine", path: "/decision-engine" },
        { icon: Code2, label: "Playground", path: "/playground" },
        { icon: Zap, label: "Visualize", path: "/visualize" },
        { icon: TrendingUp, label: "Benchmark", path: "/benchmark" },
        { icon: Award, label: "Compare", path: "/compare" },
      ]
    },
    {
      id: "account",
      title: "Account",
      items: [
        { icon: User, label: "Profile", path: "/profile" },
        { icon: Settings, label: "Settings", path: "/settings" },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {}}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
      
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-screen w-64 sm:w-72 lg:w-80 bg-card/50 backdrop-blur-xl border-r border-border/50 z-40 flex flex-col"
      >
        {/* Logo */}
        <div className="p-4 sm:p-5 lg:p-6 border-b border-border/50 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center">
              <Code2 className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-background" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-pink)] bg-clip-text text-transparent">
                AlgoVerse
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Algorithm Hub</p>
            </div>
          </Link>
        </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto p-2 sm:p-3 lg:p-4 space-y-4 sm:space-y-5 lg:space-y-6 scrollbar-thin scrollbar-thumb-border/50 scrollbar-track-transparent">
        {navSections.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => toggleSection(section.id)}
              className="flex items-center justify-between w-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors"
            >
              {section.title}
              <ChevronRight
                className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${expandedSections.includes(section.id) ? 'rotate-90' : ''}`}
              />
            </button>

            {expandedSections.includes(section.id) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2 space-y-1"
              >
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`
                        flex items-center gap-2 sm:gap-2.5 lg:gap-3 px-2 sm:px-3 lg:px-4 py-2 sm:py-2.5 rounded-lg transition-all
                        ${active
                          ? 'bg-[var(--neon-cyan)]/10 text-[var(--neon-cyan)] border border-[var(--neon-cyan)]/30'
                          : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 shrink-0 flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium leading-none">{item.label}</span>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </div>
        ))}
      </nav>

      {/* Logout Button - Fixed at bottom */}
      <div className="flex-shrink-0 p-2 sm:p-3 lg:p-4 border-t border-border/50 bg-card/80 backdrop-blur-xl">
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full justify-start gap-2 sm:gap-2.5 lg:gap-3 border-destructive/50 text-destructive hover:bg-destructive/10 text-xs sm:text-sm py-2"
        >
          <LogOut className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
          Logout
        </Button>
      </div>
    </motion.aside>
    </>
  );
}
