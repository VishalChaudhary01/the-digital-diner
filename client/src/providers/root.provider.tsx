import { ReactNode } from 'react';
import QueryProvider from './query.provider';
import { AuthProvider } from './auth.provider';

interface RootProviderProps {
  children: ReactNode;
}

export const RootProvider = ({ children }: RootProviderProps) => {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
};
