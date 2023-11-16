import { StyleSheet, Text, TextStyle } from "react-native";
import { theme } from "../../common/theme";
import { AppText } from "../text";

export const TextLogo = ({ style }: { style?: TextStyle }) => (
  <AppText style={[styles.title, style]}>
    <AppText weight="extra-bold">QR</AppText>
    estaurant
  </AppText>
);

const styles = StyleSheet.create({
  title: {
    color: theme.colors.textOnBackground,
    fontSize: 24,
  },
});
