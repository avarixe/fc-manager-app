import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { StyleSheet, UnistylesVariants } from "react-native-unistyles";

type TextVariantProps = UnistylesVariants<typeof styles>;

export interface TextProps extends RNTextProps {
  color?: TextVariantProps["color"];
  size?: TextVariantProps["size"];
  weight?: TextVariantProps["weight"];
}

export const Text: React.FC<TextProps> = ({
  size,
  color,
  weight,
  ...props
}) => {
  styles.useVariants({ size, color, weight });

  return <RNText style={styles.text} {...props} />;
};

const styles = StyleSheet.create((theme) => ({
  text: {
    variants: {
      color: {
        destructive: {
          color: theme.colors.destructive,
        },
        default: {
          color: theme.colors.foreground,
        },
      },
      size: {
        xs: {
          fontSize: theme.fontSize.xs,
        },
        sm: {
          fontSize: theme.fontSize.sm,
        },
        md: {
          fontSize: theme.fontSize.md,
        },
        lg: {
          fontSize: theme.fontSize.lg,
        },
        xl: {
          fontSize: theme.fontSize.xl,
        },
        default: {
          fontSize: theme.fontSize.md,
        },
      },
      weight: {
        normal: {
          fontWeight: theme.fontWeight.normal,
        },
        medium: {
          fontWeight: theme.fontWeight.medium,
        },
        semibold: {
          fontWeight: theme.fontWeight.semibold,
        },
        bold: {
          fontWeight: theme.fontWeight.bold,
        },
        default: {
          fontWeight: theme.fontWeight.normal,
        },
      },
    },
  },
}));
