import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

import { Check } from "../icons";

import { theme } from "@/common/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  hasError?: boolean;
};

export const Checkbox = ({ onChange, value, hasError = false }: Props) => {
  const colorProgress = useDerivedValue(() => withTiming(hasError ? 1 : 0));

  const rAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        colorProgress.value,
        [0, 1],
        [theme.colors.secondary, theme.colors.dangerLight],
      ),
      borderColor: interpolateColor(
        colorProgress.value,
        [0, 1],
        [theme.colors.secondaryLight, theme.colors.danger],
      ),
    };
  });

  return (
    <AnimatedPressable
      style={[styles.container, rAnimatedStyle]}
      onPress={() => {
        onChange(!value);
      }}
    >
      {value && <Check color="white" width={16} height={16} />}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: theme.colors.secondaryLight,
    borderRadius: theme.radii.small,
  },
});
