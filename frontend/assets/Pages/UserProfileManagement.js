import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
  Button,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import tw from "twrnc";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";

import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
const UserProfileManagement = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [date, setDate] = useState(new Date());
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    const errors = {};

    if (firstName.trim() === "") {
      errors.firstName = "First name is required";
    }

    if (middleName.trim() === "") {
      errors.middleName = "Middle name is required";
    }

    if (lastName.trim() === "") {
      errors.lastName = "Last name is required";
    }

    if (email.trim() === "") {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format";
    }

    if (username.trim() === "") {
      errors.username = "Username is required";
    }

    // if (dateOfBirth.trim() === '') {
    //   errors.dateOfBirth = 'Date of birth is required';
    //}

    if (zipCode.trim() === "") {
      errors.zipCode = "Zip code is required";
    }

    if (password.trim() === "") {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password should be at least 6 characters long";
    }

    if (confirmPassword.trim() === "") {
      errors.confirmPassword = "Confirm password is required";
    } else if (confirmPassword != password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);
  };

  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const navigation = useNavigation();
  const windowHeight = Dimensions.get("window").height;
  return (
    <View style={tw`flex-1 bg-[#F2E8DE]`}>
      <ScrollView
        // contentContainerStyle={tw`justify-center items-center`}
        style={{ height: windowHeight }}
      >
        <View style={tw`flex-1 p-4 justify-center `}>
          <View style={tw`flex-row justify-between items-center mb-4  `}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("");
              }}
            >
              <Text style={tw`text-black text-xl font-bold`}>Done</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              // onPress={}
              className="flex items-center justify-between my-7"
            >
              <FontAwesome name="user-circle-o" size={70} color="black" />
              <Text className="text-stone-400 pt-2">Change Profile Photo</Text>
            </TouchableOpacity>
          </View>
          <View className="">
            <Text
              style={{ fontFamily: "berlin-sans", fontSize: 25 }}
              className="text-sm font-bold mb-4 py-3 text-orange-300"
            >
              Profile Details
            </Text>
            <View className='px-2'>
              <Text className="text-base text-stone-500 font-bold mb-1">
                UserName
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80  px-2 mb-4`}
                //   placeholder="Username"
                value={username}
                onChangeText={(text) => {
                  setUserName(text);
                }}
              />
              {errors.username && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>
                  {errors.username}
                </Text>
              )}
              <Text className="text-base  text-stone-500 font-bold mb-1">
                First Name
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80  px-2 mb-4`}
                //   placeholder="First Name"
                value={firstName}
                onChangeText={(text) => {
                  setFirstName(text);
                }}
              />
              {errors.firstName && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>
                  {errors.firstName}
                </Text>
              )}
              <Text className="text-base  text-stone-500 font-bold mb-1">
                Middle Name
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80  px-2 mb-4`}
                //   placeholder="Middle Name"
                value={middleName}
                onChangeText={(text) => {
                  setMiddleName(text);
                }}
              />
              {errors.middleName && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>
                  {errors.middleName}
                </Text>
              )}
              <Text className="text-base  text-stone-500 font-bold mb-1">
                Last Name
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                //   placeholder="Last Name"
                value={lastName}
                onChangeText={(text) => {
                  setLastName(text);
                }}
              />
              {errors.lastName && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>
                  {errors.lastName}
                </Text>
              )}
              <View style={tw`border-b border-white my-4 `} />
              <Text className="text-base  text-stone-500 font-bold mb-1">
                Email
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                //   placeholder="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
              {errors.email && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>{errors.email}</Text>
              )}
              <Text className="text-base  text-stone-500 font-bold mb-1">
                Phone Number
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                //   placeholder="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
              {errors.email && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>{errors.email}</Text>
              )}
              {/* <Text>Date of birth</Text>
            {!showPicker && (
              <Pressable onPress={toggleDatePicker}>
                <TextInput
                  style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                  //   placeholder="Date of Birth"
                  value={dateOfBirth}
                  onChangeText={(text) => {
                    setDateOfBirth(text);
                  }}
                  editable={false}
                />
              </Pressable>
            )}

            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
              />
            )} */}
              <Text className="text-base  text-stone-500 font-bold mb-1">
                Zip Code
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                //   placeholder="Zip Code"
                value={zipCode}
                onChangeText={(text) => {
                  setZipCode(text);
                }}
              />
              {errors.zipCode && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>
                  {errors.zipCode}
                </Text>
              )}
              <Text className="text-base  text-stone-500 font-bold mb-1">
                Bio
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                //   placeholder="Email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
              {errors.email && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>{errors.email}</Text>
              )}
              <View style={tw`border-b border-white my-4 `} />
              <Text className="text-base  text-stone-500 font-bold mb-1">
                Current Password
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                //   placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
              {errors.password && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>
                  {errors.password}
                </Text>
              )}
              <Text className="text-base  text-stone-500 font-bold mb-1">
                New Password
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                placeholder="New Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                }}
              />
              {errors.confirmPassword && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>
                  {errors.confirmPassword}
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfileManagement;
