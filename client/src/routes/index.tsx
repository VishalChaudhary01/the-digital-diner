import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/layouts/app.layout';
import { AuthLayout } from '@/layouts/auth.layout';
import { AdminLayout } from '@/layouts/admin.layout';
import { AuthRouteGuard } from './guards/auth-route.guard';
import { AdminRouteGuard } from './guards/admin-route.guard';
import { adminRoutes, authRoutes, userRoutes } from './route-config';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Auth Routes */}
        <Route element={<AuthRouteGuard />}>
          <Route element={<AuthLayout />}>
            {authRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Route>

        {/* User Routes */}
        <Route element={<AppLayout />}>
          {userRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* Admin Protected Routes */}
        <Route path='/admin' element={<AdminRouteGuard />}>
          <Route element={<AdminLayout />}>
            {adminRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
