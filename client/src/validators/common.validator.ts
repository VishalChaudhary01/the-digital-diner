import { ItemCategoryEnum, OrderStatusEnum } from '@/constants';
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

export const descriptionSchema = z
  .string()
  .trim()
  .max(500, 'Description should be less then 500 characters')
  .optional();

export const imageUrlSchema = z
  .string()
  .url({ message: 'Image URL must be valid' })
  .optional();

export const isAvailableSchema = z.boolean({
  required_error: 'Availability is required',
});

export const priceSchema = z
  .number({ required_error: 'Price is required' })
  .nonnegative({ message: 'Price must be a non-negative number' });

export const categorySchema = z.enum(
  Object.values(ItemCategoryEnum) as [string, ...string[]],
  {
    required_error: 'Category is required',
    invalid_type_error: `Category must be one of: ${Object.values(
      ItemCategoryEnum
    ).join(', ')}`,
  }
);

export const statusSchema = z.enum(
  Object.values(OrderStatusEnum) as [string, ...string[]],
  {
    required_error: 'Status is required',
    invalid_type_error: `Status must be one of: ${Object.values(
      OrderStatusEnum
    ).join(', ')}`,
  }
);

export const idSchema = z.string().trim().min(1, 'Id is Required');
