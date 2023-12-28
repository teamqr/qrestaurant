import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { create } from "zustand";

const sockFactory = () => new SockJS("http://192.168.1.82:8081/ws-app");

type StompState = {
  stompClient: Client;
  status: "CONNECTED" | "DISCONNECTED";
  connect: () => void;
  disconnect: () => void;
  subscribe: (topic: string, cb: (data: IMessage) => void) => StompSubscription;
  unsubscribe: (topic: string) => void;
  subscriptions: Map<string, StompSubscription>;
};

export const useStompStore = create<StompState>((set, get) => ({
  stompClient: new Client({
    webSocketFactory: sockFactory,
    debug: console.log,
    logRawCommunication: true,
    onConnect: () => {
      set({ status: "CONNECTED" });
    },
  }),
  status: "DISCONNECTED",
  subscriptions: new Map(),
  connect: () => {
    const { stompClient } = get();
    if (!stompClient.connected) {
      stompClient.activate();
    }
  },
  disconnect: () => {
    const { stompClient, subscriptions } = get();
    if (stompClient.connected) {
      for (const [topic, sub] of subscriptions) {
        sub.unsubscribe();
        subscriptions.delete(topic);
      }

      set({ subscriptions, status: "DISCONNECTED" });
      stompClient.deactivate();
    }
  },
  subscribe: (topic, cb) => {
    const { stompClient, subscriptions } = get();

    if (subscriptions.has(topic)) return subscriptions.get(topic)!;

    const sub = stompClient.subscribe(topic, cb);
    subscriptions.set("/topic/order", sub);

    set({ subscriptions });

    return sub;
  },
  unsubscribe: (topic) => {
    const { subscriptions } = get();
    subscriptions.get(topic)?.unsubscribe();
    subscriptions.delete(topic);
    set({ subscriptions });
  },
}));
