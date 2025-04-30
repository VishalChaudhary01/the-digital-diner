import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  getMyOrdersQueryFn,
  getAllMenuItemQueryFn,
  getMenuItemByIdQueryFn,
  getProfileQueryFn,
  getAllOrdersQueryFn,
} from '@/lib/api';
import { GetItemsRequest } from '@/types/menu-item.type';

export const useAuth = () => {
  return useQuery({
    queryKey: ['auth-user'],
    queryFn: getProfileQueryFn,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};

export const useGetAllMenuItems = ({
  pageSize = 10,
  pageNumber = 1,
  skip = false,
}: GetItemsRequest) => {
  return useQuery({
    queryKey: ['all-items', pageSize, pageNumber],
    queryFn: () =>
      getAllMenuItemQueryFn({
        pageSize,
        pageNumber,
      }),
    staleTime: Infinity,
    retry: 2,
    placeholderData: keepPreviousData,
    enabled: !skip,
  });
};

export const useGetMenuItemById = (itemId: string) => {
  return useQuery({
    queryKey: ['item'],
    queryFn: () => getMenuItemByIdQueryFn(itemId),
    staleTime: 0,
    enabled: !!itemId,
    placeholderData: keepPreviousData,
  });
};

export const useGetMyOrders = () => {
  return useQuery({
    queryKey: ['my-orders'],
    queryFn: getMyOrdersQueryFn,
    staleTime: Infinity,
  });
};

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ['all-orders'],
    queryFn: getAllOrdersQueryFn,
    staleTime: Infinity,
  });
};
