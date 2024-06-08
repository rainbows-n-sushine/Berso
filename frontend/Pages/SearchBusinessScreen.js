import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
} from "react-native";
import { FontAwesome, EvilIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import tw from "twrnc";
import { useAppContext } from "../AppContext";

const SearchBusinessScreen = () => {
  const setCoordinates = useAppContext();
  const navigation = useNavigation();
  const [headerVisible, setHeaderVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [showMap, setShowMap] = useState(false);

  const googleAPI = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

  const toggleHeaderVisibility = () => {
    setHeaderVisible(!headerVisible);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      fetchNearbyBusinesses(location.coords);
    })();
  }, []);

  const fetchNearbyBusinesses = (coords) => {
    // Replace this with your API call to fetch businesses near the given coordinates
    const dummyBusinesses = [
      {
        id: 1,
        name: "Business 1",
        latitude: coords.latitude + 0.001,
        longitude: coords.longitude + 0.001,
      },
      {
        id: 2,
        name: "Business 2",
        latitude: coords.latitude - 0.001,
        longitude: coords.longitude - 0.001,
      },
    ];
    setBusinesses(dummyBusinesses);
  };

  const handleSelectPlace = (place) => {
    const { lat, lng } = place.geometry.location;
    setCoordinates({ latitude: lat, longitude: lng });
    router.replace({
      pathname: "/SearchResultsScreen",
      params: { address: place.formatted_address },
    });
  };
const handleMarkerPress = (business) => {
  navigation.navigate("BusinessPage", { businessId: business.id }); 
};
  return (
    <SafeAreaView style={tw`flex-1 mt-5 bg-[#F2E8DE]`}>
      {showMap ? (
        <View style={tw`flex-1`}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={tw`flex-1`}
            region={{
              latitude: location ? location.latitude : 37.78825,
              longitude: location ? location.longitude : -122.4324,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {location && (
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title={"Your Location"}
                // style={tw`bg-orange-500`}
              />
            )}
            {businesses.map((business) => (
              <Marker
                key={business.id}
                coordinate={{
                  latitude: business.latitude,
                  longitude: business.longitude,
                }}
                title={business.name}
                onPress={() => handleMarkerPress(business)}
              />
            ))}
          </MapView>
          <View style={tw`absolute top-5 left-5 right-5`}>
            <View style={tw`rounded-lg bg-white p-2 mb-3`}>
              <View style={tw`flex-row items-center justify-between`}>
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
            <View style={tw`rounded-lg bg-white p-2`}>
              <View style={tw`flex-row items-center`}>
                <EvilIcons name="location" size={20} color="black" />
                <TextInput
                  style={tw`text-base font-bold text-black ml-2`}
                  placeholder={
                    location
                      ? `Current Location (${location.latitude.toFixed(
                          4
                        )}, ${location.longitude.toFixed(4)})`
                      : "Current Location"
                  }
                  editable={false}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={tw`absolute top-5 right-5 bg-orange-500 p-3 rounded-full shadow-lg`}
            onPress={() => setShowMap(false)}
          >
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <>
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
          <View style={tw`flex-row justify-center mt-4`}>
            <TouchableOpacity
              style={tw`bg-orange-500 p-3 rounded-lg`}
              onPress={() => setShowMap(true)}
            >
              <Entypo name="map" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default SearchBusinessScreen;
