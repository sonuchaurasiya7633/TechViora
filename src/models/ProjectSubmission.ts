import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProjectSubmission extends Document {
  projectId: mongoose.Types.ObjectId;
  enrollmentId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  programId: mongoose.Types.ObjectId;
  githubUrl: string;
  liveUrl?: string;
  videoDemoUrl?: string;
  description: string;
  screenshotUrls?: string[];
  fileUrls?: string[];
  score?: number;
  feedback?: string;
  status: 'submitted' | 'under_review' | 'approved' | 'needs_revision' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSubmissionSchema = new Schema<IProjectSubmission>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    enrollmentId: { type: Schema.Types.ObjectId, ref: 'Enrollment', required: true, index: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    programId: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
    githubUrl: { type: String, required: true },
    liveUrl: { type: String, default: '' },
    videoDemoUrl: { type: String, default: '' },
    description: { type: String, required: true },
    screenshotUrls: [{ type: String }],
    fileUrls: [{ type: String }],
    score: { type: Number },
    feedback: { type: String, default: '' },
    status: {
      type: String,
      enum: ['submitted', 'under_review', 'approved', 'needs_revision', 'rejected'],
      default: 'submitted',
    },
    submittedAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date },
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

export const ProjectSubmission: Model<IProjectSubmission> =
  mongoose.models.ProjectSubmission ||
  mongoose.model<IProjectSubmission>('ProjectSubmission', ProjectSubmissionSchema);
