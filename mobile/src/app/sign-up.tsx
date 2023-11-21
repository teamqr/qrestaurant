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
import { Image } from "expo-image";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/auth";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useState } from "react";

const image = require("assets/images/character.png");

const RegisterSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
    terms: z.boolean().refine((value) => value, {
      message: "You must accept terms and conditions",
      path: ["terms"],
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

type RegisterForm = z.infer<typeof RegisterSchema>;

export default function SignUpPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { signUp } = useAuth();
  const { control, handleSubmit, formState } = useForm<RegisterForm>({
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
    onSuccess: () => {
      console.log("success");
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
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
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
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Email"
              prefix={<Mail />}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
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
            />
          )}
        />
        <Controller
          control={control}
          name="passwordConfirmation"
          render={({ field: { onChange, onBlur, value } }) => (
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
            />
          )}
        />

        <Controller
          control={control}
          name="terms"
          render={({ field: { onChange, value } }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spacing(2),
                zIndex: 1,
              }}
            >
              <Checkbox value={value} onChange={onChange} />
              <AppText
                style={{
                  color: theme.colors.textOnBackground,
                }}
              >
                akceptuję <AppText weight="bold">regulamin</AppText>
              </AppText>
            </View>
          )}
        />

        <ShadowContainer>
          <Button
            label="Zarejestruj się"
            icon={<CircleCheck />}
            onPress={handleSubmit(onSubmit)}
          />
        </ShadowContainer>
      </View>
    </View>
  );
}
