import { Navigate, Outlet } from 'react-router-dom';
import { MenuSkeleton } from '@/components/skeletons/menu-skeleton';
import { useAuthStore } from '@/store/use-auth-store';

export const AdminRouteGuard = () => {
  const { user, isLoading, error } = useAuthStore();

  if (isLoading) return <MenuSkeleton />;
  if (error) return <div>Something went wrong</div>;

  return user?.role === 'ADMIN' ? <Outlet /> : <Navigate to='/' replace />;
};
