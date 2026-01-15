import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Play, RotateCcw, Terminal, Save, Copy, Check, Beaker, Send, Info, ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ProblemTestCase {
    input: string;
    output: string;
}

interface PracticeProblem {
    id: string;
    title: string;
    platform: string;
    description: string;
    inputFormat: string;
    outputFormat: string;
    testCases: ProblemTestCase[];
    url: string;
}

interface OnlineCompilerProps {
    algorithm: any;
    problem?: PracticeProblem;
}

const LANGUAGE_TEMPLATES: Record<string, (name: string) => string> = {
    "Python": (name) => `def ${name.toLowerCase().replace(/\s+/g, '_')}(data):\n    # TODO: Implement ${name}\n    pass\n\n# Test the function\ndata = [5, 2, 9, 1, 5, 6]\nprint(f"Running ${name} on {data}")`,
    "JavaScript": (name) => `function ${name.toLowerCase().replace(/\s+/g, '')}(data) {\n    // TODO: Implement ${name}\n    return data;\n}\n\n// Test the function\nconst data = [5, 2, 9, 1, 5, 6];\nconsole.log(\`Running ${name} on \`, data);`,
    "TypeScript": (name) => `function ${name.toLowerCase().replace(/\s+/g, '')}(data: number[]): number[] {\n    // TODO: Implement ${name}\n    return data;\n}\n\n// Test the function\nconst data: number[] = [5, 2, 9, 1, 5, 6];\nconsole.log(\`Running ${name} on \`, data);`,
    "Java": (name) => `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Running ${name}...");\n        // TODO: Implement ${name}\n    }\n}`,
    "C++": (name) => `#include <iostream>\n#include <vector>\n\nint main() {\n    std::cout << "Running ${name}..." << std::endl;\n    // TODO: Implement ${name}\n    return 0;\n}`,
};

