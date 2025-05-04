import {
  ADMIN_ROUTES,
  AUTH_ROUTES,
  BASE_ROUTES,
  USER_ROUTES,
} from '@/constants/routes';
import DashboardPage from '@/pages/admin/dashboard.page';
import SignInPage from '@/pages/auth/signin.page';
import SignUpPage from '@/pages/auth/signup.page';
import MenuItemPage from '@/pages/user/menu-item.page';
import ProfilePage from '@/pages/user/profile.page';

export const authRoutes = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignInPage /> },
  { path: AUTH_ROUTES.SIGN_UP, element: <SignUpPage /> },
];

export const userRoutes = [
  { path: BASE_ROUTES.HOME, element: <MenuItemPage /> },
  { path: USER_ROUTES.PROFILE, element: <ProfilePage /> },
];

export const adminRoutes = [
  { path: ADMIN_ROUTES.DASHBOARD, element: <DashboardPage /> },
];
