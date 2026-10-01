import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { Settings } from '@/models/Settings';
import { logAdminAction } from '@/lib/audit';

export async function GET() {
  try {
    await connectToDatabase();
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    const body = await req.json();

    await connectToDatabase();

    let settings = await Settings.findOne();
    if (settings) {
      Object.assign(settings, body);
      await settings.save();
    } else {
      settings = await Settings.create(body);
    }

    await logAdminAction({
      adminId: admin.userId,
      adminEmail: admin.email,
      action: 'UPDATE_SETTINGS',
      entity: 'Settings',
      details: body,
    });

    return NextResponse.json({ success: true, message: 'Settings saved successfully', settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
