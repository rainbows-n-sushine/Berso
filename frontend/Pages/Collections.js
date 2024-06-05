import React, { useState, useEffect, useContext } from "react";
import {
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
    <View
      style={tw`flex-1 bg-white items-center justify-between `}
    >
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
          <SafeAreaView>
            <Text style={tw`text-xl text-center`}>Collections</Text>
            <TouchableOpacity style={tw`bg-white p-3 rounded-xl items-center`}>
              <Text>user has logged in</Text>
            </TouchableOpacity>
          </SafeAreaView>
        ) : (
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
