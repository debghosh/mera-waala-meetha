// lib/stores/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  vendorName: string;
  minOrderKg: number;
  maxOrderKg?: number;
  city: string;
  state: string;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  
  // Actions
  addItem: (product: Omit<CartItem, 'id'>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Computed values
  getItemCount: () => number;
  getCartTotal: () => number;
  getItemByProductId: (productId: string) => CartItem | undefined;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.productId === product.productId);
          
          if (existingItem) {
            // Update quantity if item already exists
            const updatedItems = state.items.map(item =>
              item.productId === product.productId
                ? { ...item, quantity: item.quantity + product.quantity }
                : item
            );
            
            const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            return {
              ...state,
              items: updatedItems,
              totalItems,
              totalPrice
            };
          } else {
            // Add new item
            const newItem: CartItem = {
              id: `cart_${Date.now()}_${Math.random()}`,
              ...product
            };
            
            const updatedItems = [...state.items, newItem];
            const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            return {
              ...state,
              items: updatedItems,
              totalItems,
              totalPrice
            };
          }
        });
      },

      removeItem: (productId) => {
        set((state) => {
          const updatedItems = state.items.filter(item => item.productId !== productId);
          const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          
          return {
            ...state,
            items: updatedItems,
            totalItems,
            totalPrice
          };
        });
      },

      updateQuantity: (productId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            return get().removeItem(productId) as any;
          }
          
          const updatedItems = state.items.map(item =>
            item.productId === productId
              ? { ...item, quantity: Math.max(quantity, item.minOrderKg) }
              : item
          );
          
          const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
          const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          
          return {
            ...state,
            items: updatedItems,
            totalItems,
            totalPrice
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0
        });
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getCartTotal: () => {
        return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      },

      getItemByProductId: (productId) => {
        return get().items.find(item => item.productId === productId);
      }
    }),
    {
      name: 'mera-waala-meetha-cart', // unique name for localStorage key
      partialize: (state) => ({ 
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice
      })
    }
  )
);