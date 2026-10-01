import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { User } from '@/models/User';
import { StudentProfile } from '@/models/StudentProfile';
import { Enrollment } from '@/models/Enrollment';
import { logAdminAction } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    const filter: any = { role: 'student' };
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const students = await User.find(filter).sort({ createdAt: -1 }).select('-password');

    // Attach student profiles and enrollments
    const userIds = students.map((s) => s._id);
    const profiles = await StudentProfile.find({ user: { $in: userIds } });
    const enrollments = await Enrollment.find({ student: { $in: userIds } }).populate('program', 'title slug');

    const combined = students.map((s) => {
      const p = profiles.find((prof) => prof.user.toString() === s._id.toString());
      const enrs = enrollments.filter((e) => e.student.toString() === s._id.toString());
      return {
        ...s.toObject(),
        profile: p || null,
        enrollments: enrs,
      };
    });

    return NextResponse.json({ success: true, count: combined.length, students: combined });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    const { studentId, status } = await req.json();

    if (!studentId || !status) {
      return NextResponse.json({ success: false, message: 'studentId and status are required' }, { status: 400 });
    }

    await connectToDatabase();

    const student = await User.findByIdAndUpdate(studentId, { status }, { new: true }).select('-password');

    await logAdminAction({
      adminId: admin.userId,
      adminEmail: admin.email,
      action: `STUDENT_STATUS_${status.toUpperCase()}`,
      entity: 'User',
      entityId: studentId,
      details: { status },
    });

    return NextResponse.json({ success: true, message: `Student status updated to ${status}`, student });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
