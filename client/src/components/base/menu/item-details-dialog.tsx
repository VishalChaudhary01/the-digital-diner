import { useGetMenuItemById } from '@/hooks/react-query';
import { useItemDialog } from '@/hooks/use-item-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '../../ui/badge';

export const ItemDetailsDialog = () => {
  const { itemId, isOpen, onClose } = useItemDialog();
  const { data: res } = useGetMenuItemById(itemId as string);
  const item = res?.data?.item;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {item ? (
        <DialogContent className='sm:max-w-[425px]'>
          <div className='h-48 overflow-hidden'>
            <img
              src={item?.imageUrl}
              alt={item?.name}
              className='w-full h-full object-cover rounded-md'
            />
          </div>
          <DialogHeader>
            <DialogTitle className='text-xl font-semibold'>
              {item.name}
            </DialogTitle>
          </DialogHeader>
          <div className=''>
            <Badge variant='secondary'>Rs. {item.price.toFixed(2)}</Badge>
            <p className='text-muted-foreground mt-2'>{item.description}</p>
          </div>
        </DialogContent>
      ) : (
        <DialogContent>
          <h3 className='text-xl font-semibold text-foreground/80'>
            Item not found
          </h3>
          <p className='text-muted-foreground'>
            The item you are looking for may be removed by admin or not
            available.
          </p>
        </DialogContent>
      )}
    </Dialog>
  );
};
