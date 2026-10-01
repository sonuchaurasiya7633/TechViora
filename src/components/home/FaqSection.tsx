'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Who can enroll in TechViora internship programs?',
      a: 'Our programs are designed specifically for engineering, computer science, and technology students (B.Tech, BCA, MCA, B.Sc CS/IT, Diploma, and recent graduates) as well as self-taught programmers seeking structured project experience.',
    },
    {
      q: 'How does certificate verification work?',
      a: 'Every completed student receives an official Certificate of Internship with a unique Certificate ID (e.g., CERT-2026-MERN-000123) and an embedded QR code. Anyone (employers, university evaluators) can scan the QR code or visit /verify to confirm authenticity against our tamper-proof records.',
    },
    {
      q: 'Are the internship fees a one-time payment or recurring?',
      a: 'All plans (1 Month for ₹299, 45 Days for ₹399, 3 Months for ₹599, 6 Months for ₹999) are strictly one-time registration fees. There are zero hidden costs, renewals, or recurring subscriptions.',
    },
    {
      q: 'How are assignments and capstone projects evaluated?',
      a: 'Students submit their GitHub repository links and live hosted URLs directly on their student dashboard. Our mentor and admin team reviews your code, checks modularity and test cases, provides constructive line-by-line feedback, and assigns a passing score.',
    },
    {
      q: 'Can I complete this internship while attending college lectures and exams?',
      a: 'Yes, absolutely. The curriculum is delivered in flexible daily modules with unlocked lessons and self-paced assignment submissions so you can comfortably manage your semester schedule.',
    },
    {
      q: 'What is your refund and support policy?',
      a: 'We provide dedicated student ticket support and email assistance at support@techviora.com. Please review our transparent Refund Policy page for complete terms.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
            Clear Answers
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mt-3 max-w-xl mx-auto">
            Everything you need to know about our engineering internship curriculum, evaluation, and certification.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'border-blue-500/50 bg-slate-900/90 shadow-glow'
                    : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-white hover:text-blue-400 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-blue-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
