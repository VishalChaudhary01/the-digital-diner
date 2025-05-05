import { useCartStore, CartItem as CartItemType } from '@/store/use-cart-store';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateItemQuantity, removeItem } = useCartStore();
  const { menuItem, quantity } = item;

  return (
    <div className='flex py-4 border-b last:border-b-0'>
      <div className='h-16 w-16 rounded overflow-hidden flex-shrink-0'>
        <img
          src={menuItem.imageUrl}
          alt={menuItem.name}
          className='h-full w-full object-cover'
        />
      </div>

      <div className='ml-4 flex-1'>
        <div className='flex justify-between'>
          <h4 className='font-medium text-sm'>{menuItem.name}</h4>
          <button
            className='text-muted-foreground hover:text-destructive'
            onClick={() => removeItem(menuItem._id)}
          >
            <Trash className='h-4 w-4' />
          </button>
        </div>

        <p className='text-sm text-muted-foreground'>
          Rs. {menuItem.price.toFixed(2)}
        </p>

        <div className='flex justify-between items-center mt-2'>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='icon'
              className='h-6 w-6'
              onClick={() => updateItemQuantity(menuItem._id, quantity - 1)}
            >
              <Minus className='h-3 w-3' />
            </Button>

            <span className='text-sm w-6 text-center'>{quantity}</span>

            <Button
              variant='outline'
              size='icon'
              className='h-6 w-6'
              onClick={() => updateItemQuantity(menuItem._id, quantity + 1)}
            >
              <Plus className='h-3 w-3' />
            </Button>
          </div>

          <span className='font-medium'>
            Rs. {(menuItem.price * quantity).toFixed(0)}
          </span>
        </div>
      </div>
    </div>
  );
};
