'use client';

import React, { useState, useEffect } from 'react';
import { 
  Star, MessageSquare, Check, X, Trash2, Search, Filter, 
  Award, User, ThumbsUp, ShieldCheck, Loader2, Sparkles 
} from 'lucide-react';

interface Review {
  _id: string;
  student: {
    name: string;
    email: string;
    college?: string;
  };
  program: {
    _id: string;
    title: string;
  };
  rating: number;
  review: string;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'FEATURED'>('ALL');
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/reviews');
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews || []);
      }
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, updates: { isApproved?: boolean; isFeatured?: boolean }) => {
    try {
      setProcessingId(id);
      const res = await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
      });
      const data = await res.json();
      if (data.success) {
        setReviews(prev => prev.map(r => r._id === id ? { ...r, ...updates } : r));
      }
    } catch (err) {
      console.error('Update error', err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this student review?')) return;
    try {
      setProcessingId(id);
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setReviews(prev => prev.filter(r => r._id !== id));
      }
    } catch (err) {
      console.error('Delete error', err);
    } finally {
      setProcessingId(null);
    }
  };

  const filtered = reviews.filter(item => {
    const studentName = item.student?.name?.toLowerCase() || '';
    const programTitle = item.program?.title?.toLowerCase() || '';
    const content = item.review?.toLowerCase() || '';
    const q = search.toLowerCase();

    const matchQuery = studentName.includes(q) || programTitle.includes(q) || content.includes(q);

    if (statusFilter === 'PENDING') return matchQuery && !item.isApproved;
    if (statusFilter === 'APPROVED') return matchQuery && item.isApproved && !item.isFeatured;
    if (statusFilter === 'FEATURED') return matchQuery && item.isFeatured;
    return matchQuery;
  });

  const avgRating = reviews.length
    ? (reviews.reduce((acc, cur) => acc + (cur.rating || 5), 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
            Student Reviews & Testimonials
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Moderate genuine student feedback, approve ratings, and pin featured stories to the homepage.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center text-amber-500">
            <Star className="w-5 h-5 fill-amber-500" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">{avgRating} / 5.0</div>
            <div className="text-[11px] text-slate-400">{reviews.length} Total Reviews</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student, domain, or comment..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          {(['ALL', 'PENDING', 'APPROVED', 'FEATURED'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                statusFilter === tab
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
          <p className="text-sm text-slate-500">Loading student reviews...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">No reviews found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
            Student feedback submitted after program completion will appear here for verification.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(item => (
            <div
              key={item._id}
              className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border flex flex-col justify-between shadow-sm transition-all relative ${
                item.isFeatured
                  ? 'border-amber-300 dark:border-amber-800/80 bg-amber-50/15 dark:bg-amber-950/10'
                  : item.isApproved
                  ? 'border-slate-200 dark:border-slate-800'
                  : 'border-amber-200 dark:border-amber-900/40 bg-slate-50/50 dark:bg-slate-950/30'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center text-xs">
                      {item.student?.name?.[0] || 'S'}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                        {item.student?.name || 'Anonymous Student'}
                      </div>
                      <div className="text-xs text-slate-400 line-clamp-1">
                        {item.student?.college || item.student?.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < (item.rating || 5)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-200 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                  {item.program?.title || 'Internship Program'}
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 italic line-clamp-4 mb-4 leading-relaxed">
                  "{item.review}"
                </p>
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {item.isFeatured && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                  {item.isApproved ? (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Approved
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400">
                      Pending
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {/* Approve / Disapprove */}
                  <button
                    disabled={processingId === item._id}
                    onClick={() => handleToggleStatus(item._id, { isApproved: !item.isApproved })}
                    className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      item.isApproved
                        ? 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50'
                        : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50'
                    }`}
                    title={item.isApproved ? 'Unapprove review' : 'Approve review'}
                  >
                    {item.isApproved ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                  </button>

                  {/* Feature Toggle */}
                  <button
                    disabled={processingId === item._id}
                    onClick={() => handleToggleStatus(item._id, { isFeatured: !item.isFeatured, isApproved: true })}
                    className={`p-1.5 rounded-lg transition-colors ${
                      item.isFeatured
                        ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                        : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    title={item.isFeatured ? 'Remove from featured' : 'Pin to Homepage Featured'}
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    disabled={processingId === item._id}
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
