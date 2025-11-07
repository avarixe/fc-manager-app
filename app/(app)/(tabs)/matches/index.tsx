import { teamAtom } from "@/atoms";
import { Column, Text } from "@/components/ui";
import { Match } from "@/types";
import { formatDate } from "@/utils/format";
import { supabase } from "@/utils/supabase";
import { FlashList } from "@shopify/flash-list";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type MatchItem = Pick<
  Match,
  | "id"
  | "home_team"
  | "away_team"
  | "home_score"
  | "away_score"
  | "home_penalty_score"
  | "away_penalty_score"
  | "played_on"
  | "competition"
  | "season"
  | "stage"
>;

const PAGE_SIZE = 10;

export default function MatchesScreen() {
  const team = useAtomValue(teamAtom);

  const [pageIndex, setPageIndex] = useState(0);
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const getTotal = useCallback(async () => {
    if (!team) return 0;

    const countQuery = supabase
      .from("matches")
      .select("id", { count: "exact", head: true })
      .eq("team_id", team.id);
    // TODO: handle filters
    const { count } = await countQuery;
    setTotal(count ?? 0);
  }, [team]);

  const fetchPage = useCallback(
    async (targetPageIndex: number, append = false) => {
      if (!team) return;

      const pageQuery = supabase
        .from("matches")
        .select(
          "id, home_team, away_team, home_score, away_score, played_on, competition, season, stage, home_penalty_score, away_penalty_score",
        )
        .range(
          PAGE_SIZE * targetPageIndex,
          PAGE_SIZE * (targetPageIndex + 1) - 1,
        )
        .eq("team_id", team.id)
        .order("played_on", { ascending: false })
        .order("id", { ascending: false });
      // TODO: handle filters
      const { data, error } = await pageQuery;
      if (data) {
        if (append) {
          setMatches((prev) => [...prev, ...data]);
        } else {
          setMatches(data);
        }
      } else {
        console.error(error);
      }
    },
    [team],
  );

  useEffect(() => {
    if (!team) return;
    setPageIndex(0);
    setMatches([]);
    getTotal();
    fetchPage(0, false);
  }, [team, getTotal, fetchPage]);

  const handleEndReached = async () => {
    if (isLoadingMore || matches.length >= total || !team) return;

    setIsLoadingMore(true);
    const nextPageIndex = pageIndex + 1;
    setPageIndex(nextPageIndex);
    await fetchPage(nextPageIndex, true);
    setIsLoadingMore(false);
  };

  const renderItem = ({ item }: { item: MatchItem }) => (
    <TouchableOpacity>
      <Column gap="none" style={styles.match}>
        <Text size="xs">
          {item.competition}
          {item.stage && ` · ${item.stage}`}
        </Text>
        <Text weight="semibold">
          {item.home_team} v {item.away_team}
        </Text>
        <Text>
          {item.home_score} - {item.away_score}
        </Text>
        <Text size="xs">{formatDate(item.played_on, "MMM dd, yyyy")}</Text>
      </Column>
    </TouchableOpacity>
  );

  // TODO: use Skeleton in Empty State

  return (
    <FlashList
      data={matches}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      style={styles.screen}
      contentContainerStyle={styles.container}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.2}
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
  match: {
    backgroundColor: theme.colors.card,
    alignItems: "center",
    marginVertical: theme.gap.sm,
    padding: theme.gap.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
  },
}));
