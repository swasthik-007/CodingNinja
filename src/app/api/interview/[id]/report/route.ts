import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { aiService } from '@/lib/ai-service';
import { calculateOverallScore } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const interviewId = params.id;

    if (!interviewId) {
      return NextResponse.json(
        { error: 'Interview ID is required' },
        { status: 400 }
      );
    }

    // Get interview with all questions and answers
    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
      include: {
        questions: {
          orderBy: { order: 'asc' },
          include: { answer: true },
        },
        answers: true,
      },
    });

    if (!interview) {
      return NextResponse.json(
        { error: 'Interview not found' },
        { status: 404 }
      );
    }

    // Calculate scores by category
    const categoryScores: Record<string, number[]> = {};
    const allScores: number[] = [];

    interview.questions.forEach((question: any) => {
      if (question.answer && question.answer.score !== null) {
        const category = question.category;
        const score = question.answer.score || 0;
        
        if (!categoryScores[category]) {
          categoryScores[category] = [];
        }
        categoryScores[category].push(score);
        allScores.push(score);
      }
    });

    // Calculate average scores
    const categoryAverages: Record<string, number> = {};
    Object.entries(categoryScores).forEach(([category, scores]) => {
      categoryAverages[category] = calculateOverallScore(scores);
    });

    const overallScore = calculateOverallScore(allScores);

    // Generate AI summary with fallback
    let aiSummary;
    try {
      const answersForSummary = interview.questions
        .filter((q: any) => q.answer)
        .map((q: any) => ({
          question: q.questionText,
          answer: q.answer!.answerText,
          score: q.answer!.score || 0,
          category: q.category as any,
        }));

      if (answersForSummary.length > 0) {
        aiSummary = await aiService.generateInterviewSummary(answersForSummary);
      } else {
        throw new Error('No answers found for summary');
      }
    } catch (aiError) {
      console.error('Error generating AI summary:', aiError);
      // Fallback summary
      aiSummary = {
        overallFeedback: 'Interview completed successfully. Performance analysis is temporarily unavailable.',
        strengths: ['Participated in the interview process'],
        areasForImprovement: ['Continue practicing Excel skills'],
        recommendations: ['Review Excel fundamentals and best practices'],
      };
    }

    // Update interview with final score and feedback
    try {
      await prisma.interview.update({
        where: { id: interviewId },
        data: {
          totalScore: overallScore,
          feedback: aiSummary.overallFeedback,
        },
      });
    } catch (updateError) {
      console.error('Error updating interview:', updateError);
      // Continue without updating if there's an issue
    }

    const report = {
      interview: {
        id: interview.id,
        candidateName: interview.candidateName,
        candidateEmail: interview.candidateEmail,
        startedAt: interview.startedAt,
        completedAt: interview.completedAt,
        totalScore: overallScore,
        status: interview.status,
      },
      performance: {
        overallScore,
        categoryScores: categoryAverages,
        questionsAnswered: interview.answers.length,
        totalQuestions: interview.questions.length,
      },
      feedback: {
        overallFeedback: aiSummary.overallFeedback,
        strengths: aiSummary.strengths,
        areasForImprovement: aiSummary.areasForImprovement,
        recommendations: aiSummary.recommendations,
      },
      questions: interview.questions.map((q: any) => ({
        id: q.id,
        question: q.questionText,
        category: q.category,
        difficulty: q.difficulty,
        answer: q.answer ? {
          text: q.answer.answerText,
          score: q.answer.score,
          feedback: q.answer.feedback,
        } : null,
      })),
    };

    return NextResponse.json(report);

  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate report',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
