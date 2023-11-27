import { theme } from "@/common/theme";
import { Button } from "@/components/button";
import { ArrowLeft } from "@/components/icons";
import { AppText } from "@/components/text";
import { useAuth } from "@/context/auth";
import { useFixedInsets } from "@/hooks/useFixedInsets";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function App() {
  const { top, bottom } = useFixedInsets();
  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <View
      style={{
        paddingTop: top,
        paddingBottom: bottom,
        flex: 1,
        paddingHorizontal: theme.spacing(3),
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={{ marginTop: "auto", gap: theme.spacing(2) }}>
        <Button
          label="Skaner"
          onPress={() => {
            router.push("/scanner");
          }}
        />
        <Button
          label="Wyloguj się"
          icon={<ArrowLeft width={16} height={16} />}
          onPress={signOut}
          variant="outlined"
          // loading
        />
      </View>
    </View>
  );
}
