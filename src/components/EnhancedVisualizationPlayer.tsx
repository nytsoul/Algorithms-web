import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, ZoomIn, ZoomOut, Sliders } from 'lucide-react';
import { Button } from './ui/button';

interface VisualizationStep {
  description: string;
  data: any[];
  highlights?: number[];
  comparison?: { a: number; b: number };
  complexity?: { time: string; space: string };
}

interface EnhancedVisualizationPlayerProps {
  title: string;
  steps: VisualizationStep[];
  onStepChange?: (step: number) => void;
  autoPlay?: boolean;
  speed?: number;
}

export const EnhancedVisualizationPlayer: React.FC<EnhancedVisualizationPlayerProps> = ({
  title,
  steps,
  onStepChange,
  autoPlay = false,
  speed = 1,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [playbackSpeed, setPlaybackSpeed] = useState(speed);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showStats, setShowStats] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Auto-play logic
  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const delay = 1000 / playbackSpeed;
      intervalRef.current = setTimeout(() => {
        nextStep();
      }, delay);
    } else if (currentStep === steps.length - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, currentStep, playbackSpeed, steps.length]);

  // Notify parent of step change
  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (currentStep === steps.length - 1 && isPlaying) {
      reset();
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-6 text-white shadow-xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-slate-400 text-sm">
          Step {currentStep + 1} of {steps.length}
        </p>
      </div>

      {/* Visualization Area */}
      <div className="bg-slate-800 rounded-lg p-6 mb-6 min-h-[300px] border border-slate-700">
        <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}>
          {/* Data Visualization */}
          <div className="flex gap-2 justify-center items-end min-h-[200px] mb-4">
            {currentStepData?.data.map((value, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`transition-all duration-300 rounded-t ${
                    currentStepData?.highlights?.includes(idx)
                      ? 'bg-red-500 shadow-lg shadow-red-500'
                      : 'bg-blue-500'
                  }`}
                  style={{
                    height: `${Math.max(20, (value / Math.max(...currentStepData?.data)) * 150)}px`,
                    width: '24px',
                  }}
                />
                <span className="text-xs mt-2 text-slate-400">{value}</span>
              </div>
            ))}
          </div>

          {/* Step Description */}
          <div className="bg-slate-700 rounded p-4 mb-4">
            <p className="text-sm text-slate-100">{currentStepData?.description}</p>
          </div>

          {/* Complexity Info */}
          {currentStepData?.complexity && showStats && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-900/30 border border-blue-700 rounded p-3">
                <p className="text-blue-300 font-semibold">Time</p>
                <p className="text-white">{currentStepData.complexity.time}</p>
              </div>
              <div className="bg-green-900/30 border border-green-700 rounded p-3">
                <p className="text-green-300 font-semibold">Space</p>
                <p className="text-white">{currentStepData.complexity.space}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-700 rounded-full h-2 mb-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Playback Controls */}
        <div className="flex gap-2 bg-slate-700 rounded-lg p-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={reset}
            className="hover:bg-slate-600"
            title="Reset"
          >
            <RotateCcw size={16} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="hover:bg-slate-600 disabled:opacity-50"
            title="Previous"
          >
            <SkipBack size={16} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={togglePlayPause}
            className="hover:bg-slate-600 bg-blue-600"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="hover:bg-slate-600 disabled:opacity-50"
            title="Next"
          >
            <SkipForward size={16} />
          </Button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-2 bg-slate-700 rounded-lg px-3 py-2">
          <span className="text-xs text-slate-400">Speed:</span>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.5"
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
            className="w-20 h-2 bg-slate-600 rounded cursor-pointer"
            title="Playback speed"
          />
          <span className="text-xs text-slate-300 w-8">{playbackSpeed}x</span>
        </div>

        {/* Zoom Control */}
        <div className="flex gap-2 bg-slate-700 rounded-lg p-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.2))}
            className="hover:bg-slate-600"
            title="Zoom out"
          >
            <ZoomOut size={16} />
          </Button>
          <span className="text-xs text-slate-300 px-2 flex items-center">{Math.round(zoomLevel * 100)}%</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.2))}
            className="hover:bg-slate-600"
            title="Zoom in"
          >
            <ZoomIn size={16} />
          </Button>
        </div>

        {/* Stats Toggle */}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowStats(!showStats)}
          className={`hover:bg-slate-600 ${showStats ? 'bg-blue-600' : ''}`}
          title="Toggle statistics"
        >
          <Sliders size={16} />
        </Button>
      </div>

      {/* Step Navigation */}
      <div className="flex items-center gap-2">
        <input
          type="range"
          min="0"
          max={steps.length - 1}
          value={currentStep}
          onChange={(e) => setCurrentStep(parseInt(e.target.value))}
          className="flex-1 h-2 bg-slate-600 rounded cursor-pointer"
          title="Step slider"
        />
        <span className="text-sm text-slate-400 min-w-fit">
          {currentStep + 1}/{steps.length}
        </span>
      </div>
    </div>
  );
};
