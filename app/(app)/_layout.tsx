import { teamAtom } from "@/atoms";
import { Stack } from "expo-router";
import { useAtomValue } from "jotai";
import React from "react";

export default function AppLayout() {
  const team = useAtomValue(teamAtom);

  return (
    <Stack>
      <Stack.Protected guard={!!team}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Screen
        name="select-team"
        options={{ title: "Select Team", headerTitleAlign: "center" }}
      />
      <Stack.Screen name="team-form" options={{ headerShown: false }} />
    </Stack>
  );
}
