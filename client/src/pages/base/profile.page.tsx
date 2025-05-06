import { OrdersList } from '@/components/base/order-list';
import { useAuthStore } from '@/store/use-auth-store';

const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div className='w-full mx-auto'>
      <div className='flex flex-col items-center justify-center w-full bg-accent h-56'>
        <h2 className='text-3xl font-bold text-foreground/80'>
          Hello, <span className='text-primary'>{user?.name || 'User'}</span>
        </h2>
        <p className='text-muted-foreground mt-2'>
          Here's a summary of your orders
        </p>
      </div>
      <OrdersList />
    </div>
  );
};

export default ProfilePage;
