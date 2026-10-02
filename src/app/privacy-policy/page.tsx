import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Privacy Policy | TechViora',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-soft space-y-6 text-slate-700 text-sm leading-relaxed">
          <h1 className="text-3xl font-extrabold text-slate-900 pb-4 border-b border-slate-100">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400">Last updated: January 2026</p>

          <h2 className="text-lg font-bold text-slate-900 mt-6">1. Information We Collect</h2>
          <p>
            We collect student registration details (name, email address, mobile number, college, course, branch, and year of study) solely for providing learning access, issuing verifiable certificates, and processing payments securely.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-6">2. Payment Security</h2>
          <p>
            Payment transactions are processed directly via secure UPI payments (sonu-6074@ptyes) with timestamped transaction verification. TechViora does not store bank credentials on our servers.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-6">3. Public Certificate Verification</h2>
          <p>
            To enable legitimate verification by employers and universities, certificate records containing the student's name, internship domain, duration, issue date, and unique certificate ID are accessible on our public verification portal.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
