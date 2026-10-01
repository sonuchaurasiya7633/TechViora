import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITicketResponse {
  senderRole: 'student' | 'admin' | 'superadmin';
  senderName: string;
  senderId?: mongoose.Types.ObjectId;
  message: string;
  createdAt: Date;
}

export interface ISupportTicket extends Document {
  ticketId: string;
  student: mongoose.Types.ObjectId;
  studentName: string;
  studentEmail: string;
  subject: string;
  message: string;
  category: 'enrollment' | 'curriculum' | 'payment' | 'certificate' | 'assignment' | 'general';
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  responses: ITicketResponse[];
  createdAt: Date;
  updatedAt: Date;
}

const SupportTicketSchema = new Schema<ISupportTicket>(
  {
    ticketId: { type: String, required: true, unique: true, index: true },
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    category: {
      type: String,
      enum: ['enrollment', 'curriculum', 'payment', 'certificate', 'assignment', 'general'],
      default: 'general',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'closed'],
      default: 'open',
    },
    responses: [
      {
        senderRole: { type: String, enum: ['student', 'admin', 'superadmin'], required: true },
        senderName: { type: String, required: true },
        senderId: { type: Schema.Types.ObjectId, ref: 'User' },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const SupportTicket: Model<ISupportTicket> =
  mongoose.models.SupportTicket || mongoose.model<ISupportTicket>('SupportTicket', SupportTicketSchema);
