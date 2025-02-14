import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
<<<<<<< HEAD
=======
  Animated,
  FlatList,
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import ParallaxScrollView from "../assets/Components/ParallaxScrollView";
import { useNavigation } from "@react-navigation/native";
import SearchBusinessScreen from "./SearchResultsScreen";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../util/Util";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import tw from "twrnc";

library.add(fas);

const { width } = Dimensions.get("window");

const HomeScreen = () => {
<<<<<<< HEAD
  const { UserLogout, BusinessOwnerLogout ,businessOwnerToken,userToken} = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
 

  useEffect(() => {
=======
  const { UserLogout,userId,businessId, BusinessOwnerLogout ,businessOwnerToken,userToken} = useContext(AuthContext);
  const [isUser,setIsUser]=useState(false)
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  const [recommendations, setRecommendations] = useState([]);
  const [isReady, setIsReady] = useState(false);
const [animate, setAnimate] = useState(false);

 

  useEffect(() => {
    if(userToken){
      setIsUser(true)
    }
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
    const fetchCategories=async()=> {
      await api
        .get("category/fetchAll")
        .then((res) => {
          if (res.data.success) {
            let _categories = res.data.categories;
            setCategories(_categories);
            console.log('this is categorue s: ',_categories )
          } else {
            Alert.alert(res.data.message);
          }
        })
        .catch((error) => {
          if (error) {
            console.log("error in fetchCategories : ", error.message);
          }
        });
    }

<<<<<<< HEAD
    fetchCategories();
  }, []);

  const navigation = useNavigation();
=======
    const fetchRecommendations=async()=>{
      console.log('this is the userId: ',userId, " and userToken ",userToken)

      console.log('im in fetch receommendations')

      await api.get(`recommendation/get-for-user/${userId}`)
      .then((res)=>{
        console.log('this i sfetch recommendations api')

        if(res.data.success){
          setRecommendations(res.data.recommendations)
          setAnimate(true);
        }
      }).catch((error)=>{
        if(error){console.log(error.message)}
      })
    }

    fetchCategories();
    fetchRecommendations()
  }, []);

 
  
      const startAnimation = () => {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 3500,
          useNativeDriver: true,
        }).start();
      };

     const renderItem = ({ item, index }) => {
       const translateY = new Animated.Value(100);

       if (animate) {
         Animated.timing(translateY, {
           toValue: 0,
           duration: 3500, // Increase duration for slower animation
           delay: index * 200,
           useNativeDriver: true,
         }).start();
       }

       

       return (
         <Animated.View style={{ transform: [{ translateY }] }}>
           <View style={tw`mb-3 bg-white rounded-xl p-3`}>
             <Text style={{ fontSize: 18, fontWeight: "bold" }}>
               {item.business_name}
             </Text>
             <Text style={{ fontSize: 14, color: "gray" }}>
               {item.description}
             </Text>
             <View style={{ flexDirection: "row", alignItems: "center" }}>
               <Text style={{ fontSize: 14, color: "gray" }}>Rating: </Text>
               {[...Array(Math.floor(item.average_rating))].map((_, i) => (
                 <Text key={i} style={{ fontSize: 14, color: "#FFD700" }}>
                   ★
                 </Text>
               ))}
               {item.average_rating % 1 > 0 && (
                 <Text style={{ fontSize: 14, color: "#FFD700" }}>½</Text>
               )}
             </View>
           </View>
         </Animated.View>
       );
     };

