import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Image } from "expo-image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { z } from "zod";

import { theme } from "@/common/theme";
import { Button } from "@/components/button";
import { Checkbox } from "@/components/checkbox";
import {
  CircleCheck,
  Eye,
  EyeClosed,
  Mail,
  Password,
  Repeat,
} from "@/components/icons";
import { Input } from "@/components/input";
import { ShadowContainer } from "@/components/shadow-container";
import { AppText } from "@/components/text";
import { useAuth } from "@/context/auth";

const image = require("assets/images/character.png");

const RegisterSchema = z
  .object({
    email: z.string().email("Niepoprawny adres e-mail"),
    password: z.string().min(8, "Hasło musi mieć co najmniej 8 znaków"),
    passwordConfirmation: z
      .string()
      .min(8, "Hasło musi mieć co najmniej 8 znaków"),
    terms: z
      .boolean()
      .refine((value) => value, "Musisz zaakceptować regulamin"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Hasła muszą być takie same",
    path: ["passwordConfirmation"],
  });

type RegisterForm = z.infer<typeof RegisterSchema>;

export default function SignUpPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { signUp } = useAuth();
  const { control, handleSubmit } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      terms: false,
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log("success", data);
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.log(error.response?.data);
      }
    },
  });

  const onSubmit = async ({ email, password }: RegisterForm) => {
    signUpMutation.mutate({ email, password });
  };

  const handlePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const EyeIcon = passwordVisible ? EyeClosed : Eye;

  return (
    <Animated.ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{
        paddingHorizontal: theme.spacing(3),
        gap: theme.spacing(4),
      }}
    >
      <Image
        source={image}
        style={{
          width: 200,
          height: 200,
          alignSelf: "center",
        }}
        contentFit="contain"
      />

      <View
        style={{
          gap: theme.spacing(2),
        }}
      >
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Animated.View style={{ gap: theme.spacing(1) }}>
              <Input
                placeholder="Email"
                prefix={<Mail />}
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
          name="password"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Animated.View style={{ gap: theme.spacing(1) }}>
              <Input
                placeholder="Hasło"
                prefix={<Password />}
                suffix={
                  <EyeIcon color="white" onPress={handlePasswordVisibility} />
                }
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry={!passwordVisible}
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
          name="passwordConfirmation"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <Animated.View style={{ gap: theme.spacing(1) }}>
              <Input
                placeholder="Powtórz hasło"
                prefix={<Repeat />}
                suffix={
                  <EyeIcon color="white" onPress={handlePasswordVisibility} />
                }
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry={!passwordVisible}
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
          name="terms"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View
              style={{
                zIndex: 1,
                gap: theme.spacing(1),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: theme.spacing(2),
                }}
              >
                <Checkbox
                  value={value}
                  onChange={onChange}
                  hasError={!!error}
                />
                <AppText
                  style={{
                    color: theme.colors.textOnBackground,
                  }}
                >
                  akceptuję <AppText weight="bold">regulamin</AppText>
                </AppText>
              </View>
              {!!error && (
                <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
                  <AppText style={styles.error}>{error?.message}</AppText>
                </Animated.View>
              )}
            </View>
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
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  error: {
    color: theme.colors.danger,
    fontSize: 12,
  },
});
