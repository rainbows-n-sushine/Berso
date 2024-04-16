import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Pages/HomeScreen";
import Profile from "../Pages/Profile";
import SearchBusinessScreen from "../Pages/SearchBusinessScreen";
import SearchResultsScreen from "../Pages/SearchResultsScreen";
import Collections from "../Pages/Collections";

const CollectionsNavigator = () => {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Collection"
        component={Collections}
        options={{ headerShown: false }}
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

export default CollectionsNavigator;

