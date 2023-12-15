import { FlatList, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { AppText } from "../text";

import { theme } from "@/common/theme";
import { useRestaurantCategories } from "@/hooks/query/useRestaurantCategories";
import { useRestaurantSessionStore } from "@/stores/restaurant-session";

type Props = {
  category?: number;
  onCategoryChange: (category: number) => void;
};

export const CategoryList = ({ category, onCategoryChange }: Props) => {
  const restaurantId = useRestaurantSessionStore((state) => state.restaurantId);

  const query = useRestaurantCategories({
    restaurantId,
  });

  if (query.isLoading) {
    return null;
  }

  const { mealCategories } = query.data ?? {};

  return (
    <View
      style={{
        marginLeft: -theme.spacing(3),
        marginRight: -theme.spacing(3),
      }}
    >
      <FlatList
        horizontal
        // estimatedItemSize={100}
        data={mealCategories}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing(3),
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              onCategoryChange(item.id);
            }}
          >
            <ListItem label={item.name} selected={category === item.id} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const ListItem = ({
  label,
  selected,
}: {
  label: string;
  selected?: boolean;
}) => {
  const rStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        selected ? theme.colors.secondaryLight : theme.colors.card,
      ),
    };
  });

  return (
    <Animated.View style={[styles.itemContainer, rStyles]}>
      <AppText style={styles.title} weight="bold">
        {label}
      </AppText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
  },
  itemContainer: {
    height: 32,
    borderWidth: 1,
    borderColor: theme.colors.secondaryLight,
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing(1),
    borderRadius: theme.radii.medium,
  },
});
