import { z } from 'zod';
import {
  categorySchema,
  descriptionSchema,
  imageUrlSchema,
  isAvailableSchema,
  nameSchema,
  priceSchema,
} from './common.validator';

export const createItemSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
  price: priceSchema,
  imageUrl: imageUrlSchema,
  isAvailable: isAvailableSchema,
  category: categorySchema,
});

export const updateItemSchema = createItemSchema.partial();
