import { AdminNavBar } from '@/components/admin/nav-bar';
import { AdminSidebar } from '@/components/admin/side-bar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';

export const AdminLayout = () => {
  return (
    <div className='flex min-h-screen w-full overflow-y-hidden'>
      <SidebarProvider>
        <AdminSidebar />
        <div className='flex flex-col w-full'>
          <AdminNavBar />
          <ScrollArea className='flex-1 max-h-[calc(100vh-30px)]'>
            <main className='py-6 px-4 md:px-6 max-w-7xl mx-auto'>
              <Outlet />
            </main>
          </ScrollArea>
        </div>
      </SidebarProvider>
    </div>
  );
};
