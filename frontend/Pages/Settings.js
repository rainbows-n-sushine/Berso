
import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = async () => {
    setIsDarkMode(previousState => !previousState);
    await AsyncStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
  };

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={tw`flex-1 p-4 m-3`}>
      <View style={tw`m-4`}>
        <Text
          style={[
            tw`text-3xl font-bold text-orange-500 `,
            { fontFamily: "berlin-sans" },
          ]}
        >
          Settings
        </Text>
      </View>

      <View
        style={tw`flex-row justify-between items-center mb-4 bg-white p-4 rounded-lg`}
      >
        <Text style={tw`text-lg`}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
