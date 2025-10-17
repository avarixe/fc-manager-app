import { View, ViewProps } from "react-native";
import { StyleSheet, UnistylesVariants } from "react-native-unistyles";

type FlexProps = UnistylesVariants<typeof styles>;

interface RowProps extends ViewProps {
  gap?: FlexProps["gap"];
}

interface ColumnProps extends ViewProps {
  gap?: FlexProps["gap"];
}

export function Row({ gap, style, ...props }: RowProps) {
  styles.useVariants({ gap });

  return <View style={[styles.row, style]} {...props} />;
}

export function Column({ gap, style, ...props }: ColumnProps) {
  styles.useVariants({ gap });

  return <View style={[styles.column, style]} {...props} />;
}

const styles = StyleSheet.create((theme) => ({
  row: {
    flexDirection: "row",
    alignItems: "center",
    variants: {
      gap: {
        none: {
          gap: theme.gap.none,
        },
        xs: {
          gap: theme.gap.xs,
        },
        sm: {
          gap: theme.gap.sm,
        },
        md: {
          gap: theme.gap.md,
        },
        lg: {
          gap: theme.gap.lg,
        },
        xl: {
          gap: theme.gap.xl,
        },
        default: {
          gap: theme.gap.md,
        },
      },
    },
  },
  column: {
    flexDirection: "column",
    alignItems: "flex-start",
    variants: {
      gap: {
        none: {
          gap: theme.gap.none,
        },
        xs: {
          gap: theme.gap.xs,
        },
        sm: {
          gap: theme.gap.sm,
        },
        md: {
          gap: theme.gap.md,
        },
        lg: {
          gap: theme.gap.lg,
        },
        xl: {
          gap: theme.gap.xl,
        },
        default: {
          gap: theme.gap.xs,
        },
      },
    },
  },
}));
