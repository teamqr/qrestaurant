import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const sockFactory = () => new SockJS("http://localhost:8082/ws-dashboard");

export const getWebSocketClient = (token: string, restaurantId: number) => {
  let stompClient = new Client({
    webSocketFactory: sockFactory,
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    /*debug: (msg) => {
      console.log(msg);
    },*/
    reconnectDelay: 5000,
  });
  return stompClient;
};
