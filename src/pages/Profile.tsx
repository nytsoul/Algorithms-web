import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { User, Mail, Calendar, Award, BarChart3, LogOut, Github, Globe, Twitter, Linkedin, Edit2, Check, X as CloseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { useMastery } from "@/hooks/use-mastery";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const AVATAR_PRESETS = [
    "https://api.dicebear.com/7.x/bottts/svg?seed=Felix",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Aneka",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Buddy",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Max",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Shadow",
];

export default function Profile() {
    const { isAuthenticated, user, signOut, updateProfile, isLoading: authLoading } = useAuth();
    const { points, solvedProblemIds, streak } = useMastery();
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    // Edit Form State
    const [formData, setFormData] = useState({
        full_name: user?.user_metadata?.full_name || "",
        bio: user?.user_metadata?.bio || "",
        avatar_url: user?.user_metadata?.avatar_url || AVATAR_PRESETS[0],
        github: user?.user_metadata?.social_links?.github || "",
        linkedin: user?.user_metadata?.social_links?.linkedin || "",
        twitter: user?.user_metadata?.social_links?.twitter || "",
    });

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate("/auth", { replace: true, state: { from: location } });
        }
    }, [isAuthenticated, authLoading, navigate, location]);

    const handleLogout = async () => {
        await signOut();
    };

    const handleUpdateProfile = async () => {
        try {
            await updateProfile({
                full_name: formData.full_name,
                bio: formData.bio,
                avatar_url: formData.avatar_url,
                social_links: {
                    github: formData.github,
                    linkedin: formData.linkedin,
                    twitter: formData.twitter,
                }
            });
            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };
    if (authLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--neon-cyan)] border-t-transparent" />
            </div>
        );
    }

    if (!isAuthenticated) return null;

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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full px-6 py-8 max-w-4xl mx-auto"
                    >
                        {/* Profile Header Card */}
                        <Card className="mb-8 border-border/50 bg-card/30 backdrop-blur p-8">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] p-1 overflow-hidden">
                                        <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center overflow-hidden">
                                            {user?.user_metadata?.avatar_url ? (
                                                <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                <User className="w-16 h-16 text-[var(--neon-cyan)]" />
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="absolute -bottom-2 -right-2 rounded-full bg-background border-border/50 hover:bg-muted"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div>
                                            <h2 className="text-4xl font-bold tracking-tight mb-1">
                                                {user?.user_metadata?.full_name || "Code Explorer"}
                                            </h2>
                                            <p className="text-[var(--neon-cyan)] font-mono text-sm">
                                                Level {Math.floor(points / 1000) + 1} Strategist
                                            </p>
                                        </div>
                                        <div className="flex gap-2 justify-center md:justify-start">
                                            <Dialog open={isEditing} onOpenChange={setIsEditing}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className="border-border/50 hover:bg-[var(--neon-cyan)]/10 hover:border-[var(--neon-cyan)]/50"
                                                    >
                                                        Edit Profile
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[500px] border-border/50 bg-card/95 backdrop-blur-xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Profile</DialogTitle>
                                                        <DialogDescription>
                                                            Update your personal information and profile appearance.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid gap-2">
                                                            <Label>Choose Avatar</Label>
                                                            <div className="flex gap-3 overflow-x-auto pb-2">
                                                                {AVATAR_PRESETS.map((url) => (
                                                                    <button
                                                                        key={url}
                                                                        onClick={() => setFormData({ ...formData, avatar_url: url })}
                                                                        className={`w-12 h-12 rounded-lg border-2 transition-all ${formData.avatar_url === url ? "border-[var(--neon-cyan)] scale-110" : "border-transparent opacity-50 hover:opacity-100"}`}
                                                                    >
                                                                        <img src={url} alt="Preset" className="w-full h-full rounded-lg" />
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="name">Full Name</Label>
                                                            <Input
                                                                id="name"
                                                                value={formData.full_name}
                                                                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                                                placeholder="Enter your name"
                                                                className="bg-background/50"
                                                            />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="bio">Bio</Label>
                                                            <Textarea
                                                                id="bio"
                                                                value={formData.bio}
                                                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                                placeholder="Tell us about yourself"
                                                                className="bg-background/50 resize-none h-24"
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="github">GitHub Profile</Label>
                                                                <Input
                                                                    id="github"
                                                                    value={formData.github}
                                                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                                                    placeholder="username"
                                                                    className="bg-background/50"
                                                                />
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                                                                <Input
                                                                    id="linkedin"
                                                                    value={formData.linkedin}
                                                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                                                    placeholder="username"
                                                                    className="bg-background/50"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                                                        <Button onClick={handleUpdateProfile} className="bg-[var(--neon-cyan)] text-background hover:bg-[var(--neon-cyan)]/90">
                                                            Save Changes
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <Button
                                                variant="ghost"
                                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                                onClick={handleLogout}
                                            >
                                                <LogOut className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {user?.user_metadata?.bio && (
                                        <p className="text-muted-foreground mb-6 max-w-xl italic">
                                            "{user.user_metadata.bio}"
                                        </p>
                                    )}

                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-[var(--neon-cyan)]" />
                                            {user?.email}
                                        </div>
                                        {user?.user_metadata?.social_links?.github && (
                                            <a href={`https://github.com/${user.user_metadata.social_links.github}`} target="_blank" className="flex items-center gap-2 hover:text-foreground transition-colors">
                                                <Github className="w-4 h-4" />
                                                GitHub
                                            </a>
                                        )}
                                        {user?.user_metadata?.social_links?.linkedin && (
                                            <a href={`https://linkedin.com/in/${user.user_metadata.social_links.linkedin}`} target="_blank" className="flex items-center gap-2 hover:text-foreground transition-colors">
                                                <Linkedin className="w-4 h-4" />
                                                LinkedIn
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <Card className="border-border/50 bg-card/30 backdrop-blur p-6 group hover:border-[var(--neon-cyan)]/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-[var(--neon-cyan)]/10 flex items-center justify-center">
                                        <Award className="w-6 h-6 text-[var(--neon-cyan)]" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-muted-foreground">Solved</p>
                                        <p className="text-2xl font-bold">{solvedProblemIds.length}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-border/50 bg-card/30 backdrop-blur p-6 group hover:border-[var(--neon-purple)]/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-[var(--neon-purple)]/10 flex items-center justify-center">
                                        <BarChart3 className="w-6 h-6 text-[var(--neon-purple)]" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-muted-foreground">Streak</p>
                                        <p className="text-2xl font-bold">{streak} Days</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-border/50 bg-card/30 backdrop-blur p-6 group hover:border-[var(--neon-pink)]/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-[var(--neon-pink)]/10 flex items-center justify-center">
                                        <div className="text-xl font-bold text-[var(--neon-pink)]">XP</div>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-muted-foreground">Points</p>
                                        <p className="text-2xl font-bold">{points}</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Recent Activity Placeholder or Additional Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="border-border/50 bg-card/30 backdrop-blur p-6">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-[var(--neon-green)]" />
                                    Account Timeline
                                </h3>
                                <div className="space-y-4 font-mono text-sm tracking-tight">
                                    <div className="flex items-center justify-between p-2 rounded bg-background/30 border border-border/20">
                                        <span className="text-muted-foreground">System Join</span>
                                        <span className="text-[var(--neon-green)]">{new Date(user?.created_at || Date.now()).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-2 rounded bg-background/30 border border-border/20">
                                        <span className="text-muted-foreground">Identity Verified</span>
                                        <span className="text-[var(--neon-cyan)]">Confirmed</span>
                                    </div>
                                </div>
                            </Card>

                            <Card className="border-border/50 bg-card/30 backdrop-blur p-6">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-[var(--neon-cyan)]" />
                                    System Metadata
                                </h3>
                                <div className="space-y-4 font-mono text-xs overflow-hidden">
                                    <div className="grid grid-cols-[80px_1fr] gap-2">
                                        <span className="text-muted-foreground">UUID:</span>
                                        <span className="truncate opacity-70">{user?.id}</span>
                                    </div>
                                    <div className="grid grid-cols-[80px_1fr] gap-2">
                                        <span className="text-muted-foreground">Provider:</span>
                                        <span className="opacity-70">{user?.app_metadata?.provider || "Email"}</span>
                                    </div>
                                    <div className="grid grid-cols-[80px_1fr] gap-2">
                                        <span className="text-muted-foreground">Security:</span>
                                        <span className="text-[var(--neon-cyan)]">AES-256-Active</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
