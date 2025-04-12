import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateEventScreen from "../CreateEventsScreen/CreateEventsScreen";
import DashboardScreen from "../DashboardScreen/DashboardScreen";
import FavouritesScreen from "../FavouritesScreen/FavouritesScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#4B3F72",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: { fontSize: 13, fontWeight: "600" },
          tabBarStyle: {
            backgroundColor: "#F8F8FF",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            height: 50,
            paddingBottom: 8,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Dashboard") iconName = "dashboard";
            else if (route.name === "Create Event") iconName = "event";
            else if (route.name === "Favourites") iconName = "favorite";

            return <MaterialIcons name={iconName} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Create Event" component={CreateEventScreen} />
        <Tab.Screen name="Favourites" component={FavouritesScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
