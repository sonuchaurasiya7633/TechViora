'use client';

import React, { useEffect, useState } from 'react';
import { FolderGit2, CheckCircle2, AlertCircle, ExternalLink, Loader2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminProjectsReviewPage() {
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [reviewModal, setReviewModal] = useState<any>(null);
  const [score, setScore] = useState(95);
  const [feedback, setFeedback] = useState('Excellent capstone implementation!');
  const [newStatus, setNewStatus] = useState<'approved' | 'needs_revision' | 'rejected'>('approved');
  const [evaluating, setEvaluating] = useState(false);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      const json = await res.json();
      if (json.success) {
        setSubmissions(json.submissions || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleSaveEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    setEvaluating(true);
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: reviewModal._id,
          score,
          feedback,
          status: newStatus,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setReviewModal(null);
        fetchSubmissions();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Capstone Project Submissions
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Evaluate final production project deliverables, verify live cloud deployments, and grant capstone honors.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            No capstone project submissions currently.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Student</th>
                  <th className="px-6 py-3.5">Capstone Title</th>
                  <th className="px-6 py-3.5">Deliverable Links</th>
                  <th className="px-6 py-3.5">Submitted</th>
                  <th className="px-6 py-3.5">Status & Grade</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {submissions.map((sub) => (
                  <tr key={sub._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{sub.studentId?.name || 'Student'}</div>
                      <div className="text-[11px] text-slate-500">{sub.studentId?.email}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{sub.projectId?.title || 'Capstone Project'}</div>
                      <div className="text-[11px] text-blue-600">{sub.programId?.title}</div>
                    </td>

                    <td className="px-6 py-4 space-y-1">
                      {sub.githubUrl && (
                        <a
                          href={sub.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-blue-600 hover:underline flex items-center gap-1 text-[11px] truncate max-w-[200px]"
                        >
                          GitHub Repo <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {sub.liveUrl && (
                        <a
                          href={sub.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-emerald-600 hover:underline flex items-center gap-1 text-[11px] truncate max-w-[200px]"
                        >
                          Live URL <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </td>

                    <td className="px-6 py-4 text-slate-500 font-mono text-[11px]">
                      {formatDate(sub.submittedAt)}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        sub.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : sub.status === 'needs_revision'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {sub.status.replace('_', ' ')}
                      </span>
                      {sub.score !== undefined && (
                        <div className="text-[11px] font-bold text-slate-900 mt-1">
                          Score: {sub.score} / 100
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setReviewModal(sub);
                          setScore(sub.score || 95);
                          setFeedback(sub.feedback || 'Capstone verified and approved.');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all"
                      >
                        Grade Capstone
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Evaluation Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                Grade Capstone: {reviewModal.projectId?.title}
              </h3>
              <button
                onClick={() => setReviewModal(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSaveEvaluation} className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 space-y-1">
                <div className="font-semibold text-slate-800">
                  Student: {reviewModal.studentId?.name} ({reviewModal.studentId?.email})
                </div>
                <p className="text-[11px] text-slate-600 mt-1">{reviewModal.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Status *
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="approved">Approved ✓</option>
                    <option value="needs_revision">Needs Revision ⚠️</option>
                    <option value="rejected">Rejected ✕</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Score (0-100) *
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    required
                    value={score}
                    onChange={(e) => setScore(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Capstone Review Comments
                </label>
                <textarea
                  required
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={evaluating}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {evaluating ? 'Recording...' : 'Submit Evaluation & Update Progress'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
