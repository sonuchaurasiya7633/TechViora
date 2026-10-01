import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectToDatabase } from '@/lib/db';
import { Certificate } from '@/models/Certificate';
import { Settings } from '@/models/Settings';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { formatDate } from '@/lib/utils';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  Calendar,
  Layers,
  Clock,
  UserCheck,
  Building,
  Printer,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) {
  const { certificateId } = await params;
  return {
    title: `Verified Certificate ${certificateId} | TechViora`,
    description: `Officially verified certificate of internship completion issued by TechViora.`,
  };
}

export default async function VerifyCertificatePage({
  params,
}: {
  params: Promise<{ certificateId: string }>;
}) {
  const { certificateId } = await params;
  await connectToDatabase();

  const cert = await Certificate.findOne({
    certificateId: certificateId.trim().toUpperCase(),
  }).populate('program').lean();

  if (!cert) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 py-16 text-center max-w-xl mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Certificate Not Found</h1>
          <p className="text-sm text-slate-600 mt-2">
            No active certificate matches the ID <span className="font-mono font-bold text-slate-800">{certificateId}</span>. Please verify the ID or check if it was entered correctly.
          </p>
          <div className="mt-6">
            <Link
              href="/verify"
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Search Again
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const settings = await Settings.findOne().lean();
  const signatoryName = settings?.certificateSignatoryName || 'Dr. Vivek Sharma';
  const signatoryTitle = settings?.certificateSignatoryTitle || 'Head of Engineering & Technical Director';
  const orgName = settings?.certificateOrganizationName || 'TechViora Engineering Labs';

  const isRevoked = cert.status === 'revoked';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Status Header */}
          <div className="text-center space-y-2">
            {isRevoked ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 text-sm font-bold border border-rose-200">
                ⚠️ Certificate Revoked
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold border border-emerald-200 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Officially Verified Certificate
              </div>
            )}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Certificate of Internship Verification
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Certificate Record ID: <span className="font-mono font-bold text-slate-800">{cert.certificateId}</span>
            </p>
          </div>

          {/* Certificate Digital Document Card */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-2xl p-6 sm:p-12 relative overflow-hidden">
            <div className="border-4 border-double border-slate-200/90 rounded-2xl p-6 sm:p-10 relative bg-gradient-to-b from-white via-slate-50/30 to-white">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-slate-100 pb-6 mb-8 text-center sm:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-2">
                    TechViora
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium tracking-wider uppercase">
                    {orgName}
                  </div>
                </div>

                <div className="text-center sm:text-right">
                  <div className="text-[11px] font-mono text-slate-400">Unique Credential ID</div>
                  <div className="text-sm font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200/60 inline-block mt-0.5">
                    {cert.certificateId}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="text-center my-10 space-y-4">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  Certificate of Internship Completion
                </div>
                <div className="text-xs text-slate-500">This is proudly presented to</div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {cert.studentName}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed pt-2">
                  for successfully completing the rigorous <strong>{cert.durationLabel}</strong> practical internship program in <strong>{cert.programTitle}</strong>, demonstrating competence in software engineering principles, evaluated daily assignments, and the capstone project.
                </div>
              </div>

              {/* Footer Credentials & QR */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 pt-8 border-t-2 border-slate-100 items-end">
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Duration</div>
                  <div className="text-xs font-bold text-slate-800 mt-1">{cert.durationLabel}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {formatDate(cert.startDate)} - {formatDate(cert.completionDate)}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Issue Date</div>
                  <div className="text-xs font-bold text-slate-800 mt-1">{formatDate(cert.issueDate)}</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Grade: {cert.grade || 'A+'}</div>
                </div>

                <div className="text-center sm:text-left">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Authorized Signatory</div>
                  <div className="text-xs font-bold text-slate-900 mt-1">{signatoryName}</div>
                  <div className="text-[10px] text-slate-500">{signatoryTitle}</div>
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center sm:items-end justify-center">
                  {cert.qrCodeDataUrl && (
                    <img
                      src={cert.qrCodeDataUrl}
                      alt="Verification QR Code"
                      className="w-20 h-20 border border-slate-200 rounded-lg p-1 bg-white shadow-sm"
                    />
                  )}
                  <span className="text-[9px] font-mono text-slate-400 mt-1">Scan to Verify</span>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Details Table */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Official Verification Record Metadata
            </h2>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50">
                <dt className="text-slate-500 font-medium">Student Name</dt>
                <dd className="font-bold text-slate-900 text-sm mt-0.5">{cert.studentName}</dd>
              </div>
              <div className="p-3 rounded-xl bg-slate-50">
                <dt className="text-slate-500 font-medium">Internship Domain</dt>
                <dd className="font-bold text-slate-900 text-sm mt-0.5">{cert.programTitle}</dd>
              </div>
              <div className="p-3 rounded-xl bg-slate-50">
                <dt className="text-slate-500 font-medium">Enrollment ID</dt>
                <dd className="font-mono font-bold text-slate-900 text-sm mt-0.5">{cert.enrollmentId}</dd>
              </div>
              <div className="p-3 rounded-xl bg-slate-50">
                <dt className="text-slate-500 font-medium">Status in Database</dt>
                <dd className="font-bold text-emerald-600 text-sm mt-0.5 capitalize">{cert.status}</dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
