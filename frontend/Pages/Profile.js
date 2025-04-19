import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  SectionList,
  Modal,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import tw from "twrnc";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import ParallaxScrollView from "../assets/Components/ParallaxScrollView";
const { width } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Profile = ({ dummyRestaurantsData }) => {
  const navigation = useNavigation();
const [modalVisible, setModalVisible] = useState(false);
 const [currentIndex, setCurrentIndex] = useState(0);
 const  {businessOwnerId}=useContext(AuthContext)
 const [isBusinessOwner,setIsBusinessOwner]=useState(false)
 

 useEffect(()=>{

  if(businessOwnerId!==""){

    setIsBusinessOwner(true)
  }
 },[])

 const handleSwipe = (index) => {
   setCurrentIndex(index);
 };
const { isLoading, userToken,businessOwnerToken } = useContext(AuthContext); 
  const data = dummyRestaurantsData?.food?.map((item, index) => ({
    title: item.category,
    data: item.meals,
    index,
  }));

  const RegisterBusinessByAnyone=async()=>{
    await AsyncStorage.removeItem('registerBusinessByOwner')
    


  }


  const RegisterBusinessByOwner=async()=>{
    await AsyncStorage.setItem('registerBusinessByOwner','true')
    


  }

  return (
    <View style={tw`flex-1 bg-white`}>
      {isLoading ? (
        <>
          <View>
            <Text>Loading...</Text>
          </View>
        </>
      ) : userToken||businessOwnerToken ? (
        <>
          <ParallaxScrollView
            style={tw`flex-1`}
            // styles={{ flex: 1 }}
            backgroundColor="white"
            parallaxHeaderHeight={300}
            renderBackground={() => <View style={tw`bg-black top-8`}></View>}
            stickyHeaderHeight={90}
            contentBackgroundColor="#F2E8DE"
            renderStickyHeader={() => (
              <View style={tw`flex justify-between top-4`}>
                <View style={tw`ml-4`}>
                  <Text style={tw` text-orange-400 text-lg font-semibold`}>
                    My Reviews and Photos
                  </Text>
                </View>
                <View style={tw`flex flex-row items-center justify-between py-3 `}>
                  <View style={tw`items-center w-1/2`}>
                    <Text style={tw` text-black text-lg font-semibold mx-3`}>
                      Reviews
                    </Text>
                  </View>
                  <View style={tw`items-center w-1/2`}>
                    <Text style={tw`  text-black text-lg font-semibold mx-3`}>
                      Photos
                    </Text>
                  </View>
                </View>
              </View>
            )}
            renderForeground={() => (
              <SafeAreaView style={tw`flex  bg-white`}>
                <View style={tw`flex-row-reverse ml-2 mt-2`}>
                  <TouchableOpacity
                    style={tw`px-2`}
                    onPress={() => {
                      navigation.navigate("EditUserProfile");
                    }}
                  >
                    <Feather name="share" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`px-2`}
                    onPress={() => {
                      navigation.navigate("EditUserProfile");
                    }}
                  >
                    <Feather name="edit" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <View style={tw`flex items-center justify-between mt-9`}>
                  {/* <FontAwesome name="user-circle-o" size={60} color="black" />
                   */}
                  <View style={tw`items-center justify-between`}>
                    <Image
                      source={require("../assets/Images/defaultprofile.png")}
                      style={tw`w-20 h-20 rounded-full border border-orange-300`}
                    />
                    <Text style={tw`mt-1 text-base`}>Username</Text>
                  </View>
                  <View style={tw`flex-row mt-2 justify-between items-center`}>
                    <View style={tw`items-center flex-row mx-1`}>
                      <Feather name="users" size={12} color="lightgray" />
                      <Text style={tw`text-sm  text-neutral-400`}>45</Text>
                    </View>
                    <View style={tw`items-center flex-row mx-1`}>
                      <FontAwesome name="photo" size={12} color="lightgray" />
                      <Text style={tw`text-sm text-neutral-400`}>12</Text>
                    </View>
                    <View style={tw`items-center flex-row mx-1`}>
                      <Foundation name="comments" size={12} color="lightgray" />
                      <Text style={tw`text-sm  text-neutral-400`}>18</Text>
                    </View>
                  </View>
                  <View style={tw`flex-row my-7 justify-between items-center`}>
                    

                      {!isBusinessOwner&&
                      <View style={tw`items-center mx-4`}>
                      <MaterialCommunityIcons
                      name="comment-edit-outline"
                      size={22}
                      color="black"
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                        navigation.navigate("AddReview",{inBusiness:false,business_id:""});
                      }}
                    >
                      <Text style={tw`text-base`}>Add Review</Text>
                    </TouchableOpacity>
                  </View>
                      }
                       <TouchableOpacity
                      onPress={() => {
                        setModalVisible(false);
                        navigation.navigate("AddPhoto");
                      }}
                    >
                    <View style={tw`items-center  mx-4`}>
                      <Feather name="camera" size={22} color="black" />

                      <Text style={tw`text-base`}>Add Photo</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        // navigation.navigate("AddBusiness");
                        setModalVisible(true);
                      }}
                    >
                      <View style={tw`items-center mx-4`}>
                        <AntDesign name="isv" size={22} color="black" />
                        <Text style={tw`text-base`}>Add Business</Text>
                      </View>
                    </TouchableOpacity>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <View
                        style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
                      >
                        <View style={tw`bg-white p-8 rounded-md w-80`}>
                          <View style={tw`p-2`}>
                            <Text style={tw`text-base text-center`}>
                              What is your relationship with the business you'd
                              like to add?
                            </Text>
                          </View>
                          <TouchableOpacity
                            style={tw`border border-gray-200 py-2 my-1`}
                            onPress={() => {
                              setModalVisible(false);
                              RegisterBusinessByAnyone()
                              navigation.navigate("AddBusiness");
                            }}
                          >
                            <Text style={tw`text-base text-center `}>
                              I'm a Customer
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={tw`py-2 border border-gray-200 my-1`}
                            onPress={() => {
                              RegisterBusinessByAnyone()
                              navigation.navigate("AddBusiness");
                              setModalVisible(false);
                            }}
                          >
                            <Text style={tw`text-base text-center `}>
                              i work at the business
                            </Text>
                          </TouchableOpacity>
                          {businessOwnerId &&

                          <TouchableOpacity
                            style={tw`py-2 border border-gray-200 my-1`}
                            onPress={() => {
                              RegisterBusinessByOwner()
                              navigation.navigate("AddBusiness");                                      
                              setModalVisible(false);
                            }}
                          >
                            <Text style={tw`text-base text-center `}>
                              I own the business
                            </Text>
                          </TouchableOpacity>

                          }
                          
                          <TouchableOpacity
                            style={tw`py-2`}
                            onPress={() => {
                              setModalVisible(!modalVisible);
                            }}
                          >
                            <Text
                              style={tw`text-base text-center text-orange-300`}
                            >
                              Cancel
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </View>
                </View>
              </SafeAreaView>
            )}
          >
            

            <View style={tw`flex bg-white mt-2 rounded-t-2xl`}>
              <View>
            
              </View>
            </View>
          </ParallaxScrollView>
        </>
      ) : (
        <>
          <SafeAreaView style={tw`flex items-center justify-between bg-white`}>
            <Image
              source={require("../assets/Images/VectorSignin.jpg")}
              style={tw`w-full h-100 `}
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
  );
};


export default Profile;
