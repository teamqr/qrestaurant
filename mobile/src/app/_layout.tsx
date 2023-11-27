import {
  OpenSans_400Regular,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/open-sans";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { Header } from "../components/ui/header";

import { AuthProvider } from "@/context/auth";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <>
            <RootLayoutStack />
            <StatusBar style="light" />
          </>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

const RootLayoutStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <Header />,
        }}
      />

      <Stack.Screen
        name="sign-in"
        options={{
          header: ({ navigation }) => <Header onBack={navigation.goBack} />,
        }}
      />

      <Stack.Screen
        name="sign-up"
        options={{
          header: ({ navigation }) => <Header onBack={navigation.goBack} />,
        }}
      />

      <Stack.Screen
        name="(app)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};
