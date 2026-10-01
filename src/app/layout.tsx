import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'TechViora | Structured Engineering Internships & Project Learning',
    template: '%s | TechViora',
  },
  description:
    'Practical, industry-focused engineering and computer science internship programs. Real curriculum, graded assignments, guided capstone projects, and verified digital certificates for B.Tech, BCA, MCA, and tech freshers.',
  keywords: [
    'Engineering Internship',
    'Tech Internship',
    'Full Stack Internship',
    'MERN Stack Internship',
    'Data Science Internship',
    'Verified Internship Certificate',
    'Student Coding Projects',
    'B.Tech Internships 2026',
  ],
  authors: [{ name: 'TechViora Engineering Team' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://techviora.com',
    siteName: 'TechViora',
    title: 'TechViora - Engineering Internships & Practical Project Learning',
    description: 'Practical, industry-focused skill development with real assignments, guided capstone projects, and verifiable credentials.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechViora Internships',
    description: 'Practical, industry-focused engineering internships with verified credentials.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <Providers>
          {children}
        </Providers>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
        <script src="https://accounts.google.com/gsi/client" async defer />
      </body>
    </html>
  );
}
