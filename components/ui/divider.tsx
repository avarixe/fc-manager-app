import { View, ViewProps } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export interface DividerProps extends ViewProps {
  orientation?: "horizontal" | "vertical";
}

export const Divider: React.FC<DividerProps> = ({
  orientation,
  style,
  ...props
}) => {
  styles.useVariants({ orientation });

  return <View style={[styles.divider, style]} {...props} />;
};

const styles = StyleSheet.create((theme) => ({
  divider: {
    backgroundColor: theme.colors.border,
    variants: {
      orientation: {
        horizontal: {
          height: StyleSheet.hairlineWidth,
          width: "100%",
        },
        vertical: {
          width: StyleSheet.hairlineWidth,
          height: "100%",
        },
        default: {
          height: StyleSheet.hairlineWidth,
          width: "100%",
        },
      },
    },
  },
}));
