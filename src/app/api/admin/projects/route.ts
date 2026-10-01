import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { ProjectSubmission } from '@/models/ProjectSubmission';
import { Progress } from '@/models/Progress';
import { Notification } from '@/models/Notification';
import { recalculateEnrollmentProgress } from '@/lib/progress';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const filter: any = {};
    if (status) filter.status = status;

    const submissions = await ProjectSubmission.find(filter)
      .populate('projectId', 'title maxMarks passingMarks isCapstone')
      .populate('studentId', 'name email avatar')
      .populate('programId', 'title slug')
      .sort({ submittedAt: -1 });

    return NextResponse.json({ success: true, count: submissions.length, submissions });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await req.json();
    const { submissionId, score, feedback, status } = body;

    if (!submissionId || !status) {
      return NextResponse.json({ success: false, message: 'submissionId and status are required' }, { status: 400 });
    }

    await connectToDatabase();

    const submission = await ProjectSubmission.findById(submissionId);
    if (!submission) {
      return NextResponse.json({ success: false, message: 'Submission not found' }, { status: 404 });
    }

    submission.score = score !== undefined ? score : submission.score;
    submission.feedback = feedback || submission.feedback;
    submission.status = status;
    submission.reviewedAt = new Date();
    submission.reviewedBy = admin.userId as any;
    await submission.save();

    const progress = await Progress.findOne({ enrollment: submission.enrollmentId });
    if (progress) {
      if (status === 'approved') {
        if (!progress.completedProjects.includes(submission.projectId)) {
          progress.completedProjects.push(submission.projectId);
        }
      }
      await progress.save();
      await recalculateEnrollmentProgress(submission.enrollmentId.toString());
    }

    await Notification.create({
      user: submission.studentId,
      title: `Project Evaluation: ${status === 'approved' ? 'Approved 🚀' : 'Status Updated'}`,
      message: `Your project review is ready. Score: ${score ?? 'N/A'}. Feedback: ${feedback || 'Reviewed'}`,
      link: `/student/projects`,
      type: 'project',
    });

    return NextResponse.json({ success: true, message: 'Project evaluated successfully', submission });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
