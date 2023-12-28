import type { MealOrder } from "@/common/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getMealOrder = async (id: string) => {
  const { data } = await axios.get<{ mealOrder: MealOrder }>(
    `/api/app/meal-order/${id}`,
  );
  return data;
};

export const useMealOrder = (mealOrder?: string) => {
  return useQuery({
    queryKey: ["meal-order", mealOrder],
    queryFn: () => getMealOrder(mealOrder!),
    enabled: !!mealOrder,
  });
};
