import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPayment extends Document {
  orderId: string;
  paymentId: string;
  signature?: string;
  student: mongoose.Types.ObjectId;
  program: mongoose.Types.ObjectId;
  plan: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  gateway: 'razorpay' | 'manual_test';
  status: 'captured' | 'failed' | 'refunded';
  method?: string;
  errorDescription?: string;
  verifiedAt: Date;
  rawResponse?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    orderId: { type: String, required: true, index: true },
    paymentId: { type: String, required: true, unique: true, index: true },
    signature: { type: String, default: '' },
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    program: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
    plan: { type: Schema.Types.ObjectId, ref: 'ProgramPlan', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    gateway: {
      type: String,
      enum: ['razorpay', 'manual_test'],
      default: 'razorpay',
    },
    status: {
      type: String,
      enum: ['captured', 'failed', 'refunded'],
      default: 'captured',
    },
    method: { type: String, default: 'card/upi/netbanking' },
    errorDescription: { type: String, default: '' },
    verifiedAt: { type: Date, default: Date.now },
    rawResponse: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
);

export const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);
