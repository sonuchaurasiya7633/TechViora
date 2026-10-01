'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  PlayCircle,
  Clock,
  CheckCircle2,
  Award,
  ArrowRight,
  Loader2,
  Calendar,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function MyInternshipsPage() {
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/student/dashboard')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.allEnrollments) {
          setEnrollments(data.allEnrollments);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const active = enrollments.filter((e) => e.status === 'active' || e.status === 'pending');
  const completed = enrollments.filter((e) => e.status === 'completed');

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Enrolled Internships
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Access your enrolled domain tracks, daily curriculum player, assignments, and verified certificates.
        </p>
      </div>

      {/* Active Internships Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          Active Internships ({active.length})
        </h2>

        {active.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
            <p className="text-sm text-slate-500">No active internships currently.</p>
            <Link
              href="/internships"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse 40+ Internship Programs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {active.map((enr) => (
              <div
                key={enr._id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft hover:shadow-soft-lg hover:border-blue-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 text-[11px] font-bold uppercase tracking-wider">
                      {enr.planDuration} Track
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {enr.enrollmentId}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {enr.program?.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                    {enr.program?.shortDescription}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 mb-5">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span>Progress</span>
                      <span className="text-blue-600">{enr.progressPercent || 0}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${enr.progressPercent || 0}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl mb-4">
                    <div>
                      <span className="text-slate-400 block">Enrolled On:</span>
                      <span className="font-medium text-slate-800">{formatDate(enr.startDate)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Valid Until:</span>
                      <span className="font-medium text-slate-800">{formatDate(enr.endDate)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-700">
                    Status: <span className="text-emerald-600 uppercase">Active</span>
                  </div>
                  <Link
                    href={`/student/internships/${enr._id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Continue Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Internships Section */}
      {completed.length > 0 && (
        <div className="space-y-4 pt-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            Completed Internships ({completed.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completed.map((enr) => (
              <div
                key={enr._id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                    Completed ✓
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {enr.enrollmentId}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {enr.program?.title}
                </h3>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                  <span className="text-slate-500">
                    Score: <strong>{enr.progressPercent}%</strong>
                  </span>
                  <Link
                    href="/student/certificates"
                    className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    View Verified Certificate <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
