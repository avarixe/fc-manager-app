import { sessionAtom, teamAtom } from "@/atoms";
import { Row, Spacer } from "@/components/ui";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import { useAtom, useSetAtom } from "jotai";
import { ChevronRight, LogOut, ShieldEllipsis } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native-unistyles";

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
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.push("/select-team")}>
        <Row style={styles.row}>
          <ShieldEllipsis size={32} />
          <Text style={styles.action}>Select Team</Text>
          <Spacer />
          <ChevronRight size={32} />
        </Row>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressSignOut}>
        <Row style={styles.row}>
          <LogOut size={32} color="red" />
          <Text style={[styles.action, styles.signOut]}>Sign Out</Text>
        </Row>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    paddingTop: theme.gap.md,
  },
  row: {
    padding: theme.gap.md,
  },
  action: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
  },
  signOut: {
    fontWeight: theme.fontWeight.bold,
    color: "red",
  },
}));
