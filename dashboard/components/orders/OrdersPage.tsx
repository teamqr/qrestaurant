import { OrderData } from "@/types/OrderData";
import { getTokenData, getTokenFromCookies } from "@/utils/tokenUtils";
import React from "react";
import Order from "./Order";
import {
  fetchMealsData,
  fetchOrdersInProgressData,
  fetchTablesData,
} from "@/utils/apiUtils";
import { getWebSocketClient } from "../../utils/webSocketUtils";
import { revalidateTag } from "next/cache";
import { StompSubscription } from "@stomp/stompjs";

const OrdersPage = async () => {
  const token = (await getTokenFromCookies()) as string;
  const tokenData = await getTokenData(token);
  const meals = await fetchMealsData(token);
  const tables = await fetchTablesData(token);

  let orders = await fetchOrdersInProgressData(token);
  const ordersCount = orders.length;
  const wsClient = getWebSocketClient(token, tokenData.restaurantId);
  let sub: StompSubscription | null = null;

  wsClient.onConnect = () => {
    sub = wsClient.subscribe(
      `/topic/order/${tokenData.restaurantId}`,
      (message) => {
        // Logika obsługi wiadomości
        const msgBody = JSON.parse(message.body) as OrderData[];
        orders = msgBody;
      }
    );
  };

  wsClient.onStompError = function (frame) {
    // Logika obsługi błędów
    console.error("Broker reported error: " + frame.headers["message"]);
    console.error("Additional details: " + frame.body);
  };

  wsClient.onDisconnect = function (frame) {
    console.log("Disconnected: " + frame);
    if (sub) {
      sub.unsubscribe();
    }
  };

  wsClient.onWebSocketClose = function (frame) {
    console.log("Closed: " + frame);
    if (sub) {
      sub.unsubscribe();
    }
  };

  wsClient.activate();

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
