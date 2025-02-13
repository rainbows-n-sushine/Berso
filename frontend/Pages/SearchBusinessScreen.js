import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, router, useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  AntDesign,
  EvilIcons,
} from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useAppContext } from "../AppContext";
import tw from "twrnc";

const SearchBusinessScreen = () => {
  const setCoordinates = useAppContext();
  const navigation = useNavigation();
  const [headerVisible, setHeaderVisible] = useState(false);
  const [containerMargin] = useState(new Animated.Value(40));

  const googleAPI = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

  const toggleHeaderVisibility = () => {
    setHeaderVisible(!headerVisible);
    if (!headerVisible) {
      Animated.timing(containerMargin, {
        toValue: -100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(containerMargin, {
        toValue: 40,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };

  useEffect(() => {
    if (!headerVisible) {
      Animated.timing(containerMargin, {
        toValue: 40,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [headerVisible]);

  useLayoutEffect(() => {
    handleAddressPress();
  }, [headerVisible]);

  const handleSelectPlace = (place) => {
    const { lat, lng } = place.geometry.location;
    setCoordinates({ latitude: lat, longitude: lng });
    router.replace({
      pathname: "/SearchResultsScreen",
      params: { address: place.formatted_address },
    });
  };

  const handleAddressPress = () => {
    navigation.setOptions({
      headerShown: headerVisible,
      headerTitle: () => (
        <GooglePlacesAutocomplete
          placeholder="Enter a new address"
          fetchDetails
          onPress={(data, details = null) => {
            handleSelectPlace(details);
          }}
          query={{
            key: googleAPI,
            language: "en",
            type: "address",
          }}
          styles={{
            textInput: tw`self-center items-center justify-center`,
          }}
          renderLeftButton={() => (
            <AntDesign
              name="search1"
              size={20}
              color="black"
              style={tw`self-center ml-4 mr-2`}
            />
          )}
          renderRightButton={() => (
            <TouchableOpacity
              onPress={toggleHeaderVisibility}
              style={tw`self-center`}
            >
              <Text style={tw`mr-12 text-gray-600`}>Cancel</Text>
            </TouchableOpacity>
          )}
          enablePoweredByContainer={false}
          renderRow={(item) => (
            <View style={tw`flex flex-row items-center`}>
              <Feather name="map-pin" size={18} color="black" />
              <Text>{item.description}</Text>
            </View>
          )}
        />
      ),
      headerLeft: () => null,
      headerBackVisible: false,
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 p-4 mt-6 bg-[#F2E8DE]`}>
      <View style={tw`rounded-lg mx-1 bg-white pl-2 mb-3`}>
        <View style={tw`flex-row items-center justify-between m-2`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome name="angle-left" size={20} color="black" />
          </TouchableOpacity>
          <TextInput
            style={tw`flex-1 text-base font-bold text-gray-400 ml-2 border-b border-gray-300`}
            placeholder="Search for nearby restaurants, salons..."
            onSubmitEditing={() => navigation.navigate("SearchResults")}
          />
        </View>
      </View>
      <View style={tw`rounded-lg mr-3 ml-3 bg-white pl-5`}>
        <View style={tw`flex-row items-center m-2`}>
          <EvilIcons name="location" size={20} color="black" />
          <TextInput
            style={tw`text-base font-bold text-black ml-2`}
            placeholder="Current Location"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchBusinessScreen;
