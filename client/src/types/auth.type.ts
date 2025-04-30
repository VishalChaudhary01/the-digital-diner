import { z } from 'zod';
import { User } from './user.type';
import { ApiResponse } from './common.type';
import { signinSchema, signupSchema } from '@/validators/auth.validator';

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;

// AUTH RESPONSE TYPE
export type SignupResponse = ApiResponse<{ user: User }>;
export type SigninResponse = ApiResponse<{ user: User }>;
