import { SettingsButton } from "@/components/common";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

export default function SquadsLayout() {
  const { theme } = useUnistyles();

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerRight: () => <SettingsButton />,
        headerTintColor: theme.colors.foreground,
        headerStyle: styles.header,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Squads",
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
