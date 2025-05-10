import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../../Pages/Profile";
import BusinessRegistration from '../../Pages/BusinessRegistration';
import UserProfileManagement from '../../Pages/UserProfileManagement';
import AddReview from '../../Pages/AddReview';
import AddPhoto from '../../Pages/AddPhoto';


const Stack = createStackNavigator();
const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddBusiness"
        component={BusinessRegistration}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditUserProfile"
        component={UserProfileManagement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddReview"
        component={AddReview}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="AddPhoto"
        component={AddPhoto}
        options={{ headerShown: true }}
      />
      {/*<Stack.Screen
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