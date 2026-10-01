import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { StudentProfile } from '@/models/StudentProfile';
import { signToken } from '@/lib/jwt';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { credential, email, name, picture, googleId } = await req.json();

    let userEmail = email;
    let userName = name;
    let userAvatar = picture;
    let userGoogleId = googleId;

    // If Google JWT Credential was supplied via Google One Tap / Button, decode it
    if (credential) {
      try {
        const parts = credential.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
          userEmail = payload.email || userEmail;
          userName = payload.name || userName;
          userAvatar = payload.picture || userAvatar;
          userGoogleId = payload.sub || userGoogleId;
        }
      } catch (e) {
        console.warn('Could not decode Google token payload, using direct body fields:', e);
      }
    }

    if (!userEmail) {
      return NextResponse.json(
        { success: false, message: 'Invalid Google account data received.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if user already exists
    let user = await User.findOne({ email: userEmail.toLowerCase().trim() });

    if (user) {
      // Check status
      if (user.status === 'blocked') {
        return NextResponse.json(
          { success: false, message: 'Your account has been suspended. Please contact support.' },
          { status: 403 }
        );
      }

      // Link googleId and avatar if not present
      let needsSave = false;
      if (!user.googleId && userGoogleId) {
        user.googleId = userGoogleId;
        needsSave = true;
      }
      if (!user.avatar && userAvatar) {
        user.avatar = userAvatar;
        needsSave = true;
      }
      if (!user.emailVerified) {
        user.emailVerified = true;
        needsSave = true;
      }
      if (needsSave) {
        await user.save();
      }
    } else {
      // Create new student user
      user = await User.create({
        name: userName || 'TechViora Student',
        email: userEmail.toLowerCase().trim(),
        googleId: userGoogleId,
        provider: 'google',
        role: 'student',
        emailVerified: true,
        avatar: userAvatar || '',
        status: 'active',
      });

      // Create default student profile
      await StudentProfile.create({
        user: user._id,
      });
    }

    // Generate session JWT
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Set HTTP-only Cookie
    const cookieStore = await cookies();
    cookieStore.set('techviora_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({
      success: true,
      message: 'Logged in successfully with Google',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error: any) {
    console.error('Google Auth API Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Google Authentication failed.' },
      { status: 500 }
    );
  }
}
