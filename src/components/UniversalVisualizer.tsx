/**
 * Universal Algorithm Visualizer Component
 * Provides visualization for all 1000 algorithms with proper UI alignment
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, RotateCcw, SkipBack, SkipForward, 
  ChevronLeft, ChevronRight, Settings, Maximize2,
  Clock, Cpu, HardDrive, Activity, Code, Eye,
  Grid, BarChart2, GitBranch, Circle, Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  getVisualizationTypes,
  getVisualizationConfig,
  generateVisualizationSteps,
  type VisualizationType,
  type VisualizationStep
} from '@/lib/universal-visualization-generator';

interface UniversalVisualizerProps {
  algorithmName: string;
  algorithmSlug: string;
  category: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  pseudocode?: string[];
  customData?: any;
  hideHeader?: boolean;
}

export default function UniversalVisualizer({
  algorithmName,
  algorithmSlug,
  category,
  timeComplexity = 'O(n)',
  spaceComplexity = 'O(1)',
  pseudocode = [],
  customData,
  hideHeader = false
}: UniversalVisualizerProps) {
  // Get visualization config
  const config = useMemo(() => getVisualizationConfig(algorithmSlug, category), [algorithmSlug, category]);
  const supportedModes = config.supportedModes;
  
  // State
  const [viewMode, setViewMode] = useState<VisualizationType>(config.primaryType);
  const [inputData, setInputData] = useState<any>(customData || config.defaultData);
  const [steps, setSteps] = useState<VisualizationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showCode, setShowCode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Generate steps when data changes
  useEffect(() => {
    const generatedSteps = generateVisualizationSteps(algorithmSlug, category, inputData);
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
  }, [algorithmSlug, category, inputData]);
  
  // Current step
  const currentStep = steps[currentStepIndex];
  const progress = steps.length > 0 ? ((currentStepIndex + 1) / steps.length) * 100 : 0;
  
  // Playback controls
  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, []);
  
  const stepForward = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  }, [currentStepIndex, steps.length]);
  
  const stepBackward = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [currentStepIndex]);
  
  // Auto-play effect
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000 / speed);
    
    return () => clearInterval(interval);
  }, [isPlaying, speed, steps.length]);
  
  // Render visualization based on type
  const renderVisualization = () => {
    if (!currentStep) {
      return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          Loading visualization...
        </div>
      );
    }
    
    switch (viewMode) {
      case 'array':
      case 'bars':
        return <ArrayVisualization step={currentStep} mode={viewMode} />;
      case 'matrix':
        return <MatrixVisualization step={currentStep} />;
      case 'binary-tree':
      case 'tree':
        return <TreeVisualization step={currentStep} />;
      case 'graph':
        return <GraphVisualization step={currentStep} />;
      case 'linked-list':
        return <LinkedListVisualization step={currentStep} />;
      case 'stack':
        return <StackVisualization step={currentStep} />;
      case 'queue':
        return <QueueVisualization step={currentStep} />;
      case 'heap':
        return <HeapVisualization step={currentStep} />;
      case 'hash-table':
        return <HashTableVisualization step={currentStep} />;
      case 'string':
        return <StringVisualization step={currentStep} />;
      case 'geometric':
        return <GeometricVisualization step={currentStep} />;
      case 'grid':
        return <GridVisualization step={currentStep} />;
      default:
        return <ArrayVisualization step={currentStep} mode="array" />;
    }
  };
  
  // Get icon for visualization mode
  const getModeIcon = (mode: VisualizationType) => {
    switch (mode) {
      case 'bars': return <BarChart2 className="w-4 h-4" />;
      case 'tree':
      case 'binary-tree': return <GitBranch className="w-4 h-4" />;
      case 'graph': return <Circle className="w-4 h-4" />;
      case 'matrix':
      case 'grid': return <Grid className="w-4 h-4" />;
      case 'stack':
      case 'queue': return <Layers className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };
  
  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-background p-6 overflow-auto' : ''}`}>
      {/* Header with algorithm info */}
      {!hideHeader && (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{algorithmName}</h2>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-500 border-cyan-500/30">
                <Clock className="w-3 h-3 mr-1" />
                {timeComplexity}
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/10 text-purple-500 border-purple-500/30">
                <HardDrive className="w-3 h-3 mr-1" />
                {spaceComplexity}
              </Badge>
            </div>
          </div>
          
          {/* View mode selector */}
          {supportedModes.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">View:</span>
              <div className="flex gap-1 p-1 bg-muted/30 rounded-lg">
                {supportedModes.map((mode) => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode(mode)}
                    className={viewMode === mode ? 'bg-background shadow-sm' : ''}
                  >
                    {getModeIcon(mode)}
                    <span className="ml-1 capitalize">{mode.replace('-', ' ')}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Main visualization area */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Visualization panel - takes more space */}
        <div className="xl:col-span-3 space-y-4">
          {/* Visualization container */}
          <Card className="p-6 bg-gradient-to-br from-background to-muted/20 border-border/50 min-h-[400px] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }} />
            </div>
            
            {/* Fullscreen toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            
            {/* Visualization content */}
            <div className="relative z-0 flex items-center justify-center min-h-[350px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStepIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  {renderVisualization()}
                </motion.div>
              </AnimatePresence>
            </div>
          </Card>
          
          {/* Step description */}
          <Card className="p-4 bg-muted/20 border-border/50">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-500 font-bold text-sm">{currentStepIndex + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-foreground font-medium">
                  {currentStep?.description || 'Initializing...'}
                </p>
                {currentStep?.stats && (
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Comparisons: <span className="text-cyan-500 font-mono">{currentStep.stats.comparisons}</span></span>
                    <span>Swaps: <span className="text-purple-500 font-mono">{currentStep.stats.swaps}</span></span>
                    <span>Operations: <span className="text-green-500 font-mono">{currentStep.stats.operations}</span></span>
                  </div>
                )}
              </div>
            </div>
          </Card>
          
          {/* Playback controls */}
          <Card className="p-4 bg-card/50 border-border/50">
            <div className="flex flex-col gap-4">
              {/* Progress bar */}
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground w-16">
                  {currentStepIndex + 1} / {steps.length}
                </span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-16 text-right">
                  {Math.round(progress)}%
                </span>
              </div>
              
              {/* Controls */}
              <div className="flex items-center justify-center gap-2">
                <Button variant="ghost" size="icon" onClick={reset} title="Reset">
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setCurrentStepIndex(0)} title="First step">
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={stepBackward} disabled={currentStepIndex === 0} title="Previous step">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                
                <Button
                  variant="default"
                  size="lg"
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90"
                  onClick={isPlaying ? pause : play}
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </Button>
                
                <Button variant="ghost" size="icon" onClick={stepForward} disabled={currentStepIndex >= steps.length - 1} title="Next step">
                  <ChevronRight className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setCurrentStepIndex(steps.length - 1)} title="Last step">
                  <SkipForward className="w-4 h-4" />
                </Button>
                
                {/* Speed control */}
                <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border/50">
                  <span className="text-xs text-muted-foreground">Speed:</span>
                  <div className="w-24">
                    <Slider
                      value={[speed]}
                      min={0.25}
                      max={4}
                      step={0.25}
                      onValueChange={([v]) => setSpeed(v)}
                    />
                  </div>
                  <span className="text-xs font-mono w-8">{speed}x</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Side panel - stats and code */}
        <div className="xl:col-span-1 space-y-4">
          {/* Stats card */}
          <Card className="p-4 bg-card/50 border-border/50">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-500" />
              Statistics
            </h3>
            <div className="space-y-3">
              <StatItem label="Total Steps" value={steps.length} color="cyan" />
              <StatItem label="Current Step" value={currentStepIndex + 1} color="purple" />
              <StatItem label="Comparisons" value={currentStep?.stats?.comparisons || 0} color="yellow" />
              <StatItem label="Swaps" value={currentStep?.stats?.swaps || 0} color="pink" />
              <StatItem label="Operations" value={currentStep?.stats?.operations || 0} color="green" />
            </div>
          </Card>
          
          {/* Complexity info */}
          <Card className="p-4 bg-card/50 border-border/50">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-500" />
              Complexity
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-muted/30 rounded-lg">
                <span className="text-xs text-muted-foreground">Time</span>
                <code className="text-sm font-mono text-cyan-500">{timeComplexity}</code>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted/30 rounded-lg">
                <span className="text-xs text-muted-foreground">Space</span>
                <code className="text-sm font-mono text-purple-500">{spaceComplexity}</code>
              </div>
            </div>
          </Card>
          
          {/* Legend */}
          <Card className="p-4 bg-card/50 border-border/50">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4 text-green-500" />
              Legend
            </h3>
            <div className="space-y-2 text-xs">
              <LegendItem color="cyan" label="Current / Comparing" />
              <LegendItem color="purple" label="Selected / Active" />
              <LegendItem color="pink" label="Swapping" />
              <LegendItem color="green" label="Sorted / Complete" />
              <LegendItem color="yellow" label="Target / Found" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper components
