import { teamAtom } from "@/atoms";
import { Column, Divider, Icon, Row, Text } from "@/components/ui";
import { Team } from "@/types";
import { formatDate } from "@/utils/format";
import { supabase } from "@/utils/supabase";
import { router, useNavigation } from "expo-router";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function SelectTeamScreen() {
  const [teams, setTeams] = useState<Team[]>([]);
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
  const onPressTeam = (team: Team) => {
    setTeam(team);
    router.push("/");
  };

  const renderItem = ({ item }: { item: Team }) => (
    <TouchableOpacity onPress={() => onPressTeam(item)}>
      <Row style={styles.teamRow}>
        {item.badge_path ? (
          <Image source={{ uri: item.badge_path }} style={styles.image} />
        ) : (
          <Icon name="shield" size={48} />
        )}
        <Column gap="none">
          <Text weight="semibold">{item.name}</Text>
          <Text size="xs">
            {item.manager_name} · {formatDate(item.created_at)}
          </Text>
          <Text size="xs">
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
      ItemSeparatorComponent={() => <Divider />}
      ListFooterComponent={
        <>
          <Divider />
          <TouchableOpacity onPress={() => router.push("/team-form")}>
            <Row style={styles.addTeamRow}>
              <Icon name="circle-plus" size={32} />
              <Text weight="medium">Add Team</Text>
            </Row>
          </TouchableOpacity>
        </>
      }
      style={styles.screen}
    />
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    paddingTop: theme.gap.xl,
    paddingHorizontal: theme.gap.md,
    paddingBottom: rt.insets.bottom + theme.gap.xl,
  },
  teamRow: {
    padding: theme.gap.sm,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
  },
  addTeamRow: {
    marginTop: theme.gap.md,
    justifyContent: "center",
    padding: theme.gap.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
}));
