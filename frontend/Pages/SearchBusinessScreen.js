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
  const [location, setLocation] = useState({});
  const [businesses, setBusinesses] = useState([]);
  const [showMap, setShowMap] = useState(false);
const [selectedLocation, setSelectedLocation] = useState(null);


  const googleAPI = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

  const toggleHeaderVisibility = () => {
    setHeaderVisible(!headerVisible);
  };

  useEffect(()=>{
    fetchBusinesses()
  },[])

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

  // const fetchNearbyBusinesses = (coords) => {
  //   // Replace this with your API call to fetch businesses near the given coordinates
  //   const dummyBusinesses = [
  //     {
  //       id: 1,
  //       name: "Business 1",
  //       latitude: coords.latitude + 0.001,
  //       longitude: coords.longitude + 0.001,
  //     },
  //     {
  //       id: 2,
  //       name: "Business 2",
  //       latitude: coords.latitude - 0.001,
  //       longitude: coords.longitude - 0.001,
  //     },
  //   ];
  //   setBusinesses(dummyBusinesses);
  // };

  const fetchBusinesses=async()=>{

    await api.get('fetch-all')
    .then((res)=>{
      if(res.data.success){
        console.log("this is the businesses: ",res.data.businesses[0])
        setBusinesses(res.data.businesses)
      }


    })
    .catch((error)=>{
      if(error){
        console.log('error in fetchBUsinesses in searchBusinesses screen: ',error.message)
      }


    })


  }

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

const handleSettedMarkerPress = (business) => {
  // Navigate to the location of the pressed business
  navigation.navigate("BusinessPage", { business });
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
                onPress={() => handleSettedMarkerPress(business)}
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
