import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { OrderCard } from './order-card';
import { useGetMyOrders } from '@/hooks/react-query';

export const OrdersList = () => {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const { data: res, isLoading } = useGetMyOrders();
  const orders = res?.data?.orders;

  if (isLoading) {
    return (
      <div className='w-full flex flex-col items-center py-8'>
        <div className='w-full max-w-3xl px-4'>
          <div className='animate-pulse space-y-4'>
            {/* {[1, 2, 3].map((i) => (
              <div key={i} className='h-40 bg-muted rounded-md'></div>
            ))} */}
          </div>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className='w-full py-12 flex flex-col items-center justify-center'>
        <h3 className='text-xl font-medium text-muted-foreground mb-2'>
          No orders found
        </h3>
        <p className='text-muted-foreground'>
          You haven't placed any orders yet.
        </p>
      </div>
    );
  }

  const filteredOrders =
    statusFilter === 'ALL'
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  return (
    <div className='w-full flex flex-col items-center py-8'>
      <div className='w-full max-w-3xl px-4'>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-semibold'>Your Orders</h2>
          <div className='flex items-center gap-2'>
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Filter by status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='ALL'>All Orders</SelectItem>
                <SelectItem value='PENDING'>Pending</SelectItem>
                <SelectItem value='COMPLETED'>Completed</SelectItem>
                <SelectItem value='CANCELED'>Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className='text-center py-8'>
            <p className='text-muted-foreground'>
              No orders match the selected filter.
            </p>
            <Button
              variant='outline'
              className='mt-2'
              onClick={() => setStatusFilter('ALL')}
            >
              Show All Orders
            </Button>
          </div>
        ) : (
          <div className='space-y-4'>
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
