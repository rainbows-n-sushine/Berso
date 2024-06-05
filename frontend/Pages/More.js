import {
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  FontAwesome5,
  FontAwesome,
  AntDesign,
  Entypo,
  Octicons,
  Feather,
} from "@expo/vector-icons";

import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBusinessTab, setBusinessTab } from "../context/BusinessTabContext";

const More = () => {
  const { setBusinessTab } = useBusinessTab();
  const { UserLogout, BusinessOwnerLogout, businessOwnerId,userId} = useContext(AuthContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [businesses,setBusinesses]=useState([])


  useEffect(()=>{

    const getBusinesses =async()=>{

      await api.get(`business/backend/routes/business.js/${businessOwnerId}`)
      .then((res)=>{
        if(res.data.success){
          let _businesses=res.data.businesses
          setBusinesses(_businesses)
          Alert.alert(res.data.message)
        }else{
          console.log(res.data.message)
        }
       })
       .catch((err)=>{
        if(err){
          console.log('error in getBusinesses in homesScreen business owner pages: ',err.message)
        }
       })


    }
    getBusinesses()


  },[])

  // Dummy data for businesses
  // const businesses = [
  //   { id: 1, name: "Business 1", logo: "../assets/Images/logo-removebg.png" },
  //   { id: 2, name: "Business 2", logo: "../assets/Images/logo-removebg.png" },
  //   { id: 3, name: "Business 3", logo: "../assets/Images/logo-removebg.png" },
  //   // Add more businesses as needed
  // ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={tw`flex-row items-center p-2 border-b border-gray-300`}
      onPress={() => {
        navigation.navigate("BusninessHome");
        setBusinessTab(true);
      }}
    >
      <Image
        source={{ uri: item.logo }}
        style={tw`w-8 h-8 rounded-full mr-2`}
      />
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const modalHeight = Math.min(300, businesses.length * 50 + 120); // Maximum height is 300

  const [businessOwnerToken, setBusinessOwnerToken] = useState("");
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    async function getToken() {
      let _userToken = await AsyncStorage.getItem("userToken");
      let _businessOwnerToken = await AsyncStorage.getItem(
        "BusinessOwnerToken"
      );
      if (_userToken) {
        setUserToken(_userToken);
      } else if (_businessOwnerToken) {
        setBusinessOwnerToken(_businessOwnerToken);
      }
    }
    getToken();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F2E8DE]`}>
      <ScrollView>
        <View style={tw`items-center mb-3`}>
          <Image
            source={require("../assets/Images/logo-removebg.png")}
            style={tw`w-32 h-32`}
          />
        </View>

        <View style={tw`flex py-3`}>
          <TouchableOpacity
            style={tw`bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center`}
            onPress={() => {
              navigation.navigate("EditUserProfile");
            }}
          >
            <FontAwesome name="user-circle-o" size={22} color="black" />
            <Text style={tw`ml-2`}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center`}
            onPress={() => {
              navigation.navigate("BusinessPage");
            }}
          >
            <AntDesign name="setting" size={22} color="black" />
            <Text style={tw`ml-2`}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center`}
            onPress={() => {
              // navigation.navigate("BusinessHome");
              // setBusinessTab(true);
              setModalVisible(true);
            }}
          >

            <Entypo name="shop" size={22} color="black" />
            <Text style={tw`ml-2`}>My Businesses</Text>
          </TouchableOpacity>
          
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View
              style={tw`flex-1 justify-center items-center bg-gray-800 bg-opacity-50`}
            >
              <View
                style={[
                  tw`bg-white p-4 rounded-lg`,
                  { height: modalHeight, width: 300 },
                ]}
              >
                <FlatList
                  data={businesses}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id.toString()}
                />
                <TouchableOpacity
                  style={tw`mt-4 bg-orange-400 p-2 rounded-lg`}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={tw`text-white text-center font-bold`}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={tw`bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center`}
            onPress={() => {
              navigation.navigate("");
            }}
          >
            <Octicons name="report" size={21} color="black" />
            <Text style={tw`ml-2`}>Report a problem</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center`}
            onPress={() => {
              navigation.navigate("");
            }}
          >
            <Entypo name="share" size={22} color="black" />
            <Text style={tw`ml-2`}>Share Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center`}
            onPress={() => {
              navigation.navigate("");
            }}
          >
            <FontAwesome name="user-circle-o" size={22} color="black" />
            <Text style={tw`ml-2`}>About Berso</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center`}
            onPress={() => {
              navigation.navigate("");
            }}
          >
            <AntDesign name="filetext1" size={22} color="black" />
            <Text style={tw`ml-2`}>Terms of service and privacy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center`}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Feather name="log-in" size={22} color="black" />
            <Text style={tw`ml-2`}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center`}
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
              navigation.navigate("Home");
            }}
          >
            <Feather name="log-out" size={22} color="black" />
            <Text style={tw`ml-2`}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default More;
