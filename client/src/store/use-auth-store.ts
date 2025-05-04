/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { User } from '@/types/user.type';

type AuthState = {
  user?: User;
  isLoading: boolean;
  error: any;
  setUser: (user: User | undefined) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: any) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  logout: () => set({ user: undefined }),
}));
