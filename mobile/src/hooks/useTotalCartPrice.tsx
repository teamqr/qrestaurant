import { useMemo } from "react";

import { useMeals } from "./query/useMeals";

import { useRestaurantSessionStore } from "@/stores/restaurant-session";

export const useTotalCartPrice = () => {
  const cart = useRestaurantSessionStore((state) => state.cart);
  const restaurantId = useRestaurantSessionStore((state) => state.restaurantId);
  const meals = useMeals(restaurantId);

  const total = useMemo(
    () =>
      cart.reduce((acc, item) => {
        const meal = meals.data?.meals.find((m) => m.id === item.id);

        if (!meal) {
          return acc;
        }

        return acc + meal.price * item.quantity;
      }, 0),
    [cart, meals.data?.meals],
  );

  return total;
};
