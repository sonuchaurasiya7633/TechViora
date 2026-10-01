'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, ShieldCheck, ExternalLink } from 'lucide-react';
import { useAuth } from '@/components/Providers';

export function AdminHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">
            Academic Operations
          </span>
          <h2 className="text-sm font-bold text-slate-900 leading-tight">
            Admin Management Console
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>

        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="w-7 h-7 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <span className="font-semibold text-slate-800 hidden md:inline">
            {user?.name || 'Administrator'}
          </span>
        </div>
      </div>
    </header>
  );
}
