import { create } from "zustand";

type RestaurantSessionState = {
  restaurantId?: string;
  tableCode?: string;
  beginSession: ({
    restaurantId,
    tableCode,
  }: {
    restaurantId?: string;
    tableCode?: string;
  }) => void;
};

export const useRestaurantSessionStore = create<RestaurantSessionState>(
  (set, get) => ({
    restaurant: undefined,
    beginSession: async ({ restaurantId, tableCode }) => {
      set({ restaurantId, tableCode });
    },
  }),
);
