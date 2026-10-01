import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IModule extends Document {
  programId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  order: number;
  estimatedHours: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ModuleSchema = new Schema<IModule>(
  {
    programId: { type: Schema.Types.ObjectId, ref: 'Program', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    order: { type: Number, default: 1 },
    estimatedHours: { type: Number, default: 5 },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Module: Model<IModule> =
  mongoose.models.Module || mongoose.model<IModule>('Module', ModuleSchema);
