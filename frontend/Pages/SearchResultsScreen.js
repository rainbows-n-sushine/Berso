import React from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MarketCard from "../assets/Components/marketCard";
import { dummyRestaurantsData } from "../assets/Data/restaurantsData";
import { Link, router, useNavigation } from "@react-navigation/native";
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useAppContext } from "../AppContext";
import { useEffect } from "react";

const SearchResultsScreen = () => {
  // const route = useRoute();
  // const { streetName, setStreet } = useAppContext();

  // useEffect(() => {
  //   const address = route.params?.address || "Your address here";
  //   const streetName = address.split(",")[0].trim();
  //   setStreet(streetName);
  // }, [route.params?.address, setStreet]);
   const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 p-4 mt-6 bg-[#F2E8DE]">
      <FlatList
        data={dummyRestaurantsData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <>
            {/* <Link href="/modalAddress" asChild> */}
            <View className="flex rounded-lg  mx-3 bg-white pl-2 mb-3 ">
              {/* <TouchableOpacity className="flex-row justify-between"> */}
              <View className="flex-row items-center m-2 justify-between">
                {/* <Text className="ml-2">{streetName}</Text> */}
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <FontAwesome name="angle-left" size={20} color="black" />
                </TouchableOpacity>
                <Text className="ml-2 font-bold">Business Name</Text>
                <Text className="text-gray-400">Current Location</Text>
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={28}
                  color="black"
                />
              </View>
              {/* </TouchableOpacity> */}
            </View>
            <View className="bg-white px-1 rounded-t-xl flex-col divide-y divide-gray-100 ">
              <View className=" flex flex-row justify-between py-5 flex-nowrap overflow-x-auto  ">
                <View className=" rounded-lg bg-gray-100 px-3 py-1 ml-3 ">
                  <Text>All</Text>
                </View>
                <View className=" rounded-lg bg-gray-100 px-3 py-1 ml-3 ">
                  <Text>Sort</Text>
                </View>
                <View className=" rounded-lg bg-gray-100 px-3 py-1 ml-3 ">
                  <Text>Open Now</Text>
                </View>
                <View className=" rounded-lg bg-gray-100 px-3 py-1 ml-3 ">
                  <Text>Price</Text>
                </View>
              </View>
              <View>
                <Text className="my-3 ml-3 text-xl text-orange-400 font-bold">
                  All Restaurants and Stores
                </Text>
              </View>
            </View>
            {/* </Link> */}
          </>
        )}
        renderItem={({ item }) => (
          <View className="bg-white px-4">
            <MarketCard restaurantData={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default SearchResultsScreen;

// const styles = {
//   container: ,
//   header: ,
//   title: 'text-xl font-bold',
//   addressContainer: ,
//   addressText: ,
//   cardContainer: 'mt-4',
//   cardImage: 'w-full h-200 rounded-lg',
//   cardTitle: ,
// };

// //     *}
