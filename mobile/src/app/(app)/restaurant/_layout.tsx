import { Stack } from "expo-router";

import { AppHeader } from "@/components/ui/app-header";

export default function RestaurantLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[restaurant]"
        options={{
          header: () => <AppHeader />,
        }}
      />
    </Stack>
  );
}
