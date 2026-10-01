'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Award, Sparkles, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import { IconRenderer } from '@/components/layout/IconRenderer';

interface ProgramCardProps {
  _id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  iconName?: string;
  technologies: string[];
  difficulty: string;
  isPopular?: boolean;
}

interface PopularInternshipsProps {
  programs: ProgramCardProps[];
  startingPrice?: number;
}

export function PopularInternships({ programs, startingPrice = 299 }: PopularInternshipsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'All Tracks' },
    { id: 'Web Development', label: 'Web & Full Stack' },
    { id: 'Data Science & AI', label: 'AI & Data Science' },
    { id: 'Core Engineering', label: 'Java, Python & DSA' },
    { id: 'Mobile Development', label: 'Mobile Apps' },
    { id: 'Security & Cloud', label: 'DevOps & Cloud' },
  ];

  const filteredPrograms = programs.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'Web Development') {
      return (
        p.category === 'Web Development' ||
        p.category === 'Full Stack Development' ||
        p.slug.includes('web') ||
        p.slug.includes('stack') ||
        p.slug.includes('frontend') ||
        p.slug.includes('backend')
      );
    }
    if (selectedCategory === 'Data Science & AI') {
      return (
        p.category === 'Data Science & AI' ||
        p.slug.includes('data') ||
        p.slug.includes('ai') ||
        p.slug.includes('learning')
      );
    }
    if (selectedCategory === 'Core Engineering') {
      return (
        p.category === 'Core Engineering' ||
        p.slug.includes('java') ||
        p.slug.includes('python') ||
        p.slug.includes('algorithms') ||
        p.slug.includes('c-plus')
      );
    }
    if (selectedCategory === 'Mobile Development') {
      return (
        p.category === 'Mobile Development' ||
        p.slug.includes('android') ||
        p.slug.includes('flutter') ||
        p.slug.includes('native')
      );
    }
    if (selectedCategory === 'Security & Cloud') {
      return (
        p.category === 'Security & Cloud' ||
        p.slug.includes('cloud') ||
        p.slug.includes('devops') ||
        p.slug.includes('cyber')
      );
    }
    return true;
  });

  const displayPrograms = filteredPrograms.slice(0, 8);

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-widest mb-2">
              <Layers className="w-4 h-4" />
              <span>40+ Industry Domains</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Popular Internship Programs
            </h2>
            <p className="text-base text-slate-600 mt-2 max-w-xl">
              Choose your domain, inspect the complete day-by-day curriculum before enrolling, and build industry-grade projects.
            </p>
          </div>

          <Link
            href="/internships"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-sm font-bold transition-all shrink-0 border border-brand-200/80"
          >
            <span>Explore all 40+ programs</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-brand-600 text-white shadow-glow-brand'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Domain Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPrograms.map((prog) => (
            <div
              key={prog._id || prog.slug}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft card-glow-hover flex flex-col justify-between group relative overflow-hidden"
            >
              {prog.isPopular && (
                <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-brand-600 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Popular
                </div>
              )}

              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-brand-600 group-hover:text-white transition-all shadow-xs">
                  <IconRenderer name={prog.iconName || 'Code'} className="w-6 h-6" />
                </div>

                <div className="text-[11px] font-bold text-brand-600 uppercase tracking-wider mb-1">
                  {prog.category}
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  {prog.title}
                </h3>

                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {prog.shortDescription}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {prog.technologies?.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                  {prog.technologies?.length > 3 && (
                    <span className="px-1.5 py-0.5 text-slate-400 text-[11px] font-medium">
                      +{prog.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Starting from</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-black text-slate-900">₹{startingPrice}</span>
                    <span className="text-[10px] text-slate-400">/ 1M</span>
                  </div>
                </div>

                <Link
                  href={`/internships/${prog.slug}`}
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
