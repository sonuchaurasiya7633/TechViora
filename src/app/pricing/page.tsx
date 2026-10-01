import React from 'react';
import { connectToDatabase } from '@/lib/db';
import { ProgramPlan } from '@/models/ProgramPlan';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PricingSection } from '@/components/home/PricingSection';
import { FaqSection } from '@/components/home/FaqSection';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Internship Pricing & Duration Plans | TechViora',
  description: 'Transparent, one-time enrollment fees for 1 Month (₹299), 45 Days (₹399), 3 Months (₹599), and 6 Months (₹999) engineering internship programs.',
};

export default async function PricingPage() {
  await connectToDatabase();
  const plans = await ProgramPlan.find({ isActive: true }).sort({ sortOrder: 1 }).lean();
  const serializedPlans = JSON.parse(JSON.stringify(plans));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <div className="py-12 sm:py-16 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Transparent Pricing For All 40+ Domains
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Choose your learning pace. Every plan includes complete daily modules, mentor reviews, capstone evaluation, and verified certification.
          </p>
        </div>

        <PricingSection plans={serializedPlans} />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
