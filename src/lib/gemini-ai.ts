/**
 * 🤖 Gemini AI Service for Algorithm Code Generation
 * Generates algorithm implementations in multiple programming languages
 */

const GEMINI_API_KEY = "AIzaSyDv2CTkx6YkfaQQO5nOfwQBIQZH11LoNcU";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Rate limiting and caching
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests
const cache = new Map<string, GeneratedCode>();

// Check if we should wait before making a request
async function rateLimitedFetch(url: string, options: RequestInit): Promise<Response> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest));
  }

  lastRequestTime = Date.now();
  return fetch(url, options);
}

// Supported programming languages with their metadata
export const SUPPORTED_LANGUAGES = [
  { id: "python", name: "Python", icon: "🐍", extension: ".py" },
  { id: "javascript", name: "JavaScript", icon: "🟨", extension: ".js" },
  { id: "typescript", name: "TypeScript", icon: "🔷", extension: ".ts" },
  { id: "java", name: "Java", icon: "☕", extension: ".java" },
  { id: "cpp", name: "C++", icon: "⚡", extension: ".cpp" },
  { id: "c", name: "C", icon: "🔵", extension: ".c" },
  { id: "csharp", name: "C#", icon: "💜", extension: ".cs" },
  { id: "go", name: "Go", icon: "🐹", extension: ".go" },
  { id: "rust", name: "Rust", icon: "🦀", extension: ".rs" },
  { id: "swift", name: "Swift", icon: "🍎", extension: ".swift" },
  { id: "kotlin", name: "Kotlin", icon: "🟣", extension: ".kt" },
  { id: "ruby", name: "Ruby", icon: "💎", extension: ".rb" },
  { id: "php", name: "PHP", icon: "🐘", extension: ".php" },
  { id: "scala", name: "Scala", icon: "🔴", extension: ".scala" },
  { id: "r", name: "R", icon: "📊", extension: ".r" },
] as const;

export type LanguageId = typeof SUPPORTED_LANGUAGES[number]["id"];

