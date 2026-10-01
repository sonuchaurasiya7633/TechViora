import React from 'react';
import { connectToDatabase } from '@/lib/db';
import { Program } from '@/models/Program';
import { ProgramPlan } from '@/models/ProgramPlan';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { InternshipsExplorer } from '@/components/internships/InternshipsExplorer';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Explore 40+ Engineering Internship Programs | TechViora',
  description: 'Explore practical internship programs in Web Development, MERN, Python, Java, Data Science, AI, Cloud, Mobile, and Core CS with verified certifications.',
};

export default async function InternshipsPage() {
  await connectToDatabase();

  const [programs, plans] = await Promise.all([
    Program.find({ status: 'published' }).sort({ order: 1 }).lean(),
    ProgramPlan.find({ isActive: true }).sort({ sortOrder: 1 }).lean(),
  ]);

  const serializedPrograms = JSON.parse(JSON.stringify(programs));
  const serializedPlans = JSON.parse(JSON.stringify(plans));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Explore 40+ Internship Domains
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-3">
              Search by technology, category, or difficulty level. Inspect the complete daily curriculum before enrolling.
            </p>
          </div>

          <InternshipsExplorer initialPrograms={serializedPrograms} plans={serializedPlans} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
