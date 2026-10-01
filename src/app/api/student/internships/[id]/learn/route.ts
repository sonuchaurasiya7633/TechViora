import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { Enrollment } from '@/models/Enrollment';
import { Program } from '@/models/Program';
import { Module } from '@/models/Module';
import { Lesson } from '@/models/Lesson';
import { Assignment } from '@/models/Assignment';
import { AssignmentSubmission } from '@/models/AssignmentSubmission';
import { Project } from '@/models/Project';
import { ProjectSubmission } from '@/models/ProjectSubmission';
import { Quiz } from '@/models/Quiz';
import { QuizAttempt } from '@/models/QuizAttempt';
import { Progress } from '@/models/Progress';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id: enrollmentId } = await params;

    await connectToDatabase();

    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      student: session.userId,
    }).populate('program').populate('plan');

    if (!enrollment) {
      return NextResponse.json({ success: false, message: 'Enrollment not found or unauthorized' }, { status: 404 });
    }

    const programId = enrollment.program._id;

    const [modules, lessons, assignments, projects, quizzes, progress, assignmentSubmissions, projectSubmissions, quizAttempts] =
      await Promise.all([
        Module.find({ programId, isPublished: true }).sort({ order: 1 }),
        Lesson.find({ programId, isPublished: true }).sort({ order: 1 }),
        Assignment.find({ programId, isPublished: true }).sort({ order: 1 }),
        Project.find({ programId, isPublished: true }).sort({ order: 1 }),
        Quiz.find({ programId, isPublished: true }).sort({ order: 1 }),
        Progress.findOne({ enrollment: enrollment._id }),
        AssignmentSubmission.find({ enrollmentId: enrollment._id }),
        ProjectSubmission.find({ enrollmentId: enrollment._id }),
        QuizAttempt.find({ enrollmentId: enrollment._id }),
      ]);

    // Structured tree hierarchy
    const curriculumTree = modules.map((mod) => {
      const modLessons = lessons.filter((l) => l.moduleId?.toString() === mod._id.toString());
      const modAssignments = assignments.filter((a) => a.moduleId?.toString() === mod._id.toString());
      const modQuizzes = quizzes.filter((q) => q.moduleId?.toString() === mod._id.toString());

      return {
        ...mod.toObject(),
        lessons: modLessons,
        assignments: modAssignments,
        quizzes: modQuizzes,
      };
    });

    return NextResponse.json({
      success: true,
      enrollment,
      curriculum: curriculumTree,
      allLessons: lessons,
      projects,
      progress: progress || {
        completedLessons: [],
        submittedAssignments: [],
        approvedAssignments: [],
        completedProjects: [],
        passedQuizzes: [],
        progressPercent: 0,
      },
      assignmentSubmissions,
      projectSubmissions,
      quizAttempts,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
