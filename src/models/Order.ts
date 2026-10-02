import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrder extends Document {
  orderId: string; // internal order id
  student: mongoose.Types.ObjectId;
  program: mongoose.Types.ObjectId;
  plan: mongoose.Types.ObjectId;
  amount: number; // in rupees
  currency: string;
  upiId?: string;
  utrNumber?: string;
  paymentTimestamp?: Date;
  status: 'created' | 'attempted' | 'submitted' | 'paid' | 'failed';
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
    upiId: { type: String, default: 'sonu-6074@ptyes' },
    utrNumber: { type: String, default: '' },
    paymentTimestamp: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['created', 'attempted', 'submitted', 'paid', 'failed'],
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
