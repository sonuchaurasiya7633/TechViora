import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { AssignmentSubmission } from '@/models/AssignmentSubmission';
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

    const submissions = await AssignmentSubmission.find(filter)
      .populate('assignmentId', 'title maxScore passingScore')
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

    const submission = await AssignmentSubmission.findById(submissionId);
    if (!submission) {
      return NextResponse.json({ success: false, message: 'Submission not found' }, { status: 404 });
    }

    submission.score = score !== undefined ? score : submission.score;
    submission.feedback = feedback || submission.feedback;
    submission.status = status;
    submission.reviewedAt = new Date();
    submission.reviewedBy = admin.userId as any;
    await submission.save();

    // Update Progress model if approved
    const progress = await Progress.findOne({ enrollment: submission.enrollmentId });
    if (progress) {
      if (status === 'approved') {
        if (!progress.approvedAssignments.includes(submission.assignmentId)) {
          progress.approvedAssignments.push(submission.assignmentId);
        }
      } else {
        progress.approvedAssignments = progress.approvedAssignments.filter(
          (id) => id.toString() !== submission.assignmentId.toString()
        );
      }
      await progress.save();
      await recalculateEnrollmentProgress(submission.enrollmentId.toString());
    }

    // Send Notification to student
    await Notification.create({
      user: submission.studentId,
      title: `Assignment Reviewed: ${status === 'approved' ? 'Approved 🎉' : 'Feedback Received'}`,
      message: `Your assignment has been reviewed by your mentor. Score: ${score ?? 'N/A'}. Status: ${status}`,
      link: `/student/assignments`,
      type: 'assignment',
    });

    return NextResponse.json({ success: true, message: 'Submission evaluated successfully', submission });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
