import React from 'react';
import { connectToDatabase } from '@/lib/db';
import { Review } from '@/models/Review';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StudentReviews } from '@/components/home/StudentReviews';
import { CtaSection } from '@/components/home/CtaSection';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Verified Student Reviews & Feedback | TechViora',
  description: 'Authentic student feedback from engineers and college learners who completed our structured internship programs.',
};

export default async function StudentReviewsPage() {
  await connectToDatabase();
  const reviews = await Review.find({ status: 'approved' }).sort({ createdAt: -1 }).lean();
  const serializedReviews = JSON.parse(JSON.stringify(reviews));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <div className="py-12 sm:py-16 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Verified Student Reviews
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Reviews from verified enrolled students after completing curriculum assignments and capstone project evaluations.
          </p>
        </div>
        <StudentReviews reviews={serializedReviews} />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
