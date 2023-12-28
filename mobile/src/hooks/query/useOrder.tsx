import { useQuery } from "@tanstack/react-query";

import type { Order } from "@/common/types";
import axios from "@/services/axios";

const getOrder = async (id: number) => {
  const { data } = await axios.get<{ order: Order }>(`/api/app/order/${id}`);
  return data;
};

export const useOrder = (order?: number) => {
  return useQuery({
    queryKey: ["order", order],
    queryFn: () => getOrder(order!),
    enabled: !!order,
  });
};
