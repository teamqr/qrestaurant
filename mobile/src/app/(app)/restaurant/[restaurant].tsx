import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { theme } from "@/common/theme";
import { CartButton } from "@/components/@restaurant/cart-button";
import { CategoryList } from "@/components/@restaurant/category-list";
import { MealList } from "@/components/@restaurant/meal-list";
import { IconButton } from "@/components/icon-button";
import { QrCode, Search } from "@/components/icons";
import { Input } from "@/components/input";
import { AppText } from "@/components/text";
import { useRestaurant } from "@/hooks/query/useRestaurant";
import { useTable } from "@/hooks/query/useTable";
import { useRestaurantSessionStore } from "@/stores/restaurant-session";

export default function RestaurantPage() {
  const router = useRouter();
  const [category, setCategory] = useState<number>();
  const tableCode = useRestaurantSessionStore((state) => state.tableCode);
  const { restaurant: id } = useLocalSearchParams<{ restaurant: string }>();

  const query = useRestaurant(+id!);
  const tableQuery = useTable({
    restaurantId: +id!,
    code: tableCode,
  });

  if (query.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      />
    );
  }

  if (query.isError) {
    return <AppText>Wystąpił błąd</AppText>;
  }

  const { restaurant } = query.data!;
  const { table } = tableQuery.data || {};

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing(3),
        paddingTop: theme.spacing(4),
        gap: theme.spacing(2),
      }}
    >
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: theme.spacing(1),
        }}
      >
        <AppText style={styles.title} weight="bold">
          {restaurant?.name}
        </AppText>
        {table ? (
          <View style={styles.tableDetailsContainer}>
            <QrCode color={theme.colors.secondaryLight} />
            <AppText
              style={{
                color: theme.colors.secondaryLight,
                fontSize: 16,
              }}
            >
              stolik <AppText weight="bold">#{table?.number}</AppText>
            </AppText>
          </View>
        ) : (
          <View style={styles.tableDetailsContainer}>
            <AppText
              style={{
                color: theme.colors.textOnBackground,
                fontSize: 16,
              }}
            >
              Nie zeskanowano kodu
            </AppText>
            <IconButton
              onPress={() => {
                router.push("/scanner");
              }}
              icon={<QrCode />}
            />
          </View>
        )}
      </View>
      <Input prefix={<Search />} placeholder="na co masz ochotę?" />

      <CategoryList
        onCategoryChange={(c) => {
          if (category === c) {
            setCategory(undefined);
          } else {
            setCategory(c);
          }
        }}
        category={category}
      />

      <MealList table={table} category={category} />

      {table && <CartButton restaurantId={restaurant?.id} />}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: theme.colors.textOnBackground,
    fontSize: 32,
  },
  tableDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
  },
});
