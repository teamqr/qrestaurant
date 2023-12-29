import { forwardRef, memo, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { theme } from "@/common/theme";
import { Button } from "@/components/button";
import { CircleCheck } from "@/components/icons";
import { ShadowContainer } from "@/components/shadow-container";
import { useFixedInsets } from "@/hooks/useFixedInsets";
import { AppText } from "@/components/text";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTableData } from "./scanner";
import { useRestaurantSessionStore } from "@/stores/restaurant-session";
import { useRouter } from "expo-router";

export default function CodePage() {
  const queryClient = useQueryClient();
  const { bottom } = useFixedInsets();
  const [code, setCode] = useState<string>("");

  const { beginSession } = useRestaurantSessionStore();
  const router = useRouter();

  const table = useQuery({
    queryKey: ["code", code],
    queryFn: () => getTableData(code!),
    enabled: false,
  });

  const handleConfirm = async () => {
    const { data } = await table.refetch();

    if (!data) return;

    const { code, restaurantId } = data.table;

    queryClient.setQueryData(["restaurant", restaurantId, "table", code], {
      table: data.table,
    });
    beginSession({ restaurantId, tableCode: code });

    router.replace(`/(app)/restaurant/${restaurantId}`);
  };

  console.log({ code });

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: bottom + theme.spacing(3),
        },
      ]}
    >
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
        }}
        keyboardVerticalOffset={232}
      >
        <View
          style={{
            marginTop: "auto",
            width: "100%",
            flexDirection: "row",
            gap: theme.spacing(1),
          }}
        >
          <CodeInput length={6} code={code} onCodeChange={setCode} />
        </View>

        <View
          style={{
            marginTop: "auto",
          }}
        >
          <ShadowContainer>
            <Button
              disabled={code.length !== 6}
              loading={table.isFetching}
              label="Potwierdź"
              icon={<CircleCheck />}
              onPress={handleConfirm}
            />
          </ShadowContainer>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const CodeInput = ({
  length,
  code,
  onCodeChange,
}: {
  onCodeChange: (code: string) => void;
  code: string;
  length: number;
}) => {
  const elements = useRef<TextInput[]>([]);

  const focusedIndex = useSharedValue(0);

  useEffect(() => {
    elements.current[0]?.focus();
  }, []);

  const focusElement = (index: number) => {
    if (index > length - 1) {
      focusedIndex.value = -1;
      return elements.current[length - 1]?.blur();
    }

    if (index < 0) {
      focusedIndex.value = -1;
      return elements.current[0]?.blur();
    }

    elements.current[index]?.focus();
  };

  const handleChange = (index: number) => (char: string) => {
    if (char.length === 0) {
      focusElement(index - 1);
    } else {
      focusElement(index + 1);
    }

    const newCode = code.split("");
    newCode[index] = char;

    onCodeChange(newCode.join(""));
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        gap: theme.spacing(1),
      }}
    >
      {Array.from({ length }).map((_, i) => (
        <CharInput
          key={i}
          ref={(r) => {
            elements.current = [...elements.current, r!];
          }}
          index={i}
          onFocus={() => {
            focusedIndex.value = i;
          }}
          currentIndex={focusedIndex}
          value={code[i]}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") {
              return handleChange(i)("");
            }

            handleChange(i)(nativeEvent.key);
          }}
        />
      ))}
    </View>
  );
};

interface CharInputProps extends TextInputProps {
  index?: number;
  currentIndex?: Animated.SharedValue<number>;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const CharInput = memo(
  forwardRef<TextInput, CharInputProps>(
    ({ currentIndex, index, ...props }, ref) => {
      const rStyles = useAnimatedStyle(() => {
        return {
          opacity: withTiming(currentIndex?.value === index ? 1 : 0.5),
          transform: [
            { scale: withTiming(currentIndex?.value === index ? 1.05 : 1) },
          ],
        };
      });

      return (
        <View
          style={{
            flex: 1,
          }}
        >
          <AnimatedTextInput
            ref={ref}
            style={[
              {
                width: "100%",
                backgroundColor: theme.colors.secondary,
                borderWidth: 1,
                borderColor: theme.colors.secondaryLight,
                paddingVertical: theme.spacing(2),
                borderRadius: 8,
                textAlign: "center",
                fontSize: 48,
                fontWeight: "bold",
                color: theme.colors.textOnBackground,
                marginBottom: theme.spacing(1),
              },
              rStyles,
            ]}
            {...props}
            keyboardType="ascii-capable"
            maxLength={1}
            caretHidden
          />
          <View
            style={{
              height: 8,
              // backgroundColor: theme.colors.secondaryLight,
              borderRadius: 4,
            }}
          />
        </View>
      );
    },
  ),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing(3),
  },
});
