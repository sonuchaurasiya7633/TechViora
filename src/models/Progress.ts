import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProgress extends Document {
  student: mongoose.Types.ObjectId;
  enrollment: mongoose.Types.ObjectId;
  program: mongoose.Types.ObjectId;
  completedLessons: mongoose.Types.ObjectId[];
  submittedAssignments: mongoose.Types.ObjectId[];
  approvedAssignments: mongoose.Types.ObjectId[];
  completedProjects: mongoose.Types.ObjectId[];
  passedQuizzes: mongoose.Types.ObjectId[];
  progressPercent: number;
  lastAccessedLesson?: mongoose.Types.ObjectId;
  lastAccessedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProgressSchema = new Schema<IProgress>(
  {
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    enrollment: { type: Schema.Types.ObjectId, ref: 'Enrollment', required: true, unique: true, index: true },
    program: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
    completedLessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
    submittedAssignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }],
    approvedAssignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }],
    completedProjects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    passedQuizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    progressPercent: { type: Number, default: 0 },
    lastAccessedLesson: { type: Schema.Types.ObjectId, ref: 'Lesson' },
    lastAccessedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const Progress: Model<IProgress> =
  mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema);
