import { theme } from "@/common/theme";
import { AppText } from "@/components/text";
import { useAuth } from "@/context/auth";
import { useFixedInsets } from "@/hooks/useFixedInsets";
import { View } from "react-native";

export default function App() {
  const { top } = useFixedInsets();
  const { signOut } = useAuth();

  return (
    <View
      style={{
        paddingTop: top,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <AppText
        style={{
          color: theme.colors.textOnBackground,
          fontSize: 32,
        }}
        weight="extra-bold"
        onPress={() => {
          signOut();
        }}
      >
        Wyloguj się
      </AppText>
    </View>
  );
}
