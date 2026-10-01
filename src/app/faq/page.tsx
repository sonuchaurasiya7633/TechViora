import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FaqSection } from '@/components/home/FaqSection';
import { CtaSection } from '@/components/home/CtaSection';

export const metadata = {
  title: 'Frequently Asked Questions | TechViora',
  description: 'Everything you need to know about engineering internship curriculum, evaluations, and certification.',
};

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
