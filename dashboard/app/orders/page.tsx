import OrdersPage from "@/components/orders/OrdersPage";
import {
  fetchMealsData,
  fetchOrderEntriesByOrderId,
  fetchOrdersInProgressData,
  fetchTablesData,
} from "@/utils/apiUtils";
import { getTokenData, getTokenFromCookies } from "@/utils/tokenUtils";
import { redirect } from "next/navigation";
import React from "react";

const OrdersManagement = async () => {
  const token = (await getTokenFromCookies()) as string;
  if (!token) {
    redirect("/");
  }
  const tokenData = await getTokenData(token);
  const meals = await fetchMealsData(token);
  const tables = await fetchTablesData(token);
  const initialOrders = await fetchOrdersInProgressData(token);

  initialOrders.sort((o1, o2) => {
    if (o1.orderDate > o2.orderDate) {
      return 1;
    } else {
      return -1;
    }
  });

  const fetchOrderEntries = async () => {
    let orderEntries: any = {};
    for (const order of initialOrders) {
      const entries = await fetchOrderEntriesByOrderId(order.id, token);
      orderEntries[order.id] = entries;
    }
    return orderEntries;
  };

  const initialOrderEntries = await fetchOrderEntries();
  return (
    <div>
      <OrdersPage
        token={token}
        tokenData={tokenData}
        meals={meals}
        tables={tables}
        initialOrders={initialOrders}
        initialOrderEntries={initialOrderEntries}
      />
    </div>
  );
};

export default OrdersManagement;
