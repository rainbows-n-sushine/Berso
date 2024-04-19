import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, ImageBackground, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import Registration from './Registration';
import axios from 'axios'






const Login = () => {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigation=useNavigation();

  const HandleSignup=({Registration})=>{

    navigation.navigate('Registration')


  }



  const handleSubmit = async() => {
     // Reset previous errors
     setErrors({});

     const validationErrors = {};
 
     if (!credential) {
      validationErrors.credential = 'Please enter a proper email or username';
    } else if (!/\S+@\S+\.\S+/.test(credential)) {
      validationErrors.credential = 'Please enter a valid email or username';
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

  return await axios.post('http://localhost:8000/user/signin',{credential,password})
    .then((res)=>{

        console.log(res.data)
      
    })
    .catch((error)=>{
      if(error){
        console.log("Error in handleSubmit", error.message)

      }

    })

  };

  const windowHeight = Dimensions.get('window').height;
  return (
    <SafeAreaView style={tw`flex-1 justify-between items`}>
      <ImageBackground
        source={require("../Images/logo22.jpg")}
        style={tw`flex-1`}
        resizeMode="cover"
      >
        <ScrollView
          contentContainerStyle={tw`justify-center items-center`}
          style={{ height: windowHeight }}
        >
          <View style={tw`flex-1 p-4 justify-center`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <AntDesign name="arrowleft" size={24} color="white" />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Home");
                }}
              >
                <Text style={tw`text-white`}>Skip</Text>
              </TouchableOpacity>
            </View>

            <View style={tw`items-center mb-8`}>
              <Image
                source={require("../Images/logo-removebg.png")}
                style={tw`w-32 h-32`}
              />
            </View>

            <Text style={tw`text-lg font-bold mb-4 text-center`}>Login</Text>

            <TextInput
              style={tw`w-full h-12 border bg-white border-gray-300 rounded-full w-70 ml-10 px-4 mb-4`}
              placeholder="enter email or username"
              value={credential}
              onChangeText={(text) => setCredential(text)}
            />
            {errors.credential && (
              <Text style={tw`text-red-500 ml-10 mb-2`}>{errors.credential}</Text>
            )}

            <TextInput
              style={tw`w-full h-12 border bg-white border-gray-300 rounded-full w-70 ml-10 px-4 mb-4`}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            {errors.password && (
              <Text style={tw`text-red-500 ml-10 mb-2`}>{errors.password}</Text>
            )}

            <TouchableOpacity
              style={tw`bg-orange-500 rounded-full h-12 items-center justify-center mb-4 w-70 ml-10`}
              onPress={handleSubmit}
            >
              <Text style={tw`text-white font-bold`}>Login</Text>
            </TouchableOpacity>

            <View style={tw`border-b border-gray-300 my-8`} />

            <TouchableOpacity
              style={tw`bg-orange-500 rounded-full h-12 items-center justify-center mb-4 w-60 ml-15`}
              onPress={() => {}}
            >
              <View style={tw`flex-row items-center `}>
                <FontAwesome5
                  name="google"
                  size={20}
                  color="black"
                  style={tw`mr-2`}
                />
                <Text style={tw`text-white font-bold`}>
                  Continue with Google
                </Text>
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
                <Text style={tw`text-white font-bold`}>
                  Continue with Facebook
                </Text>
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
                <Text style={tw`text-white font-bold`}>
                  Continue with Apple
                </Text>
              </View>
            </TouchableOpacity>

            <View style={tw`flex-row justify-center mt-8`}>
              <Text style={tw`text-sm text-white`}>
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Registration");
                }}
              >
                <Text style={tw`text-sm font-bold text-yellow-500`}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;