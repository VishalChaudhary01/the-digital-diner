import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signupMutationFn } from '@/lib/api';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignupInput } from '@/types/auth.type';
import { signupSchema } from '@/validators/auth.validator';
import { CardLayout } from '@/components/common/card-layout';
import { PasswordInput } from '@/components/common/password-input';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { AUTH_ROUTES, BASE_ROUTES } from '@/constants/routes';

const SignUpPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: signupMutationFn,
  });

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: SignupInput) {
    if (isPending) return;
    mutate(values, {
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: ['auth-user'],
        });
        navigate(BASE_ROUTES.HOME);
        toast.success(response.message);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.error(error);
        toast.error(error.response.data.message || 'Failed to signup user');
      },
    });
  }

  return (
    <div className='flex justify-center py-8 mx-auto'>
      <CardLayout
        header='Sign Up'
        description='Welcome, please enter your details to Create an account.'
        footer={
          <div>
            Already have an account?{' '}
            <a
              href={`${AUTH_ROUTES.SIGN_IN}`}
              className='text-primary hover:underline'
            >
              Sign In
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
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your full name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <PasswordInput
              form={form}
              name='confirmPassword'
              label='Confirm Password'
              placeholder='Confirm your password'
            />
            <Button type='submit' disabled={isPending} className='w-full'>
              {isPending ? (
                <Loader className='w-4 h-4 animate-spin' />
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>
      </CardLayout>
    </div>
  );
};

export default SignUpPage;
