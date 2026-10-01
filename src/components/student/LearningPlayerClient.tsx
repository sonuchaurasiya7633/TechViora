'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  PlayCircle,
  CheckCircle2,
  FileCode,
  FolderGit2,
  Award,
  ChevronLeft,
  ChevronRight,
  DownloadCloud,
  ExternalLink,
  Terminal,
  BookOpen,
  Sparkles,
  HelpCircle,
  Check,
  AlertCircle,
  Loader2,
  Lock,
  Layers,
  FileText,
  Send,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LearningPlayerClientProps {
  enrollmentId: string;
}

export function LearningPlayerClient({ enrollmentId }: LearningPlayerClientProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [activeLessonId, setActiveLessonId] = useState<string>('');
  const [completing, setCompleting] = useState(false);

  // Modals & Drawers
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizResult, setQuizResult] = useState<any>(null);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);

  const [activeAssignment, setActiveAssignment] = useState<any>(null);
  const [asgGithubUrl, setAsgGithubUrl] = useState('');
  const [asgLiveUrl, setAsgLiveUrl] = useState('');
  const [asgTextAnswer, setAsgTextAnswer] = useState('');
  const [submittingAsg, setSubmittingAsg] = useState(false);
  const [asgSuccess, setAsgSuccess] = useState(false);

  const [activeProject, setActiveProject] = useState<any>(null);
  const [projGithubUrl, setProjGithubUrl] = useState('');
  const [projLiveUrl, setProjLiveUrl] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [submittingProj, setSubmittingProj] = useState(false);
  const [projSuccess, setProjSuccess] = useState(false);

  const [generatingCert, setGeneratingCert] = useState(false);
  const [certSuccess, setCertSuccess] = useState<any>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/student/internships/${enrollmentId}/learn`);
      const json = await res.json();
      if (json.success) {
        setData(json);
        if (!activeLessonId && json.allLessons && json.allLessons.length > 0) {
          // If student has last accessed lesson or default to first
          const lastId = json.progress?.lastAccessedLesson;
          if (lastId && json.allLessons.some((l: any) => l._id === lastId)) {
            setActiveLessonId(lastId);
          } else {
            setActiveLessonId(json.allLessons[0]._id);
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [enrollmentId]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const { enrollment, curriculum, allLessons, projects, progress, assignmentSubmissions, projectSubmissions, quizAttempts } = data;

  const currentLesson = allLessons.find((l: any) => l._id === activeLessonId) || allLessons[0];
  const currentLessonIndex = allLessons.findIndex((l: any) => l._id === activeLessonId);

  const isCurrentLessonCompleted = progress?.completedLessons?.includes(currentLesson?._id);

  const handleMarkComplete = async () => {
    if (!currentLesson) return;
    setCompleting(true);
    try {
      const res = await fetch('/api/student/lesson/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enrollmentId,
          lessonId: currentLesson._id,
        }),
      });
      const resJson = await res.json();
      if (resJson.success) {
        if (!progress.completedLessons.includes(currentLesson._id)) {
          progress.completedLessons.push(currentLesson._id);
        }
        progress.progressPercent = resJson.progressPercent;
        enrollment.progressPercent = resJson.progressPercent;

        // Auto move to next lesson if available
        if (currentLessonIndex < allLessons.length - 1) {
          setActiveLessonId(allLessons[currentLessonIndex + 1]._id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompleting(false);
    }
  };

  // Submit Assignment
  const handleAssignmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingAsg(true);
    try {
      const res = await fetch('/api/student/assignment/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignmentId: activeAssignment._id,
          enrollmentId,
          githubUrl: asgGithubUrl,
          liveUrl: asgLiveUrl,
          textAnswer: asgTextAnswer,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setAsgSuccess(true);
        setTimeout(() => {
          setActiveAssignment(null);
          setAsgSuccess(false);
          setAsgGithubUrl('');
          setAsgLiveUrl('');
          setAsgTextAnswer('');
          fetchData();
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingAsg(false);
    }
  };

  // Submit Project
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingProj(true);
    try {
      const res = await fetch('/api/student/project/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: activeProject._id,
          enrollmentId,
          githubUrl: projGithubUrl,
          liveUrl: projLiveUrl,
          description: projDesc,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setProjSuccess(true);
        setTimeout(() => {
          setActiveProject(null);
          setProjSuccess(false);
          setProjGithubUrl('');
          setProjLiveUrl('');
          setProjDesc('');
          fetchData();
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingProj(false);
    }
  };

  // Submit Quiz
  const handleQuizSubmit = async () => {
    if (!activeQuiz) return;
    setSubmittingQuiz(true);
    try {
      const res = await fetch('/api/student/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: activeQuiz._id,
          enrollmentId,
          selectedAnswers: quizAnswers,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setQuizResult(json);
        if (json.passed) {
          confetti({ particleCount: 80, spread: 60 });
        }
        fetchData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingQuiz(false);
    }
  };

  // Generate Certificate
  const handleGenerateCertificate = async () => {
    setGeneratingCert(true);
    try {
      const res = await fetch('/api/student/certificate/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentId }),
      });
      const json = await res.json();
      if (json.success) {
        setCertSuccess(json.certificate);
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        fetchData();
      } else {
        alert(json.message || 'Criteria not met yet');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingCert(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Breadcrumb & Progress Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/student/internships" className="text-blue-600 hover:underline">
              Internships
            </Link>
            <span>/</span>
            <span>{enrollment.program?.title}</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
            {enrollment.program?.title} ({enrollment.planDuration})
          </h1>
        </div>

        {/* Progress & Certificate CTA */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-700">
              Progress: <strong className="text-blue-600 font-bold">{progress?.progressPercent || 0}%</strong>
            </div>
            <div className="w-28 sm:w-36 bg-slate-100 h-2 rounded-full overflow-hidden mt-1">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress?.progressPercent || 0}%` }}
              />
            </div>
          </div>

          {(progress?.progressPercent || 0) >= 80 && (
            <button
              onClick={handleGenerateCertificate}
              disabled={generatingCert}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              {enrollment.certificateIssued ? 'View Certificate' : 'Unlock Certificate'}
            </button>
          )}
        </div>
      </div>

      {/* Main Split Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar: Structured Curriculum (4 cols) */}
        <div className="lg:col-span-4 space-y-4 max-h-[85vh] overflow-y-auto pr-1">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-soft space-y-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Curriculum Roadmap
            </h2>

            <div className="space-y-4">
              {curriculum.map((mod: any, mIdx: number) => (
                <div key={mod._id || mIdx} className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-800">
                    {mod.title}
                  </div>

                  {/* Lessons */}
                  {mod.lessons?.map((les: any, lIdx: number) => {
                    const isActive = les._id === activeLessonId;
                    const isDone = progress?.completedLessons?.includes(les._id);
                    return (
                      <button
                        key={les._id || lIdx}
                        onClick={() => setActiveLessonId(les._id)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between gap-2 transition-all ${
                          isActive
                            ? 'bg-blue-600 text-white font-semibold shadow-sm'
                            : isDone
                            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200/60 font-medium'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {isDone ? (
                            <CheckCircle2 className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                          ) : (
                            <PlayCircle className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>
                        <span className={`text-[10px] shrink-0 font-mono ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                          Day {les.unlockDay || lIdx + 1}
                        </span>
                      </button>
                    );
                  })}

                  {/* Assignments */}
                  {mod.assignments?.map((asg: any, aIdx: number) => {
                    const sub = assignmentSubmissions.find((s: any) => s.assignmentId === asg._id);
                    return (
                      <button
                        key={asg._id || aIdx}
                        onClick={() => setActiveAssignment(asg)}
                        className="w-full text-left p-2.5 rounded-xl text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 flex items-center justify-between gap-2 font-medium"
                      >
                        <span className="flex items-center gap-2 truncate">
                          <FileCode className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Assignment: {asg.title}</span>
                        </span>
                        <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-amber-200/80 shrink-0">
                          {sub ? sub.status : 'Pending'}
                        </span>
                      </button>
                    );
                  })}

                  {/* Quizzes */}
                  {mod.quizzes?.map((qz: any, qIdx: number) => {
                    const isPassed = progress?.passedQuizzes?.includes(qz._id);
                    return (
                      <button
                        key={qz._id || qIdx}
                        onClick={() => {
                          setActiveQuiz(qz);
                          setQuizAnswers({});
                          setQuizResult(null);
                        }}
                        className="w-full text-left p-2.5 rounded-xl text-xs bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200/80 flex items-center justify-between gap-2 font-medium"
                      >
                        <span className="flex items-center gap-2 truncate">
                          <HelpCircle className="w-4 h-4 text-purple-600 shrink-0" />
                          <span>Quiz: {qz.title}</span>
                        </span>
                        <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-purple-200/80 shrink-0">
                          {isPassed ? 'Passed ✓' : 'Take Quiz'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Capstone Projects Box in Sidebar */}
          {projects && projects.length > 0 && (
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-soft space-y-2.5">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-1 flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-indigo-600" />
                Capstone Projects ({projects.length})
              </h3>

              {projects.map((proj: any, pIdx: number) => {
                const sub = projectSubmissions.find((s: any) => s.projectId === proj._id);
                return (
                  <button
                    key={proj._id || pIdx}
                    onClick={() => setActiveProject(proj)}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs space-y-1 block"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 truncate">{proj.title}</span>
                      <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                        {sub ? sub.status : 'Submit'}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] line-clamp-2">{proj.description}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Center / Right: Lesson Content Player (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {currentLesson ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
                    <span className="capitalize">{currentLesson.contentType || 'Video'} Lesson</span>
                    <span>•</span>
                    <span>{currentLesson.durationMinutes || 20} Minutes</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    {currentLesson.title}
                  </h2>
                </div>

                {/* Mark Complete Button */}
                <button
                  onClick={handleMarkComplete}
                  disabled={completing}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                    isCurrentLessonCompleted
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {completing ? 'Updating...' : isCurrentLessonCompleted ? 'Completed ✓' : 'Mark as Complete'}
                </button>
              </div>

              {/* Video Player */}
              {currentLesson.videoUrl && (
                <div className="aspect-video w-full rounded-2xl bg-slate-950 overflow-hidden shadow-md">
                  <iframe
                    src={currentLesson.videoUrl}
                    title={currentLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
              )}

              {/* Article Content */}
              {currentLesson.articleContent && (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                  {currentLesson.articleContent}
                </div>
              )}

              {/* Embedded Source Code Snippet */}
              {currentLesson.sourceCodeSnippet && currentLesson.sourceCodeSnippet.code && (
                <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs overflow-hidden">
                  <div className="flex items-center justify-between text-slate-400 pb-2 mb-2 border-b border-slate-800">
                    <span className="flex items-center gap-1.5 text-blue-400">
                      <Terminal className="w-3.5 h-3.5" />
                      {currentLesson.sourceCodeSnippet.filename || 'script.js'}
                    </span>
                    <span className="text-[10px] uppercase text-slate-500">
                      {currentLesson.sourceCodeSnippet.language}
                    </span>
                  </div>
                  <pre className="text-slate-200 overflow-x-auto text-[11px] leading-relaxed">
                    {currentLesson.sourceCodeSnippet.code}
                  </pre>
                </div>
              )}

              {/* Bottom Nav Prev / Next Controls */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (currentLessonIndex > 0) {
                      setActiveLessonId(allLessons[currentLessonIndex - 1]._id);
                    }
                  }}
                  disabled={currentLessonIndex === 0}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous Lesson
                </button>

                <button
                  onClick={() => {
                    if (currentLessonIndex < allLessons.length - 1) {
                      setActiveLessonId(allLessons[currentLessonIndex + 1]._id);
                    }
                  }}
                  disabled={currentLessonIndex === allLessons.length - 1}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5 disabled:opacity-40"
                >
                  Next Lesson <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-500">
              Select a lesson from the curriculum sidebar to start learning.
            </div>
          )}
        </div>
      </div>

      {/* Quiz Modal */}
      {activeQuiz && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">
                  Assessment
                </span>
                <h3 className="text-lg font-bold text-slate-900">{activeQuiz.title}</h3>
              </div>
              <button
                onClick={() => setActiveQuiz(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕ Close
              </button>
            </div>

            {quizResult ? (
              <div className="text-center py-6 space-y-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                  quizResult.passed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">
                  {quizResult.passed ? 'Quiz Passed! 🎉' : 'Needs Practice'}
                </h4>
                <p className="text-sm text-slate-600">
                  You scored <strong>{quizResult.totalScore}</strong> / {quizResult.maxScore} marks.
                  Passing marks: {quizResult.passingMarks}.
                </p>
                <button
                  onClick={() => setActiveQuiz(null)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {activeQuiz.questions?.map((q: any, qIdx: number) => (
                  <div key={qIdx} className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-xs font-bold text-slate-900">
                      Q{qIdx + 1}. {q.question}
                    </div>
                    <div className="space-y-1.5 pt-1">
                      {q.options?.map((opt: string, optIdx: number) => (
                        <label
                          key={optIdx}
                          className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                            quizAnswers[qIdx] === optIdx
                              ? 'bg-purple-50 border-purple-400 font-semibold text-purple-900'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q_${qIdx}`}
                            checked={quizAnswers[qIdx] === optIdx}
                            onChange={() => setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx })}
                            className="text-purple-600 focus:ring-purple-500"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleQuizSubmit}
                  disabled={submittingQuiz || Object.keys(quizAnswers).length !== activeQuiz.questions?.length}
                  className="w-full py-3.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 disabled:opacity-50 transition-colors"
                >
                  {submittingQuiz ? 'Submitting & Grading...' : 'Submit Quiz Answers'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Assignment Submit Modal */}
      {activeAssignment && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">
                  Assignment Submission
                </span>
                <h3 className="text-base font-bold text-slate-900">{activeAssignment.title}</h3>
              </div>
              <button
                onClick={() => setActiveAssignment(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕ Close
              </button>
            </div>

            {asgSuccess ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900">Submitted for Review!</h4>
                <p className="text-xs text-slate-500">Your mentor will grade this submission shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleAssignmentSubmit} className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
                  <div className="font-semibold mb-1">Instructions:</div>
                  <p>{activeAssignment.instructions || activeAssignment.description}</p>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    GitHub Repository URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/username/repository"
                    value={asgGithubUrl}
                    onChange={(e) => setAsgGithubUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://my-app.vercel.app"
                    value={asgLiveUrl}
                    onChange={(e) => setAsgLiveUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Notes / Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Brief explanation of your implementation..."
                    value={asgTextAnswer}
                    onChange={(e) => setAsgTextAnswer(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingAsg}
                  className="w-full py-3 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-700 disabled:opacity-50 transition-colors"
                >
                  {submittingAsg ? 'Uploading...' : 'Submit Assignment for Evaluation'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Capstone Project Submit Modal */}
      {activeProject && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                  Capstone Deliverables
                </span>
                <h3 className="text-base font-bold text-slate-900">{activeProject.title}</h3>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕ Close
              </button>
            </div>

            {projSuccess ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900">Capstone Submitted!</h4>
                <p className="text-xs text-slate-500">Evaluation marks will reflect on your certificate audit.</p>
              </div>
            ) : (
              <form onSubmit={handleProjectSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Public GitHub Repository URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/username/capstone-project"
                    value={projGithubUrl}
                    onChange={(e) => setProjGithubUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Live Hosted URL (Vercel/Render/Netlify)
                  </label>
                  <input
                    type="url"
                    placeholder="https://project.vercel.app"
                    value={projLiveUrl}
                    onChange={(e) => setProjLiveUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Architecture & Features Summary *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Explain the tech stack, key endpoints, database collections, and instructions to test..."
                    value={projDesc}
                    onChange={(e) => setProjDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingProj}
                  className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                  {submittingProj ? 'Recording...' : 'Submit Capstone Project'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
