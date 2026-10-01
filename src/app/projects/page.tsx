import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RealProjectsSection } from '@/components/home/RealProjectsSection';
import { CtaSection } from '@/components/home/CtaSection';

export const metadata = {
  title: 'Industry Capstone Projects | TechViora',
  description: 'Inspect real-world capstone projects across Web, AI, Data, Mobile, and Cloud engineering domains.',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <RealProjectsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
