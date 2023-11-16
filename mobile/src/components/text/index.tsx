import { theme } from "@/common/theme";
import { ReactNode, forwardRef } from "react";
import { Text, TextProps } from "react-native";

type _Props = {
  children?: ReactNode;
} & (
  | {
      family?: "open-sans";
      weight?: "regular" | "bold" | "extra-bold";
    }
  | {
      family: "inter";
      weight?: "regular" | "bold" | "extra-bold";
    }
);

type Props = _Props & TextProps;

export const AppText = forwardRef<Text, Props>(
  (
    { family = "open-sans", weight = "regular", children, style, ...props },
    ref,
  ) => {
    return (
      <Text
        ref={ref}
        style={[
          {
            fontFamily: fontMap[family][weight],
          },
          style,
        ]}
        {...props}
      >
        {children}
      </Text>
    );
  },
);

const fontMap = {
  "open-sans": {
    regular: theme.fontFamilies.OpenSansRegular,
    bold: theme.fontFamilies.OpenSansBold,
    "extra-bold": theme.fontFamilies.OpenSansExtraBold,
  },
  inter: {
    regular: "Inter_400Regular",
    bold: "Inter_700Bold",
    "extra-bold": "Inter_800ExtraBold",
  },
};
