import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAssignmentSubmission extends Document {
  assignmentId: mongoose.Types.ObjectId;
  enrollmentId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  programId: mongoose.Types.ObjectId;
  githubUrl?: string;
  liveUrl?: string;
  textAnswer?: string;
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

const AssignmentSubmissionSchema = new Schema<IAssignmentSubmission>(
  {
    assignmentId: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true, index: true },
    enrollmentId: { type: Schema.Types.ObjectId, ref: 'Enrollment', required: true, index: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    programId: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    textAnswer: { type: String, default: '' },
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

export const AssignmentSubmission: Model<IAssignmentSubmission> =
  mongoose.models.AssignmentSubmission ||
  mongoose.model<IAssignmentSubmission>('AssignmentSubmission', AssignmentSubmissionSchema);
