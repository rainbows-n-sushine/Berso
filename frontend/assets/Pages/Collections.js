import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../../context/AuthContext";
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
    <SafeAreaView className="flex-1 bg-[#F2E8DE] items-center justify-between top-8">
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
          <View>
            <Text className="text-xl text-center">Collections</Text>
            <TouchableOpacity
              className="bg-white p-3 rounded-xl items-center"
              
            >
              <Text>user has logged in</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View>
              <Text className="text-xl">Sign in for collections</Text>
              <TouchableOpacity
                className="bg-white p-3 rounded-xl"
                onPress={() => {
                  navigation.navigate("UserLogin");
                }}
              >
                <Text>Login</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

export default Collections

// const styles = StyleSheet.create({})