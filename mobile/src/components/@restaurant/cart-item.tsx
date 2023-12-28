import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { IconButton } from "../icon-button";
import { Minus, Plus, Trash } from "../icons";
import { AppText } from "../text";

import { theme } from "@/common/theme";
import { Meal } from "@/common/types";
import axios from "@/services/axios";
import { useRestaurantSessionStore } from "@/stores/restaurant-session";
import { formatter } from "@/utils/formatter";

const getMeal = async (id: number, restaurantId: number) => {
  const { data } = await axios.get<{ meal: Meal }>(`/api/app/meal/${id}`, {
    params: {
      restaurantId,
    },
  });
  return data;
};

type Props = {
  id: number;
  restaurantId?: number;
  onAddToCart: (quantity: number) => void;
  onRemoveFromCart: () => void;
};

export const CartItem = memo(
  ({ id, restaurantId, onAddToCart, onRemoveFromCart }: Props) => {
    const cartEntry = useRestaurantSessionStore((state) =>
      state.cart.find((entry) => entry.id === id),
    );

    const { data, isLoading } = useQuery({
      queryKey: ["restaurant", restaurantId, "meals", id],
      queryFn: () => getMeal(id, restaurantId!),
      enabled: !!restaurantId && !!id,
    });

    if (isLoading) return null;

    const meal = data?.meal;

    const price = (cartEntry?.quantity ?? 1) * (meal?.price ?? 1);

    return (
      <Animated.View
        style={{
          flexDirection: "row",
        }}
        entering={FadeIn}
        exiting={FadeOut}
      >
        <View
          style={{
            gap: theme.spacing(2),
            flex: 1,
          }}
        >
          <View
            style={{
              gap: theme.spacing(1),
            }}
          >
            <AppText
              weight="bold"
              style={[
                styles.text,
                {
                  fontSize: 16,
                },
              ]}
            >
              {meal?.name}
            </AppText>
            <AppText style={[styles.text]}>
              {cartEntry?.quantity}x · {meal?.description}
            </AppText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: theme.spacing(2),
            }}
          >
            <CountButton
              count={cartEntry?.quantity}
              onAdd={() => onAddToCart(1)}
              onSubtract={() => onAddToCart(-1)}
            />
            <IconButton
              onPress={() => {
                onRemoveFromCart();
              }}
              variant="xs"
              icon={<Trash color="white" width={16} height={16} />}
            />
          </View>
        </View>

        <AppText weight="bold" style={[styles.text]}>
          {formatter.format(price)}
        </AppText>
      </Animated.View>
    );
  },
);

const CountButton = ({
  count,
  onAdd,
  onSubtract,
}: {
  count?: number;
  onSubtract?: () => void;
  onAdd?: () => void;
}) => {
  return (
    <View style={styles.countButtonContainer}>
      <TouchableOpacity
        onPress={onSubtract}
        activeOpacity={0.5}
        style={{
          paddingHorizontal: theme.spacing(2),
          borderRightWidth: 1,
          alignSelf: "stretch",
          justifyContent: "center",
          borderRightColor: theme.colors.secondary,
          backgroundColor: theme.colors.card,
        }}
      >
        <Minus width={16} height={16} />
      </TouchableOpacity>
      <AppText
        weight="bold"
        style={[
          styles.text,
          {
            paddingHorizontal: theme.spacing(3),
          },
        ]}
      >
        {count}
      </AppText>
      <TouchableOpacity
        onPress={onAdd}
        activeOpacity={0.5}
        style={{
          paddingHorizontal: theme.spacing(2),
          borderLeftWidth: 1,
          borderLeftColor: theme.colors.secondary,
          alignSelf: "stretch",
          justifyContent: "center",
          backgroundColor: theme.colors.card,
        }}
      >
        <Plus width={16} height={16} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textOnBackground,
  },
  countButtonContainer: {
    overflow: "hidden",
    borderRadius: theme.radii.medium,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
});
