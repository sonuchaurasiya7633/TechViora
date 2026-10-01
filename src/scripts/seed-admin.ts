import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techviora';

async function seedAdmin() {
  const adminName = process.env.ADMIN_NAME || 'TechViora Administrator';
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@techviora.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@TechViora2026';

  console.log(`Connecting to MongoDB at: ${MONGODB_URI}`);
  await mongoose.connect(MONGODB_URI);

  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  const existing = await User.findOne({ email: adminEmail });
  if (existing) {
    existing.name = adminName;
    existing.password = hashedPassword;
    existing.role = 'superadmin';
    existing.status = 'active';
    await existing.save();
    console.log(`Updated existing superadmin account: ${adminEmail}`);
  } else {
    await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'superadmin',
      emailVerified: true,
      status: 'active'
    });
    console.log(`Created new superadmin account: ${adminEmail}`);
  }

  console.log('✅ Admin seed completed successfully.');
  await mongoose.disconnect();
}

seedAdmin().catch((err) => {
  console.error('Admin seed error:', err);
  process.exit(1);
});
