import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import { IconButton } from "../icon-button";
import { QrCode, Receipt, Settings } from "../icons";

import { theme } from "@/common/theme";
import { useFixedInsets } from "@/hooks/useFixedInsets";

export const RestaurantsNavigation = () => {
  const { bottom } = useFixedInsets();
  const router = useRouter();

  return (
    <View
      style={[
        {
          paddingBottom: bottom + 2,
        },
        styles.container,
      ]}
    >
      <IconButton
        icon={<Receipt color="white" />}
        onPress={() => {
          router.push("/(app)/orders");
        }}
      />
      <IconButton
        icon={<QrCode color="white" />}
        variant="large"
        onPress={() => {
          router.push("/(app)/scanner");
        }}
      />
      <IconButton
        icon={<Settings color="white" />}
        onPress={() => {
          router.push("/(app)/settings");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.secondary,
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing(3) + 2,
    paddingTop: theme.spacing(2),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(4),
  },
});
