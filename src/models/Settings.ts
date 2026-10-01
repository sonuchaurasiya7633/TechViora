import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISettings extends Document {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  whatsappNumber: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
  };
  razorpayKeyId?: string;
  razorpayKeySecret?: string;
  cloudinaryCloudName?: string;
  cloudinaryApiKey?: string;
  cloudinaryApiSecret?: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUser?: string;
  smtpPassword?: string;
  emailFrom?: string;
  certificateSignatoryName: string;
  certificateSignatoryTitle: string;
  certificateOrganizationName: string;
  progressRules: {
    lessonsWeightPercent: number;
    assignmentsWeightPercent: number;
    projectsWeightPercent: number;
    quizzesWeightPercent: number;
    minPassingPercentForCertificate: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    siteName: { type: String, default: 'TechViora' },
    tagline: { type: String, default: 'Practical Engineering Internships & Industry Projects' },
    logoUrl: { type: String, default: '' },
    faviconUrl: { type: String, default: '' },
    contactEmail: { type: String, default: 'support@techviora.com' },
    contactPhone: { type: String, default: '+91 9876543210' },
    contactAddress: { type: String, default: 'TechViora Innovation Hub, Cyber City, Bangalore, India' },
    whatsappNumber: { type: String, default: '+91 9876543210' },
    socialLinks: {
      linkedin: { type: String, default: 'https://linkedin.com' },
      github: { type: String, default: 'https://github.com' },
      twitter: { type: String, default: 'https://twitter.com' },
      youtube: { type: String, default: 'https://youtube.com' },
      instagram: { type: String, default: 'https://instagram.com' },
    },
    razorpayKeyId: { type: String, default: '' },
    razorpayKeySecret: { type: String, default: '' },
    cloudinaryCloudName: { type: String, default: '' },
    cloudinaryApiKey: { type: String, default: '' },
    cloudinaryApiSecret: { type: String, default: '' },
    smtpHost: { type: String, default: '' },
    smtpPort: { type: Number, default: 587 },
    smtpUser: { type: String, default: '' },
    smtpPassword: { type: String, default: '' },
    emailFrom: { type: String, default: 'TechViora <noreply@techviora.com>' },
    certificateSignatoryName: { type: String, default: 'Dr. Vivek Sharma' },
    certificateSignatoryTitle: { type: String, default: 'Head of Engineering & Technical Director' },
    certificateOrganizationName: { type: String, default: 'TechViora Engineering Labs' },
    progressRules: {
      lessonsWeightPercent: { type: Number, default: 50 },
      assignmentsWeightPercent: { type: Number, default: 20 },
      projectsWeightPercent: { type: Number, default: 20 },
      quizzesWeightPercent: { type: Number, default: 10 },
      minPassingPercentForCertificate: { type: Number, default: 80 },
    },
  },
  {
    timestamps: true,
  }
);

export const Settings: Model<ISettings> =
  mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
