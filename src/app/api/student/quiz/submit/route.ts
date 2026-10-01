import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { Quiz } from '@/models/Quiz';
import { QuizAttempt } from '@/models/QuizAttempt';
import { Progress } from '@/models/Progress';
import { recalculateEnrollmentProgress } from '@/lib/progress';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { quizId, enrollmentId, selectedAnswers } = await req.json();

    if (!quizId || !enrollmentId || !selectedAnswers) {
      return NextResponse.json({ success: false, message: 'Missing quiz details' }, { status: 400 });
    }

    await connectToDatabase();

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return NextResponse.json({ success: false, message: 'Quiz not found' }, { status: 404 });
    }

    let totalScore = 0;
    const evaluatedAnswers = quiz.questions.map((q, idx) => {
      const selected = selectedAnswers[idx];
      const isCorrect = selected === q.correctAnswer;
      const marksAwarded = isCorrect ? (q.marks || 1) : 0;
      totalScore += marksAwarded;

      return {
        questionIndex: idx,
        selectedOption: selected !== undefined ? selected : -1,
        isCorrect,
        marksAwarded,
      };
    });

    const passed = totalScore >= quiz.passingMarks;

    const previousAttempts = await QuizAttempt.countDocuments({
      quizId,
      enrollmentId,
      studentId: user.userId,
    });

    const attempt = await QuizAttempt.create({
      quizId,
      enrollmentId,
      studentId: user.userId,
      answers: evaluatedAnswers,
      totalScore,
      maxScore: quiz.totalMarks,
      passed,
      attemptNumber: previousAttempts + 1,
      completedAt: new Date(),
    });

    if (passed) {
      const progress = await Progress.findOne({ enrollment: enrollmentId });
      if (progress && !progress.passedQuizzes.includes(quizId as any)) {
        progress.passedQuizzes.push(quizId as any);
        await progress.save();
      }
      await recalculateEnrollmentProgress(enrollmentId);
    }

    return NextResponse.json({
      success: true,
      totalScore,
      maxScore: quiz.totalMarks,
      passingMarks: quiz.passingMarks,
      passed,
      attemptId: attempt._id,
      evaluatedAnswers,
    });
  } catch (error: any) {
    console.error('Quiz submit error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Error evaluating quiz' }, { status: 500 });
  }
}
