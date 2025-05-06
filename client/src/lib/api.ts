import { OrderStatus } from '@/constants';
import API from './axios-client';
import { ApiResponse } from '@/types/common.type';
import {
  CreateItemInput,
  CreateItemResponse,
  GetItemByIdResponse,
  GetItemsResponse,
  MenuFiltersState,
  UpdateItemInput,
  UpdateItemResponse,
} from '@/types/menu-item.type';
import {
  CancelOrderResponse,
  CreateOrderInput,
  CreateOrderResponse,
  GetOrdersResponse,
  UpdateOrderResponse,
} from '@/types/order.type';
import { GetProfileResponse } from '@/types/user.type';
import {
  SigninInput,
  SigninResponse,
  SignupInput,
  SignupResponse,
} from '@/types/auth.type';

/************ USER API ************/

export const getProfileQueryFn = async (): Promise<GetProfileResponse> => {
  const response = await API.get(`/user/profile`);
  return response.data;
};

/************ AUTH API ************/

export const signupMutationFn = async (
  data: SignupInput
): Promise<SignupResponse> => {
  const response = await API.post(`/auth/signup`, data);
  return response.data;
};

export const signinMutationFn = async (
  data: SigninInput
): Promise<SigninResponse> => {
  const response = await API.post(`/auth/signin`, data);
  return response.data;
};

export const logoutMutationFn = async (): Promise<ApiResponse<null>> => {
  const response = await API.post(`/auth/logout`);
  return response.data;
};

/************ MENU ITEM API ************/

export const getAllMenuItemQueryFn = async ({
  keyword,
  category,
  available,
  sortBy,
  pageSize,
  pageNumber,
}: MenuFiltersState): Promise<GetItemsResponse> => {
  const queryParams = new URLSearchParams();

  if (keyword) queryParams.append('keyword', keyword);
  if (category && category.length > 0) {
    queryParams.append('category', category.join(','));
  }
  if (available !== null && available !== undefined) {
    queryParams.append('available', available.toString());
  }
  if (sortBy) queryParams.append('sortBy', sortBy);
  if (pageSize) queryParams.append('pageSize', pageSize.toString());
  if (pageNumber) queryParams.append('pageNumber', pageNumber.toString());

  const response = await API.get(`/menuItem?${queryParams.toString()}`);
  return response.data;
};

export const getMenuItemByIdQueryFn = async (
  itemId: string
): Promise<GetItemByIdResponse> => {
  const response = await API.get(`/menuItem/${itemId}`);
  return response.data;
};

export const createMenuItemMutationFn = async (
  data: CreateItemInput
): Promise<CreateItemResponse> => {
  const response = await API.post(`/menuItem`, data);
  return response.data;
};

export const updateMenuItemMutationFn = async (
  itemId: string,
  data: UpdateItemInput
): Promise<UpdateItemResponse> => {
  const response = await API.put(`/menuItem/${itemId}`, data);
  return response.data;
};

export const deleteMenuItemMutationFn = async (
  itemId: string
): Promise<ApiResponse<null>> => {
  const response = await API.delete(`/menuItem/${itemId}`);
  return response.data;
};

/************ ORDER API ************/

export const getMyOrdersQueryFn = async (): Promise<GetOrdersResponse> => {
  const response = await API.get(`/order/myOrders`);
  return response.data;
};

// ONLY FOR ADMIN
export const getAllOrdersQueryFn = async (): Promise<GetOrdersResponse> => {
  const response = await API.get(`/order/allOrders`);
  return response.data;
};

export const createOrderMutationFn = async (
  data: CreateOrderInput
): Promise<CreateOrderResponse> => {
  const response = await API.post(`/order`, data);
  return response.data;
};

export const cancelOrderMutationFn = async (
  orderId: string
): Promise<CancelOrderResponse> => {
  const response = await API.put(`/order/cancel/${orderId}`);
  return response.data;
};

// ONLY FOR ADMIN
export const updateOrderMutationFn = async (
  orderId: string,
  status: OrderStatus
): Promise<UpdateOrderResponse> => {
  const response = await API.put(`/order/updateStatus/${orderId}`, status);
  return response.data;
};
