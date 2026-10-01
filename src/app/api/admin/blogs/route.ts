import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { Blog } from '@/models/Blog';

export async function GET() {
  try {
    await requireAdmin();
    await connectToDatabase();
    const blogs = await Blog.find().sort({ publishedAt: -1 });
    return NextResponse.json({ success: true, blogs });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = await req.json();

    await connectToDatabase();

    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const blog = await Blog.create(body);
    return NextResponse.json({ success: true, message: 'Blog created successfully', blog });
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
    const blog = await Blog.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json({ success: true, message: 'Blog updated successfully', blog });
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
    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
