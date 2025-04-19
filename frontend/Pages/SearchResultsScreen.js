import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import MarketCard from "../assets/Components/marketCard";
import { dummyRestaurantsData } from "../assets/Data/restaurantsData";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

const SearchResultsScreen = () => {
  const navigation = useNavigation();
  const [sortedData, setSortedData] = useState(dummyRestaurantsData);
  const [selectedSort, setSelectedSort] = useState("all");

  const handleSort = (criteria) => {
    let sortedArray;
    switch (criteria) {
      case "all":
        sortedArray = dummyRestaurantsData;
        break;
      case "sort":
        sortedArray = [...dummyRestaurantsData].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case "openNow":
        sortedArray = dummyRestaurantsData.filter((item) => item.isOpen);
        break;
      case "price":
        sortedArray = [...dummyRestaurantsData].sort(
          (a, b) => a.price - b.price
        );
        break;
      default:
        sortedArray = dummyRestaurantsData;
    }
    setSortedData(sortedArray);
    setSelectedSort(criteria);
  };

  return (
<<<<<<< HEAD
    <SafeAreaView style={tw`flex-1 p-4 mt-6 bg-[#F2E8DE]`}>
=======
    <SafeAreaView style={tw`flex-1 mt-6 bg-[#F2E8DE]`}>
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
      <FlatList
        data={sortedData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <>
            <View style={tw`flex rounded-lg mx-3 bg-white pl-2 mb-3`}>
              <View style={tw`flex-row items-center m-2 justify-between`}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <FontAwesome name="angle-left" size={20} color="black" />
                </TouchableOpacity>
                <Text style={tw`ml-2 font-bold`}>Business Name</Text>
                <Text style={tw`text-gray-400`}>Current Location</Text>
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={28}
                  color="black"
                />
              </View>
            </View>
            <View
              style={tw`bg-white px-1 rounded-t-xl flex-col divide-y divide-gray-100`}
            >
              <View
                style={tw`flex-row justify-between py-5 flex-nowrap overflow-x-auto`}
              >
                {["all", "sort", "openNow", "price"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={tw`rounded-lg px-6 py-1 ml-3 ${
                      selectedSort === option ? "bg-orange-400" : "bg-gray-100"
                    }`}
                    onPress={() => handleSort(option)}
                  >
                    <Text
                      style={tw`${
                        selectedSort === option ? "text-white" : "text-black"
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View>
                <Text style={tw`my-3 ml-3 text-xl text-orange-400 font-bold`}>
                  All Restaurants and Stores
                </Text>
              </View>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <View style={tw`bg-white px-4`}>
            <MarketCard restaurantData={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default SearchResultsScreen;
