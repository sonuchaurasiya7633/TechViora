import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Program } from '@/models/Program';
import { ProgramPlan } from '@/models/ProgramPlan';
import { Module } from '@/models/Module';
import { Lesson } from '@/models/Lesson';
import { Assignment } from '@/models/Assignment';
import { Project } from '@/models/Project';
import { Quiz } from '@/models/Quiz';
import { Review } from '@/models/Review';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectToDatabase();

    const program = await Program.findOne({ slug, status: 'published' });
    if (!program) {
      return NextResponse.json({ success: false, message: 'Program not found' }, { status: 404 });
    }

    const [plans, modules, lessons, assignments, projects, quizzes, reviews] = await Promise.all([
      ProgramPlan.find({ isActive: true }).sort({ sortOrder: 1 }),
      Module.find({ programId: program._id, isPublished: true }).sort({ order: 1 }),
      Lesson.find({ programId: program._id, isPublished: true }).sort({ order: 1 }),
      Assignment.find({ programId: program._id, isPublished: true }).sort({ order: 1 }),
      Project.find({ programId: program._id, isPublished: true }).sort({ order: 1 }),
      Quiz.find({ programId: program._id, isPublished: true }).sort({ order: 1 }),
      Review.find({ program: program._id, status: 'approved' }).sort({ createdAt: -1 }),
    ]);

    // Construct full nested curriculum structure
    const structuredModules = modules.map((mod) => {
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
      program,
      plans,
      curriculum: structuredModules,
      projects,
      reviews,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
