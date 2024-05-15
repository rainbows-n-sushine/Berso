import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import tw from "twrnc";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
const BusinessList = ({ route }) => {
  const { category } = route.params;
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    fetch(`business/${category}`)
      .then((response) => response.json())
      .then((data) => setBusinesses(data))
      .catch((error) => console.error("Error fetching businesses:", error));
  }, [category]);

  return (
    <View>
      <Text>List of {category}</Text>
      <View className="flex-row">
        {businesses.map((business) => (
          <View key={business._id}>
            <Pressable className="mt-5 bg-orange-100">
              <View>
                <Image
                  source={require("../assets/Images/dd28a9bc-e413-49fb-92c7-809552a0e62b.jpg")}
                  className="w-full h-[180px] rounded-md"
                  resizeMode="cover"
                  // style={tw`w-30 h-30 border border-gray-300`}
                />
                <View className="absolute bg-white rounded-sm bottom-2 right-2">
                  {/* opening hours */}
                  <Text className="text-sm dont-semibold py-1 px-2">
                    60 min
                  </Text>
                </View>
              </View>

              <View className="flex flex-row items-center justify-between">
                {/* Business name*/}
                <Text className="text-base font-bold mt-2 text-[#2e303d]">
                  Business
                </Text>
                <View className="flex flex-row items-center">
                  <FontAwesome name="star" size={17} color="black" />
                  {/* Rating */}
                  <Text className="ml-1 font-bold text-base">4.0</Text>
                </View>
              </View>
              {/* Average price */}
              <Text className="text-sm font-[#6e6d72]">100 €</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

export default BusinessList;
