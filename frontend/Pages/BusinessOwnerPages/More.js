import React,{useState,useEffect,useContext} from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList
} from "react-native";
import tw from "twrnc";
import {
  FontAwesome5,
  FontAwesome,
  AntDesign,
  Entypo,
  Octicons,
  Feather,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBusinessTab } from '../../context/BusinessTabContext';
import { AuthContext } from "../../context/AuthContext";
const More = () => {
 
  const navigation = useNavigation();
  const { setBusinessTab } = useBusinessTab();
  const [modalVisible, setModalVisible] = useState(false);
  const [businesses,setBusinesses]=useState([])
  const {businessOwnerId}=useContext(AuthContext)
  const modalHeight = Math.min(300, businesses.length * 50 + 120);

  
  useEffect(() => {
    
    const getBusinesses =async()=>{
      console.log('im here',businessOwnerId)

      await api.get(`business/get-by-business-owner/${businessOwnerId}`)
      .then((res)=>{
        
        if(res.data.success){
          
          let _businesses=res.data.businesses

          console.log('these are the businesses under _businesses: ',_businesses)
          setBusinesses(_businesses)
          // Alert.alert(res.data.message)
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
   
  }, []);

  const setBusinessClicked=async(businessId)=>{
    await AsyncStorage.setItem('currentBusiness',businessId)
  }



  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={tw`flex-row items-center p-2 border-b border-gray-300`}
      onPress={() => {
        console.log('this is the id of the item: ',item._id)
        setBusinessClicked(item._id)
        navigation.navigate("BusninessHome");
        setBusinessTab(true);
      }}
    >
      <Image
        source={{ uri: item.logo }}
        style={tw`w-8 h-8 rounded-full mr-2`}
      />
      <Text>{item.business_name}</Text>
    </TouchableOpacity>
  );


  const handleSwitchBack = () => {
    setBusinessTab(false);
    navigation.navigate('Home');
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-[#F2E8DE]`}>
      <ScrollView>
        <View style={tw`items-center mb-3`}>
          <Image
            source={require("../../assets/Images/logo-removebg.png")}
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
            <Entypo name="shop" size={22} color="black" />
            <Text style={tw`ml-2`}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center`}
            onPress={handleSwitchBack}
          >
            <FontAwesome name="user-circle-o" size={22} color="black" />
            <Text style={tw`ml-2`}>Personal Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`bg-white p-5 rounded-l border-b border-gray-50 flex-row items-center`}
            onPress={() => {
              navigation.navigate("");
            }}
          >
            <AntDesign name="setting" size={22} color="black" />
            <Text style={tw`ml-2`}>Settings</Text>
          </TouchableOpacity>
          <View> 
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
                  keyExtractor={(item) => item._id.toString()}
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
          </View>

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
              AsyncStorage.removeItem("userToken");
              logout();
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
