import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { ArrowLeft } from "../icons";
import { AppText } from "../text";

import { theme } from "@/common/theme";
import { useFixedInsets } from "@/hooks/useFixedInsets";

type Props = {
  title?: string;
};

export const AppHeader = ({ title }: Props) => {
  const router = useRouter();
  const { top } = useFixedInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top,
        },
      ]}
    >
      <View
        style={{
          gap: theme.spacing(4),
          flex: 1,
        }}
      >
        {router.canGoBack() && (
          <TouchableOpacity onPress={router.back}>
            <ArrowLeft />
          </TouchableOpacity>
        )}
        {!!title && (
          <AppText weight="bold" style={styles.title}>
            {title}
          </AppText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: theme.colors.background,
    paddingBottom: theme.spacing(2),
    paddingHorizontal: theme.spacing(3),
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: theme.colors.textOnBackground,
  },
});
