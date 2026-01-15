import React, { useState } from 'react';
import { Algorithm } from '../lib/algorithms-data';
import { COMPREHENSIVE_1000_PLUS_ALGORITHMS } from '../lib/comprehensive-algorithms';
import { EnhancedVisualizationPlayer } from '../components/EnhancedVisualizationPlayer';
import { AlgorithmComparison } from '../components/AlgorithmComparison';
import { InteractiveTutorial } from '../components/InteractiveTutorial';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Search, BarChart3, BookOpen } from 'lucide-react';

const AlgorithmLabPage = () => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<Algorithm[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm | null>(null);

  const filteredAlgorithms = COMPREHENSIVE_1000_PLUS_ALGORITHMS.filter((algo) =>
    algo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    algo.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    algo.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAlgorithm = (algo: Algorithm) => {
    if (!selectedAlgorithms.find((a) => a._id === algo._id)) {
      setSelectedAlgorithms([...selectedAlgorithms, algo]);
    }
  };

  const handleRemoveAlgorithm = (id: string) => {
    setSelectedAlgorithms(selectedAlgorithms.filter((a) => a._id !== id));
  };

  // Sample visualization steps
  const getVisualizationSteps = (algo: Algorithm) => [
    {
      description: `Starting with the input array: [64, 34, 25, 12, 22]`,
      data: [64, 34, 25, 12, 22],
      highlights: [],
      complexity: { time: algo.timeComplexity.average, space: algo.spaceComplexity },
    },
    {
      description: `Comparing elements: 64 and 34 - need to swap`,
      data: [64, 34, 25, 12, 22],
      highlights: [0, 1],
      complexity: { time: algo.timeComplexity.average, space: algo.spaceComplexity },
    },
    {
      description: `After first pass: [34, 25, 12, 22, 64]`,
      data: [34, 25, 12, 22, 64],
      highlights: [4],
      complexity: { time: algo.timeComplexity.average, space: algo.spaceComplexity },
    },
    {
      description: `Final sorted array: [12, 22, 25, 34, 64]`,
      data: [12, 22, 25, 34, 64],
      highlights: [],
      complexity: { time: algo.timeComplexity.worst, space: algo.spaceComplexity },
    },
  ];

  // Sample tutorial steps
  const getTutorialSteps = (algo: Algorithm) => [
    {
      title: 'Overview',
      content: algo.description,
      explanation: algo.intuition,
    },
    {
      title: 'Algorithm Concept',
      content: `${algo.name} is a ${algo.paradigm || 'specialized'} algorithm used in the ${algo.category} category.`,
      explanation: 'Understanding the core concept helps you apply it to different problems.',
      code: algo.implementation.substring(0, 200) + '...',
    },
    {
      title: 'Time Complexity',
      content: `Best Case: ${algo.timeComplexity.best}, Average Case: ${algo.timeComplexity.average}, Worst Case: ${algo.timeComplexity.worst}`,
      explanation: 'Time complexity tells us how the algorithm scales with input size.',
    },
    {
      title: 'Space Complexity',
      content: `Space Complexity: ${algo.spaceComplexity}`,
      explanation: 'Space complexity indicates the amount of extra memory the algorithm uses.',
    },
    {
      title: 'Real-World Applications',
      content: algo.applications.join(', '),
      explanation: 'This algorithm is widely used in real-world applications and systems.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Algorithm Lab</h1>
          <p className="text-slate-400">Explore 1000+ algorithms with interactive visualizations and comparisons</p>
        </div>

        {/* Search and Selection */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <div className="flex items-center gap-4 mb-6">
            <Search size={20} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search algorithms by name, category, or domain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-slate-700 text-white rounded px-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto">
            {filteredAlgorithms.slice(0, 30).map((algo) => (
              <button
                key={algo._id}
                onClick={() => {
                  setSelectedAlgorithm(algo);
                  handleAddAlgorithm(algo);
                }}
                className={`p-3 rounded text-left transition-all ${
                  selectedAlgorithms.find((a) => a._id === algo._id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                }`}
              >
                <p className="font-semibold text-sm">{algo.name}</p>
                <p className="text-xs opacity-75">
                  {algo.category} • {algo.difficulty}
                </p>
              </button>
            ))}
          </div>

          {filteredAlgorithms.length > 30 && (
            <p className="text-sm text-slate-400 mt-4">
              Showing 30 of {filteredAlgorithms.length} results
            </p>
          )}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="visualization" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="visualization" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Visualizations
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Compare
            </TabsTrigger>
            <TabsTrigger value="tutorial" className="flex items-center gap-2">
              <BookOpen size={16} />
              Tutorial
            </TabsTrigger>
          </TabsList>

          {/* Visualization Tab */}
          <TabsContent value="visualization" className="space-y-6">
            {selectedAlgorithm ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">{selectedAlgorithm.name} Visualization</h2>
                <EnhancedVisualizationPlayer
                  title={selectedAlgorithm.name}
                  steps={getVisualizationSteps(selectedAlgorithm)}
                  speed={1}
                  autoPlay={false}
                />
                
                {/* Algorithm Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-4">Complexity</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-slate-400 text-sm">Best Case</p>
                        <p className="text-green-400 text-lg font-mono">{selectedAlgorithm.timeComplexity.best}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Average Case</p>
                        <p className="text-blue-400 text-lg font-mono">{selectedAlgorithm.timeComplexity.average}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Worst Case</p>
                        <p className="text-red-400 text-lg font-mono">{selectedAlgorithm.timeComplexity.worst}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Space</p>
                        <p className="text-purple-400 text-lg font-mono">{selectedAlgorithm.spaceComplexity}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-4">Details</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-slate-400">Category</p>
                        <p className="text-white">{selectedAlgorithm.category}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Domain</p>
                        <p className="text-white">{selectedAlgorithm.domain}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Difficulty</p>
                        <p className="text-white">{selectedAlgorithm.difficulty}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Paradigm</p>
                        <p className="text-white">{selectedAlgorithm.paradigm || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800 rounded-lg p-12 text-center border border-slate-700">
                <p className="text-slate-400">Select an algorithm to view its visualization</p>
              </div>
            )}
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="comparison">
            <AlgorithmComparison
              selectedAlgorithms={selectedAlgorithms}
              onRemove={handleRemoveAlgorithm}
              onAddAlgorithm={() => setSearchTerm('')}
            />
          </TabsContent>

          {/* Tutorial Tab */}
          <TabsContent value="tutorial">
            {selectedAlgorithm ? (
              <InteractiveTutorial
                algorithm={selectedAlgorithm}
                steps={getTutorialSteps(selectedAlgorithm)}
              />
            ) : (
              <div className="bg-slate-800 rounded-lg p-12 text-center border border-slate-700">
                <p className="text-slate-400">Select an algorithm to start the interactive tutorial</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AlgorithmLabPage;