export interface GeneratedCode {
  language: string;
  code: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface AlgorithmInfo {
  name: string;
  description: string;
  category: string;
  pseudocode?: string;
  timeComplexity?: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity?: string;
}

/**
 * Generate algorithm implementation using Gemini AI
 */
export async function generateAlgorithmCode(
  algorithm: AlgorithmInfo,
  language: LanguageId
): Promise<GeneratedCode> {
  const languageInfo = SUPPORTED_LANGUAGES.find(l => l.id === language);
  const languageName = languageInfo?.name || language;

  // Check cache first
  const cacheKey = `${algorithm.name}-${language}`;
  if (cache.has(cacheKey)) {
    console.log("🎯 Using cached code for:", cacheKey);
    return cache.get(cacheKey)!;
  }

  const prompt = `You are an expert algorithm engineer. Generate a complete, well-documented, production-ready implementation of the "${algorithm.name}" algorithm in ${languageName}.

Algorithm Details:
- Name: ${algorithm.name}
- Description: ${algorithm.description}
- Category: ${algorithm.category}
${algorithm.pseudocode ? `- Pseudocode:\n${algorithm.pseudocode}` : ""}
${algorithm.timeComplexity ? `- Time Complexity: Best: ${algorithm.timeComplexity.best}, Average: ${algorithm.timeComplexity.average}, Worst: ${algorithm.timeComplexity.worst}` : ""}
${algorithm.spaceComplexity ? `- Space Complexity: ${algorithm.spaceComplexity}` : ""}

Requirements:
1. Write clean, idiomatic ${languageName} code
2. Include comprehensive comments explaining each step
3. Add type annotations/hints where applicable
4. Include a main function/example showing how to use the algorithm
5. Handle edge cases properly
6. Follow best practices for ${languageName}

Respond in this exact JSON format (no markdown code blocks):
{
  "code": "// Your complete implementation here",
  "explanation": "Brief explanation of the implementation approach",
  "timeComplexity": "O(n log n) or similar",
  "spaceComplexity": "O(n) or similar"
}`;

  try {
    const response = await rateLimitedFetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error?.message || `API Error: ${response.status}`;

      // Handle rate limiting specifically
      if (response.status === 429) {
        // Extract retry time if available
        const retryMatch = errorMessage.match(/retry in (\d+\.?\d*)/i);
        const retrySeconds = retryMatch ? Math.ceil(parseFloat(retryMatch[1])) : 30;

        // Return a user-friendly fallback with built-in code template
        return generateFallbackCode(algorithm, languageName, retrySeconds);
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      throw new Error("No content generated");
    }

    // Parse JSON response (handle potential markdown code blocks)
    let jsonStr = textContent;
    if (jsonStr.includes("```json")) {
      jsonStr = jsonStr.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    } else if (jsonStr.includes("```")) {
      jsonStr = jsonStr.replace(/```\n?/g, "");
    }

    const parsed = JSON.parse(jsonStr.trim());

    const result: GeneratedCode = {
      language: languageName,
      code: parsed.code || "// Code generation failed",
      explanation: parsed.explanation || "No explanation provided",
      timeComplexity: parsed.timeComplexity || algorithm.timeComplexity?.average || "Unknown",
      spaceComplexity: parsed.spaceComplexity || algorithm.spaceComplexity || "Unknown",
    };

    // Cache successful result
    cache.set(cacheKey, result);

    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);

    // Check if it's a quota error
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    if (errorMsg.includes("quota") || errorMsg.includes("429") || errorMsg.includes("rate")) {
      return generateFallbackCode(algorithm, languageName, 30);
    }

    // Return fallback with error message
    return {
      language: languageName,
      code: `// Error generating ${languageName} code for ${algorithm.name}\n// ${errorMsg}\n\n// Please try again or select a different language.`,
      explanation: `Failed to generate code: ${errorMsg}`,
      timeComplexity: algorithm.timeComplexity?.average || "Unknown",
      spaceComplexity: algorithm.spaceComplexity || "Unknown",
    };
  }
}

/**
 * Generate fallback code templates when API is rate limited
 */
function generateFallbackCode(algorithm: AlgorithmInfo, language: string, retrySeconds: number): GeneratedCode {
  const isSearch = algorithm.name.toLowerCase().includes("search") || algorithm.category.toLowerCase().includes("search");

  const templates: Record<string, string> = {
    "Python": `# ${algorithm.name} Implementation
# Category: ${algorithm.category}
# Time Complexity: ${algorithm.timeComplexity?.average || (isSearch ? "O(n)" : "O(n log n)")}
# Space Complexity: ${algorithm.spaceComplexity || "O(1)"}
#
# ⚠️ AI generation is temporarily rate-limited.
# This is a template - please try again in ${retrySeconds} seconds for full AI code.

def ${algorithm.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}(data${isSearch ? ", target" : ""}):
    """
    ${algorithm.description || algorithm.name}
    
    Args:
        data: Input data (array/list)
        ${isSearch ? "target: Element to search for" : ""}
    Returns:
        ${isSearch ? "Index of found element or -1" : "Processed result"}
    """
    # Rate limit fallback template for ${algorithm.name}
    ${isSearch ? `for i in range(len(data)):
        if data[i] == target:
            return i
    return -1` : `result = data
    # Algorithm logic here
    return result`}

# Example usage
if __name__ == "__main__":
    sample_data = [64, 34, 25, 12, 22, 11, 90]
    ${isSearch ? `target = 22
    print(f"Searching for {target} in {sample_data}")
    result = ${algorithm.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}(sample_data, target)
    print(f"Found at index: {result}")` : `print(f"Input: {sample_data}")
    result = ${algorithm.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}(sample_data)
    print(f"Output: {result}")`}
`,
    "JavaScript": `// ${algorithm.name} Implementation
// Category: ${algorithm.category}
// Time Complexity: ${algorithm.timeComplexity?.average || (isSearch ? "O(n)" : "O(n log n)")}
// Space Complexity: ${algorithm.spaceComplexity || "O(1)"}
//
// ⚠️ AI generation is temporarily rate-limited.
// This is a template - please try again in ${retrySeconds} seconds.

function ${algorithm.name.replace(/[^a-zA-Z0-9]/g, '').charAt(0).toLowerCase() + algorithm.name.replace(/[^a-zA-Z0-9]/g, '').slice(1)}(data${isSearch ? ", target" : ""}) {
    /**
     * ${algorithm.description || algorithm.name}
     * @param {Array} data - Input data
     * ${isSearch ? "@param {*} target - Target to find" : ""}
     * @returns {${isSearch ? "number" : "*"}} - ${isSearch ? "Index or -1" : "Result"}
     */
    
    // Rate limit fallback template
    ${isSearch ? `for (let i = 0; i < data.length; i++) {
        if (data[i] === target) return i;
    }
    return -1;` : `let result = data;
    // Implementation logic here
    return result;`}
}

// Example usage
const sampleData = [64, 34, 25, 12, 22, 11, 90];
${isSearch ? `const target = 22;
console.log(\`Searching for \${target} in\`, sampleData);
const result = ${algorithm.name.replace(/[^a-zA-Z0-9]/g, '').charAt(0).toLowerCase() + algorithm.name.replace(/[^a-zA-Z0-9]/g, '').slice(1)}(sampleData, target);
console.log("Found at index:", result);` : `console.log("Input:", sampleData);
const result = ${algorithm.name.replace(/[^a-zA-Z0-9]/g, '').charAt(0).toLowerCase() + algorithm.name.replace(/[^a-zA-Z0-9]/g, '').slice(1)}(sampleData);
console.log("Output:", result);`}
`,
    "Java": `/**
 * ${algorithm.name} Implementation
 * Category: ${algorithm.category}
 * Time Complexity: ${algorithm.timeComplexity?.average || (isSearch ? "O(n)" : "O(n log n)")}
 * Space Complexity: ${algorithm.spaceComplexity || "O(1)"}
 * 
 * ⚠️ Note: AI generation is temporarily rate-limited.
 * This is a template provided while waiting for quota to reset (retry in ${retrySeconds}s).
 */

public class ${algorithm.name.replace(/[^a-zA-Z0-9]/g, '')} {
    
    /**
     * ${algorithm.description || algorithm.name}
     * @param data Input data array
     * ${isSearch ? "@param target Value to search for" : ""}
     * @return ${isSearch ? "Index of found element or -1" : "Processed result"}
     */
    public static ${isSearch ? "int" : "int[]"} execute(int[] data${isSearch ? ", int target" : ""}) {
        ${isSearch ? `for (int i = 0; i < data.length; i++) {
            if (data[i] == target) return i;
        }
        return -1;` : `// Implementation logic here
        int[] result = data.clone();
        return result;`}
    }
    
    public static void main(String[] args) {
        int[] sampleData = {64, 34, 25, 12, 22, 11, 90};
        ${isSearch ? `int target = 22;
        System.out.println("Searching for " + target + " in array...");
        int result = execute(sampleData, target);
        System.out.println("Element found at index: " + result);` : `System.out.print("Input: ");
        printArray(sampleData);
        int[] result = execute(sampleData);
        System.out.print("Output: ");
        printArray(result);`}
    }
    
    private static void printArray(int[] arr) {
        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + (i < arr.length - 1 ? ", " : ""));
        }
        System.out.println("]");
    }
}
`,
    "C++": `/**
 * ${algorithm.name} Implementation
 * Category: ${algorithm.category}
 * Time Complexity: ${algorithm.timeComplexity?.average || (isSearch ? "O(n)" : "O(n log n)")}
 * Space Complexity: ${algorithm.spaceComplexity || "O(1)"}
 * 
 * ⚠️ Note: AI generation is temporarily rate-limited.
 * This is a template provided while waiting for quota to reset (retry in ${retrySeconds}s).
 */

#include <iostream>
#include <vector>

using namespace std;

/**
 * ${algorithm.description || algorithm.name}
 * @param data Input vector
 * ${isSearch ? "@param target Target to find" : ""}
 * @return ${isSearch ? "index or -1" : "processed result"}
 */
${isSearch ? "int" : "vector<int>"} ${algorithm.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}(const vector<int>& data${isSearch ? ", int target" : ""}) {
    ${isSearch ? `for (size_t i = 0; i < data.size(); i++) {
        if (data[i] == target) return (int)i;
    }
    return -1;` : `vector<int> result = data;
    // Implementation logic here
    return result;`}
}

int main() {
    vector<int> sampleData = {64, 34, 25, 12, 22, 11, 90};
    ${isSearch ? `int target = 22;
    int result = ${algorithm.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}(sampleData, target);
    cout << "Found index: " << result << endl;` : `vector<int> result = ${algorithm.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}(sampleData);
    cout << "Processed." << endl;`}
    return 0;
}
`,
  };

  // Default template for other languages
  const defaultTemplate = `// ${algorithm.name} Implementation
// Language: ${language}
// Category: ${algorithm.category}
// Time Complexity: ${algorithm.timeComplexity?.average || "O(n)"}
// Space Complexity: ${algorithm.spaceComplexity || "O(1)"}
//
// ⚠️ AI generation is temporarily rate-limited.
// Please try again in ${retrySeconds} seconds.
//
// Algorithm Description:
// ${algorithm.description || "No description available"}
//
// TODO: Implement the algorithm logic here
`;

  return {
    language,
    code: templates[language] || defaultTemplate,
    explanation: `⚠️ Rate limit reached. Template provided - try again in ${retrySeconds} seconds for AI-generated code.`,
    timeComplexity: algorithm.timeComplexity?.average || "Unknown",
    spaceComplexity: algorithm.spaceComplexity || "Unknown",
  };
}

/**
 * Generate algorithm explanation using Gemini AI
 */
export async function generateAlgorithmExplanation(
  algorithm: AlgorithmInfo
): Promise<string> {
  const prompt = `Explain the "${algorithm.name}" algorithm in a clear, educational way.

Algorithm: ${algorithm.name}
Category: ${algorithm.category}
Description: ${algorithm.description}

Provide a comprehensive explanation covering:
1. 🎯 Core Concept - What problem does it solve?
2. 🔄 How It Works - Step-by-step process
3. 📊 Time & Space Analysis - Why these complexities?
4. ✅ When to Use - Best use cases
5. ❌ Limitations - When NOT to use
6. 💡 Pro Tips - Optimization hints

Keep it educational but concise. Use emojis sparingly for visual appeal.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate explanation.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Failed to generate explanation: ${error instanceof Error ? error.message : "Unknown error"}`;
  }
}

/**
 * Generate quiz questions for an algorithm
 */
export async function generateAlgorithmQuiz(
  algorithm: AlgorithmInfo
): Promise<Array<{ question: string; options: string[]; correctIndex: number; explanation: string }>> {
  const prompt = `Generate 5 multiple-choice quiz questions about the "${algorithm.name}" algorithm.

Algorithm: ${algorithm.name}
Category: ${algorithm.category}
Description: ${algorithm.description}

Return ONLY a JSON array (no markdown) with this structure:
[
  {
    "question": "What is the average time complexity of ${algorithm.name}?",
    "options": ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
    "correctIndex": 3,
    "explanation": "The algorithm uses divide and conquer..."
  }
]

Create questions about:
1. Time/Space complexity
2. How the algorithm works
3. Best use cases
4. Edge cases
5. Comparison with similar algorithms`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
      }),
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    let textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    // Clean markdown if present
    if (textContent.includes("```")) {
      textContent = textContent.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    }

    return JSON.parse(textContent.trim());
  } catch (error) {
    console.error("Quiz generation error:", error);
    return [];
  }
}
