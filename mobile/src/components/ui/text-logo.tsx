import { StyleSheet, Text, TextStyle } from "react-native";
import { theme } from "../../common/theme";

export const TextLogo = ({ style }: { style?: TextStyle }) => (
  <Text style={[styles.title, style]}>
    <Text style={styles.bold}>QR</Text>
    estaurant
  </Text>
);

const styles = StyleSheet.create({
  title: {
    color: theme.colors.textOnBackground,
    fontFamily: theme.fontFamilies.OpenSansRegular,
    fontSize: 24,
  },
  bold: {
    fontWeight: "900",
    fontFamily: theme.fontFamilies.OpenSansExtraBold,
  },
});
