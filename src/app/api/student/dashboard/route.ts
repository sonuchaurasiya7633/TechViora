import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { Enrollment } from '@/models/Enrollment';
import { Progress } from '@/models/Progress';
import { Lesson } from '@/models/Lesson';
import { AssignmentSubmission } from '@/models/AssignmentSubmission';
import { ProjectSubmission } from '@/models/ProjectSubmission';
import { Certificate } from '@/models/Certificate';
import { Announcement } from '@/models/Announcement';
import { Notification } from '@/models/Notification';

export async function GET() {
  try {
    const session = await requireAuth();
    await connectToDatabase();

    // Fetch student's active enrollments
    const enrollments = await Enrollment.find({ student: session.userId })
      .populate('program')
      .populate('plan')
      .sort({ createdAt: -1 });

    const activeEnrollment = enrollments.find((e) => e.status === 'active') || enrollments[0];

    let progressData = null;
    let recentLesson = null;
    let totalCompletedLessons = 0;
    let pendingSubmissionsCount = 0;

    if (activeEnrollment) {
      const progress = await Progress.findOne({ enrollment: activeEnrollment._id });
      if (progress) {
        progressData = progress;
        totalCompletedLessons = progress.completedLessons?.length || 0;
        if (progress.lastAccessedLesson) {
          recentLesson = await Lesson.findById(progress.lastAccessedLesson);
        }
      }

      if (!recentLesson) {
        recentLesson = await Lesson.findOne({ programId: activeEnrollment.program._id }).sort({ order: 1 });
      }
    }

    const [certificates, announcements, notifications, assignmentSubmissions, projectSubmissions] = await Promise.all([
      Certificate.find({ student: session.userId, status: 'issued' }),
      Announcement.find({ isPublished: true }).sort({ publishDate: -1 }).limit(3),
      Notification.find({ user: session.userId }).sort({ createdAt: -1 }).limit(10),
      AssignmentSubmission.find({ studentId: session.userId, status: 'submitted' }),
      ProjectSubmission.find({ studentId: session.userId, status: 'submitted' }),
    ]);

    pendingSubmissionsCount = assignmentSubmissions.length + projectSubmissions.length;

    return NextResponse.json({
      success: true,
      stats: {
        activeInternshipsCount: enrollments.filter((e) => e.status === 'active').length,
        totalCompletedLessons,
        overallProgress: activeEnrollment?.progressPercent || 0,
        pendingSubmissions: pendingSubmissionsCount,
        certificatesCount: certificates.length,
      },
      activeEnrollment,
      allEnrollments: enrollments,
      recentLesson,
      announcements,
      notifications,
      certificates,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
