import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(date: string | Date): string {
  if (!date) return '';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function generateEnrollmentId(programSlug: string): string {
  const year = new Date().getFullYear();
  const cleanCode = programSlug.replace(/-/g, '').substring(0, 4).toUpperCase();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `INT-${year}-${cleanCode}-${randomNum}`;
}

export function generateCertificateId(programSlug: string): string {
  const year = new Date().getFullYear();
  const cleanCode = programSlug.replace(/-/g, '').substring(0, 4).toUpperCase();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `CERT-${year}-${cleanCode}-${randomNum}`;
}

export function generateTicketId(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `TCK-${randomNum}`;
}
