import { sessionAtom, teamAtom } from "@/atoms";
import { Column, Icon, Row, Spacer } from "@/components/ui";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import { useAtom, useSetAtom } from "jotai";
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
  const { theme } = useUnistyles();

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
      <TouchableOpacity
        onPress={() => router.push("/select-team")}
        style={styles.touchable}
      >
        <Row style={styles.row}>
          <Icon name="shield-ellipsis" size={32} />
          <Text style={styles.action}>Select Team</Text>
          <Spacer />
          <Icon name="chevron-right" size={32} />
        </Row>
      </TouchableOpacity>
      <Row>
        <ThemeButton
          mode="light"
          onPress={() => setTheme("light")}
          isSelected={theme.name === "light"}
        />
        <ThemeButton
          mode="dark"
          onPress={() => setTheme("dark")}
          isSelected={theme.name === "dark"}
        />
      </Row>
      <Spacer />
      <TouchableOpacity
        onPress={onPressSignOut}
        style={[styles.touchable, styles.signOutTouchable]}
      >
        <Row style={styles.row}>
          <Icon name="log-out" size={32} color="destructive" />
          <Text style={[styles.action, styles.signOut]}>Sign Out</Text>
        </Row>
      </TouchableOpacity>
    </ScrollView>
  );
}

const ThemeButton: React.FC<
  TouchableOpacityProps & {
    mode: "light" | "dark";
    isSelected: boolean;
  }
> = ({ mode, isSelected, ...props }) => {
  styles.useVariants({ isSelected });

  return (
    <TouchableOpacity
      style={styles.themeButton}
      disabled={isSelected}
      {...props}
    >
      <Column style={{ alignItems: "center" }}>
        {mode === "light" && <Icon name="sun" size={32} />}
        {mode === "dark" && <Icon name="moon-star" size={32} />}
        <Text style={styles.themeButtonText}>{mode} Mode</Text>
      </Column>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    flex: 1,
    paddingHorizontal: theme.gap.md,
    paddingTop: theme.gap.xl,
    paddingBottom: rt.insets.bottom + theme.gap.xl,
    backgroundColor: theme.colors.background,
  },
  touchable: {
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
  },
  signOutTouchable: {
    borderColor: theme.colors.destructive,
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
    marginVertical: theme.gap.md,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.card,
    alignItems: "center",
    variants: {
      isSelected: {
        true: {
          borderColor: theme.colors.primary,
          boxShadow: `0 0 2px 2px ${theme.colors.primary}`,
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
