'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FolderGit2, CheckCircle2, Clock, ExternalLink, Loader2, Award, Sparkles } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function StudentProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [projectsList, setProjectsList] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/student/dashboard')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.allEnrollments && data.allEnrollments.length > 0) {
          const activeId = data.allEnrollments[0]._id;
          fetch(`/api/student/internships/${activeId}/learn`)
            .then((r2) => r2.json())
            .then((d2) => {
              if (d2.success) {
                if (d2.projectSubmissions) setSubmissions(d2.projectSubmissions);
                if (d2.projects) setProjectsList(d2.projects);
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
          Industry Capstone Projects
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Complete and deploy full-scale portfolio applications to qualify for your verified internship certificate.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsList.map((proj) => {
          const sub = submissions.find((s) => s.projectId === proj._id);
          return (
            <div
              key={proj._id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold uppercase tracking-wider">
                    {proj.isCapstone ? 'Final Capstone' : 'Guided Project'}
                  </span>
                  <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded ${
                    sub?.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : sub
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {sub ? sub.status.replace('_', ' ') : 'Not Submitted'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {proj.description}
                </p>

                {sub && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs mb-4">
                    <div className="text-slate-400 text-[11px]">Submission Record:</div>
                    {sub.githubUrl && (
                      <a
                        href={sub.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1 font-mono truncate"
                      >
                        GitHub: {sub.githubUrl} <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    )}
                    {sub.liveUrl && (
                      <a
                        href={sub.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1 font-mono truncate"
                      >
                        Live: {sub.liveUrl} <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    )}
                    {sub.score !== undefined && (
                      <div className="font-bold text-slate-900 pt-1 border-t border-slate-200">
                        Score Awarded: <span className="text-blue-600">{sub.score} / {proj.maxMarks || 100}</span>
                      </div>
                    )}
                    {sub.feedback && (
                      <div className="text-[11px] text-slate-600 italic">
                        Mentor Review: "{sub.feedback}"
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/student/internships"
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <FolderGit2 className="w-4 h-4" />
                  {sub ? 'Update Deliverables' : 'Submit Project Repository'}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
