import React from 'react';
import { notFound } from 'next/navigation';
import { connectToDatabase } from '@/lib/db';
import { Program } from '@/models/Program';
import { ProgramPlan } from '@/models/ProgramPlan';
import { Module } from '@/models/Module';
import { Lesson } from '@/models/Lesson';
import { Assignment } from '@/models/Assignment';
import { Project } from '@/models/Project';
import { Quiz } from '@/models/Quiz';
import { Review } from '@/models/Review';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProgramDetailsClient } from '@/components/internships/ProgramDetailsClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectToDatabase();
  const program = await Program.findOne({ slug, status: 'published' });

  if (!program) {
    return {
      title: 'Internship Program Not Found | TechViora',
    };
  }

  return {
    title: `${program.title} Internship for Engineering Students | TechViora`,
    description: program.shortDescription,
    keywords: [
      program.title,
      `${program.title} Internship`,
      ...program.technologies,
      'Engineering Internship 2026',
      'Verified Certificate',
    ],
    openGraph: {
      title: `${program.title} - TechViora Internship`,
      description: program.shortDescription,
    },
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectToDatabase();

  const program = await Program.findOne({ slug, status: 'published' }).lean();
  if (!program) {
    notFound();
  }

  const [plans, modules, lessons, assignments, projects, quizzes, reviews] = await Promise.all([
    ProgramPlan.find({ isActive: true }).sort({ sortOrder: 1 }).lean(),
    Module.find({ programId: (program as any)._id, isPublished: true }).sort({ order: 1 }).lean(),
    Lesson.find({ programId: (program as any)._id, isPublished: true }).sort({ order: 1 }).lean(),
    Assignment.find({ programId: (program as any)._id, isPublished: true }).sort({ order: 1 }).lean(),
    Project.find({ programId: (program as any)._id, isPublished: true }).sort({ order: 1 }).lean(),
    Quiz.find({ programId: (program as any)._id, isPublished: true }).sort({ order: 1 }).lean(),
    Review.find({ program: (program as any)._id, status: 'approved' }).sort({ createdAt: -1 }).lean(),
  ]);

  // Construct structured modules
  const structuredModules = modules.map((mod: any) => {
    const modLessons = lessons.filter((l: any) => l.moduleId?.toString() === mod._id.toString());
    const modAssignments = assignments.filter((a: any) => a.moduleId?.toString() === mod._id.toString());
    const modQuizzes = quizzes.filter((q: any) => q.moduleId?.toString() === mod._id.toString());

    return {
      ...mod,
      lessons: modLessons,
      assignments: modAssignments,
      quizzes: modQuizzes,
    };
  });

  const serializedProgram = JSON.parse(JSON.stringify(program));
  const serializedPlans = JSON.parse(JSON.stringify(plans));
  const serializedCurriculum = JSON.parse(JSON.stringify(structuredModules));
  const serializedProjects = JSON.parse(JSON.stringify(projects));
  const serializedReviews = JSON.parse(JSON.stringify(reviews));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <ProgramDetailsClient
          program={serializedProgram}
          plans={serializedPlans}
          curriculum={serializedCurriculum}
          projects={serializedProjects}
          reviews={serializedReviews}
        />
      </main>
      <Footer />
    </div>
  );
}
