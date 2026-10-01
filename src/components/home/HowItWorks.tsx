import React from 'react';
import {
  Search,
  Calendar,
  CreditCard,
  LayoutDashboard,
  Code2,
  Award,
  ArrowRight,
} from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Choose Internship',
      description: 'Explore 40+ engineering domains, inspect the complete curriculum, technologies, and prerequisite checklist.',
      icon: Search,
      badge: 'Step 1',
      glow: 'from-blue-500/20 to-indigo-500/10',
      iconBg: 'bg-blue-500/10 text-blue-600 border-blue-200/60 dark:bg-blue-500/20 dark:text-blue-400',
    },
    {
      step: '02',
      title: 'Select Duration',
      description: 'Pick the plan that fits your college schedule: 1 Month (₹299), 45 Days (₹399), 3 Months (₹599), or 6 Months (₹999).',
      icon: Calendar,
      badge: 'Step 2',
      glow: 'from-indigo-500/20 to-purple-500/10',
      iconBg: 'bg-indigo-500/10 text-indigo-600 border-indigo-200/60 dark:bg-indigo-500/20 dark:text-indigo-400',
    },
    {
      step: '03',
      title: 'Complete Enrollment',
      description: 'Fill in your college details, complete the secure payment, and receive your unique Enrollment ID immediately.',
      icon: CreditCard,
      badge: 'Step 3',
      glow: 'from-emerald-500/20 to-teal-500/10',
      iconBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-200/60 dark:bg-emerald-500/20 dark:text-emerald-400',
    },
    {
      step: '04',
      title: 'Access Learning Dashboard',
      description: 'Unlock day-by-day video lessons, structured reading notes, source code repositories, and downloadable cheatsheets.',
      icon: LayoutDashboard,
      badge: 'Step 4',
      glow: 'from-amber-500/20 to-orange-500/10',
      iconBg: 'bg-amber-500/10 text-amber-600 border-amber-200/60 dark:bg-amber-500/20 dark:text-amber-400',
    },
    {
      step: '05',
      title: 'Complete Tasks & Projects',
      description: 'Submit GitHub repositories and live deployments for practical assignments and the final industry capstone project.',
      icon: Code2,
      badge: 'Step 5',
      glow: 'from-rose-500/20 to-pink-500/10',
      iconBg: 'bg-rose-500/10 text-rose-600 border-rose-200/60 dark:bg-rose-500/20 dark:text-rose-400',
    },
    {
      step: '06',
      title: 'Earn Verified Certificate',
      description: 'Upon achieving the minimum passing score and project approvals, download your verifiable QR-coded digital certificate.',
      icon: Award,
      badge: 'Step 6',
      glow: 'from-purple-500/20 to-indigo-500/10',
      iconBg: 'bg-purple-500/10 text-purple-600 border-purple-200/60 dark:bg-purple-500/20 dark:text-purple-400',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3 shadow-inner">
            Clear, Step-by-Step Pathway
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How The Internship <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">Works</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mt-4 leading-relaxed">
            From enrollment to final certificate verification, experience a structured, transparent, and industry-standard engineering internship journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-slate-800/60 backdrop-blur-md border border-slate-700/70 hover:border-blue-500/50 rounded-2xl p-7 shadow-soft-lg hover:shadow-glow transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Subtle top corner gradient highlight */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.glow} rounded-tr-2xl rounded-bl-full pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-60`} />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-13 h-13 w-12 h-12 rounded-xl border ${item.iconBg} flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-3xl font-black text-slate-600/60 group-hover:text-blue-400/80 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-slate-700/60 text-slate-300 text-[11px] font-semibold mb-2">
                    {item.badge}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center text-xs text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Structured Milestone</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
