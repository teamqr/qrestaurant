"use client";
import { OrderData } from "@/types/OrderData";
import React, { useEffect, useState } from "react";
import Order from "./Order";
import { getWebSocketClient } from "../../utils/webSocketUtils";
import { StompSubscription } from "@stomp/stompjs";
import { TokenData } from "@/types/TokenData";
import { MealData } from "@/types/MealData";
import { TableData } from "@/types/TableData";

type Props = {
  token: string;
  tokenData: TokenData;
  meals: MealData[];
  tables: TableData[];
  initialOrders: OrderData[];
  initialOrderEntries: any[];
};

const OrdersPage = (props: Props) => {
  const [orders, setOrders] = useState(props.initialOrders);
  const ordersCount = orders.length;

  useEffect(() => {
    const wsClient = getWebSocketClient(
      props.token,
      props.tokenData.restaurantId
    );
    let sub: StompSubscription | null = null;

    wsClient.onConnect = () => {
      sub = wsClient.subscribe(
        `/topic/order/${props.tokenData.restaurantId}`,
        (message) => {
          const receivedOrders = JSON.parse(message.body).orders as OrderData[];
          setOrders(receivedOrders);
        }
      );
    };

    wsClient.onDisconnect = function () {
      if (sub) {
        sub.unsubscribe();
      }
    };

    wsClient.onWebSocketClose = function () {
      if (sub) {
        sub.unsubscribe();
      }
    };

    wsClient.activate();
  }, []);

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
              mealsData={props.meals}
              tablesData={props.tables}
              initialEntries={props.initialOrderEntries[order.id]}
              token={props.token}
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
