import React, { useState } from 'react';
import { Algorithm } from '../lib/algorithms-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { X, Plus } from 'lucide-react';
import { Button } from './ui/button';

interface AlgorithmComparisonProps {
  selectedAlgorithms: Algorithm[];
  onRemove?: (id: string) => void;
  onAddAlgorithm?: () => void;
}

const complexityToNumber = (complexity: string): number => {
  const match = complexity.match(/\d+/);
  if (complexity.includes('n²')) return 2;
  if (complexity.includes('n³')) return 3;
  if (complexity.includes('n log n')) return 1.5;
  if (complexity.includes('log n')) return 0.5;
  if (complexity.includes('1')) return 0;
  return 1;
};

export const AlgorithmComparison: React.FC<AlgorithmComparisonProps> = ({
  selectedAlgorithms,
  onRemove,
  onAddAlgorithm,
}) => {
  const [selectedMetric, setSelectedMetric] = useState<'time' | 'space'>('time');

  if (selectedAlgorithms.length === 0) {
    return (
      <div className="w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-8 text-center">
        <p className="text-slate-400 mb-4">Select algorithms to compare</p>
        <Button onClick={onAddAlgorithm} className="bg-blue-600 hover:bg-blue-700">
          <Plus size={16} className="mr-2" />
          Add Algorithm
        </Button>
      </div>
    );
  }

  // Prepare data for charts
  const complexityData = selectedAlgorithms.map((algo) => {
    const timeBest = complexityToNumber(algo.timeComplexity.best);
    const timeAvg = complexityToNumber(algo.timeComplexity.average);
    const timeWorst = complexityToNumber(algo.timeComplexity.worst);

    return {
      name: algo.name.substring(0, 15),
      best: timeBest,
      average: timeAvg,
      worst: timeWorst,
      space: complexityToNumber(algo.spaceComplexity),
    };
  });

  // Difficulty distribution
  const difficultyData = selectedAlgorithms.map((algo) => ({
    name: algo.name.substring(0, 15),
    value:
      algo.difficulty === 'Beginner'
        ? 1
        : algo.difficulty === 'Intermediate'
          ? 2
          : algo.difficulty === 'Advanced'
            ? 3
            : 4,
  }));

  // Category distribution
  const categoryCount: Record<string, number> = {};
  selectedAlgorithms.forEach((algo) => {
    categoryCount[algo.category] = (categoryCount[algo.category] || 0) + 1;
  });

  const categoryData = Object.entries(categoryCount).map(([name, value]) => ({
    name,
    count: value,
  }));

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg p-6 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-4">Algorithm Comparison</h2>
        <div className="flex flex-wrap gap-3">
          {selectedAlgorithms.map((algo) => (
            <div
              key={algo._id}
              className="flex items-center gap-2 bg-slate-700 rounded-full px-4 py-2"
            >
              <span className="text-sm text-white">{algo.name}</span>
              <button
                onClick={() => onRemove?.(algo._id)}
                className="text-slate-400 hover:text-red-400"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          <Button
            onClick={onAddAlgorithm}
            variant="ghost"
            className="rounded-full px-4 hover:bg-slate-600"
          >
            <Plus size={16} className="mr-2" />
            Add
          </Button>
        </div>
      </div>

      {/* Metrics Selector */}
      <div className="flex gap-4 bg-slate-800 rounded-lg p-4 border border-slate-700">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={selectedMetric === 'time'}
            onChange={() => setSelectedMetric('time')}
            className="w-4 h-4"
          />
          <span className="text-slate-200">Time Complexity</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={selectedMetric === 'space'}
            onChange={() => setSelectedMetric('space')}
            className="w-4 h-4"
          />
          <span className="text-slate-200">Space Complexity</span>
        </label>
      </div>

      {/* Complexity Comparison Chart */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          {selectedMetric === 'time' ? 'Time Complexity' : 'Space Complexity'} Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={selectedMetric === 'time' ? complexityData : complexityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend />
            {selectedMetric === 'time' ? (
              <>
                <Bar dataKey="best" fill="#22c55e" name="Best Case" />
                <Bar dataKey="average" fill="#3b82f6" name="Average Case" />
                <Bar dataKey="worst" fill="#ef4444" name="Worst Case" />
              </>
            ) : (
              <Bar dataKey="space" fill="#8b5cf6" name="Space" />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Difficulty Chart */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Difficulty Level Comparison</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={difficultyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" domain={[0, 4]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#f59e0b"
              dot={{ fill: '#f59e0b', r: 6 }}
              name="Difficulty"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category Distribution */}
      {categoryData.length > 0 && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Category Distribution</h3>
          <div className="space-y-2">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center gap-4">
                <span className="text-slate-300 min-w-[150px]">{item.name}</span>
                <div className="flex-1 bg-slate-700 rounded-full h-6 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full flex items-center justify-end pr-2"
                    style={{ width: `${(item.count / selectedAlgorithms.length) * 100}%` }}
                  >
                    <span className="text-xs text-white font-semibold">{item.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Comparison Table */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 overflow-x-auto">
        <h3 className="text-lg font-semibold text-white mb-4">Detailed Comparison</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 px-4 text-slate-300 font-semibold">Algorithm</th>
              <th className="text-left py-3 px-4 text-slate-300 font-semibold">Best Case</th>
              <th className="text-left py-3 px-4 text-slate-300 font-semibold">Avg Case</th>
              <th className="text-left py-3 px-4 text-slate-300 font-semibold">Worst Case</th>
              <th className="text-left py-3 px-4 text-slate-300 font-semibold">Space</th>
              <th className="text-left py-3 px-4 text-slate-300 font-semibold">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {selectedAlgorithms.map((algo) => (
              <tr key={algo._id} className="border-b border-slate-700 hover:bg-slate-700/50">
                <td className="py-3 px-4 text-white">{algo.name}</td>
                <td className="py-3 px-4 text-green-400">{algo.timeComplexity.best}</td>
                <td className="py-3 px-4 text-blue-400">{algo.timeComplexity.average}</td>
                <td className="py-3 px-4 text-red-400">{algo.timeComplexity.worst}</td>
                <td className="py-3 px-4 text-purple-400">{algo.spaceComplexity}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      algo.difficulty === 'Beginner'
                        ? 'bg-green-900 text-green-300'
                        : algo.difficulty === 'Intermediate'
                          ? 'bg-blue-900 text-blue-300'
                          : algo.difficulty === 'Advanced'
                            ? 'bg-orange-900 text-orange-300'
                            : 'bg-red-900 text-red-300'
                    }`}
                  >
                    {algo.difficulty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
