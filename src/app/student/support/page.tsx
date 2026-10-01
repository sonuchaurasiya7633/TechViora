'use client';

import React, { useEffect, useState } from 'react';
import { LifeBuoy, Plus, MessageSquare, CheckCircle2, Clock, Send, Loader2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function StudentSupportPage() {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<any[]>([]);
  const [showNewModal, setShowNewModal] = useState(false);

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('general');
  const [priority, setPriority] = useState('medium');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchTickets = async () => {
    try {
      const res = await fetch('/api/student/support');
      const json = await res.json();
      if (json.success) {
        setTickets(json.tickets || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/student/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, category, priority, message }),
      });
      const json = await res.json();
      if (json.success) {
        setShowNewModal(false);
        setSubject('');
        setMessage('');
        fetchTickets();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Support Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Need help with an assignment doubt, project evaluation, or certificate verification? Open a ticket.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" /> Open New Ticket
        </button>
      </div>

      {tickets.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
          <LifeBuoy className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-slate-900">No Support Tickets</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You have no open tickets. Click "Open New Ticket" if you need mentor or technical assistance.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((t) => (
            <div
              key={t._id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {t.ticketId}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                    {t.category}
                  </span>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                  t.status === 'resolved'
                    ? 'bg-emerald-100 text-emerald-800'
                    : t.status === 'in_progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {t.status.replace('_', ' ')}
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900">{t.subject}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t.message}</p>

              {t.responses && t.responses.length > 1 && (
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-500">Responses:</div>
                  {t.responses.slice(1).map((resp: any, rIdx: number) => (
                    <div
                      key={rIdx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1"
                    >
                      <div className="font-semibold text-slate-800 flex items-center justify-between">
                        <span>{resp.senderName} ({resp.senderRole})</span>
                        <span className="text-[10px] text-slate-400">{formatDate(resp.createdAt)}</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">{resp.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* New Ticket Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Create Support Ticket</h3>
              <button
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="general">General Inquiry</option>
                  <option value="curriculum">Curriculum / Lesson Doubt</option>
                  <option value="assignment">Assignment Evaluation</option>
                  <option value="certificate">Certificate Verification</option>
                  <option value="payment">Payment Issue</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Question on React Custom Hooks assignment"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Detailed Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your query or paste code link..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Support Ticket'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
