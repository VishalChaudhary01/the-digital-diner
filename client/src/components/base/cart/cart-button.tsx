import { ShoppingCart } from 'lucide-react';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { useCartStore } from '@/store/use-cart-store';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CartDrawer } from './cart-drawer';

export const CartButton = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [open, setOpen] = useQueryState(
    'cart',
    parseAsBoolean.withDefault(false)
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='outline' size='sm' className='relative'>
          <ShoppingCart className='h-4 w-4' />
          {totalItems > 0 && (
            <span className='absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center'>
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className='w-full sm:w-80 md:w-96'>
        <CartDrawer onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};
