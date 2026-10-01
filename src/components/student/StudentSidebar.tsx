'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/Providers';
import {
  LayoutDashboard,
  Layers,
  BookOpen,
  FileCode,
  FolderGit2,
  Award,
  LifeBuoy,
  User,
  LogOut,
  Code2,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export function StudentSidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navLinks = [
    { label: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
    { label: 'My Internships', href: '/student/internships', icon: Layers },
    { label: 'Assignments', href: '/student/assignments', icon: FileCode },
    { label: 'Projects & Capstones', href: '/student/projects', icon: FolderGit2 },
    { label: 'My Certificates', href: '/student/certificates', icon: Award },
    { label: 'Support Desk', href: '/student/support', icon: LifeBuoy },
    { label: 'My Profile', href: '/student/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo */}
          <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <div className="p-1.5 rounded-xl bg-white/95 inline-block">
                <img
                  src="/logo.png"
                  alt="TechViora"
                  className="h-6 w-auto object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Student Status Tag */}
          <div className="p-4 mx-3 my-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-400 font-bold flex items-center justify-center text-xs">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{user?.name}</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5 font-medium">
                <CheckCircle2 className="w-3 h-3" /> Enrolled Student
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1 mt-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== '/student/dashboard' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/internships"
            className="flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            + Browse More Programs
          </Link>

          <button
            onClick={() => logout()}
            className="flex items-center gap-2 w-full px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
