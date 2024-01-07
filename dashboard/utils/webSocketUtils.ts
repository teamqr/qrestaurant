import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
const url = `${process.env.NEXT_PUBLIC_DASHBOARD_SERVICE_URL}/ws-dashboard`;
const sockFactory = () => new SockJS(url);

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
