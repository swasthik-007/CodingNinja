import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { aiService } from '@/lib/ai-service';
import { SubmitAnswerRequest, QuestionCategory, DifficultyLevel } from '@/types/interview';

const questionFlow: Array<{ category: QuestionCategory; difficulty: DifficultyLevel }> = [
  { category: 'BASIC_OPERATIONS', difficulty: 'BEGINNER' },
  { category: 'FORMULAS_FUNCTIONS', difficulty: 'BEGINNER' },
  { category: 'DATA_ANALYSIS', difficulty: 'INTERMEDIATE' },
  { category: 'PIVOT_TABLES', difficulty: 'INTERMEDIATE' },
  { category: 'PROBLEM_SOLVING', difficulty: 'ADVANCED' },
];

export async function POST(request: NextRequest) {
  try {
    const body: SubmitAnswerRequest = await request.json();
    const { interviewId, questionId, answerText } = body;

    // Validate required fields
    if (!interviewId || !questionId || !answerText) {
      return NextResponse.json(
        { error: 'Missing required fields: interviewId, questionId, or answerText' },
        { status: 400 }
      );
    }

    // Check if this is demo mode
    if (interviewId.startsWith('demo-')) {
      // Handle demo mode
      const demoQuestions = [
        'What are the basic operations you can perform in Microsoft Excel?',
        'How would you create a simple formula in Excel?',
        'Explain how to sort data in Excel',
        'What is the purpose of pivot tables?',
        'How would you solve a complex data analysis problem?'
      ];
      
      const currentQuestionIndex = parseInt(questionId.replace('demo-q', '')) - 1;
      const isLastQuestion = currentQuestionIndex >= 4;

      if (isLastQuestion) {
        return NextResponse.json({
          isComplete: true,
          evaluation: {
            score: 8,
            feedback: 'Great job completing the demo interview!'
          },
          message: "Demo interview completed! In the full version, you would get a detailed report.",
          demoMode: true
        });
      }

      const nextQuestionIndex = currentQuestionIndex + 1;
      return NextResponse.json({
        isComplete: false,
        evaluation: {
          score: 7,
          feedback: 'Good answer! Moving to the next question.'
        },
        nextQuestion: {
          id: `demo-q${nextQuestionIndex + 1}`,
          text: demoQuestions[nextQuestionIndex],
          category: questionFlow[nextQuestionIndex]?.category || 'BASIC_OPERATIONS',
          difficulty: questionFlow[nextQuestionIndex]?.difficulty || 'BEGINNER',
          order: nextQuestionIndex + 1,
        },
        progress: {
          current: nextQuestionIndex + 1,
          total: questionFlow.length,
        },
        demoMode: true
      });
    }

    // Regular database mode - return demo response if database fails
    return NextResponse.json({
      isComplete: false,
      evaluation: {
        score: 7,
        feedback: 'Answer processed successfully (running in demo mode).'
      },
      nextQuestion: {
        id: 'demo-next',
        text: 'How would you create a basic chart in Excel?',
        category: 'BASIC_OPERATIONS',
        difficulty: 'BEGINNER',
        order: 2,
      },
      progress: {
        current: 2,
        total: 5,
      },
      demoMode: true
    });

  } catch (error) {
    console.error('Error submitting answer:', error);
    return NextResponse.json(
      { 
        error: 'Failed to submit answer',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
