import { teamAtom } from "@/atoms";
import SettingsButton from "@/components/navigation/settings-button";
import { Icon } from "@/components/ui/icon";
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
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Icon as={LayoutDashboard} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="players"
        options={{
          title: "Players",
          tabBarIcon: ({ color }) => <Icon as={User} color={color} />,
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: "Matches",
          tabBarIcon: ({ color }) => <Icon as={Swords} color={color} />,
        }}
      />
      <Tabs.Screen
        name="[season]"
        options={{
          title: "Season",
          tabBarIcon: ({ color }) => <Icon as={Calendar} color={color} />,
        }}
      />
    </Tabs>
  );
}
