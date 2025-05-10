import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import api from "../util/Util";

const MapForBusiness = ({route}) => {

  const [region, setRegion] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState({});
  const navigation = useNavigation();
  const {business}=route.params
  const businessId=business._id 

  useEffect(() => {
    // getLocationAsync();
    fetchLocation()
  }, []);

  const fetchLocation =async()=>{
    console.log("this is the fetched markers hahaha")
    await api.get(`business/get-one/${businessId}`)
    .then((res)=>{
      
      if(res.data.success){
        const {latitude,longitude}=res.data.business
        const fetchedMarkers={latitude,longitude}
        setMarkers(fetchedMarkers)
        console.log("this is the fetched markers ",fetchedMarkers)
        setUserLocation(fetchedMarkers)
      }})
      console.log(res.data.message)
    .catch((error)=>{
      if(error){
        console.log('error in fetchc location: ',error.message)
      }

    })


  }

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
        >         
            <Marker             
              coordinate={{
                latitude: markers.latitude,
                longitude: markers.longitude,
              }}
            />
        
        </MapView>
      )}
    </View>
  );
};

export default MapForBusiness;