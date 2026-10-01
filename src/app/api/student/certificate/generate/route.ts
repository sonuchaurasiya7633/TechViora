import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { Enrollment } from '@/models/Enrollment';
import { Program } from '@/models/Program';
import { Progress } from '@/models/Progress';
import { Certificate } from '@/models/Certificate';
import { Settings } from '@/models/Settings';
import { Notification } from '@/models/Notification';
import { generateCertificateId } from '@/lib/utils';
import QRCode from 'qrcode';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { enrollmentId } = await req.json();
    if (!enrollmentId) {
      return NextResponse.json({ success: false, message: 'Enrollment ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const enrollment = await Enrollment.findOne({
      _id: enrollmentId,
      student: user.userId,
    });

    if (!enrollment) {
      return NextResponse.json({ success: false, message: 'Enrollment not found' }, { status: 404 });
    }

    // Check if certificate already issued
    const existingCert = await Certificate.findOne({ enrollment: enrollment._id });
    if (existingCert) {
      return NextResponse.json({
        success: true,
        message: 'Certificate already issued',
        certificate: existingCert,
      });
    }

    // Check settings for threshold
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }

    const minRequired = settings.progressRules?.minPassingPercentForCertificate || 80;
    const progress = await Progress.findOne({ enrollment: enrollment._id });

    if (!progress || progress.progressPercent < minRequired) {
      return NextResponse.json({
        success: false,
        message: `Your progress is currently ${progress?.progressPercent || 0}%. You need at least ${minRequired}% overall completion to unlock your verified certificate.`,
      }, { status: 400 });
    }

    const program = await Program.findById(enrollment.program);
    if (!program) {
      return NextResponse.json({ success: false, message: 'Program not found' }, { status: 404 });
    }

    const certificateId = generateCertificateId(program.slug);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const verificationUrl = `${appUrl}/verify/${certificateId}`;

    // Generate QR Code
    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
      width: 250,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    });

    const newCertificate = await Certificate.create({
      certificateId,
      student: user.userId,
      studentName: enrollment.studentDetails?.fullName || user.name,
      program: program._id,
      programTitle: program.title,
      enrollment: enrollment._id,
      enrollmentId: enrollment.enrollmentId,
      durationLabel: enrollment.planDuration,
      startDate: enrollment.startDate,
      completionDate: new Date(),
      issueDate: new Date(),
      grade: progress.progressPercent >= 90 ? 'A+' : progress.progressPercent >= 80 ? 'A' : 'B+',
      scorePercent: progress.progressPercent,
      qrCodeDataUrl,
      verificationUrl,
      status: 'issued',
      auditHistory: [
        {
          action: 'issued',
          performedBy: user.userId,
          performedByRole: 'system',
          reason: 'Automated issuance upon criteria completion',
          timestamp: new Date(),
        },
      ],
    });

    // Update Enrollment doc
    enrollment.certificateIssued = true;
    enrollment.certificateId = certificateId;
    enrollment.status = 'completed';
    await enrollment.save();

    // Create In-App Notification
    await Notification.create({
      user: user.userId,
      title: 'Certificate Issued! 🏆',
      message: `Congratulations! Your verified certificate for ${program.title} is now ready for download and public verification.`,
      link: `/student/certificates`,
      type: 'certificate',
    });

    return NextResponse.json({
      success: true,
      message: 'Certificate generated successfully!',
      certificate: newCertificate,
    });
  } catch (error: any) {
    console.error('Certificate generation error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Error generating certificate' }, { status: 500 });
  }
}
