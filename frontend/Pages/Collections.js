import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../context/AuthContext";
const Collections = () => {

  const [userToken,setUserToken]= useState(null)

  const [displayCollection,setDisplayCollection]=useState(false)



  useEffect(()=>{
    async function getToken(){
console.log(userToken)
  let token=await AsyncStorage.getItem('userToken')
  console.log(displayCollection)

  console.log(token)
    setUserToken(token)
    if(token===null){
      setDisplayCollection(false)
          }else{
            setDisplayCollection(true)
          }


    } 
    getToken()
  
  },[])
  
 
    const navigation = useNavigation();
   
     const { isLoading } = useContext(AuthContext); 
  return (
    <View className="flex-1 bg-white items-center justify-between ">
      <View className="flex items-center justify-between">
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
        ) : userToken ? (
          <SafeAreaView>
            <Text className="text-xl text-center">Collections</Text>
            <TouchableOpacity className="bg-white p-3 rounded-xl items-center">
              <Text>user has logged in</Text>
            </TouchableOpacity>
          </SafeAreaView>
        ) : (
          <>
            <SafeAreaView className="flex items-center justify-between">
              <Image
                source={require("../assets/Images/VectorSignin.jpg")}
                style={tw`w-full h-100 `}
              />
              <Text className="text-xl">Sign in to continue</Text>
              <TouchableOpacity
                className="bg-orange-100 px-4 py-1 rounded-xl"
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text className="text-xl font-semibold">Login</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </>
        )}
      </View>
    </View>
  );
}

export default Collections

// const styles = StyleSheet.create({})