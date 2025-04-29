import { z } from 'zod';
import { idSchema } from './common.validator';

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        menuItemId: idSchema,
        quantity: z
          .number()
          .int()
          .min(1, 'Quantity must be at least 1')
          .positive('Quantify must be a positive integer'),
      })
    )
    .min(1, 'At least one item is required to place order'),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
