import { theme } from "@/common/theme";
import { Pressable, StyleSheet, View } from "react-native";
import { Check } from "../icons";

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export const Checkbox = ({ onChange, value }: Props) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        onChange(!value);
      }}
    >
      {value && <Check color="white" width={16} height={16} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    backgroundColor: theme.colors.secondary,
    borderWidth: 1,
    borderColor: theme.colors.secondaryLight,
    borderRadius: theme.radii.small,
    zIndex: 999,
  },
});
