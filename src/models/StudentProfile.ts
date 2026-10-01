import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStudentProfile extends Document {
  user: mongoose.Types.ObjectId;
  collegeName: string;
  university?: string;
  course: string;
  branch: string;
  currentYear: string;
  city: string;
  state: string;
  linkedinUrl?: string;
  githubUrl?: string;
  bio?: string;
  resumeUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentProfileSchema = new Schema<IStudentProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    collegeName: { type: String, default: '' },
    university: { type: String, default: '' },
    course: { type: String, default: 'B.Tech' },
    branch: { type: String, default: 'Computer Science' },
    currentYear: { type: String, default: '3rd Year' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    bio: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export const StudentProfile: Model<IStudentProfile> =
  mongoose.models.StudentProfile || mongoose.model<IStudentProfile>('StudentProfile', StudentProfileSchema);
