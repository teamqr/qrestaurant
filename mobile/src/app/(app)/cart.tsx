import { Redirect } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Layout } from "react-native-reanimated";

import { theme } from "@/common/theme";
import { CartItem } from "@/components/@restaurant/cart-item";
import { useFixedInsets } from "@/hooks/useFixedInsets";
import { useRestaurantSessionStore } from "@/stores/restaurant-session";

export default function CartPage() {
  const restaurantId = useRestaurantSessionStore((state) => state.restaurantId);
  const cart = useRestaurantSessionStore((state) => state.cart);
  const addToCart = useRestaurantSessionStore((state) => state.addToCart);
  const remove = useRestaurantSessionStore((state) => state.removeFromCart);

  const { bottom } = useFixedInsets();

  const handleAddToCart = useCallback(
    (id: number) => (quantity: number) => {
      addToCart({
        id,
        quantity,
      });
    },
    [addToCart],
  );

  const renderSeparator = useCallback(
    () => (
      <View
        style={{
          height: 1,
          width: "15%",
          marginVertical: theme.spacing(3),
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: theme.colors.secondary,
        }}
      />
    ),
    [],
  );

  if (cart.length === 0) {
    return <Redirect href=".." />;
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={cart}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
        itemLayoutAnimation={Layout.springify()}
        contentContainerStyle={{
          paddingBottom: bottom + theme.spacing(3),
        }}
        renderItem={({ item }) => {
          return (
            <CartItem
              id={item.id}
              restaurantId={restaurantId}
              onAddToCart={handleAddToCart(item.id)}
              onRemoveFromCart={() => remove(item.id)}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing(3),
    paddingTop: theme.spacing(4),
  },
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
