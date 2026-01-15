import React, { useState } from 'react';
import { Algorithm } from '../lib/algorithms-data';
import { ChevronRight, ChevronLeft, BookOpen, Code, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';

interface TutorialStep {
  title: string;
  content: string;
  visualization?: React.ReactNode;
  code?: string;
  explanation?: string;
}

interface InteractiveTutorialProps {
  algorithm: Algorithm;
  steps: TutorialStep[];
}

export const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({
  algorithm,
  steps,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState<'content' | 'code' | 'explanation'>('content');
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIdx: number) => {
    setCurrentStep(stepIdx);
  };

  const isStepCompleted = (stepIdx: number) => completedSteps.includes(stepIdx);

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden border border-slate-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen size={28} className="text-white" />
          <div>
            <h1 className="text-3xl font-bold text-white">{algorithm.name}</h1>
            <p className="text-purple-100">Interactive Tutorial</p>
          </div>
        </div>
        <p className="text-purple-50 text-sm">{algorithm.description}</p>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-slate-700">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex">
        {/* Step Navigation Sidebar */}
        <div className="w-48 bg-slate-800 border-r border-slate-700 p-4 max-h-[600px] overflow-y-auto">
          <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase">Steps</h3>
          <div className="space-y-2">
            {steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleStepClick(idx)}
                className={`w-full text-left px-4 py-3 rounded transition-all ${
                  idx === currentStep
                    ? 'bg-blue-600 text-white shadow-lg'
                    : isStepCompleted(idx)
                      ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                      : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      isStepCompleted(idx)
                        ? 'bg-green-500 text-white'
                        : idx === currentStep
                          ? 'bg-blue-400 text-white'
                          : 'bg-slate-600 text-slate-400'
                    }`}
                  >
                    {isStepCompleted(idx) ? '✓' : idx + 1}
                  </div>
                  <span className="text-sm font-medium truncate">{s.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Current Step Title */}
          <h2 className="text-2xl font-bold text-white mb-4">
            Step {currentStep + 1}: {step.title}
          </h2>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 border-b border-slate-700">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-all ${
                activeTab === 'content'
                  ? 'text-blue-400 border-blue-400'
                  : 'text-slate-400 border-transparent hover:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                Content
              </div>
            </button>
            {step.code && (
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition-all ${
                  activeTab === 'code'
                    ? 'text-blue-400 border-blue-400'
                    : 'text-slate-400 border-transparent hover:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Code size={16} />
                  Code
                </div>
              </button>
            )}
            {step.explanation && (
              <button
                onClick={() => setActiveTab('explanation')}
                className={`px-4 py-2 font-medium text-sm border-b-2 transition-all ${
                  activeTab === 'explanation'
                    ? 'text-blue-400 border-blue-400'
                    : 'text-slate-400 border-transparent hover:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Lightbulb size={16} />
                  Explanation
                </div>
              </button>
            )}
          </div>

          {/* Tab Content */}
          <div className="flex-1 mb-6">
            {activeTab === 'content' && (
              <div className="space-y-4">
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-200 leading-relaxed">{step.content}</p>
                </div>
                {step.visualization && (
                  <div className="mt-6 bg-slate-700/50 rounded-lg p-6 border border-slate-700">
                    {step.visualization}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'code' && step.code && (
              <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-slate-100 font-mono">
                  <code>{step.code}</code>
                </pre>
              </div>
            )}

            {activeTab === 'explanation' && step.explanation && (
              <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                <p className="text-slate-100 leading-relaxed">{step.explanation}</p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handlePrev}
              disabled={currentStep === 0}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Previous
            </Button>

            <div className="flex-1" />

            <div className="text-slate-400 flex items-center px-4">
              {currentStep + 1} of {steps.length}
            </div>

            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Algorithm Info Footer */}
      <div className="bg-slate-800 border-t border-slate-700 p-4 grid grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-slate-400">Time Complexity (Avg)</p>
          <p className="text-blue-400 font-semibold">{algorithm.timeComplexity.average}</p>
        </div>
        <div>
          <p className="text-slate-400">Space Complexity</p>
          <p className="text-green-400 font-semibold">{algorithm.spaceComplexity}</p>
        </div>
        <div>
          <p className="text-slate-400">Difficulty</p>
          <p className="text-yellow-400 font-semibold">{algorithm.difficulty}</p>
        </div>
        <div>
          <p className="text-slate-400">Category</p>
          <p className="text-purple-400 font-semibold">{algorithm.category}</p>
        </div>
      </div>
    </div>
  );
};
