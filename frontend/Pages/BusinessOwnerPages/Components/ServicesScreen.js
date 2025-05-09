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

const ServicesScreen = ({businessFetched}) => {

  

    const dummyServices = [
        {
          id: "1",
          title: "Fine Dining",
          description: "Exquisite cuisine and impeccable service",
          icon: "restaurant",
        },
        {
          id: "2",
          title: "Catering",
          description: "Custom menus for events and gatherings",
          icon: "shoppingcart",
        },
        {
          id: "3",
          title: "Takeout",
          description: "Quick and convenient meals to-go",
          icon: "meh",
        },
        {
          id: "4",
          title: "Delivery",
          description: "Hot meals delivered right to your door",
          icon: "enviromento",
        },
        {
          id: "5",
          title: "Bar & Lounge",
          description: "Craft cocktails and a relaxing ambiance",
          icon: "cocktail",
        },
        {
          id: "6",
          title: "Private Dining",
          description: "Exclusive space for intimate gatherings",
          icon: "table",
        },
      ];
    return(
  <ScrollView style={tw`p-4`}>
    <View style={tw`flex-1 bg-gray-100 py-5 px-4`}>
    <FlatList
      data={dummyServices}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View
          style={tw`bg-white rounded-lg shadow-lg p-4 mb-4 flex-row items-center`}
        >
          {item.icon === "restaurant" && (
            <Ionicons
              name="restaurant-outline"
              size={24}
              color="#f59e0b"
              style={tw`mr-4`}
            />
          )}
          {item.icon === "shoppingcart" && (
            <Feather
              name="shopping-cart"
              size={24}
              color="#f59e0b"
              style={tw`mr-4`}
            />
          )}
          {item.icon === "meh" && (
            <AntDesign name="meh" size={24} color="#f59e0b" style={tw`mr-4`} />
          )}
          {item.icon === "enviromento" && (
            <Feather
              name="map-pin"
              size={24}
              color="#f59e0b"
              style={tw`mr-4`}
            />
          )}
          {item.icon === "cocktail" && (
            <MaterialIcons
              name="local-bar"
              size={24}
              color="#f59e0b"
              style={tw`mr-4`}
            />
          )}
          {item.icon === "table" && (
            <MaterialIcons
              name="table-restaurant"
              size={24}
              color="#f59e0b"
              style={tw`mr-4`}
            />
          )}
          <View style={tw`flex-1`}>
            <Text style={tw`font-bold text-lg mb-2`}>{item.title}</Text>
            <Text style={tw`text-gray-600`}>{item.description}</Text>
          </View>
        </View>
      )}
    />
  </View>
  </ScrollView>
  )
}
export default ServicesScreen;