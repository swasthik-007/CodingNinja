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

    // Get interview with all questions and answers from database
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

    // Calculate scores by category from actual data
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

    // Calculate average scores from actual data
    const categoryAverages: Record<string, number> = {};
    Object.entries(categoryScores).forEach(([category, scores]) => {
      categoryAverages[category] = calculateOverallScore(scores);
    });

    const overallScore = calculateOverallScore(allScores);

    // Generate AI summary based on actual answers
    let aiSummary;
    try {
      const answersForSummary = interview.questions
        .filter((q: any) => q.answer)
        .map((q: any) => ({
          question: q.questionText,
          answer: q.answer.answerText,
          score: q.answer.score || 0,
          category: q.category as any,
        }));

      if (answersForSummary.length > 0) {
        aiSummary = await aiService.generateInterviewSummary(answersForSummary);
      } else {
        throw new Error('No answers found for summary');
      }
    } catch (aiError) {
      console.error('Error generating AI summary:', aiError);
      // Fallback summary based on actual scores
      const avgScore = overallScore;
      aiSummary = {
        overallFeedback: `Interview completed with an overall score of ${avgScore.toFixed(1)}/10. ${
          avgScore >= 8 ? 'Excellent performance!' : 
          avgScore >= 6 ? 'Good performance with room for improvement.' :
          'Consider reviewing Excel fundamentals for better results.'
        }`,
        strengths: avgScore >= 7 ? ['Demonstrated Excel knowledge', 'Clear communication'] : ['Participated in the interview process'],
        areasForImprovement: avgScore < 8 ? ['Excel formula proficiency', 'Advanced features knowledge'] : ['Advanced Excel techniques'],
        recommendations: avgScore >= 7 ? ['Explore advanced Excel features', 'Practice complex scenarios'] : ['Review Excel fundamentals', 'Practice basic operations'],
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

    // Return actual data-driven report
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
