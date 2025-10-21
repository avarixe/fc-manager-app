import { StyleSheet } from "react-native-unistyles";

const lightTheme = {
  colors: {
    background: "#FFFFFF",
    foreground: "#1A1722",
    card: "#FFFFFF",
    cardForeground: "#1A1722",
    popover: "#FFFFFF",
    popoverForeground: "#1A1722",
    primary: "#7C3AED",
    primaryForeground: "#F8F7FE",
    secondary: "#F7F7F8",
    secondaryForeground: "#2C2738",
    muted: "#F7F7F8",
    mutedForeground: "#6E6D7A",
    accent: "#F7F7F8",
    accentForeground: "#2C2738",
    destructive: "#E95F4F",
    destructiveForeground: "#FFFFFF",
    border: "#EBEBEC",
    input: "#EBEBEC",
    ring: "#A78BFA",
    chart1: "#D4C5F9",
    chart2: "#9061F9",
    chart3: "#7C3AED",
    chart4: "#6D28D9",
    chart5: "#5B21B6",
    sidebar: "#FAFAFA",
    sidebarForeground: "#1A1722",
    sidebarPrimary: "#7C3AED",
    sidebarPrimaryForeground: "#F8F7FE",
    sidebarAccent: "#F7F7F8",
    sidebarAccentForeground: "#2C2738",
    sidebarBorder: "#EBEBEC",
    sidebarRing: "#A78BFA",
  },
  fontSize: {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 22,
    xl: 28,
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  gap: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  borderRadius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
} as const;

const darkTheme = {
  colors: {
    background: "#1A1722",
    foreground: "#FAFAFA",
    card: "#2C2738",
    cardForeground: "#FAFAFA",
    popover: "#2C2738",
    popoverForeground: "#FAFAFA",
    primary: "#9061F9",
    primaryForeground: "#F8F7FE",
    secondary: "#3A3644",
    secondaryForeground: "#FAFAFA",
    muted: "#3A3644",
    mutedForeground: "#A6A4AE",
    accent: "#3A3644",
    accentForeground: "#FAFAFA",
    destructive: "#E9784D",
    destructiveForeground: "#FFFFFF",
    border: "rgba(255, 255, 255, 0.1)",
    input: "rgba(255, 255, 255, 0.15)",
    ring: "#5B21B6",
    chart1: "#D4C5F9",
    chart2: "#9061F9",
    chart3: "#7C3AED",
    chart4: "#6D28D9",
    chart5: "#5B21B6",
    sidebar: "#2C2738",
    sidebarForeground: "#FAFAFA",
    sidebarPrimary: "#9061F9",
    sidebarPrimaryForeground: "#F8F7FE",
    sidebarAccent: "#3A3644",
    sidebarAccentForeground: "#FAFAFA",
    sidebarBorder: "rgba(255, 255, 255, 0.1)",
    sidebarRing: "#5B21B6",
  },
  fontSize: {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 22,
    xl: 28,
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  gap: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
  borderRadius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
} as const;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const appThemes = {
  light: lightTheme,
  dark: darkTheme,
};

const breakpoints = {
  xs: 0,
  sm: 300,
  md: 500,
  lg: 800,
  xl: 1200,
};

type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof appThemes;

declare module "react-native-unistyles" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends AppThemes {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  settings: {
    adaptiveThemes: true,
  },
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  breakpoints,
});
