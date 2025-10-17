import { StyleSheet } from "react-native-unistyles";

const lightTheme = {
  colors: {
    background: "#FCFAF8",
    foreground: "#EDEAE6",
    typography: "#1B140C",
    dimmed: "#ECE8E4",
    tint: "#9A734C",
    activeTint: "#1B140C",
    link: "#1E3799",
    accents: {
      banana: "#F6E58D",
      pumpkin: "#FFBE76",
      apple: "#FF7979",
      grass: "#BADC58",
      storm: "#686DE0",
    },
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
    background: "#221A11",
    foreground: "#332618",
    typography: "#FFFFFF",
    dimmed: "#A8A198",
    tint: "#C9AD92",
    activeTint: "#FFFFFF",
    link: "#0C2461",
    accents: {
      banana: "#f9CA24",
      pumpkin: "#F0932B",
      apple: "#EB4D4B",
      grass: "#6AB04C",
      storm: "#4834D4",
    },
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
