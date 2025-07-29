import { Stack } from 'expo-router';
import React from 'react';

export default function PlayersLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Players', headerShown: false }} />
    </Stack>
  );
}
