import { ComponentProps, ReactNode } from "react";
import { Pressable } from "react-native";

import { theme } from "@/common/theme";
import { instyle } from "@/lib/instyle";

type ButtonType = ComponentProps<typeof _Button>["variant"];

type Props = {
  onPress: () => void;
  icon: ReactNode;
  variant?: ButtonType;
};

export const IconButton = ({ icon, onPress, variant = "small" }: Props) => {
  return (
    <_Button onPress={onPress} variant={variant}>
      {icon}
    </_Button>
  );
};

const _Button = instyle(Pressable, {
  style: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radii.medium,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    backgroundColor: theme.colors.background,
  },
  variants: {
    small: {
      width: 56,
      height: 56,
    },
    large: {
      width: 80,
      height: 80,
      borderRadius: theme.radii.large,
    },
  },
  defaultVariant: "small",
});
