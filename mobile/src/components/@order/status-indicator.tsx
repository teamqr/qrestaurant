import {
  Canvas,
  LinearGradient,
  RoundedRect,
} from "@shopify/react-native-skia";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { theme } from "@/common/theme";
import { OrderStatus } from "@/common/types";

export const StatusIndicator = ({ status }: { status?: OrderStatus }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <IndicatorItem active={status !== "CANCELED"} />
      <IndicatorItem active={status === "COMPLETED"} />
    </View>
  );
};

const IndicatorItem = ({ active }: { active?: boolean }) => {
  const canvasWidth = useSharedValue(0);
  const gradientOffest = useSharedValue(0);

  useEffect(() => {
    gradientOffest.value = 0;

    if (!active) {
      gradientOffest.value = withRepeat(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
    }
  }, [active]);

  const rStyle = useAnimatedStyle(() => {
    return {
      flex: withSpring(active ? 2 : 1),
    };
  });

  const gradientEnd = useDerivedValue(() => {
    return { x: canvasWidth.value, y: 0 };
  });

  const gradientTransform = useDerivedValue(() => {
    return [
      {
        translateX: (gradientOffest.value - 0.5) * (canvasWidth.value * 1.1),
      },
    ];
  });

  return (
    <Animated.View style={[rStyle, { flexDirection: "row" }]}>
      <Canvas
        style={{
          flex: 1,
          height: 16,
        }}
        onLayout={({ nativeEvent }) => {
          canvasWidth.value = nativeEvent.layout.width - 8;
        }}
      >
        <RoundedRect
          width={canvasWidth}
          height={12}
          r={8}
          x={4}
          y={2}
          color={theme.colors.secondary}
          // style={active ? "stroke" : "fill"}
          strokeWidth={active ? 4 : 0}
        >
          {!active && (
            <LinearGradient
              start={{ x: 0, y: 14 }}
              end={gradientEnd}
              transform={gradientTransform}
              colors={[
                // "transparent",
                theme.colors.background,
                theme.colors.secondary,
                theme.colors.background,
              ]}
            />
          )}
        </RoundedRect>
      </Canvas>
    </Animated.View>
    // <Animated.View
    //   style={[
    //     {
    //       height: 12,
    //       borderRadius: 6,
    //       backgroundColor: theme.colors.secondary,
    //     },
    //     rStyle,
    //   ]}
    // />
  );
};
