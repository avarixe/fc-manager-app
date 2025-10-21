import { teamAtom } from "@/atoms";
import { SettingsButton } from "@/components/common";
import { Tabs } from "expo-router";
import { useAtomValue } from "jotai";
import { Calendar, LayoutDashboard, Swords, User } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  const team = useAtomValue(teamAtom);

  return (
    <Tabs
      screenOptions={{
        headerTitle: team?.name,
        headerTitleAlign: "center",
        headerRight: () => <SettingsButton />,
        headerRightContainerStyle: {
          paddingRight: 16,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <LayoutDashboard color={color} />,
          href: "/",
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
    </Tabs>
  );
}
