'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Code2,
  Award,
  Terminal,
  Sparkles,
  Layers,
  GraduationCap,
  PlayCircle,
  FolderGit2,
  Star,
} from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-14 pb-20 lg:pt-24 lg:pb-32 border-b border-slate-800">
      {/* Dynamic Background Glow Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-brand-600/20 via-accent-cyan/15 to-accent-violet/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto space-y-7">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-brand-500/30 text-brand-300 text-xs sm:text-sm font-semibold shadow-glow-brand backdrop-blur-md animate-float">
            <span className="flex h-2 w-2 rounded-full bg-accent-cyan animate-ping" />
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            <span>Admissions Open for 2026 Batch • 40+ Engineering Tracks</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12]">
            Build Real Skills.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-accent-cyan to-brand-300">
              Ship Real Projects.
            </span>{' '}
            Launch Your Tech Career.
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Practical, curriculum-driven internship programs for B.Tech, BCA, MCA, and CS freshers.
            Learn through daily guided modules, evaluated GitHub assignments, and production capstone deployments.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/internships"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-accent-cyan text-white font-bold text-base shadow-glow-brand hover:brightness-110 transition-all hover:scale-102"
            >
              <span>Explore 40+ Internships</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-800/90 text-white font-bold text-base border border-slate-700 hover:bg-slate-700/80 hover:border-slate-600 transition-all shadow-md backdrop-blur-sm"
            >
              <Layers className="w-5 h-5 text-accent-cyan" />
              <span>Duration Plans & Pricing (From ₹299)</span>
            </Link>
          </div>

          {/* Trust Value Badges */}
          <div className="pt-10 sm:pt-14 border-t border-slate-800/80">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              What sets TechViora apart
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold backdrop-blur-sm shadow-sm">
                <BookOpen className="w-4 h-4 text-accent-cyan" />
                <span>Structured Day-by-Day Modules</span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold backdrop-blur-sm shadow-sm">
                <FolderGit2 className="w-4 h-4 text-brand-400" />
                <span>Evaluated GitHub Repositories</span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold backdrop-blur-sm shadow-sm">
                <Code2 className="w-4 h-4 text-accent-emerald" />
                <span>Live Capstone Deployments</span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold backdrop-blur-sm shadow-sm">
                <ShieldCheck className="w-4 h-4 text-accent-amber" />
                <span>Tamper-Proof QR Verified Certificates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
