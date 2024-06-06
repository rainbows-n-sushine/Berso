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
  const { UserLogout, BusinessOwnerLogout } = useContext(AuthContext);
  const [businessOwnerToken, setBusinessOwnerToken] = useState("");
  const [categories, setCategories] = useState([]);
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const getToken=async()=> {
      console.log('im in getToken ')
      let _userToken = await AsyncStorage.getItem("userToken");
      let _businessOwnerToken = await AsyncStorage.getItem("BusinessOwnerToken");

      if (_userToken) {
        setUserToken(_userToken);
      } else if (_businessOwnerToken) {
        setBusinessOwnerToken(_businessOwnerToken);
      }
    }
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

    getToken();
    fetchCategories();
  }, []);

  const navigation = useNavigation();
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
                <View style={tw`flex flex-row items-center justify-between`}>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category._id}
                      onPress={() => {
                        navigation.navigate("BusinessList", {
                          category: category,
                        });
                      }}
                    >
                      <View style={tw`items-center justify-center m-2 flex-1`}>
                        {/* <Ionicons name="cafe" size={22} color="orange" /> */}
                        {/* <FontAwesomeIcon icon={['fas', category.icon]} /> */}
                        <Text
                          style={tw`text-normal font-bold text-orange-400 mt-3`}
                        >
                          {category.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
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
                        style={tw`text-normal font-bold text-orange-400 mt-3`}
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
                        style={tw`text-normal font-bold text-orange-400 mt-3`}
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
                        style={tw`text-normal font-bold text-orange-400 mt-3`}
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
                        style={tw`text-normal font-bold text-orange-400 mt-3`}
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
                        style={tw`text-normal font-bold text-orange-400 mt-3`}
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
                        style={tw`text-normal font-bold text-orange-400 mt-3`}
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
                        style={tw`text-normal font-bold text-orange-400 mt-3`}
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
                        style={tw`text-normal font-bold text-orange-400 mt-3`}
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
            <View>
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
            </View>
          </View>
        </ScrollView>
      </View>
    </ParallaxScrollView>
  );
};

export default HomeScreen;