function StatItem({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClasses: Record<string, string> = {
    cyan: 'text-cyan-500',
    purple: 'text-purple-500',
    yellow: 'text-yellow-500',
    pink: 'text-pink-500',
    green: 'text-green-500'
  };
  
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`font-mono font-bold ${colorClasses[color]}`}>{value}</span>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  const colorClasses: Record<string, string> = {
    cyan: 'bg-cyan-500',
    purple: 'bg-purple-500',
    yellow: 'bg-yellow-500',
    pink: 'bg-pink-500',
    green: 'bg-green-500'
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded ${colorClasses[color]}`} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

// Visualization Components
function ArrayVisualization({ step, mode }: { step: VisualizationStep; mode: 'array' | 'bars' }) {
  const array = step.data?.array || [];
  const maxValue = Math.max(...array, 1);
  const highlights = step.highlights?.indices || [];
  
  if (mode === 'bars') {
    return (
      <div className="flex items-end justify-center gap-1 h-64 px-4">
        {array.map((value: number, index: number) => {
          const height = (value / maxValue) * 100;
          const isHighlighted = highlights.includes(index);
          const isSorted = step.action === 'complete' || step.data?.sortedIndices?.includes(index);
          
          let barColor = 'bg-muted/50';
          if (isSorted) barColor = 'bg-gradient-to-t from-green-500 to-emerald-400';
          else if (step.action === 'swap' && isHighlighted) barColor = 'bg-gradient-to-t from-pink-500 to-rose-400';
          else if (isHighlighted) barColor = 'bg-gradient-to-t from-cyan-500 to-blue-400';
          
          return (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-1 flex-1 max-w-12"
              layout
            >
              <motion.div
                className={`w-full rounded-t-md ${barColor} transition-all duration-300 relative`}
                initial={{ height: 0 }}
                animate={{ height: `${Math.max(height, 5)}%` }}
                style={{ minHeight: '20px' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent w-1/3" />
              </motion.div>
              <span className={`text-xs font-mono ${isHighlighted ? 'text-cyan-500 font-bold' : 'text-muted-foreground'}`}>
                {value}
              </span>
              <span className="text-[10px] text-muted-foreground/50">[{index}]</span>
            </motion.div>
          );
        })}
      </div>
    );
  }
  
  // Box view
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-4">
      {array.map((value: number, index: number) => {
        const isHighlighted = highlights.includes(index);
        const isSorted = step.action === 'complete' || step.data?.sortedIndices?.includes(index);
        
        let boxStyle = 'border-muted/30 bg-muted/10';
        if (isSorted) boxStyle = 'border-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.3)]';
        else if (step.action === 'swap' && isHighlighted) boxStyle = 'border-pink-500 bg-pink-500/10 shadow-[0_0_15px_rgba(236,72,153,0.3)]';
        else if (isHighlighted) boxStyle = 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.3)]';
        
        return (
          <motion.div
            key={index}
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-1"
          >
            <motion.div
              className={`w-14 h-14 flex items-center justify-center rounded-xl border-2 transition-all duration-300 ${boxStyle}`}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg font-bold font-mono">{value}</span>
            </motion.div>
            <span className="text-xs text-muted-foreground font-mono">[{index}]</span>
          </motion.div>
        );
      })}
    </div>
  );
}

function MatrixVisualization({ step }: { step: VisualizationStep }) {
  const matrix = step.data?.matrix || [];
  const highlights = step.highlights?.cells || [];
  
  return (
    <div className="flex flex-col items-center gap-1 p-4">
      {matrix.map((row: number[], rowIndex: number) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((value: number, colIndex: number) => {
            const isHighlighted = highlights.some(
              (h: { row: number; col: number }) => h.row === rowIndex && h.col === colIndex
            );
            
            return (
              <motion.div
                key={colIndex}
                className={`w-12 h-12 flex items-center justify-center rounded-lg border text-sm font-mono
                  ${isHighlighted 
                    ? 'border-cyan-500 bg-cyan-500/20 text-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                    : 'border-border/30 bg-muted/10'
                  }`}
                animate={{ scale: isHighlighted ? 1.1 : 1 }}
              >
                {value === Infinity ? '∞' : value}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function TreeVisualization({ step }: { step: VisualizationStep }) {
  const nodes = step.data?.nodes || [];
  const edges = step.data?.edges || [];
  const currentNode = step.data?.currentNode;
  
  return (
    <div className="relative w-full h-64">
      <svg className="w-full h-full">
        {/* Edges */}
        {edges.map((edge: any, index: number) => {
          const from = nodes.find((n: any) => n.id === edge.from);
          const to = nodes.find((n: any) => n.id === edge.to);
          if (!from || !to) return null;
          
          return (
            <line
              key={index}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="currentColor"
              strokeOpacity={0.2}
              strokeWidth={2}
            />
          );
        })}
        
        {/* Nodes */}
        {nodes.map((node: any) => {
          const isCurrent = node.id === currentNode;
          
          return (
            <g key={node.id}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={20}
                fill={isCurrent ? 'rgb(6, 182, 212)' : 'rgb(30, 30, 35)'}
                stroke={isCurrent ? 'rgb(6, 182, 212)' : 'rgb(100, 100, 110)'}
                strokeWidth={2}
                animate={{ scale: isCurrent ? 1.2 : 1 }}
              />
              <text
                x={node.x}
                y={node.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isCurrent ? 'white' : 'rgb(200, 200, 200)'}
                fontSize="12"
                fontWeight="bold"
              >
                {node.value || node.label || node.id}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function GraphVisualization({ step }: { step: VisualizationStep }) {
  // Similar to tree but with different layout
  return <TreeVisualization step={step} />;
}

function LinkedListVisualization({ step }: { step: VisualizationStep }) {
  const nodes = step.data?.nodes || [];
  const current = step.data?.current;
  
  return (
    <div className="flex items-center justify-center gap-2 p-4 overflow-x-auto">
      {nodes.map((node: any, index: number) => {
        const isCurrent = node.id === current;
        
        return (
          <React.Fragment key={node.id}>
            <motion.div
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 
                ${isCurrent 
                  ? 'border-cyan-500 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                  : 'border-border/30 bg-muted/10'
                }`}
              animate={{ scale: isCurrent ? 1.05 : 1 }}
            >
              <span className="font-mono font-bold">{node.value}</span>
            </motion.div>
            {node.next && (
              <div className="text-muted-foreground">→</div>
            )}
          </React.Fragment>
        );
      })}
      {nodes.length > 0 && !nodes[nodes.length - 1]?.next && (
        <div className="text-muted-foreground">→ null</div>
      )}
    </div>
  );
}

