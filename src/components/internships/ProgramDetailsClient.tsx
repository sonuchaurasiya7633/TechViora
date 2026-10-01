'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Layers,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  ChevronDown,
  PlayCircle,
  FileCode,
  ShieldCheck,
  Check,
  ArrowRight,
  UserCheck,
  Cpu,
  Target,
  FileCheck,
  HelpCircle,
} from 'lucide-react';
import { IconRenderer } from '@/components/layout/IconRenderer';

interface ProgramDetailsClientProps {
  program: any;
  plans: any[];
  curriculum: any[];
  projects: any[];
  reviews: any[];
}

export function ProgramDetailsClient({
  program,
  plans,
  curriculum,
  projects,
  reviews,
}: ProgramDetailsClientProps) {
  const router = useRouter();
  const [selectedPlanSlug, setSelectedPlanSlug] = useState<string>(
    plans.find((p) => p.isPopular)?.slug || plans[0]?.slug || '3-months'
  );
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const activePlan = plans.find((p) => p.slug === selectedPlanSlug) || plans[0];

  // Calculate actual plan price with custom override if enabled
  let currentPrice = activePlan?.salePrice || 599;
  if (program.customPricingEnabled && program.customPrices) {
    if (activePlan?.slug === '1-month' && program.customPrices.oneMonth) {
      currentPrice = program.customPrices.oneMonth;
    } else if (activePlan?.slug === '45-days' && program.customPrices.fortyFiveDays) {
      currentPrice = program.customPrices.fortyFiveDays;
    } else if (activePlan?.slug === '3-months' && program.customPrices.threeMonths) {
      currentPrice = program.customPrices.threeMonths;
    } else if (activePlan?.slug === '6-months' && program.customPrices.sixMonths) {
      currentPrice = program.customPrices.sixMonths;
    }
  }

  const handleEnrollClick = () => {
    router.push(`/enroll/${program.slug}?plan=${selectedPlanSlug}`);
  };

  return (
    <div className="pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-16 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-wider">
                {program.category}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-medium">
                Level: {program.difficulty}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verifiable Certificate
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {program.title}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {program.shortDescription}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs text-slate-300">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <div className="text-slate-400">Curriculum</div>
                <div className="text-base font-bold text-white mt-0.5">
                  {curriculum.length || program.modulesCount || 4} Modules
                </div>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <div className="text-slate-400">Practical Projects</div>
                <div className="text-base font-bold text-white mt-0.5">
                  {projects.length || program.projectsCount || 2} Guided Projects
                </div>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <div className="text-slate-400">Mode</div>
                <div className="text-base font-bold text-white mt-0.5">Online & Self-Paced</div>
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                <div className="text-slate-400">Starting Price</div>
                <div className="text-base font-bold text-emerald-400 mt-0.5">
                  ₹{plans[0]?.salePrice || 299}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sticky Sidebar on Desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                Program Overview
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {program.detailedDescription}
              </p>
            </section>

            {/* Technologies Covered */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-blue-600" />
                Technologies & Tools You Will Master
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {program.technologies?.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/80 text-sm font-semibold flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Complete Curriculum Accordion */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Complete Day-by-Day Curriculum
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Structured modular breakdown with guided video lessons, coding exercises, quizzes, and projects.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                  {curriculum.length} Modules
                </span>
              </div>

              <div className="space-y-4">
                {curriculum.map((mod: any, idx: number) => {
                  const isOpen = openModuleIndex === idx;
                  return (
                    <div
                      key={mod._id || idx}
                      className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-slate-50/50"
                    >
                      <button
                        onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                        className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-slate-900 hover:bg-slate-100/70 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-mono flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-sm sm:text-base">{mod.title}</span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs text-slate-500 font-normal hidden sm:inline">
                            {mod.lessons?.length || 0} Lessons • {mod.estimatedHours || 5} Hours
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 transition-transform ${
                              isOpen ? 'rotate-180 text-blue-600' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="p-4 sm:p-5 pt-0 border-t border-slate-200/60 bg-white space-y-3">
                          <p className="text-xs text-slate-600 mb-3">{mod.description}</p>
                          
                          <div className="space-y-2">
                            {mod.lessons?.map((les: any, lesIdx: number) => (
                              <div
                                key={les._id || lesIdx}
                                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 text-xs text-slate-700"
                              >
                                <span className="flex items-center gap-2 font-medium">
                                  <PlayCircle className="w-4 h-4 text-blue-600 shrink-0" />
                                  Lesson {lesIdx + 1}: {les.title}
                                </span>
                                <span className="text-slate-400 text-[11px] font-mono shrink-0 ml-2">
                                  Day {les.unlockDay || lesIdx + 1}
                                </span>
                              </div>
                            ))}

                            {mod.assignments?.map((asg: any, aIdx: number) => (
                              <div
                                key={asg._id || aIdx}
                                className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium"
                              >
                                <span className="flex items-center gap-2">
                                  <FileCode className="w-4 h-4 text-amber-600" />
                                  Assignment: {asg.title}
                                </span>
                                <span className="text-[11px] bg-amber-200/60 px-2 py-0.5 rounded">
                                  {asg.maxScore || 100} Marks
                                </span>
                              </div>
                            ))}

                            {mod.quizzes?.map((qz: any, qIdx: number) => (
                              <div
                                key={qz._id || qIdx}
                                className="flex items-center justify-between p-2.5 rounded-lg bg-purple-50 border border-purple-200 text-xs text-purple-900 font-medium"
                              >
                                <span className="flex items-center gap-2">
                                  <FileCheck className="w-4 h-4 text-purple-600" />
                                  Module Quiz: {qz.title}
                                </span>
                                <span className="text-[11px] bg-purple-200/60 px-2 py-0.5 rounded">
                                  MCQ Test
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Guided Projects */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                Industry Capstone & Guided Projects
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                You will implement and submit full repositories for these projects to qualify for graduation.
              </p>

              <div className="space-y-4">
                {projects.map((proj: any, pIdx: number) => (
                  <div
                    key={proj._id || pIdx}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-slate-900">
                        {proj.title}
                      </h3>
                      {proj.isCapstone && (
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                          Final Capstone
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {proj.description}
                    </p>
                    {proj.requirements && proj.requirements.length > 0 && (
                      <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc">
                        {proj.requirements.map((req: string, rIdx: number) => (
                          <li key={rIdx}>{req}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Learning Outcomes & Who Should Join */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  Learning Outcomes
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  {program.learningOutcomes?.map((out: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                  Who Should Join
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  {program.whoShouldJoin?.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Verified Certificate Showcase */}
            <section className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-glow">
                  <Award className="w-9 h-9" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
                    <ShieldCheck className="w-4 h-4" /> Tamper-Proof & Verifiable
                  </div>
                  <h3 className="text-xl font-bold">
                    Official Certificate of Internship Completion
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                    Issued exclusively upon passing score verification on all assignments and capstone project. Includes unique Certificate ID & QR Code for public employer validation.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQs */}
            {program.faqs && program.faqs.length > 0 && (
              <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Program FAQs
                </h2>
                <div className="space-y-3">
                  {program.faqs.map((faq: any, idx: number) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full text-left p-4 font-semibold text-slate-900 hover:text-blue-600 text-xs sm:text-sm flex items-center justify-between gap-4"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-0 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-slate-50/50">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Enrollment Card Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-blue-600 shadow-xl ring-4 ring-blue-600/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Internship Enrollment
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Open for 2026 Batch
                  </span>
                </div>

                {/* Duration Plan Selector */}
                <div className="space-y-2 mb-6">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Select Internship Duration:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {plans.map((pl) => {
                      const isSelected = selectedPlanSlug === pl.slug;
                      return (
                        <button
                          key={pl.slug}
                          type="button"
                          onClick={() => setSelectedPlanSlug(pl.slug)}
                          className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{pl.durationLabel}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 stroke-[3]" />}
                          </div>
                          <div className="text-xs font-black text-slate-900 mt-1">
                            ₹{pl.salePrice}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 mb-6">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">Total Program Fee:</span>
                      <span className="text-3xl font-black text-slate-900">
                        ₹{currentPrice}
                      </span>
                    </div>
                    {activePlan?.originalPrice > currentPrice && (
                      <div className="text-right">
                        <span className="text-xs text-slate-400 line-through block">
                          ₹{activePlan.originalPrice}
                        </span>
                        <span className="text-xs font-bold text-emerald-600">
                          Save ₹{activePlan.originalPrice - currentPrice}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* What's included checklist */}
                <div className="space-y-2.5 mb-6 text-xs text-slate-600">
                  <div className="font-semibold text-slate-800">What is included:</div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Complete {curriculum.length} Modules & Video Lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Graded Assignments & Mentor Feedback</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Production Capstone Project Evaluation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Verifiable Certificate with QR Code</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleEnrollClick}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-glow transition-all flex items-center justify-center gap-2 hover:gap-3"
                >
                  Enroll Now ({activePlan?.durationLabel})
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="mt-4 text-center">
                  <p className="text-[11px] text-slate-400">
                    Instant access to student dashboard upon registration.
                  </p>
                </div>
              </div>

              {/* Assistance Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center text-xs text-slate-600 shadow-soft">
                <p className="font-semibold text-slate-900 mb-1">Have questions before enrolling?</p>
                <p className="mb-3">Reach out to our academic counselors directly.</p>
                <Link
                  href="/contact"
                  className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Contact Academic Support →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Bar for Mobile Viewports */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3.5 px-4 flex items-center justify-between shadow-2xl">
        <div>
          <div className="text-[10px] text-slate-400 font-medium">Total Program Fee</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-white">₹{currentPrice}</span>
            <span className="text-[11px] text-slate-400">({activePlan?.durationLabel})</span>
          </div>
        </div>

        <button
          onClick={handleEnrollClick}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-glow flex items-center gap-2"
        >
          Enroll Now
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
