'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Award, ShieldCheck, Download, QrCode, ExternalLink, Loader2, CheckCircle2 } from 'lucide-react';
import { CertificateSampleShowcase } from '@/components/certificates/CertificateSampleShowcase';
import { formatDate } from '@/lib/utils';

export default function StudentCertificatesPage() {
  const [loading, setLoading] = useState(true);
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/student/dashboard')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.certificates) {
          setCertificates(data.certificates);
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
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Verified Certificates
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Officially verified certificates featuring tamper-proof QR codes and permanent public verification links.
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-3">
          <Award className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-slate-900">No Certificates Earned Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Maintain at least 80% overall progress in your curriculum and submit your capstone project to unlock your official credentials.
          </p>
          <div className="pt-2">
            <Link
              href="/student/internships"
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Go to Internship Player
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Your Issued Certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert._id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-soft space-y-5"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {cert.certificateId}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {cert.programTitle}
                  </h3>
                  <div className="text-xs text-slate-500 mt-1">
                    Student: <strong>{cert.studentName}</strong> • {cert.durationLabel}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Issued: {formatDate(cert.issueDate)} • Grade: {cert.grade || 'A+'}
                  </div>
                </div>

                {/* QR Preview & Action Links */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
                  {cert.qrCodeDataUrl ? (
                    <img
                      src={cert.qrCodeDataUrl}
                      alt="QR Code"
                      className="w-16 h-16 rounded-lg border border-slate-200 bg-white p-1"
                    />
                  ) : (
                    <QrCode className="w-12 h-12 text-slate-400" />
                  )}

                  <div className="text-right space-y-2">
                    <Link
                      href={`/verify/${cert.certificateId}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                    >
                      Public Verification Page <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Track Formats & Sample Showcase */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Track Credentials & Sample Formats</h2>
          <p className="text-xs text-slate-500">
            Preview the exact certificate, experience letter, and LOR formats issued by TechViora.
          </p>
        </div>

        <CertificateSampleShowcase />
      </div>
    </div>
  );
}
