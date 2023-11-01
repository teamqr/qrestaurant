import { Text, View } from "react-native";
import { theme } from "../common/theme";
import { Image } from "expo-image";
import { TextLogo } from "@/components/ui/text-logo";
import { Button } from "@/components/button";
import { ArrowForward } from "@/components/icons";

export default function RootPage() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        // alignItems: "center",
        paddingHorizontal: theme.spacing(3),
        gap: theme.spacing(4),
      }}
    >
      <Image
        style={{
          width: "75%",
          aspectRatio: 1,
          alignSelf: "center",
        }}
        contentFit="contain"
        source={require("assets/images/onboarding_1.png")}
      />

      <TextLogo style={{ fontSize: 32 }} />

      <Text
        style={{
          color: theme.colors.textOnBackground,
          fontFamily: theme.fontFamilies.OpenSansRegular,
          fontSize: 16,
          letterSpacing: 1,
          lineHeight: 24,
          textAlign: "left",
        }}
      >
        Skanując{" "}
        <Text
          style={{
            fontFamily: theme.fontFamilies.OpenSansExtraBold,
          }}
        >
          kod QR
        </Text>{" "}
        dostępny przy stoliku, automatycznie stajesz się klientem restauracji.
        Po tym, pozostanie Ci już tylko złożyć zamówienie!
      </Text>

      <View style={{ marginTop: "auto" }} />

      <Button
        label="Łapię, pokaż więcej"
        icon={<ArrowForward color="white" />}
      />

      <View style={{ marginBottom: theme.spacing(2) }} />
    </View>
  );
}
