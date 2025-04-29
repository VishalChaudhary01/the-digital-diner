import { z } from 'zod';

export const nameSchema = z
  .string({ required_error: 'Name is required' })
  .trim()
  .min(2, { message: 'Name must be at least 2 characters' })
  .max(50, { message: 'Name must be under 50 characters' });

export const phoneNumberSchema = z
  .string({ required_error: 'Phone number is required' })
  .trim()
  .regex(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits' });

export const passwordSchema = z
  .string({ required_error: 'Please enter your password' })
  .trim()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Include at least one uppercase letter (A-Z)')
  .regex(/[a-z]/, 'Include at least one lowercase letter (a-z)')
  .regex(/[0-9]/, 'Include at least one number (0-9)')
  .regex(/[@$!%*?&#]/, 'Include at least one special character (@$!%*?&#)');
