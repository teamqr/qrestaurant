import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Pressable, StyleSheet, View } from "react-native";

import { IconButton } from "../icon-button";
import { ShoppingCardPlus } from "../icons";
import { AppText } from "../text";

import { theme } from "@/common/theme";
import { Meal } from "@/common/types";
import { useFixedInsets } from "@/hooks/useFixedInsets";
import axios from "@/services/axios";
import { useRestaurantSessionStore } from "@/stores/restaurant-session";

const getMeals = async (id: string) => {
  const { data } = await axios.get<{ meals: Meal[] }>(`api/app/meal`, {
    params: {
      restaurantId: id,
    },
  });
  return data;
};

export const MealList = () => {
  const { restaurant } = useRestaurantSessionStore();
  const { bottom } = useFixedInsets();

  const query = useQuery({
    queryKey: ["restaurant", restaurant?.id, "meals"],
    queryFn: () => getMeals(restaurant?.id!),
    enabled: !!restaurant,
  });

  if (query.isLoading) {
    return null;
  }

  // width - screen padding - item padding
  const estimatedSize = 96;

  return (
    <FlashList
      data={query.data?.meals}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: bottom,
      }}
      renderItem={({ item, index }) => (
        <Pressable onPress={() => {}} style={[styles.card]}>
          <View style={styles.cardContent}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                gap: theme.spacing(1),
              }}
            >
              <View style={{ flex: 1 }}>
                <AppText
                  style={{
                    color: "white",
                    fontSize: 18,
                  }}
                  numberOfLines={1}
                  weight="bold"
                >
                  {item.name}
                </AppText>
                <AppText
                  style={{
                    fontSize: 10,
                    color: "white",
                  }}
                  numberOfLines={1}
                >
                  {item.description}
                </AppText>
                <AppText
                  style={{
                    marginTop: theme.spacing(2),
                    color: "white",
                  }}
                  numberOfLines={1}
                  weight="bold"
                >
                  {item.price.toFixed(2)} zł
                </AppText>
              </View>
              <IconButton
                onPress={() => {}}
                icon={<ShoppingCardPlus color="white" width={16} height={16} />}
                variant="xs"
              />
            </View>
          </View>
        </Pressable>
      )}
      estimatedItemSize={estimatedSize}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    // flex: 1,
    borderRadius: theme.radii.medium,
    marginBottom: theme.spacing(2),
    overflow: "hidden",
    width: "100%",
  },
  cardContent: {
    marginTop: "auto",
    padding: theme.spacing(2),
    gap: theme.spacing(0.5),
  },
});
