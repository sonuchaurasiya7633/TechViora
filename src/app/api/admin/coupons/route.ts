import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { Coupon } from '@/models/Coupon';

export async function GET() {
  try {
    await connectToDatabase();
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, coupons });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();

    await connectToDatabase();

    const coupon = await Coupon.create({
      ...body,
      code: body.code.trim().toUpperCase(),
    });

    return NextResponse.json({ success: true, message: 'Coupon created successfully', coupon });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();
    const { _id, ...updateData } = body;

    await connectToDatabase();

    const coupon = await Coupon.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json({ success: true, message: 'Coupon updated successfully', coupon });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    await connectToDatabase();
    await Coupon.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
