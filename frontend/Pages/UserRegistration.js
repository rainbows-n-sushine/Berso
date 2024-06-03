// import React, { useState, useEffect } from "react";
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   Text,
//   ImageBackground,
//   ScrollView,
//   Dimensions,
//   Pressable,
//   Platform,
//   Alert,
// } from "react-native";
// import tw from "twrnc";
// import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import axios from "axios";
// import { useNavigation } from "@react-navigation/native";
// import api from "../util/Util";

// const UserRegistration = () => {
//   const [firstName, setFirstName] = useState("");
//   const [middleName, setMiddleName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [username, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [zipCode, setZipCode] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPicker, setShowPicker] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isBusinessOwner, setIsBusinessOwner] = useState(false);
//   const [businessName, setBusinessName] = useState("");
//   const [businessAddress, setBusinessAddress] = useState("");

//   const validateForm = () => {
//     const errors = {};
//     if (middleName.trim() === "") errors.middleName = "Middle name is required";
//     if (lastName.trim() === "") errors.lastName = "Last name is required";
//     if (email.trim() === "") errors.email = "Email is required";
//     else if (!isValidEmail(email)) errors.email = "Invalid email format";
//     if (username.trim() === "") errors.username = "Username is required";
//     if (zipCode.trim() === "") errors.zipCode = "Zip code is required";
//     if (password.trim() === "") errors.password = "Password is required";
//     else if (password.length < 6)
//       errors.password = "Password should be at least 6 characters long";
//     if (confirmPassword.trim() === "")
//       errors.confirmPassword = "Confirm password is required";
//     else if (confirmPassword !== password)
//       errors.confirmPassword = "Passwords do not match";
//     if (isBusinessOwner) {
//       if (businessName.trim() === "")
//         errors.businessName = "Business name is required";
//       if (businessAddress.trim() === "")
//         errors.businessAddress = "Business address is required";
//     }
//     setErrors(errors);
//   };

//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSignUp = async () => {
//     validateForm();
//     if (Object.keys(errors).length === 0) {
//       const fullName = `${firstName} ${middleName} ${lastName}`;
//       const userData = {
//         fullName,
//         username,
//         email,
//         dateOfBirth,
//         zipCode,
//         password,
//         confirmPassword,
//       };
//       if (isBusinessOwner) {
//         userData.businessName = businessName;
//         userData.businessAddress = businessAddress;
//       }
//       await api
//         .post("user/signup", userData)
//         .then((res) => {
//           Alert.alert("Sign Up Successful!", "Now Login with credentials!");
//           setIsModalVisible(true);
//           navigation.navigate("Login");
//         })
//         .catch((err) => {
//           if (err) {
//             console.log(err.message);
//           }
//         });
//     }
//   };

//   const toggleDatePicker = () => setShowPicker(!showPicker);

//   const onChange = (event, selectedDate) => {
//     if (selectedDate) {
//       setDate(selectedDate);
//       if (Platform.OS === "android") {
//         toggleDatePicker();
//         setDateOfBirth(selectedDate.toDateString());
//       }
//     } else {
//       toggleDatePicker();
//     }
//   };

//   const confirmIOSDate = () => {
//     setDateOfBirth(date.toDateString());
//     toggleDatePicker();
//   };

//   const navigation = useNavigation();
//   const windowHeight = Dimensions.get("window").height;

