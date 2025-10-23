import { Tabs } from "expo-router";
import { Calendar, LayoutDashboard, Swords, User } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs initialRouteName="dashboard" screenOptions={{ headerShown: false }}>
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
    </Tabs>
  );
}
