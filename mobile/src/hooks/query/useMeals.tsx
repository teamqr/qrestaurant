import { useQuery } from "@tanstack/react-query";

import { Meal } from "@/common/types";
import axios from "@/services/axios";

const getMeals = async (id: number) => {
  const { data } = await axios.get<{ meals: Meal[] }>(`api/app/meal`, {
    params: {
      restaurantId: id,
    },
  });
  return data;
};

export const useMeals = (restaurantId?: number) => {
  return useQuery({
    queryKey: ["restaurant", restaurantId, "meals"],
    queryFn: () => getMeals(restaurantId!),
    enabled: !!restaurantId,
  });
};
