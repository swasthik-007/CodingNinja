// Mock data store for demonstration purposes when database is not available
interface MockInterview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  status: string;
  startedAt: Date;
  questions: MockQuestion[];
  answers: MockAnswer[];
}

interface MockQuestion {
  id: string;
  interviewId: string;
  questionText: string;
  category: string;
  difficulty: string;
  expectedAnswer?: string;
  order: number;
}

interface MockAnswer {
  id: string;
  interviewId: string;
  questionId: string;
  answerText: string;
  score?: number;
  feedback?: string;
}

class MockDatabase {
  private interviews: Map<string, MockInterview> = new Map();
  private questions: Map<string, MockQuestion> = new Map();
  private answers: Map<string, MockAnswer> = new Map();

  generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  async createInterview(data: { candidateName: string; candidateEmail: string }) {
    const id = this.generateId();
    const interview: MockInterview = {
      id,
      candidateName: data.candidateName,
      candidateEmail: data.candidateEmail,
      status: 'IN_PROGRESS',
      startedAt: new Date(),
      questions: [],
      answers: [],
    };
    this.interviews.set(id, interview);
    return interview;
  }

  async createQuestion(data: {
    interviewId: string;
    questionText: string;
    category: string;
    difficulty: string;
    expectedAnswer?: string;
    order: number;
  }) {
    const id = this.generateId();
    const question: MockQuestion = {
      id,
      ...data,
    };
    this.questions.set(id, question);
    
    // Add to interview
    const interview = this.interviews.get(data.interviewId);
    if (interview) {
      interview.questions.push(question);
    }
    
    return question;
  }

  async createAnswer(data: {
    interviewId: string;
    questionId: string;
    answerText: string;
    score?: number;
    feedback?: string;
  }) {
    const id = this.generateId();
    const answer: MockAnswer = {
      id,
      ...data,
    };
    this.answers.set(id, answer);
    
    // Add to interview
    const interview = this.interviews.get(data.interviewId);
    if (interview) {
      interview.answers.push(answer);
    }
    
    return answer;
  }

  async findQuestion(id: string) {
    return this.questions.get(id) || null;
  }

  async findInterview(id: string) {
    const interview = this.interviews.get(id);
    if (!interview) return null;
    
    return {
      ...interview,
      questions: interview.questions.map(q => ({
        ...q,
        answer: interview.answers.find(a => a.questionId === q.id) || null,
      })),
    };
  }

  async countAnswers(interviewId: string) {
    const interview = this.interviews.get(interviewId);
    return interview ? interview.answers.length : 0;
  }

  async updateInterview(id: string, data: any) {
    const interview = this.interviews.get(id);
    if (interview) {
      Object.assign(interview, data);
    }
    return interview;
  }
}

export const mockDb = new MockDatabase();
