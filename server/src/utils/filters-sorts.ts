import { SortByEnum } from '@enums/sort.enum';

export interface ItemFilters {
  category?: string[];
  available?: string;
  keyword?: string;
  sortBy?: SortByEnum;
}

export interface PaginationParams {
  pageSize: number;
  pageNumber: number;
}

export const buildItemQuery = (filters: ItemFilters): Record<string, any> => {
  const query: Record<string, any> = {};

  if (filters.category?.length) {
    query.category = { $in: filters.category };
  }

  if (filters.available !== undefined) {
    query.isAvailable = filters.available === 'true';
  }

  if (filters.keyword) {
    query.name = { $regex: filters.keyword, $options: 'i' };
  }

  return query;
};

export const buildSortOption = (
  sortBy?: SortByEnum
): Record<string, 1 | -1> => {
  switch (sortBy) {
    case SortByEnum.PRICE_LOW_TO_HIGH:
      return { price: 1 };
    case SortByEnum.PRICE_HIGH_TO_LOW:
      return { price: -1 };
    case SortByEnum.NAME_A_TO_Z:
      return { name: 1 };
    case SortByEnum.NAME_Z_TO_A:
      return { name: -1 };
    default:
      return { createdAt: -1 };
  }
};
