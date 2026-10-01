'use client';

import React, { useEffect, useState } from 'react';
import { Users, Search, ShieldCheck, ShieldAlert, Filter, Loader2, CheckCircle2, UserCheck } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminStudentsPage() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);

      const res = await fetch(`/api/admin/students?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setStudents(json.students || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [statusFilter]);

  const handleToggleStatus = async (studentId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    try {
      const res = await fetch('/api/admin/students', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        fetchStudents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Student Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Search students by name, email, phone, or college. Manage access and view enrollments.
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-soft flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchStudents()}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>

        <button
          onClick={fetchStudents}
          className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
        >
          Search
        </button>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="py-16 text-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
          </div>
        ) : students.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            No students found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Student</th>
                  <th className="px-6 py-3.5">College & Course</th>
                  <th className="px-6 py-3.5">Enrollments</th>
                  <th className="px-6 py-3.5">Joined</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {students.map((st) => (
                  <tr key={st._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{st.name}</div>
                      <div className="text-[11px] text-slate-500">{st.email}</div>
                      {st.phone && <div className="text-[10px] text-slate-400 font-mono">{st.phone}</div>}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{st.profile?.collegeName || 'Not specified'}</div>
                      <div className="text-[11px] text-slate-500">
                        {st.profile?.course || 'B.Tech'} • {st.profile?.branch || 'CSE'}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {st.enrollments?.length > 0 ? (
                        <div className="space-y-1">
                          {st.enrollments.map((e: any) => (
                            <span
                              key={e._id}
                              className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold border border-blue-200/60 mr-1"
                            >
                              {e.program?.title || 'Internship'} ({e.planDuration})
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px]">No active tracks</span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-slate-500 font-mono text-[11px]">
                      {formatDate(st.createdAt)}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          st.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {st.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleToggleStatus(st._id, st.status)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                          st.status === 'active'
                            ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                            : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                        }`}
                      >
                        {st.status === 'active' ? 'Block Student' : 'Activate Account'}
                      </button>
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
