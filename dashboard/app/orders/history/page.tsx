import OrdersHistoryPage from "@/components/orders/OrdersHistoryPage";
import { fetchOrdersHistoryData, fetchTablesData } from "@/utils/apiUtils";
import { getTokenFromCookies } from "@/utils/tokenUtils";
import { redirect } from "next/navigation";
import React from "react";

const OrderHistory = async () => {
  const token = (await getTokenFromCookies()) as string;
  if (!token) {
    redirect("/");
  }
  const tables = await fetchTablesData(token);

  const orders = await fetchOrdersHistoryData(token);
  return (
    <div>
      <OrdersHistoryPage orders={orders} tables={tables} token={token} />
    </div>
  );
};

export default OrderHistory;
