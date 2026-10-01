'use client';

import React, { useEffect, useState } from 'react';
import { Layers, Search, Filter, Loader2, CheckCircle2 } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';

export default function AdminEnrollmentsPage() {
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);

      const res = await fetch(`/api/admin/enrollments?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setEnrollments(json.enrollments || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, [statusFilter]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Enrollment Records
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Complete ledger of verified student enrollments, plan tiers, and completion progress.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-soft flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search enrollment ID, student name, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchEnrollments()}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
          </div>
        ) : enrollments.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            No enrollments found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Enrollment ID</th>
                  <th className="px-6 py-3.5">Student & College</th>
                  <th className="px-6 py-3.5">Program & Plan</th>
                  <th className="px-6 py-3.5">Amount Paid</th>
                  <th className="px-6 py-3.5">Progress</th>
                  <th className="px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {enrollments.map((enr) => (
                  <tr key={enr._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-mono font-bold text-blue-600">{enr.enrollmentId}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{formatDate(enr.createdAt)}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{enr.studentDetails?.fullName || enr.student?.name}</div>
                      <div className="text-[11px] text-slate-500">{enr.studentDetails?.email || enr.student?.email}</div>
                      <div className="text-[10px] text-slate-400">{enr.studentDetails?.collegeName}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{enr.program?.title}</div>
                      <div className="text-[11px] text-blue-600 font-medium">{enr.planDuration} Track</div>
                    </td>

                    <td className="px-6 py-4 font-bold text-slate-900">
                      {formatCurrency(enr.finalAmount)}
                      {enr.couponCode && (
                        <div className="text-[10px] text-emerald-600 font-mono">Coupon: {enr.couponCode}</div>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full"
                            style={{ width: `${enr.progressPercent || 0}%` }}
                          />
                        </div>
                        <span className="font-mono font-semibold text-slate-800">{enr.progressPercent || 0}%</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        enr.status === 'active'
                          ? 'bg-blue-100 text-blue-800'
                          : enr.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {enr.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
