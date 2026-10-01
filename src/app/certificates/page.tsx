import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Award, ShieldCheck, QrCode, CheckCircle2, Search, ArrowRight } from 'lucide-react';
import { CertificateSampleShowcase } from '@/components/certificates/CertificateSampleShowcase';

export const metadata = {
  title: 'Internship Certificate Information & Verification | TechViora',
  description: 'Understand how TechViora issues and cryptographically verifies student internship certificates.',
};

export default function CertificatesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified Credential System
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Verified Digital Internship Certificates
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Every certificate issued by TechViora represents genuine hands-on engineering effort, evaluated assignments, and an approved capstone project.
            </p>
          </div>

          {/* Interactive Sample Certificate Showcase Grid (Exact Match to Screenshot) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Sample Certificate Formats
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Click on any sample to preview the official digital certificate layout issued upon track completion.
                </p>
              </div>
            </div>

            <CertificateSampleShowcase />
          </div>

          {/* Verification CTA Box */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-soft text-center space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              Need to verify a candidate's certificate?
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Employers, recruiters, and colleges can instantly verify credentials by entering the Certificate ID.
            </p>
            <div className="pt-2">
              <Link
                href="/verify"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
              >
                <Search className="w-4 h-4" />
                Go to Verification Search Portal
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
