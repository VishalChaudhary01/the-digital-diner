import { z } from 'zod';
import { ApiResponse } from './common.type';
import {
  createItemSchema,
  updateItemSchema,
} from '@/validators/menu-item.validator';
import { ItemCategory, SortBy } from '@/constants';

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;

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

export interface Pagination {
  pageSize: number;
  pageNumber: number;
  totalCount: number;
  totalPages: number;
}

export type MenuFiltersState = {
  keyword: string | null;
  sortBy: SortBy | null;
  available: boolean | null;
  category: ItemCategory[] | null;
  pageSize: number;
  pageNumber: number;
};

// Menu Item Response Type
export type GetItemsResponse = ApiResponse<{
  items: MenuItem[];
  pagination: Pagination;
}>;

export type GetItemByIdResponse = ApiResponse<{ item: MenuItem }>;

export type CreateItemResponse = ApiResponse<{ item: MenuItem }>;

export type UpdateItemResponse = ApiResponse<{ updatedItem: MenuItem }>;
