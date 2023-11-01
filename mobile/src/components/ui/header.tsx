import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../common/theme";
import { TextLogo } from "./text-logo";

export const Header = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: top > 0 ? top : theme.spacing(2) },
      ]}
    >
      <TextLogo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: theme.colors.background,
    paddingBottom: theme.spacing(2),
    alignItems: "center",
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
  },
});
