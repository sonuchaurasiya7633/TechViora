import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { SupportTicket } from '@/models/SupportTicket';
import { generateTicketId } from '@/lib/utils';

export async function GET() {
  try {
    const session = await requireAuth();
    await connectToDatabase();

    const tickets = await SupportTicket.find({ student: session.userId }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, tickets });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    const { subject, message, category, priority } = await req.json();

    if (!subject || !message) {
      return NextResponse.json({ success: false, message: 'Subject and message are required' }, { status: 400 });
    }

    await connectToDatabase();

    const ticketId = generateTicketId();

    const ticket = await SupportTicket.create({
      ticketId,
      student: session.userId,
      studentName: session.name,
      studentEmail: session.email,
      subject,
      message,
      category: category || 'general',
      priority: priority || 'medium',
      status: 'open',
      responses: [
        {
          senderRole: session.role,
          senderName: session.name,
          senderId: session.userId,
          message,
          createdAt: new Date(),
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: 'Support ticket created successfully. Our team will review it shortly.',
      ticket,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
