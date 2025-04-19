
import { create } from "zustand";
import { getMenuItemById, getRestaurantById, MenuItem } from "../data/restaurants";

export type CartItem = {
  restaurantId: string;
  itemId: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addToCart: (restaurantId: string, itemId: string, quantity?: number) => void;
  removeFromCart: (restaurantId: string, itemId: string) => void;
  updateQuantity: (restaurantId: string, itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  getQuantity: (restaurantId: string, itemId: string) => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addToCart: (restaurantId, itemId, quantity = 1) => {
    const currentItems = get().items;
    const existingItem = currentItems.find(
      item => item.restaurantId === restaurantId && item.itemId === itemId
    );
    
    if (existingItem) {
      set({
        items: currentItems.map(item =>
          item.restaurantId === restaurantId && item.itemId === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      });
    } else {
      set({ items: [...currentItems, { restaurantId, itemId, quantity }] });
    }
  },
  
  removeFromCart: (restaurantId, itemId) => {
    set({
      items: get().items.filter(
        item => !(item.restaurantId === restaurantId && item.itemId === itemId)
      ),
    });
  },
  
  updateQuantity: (restaurantId, itemId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(restaurantId, itemId);
      return;
    }
    
    set({
      items: get().items.map(item =>
        item.restaurantId === restaurantId && item.itemId === itemId
          ? { ...item, quantity }
          : item
      ),
    });
  },
  
  clearCart: () => set({ items: [] }),
  
  getCartTotal: () => {
    return get().items.reduce((total, item) => {
      const menuItem = getMenuItemById(item.restaurantId, item.itemId);
      if (menuItem) {
        return total + menuItem.price * item.quantity;
      }
      return total;
    }, 0);
  },
  
  getCartItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },
  
  getQuantity: (restaurantId, itemId) => {
    const item = get().items.find(
      item => item.restaurantId === restaurantId && item.itemId === itemId
    );
    return item ? item.quantity : 0;
  },
}));

export const getCartDisplayItems = (): (CartItem & { name: string; price: number; restaurant: string })[] => {
  const cartItems = useCartStore.getState().items;
  
  return cartItems.map(item => {
    const menuItem = getMenuItemById(item.restaurantId, item.itemId);
    const restaurant = getRestaurantById(item.restaurantId);
    
    return {
      ...item,
      name: menuItem?.name || "Unknown Item",
      price: menuItem?.price || 0,
      restaurant: restaurant?.name || "Unknown Restaurant"
    };
  });
};
