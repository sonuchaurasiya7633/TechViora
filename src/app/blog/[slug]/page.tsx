import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { connectToDatabase } from '@/lib/db';
import { Blog } from '@/models/Blog';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { formatDate } from '@/lib/utils';
import { Clock, ArrowLeft, Share2, Sparkles, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectToDatabase();
  const blog = await Blog.findOne({ slug, isPublished: true });

  if (!blog) return { title: 'Article Not Found | TechViora' };

  return {
    title: `${blog.title} | TechViora Blog`,
    description: blog.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await connectToDatabase();

  const blog = await Blog.findOne({ slug, isPublished: true }).lean();
  if (!blog) notFound();

  const b = JSON.parse(JSON.stringify(blog));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-10 sm:py-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
          </Link>

          <div className="space-y-4 mb-8">
            <span className="px-3 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
              {b.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {b.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pt-2 border-b border-slate-200 pb-4">
              <span>Author: <strong>{b.author?.name || 'TechViora'}</strong></span>
              <span>•</span>
              <span>{formatDate(b.publishedAt)}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {b.readTimeMinutes} min read
              </span>
            </div>
          </div>

          {b.thumbnail && (
            <div className="rounded-3xl overflow-hidden mb-10 shadow-soft border border-slate-200">
              <img src={b.thumbnail} alt={b.title} className="w-full h-auto object-cover max-h-[420px]" />
            </div>
          )}

          {/* Article Body */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-soft prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
            {b.content}
          </div>

          {/* Tags */}
          {b.tags && b.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-600 mr-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Tags:
              </span>
              {b.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg bg-slate-200/80 text-slate-700 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
