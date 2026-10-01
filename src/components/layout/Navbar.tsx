'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/Providers';
import {
  Code2,
  Menu,
  X,
  User,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  ArrowRight,
  LogOut,
  FolderGit2,
  HelpCircle,
  PhoneCall,
  LayoutDashboard,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Explore 40+ Domains', href: '/internships', icon: Layers },
    { label: 'Plans & Pricing', href: '/pricing' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Capstone Projects', href: '/projects' },
    { label: 'Reviews', href: '/student-reviews' },
    { label: 'Articles', href: '/blog' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav shadow-soft-md py-3'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="TechViora"
              className="h-8 sm:h-9 w-auto object-contain hover:scale-105 transition-transform"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-xl text-[13.5px] font-bold tracking-tight transition-all duration-200 ${
                    isActive
                      ? 'text-brand-600 bg-brand-50/90 shadow-xs'
                      : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50/80'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Verify Pill */}
            <Link
              href="/verify"
              className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50/90 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 hover:shadow-xs transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verify Certificate
            </Link>
          </nav>

          {/* Desktop Auth / Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2.5">
                {user.role === 'admin' || user.role === 'superadmin' ? (
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 shadow-md shadow-slate-900/20 transition-all"
                  >
                    <LayoutDashboard className="w-4 h-4 text-accent-cyan" />
                    Admin Portal
                  </Link>
                ) : (
                  <Link
                    href="/student/dashboard"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 text-white text-xs font-bold hover:from-brand-700 hover:to-brand-800 shadow-glow-brand transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    Student Dashboard
                  </Link>
                )}

                <button
                  onClick={() => logout()}
                  title="Log out"
                  className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-200"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="text-xs font-bold text-slate-700 hover:text-brand-600 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/internships"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white text-xs font-bold shadow-glow-brand transition-all hover:scale-102 hover:gap-2.5"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {user && (
              <Link
                href={user.role === 'student' ? '/student/dashboard' : '/admin'}
                className="px-3 py-1.5 text-xs font-bold bg-brand-50 text-brand-700 rounded-xl border border-brand-200"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200/80"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <Link
              href="/internships"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-slate-50 hover:bg-brand-50 text-slate-800 hover:text-brand-600 text-xs font-bold flex flex-col gap-1.5 transition-colors border border-slate-100"
            >
              <Layers className="w-4 h-4 text-brand-600" />
              <span>40+ Domains</span>
            </Link>
            <Link
              href="/verify"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex flex-col gap-1.5 transition-colors border border-emerald-200/60"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verify Certificate</span>
            </Link>
          </div>

          <div className="space-y-1 pt-1">
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
            >
              Pricing & Duration Plans
            </Link>
            <Link
              href="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
            >
              How Internship Works
            </Link>
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
            >
              Capstone Projects
            </Link>
            <Link
              href="/student-reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
            >
              Student Reviews
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
            >
              Technical Articles & Guides
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
            >
              Contact Support
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            {user ? (
              <>
                <Link
                  href={user.role === 'student' ? '/student/dashboard' : '/admin'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl bg-brand-600 text-white font-bold text-sm shadow-md"
                >
                  Open {user.role === 'student' ? 'Student' : 'Admin'} Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-center py-2.5 rounded-xl bg-rose-50 text-rose-600 font-bold text-xs"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors"
                >
                  Student Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
