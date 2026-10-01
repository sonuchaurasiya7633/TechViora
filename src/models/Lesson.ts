import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IResourceLink {
  title: string;
  url: string;
  type?: 'github' | 'pdf' | 'link' | 'zip';
}

export interface ILesson extends Document {
  moduleId: mongoose.Types.ObjectId;
  programId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  contentType: 'video' | 'article' | 'pdf' | 'code';
  videoUrl?: string;
  videoDurationMinutes?: number;
  articleContent?: string;
  pdfUrl?: string;
  notes?: string;
  githubUrl?: string;
  externalLinks: IResourceLink[];
  sourceCodeSnippet?: {
    language: string;
    code: string;
    filename?: string;
  };
  downloadableResources: IResourceLink[];
  durationMinutes: number;
  order: number;
  unlockDay: number; // For drip/daily unlock scheduling
  publishDate?: Date;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema<ILesson>(
  {
    moduleId: { type: Schema.Types.ObjectId, ref: 'Module', required: true, index: true },
    programId: { type: Schema.Types.ObjectId, ref: 'Program', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    contentType: {
      type: String,
      enum: ['video', 'article', 'pdf', 'code'],
      default: 'video',
    },
    videoUrl: { type: String, default: '' },
    videoDurationMinutes: { type: Number, default: 15 },
    articleContent: { type: String, default: '' },
    pdfUrl: { type: String, default: '' },
    notes: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    externalLinks: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
        type: { type: String, default: 'link' },
      },
    ],
    sourceCodeSnippet: {
      language: { type: String, default: 'javascript' },
      code: { type: String, default: '' },
      filename: { type: String, default: '' },
    },
    downloadableResources: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
        type: { type: String, default: 'pdf' },
      },
    ],
    durationMinutes: { type: Number, default: 20 },
    order: { type: Number, default: 1 },
    unlockDay: { type: Number, default: 1 },
    publishDate: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Lesson: Model<ILesson> =
  mongoose.models.Lesson || mongoose.model<ILesson>('Lesson', LessonSchema);
