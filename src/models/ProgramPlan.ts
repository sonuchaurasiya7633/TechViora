import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProgramPlan extends Document {
  name: string; // e.g. "1 Month Internship", "45 Days Internship", "3 Months Internship", "6 Months Internship"
  slug: string;
  durationLabel: string; // e.g. "1 Month", "45 Days", "3 Months", "6 Months"
  durationDays: number; // e.g. 30, 45, 90, 180
  originalPrice: number; // e.g. 999
  salePrice: number; // e.g. 299
  discountPercent?: number;
  isPopular: boolean;
  isActive: boolean;
  features: string[];
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProgramPlanSchema = new Schema<IProgramPlan>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    durationLabel: { type: String, required: true },
    durationDays: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    discountPercent: { type: Number, default: 0 },
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    features: [{ type: String }],
    sortOrder: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const ProgramPlan: Model<IProgramPlan> =
  mongoose.models.ProgramPlan || mongoose.model<IProgramPlan>('ProgramPlan', ProgramPlanSchema);
