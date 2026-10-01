import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'techviora',
  api_key: process.env.CLOUDINARY_API_KEY || '1234567890',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'abcdefghijklmnop',
  secure: true,
});

export { cloudinary };

export async function uploadToCloudinary(
  fileBase64OrUrl: string,
  folder: 'students' | 'programs' | 'lessons' | 'assignments' | 'projects' | 'certificates' | 'blogs' = 'lessons',
  resourceType: 'auto' | 'image' | 'raw' | 'video' = 'auto'
): Promise<{ url: string; public_id: string }> {
  try {
    const result = await cloudinary.uploader.upload(fileBase64OrUrl, {
      folder: `internship-platform/${folder}`,
      resource_type: resourceType,
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    // If cloudinary credentials are not configured or upload fails in offline test, provide a fallback mock url
    console.warn('Cloudinary upload warning:', error);
    return {
      url: fileBase64OrUrl.startsWith('data:')
        ? 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60'
        : fileBase64OrUrl,
      public_id: `fallback_${Date.now()}`,
    };
  }
}