>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
  return (
    <ParallaxScrollView
      style={tw`flex-1`}
      backgroundColor="[#F6D8BD]"
      parallaxHeaderHeight={300}
      renderBackground={() => (
        <Image
          style={tw`w-full h-[300px]`}
          source={require("../assets/Images/HomeBG.jpg")}
          resizeMode="cover"
        />
      )}
      renderForeground={() => (
        <TouchableOpacity
          style={tw`absolute bg-orange-400 rounded-xl top-40 left-3 flex-row justify-between  items-center`}
          onPress={() => {}}
        >
          <View style={tw`flex-row items-center justify-between pr-2`}>
            <FontAwesome
              name="search"
              size={20}
              style={tw`p-2`}
              color="white"
            />
            <Text style={tw`text-white text-lg font-semibold`}>
              Unique Restaurants
            </Text>
          </View>
        </TouchableOpacity>
      )}
    >
      <View style={tw`bg-[#F2E8DE]`}>
        <TouchableOpacity
          style={tw`flex rounded-xl -mt-8 mx-3 bg-white`}
          onPress={() => {
            navigation.navigate("SearchBusiness");
          }}
        >
          <View style={tw`m-3 items-center`}>
            <View style={tw`flex flex-row items-center`}>
              <FontAwesome name="search" size={20} color="lightgray" />
              <Text style={tw`text-base font-bold text-[#dedddd] ml-2`}>
                Search for nearby restaurants,salons..
              </Text>
              {/* <TextInput
                style={tw`text-base font-bold text-[#dedddd] ml-2 border-gray-300`}
                placeholder="Search for nearby restaurants,salons.."
                value={password}
                onChangeText={(text) => setPassword(text)}
              /> */}
            </View>
          </View>
        </TouchableOpacity>
        <ScrollView>
          <View style={tw`flex rounded-xl m-4 bg-white`}>
            <View style={tw`m-4 items-center`}>
              <View style={tw`flex items-center justify-between`}>
<<<<<<< HEAD
                <View style={tw`flex flex-row items-center justify-between`}>
=======
                <View
                  style={tw`flex flex-row items-center justify-between pt-3`}
                >
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("BusinessList", {
                        category: "Coffee Shops",
                      });
                    }}
                  >
                    <View style={tw`items-center m-1 justify-center flex-1`}>
                      <MaterialIcons name="coffee" size={22} color="orange" />
                      <Text
<<<<<<< HEAD
                        style={tw`text-normal font-bold text-orange-400 mt-3`}
=======
                        style={tw`text-sm font-bold text-orange-400 mt-3`}
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
                      >
                        Coffee Shops
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("BusinessList", {
                        category: "Coffee Shops",
                      });
                    }}
                  >
                    <View style={tw`items-center m-1 justify-center flex-1`}>
                      <MaterialIcons
                        name="restaurant"
                        size={22}
                        color="orange"
                      />
                      <Text
<<<<<<< HEAD
                        style={tw`text-normal font-bold text-orange-400 mt-3`}
=======
                        style={tw`text-sm font-bold text-orange-400 mt-3`}
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
                      >
                        Restaurants
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("BusinessList", {
                        category: "Coffee Shops",
                      });
                    }}
                  >
                    <View style={tw`items-center m-1 flex-1 justify-center`}>
                      <FontAwesome5 name="hotel" size={22} color="orange" />
                      <Text
<<<<<<< HEAD
                        style={tw`text-normal font-bold text-orange-400 mt-3`}
=======
                        style={tw`text-sm font-bold text-orange-400 mt-3`}
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
                      >
                        Hotels & Resorts
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={tw`flex flex-row items-center justify-between pt-3`}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("BusinessList", {
                        category: "Coffee Shops",
                      });
                    }}
                  >
                    <View style={tw`items-center m-1 justify-center flex-1`}>
                      <Entypo name="aircraft" size={22} color="orange" />
                      <Text
<<<<<<< HEAD
                        style={tw`text-normal font-bold text-orange-400 mt-3`}
=======
                        style={tw`text-sm font-bold text-orange-400 mt-3`}
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
                      >
                        Tour & Travel
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("BusinessList", {
                        category: "Coffee Shops",
                      });
                    }}
                  >
                    <View style={tw`items-center m-1 justify-center flex-1`}>
                      <MaterialIcons
                        name="delivery-dining"
                        size={25}
                        color="orange"
                      />
                      <Text
