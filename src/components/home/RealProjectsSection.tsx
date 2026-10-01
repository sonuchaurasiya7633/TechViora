import React from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  LayoutDashboard,
  UserCheck,
  CheckSquare,
  CloudSun,
  Bot,
  Users,
  ArrowRight,
  Github,
  Globe,
} from 'lucide-react';

export function RealProjectsSection() {
  const projects = [
    {
      title: 'Full-Stack E-Commerce Platform',
      category: 'Web & MERN Stack',
      description: 'Production catalog with filters, shopping cart persistence, payment gateway integration, and admin inventory control.',
      tech: ['React', 'Node.js', 'MongoDB', 'Razorpay', 'Tailwind CSS'],
      icon: ShoppingBag,
      gradient: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400',
    },
    {
      title: 'SaaS Analytics & Admin Dashboard',
      category: 'Frontend & Next.js',
      description: 'Rich metrics visualization with Recharts, user role permissions, dynamic data tables, and exportable PDF reports.',
      tech: ['Next.js 15', 'TypeScript', 'Recharts', 'Lucide React'],
      icon: LayoutDashboard,
      gradient: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400',
    },
    {
      title: 'AI Document Intelligence RAG Engine',
      category: 'Generative AI & Python',
      description: 'Upload PDFs and perform context-aware conversational Q&A using LangChain, OpenAI embeddings, and Chroma vector store.',
      tech: ['Python', 'LangChain', 'OpenAI', 'ChromaDB', 'Streamlit'],
      icon: Bot,
      gradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    },
    {
      title: 'Real-Time Collaborative Task Manager',
      category: 'Full Stack & APIs',
      description: 'Kanban boards, real-time team assignment updates, activity logs, priority filters, and deadline notifications.',
      tech: ['React', 'Express', 'WebSockets', 'MongoDB'],
      icon: CheckSquare,
      gradient: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    },
    {
      title: 'Weather & Climate Telemetry Forecaster',
      category: 'APIs & Data Analysis',
      description: 'Live meteorological API integration, geolocation search, multi-day radar graphs, and interactive charting.',
      tech: ['JavaScript', 'Chart.js', 'OpenWeather API', 'CSS Grid'],
      icon: CloudSun,
      gradient: 'from-cyan-500/20 to-sky-500/10 border-cyan-500/30 text-cyan-400',
    },
    {
      title: 'Multi-Tenant CRM Customer System',
      category: 'Backend & Databases',
      description: 'Lead tracking pipeline, automated transactional emails, multi-user role authentication, and customer interaction logs.',
      tech: ['Node.js', 'PostgreSQL', 'Prisma', 'JWT', 'Nodemailer'],
      icon: Users,
      gradient: 'from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-400',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
              Portfolio Builders
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Real Capstone Projects <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">You Build</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-400 mt-3 max-w-xl leading-relaxed">
              Graduate with deployable applications that solve actual engineering problems and demonstrate verified competence to interviewers.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold text-white border border-slate-700 transition-all hover:border-blue-500/40 hover:gap-3 shrink-0"
          >
            Explore all project ideas <ArrowRight className="w-4 h-4 text-blue-400" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-slate-950/70 backdrop-blur-sm rounded-2xl p-7 border border-slate-800 hover:border-blue-500/40 shadow-soft-lg hover:shadow-glow transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} border flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
                      {p.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-blue-400 transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px] font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
