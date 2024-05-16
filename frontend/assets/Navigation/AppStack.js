import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../Pages/HomeScreen";
import Profile from "../../Pages/Profile";
import TabNavigator from "./TabNavigator";
import Login from "../../Pages/Login";
import Registration from "../../Pages/Registration";
import TabNavigatorB from "./TabNavigatorB";
import { useBusinessTab } from "../../context/BusinessTabContext";

const Stack = createStackNavigator();

const AppStack = () => {
   const { businessTab } = useBusinessTab();
  return (
    <Stack.Navigator>
      {businessTab ? (
       <Stack.Screen
          name="TabNavB"
          component={TabNavigatorB}
          options={{ headerShown: false }}
        />
      ) : (
         <Stack.Screen
          name="TabNav"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{ headerShown: false }}
      />
      {/* Add more Stack.Screen components for additional screens*/}
    </Stack.Navigator>
  );
};

export default AppStack;
