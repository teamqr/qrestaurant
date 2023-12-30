import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, View } from "react-native";

import { theme } from "@/common/theme";
import { OrderSummary } from "@/common/types";
import { StatusIndicator } from "@/components/@order/status-indicator";
import { AppText } from "@/components/text";
import { useOrder } from "@/hooks/query/useOrder";
import { useFixedInsets } from "@/hooks/useFixedInsets";
import { useSubscribeWebSocket } from "@/hooks/useSubscribeWebSocket";
import { formatter } from "@/utils/formatter";

const STATUS_MAP = {
  IN_PROGRESS: "W trakcie przygotowania",
  COMPLETED: "Zrealizowane",
  CANCELED: "Anulowane",
} as const satisfies Record<OrderSummary["status"], string>;

export default function OrderPage() {
  const queryClient = useQueryClient();
  const { order: orderId } = useLocalSearchParams<{ order: string }>();
  const { bottom } = useFixedInsets();

  const { data } = useOrder(+orderId);

  const { data: liveData } = useSubscribeWebSocket({
    initialData: data,
    topic: `/topic/order/${orderId}`,
  });

  useEffect(() => {
    if (liveData) {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  }, [liveData]);

  const { order } = liveData ?? {};

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing(3),
      }}
    >
      <FlatList
        data={order?.meals}
        renderItem={({ item }) => <OrderItem meal={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          gap: theme.spacing(3),
        }}
      />

      <View
        style={{
          marginTop: "auto",
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing(1),
          marginBottom: theme.spacing(2),
        }}
      >
        <AppText weight="bold" style={{ color: theme.colors.textOnBackground }}>
          {STATUS_MAP[order?.status ?? "IN_PROGRESS"]}
        </AppText>

        <View style={{ flex: 1 }}>
          <StatusIndicator status={order?.status} />
        </View>
      </View>

      <View
        style={{
          marginBottom: bottom + theme.spacing(3),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <AppText
          style={{
            color: theme.colors.textOnBackground,
          }}
        >
          Zapłacono
        </AppText>

        <AppText
          weight="bold"
          style={{
            color: theme.colors.textOnBackground,
            fontSize: 24,
          }}
        >
          {formatter.format(order?.price ?? 0)}
        </AppText>
      </View>
    </View>
  );
}

const OrderItem = ({ meal }: { meal: OrderSummary["meals"][number] }) => {
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flexDirection: "row",
      }}
    >
      <View style={{ flex: 1 }}>
        <AppText
          weight="bold"
          style={{
            color: theme.colors.textOnBackground,
            fontSize: 16,
          }}
        >
          {meal.name}
        </AppText>
        <AppText
          style={{
            color: theme.colors.textOnBackground,
            fontSize: 12,
          }}
        >
          {meal.amount}x · {meal.description}
        </AppText>
      </View>
      <AppText
        style={{
          color: theme.colors.textOnBackground,
          fontSize: 16,
          fontFamily: theme.fontFamilies.OpenSansBold,
        }}
      >
        {formatter.format(meal.totalPrice)}
      </AppText>
    </View>
  );
};
