import { Tabs } from 'expo-router';
import React from 'react';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { useUnistyles } from 'react-native-unistyles';

export default function TabLayout() {
  const { theme } = useUnistyles();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: theme.colors.tint,
        tabBarActiveTintColor: theme.colors.activeTint,
        sceneStyle: {
          backgroundColor: theme.colors.background
        },
        tabBarStyle: {
          backgroundColor: theme.colors.foreground
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Playlist',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="music.house" color={color} />,
        }}
      />
      <Tabs.Screen
        name="players/[songId]"
        options={{
          title: 'Player',
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="play.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear.circle" color={color} />,
        }}
      />
    </Tabs>
  );
}
