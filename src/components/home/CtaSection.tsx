import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, ShieldCheck, Sparkles } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white relative overflow-hidden">
      {/* Dynamic background glow rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-12 right-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 text-blue-300 text-xs font-bold mb-8 border border-blue-400/30 shadow-inner">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Enrollment Open for 2026 Batch
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight leading-tight">
          Start Building Your <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
            Engineering Skills Today
          </span>
        </h2>

        <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
          Join ambitious engineering students leveling up with structured daily curriculum, real hands-on projects, and verifiable credentials.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/internships"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base transition-all shadow-glow hover:scale-105 hover:gap-3"
          >
            Explore 40+ Internships
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-semibold text-base transition-all border border-slate-700/80 hover:border-slate-500"
          >
            View Duration Plans
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-slate-400">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Instant Access
          </span>
          <span className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-400" /> Real GitHub Projects
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" /> QR-Verified Certificate
          </span>
        </div>
      </div>
    </section>
  );
}
