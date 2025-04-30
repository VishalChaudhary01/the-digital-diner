import { z } from 'zod';
import { createOrderSchema } from '@/validators/order.validator';
import { OrderStatus } from '@/constants';
import { ApiResponse } from './common.type';

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export type OrderItem = {
  id: string;
  menuItemId: string;
  quantity: number;
  orderId: string;
  priceAtOrder: string;
};

export type Order = {
  id: string;
  status: OrderStatus;
  userId: string;
  createdAt: string;
  completedAt: string | null;
  orderItems: OrderItem[];
};

export type OnlyOrder = {
  id: string;
  userId: string;
  status: OrderStatus;
  createdAt: Date;
  completedAt: Date | null;
};

// Orders Response type
export type GetOrdersResponse = ApiResponse<{
  orders: Order[];
}>;

export type CreateOrderResponse = ApiResponse<{
  order: Order;
}>;

export type CancelOrderResponse = ApiResponse<{
  cancelledOrder: OnlyOrder;
}>;

export type UpdateOrderResponse = ApiResponse<{
  updatedOrder: OnlyOrder;
}>;
