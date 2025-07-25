export interface Interview {
  id: string;
  candidateName?: string;
  candidateEmail?: string;
  startedAt: Date;
  completedAt?: Date;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  totalScore?: number;
  feedback?: string;
  questions: Question[];
  answers: Answer[];
}

export interface Question {
  id: string;
  interviewId: string;
  questionText: string;
  category: QuestionCategory;
  difficulty: DifficultyLevel;
  expectedAnswer?: string;
  points: number;
  order: number;
  askedAt: Date;
  answer?: Answer;
}

export interface Answer {
  id: string;
  interviewId: string;
  questionId: string;
  answerText: string;
  score?: number;
  feedback?: string;
  submittedAt: Date;
}

export type QuestionCategory = 
  | 'BASIC_OPERATIONS'
  | 'FORMULAS_FUNCTIONS' 
  | 'DATA_ANALYSIS'
  | 'PIVOT_TABLES'
  | 'MACROS_VBA'
  | 'PROBLEM_SOLVING';

export type DifficultyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface InterviewSession {
  interview: Interview;
  currentQuestionIndex: number;
  isComplete: boolean;
}

export interface AIEvaluationResponse {
  score: number;
  feedback: string;
  nextQuestionSuggestion?: string;
}

export interface StartInterviewRequest {
  candidateName?: string;
  candidateEmail?: string;
}

export interface SubmitAnswerRequest {
  interviewId: string;
  questionId: string;
  answerText: string;
}

export interface InterviewReport {
  interview: Interview;
  categoryScores: Record<QuestionCategory, number>;
  overallScore: number;
  strengths: string[];
  areasForImprovement: string[];
  recommendations: string[];
}
