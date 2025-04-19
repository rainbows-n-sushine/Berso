import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../../Pages/Profile";
import BusinessRegistration from '../../Pages/BusinessRegistration';
import UserProfileManagement from '../../Pages/UserProfileManagement';
import AddReview from '../../Pages/AddReview';
<<<<<<< HEAD
=======
import AddPhoto from '../../Pages/AddPhoto';
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e


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
<<<<<<< HEAD
         options={{ headerShown: true }}
      />
       {/*<Stack.Screen
=======
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="AddPhoto"
        component={AddPhoto}
        options={{ headerShown: true }}
      />
      {/*<Stack.Screen
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
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