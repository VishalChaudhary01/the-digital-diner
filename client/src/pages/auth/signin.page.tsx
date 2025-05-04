import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signinMutationFn } from '@/lib/api';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SigninInput } from '@/types/auth.type';
import { signinSchema } from '@/validators/auth.validator';
import { CardLayout } from '@/components/common/card-layout';
import { PasswordInput } from '@/components/common/password-input';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { AUTH_ROUTES, BASE_ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/use-auth-store';

const SignInPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();
  const { mutate, isPending } = useMutation({
    mutationFn: signinMutationFn,
  });

  const form = useForm<SigninInput>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      phoneNumber: '',
      password: '',
    },
  });

  function onSubmit(values: SigninInput) {
    if (isPending) return;
    mutate(values, {
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: ['auth-user'],
        });
        setUser(response.data?.user);
        navigate(BASE_ROUTES.HOME);
        toast.success(response.message);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.error(error);
        toast.error(error.response.data.message || 'Failed to Signin user');
      },
    });
  }

  return (
    <div className='flex justify-center py-8 mx-auto'>
      <CardLayout
        header='Sign In'
        description='Welcome back!'
        footer={
          <div>
            Don't have an account?{' '}
            <a
              href={`${AUTH_ROUTES.SIGN_UP}`}
              className='text-primary hover:underline'
            >
              Sign UP
            </a>
          </div>
        }
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your phone number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PasswordInput
              form={form}
              name='password'
              label='Password'
              placeholder='Enter your password'
            />
            <Button type='submit' disabled={isPending} className='w-full'>
              {isPending ? (
                <Loader className='w-4 h-4 animate-spin' />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>
      </CardLayout>
    </div>
  );
};

export default SignInPage;
