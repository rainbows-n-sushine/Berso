import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Pages/HomeScreen";
import Profile from "../Pages/Profile";
import SearchBusinessScreen from '../Pages/SearchBusinessScreen';
import SearchResultsScreen from '../Pages/SearchResultsScreen'
import BusinessList from '../Pages/BusinessList';

const Stack = createStackNavigator();
const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchBusiness"
        component={SearchBusinessScreen}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BusinessList"
        component={BusinessList}
        options={{ headerShown: false }}
      />

      {/* Add more Stack.Screen components for additional screens */}
    </Stack.Navigator>
  );
}

export default HomeNavigator







