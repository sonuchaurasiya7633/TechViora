import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { Program } from '@/models/Program';
import { logAdminAction } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    const filter: any = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { technologies: { $regex: search, $options: 'i' } },
      ];
    }

    const programs = await Program.find(filter).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, count: programs.length, programs });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await req.json();

    await connectToDatabase();

    // Generate slug if not provided
    if (!body.slug && body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const program = await Program.create(body);

    await logAdminAction({
      adminId: admin.userId,
      adminEmail: admin.email,
      action: 'CREATE_PROGRAM',
      entity: 'Program',
      entityId: program._id.toString(),
      details: { title: program.title, slug: program.slug },
    });

    return NextResponse.json({ success: true, message: 'Program created successfully', program });
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
      return NextResponse.json({ success: false, message: 'Program ID required' }, { status: 400 });
    }

    await connectToDatabase();

    const program = await Program.findByIdAndUpdate(_id, updateData, { new: true });

    await logAdminAction({
      adminId: admin.userId,
      adminEmail: admin.email,
      action: 'UPDATE_PROGRAM',
      entity: 'Program',
      entityId: _id,
      details: { title: program?.title },
    });

    return NextResponse.json({ success: true, message: 'Program updated successfully', program });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Program ID required' }, { status: 400 });
    }

    await connectToDatabase();

    await Program.findByIdAndDelete(id);

    await logAdminAction({
      adminId: admin.userId,
      adminEmail: admin.email,
      action: 'DELETE_PROGRAM',
      entity: 'Program',
      entityId: id,
    });

    return NextResponse.json({ success: true, message: 'Program deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
