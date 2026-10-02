import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { Payment } from '@/models/Payment';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    const filter: any = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { utrNumber: { $regex: search, $options: 'i' } },
        { paymentId: { $regex: search, $options: 'i' } },
        { orderId: { $regex: search, $options: 'i' } },
        { upiId: { $regex: search, $options: 'i' } },
      ];
    }

    const payments = await Payment.find(filter)
      .populate('student', 'name email phone')
      .populate('program', 'title slug')
      .populate('plan', 'name durationLabel')
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, count: payments.length, payments });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
