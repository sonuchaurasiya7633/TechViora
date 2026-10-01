'use client';

import React, { useEffect, useState } from 'react';
import { DollarSign, Search, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';

export default function AdminPaymentsPage() {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/payments')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setPayments(data.payments || []);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Payment & Transaction Ledger
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Server-verified payment records captured via Razorpay gateway with audit timestamps.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
          </div>
        ) : payments.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            No payments captured yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Payment ID</th>
                  <th className="px-6 py-3.5">Order ID</th>
                  <th className="px-6 py-3.5">Student</th>
                  <th className="px-6 py-3.5">Program</th>
                  <th className="px-6 py-3.5">Amount</th>
                  <th className="px-6 py-3.5">Gateway</th>
                  <th className="px-6 py-3.5">Verified At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {payments.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-slate-900">
                      {p.paymentId}
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-500">
                      {p.orderId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{p.student?.name || 'Student'}</div>
                      <div className="text-[11px] text-slate-500">{p.student?.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-800 font-medium">
                      {p.program?.title}
                    </td>
                    <td className="px-6 py-4 font-bold text-emerald-700">
                      {formatCurrency(p.amount)}
                    </td>
                    <td className="px-6 py-4 capitalize font-mono text-slate-600">
                      {p.gateway}
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-mono">
                      {formatDate(p.verifiedAt || p.createdAt)}
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
