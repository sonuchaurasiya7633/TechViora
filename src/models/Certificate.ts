import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICertificateAudit {
  action: 'issued' | 'revoked' | 'reissued';
  performedBy: mongoose.Types.ObjectId;
  performedByRole: string;
  reason?: string;
  timestamp: Date;
}

export interface ICertificate extends Document {
  certificateId: string; // e.g. CERT-2026-MERN-000123
  student: mongoose.Types.ObjectId;
  studentName: string;
  program: mongoose.Types.ObjectId;
  programTitle: string;
  enrollment: mongoose.Types.ObjectId;
  enrollmentId: string;
  durationLabel: string;
  startDate: Date;
  completionDate: Date;
  issueDate: Date;
  grade?: string;
  scorePercent?: number;
  qrCodeDataUrl: string;
  verificationUrl: string;
  status: 'issued' | 'revoked';
  auditHistory: ICertificateAudit[];
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    certificateId: { type: String, required: true, unique: true, index: true },
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    studentName: { type: String, required: true },
    program: { type: Schema.Types.ObjectId, ref: 'Program', required: true, index: true },
    programTitle: { type: String, required: true },
    enrollment: { type: Schema.Types.ObjectId, ref: 'Enrollment', required: true, unique: true },
    enrollmentId: { type: String, required: true },
    durationLabel: { type: String, required: true },
    startDate: { type: Date, required: true },
    completionDate: { type: Date, default: Date.now },
    issueDate: { type: Date, default: Date.now },
    grade: { type: String, default: 'A' },
    scorePercent: { type: Number, default: 95 },
    qrCodeDataUrl: { type: String, default: '' },
    verificationUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ['issued', 'revoked'],
      default: 'issued',
    },
    auditHistory: [
      {
        action: { type: String, enum: ['issued', 'revoked', 'reissued'] },
        performedBy: { type: Schema.Types.ObjectId, ref: 'User' },
        performedByRole: { type: String, default: 'admin' },
        reason: { type: String, default: '' },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Certificate: Model<ICertificate> =
  mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);
