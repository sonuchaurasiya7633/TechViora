import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuizAttemptAnswer {
  questionIndex: number;
  selectedOption: number;
  isCorrect: boolean;
  marksAwarded: number;
}

export interface IQuizAttempt extends Document {
  quizId: mongoose.Types.ObjectId;
  enrollmentId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  answers: IQuizAttemptAnswer[];
  totalScore: number;
  maxScore: number;
  passed: boolean;
  attemptNumber: number;
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const QuizAttemptSchema = new Schema<IQuizAttempt>(
  {
    quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true, index: true },
    enrollmentId: { type: Schema.Types.ObjectId, ref: 'Enrollment', required: true, index: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    answers: [
      {
        questionIndex: { type: Number, required: true },
        selectedOption: { type: Number, required: true },
        isCorrect: { type: Boolean, required: true },
        marksAwarded: { type: Number, default: 0 },
      },
    ],
    totalScore: { type: Number, required: true },
    maxScore: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    attemptNumber: { type: Number, default: 1 },
    completedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const QuizAttempt: Model<IQuizAttempt> =
  mongoose.models.QuizAttempt || mongoose.model<IQuizAttempt>('QuizAttempt', QuizAttemptSchema);
