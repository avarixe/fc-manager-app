import { Tabs } from "expo-router";
import React from "react";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="view-dashboard" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="players"
        options={{
          title: "Players",
          tabBarIcon: ({ color }) => (
            <Icon size={24} name="run" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: "Matches",
          tabBarIcon: ({ color }) => (
            <Icon size={24} name="soccer-field" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="[season]"
        options={{
          title: "Season",
          tabBarIcon: ({ color }) => (
            <Icon size={28} name="calendar" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
