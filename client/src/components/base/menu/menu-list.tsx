import { useGetAllMenuItems } from '@/hooks/react-query';
import { MenuItemCard } from './menu-item-card';
import { MenuPagination } from '../filters/menu-pagination';
import { Loader } from 'lucide-react';

export const MenuList = () => {
  const { data: res, isLoading } = useGetAllMenuItems();
  const items = res?.data?.items;

  return (
    <div>
      {isLoading && (
        <Loader className='w-6 h-6 animate-spin flex place-self-center' />
      )}
      {items && items.length > 0 ? (
        <div className='h-full flex flex-col gap-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {items.map((item) => (
              <MenuItemCard key={item._id} item={item} />
            ))}
          </div>
          <div className='border-1 shadow-sm rounded-lg py-2 px-4'>
            <MenuPagination />
          </div>
        </div>
      ) : (
        <div>
          <h2 className='text-2xl font-bold text-foreground/80'>
            No Item available
          </h2>
        </div>
      )}
    </div>
  );
};
