export const UserRoleEnum = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

export const ItemCategoryEnum = {
  APPETIZERS: 'APPETIZERS',
  MAIN_COURSES: 'MAIN_COURSES',
  DESSERTS: 'DESSERTS',
  DRINKS: 'DRINKS',
} as const;

export const SortByEnum = {
  PRICE_LOW_TO_HIGH: 'price-lowtohigh',
  PRICE_HIGH_TO_LOW: 'price-hightolow',
  NAME_A_TO_Z: 'name-atoz',
  NAME_Z_TO_A: 'name-ztoa',
} as const;

export const OrderStatusEnum = {
  PENDING: 'PENDING',
  CANCEL: 'CANCEL',
  DELIVERED: 'DELIVERED',
} as const;

export type UserRole = keyof typeof UserRoleEnum;
export type ItemCategory = keyof typeof ItemCategoryEnum;
export type OrderStatus = keyof typeof OrderStatusEnum;
export type SortBy = keyof typeof SortByEnum;
