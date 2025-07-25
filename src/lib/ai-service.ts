import { GoogleGenerativeAI } from '@google/generative-ai';
import { QuestionCategory, DifficultyLevel, AIEvaluationResponse } from '@/types/interview';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export class AIService {
  private static instance: AIService;
  private model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateQuestion(
    category: QuestionCategory,
    difficulty: DifficultyLevel,
    questionNumber: number
  ): Promise<{ question: string; expectedAnswer: string }> {
    const prompt = `Generate an Excel interview question for the following:
    - Category: ${category}
    - Difficulty: ${difficulty}
    - Question Number: ${questionNumber}
    
    The question should be practical and test real Excel skills. Return a JSON response with:
    {
      "question": "The interview question",
      "expectedAnswer": "A detailed expected answer or approach"
    }`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();
      
      if (!content) throw new Error('No response from Gemini');

      // Try to parse JSON, fallback if needed
      try {
        return JSON.parse(content);
      } catch (parseError) {
        // If JSON parsing fails, extract question and answer manually
        const questionMatch = content.match(/"question":\s*"([^"]+)"/);
        const answerMatch = content.match(/"expectedAnswer":\s*"([^"]+)"/);
        
        if (questionMatch && answerMatch) {
          return {
            question: questionMatch[1],
            expectedAnswer: answerMatch[1]
          };
        }
        throw new Error('Could not parse Gemini response');
      }
    } catch (error) {
      console.error('Error generating question:', error);
      return this.getFallbackQuestion(category, difficulty);
    }
  }

  async evaluateAnswer(
    question: string,
    expectedAnswer: string,
    userAnswer: string,
    category: QuestionCategory
  ): Promise<AIEvaluationResponse> {
    const prompt = `Evaluate this Excel interview answer:
    
    Question: ${question}
    Expected Answer: ${expectedAnswer}
    User Answer: ${userAnswer}
    Category: ${category}
    
    Provide a JSON response with:
    {
      "score": <number between 0-10>,
      "feedback": "<constructive feedback explaining the score>"
    }
    
    Consider:
    - Technical accuracy
    - Completeness
    - Best practices mentioned
    - Alternative approaches`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();
      
      if (!content) throw new Error('No response from Gemini');

      // Try to parse JSON, fallback if needed
      try {
        return JSON.parse(content);
      } catch (parseError) {
        // If JSON parsing fails, extract score and feedback manually
        const scoreMatch = content.match(/"score":\s*(\d+(?:\.\d+)?)/);
        const feedbackMatch = content.match(/"feedback":\s*"([^"]+)"/);
        
        if (scoreMatch && feedbackMatch) {
          return {
            score: parseFloat(scoreMatch[1]),
            feedback: feedbackMatch[1]
          };
        }
        throw new Error('Could not parse Gemini response');
      }
    } catch (error) {
      console.error('Error evaluating answer:', error);
      return {
        score: 5,
        feedback: 'Unable to evaluate answer at this time. Please try again.',
      };
    }
  }

  async generateInterviewSummary(
    answers: Array<{
      question: string;
      answer: string;
      score: number;
      category: QuestionCategory;
    }>
  ): Promise<{
    overallFeedback: string;
    strengths: string[];
    areasForImprovement: string[];
    recommendations: string[];
  }> {
    const prompt = `Generate a comprehensive interview summary based on these Excel question responses:
    
    ${answers.map((a, i) => `
    Question ${i + 1} (${a.category}): ${a.question}
    Answer: ${a.answer}
    Score: ${a.score}/10
    `).join('\n')}
    
    Provide a JSON response with:
    {
      "overallFeedback": "<comprehensive summary of performance>",
      "strengths": ["<strength 1>", "<strength 2>", ...],
      "areasForImprovement": ["<area 1>", "<area 2>", ...],
      "recommendations": ["<recommendation 1>", "<recommendation 2>", ...]
    }`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();
      
      if (!content) throw new Error('No response from Gemini');

      // Try to parse JSON, fallback if needed
      try {
        return JSON.parse(content);
      } catch (parseError) {
        // If JSON parsing fails, provide a basic response
        console.error('Error parsing Gemini summary response:', parseError);
        return {
          overallFeedback: 'Interview completed successfully. Performance shows good Excel knowledge with room for continued learning.',
          strengths: ['Participated actively in the interview', 'Demonstrated Excel knowledge'],
          areasForImprovement: ['Continue practicing Excel skills', 'Explore advanced features'],
          recommendations: ['Review Excel fundamentals', 'Practice with real-world scenarios'],
        };
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      return {
        overallFeedback: 'Interview completed successfully.',
        strengths: ['Participated in the interview'],
        areasForImprovement: ['Continue practicing Excel skills'],
        recommendations: ['Review Excel fundamentals'],
      };
    }
  }

  private getFallbackQuestion(category: QuestionCategory, difficulty: DifficultyLevel) {
    const fallbackQuestions: Record<QuestionCategory, Record<DifficultyLevel, { question: string; expectedAnswer: string }>> = {
      BASIC_OPERATIONS: {
        BEGINNER: {
          question: "How do you select all data in a worksheet quickly?",
          expectedAnswer: "Use Ctrl+A to select all, or click the intersection of row and column headers."
        },
        INTERMEDIATE: {
          question: "Explain how to freeze panes in Excel and when you would use this feature.",
          expectedAnswer: "Select the cell below and to the right of where you want to freeze, then use View > Freeze Panes. Used to keep headers visible while scrolling."
        },
        ADVANCED: {
          question: "How would you create a custom number format for displaying negative numbers in red parentheses?",
          expectedAnswer: "Use Format Cells > Number > Custom, then format code: #,##0_);[Red](#,##0)"
        }
      },
      FORMULAS_FUNCTIONS: {
        BEGINNER: {
          question: "What is the difference between SUM and SUMIF functions?",
          expectedAnswer: "SUM adds all numbers in a range. SUMIF adds only the numbers that meet a specified condition."
        },
        INTERMEDIATE: {
          question: "Explain the difference between VLOOKUP and INDEX-MATCH.",
          expectedAnswer: "VLOOKUP searches vertically and can only look to the right. INDEX-MATCH is more flexible, can look in any direction, and is generally faster for large datasets."
        },
        ADVANCED: {
          question: "How would you create a formula that counts unique values in a range?",
          expectedAnswer: "Use =SUMPRODUCT(1/COUNTIF(range,range)) or in Excel 365, =COUNTA(UNIQUE(range))."
        }
      },
      DATA_ANALYSIS: {
        BEGINNER: {
          question: "How do you sort data in Excel?",
          expectedAnswer: "Select the data range, go to Data tab, and click Sort. Choose the column to sort by and whether ascending or descending."
        },
        INTERMEDIATE: {
          question: "How would you remove duplicate rows from a dataset?",
          expectedAnswer: "Select the data, go to Data tab > Remove Duplicates, choose which columns to check for duplicates."
        },
        ADVANCED: {
          question: "How would you perform a multi-level sort on your data?",
          expectedAnswer: "Use Data > Sort, add multiple sort levels by clicking 'Add Level', specify different columns and sort orders for each level."
        }
      },
      PIVOT_TABLES: {
        BEGINNER: {
          question: "What is a pivot table and when would you use one?",
          expectedAnswer: "A pivot table summarizes and analyzes large datasets by grouping and aggregating data. Use when you need to quickly analyze trends and patterns."
        },
        INTERMEDIATE: {
          question: "How do you create a basic pivot table?",
          expectedAnswer: "Select your data, go to Insert > PivotTable, choose data range and location, then drag fields to Rows, Columns, and Values areas."
        },
        ADVANCED: {
          question: "How would you add a calculated field to a pivot table?",
          expectedAnswer: "In PivotTable Analyze tab, click Fields, Items & Sets > Calculated Field, enter a name and formula using existing field names."
        }
      },
      MACROS_VBA: {
        BEGINNER: {
          question: "What are macros in Excel and how do you record one?",
          expectedAnswer: "Macros automate repetitive tasks. Record by going to View > Macros > Record Macro, perform actions, then stop recording."
        },
        INTERMEDIATE: {
          question: "How do you run a macro in Excel?",
          expectedAnswer: "Use Alt+F8 to open Macro dialog, select the macro and click Run. Or assign it to a button or keyboard shortcut."
        },
        ADVANCED: {
          question: "What is VBA and how does it relate to macros?",
          expectedAnswer: "VBA (Visual Basic for Applications) is the programming language behind macros. Macros are recorded VBA code that can be edited for more complex automation."
        }
      },
      PROBLEM_SOLVING: {
        BEGINNER: {
          question: "How would you find and fix errors in formulas?",
          expectedAnswer: "Use Excel's error checking features, look for #VALUE!, #REF!, #DIV/0! errors. Use F9 to evaluate parts of formulas step by step."
        },
        INTERMEDIATE: {
          question: "How would you create a simple budget tracking spreadsheet?",
          expectedAnswer: "Create columns for categories, budgeted amounts, actual amounts, and variance. Use SUM functions for totals and conditional formatting for variances."
        },
        ADVANCED: {
          question: "How would you build a dynamic dashboard that updates automatically?",
          expectedAnswer: "Use Excel Tables for data, create pivot tables and charts that reference the tables, add slicers for interactivity, and use formulas that automatically expand with new data."
        }
      }
    };

    return fallbackQuestions[category]?.[difficulty] || {
      question: "Describe your experience with Excel.",
      expectedAnswer: "Any relevant Excel experience and skills."
    };
  }
}

export const aiService = AIService.getInstance();
