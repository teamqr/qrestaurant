import { Redirect, Stack } from "expo-router";

import { AppHeader } from "@/components/ui/app-header";
import { useAuth } from "@/context/auth";

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/" />;
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
