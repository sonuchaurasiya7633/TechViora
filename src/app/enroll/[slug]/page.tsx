import React from 'react';
import { notFound } from 'next/navigation';
import { connectToDatabase } from '@/lib/db';
import { Program } from '@/models/Program';
import { ProgramPlan } from '@/models/ProgramPlan';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EnrollmentFlowClient } from '@/components/enrollment/EnrollmentFlowClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Complete Internship Enrollment | TechViora',
  description: 'Complete student details, apply coupons, and secure your internship batch seat.',
};

export default async function EnrollPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ plan?: string }>;
}) {
  const { slug } = await params;
  const { plan: planParam } = await searchParams;

  await connectToDatabase();

  const program = await Program.findOne({ slug, status: 'published' }).lean();
  if (!program) {
    notFound();
  }

  const plans = await ProgramPlan.find({ isActive: true }).sort({ sortOrder: 1 }).lean();

  const serializedProgram = JSON.parse(JSON.stringify(program));
  const serializedPlans = JSON.parse(JSON.stringify(plans));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-10 sm:py-16">
        <EnrollmentFlowClient
          program={serializedProgram}
          plans={serializedPlans}
          initialPlanSlug={planParam || '3-months'}
        />
      </main>
      <Footer />
    </div>
  );
}
