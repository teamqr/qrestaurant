import { getSampleOrders } from "@/sampleData/sampleOrders";
import { OrderData } from "@/types/OrderData";
import { getTokenFromCookies } from "@/utils/tokenUtils";
import React from "react";
import Order from "./Order";
import {
  fetchMealsData,
  fetchOrdersData,
  fetchTablesData,
} from "@/utils/apiUtils";

const OrdersPage = async () => {
  const token = (await getTokenFromCookies()) as string;
  const meals = await fetchMealsData(token);
  const tables = await fetchTablesData(token);

  const orders = await fetchOrdersData(token);
  const ordersCount = orders.length;
  return (
    <div>
      <h1 className="flex justify-center">
        Oczekujące zamówienia: {ordersCount}
      </h1>
      <div className="flex flex-row justify-start flex-wrap m-5">
        {orders ? (
          orders.map((order: OrderData, i: number) => (
            <Order
              key={i}
              data={order}
              mealsData={meals}
              tablesData={tables}
              token={token}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;