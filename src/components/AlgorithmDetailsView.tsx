import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  getAlgorithmDetails,
  AlgorithmDetailedInfo,
} from "@/lib/algorithm-detailed-info";
import { Clock, HardDrive, BookOpen, Target, Code2, Zap } from "lucide-react";

interface AlgorithmDetailsViewProps {
  slug: string;
}

export default function AlgorithmDetailsView({
  slug,
}: AlgorithmDetailsViewProps) {
  const algorithm = getAlgorithmDetails(slug);
  const [copyFeedback, setCopyFeedback] = useState("");

  if (!algorithm) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Algorithm not found</p>
      </div>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback("Copied!");
    setTimeout(() => setCopyFeedback(""), 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-500/20 text-green-700 border-green-500/30";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
      case "advanced":
        return "bg-orange-500/20 text-orange-700 border-orange-500/30";
      case "expert":
        return "bg-red-500/20 text-red-700 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-500/30";
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{algorithm.name}</h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              {algorithm.description}
            </p>
          </div>
          <Badge className={`${getDifficultyColor(algorithm.difficulty)} shrink-0 text-xs sm:text-sm`}>
            {algorithm.difficulty}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs sm:text-sm">{algorithm.category}</Badge>
          <Badge variant="outline" className="text-xs sm:text-sm">{algorithm.domain}</Badge>
        </div>
      </div>

      {/* Complexity Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Card className="p-4 sm:p-5 md:p-6 bg-card/50 border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--neon-cyan)]" />
            <h3 className="font-semibold text-sm sm:text-base">Time Complexity</h3>
          </div>
          <div className="space-y-2 text-xs sm:text-sm">
            <div>
              <span className="text-muted-foreground">Best: </span>
              <code className="bg-background px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm">
                {algorithm.timeComplexity.best}
              </code>
            </div>
            <div>
              <span className="text-muted-foreground">Average: </span>
              <code className="bg-background px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm">
                {algorithm.timeComplexity.average}
              </code>
            </div>
            <div>
              <span className="text-muted-foreground">Worst: </span>
              <code className="bg-background px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm">
                {algorithm.timeComplexity.worst}
              </code>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-5 md:p-6 bg-card/50 border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <HardDrive className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--neon-pink)]" />
            <h3 className="font-semibold text-sm sm:text-base">Space Complexity</h3>
          </div>
          <div>
            <code className="bg-background px-2 sm:px-3 py-1 sm:py-2 rounded inline-block text-xs sm:text-sm">
              {algorithm.spaceComplexity}
            </code>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="explanation" className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 gap-1">
          <TabsTrigger value="explanation" className="text-[10px] sm:text-xs lg:text-sm px-1 sm:px-3">
            Overview
          </TabsTrigger>
          <TabsTrigger value="pseudocode" className="text-[10px] sm:text-xs lg:text-sm px-1 sm:px-3">
            Code
          </TabsTrigger>
          <TabsTrigger value="steps" className="text-[10px] sm:text-xs lg:text-sm px-1 sm:px-3">
            Steps
          </TabsTrigger>
          <TabsTrigger value="examples" className="text-[10px] sm:text-xs lg:text-sm px-1 sm:px-3">
            Examples
          </TabsTrigger>
          <TabsTrigger value="related" className="text-[10px] sm:text-xs lg:text-sm px-1 sm:px-3">
            Related
          </TabsTrigger>
          <TabsTrigger value="usage" className="text-[10px] sm:text-xs lg:text-sm px-1 sm:px-3">
            Usage
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="explanation" className="space-y-4 sm:space-y-6">
          <Card className="p-4 sm:p-5 md:p-6 bg-card/50 border-border/50">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--neon-cyan)]" />
              What is {algorithm.name}?
            </h2>
            <p className="text-sm sm:text-base text-foreground leading-relaxed mb-4">
              {algorithm.explanation}
            </p>
            <div className="bg-background/50 p-4 rounded-lg border border-border/30">
              <p className="text-sm text-muted-foreground">
                {algorithm.description}
              </p>
            </div>
          </Card>

          {/* Key Points */}
          {algorithm.keyPoints && algorithm.keyPoints.length > 0 && (
            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[var(--neon-pink)]" />
                Key Points
              </h3>
              <ul className="space-y-2">
                {algorithm.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex gap-2 text-sm">
                    <span className="text-[var(--neon-cyan)]">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </TabsContent>

        {/* Pseudocode Tab */}
        <TabsContent value="pseudocode" className="space-y-4">
          {algorithm.pseudocode ? (
            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-[var(--neon-purple)]" />
                  Pseudocode
                </h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(algorithm.pseudocode || "")}
                >
                  {copyFeedback || "Copy"}
                </Button>
              </div>
              <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm border border-border/30">
                <code className="text-foreground">{algorithm.pseudocode}</code>
              </pre>
            </Card>
          ) : (
            <Card className="p-6 bg-card/50 border-border/50">
              <p className="text-muted-foreground">
                No pseudocode available for this algorithm.
              </p>
            </Card>
          )}
        </TabsContent>

        {/* Steps Tab */}
        <TabsContent value="steps" className="space-y-4">
          {algorithm.stepByStep && algorithm.stepByStep.length > 0 ? (
            <>
              <Card className="p-6 bg-card/50 border-border/50">
                <h3 className="text-lg font-bold mb-4">Step-by-Step Guide</h3>
                <ol className="space-y-3">
                  {algorithm.stepByStep.map((step, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="bg-[var(--neon-cyan)] text-background font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            </>
          ) : null}

          {algorithm.dryRunExample && (
            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="text-lg font-bold mb-4">Example Dry Run</h3>
              <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm border border-border/30">
                <code className="text-foreground">
                  {algorithm.dryRunExample}
                </code>
              </pre>
            </Card>
          )}
        </TabsContent>

        {/* Examples Tab */}
        <TabsContent value="examples" className="space-y-4">
          {algorithm.realWorldExamples && algorithm.realWorldExamples.length > 0 && (
            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="text-lg font-bold mb-4">Real-World Examples</h3>
              <ul className="space-y-2">
                {algorithm.realWorldExamples.map((example, idx) => (
                  <li key={idx} className="flex gap-2 text-sm">
                    <span className="text-[var(--neon-purple)]">→</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </TabsContent>

        {/* Related Tab */}
        <TabsContent value="related" className="space-y-4">
          {algorithm.prerequisites && algorithm.prerequisites.length > 0 && (
            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="text-lg font-bold mb-4">Prerequisites</h3>
              <div className="flex flex-wrap gap-2">
                {algorithm.prerequisites.map((prereq, idx) => (
                  <Badge key={idx} variant="outline">
                    {prereq}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {algorithm.relatedAlgorithms &&
            algorithm.relatedAlgorithms.length > 0 && (
              <Card className="p-6 bg-card/50 border-border/50">
                <h3 className="text-lg font-bold mb-4">Related Algorithms</h3>
                <div className="flex flex-wrap gap-2">
                  {algorithm.relatedAlgorithms.map((related, idx) => (
                    <Badge key={idx} variant="secondary">
                      {related}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
        </TabsContent>

        {/* Usage Tab */}
        <TabsContent value="usage" className="space-y-4">
          {algorithm.advantages && algorithm.advantages.length > 0 && (
            <Card className="p-6 bg-green-500/10 border-green-500/20">
              <h3 className="text-lg font-bold mb-4 text-green-600 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Advantages
              </h3>
              <ul className="space-y-2">
                {algorithm.advantages.map((adv, idx) => (
                  <li key={idx} className="flex gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {algorithm.disadvantages && algorithm.disadvantages.length > 0 && (
            <Card className="p-6 bg-red-500/10 border-red-500/20">
              <h3 className="text-lg font-bold mb-4 text-red-600">
                Disadvantages
              </h3>
              <ul className="space-y-2">
                {algorithm.disadvantages.map((dis, idx) => (
                  <li key={idx} className="flex gap-2 text-sm">
                    <span className="text-red-600">✗</span>
                    <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {algorithm.whenToUse && algorithm.whenToUse.length > 0 && (
            <Card className="p-6 bg-blue-500/10 border-blue-500/20">
              <h3 className="text-lg font-bold mb-4 text-blue-600">
                When to Use
              </h3>
              <ul className="space-y-2">
                {algorithm.whenToUse.map((use, idx) => (
                  <li key={idx} className="flex gap-2 text-sm">
                    <span className="text-blue-600">→</span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
