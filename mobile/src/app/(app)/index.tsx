import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

import { theme } from "@/common/theme";
import { Restaurant } from "@/common/types";
import { RestaurantsNavigation } from "@/components/@restaurants/navigation";
import { Search } from "@/components/icons";
import { Input } from "@/components/input";
import { AppText } from "@/components/text";
import { useFixedInsets } from "@/hooks/useFixedInsets";
import axios from "@/services/axios";
import { useRestaurantSessionStore } from "@/stores/restaurant-session";

const getRestaurants = async () => {
  const response = await axios.get<{ restaurants: Restaurant[] }>(
    "api/app/restaurant/featured",
  );
  return response.data;
};

export default function RestaurantsPage() {
  const { beginSession } = useRestaurantSessionStore();
  const router = useRouter();

  const { bottom } = useFixedInsets();
  const restaurants = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
  });

  const handleRestaurantPress = (restaurant: Restaurant) => {
    beginSession({ restaurantId: restaurant.id });
    router.push(`/(app)/restaurant/${restaurant.id}`);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          paddingHorizontal: theme.spacing(3),
          paddingVertical: theme.spacing(2),
          flexDirection: "row",
          gap: theme.spacing(2),
          alignItems: "center",
        }}
      >
        <Input
          placeholder="szukaj restauracji"
          prefix={<Search color="white" />}
          containerStyle={{ flex: 1 }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: bottom,
          paddingHorizontal: theme.spacing(3),
          paddingTop: theme.spacing(3),
          flexGrow: 1,
        }}
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            gap: theme.spacing(2),
            flex: 1,
          }}
        >
          {restaurants.data?.restaurants.map((restaurant) => (
            <Pressable
              key={restaurant.id}
              onPress={() => handleRestaurantPress(restaurant)}
            >
              <View
                style={{
                  padding: theme.spacing(3),
                  backgroundColor: theme.colors.card,
                  borderWidth: 1,
                  borderColor: theme.colors.secondary,
                  borderRadius: theme.radii.medium,
                  gap: theme.spacing(1),
                }}
              >
                <AppText
                  style={{
                    color: theme.colors.textOnBackground,
                    fontSize: 24,
                  }}
                  weight="bold"
                >
                  {restaurant.name}
                </AppText>
                <AppText
                  style={{
                    color: theme.colors.textOnBackground,
                    fontSize: 16,
                  }}
                >
                  1 kilometr stąd
                </AppText>
                <AppText
                  style={{
                    color: theme.colors.textOnBackground,
                    fontSize: 16,
                  }}
                  weight="bold"
                >
                  $$
                  <AppText
                    style={{
                      color: theme.colors.secondaryLight,
                    }}
                    weight="regular"
                  >
                    $
                  </AppText>
                </AppText>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <RestaurantsNavigation />
    </View>
  );
}
