import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Mobile number must be at least 10 digits').optional().or(z.literal('')),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const ProfileUpdateSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().optional(),
  collegeName: z.string().optional(),
  university: z.string().optional(),
  course: z.string().optional(),
  branch: z.string().optional(),
  currentYear: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  linkedinUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  bio: z.string().optional(),
});
