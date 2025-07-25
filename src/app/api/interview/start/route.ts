import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { aiService } from '@/lib/ai-service';
import { StartInterviewRequest } from '@/types/interview';

export async function POST(request: NextRequest) {
  try {
    const body: StartInterviewRequest = await request.json();
    
    // Validate required fields
    if (!body.candidateName || !body.candidateEmail) {
      return NextResponse.json(
        { error: 'Candidate name and email are required' },
        { status: 400 }
      );
    }
    
    // Create new interview session
    const interview = await prisma.interview.create({
      data: {
        candidateName: body.candidateName,
        candidateEmail: body.candidateEmail,
        status: 'IN_PROGRESS',
      },
    });

    // Generate first question with fallback
    let firstQuestion;
    try {
      firstQuestion = await aiService.generateQuestion(
        'BASIC_OPERATIONS',
        'BEGINNER',
        1
      );
    } catch (aiError) {
      console.error('Error generating first question:', aiError);
      // Fallback question
      firstQuestion = {
        question: 'What are the basic operations you can perform in Microsoft Excel?',
        expectedAnswer: 'Basic operations include data entry, formatting cells, creating formulas, using functions like SUM, creating charts, and organizing data.',
      };
    }

    // Save the first question
    const question = await prisma.question.create({
      data: {
        interviewId: interview.id,
        questionText: firstQuestion.question,
        category: 'BASIC_OPERATIONS',
        difficulty: 'BEGINNER',
        expectedAnswer: firstQuestion.expectedAnswer,
        points: 10,
        order: 1,
      },
    });

    return NextResponse.json({
      interviewId: interview.id,
      question: {
        id: question.id,
        text: question.questionText,
        category: question.category,
        difficulty: question.difficulty,
        order: question.order,
      },
      message: "Welcome to the Excel Mock Interview! I'm your AI interviewer, and I'll be assessing your Excel skills today. Let's begin with the first question."
    });

  } catch (error) {
    console.error('Error starting interview:', error);
    return NextResponse.json(
      { 
        error: 'Failed to start interview',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
