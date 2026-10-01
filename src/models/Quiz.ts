import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index 0-3
  explanation?: string;
  marks: number;
}

export interface IQuiz extends Document {
  programId: mongoose.Types.ObjectId;
  moduleId?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  questions: IQuizQuestion[];
  totalMarks: number;
  passingMarks: number;
  timeLimitMinutes: number;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const QuizSchema = new Schema<IQuiz>(
  {
    programId: { type: Schema.Types.ObjectId, ref: 'Program', required: true, index: true },
    moduleId: { type: Schema.Types.ObjectId, ref: 'Module', index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: Number, required: true },
        explanation: { type: String, default: '' },
        marks: { type: Number, default: 1 },
      },
    ],
    totalMarks: { type: Number, default: 10 },
    passingMarks: { type: Number, default: 6 },
    timeLimitMinutes: { type: Number, default: 15 },
    order: { type: Number, default: 1 },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Quiz: Model<IQuiz> =
  mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);
