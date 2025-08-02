import { Icon } from "@/components/ui/icon";
import { router } from "expo-router";
import { Settings } from "lucide-react-native";
import { memo } from "react";
import { TouchableOpacity } from "react-native";

const SettingsButton = memo(() => {
  return (
    <TouchableOpacity onPress={() => router.push("/settings")} className="mr-4">
      <Icon as={Settings} />
    </TouchableOpacity>
  );
});
SettingsButton.displayName = "SettingsButton";

export default SettingsButton;
