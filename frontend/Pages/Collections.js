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
import tw from "twrnc";

const Collections = () => {
  const [userToken, setUserToken] = useState(null);
  const [businessOwnerToken, setBusinessOwnerToken] = useState(null);
  const [displayCollection, setDisplayCollection] = useState(false);
  const favoriteBusinesses = [
    {
      id: "1",
      name: "Bistro Cafe",
      description: "A cozy place to enjoy coffee and snacks.",
      image: require("../assets/Images/HomeBG.jpg"),
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
    async function getToken() {
      console.log(userToken);
      let _userToken = await AsyncStorage.getItem("userToken");
      let _businessOwnerToken = await AsyncStorage.getItem("businessOwnerToken");
      console.log(displayCollection);
      setUserToken(_userToken);
      setBusinessOwnerToken(_businessOwnerToken)
      if (token === null) {
        setDisplayCollection(false);
      } else {
        setDisplayCollection(true);
      }
    }
    getToken();
  }, []);

  const navigation = useNavigation();
  const { isLoading } = useContext(AuthContext);

  return (
    <View style={tw`flex-1 bg-white items-center justify-between p-4`}>
      <View style={tw`flex items-center justify-between`}>
        {/* 
        {displayCollection&&
        
        <Text className="text-xl">here r the collections</Text>
        }
         */}
        {isLoading ? (
          <>
            <View>
              <Text>Loading...</Text>
            </View>
          </>
        ) : userToken || businessOwnerToken ? (
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
              data={favoriteBusinesses}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={tw`bg-white p-4 mb-4 rounded-lg shadow w-full bg-orange-100`}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={tw`w-full h-40 rounded-lg mb-4`}
                    resizeMode="cover"
                  />
                  <Text style={tw`text-xl font-bold`}>{item.name}</Text>
                  <Text style={tw`text-gray-600`}>{item.description}</Text>
                </View>
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
