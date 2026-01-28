import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trophy, Code, Clock, CheckCircle, XCircle, Lightbulb, Target, Star } from 'lucide-react';
import { 
  QuizQuestion, 
  ProblemChallenge, 
  getQuizByAlgorithm, 
  getChallengesByAlgorithm,
  getAllQuizzes,
  getAllChallenges 
} from '../lib/quiz-module';
import { generateQuizQuestions, generateCodingChallenges } from '../lib/algorithm-quiz-generator';
import { useAlgorithmBySlug } from '../hooks/use-algorithms';

interface QuizModuleProps {
  algorithm?: string;
  mode?: 'quiz' | 'challenges' | 'both';
}

interface QuizState {
  currentQuestion: number;
  selectedAnswer: string;
  showExplanation: boolean;
  score: number;
  completed: boolean;
  userAnswers: string[];
}

const QuizModule: React.FC<QuizModuleProps> = ({ 
  algorithm = '', 
  mode = 'both' 
}) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'challenges'>('quiz');
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [challengeData, setChallengeData] = useState<ProblemChallenge[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswer: '',
    showExplanation: false,
    score: 0,
    completed: false,
    userAnswers: []
  });
  const [selectedChallenge, setSelectedChallenge] = useState<ProblemChallenge | null>(null);
  const { algorithm: algoData } = useAlgorithmBySlug(algorithm);

  useEffect(() => {
    if (algorithm) {
      let quiz = getQuizByAlgorithm(algorithm);
      let challenges = getChallengesByAlgorithm(algorithm);
      
      // If no quiz exists, generate one
      if (quiz.length === 0 && algoData) {
        quiz = generateQuizQuestions({
          name: algoData.name,
          slug: algoData.slug,
          category: algoData.category,
          difficulty: algoData.difficulty,
          domain: algoData.domain
        });
      }
      
      // If no challenges exist, generate them
      if (challenges.length === 0 && algoData) {
        challenges = generateCodingChallenges({
          name: algoData.name,
          slug: algoData.slug,
          category: algoData.category,
          difficulty: algoData.difficulty,
          domain: algoData.domain
        });
      }
      
      setQuizData(quiz);
      setChallengeData(challenges);
    } else {
      setQuizData(getAllQuizzes());
      setChallengeData(getAllChallenges());
    }
  }, [algorithm, algoData]);

  const handleAnswerSelect = (answer: string) => {
    if (quizState.showExplanation) return;
    
    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answer
    }));
  };

  const handleNextQuestion = () => {
    const currentQuestion = quizData[quizState.currentQuestion];
    const isCorrect = quizState.selectedAnswer === currentQuestion.correctAnswer;
    
    const newUserAnswers = [...quizState.userAnswers, quizState.selectedAnswer];
    
    if (quizState.currentQuestion === quizData.length - 1) {
      // Quiz completed
      setQuizState(prev => ({
        ...prev,
        completed: true,
        score: prev.score + (isCorrect ? 1 : 0),
        userAnswers: newUserAnswers
      }));
    } else {
      // Next question
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        selectedAnswer: '',
        showExplanation: false,
        score: prev.score + (isCorrect ? 1 : 0),
        userAnswers: newUserAnswers
      }));
    }
  };

  const showExplanation = () => {
    if (!quizState.selectedAnswer) return;
    
    setQuizState(prev => ({
      ...prev,
      showExplanation: true
    }));
  };

  const restartQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswer: '',
      showExplanation: false,
      score: 0,
      completed: false,
      userAnswers: []
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
      case 'medium': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'hard': return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getSourceBadge = (source: string, sourceId?: string) => {
    switch (source) {
      case 'leetcode':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
            <Code size={12} className="mr-1" />
            LeetCode {sourceId && `#${sourceId}`}
          </span>
        );
      case 'codeforces':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
            <Target size={12} className="mr-1" />
            CodeForces {sourceId}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
            <Star size={12} className="mr-1" />
            Custom
          </span>
        );
    }
  };

  const renderQuizQuestion = () => {
    if (quizData.length === 0) {
      return (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">No quiz questions available for this algorithm.</p>
        </div>
      );
    }

    if (quizState.completed) {
      const percentage = Math.round((quizState.score / quizData.length) * 100);
      
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Trophy size={64} className={`mx-auto mb-6 ${percentage >= 70 ? 'text-yellow-500' : 'text-gray-400'}`} />
          
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Quiz Completed!
          </h3>
          
          <div className="mb-6">
            <div className="text-4xl font-bold mb-2">
              <span className={percentage >= 70 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                {quizState.score}/{quizData.length}
              </span>
            </div>
            <div className="text-lg text-gray-600 dark:text-gray-400">
              {percentage}% Correct
            </div>
          </div>

          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            percentage >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
            percentage >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
            'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {percentage >= 90 ? 'Excellent!' : percentage >= 70 ? 'Good Job!' : 'Keep Practicing!'}
          </div>

          <button
            onClick={restartQuiz}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Retry Quiz
          </button>
        </motion.div>
      );
    }

    const currentQuestion = quizData[quizState.currentQuestion];
    const isCorrect = quizState.selectedAnswer === currentQuestion.correctAnswer;

    return (
      <motion.div
        key={quizState.currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Question {quizState.currentQuestion + 1} of {quizData.length}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
              {currentQuestion.difficulty}
            </span>
          </div>
          <div className="flex space-x-2">
            {getSourceBadge(currentQuestion.source, currentQuestion.sourceId)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((quizState.currentQuestion) / quizData.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options?.map((option, index) => {
            const isSelected = quizState.selectedAnswer === option;
            const isCorrectOption = option === currentQuestion.correctAnswer;
            
            let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";
            
            if (quizState.showExplanation) {
              if (isCorrectOption) {
                buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
              } else if (isSelected && !isCorrectOption) {
                buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
              } else {
                buttonClass += "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300";
              }
            } else {
              if (isSelected) {
                buttonClass += "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300";
              } else {
                buttonClass += "border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/10 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={quizState.showExplanation}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {quizState.showExplanation && (
                    <span>
                      {isCorrectOption ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : isSelected ? (
                        <XCircle size={20} className="text-red-500" />
                      ) : null}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={showExplanation}
            disabled={!quizState.selectedAnswer || quizState.showExplanation}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Show Answer
          </button>
          
          <button
            onClick={handleNextQuestion}
            disabled={!quizState.showExplanation}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {quizState.currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {quizState.showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`mt-6 p-4 rounded-lg border-l-4 ${
                isCorrect 
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                  : 'border-red-500 bg-red-50 dark:bg-red-900/20'
              }`}
            >
              <div className="flex items-start space-x-3">
                <Lightbulb 
                  size={20} 
                  className={isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} 
                />
                <div>
                  <h4 className={`font-medium mb-2 ${
                    isCorrect ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'
                  }`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </h4>
                  <p className={isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderChallengeList = () => {
    if (challengeData.length === 0) {
      return (
        <div className="text-center py-12">
          <Code size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">No coding challenges available for this algorithm.</p>
        </div>
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {challengeData.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedChallenge(challenge)}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {challenge.title}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {challenge.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {challenge.tags.slice(0, 3).map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {getSourceBadge(challenge.source, challenge.sourceId)}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderChallengeDetail = () => {
    if (!selectedChallenge) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-6">
          <button
            onClick={() => setSelectedChallenge(null)}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
          >
            ← Back to Challenges
          </button>
          
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedChallenge.title}
            </h2>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedChallenge.difficulty)}`}>
                {selectedChallenge.difficulty}
              </span>
              {getSourceBadge(selectedChallenge.source, selectedChallenge.sourceId)}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Problem Description</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{selectedChallenge.description}</p>

          <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Examples</h4>
          {selectedChallenge.examples.map((example, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Input:</span>
                  <pre className="text-sm mt-1 text-gray-900 dark:text-white">{example.input}</pre>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Output:</span>
                  <pre className="text-sm mt-1 text-gray-900 dark:text-white">{example.output}</pre>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Explanation:</span>
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">{example.explanation}</p>
              </div>
            </div>
          ))}

          <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Constraints</h4>
          <ul className="list-disc list-inside space-y-1 mb-6 text-gray-600 dark:text-gray-400">
            {selectedChallenge.constraints.map((constraint, index) => (
              <li key={index} className="text-sm">{constraint}</li>
            ))}
          </ul>

          <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Hints</h4>
          <div className="space-y-2">
            {selectedChallenge.hints.map((hint, index) => (
              <div key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Lightbulb size={16} className="mt-0.5 text-yellow-500" />
                <span>{hint}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {selectedChallenge.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  if (selectedChallenge) {
    return renderChallengeDetail();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {algorithm ? `${algorithm.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} ` : ''}
          Algorithm Practice
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Test your knowledge and practice coding problems
        </p>
      </div>

      {mode === 'both' && (
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'quiz'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <BookOpen size={20} className="inline mr-2" />
            Quiz Questions
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'challenges'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Code size={20} className="inline mr-2" />
            Coding Challenges
          </button>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
        {(mode === 'quiz' || (mode === 'both' && activeTab === 'quiz')) && renderQuizQuestion()}
        {(mode === 'challenges' || (mode === 'both' && activeTab === 'challenges')) && renderChallengeList()}
      </div>
    </div>
  );
};

export default QuizModule;