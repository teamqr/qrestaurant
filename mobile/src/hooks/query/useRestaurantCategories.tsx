import { useQuery } from "@tanstack/react-query";

import { MealCategory } from "@/common/types";
import axios from "@/services/axios";

const getCategories = async (id: number) => {
  const { data } = await axios.get<{ mealCategories: MealCategory[] }>(
    `/api/app/meal-category`,
    {
      params: {
        restaurantId: id,
      },
    },
  );
  return data;
};

export const useRestaurantCategories = ({
  restaurantId,
}: {
  restaurantId?: number;
}) => {
  return useQuery({
    queryKey: ["restaurant", restaurantId, "categories"],
    queryFn: () => getCategories(restaurantId!),
    enabled: !!restaurantId,
  });
};