<<<<<<< HEAD
                        style={tw`text-normal font-bold text-orange-400 mt-3`}
=======
                        style={tw`text-sm font-bold text-orange-400 mt-3`}
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
                      >
                        Delivery
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("BusinessList", {
                        category: "Coffee Shops",
                      });
                    }}
                  >
                    <View style={tw`items-center m-1 justify-center flex-1`}>
                      <Entypo name="drink" size={22} color="orange" />
                      <Text
<<<<<<< HEAD
                        style={tw`text-normal font-bold text-orange-400 mt-3`}
=======
                        style={tw`text-sm font-bold text-orange-400 mt-3`}
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
                      >
                        Bars
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={tw`flex flex-row items-center justify-between pt-3`}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("BusinessList", {
                        category: "Coffee Shops",
                      });
                    }}
                  >
                    <View style={tw`items-center m-1 justify-center flex-1`}>
                      <FontAwesome5 name="spa" size={22} color="orange" />
                      <Text
<<<<<<< HEAD
                        style={tw`text-normal font-bold text-orange-400 mt-3`}
=======
                        style={tw`text-sm font-bold text-orange-400 mt-3`}
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
                      >
                        Spas & Salons
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("BusinessList", {
                        category: "Coffee Shops",
                      });
                    }}
                  >
                    <View style={tw`items-center m-1 justify-center flex-1`}>
                      <Entypo name="shop" size={23} color="orange" />
                      <Text
<<<<<<< HEAD
                        style={tw`text-normal font-bold text-orange-400 mt-3`}
=======
                        style={tw`text-sm font-bold text-orange-400 mt-3`}
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
                      >
                        Shops
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("CathagoryList");
                    }}
                  >
                    <View style={tw`items-center m-1 justify-center flex-1`}>
                      <Feather
                        name="more-horizontal"
                        size={22}
                        color="orange"
                      />
                      <Text
<<<<<<< HEAD
                        style={tw`text-normal font-bold text-orange-400 mt-3`}
=======
                        style={tw`text-sm font-bold text-orange-400 mt-3`}
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
                      >
                        More
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={tw`flex rounded-xl mx-3 bg-white`}>
<<<<<<< HEAD
            <View style={tw`m-4`}>
              <View style={tw`flex justify-between`}>
                <Text style={tw`text-xl font-bold text-black my-3`}>
                  Picks from your community
                </Text>
                <View style={tw`flex rounded-xl py-20 bg-[#F2E8DE]`}>
                  <View style={tw`m-4`}>
                    <View style={tw`flex justify-between`}>
                      <Text style={tw`text-xl font-bold text-black`}>
                        Not sure where to eat? we got you
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
=======
          <View style={tw`m-4`}>
            
              {isUser&&
              
              <View style={tw`flex justify-between`}>
              <Text style={tw`text-xl font-bold text-black my-3`}>
                Picks from your community
              </Text>
              <View style={tw`flex rounded-xl py-3 bg-[#F2E8DE]`}>
                {/* <View style={tw``}> */}
                <Text style={tw`text-xl font-bold p-4`}>
                  Personalized Recommendations
                </Text>
                <FlatList
                  data={recommendations}
                  renderItem={renderItem}
                  keyExtractor={(item) => item._id.toString()}
                  style={tw`mt-2 p-4 `}
                  onScrollEndDrag={startAnimation}
                />
                {/* </View> */}
              </View>
            </View>
          
              }
              </View>
              
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
            {/* <View>
              <TouchableOpacity
                onPress={() => {
                  console.log(
                    businessOwnerToken,
                    "this is the business owner token"
                  );
                  console.log(userToken, "this is userToken ");
                  if (userToken) {
                    UserLogout();
                  } else {
                    BusinessOwnerLogout();
                  }
                }}
              >
                <Text>logout</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text>login</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </ScrollView>
      </View>
    </ParallaxScrollView>
  );
};

export default HomeScreen;
