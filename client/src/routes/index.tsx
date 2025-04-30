import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/layouts/app.layout';
import MenuItemPage from '@/pages/menu-item.page';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<MenuItemPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
