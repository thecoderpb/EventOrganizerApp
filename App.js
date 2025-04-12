import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import LoginScreen from "./src/components/LoginScreen/LoginScreen";
import RegistrationScreen from "./src/components/RegistrationScreen/RegistrationScreen";
import HomeScreen from "./src/components/HomeScreen/HomeScreen";
import ViewEventScreen from "./src/components/ViewEventScreen/ViewEventScreen";
import EditEventScreen from "./src/components/EditEventScreen/EditEventScreen";
import FavouritesScreen from "./src/components/FavouritesScreen/FavouritesScreen";

const Stack = createNativeStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#F5F3FF", 
  },
};

// Custom header with back button
const CustomHeader = ({ navigation }) => (
  <View style={{ height: 150, backgroundColor: "#4B3F72", justifyContent: "center", alignItems: "center", flexDirection: 'row', paddingHorizontal: 20 }}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 10 }}>
      <MaterialIcons name="arrow-back" size={24} color="#fff" />
    </TouchableOpacity>
    <Text style={{ fontWeight: "700", fontSize: 20, color: "#fff" }}>Register</Text>
  </View>
);

export default function App() {
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#4B3F72", 
          },
          headerTintColor: "#FFFFFF", 
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 20,
            letterSpacing: 0.5,
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={({ navigation }) => ({
            headerShown: true,
            header: () => <CustomHeader navigation={navigation} /> 
          })}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Event Organizer",
            headerBackButtonDisplayMode: "none",
            headerRight: () => (
              <TouchableOpacity
                onPress={async () => {
                  const { auth } = require("./src/config/firebase");
                  await auth.signOut();
                  navigation.replace("Login");
                }}
                style={{ paddingHorizontal: 12 }}
              >
                <MaterialIcons name="logout" size={24} color="#FFF" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ViewEvent"
          component={ViewEventScreen}
          options={{ title: "Event Details" }}
        />
        <Stack.Screen
          name="EditEvent"
          component={EditEventScreen}
          options={{ title: "Edit Event" }}
        />
        <Stack.Screen
          name="favouritesEvents"
          component={FavouritesScreen}
          options={{ title: "Edit Event" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
