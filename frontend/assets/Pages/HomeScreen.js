import { View, Text, Image, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, TextInput } from "react-native";
import React,{useContext, useEffect,useState} from "react";
import { Entypo, Feather, FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import ParallaxScrollView from "../Components/ParallaxScrollView";
const  {width} = Dimensions.get('window')
import { useNavigation } from "@react-navigation/native";
import SearchBusinessScreen from "./SearchResultsScreen";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const {UserLogout,UserLogin, BusinessOwnerLogin, BusinessOwnerLogout}=useContext(AuthContext)
  const [businessOwnerToken,setBusinessOwnerToken]=useState('')
  const [userToken,setUserToken]=useState('')


  useEffect(()=>{
    async function getToken(){
       let _userToken= await AsyncStorage.getItem('userToken')
    let _businessOwnerToken= await AsyncStorage.getItem('BusinessOwnerToken')
    if (_userToken){

      setUserToken(_userToken)
    }else if(_businessOwnerToken){
      setBusinessOwnerToken(_businessOwnerToken)
    }
    }
    getToken();

   
  },[])
  
  const navigation = useNavigation();
  return (
    <ParallaxScrollView
      className="flex-1 flex"
      // styles={{ flex: 1 }}
      backgroundColor="[#F6D8BD]"
      parallaxHeaderHeight={300}
      renderBackground={() => (
        <Image
          className="w-screen top-0 h-[300] "
          // style={{ backgroundColor: "white" }}
          source={require("../Images/HomeBG.jpg")}
          resizeMode="cover"
        />
      )}
      renderForeground={() => (
        <TouchableOpacity
          className="absolute bg-orange-400 rounded-xl top-40 left-3 flex-row justify-between p-2 items-center"
          onPress={() => {}}
        >
          <View className=" flex-row items-center justify-between pr-2">
            <FontAwesome
              name="search"
              size={20}
              className="p-5"
              color="white"
            />
            <Text
              style={{ fontFamily: "berlin-sans" }}
              className=" ml-2 text-white text-lg font-semibold"
            >
              Unique Restaurants
            </Text>
          </View>
        </TouchableOpacity>
      )}
    >
      <View className="bg-[#F2E8DE] ">
        <TouchableOpacity
          className="flex rounded-xl -mt-8 mr-3 ml-3 bg-white"
          onPress={() => {
            navigation.navigate("SearchBusiness");
          }}
        >
          <View className="m-3 items-center">
            <View className="flex flex-row items-center">
              <FontAwesome name="search" size={20} color="lightgray" />
              <Text className="text-base font-bold text-[#dedddd] ml-2">
                Search for nearby restaurants,salons..
              </Text>
              {/* <TextInput
                className="text-base font-bold text-[#dedddd] ml-2 border-gray-300"
                placeholder="Search for nearby restaurants,salons.."

                value={password}
                onChangeText={(text) => setPassword(text)}
              /> */}
            </View>
          </View>
        </TouchableOpacity>
        <ScrollView>
          <View className="flex rounded-xl m-4 bg-white ">
            <View className="m-4 items-center">
              <View className="flex  items-center justify-between ">
                <View className="flex flex-row  items-center justify-between ">
                 <TouchableOpacity onPress={() => {
            navigation.navigate("BusinessList", { category: "Coffee Shops" });
          }}>
             <View className="items-center justify-center  m-2 flex-1  ">
                    <Ionicons name="cafe" size={22} color="orange" />
                    <Text className="text-normal font-bold text-orange-400 mt-3 ">
                      Coffee Shops
                    </Text>
                  </View>
                  </TouchableOpacity>
                  <View className="items-center m-1 justify-center flex-1">
                    <MaterialIcons name="restaurant" size={22} color="orange" />
                    <Text className="text-normal font-bold  text-orange-400 mt-3  ">
                      Restaurants
                    </Text>
                  </View>

                  <View className="items-center m-1 flex-1 justify-center">
                    <FontAwesome5 name="hotel" size={22} color="orange" />
                    <Text className="text-normal font-bold  text-orange-400 mt-3  ">
                      Hotels & Resorts
                    </Text>
                  </View>
                </View>

                <View className="flex flex-row items-center justify-between pt-3 ">
                  <View className="items-center m-1 justify-center flex-1">
                    <Entypo name="aircraft" size={22} color="orange" />
                    <Text className="text-normal font-bold  text-orange-400 mt-3 ">
                      Tour & Travel
                    </Text>
                  </View>
                  <View className="items-center m-1 justify-center flex-1">
                    <MaterialIcons
                      name="delivery-dining"
                      size={25}
                      color="orange"
                    />
                    <Text className="text-normal font-bold  text-orange-400 mt-3">
                      Delivery
                    </Text>
                  </View>

                  <View className="items-center m-1 justify-center flex-1">
                    <Entypo name="drink" size={22} color="orange" />
                    <Text className="text-normal font-bold  text-orange-400 mt-3 ">
                      Bars
                    </Text>
                  </View>
                </View>

                <View className="flex flex-row items-center justify-between pt-3 ">
                  <View className="items-center m-1 justify-center flex-1">
                    <FontAwesome5 name="spa" size={22} color="orange" />
                    <Text className="text-normal font-bold  text-orange-400 mt-3  ">
                      Spas & Salons
                    </Text>
                  </View>
                  <View className="items-center m-1 justify-center flex-1">
                    <Entypo name="shop" size={23} color="orange" />
                    <Text className="text-normal font-bold  text-orange-400 mt-3  ">
                      Shops
                    </Text>
                  </View>
                  <View className="items-center m-1 justify-center flex-1">
                    <Feather name="more-horizontal" size={22} color="orange" />
                    <Text className="text-normal font-bold  text-orange-400 mt-3  ">
                      More
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View className="flex rounded-xl mx-3 bg-white">
            <View className="m-4">
              <View className="flex  justify-between ">
                <Text className="text-xl font-bold  text-black my-3  ">
                  Picks from your community
                </Text>
                <View className="flex rounded-xl py-20  bg-[#F2E8DE]">
                  <View className="m-4">
                    <View className="flex  justify-between ">
                      <Text className="text-xl font-bold text-black ">
                        Not sure where to eat? we got you
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={()=>{
                console.log(businessOwnerToken,"this is the business owner token")
                console.log(userToken,'this is userToken ')
              
                userToken? UserLogout():BusinessOwnerLogout();
              

              }}>
              
                <Text>logout</Text>
              </TouchableOpacity>

              <TouchableOpacity  onPress={() => {
            navigation.navigate("UserLogin");
          }}>
              
              <Text>login</Text>
            </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </View>
    </ParallaxScrollView>
  );
 
};

export default HomeScreen;
