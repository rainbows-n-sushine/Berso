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
  Animated,
  FlatList,
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
import categoryHome from "../data/category-home.json"

const screenWidth = Dimensions.get('window').width;

library.add(fas);

const { width } = Dimensions.get("window");

const HomeScreen = () => {
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
              {/* <View style={tw`flex  items-center justify-between`}> */}
                            <View
                style={[
                  tw`flex-row justify-start p-4`,
                  {
                    flexWrap: 'wrap',
                    width: screenWidth,
                    gap: 1
                  },
                ]}
              >
                {categories.slice(0,8).map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      tw`items-center justify-center m-4`,
                      {
                        width: screenWidth / 3 - 45, // For 3 items per row, minus gap
                      },
                    ]}
                    onPress={() => {
                      navigation.navigate("BusinessList", {
                        category: item,
                      });
                    }}
                  >
                    <MaterialIcons
                      name={item.icon}
                      size={21}
                      color="orange"
                    />
                    <Text style={tw`text-sm font-bold text-orange-400 mt-3`}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                    style={[
                      tw`items-center justify-center m-4`,
                      {
                        width: screenWidth / 3 - 45, // For 3 items per row, minus gap
                      },
                    ]}
                    onPress={() => {
                      navigation.navigate("CategoryList");
                    }}
                  >
                    <MaterialIcons
                      name="more"
                      size={21}
                      color="orange"
                    />
                    <Text style={tw`text-sm font-bold text-orange-400 mt-3`}>
                      More
                    </Text>
                  </TouchableOpacity>
              </View>

            </View>
          </View>

          <View style={tw`flex rounded-xl mx-3 bg-white`}>
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
