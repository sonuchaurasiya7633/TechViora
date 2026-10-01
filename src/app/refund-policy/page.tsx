import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Refund Policy | TechViora',
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-soft space-y-6 text-slate-700 text-sm leading-relaxed">
          <h1 className="text-3xl font-extrabold text-slate-900 pb-4 border-b border-slate-100">
            Refund & Cancellation Policy
          </h1>
          <p className="text-xs text-slate-400">Last updated: January 2026</p>

          <h2 className="text-lg font-bold text-slate-900 mt-6">1. Transparent Registration Fees</h2>
          <p>
            TechViora offers low-cost, one-time enrollment plans starting at ₹299. Upon enrollment, immediate server compute, LMS access, learning materials, and mentor grading slots are reserved.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-6">2. Duplicate or Erroneous Transactions</h2>
          <p>
            If you were charged twice due to a network or payment gateway glitch, please notify support@techviora.com with your transaction receipt IDs. Duplicate charges will be refunded 100% within 5-7 working days.
          </p>

          <h2 className="text-lg font-bold text-slate-900 mt-6">3. Domain Transfer Requests</h2>
          <p>
            If you accidentally enrolled in the wrong domain (e.g. Frontend instead of MERN), you can request a free domain transfer within 48 hours of enrollment by contacting our academic support desk.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
