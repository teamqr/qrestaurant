import { useRouter } from "expo-router";
import { memo } from "react";
import { Pressable } from "react-native";

import { AppText } from "../text";

import { theme } from "@/common/theme";
import { OrderSummary } from "@/common/types";
import { useRestaurant } from "@/hooks/query/useRestaurant";
import { dateFormatter, formatter } from "@/utils/formatter";

type Props = {
  order: OrderSummary;
};

export const ReceiptItem = memo(({ order }: Props) => {
  const router = useRouter();
  const { data } = useRestaurant(order.restaurantId);

  const { restaurant } = data ?? {};

  return (
    <Pressable
      onPress={() => {
        router.push(`/(app)/order/${order.id}`);
      }}
      style={{
        width: "100%",
        padding: theme.spacing(2),
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        borderRadius: theme.radii.medium,
      }}
    >
      <AppText
        style={{
          color: theme.colors.textOnBackground,
        }}
      >
        {dateFormatter.format(new Date(order.orderDate))}
      </AppText>
      <AppText
        weight="bold"
        style={{
          color: theme.colors.textOnBackground,
          fontSize: 24,
        }}
      >
        {restaurant?.name}
      </AppText>
      <AppText
        weight="bold"
        style={{
          color: theme.colors.textOnBackground,
          // fontSize: 24,
        }}
      >
        {formatter.format(order.price)}
      </AppText>
    </Pressable>
  );
});
