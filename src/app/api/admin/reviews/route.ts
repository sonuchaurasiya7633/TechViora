import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { Review } from '@/models/Review';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const filter: any = {};
    if (status) filter.status = status;

    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, reviews });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await requireAdmin();
    const { reviewId, status, featured } = await req.json();

    if (!reviewId) {
      return NextResponse.json({ success: false, message: 'reviewId is required' }, { status: 400 });
    }

    await connectToDatabase();

    const updateData: any = {};
    if (status) updateData.status = status;
    if (featured !== undefined) updateData.featured = featured;

    const review = await Review.findByIdAndUpdate(reviewId, updateData, { new: true });
    return NextResponse.json({ success: true, message: 'Review updated successfully', review });
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
    await Review.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Review deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
