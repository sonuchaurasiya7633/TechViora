import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Certificate } from '@/models/Certificate';
import { Settings } from '@/models/Settings';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ certificateId: string }> }
) {
  try {
    const { certificateId } = await params;
    if (!certificateId) {
      return NextResponse.json({ success: false, message: 'Certificate ID is required' }, { status: 400 });
    }

    await connectToDatabase();

    const certificate = await Certificate.findOne({
      certificateId: certificateId.trim().toUpperCase(),
    }).populate('program', 'title slug category technologies');

    if (!certificate) {
      return NextResponse.json({ success: false, message: 'No certificate found with this Certificate ID.' }, { status: 404 });
    }

    const settings = await Settings.findOne();

    return NextResponse.json({
      success: true,
      certificate,
      signatory: {
        name: settings?.certificateSignatoryName || 'Dr. Vivek Sharma',
        title: settings?.certificateSignatoryTitle || 'Head of Engineering & Technical Director',
        organization: settings?.certificateOrganizationName || 'TechViora Engineering Labs',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
