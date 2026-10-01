import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { ProgramPlan } from '@/models/ProgramPlan';
import { logAdminAction } from '@/lib/audit';

export async function GET() {
  try {
    await connectToDatabase();
    const plans = await ProgramPlan.find().sort({ sortOrder: 1 });
    return NextResponse.json({ success: true, plans });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await req.json();

    await connectToDatabase();

    const plan = await ProgramPlan.create(body);

    await logAdminAction({
      adminId: admin.userId,
      adminEmail: admin.email,
      action: 'CREATE_PLAN',
      entity: 'ProgramPlan',
      entityId: plan._id.toString(),
      details: { planName: plan.name, salePrice: plan.salePrice },
    });

    return NextResponse.json({ success: true, message: 'Plan created successfully', plan });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await req.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ success: false, message: 'Plan ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const plan = await ProgramPlan.findByIdAndUpdate(_id, updateData, { new: true });

    await logAdminAction({
      adminId: admin.userId,
      adminEmail: admin.email,
      action: 'UPDATE_PLAN',
      entity: 'ProgramPlan',
      entityId: _id,
      details: updateData,
    });

    return NextResponse.json({ success: true, message: 'Plan updated successfully', plan });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
