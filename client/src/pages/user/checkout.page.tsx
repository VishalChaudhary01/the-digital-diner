/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCartStore } from '@/store/use-cart-store';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/use-auth-store';
import { toast } from 'sonner';
import { CartItem } from '@/components/base/cart/cart-item';
import { AUTH_ROUTES } from '@/constants/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrderMutationFn } from '@/lib/api';

const CheckoutPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items, getTotalPrice, clearCart } = useCartStore();

  const { mutate, isPending } = useMutation({
    mutationFn: createOrderMutationFn,
  });

  const handlePlaceOrder = () => {
    if (!user) return navigate(`${AUTH_ROUTES.SIGN_IN}`);
    if (isPending) return;
    mutate(
      {
        items: items.map((item) => ({
          menuItemId: item.menuItem._id,
          quantity: item.quantity,
        })),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['cart'],
          });
          clearCart();
          toast.success('Order placed successfully!');
          navigate('/');
        },
        onError: (error: any) => {
          console.error(error);
          toast.error(error.response?.data?.message || 'Failed to place order');
        },
      }
    );
  };

  if (items.length === 0) {
    return (
      <div className='container mx-auto py-12 px-4'>
        <div className='max-w-md mx-auto text-center space-y-4'>
          <h1 className='text-2xl font-bold'>Your cart is empty</h1>
          <p className='text-muted-foreground'>
            Add some items to your cart before checking out.
          </p>
          <Button onClick={() => navigate('/')}>Back to Menu</Button>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-2xl font-bold mb-6'>Checkout</h1>

        <div className='grid md:grid-cols-3 gap-8'>
          <div className='md:col-span-2 space-y-4'>
            <div className='bg-white p-4 rounded-lg shadow'>
              <h2 className='font-medium mb-4'>Order Summary</h2>
              <div className='divide-y'>
                {items.map((item) => (
                  <CartItem key={item.menuItem._id} item={item} />
                ))}
              </div>
            </div>
          </div>

          <div className='md:col-span-1'>
            <div className='bg-white p-4 rounded-lg shadow sticky top-4'>
              <h2 className='font-medium mb-4'>Payment Summary</h2>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>Subtotal:</span>
                  <span>Rs. {getTotalPrice().toFixed(0)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span>Delivery Fee:</span>
                  <span>Rs. 5</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span>Tax:</span>
                  <span>Rs. {(getTotalPrice() * 0.1).toFixed(0)}</span>
                </div>
                <div className='border-t pt-2 mt-2'>
                  <div className='flex justify-between font-medium'>
                    <span>Total:</span>
                    <span>
                      Rs.
                      {(getTotalPrice() + 5 + getTotalPrice() * 0.1).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className='mt-6'>
                <Button className='w-full' onClick={handlePlaceOrder}>
                  Place Order
                </Button>
                <Button
                  variant='outline'
                  className='w-full mt-2'
                  onClick={() => navigate('/')}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
