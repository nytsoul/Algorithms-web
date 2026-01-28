import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Download, Code2, BookOpen, Clock, Cpu, HardDrive } from 'lucide-react';
import { getPythonImplementation } from '../lib/implementations/python-implementations';
import { getJavaImplementation } from '../lib/implementations/java-implementations';
import { getCImplementation } from '../lib/implementations/c-implementations';
import { getCppImplementation } from '../lib/implementations/cpp-implementations';
import { generateAlgorithmCode } from '../lib/algorithm-code-generator';
import { useAlgorithmBySlug } from '../hooks/use-algorithms';

interface ImplementationSelectorProps {
  algorithm: string;
  className?: string;
}

interface LanguageConfig {
  id: string;
  name: string;
  icon: string;
  extension: string;
  syntax: string;
  color: string;
  bgColor: string;
  description: string;
}

const LANGUAGES: LanguageConfig[] = [
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    extension: '.py',
    syntax: 'python',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30',
    description: 'High-level, readable syntax with extensive libraries'
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    extension: '.java',
    syntax: 'java',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30',
    description: 'Object-oriented, platform-independent with strong typing'
  },
  {
    id: 'c',
    name: 'C',
    icon: '⚡',
    extension: '.c',
    syntax: 'c',
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-50 dark:bg-gray-900/20 hover:bg-gray-100 dark:hover:bg-gray-900/30',
    description: 'Low-level, fast execution with manual memory management'
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: '🔧',
    extension: '.cpp',
    syntax: 'cpp',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30',
    description: 'Object-oriented extension of C with STL support'
  }
];

const ImplementationSelector: React.FC<ImplementationSelectorProps> = ({ 
  algorithm, 
  className = '' 
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('python');
  const [implementation, setImplementation] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const { algorithm: algoData } = useAlgorithmBySlug(algorithm);

  useEffect(() => {
    setLoading(true);
    let impl = null;

    // Try to get existing implementation first
    switch (selectedLanguage) {
      case 'python':
        impl = getPythonImplementation(algorithm);
        break;
      case 'java':
        impl = getJavaImplementation(algorithm);
        break;
      case 'c':
        impl = getCImplementation(algorithm);
        break;
      case 'cpp':
        impl = getCppImplementation(algorithm);
        break;
    }

    // If no implementation exists, generate one
    if (!impl && algoData) {
      const generated = generateAlgorithmCode(
        algoData.name,
        algoData.slug,
        algoData.category,
        selectedLanguage as 'python' | 'java' | 'c' | 'cpp'
      );
      impl = {
        code: generated.code,
        language: generated.language,
        timeComplexity: algoData.timeComplexity?.best || 'O(n)',
        spaceComplexity: algoData.spaceComplexity || 'O(1)',
        description: algoData.description || `${algoData.name} implementation`,
        features: generated.features
      };
    }

    setImplementation(impl);
    setLoading(false);
  }, [algorithm, selectedLanguage, algoData]);

  const handleCopyCode = async () => {
    if (!implementation) return;
    
    try {
      await navigator.clipboard.writeText(implementation.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const handleDownloadCode = () => {
    if (!implementation) return;

    const language = LANGUAGES.find(lang => lang.id === selectedLanguage);
    const filename = `${algorithm}${language?.extension || '.txt'}`;
    
    const element = document.createElement('a');
    const file = new Blob([implementation.code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatAlgorithmName = (name: string) => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Code2 className="mr-3 text-blue-600 dark:text-blue-400" size={28} />
            {formatAlgorithmName(algorithm)} Implementations
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={handleCopyCode}
              disabled={!implementation}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              {copied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
            <button
              onClick={handleDownloadCode}
              disabled={!implementation}
              className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              <Download size={16} className="mr-2" />
              Download
            </button>
          </div>
        </div>

        {/* Language Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {LANGUAGES.map((language) => (
            <motion.button
              key={language.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedLanguage(language.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedLanguage === language.id
                  ? `border-blue-500 ${language.bgColor.replace('hover:', '')} ring-2 ring-blue-200 dark:ring-blue-800`
                  : `border-gray-200 dark:border-gray-700 ${language.bgColor}`
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{language.icon}</div>
                <div className={`font-bold text-sm ${language.color}`}>
                  {language.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {language.extension}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Implementation Details */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 text-center"
          >
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading implementation...</p>
          </motion.div>
        ) : implementation ? (
          <motion.div
            key={selectedLanguage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {/* Language Info */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">
                  {LANGUAGES.find(lang => lang.id === selectedLanguage)?.icon}
                </span>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {LANGUAGES.find(lang => lang.id === selectedLanguage)?.name} Implementation
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {LANGUAGES.find(lang => lang.id === selectedLanguage)?.description}
                  </p>
                </div>
              </div>

              {/* Algorithm Info */}
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-600 dark:text-gray-400">Time:</span>
                  <span className="font-mono font-medium text-gray-900 dark:text-white">
                    {implementation.timeComplexity}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <HardDrive size={16} className="text-green-600 dark:text-green-400" />
                  <span className="text-gray-600 dark:text-gray-400">Space:</span>
                  <span className="font-mono font-medium text-gray-900 dark:text-white">
                    {implementation.spaceComplexity}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen size={16} className="text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-600 dark:text-gray-400">Algorithm:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {implementation.algorithm}
                  </span>
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center">
                <BookOpen size={16} className="mr-2" />
                How it Works
              </h4>
              <p className="text-blue-800 dark:text-blue-200">
                {implementation.explanation}
              </p>
            </div>

            {/* Code Block */}
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center">
                  <Code2 size={16} className="mr-2" />
                  Source Code
                </h4>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>{LANGUAGES.find(lang => lang.id === selectedLanguage)?.name}</span>
                  <span>•</span>
                  <span>{implementation.code.split('\\n').length} lines</span>
                </div>
              </div>
              
              <div className="relative bg-gray-900 dark:bg-gray-950 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-400 text-sm font-mono">
                      {algorithm}{LANGUAGES.find(lang => lang.id === selectedLanguage)?.extension}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-gray-100 font-mono leading-relaxed">
                    {implementation.code}
                  </code>
                </pre>
              </div>
            </div>

            {/* Complexity Analysis */}
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <h4 className="font-bold text-red-900 dark:text-red-300 mb-2 flex items-center">
                  <Clock size={16} className="mr-2" />
                  Time Complexity
                </h4>
                <p className="text-red-800 dark:text-red-200 font-mono text-lg">
                  {implementation.timeComplexity}
                </p>
                <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                  Runtime performance analysis
                </p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-bold text-green-900 dark:text-green-300 mb-2 flex items-center">
                  <HardDrive size={16} className="mr-2" />
                  Space Complexity
                </h4>
                <p className="text-green-800 dark:text-green-200 font-mono text-lg">
                  {implementation.spaceComplexity}
                </p>
                <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                  Memory usage analysis
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="not-found"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 text-center"
          >
            <Code2 size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Implementation Not Available
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              The {LANGUAGES.find(lang => lang.id === selectedLanguage)?.name} implementation 
              for {formatAlgorithmName(algorithm)} is not yet available.
            </p>
            <div className="text-sm text-gray-400 dark:text-gray-500">
              Try selecting a different programming language above.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImplementationSelector;