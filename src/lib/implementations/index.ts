/**
 * Algorithm Implementations Index
 * Central export for all multi-language implementations
 */

// Python implementations
export { 
  PYTHON_IMPLEMENTATIONS, 
  getAllPythonImplementations, 
  getPythonImplementation 
} from './python-implementations';

// Java implementations  
export { 
  JAVA_IMPLEMENTATIONS, 
  getAllJavaImplementations, 
  getJavaImplementation 
} from './java-implementations';

// C implementations
export { 
  C_IMPLEMENTATIONS, 
  getAllCImplementations, 
  getCImplementation 
} from './c-implementations';

// C++ implementations
export { 
  CPP_IMPLEMENTATIONS, 
  getAllCppImplementations, 
  getCppImplementation 
} from './cpp-implementations';

// Types
export type { PythonImplementation } from './python-implementations';
export type { JavaImplementation } from './java-implementations';
export type { CImplementation } from './c-implementations';
export type { CppImplementation } from './cpp-implementations';

// Supported languages
export const SUPPORTED_LANGUAGES = ['python', 'java', 'c', 'cpp'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Get implementation by algorithm and language
export const getImplementation = (algorithm: string, language: SupportedLanguage) => {
  switch (language) {
    case 'python':
      return getPythonImplementation(algorithm);
    case 'java':
      return getJavaImplementation(algorithm);
    case 'c':
      return getCImplementation(algorithm);
    case 'cpp':
      return getCppImplementation(algorithm);
    default:
      return undefined;
  }
};

// Get all implementations for an algorithm across all languages
export const getAllImplementationsForAlgorithm = (algorithm: string) => {
  return {
    python: getPythonImplementation(algorithm),
    java: getJavaImplementation(algorithm),
    c: getCImplementation(algorithm),
    cpp: getCppImplementation(algorithm),
  };
};

// Check if implementation exists for algorithm and language
export const hasImplementation = (algorithm: string, language: SupportedLanguage): boolean => {
  return getImplementation(algorithm, language) !== undefined;
};

// Get available languages for an algorithm
export const getAvailableLanguages = (algorithm: string): SupportedLanguage[] => {
  return SUPPORTED_LANGUAGES.filter(lang => hasImplementation(algorithm, lang));
};

// Import individual functions
import { getPythonImplementation } from './python-implementations';
import { getJavaImplementation } from './java-implementations';
import { getCImplementation } from './c-implementations';
import { getCppImplementation } from './cpp-implementations';