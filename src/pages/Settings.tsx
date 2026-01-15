import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Settings, Bell, Shield, Palette, Menu, X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function SettingsPage() {
    const { isAuthenticated, signOut } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const [emailDigest, setEmailDigest] = useState(false);
    const [theme, setTheme] = useState("dark");

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
                        className="w-full px-6 py-8 max-w-2xl"
                    >
                        {/* Notifications */}
                        <Card className="mb-6 border-border/50 bg-card/30 backdrop-blur p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Bell className="w-5 h-5 text-[var(--neon-cyan)]" />
                                    <div>
                                        <h3 className="font-semibold">Notifications</h3>
                                        <p className="text-sm text-muted-foreground">Get alerts for important updates</p>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={notifications}
                                    onChange={(e) => setNotifications(e.target.checked)}
                                    className="w-5 h-5 rounded cursor-pointer"
                                />
                            </div>
                        </Card>

                        {/* Email Digest */}
                        <Card className="mb-6 border-border/50 bg-card/30 backdrop-blur p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-[var(--neon-purple)]" />
                                    <div>
                                        <h3 className="font-semibold">Email Digest</h3>
                                        <p className="text-sm text-muted-foreground">Weekly summary of your progress</p>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={emailDigest}
                                    onChange={(e) => setEmailDigest(e.target.checked)}
                                    className="w-5 h-5 rounded cursor-pointer"
                                />
                            </div>
                        </Card>

                        {/* Theme */}
                        <Card className="mb-6 border-border/50 bg-card/30 backdrop-blur p-6">
                            <div className="flex items-start gap-3 mb-4">
                                <Palette className="w-5 h-5 text-[var(--neon-pink)]" />
                                <div className="flex-1">
                                    <h3 className="font-semibold">Theme</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Choose your preferred theme</p>
                                    <div className="flex gap-2">
                                        {["dark", "light", "auto"].map((t) => (
                                            <Button
                                                key={t}
                                                variant={theme === t ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setTheme(t)}
                                                className={theme === t ? "bg-[var(--neon-cyan)] text-background hover:bg-[var(--neon-cyan)]/90" : ""}
                                            >
                                                {t.charAt(0).toUpperCase() + t.slice(1)}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Privacy & Security */}
                        <Card className="mb-6 border-border/50 bg-card/30 backdrop-blur p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-5 h-5 text-[var(--neon-green)]" />
                                <h3 className="font-semibold">Privacy & Security</h3>
                            </div>
                            <div className="space-y-3">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start border-border/50 text-muted-foreground hover:text-foreground"
                                >
                                    Change Password
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start border-border/50 text-muted-foreground hover:text-foreground"
                                >
                                    Two-Factor Authentication
                                </Button>
                            </div>
                        </Card>

                        {/* Danger Zone */}
                        <Card className="border-red-500/30 bg-red-500/5 backdrop-blur p-6">
                            <h3 className="font-semibold text-red-500 mb-4">Danger Zone</h3>
                            <Button
                                variant="outline"
                                className="border-red-500/30 text-red-500 hover:bg-red-500/10 w-full justify-start"
                            >
                                Delete Account
                            </Button>
                        </Card>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
