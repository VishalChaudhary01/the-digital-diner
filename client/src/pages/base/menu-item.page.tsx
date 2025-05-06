import { MenuList } from '@/components/base/menu/menu-list';

const MenuItemPage = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='w-full flex items-center gap-6'>
        <h1 className='text-3xl font-bold text-foreground/80'>
          <span className='text-primary'>Menu </span>Items List
        </h1>
      </div>
      <MenuList />
    </div>
  );
};

export default MenuItemPage;
