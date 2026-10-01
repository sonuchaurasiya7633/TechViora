import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { Certificate } from '@/models/Certificate';
import { Enrollment } from '@/models/Enrollment';
import { Program } from '@/models/Program';
import { generateCertificateId } from '@/lib/utils';
import QRCode from 'qrcode';
import { logAdminAction } from '@/lib/audit';

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    const filter: any = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { certificateId: { $regex: search, $options: 'i' } },
        { studentName: { $regex: search, $options: 'i' } },
        { programTitle: { $regex: search, $options: 'i' } },
      ];
    }

    const certificates = await Certificate.find(filter)
      .populate('student', 'name email avatar')
      .populate('program', 'title slug')
      .sort({ issueDate: -1 });

    return NextResponse.json({ success: true, count: certificates.length, certificates });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    const { enrollmentId, reason } = await req.json();

    if (!enrollmentId) {
      return NextResponse.json({ success: false, message: 'Enrollment ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const enrollment = await Enrollment.findById(enrollmentId).populate('program');
    if (!enrollment) {
      return NextResponse.json({ success: false, message: 'Enrollment not found' }, { status: 404 });
    }

    const program = enrollment.program as any;
    const certificateId = generateCertificateId(program.slug || 'TECH');
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const verificationUrl = `${appUrl}/verify/${certificateId}`;

    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
      width: 250,
      margin: 1,
      color: { dark: '#0f172a', light: '#ffffff' },
    });

    const certificate = await Certificate.create({
      certificateId,
      student: enrollment.student,
      studentName: enrollment.studentDetails?.fullName,
      program: program._id,
      programTitle: program.title,
      enrollment: enrollment._id,
      enrollmentId: enrollment.enrollmentId,
      durationLabel: enrollment.planDuration,
      startDate: enrollment.startDate,
      completionDate: new Date(),
      issueDate: new Date(),
      grade: 'A+',
      scorePercent: enrollment.progressPercent || 95,
      qrCodeDataUrl,
      verificationUrl,
      status: 'issued',
      auditHistory: [
        {
          action: 'issued',
          performedBy: admin.userId,
          performedByRole: 'admin',
          reason: reason || 'Admin manual approval and issuance',
          timestamp: new Date(),
        },
      ],
    });

    enrollment.certificateIssued = true;
    enrollment.certificateId = certificateId;
    enrollment.status = 'completed';
    await enrollment.save();

    await logAdminAction({
      adminId: admin.userId,
      adminEmail: admin.email,
      action: 'ISSUE_CERTIFICATE',
      entity: 'Certificate',
      entityId: certificateId,
      details: { enrollmentId: enrollment._id, studentName: enrollment.studentDetails?.fullName },
    });

    return NextResponse.json({ success: true, message: 'Certificate issued successfully', certificate });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await requireAdmin();
    const { certificateId, action, reason } = await req.json();

    if (!certificateId || !action) {
      return NextResponse.json({ success: false, message: 'certificateId and action are required' }, { status: 400 });
    }

    await connectToDatabase();

    const cert = await Certificate.findOne({ certificateId });
    if (!cert) {
      return NextResponse.json({ success: false, message: 'Certificate not found' }, { status: 404 });
    }

    if (action === 'revoke') {
      cert.status = 'revoked';
    } else if (action === 'reissue') {
      cert.status = 'issued';
    }

    cert.auditHistory.push({
      action: action as any,
      performedBy: admin.userId as any,
      performedByRole: 'admin',
      reason: reason || `Admin manual action: ${action}`,
      timestamp: new Date(),
    });

    await cert.save();

    await logAdminAction({
      adminId: admin.userId,
      adminEmail: admin.email,
      action: `CERTIFICATE_${action.toUpperCase()}`,
      entity: 'Certificate',
      entityId: certificateId,
      details: { reason },
    });

    return NextResponse.json({ success: true, message: `Certificate ${action}d successfully`, certificate: cert });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
