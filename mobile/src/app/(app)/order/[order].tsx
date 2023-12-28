import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { theme } from "@/common/theme";
import { AppText } from "@/components/text";
import { useOrder } from "@/hooks/query/useOrder";
import { useEffect } from "react";
import { useSubscribeWebSocket } from "@/hooks/useSubscribeWebSocket";

export default function OrderPage() {
  const { order } = useLocalSearchParams<{ order: string }>();

  const { data } = useOrder(+order);

  const { data: liveData } = useSubscribeWebSocket({
    initialData: data,
    topic: `/topic/order/${order}`,
  });

  console.log({ liveData });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing(3),
      }}
    >
      <AppText
        style={{
          color: theme.colors.textOnBackground,
          fontSize: 16,
        }}
      >
        Numer zamówienia:{" "}
        <AppText weight="extra-bold">#{data?.order?.id}</AppText>
        <AppText>{JSON.stringify(liveData, null, 2)}</AppText>
      </AppText>
    </View>
  );
}
