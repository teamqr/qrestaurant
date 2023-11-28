export const theme = {
  colors: {
    background: "#111111",
    textOnBackground: "#ffffff",

    secondary: "#272727",
    textOnSecondary: "#ffffff",

    secondaryLight: "#404040",

    shadow: "rgba(0,0,0,0.75)",

    danger: "#FC4F4F",
    dangerLight: "#FF7979",
  },
  fontFamilies: {
    OpenSansRegular: "OpenSans_400Regular",
    OpenSansBold: "OpenSans_700Bold",
    OpenSansExtraBold: "OpenSans_800ExtraBold",
  },
  radii: {
    small: 8,
    medium: 16,
    large: 24,
  },
  spacing: (size: number) => size * 8,
} as const;

export type AppTheme = typeof theme;
