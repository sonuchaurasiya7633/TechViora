import Link from 'next/link';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
        <FileQuestion className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">404 - Page Not Found</h1>
      <p className="text-sm text-slate-600 max-w-md mb-6">
        The page or resource you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all inline-flex items-center gap-2 shadow-md shadow-blue-500/20"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Home Page
      </Link>
    </div>
  );
}
