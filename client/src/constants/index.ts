export const UserRoleEnum = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

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

export const categoryLabels = {
  APPETIZERS: 'Appetizers',
  MAIN_COURSES: 'Main Courses',
  DESSERTS: 'Desserts',
  DRINKS: 'Drinks',
};

export type UserRole = (typeof UserRoleEnum)[keyof typeof UserRoleEnum];
export type ItemCategory =
  (typeof ItemCategoryEnum)[keyof typeof ItemCategoryEnum];
export type OrderStatus =
  (typeof OrderStatusEnum)[keyof typeof OrderStatusEnum];
export type SortBy = (typeof SortByEnum)[keyof typeof SortByEnum];
