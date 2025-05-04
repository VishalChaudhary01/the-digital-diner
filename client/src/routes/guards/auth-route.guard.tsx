import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthRoute } from '@/lib/utils';
import { MenuSkeleton } from '@/components/skeletons/menu-skeleton';
import { useAuthStore } from '@/store/use-auth-store';

export const AuthRouteGuard = () => {
  const location = useLocation();
  const { user, isLoading } = useAuthStore();

  console.log(user, isLoading);

  if (isLoading && isAuthRoute(location.pathname)) return <MenuSkeleton />;

  return !user ? <Outlet /> : <Navigate to='/' replace />;
};
