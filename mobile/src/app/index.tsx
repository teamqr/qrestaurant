import { OnboardingCarousel } from "@/components/@onboarding/carousel";
import { Button } from "@/components/button";
import { ArrowForward } from "@/components/icons";
import { useFixedInsets } from "@/hooks/useFixedInsets";
import { View } from "react-native";
import { theme } from "../common/theme";

export default function RootPage() {
  const { bottom } = useFixedInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        // paddingHorizontal: theme.spacing(3),
        gap: theme.spacing(4),
        paddingBottom: bottom,
      }}
    >
      <OnboardingCarousel />
    </View>
  );
}
