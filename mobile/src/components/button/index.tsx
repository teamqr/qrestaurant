import { useEffect, type ComponentProps, type ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { Loader } from "../icons";

import { theme } from "@/common/theme";
import { instyle } from "@/lib/instyle";

type ButtonType = ComponentProps<typeof _Button>["variant"];

type Props = {
  label: ReactNode;
  icon?: ReactNode;
  variant?: ButtonType;
  onPress?: () => void;
  loading?: boolean;
};

export const Button = ({
  label,
  icon,
  variant = "contained",
  onPress,
  loading = false,
}: Props) => {
  const loaderRotation = useSharedValue("0deg");
  const labelWidth = useSharedValue(0);

  useEffect(() => {
    if (loading) {
      loaderRotation.value = withRepeat(
        withTiming("360deg", { duration: 1000, easing: Easing.linear }),
        -1,
        false,
      );
    } else {
      loaderRotation.value = withTiming("0deg", {
        duration: 1000,
        easing: Easing.linear,
      });
    }
  }, [loading]);

  const rLabelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(loading ? -labelWidth.value : 0),
        },
      ],
    };
  });

  const rIconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(loading ? 100 : 0),
        },
      ],
    };
  });

  const rLoaderStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(loading ? 1 : 0),
      transform: [
        {
          scale: withSpring(loading ? 1 : 0),
        },
        {
          rotate: loaderRotation.value,
        },
      ],
    };
  });

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(loading ? 0.5 : 1),
    };
  });

  return (
    <Animated.View style={rContainerStyle}>
      <_Button
        style={[
          {
            justifyContent: icon ? "space-between" : "flex-start",
            gap: icon ? theme.spacing(2) : 0,
            overflow: "hidden",
          },
        ]}
        variant={variant}
        onPress={onPress}
        disabled={loading}
      >
        <Animated.View
          onLayout={(e) => {
            labelWidth.value = e.nativeEvent.layout.width + theme.spacing(4);
          }}
          style={rLabelStyle}
        >
          {typeof label === "string" ? (
            <Text style={styles.label}>{label}</Text>
          ) : (
            label
          )}
        </Animated.View>
        <Animated.View style={rIconStyle}>{icon}</Animated.View>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              justifyContent: "center",
              alignItems: "center",
            },
            rLoaderStyle,
          ]}
        >
          <Loader color="white" />
        </Animated.View>
      </_Button>
    </Animated.View>
  );
};

const _Button = instyle(Pressable, {
  style: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderColor: theme.colors.secondaryLight,
    borderWidth: 1,
    paddingHorizontal: theme.spacing(3),
    height: theme.spacing(7),
  },
  variants: {
    contained: {
      backgroundColor: theme.colors.secondary,
    },
    outlined: {
      backgroundColor: theme.colors.background,
    },
  },
  defaultVariant: "contained",
});

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    fontFamily: theme.fontFamilies.OpenSansBold,
    color: theme.colors.textOnSecondary,
  },
});
