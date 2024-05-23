//import { StatusBar } from 'expo-status-bar';
import React from 'react';
//import { Text, View } from 'react-native';
import UserLogin from './Pages/UserLogin';
import UserRegistration from './Pages/UserRegistration';
import  {NavigationContainer}  from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './Pages/HomeScreen';
import Profile from './Pages/Profile';

import TabNavigator from './assets/Navigation/TabNavigator';
import AppNav from './assets/Navigation/AppNav.js'

import AuthProvider from './context/AuthContext.js'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>

      <AppNav/>

    </AuthProvider>

  );
}