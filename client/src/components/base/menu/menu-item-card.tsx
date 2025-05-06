import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { MenuItem } from '@/types/menu-item.type';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { useCartStore } from '@/store/use-cart-store';
import { toast } from 'sonner';
import { useItemDialog } from '@/hooks/use-item-dialog';

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { onOpen } = useItemDialog();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!item.isAvailable) return;

    addItem(item);
    toast.success(`${item.name} has been added to your cart`);
  };

  return (
    <Card className='overflow-hidden h-full flex flex-col pt-0 max-w-md'>
      <div
        className='relative h-48 overflow-hidden cursor-pointer'
        onClick={() => onOpen(item._id)}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className='w-full h-full object-cover transition-transform hover:scale-105'
        />
        {!item.isAvailable && (
          <div className='absolute inset-0 bg-opacity-50 flex items-center justify-center'>
            <Badge variant='destructive' className='text-sm'>
              Unavailable
            </Badge>
          </div>
        )}
      </div>

      <CardHeader>
        <div className='flex justify-between items-start'>
          <h3 className='font-medium text-lg line-clamp-1'>{item.name}</h3>
          <Badge variant='secondary' className='ml-2'>
            Rs. {item.price.toFixed(2)}
          </Badge>
        </div>
        <Badge variant='outline'>{item.category.replace('_', ' ')}</Badge>
      </CardHeader>

      <CardContent className='flex-grow'>
        <p className='text-sm text-muted-foreground line-clamp-2'>
          {item.description}
        </p>
      </CardContent>

      <CardFooter>
        <Button
          className='w-full'
          disabled={!item.isAvailable}
          onClick={handleAddToCart}
        >
          {item.isAvailable ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
};
