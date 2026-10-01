import React from 'react';
import Link from 'next/link';
import { Check, Sparkles, ShieldCheck, ArrowRight, Zap, CreditCard, Lock } from 'lucide-react';

interface PlanItem {
  _id: string;
  name: string;
  slug: string;
  durationLabel: string;
  durationDays: number;
  originalPrice: number;
  salePrice: number;
  isPopular: boolean;
  features: string[];
}

interface PricingSectionProps {
  plans: PlanItem[];
}

export function PricingSection({ plans }: PricingSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80 relative" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-widest mb-2">
            <Zap className="w-4 h-4" />
            <span>Transparent Academic Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Flexible Duration Plans For All 40+ Domains
          </h2>
          <p className="text-base text-slate-600 mt-2">
            One-time affordable registration fee. Every plan includes full daily module access, evaluated assignments, capstone grading, and verified credentials.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan._id || plan.slug}
              className={`rounded-3xl p-7 transition-all relative flex flex-col justify-between ${
                plan.isPopular
                  ? 'bg-slate-900 text-white border-2 border-brand-500 shadow-2xl ring-4 ring-brand-500/20 card-glow-hover'
                  : 'bg-white text-slate-900 border border-slate-200/90 shadow-soft hover:shadow-soft-lg card-glow-hover'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-600 to-accent-cyan text-white text-[11px] font-extrabold uppercase tracking-wider shadow-glow-brand flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5" /> Most Popular Track
                </div>
              )}

              <div>
                <div className={`text-xs font-bold uppercase tracking-wider ${plan.isPopular ? 'text-brand-300' : 'text-brand-600'}`}>
                  {plan.durationLabel}
                </div>
                <h3 className="text-xl font-extrabold mt-1">
                  {plan.name}
                </h3>

                <div className={`mt-5 pb-5 border-b flex items-baseline gap-2.5 ${plan.isPopular ? 'border-slate-800' : 'border-slate-100'}`}>
                  <span className="text-3xl sm:text-4xl font-black tracking-tight">
                    ₹{plan.salePrice}
                  </span>
                  {plan.originalPrice > plan.salePrice && (
                    <span className={`text-sm line-through font-medium ${plan.isPopular ? 'text-slate-500' : 'text-slate-400'}`}>
                      ₹{plan.originalPrice}
                    </span>
                  )}
                  <span className={`text-xs font-semibold ${plan.isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                    / one-time
                  </span>
                </div>

                {/* Features list */}
                <ul className="mt-6 space-y-3">
                  {plan.features?.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.isPopular ? 'bg-brand-500/20 text-accent-cyan' : 'bg-emerald-100 text-emerald-600'
                      }`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className={plan.isPopular ? 'text-slate-300' : 'text-slate-600'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-transparent">
                <Link
                  href={`/internships?plan=${plan.slug}`}
                  className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-brand-600 to-accent-cyan text-white shadow-glow-brand hover:brightness-110'
                      : 'bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white'
                  }`}
                >
                  <span>Select {plan.durationLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Refund Guarantee Bar */}
        <div className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 max-w-4xl mx-auto shadow-soft flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
            <Lock className="w-7 h-7" />
          </div>
          <div className="text-xs sm:text-sm text-slate-600 space-y-1">
            <div className="font-bold text-slate-900 text-base">
              Secure Checkout • Instant LMS Activation
            </div>
            <p>
              Pay securely via UPI (Google Pay, PhonePe, Paytm), Net Banking, or Cards. Your enrollment ID and daily curriculum access are unlocked immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
