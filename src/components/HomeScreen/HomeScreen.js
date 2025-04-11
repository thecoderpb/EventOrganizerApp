import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateEventScreen from "../CreateEventsScreen/CreateEventsScreen";
import DashboardScreen from "../DashboardScreen/DashboardScreen";
import FavouritesScreen from "../FavouritesScreen/FavouritesScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator

        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#007BFF",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: { fontSize: 14 },
          tabBarStyle: {
            paddingBottom: 5,
            height: 60,
          },

        }}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Create Event" component={CreateEventScreen} />
        <Tab.Screen name="Favourites" component={FavouritesScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
