import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../Pages/HomeScreen";
import Profile from "../../Pages/Profile";
import SearchBusinessScreen from "../../Pages/SearchBusinessScreen";
import SearchResultsScreen from "../../Pages/SearchResultsScreen";
import BusinessList from "../../Pages/BusinessList";
import BusinessPage from '../../Pages/BusinessPage';
import AddReview from '../../Pages/AddReview';
<<<<<<< HEAD
import CatagoriesList from '../../Pages/CatagoriesList';
=======
import MapForBusiness from '../../Pages/MapForBusiness'
import CatagoriesList from '../../Pages/CatagoriesList';
import Maps from '../../Pages/Map';
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e

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
<<<<<<< HEAD
        // options={{ headerShown: false }}
=======
        options={{ headerShown: false }}
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
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
      <Stack.Screen
        name="BusinessPage"
        component={BusinessPage}
        options={{ headerShown: true }}
      />
      <Stack.Screen
<<<<<<< HEAD
=======
        name="MapForBusiness"
        component={MapForBusiness}
        options={{ headerShown: true }}
      />
      <Stack.Screen
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
        name="AddReview"
        component={AddReview}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="CathagoryList"
        component={CatagoriesList}
        options={{ headerShown: false }}
      />
<<<<<<< HEAD
=======
      <Stack.Screen
        name="Maps"
        component={Maps}
        options={{ headerShown: true }}
      />
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e

      {/* Add more Stack.Screen components for additional screens */}
    </Stack.Navigator>
  );
}

export default HomeNavigator







