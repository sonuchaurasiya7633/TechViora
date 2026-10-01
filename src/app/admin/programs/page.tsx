'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  CheckCircle2,
  Search,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { IconRenderer } from '@/components/layout/IconRenderer';

export default function AdminProgramsPage() {
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Editor Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [shortDescription, setShortDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [skillsCovered, setSkillsCovered] = useState('');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [status, setStatus] = useState('published');

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/programs');
      const json = await res.json();
      if (json.success) {
        setPrograms(json.programs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const openCreateModal = () => {
    setEditingProgram(null);
    setTitle('');
    setSlug('');
    setCategory('Web Development');
    setShortDescription('');
    setDetailedDescription('');
    setTechnologies('React, Node.js, MongoDB');
    setSkillsCovered('Full Stack Architecture, REST APIs');
    setDifficulty('Intermediate');
    setIsFeatured(false);
    setIsPopular(false);
    setStatus('published');
    setShowModal(true);
  };

  const openEditModal = (prog: any) => {
    setEditingProgram(prog);
    setTitle(prog.title || '');
    setSlug(prog.slug || '');
    setCategory(prog.category || 'Web Development');
    setShortDescription(prog.shortDescription || '');
    setDetailedDescription(prog.detailedDescription || '');
    setTechnologies(prog.technologies?.join(', ') || '');
    setSkillsCovered(prog.skillsCovered?.join(', ') || '');
    setDifficulty(prog.difficulty || 'Intermediate');
    setIsFeatured(prog.isFeatured || false);
    setIsPopular(prog.isPopular || false);
    setStatus(prog.status || 'published');
    setShowModal(true);
  };

  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title,
      slug,
      category,
      shortDescription,
      detailedDescription,
      technologies: technologies.split(',').map((t) => t.trim()).filter(Boolean),
      skillsCovered: skillsCovered.split(',').map((s) => s.trim()).filter(Boolean),
      difficulty,
      isFeatured,
      isPopular,
      status,
    };

    try {
      let res;
      if (editingProgram) {
        res = await fetch('/api/admin/programs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: editingProgram._id, ...payload }),
        });
      } else {
        res = await fetch('/api/admin/programs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const json = await res.json();
      if (json.success) {
        setShowModal(false);
        fetchPrograms();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProgram = async (id: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return;
    try {
      const res = await fetch(`/api/admin/programs?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        fetchPrograms();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = programs.filter((p) => {
    const matchesSearch =
      !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies?.some((t: string) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = !categoryFilter || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Internship Program Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Create, customize, and manage all {programs.length} internship domains and curricula.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" /> Create New Domain
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-soft flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search domain by title or technology..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Programs Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="py-16 text-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            No programs found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Program Title</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Modules / Lessons</th>
                  <th className="px-6 py-3.5">Enrolled</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((prog) => (
                  <tr key={prog._id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        {prog.title}
                        {prog.isPopular && (
                          <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 text-[10px]">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">/{prog.slug}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                        {prog.technologies?.slice(0, 4).join(', ')}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                        {prog.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-mono text-slate-600">
                      {prog.modulesCount || 0} mods • {prog.lessonsCount || 0} lessons
                    </td>

                    <td className="px-6 py-4 font-bold text-slate-900">
                      {prog.enrollmentCount || 0}
                    </td>

                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        prog.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {prog.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/internships/${prog.slug}`}
                        target="_blank"
                        className="p-1.5 text-slate-400 hover:text-blue-600 inline-block"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => openEditModal(prog)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 inline-block"
                        title="Edit Program"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProgram(prog._id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 inline-block"
                        title="Delete Program"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Program Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                {editingProgram ? 'Edit Internship Domain' : 'Create New Internship Domain'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Program Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MERN Stack Development"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Slug (URL Key) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="mern-stack-development"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Full Stack Development">Full Stack Development</option>
                    <option value="Core Engineering">Core Engineering</option>
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Security & Cloud">Security & Cloud</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Design & Product">Design & Product</option>
                    <option value="Quality Assurance">Quality Assurance</option>
                    <option value="Marketing & Growth">Marketing & Growth</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Difficulty Level *
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Technologies (Comma separated) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="React, Node.js, Express, MongoDB, Tailwind CSS"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Short Description *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Concise 1-2 sentence description..."
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Complete program overview and engineering methodology..."
                  value={detailedDescription}
                  onChange={(e) => setDetailedDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Mark as Popular</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-800">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {saving ? 'Saving...' : editingProgram ? 'Save Program Changes' : 'Create Program'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
