'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/Providers';
import {
  Layers,
  BookOpen,
  CheckCircle2,
  FileCode,
  FolderGit2,
  Award,
  ArrowRight,
  PlayCircle,
  Clock,
  Sparkles,
  AlertCircle,
  Bell,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/student/dashboard');
      const data = await res.json();
      if (data.success) {
        setDashboardData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const { stats, activeEnrollment, recentLesson, announcements, certificates } =
    dashboardData || { stats: {} };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            Batch 2026 Practical Workspace
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
            {activeEnrollment ? (
              <>
                You are actively enrolled in <strong>{activeEnrollment.program?.title}</strong> ({activeEnrollment.planDuration}).
                Continue completing daily modules to unlock your verified certificate.
              </>
            ) : (
              <>
                You don't have an active internship yet. Explore our 40+ engineering domains to enroll.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Overview KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Active Programs</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {stats?.activeInternshipsCount || 0}
          </div>
          <span className="text-[11px] text-slate-400">Enrolled Domain Tracks</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Overall Progress</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {stats?.overallProgress || 0}%
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${stats?.overallProgress || 0}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Completed Lessons</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {stats?.totalCompletedLessons || 0}
          </div>
          <span className="text-[11px] text-slate-400">Daily Study Modules Finished</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Certificates</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">
            {stats?.certificatesCount || 0}
          </div>
          <span className="text-[11px] text-slate-400">Verifiable Credentials</span>
        </div>
      </div>

      {/* Main Grid: Active Program & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Continue Learning & Recent Program */}
        <div className="lg:col-span-8 space-y-6">
          {activeEnrollment ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">
                    Current Active Internship
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                    {activeEnrollment.program?.title}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-mono">
                    <span>ID: {activeEnrollment.enrollmentId}</span>
                    <span>•</span>
                    <span>{activeEnrollment.planDuration}</span>
                  </div>
                </div>

                <Link
                  href={`/student/internships/${activeEnrollment._id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all shrink-0"
                >
                  <PlayCircle className="w-4 h-4" />
                  Continue Learning
                </Link>
              </div>

              {/* Progress Summary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-700">Course Completion</span>
                  <span className="text-blue-600 font-bold">{activeEnrollment.progressPercent || 0}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${activeEnrollment.progressPercent || 0}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                  <span>Start: {formatDate(activeEnrollment.startDate)}</span>
                  <span>End: {formatDate(activeEnrollment.endDate)}</span>
                </div>
              </div>

              {/* Next Lesson Recommendation */}
              {recentLesson && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">Up Next</span>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                      {recentLesson.title}
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span className="capitalize">{recentLesson.contentType || 'Video'}</span>
                      <span>•</span>
                      <span>{recentLesson.durationMinutes || 20} mins</span>
                    </div>
                  </div>

                  <Link
                    href={`/student/internships/${activeEnrollment._id}`}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-sm shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <Link
                  href="/student/assignments"
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/50 hover:bg-white transition-all text-xs space-y-1 block"
                >
                  <FileCode className="w-4 h-4 text-amber-600 mb-1" />
                  <div className="font-bold text-slate-900">Assignments</div>
                  <p className="text-slate-500 text-[11px]">Submit GitHub repos & view scores</p>
                </Link>

                <Link
                  href="/student/projects"
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/50 hover:bg-white transition-all text-xs space-y-1 block"
                >
                  <FolderGit2 className="w-4 h-4 text-indigo-600 mb-1" />
                  <div className="font-bold text-slate-900">Capstone Projects</div>
                  <p className="text-slate-500 text-[11px]">Deploy and submit portfolio tasks</p>
                </Link>

                <Link
                  href="/student/certificates"
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/50 hover:bg-white transition-all text-xs space-y-1 block"
                >
                  <Award className="w-4 h-4 text-purple-600 mb-1" />
                  <div className="font-bold text-slate-900">Certificates</div>
                  <p className="text-slate-500 text-[11px]">Download QR verified credentials</p>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-soft text-center space-y-4">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h2 className="text-xl font-bold text-slate-900">No Active Enrollment Yet</h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Explore our 40+ engineering internship domains (MERN, Next.js, Python, Java, AI, Data Science) to begin your practical journey.
              </p>
              <div className="pt-2">
                <Link
                  href="/internships"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 shadow-md transition-colors"
                >
                  Explore Internships <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right Column (4 cols): Cohort Announcements & Verification */}
        <div className="lg:col-span-4 space-y-6">
          {/* Announcements Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-blue-600" />
                Cohort Announcements
              </h3>
              <span className="text-[10px] font-semibold text-slate-400">Live</span>
            </div>

            {announcements?.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">
                No new announcements.
              </p>
            ) : (
              <div className="space-y-3">
                {announcements.map((ann: any, idx: number) => (
                  <div
                    key={ann._id || idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1"
                  >
                    <div className="font-bold text-slate-900">{ann.title}</div>
                    <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-3">
                      {ann.content}
                    </p>
                    <div className="text-[10px] text-slate-400 font-medium pt-1">
                      {formatDate(ann.publishDate || ann.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Certificate Quick Status */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 shadow-soft space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" /> Verified Credentials
            </div>
            <h4 className="text-base font-bold">
              Ready for Certification?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Maintain at least 80% completion across daily lessons, pass quizzes, and submit your approved capstone project.
            </p>
            <div className="pt-2">
              <Link
                href="/student/certificates"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
              >
                Check Certificate Eligibility →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
