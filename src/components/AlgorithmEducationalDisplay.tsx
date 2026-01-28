/**
 * Algorithm Educational Content Display Component
 * Displays comprehensive educational content for all algorithms
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Target, 
  Lightbulb, 
  Calculator, 
  Clock, 
  HardDrive, 
  CheckCircle, 
  XCircle, 
  Zap,
  Code,
  TrendingUp,
  FileText,
  GitBranch,
  Award,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  generateEducationalContent, 
  getEducationalContent, 
  hasDetailedContent,
  type AlgorithmEducationalContent 
} from '@/lib/algorithm-educational-content';

interface AlgorithmEducationalProps {
  name: string;
  slug: string;
  category: string;
  difficulty: string;
}

export default function AlgorithmEducationalDisplay({
  name,
  slug,
  category,
  difficulty
}: AlgorithmEducationalProps) {
  // Get or generate educational content
  const content: AlgorithmEducationalContent = hasDetailedContent(slug)
    ? getEducationalContent(slug)!
    : generateEducationalContent(name, slug, category, difficulty);

  return (
    <div className="space-y-8">
      {/* Definition Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-blue-400">Definition</h2>
          </div>
          <p className="text-foreground text-lg leading-relaxed">{content.definition}</p>
        </Card>
      </motion.div>

      {/* Explanation Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="p-6 bg-card/50 border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <FileText className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-purple-400">Detailed Explanation</h2>
          </div>
          <div className="text-foreground leading-relaxed whitespace-pre-line">
            {content.explanation}
          </div>
        </Card>
      </motion.div>

      {/* Key Concepts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Target className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-green-400">Key Concepts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {content.keyConceptsList.map((concept, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20"
              >
                <Lightbulb className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-sm">{concept}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Card className="p-6 bg-card/50 border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <GitBranch className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-yellow-400">How It Works</h2>
          </div>
          <div className="space-y-3">
            {content.howItWorks.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 font-bold text-yellow-400">
                  {idx + 1}
                </div>
                <div className="flex-1 p-3 bg-background/50 rounded-lg border border-border/30">
                  <span>{step}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Mathematical Approach */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 bg-gradient-to-br from-pink-500/10 to-rose-500/10 border-pink-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-pink-500/20 rounded-lg">
              <Calculator className="w-6 h-6 text-pink-400" />
            </div>
            <h2 className="text-2xl font-bold text-pink-400">Mathematical Approach</h2>
          </div>
          
          <div className="space-y-6">
            {/* Problem Setup */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-pink-300">Problem Setup</h3>
              <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-pink-500/20">
                {content.mathematicalApproach.problemSetup}
              </pre>
            </div>

            {/* Solution Steps */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-pink-300">Solution Steps</h3>
              <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-pink-500/20">
                {content.mathematicalApproach.solutionSteps.join('\n')}
              </pre>
            </div>

            {/* Formula */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-pink-300">Mathematical Formula</h3>
              <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-pink-500/20 text-pink-200">
                {content.mathematicalApproach.formula}
              </pre>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Recurrence Relation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-orange-400">Recurrence Relation & Time Complexity Derivation</h2>
          </div>
          
          <div className="space-y-6">
            {/* Recurrence */}
            <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <h3 className="text-lg font-semibold mb-2 text-orange-300">Recurrence Relation</h3>
              <code className="text-2xl font-mono text-orange-200 block mb-3">
                {content.recurrenceRelation.relation}
              </code>
              <p className="text-sm text-muted-foreground">{content.recurrenceRelation.explanation}</p>
            </div>

            {/* Base Case */}
            <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
              <h3 className="text-lg font-semibold mb-2 text-orange-300">Base Case</h3>
              <code className="text-lg font-mono text-orange-200">{content.recurrenceRelation.baseCase}</code>
            </div>

            {/* Derivation */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-orange-300">Step-by-Step Derivation</h3>
              <div className="bg-background/50 p-4 rounded-lg border border-orange-500/20 space-y-2">
                {content.recurrenceRelation.derivation.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    {step ? (
                      <>
                        <ArrowRight className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                        <code className="font-mono text-sm">{step}</code>
                      </>
                    ) : (
                      <div className="h-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Time Complexity Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 bg-card/50 border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-cyan-400">Time Complexity Analysis</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Best Case */}
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30 text-center">
              <p className="text-sm text-green-400 mb-2">Best Case</p>
              <code className="text-3xl font-mono font-bold text-green-300">
                {content.timeComplexityAnalysis.bestCase.complexity}
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                {content.timeComplexityAnalysis.bestCase.explanation}
              </p>
            </div>
            
            {/* Average Case */}
            <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30 text-center">
              <p className="text-sm text-yellow-400 mb-2">Average Case</p>
              <code className="text-3xl font-mono font-bold text-yellow-300">
                {content.timeComplexityAnalysis.averageCase.complexity}
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                {content.timeComplexityAnalysis.averageCase.explanation}
              </p>
            </div>
            
            {/* Worst Case */}
            <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30 text-center">
              <p className="text-sm text-red-400 mb-2">Worst Case</p>
              <code className="text-3xl font-mono font-bold text-red-300">
                {content.timeComplexityAnalysis.worstCase.complexity}
              </code>
              <p className="text-xs text-muted-foreground mt-2">
                {content.timeComplexityAnalysis.worstCase.explanation}
              </p>
            </div>
          </div>

          {/* Derivation */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-cyan-300">Complexity Derivation</h3>
            <div className="bg-background/50 p-4 rounded-lg border border-cyan-500/20 space-y-1">
              {content.timeComplexityAnalysis.derivation.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <code className="font-mono text-sm">{step}</code>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Space Complexity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <Card className="p-6 bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-violet-500/20 rounded-lg">
              <HardDrive className="w-6 h-6 text-violet-400" />
            </div>
            <h2 className="text-2xl font-bold text-violet-400">Space Complexity</h2>
          </div>
          
          <div className="flex items-center gap-6">
            <code className="text-4xl font-mono font-bold text-violet-300">
              {content.spaceComplexityAnalysis.complexity}
            </code>
            <p className="text-muted-foreground">{content.spaceComplexityAnalysis.explanation}</p>
          </div>
        </Card>
      </motion.div>

      {/* Example Problem Solving */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Code className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-emerald-400">Example Problem Solving</h2>
          </div>
          
          <div className="space-y-4">
            {/* Problem */}
            <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <h3 className="text-lg font-semibold mb-2 text-emerald-300">Problem</h3>
              <p>{content.exampleProblem.problem}</p>
            </div>

            {/* Input */}
            <div className="p-4 bg-background/50 rounded-lg border border-emerald-500/20">
              <h3 className="text-lg font-semibold mb-2 text-emerald-300">Input</h3>
              <code className="font-mono text-sm">{content.exampleProblem.input}</code>
            </div>

            {/* Solution Steps */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-emerald-300">Step-by-Step Solution</h3>
              <div className="space-y-2">
                {content.exampleProblem.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-emerald-400">
                      {idx + 1}
                    </div>
                    <code className="flex-1 p-2 bg-background/50 rounded border border-emerald-500/20 font-mono text-sm">
                      {step}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            {/* Output */}
            <div className="p-4 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
              <h3 className="text-lg font-semibold mb-2 text-emerald-300">Output</h3>
              <code className="font-mono font-bold text-emerald-200">{content.exampleProblem.output}</code>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Advantages & Disadvantages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Advantages */}
          <Card className="p-6 bg-green-500/5 border-green-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-green-400">Advantages</h2>
            </div>
            <ul className="space-y-2">
              {content.advantages.map((adv, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-sm">{adv}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Disadvantages */}
          <Card className="p-6 bg-red-500/5 border-red-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-red-400">Disadvantages</h2>
            </div>
            <ul className="space-y-2">
              {content.disadvantages.map((dis, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span className="text-sm">{dis}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </motion.div>

      {/* Applications & Prerequisites */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Applications */}
          <Card className="p-6 bg-card/50 border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-blue-400">Applications</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {content.applications.map((app, idx) => (
                <Badge key={idx} variant="secondary" className="bg-blue-500/10 text-blue-300 border-blue-500/30">
                  {app}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Prerequisites */}
          <Card className="p-6 bg-card/50 border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Award className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-xl font-bold text-amber-400">Prerequisites</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {content.prerequisites.map((prereq, idx) => (
                <Badge key={idx} variant="outline" className="border-amber-500/30 text-amber-300">
                  {prereq}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
