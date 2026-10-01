import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  googleId?: string;
  provider?: string;
  role: 'student' | 'admin' | 'superadmin';
  emailVerified: boolean;
  avatar?: string;
  status: 'active' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    password: { type: String },
    googleId: { type: String },
    provider: { type: String, default: 'credentials' },
    role: {
      type: String,
      enum: ['student', 'admin', 'superadmin'],
      default: 'student',
    },
    emailVerified: { type: Boolean, default: false },
    avatar: { type: String, default: '' },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent overwrite on HMR
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
