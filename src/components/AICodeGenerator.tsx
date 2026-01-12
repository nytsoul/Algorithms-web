import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Code2, 
  Copy, 
  Check, 
  Loader2, 
  Download,
  RefreshCw,
  ChevronDown,
  Zap,
  Brain,
  Clock
} from "lucide-react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  generateAlgorithmCode, 
  SUPPORTED_LANGUAGES, 
  type LanguageId,
  type GeneratedCode,
  type AlgorithmInfo
} from "@/lib/gemini-ai";

interface AICodeGeneratorProps {
  algorithm: AlgorithmInfo;
}

export default function AICodeGenerator({ algorithm }: AICodeGeneratorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>("python");
  const [generatedCodes, setGeneratedCodes] = useState<Record<string, GeneratedCode>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [expandedLanguages, setExpandedLanguages] = useState<Set<string>>(new Set(["python"]));
  const [cooldownTime, setCooldownTime] = useState(0);

  // Cooldown timer
  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setTimeout(() => setCooldownTime(cooldownTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownTime]);

  const handleGenerate = useCallback(async () => {
    if (generatedCodes[selectedLanguage] && !generatedCodes[selectedLanguage].explanation.includes("rate")) {
      // Already generated successfully, just expand
      setExpandedLanguages(prev => new Set([...prev, selectedLanguage]));
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateAlgorithmCode(algorithm, selectedLanguage);
      setGeneratedCodes(prev => ({
        ...prev,
        [selectedLanguage]: result
      }));
      setExpandedLanguages(prev => new Set([...prev, selectedLanguage]));
      
      // Check if rate limited and set cooldown
      if (result.explanation.includes("rate") || result.explanation.includes("Rate")) {
        setCooldownTime(30);
      }
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [algorithm, selectedLanguage, generatedCodes]);

  const handleRegenerate = useCallback(async (langId: LanguageId) => {
    if (cooldownTime > 0) return;
    
    setIsGenerating(true);
    try {
      const result = await generateAlgorithmCode(algorithm, langId);
      setGeneratedCodes(prev => ({
        ...prev,
        [langId]: result
      }));
      
      // Check if rate limited
      if (result.explanation.includes("rate") || result.explanation.includes("Rate")) {
        setCooldownTime(30);
      }
    } catch (error) {
      console.error("Regeneration failed:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [algorithm]);

  const handleCopy = useCallback(async (code: string, langId: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(langId);
    setTimeout(() => setCopiedCode(null), 2000);
  }, []);

  const handleDownload = useCallback((code: string, langId: string) => {
    const lang = SUPPORTED_LANGUAGES.find(l => l.id === langId);
    const filename = `${algorithm.name.toLowerCase().replace(/\s+/g, '_')}${lang?.extension || '.txt'}`;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [algorithm.name]);

  const toggleLanguage = useCallback((langId: string) => {
    setExpandedLanguages(prev => {
      const next = new Set(prev);
      if (next.has(langId)) {
        next.delete(langId);
      } else {
        next.add(langId);
      }
      return next;
    });
  }, []);

  const generatedLanguages = Object.keys(generatedCodes);

  return (
    <Card className="cyber-card p-6 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm border-[var(--neon-purple)]/30">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-6 h-6 text-[var(--neon-purple)]" />
        </motion.div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] bg-clip-text text-transparent">
          🤖 AI Code Generator
        </h2>
        <Badge variant="outline" className="border-[var(--neon-purple)]/50 text-[var(--neon-purple)] text-xs">
          <Brain className="w-3 h-3 mr-1" />
          Powered by Gemini AI
        </Badge>
      </div>

      {/* Language Selector */}
      <div className="flex gap-4 mb-6">
        <Select value={selectedLanguage} onValueChange={(v) => setSelectedLanguage(v as LanguageId)}>
          <SelectTrigger className="w-[250px] border-[var(--neon-purple)]/30 bg-background/50">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent className="bg-card border-[var(--neon-purple)]/30 max-h-[300px]">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <SelectItem key={lang.id} value={lang.id} className="cursor-pointer">
                <span className="flex items-center gap-2">
                  <span>{lang.icon}</span>
                  <span>{lang.name}</span>
                  {generatedCodes[lang.id] && !generatedCodes[lang.id].explanation.includes("rate") && (
                    <Check className="w-3 h-3 text-[var(--neon-green)] ml-2" />
                  )}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={handleGenerate}
          disabled={isGenerating || cooldownTime > 0}
          className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] hover:opacity-90 transition-opacity"
        >
          {cooldownTime > 0 ? (
            <>
              <Clock className="w-4 h-4 mr-2" />
              Wait {cooldownTime}s
            </>
          ) : isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : generatedCodes[selectedLanguage] && !generatedCodes[selectedLanguage].explanation.includes("rate") ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Generated ✓
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Generate Code
            </>
          )}
        </Button>
      </div>

      {/* Rate Limit Warning */}
      {cooldownTime > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-[var(--neon-yellow)]/10 border border-[var(--neon-yellow)]/30 rounded-lg"
        >
          <div className="flex items-center gap-2 text-[var(--neon-yellow)]">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">
              ⚠️ API rate limited. Please wait {cooldownTime}s before generating more code.
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Template code has been provided. Full AI-generated code will be available after cooldown.
          </p>
        </motion.div>
      )}

      {/* Generated Languages Tags */}
      {generatedLanguages.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs text-muted-foreground">Generated:</span>
          {generatedLanguages.map((langId) => {
            const lang = SUPPORTED_LANGUAGES.find(l => l.id === langId);
            const isRateLimited = generatedCodes[langId]?.explanation.includes("rate");
            return (
              <Badge
                key={langId}
                variant="outline"
                className={`cursor-pointer hover:opacity-80 ${
                  isRateLimited 
                    ? "border-[var(--neon-yellow)]/50 text-[var(--neon-yellow)]" 
                    : "border-[var(--neon-green)]/50 text-[var(--neon-green)]"
                }`}
                onClick={() => toggleLanguage(langId)}
              >
                {lang?.icon} {lang?.name}
              </Badge>
            );
          })}
        </div>
      )}

      {/* Generated Code Blocks */}
      <AnimatePresence>
        {generatedLanguages.map((langId) => {
          const code = generatedCodes[langId];
          const lang = SUPPORTED_LANGUAGES.find(l => l.id === langId);
          const isExpanded = expandedLanguages.has(langId);

          return (
            <motion.div
              key={langId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4"
            >
              <Collapsible open={isExpanded} onOpenChange={() => toggleLanguage(langId)}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-t-lg border border-border/50 hover:bg-background/70 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{lang?.icon}</span>
                      <span className="font-semibold text-foreground">{lang?.name}</span>
                      <Badge variant="outline" className="text-xs border-[var(--neon-cyan)]/30">
                        {code.timeComplexity}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-[var(--neon-green)]/30">
                        Space: {code.spaceComplexity}
                      </Badge>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="border border-t-0 border-border/50 rounded-b-lg overflow-hidden">
                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-4 py-2 bg-background/30 border-b border-border/30">
                      <p className="text-xs text-muted-foreground">{code.explanation}</p>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRegenerate(langId as LanguageId)}
                          disabled={isGenerating}
                          className="h-7 text-xs"
                        >
                          <RefreshCw className={`w-3 h-3 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
                          Regenerate
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(code.code, langId)}
                          className="h-7 text-xs"
                        >
                          {copiedCode === langId ? (
                            <>
                              <Check className="w-3 h-3 mr-1 text-[var(--neon-green)]" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 mr-1" />
                              Copy
                            </>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(code.code, langId)}
                          className="h-7 text-xs"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>

                    {/* Code Block */}
                    <pre className="p-4 bg-background/50 overflow-x-auto max-h-[400px] overflow-y-auto">
                      <code className="text-xs text-foreground leading-relaxed font-mono whitespace-pre">
                        {code.code}
                      </code>
                    </pre>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Empty State */}
      {generatedLanguages.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 border border-dashed border-[var(--neon-purple)]/30 rounded-lg"
        >
          <Code2 className="w-12 h-12 mx-auto text-[var(--neon-purple)]/50 mb-4" />
          <p className="text-muted-foreground mb-2">No code generated yet</p>
          <p className="text-sm text-muted-foreground">
            Select a programming language and click "Generate Code" to get started
          </p>
        </motion.div>
      )}

      {/* Pro Tips */}
      <div className="mt-6 p-4 bg-[var(--neon-purple)]/5 rounded-lg border border-[var(--neon-purple)]/20">
        <h4 className="text-sm font-semibold text-[var(--neon-purple)] mb-2">💡 Pro Tips</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Generate code in multiple languages to compare implementations</li>
          <li>• Use "Regenerate" to get alternative implementations</li>
          <li>• Download files directly for use in your projects</li>
          <li>• AI-generated code includes comments and examples</li>
        </ul>
      </div>
    </Card>
  );
}
