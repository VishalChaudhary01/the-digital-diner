export const BASE_ROUTES = {
  HOME: '/',
  CART: '/cart',
};

export const USER_ROUTES = {
  PROFILE: '/:userId/profile',
};

export const AUTH_ROUTES = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
};

export const ADMIN_ROUTES = {
  DASHBOARD: '/admin/dashboard',
  ALL_ORDERS: '/admin/all-orders',
};

export const getUserProfilePath = (userId: string) => `/${userId}/profile`;
