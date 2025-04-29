import React, { useState,useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  FlatList,
  TextInput,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import PagerView from "react-native-pager-view";
import { FontAwesome, MaterialCommunityIcons, Feather, Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import tw from "twrnc";
import ParallaxScrollView from "../../../assets/Components/ParallaxScrollView";
import { ImageBackground } from "react-native";
import api from "../../../util/Util";
import { AuthContext } from "../../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Services = () => {
 
  const [businessFetched,setBusinessFetched]=useState({})
  // const [businessFetched,setBusinessFetched]=useState({
  //   business_name:" ",
  //   decription:" ",
  //   category:[],
  //   average_rating:0,
  //   website:" ",
  //   email:" ",
  //   phone:" ",
  //   opening_hours:" ",
  //   address:" "

  // })
  const getReview=async()=>{

    const businessId=await AsyncStorage.getItem('currentBusiness')

    console.log('this is the current bsiness in get review', businessId)
    api.get(`review/fetch-all-reviews-for-business/${businessId}`)


    .then((res)=>{
      console.log(res.data.message)
      console.log('these r the reviews in get Rendbv',res.data.reviews)

      if(res.data.success){
        reviewFetched=res.data.reviews

      }
    })
    .catch((error)=>{
if(error){
  console.log(error.message)
    }

     })
      }


  const getBusinessInfo=async()=>{
    console.log("this is the business in profile")
    const businessId= await AsyncStorage.getItem('currentBusiness')
    console.log('this is the id of the business ',businessId)
  
    await api.get(`business/get-one/${businessId}`)
   .then((res)=>{
    console.log(res.data)
    if(res.data.success){
      let _business=res.data.business
    //  businessFetched=_business
    setBusinessFetched(_business)
     console.log('this is the updated value of business Fetched, ',businessFetched)
     
  
      console.log("this is the business in profile getBusinessInfo", res.data.business)
    }else{
      console.log(res.data.message)
    }
   }).catch((error)=>{
  
    if(error){
      console.log('this is the erro in getBusiness: ',error.message)
    }
   })
    }


    
  const fetchCategories=async()=>{
    const category=businessFetched.category
    if(category){
      console.log('im in damnxghzddx,',businessFetched)
    console.log('im in fetccennzbkdjgoaegvlakjbvn,nc,/m')
    await api.post(`business/get-categories`,{category})
    .then((res)=>{
      console.log(res.data.message)

      if(res.data.success){
      const  categoryFetched=res.data.categories
      setCa


      }
    })
    .catch((error)=>{
if(error){
  console.log(error.message)
}

    })} }


useEffect(()=>{

  getBusinessInfo()
  fetchCategories()
  getReview() 

  

},[])



  return (
    <View style={tw`h-[60]`}>
      <ImageBackground
        source={require("../../../assets/Images/HomeBG.jpg")}
        style={tw`flex-1`}
        resizeMode="cover"
      >
        <SafeAreaView style={tw`flex-row-reverse ml-2 mt-2`}>
          <TouchableOpacity
            style={tw`px-2`}
            onPress={() => {
              // navigation.navigate("EditUserProfile");
            }}
          >
            <Feather name="share" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`px-2`}
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          >
            <Feather name="edit" size={24} color="white" />
          </TouchableOpacity>
        </SafeAreaView>

        <View style={tw`flex-row items-center bg-white top-42 `}>
          <Image
            source={require("../../../assets/Images/randomlogo.png")}
            style={tw`w-12 h-12`}
          />
          <View style={tw`flex-row items-center`}>
            {/* <Image
          source={{ uri: "https://example.com/profile_picture_url" }}
          style={tw`w-12 h-12 rounded-full`}
        /> */}
            <View style={tw`ml-4`}>
              <Text style={tw`font-bold text-lg`}>{businessFetched.business_name}</Text>
              <Text style={tw`text-gray-500`}>{businessFetched.category}</Text>
              <View style={tw`flex-row items-center my-2`}>
                <FontAwesome
                  name="star"
                  size={15}
                  color="orange"
                  style={tw`mr-2 `}
                />
                <FontAwesome
                  name="star"
                  size={15}
                  color="orange"
                  style={tw`mr-2`}
                />
                <FontAwesome
                  name="star"
                  size={15}
                  color="orange"
                  style={tw`mr-2`}
                />
                <Text style={tw`text-gray-700 mr-2`}>
                  Rating: {businessFetched.average_rating}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};



export default Services;
