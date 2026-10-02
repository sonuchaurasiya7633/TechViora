import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEnrollmentStudentDetails {
  fullName: string;
  email: string;
  mobileNumber: string;
  collegeName: string;
  university: string;
  course: string;
  branch: string;
  currentYear: string;
  city: string;
  state: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface IEnrollment extends Document {
  enrollmentId: string; // e.g. INT-2026-MERN-001234
  student: mongoose.Types.ObjectId;
  program: mongoose.Types.ObjectId;
  plan: mongoose.Types.ObjectId;
  planDuration: string; // "1 Month", "45 Days", "3 Months", "6 Months"
  planDurationDays: number;
  studentDetails: IEnrollmentStudentDetails;
  price: number;
  discount: number;
  couponCode?: string;
  finalAmount: number;
  upiId?: string;
  utrNumber?: string;
  paymentTimestamp?: Date;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paymentStatus: 'pending' | 'pending_verification' | 'paid' | 'failed' | 'refunded' | 'rejected';
  startDate: Date;
  endDate: Date;
  progressPercent: number;
  status: 'pending' | 'active' | 'completed' | 'expired' | 'cancelled';
  certificateIssued: boolean;
  certificateId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnrollmentSchema = new Schema<IEnrollment>(
  {
    enrollmentId: { type: String, required: true, unique: true, index: true },
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    program: { type: Schema.Types.ObjectId, ref: 'Program', required: true, index: true },
    plan: { type: Schema.Types.ObjectId, ref: 'ProgramPlan', required: true },
    planDuration: { type: String, required: true },
    planDurationDays: { type: Number, default: 30 },
    studentDetails: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      mobileNumber: { type: String, required: true },
      collegeName: { type: String, required: true },
      university: { type: String, default: '' },
      course: { type: String, default: 'B.Tech' },
      branch: { type: String, default: 'CSE' },
      currentYear: { type: String, default: '3rd Year' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      linkedinUrl: { type: String, default: '' },
      githubUrl: { type: String, default: '' },
    },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    couponCode: { type: String, default: '' },
    finalAmount: { type: Number, required: true },
    upiId: { type: String, default: 'sonu-6074@ptyes' },
    utrNumber: { type: String, default: '' },
    paymentTimestamp: { type: Date, default: Date.now },
    razorpayOrderId: { type: String, default: '' },
    razorpayPaymentId: { type: String, default: '' },
    paymentStatus: {
      type: String,
      enum: ['pending', 'pending_verification', 'paid', 'failed', 'refunded', 'rejected'],
      default: 'pending',
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    progressPercent: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'active', 'completed', 'expired', 'cancelled'],
      default: 'pending',
    },
    certificateIssued: { type: Boolean, default: false },
    certificateId: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export const Enrollment: Model<IEnrollment> =
  mongoose.models.Enrollment || mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
