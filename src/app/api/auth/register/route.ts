import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { StudentProfile } from '@/models/StudentProfile';
import { hashPassword } from '@/lib/auth';
import { signToken } from '@/lib/jwt';
import { RegisterSchema } from '@/validators/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RegisterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, phone, password } = parsed.data;

    await connectToDatabase();

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json(
        { success: false, message: 'An account with this email address already exists. Please log in.' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email: normalizedEmail,
      phone: phone || '',
      password: hashedPassword,
      role: 'student',
      status: 'active',
      emailVerified: true, // simplified onboarding
    });

    // Create associated student profile
    await StudentProfile.create({
      user: newUser._id,
      collegeName: '',
      course: 'B.Tech',
      branch: 'CSE',
      currentYear: '3rd Year',
    });

    const token = signToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Account created successfully!',
      user: {
        userId: newUser._id.toString(),
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set('techviora_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
