import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import api from '../util/Util'
import tw from "twrnc";

const Collections = () => {
  const {userToken,businessOwnerToken, userId,businessOwnerId,isLoading}=useContext(AuthContext)
  const [displayCollection, setDisplayCollection] = useState(false);
  const navigation = useNavigation();
  // const image={require("../assets/Images/HomeBG.jpg")}
  const [favorites,setFavorites]=useState([])

  const favoriteBusinesses = [
    {
      id: "1",
      name: "Bistro Cafe",
      description: "A cozy place to enjoy coffee and snacks.",
      image: "../assets/Images/HomeBG.jpg",
    },
    {
      id: "2",
      name: "Tech World",
      description: "All the latest tech gadgets.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      name: "Fashion Hub",
      description: "Latest trends in fashion.",
      image: "https://via.placeholder.com/150",
    },
  ];

  // const {businessOwnerToken}=useContext(AuthContext)

  useEffect(() => {
    fetchFavorites();
    console.log("these are favorites: ",favorites)
    
  }, [setFavorites]);
  
  const fetchFavorites=async()=>{
    console.log('im in fetch favorirte s')
    console.log('this is the userId: ',userId)
    await api.get(`user/fetch-user-specific-favorites/${userId}`)
    .then((res)=>{
      console.log('this im in favorite fetching api, here are teh favs ', res.data.favorites)
      

      if(res.data.success){
        console.log('success is real')
        setFavorites(res.data.favorites)
        setDisplayCollection(true)
      }
    }).catch((error)=>{
      if(error){console.log(error.message)}
    })


  }


  return (
    <View style={tw`flex-1 bg-white items-center justify-between p-4`}>
      <View style={tw`flex items-center justify-between`}>
        
        {displayCollection&&
        
        <Text className="text-xl">here r the collections</Text>
        }
        
        {isLoading ? (
          <>
            <View>
              <Text>Loading...</Text>
            </View>
          </>
        ) :
         userToken ? (
          // <SafeAreaView>
          <View style={tw`flex-1  p-3 w-full mt-10  w-96`}>
            <Text
              style={[
                tw`text-3xl font-bold text-center mb-4 text-orange-500`,
                { fontFamily: "berlin-sans" },
              ]}
            >
              My Collections
            </Text>
            <FlatList
              data={favorites}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>{navigation.navigate("BusinessPage",{
                  business:item
                  })}}>
                <View
                  style={tw`bg-white p-4 mb-4 rounded-lg shadow w-full bg-orange-100`}
                >
                  <Image
                    source={require("../assets/Images/HomeBG.jpg")}
                    style={tw`w-full h-40 rounded-lg mb-4`}
                    resizeMode="cover"
                  />
                  <Text style={tw`text-xl font-bold`}>{item.business_name}</Text>
                  <Text style={tw`text-gray-600`}>{item.description}</Text>
                </View>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          // </SafeAreaView>
          <>
            <SafeAreaView style={tw`flex items-center justify-between`}>
              <Image
                source={require("../assets/Images/VectorSignin.jpg")}
                style={tw`h-96 w-96 `}
              />
              <Text style={tw`text-xl`}>Sign in to continue</Text>
              <TouchableOpacity
                style={tw`bg-orange-100 px-4 py-1 rounded-xl`}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text style={tw`text-xl font-semibold`}>Login</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </>
        )}
      </View>
    </View>
  );
};

export default Collections;
