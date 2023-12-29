import { useQuery } from "@tanstack/react-query";

import { Meal } from "@/common/types";
import axios from "@/services/axios";

const getMeal = async (id: number, restaurantId: number) => {
  const { data } = await axios.get<{ meal: Meal }>(`/api/app/meal/${id}`, {
    params: {
      restaurantId,
    },
  });
  return data;
};

export const useMeal = (id?: number, restaurantId?: number) => {
  return useQuery({
    queryKey: ["restaurant", restaurantId, "meals", id],
    queryFn: () => getMeal(id!, restaurantId!),
    enabled: !!restaurantId && !!id,
  });
};
