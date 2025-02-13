import React, { useState, useEffect, useContext } from "react";
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
  SafeAreaView,
} from "react-native";
import tw from "twrnc";
import * as ImagePicker from "expo-image-picker";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";

import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import api from '../util/Util';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";


const UserProfileManagement = () => {
  const { isLoading, userToken } = useContext(AuthContext); 
  const [_firstName, setFirstName] = useState("");
  const [_middleName, setMiddleName] = useState("");
  const [_lastName, setLastName] = useState("");
  const [_username, setUserName] = useState("");
  const [_email, setEmail] = useState("");
  const [_phone,setPhone]=useState('')
  const [_dateOfBirth, setDateOfBirth] = useState("");
  const [date, setDate] = useState(new Date());
  const [_zipCode, setZipCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [_bio,setBio]=useState('')
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [errors, setErrors] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();



  useEffect(()=>{
    fetchUserData()

  },[])

const fetchUserData=async()=>{
  const userId=await AsyncStorage.getItem('userId')
  console.log(typeof userId)
  console.log('this is the userId inside fetch data: '+userId)
  await api.post('user/user-profile-data',{userId})
  .then((res)=>{
    if(res.data.success===true){
      const {user}=res.data

      console.log('this is the user '+user)
      console.log(user.name)
      const{name,password,username,email,zip_code,dob,bio}=user
      const fullName=name.split(' ')
      setFirstName(fullName[0])
      setMiddleName(fullName[1])
      setLastName(fullName[2])
      setUserName(username)
      setEmail(email)
      setZipCode(zip_code)
      setDateOfBirth(dob)
      setBio(bio)

    }else{
      Alert.alert(res.data.message)
    }


  })
  .catch((err)=>{
    if(err){
      console.log('Error in fetch Data: ',err.message)
    }
  })



}

  const handleSubmit = async() => {
    await validateForm();
    const userId=await AsyncStorage.getItem('userId')


   
console.log(errors)
    // Check if there are any errors
    if (Object.keys(errors).length === 0) {

    // console.log('Iam in user rprofiel  xnksbckjbcdsj ')
    const fullName=_firstName+ " "+_middleName+ " "+_lastName
    console.log(fullName+" "+_username+" "+_email+" "+_dateOfBirth+" "+_zipCode+" "+newPassword+" "+currentPassword)
await api.post('user/update-profile',{fullName,_username,_email,_dateOfBirth,_phone,_zipCode,_email,_bio,currentPassword,newPassword,userId})
.then((res)=>{
  // console.log('im in profile update handlesubmit')
  console.log(res.data.message)
})
.catch((err)=>{
  if(err){
    console.log(err.message)
  }
})

  }
}
  

  const validateForm = () => {
    const _errors = {};
    console.log('im in validate form')

    if (_firstName.trim() === "") {
     _errors.firstName = "First name is required";
    }

    if (_middleName.trim() === "") {
      _errors.middleName = "Middle name is required";
    }

    if (_lastName.trim() === "") {
      _errors.lastName = "Last name is required";
    }

    if (_email.trim() === "") {
      _errors.email = "Email is required";
    } else if (!isValidEmail(_email)) {
      _errors.email = "Invalid email format";
    }
    if (_phone.trim() === "") {
      _errors.phone = "Phone number is required";
    } else if (!isValidEmail(_email)) {
      _errors.phone = "Invalid phone number format";
    }

    if (_username.trim() === "") {
      _errors.username = "Username is required";
    }

    // if (dateOfBirth.trim() === '') {
    //   errors.dateOfBirth = 'Date of birth is required';
    //}

    if (_zipCode.trim() === "") {
      _errors.zipCode = "Zip code is required";
    }

    if (newPassword.trim() === "") {
      _errors.newPassword = " new Password is required";
    } else if (newPassword.length < 6) {
      _errors.newPassword = "new Password should be at least 6 characters long";
    }

    if (currentPassword.trim() === "") {
      _errors.currentPassword = "Current password is required";
    }
    
    setErrors(_errors);
  };

  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
      // setProfilePic(result.assets[0].uri);
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
      //  setProfilePic(result.assets[0].uri);
      //  setModalVisible(false);
    }
  };

  const saveProfile = async (profilePic) => {
    try {
       console.log("here");
      setProfilePic(profilePic);
      setModalVisible(false);
      // sending pp to backend
      sentToBackend();
    } catch (error) {
      console.log("whatt");
    }
  };

  const deleteProfilePic = () => {
    setProfilePic(null);
    setModalVisible(false);
  };

  const defaultProfilePic = require("../assets/Images/defaultprofile.png");

  const sentToBackend = async (profilePicUri) => {
    try {
        console.log("here");
      const formData = new FormData();
      formData.append("profilePic", {
        uri: profilePicUri,
        name: "profilePic.jpg",
        type: "image/jpg",
      }
    );
 
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
    <View style={tw`flex-1 bg-white`}>
      <ScrollView
        // contentContainerStyle={tw`justify-center items-center`}
        style={{ height: windowHeight }}
      >
        {isLoading ? (
          <>
            <View>
              <Text>Loading...</Text>
            </View>
          </>
        ) : userToken ? (
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
                <Text style={tw`text-black text-lg font-bold`}>Done</Text>
              </TouchableOpacity>
            </View>

            <View className="items-center justify-between p-7">
              <Image
                source={profilePic ? { uri: profilePic } : defaultProfilePic}
                style={tw`w-32 h-32 rounded-full border border-orange-300`}
              />
              <TouchableOpacity
                // onPress={}
                onPress={() => setModalVisible(true)}
                className="bg-red-400"
              >
                <View
                  style={tw`absolute bottom-0 left-8 bg-white rounded-full p-1`}
                >
                  <MaterialIcons name="add-a-photo" size={26} color="#FB923C" />
                </View>
              </TouchableOpacity>
              <Text className="text-stone-400 ">Change Profile Photo</Text>
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
                  {profilePic && (
                    <TouchableOpacity
                      style={tw`border-b border-gray-200 py-2 flex-row items-center justify-center`}
                      onPress={deleteProfilePic}
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
            <View className="">
              <Text
                style={{ fontFamily: "berlin-sans", fontSize: 25 }}
                className="text-sm font-bold mb-4 py-3 text-orange-300"
              >
                Profile Details
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80  px-2 mb-2`}
                //   placeholder="Username"
                value={_username}
                onChangeText={(text) => {
                  setUserName(text);
                }}
              />
              {errors.username && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>
                  {errors.username}
                </Text>
              )}
              <Text
                style={{ fontFamily: "berlin-sans" }}
                className="text-base  text-stone-500 font-bold mb-1"
              >
                First Name
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80  px-2 mb-2`}
                //   placeholder="First Name"
                value={_firstName}
                onChangeText={(text) => {
                  setFirstName(text);
                }}
              />
              {errors.firstName && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>
                  {errors.firstName}
                </Text>
              )}
              <Text
                style={{ fontFamily: "berlin-sans" }}
                className="text-base  text-stone-500 font-bold mb-1"
              >
                Middle Name
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80  px-2 mb-2`}
                //   placeholder="Middle Name"
                value={_middleName}
                onChangeText={(text) => {
                  setMiddleName(text);
                }}
              />
              {errors.middleName && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>
                  {errors.middleName}
                </Text>
              )}
              <Text
                style={{ fontFamily: "berlin-sans" }}
                className="text-base  text-stone-500 font-bold mb-1"
              >
                Last Name
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80  px-4 mb-2`}
                //   placeholder="Last Name"
                value={_lastName}
                onChangeText={(text) => {
                  setLastName(text);
                }}
              />
              {errors.lastName && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>
                  {errors.lastName}
                </Text>
              )}
              <View style={tw`border-b border-gray-200 my-4 `} />
              <Text
                style={{ fontFamily: "berlin-sans" }}
                className="text-base  text-stone-500 font-bold mb-1"
              >
                Email
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80  px-4 mb-2`}
                //   placeholder="Email"
                value={_email}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
              {errors.email && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>{errors.email}</Text>
              )}
              <Text
                style={{ fontFamily: "berlin-sans" }}
                className="text-base  text-stone-500 font-bold mb-1"
              >
                Phone Number
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80  px-4 mb-2`}
                //   placeholder="Email"
                value={_phone}
                onChangeText={(text) => {
                  setPhone(text);
                }}
              />
              {errors.phone && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>{errors.email}</Text>
              )}
              {/* <Text>Date of birth</Text>
            {!showPicker && (
              <Pressable onPress={toggleDatePicker}>
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-100 rounded-xl w-80  px-4 mb-2`}
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
              <Text
                style={{ fontFamily: "berlin-sans" }}
                className="text-base  text-stone-500 font-bold mb-1"
              >
                Zip Code
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80  px-4 mb-2`}
                //   placeholder="Zip Code"
                value={_zipCode}
                onChangeText={(text) => {
                  setZipCode(text);
                }}
              />
              {errors.zipCode && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>
                  {errors.zipCode}
                </Text>
              )}
              <Text
                style={{ fontFamily: "berlin-sans" }}
                className="text-base  text-stone-500 font-bold mb-1"
              >
                Bio
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80  px-4 mb-2`}
                //   placeholder="Email"
                value={_bio}
                onChangeText={(text) => {
                  setBio(text);
                }}
              />

              <View style={tw`border-b border-white my-4 `} />
              <Text
                style={{ fontFamily: "berlin-sans" }}
                className="text-base  text-stone-500 font-bold mb-1"
              >
                Current Password
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                placeholder="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={(text) => {
                  setCurrentPassword(text);
                }}
              />
              {errors.currentPassword && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>
                  {errors.currentPassword}
                </Text>
              )}
              <Text
                style={{ fontFamily: "berlin-sans" }}
                className="text-base  text-stone-500 font-bold mb-1"
              >
                New Password
              </Text>
              <TextInput
                style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                //   placeholder="Password"
                secureTextEntry
                value={newPassword}
                onChangeText={(text) => {
                  setNewPassword(text);
                }}
              />
              {errors.newPassword && (
                <Text style={tw`text-red-500 ml-10 mb-2`}>
                  {errors.newPassword}
                </Text>
              )}
              <TouchableOpacity
                style={tw`bg-orange-400 rounded-2xl h-12 items-center justify-center mb-4 w-80  mt-4`}
                onPress={handleSubmit}
              >
                <Text
                  className={{ fontFamily: "berlin-sans" }}
                  style={tw`text-white font-bold`}
                >
                  Update profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <SafeAreaView style={tw`flex items-center justify-between`}>
              <Image
                source={require("../assets/Images/VectorSignin.jpg")}
                style={tw`w-full h-100`}
              />
              <Text style={tw`text-xl`}>Sign in to continue</Text>
              <TouchableOpacity
                style={tw`bg-orange-100 px-4 py-1 rounded-xl`}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text style={tw`text-xl font-semibold`}>Login</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default UserProfileManagement;
