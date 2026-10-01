'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/Providers';
import { Menu, Bell, User, LogOut, CheckCircle2 } from 'lucide-react';

export function StudentHeader({
  onMenuClick,
  notifications = [],
}: {
  onMenuClick: () => void;
  notifications?: any[];
}) {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

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

        <div className="hidden sm:block">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Student Portal
          </span>
          <h2 className="text-sm font-bold text-slate-900 leading-tight">
            Learning & Project Center
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 relative transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 z-50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {notifications.length} recent
                </span>
              </div>

              {notifications.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">
                  No new notifications
                </p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {notifications.slice(0, 5).map((n: any, idx: number) => (
                    <div
                      key={n._id || idx}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1"
                    >
                      <div className="font-semibold text-slate-900">{n.title}</div>
                      <p className="text-[11px] text-slate-500">{n.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <Link
            href="/student/profile"
            className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs"
          >
            {user?.name?.charAt(0) || 'S'}
          </Link>
          <div className="hidden md:block text-left text-xs">
            <div className="font-bold text-slate-900 leading-tight">{user?.name}</div>
            <div className="text-[10px] text-slate-500">{user?.email}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
