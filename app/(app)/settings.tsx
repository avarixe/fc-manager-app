import { sessionAtom, teamAtom } from "@/atoms";
import { Column, Row, Spacer } from "@/components/ui";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import { useAtom, useSetAtom } from "jotai";
import {
  ChevronRight,
  LogOut,
  MoonStar,
  ShieldEllipsis,
  Sun,
} from "lucide-react-native";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from "react-native-unistyles";

export default function SettingsModal() {
  const setSession = useSetAtom(sessionAtom);
  const [team, setTeam] = useAtom(teamAtom);
  const { theme, rt } = useUnistyles();

  const setTheme = (newTheme: "light" | "dark") => {
    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme(newTheme);
  };

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
          <ShieldEllipsis size={32} color={theme.colors.foreground} />
          <Text style={styles.action}>Select Team</Text>
          <Spacer />
          <ChevronRight size={32} color={theme.colors.foreground} />
        </Row>
      </TouchableOpacity>
      <Row style={styles.row}>
        <ThemeButton
          mode="light"
          onPress={() => setTheme("light")}
          disabled={theme.name === "light"}
        />
        <ThemeButton
          mode="dark"
          onPress={() => setTheme("dark")}
          disabled={theme.name === "dark"}
        />
      </Row>
      <TouchableOpacity onPress={onPressSignOut}>
        <Row style={styles.row}>
          <LogOut size={32} color={theme.colors.destructive} />
          <Text style={[styles.action, styles.signOut]}>Sign Out</Text>
        </Row>
      </TouchableOpacity>
    </ScrollView>
  );
}

const ThemeButton: React.FC<
  TouchableOpacityProps & {
    mode: "light" | "dark";
  }
> = ({ mode, disabled, ...props }) => {
  const { theme } = useUnistyles();

  styles.useVariants({
    disabled,
  });

  return (
    <TouchableOpacity style={styles.themeButton} disabled={disabled} {...props}>
      <Column style={{ alignItems: "center" }}>
        {mode === "light" && <Sun size={32} color={theme.colors.foreground} />}
        {mode === "dark" && (
          <MoonStar size={32} color={theme.colors.foreground} />
        )}
        <Text style={styles.themeButtonText}>{mode} Mode</Text>
      </Column>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    paddingTop: theme.gap.md,
    backgroundColor: theme.colors.background,
  },
  row: {
    padding: theme.gap.md,
  },
  action: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.foreground,
  },
  signOut: {
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.destructive,
  },
  themeButton: {
    borderRadius: theme.borderRadius.md,
    padding: theme.gap.lg,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    alignItems: "center",
    variants: {
      disabled: {
        true: {
          opacity: 0.5,
        },
      },
    },
  },
  themeButtonText: {
    color: theme.colors.foreground,
    textTransform: "capitalize",
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
  },
}));
