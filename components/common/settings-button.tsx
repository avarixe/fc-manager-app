import { router } from "expo-router";
import { Settings } from "lucide-react-native";
import { memo } from "react";
import { TouchableOpacity } from "react-native";

export const SettingsButton = memo(() => {
  return (
    <TouchableOpacity onPress={() => router.push("/settings")}>
      <Settings />
    </TouchableOpacity>
  );
});
SettingsButton.displayName = "SettingsButton";
