import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { AssignmentSubmission } from '@/models/AssignmentSubmission';
import { Assignment } from '@/models/Assignment';
import { Enrollment } from '@/models/Enrollment';
import { Progress } from '@/models/Progress';
import { Notification } from '@/models/Notification';
import { recalculateEnrollmentProgress } from '@/lib/progress';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const {
      assignmentId,
      enrollmentId,
      githubUrl,
      liveUrl,
      textAnswer,
      fileUrls,
    } = await req.json();

    if (!assignmentId || !enrollmentId) {
      return NextResponse.json({ success: false, message: 'Missing assignmentId or enrollmentId' }, { status: 400 });
    }

    if (!githubUrl && !liveUrl && !textAnswer && (!fileUrls || fileUrls.length === 0)) {
      return NextResponse.json({ success: false, message: 'Please provide a GitHub URL, Live URL, or written answer.' }, { status: 400 });
    }

    await connectToDatabase();

    const enrollment = await Enrollment.findOne({ _id: enrollmentId, student: user.userId });
    if (!enrollment) {
      return NextResponse.json({ success: false, message: 'Enrollment record not found' }, { status: 404 });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return NextResponse.json({ success: false, message: 'Assignment not found' }, { status: 404 });
    }

    let submission = await AssignmentSubmission.findOne({
      assignmentId,
      enrollmentId,
      studentId: user.userId,
    });

    if (submission) {
      submission.githubUrl = githubUrl || submission.githubUrl;
      submission.liveUrl = liveUrl || submission.liveUrl;
      submission.textAnswer = textAnswer || submission.textAnswer;
      submission.fileUrls = fileUrls || submission.fileUrls;
      submission.status = 'submitted';
      submission.submittedAt = new Date();
      await submission.save();
    } else {
      submission = await AssignmentSubmission.create({
        assignmentId,
        enrollmentId,
        studentId: user.userId,
        programId: enrollment.program,
        githubUrl: githubUrl || '',
        liveUrl: liveUrl || '',
        textAnswer: textAnswer || '',
        fileUrls: fileUrls || [],
        status: 'submitted',
        submittedAt: new Date(),
      });
    }

    // Update Progress model
    const progress = await Progress.findOne({ enrollment: enrollmentId });
    if (progress && !progress.submittedAssignments.includes(assignmentId as any)) {
      progress.submittedAssignments.push(assignmentId as any);
      await progress.save();
    }

    await recalculateEnrollmentProgress(enrollmentId);

    // Create Notification
    await Notification.create({
      user: user.userId,
      title: 'Assignment Submitted ✅',
      message: `Your submission for "${assignment.title}" has been received and is under mentor review.`,
      link: `/student/assignments`,
      type: 'assignment',
    });

    return NextResponse.json({
      success: true,
      message: 'Assignment submitted successfully for review!',
      submission,
    });
  } catch (error: any) {
    console.error('Assignment submission error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Error submitting assignment' }, { status: 500 });
  }
}
