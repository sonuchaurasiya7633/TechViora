import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ContactMessage } from '@/models/ContactMessage';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: 'All required fields must be filled' }, { status: 400 });
    }

    await connectToDatabase();

    const contactMsg = await ContactMessage.create({
      name,
      email,
      phone: phone || '',
      subject,
      message,
      status: 'new',
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out! Our academic support team will respond within 24 hours.',
      id: contactMsg._id,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
