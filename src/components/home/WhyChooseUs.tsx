import React from 'react';
import {
  BookOpenCheck,
  CodeXml,
  FolderGit2,
  Clock4,
  LineChart,
  MessageSquare,
  DownloadCloud,
  QrCode,
  CheckCircle2,
} from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      title: 'Structured Curriculum',
      description: 'Progress from syntax fundamentals to real-world architectures in logical, bite-sized daily modules.',
      icon: BookOpenCheck,
      color: 'from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30',
    },
    {
      title: 'Practical Assignments',
      description: 'Test your grasp with hands-on coding exercises requiring real GitHub repository submissions.',
      icon: CodeXml,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    },
    {
      title: 'Real Projects',
      description: 'Build full-stack, deployable capstone applications you can proudly display on your resume and portfolio.',
      icon: FolderGit2,
      color: 'from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30',
    },
    {
      title: 'Flexible Learning',
      description: 'Study at your own schedule without interfering with your university lectures, labs, or semester exams.',
      icon: Clock4,
      color: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
    },
    {
      title: 'Progress Tracking',
      description: 'Detailed analytics on completed lessons, pending tasks, quiz scores, and certificate readiness.',
      icon: LineChart,
      color: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
    },
    {
      title: 'Mentor & Admin Feedback',
      description: 'Constructive code evaluation, line-by-line feedback, and clear guidance if an assignment needs revision.',
      icon: MessageSquare,
      color: 'from-indigo-500/20 to-violet-500/10 text-indigo-400 border-indigo-500/30',
    },
    {
      title: 'Downloadable Resources',
      description: 'Full starter code templates, architecture diagrams, cheatsheets, and reference slides.',
      icon: DownloadCloud,
      color: 'from-rose-500/20 to-red-500/10 text-rose-400 border-rose-500/30',
    },
    {
      title: 'Verifiable Certificates',
      description: 'Every certificate features an anti-fraud QR code linking to our public verification portal.',
      icon: QrCode,
      color: 'from-emerald-500/20 to-green-500/10 text-emerald-400 border-emerald-500/30',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
            Engineered For Student Success
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why Engineering Students Choose <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">TechViora</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 mt-4 leading-relaxed">
            We focus strictly on practical skill acquisition and engineering excellence with zero gimmicks or misleading claims.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-800 hover:border-blue-500/40 shadow-soft-lg hover:shadow-glow transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 group-hover:text-slate-300 transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Industry Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
