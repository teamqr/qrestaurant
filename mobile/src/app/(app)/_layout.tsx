import { useAuth } from "@/context/auth";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
