import { teamAtom } from "@/atoms";
import { Tables } from "@/database-generated.types";
import { formatDate } from "@/utils/format";
import { supabase } from "@/utils/supabase";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function SelectTeamScreen() {
  const [teams, setTeams] = useState<Tables<"teams">[]>([]);
  useEffect(() => {
    const fetchTeams = async () => {
      const { data, error } = await supabase
        .from("teams")
        .select()
        .order("created_at", { ascending: false });
      if (data) {
        setTeams(data);
      } else {
        console.error(error);
      }
    };

    fetchTeams();
  }, []);

  const setTeam = useSetAtom(teamAtom);
  const router = useRouter();
  const onPressTeam = (team: Tables<"teams">) => {
    setTeam(team);
    router.push("/");
  };

  return (
    <ScrollView>
      {teams.map((team) => (
        <TouchableOpacity key={team.id} onPress={() => onPressTeam(team)}>
          <View key={team.id} className="flex-row items-center">
            {team.badge_path ? (
              <Image
                source={{ uri: team.badge_path }}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <Icon name="shield-half-full" size={24} />
            )}
            <View className="flex-col">
              <Text>{team.name}</Text>
              <Text>
                {team.manager_name} · {formatDate(team.created_at)}
              </Text>
              <Text>
                {formatDate(team.started_on, "yyyy")} -{" "}
                {formatDate(team.currently_on, "yyyy")}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
