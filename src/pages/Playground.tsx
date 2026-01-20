
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    RotateCcw,
    Terminal,
    Zap,
    Save,
    Share2,
    ChevronLeft,
    Sparkles,
    Database,
    CheckCircle2,
    Menu,
    X,
    Clock,
    Download,
    Upload,
    Trash2,
    CheckCircle,
    XCircle,
    History,
    Keyboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "@/components/CodeEditor";
import { useAlgorithmBySlug } from "@/hooks/use-algorithms";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/Sidebar";
import { toast } from "sonner";
import { useCodeStorage } from "@/hooks/use-code-storage";
import { useExecutionHistory } from "@/hooks/use-execution-history";
import { getTestCases } from "@/lib/test-cases";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Loader2 = ({ className }: { className?: string }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);

export default function Playground() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, signOut, isLoading: authLoading } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Default to binary-search if no slug provided
    const effectiveSlug = slug || "binary-search";
    const { algorithm, isLoading: algoLoading } = useAlgorithmBySlug(effectiveSlug);

    const [code, setCode] = useState("");
    const [output, setOutput] = useState<Array<{ type: 'log' | 'error' | 'success', msg: string }>>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [language, setLanguage] = useState("javascript");
    const [saveName, setSaveName] = useState("");
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [showLoadDialog, setShowLoadDialog] = useState(false);
    const [showHistoryPanel, setShowHistoryPanel] = useState(false);
    const [testResults, setTestResults] = useState<Array<{ id: string; passed: boolean; error?: string }>>([]);
    const [isRunningTests, setIsRunningTests] = useState(false);

    // Custom hooks
    const { saveCode, loadCode, savedCodes, deleteCode, autoSave, loadAutoSave } = useCodeStorage(effectiveSlug, language);
    const { history, addExecution, clearHistory } = useExecutionHistory();
    const testCases = getTestCases(effectiveSlug);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate("/auth", { replace: true, state: { from: location } });
        }
    }, [authLoading, isAuthenticated, navigate, location]);

    const handleLogout = async () => {
        await signOut();
    };

    // Load algorithm implementation or auto-saved code
    useEffect(() => {
        if (algorithm) {
            const autoSaved = loadAutoSave();
            if (autoSaved) {
                setCode(autoSaved);
                toast.info("Loaded auto-saved code");
            } else {
                setCode(algorithm.implementation || "// Write your code here");
            }
        }
    }, [algorithm, loadAutoSave]);

    // Auto-save code every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (code) {
                autoSave(code);
            }
        }, 30000);
        return () => clearInterval(interval);
    }, [code, autoSave]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl/Cmd + Enter: Run code
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                handleRun();
            }
            // Ctrl/Cmd + S: Save code
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                setShowSaveDialog(true);
            }
            // Ctrl/Cmd + R: Reset code
            if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
                e.preventDefault();
                handleReset();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [code, algorithm]);

    const handleRun = async () => {
        const startTime = performance.now();
        setIsRunning(true);
        setOutput([{ type: 'log', msg: '🚀 Initializing environment...' }]);

        // Simulate compilation delay
        await new Promise(r => setTimeout(r, 600));

        const logs: Array<{ type: 'log' | 'error' | 'success', msg: string }> = [];

        // Capture console.log
        const customLog = (...args: any[]) => {
            logs.push({ type: 'log', msg: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') });
        };

        let success = false;
        try {
            // In a real app, we'd use a web worker or iframe
            // For this demo, we use a simple (sandboxed-ish) eval for JS
            if (language === "javascript") {
                const executionContext = new Function('console', `
          try {
            ${code}
            return { success: true };
          } catch (e) {
            return { success: false, error: e.message };
          }
        `);

                const result = executionContext({ log: customLog });
                if (result.success) {
                    logs.push({ type: 'success', msg: '✅ Execution finished successfully!' });
                    success = true;
                } else {
                    logs.push({ type: 'error', msg: `❌ Runtime Error: ${result.error}` });
                }
            } else {
                logs.push({ type: 'log', msg: `Running ${language} is simulated in this environment.` });
                logs.push({ type: 'success', msg: '✅ Simulation complete.' });
                success = true;
            }
        } catch (err: any) {
            logs.push({ type: 'error', msg: `❌ Compilation Error: ${err.message}` });
        } finally {
            const executionTime = performance.now() - startTime;
            setOutput(prev => [...prev, ...logs]);
            setIsRunning(false);

            // Add to execution history
            addExecution(code, [...output, ...logs], executionTime, language, success);
        }
    };

    const runTests = async () => {
        if (testCases.length === 0) {
            toast.error("No test cases available for this algorithm");
            return;
        }

        setIsRunningTests(true);
        setTestResults([]);
        const results: Array<{ id: string; passed: boolean; error?: string }> = [];

        for (const testCase of testCases) {
            try {
                // Create a function from the code
                const func = new Function('input', `
                    ${code}
                    // Try to find and call the main function
                    const functionNames = ${JSON.stringify(['binarySearch', 'bubbleSort', 'quickSort', 'dijkstra'])};
                    for (const name of functionNames) {
                        if (typeof eval(name) === 'function') {
                            return eval(name + '(input.arr || input.graph, input.target || input.start)');
                        }
                    }
                    throw new Error('No recognizable function found');
                `);

                const result = func(testCase.input);
                const passed = JSON.stringify(result) === JSON.stringify(testCase.expectedOutput);
                results.push({
                    id: testCase.id,
                    passed,
                    error: passed ? undefined : `Expected: ${JSON.stringify(testCase.expectedOutput)}, Got: ${JSON.stringify(result)}`
                });
            } catch (error: any) {
                results.push({
                    id: testCase.id,
                    passed: false,
                    error: error.message
                });
            }
        }

        setTestResults(results);
        setIsRunningTests(false);

        const passedCount = results.filter(r => r.passed).length;
        if (passedCount === results.length) {
            toast.success(`All ${results.length} tests passed! 🎉`);
        } else {
            toast.error(`${passedCount}/${results.length} tests passed`);
        }
    };

    const handleSave = () => {
        if (!saveName.trim()) {
            toast.error("Please enter a name for your solution");
            return;
        }
        saveCode(code, saveName);
        setSaveName("");
        setShowSaveDialog(false);
    };

    const handleLoadSolution = (id: string) => {
        const loadedCode = loadCode(id);
        if (loadedCode) {
            setCode(loadedCode);
            setShowLoadDialog(false);
            toast.success("Code loaded successfully");
        }
    };

    const handleReset = () => {
        if (algorithm) {
            setCode(algorithm.implementation || "");
            setOutput([]);
            toast.info("Code reset to default implementation");
        }
    };

    if (authLoading || algoLoading) {
        return (
            <div className="w-full min-h-screen bg-background flex items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--neon-purple)] border-t-transparent" />
            </div>
        );
    }

    if (!isAuthenticated || !algorithm) {
        return null;
    }

    return (
        <div className="w-full min-h-screen bg-background pb-12 flex">
            {/* Sidebar */}
            {sidebarOpen && <Sidebar onLogout={handleLogout} isOpen={sidebarOpen} />}

            {/* Main Content */}
            <div className={`flex-1 ${sidebarOpen ? "ml-80" : ""} flex flex-col transition-all duration-300`}>
                {/* Header */}
                <div className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-50">
                    <div className="w-full px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="text-[var(--neon-cyan)]"
                            >
                                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                            <div>
                                <h1 className="text-lg font-bold flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-[var(--neon-yellow)]" />
                                    Playground: {algorithm?.name}
                                </h1>
                                <p className="text-xs text-muted-foreground flex items-center gap-2">
                                    <Badge variant="outline" className="text-[10px] px-1.5 h-4 border-[var(--neon-purple)]/50">
                                        {algorithm?.domain}
                                    </Badge>
                                    • {algorithm?.difficulty}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Select value={language} onValueChange={setLanguage}>
                                <SelectTrigger className="w-[140px] h-9 border-[var(--neon-purple)]/30">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="javascript">JavaScript</SelectItem>
                                    <SelectItem value="typescript">TypeScript</SelectItem>
                                    <SelectItem value="python">Python</SelectItem>
                                    <SelectItem value="java">Java</SelectItem>
                                    <SelectItem value="cpp">C++</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Save Dialog */}
                            <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-9">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-card/95 backdrop-blur-xl border-[var(--neon-cyan)]/30">
                                    <DialogHeader>
                                        <DialogTitle>Save Solution</DialogTitle>
                                        <DialogDescription>
                                            Give your solution a name to save it for later.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <Input
                                            placeholder="e.g., Optimized Binary Search"
                                            value={saveName}
                                            onChange={(e) => setSaveName(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                                            className="border-[var(--neon-cyan)]/30"
                                        />
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                                                Cancel
                                            </Button>
                                            <Button onClick={handleSave} className="bg-[var(--neon-cyan)]">
                                                Save
                                            </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            {/* Load Dialog */}
                            <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-9">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Load
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-card/95 backdrop-blur-xl border-[var(--neon-cyan)]/30 max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle>Load Saved Solution</DialogTitle>
                                        <DialogDescription>
                                            Select a previously saved solution to load.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-2 max-h-96 overflow-y-auto">
                                        {savedCodes.length === 0 ? (
                                            <p className="text-center text-muted-foreground py-8">No saved solutions yet</p>
                                        ) : (
                                            savedCodes.map((saved) => (
                                                <Card key={saved.id} className="p-4 border-border/50 hover:border-[var(--neon-cyan)]/50 transition-colors">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <h4 className="font-medium">{saved.name}</h4>
                                                            <p className="text-xs text-muted-foreground">
                                                                {new Date(saved.timestamp).toLocaleString()} • {saved.language}
                                                            </p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleLoadSolution(saved.id)}
                                                            >
                                                                Load
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="text-red-500 hover:text-red-600"
                                                                onClick={() => deleteCode(saved.id)}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))
                                        )}
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <Button variant="outline" size="sm" onClick={handleReset} className="h-9">
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Reset
                            </Button>

                            <Button
                                size="sm"
                                onClick={() => setShowHistoryPanel(!showHistoryPanel)}
                                variant="outline"
                                className="h-9"
                            >
                                <History className="w-4 h-4 mr-2" />
                                History
                            </Button>

                            <Button size="sm" onClick={handleRun} disabled={isRunning} className="h-9 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)]">
                                {isRunning ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Play className="w-4 h-4 mr-2 fill-current" />}
                                Run Code
                            </Button>
                        </div>
                    </div>
                </div>

                <main className="w-full px-6 pt-8 flex gap-6 h-[calc(100vh-140px)]">
                    {/* Execution History Panel */}
                    <AnimatePresence>
                        {showHistoryPanel && (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 280, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <Card className="h-full border-[var(--neon-purple)]/20 bg-card/30 backdrop-blur-sm flex flex-col">
                                    <div className="p-3 border-b border-border/50 flex items-center justify-between">
                                        <span className="text-xs font-bold uppercase tracking-wider">History</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => clearHistory()}
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                                        {history.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-30">
                                                <Clock className="w-8 h-8 mb-2" />
                                                <p className="text-xs text-center">No execution history yet</p>
                                            </div>
                                        ) : (
                                            history.map((exec) => (
                                                <Card
                                                    key={exec.id}
                                                    className={`p-2 border cursor-pointer hover:border-[var(--neon-cyan)]/50 transition-colors ${exec.success ? 'border-green-500/20' : 'border-red-500/20'
                                                        }`}
                                                    onClick={() => {
                                                        setCode(exec.code);
                                                        setOutput(exec.output);
                                                        toast.info("Code loaded from history");
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-xs font-mono">
                                                            {new Date(exec.timestamp).toLocaleTimeString()}
                                                        </span>
                                                        {exec.success ? (
                                                            <CheckCircle className="w-3 h-3 text-green-500" />
                                                        ) : (
                                                            <XCircle className="w-3 h-3 text-red-500" />
                                                        )}
                                                    </div>
                                                    <div className="text-[10px] text-muted-foreground">
                                                        {exec.executionTime.toFixed(0)}ms • {exec.language}
                                                    </div>
                                                </Card>
                                            ))
                                        )}
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Editor and Console Area */}
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 h-full overflow-hidden">
                        {/* Editor Side */}
                        <div className="lg:col-span-8 flex flex-col gap-4 h-full overflow-hidden">
                            <Card className="flex-1 border-[var(--neon-purple)]/20 bg-card/30 backdrop-blur-sm overflow-hidden flex flex-col">
                                <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-background/50">
                                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-2">
                                        <Terminal className="w-3 h-3" />
                                        editor.js
                                    </span>
                                    <div className="flex gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                    </div>
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <CodeEditor
                                        value={code}
                                        onChange={(v) => setCode(v || "")}
                                        language={language}
                                    />
                                </div>
                            </Card>
                        </div>

                        {/* Console Side */}
                        <div className="lg:col-span-4 flex flex-col gap-4 h-full overflow-hidden">
                            <Tabs defaultValue="console" className="flex-1 flex flex-col overflow-hidden">
                                <TabsList className="bg-card/50 border border-border/50">
                                    <TabsTrigger value="console" className="flex items-center gap-2">
                                        <Terminal className="w-3 h-3" /> Console
                                    </TabsTrigger>
                                    <TabsTrigger value="tests" className="flex items-center gap-2">
                                        <CheckCircle2 className="w-3 h-3" /> Tests
                                    </TabsTrigger>
                                    <TabsTrigger value="details" className="flex items-center gap-2">
                                        <Database className="w-3 h-3" /> Info
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="console" className="flex-1 mt-4 overflow-hidden">
                                    <Card className="h-full border-[var(--neon-cyan)]/20 bg-black/40 backdrop-blur-sm flex flex-col rounded-xl border">
                                        <div className="p-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
                                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Execution Output</span>
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setOutput([])}>
                                                <RotateCcw className="w-3 h-3" />
                                            </Button>
                                        </div>
                                        <div className="flex-1 p-4 font-mono text-sm overflow-y-auto space-y-2">
                                            {output.length === 0 ? (
                                                <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-30 select-none">
                                                    <Terminal className="w-12 h-12 mb-2" />
                                                    <p className="text-xs">No output yet. Run the code to see results.</p>
                                                </div>
                                            ) : (
                                                output.map((out, i) => (
                                                    <div key={i} className={`flex gap-3 leading-relaxed ${out.type === 'error' ? 'text-red-400' :
                                                        out.type === 'success' ? 'text-[var(--neon-green)]' : 'text-foreground'
                                                        }`}>
                                                        <span className="text-muted-foreground select-none opacity-50">[{i + 1}]</span>
                                                        <p>{out.msg}</p>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </Card>
                                </TabsContent>

                                {/* Test Cases Tab */}
                                <TabsContent value="tests" className="flex-1 mt-4 overflow-hidden">
                                    <Card className="h-full border-[var(--neon-green)]/20 bg-card/30 backdrop-blur-sm flex flex-col rounded-xl border">
                                        <div className="p-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
                                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Test Cases</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7"
                                                onClick={runTests}
                                                disabled={isRunningTests || testCases.length === 0}
                                            >
                                                {isRunningTests ? (
                                                    <Loader2 className="w-3 h-3 animate-spin mr-2" />
                                                ) : (
                                                    <Play className="w-3 h-3 mr-2" />
                                                )}
                                                Run All Tests
                                            </Button>
                                        </div>
                                        <div className="flex-1 p-4 overflow-y-auto space-y-3">
                                            {testCases.length === 0 ? (
                                                <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-30 select-none">
                                                    <CheckCircle2 className="w-12 h-12 mb-2" />
                                                    <p className="text-xs">No test cases available for this algorithm</p>
                                                </div>
                                            ) : (
                                                testCases.map((testCase, idx) => {
                                                    const result = testResults.find(r => r.id === testCase.id);
                                                    return (
                                                        <Card
                                                            key={testCase.id}
                                                            className={`p-3 border transition-colors ${result?.passed
                                                                ? 'border-green-500/50 bg-green-500/5'
                                                                : result?.passed === false
                                                                    ? 'border-red-500/50 bg-red-500/5'
                                                                    : 'border-border/30'
                                                                }`}
                                                        >
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-xs font-mono text-muted-foreground">#{idx + 1}</span>
                                                                    <span className="text-sm font-medium">{testCase.description}</span>
                                                                </div>
                                                                {result && (
                                                                    result.passed ? (
                                                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                                                    ) : (
                                                                        <XCircle className="w-4 h-4 text-red-500" />
                                                                    )
                                                                )}
                                                            </div>
                                                            <div className="text-xs space-y-1">
                                                                <div>
                                                                    <span className="text-muted-foreground">Input: </span>
                                                                    <code className="text-[var(--neon-cyan)]">{JSON.stringify(testCase.input)}</code>
                                                                </div>
                                                                <div>
                                                                    <span className="text-muted-foreground">Expected: </span>
                                                                    <code className="text-[var(--neon-green)]">{JSON.stringify(testCase.expectedOutput)}</code>
                                                                </div>
                                                                {result?.error && (
                                                                    <div className="mt-2 text-red-400">
                                                                        <span className="text-muted-foreground">Error: </span>
                                                                        {result.error}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </Card>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="details" className="flex-1 mt-4 overflow-hidden">
                                    <Card className="h-full border-[var(--neon-purple)]/20 bg-card/30 backdrop-blur-sm p-6 overflow-y-auto space-y-6">
                                        <div>
                                            <h3 className="text-sm font-bold text-[var(--neon-purple)] mb-2 flex items-center gap-2">
                                                <Sparkles className="w-3 h-3" />
                                                Core Intuition
                                            </h3>
                                            <p className="text-xs leading-relaxed text-muted-foreground">
                                                {algorithm.intuition || "No intuition available."}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-[var(--neon-cyan)] mb-2 flex items-center gap-2">
                                                <CheckCircle2 className="w-3 h-3" />
                                                Properties
                                            </h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-muted-foreground">Time Complexity</span>
                                                    <span className="font-mono text-[var(--neon-cyan)]">{algorithm.timeComplexity?.average || "N/A"}</span>
                                                </div>
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-muted-foreground">Space Complexity</span>
                                                    <span className="font-mono text-[var(--neon-pink)]">{algorithm.spaceComplexity || "N/A"}</span>
                                                </div>
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-muted-foreground">Paradigm</span>
                                                    <span className="italic">{algorithm.paradigm || "N/A"}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-[var(--neon-yellow)] mb-2 flex items-center gap-2">
                                                <Share2 className="w-3 h-3" />
                                                Applications
                                            </h3>
                                            <ul className="text-xs text-muted-foreground space-y-1">
                                                {algorithm.applications?.map((app, i) => (
                                                    <li key={i}>• {app}</li>
                                                )) || <li>No applications listed</li>}
                                            </ul>
                                        </div>
                                    </Card>
                                </TabsContent>
                            </Tabs>

                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1 border-[var(--neon-purple)]/30 h-10">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Drift
                                </Button>
                                <Button variant="outline" className="flex-1 border-[var(--neon-cyan)]/30 h-10">
                                    <Share2 className="w-4 h-4 mr-1" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
