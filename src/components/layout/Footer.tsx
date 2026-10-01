import React from 'react';
import Link from 'next/link';
import {
  Code2,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  ArrowUpRight,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="p-2.5 rounded-2xl bg-white/95 inline-block shadow-sm">
                <img
                  src="/logo.png"
                  alt="TechViora"
                  className="h-8 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering B.Tech, BCA, MCA, and tech students through structured, industry-curated internship programs, real project assignments, line-by-line mentor reviews, and verifiably authentic credentials.
            </p>

            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-sky-500 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Fake Promises • Realistic Project Learning</span>
              </div>
            </div>
          </div>

          {/* Popular Programs */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Top Domains
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/internships/mern-stack-development" className="hover:text-blue-400 transition-colors">
                  MERN Stack Development
                </Link>
              </li>
              <li>
                <Link href="/internships/nextjs-development" className="hover:text-blue-400 transition-colors">
                  Next.js App Router
                </Link>
              </li>
              <li>
                <Link href="/internships/python-development" className="hover:text-blue-400 transition-colors">
                  Python & FastAPI
                </Link>
              </li>
              <li>
                <Link href="/internships/java-development" className="hover:text-blue-400 transition-colors">
                  Java & Spring Boot
                </Link>
              </li>
              <li>
                <Link href="/internships/data-science" className="hover:text-blue-400 transition-colors">
                  Data Science & Analytics
                </Link>
              </li>
              <li>
                <Link href="/internships/machine-learning" className="hover:text-blue-400 transition-colors">
                  Machine Learning & AI
                </Link>
              </li>
              <li>
                <Link href="/internships/ui-ux-design" className="hover:text-blue-400 transition-colors">
                  UI/UX Design in Figma
                </Link>
              </li>
              <li>
                <Link href="/internships" className="text-blue-400 font-medium inline-flex items-center gap-1 hover:underline">
                  View All 40+ Domains <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Platform & Verification
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/verify" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Verify Certificate
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-blue-400 transition-colors">
                  How Internship Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-400 transition-colors">
                  Duration & Pricing
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-blue-400 transition-colors">
                  Live Project Portfolio
                </Link>
              </li>
              <li>
                <Link href="/student-reviews" className="hover:text-blue-400 transition-colors">
                  Student Feedback
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="hover:text-blue-400 transition-colors">
                  Certificate Format
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition-colors">
                  Engineering Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Office */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Academic Support
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <a href="mailto:support@techviora.com" className="hover:text-white transition-colors">
                  support@techviora.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <a href="tel:+917633036074" className="hover:text-white transition-colors font-medium">
                  +91 7633036074 (Academic Support)
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>TechViora Tech Hub, Cyber Park, Bangalore 560100, India</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors"
              >
                Contact Support Desk →
              </Link>
            </div>
          </div>
        </div>

        {/* Legal & Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} TechViora Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/refund-policy" className="hover:text-slate-300 transition-colors">
              Refund Policy
            </Link>
            <Link href="/verify" className="hover:text-slate-300 transition-colors">
              QR Certificate Validation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
