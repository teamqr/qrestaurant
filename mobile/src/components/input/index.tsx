import { ReactNode, forwardRef, useImperativeHandle, useRef } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

import { theme } from "@/common/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props extends TextInputProps {
  prefix?: ReactNode;
  suffix?: ReactNode;
  hasError?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Input = forwardRef<TextInput, Props>(
  ({ prefix, suffix, hasError = false, containerStyle, ...props }, ref) => {
    const colorProgress = useDerivedValue(() => withTiming(hasError ? 1 : 0));
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    const focus = () => {
      inputRef.current?.focus();
    };

    const rInputStyle = useAnimatedStyle(() => {
      return {
        borderColor: interpolateColor(
          colorProgress.value,
          [0, 1],
          [theme.colors.secondaryLight, theme.colors.danger],
        ),
      };
    });

    return (
      <AnimatedPressable
        style={[styles.container, rInputStyle, containerStyle]}
        onPress={focus}
      >
        {prefix}
        <View style={{ flex: 1 }}>
          <TextInput
            ref={inputRef}
            {...props}
            style={styles.input}
            placeholderTextColor={theme.colors.textOnBackground}
          />
          {/* <View style={[StyleSheet.absoluteFill]} /> */}
        </View>
        {suffix}
      </AnimatedPressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: theme.spacing(7),
    paddingHorizontal: theme.spacing(2),
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.secondaryLight,
    borderRadius: theme.radii.medium,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: "100%",
    borderRadius: theme.radii.medium,
    color: "white",
  },
});
