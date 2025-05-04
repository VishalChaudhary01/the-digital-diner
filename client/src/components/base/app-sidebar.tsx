import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { ListFilter } from 'lucide-react';
import { SortByFilter } from './filters/sort-by';
import { CategoryFilter } from './filters/categoty';
import { AvailabilityFilter } from './filters/availability';

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className='text-2xl font-extrabold tracking-tight text-foreground'>
          <span className='text-primary'>The</span>{' '}
          <span className='text-foreground/80'>Digital</span>{' '}
          <span className='text-primary italic'>Diner</span>
        </h1>
      </SidebarHeader>

      <SidebarContent className='flex flex-col gap-4 h-[calc(100vh-8rem)] overflow-y-auto'>
        <SidebarGroup className='flex-shrink-0 pb-2'>
          <div className='flex items-center gap-2 my-4'>
            <ListFilter className='h-5 w-5 text-primary' />
            <h2 className='text-lg font-semibold'>Filters</h2>
          </div>
          <SidebarGroupContent>
            <div className='space-y-4 px-2'>
              <SortByFilter />
              <Separator className='my-4' />
              <CategoryFilter />
              <Separator className='my-4' />
              <AvailabilityFilter />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
