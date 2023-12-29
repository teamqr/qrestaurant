import OrderDetailsPage from "@/components/orders/OrderDetailsPage";
import { OrderData } from "@/types/OrderData";
import { fetchOrderData } from "@/utils/apiUtils";
import { getTokenFromCookies } from "@/utils/tokenUtils";
import { redirect } from "next/navigation";
import React from "react";

const OrderDetails = async ({ params }: { params: { id: number } }) => {
  const token = (await getTokenFromCookies()) as string;
  if (!token) {
    redirect("/");
  }
  const orderData: OrderData = await fetchOrderData(params.id, token);
  return (
    <div>
      <OrderDetailsPage orderData={orderData} token={token} />
    </div>
  );
};

export default OrderDetails;
