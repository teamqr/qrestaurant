import { Redirect, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

import { AppHeader } from "@/components/ui/app-header";
import { useSetupAuth } from "@/hooks/useSetupAuth";
import { useIsAuthenticated } from "@/stores/auth";

export default function AppLayout() {
  const { loading } = useSetupAuth();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (loading) {
      return;
    }

    SplashScreen.hideAsync();
  }, [loading]);

  if (loading) {
    return <></>;
  }

  if (!isAuthenticated) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <AppHeader title={`Polecane\nprzez nas`} />,
        }}
      />
      <Stack.Screen
        name="scanner"
        options={{
          header: () => <AppHeader title="Skanuj kod" />,
        }}
      />
      <Stack.Screen
        name="restaurant"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="cart"
        options={{
          header: () => <AppHeader title="Koszyk" />,
        }}
      />
      <Stack.Screen
        name="settings/index"
        options={{
          header: () => <AppHeader title="Ustawienia" />,
        }}
      />
      <Stack.Screen
        name="order/[order]"
        options={{
          header: () => <AppHeader title="Zamówienie" />,
        }}
      />
    </Stack>
  );
}
