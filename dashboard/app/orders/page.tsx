import OrdersPage from "@/components/orders/OrdersPage";
import { getTokenData, getTokenFromCookies } from "@/utils/tokenUtils";
import React from "react";

const OrdersManagement = async () => {
  const token = (await getTokenFromCookies()) as string;
  const tokenData = await getTokenData(token);

  return (
    <div>
      <OrdersPage />
    </div>
  );
};

export default OrdersManagement;
