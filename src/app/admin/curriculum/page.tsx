'use client';

import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Plus,
  PlayCircle,
  FileCode,
  FolderGit2,
  HelpCircle,
  Trash2,
  Edit2,
  Calendar,
  Sparkles,
  Loader2,
  Video,
  FileText,
  Code2,
} from 'lucide-react';

export default function AdminCurriculumBuilderPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [selectedProgramId, setSelectedProgramId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [curriculumData, setCurriculumData] = useState<any>(null);

  // Modal State for adding Module / Lesson / Assignment / Project / Quiz
  const [modalType, setModalType] = useState<'module' | 'lesson' | 'assignment' | 'project' | 'quiz' | null>(null);
  const [targetModuleId, setTargetModuleId] = useState<string>('');
  const [saving, setSaving] = useState(false);

  // Form fields
  const [itemTitle, setItemTitle] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [contentType, setContentType] = useState<'video' | 'article' | 'code' | 'pdf'>('video');
  const [videoUrl, setVideoUrl] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [unlockDay, setUnlockDay] = useState(1);
  const [durationMinutes, setDurationMinutes] = useState(20);

  // Assignment / Project max score
  const [maxScore, setMaxScore] = useState(100);
  const [requirements, setRequirements] = useState('');

  // Fetch all programs
  useEffect(() => {
    fetch('/api/admin/programs')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.programs?.length > 0) {
          setPrograms(data.programs);
          setSelectedProgramId(data.programs[0]._id);
        }
      });
  }, []);

  // Fetch curriculum for selected program
  const fetchCurriculum = async () => {
    if (!selectedProgramId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/curriculum?programId=${selectedProgramId}`);
      const json = await res.json();
      if (json.success) {
        setCurriculumData(json);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurriculum();
  }, [selectedProgramId]);

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload: any = {
      type: modalType,
      programId: selectedProgramId,
      moduleId: targetModuleId || undefined,
      title: itemTitle,
      description: itemDesc,
    };

    if (modalType === 'lesson') {
      payload.contentType = contentType;
      payload.videoUrl = videoUrl;
      payload.articleContent = articleContent;
      payload.unlockDay = unlockDay;
      payload.durationMinutes = durationMinutes;
      if (codeSnippet) {
        payload.sourceCodeSnippet = { language: codeLanguage, code: codeSnippet, filename: 'example.js' };
      }
    } else if (modalType === 'assignment') {
      payload.maxScore = maxScore;
      payload.requirements = requirements.split('\n').filter(Boolean);
    } else if (modalType === 'project') {
      payload.maxMarks = maxScore;
      payload.requirements = requirements.split('\n').filter(Boolean);
    } else if (modalType === 'quiz') {
      payload.questions = [
        {
          question: itemTitle,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 0,
          marks: 5,
        },
      ];
    }

    try {
      const res = await fetch('/api/admin/curriculum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setModalType(null);
        setItemTitle('');
        setItemDesc('');
        setVideoUrl('');
        setArticleContent('');
        setCodeSnippet('');
        fetchCurriculum();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (type: string, id: string) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      await fetch(`/api/admin/curriculum?type=${type}&id=${id}`, { method: 'DELETE' });
      fetchCurriculum();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Curriculum Builder & Daily Content Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Build day-by-day modules, schedule daily video uploads, coding exercises, quizzes, and capstones.
          </p>
        </div>

        {/* Program Dropdown Selector */}
        <select
          value={selectedProgramId}
          onChange={(e) => setSelectedProgramId(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
        >
          {programs.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-soft flex items-center justify-between">
        <div className="text-xs font-semibold text-slate-700">
          Managing Curriculum for: <strong className="text-blue-600 font-bold">{programs.find(p => p._id === selectedProgramId)?.title}</strong>
        </div>

        <button
          onClick={() => {
            setModalType('module');
            setTargetModuleId('');
            setItemTitle('');
            setItemDesc('');
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Add Module
        </button>
      </div>

      {/* Curriculum Hierarchy Tree */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
        </div>
      ) : !curriculumData?.modules || curriculumData.modules.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-slate-900">No Modules Created Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Click "+ Add Module" to start structuring your daily lessons and assignments for this domain.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {curriculumData.modules.map((mod: any, mIdx: number) => {
            const modLessons = curriculumData.lessons?.filter((l: any) => l.moduleId === mod._id) || [];
            const modAssignments = curriculumData.assignments?.filter((a: any) => a.moduleId === mod._id) || [];
            const modQuizzes = curriculumData.quizzes?.filter((q: any) => q.moduleId === mod._id) || [];

            return (
              <div
                key={mod._id}
                className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-4"
              >
                {/* Module Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                      {mIdx + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-slate-900">{mod.title}</h3>
                      <p className="text-xs text-slate-500">{mod.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setTargetModuleId(mod._id);
                        setModalType('lesson');
                        setItemTitle('');
                        setItemDesc('');
                        setVideoUrl('');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold"
                    >
                      + Lesson
                    </button>
                    <button
                      onClick={() => {
                        setTargetModuleId(mod._id);
                        setModalType('assignment');
                        setItemTitle('');
                        setItemDesc('');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold"
                    >
                      + Assignment
                    </button>
                    <button
                      onClick={() => {
                        setTargetModuleId(mod._id);
                        setModalType('quiz');
                        setItemTitle('');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold"
                    >
                      + Quiz
                    </button>
                    <button
                      onClick={() => handleDeleteItem('module', mod._id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                      title="Delete Module"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sub Items (Lessons, Assignments, Quizzes) */}
                <div className="space-y-2 pl-4 border-l-2 border-slate-100">
                  {modLessons.map((les: any, lIdx: number) => (
                    <div
                      key={les._id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs"
                    >
                      <div className="flex items-center gap-2.5 font-medium text-slate-800">
                        <PlayCircle className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Lesson {lIdx + 1}: {les.title}</span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-200/60 px-1.5 py-0.2 rounded">
                          Day {les.unlockDay}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-500 font-mono capitalize">{les.contentType}</span>
                        <button
                          onClick={() => handleDeleteItem('lesson', les._id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {modAssignments.map((asg: any) => (
                    <div
                      key={asg._id}
                      className="flex items-center justify-between p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 font-medium"
                    >
                      <span className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-amber-600" />
                        Assignment: {asg.title} ({asg.maxScore || 100} Marks)
                      </span>
                      <button
                        onClick={() => handleDeleteItem('assignment', asg._id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {modQuizzes.map((qz: any) => (
                    <div
                      key={qz._id}
                      className="flex items-center justify-between p-3 rounded-xl bg-purple-50/70 border border-purple-200/80 text-xs text-purple-950 font-medium"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-purple-600" />
                        Quiz: {qz.title} ({qz.questions?.length || 1} MCQs)
                      </span>
                      <button
                        onClick={() => handleDeleteItem('quiz', qz._id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Creation Modal */}
      {modalType && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 capitalize">
                Add {modalType} to Curriculum
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder={`Title of this ${modalType}`}
                  value={itemTitle}
                  onChange={(e) => setItemTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Description / Instructions
                </label>
                <textarea
                  rows={3}
                  placeholder="Summary or guidance..."
                  value={itemDesc}
                  onChange={(e) => setItemDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {modalType === 'lesson' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Content Type
                      </label>
                      <select
                        value={contentType}
                        onChange={(e) => setContentType(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="video">Video Lecture</option>
                        <option value="article">Article / Reading</option>
                        <option value="code">Code Walkthrough</option>
                        <option value="pdf">PDF Document</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Drip Unlock Day (Schedule)
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={unlockDay}
                        onChange={(e) => setUnlockDay(parseInt(e.target.value, 10))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {contentType === 'video' && (
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Video Embed URL (YouTube/Vimeo/Cloudinary)
                      </label>
                      <input
                        type="url"
                        placeholder="https://www.youtube.com/embed/..."
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-mono"
                      />
                    </div>
                  )}

                  {contentType === 'article' && (
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Article Body Text
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Write detailed notes for the student..."
                        value={articleContent}
                        onChange={(e) => setArticleContent(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {contentType === 'code' && (
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">
                        Source Code Snippet
                      </label>
                      <textarea
                        rows={5}
                        placeholder="// Paste runnable sample code..."
                        value={codeSnippet}
                        onChange={(e) => setCodeSnippet(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-blue-500 bg-slate-900 text-white"
                      />
                    </div>
                  )}
                </>
              )}

              {(modalType === 'assignment' || modalType === 'project') && (
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Evaluation Criteria / Requirements (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Must include unit tests&#10;Clean modular components&#10;Deployed live URL"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {saving ? 'Creating Item...' : `Save ${modalType}`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