//   return (
//     <View style={tw`flex-1`}>
//       <ImageBackground
//         source={
//           isBusinessOwner
//             ? // ? require("../assets/Images/businessownersignup.png")
//               require("../assets/Images/businessownerlogo22.jpg")
//             : require("../assets/Images/logo22.jpg")
//         }
//         style={tw`flex-1`}
//         resizeMode="cover"
//       >
//         <ScrollView style={{ height: windowHeight }}>
//           <View style={tw`flex-1 p-4 justify-center`}>
//             <View style={tw`flex-row justify-between items-center mb-4`}>
//               <TouchableOpacity>
//                 <AntDesign name="arrowleft" size={24} color="white" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => navigation.navigate("Home")}>
//                 <Text style={tw`text-white`}>Skip</Text>
//               </TouchableOpacity>
//             </View>
//             <View>
//               <Text
//                 style={{ fontFamily: "berlin-sans", fontSize: 40 }}
//                 className="text-2xl text-white font-bold mb-4 py-2 text-center"
//               >
//                 Registration
//               </Text>
//             </View>
//             <View className="items-center">
//               <TextInput
//                 style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80 px-4 mb-4`}
//                 placeholder="First Name"
//                 value={firstName}
//                 onChangeText={setFirstName}
//               />
//               {errors.firstName && (
//                 <Text style={tw`text-red-500 ml-10 mb-2`}>
//                   {errors.firstName}
//                 </Text>
//               )}
//               <TextInput
//                 style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80 px-4 mb-4`}
//                 placeholder="Middle Name"
//                 value={middleName}
//                 onChangeText={setMiddleName}
//               />
//               {errors.middleName && (
//                 <Text style={tw`text-red-500 ml-10 mb-2`}>
//                   {errors.middleName}
//                 </Text>
//               )}
//               <TextInput
//                 style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80 px-4 mb-4`}
//                 placeholder="Last Name"
//                 value={lastName}
//                 onChangeText={setLastName}
//               />
//               {errors.lastName && (
//                 <Text style={tw`text-red-500 ml-10 mb-2`}>
//                   {errors.lastName}
//                 </Text>
//               )}
//               <TextInput
//                 style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80 px-4 mb-4`}
//                 placeholder="Username"
//                 value={username}
//                 onChangeText={setUserName}
//               />
//               {errors.username && (
//                 <Text style={tw`text-red-500 ml-10 mb-2`}>
//                   {errors.username}
//                 </Text>
//               )}
//               <View style={tw`border-b border-gray-300 my-4`} />
//               <TextInput
//                 style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80 px-4 mb-4`}
//                 placeholder="Email"
//                 value={email}
//                 onChangeText={setEmail}
//               />
//               {errors.email && (
//                 <Text style={tw`text-red-500 ml-10 mb-2`}>{errors.email}</Text>
//               )}
//               {!showPicker && Platform.OS === "android" && (
//                 <Pressable onPress={toggleDatePicker}>
//                   <TextInput
//                     style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80 px-4 mb-4`}
//                     placeholder="Date of Birth"
//                     value={dateOfBirth}
//                     editable={false}
//                   />
//                 </Pressable>
//               )}
//               {showPicker && (
//                 <DateTimePicker
//                   mode="date"
//                   display="spinner"
//                   value={date}
//                   onChange={onChange}
//                   style={{
//                     backgroundColor: "white",
//                     width: 320,
//                     borderRadius: 10,
//                   }}
//                 />
//               )}
//               {showPicker && Platform.OS === "ios" && (
//                 <View className="items-center justify-between my-3">
//                   <TouchableOpacity
//                     className="bg-white w-72 items-center justify-between my-1 py-2 rounded-lg"
//                     onPress={confirmIOSDate}
//                   >
//                     <Text className="text-base">Confirm</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     className="bg-white w-72 items-center justify-between my-1 py-2 rounded-lg"
//                     onPress={toggleDatePicker}
//                   >
//                     <Text className="text-base">Cancel</Text>
//                   </TouchableOpacity>
//                 </View>
//               )}
//               {!showPicker && Platform.OS === "ios" && (
//                 <Pressable onPress={toggleDatePicker}>
//                   <TextInput
//                     style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80 px-4 mb-4`}
//                     placeholder="Date of Birth"
//                     value={dateOfBirth}
//                     editable={false}
//                     onPressIn={toggleDatePicker}
//                   />
//                 </Pressable>
//               )}
//               <TextInput
//                 style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80 px-4 mb-4`}
//                 placeholder="Zip Code"
//                 value={zipCode}
//                 onChangeText={setZipCode}
//               />
//               {errors.zipCode && (
//                 <Text style={tw`text-red-500 ml-10 mb-2`}>
//                   {errors.zipCode}
//                 </Text>
//               )}
//               <View style={tw`border-b border-gray-300 my-4`} />
//               <TextInput
//                 style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80 px-4 mb-4`}
//                 placeholder="Password"
//                 secureTextEntry
//                 value={password}
//                 onChangeText={setPassword}
//               />
//               {errors.password && (
//                 <Text style={tw`text-red-500 ml-10 mb-2`}>
//                   {errors.password}
//                 </Text>
//               )}
//               <TextInput
//                 style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80 px-4 mb-4`}
//                 placeholder="Confirm Password"
//                 secureTextEntry
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//               />
//               {errors.confirmPassword && (
//                 <Text style={tw`text-red-500 ml-10 mb-2`}>
//                   {errors.confirmPassword}
//                 </Text>
//               )}
//               {isBusinessOwner && (
//                 <>
//                   <View style={tw`border-b border-gray-300 my-4`} />
//                   <TextInput
//                     style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80 px-4 mb-4`}
//                     placeholder="Business Name"
//                     value={businessName}
//                     onChangeText={setBusinessName}
//                   />
//                   {errors.businessName && (
//                     <Text style={tw`text-red-500 ml-10 mb-2`}>
//                       {errors.businessName}
//                     </Text>
//                   )}
//                   <TextInput
//                     style={tw`w-full h-12 border bg-white border-gray-300 rounded-2xl w-80 px-4 mb-4`}
//                     placeholder="Business Address"
//                     value={businessAddress}
//                     onChangeText={setBusinessAddress}
//                   />
//                   {errors.businessAddress && (
//                     <Text style={tw`text-red-500 ml-10 mb-2`}>
//                       {errors.businessAddress}
//                     </Text>
//                   )}
//                 </>
//               )}
//               <TouchableOpacity
//                 style={tw`bg-orange-400 rounded-2xl h-12 items-center justify-center mb-4 w-80 mt-4`}
//                 onPress={handleSignUp}
//               >
//                 <Text style={tw`text-white font-bold`}>Sign Up</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={tw`bg-blue-500 rounded-2xl h-12 items-center justify-center mb-4 w-80 mt-4`}
//                 onPress={() => setIsBusinessOwner(!isBusinessOwner)}
//               >
//                 <Text style={tw`text-white font-bold`}>
//                   {isBusinessOwner
//                     ? "Sign up as Regular User"
//                     : "Sign in as a Business Owner"}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <View style={tw`border-b border-gray-300 my-8`} />
//             <TouchableOpacity
//               style={tw`bg-white rounded-full h-12 items-center justify-center mb-4 w-60 ml-10`}
//               onPress={() => {}}
//             >
//               <View style={tw`flex-row items-center`}>
//                 <FontAwesome5
//                   name="google"
//                   size={20}
//                   color="black"
//                   style={tw`mr-2`}
//                 />
//                 <Text style={tw`text-black font-bold`}>
//                   Continue with Google
//                 </Text>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={tw`bg-blue-500 rounded-full h-12 items-center justify-center mb-4 w-60 ml-10`}
//               onPress={() => {}}
//             >
//               <View style={tw`flex-row items-center`}>
//                 <FontAwesome5
//                   name="facebook"
//                   size={20}
//                   color="white"
//                   style={tw`mr-2`}
//                 />
//                 <Text style={tw`text-white font-bold`}>
//                   Continue with Facebook
//                 </Text>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={tw`bg-black rounded-full h-12 items-center justify-center mb-4 w-60 ml-10`}
//               onPress={() => {}}
//             >
//               <View style={tw`flex-row items-center justify-center`}>
//                 <FontAwesome5
//                   name="apple"
//                   size={20}
//                   color="white"
//                   style={tw`mr-2`}
//                 />
//                 <Text style={tw`text-white font-bold`}>
//                   Continue with Apple
//                 </Text>
//               </View>
//             </TouchableOpacity>
//             <View style={tw`flex-row justify-center mt-8`}>
//               <Text style={tw`text-sm text-white`}>Already registered? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//                 <Text style={tw`text-sm font-bold text-orange-500`}>Login</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </ImageBackground>
//     </View>
//   );
// };

// export default UserRegistration;
