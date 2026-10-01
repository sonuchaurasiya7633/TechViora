import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
  student: mongoose.Types.ObjectId;
  studentName: string;
  studentAvatar?: string;
  college?: string;
  course?: string;
  program: mongoose.Types.ObjectId;
  programTitle: string;
  rating: number; // 1 to 5
  reviewText: string;
  projectBuilt?: string;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    studentName: { type: String, required: true },
    studentAvatar: { type: String, default: '' },
    college: { type: String, default: '' },
    course: { type: String, default: '' },
    program: { type: Schema.Types.ObjectId, ref: 'Program', required: true, index: true },
    programTitle: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String, required: true },
    projectBuilt: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
