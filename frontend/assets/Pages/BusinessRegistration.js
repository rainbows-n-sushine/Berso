import React, { useEffect } from "react";
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
import { AntDesign, Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";

const BusinessRegistration = () => {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "berlin-sans": require("../fonts/berlin-sans/BerlinSans.ttf"),
      });
    }

    loadFonts();
  }, []);
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  return (
    <View style={tw`flex-1 bg-[#F6D8BD] justify-center`}>
      <ScrollView
        // contentContainerStyle={tw`justify-center items-center`}
        style={{ height: windowHeight }}
      >
        <View style={tw`flex-1 p-4 `}>
          <View style={tw`flex-row justify-between items-center mb-6 `}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* <View style={tw`items-center mb-8`}>
              <Image
                source={require("../Images/logo-removebg.png")}
                style={tw`w-32 h-32`}
              />
            </View> */}

          <View>
            <Text
              style={{ fontFamily: "berlin-sans", fontSize: 35 }}
              className={`text-2xl font-bold mb-4 font-berlin-sans text-center text-white `}
            >
              Register Business
            </Text>
          </View>
          <View className="">
            <TouchableOpacity className="p-10 items-center  border-orange-300 border-8 rounded-2xl mb-5">
              <Feather name="share" size={100} color="orange" />
            </TouchableOpacity>
            <View className=" justify-center items-center">
              <View>
                <Text className="text-lg font-bold mb-4 berlinSans text-stone-400">
                  Required Information
                </Text>
                <TextInput
                  style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Name of business"
                  // value={firstName}
                  onChangeText={(text) => {}}
                />
                {/* </View> */}
                <TextInput
                  style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Email"
                  // value={firstName}
                  onChangeText={(text) => {}}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Phone Number"
                  // value={firstName}
                  onChangeText={(text) => {}}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Catagory"
                  // value={firstName}
                  onChangeText={(text) => {}}
                />
              </View>
              <View>
                <Text className="text-lg font-bold mb-4 berlinSans  text-stone-400">
                  Optional Details
                </Text>
                <TextInput
                  style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Website"
                  // value={firstName}
                  onChangeText={(text) => {}}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Loctation"
                  // value={firstName}
                  onChangeText={(text) => {}}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Address"
                  // value={firstName}
                  onChangeText={(text) => {}}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Business Days"
                  // value={firstName}
                  onChangeText={(text) => {}}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Opening Hours"
                  // value={firstName}
                  onChangeText={(text) => {}}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Avarage Price"
                  // value={firstName}
                  onChangeText={(text) => {}}
                />
                <TextInput
                  style={tw`w-full h-40 border bg-white border-gray-300 rounded-2xl w-80   px-4 mb-4`}
                  placeholder="Description"
                  // value={firstName}
                  onChangeText={(text) => {}}
                />
              </View>
            </View>
            <TouchableOpacity
              style={tw`bg-orange-400 rounded-2xl h-12 items-center justify-center mb-4 w-80  mt-4`}
              // onPress={}
            >
              <Text style={tw`text-white font-bold`}>Register</Text>
            </TouchableOpacity>

            {/* <View style={tw`flex-row justify-center mt-8`}>
              <Text style={tw`text-sm text-white`}>Already registered? </Text>
              <Text style={tw`text-sm fontbold text-orange-500`}>Login</Text>
            </View> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BusinessRegistration;
