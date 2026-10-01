import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { verifyToken, JwtPayload } from './jwt';
import { connectToDatabase } from './db';
import { User, IUser } from '@/models/User';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}

export async function getCurrentUser(): Promise<(JwtPayload & { userDoc?: IUser }) | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('techviora_token')?.value;

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);
    if (!payload) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

export async function requireAuth(): Promise<JwtPayload> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function requireAdmin(): Promise<JwtPayload> {
  const user = await getCurrentUser();
  if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
    throw new Error('Forbidden: Admin access required');
  }
  return user;
}

export async function getUserWithProfile(userId: string) {
  await connectToDatabase();
  const user = await User.findById(userId).select('-password');
  return user;
}
