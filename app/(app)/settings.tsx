import { sessionAtom, teamAtom } from "@/atoms";
import { Divider } from "@/components/ui/divider";
import { Icon } from "@/components/ui/icon";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import { useAtom, useSetAtom } from "jotai";
import { ChevronRight, LogOut, ShieldEllipsis } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function SettingsModal() {
  const setSession = useSetAtom(sessionAtom);
  const [team, setTeam] = useAtom(teamAtom);

  const onPressSignOut = () => {
    supabase.auth.signOut();
    setTeam(null);
    setSession(null);
  };

  // TODO: Display Team Name
  // TODO: Edit Team button
  // TODO: Delete Team button
  // TODO: Space between sections

  return (
    <ScrollView className="my-4">
      <TouchableOpacity onPress={() => router.push("/select-team")}>
        <View className="flex-row items-center gap-4 p-4">
          <Icon as={ShieldEllipsis} className="w-8 h-8" />
          <Text className="text-xl">Select Team</Text>
          <View className="flex-1" />
          <Icon as={ChevronRight} className="w-8 h-8" />
        </View>
      </TouchableOpacity>
      <Divider />
      <TouchableOpacity onPress={onPressSignOut}>
        <View className="flex-row items-center gap-4 p-4">
          <Icon as={LogOut} className="w-8 h-8 text-error-500" />
          <Text className="text-xl text-error-500 font-bold">Sign Out</Text>
        </View>
      </TouchableOpacity>
      <Divider />
    </ScrollView>
  );
}
