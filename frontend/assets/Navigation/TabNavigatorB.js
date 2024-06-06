import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import {
  Entypo,
  Feather,
  FontAwesome,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
import HomeNavigator from "./HomeNavigator";
import ProfileNavigator from "./ProfileNavigator";
import CollectionsNavigator from "./CollectionsNavigator";
import MoreNavigator from "./MoreNavigator";
import HomeScreen from '../../Pages/BusinessOwnerPages/HomeScreen';
import Profile from '../../Pages/BusinessOwnerPages/Profile';
import More from '../../Pages/BusinessOwnerPages/More';
import BusinessProfilePage from '../../Pages/BusinessOwnerPages/Profile';
import MoreNavB from './MoreNavB';

const Tab = createBottomTabNavigator();
const TabNavigatorB = () => {
  return (
    <Tab.Navigator
      headerMode="screen"
      screenOptions={{
        // headerTitle: "Test",
        // headerShown: false,
        tabBarActiveTintColor: "orange",
      }}
    >
      <Tab.Screen
        name="HomeNavB"
        component={HomeScreen}
        options={{
          title: "Home",
          //   tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileNavB"
        component={BusinessProfilePage}
        options={{
          title: "Profile",
          //   tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="MoreNavB"
        component={MoreNavB}
        options={{
          title: "More",
          //   tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="menu" size={24} color={color} />
          ),
        }}
      />
      {/* Add more Tab.Screen components for additional tabs */}
    </Tab.Navigator>
  );
}

export default TabNavigatorB
