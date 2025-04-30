import { z } from 'zod';
import { ApiResponse } from './common.type';
import {
  createItemSchema,
  updateItemSchema,
} from '@/validators/menu-item.validator';
import { SortBy } from '@/constants';

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;

export type ItemCategory =
  | 'APPETIZERS'
  | 'MAIN_COURSES'
  | 'DESSERTS'
  | 'DRINKS';

export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  category: ItemCategory;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Pagination = {
  pageSize: number;
  pageNumber: number;
  totalCount: number;
  totalPages: number;
  skip: number;
};

export type GetItemsRequest = {
  keyword?: string | null;
  category?: ItemCategory[] | null;
  available?: boolean | null;
  sortBy?: SortBy | null;
  pageSize?: number | null;
  pageNumber?: number | null;
  skip?: boolean | null;
};

// Menu Item Response Type
export type GetItemsResponse = ApiResponse<{
  items: MenuItem[];
  pagination: Pagination;
}>;

export type GetItemByIdResponse = ApiResponse<{ item: MenuItem }>;

export type CreateItemResponse = ApiResponse<{ item: MenuItem }>;

export type UpdateItemResponse = ApiResponse<{ updatedItem: MenuItem }>;
