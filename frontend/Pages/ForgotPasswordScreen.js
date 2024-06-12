import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import email from "react-native-email"; // Import the react-native-email package

const ForgotPasswordScreen = () => {
  const [inputEmail, setInputEmail] = useState(""); // Rename 'email' state to 'inputEmail'
  const navigation = useNavigation();

  const handleResetPassword = () => {
    sendEmail(); // Call the sendEmail function
    // Here you can add your logic to send a password reset email
    if (inputEmail.trim() === "") {
      Alert.alert("Error", "Please enter your email address.");
    } else {
      // Placeholder for password reset functionality
      console.log("Reset password for email:", inputEmail);
      Alert.alert(
        "Password Reset",
        "A password reset link has been sent to your email address."
      );
      // Clear the email field after submitting
      setInputEmail("");
    }
  };

  const sendEmail = () => {
    const to = [inputEmail]; // Use the inputEmail state value
    email(to, {
      // Email Object
      subject: "Password Reset", // Subject of the email
      body: "Here is the link to reset your password.", // Body of the email
    }).catch(console.error);
  };

  return (
    <View style={[tw`flex-1 justify-center items-center bg-ornage-50`]}>
      <TouchableOpacity
        style={tw`absolute top-4 left-4 p-2`}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="angle-left" size={30} color="black" />
      </TouchableOpacity>
      <Text style={tw`text-lg font-bold mb-4 text-center`}>
        Forgot Your Password?
      </Text>
      <TextInput
        style={[
          tw`w-full p-3 mb-4 border border-gray-300 rounded-lg bg-white w-80`,
        ]}
        placeholder="Enter your email address"
        value={inputEmail}
        onChangeText={setInputEmail}
      />
      <TouchableOpacity
        style={[tw`w-full p-4 bg-orange-500 rounded-lg items-center w-80`]}
        onPress={handleResetPassword}
      >
        <Text style={tw`text-white text-lg font-bold`}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
