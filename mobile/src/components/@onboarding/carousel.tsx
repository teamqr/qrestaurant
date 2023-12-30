import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Dimensions, ScrollView, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { OnboardingIndicator } from "./indicator";
import { Button } from "../button";
import { ArrowForward, Login } from "../icons";
import { ShadowContainer } from "../shadow-container";
import { AppText } from "../text";
import { TextLogo } from "../ui/text-logo";

import { theme } from "@/common/theme";

const items = [
  {
    image: require("assets/images/onboarding_1.png"),
    description:
      "Witaj w QRestaurant! Nasza aplikacja ułatwia zamawianie jedzenia w każdej restauracji. Przeglądaj menu, składaj zamówienia i płac za pomocą kilku kliknięć. Nie musisz już czekać na kelnera, aby złożyć zamówienie. Z QRestaurant zamawianie jedzenia jest szybkie i łatwe!",
  },
  {
    image: require("assets/images/onboarding_2.png"),
    description:
      "Pomożemy Ci znaleźć restaurację, która Ci odpowiada. Wyszukaj restaurację w okolicy, sprawdź menu i ceny, a następnie zarezerwuj stolik.",
  },
  {
    image: require("assets/images/onboarding_3.png"),
    description: "Zapraszamy do korzystania z QRestaurant!\nSmacznego!",
  },
];

const ITEM_WIDTH = Dimensions.get("window").width;

export const OnboardingCarousel = () => {
  const router = useRouter();

  const activeIndex = useSharedValue(0);
  const onboardingStarted = useDerivedValue(() => activeIndex.value >= 0.5);

  const handler = useAnimatedScrollHandler((event) => {
    activeIndex.value = event.contentOffset.x / ITEM_WIDTH;
  });

  const rLoginButtonStyles = useAnimatedStyle(() => {
    const offset = 80;

    return {
      marginTop: withSpring(onboardingStarted.value ? -80 : 0),
      transform: [
        { translateY: withSpring(onboardingStarted.value ? offset : 0) },
      ],
      opacity: withTiming(onboardingStarted.value ? 0 : 1),
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        horizontal
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

        <ShadowContainer>
          <Button
            label="Łapię, pokaż więcej"
            icon={<ArrowForward color="white" />}
            onPress={() => {
              router.push("/sign-up");
            }}
          />
        </ShadowContainer>

        <Animated.View
          style={[
            {
              alignSelf: "center",
            },
            rLoginButtonStyles,
          ]}
        >
          <Button
            label="Mam już konto"
            variant="outlined"
            icon={<Login color="white" />}
            onPress={() => {
              router.push("/sign-in");
            }}
          />
        </Animated.View>
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
          width: 256,
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

      <ScrollView>
        <AppText
          style={{
            fontSize: 16,
            color: "white",
            lineHeight: 24,
            alignSelf: "flex-start",
            textAlign: "justify",
          }}
        >
          {description}
        </AppText>
      </ScrollView>
    </Animated.View>
  );
};
