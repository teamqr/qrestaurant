import { create } from "zustand";

import { Restaurant } from "@/common/types";

type RestaurantSessionState = {
  restaurant?: Restaurant;
  beginSession: (restaurant: Restaurant) => Promise<void>;
};

export const useRestaurantSessionStore = create<RestaurantSessionState>(
  (set, get) => ({
    restaurant: undefined,
    beginSession: async (restaurant: Restaurant) => {
      set({ restaurant });
    },
  }),
);
