import { useEffect, useState } from "react";

import { useStompStore } from "@/stores/stomp";

type Options<Data> = {
  initialData?: Data;
  topic: string;
};

export const useSubscribeWebSocket = <Data,>({
  initialData,
  topic,
}: Options<Data>) => {
  const { connect, disconnect, subscribe, status } = useStompStore();
  const [data, setData] = useState<Data | undefined>(initialData);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (status === "DISCONNECTED") return;

    const sub = subscribe(topic, (data) => {
      const parsed = JSON.parse(data.body) as Data;
      setData(parsed);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [status, topic]);

  return { data };
};
