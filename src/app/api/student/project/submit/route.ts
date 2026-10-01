import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { ProjectSubmission } from '@/models/ProjectSubmission';
import { Project } from '@/models/Project';
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
      projectId,
      enrollmentId,
      githubUrl,
      liveUrl,
      videoDemoUrl,
      description,
      screenshotUrls,
      fileUrls,
    } = await req.json();

    if (!projectId || !enrollmentId || !githubUrl || !description) {
      return NextResponse.json({ success: false, message: 'Project ID, GitHub URL, and Description are required' }, { status: 400 });
    }

    await connectToDatabase();

    const enrollment = await Enrollment.findOne({ _id: enrollmentId, student: user.userId });
    if (!enrollment) {
      return NextResponse.json({ success: false, message: 'Enrollment record not found' }, { status: 404 });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 });
    }

    let submission = await ProjectSubmission.findOne({
      projectId,
      enrollmentId,
      studentId: user.userId,
    });

    if (submission) {
      submission.githubUrl = githubUrl;
      submission.liveUrl = liveUrl || '';
      submission.videoDemoUrl = videoDemoUrl || '';
      submission.description = description;
      submission.screenshotUrls = screenshotUrls || [];
      submission.fileUrls = fileUrls || [];
      submission.status = 'submitted';
      submission.submittedAt = new Date();
      await submission.save();
    } else {
      submission = await ProjectSubmission.create({
        projectId,
        enrollmentId,
        studentId: user.userId,
        programId: enrollment.program,
        githubUrl,
        liveUrl: liveUrl || '',
        videoDemoUrl: videoDemoUrl || '',
        description,
        screenshotUrls: screenshotUrls || [],
        fileUrls: fileUrls || [],
        status: 'submitted',
        submittedAt: new Date(),
      });
    }

    const progress = await Progress.findOne({ enrollment: enrollmentId });
    if (progress && !progress.completedProjects.includes(projectId as any)) {
      progress.completedProjects.push(projectId as any);
      await progress.save();
    }

    await recalculateEnrollmentProgress(enrollmentId);

    await Notification.create({
      user: user.userId,
      title: 'Project Submitted 🚀',
      message: `Your submission for "${project.title}" has been successfully recorded for evaluation.`,
      link: `/student/projects`,
      type: 'project',
    });

    return NextResponse.json({
      success: true,
      message: 'Project deliverables submitted successfully for evaluation!',
      submission,
    });
  } catch (error: any) {
    console.error('Project submission error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Error submitting project' }, { status: 500 });
  }
}
