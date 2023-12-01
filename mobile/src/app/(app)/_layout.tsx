import { Redirect, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

import { AppHeader } from "@/components/ui/app-header";
import { useAuth } from "@/context/auth";

export default function AppLayout() {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) return <></>;

  if (!isAuthenticated) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <AppHeader title="Polecane w pobliżu " />,
        }}
      />
      <Stack.Screen
        name="scanner"
        options={{
          header: () => <AppHeader title="Skanuj kod" />,
        }}
      />
    </Stack>
  );
}
