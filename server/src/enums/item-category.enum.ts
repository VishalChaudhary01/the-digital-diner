export const ItemCategoryEnum = {
  APPETIZERS: 'APPETIZERS',
  MAIN_COURSES: 'MAIN_COURSES',
  DESSERTS: 'DESSERTS',
  DRINKS: 'DRINKS',
} as const;

export type ItemCategoryType = keyof typeof ItemCategoryEnum;
