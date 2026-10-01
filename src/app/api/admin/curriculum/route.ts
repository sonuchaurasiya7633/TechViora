import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { Module } from '@/models/Module';
import { Lesson } from '@/models/Lesson';
import { Assignment } from '@/models/Assignment';
import { Project } from '@/models/Project';
import { Quiz } from '@/models/Quiz';
import { Program } from '@/models/Program';
import { Notification } from '@/models/Notification';
import { Enrollment } from '@/models/Enrollment';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const programId = searchParams.get('programId');

    if (!programId) {
      return NextResponse.json({ success: false, message: 'programId is required' }, { status: 400 });
    }

    const modules = await Module.find({ programId }).sort({ order: 1 });
    const lessons = await Lesson.find({ programId }).sort({ order: 1 });
    const assignments = await Assignment.find({ programId }).sort({ order: 1 });
    const projects = await Project.find({ programId }).sort({ order: 1 });
    const quizzes = await Quiz.find({ programId }).sort({ order: 1 });

    return NextResponse.json({
      success: true,
      modules,
      lessons,
      assignments,
      projects,
      quizzes,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { type, ...itemData } = body;

    await connectToDatabase();

    let createdItem;
    if (type === 'module') {
      createdItem = await Module.create(itemData);
      await Program.findByIdAndUpdate(itemData.programId, { $inc: { modulesCount: 1 } });
    } else if (type === 'lesson') {
      createdItem = await Lesson.create(itemData);
      await Program.findByIdAndUpdate(itemData.programId, { $inc: { lessonsCount: 1 } });

      // If scheduled / daily content published, notify enrolled students
      const activeEnrollments = await Enrollment.find({
        program: itemData.programId,
        status: 'active',
      }).select('student');

      for (const enr of activeEnrollments) {
        await Notification.create({
          user: enr.student,
          title: `New Lesson: ${itemData.title}`,
          message: `A new lesson is now available in your curriculum!`,
          link: `/student/internships`,
          type: 'lesson',
        });
      }
    } else if (type === 'assignment') {
      createdItem = await Assignment.create(itemData);
      await Program.findByIdAndUpdate(itemData.programId, { $inc: { assignmentsCount: 1 } });
    } else if (type === 'project') {
      createdItem = await Project.create(itemData);
      await Program.findByIdAndUpdate(itemData.programId, { $inc: { projectsCount: 1 } });
    } else if (type === 'quiz') {
      createdItem = await Quiz.create(itemData);
      await Program.findByIdAndUpdate(itemData.programId, { $inc: { quizzesCount: 1 } });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid curriculum item type' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Item created successfully', item: createdItem });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { type, _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ success: false, message: 'Item ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    let updatedItem;
    if (type === 'module') {
      updatedItem = await Module.findByIdAndUpdate(_id, updateData, { new: true });
    } else if (type === 'lesson') {
      updatedItem = await Lesson.findByIdAndUpdate(_id, updateData, { new: true });
    } else if (type === 'assignment') {
      updatedItem = await Assignment.findByIdAndUpdate(_id, updateData, { new: true });
    } else if (type === 'project') {
      updatedItem = await Project.findByIdAndUpdate(_id, updateData, { new: true });
    } else if (type === 'quiz') {
      updatedItem = await Quiz.findByIdAndUpdate(_id, updateData, { new: true });
    }

    return NextResponse.json({ success: true, message: 'Updated successfully', item: updatedItem });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json({ success: false, message: 'Missing type or id' }, { status: 400 });
    }

    await connectToDatabase();

    if (type === 'module') await Module.findByIdAndDelete(id);
    else if (type === 'lesson') await Lesson.findByIdAndDelete(id);
    else if (type === 'assignment') await Assignment.findByIdAndDelete(id);
    else if (type === 'project') await Project.findByIdAndDelete(id);
    else if (type === 'quiz') await Quiz.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Item deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
