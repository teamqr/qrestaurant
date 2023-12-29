import OrderDetailsPage from "@/components/orders/OrderDetailsPage";
import { MealData } from "@/types/MealData";
import { OrderData } from "@/types/OrderData";
import { OrderEntry } from "@/types/OrderEntry";
import { TableData } from "@/types/TableData";
import {
  fetchMealsData,
  fetchOrderData,
  fetchOrderEntriesByOrderId,
  fetchTablesData,
} from "@/utils/apiUtils";
import { getTokenFromCookies } from "@/utils/tokenUtils";
import { redirect } from "next/navigation";
import React from "react";

const OrderDetails = async ({ params }: { params: { id: number } }) => {
  const token = (await getTokenFromCookies()) as string;
  if (!token) {
    redirect("/");
  }
  const orderData: OrderData = await fetchOrderData(params.id, token);
  const orderEntries: OrderEntry[] = await fetchOrderEntriesByOrderId(
    params.id,
    token
  );

  const tables: TableData[] = await fetchTablesData(token);
  const meals: MealData[] = await fetchMealsData(token);
  return (
    <div>
      <OrderDetailsPage
        orderData={orderData}
        orderEntries={orderEntries}
        tables={tables}
        meals={meals}
        token={token}
      />
    </div>
  );
};

export default OrderDetails;
