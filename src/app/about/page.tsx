import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Code2, Target, Users, ShieldCheck, Award, BookOpenCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About TechViora | Practical Engineering Internships',
  description: 'Learn about TechViora’s mission to provide honest, structured, and project-based software engineering skill development.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest">
              Our Academic Mission
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Bridging University Theory with Industry Engineering
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              We built TechViora to provide engineering students with authentic, structured skill development through hands-on project creation and strict evaluation.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Practical Focus</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Zero fake certificates. Every student writes clean modular code, commits to GitHub, and deploys real cloud applications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Honest & Verifiable</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every certificate contains a unique cryptographic QR code linking directly to our public portal for tamper-proof verification.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <BookOpenCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Accessible to All</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                High-quality software curriculum made affordable (starting from ₹299) for students from tier-1, tier-2, and tier-3 colleges alike.
              </p>
            </div>
          </div>

          {/* Detailed Philosophy */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-soft space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
            <h2 className="text-2xl font-bold text-slate-900">
              Why We Avoid Fake Guarantees
            </h2>
            <p>
              In recent years, the internet has become flooded with spam websites offering instant certificates with "100% Guaranteed Job Placements" after paying thousands of rupees. We fundamentally disagree with that model.
            </p>
            <p>
              Real engineering capability comes from writing code, debugging stack traces, understanding database indexes, resolving merge conflicts, and designing scalable system architectures.
            </p>
            <p>
              At TechViora, your certificate is earned after completing required daily modules, submitting assignments that get reviewed by mentors, and successfully deploying your capstone application.
            </p>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/internships"
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
              >
                Explore 40+ Internship Domains →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
