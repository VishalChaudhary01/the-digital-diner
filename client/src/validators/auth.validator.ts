import { z } from 'zod';
import {
  nameSchema,
  passwordSchema,
  phoneNumberSchema,
} from './common.validator';

export const signupSchema = z.object({
  name: nameSchema,
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
});

export const signinSchema = z.object({
  phoneNumber: phoneNumberSchema,
  password: z
    .string({ required_error: 'Please enter your password' })
    .trim()
    .min(1, { message: 'Password is required' }),
});
