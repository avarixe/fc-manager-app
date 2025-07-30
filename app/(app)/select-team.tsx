import { teamAtom } from "@/atoms";
import { ThemedText } from "@/components/ThemedText";
import { Tables } from "@/database-generated.types";
import { formatDate } from "@/utils/format";
import { supabase } from "@/utils/supabase";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

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
    <ScrollView contentContainerStyle={styles.container}>
      {teams.map((team) => (
        <TouchableOpacity key={team.id} onPress={() => onPressTeam(team)}>
          <View key={team.id} style={styles.row}>
            {team.badge_path ? (
              <Image source={{ uri: team.badge_path }} style={styles.logo} />
            ) : (
              <Icon name="shield-half-full" size={24} />
            )}
            <View style={styles.info}>
              <ThemedText type="subtitle">{team.name}</ThemedText>
              <ThemedText>
                {team.manager_name} · {formatDate(team.created_at)}
              </ThemedText>
              <ThemedText>
                {formatDate(team.started_on, "yyyy")} -{" "}
                {formatDate(team.currently_on, "yyyy")}
              </ThemedText>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    marginTop: theme.gap(2),
    paddingHorizontal: theme.gap(2),
  },
  title: {
    marginTop: theme.gap(2),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.gap(2),
    paddingVertical: theme.gap(1),
  },
  info: {
    flexDirection: "column",
  },
  logo: {
    width: 48,
    height: 48,
    resizeMode: "contain",
    borderRadius: 999,
  },
}));
