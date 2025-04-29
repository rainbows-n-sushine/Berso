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


const PhotoScreen = ({businessFetched}) => {

    const business = {
        name: "Sample Restaurant",
        category: "Restaurant",
        rating: 4.5,
        email: "info@samplerestaurant.com",
        phone: "+1234567890",
        address: "123 Main Street, City, Country",
        hours: "Mon-Fri: 9am-10pm",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec interdum leo.",
        photos: [
          "https://example.com/photo1.jpg",
          "https://example.com/photo2.jpg",
          "https://example.com/photo3.jpg",
        ],
      };
      


    return(
    <ScrollView style={tw`p-4`}>
      <View style={[tw`p-4 bg-white mt-4`]}>
        <Text style={[tw`text-xl font-semibold text-gray-800 mb-2`]}>Photos</Text>
        <ScrollView horizontal>
          {business.photos.map((photo, index) => (
            <Image
              key={index}
              source={{ uri: photo }}
              style={[tw`w-40 h-40 rounded-md mr-4`]}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
    )
  }

  export default PhotoScreen;