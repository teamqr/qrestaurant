import { theme } from "@/common/theme";
import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  label: ReactNode;
  icon?: ReactNode;
};

export const Button = ({ label, icon }: Props) => {
  return (
    <Pressable
      style={[
        styles.button,
        {
          justifyContent: icon ? "space-between" : "flex-start",
        },
      ]}
    >
      {typeof label === "string" ? (
        <Text style={styles.label}>{label}</Text>
      ) : (
        label
      )}

      {icon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.secondaryLight,
    paddingHorizontal: theme.spacing(3),
    paddingVertical: theme.spacing(2),
    backgroundColor: theme.colors.secondary,
  },
  label: {
    fontWeight: "bold",
    fontFamily: theme.fontFamilies.OpenSansBold,
    color: theme.colors.textOnSecondary,
  },
});
