import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Modal,
  Alert,
} from "react-native";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Registration from "./Registration";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import api from "../util/Util";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {BASE_URL} from '../../.env'

//you can be adding {navigation} as an event in

const Login = ({ navigation }) => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  // const {login}=useContext(AuthContext)
  const { UserLogin, BusinessOwnerLogin } = useContext(AuthContext);
  // const BASE_URL=process.env.BASE_URL


  const HandleSignup = ({ Registration }) => {
    navigation.navigate("Registration");
  };

  const handleSubmit = async () => {
    // Reset previous errors
    setErrors({});

     const validationErrors = {};
 
     if (!credential) {
      validationErrors.credential = 'Please enter a proper email or username';
    } 
     if (!password) {
       validationErrors.password = 'Please enter your password';
     }
 
     if (Object.keys(validationErrors).length > 0) {
       setErrors(validationErrors);
       return;
     }
    console.log('Credential:', credential);
    console.log('Password:', password);
  
   // ${BASE_URL}
await login(credential,password)
  Alert.alert("Login Successful!", "Welcome back!");
navigation.navigate('Home')
  // return await api.post("user/signin",{credential,password})
  //   .then((res)=>{  

  //       console.log(res.data)
  //      if(res.data.success===true) {
  //       const token=res.data.token
  //       login()
  //       console.log('this is the token thrown from the backend   '+token)
  //       AsyncStorage.setItem('userToken',token )
  //      }
        
      
  //   })
    // .catch((error)=>{
    //   if(error){
    //     console.log("Error in handleSubmit", error.message)

    //   }

    // })

  };
const [isModalVisible, setIsModalVisible] = useState(false);
const toggleDatePicker = function () {
  setShowPicker(!showPicker);
};
  
  // Function to handle modal close
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const windowHeight = Dimensions.get("window").height;
  return (
    <ImageBackground
      source={require("../assets/Images/logo22.jpg")}
      style={tw`flex-1`}
      resizeMode="cover"
    >
      <ScrollView
        // contentContainerStyle={tw`justify-center items-center`}
        style={{ height: windowHeight }}
      >
        <View style={tw`flex-1 p-4 justify-center`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            {/* <AntDesign name="arrowleft" size={24} color="white" /> */}
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={tw`text-white`}>Skip</Text>
            </TouchableOpacity>
          </View>

          <View style={tw`items-center mb-4`}>
            <Image
              source={require("../assets/Images/logo-removebg.png")}
              style={tw`w-32 h-32`}
            />
          </View>
          <View style={tw``}>
            <Text
              className={`text-lg font-bold py-4 text-center text-white`}
              style={{ fontFamily: "berlin-sans", fontSize: 40 }}
            >
              Login
            </Text>
            <TextInput
              style={tw`w-full h-12 border bg-white border-gray-300 rounded-xl w-70 ml-10 px-4 mb-4`}
              placeholder="email or username"
              value={credential}
              onChangeText={(text) => setCredential(text)}
            />

            {errors.credential && (
              <Text style={tw`text-red-500 ml-10 mb-2`}>
                {errors.credential}
              </Text>
            )}

            <TextInput
              style={tw`w-full h-12 border bg-white border-gray-300 rounded-xl w-70 ml-10 px-4 mb-4`}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {errors.password && (
              <Text style={tw`text-red-500 ml-10 mb-2`}>{errors.password}</Text>
            )}

            <TouchableOpacity
              style={tw`bg-orange-400 rounded-2xl h-12 items-center justify-center mb-4 w-70 ml-10`}
              onPress={handleSubmit}
            >
              <Text style={tw`text-white font-bold`}>Login</Text>
            </TouchableOpacity>
            <Modal
              visible={isModalVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={closeModal}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ fontSize: 18, marginBottom: 10 }}>
                    Login Successful!
                  </Text>
                  <TouchableOpacity onPress={closeModal}>
                    <Text
                      style={{
                        color: "blue",
                        textDecorationLine: "underline",
                      }}
                    >
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>

        <View style={tw`border-b border-gray-300 my-8`} />

        <TouchableOpacity
          style={tw`bg-white rounded-full h-12 items-center justify-center mb-4 w-60 ml-15`}
          onPress={() => {}}
        >
          <View style={tw`flex-row items-center `}>
            <FontAwesome5
              name="google"
              size={20}
              color="black"
              style={tw`mr-2`}
            />
            {/* <Image 
              source=
              {{
                uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB+0lEQVR4nGNgoCf4X8/A9r+EOfh/IWPD/xKm+v/lzP7/6xlYSDeohkH1fwrTyf9uDH//2zL8R8HujH//pzMd+1/NoEycYbWsaf+9GDENwmZwMUsWfsPKWbL/OxIwCNnASuYA3Ia1Myj892b8g6IpkvHl/yKmov+ZDLL/6xnE/pczFf6PZnwBNqyc2R+/69awTfkfx4QwLJ1xN0619Wwa+A37z8D0/yDb8/8H2P//72ABu4yBEvD/AKvu/4Ps/+F4J7sTuprgzvmPceGwrll3m6eWWSEZyOaJYuB+Bh50AyXLLv3HhyunVNcgDNzP7kGpgRVTa6qRDGTVgRn27yD7//N7ZDCSA7o3HZrWfUE2sGZmZQBqpBxge/b1APf/tq0W//M2Ob4hFO4ercvfwQzTrD78N3TVKmYUBZd3S85I3ej232d9ABg3b7XYh8uwlP7+w8iui++ZfAJD0dwtukqRG7z+wgwE4YLNDq+mbDcq7d5iKD9nu4n6tC2GNQWbHN4lzSn+L1t+Hu666okl2PP1lO0GeUEbfOEG4sNJi1P+a9cc/Fc+tS4Xb9hM22KQF4XmUmw4ZoPn36mbbPAXDjCwYJu2cvMWy+ORGzwxDI7e4Pm3bav50Vkb9RSJMgwZzDxjzDpzh37AlC1G9VO3GdTN26nnW/+fgYlkgygBAOrTuFLcL9uXAAAAAElFTkSuQmCC",
              }} /> */}

            <Text style={tw`text-black font-bold`}>Continue with Google</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-blue-500 rounded-full h-12 items-center justify-center mb-4 w-60 ml-15`}
          onPress={() => {}}
        >
          <View style={tw`flex-row items-center`}>
            <FontAwesome5
              name="facebook"
              size={20}
              color="white"
              style={tw`mr-2`}
            />
            <Text style={tw`text-white font-bold`}>Continue with Facebook</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-black rounded-full h-12 items-center justify-center mb-4 w-60 ml-15`}
          onPress={() => {}}
        >
          <View style={tw`flex-row items-center justify-center`}>
            <FontAwesome5
              name="apple"
              size={20}
              color="white"
              style={tw`mr-2`}
            />
            <Text style={tw`text-white font-bold`}>Continue with Apple</Text>
          </View>
        </TouchableOpacity>

        <View style={tw`flex-row justify-center mt-8`}>
          <Text style={tw`text-sm text-white`}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Registration");
            }}
          >
            <Text
              style={tw`text-sm font-bold text-yellow-500`}
              onPress={HandleSignup}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Login;