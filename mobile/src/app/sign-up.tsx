import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
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
import { useSignUpStore } from "@/stores/sign-up";

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

  const router = useRouter();
  const setCache = useSignUpStore((state) => state.setCache);

  const { control, handleSubmit } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      terms: false,
    },
  });

  const onSubmit = async ({ email, password }: RegisterForm) => {
    setCache({ email, password });
    router.push("/sign-up-confirm");
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
                  akceptuję{" "}
                  <AppText
                    weight="bold"
                    onPress={() => {
                      router.push("/tos");
                    }}
                  >
                    regulamin
                  </AppText>
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
            label="Kontynuuj"
            icon={<CircleCheck />}
            onPress={handleSubmit(onSubmit)}
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
