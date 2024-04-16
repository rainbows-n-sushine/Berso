import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
const Collections = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-orange-50 items-center justify-between top-8">
      <View className="flex items-center justify-between">
        <Text className="text-xl">Sign in for collections</Text>
        <TouchableOpacity
          className="bg-white p-3 rounded-xl"
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Collections

const styles = StyleSheet.create({})