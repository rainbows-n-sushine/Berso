import React, { useEffect,useState } from "react";
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
import api from '../../util/Util'
import AsyncStorage from "@react-native-async-storage/async-storage";

const BusinessRegistration = () => {

  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();



  const [business,setBusiness]=useState({
    businessName:'',
    email:'',
    phone:"",
    website:"",
    location:"",
    address:"",
    businessDays:"",
    openingHours:"",
    averagePrice:"",
    description:""
   })
const [categories,setCategories]=useState("fgcuhgxcy")
const[userId,setUserId]=useState('')



  useEffect(() => {
    console.log('im in useeffect')
     const fetchUserid=async()=>{
      const user_id= await AsyncStorage.getItem('userId')
      console.log("this is the user id "+user_id)
      setUserId(user_id)
      
      
    }
    async function loadFonts() {
      
      await Font.loadAsync({
        "berlin-sans": require("../fonts/berlin-sans/BerlinSans.ttf"),
      });
      
     

    }
    
    
    //call the async function
    fetchUserid()
    loadFonts();
    
  },[]);


const handleChange=(name,value)=>{
  setBusiness({...business,[name]:value})



}
const handleSubmit=async()=>{
  

  console.log('im in handle submit')
  console.log(business)
 
  await api.post('business/register-business',{business,categories,userId})
    .then((res)=>{
      console.log("im in then")
      console.log(res.data)
    })
    .catch((error )=>{
  
   if(error){
       console.log(error.message)
    }

    })
  
  }



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
                source={require("../Images/logo-removebg.png")}
                style={tw`w-32 h-32`}
              />
            </View> */}

          <View>
            <Text
              style={{ fontFamily: "berlin-sans", fontSize: 35 }}
              className={`text-2xl font-bold mb-4 font-berlin-sans text-center py-2 `}
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
                <Text
                  style={{ fontFamily: "berlin-sans" }}
                  className="text-lg font-bold mb-4 berlinSans text-stone-700"
                >
                  Required Information
                </Text>
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Name of business"
                  onChangeText={(text) => {handleChange('businessName',text)}}
                />
                {/* </View> */}
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Email"
                  onChangeText={(text) => {handleChange('email',text)}}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Phone Number"
                  // value={firstName}
                  onChangeText={(text) => {handleChange('phone',text)}}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Category"
                  // value={firstName}
                  onChangeText={(text) => {}}
                />
              </View>
              <View>
                <Text
                  style={{ fontFamily: "berlin-sans" }}
                  className="text-lg font-bold mb-4 berlinSans  text-stone-700"
                >
                  Optional Details
                </Text>
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Website"
                  onChangeText={(text) => {handleChange('website',text)}}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80 px-4 mb-4`}
                  placeholder="Location"
                  // value={firstName}
                  onChangeText={(text) => {handleChange('location',text)}}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Address"
                  // value={firstName}
                  onChangeText={(text) => {handleChange('address',text)}}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Business Days"
                  // value={firstName}
                  onChangeText={(text) => {handleChange('businessDays',text)}}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Opening Hours"
                  // value={firstName}
                  onChangeText={(text) => {handleChange('openingHours',text)}}
                />
                <TextInput
                  style={tw`w-full h-12 border bg-orange-50 border-gray-300 rounded-2xl w-80  px-4 mb-4`}
                  placeholder="Avarage Price"
                  // value={firstName}
                  onChangeText={(text) => {handleChange('averagePrice',text)}}
                />
                <TextInput
                  style={tw`w-full h-40 border bg-orange-50 border-gray-300 rounded-2xl w-80 px-4 pb-30 mb-4`}
                  placeholder="Description"
                  // value={firstName}
                  onChangeText={(text) => {handleChange('description',text)}}
                />
              </View>
              <TouchableOpacity
                style={tw`bg-orange-400 rounded-2xl h-12 items-center justify-center mb-4 w-80  mt-4`}
                onPress={handleSubmit}
              >
                <Text
                  className={{ fontFamily: "berlin-sans" }}
                  style={tw`text-white font-bold`}
                >
                  Register
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

export default BusinessRegistration;
