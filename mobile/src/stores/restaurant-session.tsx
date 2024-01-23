import { create } from "zustand";

type Item = {
  id: number;
  quantity: number;
};

type Cart = Item[];

type RestaurantSessionState = {
  restaurantId?: number;
  tableCode?: string;
  cart: Cart;
  beginSession: ({
    restaurantId,
    tableCode,
  }: {
    restaurantId?: number;
    tableCode?: string;
  }) => void;
  addToCart: (item: Item) => void;
  removeFromCart: (id: number) => void;
};

export const useRestaurantSessionStore = create<RestaurantSessionState>(
  (set, get) => ({
    restaurantId: undefined,
    tableCode: undefined,
    cart: [],
    beginSession: async ({ restaurantId, tableCode }) => {
      set({ restaurantId, tableCode, cart: [] });
    },
    addToCart: (item) => {
      const cart = get().cart;
      const index = cart.findIndex((i) => i.id === item.id);

      if (index === -1) {
        set({ cart: [...cart, item] });
      } else {
        cart[index].quantity += item.quantity;

        if (cart[index].quantity <= 0) {
          cart.splice(index, 1);
        }

        set({ cart: [...cart] });
      }
    },
    removeFromCart: (id) => {
      const cart = get().cart;
      const index = cart.findIndex((i) => i.id === id);

      if (index === -1) {
        return;
      }

      cart.splice(index, 1);

      set({ cart: [...cart] });
    },
  }),
);
