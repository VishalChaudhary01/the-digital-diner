import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';

const AppBar = () => {
  return (
    <div className='flex items-center justify-between h-[56px] top-0 max-w-7xl w-full mx-auto px-4 md:px-6'>
      <div className='flex items-center gap-4'>
        <div className='block md:hidden'>
          <SidebarTrigger />
        </div>
        <div className='w-56 border hover:border-primary px-4 py-2 rounded-full'>
          <span className='text-muted-foreground'>Search bar</span>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Button variant='outline'>SignIn</Button>
        <Button variant='outline'>SignIn</Button>
      </div>
    </div>
  );
};

export default AppBar;
