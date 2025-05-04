import {
  ItemCategory,
  ItemCategoryEnum,
  SortBy,
  SortByEnum,
} from '@/constants';
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs';

const isItemCategory = (val: string): val is ItemCategory =>
  Object.values(ItemCategoryEnum).includes(val as ItemCategory);

export const useMenuFilters = () => {
  return useQueryStates({
    keyword: parseAsString,
    sortBy: parseAsStringEnum<SortBy>(Object.values(SortByEnum)),
    available: parseAsBoolean,
    category: {
      parse: (val) => val?.split(',').filter(isItemCategory) ?? null,
      serialize: (val) => val.join(','),
    },
    pageSize: parseAsInteger.withDefault(12),
    pageNumber: parseAsInteger.withDefault(1),
  });
};
