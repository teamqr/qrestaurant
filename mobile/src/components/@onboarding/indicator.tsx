import { theme } from "@/common/theme";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

export const OnboardingIndicator = ({
  items,
  activeIndex,
}: {
  items: number;
  activeIndex: Animated.SharedValue<number>;
}) => {
  return (
    <View style={styles.container}>
      {new Array(items).fill(0).map((_, index) => (
        <IndicatorItem key={index} index={index} activeIndex={activeIndex} />
      ))}
    </View>
  );
};

const IndicatorItem = ({
  activeIndex,
  index,
}: {
  index: number;
  activeIndex: Animated.SharedValue<number>;
}) => {
  const rStyles = useAnimatedStyle(() => {
    const value = activeIndex.value;

    return {
      flex: interpolate(
        value,
        [index - 1, index, index + 1],
        [1, 3, 1],
        Extrapolate.CLAMP,
      ),
      backgroundColor: interpolateColor(
        value,
        [index - 1, index],
        [theme.colors.secondary, theme.colors.secondaryLight],
      ),
    };
  }, []);

  return <Animated.View style={[styles.item, rStyles]} />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    gap: theme.spacing(2),
  },
  item: {
    height: 6,
    borderRadius: 2,
    backgroundColor: theme.colors.secondaryLight,
  },
});
