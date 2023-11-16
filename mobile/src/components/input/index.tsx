import { theme } from "@/common/theme";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Login } from "../icons";
import { ReactNode, forwardRef, useImperativeHandle, useRef } from "react";

interface Props extends TextInputProps {
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export const Input = forwardRef<TextInput, Props>(
  ({ prefix, suffix, ...props }, ref) => {
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    const focus = () => {
      inputRef.current?.focus();
    };

    return (
      <Pressable style={styles.container} onPress={focus}>
        {prefix}
        <View style={{ flex: 1 }}>
          <TextInput
            ref={inputRef}
            {...props}
            style={styles.input}
            placeholderTextColor={theme.colors.textOnBackground}
          />
          {/* <View style={[StyleSheet.absoluteFill]} /> */}
        </View>
        {suffix}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: theme.spacing(7),
    paddingHorizontal: theme.spacing(2),
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.secondaryLight,
    borderRadius: theme.radii.medium,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(2),
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: "100%",
    borderRadius: theme.radii.medium,
    color: "white",
  },
});