export default function OnlineCompiler({ algorithm, problem }: OnlineCompilerProps) {
    const defaultLanguage = algorithm?.language || "JavaScript";
    const [language, setLanguage] = useState(defaultLanguage);

    // Generate boilerplate for a specific problem
    const getProblemBoilerplate = (lang: string, prob: PracticeProblem) => {
        const platformComment = prob.platform === "Codeforces" ? `// Codeforces Problem ${prob.id}` : `// Platform: ${prob.platform}`;
        const commonTemplates: Record<string, string> = {
            "Python": `import sys\n\n${platformComment}\n# ${prob.title}\n\ndef solve():\n    # Read input using sys.stdin.readline for efficiency\n    # Implement ${algorithm?.name || "logic"} here\n    pass\n\nif __name__ == "__main__":\n    solve()`,
            "JavaScript": `${platformComment}\n// ${prob.title}\n\nfunction solve() {\n    // Implement ${algorithm?.name || "logic"} here\n}\n\nsolve();`,
            "TypeScript": `${platformComment}\n// ${prob.title}\n\nfunction solve(): void {\n    // Implement ${algorithm?.name || "logic"} here\n}\n\nsolve();`,
            "Java": `import java.util.*;\nimport java.io.*;\n\npublic class Solution {\n    ${platformComment}\n    // ${prob.title}\n    public static void main(String[] args) {\n        // Your code here\n    }\n}`,
            "C++": `#include <bits/stdc++.h>\nusing namespace std;\n\n${platformComment}\n// ${prob.title}\n\nvoid solve() {\n    // Your code here\n}\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    solve();\n    return 0;\n}`
        };
        return commonTemplates[lang] || "";
    };

    const [codeByLanguage, setCodeByLanguage] = useState<Record<string, string>>(() => {
        const initialCode = algorithm?.implementation || LANGUAGE_TEMPLATES[defaultLanguage]?.(algorithm?.name || "Algorithm") || "";
        return { [defaultLanguage]: initialCode };
    });

    useEffect(() => {
        if (problem) {
            const boilerplate = getProblemBoilerplate(language, problem);
            setCodeByLanguage(prev => ({
                ...prev,
                [language]: boilerplate
            }));
            setOutput([`$ Loading workspace for ${problem.platform} #${problem.id}...`, `$ Template injected for ${language}.`, `$ Ready to solve: ${problem.title}`]);
        }
    }, [problem]);

    const [output, setOutput] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [activeTerminalTab, setActiveTerminalTab] = useState<"console" | "test-cases">("console");
    const [testResults, setTestResults] = useState<Array<{ status: 'pending' | 'running' | 'pass' | 'fail', actual?: string }>>([]);
    const [showProblemSidebar, setShowProblemSidebar] = useState(!!problem);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const currentCode = codeByLanguage[language] || LANGUAGE_TEMPLATES[language]?.(algorithm?.name || "Algorithm") || "";

    const handleLanguageChange = (newLang: string) => {
        setLanguage(newLang);
        if (!codeByLanguage[newLang]) {
            setCodeByLanguage(prev => ({
                ...prev,
                [newLang]: LANGUAGE_TEMPLATES[newLang]?.(algorithm?.name || "Algorithm") || ""
            }));
        }
    };

    const handleRun = () => {
        setIsRunning(true);
        setOutput([`$ Running ${algorithm?.name || "Algorithm"} (${language})...`, "$ Initializing environment...", "$ Compiling...", "$ Executing..."]);

        setTimeout(() => {
            setOutput(prev => [...prev, "$ Successfully executed.", `> Result: Algorithm logic for ${language} simulation complete.`]);
            setIsRunning(false);
        }, 1500);
    };

    const handleReset = () => {
        const template = LANGUAGE_TEMPLATES[language]?.(algorithm?.name || "Algorithm") || "";
        setCodeByLanguage(prev => ({
            ...prev,
            [language]: language === defaultLanguage ? (algorithm?.implementation || template) : template
        }));
        setOutput([]);
    };

    const handleRunTests = () => {
        if (!problem?.testCases) return;

        setActiveTerminalTab("test-cases");
        setIsRunning(true);
        setTestResults(problem.testCases.map(() => ({ status: 'running' })));
        setOutput(["$ Initializing Test Suite...", `$ Running ${problem.testCases.length} test cases...`]);

        // Simulate sequential test running
        problem.testCases.forEach((tc: ProblemTestCase, i: number) => {
            setTimeout(() => {
                setTestResults(prev => {
                    const next = [...prev];
                    next[i] = { status: 'pass', actual: tc.output };
                    return next;
                });
                setOutput(prev => [...prev, `> [Test Case ${i + 1}] Passed.`]);

                if (i === problem.testCases.length - 1) {
                    setIsRunning(false);
                    setOutput(prev => [...prev, "$ All tests completed successfully!"]);
                }
            }, (i + 1) * 600);
        });
    };

    const handleSubmit = () => {
        setIsRunning(true);
        setOutput(["$ Finalizing submission...", "$ Comparing with hidden test cases..."]);

        setTimeout(() => {
            setIsRunning(false);
            setIsSubmitted(true);
            setOutput(prev => [...prev, "> [VERDICT] Accepted", "> [SCORE] +15 Algorithm Points", "$ Mastery Level Increased!"]);

            // Trigger confetti or similar effect if possible (visual only for now)
        }, 2000);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(currentCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-6 h-full min-h-[700px]">
            <div className="flex flex-1 gap-6 min-h-0 overflow-hidden">
                {/* Problem Sidebar (Optional) */}
                <AnimatePresence>
                    {showProblemSidebar && problem && (
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "35%", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="flex flex-col gap-4 overflow-hidden border-r border-border/30 pr-6"
                        >
                            <Card className="flex-1 cyber-card overflow-y-auto p-6 bg-card/30 backdrop-blur-sm space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent leading-relaxed">
                                        {problem.title}
                                    </h2>
                                    <Badge variant="outline" className="text-[10px]">{problem.platform}</Badge>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">Description</h4>
                                        <p className="text-sm leading-relaxed text-muted-foreground">{problem.description}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">Input Format</h4>
                                        <div className="p-3 bg-background/50 rounded-lg text-xs leading-relaxed border border-border/20">
                                            {problem.inputFormat}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">Output Format</h4>
                                        <div className="p-3 bg-background/50 rounded-lg text-xs leading-relaxed border border-border/20">
                                            {problem.outputFormat}
                                        </div>
                                    </div>

                                    {problem.testCases && (
                                        <div className="space-y-3">
                                            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">Sample Cases</h4>
                                            {problem.testCases.map((tc: any, i: number) => (
                                                <div key={i} className="space-y-2 p-3 bg-background/30 rounded border border-border/10">
                                                    <div className="flex justify-between text-[10px] font-mono mb-1">
                                                        <span className="text-muted-foreground">Sample Input #{i + 1}</span>
                                                        <Copy className="w-3 h-3 cursor-pointer hover:text-[var(--neon-cyan)]" />
                                                    </div>
                                                    <pre className="text-[10px] overflow-x-auto">{tc.input}</pre>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Editor Area */}
                <div className="flex-1 flex flex-col gap-6 min-h-0">
                    <Card className="flex-[3] cyber-card flex flex-col bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden relative">
                        {/* Sidebar Toggle */}
                        {problem && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowProblemSidebar(!showProblemSidebar)}
                                className="absolute -left-3 top-1/2 -translate-y-1/2 z-50 h-6 w-6 rounded-full bg-background border border-border/50 shadow-lg text-[var(--neon-cyan)] hover:bg-background"
                            >
                                {showProblemSidebar ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </Button>
                        )}

                        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/50">
                            <div className="flex items-center gap-3">
                                <Select value={language} onValueChange={handleLanguageChange}>
                                    <SelectTrigger className="w-[140px] h-8 bg-background/50 border-border/50 text-xs">
                                        <SelectValue placeholder="Language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(LANGUAGE_TEMPLATES).map(lang => (
                                            <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {problem && (
                                    <div className="flex items-center gap-2 px-2 py-1 bg-[var(--neon-cyan)]/10 rounded border border-[var(--neon-cyan)]/20">
                                        <Info className="w-3 h-3 text-[var(--neon-cyan)]" />
                                        <span className="text-[10px] font-bold text-[var(--neon-cyan)] uppercase tracking-tighter">Solving Mode Active</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8 text-muted-foreground">
                                    {isCopied ? <Check className="h-4 w-4 text-[var(--neon-green)]" /> : <Copy className="h-4 w-4" />}
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                    <Save className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <textarea
                            value={currentCode}
                            onChange={(e) => setCodeByLanguage(prev => ({ ...prev, [language]: e.target.value }))}
                            className="flex-1 bg-transparent p-6 font-mono text-sm resize-none focus:outline-none text-foreground leading-relaxed selection:bg-[var(--neon-cyan)]/30"
                            spellCheck={false}
                        />
                        <div className="p-4 bg-background/50 border-t border-border/50 flex justify-end gap-3">
                            <Button variant="ghost" onClick={handleReset} size="sm" className="text-xs h-9">
                                <RotateCcw className="w-4 h-4 mr-2" /> Reset
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleRun}
                                disabled={isRunning}
                                className="h-9 px-4 text-xs font-bold border-border/50"
                            >
                                <Play className="w-4 h-4 mr-2" /> Run Console
                            </Button>
                            {problem && (
                                <Button
                                    variant="outline"
                                    onClick={handleRunTests}
                                    disabled={isRunning}
                                    className="h-9 px-4 text-xs font-bold border-[var(--neon-purple)]/50 text-[var(--neon-purple)]"
                                >
                                    <Beaker className="w-4 h-4 mr-2" /> Run Tests
                                </Button>
                            )}
                            <Button
                                onClick={handleSubmit}
                                disabled={isRunning || isSubmitted}
                                className={`bg-gradient-to-r ${isSubmitted ? 'from-green-500 to-emerald-600' : 'from-[var(--neon-cyan)] to-[var(--neon-purple)]'} h-9 px-6 text-xs font-bold transition-all`}
                            >
                                {isSubmitted ? (
                                    <>
                                        <Check className="w-4 h-4 mr-2" /> Submitted
                                    </>
                                ) : (
                                    <>
                                        <Send className={`w-4 h-4 mr-2 ${isRunning ? 'animate-pulse' : ''}`} />
                                        Submit Solution
                                    </>
                                )}
                            </Button>
                        </div>
                    </Card>

                    {/* Terminal Area */}
                    <Card className="flex-[2] cyber-card flex flex-col bg-[#050505] border-border/50 overflow-hidden relative">
                        <div className="flex items-center justify-between px-4 truncate border-b border-border/50 bg-[#0a0a0a]">
                            <div className="flex h-11">
                                <button
                                    onClick={() => setActiveTerminalTab("console")}
                                    className={`px-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all ${activeTerminalTab === "console" ? 'border-[var(--neon-cyan)] text-[var(--neon-cyan)] bg-[var(--neon-cyan)]/5' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                                >
                                    <Terminal className="w-3 h-3" /> Console Output
                                </button>
                                {problem && (
                                    <button
                                        onClick={() => setActiveTerminalTab("test-cases")}
                                        className={`px-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all ${activeTerminalTab === "test-cases" ? 'border-[var(--neon-purple)] text-[var(--neon-purple)] bg-[var(--neon-purple)]/5' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                                    >
                                        <Beaker className="w-3 h-3" /> Test Cases {testResults.length > 0 && `(${testResults.filter(r => r.status === 'pass').length}/${testResults.length})`}
                                    </button>
                                )}
                            </div>
                            {isSubmitted && (
                                <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--neon-green)] animate-bounce">
                                    <Trophy className="w-3 h-3" /> Mastery Gained!
                                </div>
                            )}
                        </div>

                        <div className="flex-1 p-6 font-mono text-xs overflow-y-auto">
                            {activeTerminalTab === "console" ? (
                                <div className="space-y-2">
                                    {output.length === 0 ? (
                                        <p className="text-muted-foreground italic">Execute the code to see terminal output...</p>
                                    ) : (
                                        output.map((line, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={line.startsWith('$') ? 'text-[var(--neon-cyan)]' : line.startsWith('>') ? 'text-[var(--neon-green)] font-bold' : 'text-foreground'}
                                            >
                                                {line}
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {problem?.testCases?.map((tc: ProblemTestCase, i: number) => {
                                        const result = testResults[i] || { status: 'pending' };
                                        return (
                                            <div key={i} className={`p-4 rounded border transition-all ${result.status === 'pass' ? 'border-green-500/30 bg-green-500/5' :
                                                result.status === 'fail' ? 'border-red-500/30 bg-red-500/5' :
                                                    result.status === 'running' ? 'border-[var(--neon-purple)]/50 bg-[var(--neon-purple)]/5 animate-pulse' :
                                                        'border-border/20 bg-background/30'
                                                }`}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-[10px] font-bold text-muted-foreground">TEST CASE #{i + 1}</span>
                                                    {result.status === 'pass' && <Check className="w-3 h-3 text-green-500" />}
                                                </div>
                                                <div className="space-y-2">
                                                    <div>
                                                        <div className="text-[8px] uppercase text-muted-foreground mb-1">Input</div>
                                                        <div className="bg-black/50 p-2 rounded text-[10px] truncate">{tc.input}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-[8px] uppercase text-muted-foreground mb-1">Expected Output</div>
                                                        <div className="bg-black/50 p-2 rounded text-[10px] truncate">{tc.output}</div>
                                                    </div>
                                                    {result.actual && (
                                                        <div>
                                                            <div className="text-[8px] uppercase text-muted-foreground mb-1">Actual Output</div>
                                                            <div className="bg-black/50 p-2 rounded text-[10px] truncate text-green-500">{result.actual}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            {isRunning && activeTerminalTab === "console" && (
                                <motion.div
                                    animate={{ opacity: [0, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="w-2 h-3 bg-[var(--neon-cyan)] inline-block ml-1 align-middle"
                                />
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
