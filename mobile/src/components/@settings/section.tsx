import { ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { AppText } from "../text";

import { theme } from "@/common/theme";

type Props = {
  children: ReactNode;
};

const SettingsSection = ({ children }: Props) => {
  return <View style={styles.container}>{children}</View>;
};

const Title = ({ children }: { children: string }) => {
  return (
    <AppText
      style={{
        fontSize: 16,
        color: theme.colors.secondaryLight,
      }}
    >
      {children}
    </AppText>
  );
};

const Items = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  return <View style={[styles.itemsContainer, style]}>{children}</View>;
};

const Item = ({
  label,
  icon,
  style,
  color = theme.colors.textOnBackground,
  onPress,
  disabled,
}: {
  label: string;
  icon: ReactNode;
  style?: StyleProp<TextStyle>;
  color?: string;
  onPress?: () => void;
  disabled?: boolean;
}) => {
  return (
    <Pressable
      style={[
        styles.item,
        style,
        {
          opacity: disabled ? 0.1 : 1,
        },
      ]}
      onPress={onPress}
    >
      <AppText
        weight="bold"
        style={{
          color,
          fontSize: 16,
          flex: 1,
        }}
      >
        {label}
      </AppText>

      {icon}
    </Pressable>
  );
};

SettingsSection.Title = Title;
SettingsSection.Items = Items;
SettingsSection.Item = Item;

export { SettingsSection };

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing(2),
  },
  itemsContainer: {
    gap: theme.spacing(1),
    padding: theme.spacing(2),
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: theme.radii.medium,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing(3),
    paddingVertical: theme.spacing(2),
    borderRadius: theme.radii.medium,
  },
});
