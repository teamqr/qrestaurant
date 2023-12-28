import { OrderData } from "@/types/OrderData";
import { getTokenData, getTokenFromCookies } from "@/utils/tokenUtils";
import React from "react";
import Order from "./Order";
import {
  fetchMealsData,
  fetchOrdersData,
  fetchOrdersInProgressData,
  fetchTablesData,
} from "@/utils/apiUtils";
import WSConnection from "./WSConnection";

const OrdersPage = async () => {
  const token = (await getTokenFromCookies()) as string;
  const tokenData = await getTokenData(token);
  const meals = await fetchMealsData(token);
  const tables = await fetchTablesData(token);

  const orders = await fetchOrdersInProgressData(token);
  const ordersCount = orders.length;
  return (
    <div>
      <WSConnection token={token} restaurantId={tokenData.restaurantId} />
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
