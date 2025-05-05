import { useCartStore } from '@/store/use-cart-store';
import { Button } from '@/components/ui/button';
import { SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { CartItem } from './cart-item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AUTH_ROUTES, USER_ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/use-auth-store';

interface CartDrawerProps {
  onClose: () => void;
}

export const CartDrawer = ({ onClose }: CartDrawerProps) => {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) return navigate(`${AUTH_ROUTES.SIGN_IN}`);
    onClose();
    navigate(USER_ROUTES.CHECKOUT);
  };

  if (items.length === 0) {
    return (
      <div className='h-full flex flex-col'>
        <SheetHeader>
          <SheetTitle className='text-2xl font-bold text-foreground/80 mt-4'>
            Your Cart
          </SheetTitle>
        </SheetHeader>
        <div className='flex-1 flex flex-col items-center justify-center space-y-4'>
          <ShoppingCart className='h-12 w-12 text-muted-foreground' />
          <p className='text-muted-foreground'>Your cart is empty</p>
          <Button onClick={onClose} variant='outline'>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='h-full flex flex-col'>
      <SheetHeader>
        <SheetTitle className='text-2xl font-bold text-foreground/80 mt-4'>
          Your Cart ({getTotalItems()} items)
        </SheetTitle>
      </SheetHeader>

      <ScrollArea className='flex-1 overflow-auto py-4 pl-4 pr-6'>
        {items.map((item) => (
          <CartItem key={item.menuItem._id} item={item} />
        ))}
      </ScrollArea>

      <div className='mt-auto border-t space-y-4 p-4'>
        <div className='flex justify-between items-center'>
          <span className='font-medium text-base'>Total:</span>
          <span className='font-bold'>Rs. {getTotalPrice().toFixed(2)}</span>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <Button variant='outline' onClick={clearCart} size='sm'>
            Clear Cart
          </Button>
          <Button onClick={handleCheckout}>Checkout</Button>
        </div>
      </div>
    </div>
  );
};
