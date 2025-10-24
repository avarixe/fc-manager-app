import { Icon, IconProps } from "@/components/ui";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export const SettingsButton: React.FC<Omit<IconProps, "name">> = (props) => {
  return (
    <TouchableOpacity onPress={() => router.push("/settings")}>
      <Icon name="settings" {...props} />
    </TouchableOpacity>
  );
};
SettingsButton.displayName = "SettingsButton";
