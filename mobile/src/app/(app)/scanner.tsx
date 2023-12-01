import { Canvas, Rect, Shadow } from "@shopify/react-native-skia";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";

import { theme } from "@/common/theme";
import { Button } from "@/components/button";
import { Dialpad, QrIndicator } from "@/components/icons";
import { ShadowContainer } from "@/components/shadow-container";
import { useFixedInsets } from "@/hooks/useFixedInsets";

export default function ScannerPage() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const { bottom } = useFixedInsets();

  const device = useCameraDevice("back");
  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`);
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
            <Button label="Wpisz kod ręcznie" icon={<Dialpad />} />
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
