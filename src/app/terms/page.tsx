import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Terms & Conditions | TechViora',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-soft space-y-6 text-slate-700 text-sm leading-relaxed">
          <h1 className="text-3xl font-extrabold text-slate-900 pb-4 border-b border-slate-100">
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-400">Last updated: January 2026</p>

          <h2 className="text-lg font-bold text-slate-900 mt-6">1. Academic Program Scope</h2>
          <p>
            TechViora provides structured educational skill-development and engineering internship programs. Enrollment gives students access to curated daily modules, video sessions, assignments, coding projects, and mentor review systems.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-6">2. Certificate Issuance Criteria</h2>
          <p>
            Certificates of Internship are issued solely upon achieving the required passing completion thresholds (minimum overall progress, passing grades on assignments, and approved capstone project). Mere enrollment without active participation does not grant a completion certificate.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-6">3. Academic Integrity & Code of Conduct</h2>
          <p>
            Students must submit their own original work for assignments and capstones. Plagiarism or submission of fraudulent repositories may result in rejection of submissions or suspension of student account access.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-6">4. Intellectual Property</h2>
          <p>
            All course videos, curriculum materials, and proprietary text are the intellectual property of TechViora. Code repositories created independently by students remain their own intellectual property for use in job interviews and portfolios.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
