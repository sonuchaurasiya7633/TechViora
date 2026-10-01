import { connectToDatabase } from './db';
import { AuditLog } from '@/models/AuditLog';

export async function logAdminAction({
  adminId,
  adminEmail,
  action,
  entity,
  entityId,
  details = {},
  ipAddress = '',
}: {
  adminId?: string;
  adminEmail: string;
  action: string;
  entity: string;
  entityId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
}) {
  try {
    await connectToDatabase();
    await AuditLog.create({
      adminId,
      adminEmail,
      action,
      entity,
      entityId,
      details,
      ipAddress,
    });
  } catch (error) {
    console.error('Audit log failed:', error);
  }
}
