'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, QrCode, ExternalLink, RefreshCw, AlertTriangle, Loader2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminCertificatesPage() {
  const [loading, setLoading] = useState(true);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/certificates');
      const json = await res.json();
      if (json.success) {
        setCertificates(json.certificates || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleCertificateAction = async (certificateId: string, action: 'revoke' | 'reissue') => {
    const reason = prompt(`Please enter a reason for ${action}ing this certificate:`);
    if (reason === null) return;

    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/certificates', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ certificateId, action, reason }),
      });
      const json = await res.json();
      if (json.success) {
        fetchCertificates();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Verified Certificate Management & Audit
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Inspect issued credentials, view QR codes, revoke or reissue with audit tracking.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
          </div>
        ) : certificates.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            No certificates issued yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Certificate ID</th>
                  <th className="px-6 py-3.5">Student Name</th>
                  <th className="px-6 py-3.5">Domain</th>
                  <th className="px-6 py-3.5">Issue Date</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {certificates.map((cert) => (
                  <tr key={cert._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-mono font-bold text-blue-600 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" />
                        {cert.certificateId}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">Enr: {cert.enrollmentId}</div>
                    </td>

                    <td className="px-6 py-4 font-bold text-slate-900">
                      {cert.studentName}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">{cert.programTitle}</div>
                      <div className="text-[10px] text-slate-500">{cert.durationLabel}</div>
                    </td>

                    <td className="px-6 py-4 text-slate-500 font-mono">
                      {formatDate(cert.issueDate)}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        cert.status === 'issued'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {cert.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/verify/${cert.certificateId}`}
                        target="_blank"
                        className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold inline-flex items-center gap-1"
                      >
                        Verify <ExternalLink className="w-3 h-3" />
                      </Link>

                      {cert.status === 'issued' ? (
                        <button
                          onClick={() => handleCertificateAction(cert.certificateId, 'revoke')}
                          disabled={actionLoading}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold"
                        >
                          Revoke
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCertificateAction(cert.certificateId, 'reissue')}
                          disabled={actionLoading}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold"
                        >
                          Reissue
                        </button>
                      )}
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
