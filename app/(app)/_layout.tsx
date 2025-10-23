import { teamAtom } from "@/atoms";
import { SettingsButton } from "@/components/common";
import { Stack } from "expo-router";
import { useAtomValue } from "jotai";
import React from "react";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

export default function AppLayout() {
  const { theme } = useUnistyles();
  const team = useAtomValue(teamAtom);

  return (
    <Stack
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: theme.colors.foreground,
      }}
    >
      <Stack.Protected guard={!!team}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Screen
        name="select-team"
        options={{
          title: "Select Team",
          headerTitleAlign: "center",
          headerBackVisible: false,
          gestureEnabled: false,
          headerRight: () => <SettingsButton />,
        }}
      />
      <Stack.Screen
        name="team-form"
        options={{
          title: "Team",
          headerTitleAlign: "center",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          headerTitleAlign: "center",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create((theme) => ({
  header: {
    backgroundColor: theme.colors.background,
  },
}));
