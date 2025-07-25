import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { aiService } from '@/lib/ai-service';
import { StartInterviewRequest } from '@/types/interview';

export async function POST(request: NextRequest) {
  try {
    const body: StartInterviewRequest = await request.json();
    
    // Create new interview session
    const interview = await prisma.interview.create({
      data: {
        candidateName: body.candidateName,
        candidateEmail: body.candidateEmail,
        status: 'IN_PROGRESS',
      },
    });

    // Generate first question
    const firstQuestion = await aiService.generateQuestion(
      'BASIC_OPERATIONS',
      'BEGINNER',
      1
    );

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
      { error: 'Failed to start interview' },
      { status: 500 }
    );
  }
}
