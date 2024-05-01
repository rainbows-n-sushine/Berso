import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  return (
    <SafeAreaView className="flex-1 bg-[#F2E8DE] items-center justify-between top-8">
      <View className="flex items-center justify-between">

        {displayCollection &&
        
        <Text className="text-xl">here r the collections</Text>
        }
        
      {!displayCollection && 
      <View>
        <Text className="text-xl">Sign in for collections</Text>
        <TouchableOpacity
          className="bg-white p-3 rounded-xl"
          onPress={()=>{
            navigation.navigate('Login')
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        </View>
}
        
        
        
      </View>
    </SafeAreaView>
  );
}

export default Collections

// const styles = StyleSheet.create({})