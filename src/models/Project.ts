import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  programId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  requirements: string[];
  features: string[];
  technologies: string[];
  deadlineDays: number;
  maxMarks: number;
  passingMarks: number;
  isCapstone: boolean;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    programId: { type: Schema.Types.ObjectId, ref: 'Program', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    features: [{ type: String }],
    technologies: [{ type: String }],
    deadlineDays: { type: Number, default: 30 },
    maxMarks: { type: Number, default: 100 },
    passingMarks: { type: Number, default: 60 },
    isCapstone: { type: Boolean, default: false },
    order: { type: Number, default: 1 },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
