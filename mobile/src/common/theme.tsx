export const theme = {
  colors: {
    background: "#111111",
    textOnBackground: "#ffffff",

    secondary: "#272727",
    textOnSecondary: "#ffffff",

    secondaryLight: "#404040",
  },
  fontFamilies: {
    OpenSansRegular: "OpenSans_400Regular",
    OpenSansBold: "OpenSans_700Bold",
    OpenSansExtraBold: "OpenSans_800ExtraBold",
  },
  spacing: (size: number) => size * 8,
} as const;

export type AppTheme = typeof theme;
