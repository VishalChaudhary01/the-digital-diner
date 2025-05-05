import { MenuItem } from '@/types/menu-item.type';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (menuItem: MenuItem) => void;
  removeItem: (menuItemId: string) => void;
  updateItemQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (menuItem: MenuItem) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.menuItem._id === menuItem._id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.menuItem._id === menuItem._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { menuItem, quantity: 1 }],
          };
        });
      },

      removeItem: (menuItemId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.menuItem._id !== menuItemId),
        }));
      },

      updateItemQuantity: (menuItemId: string, quantity: number) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.menuItem._id === menuItemId
                ? { ...item, quantity: Math.max(0, quantity) }
                : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.menuItem.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'food-cart-storage',
    }
  )
);
