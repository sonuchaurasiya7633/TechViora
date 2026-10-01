import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProgramFAQ {
  question: string;
  answer: string;
}

export interface IProgramMentor {
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  bio?: string;
}

export interface IProgram extends Document {
  title: string;
  slug: string;
  category: string; // "Web Development", "Data Science & AI", "Cloud & DevOps", "Core CS", "Design & Mobile", etc.
  shortDescription: string;
  detailedDescription: string;
  bannerImage: string;
  thumbnail: string;
  iconName?: string;
  technologies: string[];
  skillsCovered: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  prerequisites: string[];
  learningOutcomes: string[];
  whoShouldJoin: string[];
  toolsRequired: string[];
  modulesCount: number;
  lessonsCount: number;
  projectsCount: number;
  assignmentsCount: number;
  quizzesCount: number;
  faqs: IProgramFAQ[];
  mentor?: IProgramMentor;
  certificateInfo: {
    title: string;
    description: string;
    sampleCertificateUrl?: string;
    verificationAvailable: boolean;
  };
  enrollmentCount: number;
  rating: number;
  reviewCount: number;
  status: 'draft' | 'published' | 'archived';
  isFeatured: boolean;
  isPopular: boolean;
  order: number;
  customPricingEnabled?: boolean;
  customPrices?: {
    oneMonth?: number;
    fortyFiveDays?: number;
    threeMonths?: number;
    sixMonths?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProgramSchema = new Schema<IProgram>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true },
    shortDescription: { type: String, required: true },
    detailedDescription: { type: String, required: true },
    bannerImage: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    iconName: { type: String, default: 'Code' },
    technologies: [{ type: String }],
    skillsCovered: [{ type: String }],
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
      default: 'Beginner',
    },
    prerequisites: [{ type: String }],
    learningOutcomes: [{ type: String }],
    whoShouldJoin: [{ type: String }],
    toolsRequired: [{ type: String }],
    modulesCount: { type: Number, default: 0 },
    lessonsCount: { type: Number, default: 0 },
    projectsCount: { type: Number, default: 0 },
    assignmentsCount: { type: Number, default: 0 },
    quizzesCount: { type: Number, default: 0 },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    mentor: {
      name: { type: String, default: 'TechViora Engineering Team' },
      role: { type: String, default: 'Senior Software Engineers & Architects' },
      company: { type: String, default: 'TechViora Labs' },
      avatar: { type: String, default: '' },
      bio: { type: String, default: 'Industry practitioners guiding students through real-world software development workflows.' },
    },
    certificateInfo: {
      title: { type: String, default: 'Verified Certificate of Internship' },
      description: {
        type: String,
        default: 'Receive an ISO-standard verifiable digital certificate featuring unique verification QR code upon completing all modules, assignments, and capstone project.',
      },
      sampleCertificateUrl: { type: String, default: '' },
      verificationAvailable: { type: Boolean, default: true },
    },
    enrollmentCount: { type: Number, default: 0 },
    rating: { type: Number, default: 4.8 },
    reviewCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
    },
    isFeatured: { type: Boolean, default: false },
    isPopular: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    customPricingEnabled: { type: Boolean, default: false },
    customPrices: {
      oneMonth: Number,
      fortyFiveDays: Number,
      threeMonths: Number,
      sixMonths: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const Program: Model<IProgram> =
  mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema);
