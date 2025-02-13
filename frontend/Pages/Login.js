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

const Login = ({ navigation }) => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isBusinessOwner, setIsBusinessOwner] = useState(false); // New state
  const { UserLogin, BusinessOwnerLogin } = useContext(AuthContext);

  const HandleSignup = ({ Registration }) => {
    navigation.navigate("Registration");
  };

  const handleSubmit = async () => {
    setErrors({});
    const validationErrors = {};

    if (!credential) {
      validationErrors.credential = "Please enter a proper email or username";
    }
    if (!password) {
      validationErrors.password = "Please enter your password";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Credential:", credential);
    console.log("Password:", password);

    await (isBusinessOwner
      ? BusinessOwnerLogin(credential, password)
      : UserLogin(credential, password));

    Alert.alert(res.data.message);
    navigation.navigate("Home");
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const windowHeight = Dimensions.get("window").height;

  return (
    <ImageBackground
      source={
        isBusinessOwner
          ? require("../assets/Images/businessownerlogo22.jpg")
          : require("../assets/Images/logo22.jpg")
      }
      style={tw`flex-1`}
      resizeMode="cover"
    >
      <ScrollView style={{ height: windowHeight }}>
        <View style={tw`flex-1 p-4 justify-center`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={tw`text-white`}>Skip</Text>
            </TouchableOpacity>
          </View>

          <View style={tw`items-center mb-4`}>
            <Image
              source={require("../assets/Images/logo-removebg.png")}
              style={tw`w-32 h-32`}
            />
          </View>
          <View>
            <Text
              style={[
                tw`text-lg font-bold py-4 text-center text-white`,
                { fontFamily: "berlin-sans", fontSize: 40 },
              ]}
            >
              {isBusinessOwner ? "Business Owner Login" : "Login"}
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
            <View style={tw` items-center justify-center mt-8 `}>
              <Text style={tw`text-sm text-white`}>
                Want to login as Business Owner?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => setIsBusinessOwner(!isBusinessOwner)}
              >
                <Text style={tw`text-sm font-bold text-yellow-500`}>
                  {isBusinessOwner
                    ? "Login as User"
                    : "Login as Business Owner"}
                </Text>
              </TouchableOpacity>
            </View>
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
