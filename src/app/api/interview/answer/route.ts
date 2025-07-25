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

    // Get the current question
    const currentQuestion = await prisma.question.findUnique({
      where: { id: questionId },
      include: { interview: true },
    });

    if (!currentQuestion) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    // Evaluate the answer using AI
    const evaluation = await aiService.evaluateAnswer(
      currentQuestion.questionText,
      currentQuestion.expectedAnswer || '',
      answerText,
      currentQuestion.category
    );

    // Save the answer
    await prisma.answer.create({
      data: {
        interviewId,
        questionId,
        answerText,
        score: evaluation.score,
        feedback: evaluation.feedback,
      },
    });

    // Check if this is the last question
    const answeredQuestions = await prisma.answer.count({
      where: { interviewId },
    });

    const isLastQuestion = answeredQuestions >= questionFlow.length;

    if (isLastQuestion) {
      // Complete the interview
      await prisma.interview.update({
        where: { id: interviewId },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
        },
      });

      return NextResponse.json({
        isComplete: true,
        evaluation,
        message: "Congratulations! You've completed the Excel mock interview. Click below to view your detailed report.",
      });
    }

    // Generate next question
    const nextQuestionConfig = questionFlow[answeredQuestions];
    const nextQuestionData = await aiService.generateQuestion(
      nextQuestionConfig.category,
      nextQuestionConfig.difficulty,
      answeredQuestions + 1
    );

    // Save the next question
    const nextQuestion = await prisma.question.create({
      data: {
        interviewId,
        questionText: nextQuestionData.question,
        category: nextQuestionConfig.category,
        difficulty: nextQuestionConfig.difficulty,
        expectedAnswer: nextQuestionData.expectedAnswer,
        points: 10,
        order: answeredQuestions + 1,
      },
    });

    return NextResponse.json({
      isComplete: false,
      evaluation,
      nextQuestion: {
        id: nextQuestion.id,
        text: nextQuestion.questionText,
        category: nextQuestion.category,
        difficulty: nextQuestion.difficulty,
        order: nextQuestion.order,
      },
      progress: {
        current: answeredQuestions + 1,
        total: questionFlow.length,
      },
    });

  } catch (error) {
    console.error('Error submitting answer:', error);
    return NextResponse.json(
      { error: 'Failed to submit answer' },
      { status: 500 }
    );
  }
}
