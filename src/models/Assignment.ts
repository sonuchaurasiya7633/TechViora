import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAssignment extends Document {
  programId: mongoose.Types.ObjectId;
  moduleId?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  instructions: string;
  requirements: string[];
  starterCodeUrl?: string;
  downloadFiles?: { title: string; url: string }[];
  maxScore: number;
  passingScore: number;
  dueDateDays: number;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AssignmentSchema = new Schema<IAssignment>(
  {
    programId: { type: Schema.Types.ObjectId, ref: 'Program', required: true, index: true },
    moduleId: { type: Schema.Types.ObjectId, ref: 'Module', index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructions: { type: String, default: '' },
    requirements: [{ type: String }],
    starterCodeUrl: { type: String, default: '' },
    downloadFiles: [
      {
        title: String,
        url: String,
      },
    ],
    maxScore: { type: Number, default: 100 },
    passingScore: { type: Number, default: 60 },
    dueDateDays: { type: Number, default: 7 },
    order: { type: Number, default: 1 },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Assignment: Model<IAssignment> =
  mongoose.models.Assignment || mongoose.model<IAssignment>('Assignment', AssignmentSchema);
