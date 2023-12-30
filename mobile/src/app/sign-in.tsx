import { zodResolver } from "@hookform/resolvers/zod";
import { CommonActions } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { z } from "zod";

import { theme } from "@/common/theme";
import { Button } from "@/components/button";
import { Login, Mail, Password } from "@/components/icons";
import { Input } from "@/components/input";
import { ShadowContainer } from "@/components/shadow-container";
import { AppText } from "@/components/text";
import { useAuthStore } from "@/stores/auth";

const image = require("assets/images/character.png");

const LoginSchema = z.object({
  email: z.string().email("Niepoprawny adres e-mail"),
  password: z.string().min(8, "Hasło musi mieć co najmniej 8 znaków"),
});

type LoginForm = z.infer<typeof LoginSchema>;

export default function SignInPage() {
  const navigation = useNavigation();
  const signInWithEmailAndPassword = useAuthStore(
    (state) => state.signInWithEmailAndPassword,
  );

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInMutation = useMutation({
    mutationFn: signInWithEmailAndPassword,
    onSuccess: () => {
      navigation.dispatch(
        CommonActions.reset({
          routes: [{ name: "(app)" }],
        }),
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async ({ email, password }: LoginForm) => {
    signInMutation.mutate({ email, password });
  };

  return (
    <Animated.ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
      contentContainerStyle={{
        gap: theme.spacing(4),
        paddingHorizontal: theme.spacing(3),
        flexGrow: 1,
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
                textContentType="emailAddress"
                placeholder="E-mail"
                prefix={<Mail color="white" />}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
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
                textContentType="password"
                secureTextEntry
                placeholder="Hasło"
                prefix={<Password color="white" />}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
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
            label="Zaloguj się"
            icon={<Login color="white" />}
            onPress={handleSubmit(onSubmit)}
            loading={signInMutation.isPending}
          />
        </ShadowContainer>
      </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    borderRadius: 1,
    backgroundColor: theme.colors.secondary,
    flex: 1,
  },
  error: {
    color: theme.colors.danger,
    fontSize: 12,
  },
});
