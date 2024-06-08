import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

const Maps = ({ route }) => {
  const { setLocation } = route.params;
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const newMarkers = [...markers, { latitude, longitude }];
    setMarkers(newMarkers);
  };

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={tw`mr-2 bg-orange-500 px-4 py-2 rounded-lg`}
        onPress={() => {
          if (markers.length > 0) {
            // Pass the location coordinates as params
            console.log(markers[markers.length - 1]);
            navigation.navigate("AddBusiness", {
              location: markers[markers.length - 1],
            });
          }
        }}
      >
        <Text style={tw`text-white font-bold`}>Confirm</Text>
      </TouchableOpacity>
    ),
  });
  return (
    <View style={tw`flex-1`}>
      {userLocation && (
        <MapView
          style={tw`flex-1`}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapPress}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            />
          ))}
        </MapView>
      )}
      {/* <TouchableOpacity
        style={tw`absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-orange-500 px-4 py-2 rounded-lg`}
        onPress={() => {
          if (markers.length > 0) {
            setLocation(markers[markers.length - 1]); // Set location to the last marker
          }
          navigation.goBack();
        }}
      >
        <Text style={tw`text-white font-bold`}>Confirm</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default Maps;
