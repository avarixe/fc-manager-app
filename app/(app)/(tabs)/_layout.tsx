import { Tabs } from "expo-router";
import {
  Calendar,
  ClipboardList,
  LayoutDashboard,
  Swords,
  User,
} from "lucide-react-native";
import React from "react";
import { useUnistyles } from "react-native-unistyles";

export default function TabLayout() {
  const { theme } = useUnistyles();

  return (
    <Tabs
      initialRouteName="dashboard"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.mutedForeground,
        tabBarLabelStyle: {
          fontSize: theme.fontSize.xs,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <LayoutDashboard color={color} />,
        }}
      />
      <Tabs.Screen
        name="players"
        options={{
          title: "Players",
          tabBarIcon: ({ color }) => <User color={color} />,
          href: "/players",
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: "Matches",
          tabBarIcon: ({ color }) => <Swords color={color} />,
          href: "/matches",
        }}
      />
      <Tabs.Screen
        name="[season]"
        options={{
          title: "Season",
          tabBarIcon: ({ color }) => <Calendar color={color} />,
          href: "/[season]",
        }}
      />
      <Tabs.Screen
        name="squads"
        options={{
          title: "Squads",
          tabBarIcon: ({ color }) => <ClipboardList color={color} />,
          href: "/squads",
        }}
      />
    </Tabs>
  );
}
