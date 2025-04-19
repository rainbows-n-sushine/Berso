import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import More from '../../Pages/BusinessOwnerPages/More';
import HomeScreen from '../../Pages/HomeScreen';
import TabNavigatorB from './TabNavigatorB';
<<<<<<< HEAD
=======
import EditProfile from '../../Pages/BusinessOwnerPages/EditProfile';
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
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
<<<<<<< HEAD
=======
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
    </Stack.Navigator>
  );
}

export default MoreNavB

