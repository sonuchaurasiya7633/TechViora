'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileCode, CheckCircle2, Clock, AlertCircle, ExternalLink, Loader2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function StudentAssignmentsPage() {
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/student/dashboard')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.allEnrollments && data.allEnrollments.length > 0) {
          // Fetch submissions for the first/active enrollment
          const activeId = data.allEnrollments[0]._id;
          fetch(`/api/student/internships/${activeId}/learn`)
            .then((r2) => r2.json())
            .then((d2) => {
              if (d2.success && d2.assignmentSubmissions) {
                setSubmissions(d2.assignmentSubmissions);
              }
            });
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

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Assignments & Graded Tasks
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Review your submitted GitHub repository links, reviewer feedback, and evaluated marks.
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
          <FileCode className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-slate-900">No Assignments Submitted Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Open your active internship curriculum player to view and submit assigned practical tasks.
          </p>
          <div className="pt-2">
            <Link
              href="/student/internships"
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Go to Learning Player
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div
              key={sub._id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${
                    sub.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : sub.status === 'needs_revision'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-50 text-blue-700'
                  }`}>
                    {sub.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-400">
                    Submitted: {formatDate(sub.submittedAt)}
                  </span>
                </div>

                {sub.score !== undefined && (
                  <div className="text-sm font-bold text-slate-900">
                    Score: <span className="text-blue-600">{sub.score} / 100</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {sub.githubUrl && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-slate-400 block mb-0.5">Submitted Repository:</span>
                    <a
                      href={sub.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-blue-600 hover:underline flex items-center gap-1 truncate"
                    >
                      {sub.githubUrl} <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                )}

                {sub.liveUrl && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-slate-400 block mb-0.5">Live Demo:</span>
                    <a
                      href={sub.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-blue-600 hover:underline flex items-center gap-1 truncate"
                    >
                      {sub.liveUrl} <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                )}
              </div>

              {sub.feedback && (
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900">
                  <div className="font-semibold mb-0.5">Mentor Feedback:</div>
                  <p>{sub.feedback}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
