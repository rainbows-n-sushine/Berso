import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../Pages/Profile";


const Stack = createStackNavigator();
const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
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
}

export default ProfileNavigator

const styles = StyleSheet.create({})