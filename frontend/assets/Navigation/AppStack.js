import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../Pages/HomeScreen";
import Profile from "../../Pages/Profile";
import TabNavigator from "./TabNavigator";
import UserLogin from "../../Pages/UserLogin";
import UserRegistration from "../../Pages/UserRegistration";
import BusinessOwnerLogin from "../../Pages/BusinessOwnerLogin";
import BusinessOwnerRegistration from "../../Pages/BusinessOwnerRegistration";
import More from "../../Pages/More";


const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNav"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserLogin"
        component={UserLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserRegistration"
        component={UserRegistration}
        options={{ headerShown: false }}
      /> 
      <Stack.Screen
        name="BusinessOwnerLogin"
        component={BusinessOwnerLogin}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="BusinessOwnerRegistration"
        component={BusinessOwnerRegistration}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="More"
        component={More}
        options={{ headerShown: false }}
      />
       {/* Add more Stack.Screen components for additional screens*/}
    </Stack.Navigator>
    
  );
};

export default AppStack;
