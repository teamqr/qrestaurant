import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";

import axios from "@/services/axios";
import { useRestaurantSessionStore } from "@/stores/restaurant-session";

const getMeals = async (id: string) => {
  const { data } = await axios.get(`api/app/meal`, {
    params: {
      restaurantId: id,
    },
  });
  return data;
};

export const MealList = () => {
  const { restaurant } = useRestaurantSessionStore();

  const query = useQuery({
    queryKey: ["restaurant", restaurant?.id, "meals"],
    queryFn: () => getMeals(restaurant?.id!),
    enabled: !!restaurant,
  });

  if (query.isLoading) {
    return null;
  }

  console.log(query.data);

  return (
    <View>
      <Text
        style={{
          color: "white",
        }}
      >
        {restaurant?.name}
      </Text>
    </View>
  );
};
