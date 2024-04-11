import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Pages/HomeScreen";
import Profile from "../Pages/Profile";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator >
      {/* <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Profile" component={Profile} /> */}
      {/* Add more Stack.Screen components for additional screens */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
