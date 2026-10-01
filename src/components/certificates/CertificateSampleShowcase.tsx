'use client';

import React, { useState } from 'react';
import { useAuth } from '@/components/Providers';
import {
  Award,
  ShieldCheck,
  QrCode,
  Eye,
  Lock,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  X,
  Printer,
  CheckCircle2,
  Calendar,
  Building,
} from 'lucide-react';

interface CertificateTier {
  id: string;
  title: string;
  type: string;
  badge: string;
  description: string;
  recipient?: string;
  program: string;
  duration: string;
  dates: string;
  signatory1: { name: string; title: string };
  signatory2: { name: string; title: string };
  ribbonColor: string;
  borderAccent: string;
}

const SAMPLE_CERTIFICATES: CertificateTier[] = [
  {
    id: 'training',
    title: 'Training Completion Certificate',
    type: 'CERTIFICATE OF TRAINING',
    badge: 'Foundation Phase',
    description: 'Awarded for completing the structured syllabus, video modules, and core coding quizzes of your track.',
    program: 'Full Stack Web Development',
    duration: '1 Month Training Phase',
    dates: 'Aug 1, 2026 to Aug 31, 2026',
    signatory1: { name: 'Dr. Vivek Sharma', title: 'Head of Engineering & Training' },
    signatory2: { name: 'Pooja Verma', title: 'Academic Lead & Mentor' },
    ribbonColor: 'from-amber-500 to-amber-600',
    borderAccent: 'border-amber-500/30',
  },
  {
    id: 'internship',
    title: 'Internship Completion Certificate',
    type: 'CERTIFICATE OF INTERNSHIP',
    badge: 'Official Credential',
    description: 'Issued once you complete your internship — final capstone project submitted, evaluated, and approved.',
    program: 'MERN Stack & Cloud Engineering',
    duration: '3 Months Internship',
    dates: 'Aug 1, 2026 to Oct 31, 2026',
    signatory1: { name: 'Dr. Vivek Sharma', title: 'Director of Technology & Labs' },
    signatory2: { name: 'Rashmi Samal', title: 'HR & Internship Coordinator' },
    ribbonColor: 'from-blue-600 to-indigo-700',
    borderAccent: 'border-blue-500/30',
  },
  {
    id: 'experience',
    title: 'Experience Certificate',
    type: 'EXPERIENCE LETTER & CREDENTIAL',
    badge: 'Work Tenure Proof',
    description: 'A formal experience certificate confirming your engineering role, hands-on tenure, and technical competencies.',
    program: 'Software Development Engineering (Intern)',
    duration: '6 Months Hands-On Track',
    dates: 'Jul 1, 2026 to Dec 31, 2026',
    signatory1: { name: 'Dr. Vivek Sharma', title: 'Chief Technology Officer' },
    signatory2: { name: 'Aakash Mehra', title: 'VP of Talent & People' },
    ribbonColor: 'from-emerald-600 to-teal-700',
    borderAccent: 'border-emerald-500/30',
  },
  {
    id: 'lor',
    title: 'Letter of Recommendation (LOR)',
    type: 'OFFICIAL RECOMMENDATION LETTER',
    badge: 'Excellence Honor',
    description: 'A personalized academic & job recommendation letter offered to strong performers by senior engineering mentors.',
    program: 'Next.js & Full-Stack Architecture',
    duration: 'Distinction Candidate',
    dates: 'Academic Batch 2026',
    signatory1: { name: 'Dr. Vivek Sharma', title: 'Technical Mentor & Evaluator' },
    signatory2: { name: 'Pooja Verma', title: 'Engineering Program Director' },
    ribbonColor: 'from-purple-600 to-violet-800',
    borderAccent: 'border-purple-500/30',
  },
];

