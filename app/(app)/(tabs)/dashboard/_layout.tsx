import { teamAtom } from "@/atoms";
import { SettingsButton } from "@/components/common";
import { Stack } from "expo-router";
import { useAtomValue } from "jotai";
import React from "react";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

export default function DashboardLayout() {
  const { theme } = useUnistyles();
  const team = useAtomValue(teamAtom);

  return (
    <Stack
      screenOptions={{
        headerTitle: team?.name,
        headerTitleAlign: "center",
        headerRight: () => <SettingsButton />,
        headerTintColor: theme.colors.foreground,
        headerStyle: styles.header,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}

const styles = StyleSheet.create((theme) => ({
  header: {
    backgroundColor: theme.colors.background,
  },
}));
