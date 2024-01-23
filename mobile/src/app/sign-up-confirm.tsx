import { zodResolver } from "@hookform/resolvers/zod";
import { CommonActions } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useNavigation } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { z } from "zod";

import { theme } from "@/common/theme";
import { Button } from "@/components/button";
import { CircleCheck, Mail, UserEdit } from "@/components/icons";
import { Input } from "@/components/input";
import { ShadowContainer } from "@/components/shadow-container";
import { AppText } from "@/components/text";
import { useAuthStore } from "@/stores/auth";
import { useSignUpStore } from "@/stores/sign-up";

const InfoSchema = z.object({
  name: z.string().min(1, "Imię jest wymagane"),
  surname: z.string().min(1, "Nazwisko jest wymagane"),
});

type InfoSchemaType = z.infer<typeof InfoSchema>;

export default function SignUpConfirmPage() {
  const { email, password } = useSignUpStore();
  const signUp = useAuthStore((state) => state.signUp);
  const resetCache = useSignUpStore((state) => state.resetCache);
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm<InfoSchemaType>({
    resolver: zodResolver(InfoSchema),
    defaultValues: {
      name: "",
      surname: "",
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      }
    },
    onSuccess: () => {
      resetCache();

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: "onboarding",
              path: "/onboarding",
            },
            {
              name: "sign-in",
              path: "/sign-in",
            },
          ],
        }),
      );
    },
  });

  const onSubmit = async ({ name, surname }: InfoSchemaType) => {
    signUpMutation.mutate({
      email,
      password,
      firstname: name,
      lastname: surname,
    });
  };

  return (
    <View style={styles.container}>
      <AppText
        weight="bold"
        style={{
          color: "white",
          fontSize: 20,
        }}
      >
        Potrzebujemy jeszcze kilku{"\n"}informacji 👋
      </AppText>

      <View
        style={{
          marginTop: theme.spacing(2),
          gap: theme.spacing(2),
        }}
      >
        <View
          style={{
            opacity: 0.25,
          }}
        >
          <Input
            placeholder="Email"
            prefix={<Mail />}
            value={email}
            editable={false}
          />
        </View>

        <Controller
          control={control}
          name="name"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Animated.View style={{ gap: theme.spacing(1) }}>
              <Input
                placeholder="Imię"
                prefix={<UserEdit />}
                textContentType="givenName"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                hasError={!!error}
              />
              {!!error && (
                <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
                  <AppText style={styles.error}>{error?.message}</AppText>
                </Animated.View>
              )}
            </Animated.View>
          )}
        />

        <Controller
          control={control}
          name="surname"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Animated.View style={{ gap: theme.spacing(1) }}>
              <Input
                placeholder="Nazwisko"
                prefix={<UserEdit />}
                textContentType="familyName"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                hasError={!!error}
              />
              {!!error && (
                <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
                  <AppText style={styles.error}>{error?.message}</AppText>
                </Animated.View>
              )}
            </Animated.View>
          )}
        />
        <ShadowContainer>
          <Button
            label="Zarejestruj się"
            icon={<CircleCheck />}
            onPress={handleSubmit(onSubmit)}
            loading={signUpMutation.isPending}
          />
        </ShadowContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing(3),
  },
  error: {
    color: theme.colors.danger,
    fontSize: 12,
  },
});
