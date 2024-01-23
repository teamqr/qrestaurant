import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TextLogo } from "./text-logo";
import { theme } from "../../common/theme";
import { ArrowLeft } from "../icons";

type Props = {
  onBack?: () => void;
};

export const Header = ({ onBack }: Props) => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top || theme.spacing(2) }]}>
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity
            style={{
              zIndex: 1,
              alignSelf: "flex-start",
            }}
            onPress={onBack}
          >
            <ArrowLeft onPress={undefined} />
          </TouchableOpacity>
        )}
        <View style={styles.title}>
          <TextLogo />
        </View>
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
  },
  header: {
    justifyContent: "center",
    paddingVertical: theme.spacing(2),
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
