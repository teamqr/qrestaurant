import { View } from "react-native";

import { theme } from "../common/theme";

import { OnboardingCarousel } from "@/components/@onboarding/carousel";
import { useFixedInsets } from "@/hooks/useFixedInsets";

export default function RootPage() {
  const { bottom } = useFixedInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        gap: theme.spacing(4),
        paddingBottom: bottom,
      }}
    >
      <OnboardingCarousel />
    </View>
  );
}
