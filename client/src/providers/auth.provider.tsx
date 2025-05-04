/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/hooks/react-query';
import { useAuthStore } from '@/store/use-auth-store';
import { toast } from 'sonner';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: res, error, isLoading } = useAuth();
  const { setUser, setIsLoading, setError } = useAuthStore();
  const user = res?.data?.user;

  useEffect(() => {
    setIsLoading(isLoading);
    if (error) {
      setError(error);
      if ((error as any)?.response?.status !== 401) {
        toast.error('Failed to retrieve user information');
      }
      setError(error);
    }

    if (user) {
      setUser(user);
      console.log('User authenticated:', user);
    }
  }, [res, user, error, isLoading, setUser, setError, setIsLoading]);

  return <>{children}</>;
};
