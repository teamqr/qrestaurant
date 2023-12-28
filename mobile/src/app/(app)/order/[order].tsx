import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { FlatList, View } from "react-native";

import { theme } from "@/common/theme";
import { OrderSummary } from "@/common/types";
import { AppText } from "@/components/text";
import { useMeal } from "@/hooks/query/useMeal";
import { useOrder } from "@/hooks/query/useOrder";
import { useFixedInsets } from "@/hooks/useFixedInsets";
import { useSubscribeWebSocket } from "@/hooks/useSubscribeWebSocket";
import { formatter } from "@/utils/formatter";

export default function OrderPage() {
  const { order: orderId } = useLocalSearchParams<{ order: string }>();
  const { bottom } = useFixedInsets();

  const { data } = useOrder(+orderId);

  const { data: liveData } = useSubscribeWebSocket({
    initialData: data,
    topic: `/topic/order/${orderId}`,
  });

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
        }}
      >
        <AppText style={{ color: theme.colors.textOnBackground }}>
          Status: {order?.status}
        </AppText>
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