function StackVisualization({ step }: { step: VisualizationStep }) {
  const elements = step.data?.elements || [];
  
  return (
    <div className="flex flex-col items-center gap-1 p-4">
      <div className="text-xs text-muted-foreground mb-2">← Top</div>
      {[...elements].reverse().map((value: number, index: number) => (
        <motion.div
          key={index}
          className="w-20 h-10 flex items-center justify-center rounded-lg border border-border/30 bg-muted/10 font-mono"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          {value}
        </motion.div>
      ))}
      <div className="text-xs text-muted-foreground mt-2">← Bottom</div>
    </div>
  );
}

function QueueVisualization({ step }: { step: VisualizationStep }) {
  const elements = step.data?.elements || [];
  
  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <div className="text-xs text-muted-foreground">Front →</div>
      {elements.map((value: number, index: number) => (
        <motion.div
          key={index}
          className="w-14 h-14 flex items-center justify-center rounded-lg border border-border/30 bg-muted/10 font-mono"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          {value}
        </motion.div>
      ))}
      <div className="text-xs text-muted-foreground">← Rear</div>
    </div>
  );
}

function HeapVisualization({ step }: { step: VisualizationStep }) {
  const array = step.data?.array || [];
  // Display as tree structure
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-xs text-muted-foreground">Max Heap Structure</div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {array.map((value: number, index: number) => (
          <motion.div
            key={index}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-purple-500/50 bg-purple-500/10 font-mono text-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.03 }}
          >
            {value}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function HashTableVisualization({ step }: { step: VisualizationStep }) {
  const entries = step.data?.entries || [];
  const size = step.data?.size || 10;
  
  const buckets = Array(size).fill(null).map(() => [] as any[]);
  entries.forEach((entry: any) => {
    buckets[entry.hash % size].push(entry);
  });
  
  return (
    <div className="grid grid-cols-5 gap-2 p-4">
      {buckets.map((bucket, index) => (
        <div key={index} className="flex flex-col gap-1">
          <div className="text-xs text-muted-foreground text-center">[{index}]</div>
          <div className="min-h-[60px] border border-border/30 rounded-lg p-2 bg-muted/10">
            {bucket.map((entry, i) => (
              <div key={i} className="text-xs font-mono truncate">
                {entry.key}: {entry.value}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function StringVisualization({ step }: { step: VisualizationStep }) {
  const text = step.data?.text || '';
  const pattern = step.data?.pattern || '';
  const textIndex = step.data?.textIndex;
  const foundAt = step.data?.foundAt;
  
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex gap-0.5">
        {text.split('').map((char: string, index: number) => {
          const isHighlighted = foundAt !== undefined && index >= foundAt && index < foundAt + pattern.length;
          const isCurrent = index === textIndex;
          
          return (
            <motion.div
              key={index}
              className={`w-8 h-10 flex items-center justify-center rounded border font-mono text-sm
                ${isHighlighted 
                  ? 'border-green-500 bg-green-500/20 text-green-500' 
                  : isCurrent 
                    ? 'border-cyan-500 bg-cyan-500/20 text-cyan-500' 
                    : 'border-border/30 bg-muted/10'
                }`}
            >
              {char}
            </motion.div>
          );
        })}
      </div>
      <div className="text-xs text-muted-foreground">Pattern: <span className="font-mono text-purple-500">{pattern}</span></div>
    </div>
  );
}

function GeometricVisualization({ step }: { step: VisualizationStep }) {
  const points = step.data?.points || [];
  
  return (
    <div className="relative w-full h-64 bg-muted/10 rounded-lg border border-border/30">
      <svg className="w-full h-full">
        {points.map((point: { x: number; y: number }, index: number) => (
          <motion.circle
            key={index}
            cx={point.x + 50}
            cy={point.y + 50}
            r={6}
            fill="rgb(6, 182, 212)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </svg>
    </div>
  );
}

function GridVisualization({ step }: { step: VisualizationStep }) {
  const cells = step.data?.cells || [];
  const rows = step.data?.rows || 8;
  const cols = step.data?.cols || 8;
  
  return (
    <div className="flex flex-col items-center gap-0.5 p-4">
      {Array(rows).fill(null).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-0.5">
          {Array(cols).fill(null).map((_, colIndex) => {
            const value = cells[rowIndex]?.[colIndex] || 0;
            
            return (
              <div
                key={colIndex}
                className={`w-8 h-8 flex items-center justify-center rounded border text-xs font-mono
                  ${value === 1 
                    ? 'border-purple-500 bg-purple-500/20 text-purple-500' 
                    : 'border-border/30 bg-muted/10'
                  }`}
              >
                {value === 1 ? '♛' : ''}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
