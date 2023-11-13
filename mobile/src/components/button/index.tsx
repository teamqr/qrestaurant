import { theme } from "@/common/theme";
import { instyle } from "@/lib/instyle";
import type { ComponentProps, ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type ButtonType = ComponentProps<typeof _Button>["variant"];

type Props = {
  label: ReactNode;
  icon?: ReactNode;
  variant?: ButtonType;
  onPress?: () => void;
};

export const Button = ({
  label,
  icon,
  variant = "contained",
  onPress,
}: Props) => {
  return (
    <_Button
      style={[
        {
          justifyContent: icon ? "space-between" : "flex-start",
          gap: icon ? theme.spacing(2) : 0,
        },
      ]}
      variant={variant}
      onPress={onPress}
    >
      {typeof label === "string" ? (
        <Text style={styles.label}>{label}</Text>
      ) : (
        label
      )}

      {icon}
    </_Button>
  );
};

const _Button = instyle(Pressable, {
  style: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderColor: theme.colors.secondaryLight,
    borderWidth: 1,
    paddingHorizontal: theme.spacing(3),
    height: theme.spacing(7),
  },
  variants: {
    contained: {
      backgroundColor: theme.colors.secondary,
    },
    outlined: {
      backgroundColor: theme.colors.background,
    },
  },
  defaultVariant: "contained",
});

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    fontFamily: theme.fontFamilies.OpenSansBold,
    color: theme.colors.textOnSecondary,
  },
});
