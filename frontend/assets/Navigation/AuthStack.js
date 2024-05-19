import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Pages/HomeScreen";
import Profile from "../Pages/Profile";
import TabNavigator_newbie from "./TabNavigator_newbie";
import Login from "../Pages/UserLogin";
import Registration from "../Pages/UserRegistration";


const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNav_newbie"
        component={TabNavigator_newbie}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{ headerShown: false }}
      /> */}
      {/* Add more Stack.Screen components for additional screens */}
    </Stack.Navigator>
  );
};

export default AuthStack;
