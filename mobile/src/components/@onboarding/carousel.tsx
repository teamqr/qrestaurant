import { Dimensions, View } from "react-native";
import { AppText } from "../text";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { theme } from "@/common/theme";
import { Image } from "expo-image";
import { TextLogo } from "../ui/text-logo";
import { Button } from "../button";
import { ArrowForward } from "../icons";
import { OnboardingIndicator } from "./indicator";

const items = [
  {
    image: require("assets/images/onboarding_1.png"),
    description:
      "Witaj w QRestaurant! Nasza aplikacja ułatwia zamawianie jedzenia w każdej restauracji. Przeglądaj menu, składaj zamówienia i płac za pomocą kilku kliknięć. Nie musisz już czekać na kelnera, aby złożyć zamówienie. Z QRestaurant zamawianie jedzenia jest szybkie i łatwe!",
  },
  {
    image: require("assets/images/onboarding_2.png"),
    description: "",
  },
  {
    image: require("assets/images/onboarding_1.png"),
    description: "",
  },
];

const ITEM_WIDTH = Dimensions.get("window").width;

export const OnboardingCarousel = () => {
  const activeIndex = useSharedValue(0);

  const handler = useAnimatedScrollHandler((event) => {
    activeIndex.value = event.contentOffset.x / ITEM_WIDTH;
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        horizontal
        // decelerationRate="fast"
        // snapToInterval={ITEM_WIDTH}
        pagingEnabled
        style={{ flex: 1 }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handler}
      >
        {items.map(({ image, description }, index) => (
          <Item
            key={index}
            index={index}
            activeIndex={activeIndex}
            image={image}
            description={description}
          />
        ))}
      </Animated.ScrollView>

      <View
        style={{
          paddingHorizontal: theme.spacing(3),
          gap: theme.spacing(3),
        }}
      >
        <OnboardingIndicator items={items.length} activeIndex={activeIndex} />

        <Button
          label="Łapię, pokaż więcej"
          icon={<ArrowForward color="white" />}
        />
      </View>
    </View>
  );
};

const Item = ({
  index,
  activeIndex,
  image,
  description,
}: {
  index: number;
  activeIndex: Animated.SharedValue<number>;
  image: any;
  description: string;
}) => {
  const rStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            activeIndex.value,
            [index - 1, index, index + 1],
            [0.5, 1, 0.5],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: ITEM_WIDTH,
          alignItems: "center",
          paddingHorizontal: theme.spacing(3),
          gap: theme.spacing(3),
        },
        rStyles,
      ]}
    >
      <Image
        source={image}
        style={{
          width: ITEM_WIDTH * 0.65,
          aspectRatio: 1,
          marginBottom: theme.spacing(3),
        }}
        contentFit="contain"
        contentPosition="center"
      />

      <TextLogo
        style={{
          alignSelf: "flex-start",
        }}
      />

      <AppText
        style={{
          fontSize: 16,
          color: "white",
          textAlign: "justify",
          lineHeight: 24,
        }}
      >
        {description}
      </AppText>
    </Animated.View>
  );
};
