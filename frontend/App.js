//import { StatusBar } from 'expo-status-bar';
import React from 'react';
//import { Text, View } from 'react-native';
import Login from './assets/Pages/Login';
import Registration from './assets/Pages/Registration';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './assets/Pages/HomeScreen';
import Profile from './assets/Pages/Profile';
import TabNavigator from './assets/Navigation/TabNavigator';
import StackNavigator from './assets/Navigation/StackNavigator';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>

      {/* <Login/> */}
      <StackNavigator />
      {/* <HomeScreen /> */}
      {/* <TabNavigator /> */}
      {/* <Registration/> */}
      {/* <Login /> */}

    </NavigationContainer>
  );
}