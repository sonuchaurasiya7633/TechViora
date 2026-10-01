import { z } from 'zod';

export const EnrollmentFormSchema = z.object({
  programSlug: z.string().min(1, 'Program is required'),
  planSlug: z.string().min(1, 'Plan is required'),
  fullName: z.string().min(2, 'Full Name is required'),
  email: z.string().email('Valid email is required'),
  mobileNumber: z.string().min(10, 'Valid 10-digit mobile number is required'),
  collegeName: z.string().min(2, 'College Name is required'),
  university: z.string().optional().default(''),
  course: z.string().min(1, 'Course is required'),
  branch: z.string().min(1, 'Branch / Specialization is required'),
  currentYear: z.string().min(1, 'Current Year of study is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  linkedinUrl: z.string().optional().or(z.literal('')),
  githubUrl: z.string().optional().or(z.literal('')),
  couponCode: z.string().optional().or(z.literal('')),
});

export type EnrollmentFormData = z.infer<typeof EnrollmentFormSchema>;
