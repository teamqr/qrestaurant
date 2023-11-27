import { Canvas, RoundedRect, Shadow } from "@shopify/react-native-skia";
import { ReactNode, useState } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

import { theme } from "@/common/theme";

const OFFSET = 128;
const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);

type Props = {
  children: ReactNode;
  radius?: number;
  shadowColor?: string;
};

export const ShadowContainer = ({
  children,
  radius = theme.radii.medium,
  shadowColor = theme.colors.shadow,
}: Props) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const sizeRendered = useDerivedValue(
    () => size.width !== 0 && size.height !== 0,
    [size],
  );

  const rStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(sizeRendered.value ? 1 : 0),
    };
  });

  return (
    <View>
      <View
        onLayout={(e) => {
          const { height, width } = e.nativeEvent.layout;
          setSize({ width, height });
        }}
        style={{
          zIndex: 1,
        }}
      >
        {children}
      </View>

      <AnimatedCanvas
        style={[
          {
            position: "absolute",
            width: size.width + OFFSET,
            height: size.height + OFFSET,
            transform: [
              { translateX: -OFFSET / 2 },
              { translateY: -OFFSET / 2 },
            ],
          },
          rStyles,
        ]}
      >
        <RoundedRect
          x={OFFSET / 2}
          y={OFFSET / 2}
          width={size.width}
          height={size.height}
          r={radius}
        >
          <Shadow color={shadowColor} blur={12} dx={0} dy={0} shadowOnly />
        </RoundedRect>
      </AnimatedCanvas>
    </View>
  );
};
