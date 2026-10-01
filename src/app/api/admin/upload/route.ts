import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    await requireAuth();
    const { file, folder, resourceType } = await req.json();

    if (!file) {
      return NextResponse.json({ success: false, message: 'File base64 string or URL required' }, { status: 400 });
    }

    const uploaded = await uploadToCloudinary(
      file,
      folder || 'lessons',
      resourceType || 'auto'
    );

    return NextResponse.json({
      success: true,
      url: uploaded.url,
      publicId: uploaded.public_id,
    });
  } catch (error: any) {
    console.error('Upload API error:', error);
    return NextResponse.json({ success: false, message: error.message || 'Upload failed' }, { status: 500 });
  }
}
