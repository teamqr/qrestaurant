import { useQuery } from "@tanstack/react-query";

import { Restaurant } from "@/common/types";
import axios from "@/services/axios";

const getRestaurant = async (id: string) => {
  const { data } = await axios.get<{ restaurant: Restaurant }>(
    `api/app/restaurant/${id}`,
  );
  return data;
};

export const useRestaurant = (id: string) => {
  return useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurant(id),
    enabled: !!id,
  });
};
