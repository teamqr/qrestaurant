import { Redirect, useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Layout } from "react-native-reanimated";

import { theme } from "@/common/theme";
import { CartItem } from "@/components/@restaurant/cart-item";
import { Button } from "@/components/button";
import { Wallet } from "@/components/icons";
import { ShadowContainer } from "@/components/shadow-container";
import { AppText } from "@/components/text";
import { useCreateOrder } from "@/hooks/mutation/useCreateOrder";
import { useTable } from "@/hooks/query/useTable";
import { useFixedInsets } from "@/hooks/useFixedInsets";
import { useTotalCartPrice } from "@/hooks/useTotalCartPrice";
import { useRestaurantSessionStore } from "@/stores/restaurant-session";
import { formatter } from "@/utils/formatter";

export default function CartPage() {
  const restaurantId = useRestaurantSessionStore(
    (state) => state.restaurantId,
  )!;
  const tableCode = useRestaurantSessionStore((state) => state.tableCode);
  const cart = useRestaurantSessionStore((state) => state.cart);
  const addToCart = useRestaurantSessionStore((state) => state.addToCart);
  const remove = useRestaurantSessionStore((state) => state.removeFromCart);

  const table = useTable({ restaurantId, code: tableCode });
  const router = useRouter();

  const createOrder = useCreateOrder({
    onSuccess: () => {
      console.log("Order created");
    },
  });

  const total = useTotalCartPrice();

  const { bottom } = useFixedInsets();

  const handleCreateOrder = useCallback(async () => {
    const orderProducts = cart.map((item) => ({
      id: item.id,
      amount: item.quantity,
    }));

    const { order } = await createOrder.mutateAsync({
      restaurantId,
      tableId: table.data!.table.id,
      orderProducts,
    });

    router.push(`/(app)/order/${order.id}`);
  }, []);

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
    <View
      style={[
        styles.container,
        {
          paddingBottom: bottom + theme.spacing(3),
        },
      ]}
    >
      <Animated.FlatList
        data={cart}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
        itemLayoutAnimation={Layout.springify()}
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: theme.spacing(3),
          marginBottom: theme.spacing(3),
          paddingHorizontal: theme.spacing(3),
        }}
      >
        <AppText style={styles.text}>Do zapłaty</AppText>
        <AppText
          weight="bold"
          style={[
            styles.text,
            {
              fontSize: 24,
            },
          ]}
        >
          {formatter.format(total)}
        </AppText>
      </View>

      <ShadowContainer>
        <Button
          onPress={() => handleCreateOrder?.()}
          label="Zapłać za zamówienie"
          icon={<Wallet />}
          loading={createOrder.isPending}
        />
      </ShadowContainer>
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
