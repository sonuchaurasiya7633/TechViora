import React from 'react';
import Link from 'next/link';
import { connectToDatabase } from '@/lib/db';
import { Blog } from '@/models/Blog';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { formatDate } from '@/lib/utils';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Engineering & Tech Articles | TechViora Blog',
  description: 'Practical tech roadmaps, system design guides, DSA strategies, and full-stack project blueprints for engineering students.',
};

export default async function BlogListPage() {
  await connectToDatabase();
  const blogs = await Blog.find({ isPublished: true }).sort({ publishedAt: -1 }).lean();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Engineering Editorial
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Tech Articles & Roadmaps
            </h1>
            <p className="text-base text-slate-600 mt-2">
              Practical guides written by practitioners on full-stack architecture, DSA patterns, and software career preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((b: any) => (
              <article
                key={b._id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-soft hover:shadow-soft-lg hover:border-blue-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-[16/9] bg-slate-900 overflow-hidden relative">
                    <img
                      src={b.thumbnail || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80'}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-semibold">
                      {b.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2 font-medium">
                      <span>{formatDate(b.publishedAt)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {b.readTimeMinutes || 5} min read
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      <Link href={`/blog/${b.slug}`}>{b.title}</Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {b.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4 pt-4">
                  <div className="text-xs font-semibold text-slate-700">
                    By {b.author?.name || 'TechViora'}
                  </div>
                  <Link
                    href={`/blog/${b.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
