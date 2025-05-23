import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserProfileManagement from "../../Pages/UserProfileManagement";
// import MyBusinesses from "../Pages/MyBussinesses";
import More from "../../Pages/More";
import BusinessPage from "../../Pages/BusinessPage";
import HomeScreen from "../../Pages/BusinessOwnerPages/HomeScreen";
import ReportProblem from "../../Pages/ReportProblem";
import Maps from "../../Pages/Map";
import Settings from "../../Pages/Settings";
import AboutBersoScreen from "../../Pages/AboutUs";

const Stack = createStackNavigator();
const MoreNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="More"
        component={More}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditUserProfile"
        component={UserProfileManagement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BusinessHome"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    

      <Stack.Screen
        name="BusinessPage"
        component={BusinessPage}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ReportProblem"
        component={ReportProblem}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutBersoScreen}
        options={{ headerShown: true }}
      />

      {/* <Stack.Screen
        name="SearchBusiness"
        component={SearchBusinessScreen}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{ headerShown: false }}
      /> */}
      {/* Add more Stack.Screen components for additional screens */}
    </Stack.Navigator>
  );
};

export default MoreNavigator;
