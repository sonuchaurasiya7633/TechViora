import React from 'react';
import { connectToDatabase } from '@/lib/db';
import { Program } from '@/models/Program';
import { ProgramPlan } from '@/models/ProgramPlan';
import { Review } from '@/models/Review';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { PopularInternships } from '@/components/home/PopularInternships';
import { HowItWorks } from '@/components/home/HowItWorks';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { DashboardPreview } from '@/components/home/DashboardPreview';
import { PricingSection } from '@/components/home/PricingSection';
import { RealProjectsSection } from '@/components/home/RealProjectsSection';
import { StudentReviews } from '@/components/home/StudentReviews';
import { FaqSection } from '@/components/home/FaqSection';
import { CtaSection } from '@/components/home/CtaSection';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  await connectToDatabase();

  const [programs, plans, reviews] = await Promise.all([
    Program.find({ status: 'published' }).sort({ order: 1 }).lean(),
    ProgramPlan.find({ isActive: true }).sort({ sortOrder: 1 }).lean(),
    Review.find({ status: 'approved' }).sort({ rating: -1 }).limit(6).lean(),
  ]);

  const startingPrice = plans.length > 0 ? Math.min(...plans.map((p: any) => p.salePrice)) : 299;

  // Serialize MongoDB ObjectIDs to strings for Next.js Server Components
  const serializedPrograms = JSON.parse(JSON.stringify(programs));
  const serializedPlans = JSON.parse(JSON.stringify(plans));
  const serializedReviews = JSON.parse(JSON.stringify(reviews));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <PopularInternships programs={serializedPrograms} startingPrice={startingPrice} />
        <HowItWorks />
        <WhyChooseUs />
        <DashboardPreview />
        <PricingSection plans={serializedPlans} />
        <RealProjectsSection />
        <StudentReviews reviews={serializedReviews} />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
