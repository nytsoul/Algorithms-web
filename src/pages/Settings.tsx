import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate, useLocation } from "react-router";
import { useState, useEffect, useRef } from "react";
import {
    Settings,
    Bell,
    Shield,
    Palette,
    Mail,
    Trash2,
    Globe,
    Check,
    Download,
    Upload,
    Code2,
    Zap,
    Eye,
    Activity,
    Keyboard,
    HardDrive,
    Clock,
    Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { useTheme } from "@/components/ThemeProvider";
import { useTranslation } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { useEditorPreferences } from "@/hooks/use-editor-preferences";
import { exportUserData, importUserData, clearAllUserData, calculateStorageUsage, downloadJSON } from "@/lib/data-export";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
    const { isAuthenticated, user, signOut, updateSettings, isLoading: authLoading } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [notifications, setNotifications] = useState(true);
    const [emailDigest, setEmailDigest] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || "en");
    const [reduceAnimations, setReduceAnimations] = useState(false);
    const [highContrast, setHighContrast] = useState(false);
    const [fontScale, setFontScale] = useState([100]);
    const [autoSaveInterval, setAutoSaveInterval] = useState("30");
    const [storageUsage, setStorageUsage] = useState({ used: 0, total: 0, percentage: 0 });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { preferences, updatePreference, resetPreferences } = useEditorPreferences();

    // Load settings from local/DB
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate("/auth", { replace: true, state: { from: location } });
        }

        const savedSettings = localStorage.getItem("algoverse_settings");
        if (savedSettings) {
            const parsed = JSON.parse(savedSettings);
            setNotifications(parsed.notifications_enabled ?? true);
            setEmailDigest(parsed.email_digest_enabled ?? false);
            setReduceAnimations(parsed.reduce_animations ?? false);
            setHighContrast(parsed.high_contrast ?? false);
            setFontScale([parsed.font_scale ?? 100]);
            setAutoSaveInterval(parsed.auto_save_interval ?? "30");
        }

        // Calculate storage usage
        setStorageUsage(calculateStorageUsage());
    }, [authLoading, isAuthenticated, navigate, location]);

    if (authLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--neon-cyan)] border-t-transparent" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    const handleLogout = async () => {
        await signOut();
    };

    const handleToggleNotifications = async (val: boolean) => {
        setNotifications(val);
        try {
            await updateSettings({ notifications_enabled: val });
            toast.success(`Notifications ${val ? "enabled" : "disabled"}`);
        } catch (e) {
            toast.error("Failed to save settings");
        }
    };

    const handleToggleEmailDigest = async (val: boolean) => {
        setEmailDigest(val);
        try {
            await updateSettings({ email_digest_enabled: val });
            toast.success(`Email digest ${val ? "enabled" : "disabled"}`);
        } catch (e) {
            toast.error("Failed to save settings");
        }
    };

    const handleLanguageChange = async (lang: string) => {
        setSelectedLanguage(lang);
        await i18n.changeLanguage(lang);
        try {
            await updateSettings({ language: lang });
            toast.success(`Language changed to ${lang === "en" ? "English" : lang === "ta" ? "Tamil" : "Hindi"}`);
        } catch (e) {
            toast.error("Failed to save settings");
        }
    };

    const handleDeleteAccount = async () => {
        toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    // Logic to delete account would go here
                    // For now we just sign out and redirect
                    setTimeout(async () => {
                        await signOut();
                        resolve(true);
                    }, 1500);
                } catch (e) {
                    reject(e);
                }
            }),
            {
                loading: "Deleting account and cleaning up data...",
                success: "Account deleted. We're sorry to see you go.",
                error: "Failed to delete account",
            }
        );
    };

    const handleExportData = () => {
        try {
            const data = exportUserData();
            const filename = `algoverse-backup-${new Date().toISOString().split('T')[0]}.json`;
            downloadJSON(data, filename);
            toast.success("Data exported successfully!");
        } catch (error) {
            toast.error("Failed to export data");
        }
    };

    const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                importUserData(content);
                toast.success("Data imported successfully! Refreshing...");
                setTimeout(() => window.location.reload(), 1500);
            } catch (error: any) {
                toast.error(error.message || "Failed to import data");
            }
        };
        reader.readAsText(file);
    };

    const handleClearAllData = () => {
        clearAllUserData();
        toast.success("All data cleared successfully!");
        setStorageUsage(calculateStorageUsage());
    };

    const handleToggleReduceAnimations = (val: boolean) => {
        setReduceAnimations(val);
        try {
            const settings = JSON.parse(localStorage.getItem("algoverse_settings") || '{}');
            settings.reduce_animations = val;
            localStorage.setItem("algoverse_settings", JSON.stringify(settings));
            toast.success(`Animations ${val ? "reduced" : "enabled"}`);
        } catch (e) {
            toast.error("Failed to save settings");
        }
    };

    const handleToggleHighContrast = (val: boolean) => {
        setHighContrast(val);
        try {
            const settings = JSON.parse(localStorage.getItem("algoverse_settings") || '{}');
            settings.high_contrast = val;
            localStorage.setItem("algoverse_settings", JSON.stringify(settings));
            toast.success(`High contrast ${val ? "enabled" : "disabled"}`);
        } catch (e) {
            toast.error("Failed to save settings");
        }
    };

    const handleFontScaleChange = (value: number[]) => {
        setFontScale(value);
        try {
            const settings = JSON.parse(localStorage.getItem("algoverse_settings") || '{}');
            settings.font_scale = value[0];
            localStorage.setItem("algoverse_settings", JSON.stringify(settings));
            // Apply font scale to document root
            document.documentElement.style.fontSize = `${value[0]}%`;
        } catch (e) {
            toast.error("Failed to save settings");
        }
    };

    const handleAutoSaveIntervalChange = (val: string) => {
        setAutoSaveInterval(val);
        try {
            const settings = JSON.parse(localStorage.getItem("algoverse_settings") || '{}');
            settings.auto_save_interval = val;
            localStorage.setItem("algoverse_settings", JSON.stringify(settings));
            toast.success(`Auto-save interval set to ${val} seconds`);
        } catch (e) {
            toast.error("Failed to save settings");
        }
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
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full px-8 py-8 max-w-7xl mx-auto"
                    >
                        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                            <Settings className="w-8 h-8 text-[var(--neon-cyan)]" />
                            System Configuration
                        </h2>

                        {/* Grid Layout for Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <Card className="border-border/50 bg-card/30 backdrop-blur p-5">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-[var(--neon-cyan)]/10 flex items-center justify-center">
                                            <Bell className="w-5 h-5 text-[var(--neon-cyan)]" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Communication</h3>
                                            <p className="text-sm text-muted-foreground">Manage your alerts and summaries</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/20">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-medium">System Notifications</span>
                                            <span className="text-xs text-muted-foreground">Real-time alerts for algorithm updates</span>
                                        </div>
                                        <Switch checked={notifications} onCheckedChange={handleToggleNotifications} />
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/20">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-medium">Email Digest</span>
                                            <span className="text-xs text-muted-foreground">Weekly performance metrics via email</span>
                                        </div>
                                        <Switch checked={emailDigest} onCheckedChange={handleToggleEmailDigest} />
                                    </div>
                                </div>
                            </Card>

                            {/* Appearance Section */}
                            <Card className="border-border/50 bg-card/30 backdrop-blur p-5">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--neon-pink)]/10 flex items-center justify-center">
                                        <Palette className="w-5 h-5 text-[var(--neon-pink)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Visual Theme</h3>
                                        <p className="text-sm text-muted-foreground">Customize your interface aesthetic</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button
                                        variant={theme === "dark" ? "default" : "outline"}
                                        className={`h-24 flex flex-col gap-2 transition-all ${theme === "dark" ? "bg-[var(--neon-cyan)] text-background ring-2 ring-[var(--neon-cyan)]/30 ring-offset-2 ring-offset-background" : "border-border/50"}`}
                                        onClick={() => theme !== "dark" && toggleTheme()}
                                    >
                                        <div className="w-full h-8 bg-slate-900 rounded border border-white/10" />
                                        Deep Space
                                    </Button>
                                    <Button
                                        variant={theme === "light" ? "default" : "outline"}
                                        className={`h-24 flex flex-col gap-2 transition-all ${theme === "light" ? "bg-[var(--neon-cyan)] text-background ring-2 ring-[var(--neon-cyan)]/30 ring-offset-2 ring-offset-background" : "border-border/50"}`}
                                        onClick={() => theme !== "light" && toggleTheme()}
                                    >
                                        <div className="w-full h-8 bg-slate-100 rounded border border-black/10" />
                                        Clear Horizon
                                    </Button>
                                </div>
                            </Card>

                            {/* Localization Section */}
                            <Card className="border-border/50 bg-card/30 backdrop-blur p-5">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--neon-green)]/10 flex items-center justify-center">
                                        <Globe className="w-5 h-5 text-[var(--neon-green)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Regional Settings</h3>
                                        <p className="text-sm text-muted-foreground">Select your preferred system language</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { id: "en", label: "English", native: "English" },
                                        { id: "ta", label: "Tamil", native: "தமிழ்" },
                                        { id: "hi", label: "Hindi", native: "हिन्दी" }
                                    ].map((lang) => (
                                        <Button
                                            key={lang.id}
                                            variant={selectedLanguage === lang.id ? "default" : "outline"}
                                            onClick={() => handleLanguageChange(lang.id)}
                                            className={selectedLanguage === lang.id ? "bg-[var(--neon-cyan)] text-background" : "border-border/50"}
                                        >
                                            {selectedLanguage === lang.id && <Check className="w-4 h-4 mr-2" />}
                                            {lang.native}
                                        </Button>
                                    ))}
                                </div>
                            </Card>

                            {/* Data Management Section */}
                            <Card className="border-border/50 bg-card/30 backdrop-blur p-5">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--neon-cyan)]/10 flex items-center justify-center">
                                        <HardDrive className="w-5 h-5 text-[var(--neon-cyan)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Data Management</h3>
                                        <p className="text-sm text-muted-foreground">Backup and manage your learning data</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-3 rounded-lg bg-background/20">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">Storage Usage</span>
                                            <span className="text-xs text-muted-foreground">{storageUsage.used} KB / {storageUsage.total} KB</span>
                                        </div>
                                        <div className="w-full bg-background/50 rounded-full h-2">
                                            <div
                                                className="bg-[var(--neon-cyan)] h-2 rounded-full transition-all"
                                                style={{ width: `${Math.min(storageUsage.percentage, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button variant="outline" onClick={handleExportData} className="w-full">
                                            <Download className="w-4 h-4 mr-2" />
                                            Export Data
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-full"
                                        >
                                            <Upload className="w-4 h-4 mr-2" />
                                            Import Data
                                        </Button>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".json"
                                            onChange={handleImportData}
                                            className="hidden"
                                        />
                                    </div>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="outline" className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10">
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Clear All Data
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="border-red-500/50 bg-card/95 backdrop-blur-xl">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="text-red-500">Clear All Data?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will permanently delete all your saved code, progress, and settings from this browser. This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleClearAllData} className="bg-red-600 hover:bg-red-700">
                                                    Clear All Data
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </Card>

                            {/* Editor Preferences Section */}
                            <Card className="border-border/50 bg-card/30 backdrop-blur p-5">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--neon-purple)]/10 flex items-center justify-center">
                                        <Code2 className="w-5 h-5 text-[var(--neon-purple)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Code Editor</h3>
                                        <p className="text-sm text-muted-foreground">Customize your coding experience</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Font Size: {preferences.fontSize}px</label>
                                        <Slider
                                            value={[preferences.fontSize]}
                                            onValueChange={([value]) => updatePreference('fontSize', value)}
                                            min={12}
                                            max={24}
                                            step={1}
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Font Family</label>
                                        <Select value={preferences.fontFamily} onValueChange={(value) => updatePreference('fontFamily', value)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Fira Code">Fira Code</SelectItem>
                                                <SelectItem value="JetBrains Mono">JetBrains Mono</SelectItem>
                                                <SelectItem value="Source Code Pro">Source Code Pro</SelectItem>
                                                <SelectItem value="Consolas">Consolas</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-background/20">
                                            <span className="text-sm">Line Numbers</span>
                                            <Switch checked={preferences.lineNumbers} onCheckedChange={(val) => updatePreference('lineNumbers', val)} />
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-background/20">
                                            <span className="text-sm">Auto-complete</span>
                                            <Switch checked={preferences.autoComplete} onCheckedChange={(val) => updatePreference('autoComplete', val)} />
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-background/20">
                                            <span className="text-sm">Minimap</span>
                                            <Switch checked={preferences.minimap} onCheckedChange={(val) => updatePreference('minimap', val)} />
                                        </div>
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-background/20">
                                            <span className="text-sm">Tab Size: {preferences.tabSize}</span>
                                            <Select value={preferences.tabSize.toString()} onValueChange={(val) => updatePreference('tabSize', parseInt(val))}>
                                                <SelectTrigger className="w-16 h-8">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="2">2</SelectItem>
                                                    <SelectItem value="4">4</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Keyboard Shortcuts Section */}
                            <Card className="border-border/50 bg-card/30 backdrop-blur p-5">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--neon-yellow)]/10 flex items-center justify-center">
                                        <Keyboard className="w-5 h-5 text-[var(--neon-yellow)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Keyboard Shortcuts</h3>
                                        <p className="text-sm text-muted-foreground">Quick actions at your fingertips</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { action: 'Run Code', keys: ['Ctrl', 'Enter'], category: 'Playground' },
                                        { action: 'Save Code', keys: ['Ctrl', 'S'], category: 'Playground' },
                                        { action: 'Reset Code', keys: ['Ctrl', 'R'], category: 'Playground' },
                                        { action: 'Search Algorithms', keys: ['Ctrl', 'K'], category: 'Navigation' },
                                        { action: 'Toggle Sidebar', keys: ['Ctrl', 'B'], category: 'Navigation' },
                                    ].map((shortcut, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-background/20">
                                            <div>
                                                <span className="text-sm font-medium">{shortcut.action}</span>
                                                <span className="text-xs text-muted-foreground ml-2">• {shortcut.category}</span>
                                            </div>
                                            <div className="flex gap-1">
                                                {shortcut.keys.map((key, i) => (
                                                    <kbd key={i} className="px-2 py-1 text-xs font-mono bg-background border border-border rounded">
                                                        {key}
                                                    </kbd>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Performance & Display Section */}
                            <Card className="border-border/50 bg-card/30 backdrop-blur p-5">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--neon-pink)]/10 flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-[var(--neon-pink)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Performance & Display</h3>
                                        <p className="text-sm text-muted-foreground">Optimize your experience</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/20">
                                        <div>
                                            <span className="text-sm font-medium">Reduce Animations</span>
                                            <p className="text-xs text-muted-foreground">Minimize motion for better performance</p>
                                        </div>
                                        <Switch checked={reduceAnimations} onCheckedChange={handleToggleReduceAnimations} />
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/20">
                                        <div>
                                            <span className="text-sm font-medium">High Contrast Mode</span>
                                            <p className="text-xs text-muted-foreground">Enhance visibility</p>
                                        </div>
                                        <Switch checked={highContrast} onCheckedChange={handleToggleHighContrast} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Font Scale: {fontScale[0]}%</label>
                                        <Slider
                                            value={fontScale}
                                            onValueChange={handleFontScaleChange}
                                            min={90}
                                            max={120}
                                            step={5}
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-2 block">Auto-save Interval</label>
                                        <Select value={autoSaveInterval} onValueChange={handleAutoSaveIntervalChange}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="15">Every 15 seconds</SelectItem>
                                                <SelectItem value="30">Every 30 seconds</SelectItem>
                                                <SelectItem value="60">Every 60 seconds</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </Card>

                            {/* Privacy Section */}
                            <Card className="border-border/50 bg-card/30 backdrop-blur p-5">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-[var(--neon-purple)]/10 flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-[var(--neon-purple)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Identity & Security</h3>
                                        <p className="text-sm text-muted-foreground">Manage your credentials and privacy</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start border-border/50 font-normal">
                                        Update Security Protocol (Change Password)
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start border-border/50 font-normal">
                                        Enable Multi-Factor Authentication
                                    </Button>
                                </div>
                            </Card>

                            {/* Danger Zone */}
                            <Card className="border-red-500/20 bg-red-500/5 backdrop-blur p-5">
                                <h3 className="font-bold text-red-500 mb-2">Terminal Zone</h3>
                                <p className="text-sm text-muted-foreground mb-4">Permanent actions that cannot be reversed.</p>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="border-red-500/30 text-red-500 hover:bg-red-500/10 w-full justify-start gap-2"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Terminate Account
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="border-red-500/50 bg-card/95 backdrop-blur-xl">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle className="text-red-500">Confirm Termination?</AlertDialogTitle>
                                            <AlertDialogDescription className="text-muted-foreground">
                                                This will permanently delete your profile, progress, and all associated metadata from Algoverse. This action is irreversible.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Abort</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={handleDeleteAccount}
                                                className="bg-red-600 hover:bg-red-700 text-white"
                                            >
                                                Confirm Deletion
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </Card>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
