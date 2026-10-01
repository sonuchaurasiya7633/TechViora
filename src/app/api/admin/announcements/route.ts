import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { Announcement } from '@/models/Announcement';
import { Notification } from '@/models/Notification';
import { User } from '@/models/User';

export async function GET() {
  try {
    await requireAdmin();
    await connectToDatabase();
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, announcements });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await req.json();

    await connectToDatabase();

    const announcement = await Announcement.create({
      ...body,
      createdBy: admin.userId,
    });

    // Also broadcast in-app notification to all students
    const students = await User.find({ role: 'student' }).select('_id');
    const notifications = students.map((s) => ({
      user: s._id,
      title: `Announcement: ${body.title}`,
      message: body.content.substring(0, 120) + '...',
      link: '/student/dashboard',
      type: 'announcement',
    }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }

    return NextResponse.json({ success: true, message: 'Announcement published successfully', announcement });
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
    await Announcement.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Announcement deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
