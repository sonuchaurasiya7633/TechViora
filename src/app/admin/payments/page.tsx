'use client';

import React, { useEffect, useState } from 'react';
import { Search, CheckCircle2, ShieldCheck, Loader2, Smartphone, Clock, Copy } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';

export default function AdminPaymentsPage() {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = (query = '') => {
    setLoading(true);
    const url = query ? `/api/admin/payments?search=${encodeURIComponent(query)}` : '/api/admin/payments';
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setPayments(data.payments || []);
        }
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPayments(searchTerm);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
            UPI Audit Ledger
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            UPI Payments & UTR Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Timestamped payment records submitted via UPI ID <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-700 font-mono">sonu-6074@ptyes</code>.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search UTR, Order, Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
          </div>
        ) : payments.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            No UPI payment records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                <tr>
                  <th className="px-6 py-4">UTR / Transaction ID</th>
                  <th className="px-6 py-4">Student Details</th>
                  <th className="px-6 py-4">Program & Plan</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">UPI ID</th>
                  <th className="px-6 py-4">Payment Timestamp</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {payments.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg inline-block">
                        {p.utrNumber || p.paymentId}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-1">Ref: {p.orderId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{p.student?.name || 'Student'}</div>
                      <div className="text-[11px] text-slate-500">{p.student?.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900 font-semibold">{p.program?.title}</div>
                      <div className="text-[11px] text-slate-500">{p.plan?.durationLabel}</div>
                    </td>
                    <td className="px-6 py-4 font-black text-emerald-700 text-sm">
                      {formatCurrency(p.amount)}
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-600">
                      {p.upiId || 'sonu-6074@ptyes'}
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-mono text-[11px]">
                      {p.paymentTimestamp ? formatDate(p.paymentTimestamp) : formatDate(p.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 inline-flex items-center gap-1 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified Active
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
