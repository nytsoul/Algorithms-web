
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
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
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "@/components/CodeEditor";
import { useAlgorithmBySlug } from "@/hooks/use-algorithms";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
    const { algorithm, isLoading } = useAlgorithmBySlug(slug || "");
    const [code, setCode] = useState("");
    const [output, setOutput] = useState<Array<{ type: 'log' | 'error' | 'success', msg: string }>>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [language, setLanguage] = useState("javascript");

    useEffect(() => {
        if (algorithm) {
            setCode(algorithm.implementation || "// Write your code here");
        }
    }, [algorithm]);

    const handleRun = async () => {
        setIsRunning(true);
        setOutput([{ type: 'log', msg: '🚀 Initializing environment...' }]);

        // Simulate compilation delay
        await new Promise(r => setTimeout(r, 600));

        const originalLog = console.log;
        const logs: Array<{ type: 'log' | 'error' | 'success', msg: string }> = [];

        // Capture console.log
        const customLog = (...args: any[]) => {
            logs.push({ type: 'log', msg: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') });
        };

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
                } else {
                    logs.push({ type: 'error', msg: `❌ Runtime Error: ${result.error}` });
                }
            } else {
                logs.push({ type: 'log', msg: `Running ${language} is simulated in this environment.` });
                logs.push({ type: 'success', msg: '✅ Simulation complete.' });
            }
        } catch (err: any) {
            logs.push({ type: 'error', msg: `❌ Compilation Error: ${err.message}` });
        } finally {
            setOutput(prev => [...prev, ...logs]);
            setIsRunning(false);
        }
    };

    const handleReset = () => {
        if (algorithm) {
            setCode(algorithm.implementation || "");
            setOutput([]);
            toast.info("Code reset to default implementation");
        }
    };

    if (isLoading || !algorithm) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--neon-purple)] border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-12">
            {/* Header */}
            <div className="border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <div>
                            <h1 className="text-lg font-bold flex items-center gap-2">
                                <Zap className="w-4 h-4 text-[var(--neon-yellow)]" />
                                Playground: {algorithm.name}
                            </h1>
                            <p className="text-xs text-muted-foreground flex items-center gap-2">
                                <Badge variant="outline" className="text-[10px] px-1.5 h-4 border-[var(--neon-purple)]/50">
                                    {algorithm.domain}
                                </Badge>
                                • {algorithm.difficulty}
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

                        <Button variant="outline" size="sm" onClick={handleReset} className="h-9">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Reset
                        </Button>

                        <Button size="sm" onClick={handleRun} disabled={isRunning} className="h-9 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)]">
                            {isRunning ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Play className="w-4 h-4 mr-2 fill-current" />}
                            Run Code
                        </Button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
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

                        <TabsContent value="details" className="flex-1 mt-4 overflow-hidden">
                            <Card className="h-full border-[var(--neon-purple)]/20 bg-card/30 backdrop-blur-sm p-6 overflow-y-auto space-y-6">
                                <div>
                                    <h3 className="text-sm font-bold text-[var(--neon-purple)] mb-2 flex items-center gap-2">
                                        <Sparkles className="w-3 h-3" />
                                        Core Intuition
                                    </h3>
                                    <p className="text-xs leading-relaxed text-muted-foreground">
                                        {algorithm.intuition}
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
                                            <span className="font-mono text-[var(--neon-cyan)]">{algorithm.timeComplexity.average}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Space Complexity</span>
                                            <span className="font-mono text-[var(--neon-pink)]">{algorithm.spaceComplexity}</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-muted-foreground">Paradigm</span>
                                            <span className="italic">{algorithm.paradigm}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-[var(--neon-yellow)] mb-2 flex items-center gap-2">
                                        <Share2 className="w-3 h-3" />
                                        Applications
                                    </h3>
                                    <ul className="text-xs text-muted-foreground space-y-1">
                                        {algorithm.applications.map((app, i) => (
                                            <li key={i}>• {app}</li>
                                        ))}
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
            </main>
        </div>
    );
}
