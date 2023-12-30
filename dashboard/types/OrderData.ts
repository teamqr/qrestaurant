import { DateTime } from "next-auth/providers/kakao";
import { OrderEntry } from "./OrderEntry";

export type OrderData = {
  id: number;
  price: number;
  status: boolean;
  orderDate: Date;
  completionDate: Date | null;
  tableId: number;
  restaurantId: number;
  mealOrderIds: number[];
};
