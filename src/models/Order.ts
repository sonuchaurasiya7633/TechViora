import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrder extends Document {
  orderId: string; // Razorpay order id or internal order id
  student: mongoose.Types.ObjectId;
  program: mongoose.Types.ObjectId;
  plan: mongoose.Types.ObjectId;
  amount: number; // in rupees
  currency: string;
  status: 'created' | 'attempted' | 'paid' | 'failed';
  couponCode?: string;
  discountAmount?: number;
  studentDetails: Record<string, any>;
  receipt: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    program: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
    plan: { type: Schema.Types.ObjectId, ref: 'ProgramPlan', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: {
      type: String,
      enum: ['created', 'attempted', 'paid', 'failed'],
      default: 'created',
    },
    couponCode: { type: String, default: '' },
    discountAmount: { type: Number, default: 0 },
    studentDetails: { type: Schema.Types.Mixed, required: true },
    receipt: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
