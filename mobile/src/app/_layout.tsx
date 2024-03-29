import "text-encoding-polyfill";
import {
  OpenSans_400Regular,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/open-sans";
import { StripeProvider } from "@stripe/stripe-react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useCameraPermission } from "react-native-vision-camera";

import { Header } from "../components/ui/header";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PK;

const queryClient = new QueryClient();

export default function RootLayout() {
  const { hasPermission, requestPermission } = useCameraPermission();

  const [fontsLoaded, fontError] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <>
      <StripeProvider
        publishableKey={publishableKey!}
        urlScheme={
          Constants.appOwnership === "expo"
            ? Linking.createURL("/--/")
            : Linking.createURL("")
        }
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <>
              <RootLayoutStack />
              <StatusBar style="light" />
            </>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </StripeProvider>
    </>
  );
}

const RootLayoutStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(app)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="onboarding"
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
        name="sign-up-confirm"
        options={{
          header: ({ navigation }) => <Header onBack={navigation.goBack} />,
        }}
      />

      <Stack.Screen
        name="tos"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
};
