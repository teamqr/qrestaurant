"use client";
import React, { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { OrderData } from "@/types/OrderData";
import { revalidatePath, revalidateTag } from "next/cache";

type Props = {
  token: string;
  restaurantId: number;
};

const sockFactory = () => new SockJS("http://localhost:8082/ws-dashboard");

const WSConnection = (props: Props) => {
  let stompClient = new Client({
    webSocketFactory: sockFactory,
    connectHeaders: {
      Authorization: `Bearer ${props.token}`,
    },
    debug: (msg) => {
      console.log(msg);
    },
    logRawCommunication: true,
    appendMissingNULLonIncoming: true,

    reconnectDelay: 5000,

    onConnect: () => {
      console.log("Connected");

      // Subskrypcja tematu
      stompClient.subscribe(
        `/topic/order/${props.restaurantId}`,
        function (message) {
          // Logika obsługi wiadomości
          const msgBody = JSON.parse(message.body) as OrderData[];
          console.log(msgBody[0]);
          revalidateTag("orders");
        }
      );
    },
  });

  stompClient.onStompError = function (frame) {
    // Logika obsługi błędów
    console.error("Broker reported error: " + frame.headers["message"]);
    console.error("Additional details: " + frame.body);
  };

  stompClient.onDisconnect = function (frame) {
    console.log("Disconnected: " + frame);
  };

  const connect = () => {
    stompClient.activate();
  };

  const disconnect = () => {
    stompClient.deactivate();
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <div>
      <p>
        <button onClick={connect}>CONNECT</button>
      </p>
      <p>
        <button onClick={disconnect}>DISCONNECT</button>
      </p>
    </div>
  );
};

export default WSConnection;