export function CertificateSampleShowcase() {
  const { user } = useAuth();
  const [selectedCert, setSelectedCert] = useState<CertificateTier | null>(null);

  const activeStudentName = user?.name || 'Student Name';

  return (
    <div className="space-y-8">
      {/* 4 Cards Grid Like User's UI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SAMPLE_CERTIFICATES.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-soft hover:shadow-glow-brand transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
          >
            {/* Top Miniature Preview Box */}
            <div
              onClick={() => setSelectedCert(cert)}
              className="relative p-5 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white cursor-pointer overflow-hidden border-b border-slate-100 flex flex-col justify-center items-center text-center aspect-[4/3] group/preview"
            >
              {/* Decorative Certificate Foil Mock */}
              <div className="w-full h-full border border-slate-700/80 rounded-xl p-3 bg-slate-900/60 flex flex-col justify-between items-center relative">
                {/* Gold Crest Foil */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 text-slate-950 flex items-center justify-center font-bold text-[10px] shadow-sm">
                  ★
                </div>

                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {cert.type}
                  </div>
                  <div className="text-xs font-black text-white">{activeStudentName}</div>
                  <div className="text-[9px] text-blue-300 line-clamp-1">{cert.program}</div>
                </div>

                <div className="flex items-center justify-between w-full text-[8px] text-slate-400 border-t border-slate-800 pt-1">
                  <span>TechViora Official</span>
                  <span className="text-emerald-400">QR Verified</span>
                </div>

                {/* Hover Lock / Eye Overlay */}
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center rounded-xl opacity-0 group-hover/preview:opacity-100 transition-opacity">
                  <span className="px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <Eye className="w-3.5 h-3.5" /> Preview Sample
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Card Meta Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    {cert.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                    SAMPLE
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {cert.title}
                </h3>

                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold border border-slate-200 hover:border-blue-200 transition-all flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>Preview Sample</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SAMPLE CERTIFICATE FULLSCREEN MODAL (Pixel-Perfect from User Screenshot) */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col">
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                  Official Sample Preview
                </span>
                <span className="text-xs text-slate-500">{selectedCert.title}</span>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Certificate Canvas */}
            <div className="p-4 sm:p-8 overflow-y-auto bg-slate-100/60 flex items-center justify-center">
              <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border-4 border-double border-slate-300 relative overflow-hidden flex flex-col justify-between min-h-[500px]">
                {/* Left Blue Ribbon Pillar (Exact Design from Screenshot) */}
                <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-32 bg-gradient-to-b from-blue-950 via-slate-900 to-blue-950 text-white flex flex-col justify-between items-center py-6 px-2 z-10">
                  {/* Gold Seal Medallion */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 p-1 shadow-lg flex items-center justify-center text-center">
                    <div className="w-full h-full rounded-full border-2 border-dashed border-amber-800 flex flex-col items-center justify-center">
                      <span className="text-[8px] sm:text-[9px] font-black text-amber-950 tracking-wider uppercase leading-none">
                        TECHVIORA
                      </span>
                      <span className="text-amber-950 font-bold text-xs sm:text-sm my-0.5">★</span>
                      <span className="text-[7px] sm:text-[8px] font-bold text-amber-900 uppercase leading-none">
                        CERTIFIED
                      </span>
                    </div>
                  </div>

                  {/* Date & Issue Status */}
                  <div className="text-center space-y-1">
                    <div className="text-[9px] text-slate-400 uppercase font-mono">Issue Date</div>
                    <div className="text-xs font-bold text-white">Oct 31, 2026</div>
                  </div>

                  {/* Anti-Fraud QR Code */}
                  <div className="text-center">
                    <div className="p-1.5 rounded-lg bg-white shadow-sm inline-block">
                      <QrCode className="w-10 h-10 sm:w-12 sm:h-12 text-slate-900" />
                    </div>
                    <div className="text-[8px] font-mono text-slate-400 mt-1 uppercase tracking-wider">
                      Scan to Verify
                    </div>
                  </div>
                </div>

                {/* Right Top Ribbon Banner: SAMPLE */}
                <div className="absolute top-0 right-0 overflow-hidden w-28 h-28 z-20 pointer-events-none">
                  <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-extrabold text-[10px] tracking-widest uppercase text-center py-1.5 shadow-md rotate-45 translate-x-7 translate-y-4 w-36">
                    SAMPLE
                  </div>
                </div>

                {/* Main Certificate Content Area */}
                <div className="pl-28 sm:pl-36 pr-6 sm:pr-8 py-8 flex flex-col justify-between h-full space-y-6">
                  {/* Top Verified Credential Pill */}
                  <div className="flex justify-end pr-8">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Credential</span>
                    </div>
                  </div>

                  {/* Header Title */}
                  <div className="text-center space-y-1">
                    <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-serif">
                      Certificate
                    </h2>
                    <div className="text-xs sm:text-sm font-bold text-amber-600 uppercase tracking-widest pt-1">
                      {selectedCert.type}
                    </div>
                    <p className="text-xs text-slate-500 pt-1">
                      This official certificate is proudly awarded to
                    </p>
                  </div>

                  {/* Recipient Name in Signature Typography */}
                  <div className="text-center my-2">
                    <div className="text-2xl sm:text-4xl font-black text-blue-950 font-serif tracking-tight border-b-2 border-amber-300 pb-2 inline-block px-8">
                      {activeStudentName}
                    </div>
                  </div>

                  {/* Statement of Accomplishment */}
                  <div className="text-center max-w-xl mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed">
                    has successfully completed the <strong>{selectedCert.program}</strong> {selectedCert.duration.toLowerCase()} program at <strong>TechViora Engineering Labs</strong>, from <strong>{selectedCert.dates}</strong>.
                  </div>

                  {/* Dual Authorized Signatories */}
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200 text-center">
                    <div className="space-y-1">
                      <div className="font-serif italic text-lg text-blue-900 font-bold">
                        {selectedCert.signatory1.name}
                      </div>
                      <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                        {selectedCert.signatory1.name}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                        {selectedCert.signatory1.title}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="font-serif italic text-lg text-blue-900 font-bold">
                        {selectedCert.signatory2.name}
                      </div>
                      <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                        {selectedCert.signatory2.name}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                        {selectedCert.signatory2.title}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Footer Info */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500">
                    <div className="flex items-center gap-2">
                      <img src="/logo.png" alt="TechViora" className="h-4 w-auto object-contain" />
                      <span>• support@techviora.com</span>
                    </div>
                    <div>Bengaluru, Karnataka, India • www.techviora.com</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Tamper-proof verifiable credential sample preview.
              </span>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
