import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { Enrollment } from '@/models/Enrollment';
import { logAdminAction } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const filter: any = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { enrollmentId: { $regex: search, $options: 'i' } },
        { 'studentDetails.fullName': { $regex: search, $options: 'i' } },
        { 'studentDetails.email': { $regex: search, $options: 'i' } },
      ];
    }

    const enrollments = await Enrollment.find(filter)
      .populate('program', 'title slug category')
      .populate('plan', 'name durationLabel salePrice')
      .populate('student', 'name email avatar')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, count: enrollments.length, enrollments });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    const { enrollmentId, status, progressPercent } = await req.json();

    if (!enrollmentId) {
      return NextResponse.json({ success: false, message: 'Enrollment ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const updateObj: any = {};
    if (status) updateObj.status = status;
    if (progressPercent !== undefined) updateObj.progressPercent = progressPercent;

    const enrollment = await Enrollment.findByIdAndUpdate(enrollmentId, updateObj, { new: true });

    await logAdminAction({
      adminId: admin.userId,
      adminEmail: admin.email,
      action: 'UPDATE_ENROLLMENT',
      entity: 'Enrollment',
      entityId: enrollmentId,
      details: updateObj,
    });

    return NextResponse.json({ success: true, message: 'Enrollment updated successfully', enrollment });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
