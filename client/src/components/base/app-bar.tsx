import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';
import { LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AUTH_ROUTES,
  BASE_ROUTES,
  getUserProfilePath,
} from '@/constants/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutMutationFn } from '@/lib/api';
import { toast } from 'sonner';
import { useCallback } from 'react';
import { useAuthStore } from '@/store/use-auth-store';
import { SearchBox } from './filters/search-box';
import { CartButton } from './cart/cart-button';
import { useCartStore } from '@/store/use-cart-store';

export const AppBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { clearCart } = useCartStore();

  const isMenuItemspage = location.pathname === '/';

  const { mutate, isPending } = useMutation({
    mutationFn: logoutMutationFn,
    onSuccess: () => {
      logout();
      clearCart();
      queryClient.resetQueries({ queryKey: ['auth-user'] });
      navigate(BASE_ROUTES.HOME);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'Failed to log out');
    },
  });

  const handleLogout = useCallback(() => {
    if (!isPending) mutate();
  }, [isPending, mutate]);

  return (
    <div className='flex items-center justify-between h-[56px] top-0 max-w-[1440px] w-full mx-auto px-4'>
      {isMenuItemspage ? (
        <div className='flex items-center gap-4'>
          <div className='block md:hidden'>
            <SidebarTrigger />
          </div>
          <SearchBox />
        </div>
      ) : (
        <h1 className='text-2xl font-extrabold tracking-tight text-foreground'>
          <span className='text-primary'>The</span>{' '}
          <span className='text-foreground/80'>Digital</span>{' '}
          <span className='text-primary italic'>Diner</span>
        </h1>
      )}

      <div className='flex items-center gap-4'>
        <CartButton />

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src='https://github.com/shadcn.png' />
                <AvatarFallback>
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Button
                variant='ghost'
                className='w-full'
                onClick={() => navigate(getUserProfilePath(user.id))}
              >
                My Account
              </Button>
              <DropdownMenuSeparator />
              <Button variant='ghost' className='w-full' onClick={handleLogout}>
                <LogOut className='w-4 h-4 mr-2' /> Logout
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className='flex items-center gap-4'>
            <Button onClick={() => navigate(AUTH_ROUTES.SIGN_IN)}>
              Sign In
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
