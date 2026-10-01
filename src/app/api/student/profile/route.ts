import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { User } from '@/models/User';
import { StudentProfile } from '@/models/StudentProfile';

export async function GET() {
  try {
    const session = await requireAuth();
    await connectToDatabase();

    const user = await User.findById(session.userId).select('-password');
    const profile = await StudentProfile.findOne({ user: session.userId });

    return NextResponse.json({ success: true, user, profile });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await requireAuth();
    const body = await req.json();
    const { name, phone, avatar, ...profileData } = body;

    await connectToDatabase();

    if (name || phone !== undefined || avatar !== undefined) {
      await User.findByIdAndUpdate(session.userId, {
        ...(name && { name }),
        ...(phone !== undefined && { phone }),
        ...(avatar !== undefined && { avatar }),
      });
    }

    const profile = await StudentProfile.findOneAndUpdate(
      { user: session.userId },
      { ...profileData },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      profile,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
