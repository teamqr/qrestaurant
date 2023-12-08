import { ScrollView, View } from "react-native";

import { theme } from "@/common/theme";
import { SettingsSection } from "@/components/@settings/section";
import { Account, Ad, Bell, Location, Logout, Trash } from "@/components/icons";
import { AppText } from "@/components/text";
import { useFixedInsets } from "@/hooks/useFixedInsets";
import { useAuthStore } from "@/stores/auth";

export default function SettingsPage() {
  const signOut = useAuthStore((state) => state.signOut);
  const { bottom } = useFixedInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingBottom: bottom,
        paddingHorizontal: theme.spacing(3),
      }}
    >
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          gap: theme.spacing(4),
        }}
      >
        <SettingsSection>
          <SettingsSection.Title>aplikacja</SettingsSection.Title>
          <SettingsSection.Items>
            <SettingsSection.Item label="Konto" icon={<Account />} />
            <SettingsSection.Item label="Lokalizacja" icon={<Location />} />
            <SettingsSection.Item label="Powiadomienia" icon={<Bell />} />
            <SettingsSection.Item disabled label="Reklamy" icon={<Ad />} />
          </SettingsSection.Items>
        </SettingsSection>

        <SettingsSection>
          <SettingsSection.Title>konto</SettingsSection.Title>
          <SettingsSection.Items
            style={{
              backgroundColor: theme.colors.background,
            }}
          >
            <SettingsSection.Item
              label="Wyloguj się"
              icon={<Logout color={theme.colors.danger} />}
              color={theme.colors.danger}
              onPress={signOut}
            />
            <SettingsSection.Item
              label="Usuń konto"
              icon={<Trash color="black" />}
              color="black"
              style={{
                backgroundColor: theme.colors.danger,
              }}
            />
          </SettingsSection.Items>
        </SettingsSection>
      </ScrollView>
      <AppText
        style={{
          color: "white",
          alignSelf: "center",
          marginTop: "auto",
          fontSize: 16,
        }}
      >
        qrestaurant · 2023
      </AppText>
    </View>
  );
}
