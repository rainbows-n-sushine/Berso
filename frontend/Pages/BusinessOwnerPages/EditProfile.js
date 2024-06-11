import React, { useEffect, useState, useContext } from "react";
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
  Modal,
} from "react-native";
import tw from "twrnc";
import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Font from "expo-font";
import api from "../../util/Util";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/AuthContext";
import * as ImagePicker from "expo-image-picker";

const EditProfile = () => {
    const { isLoading, userToken } = useContext(AuthContext);
    const [_firstName, setFirstName] = useState("");
    const [_middleName, setMiddleName] = useState("");
    const [_lastName, setLastName] = useState("");
    const [_username, setUserName] = useState("");
    const [_email, setEmail] = useState("");
    const [_phone, setPhone] = useState("");
    const [_dateOfBirth, setDateOfBirth] = useState("");
    const [date, setDate] = useState(new Date());
    const [_zipCode, setZipCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [_bio, setBio] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [errors, setErrors] = useState({});
    const [profilePic, setProfilePic] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const windowHeight = Dimensions.get("window").height;
    const navigation = useNavigation();


   const [businessProfilePic, setbusinessProfilePic] = useState(null);
   const pickImageFromGallery = async () => {
     const permissionResult =
       await ImagePicker.requestMediaLibraryPermissionsAsync();

     if (permissionResult.granted === false) {
       Alert.alert("Permission to access camera roll is required!");
       return;
     }

     const result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.Images,
       allowsEditing: true,
       aspect: [1, 1],
       quality: 1,
     });

     if (!result.cancelled) {
       saveProfile(result.assets[0].uri);
       // setbusinessProfilePic(result.assets[0].uri);
       //  setModalVisible(false);
     }
   };

   const takeImageFromCamera = async () => {
     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

     if (permissionResult.granted === false) {
       Alert.alert("Permission to access camera is required!");
       return;
     }

     const result = await ImagePicker.launchCameraAsync({
       //  mediaTypes: ImagePicker.MediaTypeOptions.Images,
       cameraType: ImagePicker.CameraType.front,
       allowsEditing: true,
       aspect: [1, 1],
       quality: 1,
     });

     if (!result.cancelled) {
       saveProfile(result.assets[0].uri);
       //  setbusinessProfilePic(result.assets[0].uri);
       //  setModalVisible(false);
     }
   };

   const saveProfile = async (businessProfilePic) => {
     try {
       console.log("here");
       setbusinessProfilePic(businessProfilePic);
       setModalVisible(false);
       // sending pp to backend
       sentToBackend();
     } catch (error) {
       console.log("whatt");
     }
   };

   const deletebusinessProfilePic = () => {
     setbusinessProfilePic(null);
     setModalVisible(false);
   };

   const defaultbusinessProfilePic = require("../../assets/Images/Home.jpg");

  

    const sentToBackend = async (profilePicUri) => {
      try {
        console.log("here");
        const formData = new FormData();
        formData.append("profilePic", {
          uri: profilePicUri,
          name: "profilePic.jpg",
          type: "image/jpg",
        });

        const response = await api.post("user/update-profilepic", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Profile picture uploaded:", response.data);
      } catch (error) {
        console.log("Error uploading profile picture:", error.message);
      }
    };

  return (
    <View style={tw`flex-1 bg-white justify-center`}>
      <ScrollView
        // contentContainerStyle={tw`justify-center items-center`}
        style={{ height: windowHeight }}
      >
        <View style={tw`flex-1 p-4 `}>
          <View style={tw`flex-row justify-between items-center mb-6 `}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* <View style={tw`items-center mb-8`}>
              <Image
                source={require("../assets/Images/logo-removebg.png")}
                style={tw`w-32 h-32`}
              />
            </View> */}

          <View>
            <Text
              style={{ fontFamily: "berlin-sans", fontSize: 35 }}
              className={`text-2xl font-bold mb-4 font-berlin-sans text-center py-2 `}
            >
              Update Business
            </Text>
          </View>
          <View style={tw``}>
            <View className="items-center justify-between p-7">
              <Image
                source={
                  businessProfilePic
                    ? { uri: businessProfilePic }
                    : defaultbusinessProfilePic
                }
                style={tw`w-full h-50 rounded-xl border-8 border-orange-300`}
              />
              <TouchableOpacity
                // onPress={}
                onPress={() => setModalVisible(true)}
                className="bg-red-400"
              >
                <View style={tw`absolute bottom-2 left-25 bg-white  p-1`}>
                  {/* <MaterialIcons name="add-a-photo" size={26} color="#FB923C" /> */}
                  <Text className="text-orange-500 font-bold">
                    Choose Profile Photo
                  </Text>
                </View>
              </TouchableOpacity>
              {/* <Text className="text-stone-400 ">Change Profile Photo</Text> */}
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View
                style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
              >
                <View style={tw`bg-white p-8 rounded-md w-80`}>
                  <TouchableOpacity
                    style={tw`border-b border-gray-200 py-2 flex-row items-center justify-center`}
                    onPress={takeImageFromCamera}
                  >
                    <Feather name="camera" size={23} color="#FB923C" />
                    <Text style={tw`text-base`}>Take a Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`border-b border-gray-200 py-2 flex-row items-center justify-center`}
                    onPress={pickImageFromGallery}
                  >
                    <Feather name="image" size={23} color="#FB923C" />
                    <Text style={tw`text-base text-center`}>
                      Choose from Library
                    </Text>
                  </TouchableOpacity>
                  {businessProfilePic && (
                    <TouchableOpacity
                      style={tw`border-b border-gray-200 py-2 flex-row items-center justify-center`}
                      onPress={deletebusinessProfilePic}
                    >
                      <MaterialIcons
                        name="delete-outline"
                        size={24}
                        color="#FB923C"
                      />
                      <Text style={tw`text-base text-center text-black`}>
                        Delete Profile Picture
                      </Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={tw`py-2`}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={tw`text-base text-center text-orange-400`}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <View style={tw` justify-center items-center mt-4`}>
              <View>
                <Text
                  style={[
                    tw`text-lg font-bold mb-4 berlinSans text-stone-700`,
                    { fontFamily: "berlin-sans" },
                  ]}
                >
                  Required Information
                </Text>
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Name of business"
                  onChangeText={(text) => {
                    handleChange("businessName", text);
                  }}
                />
                {/* </View> */}
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Email"
                  onChangeText={(text) => {
                    handleChange("email", text);
                  }}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Phone Number"
                  // value={firstName}
                  onChangeText={(text) => {
                    handleChange("phone", text);
                  }}
                />
                {/* <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Category"
                  // value={firstName}
                  onChangeText={(text) => {setCategories(text)}}
                /> */}
                <View
                  style={tw`w-full border bg-orange-50 border-gray-100 rounded-2xl w-80  mb-4`}
                >
                  {/* <MultipleSelectList
                    setSelected={(val) => {
                      setCategories(val);
                    }}
                    data={categoriesFetched}
                    label="Categories"
                    save="key"
                    placeholder="Select Catagory"
                    boxStyles={{
                      borderWidth: 0,
                      borderColor: "transparent",
                      alignItems: "center",
                    }}
                    inputStyles={{
                      color: "gray",
                    }}
                    dropdownStyles={{
                      borderWidth: 0.1,
                      borderColor: "gray",
                    }}

                    // onSelect={()=>{handleCategories(selected)}}
                    // onSelect={()=>{handleCategories()}}
                  /> */}
                </View>
              </View>
              <View>
                <Text
                  style={[
                    tw`text-lg font-bold mb-4 berlinSans  text-stone-700`,
                    { fontFamily: "berlin-sans" },
                  ]}
                >
                  Optional Details
                </Text>
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Website"
                  onChangeText={(text) => {
                    handleChange("website", text);
                  }}
                />
                <TextInput
                    style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80  px-4 mb-4`}
                    placeholder="Press to change Location"
                    // value={location}
                    editable={false}
                  />
                {/* <TouchableOpacity onPress={handleLocationPress}>
                  
                </TouchableOpacity> */}
                <View style={tw`ml-8`}>
                  {/* <TextInput
                    style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-70  px-4 mb-4`}
                    placeholder="Latitude"
                    value={latitude}
                    editable={false}
                  />
                  <TextInput
                    style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-70  px-4 mb-4`}
                    placeholder="Latitude"
                    value={longitude}
                    editable={false}
                  /> */}
                  {/* <Text
                    style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-70  p-3 mb-4`}
                  >
                    Latitude: {latitude}
                  </Text>
                  <Text
                    style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-70  p-3 mb-4`}
                  >
                    Longitude: {longitude}
                  </Text> */}
                </View>

                <View></View>
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Address"
                  // value={firstName}
                  onChangeText={(text) => {
                    handleChange("address", text);
                  }}
                />

                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Business Days"
                  // value={firstName}
                  onChangeText={(text) => {
                    handleChange("businessDays", text);
                  }}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Opening Hours"
                  // value={firstName}
                  onChangeText={(text) => {
                    handleChange("openingHours", text);
                  }}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Avarage Price"
                  // value={firstName}
                  onChangeText={(text) => {
                    handleChange("averagePrice", text);
                  }}
                />
                <TextInput
                  style={tw`w-full h-40 border bg-orange-50 border-gray-100 rounded-2xl w-80 px-4 pb-30 mb-4`}
                  placeholder="Description"
                  // value={firstName}
                  onChangeText={(text) => {
                    handleChange("description", text);
                  }}
                />
              </View>
              <TouchableOpacity
                style={tw`bg-orange-400 rounded-2xl h-12 items-center justify-center mb-4 w-80  mt-4`}
                // onPress={handleSubmit}
              >
                <Text
                  className={{ fontFamily: "berlin-sans" }}
                  style={tw`text-white font-bold`}
                >
                  Update Business
                </Text>
              </TouchableOpacity>
            </View>

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

export default EditProfile;
