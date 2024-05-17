import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserProfileManagement from "../Pages/UserProfileManagement";
// import MyBusinesses from "../Pages/MyBussinesses";
import More from "../Pages/More";

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
       {/* <Stack.Screen
        name="MyBusinesses"
        component={MyBusinesses}
        options={{ headerShown: false }}
      /> */}
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
