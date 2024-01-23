import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { Order } from "@/common/types";
import axios from "@/services/axios";
import { wait } from "@/utils/promise";

const schema = z.object({
  restaurantId: z.number(),
  tableId: z.number(),
  orderProducts: z.array(
    z.object({
      id: z.number(),
      amount: z.number(),
    }),
  ),
});

type CreateOrderSchemaType = z.infer<typeof schema>;

const createOrder = async (order: CreateOrderSchemaType) => {
  await wait(1000);

  const validated = schema.parse(order);
  const { data } = await axios.post<{ order: Order }>(
    "/api/app/order",
    validated,
  );
  return data;
};

export const useCreateOrder = ({
  onSuccess,
}: {
  onSuccess?: (data: { order: Order }) => void;
}) => {
  return useMutation({
    mutationFn: createOrder,
    onSuccess,
  });
};
