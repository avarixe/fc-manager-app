import {
  ChevronRight,
  CirclePlus,
  LogOut,
  LucideProps,
  MoonStar,
  Settings,
  Shield,
  ShieldEllipsis,
  Sun,
} from "lucide-react-native";
import { useMemo } from "react";
import { StyleSheet, UnistylesVariants } from "react-native-unistyles";

type IconVariantProps = UnistylesVariants<typeof styles>;

export interface IconProps extends LucideProps {
  name:
    | "chevron-right"
    | "circle-plus"
    | "log-out"
    | "moon-star"
    | "settings"
    | "shield"
    | "shield-ellipsis"
    | "sun";
  color?: IconVariantProps["color"];
}

export const Icon: React.FC<IconProps> = ({ name, color, ...props }) => {
  styles.useVariants({ color });

  const IconComponent = useMemo(() => {
    switch (name) {
      case "chevron-right":
        return ChevronRight;
      case "circle-plus":
        return CirclePlus;
      case "log-out":
        return LogOut;
      case "moon-star":
        return MoonStar;
      case "settings":
        return Settings;
      case "shield":
        return Shield;
      case "shield-ellipsis":
        return ShieldEllipsis;
      case "sun":
        return Sun;
      default:
        return null;
    }
  }, [name]);

  return IconComponent ? (
    <IconComponent color={styles.icon.color} {...props} />
  ) : null;
};

const styles = StyleSheet.create((theme) => ({
  icon: {
    variants: {
      color: {
        destructive: {
          color: theme.colors.destructive,
        },
        default: {
          color: theme.colors.foreground,
        },
      },
    },
  },
}));
