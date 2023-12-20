import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { ShoppingCart } from "../icons";
import { ShadowContainer } from "../shadow-container";
import { AppText } from "../text";

import { theme } from "@/common/theme";
import { useFixedInsets } from "@/hooks/useFixedInsets";
import { useTotalCartPrice } from "@/hooks/useTotalCartPrice";
import { formatter } from "@/utils/formatter";

const BUTTON_OFFSET = theme.spacing(3);

type Props = {
  restaurantId?: number;
};

export const CartButton = ({ restaurantId }: Props) => {
  const { bottom } = useFixedInsets();
  const router = useRouter();

  const total = useTotalCartPrice();

  const rStyles = useAnimatedStyle(() => {
    return {
      bottom: withSpring(total > 0 ? bottom + BUTTON_OFFSET : -100),
    };
  }, [total, bottom]);

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: 0,
          right: 0,
          paddingHorizontal: theme.spacing(3),
        },
        rStyles,
      ]}
    >
      <ShadowContainer>
        <Pressable
          onPress={() => router.push("/(app)/cart")}
          style={[styles.cartButton]}
        >
          <AppText
            weight="bold"
            style={{
              color: "white",
              flex: 1,
            }}
          >
            Przejdź do koszyka
          </AppText>

          <ShoppingCart color="white" />

          <View
            style={{
              backgroundColor: theme.colors.secondaryLight,
              paddingHorizontal: theme.spacing(2),
              marginVertical: theme.spacing(0.5),
              borderRadius: theme.radii.medium - theme.spacing(0.5),
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
            <AppText
              weight="bold"
              style={{
                color: "white",
              }}
            >
              {formatter.format(total)}
            </AppText>
          </View>
        </Pressable>
      </ShadowContainer>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondaryLight,
    borderWidth: 1,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(0.5),
    borderRadius: theme.radii.medium,
    height: 56,
    gap: theme.spacing(2),
  },
});
