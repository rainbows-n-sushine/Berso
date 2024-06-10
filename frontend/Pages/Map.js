import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text,Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

const Maps = ({ route }) => {
  const [region, setRegion] = useState({});
  const [markers, setMarkers] = useState({});
  const navigation = useNavigation();
  const [isConfirmed,setIsConfirmed]=useState(false)


  useEffect(() => {
    getLocationAsync();
  }, []);
  

  const handleConfirmation=()=>{
    if(!isConfirmed){
      Alert.alert('You have set ',markers[markers.length-1]," amount of locations," ,
        "is this correct?",
        [
          {
            text:"Cancel",
            onPress:()=>{
              setIsConfirmed(false)
            console.log('cancel is pressed')
          }
          },
          {
            text:"Ok",
            onPress:()=>{setIsConfirmed(true)}
          }
        ]     
      )}else{
      console.log('confirmed to send to business registeration')
      navigation.navigate("AddBusiness", {  markers:markers
      });



      }
  }


  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setRegion(location.coords);
  };

  const handleMarkerPress = (event) => {

    console.log('im in handleMarkerPress',event)
    const { coordinate } = event.nativeEvent;
    const { latitude, longitude } = coordinate;
    // const newMarkers = [...markers, { latitude, longitude }];

    // console.log('this is trhe event that is being sentd everytime u click on the map:' ,event)
   
    setMarkers(coordinate);

  };


  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={tw`mr-2 bg-orange-500 px-4 py-2 rounded-lg`}
        onPress={() => {
          if (markers.length > 0) {
          handleConfirmation()
          }
        }}
      >
        <Text style={tw`text-white font-bold`}>Confirm</Text>
      </TouchableOpacity>
    ),
  });
  return (
    <View style={tw`flex-1`}>
      {region && (
        <MapView
          style={tw`flex-1`}
          initialRegion={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChange={(newRegion)=>{
            setRegion(newRegion)
          }}        
        >      
            <Marker
              key={index}
              coordinate={{
                latitude: markers.latitude,
                longitude: markers.longitude,
              }}
             title="Addis Ababa"
             description="This is a description of the marker"
             onPress={handleMarkerPress}

            />
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
