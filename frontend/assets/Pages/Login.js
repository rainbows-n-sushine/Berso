import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import tw from 'twrnc';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('UserName:', username);
    console.log('Password:', password);

    setUserName('');
    setPassword('');
  };

  return (
    <View style={tw`flex-1 p-4 justify-center`}>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <TouchableOpacity onPress={() => {}}>
          <Text style={tw`text-blue-500`}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`items-center mb-8`}>
      <Image source={require('../Images/logo.png')} style={tw`w-32 h-32`} />

      </View>

      <Text style={tw`text-lg font-bold mb-4 text-center`}>Login</Text>

      <TextInput
        style={tw`w-full h-12 border border-gray-300 rounded px-4 mb-4`}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUserName(text)}
      />
      <TextInput
        style={tw`w-full h-12 border border-gray-300 rounded px-4 mb-4`}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={tw`bg-blue-500 rounded h-12 items-center justify-center mb-4`} onPress={handleLogin}>
        <Text style={tw`text-white font-bold`}>Login</Text>
      </TouchableOpacity>

      <View style={tw`border-b border-gray-300 my-8`} />

      <TouchableOpacity style={tw`bg-white-500 rounded h-12 items-center justify-center mb-4 w-60`} onPress={() => {}}>
        <View style={tw`flex-row items-center `}>
          <FontAwesome name="google" size={20} color="black" style={tw`mr-2`} />
          <Text style={tw`text-white font-bold`}>Continue with Google</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={tw`bg-blue-500 rounded h-12 items-center justify-center mb-4 w-60`} onPress={() => {}}>
        <View style={tw`flex-row items-center`}>
          <FontAwesome name="facebook" size={20} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white font-bold`}>Continue with Facebook</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={tw`bg-black rounded h-12 items-center justify-center mb-4 w-60`} onPress={() => {}}>
        <View style={tw`flex-row items-center justify-center`}>
          <Entypo name="apple" size={20} color="white" style={tw`mr-2`} />
          <Text style={tw`text-white font-bold`}>Continue with Apple</Text>
        </View>
      </TouchableOpacity>

      <View style={tw`flex-row justify-center mt-8`}>
        <Text style={tw`text-sm`}>Don't have an account? </Text>
        <Text style={tw`text-sm font-bold text-yellow-500`}>Sign up</Text>
      </View>
    </View>
  );
};

export default Login;