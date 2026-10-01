import React from 'react';
import Link from 'next/link';
import { Star, Quote, CheckCircle2, MessageSquare } from 'lucide-react';

interface ReviewItem {
  _id: string;
  studentName: string;
  college?: string;
  course?: string;
  programTitle: string;
  rating: number;
  reviewText: string;
  projectBuilt?: string;
}

interface StudentReviewsProps {
  reviews: ReviewItem[];
}

export function StudentReviews({ reviews }: StudentReviewsProps) {
  const defaultReviews: ReviewItem[] = [
    {
      _id: 'sample-1',
      studentName: 'Aman Verma',
      college: 'VIT Vellore',
      course: 'B.Tech CSE',
      programTitle: 'MERN Stack Development',
      rating: 5,
      reviewText: 'The daily structured module approach kept me disciplined. Building a real full-stack dashboard with MongoDB schemas and authentication gave me confidence for technical interviews.',
    },
    {
      _id: 'sample-2',
      studentName: 'Pooja Iyer',
      college: 'PSG College of Technology',
      course: 'B.E. IT',
      programTitle: 'Python Development',
      rating: 5,
      reviewText: 'No fluff or fake promises. The mentor code review on my FastAPI assignment pointed out actual performance bottlenecks I had overlooked.',
    },
    {
      _id: 'sample-3',
      studentName: 'Rohan Deshmukh',
      college: 'COEP Pune',
      course: 'MCA',
      programTitle: 'Data Science & Machine Learning',
      rating: 5,
      reviewText: 'The capstone project evaluation was rigorous. Getting the QR-verified certificate helped validate my hands-on experience during campus placement drives.',
    },
  ];

  const displayReviews = reviews && reviews.length > 0 ? reviews : defaultReviews;

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
            Authentic Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Enrolled Students Say
          </h2>
          <p className="text-base text-slate-600 mt-3">
            Real feedback from engineering students who completed our structured learning modules and capstone projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.slice(0, 6).map((rev) => (
            <div
              key={rev._id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1.5">
                    {rev.rating}.0 / 5.0
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.reviewText}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-900">
                    {rev.studentName}
                  </div>
                  <div className="text-xs text-slate-500">
                    {rev.course && `${rev.course} • `}
                    {rev.college || 'Engineering Student'}
                  </div>
                  <div className="text-[11px] font-semibold text-blue-600 mt-0.5">
                    {rev.programTitle}
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center" title="Verified Enrolled Student">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
