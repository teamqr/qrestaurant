import { Canvas, Rect, Shadow } from "@shopify/react-native-skia";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";

import { theme } from "@/common/theme";
import { Table } from "@/common/types";
import { Button } from "@/components/button";
import { Dialpad, QrIndicator } from "@/components/icons";
import { ShadowContainer } from "@/components/shadow-container";
import { useFixedInsets } from "@/hooks/useFixedInsets";
import axios from "@/services/axios";
import { useRestaurantSessionStore } from "@/stores/restaurant-session";
import { wait } from "@/utils/promise";

const getTableData = async (code: string) => {
  await wait(1000);

  const { data } = await axios.get<{ table: Table }>(`/api/app/table/${code}`);
  return data;
};

export default function ScannerPage() {
  const queryClient = useQueryClient();
  const [code, setCode] = useState<string>();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { beginSession } = useRestaurantSessionStore();
  const router = useRouter();
  const { bottom } = useFixedInsets();

  const corners = useSharedValue<{ x: number; y: number }[] | undefined>(
    undefined,
  );

  const table = useQuery({
    queryKey: ["code", code],
    queryFn: () => getTableData(code!),
    enabled: !!code,
  });

  useEffect(() => {
    if (!table.data) return;

    const { code, restaurantId } = table.data.table;

    queryClient.setQueryData(["restaurant", restaurantId, "table", code], {
      table: table.data.table,
    });
    beginSession({ restaurantId, tableCode: code });

    router.replace(`/(app)/${restaurantId}`);
  }, [table.data]);

  const device = useCameraDevice("back", {
    physicalDevices: ["wide-angle-camera"],
  });

  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (codes) => {
      const code = codes[0];

      corners.value = code.corners;
      setCode(code.value);
    },
  });

  if (!device) return null;

  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          setSize({ width, height });
        }}
        device={device}
        isActive
        codeScanner={codeScanner}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <QrIndicator
          width={size.width * 0.5}
          height={size.width * 0.5}
          color={theme.colors.secondary}
          style={{
            marginTop: "auto",
          }}
        />

        <View
          style={{
            marginTop: "auto",
            alignSelf: "stretch",
            marginHorizontal: theme.spacing(3),
            marginBottom: bottom,
          }}
        >
          <ShadowContainer>
            <Button
              label="Wpisz kod ręcznie"
              icon={<Dialpad />}
              loading={table.isLoading}
            />
          </ShadowContainer>
        </View>
      </View>

      <Canvas style={StyleSheet.absoluteFill}>
        <Rect width={size.width} height={size.height}>
          <Shadow
            dx={0}
            dy={0}
            blur={20}
            inner
            color={theme.colors.background}
            shadowOnly
          />
        </Rect>
      </Canvas>
    </>
  );
}
