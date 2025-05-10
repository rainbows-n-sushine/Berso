import React, { useState,useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,

} from "react-native";

import { FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";
import tw from "twrnc";



const InformationScreen = ({businessFetched}) => {

  return(
  <ScrollView style={tw`p-2`}>
    <View style={tw`bg-white p-4 rounded-lg shadow`}>
      <Text style={tw`text-xl font-semibold text-orange-300 mb-2`}>
        Contact Details
      </Text>
      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 border-b-2 border-gray-100 my-3`}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Website:</Text>
        
          <Text style={tw`text-base text-gray-500`}>{businessFetched.website}</Text>
        </View>
        <MaterialCommunityIcons
          name="web"
          size={20}
          color="black"
          style={tw`mr-2`}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 border-b-2 border-gray-100 my-3`}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Email:</Text>
          <Text style={tw`text-base text-gray-500`}>{businessFetched.email}</Text>
        </View>
        <FontAwesome name="envelope" size={20} color="black" style={tw`mr-2`} />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 border-b-2 border-gray-100 my-3`}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Phone:</Text>
          <Text style={tw`text-base text-gray-500`}>{businessFetched.phone}</Text>
        </View>
        <FontAwesome name="phone" size={20} color="black" style={tw`mr-2`} />
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 border-b-2 border-gray-100 my-3`}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Address:</Text>
          <Text style={tw`text-base text-gray-500`}>{businessFetched.address}</Text>
        </View>
        <FontAwesome
          name="map-marker"
          size={20}
          color="black"
          style={tw`mr-2`}
        />
      </TouchableOpacity>
   

      <TouchableOpacity
        style={tw`flex-row items-center justify-between mb-2 my-3 `}
      >
        <View>
          <Text style={tw`text-lg text-black`}>Hours:</Text>
          <Text style={tw`text-base text-gray-500`}>{businessFetched.opening_hours}</Text>
        </View>
        <FontAwesome
          name="calendar-times-o"
          size={20}
          color="black"
          style={tw`mr-2`}
        />
      </TouchableOpacity>
    </View>
    <View style={tw`bg-white p-4 rounded-lg shadow mt-4`}>
      <Text style={tw`text-xl font-semibold text-orange-300 mb-2`}>
        Description
      </Text>
      <Text style={tw`text-base text-gray-700`}>{businessFetched.description}</Text>
    </View>
  </ScrollView>
  )
}
export default InformationScreen;