/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner';
import { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { cancelOrderMutationFn } from '@/lib/api';
import { Order, OrderItem } from '@/types/order.type';
import { useItemDialog } from '@/hooks/use-item-dialog';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ConfirmationDialog } from '@/components/common/confirmation-dialog';

interface OrderCardProps {
  order: Order;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const { onOpen } = useItemDialog();
  const queryClient = useQueryClient();
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: cancelOrderMutationFn,
  });

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCancel = (orderId: string) => {
    if (isPending) return;
    mutate(orderId, {
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: ['my-orders'],
        });
        toast.success(response.message);
        setOpenConfirmation(false);
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            'Failed to cancel order, please try again'
        );
        setOpenConfirmation(false);
      },
    });
  };

  const totalPrice = order.orderItems.reduce(
    (total, item) => total + parseFloat(item.priceAtOrder) * item.quantity,
    0
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-500';
      case 'PENDING':
        return 'bg-yellow-500';
      case 'CANCELED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <>
      <Card className='w-full mb-4 hover:shadow-md transition-shadow'>
        <CardHeader className='pb-2 flex flex-row justify-between items-start'>
          <div className='flex flex-col'>
            <p className='text-sm text-muted-foreground'>
              Order #{order.id.substring(0, 8)}
            </p>
            <p className='text-sm font-medium'>{formatDate(order.createdAt)}</p>
          </div>
          <div className='flex flex-col items-end justify-start gap-2'>
            <Badge className={getStatusColor(order.status)}>
              {order.status}
            </Badge>
            {order.status === 'PENDING' && (
              <Button variant='outline' onClick={handleOpenConfirmation}>
                Cancel Order
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className='pb-2'>
          {order.orderItems.map((item: OrderItem) => (
            <div
              key={item.id}
              className='flex justify-between items-center py-1'
            >
              <div className='flex items-center gap-2'>
                <span className='font-medium'>{item.quantity}x</span>
                <span
                  className='hover:underline cursor-pointer'
                  onClick={() => onOpen(item.menuItemId)}
                >
                  Item: {item.menuItemId.substring(0, 8)}...
                </span>
              </div>
              <span className='font-medium'>
                Rs. {parseFloat(item.priceAtOrder).toFixed(2)}
              </span>
            </div>
          ))}
        </CardContent>
        <CardFooter className='pt-2 border-t'>
          <div className='w-full flex justify-between items-center'>
            <span className='font-medium'>Total</span>
            <span className='text-lg font-bold'>
              Rs. {totalPrice.toFixed(2)}
            </span>
          </div>
        </CardFooter>
      </Card>
      {openConfirmation && (
        <ConfirmationDialog
          isOpen={openConfirmation}
          onClose={() => setOpenConfirmation(false)}
          header='Order Cancel Confirmation'
          description='Are you sure want to cancel this order?'
          footer={
            <div className='flex gap-2 justify-end'>
              <Button
                variant='outline'
                onClick={() => setOpenConfirmation(false)}
                disabled={isPending}
              >
                Dismiss
              </Button>
              <Button
                onClick={() => handleCancel(order.id)}
                disabled={isPending}
              >
                Confirm Cancel
              </Button>
            </div>
          }
        />
      )}
    </>
  );
};
