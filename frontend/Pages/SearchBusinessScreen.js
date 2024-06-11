import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
  FlatList,
} from "react-native";
import { FontAwesome, EvilIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import tw from "twrnc";
import { useAppContext } from "../AppContext";
import api from "../util/Util";
const SearchBusinessScreen = () => {
  const setCoordinates = useAppContext();
  const navigation = useNavigation();
  const [headerVisible, setHeaderVisible] = useState(false);
  const [location, setLocation] = useState({});
  const [businesses, setBusinesses] = useState([]);
  const [showMap, setShowMap] = useState(false);
const [selectedLocation, setSelectedLocation] = useState(null);
 const [filteredBusinesses, setFilteredBusinesses] = useState([]);
 const [searchText, setSearchText] = useState("");


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
// const handleMarkerPress = (business) => {
//   navigation.navigate("BusinessPage", { businessId: business.id }); 
// };

const handleMarkerPress = (businessLocation) => {
  // Navigate to the location of the pressed business
  navigation.navigate("BusinessLocation", { businessLocation });
};

 

 useEffect(() => {
   fetchBusinesses();
 }, []);

 const fetchBusinesses = async () => {
   try {
     const res = await api.get("business/fetch-all");
     if (res.data.success) {
       setBusinesses(res.data.businesses);
       setFilteredBusinesses(res.data.businesses); // Initialize with all businesses
     } else {
       console.log(res.data.message);
     }
   } catch (error) {
     console.log("Error fetching businesses:", error.message);
   }
 };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    if (text) {
      const results = businesses.filter(
        (business) =>
          business.business_name &&
          business.business_name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredBusinesses(results);
    } else {
      setFilteredBusinesses([]); // Clear filtered businesses if search text is empty
    }
  };

 const handleSelectBusiness = (business) => {
  console.log(business);
  //  navigation.navigate("BusinessPage", { businessId: business.id });
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
                onRegionChange={(newLocation)=>{setLocation(newLocation)}}
                title="Your Location"
                // style={tw`bg-orange-500`}
              />
            )}
            {businesses.map((business) => (
              <Marker
                key={business._id}
                coordinate={{
                  latitude: business.latitude,
                  longitude: business.longitude,
                }}
                title={business.business_name}
                onPress={() => handleMarkerPress(business)}
              />
            ))}
            {selectedLocation && (
              <Marker
                coordinate={selectedLocation}
                title={selectedLocation.name} // Use the name from selectedLocation for the marker title
                onPress={() => handleMarkerPress(selectedLocation)}
              />
            )}
          </MapView>
          <View style={tw`absolute top-5 left-5 right-5`}>
            <View style={tw`rounded-lg bg-white p-2 mb-3`}>
              <View style={tw`flex-row items-center justify-between`}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <FontAwesome name="angle-left" size={20} color="black" />
                </TouchableOpacity>
                <GooglePlacesAutocomplete
                  placeholder="Search for nearby restaurants, salons..."
                  onPress={(data, details = null) => {
                    setSelectedLocation({
                      latitude: details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                      name: data.description,
                    });
                    // navigation.navigate("SearchResults");
                  }}
                  query={{
                    key: "AIzaSyCtDW4jRZWtvcOXLrG8jw-TxigqnS3wT4Q",
                    language: "en", // language of the results
                    components: "country:ET", // Restrict to United States
                    types: "establishment",
                  }}
                  styles={{
                    textInput: {
                      flex: 1,
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#333",
                      marginLeft: 2,
                      borderBottomWidth: 1,
                      borderBottomColor: "#ccc",
                    },
                    predefinedPlacesDescription: {
                      color: "#1faadb",
                    },
                  }}
                  currentLocationLabel="Current location"
                  enableHighAccuracyLocation={true}
                  fetchDetails={true}
                  nearbyPlacesAPI="GooglePlacesSearch"
                  debounce={200}
                  listViewDisplayed="auto"
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
                value={searchText}
                onChangeText={handleSearchTextChange}
              />
            </View>
            {searchText ? (
              <FlatList
                data={filteredBusinesses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={tw`p-2 border-b border-gray-200`}
                    onPress={() => handleSelectBusiness(item)}
                  >
                    <Text style={tw`text-base`}>
                      {item.business_name || "Unnamed Business"}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View style={tw`flex-1 items-center justify-center`}>
                <Text style={tw`text-gray-500`}>
                  Search for businesses to display them here
                </Text>
              </View>
            )}
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
