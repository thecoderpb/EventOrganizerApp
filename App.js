import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import LoginScreen from "./src/components/LoginScreen/LoginScreen";
import RegistrationScreen from "./src/components/RegistrationScreen/RegistrationScreen";
import HomeScreen from "./src/components/HomeScreen/HomeScreen";
import ViewEventScreen from "./src/components/ViewEventScreen/ViewEventScreen";
import EditEventScreen from "./src/components/EditEventScreen/EditEventScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Event Organizer",
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity
                onPress={async () => {
                  const { auth } = require("./src/config/firebase");
                  await auth.signOut();
                  navigation.replace("Login");
                }}
              >
                <MaterialIcons name="logout" size={24} color="#007BFF" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ViewEvent"
          component={ViewEventScreen}
          options={{ headerShown: true, title: "Event Details" }}
        />
        <Stack.Screen
          name="EditEvent"
          component={EditEventScreen}
          options={{ headerShown: true, title: "Edit Event" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
