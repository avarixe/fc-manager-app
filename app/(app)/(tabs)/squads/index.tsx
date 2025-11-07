import { teamAtom } from "@/atoms";
import { Row, Text } from "@/components/ui";
import { Squad } from "@/types";
import { supabase } from "@/utils/supabase";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function SquadsScreen() {
  const team = useAtomValue(teamAtom);

  const [squads, setSquads] = useState<Squad[]>([]);

  useEffect(() => {
    const fetchSquads = async () => {
      if (!team) return;

      const { data, error } = await supabase
        .from("squads")
        .select()
        .eq("team_id", Number(team.id))
        .order("id");
      if (error) {
        console.error(error);
      } else {
        setSquads(data);
      }
    };

    fetchSquads();
  }, [team]);

  const renderItem = ({ item }: { item: Squad }) => (
    <TouchableOpacity>
      <Row style={styles.squad}>
        <Text weight="semibold">{item.name}</Text>
      </Row>
    </TouchableOpacity>
  );

  // TODO: use Skeleton in Empty State

  return (
    <FlatList
      data={squads}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      style={styles.screen}
      contentContainerStyle={styles.container}
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
  squad: {
    backgroundColor: theme.colors.card,
    alignItems: "center",
    marginVertical: theme.gap.sm,
    padding: theme.gap.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
  },
}));
