import { AppBar } from '@/components/base/app-bar';
import { AppSidebar } from '@/components/base/app-sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet, useLocation } from 'react-router-dom';

export const BaseLayout = () => {
  const location = useLocation();
  const isMenuItemsPage = location.pathname === '/';

  return (
    <div className='flex min-h-screen w-full overflow-y-hidden'>
      <SidebarProvider>
        {isMenuItemsPage && <AppSidebar />}
        <div className='flex flex-col w-full'>
          <AppBar />
          <ScrollArea className='flex-1 max-h-[calc(100vh-56px)]'>
            <main className='py-6 px-4 max-w-[1440px] mx-auto'>
              <Outlet />
            </main>
          </ScrollArea>
        </div>
      </SidebarProvider>
    </div>
  );
};
