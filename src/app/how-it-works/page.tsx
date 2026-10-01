import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HowItWorks } from '@/components/home/HowItWorks';
import { FaqSection } from '@/components/home/FaqSection';
import { CtaSection } from '@/components/home/CtaSection';

export const metadata = {
  title: 'How It Works | TechViora Internship Workflow',
  description: 'Understand the complete 6-step engineering internship journey at TechViora.',
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <HowItWorks />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
