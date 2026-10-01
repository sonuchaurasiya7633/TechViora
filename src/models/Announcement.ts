import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnnouncement extends Document {
  title: string;
  content: string;
  type: 'general' | 'program' | 'batch' | 'student';
  targetProgramId?: mongoose.Types.ObjectId;
  targetStudentId?: mongoose.Types.ObjectId;
  priority: 'low' | 'medium' | 'high';
  isPublished: boolean;
  publishDate: Date;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ['general', 'program', 'batch', 'student'],
      default: 'general',
    },
    targetProgramId: { type: Schema.Types.ObjectId, ref: 'Program' },
    targetStudentId: { type: Schema.Types.ObjectId, ref: 'User' },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    isPublished: { type: Boolean, default: true },
    publishDate: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

export const Announcement: Model<IAnnouncement> =
  mongoose.models.Announcement || mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
