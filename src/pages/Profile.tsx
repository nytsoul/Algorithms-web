import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate, useLocation } from "react-router";
import { useState } from "react";
import { User, Mail, Calendar, Award, BarChart3, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function Profile() {
    const { isAuthenticated, user, signOut } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    if (!isAuthenticated) {
        navigate("/auth", { replace: true });
        return null;
    }

    const handleLogout = async () => {
        await signOut();
    };

    return (
        <div className="w-full min-h-screen bg-background relative overflow-hidden flex">
            {/* Sidebar */}
            {sidebarOpen && <Sidebar onLogout={handleLogout} />}

            {/* Main Content */}
            <div className={`flex-1 ${sidebarOpen ? "ml-80" : ""} flex flex-col transition-all duration-300`}>
                <div className="fixed inset-0 cyber-grid pointer-events-none" />
                <div className="scanline fixed inset-0 pointer-events-none" />

                {/* Header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Main Content */}
                <main className="relative z-10 flex-1 overflow-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="w-full px-6 py-8 max-w-4xl"
                    >
                        {/* Profile Header Card */}
                        <Card className="mb-8 border-border/50 bg-card/30 backdrop-blur p-8">
                            <div className="flex items-start gap-8">
                                <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] flex items-center justify-center flex-shrink-0">
                                    <User className="w-12 h-12 text-background" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold mb-2">{user?.user_metadata?.full_name || "User"}</h2>
                                    <p className="text-muted-foreground mb-4 flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        {user?.email}
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-border/50 text-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/10"
                                        >
                                            Edit Profile
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                                            onClick={handleLogout}
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <Card className="border-border/50 bg-card/30 backdrop-blur p-6">
                                <div className="flex items-center gap-4">
                                    <Award className="w-8 h-8 text-[var(--neon-cyan)]" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Problems Solved</p>
                                        <p className="text-2xl font-bold">0</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-border/50 bg-card/30 backdrop-blur p-6">
                                <div className="flex items-center gap-4">
                                    <BarChart3 className="w-8 h-8 text-[var(--neon-purple)]" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Current Streak</p>
                                        <p className="text-2xl font-bold">0 days</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-border/50 bg-card/30 backdrop-blur p-6">
                                <div className="flex items-center gap-4">
                                    <Calendar className="w-8 h-8 text-[var(--neon-pink)]" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Joined</p>
                                        <p className="text-2xl font-bold">Today</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Account Information */}
                        <Card className="border-border/50 bg-card/30 backdrop-blur p-6">
                            <h3 className="text-xl font-bold mb-6">Account Information</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">User ID</label>
                                        <p className="font-mono text-sm bg-background/50 p-3 rounded border border-border/30">
                                            {user?.id}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">Email</label>
                                        <p className="font-mono text-sm bg-background/50 p-3 rounded border border-border/30">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-muted-foreground mb-2">Auth Provider</label>
                                    <p className="font-mono text-sm bg-background/50 p-3 rounded border border-border/30">
                                        {user?.app_metadata?.provider === "google" ? "Google" : "Email/Password"}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
