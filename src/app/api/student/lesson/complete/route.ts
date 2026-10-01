import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { Progress } from '@/models/Progress';
import { recalculateEnrollmentProgress } from '@/lib/progress';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { enrollmentId, lessonId } = await req.json();
    if (!enrollmentId || !lessonId) {
      return NextResponse.json({ success: false, message: 'Missing enrollmentId or lessonId' }, { status: 400 });
    }

    await connectToDatabase();

    const progress = await Progress.findOne({
      student: user.userId,
      enrollment: enrollmentId,
    });

    if (!progress) {
      return NextResponse.json({ success: false, message: 'Progress record not found' }, { status: 404 });
    }

    if (!progress.completedLessons.includes(lessonId as any)) {
      progress.completedLessons.push(lessonId as any);
      progress.lastAccessedLesson = lessonId as any;
      progress.lastAccessedAt = new Date();
      await progress.save();
    }

    const updatedPercent = await recalculateEnrollmentProgress(enrollmentId);

    return NextResponse.json({
      success: true,
      message: 'Lesson marked as complete!',
      progressPercent: updatedPercent,
    });
  } catch (error: any) {
    console.error('Lesson completion error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Error updating lesson' }, { status: 500 });
  }
}
