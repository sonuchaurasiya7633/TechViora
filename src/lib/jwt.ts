import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || 'techviora-super-secure-production-jwt-secret-key-2026';

export interface JwtPayload {
  userId: string;
  email: string;
  name: string;
  role: 'student' | 'admin' | 'superadmin';
}

export function signToken(payload: JwtPayload, expiresIn: string | number = '7d'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn as any });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (err) {
    return null;
  }
}
