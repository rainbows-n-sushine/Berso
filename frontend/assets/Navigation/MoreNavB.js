import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import More from '../../Pages/BusinessOwnerPages/More';
import HomeScreen from '../../Pages/HomeScreen';
import TabNavigatorB from './TabNavigatorB';
import EditProfile from '../../Pages/BusinessOwnerPages/EditProfile';
const Stack = createStackNavigator();
const MoreNavB = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="More"
        component={More}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MoreNavB

