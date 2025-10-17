import { teamAtom } from "@/atoms";
import { Column, Row } from "@/components/ui";
import { Tables } from "@/database-generated.types";
import { formatDate } from "@/utils/format";
import { supabase } from "@/utils/supabase";
import { router, useNavigation } from "expo-router";
import { useSetAtom } from "jotai";
import { CirclePlus, Shield } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity } from "react-native";
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

  const navigation = useNavigation();
  useEffect(() => {
    const listener = navigation.addListener("beforeRemove", (e) => {
      if (e.data.action.type === "GO_BACK") {
        e.preventDefault();
      }
    });

    return () => {
      navigation.removeListener("beforeRemove", listener);
    };
  }, [navigation]);

  const setTeam = useSetAtom(teamAtom);
  const onPressTeam = (team: Tables<"teams">) => {
    setTeam(team);
    router.push("/");
  };

  const renderItem = ({ item }: { item: Tables<"teams"> }) => (
    <TouchableOpacity onPress={() => onPressTeam(item)}>
      <Row style={styles.row}>
        {item.badge_path ? (
          <Image source={{ uri: item.badge_path }} style={styles.image} />
        ) : (
          <Shield size={48} />
        )}
        <Column gap="none">
          <Text style={styles.title}>{item.name}</Text>
          <Text>
            {item.manager_name} · {formatDate(item.created_at)}
          </Text>
          <Text>
            {formatDate(item.started_on, "yyyy")} -{" "}
            {formatDate(item.currently_on, "yyyy")}
          </Text>
        </Column>
      </Row>
    </TouchableOpacity>
  );

  // TODO: use Skeleton in Empty State

  return (
    <FlatList
      data={teams}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      // ItemSeparatorComponent={() => <Divider />}
      ListFooterComponent={
        <>
          {/* <Divider /> */}
          <TouchableOpacity
            onPress={() => router.push("/team-form")}
            style={styles.row}
          >
            <Row>
              <CirclePlus />
              <Text>Add Team</Text>
            </Row>
          </TouchableOpacity>
        </>
      }
    />
  );
}

const styles = StyleSheet.create((theme) => ({
  row: {
    marginHorizontal: theme.gap.md,
    marginVertical: theme.gap.sm,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
  },
  title: {
    fontWeight: theme.fontWeight.medium,
  },
}));
