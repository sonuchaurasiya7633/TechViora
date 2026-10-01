'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/Providers';
import {
  LayoutDashboard,
  Users,
  Layers,
  BookOpen,
  FileCode,
  FolderGit2,
  HelpCircle,
  CreditCard,
  Award,
  Bell,
  Star,
  Tag,
  FileText,
  LifeBuoy,
  Settings,
  LogOut,
  Code2,
  ShieldCheck,
  DollarSign,
} from 'lucide-react';

export function AdminSidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (o: boolean) => void;
}) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const navLinks = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Students', href: '/admin/students', icon: Users },
    { label: 'Programs (40+)', href: '/admin/programs', icon: Layers },
    { label: 'Curriculum Builder', href: '/admin/curriculum', icon: BookOpen },
    { label: 'Assignments', href: '/admin/assignments', icon: FileCode },
    { label: 'Projects & Capstones', href: '/admin/projects', icon: FolderGit2 },
    { label: 'Enrollments', href: '/admin/enrollments', icon: Layers },
    { label: 'Payments', href: '/admin/payments', icon: DollarSign },
    { label: 'Certificates', href: '/admin/certificates', icon: Award },
    { label: 'Coupons', href: '/admin/coupons', icon: Tag },
    { label: 'Announcements', href: '/admin/announcements', icon: Bell },
    { label: 'Student Reviews', href: '/admin/reviews', icon: Star },
    { label: 'Blog CMS', href: '/admin/blogs', icon: FileText },
    { label: 'Platform Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-950 text-slate-300 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
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

          {/* Admin User Card */}
          <div className="p-3 mx-3 my-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <div className="font-bold text-white truncate">{user?.name || 'Administrator'}</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3 h-3" /> Superadmin
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-0.5 mt-2 text-xs">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
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
        <div className="p-3 border-t border-slate-800 flex items-center justify-between">
          <Link
            href="/student/dashboard"
            className="text-[11px] text-slate-400 hover:text-white font-medium"
          >
            Student View
          </Link>
          <button
            onClick={() => logout()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
