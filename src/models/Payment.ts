import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPayment extends Document {
  orderId: string;
  paymentId: string;
  utrNumber?: string;
  upiId: string;
  student: mongoose.Types.ObjectId;
  program: mongoose.Types.ObjectId;
  plan: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  gateway: 'upi_qr' | 'manual_upi' | 'razorpay' | 'manual_test';
  status: 'captured' | 'pending_verification' | 'failed' | 'refunded' | 'rejected';
  method?: string;
  paymentTimestamp: Date;
  errorDescription?: string;
  verifiedAt?: Date;
  rawResponse?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    orderId: { type: String, required: true, index: true },
    paymentId: { type: String, required: true, unique: true, index: true },
    utrNumber: { type: String, default: '', index: true },
    upiId: { type: String, default: 'sonu-6074@ptyes' },
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    program: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
    plan: { type: Schema.Types.ObjectId, ref: 'ProgramPlan', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    gateway: {
      type: String,
      enum: ['upi_qr', 'manual_upi', 'razorpay', 'manual_test'],
      default: 'upi_qr',
    },
    status: {
      type: String,
      enum: ['captured', 'pending_verification', 'failed', 'refunded', 'rejected'],
      default: 'captured',
    },
    method: { type: String, default: 'UPI / QR Code' },
    paymentTimestamp: { type: Date, default: Date.now },
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
