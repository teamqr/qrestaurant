import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Restaurant } from "@/common/types";
import { AppText } from "@/components/text";
import axios from "@/services/axios";
import { StyleSheet, View } from "react-native";
import { theme } from "@/common/theme";
import { Button } from "@/components/button";
import { QrCode, Search } from "@/components/icons";
import { IconButton } from "@/components/icon-button";
import { Input } from "@/components/input";
import { Suspense, useEffect } from "react";
import { useRestaurantSessionStore } from "@/stores/restaurant-session";
import { MealList } from "@/components/@restaurant/meal-list";

const getRestaurant = async (id: string) => {
  const { data } = await axios.get<{ restaurant: Restaurant }>(
    `api/app/restaurant/${id}`,
  );
  return data;
};

export default function RestaurantPage() {
  const beginSession = useRestaurantSessionStore((state) => state.beginSession);
  const router = useRouter();
  const { restaurant: id } = useLocalSearchParams<{ restaurant: string }>();

  const query = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurant(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (query.isSuccess) {
      beginSession(query.data!.restaurant);
    }
  }, [query.isLoading]);

  if (query.isLoading) {
    return null;
  }

  if (query.isError) {
    return <AppText>Wystąpił błąd</AppText>;
  }

  const { restaurant } = query.data!;

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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing(2),
          }}
        >
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
      </View>
      <Input prefix={<Search />} placeholder="na co masz ochotę?" />

      <MealList />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: theme.colors.textOnBackground,
    fontSize: 32,
  },
});
