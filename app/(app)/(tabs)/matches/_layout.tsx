import { Stack } from "expo-router";
import React from "react";

export default function MatchesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Matches", headerShown: false }}
      />
    </Stack>
  );
}
