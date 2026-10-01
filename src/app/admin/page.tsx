'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Layers,
  Award,
  DollarSign,
  FileCode,
  CheckCircle2,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import { formatCurrency } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setStatsData(data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !statsData) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const { stats, charts } = statsData;

  const kpis = [
    { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'text-blue-600 bg-blue-50' },
    { label: 'Total Enrollments', value: stats.totalEnrollments, icon: Layers, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Active Internships', value: stats.activeEnrollments, icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: 'Completed', value: stats.completedEnrollments, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Total Revenue', value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: 'text-emerald-700 bg-emerald-100' },
    { label: 'Pending Reviews', value: stats.pendingSubmissions, icon: FileCode, color: 'text-rose-600 bg-rose-50' },
    { label: 'Certificates Issued', value: stats.certificatesIssued, icon: Award, color: 'text-purple-600 bg-purple-50' },
    { label: 'Published Domains', value: stats.totalPrograms, icon: Layers, color: 'text-cyan-600 bg-cyan-50' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time analytics on student enrollment, curriculum progression, submissions, and revenue.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/curriculum"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm"
          >
            + Curriculum Builder
          </Link>
          <Link
            href="/admin/assignments"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
          >
            Evaluate Submissions
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  {kpi.label}
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900">
                {kpi.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chart: Monthly Enrollments & Revenue Growth (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-sm text-slate-900">Monthly Enrollment Trend</h2>
              <p className="text-[11px] text-slate-500">Student cohort growth over recent months</p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              Growth Metrics
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.monthlyEnrollments}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCount)"
                  name="Enrollments"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Popular Domain Distribution (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h2 className="font-bold text-sm text-slate-900">Top Enrolled Domains</h2>
              <p className="text-[11px] text-slate-500">Highest enrolled engineering tracks</p>
            </div>
            <Link href="/admin/programs" className="text-xs font-semibold text-blue-600 hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3 pt-2">
            {charts.topPrograms?.map((p: any, idx: number) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 truncate max-w-[200px]">{p.title}</span>
                  <span className="font-mono text-slate-500">{p.enrollmentCount} students</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{
                      width: `${Math.min(100, Math.max(15, (p.enrollmentCount / 200) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
