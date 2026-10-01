import React from 'react';
import { notFound } from 'next/navigation';
import { connectToDatabase } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { Enrollment } from '@/models/Enrollment';
import { LearningPlayerClient } from '@/components/student/LearningPlayerClient';

export const dynamic = 'force-dynamic';

export default async function StudentLearnPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireAuth();
  const { id } = await params;

  await connectToDatabase();

  const enrollment = await Enrollment.findOne({
    _id: id,
    student: session.userId,
  }).populate('program').lean();

  if (!enrollment) {
    notFound();
  }

  return <LearningPlayerClient enrollmentId={id} />;
}
