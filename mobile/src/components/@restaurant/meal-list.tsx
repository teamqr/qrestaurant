import { useQuery } from "@tanstack/react-query";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

import { IconButton } from "../icon-button";
import { ShoppingCardPlus } from "../icons";
import { AppText } from "../text";

import { theme } from "@/common/theme";
import { Meal, Table } from "@/common/types";
import { useRestaurant } from "@/hooks/query/useRestaurant";
import { useFixedInsets } from "@/hooks/useFixedInsets";
import axios from "@/services/axios";
import { useRestaurantSessionStore } from "@/stores/restaurant-session";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const getMeals = async (id: string) => {
  const { data } = await axios.get<{ meals: Meal[] }>(`api/app/meal`, {
    params: {
      restaurantId: id,
    },
  });
  return data;
};

type Props = {
  table?: Table;
  category?: number;
};

export const MealList = ({ table, category }: Props) => {
  const { restaurantId } = useRestaurantSessionStore();
  const restaurantQuery = useRestaurant(restaurantId!);
  const { bottom } = useFixedInsets();

  const restaurant = restaurantQuery.data?.restaurant;

  const query = useQuery({
    queryKey: ["restaurant", restaurant?.id, "meals"],
    queryFn: () => getMeals(restaurant?.id!),
    enabled: !!restaurant,
  });

  if (query.isLoading) {
    return null;
  }

  const filteredData = category
    ? query.data?.meals.filter((meal) =>
        meal.mealCategoryIds.includes(category!),
      )
    : query.data?.meals;

  return (
    <Animated.FlatList
      data={filteredData}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: bottom + theme.spacing(10),
      }}
      keyExtractor={(item) => item.id.toString()}
      itemLayoutAnimation={Layout.springify()}
      renderItem={({ item, index }) => (
        <AnimatedPressable
          onPress={() => {}}
          style={[styles.card]}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Animated.View style={styles.cardContent}>
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
              {table && (
                <IconButton
                  onPress={() => {}}
                  icon={
                    <ShoppingCardPlus color="white" width={16} height={16} />
                  }
                  variant="xs"
                />
              )}
            </View>
          </Animated.View>
        </AnimatedPressable>
      )}
      // estimatedItemSize={estimatedSize}
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
