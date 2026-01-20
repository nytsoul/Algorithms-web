import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Cpu,
  HardDrive,
  Zap,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Shield,
  Target,
  Lightbulb,
  ChevronRight
} from "lucide-react";
import {
  AlgorithmDecisionEngine,
  decisionEngine,
  detectSystemContext,
  SystemContext,
  DecisionResult
} from "@/lib/decision-engine";
import { securityTester, SecurityAnalysis } from "@/lib/security-tester";
import { getRealWorldUseCases } from "@/lib/real-world-mappings";

export default function DecisionEngine() {
  const navigate = useNavigate();
  const { isAuthenticated, signOut, isLoading: authLoading } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [context, setContext] = useState<SystemContext>(detectSystemContext());
  const [decision, setDecision] = useState<DecisionResult | null>(null);
  const [security, setSecurity] = useState<SecurityAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  // Form state
  const [problemType, setProblemType] = useState<'sorting' | 'searching'>('sorting');
  const [inputSize, setInputSize] = useState('1000');
  const [dataDistribution, setDataDistribution] = useState('random');
  const [dataStructure, setDataStructure] = useState('array');
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/auth", { replace: true, state: { from: location } });
    }
  }, [isAuthenticated, authLoading, navigate, location]);

  const handleLogout = async () => {
    await signOut();
  };

  const handleAnalyze = () => {
    setLoading(true);

    let result: DecisionResult;

    if (problemType === 'sorting') {
      result = decisionEngine.decideSortingAlgorithm(parseInt(inputSize), dataDistribution);
    } else {
      result = decisionEngine.decideSearchingAlgorithm(
        dataStructure as any,
        isSorted,
        parseInt(inputSize)
      );
    }

    setDecision(result);

    // Get security analysis
    const secAnalysis = securityTester.analyzeAlgorithm(
      result.primaryChoice.algorithmSlug,
      result.primaryChoice.algorithmName
    );
    setSecurity(secAnalysis);

    setLoading(false);
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
      {sidebarOpen && <Sidebar onLogout={handleLogout} isOpen={sidebarOpen} />}

      <div className={`flex-1 ${sidebarOpen ? "ml-80" : ""} flex flex-col transition-all duration-300`}>
        <div className="fixed inset-0 cyber-grid pointer-events-none" />
        <div className="scanline fixed inset-0 pointer-events-none" />

        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="relative z-10 w-full px-6 py-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-4">
                <Brain className="w-12 h-12 text-[var(--neon-cyan)]" />
                <h1 className="text-5xl font-bold bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent">
                  Algorithm Decision Engine
                </h1>
              </div>
              <p className="text-xl text-muted-foreground">
                Context-aware algorithm recommendations based on your hardware, constraints, and data characteristics
              </p>
            </div>

            {/* System Context Card */}
            <Card className="cyber-card p-6 mb-8 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[var(--neon-cyan)]" />
                Detected System Context
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">CPU Cores</p>
                  <p className="text-2xl font-bold text-[var(--neon-cyan)]">{context.hardware.cpuCores}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">RAM</p>
                  <p className="text-2xl font-bold text-[var(--neon-green)]">{context.hardware.ramGB} GB</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Architecture</p>
                  <p className="text-2xl font-bold text-[var(--neon-purple)]">{context.hardware.architecture}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Energy Mode</p>
                  <p className="text-2xl font-bold text-[var(--neon-pink)]">{context.constraints.energyEfficiency}</p>
                </div>
              </div>
            </Card>

            {/* Input Form */}
            <Card className="cyber-card p-6 mb-8 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[var(--neon-cyan)]" />
                Problem Specification
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Problem Type</label>
                  <Select value={problemType} onValueChange={(v: any) => setProblemType(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sorting">Sorting</SelectItem>
                      <SelectItem value="searching">Searching</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Input Size</label>
                  <Input
                    type="number"
                    value={inputSize}
                    onChange={(e) => setInputSize(e.target.value)}
                    placeholder="e.g., 1000"
                  />
                </div>

                {problemType === 'sorting' ? (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Data Distribution</label>
                    <Select value={dataDistribution} onValueChange={setDataDistribution}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="random">Random</SelectItem>
                        <SelectItem value="nearly-sorted">Nearly Sorted</SelectItem>
                        <SelectItem value="reverse-sorted">Reverse Sorted</SelectItem>
                        <SelectItem value="many-duplicates">Many Duplicates</SelectItem>
                        <SelectItem value="uniform">Uniform</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Data Structure</label>
                      <Select value={dataStructure} onValueChange={setDataStructure}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="array">Array</SelectItem>
                          <SelectItem value="tree">Tree</SelectItem>
                          <SelectItem value="graph">Graph</SelectItem>
                          <SelectItem value="hash">Hash Table</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSorted}
                        onChange={(e) => setIsSorted(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label className="text-sm font-medium">Data is sorted</label>
                    </div>
                  </>
                )}
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={loading}
                className="mt-6 w-full bg-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/80"
              >
                {loading ? 'Analyzing...' : 'Analyze & Recommend'}
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>

            {/* Results */}
            {decision && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Primary Recommendation */}
                <Card className="cyber-card p-8 bg-gradient-to-br from-[var(--neon-cyan)]/10 to-[var(--neon-purple)]/10 border-[var(--neon-cyan)]/50">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <Badge className="mb-2 bg-[var(--neon-green)]/20 text-[var(--neon-green)]">
                        RECOMMENDED
                      </Badge>
                      <h2 className="text-3xl font-bold text-[var(--neon-cyan)]">
                        {decision.primaryChoice.algorithmName}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Confidence: {decision.primaryChoice.confidence}%
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Estimated Time</div>
                      <div className="text-2xl font-bold text-[var(--neon-cyan)]">
                        {decision.primaryChoice.estimatedTimeMs.toFixed(2)}ms
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-[var(--neon-cyan)]" />
                        <span className="text-sm font-medium">Memory</span>
                      </div>
                      <div className="text-xl font-bold">{decision.primaryChoice.estimatedMemoryMB.toFixed(2)} MB</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-[var(--neon-green)]" />
                        <span className="text-sm font-medium">Energy Score</span>
                      </div>
                      <div className="text-xl font-bold">{decision.primaryChoice.energyScore}/100</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-[var(--neon-green)]" />
                        <span className="text-sm font-medium">Confidence</span>
                      </div>
                      <div className="text-xl font-bold">{decision.primaryChoice.confidence}%</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-[var(--neon-cyan)]" />
                      Why This Algorithm?
                    </h4>
                    <ul className="space-y-1">
                      {decision.primaryChoice.reasoning.map((reason, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-[var(--neon-green)] mt-0.5 shrink-0" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>

                {/* Detailed Analysis Tabs */}
                <Tabs defaultValue="explanation" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="explanation">Explanation</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
                    <TabsTrigger value="real-world">Real-World</TabsTrigger>
                  </TabsList>

                  {/* Explanation Tab */}
                  <TabsContent value="explanation">
                    <Card className="cyber-card p-6">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3 text-[var(--neon-cyan)]">
                            ✅ Why This Algorithm?
                          </h4>
                          <ul className="space-y-2">
                            {decision.explanation.whyThisAlgorithm.map((reason, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-[var(--neon-green)]">•</span>
                                <span className="text-sm">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 text-[var(--neon-pink)]">
                            ❌ Why Not Others?
                          </h4>
                          <ul className="space-y-2">
                            {decision.explanation.whyNotOthers.map((reason, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-[var(--neon-pink)]">•</span>
                                <span className="text-sm">{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3 text-[var(--neon-purple)]">
                            ⚠️ Failure Conditions
                          </h4>
                          <ul className="space-y-2">
                            {decision.explanation.failureConditions.map((condition, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-[var(--neon-purple)] mt-0.5 shrink-0" />
                                <span className="text-sm">{condition}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {decision.riskAnalysis && (
                          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                            <h4 className="font-semibold mb-2 text-red-400">Worst Case Scenario</h4>
                            <p className="text-sm mb-3">{decision.riskAnalysis.worstCaseScenario}</p>
                            <h5 className="font-semibold mb-2 text-sm">Mitigation Strategies:</h5>
                            <ul className="space-y-1">
                              {decision.riskAnalysis.mitigationStrategies.map((strategy, idx) => (
                                <li key={idx} className="text-sm flex items-start gap-2">
                                  <span className="text-green-400">→</span>
                                  {strategy}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </Card>
                  </TabsContent>

                  {/* Security Tab */}
                  <TabsContent value="security">
                    {security && (
                      <Card className="cyber-card p-6">
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">Security Analysis</h3>
                            <Badge
                              className={
                                security.dosRisk.score >= 80
                                  ? 'bg-red-500/20 text-red-400'
                                  : security.dosRisk.score >= 60
                                    ? 'bg-orange-500/20 text-orange-400'
                                    : security.dosRisk.score >= 40
                                      ? 'bg-yellow-500/20 text-yellow-400'
                                      : 'bg-green-500/20 text-green-400'
                              }
                            >
                              DoS Risk: {security.dosRisk.score}/100
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{security.dosRisk.description}</p>
                        </div>

                        <div className="space-y-4 mb-6">
                          <h4 className="font-semibold">Vulnerabilities</h4>
                          {security.vulnerabilities.map((vuln, idx) => (
                            <div
                              key={idx}
                              className="bg-background/50 rounded-lg p-4 border border-border/50"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-semibold">{vuln.description}</h5>
                                <Badge
                                  variant="outline"
                                  className={
                                    vuln.severity === 'critical'
                                      ? 'border-red-500 text-red-500'
                                      : vuln.severity === 'high'
                                        ? 'border-orange-500 text-orange-500'
                                        : 'border-yellow-500 text-yellow-500'
                                  }
                                >
                                  {vuln.severity.toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{vuln.exploitScenario}</p>
                              <div className="text-sm">
                                <span className="font-semibold text-[var(--neon-green)]">Mitigation: </span>
                                {vuln.mitigation}
                              </div>
                            </div>
                          ))}
                        </div>

                        {security.saferAlternatives.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3">Safer Alternatives</h4>
                            <div className="space-y-3">
                              {security.saferAlternatives.map((alt, idx) => (
                                <div key={idx} className="bg-[var(--neon-green)]/10 rounded-lg p-4 border border-[var(--neon-green)]/30">
                                  <h5 className="font-semibold text-[var(--neon-green)] mb-1">
                                    {alt.algorithmName}
                                  </h5>
                                  <p className="text-sm mb-1">{alt.whySafer}</p>
                                  <p className="text-xs text-muted-foreground">Tradeoffs: {alt.tradeoffs}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </Card>
                    )}
                  </TabsContent>

                  {/* Alternatives Tab */}
                  <TabsContent value="alternatives">
                    <Card className="cyber-card p-6">
                      <div className="space-y-4">
                        {decision.fallbacks.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3">Fallback Options</h4>
                            {decision.fallbacks.map((fallback, idx) => (
                              <div key={idx} className="bg-background/50 rounded-lg p-4 mb-3">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-semibold">{fallback.algorithmName}</h5>
                                  <Badge variant="outline">Confidence: {fallback.confidence}%</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{fallback.reason}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {decision.alternatives.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-3">When to Use Different Algorithms</h4>
                            {decision.alternatives.map((alt, idx) => (
                              <div key={idx} className="bg-background/50 rounded-lg p-4 mb-3">
                                <h5 className="font-semibold mb-1">{alt.algorithmName}</h5>
                                <p className="text-sm text-[var(--neon-cyan)] mb-1">
                                  Better when: {alt.whenToBetter}
                                </p>
                                <p className="text-sm text-muted-foreground">Tradeoffs: {alt.tradeoffs}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>
                  </TabsContent>

                  {/* Real-World Tab */}
                  <TabsContent value="real-world">
                    <Card className="cyber-card p-6">
                      <RealWorldUseCases algorithmSlug={decision.primaryChoice.algorithmSlug} />
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

// Real-World Use Cases Component
function RealWorldUseCases({ algorithmSlug }: { algorithmSlug: string }) {
  const useCases = getRealWorldUseCases(algorithmSlug);

  if (useCases.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No real-world use cases documented for this algorithm yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Real-World Production Usage</h3>
      {useCases.map((category, catIdx) => (
        <div key={catIdx}>
          <h4 className="text-lg font-semibold text-[var(--neon-cyan)] mb-3">{category.name}</h4>
          <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
          <div className="space-y-4">
            {category.useCases.map((useCase, ucIdx) => (
              <div key={ucIdx} className="bg-background/50 rounded-lg p-4 border border-border/50">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-semibold text-[var(--neon-cyan)]">{useCase.system}</h5>
                    <p className="text-sm text-muted-foreground">{useCase.company}</p>
                  </div>
                  {useCase.year && (
                    <Badge variant="outline" className="text-[var(--neon-purple)]">
                      Since {useCase.year}
                    </Badge>
                  )}
                </div>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Purpose:</span> {useCase.purpose}
                </p>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Scale:</span> {useCase.scale}
                </p>
                <p className="text-sm mb-2 text-[var(--neon-green)]">
                  <span className="font-semibold">Why:</span> {useCase.whyThisAlgorithm}
                </p>
                {useCase.challenges.length > 0 && (
                  <div className="text-sm mt-2">
                    <span className="font-semibold text-[var(--neon-pink)]">Challenges:</span>
                    <ul className="list-disc list-inside ml-2 mt-1">
                      {useCase.challenges.map((challenge, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
