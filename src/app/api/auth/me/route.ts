import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { StudentProfile } from '@/models/StudentProfile';

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return NextResponse.json({ success: false, user: null }, { status: 401 });
    }

    await connectToDatabase();
    const userDoc = await User.findById(session.userId).select('-password');
    if (!userDoc) {
      return NextResponse.json({ success: false, user: null }, { status: 404 });
    }

    const profileDoc = await StudentProfile.findOne({ user: session.userId });

    return NextResponse.json({
      success: true,
      user: {
        userId: userDoc._id.toString(),
        name: userDoc.name,
        email: userDoc.email,
        phone: userDoc.phone,
        role: userDoc.role,
        avatar: userDoc.avatar,
        profile: profileDoc,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Error fetching user' },
      { status: 500 }
    );
  }
}
