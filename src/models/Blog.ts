import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  thumbnail: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  readTimeMinutes: number;
  viewsCount: number;
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    thumbnail: { type: String, default: '' },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, default: 'Career & Tech' },
    tags: [{ type: String }],
    author: {
      name: { type: String, default: 'TechViora Editorial' },
      avatar: { type: String, default: '' },
      role: { type: String, default: 'Tech Lead' },
    },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
    readTimeMinutes: { type: Number, default: 5 },
    viewsCount: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
