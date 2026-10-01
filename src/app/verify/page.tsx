'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ShieldCheck, Search, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export default function VerifySearchPage() {
  const router = useRouter();
  const [certId, setCertId] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (certId.trim()) {
      router.push(`/verify/${certId.trim().toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Public Verification Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Verify Internship Certificate
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              Enter the unique Certificate ID printed on the student certificate (or scan the QR code).
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2 uppercase tracking-wider">
                  Certificate ID
                </label>
                <div className="relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. CERT-2026-MERN-001234"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value.toUpperCase())}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 text-base font-mono uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Sample ID format: CERT-YYYY-DOMA-XXXXXX
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Verify Certificate Record
              </button>
            </form>
          </div>

          {/* Verification Guarantee */}
          <div className="mt-8 p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800">Tamper-Proof Digital Verification</div>
            <p>
              Records are cryptographically checked directly against our live database. Only certificates that have undergone all module evaluations, passing assignments, and approved capstones will validate successfully.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
