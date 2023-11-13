import { theme } from "@/common/theme";
import { AppText } from "@/components/text";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Button } from "@/components/button";
import { ShadowContainer } from "@/components/shadow-container";
import { Facebbok, Google, Login, Mail, Password } from "@/components/icons";
import { Input } from "@/components/input";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const image = require("assets/images/character.png");

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginForm = z.infer<typeof LoginSchema>;

export default function SignInPage() {
  const { control, handleSubmit, formState } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginForm) => {};

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
          render={({ field: { onChange, value } }) => (
            <Input
              textContentType="emailAddress"
              placeholder="E-mail"
              prefix={<Mail color="white" />}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              textContentType="password"
              secureTextEntry
              placeholder="Hasło"
              prefix={<Password color="white" />}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <ShadowContainer>
          <Button
            label="Zaloguj się"
            icon={<Login color="white" />}
            onPress={handleSubmit(onSubmit)}
          />
        </ShadowContainer>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: theme.spacing(4),
            marginVertical: theme.spacing(2),
          }}
        >
          <View style={styles.line} />
          <AppText style={{ color: "white" }} weight="bold">
            lub
          </AppText>
          <View style={styles.line} />
        </View>

        <Button
          label="Zaloguj się przez Facebook"
          variant="outlined"
          icon={<Facebbok color="white" />}
        />

        <Button
          label="Zaloguj się przez Google"
          variant="outlined"
          icon={<Google color="white" />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    borderRadius: 1,
    backgroundColor: theme.colors.secondary,
    flex: 1,
  },
});
