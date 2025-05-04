import { Loader } from 'lucide-react';
import { useGetAllMenuItems } from '@/hooks/react-query';
import { MenuItemCard } from '@/components/base/menu-item-card';
import { MenuPagination } from '@/components/base/filters/menu-pagination';

const MenuItemPage = () => {
  const { data: res, isLoading } = useGetAllMenuItems();

  const items = res?.data?.items ?? [];

  return (
    <div>
      <div className='w-full flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-foreground/80 mb-6'>
          <span className='text-primary'>Menu </span>Items List
        </h1>
      </div>
      {isLoading ? (
        <div className='flex justify-center'>
          <Loader className='w-8 h-8 animate-spin text-primary' />
        </div>
      ) : (
        <div>
          {items.length > 0 ? (
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
      )}
    </div>
  );
};

export default MenuItemPage;
