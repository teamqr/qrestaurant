import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

import { theme } from "@/common/theme";
import { Order } from "@/common/types";
import { AppText } from "@/components/text";
import axios from "@/services/axios";

const getOrder = async (id: number) => {
  const { data } = await axios.get<{ order: Order }>(`/api/app/order/${id}`);
  return data;
};

export default function OrderPage() {
  const { order } = useLocalSearchParams<{ order: string }>();

  const { data } = useQuery({
    queryKey: ["order", order],
    queryFn: () => getOrder(+order!),
    enabled: !!order,
  });

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
      </AppText>
    </View>
  );
}
