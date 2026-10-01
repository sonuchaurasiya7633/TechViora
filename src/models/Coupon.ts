import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  expiryDate?: Date;
  usageLimit?: number;
  timesUsed: number;
  applicablePrograms?: mongoose.Types.ObjectId[];
  applicablePlans?: mongoose.Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountType: {
      type: String,
      enum: ['percentage', 'flat'],
      default: 'percentage',
    },
    discountValue: { type: Number, required: true },
    minOrderAmount: { type: Number, default: 0 },
    maxDiscountAmount: { type: Number },
    expiryDate: { type: Date },
    usageLimit: { type: Number, default: 1000 },
    timesUsed: { type: Number, default: 0 },
    applicablePrograms: [{ type: Schema.Types.ObjectId, ref: 'Program' }],
    applicablePlans: [{ type: Schema.Types.ObjectId, ref: 'ProgramPlan' }],
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Coupon: Model<ICoupon> =
  mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);
