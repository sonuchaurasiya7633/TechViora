'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, Sparkles, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { IconRenderer } from '@/components/layout/IconRenderer';

interface ProgramItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  iconName?: string;
  technologies: string[];
  difficulty: string;
  isPopular?: boolean;
  isFeatured?: boolean;
  modulesCount?: number;
  projectsCount?: number;
}

interface InternshipsExplorerProps {
  initialPrograms: ProgramItem[];
  plans: any[];
}

export function InternshipsExplorer({ initialPrograms, plans }: InternshipsExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add('All');
    initialPrograms.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [initialPrograms]);

  const filtered = useMemo(() => {
    return initialPrograms.filter((p) => {
      const matchesSearch =
        !searchTerm ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.technologies?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;

      return matchesSearch && matchesCat && matchesDiff;
    });
  }, [initialPrograms, searchTerm, selectedCategory, selectedDifficulty]);

  const startingPrice = plans.length > 0 ? Math.min(...plans.map((pl) => pl.salePrice)) : 299;

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-soft-lg space-y-4">
        <div className="flex flex-col sm:flex-row gap-3.5">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 40+ programs by title or tech (e.g. React, Python, Java, AI, Docker, AWS)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-700/80 bg-slate-950 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-700/80 bg-slate-950 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
            >
              <option value="All">All Difficulty Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels</option>
            </select>
          </div>
        </div>

        {/* Category Pill Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl font-bold shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-glow border border-blue-400/40'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-slate-400 px-1">
        <span>Showing <strong className="text-white font-mono">{filtered.length}</strong> engineering domains</span>
        {(searchTerm || selectedCategory !== 'All' || selectedDifficulty !== 'All') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
            }}
            className="text-blue-400 hover:text-blue-300 text-xs font-bold underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Programs Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/60 rounded-3xl border border-slate-800 backdrop-blur-sm">
          <BookOpen className="w-14 h-14 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white">No internship programs found</h3>
          <p className="text-sm text-slate-400 mt-2 max-w-sm mx-auto">
            Try adjusting your search query or reset the category filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((prog) => (
            <div
              key={prog._id || prog.slug}
              className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800 hover:border-blue-500/50 p-6 shadow-soft-lg hover:shadow-glow transition-all duration-300 flex flex-col justify-between group relative hover:-translate-y-1"
            >
              {prog.isPopular && (
                <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-[10px] font-extrabold text-white shadow-md flex items-center gap-1 border border-blue-400/30">
                  <Sparkles className="w-3 h-3 text-amber-300" /> POPULAR
                </div>
              )}

              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <IconRenderer name={prog.iconName || 'Code'} className="w-6 h-6" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                    {prog.category}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    {prog.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                  {prog.title}
                </h3>

                <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                  {prog.shortDescription}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {prog.technologies?.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/80 text-slate-300 text-[11px] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                  {prog.technologies?.length > 3 && (
                    <span className="px-1.5 py-0.5 text-slate-400 text-[11px] font-mono">
                      +{prog.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Starting from</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-extrabold text-white">₹{startingPrice}</span>
                    <span className="text-[10px] text-slate-400">/mo</span>
                  </div>
                </div>

                <Link
                  href={`/internships/${prog.slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md group-hover:gap-2"
                >
                  Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
