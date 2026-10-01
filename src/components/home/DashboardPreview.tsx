'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PlayCircle,
  CheckCircle2,
  FileCode,
  Award,
  Layers,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Terminal,
  QrCode,
  ExternalLink,
  Cpu,
  UserCheck,
} from 'lucide-react';

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<'PLAYER' | 'CERTIFICATE' | 'MENTOR'>('PLAYER');

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-widest mb-2">
            <Cpu className="w-4 h-4" />
            <span>Interactive Learning Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Designed for Real Hands-On Engineering
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Experience our purpose-built workspace: video lessons with synchronized code repositories, line-by-line mentor evaluations, and tamper-proof verified credentials.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 shadow-inner max-w-full overflow-x-auto gap-1">
            {[
              { id: 'PLAYER', label: '1. Day-by-Day Learning Player', icon: PlayCircle },
              { id: 'CERTIFICATE', label: '2. Verifiable QR Certificate', icon: Award },
              { id: 'MENTOR', label: '3. Mentor Review & Feedback', icon: FileCode },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-glow-brand'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mockup Container */}
        <div className="relative rounded-3xl bg-slate-950 p-4 sm:p-6 shadow-2xl border border-slate-800 max-w-5xl mx-auto overflow-hidden">
          {/* Top Browser Bar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-5 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="ml-3 font-mono text-[11px] text-slate-400 hidden sm:inline">
                https://techviora.com/student/workspace
              </span>
            </div>
            <div className="flex items-center gap-2 text-accent-cyan font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              Production Workspace
            </div>
          </div>

          {/* TAB 1: LEARNING PLAYER */}
          {activeTab === 'PLAYER' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-slate-200 animate-in fade-in duration-300">
              {/* Left Curriculum Sidebar Mock */}
              <div className="lg:col-span-4 bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-bold text-xs text-white">Full Stack Curriculum</span>
                  <span className="px-2 py-0.5 rounded bg-brand-900/60 text-brand-300 text-[11px] font-mono font-bold">
                    80% Complete
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 flex items-center justify-between font-medium">
                    <span className="flex items-center gap-2 truncate">
                      <CheckCircle2 className="w-4 h-4 text-accent-emerald shrink-0" />
                      1. REST APIs & Route Handlers
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">Day 1</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-brand-600 text-white font-bold flex items-center justify-between shadow-glow-brand">
                    <span className="flex items-center gap-2 truncate">
                      <PlayCircle className="w-4 h-4 text-white shrink-0" />
                      2. MongoDB Aggregations & Indexes
                    </span>
                    <span className="text-[10px] bg-brand-800/80 px-1.5 py-0.5 rounded font-mono">Active</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-850 text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-2 truncate">
                      <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                      3. JWT Authentication in Next.js 15
                    </span>
                    <span className="text-[10px] font-mono">Day 3</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-950/40 text-amber-300 border border-amber-800/40 flex items-center justify-between font-medium">
                    <span className="flex items-center gap-2 truncate">
                      <FileCode className="w-4 h-4 text-accent-amber shrink-0" />
                      Assignment: Build Microservice API
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono">100 Pts</span>
                  </div>
                </div>
              </div>

              {/* Center Player Screen */}
              <div className="lg:col-span-8 space-y-3">
                <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950/40 p-6 border border-slate-800 min-h-[240px] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30">
                      Module 3 • Day 2 Video Lecture
                    </span>
                    <span className="text-xs text-slate-400 font-mono">24 mins</span>
                  </div>

                  <div className="text-center my-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center mx-auto shadow-glow-brand hover:scale-110 transition-transform cursor-pointer">
                      <PlayCircle className="w-8 h-8" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white mt-3">
                      Mastering MongoDB Pipeline Aggregations & Query Performance
                    </h4>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
                    <span>Includes Downloadable Starter Repository</span>
                    <span className="text-accent-emerald font-semibold">Mark Complete to Unlock Next</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-900 p-4 border border-slate-800 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800 mb-2">
                    <span className="flex items-center gap-1.5 text-accent-cyan">
                      <Terminal className="w-3.5 h-3.5" /> aggregateOrders.ts
                    </span>
                    <span className="text-[10px] text-slate-500">TypeScript</span>
                  </div>
                  <pre className="text-slate-300 overflow-x-auto text-[11px] leading-relaxed">
{`const totalRevenue = await Order.aggregate([
  { $match: { status: 'completed' } },
  { $group: { _id: '$programId', total: { $sum: '$amount' } } }
]);`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CERTIFICATE PREVIEW */}
          {activeTab === 'CERTIFICATE' && (
            <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 text-slate-200 space-y-6 animate-in fade-in duration-300">
              <div className="border-2 border-brand-500/40 rounded-2xl p-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="font-black text-xl text-white tracking-tight">TechViora Certificate of Completion</h3>
                    <p className="text-xs text-slate-400">Engineering Skill Development & Internship Labs</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                    Verified Credential ✓
                  </div>
                </div>

                <div className="text-center my-6 space-y-2">
                  <div className="text-xs text-brand-400 uppercase tracking-widest font-semibold">Awarded To</div>
                  <div className="text-2xl sm:text-3xl font-black text-white">Aditya Kumar</div>
                  <p className="text-xs text-slate-300 max-w-lg mx-auto">
                    for completing the <strong>3 Months Full-Stack MERN Internship Track</strong> with evaluated assignments and production capstone approval.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs text-slate-400 items-end">
                  <div>
                    <span className="block text-[10px] text-slate-500">Certificate ID</span>
                    <span className="font-mono font-bold text-white">CERT-2026-MERN-001234</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-[10px] text-slate-500">Signatory</span>
                    <span className="font-semibold text-white">Dr. Vivek Sharma</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-emerald-400 text-[11px] block">Public QR Scannable</span>
                    <span className="text-[10px] text-slate-500">Instant Verification</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MENTOR REVIEW */}
          {activeTab === 'MENTOR' && (
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-slate-200 space-y-4 animate-in fade-in duration-300 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-bold text-sm text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-brand-400" />
                  Code Evaluation & Feedback Record
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                  Score: 94 / 100 (Approved)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-1">
                  <span className="text-slate-500 block text-[11px]">Submitted Repository:</span>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="text-brand-400 font-mono hover:underline flex items-center gap-1 truncate">
                    github.com/aditya/mern-ecommerce-api <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-1">
                  <span className="text-slate-500 block text-[11px]">Live Hosted URL:</span>
                  <a href="https://vercel.app" target="_blank" rel="noreferrer" className="text-accent-cyan font-mono hover:underline flex items-center gap-1 truncate">
                    mern-store.vercel.app <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-850 border border-slate-800 space-y-1.5">
                <span className="text-xs font-bold text-white block">Mentor Code Feedback:</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  "Excellent database schema normalization. MongoDB indexes on the product search fields are correctly defined. Clean error handling middleware. Ready for production deployment!"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <Link
            href="/internships"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-glow-brand transition-all"
          >
            <span>Start Learning in Your Domain</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
