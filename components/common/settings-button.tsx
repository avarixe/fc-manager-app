import { router } from "expo-router";
import { LucideProps, Settings } from "lucide-react-native";
import { memo } from "react";
import { TouchableOpacity } from "react-native";

export const SettingsButton = memo((props: LucideProps) => {
  return (
    <TouchableOpacity onPress={() => router.push("/settings")}>
      <Settings {...props} />
    </TouchableOpacity>
  );
});
SettingsButton.displayName = "SettingsButton";
